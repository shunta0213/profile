# Shunta Ide — Academic Portfolio

Source code for [profile.sprshunt.com](https://profile.sprshunt.com), the personal website of Shunta Ide, a master's student at Keio University (Shu Tanaka Lab) researching quantum annealing and combinatorial optimization.

The site presents research topics, publications, conference presentations, and a CV.

## Tech stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- GitHub Actions + GitHub Pages for deployment

CV, publication, and presentation data are generated from a single Word document by a Python script (`scripts/sync-cv.py`), so the website and the PDF CV stay in sync.

## Getting started

Requires Node.js (see `.node-version`) and Python 3.9+.

```sh
npm ci
npm run dev    # http://localhost:5173/
npm run build
```

## Project structure

```
content/cv/     Source CV (Word) and site-only supplementary data
scripts/        CV import / PDF export scripts and tests
src/data/       Site data (generated CV data in src/data/generated/)
src/pages/      Page components
public/         Static files (CV PDF, CNAME)
docs/           Maintainer documentation
```

## Documentation

- [Development & CV update guide](docs/development.md) (Japanese)

## Contact

See [profile.sprshunt.com](https://profile.sprshunt.com) for contact details and links.
