from contextlib import ExitStack, redirect_stderr, redirect_stdout
import importlib.util
import io
import json
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch
import xml.etree.ElementTree as ET
from zipfile import ZipFile

SPEC = importlib.util.spec_from_file_location("sync_cv", Path(__file__).parents[1] / "sync-cv.py")
cv = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = cv
SPEC.loader.exec_module(cv)


def word_fixture(path):
    document = ET.Element(cv.W + "document")
    body = ET.SubElement(document, cv.W + "body")

    def paragraph(text):
        p = ET.SubElement(body, cv.W + "p")
        for i, part in enumerate(text.split("\t")):
            run = ET.SubElement(p, cv.W + "r")
            if i:
                ET.SubElement(run, cv.W + "tab")
            ET.SubElement(run, cv.W + "t").text = part

    for text in [
        "Person Name", "private phone number",
        "EDUCATION", "Master of Engineering\tApr 2026 – Current", "Example University",
        "RESEARCH EXPERIENCE", "Research Assistant\tApr 2026 – Current", "Example Lab",
        "TEACHING EXPERIENCE", "Teaching Assistant\tJune 2026", "Example Department",
        "PUBLICATIONS", "Proceeding",
        'S. Ide and S. Tanaka “A paper,” Example Conference 2026, Japan, 2026, pp. 1-2, doi: 10.1234/example.2026.',
        "CONFERENCE PRESENTATIONS", "Oral Presentation",
        'S.Ide “A talk”, Example Conference 2026, Tokyo, Japan, June 25, 2025.',
        "Poster Presentation",
        'S. Ide “A poster”, Example Symposium, Japan, October 2, 2026.',
        "PROFESSIONAL EXPERIENCE", "Example Company\tFeb – Sep 2025", "Engineering Internship",
        "LEADERSHIP & ACTIVITIES", "Community Organizer\tSep2025", "Organized a workshop.",
        "HONORS & AWARDS", "Research Award\tMar 2026", "Awarded for research.",
        "ADDITIONAL INFORMATION", "CERTIFICATES", "Private additional information",
    ]:
        paragraph(text)
    with ZipFile(path, "w") as docx:
        docx.writestr("word/document.xml", ET.tostring(document))


class ParserTests(unittest.TestCase):
    def test_text_boxes_and_deleted_text_are_not_imported(self):
        p = ET.fromstring(f'''<w:p xmlns:w="{cv.W[1:-1]}">
            <w:r><w:drawing><w:txbxContent><w:p><w:r><w:t>Duplicate totals</w:t></w:r></w:p></w:txbxContent></w:drawing></w:r>
            <w:del><w:r><w:t>Deleted title</w:t></w:r></w:del>
            <w:r><w:t>Oral Presentation</w:t></w:r></w:p>''')
        self.assertEqual(cv.paragraphs_from(p)[0].text, "Oral Presentation")

    def test_quotes_doi_pages_and_submitted_status(self):
        entries = cv.parse_publications([
            cv.Paragraph("Proceeding"),
            cv.Paragraph('S. Ide, "A title," Example Conference, Japan, 2025, pp. 10-12, doi: 10.1234/abc.2025.'),
            cv.Paragraph("Submitted For Publication"),
            cv.Paragraph('S. Ide “Another title”, arXiv: 2601.12345 (2026).'),
        ])
        self.assertEqual(entries[0]["venue"], "arXiv:2601.12345")
        self.assertEqual(entries[0]["status"], "Submitted for publication")
        self.assertEqual(entries[0]["doi"], "10.48550/arXiv.2601.12345")
        self.assertEqual(entries[1]["doi"], "10.1234/abc.2025")
        self.assertEqual(entries[1]["pages"], "pp. 10-12")
        self.assertEqual(entries[1]["title"], "A title")

    def test_to_appear_is_preserved(self):
        entries = cv.parse_publications([cv.Paragraph('S. Ide “Title,” Conference 2026, Canada, to appear 2026); arXiv:2604.11449.')])
        self.assertEqual(entries[0]["venue"], "Conference 2026, Canada")
        self.assertTrue(entries[0]["toAppear"])

    def test_date_mismatch_warns_but_keeps_word_date_and_initials(self):
        entries, warnings = cv.parse_presentations([
            cv.Paragraph("Poster Presentation"),
            cv.Paragraph('S.Ide “Title”, Conference 2026, Tokyo, Japan, June 25, 2025.'),
        ], {})
        self.assertEqual(entries[0]["date"], "June 25, 2025")
        self.assertEqual(entries[0]["authors"], "S.Ide")
        self.assertEqual(entries[0]["venue"], "Tokyo, Japan")
        self.assertEqual(len(warnings), 1)

    def test_invalid_calendar_date_is_rejected(self):
        with self.assertRaises(cv.CVError):
            cv.parse_presentations([cv.Paragraph("Oral Presentation"), cv.Paragraph('S. Ide “Title”, Conference, February 30, 2026.')], {})

    def test_missing_section_is_rejected(self):
        with self.assertRaisesRegex(cv.CVError, "Missing sections"):
            cv.split_sections([cv.Paragraph("EDUCATION")])

    def test_malformed_entry_is_rejected(self):
        with self.assertRaisesRegex(cv.CVError, "expected a title"):
            cv.dated_entries([cv.Paragraph("Research Assistant April 2026", "Heading3")], "research")

    def test_abbreviated_periods_are_expanded_without_inventing_start_dates(self):
        self.assertEqual(cv.period_text("Feb – Sep  2025"), "Feb 2025 - Sep 2025")
        self.assertEqual(cv.period_text("Mar2026"), "Mar 2026")
        self.assertEqual(cv.period_text("Apr 2026 – Current"), "Apr 2026 - Current")

    def test_word_description_takes_precedence_over_site_notes(self):
        extras = {"engineeringNotes": {"Company | Engineer": {"url": "https://example.com", "description": ["Website description"]}}}
        paragraphs = [cv.Paragraph("Company\tApr 2026"), cv.Paragraph("Engineer")]
        self.assertEqual(cv.parse_entries(paragraphs, "experience", extras)[0]["description"], ["Website description"])
        paragraphs.append(cv.Paragraph("New Word description"))
        entry = cv.parse_entries(paragraphs, "experience", extras)[0]
        self.assertEqual(entry["description"], ["New Word description"])
        self.assertEqual(entry["url"], "https://example.com")


class SynchronizationTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.directory = Path(self.temporary.name)
        self.source = self.directory / "CV.docx"
        self.output = self.directory / "generated/cv.json"
        self.pdf = self.directory / "CV.pdf"
        self.extras = self.directory / "extras.json"
        self.extras.write_text("{}")
        word_fixture(self.source)

    def invoke(self, *args, conversion_error=None):
        with ExitStack() as stack:
            for name, value in {"SOURCE": self.source, "OUTPUT": self.output, "PDF": self.pdf, "EXTRAS": self.extras}.items():
                stack.enter_context(patch.object(cv, name, value))
            stack.enter_context(patch.object(sys, "argv", ["sync-cv.py", *args]))
            converter = stack.enter_context(patch.object(cv, "convert_pdf", return_value=b"%PDF-1.7\ntest fixture", side_effect=conversion_error))
            stack.enter_context(redirect_stdout(io.StringIO()))
            stack.enter_context(redirect_stderr(io.StringIO()))
            result = cv.main()
            return result, converter.called

    def test_preview_changes_no_files_and_does_not_export_pdf(self):
        result, converted = self.invoke("--dry-run")
        self.assertEqual(result, 0)
        self.assertFalse(converted)
        self.assertFalse(self.output.exists())
        self.assertFalse(self.pdf.exists())

    def test_roundtrip_unchanged_sync_and_stale_pdf_check(self):
        self.assertEqual(self.invoke(), (0, True))
        data = json.loads(self.output.read_text())["data"]
        self.assertNotIn("private", json.dumps(data).lower())
        self.assertEqual(data["presentations"][0]["title"], "A poster")
        self.assertEqual(self.invoke(), (0, False))
        self.assertEqual(self.invoke("--check"), (0, False))
        self.pdf.write_bytes(b"%PDF-outdated")
        self.assertEqual(self.invoke("--check"), (1, False))

    def test_source_change_is_detected_before_build(self):
        self.assertEqual(self.invoke()[0], 0)
        with ZipFile(self.source, "a") as docx:
            docx.writestr("docProps/extra.xml", "<metadata>Word was updated</metadata>")
        self.assertEqual(self.invoke("--check"), (1, False))

    def test_failed_conversion_leaves_previous_outputs_intact(self):
        self.assertEqual(self.invoke()[0], 0)
        before = self.output.read_bytes(), self.pdf.read_bytes()
        self.extras.write_text(json.dumps({"educationNotes": {"Master of Engineering": {"details": ["New detail"]}}}))
        self.assertEqual(self.invoke(conversion_error=cv.CVError("Conversion failed"))[0], 1)
        self.assertEqual((self.output.read_bytes(), self.pdf.read_bytes()), before)

    def test_invalid_word_leaves_previous_outputs_intact(self):
        self.assertEqual(self.invoke()[0], 0)
        before = self.output.read_bytes(), self.pdf.read_bytes()
        self.source.write_bytes(b"not a docx")
        self.assertEqual(self.invoke()[0], 1)
        self.assertEqual((self.output.read_bytes(), self.pdf.read_bytes()), before)


if __name__ == "__main__":
    unittest.main()
