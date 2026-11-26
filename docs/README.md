# Project documentation

The project history, grouped by phase. Each phase folder has its numbered reports plus the
evidence behind them: screenshots, recordings, prototypes and research captures.

| Phase | Focus | Start here |
| --- | --- | --- |
| [phase-01](phase-01/) | Discovery: reference audit, content inventory, sitemap, brand constraints, facts & gaps, technical audit | [00_README_AND_DECISIONS.md](phase-01/00_README_AND_DECISIONS.md) |
| [phase-02](phase-02/) | Visual direction: taste analysis, Direction A prototypes (`01_VISUAL_DIRECTION_A*.html`), design decisions, art direction, motion | [05_DESIGN_DECISIONS.md](phase-02/05_DESIGN_DECISIONS.md) |
| [phase-03](phase-03/) | First production build: competitor benchmark (`research/`), photography library, design system, implementation, content gaps | [05_IMPLEMENTATION_REPORT.md](phase-03/05_IMPLEMENTATION_REPORT.md) |
| [phase-04](phase-04/) | Refinement rounds: unified design system, navigation, motion, page redesigns, browser QA (`qa-v2` … `qa-v6`); the earlier recovery round is in `round-1/`, and recovered Direction B/C prototypes are in `reference/` | [06_IMPLEMENTATION_REPORT.md](phase-04/06_IMPLEMENTATION_REPORT.md) |

The client's original source material (brand book, brief, reference photos and video) is in
[`../DATA/`](../DATA/). By project rule, files in that folder are never modified.

## Path changes since these reports were written

The reports describe the codebase as it was at the time, when it lived under `site/`. The code
has since been moved to the repository root and reorganised with the **same output**. Use this
table to find the current location of a file a report mentions:

| Path in the reports | Current location |
| --- | --- |
| `site/src/build.mjs` | `scripts/build.mjs` (entry point), split into `src/layouts/`, `src/components/`, `src/pages/`, `src/lib/` |
| `site/src/content.mjs` | `src/content/content.mjs` |
| `site/src/main.js` | `src/scripts/main.js` |
| `site/src/*.css` (styles, cinema, system, signature, hero, refine) | `src/styles/*.css` |
| `site/src/images.py` | `scripts/images.py` |
| `site/serve.mjs` | `scripts/serve.mjs` |
| `site/src/{brand,fonts,images,scene,spec}/` | `src/assets/{brand,fonts,images,scene,spec}/` |
| `site/dist/` | `dist/` |
| `node site/src/build.mjs` / `node site/serve.mjs 3000` | `npm run build` / `npm run serve -- 3000` |
