# Deep Learning Cheat Sheet

A comprehensive cheat sheet of deep learning concepts with parameters, usage, and diagrams.

## Prerequisites

- Node.js 18+ (recommended 20)
- npm 9+

## Install

```bash
npm ci || npm install
```

## Run locally

```bash
npm run dev
```

Then open `http://localhost:4321`.

## Build static site

```bash
npm run build
```

Output goes to `dist/`.

To preview the production build locally:

```bash
npm run preview
```

## Author content

- Follow `content_structure_guide.md` for the new multi-topic structure.
- Add files under `src/content/concepts/` (Markdown).
- Each file can contain multiple topics using `##` for the card title, with `### Desc` and `### Parameters` bullet lists, and an optional image right under the title.
- Example file: `src/content/concepts/convolutions.md`.

## Search, math, and code

- Search: Pagefind builds a static index at build time.
- Math: KaTeX via remark-math/rehype-katex. Use `$...$` and `$$...$$`.
- Code: Shiki highlighting. Use fenced code blocks with a language tag.

## Deploy (GitHub Pages)

This repo includes `.github/workflows/deploy.yml`.

1. Push to the `main` branch.
2. In GitHub repo settings → Pages, set "Build and deployment" to "GitHub Actions".
3. The workflow builds and deploys `dist/` automatically.

