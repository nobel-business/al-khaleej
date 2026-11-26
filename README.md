# Alkhaleej Fish Manufacturing — website

> Project history, design decisions and QA evidence: [`docs/`](docs/README.md). Client source material: [`DATA/`](DATA/) (read-only).

Bilingual (EN / AR, RTL) static website. Pages are pre-rendered by a small, dependency-free
Node generator; responsive images are produced by a Python/Pillow pipeline.

## Commands

| Command | What it does |
| --- | --- |
| `npm run build` | Render every page to `dist/` (`node scripts/build.mjs`) |
| `npm run images` | Regenerate responsive AVIF/WebP/JPEG variants into `public/img/` + the image manifest — only when image sources change; requires Python + Pillow. **Commit the results.** |
| `npm run serve` | Preview `dist/` at http://127.0.0.1:8080/en/ (pass a port: `npm run serve -- 3000`) |
| `npm start` | Build, then serve |

No `npm install` is needed — there are no dependencies. For `npm run images`: `pip install -r scripts/images.requirements.txt`.

## Deployment (Vercel)

Standard Vercel Git integration: **push to `main`** → production, **pull request** → preview. Vercel runs
`npm run build` and serves `dist/`. The build is Node-only: the generated images are committed in `public/img/`
and copied into `dist/` by the build.

- [`vercel.json`](vercel.json) mirrors the preview server: trailing-slash URLs, immutable caching for hashed JS, `/img/` and fonts.
- [`.vercelignore`](.vercelignore) keeps docs, client data, image masters and the Python tooling out of the upload.
- [`.github/workflows/build.yml`](.github/workflows/build.yml) checks every push/PR: the site builds and every image in the manifest is committed.

## Structure

```
.
├── DATA/                     client source material (brand book, brief, reference media) — never modified
├── docs/                     phase reports, design decisions, QA evidence (index: docs/README.md)
├── package.json
├── public/                   static files copied as-is into dist/ — img/ holds the generated, committed images
├── scripts/                  build & dev tooling (runs in Node / Python, never shipped)
│   ├── build.mjs             entry point: renders all pages, copies static assets → dist/
│   ├── images.py             responsive image pipeline → public/img/ + src/assets/images/manifest.json
│   └── serve.mjs             local preview server (gzip, caching, clean URLs, 404)
├── src/
│   ├── content/
│   │   └── content.mjs       single source of truth for public copy (EN/AR side by side)
│   ├── lib/                  framework-free helpers
│   │   ├── paths.mjs         filesystem locations (src, assets, dist)
│   │   ├── bundle.mjs        CSS concatenation/minification (cascade order) + JS hashing
│   │   ├── html.mjs          escaping, i18n lookup, small markup helpers
│   │   ├── routes.mjs        route table and URL builders
│   │   └── media.mjs         <picture>/srcset builders, preloads, image manifest
│   ├── layouts/
│   │   └── layout.mjs        page shell: <head>, header/nav, footer
│   ├── components/           reusable page sections
│   │   ├── blocks.mjs        headings, breadcrumbs, hero family
│   │   ├── spec.mjs          spec sheet, comparison, readiness board, product drawer
│   │   ├── diagrams.mjs      two-stream process SVG, gauges, loupe, grade dial
│   │   ├── orbit.mjs         three-fish symbol orbit
│   │   └── gull.mjs          gull illustration
│   ├── pages/                one module per route (+ index.mjs registry)
│   ├── scripts/
│   │   └── main.js           browser JavaScript (all interactions)
│   ├── styles/               stylesheets — concatenated in this order (see lib/bundle.mjs):
│   │                         styles → cinema → system → signature → hero → refine
│   └── assets/
│       ├── brand/            logos, icon, pattern, symbol-fish.json
│       ├── fonts/            self-hosted woff2
│       ├── images/           image masters (ai/, commons/) + manifest.json
│       ├── scene/            hero boat sprite
│       └── spec/             product specimen photographs
└── dist/                     build output (git-ignored) — deploy this folder to any static host
```

### Where to change things

- **Copy / translations** → `src/content/content.mjs` (page-specific strings live in the page module).
- **A page** → `src/pages/<page>.mjs`; new routes also go in `src/lib/routes.mjs` and `src/pages/index.mjs`.
- **Header / footer** → `src/layouts/layout.mjs`.
- **Styles** → `src/styles/`; add new files to the `STYLES` list in `src/lib/bundle.mjs`.
- **Images** → put masters in `src/assets/images/`, register them in `scripts/images.py`, run `npm run images`.
