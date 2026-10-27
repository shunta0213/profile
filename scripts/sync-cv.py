#!/usr/bin/env python3
"""Import the Word CV without third-party Python packages.

Only explicitly selected sections are exported; contact details, text boxes,
certificates, and other Word-only content are not copied into the website data.
"""
from __future__ import annotations

import argparse
from dataclasses import dataclass
from datetime import datetime
import hashlib
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile
import xml.etree.ElementTree as ET
from zipfile import BadZipFile, ZipFile

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "content/cv/Shunta_Ide_CV.docx"
EXTRAS = ROOT / "content/cv/site-extras.json"
OUTPUT = ROOT / "src/data/generated/cv.json"
PDF = ROOT / "public/CV.pdf"
W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
SECTIONS = {
    "EDUCATION": "education",
    "RESEARCH EXPERIENCE": "research",
    "TEACHING EXPERIENCE": "teaching",
    "PUBLICATIONS": "publications",
    "CONFERENCE PRESENTATIONS": "presentations",
    "PROFESSIONAL EXPERIENCE": "experience",
    "LEADERSHIP & ACTIVITIES": "activities",
    "HONORS & AWARDS": "honors",
}
IGNORED = {W + t for t in ("drawing", "pict", "txbxContent", "del", "moveFrom", "pPr", "rPr")}
MONTH = r"(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)"


class CVError(ValueError):
    pass


@dataclass
class Paragraph:
    text: str
    style: str = ""


def clean(text: str) -> str:
    return re.sub(r"\s+", " ", text.replace("\u00a0", " ")).strip()


def visible_text(element: ET.Element) -> str:
    if element.tag in IGNORED:
        return ""
    if element.tag == W + "t":
        return element.text or ""
    if element.tag == W + "tab":
        return "\t"
    if element.tag in (W + "br", W + "cr"):
        return "\n"
    return "".join(visible_text(child) for child in element)


def paragraphs_from(element: ET.Element) -> list[Paragraph]:
    if element.tag in IGNORED:
        return []
    if element.tag == W + "p":
        text = visible_text(element).strip()
        style = element.find(f"{W}pPr/{W}pStyle")
        return [Paragraph(text, style.get(W + "val", "") if style is not None else "")] if text else []
    return [p for child in element for p in paragraphs_from(child)]


def read_document(source: Path) -> list[Paragraph]:
    try:
        with ZipFile(source) as docx:
            document = ET.fromstring(docx.read("word/document.xml"))
        body = document.find(W + "body")
        if body is None:
            raise CVError("Word document has no body.")
        return paragraphs_from(body)
    except (BadZipFile, KeyError, ET.ParseError) as error:
        raise CVError(f"Cannot read Word document: {error}") from error


def split_sections(paragraphs: list[Paragraph]) -> dict[str, list[Paragraph]]:
    result: dict[str, list[Paragraph]] = {}
    current = None
    for paragraph in paragraphs:
        heading = clean(paragraph.text).upper()
        if heading in SECTIONS:
            current = SECTIONS[heading]
            if current in result:
                raise CVError(f"Duplicate section: {heading}")
            result[current] = []
        elif heading == "ADDITIONAL INFORMATION":
            current = None
        elif current:
            if paragraph.style == "Heading1":
                raise CVError(f"Unrecognized section heading: {heading}")
            result[current].append(paragraph)
    missing = set(SECTIONS.values()) - result.keys()
    if missing:
        raise CVError("Missing sections: " + ", ".join(sorted(missing)))
    return result


def period_text(text: str) -> str:
    text = clean(text.replace("–", "-").replace("—", "-"))
    text = re.sub(rf"({MONTH})(?=\d{{4}})", r"\1 ", text)
    # Word uses abbreviated same-year ranges such as 'Feb - Sep 2025'.
    text = re.sub(rf"^({MONTH})\s*-\s*({MONTH})\s+(\d{{4}})$", r"\1 \3 - \2 \3", text)
    return text


def dated_entries(paragraphs: list[Paragraph], section: str) -> list[dict]:
    entries: list[dict] = []
    for paragraph in paragraphs:
        parts = [clean(part) for part in paragraph.text.split("\t") if clean(part)]
        is_entry = len(parts) >= 2 and re.match(rf"^{MONTH}\s*", parts[-1]) and re.search(r"\d{4}", parts[-1])
        if is_entry:
            if len(parts) != 2:
                raise CVError(f"{section}: use one tab between title and period: {paragraph.text!r}")
            entries.append({"title": parts[0], "period": period_text(parts[1]), "lines": []})
        elif paragraph.style == "Heading3":
            raise CVError(f"{section}: expected a title, tab, and period: {paragraph.text!r}")
        elif entries:
            entries[-1]["lines"].append(clean(paragraph.text))
        else:
            raise CVError(f"{section}: unexpected paragraph: {paragraph.text!r}")
    if not entries:
        raise CVError(f"No entries found in {section}.")
    return entries


def parse_entries(paragraphs: list[Paragraph], section: str, extras: dict) -> list[dict]:
    result = []
    for item in dated_entries(paragraphs, section):
        title, lines = item["title"], item["lines"]
        if section == "education":
            if not lines:
                raise CVError(f"Education institution missing: {title}")
            notes = extras.get("educationNotes", {}).get(title, {})
            result.append({"degree": title, "institution": lines[0], "period": item["period"], "details": lines[1:] or notes.get("details", [])})
            continue
        entry = {"title": title, "period": item["period"], "organization": "", "description": []}
        if section in ("research", "teaching", "experience"):
            if not lines:
                raise CVError(f"Organization or role missing in {section}: {title}")
            if section == "experience":
                entry["organization"], entry["title"] = title, lines[0]
                notes = extras.get("engineeringNotes", {}).get(title + " | " + lines[0], {})
                entry["description"] = lines[1:] or notes.get("description", [])
                if notes.get("url"):
                    entry["url"] = notes["url"]
            else:
                entry["organization"], entry["description"] = lines[0], lines[1:]
        else:
            # These sections have narrative descriptions, not organization rows.
            entry["description"] = lines
            url = extras.get("activityUrls", {}).get(title)
            if url:
                entry["url"] = url
        result.append(entry)
    return result


def citation(text: str) -> tuple[str, str, str]:
    match = re.match(r'^(.*?)\s*[“"](.+?)[”"]\s*,?\s*(.+)$', clean(text))
    if not match:
        raise CVError(f"Expected authors, quoted title, and citation details: {text!r}")
    authors, title, tail = match.groups()
    return authors.rstrip(" ,"), title.rstrip(" ,"), tail


def parse_publications(paragraphs: list[Paragraph]) -> list[dict]:
    result = []
    submitted = False
    for paragraph in paragraphs:
        heading = clean(paragraph.text).lower()
        if heading in ("proceeding", "proceedings", "journal", "journals", "preprints", "preprint", "submitted for publication"):
            submitted = heading == "submitted for publication"
            continue
        authors, title, tail = citation(paragraph.text)
        years = re.findall(r"\b(?:19|20)\d{2}\b", tail)
        if not years:
            raise CVError(f"Publication year missing: {title}")
        doi = re.search(r"\b10\.\d{4,9}/[^\s;,]+", tail)
        arxiv = re.search(r"arXiv:\s*(\d{4}\.\d{4,5}(?:v\d+)?)", tail, re.I)
        pages = re.search(r"\bpp\.\s*([\d–-]+)", tail)
        venue = re.split(r"\s*(?:;?\s*arXiv\s*:|,?\s*doi\s*:)", tail, maxsplit=1, flags=re.I)[0]
        venue = re.sub(r",?\s*to appear.*$", "", venue, flags=re.I)
        venue = re.sub(r",?\s*pp\..*$", "", venue)
        venue = re.sub(r",?\s*" + years[0] + r"\s*\)?\.?$", "", venue).strip(" ,;.")
        if not venue and arxiv:
            venue = "arXiv:" + arxiv.group(1)
        if not venue:
            raise CVError(f"Publication venue missing: {title}")
        item = {"authors": authors, "year": int(years[0]), "title": title, "venue": venue}
        if doi:
            item["doi"] = doi.group(0).rstrip(".)")
        elif arxiv:
            item["doi"] = "10.48550/arXiv." + arxiv.group(1)
        if pages:
            item["pages"] = "pp. " + pages.group(1)
        if "to appear" in tail.lower():
            item["toAppear"] = True
        if submitted:
            item["status"] = "Submitted for publication"
        result.append(item)
    if not result:
        raise CVError("No publications found.")
    return sorted(result, key=lambda p: -p["year"])


def parse_presentations(paragraphs: list[Paragraph], extras: dict) -> tuple[list[dict], list[str]]:
    result, warnings = [], []
    presentation_type = None
    for paragraph in paragraphs:
        heading = clean(paragraph.text)
        if heading in ("Oral Presentation", "Poster Presentation"):
            presentation_type = heading
            continue
        if not presentation_type:
            raise CVError("Presentation must follow an Oral Presentation or Poster Presentation heading.")
        authors, title, tail = citation(paragraph.text)
        match = re.search(r"([A-Za-z]+\s+\d{1,2},\s*\d{4})\.?$", tail)
        if not match:
            raise CVError(f"Presentation date missing: {title}")
        date = clean(match.group(1))
        try:
            parsed_date = datetime.strptime(date, "%B %d, %Y")
        except ValueError as error:
            raise CVError(f"Invalid presentation date: {date}") from error
        details = tail[:match.start()].strip(" ,")
        event, separator, venue = details.partition(",")
        item = {"title": title, "authors": authors, "event": event.strip(), "date": date, "type": presentation_type}
        if separator:
            item["venue"] = venue.strip()
        url = extras.get("eventUrls", {}).get(item["event"])
        if url:
            item["url"] = url
        event_years = re.findall(r"\b(?:19|20)\d{2}\b", item["event"])
        if event_years and int(event_years[-1]) != parsed_date.year:
            warnings.append(f"Word retained: {item['event']} has date {date} (event/date years differ).")
        result.append(item)
    if not result:
        raise CVError("No presentations found.")
    return sorted(result, key=lambda p: datetime.strptime(p["date"], "%B %d, %Y"), reverse=True), warnings


def parse_cv(source: Path, extras: dict) -> tuple[dict, list[str]]:
    sections = split_sections(read_document(source))
    data = {section: parse_entries(sections[section], section, extras)
            for section in ("education", "research", "teaching", "experience", "activities", "honors")}
    data["publications"] = parse_publications(sections["publications"])
    data["presentations"], warnings = parse_presentations(sections["presentations"], extras)
    for section, entries in data.items():
        keys = [(entry.get("title", entry.get("degree")), entry.get("date", entry.get("period", entry.get("year"))), entry.get("event"), entry.get("organization", entry.get("institution"))) for entry in entries]
        if len(keys) != len(set(keys)):
            raise CVError(f"Duplicate entries in {section}.")
    return data, warnings


def digest(content: bytes) -> str:
    return hashlib.sha256(content).hexdigest()


def convert_pdf(source: Path, directory: Path) -> bytes:
    if sys.platform == "darwin" and Path("/Applications/Microsoft Word.app").is_dir():
        # Use Word itself for faithful layout, operating on a disposable copy.
        copy = directory / (directory.name + ".docx")
        shutil.copy2(source, copy)
        converted = directory / "CV.pdf"
        subprocess.run(["osascript", str(ROOT / "scripts/export-cv.applescript"), str(copy), str(converted)], check=True, capture_output=True, text=True, timeout=120)
        if not converted.is_file():
            raise CVError("Microsoft Word did not produce a PDF. Use --pdf with a Word-exported PDF instead.")
        return converted.read_bytes()
    executable = shutil.which("soffice") or shutil.which("libreoffice")
    if not executable:
        raise CVError("PDF conversion requires LibreOffice (soffice). Alternatively export PDF from Word and run npm run cv:sync -- --pdf /absolute/path/CV.pdf")
    profile = directory / "libreoffice-profile"
    subprocess.run([executable, "-env:UserInstallation=" + profile.as_uri(), "--headless", "--convert-to", "pdf", "--outdir", str(directory), str(source.resolve())], check=True, capture_output=True, text=True, timeout=120)
    converted = directory / (source.stem + ".pdf")
    if not converted.is_file():
        raise CVError("LibreOffice did not produce a PDF. Close any CV editing window and retry, or use --pdf with a Word-exported PDF.")
    return converted.read_bytes()


def serialize(value: dict) -> str:
    return json.dumps(value, ensure_ascii=False, indent=2) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--dry-run", action="store_true", help="Parse and show counts without changing files")
    mode.add_argument("--check", action="store_true", help="Verify generated website data and PDF are current")
    parser.add_argument("--source", type=Path, default=SOURCE)
    parser.add_argument("--pdf", type=Path, help="Use an existing Word-exported PDF instead of LibreOffice")
    args = parser.parse_args()
    if args.pdf and (args.check or args.dry_run):
        parser.error("--pdf is only valid during synchronization")
    try:
        source = args.source.resolve()
        extras = json.loads(EXTRAS.read_text(encoding="utf-8"))
        data, warnings = parse_cv(source, extras)
        source_hash = digest(source.read_bytes())
        existing = json.loads(OUTPUT.read_text(encoding="utf-8")) if OUTPUT.exists() else {}
        for warning in warnings:
            print("Warning: " + warning, file=sys.stderr)
        print("Word CV: " + ", ".join(f"{key}={len(value)}" for key, value in data.items()))
        if args.dry_run:
            print("Preview only; no files changed.")
            return 0
        current = (existing.get("data") == data and existing.get("sourceSha256") == source_hash
                   and PDF.is_file() and existing.get("pdfSha256") == digest(PDF.read_bytes()))
        if args.check:
            if not current:
                raise CVError("Word CV or PDF has changed. Run npm run cv:sync, then commit the Word source, generated JSON, and PDF together.")
            print("Website data and PDF are in sync with the Word source.")
            return 0
        if current and not args.pdf:
            print("Already in sync; no files changed.")
            return 0
        # Validate parsing and PDF conversion before replacing either output.
        with tempfile.TemporaryDirectory(prefix="portfolio-cv-") as temporary:
            directory = Path(temporary)
            pdf = args.pdf.read_bytes() if args.pdf else convert_pdf(source, directory)
            if not pdf.startswith(b"%PDF-"):
                raise CVError("The supplied or converted file is not a PDF.")
            if digest(source.read_bytes()) != source_hash:
                raise CVError("Word CV changed during synchronization. Save it and retry.")
            output = {"source": "content/cv/" + source.name, "sourceSha256": source_hash, "pdfSha256": digest(pdf), "data": data}
            OUTPUT.parent.mkdir(parents=True, exist_ok=True)
            PDF.parent.mkdir(parents=True, exist_ok=True)
            # Stage next to each destination so each replacement is atomic.
            staged_pdf = PDF.with_suffix(".pdf.tmp")
            staged_json = OUTPUT.with_suffix(".json.tmp")
            try:
                staged_pdf.write_bytes(pdf)
                staged_json.write_text(serialize(output), encoding="utf-8")
                staged_pdf.replace(PDF)
                staged_json.replace(OUTPUT)
            finally:
                staged_pdf.unlink(missing_ok=True)
                staged_json.unlink(missing_ok=True)
        print("Updated src/data/generated/cv.json and public/CV.pdf.")
        return 0
    except subprocess.CalledProcessError as error:
        print(f"CV PDF export failed: {error.stderr or error}. No generated data was updated. Alternatively use npm run cv:sync -- --pdf /absolute/path/CV.pdf", file=sys.stderr)
        return 1
    except (CVError, OSError, json.JSONDecodeError, subprocess.SubprocessError) as error:
        print(f"CV sync failed: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
