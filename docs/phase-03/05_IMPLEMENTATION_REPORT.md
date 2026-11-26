# 05 — Implementation Report

## 1. Summary

The approved evolved Direction A ("First Light") is now a complete, bilingual, static production website in `site/`. It has **28 pages** (14 English + 14 Arabic, with real RTL), a language root, a 404 page and robots.txt. It is built from one content source, ships no front-end framework and no third-party requests, and works without JavaScript.

Preview: `node site/serve.mjs 3000` → http://127.0.0.1:3000/ (currently running).
Rebuild: `python -I site/src/images.py` (images, only when sources change) then `node site/src/build.mjs`.

## 2. Cleanup (single source of truth)

| Action | Detail |
|---|---|
| Checkpoint | Git repository initialised; tag **`phase-02-checkpoint`** holds everything before cleanup (A, B, C, all assets) |
| Deleted | `docs/phase-02/02_VISUAL_DIRECTION_B.html`, `03_VISUAL_DIRECTION_C.html`, unused `assets/drums.jpg` |
| Kept as history | Phase 02 docs and `01_VISUAL_DIRECTION_A*.html` (the approved direction’s evolution record) |
| Untouched | `DATA/` (including the 18 reference photos) and `docs/phase-01/`, verified by hash (see `07_QA_REPORT.md`) |
| Extracted from B/C | Line rises, curtain/wipe reveals, hairline draws, parallax (B); scroll-drawn two-stream diagram, instrument bezels, progress rail (C). See `04_MOTION_LANGUAGE.md` |

## 3. Stack decision

Phase 01 recommended a static-first build. The existing project had no application stack, only single-file HTML prototypes. I chose a dependency-free static generator rather than a framework:

| Need | Solution |
|---|---|
| Bilingual pre-rendered routes (`/en/`, `/ar/`) with `hreflang` | `site/src/build.mjs` (Node, no dependencies) |
| One content source | `site/src/content.mjs` (EN/AR side by side) |
| Responsive images | `site/src/images.py` (Pillow → AVIF/WebP/JPEG + `manifest.json`) |
| Interactions | `site/src/main.js`: 7.3 KB (2.7 KB gzip), event-driven |
| Styles | `site/src/styles.css`, inlined and minified per page (no render-blocking CSS request) |
| Fonts | Self-hosted variable subsets (Montserrat Latin, Cairo Arabic) |
| Preview / production-like serving | `site/serve.mjs`: gzip, immutable caching for assets, clean URLs, 404 |

The output in `site/dist/` can be deployed to any static host (Netlify, Vercel, S3/CloudFront, Nginx).

## 4. Implemented pages (EN + AR)

| Route | Content |
|---|---|
| `/` | Language root (browser-language redirect, links to both) |
| `/{lang}/` Home | Full-bleed 4K dawn hero; company statement + facts; specimen shelf with quick-view drawer; raw-materials bleed (real sardine photo); fishmeal feature; crude oil feature; two-stream diagram; quality parameters; international bleed (real Alexandria photo); CTA band |
| `/{lang}/about/` | Page hero; story; facts; brand symbol meaning; stated vs in-preparation ledger |
| `/{lang}/products/` | Hero; specimen shelf; comparison table; fishmeal feature |
| `/{lang}/products/fish-meal-60/`, `-65/`, `-72/`, `/crude-fish-oil/` | Half-screen product image + grade numeral; actions (quote pre-filled, datasheet request); 3-image gallery; full specification sheet with “Available on request” values; application; stream diagram; other products |
| `/{lang}/raw-materials/` | Hero (trawler); sourcing; sardine bleed; port gallery (real CC0/CC BY-SA photos) |
| `/{lang}/manufacturing/` | Hero; two-stream diagram; 9 confirmed steps with large images or diagrams; accuracy note |
| `/{lang}/quality/` | Hero (ultra-fine powder); four parameters; measurement; certifications table (pending) |
| `/{lang}/international-markets/` | Hero (aerial seine); who we serve; what to include; logistics table (pending) |
| `/{lang}/contact/` | Hero; direct contact; RFQ form (pre-fills product from `?product=`) |
| `/{lang}/privacy/` | Honest interim notice (full notice under legal review) |
| `/{lang}/credits/` | Attribution for every open-licence photo; AI disclosure |
| `/404.html` | Bilingual |

Not built: **Sustainability**. It is not in the approved sitemap and no verified facts exist (see `08_CONTENT_GAPS.md`).

## 5. Hero

A full-bleed **3840×2160** dawn photograph-style visualisation of a purse seiner heading to the coast, in First Light colour. It is visible at first paint (preloaded AVIF selected by a geometry-correct `sizes`, `fetchpriority=high`, never animated in). A light wash on the text side keeps the type legible without covering the photograph. The headline rises line by line in ≤ 0.6 s, the supporting content follows by 1.35 s, and a gentle parallax runs on scroll. On mobile the composition is reworked rather than shrunk: a 62svh photograph cropped to the vessel, with text below. In Arabic the photograph is mirrored so the vessel sits opposite the right-aligned text. The logo is never mirrored.

## 6. Photography

* **7 real photographs** (Wikimedia Commons; 3 × CC0, 4 × CC BY-SA), each 3840 px, captioned “Industry reference photo · author, licence” and attributed on `/credits/`.
* **19 AI visualisations** across 15 subjects, captioned “Illustrative visualisation”. Generated in Phase 02/03: 9 new product-accuracy images (4K hero, powder, oil, jars), 4 re-generated at 2K–4K to remove low-resolution sources, and earlier First Light images.
* **Fishmeal accuracy:** the first macro attempt was **rejected** after a 100% crop showed crumbly granules. The replacement (`powder-pressed`) shows an ultra-fine, smooth, velvety powder with a spatula-pressed face. The jars and the flow image were also checked for fine texture.
* **Crude oil accuracy:** thick, slightly cloudy golden-to-amber oil poured in a viscous ribbon and sampled from a tank. No consumer supplement imagery.
* **Low-resolution check:** the QA found an 840 px source stretched to 1512 px in the manufacturing hero, plus three other sub-1100 px sources. All four were regenerated from their originals at 2K/4K. `sizes` is computed from each box’s geometry so cover-cropped images get enough pixels on phones.
* **Honesty:** no image is presented as Alkhaleej’s plant, fleet, staff or product. No unconfirmed equipment (decanter, centrifuge, dryer, lab) is depicted.

## 7. Contact

* Email `alkhaleej@nobelbusinessgroup.com` → `mailto:` links on every page.
* Phones `+20 109 655 5525`, `+20 106 047 3790` → `tel:+201096555525`, `tel:+201060473790` (from the brand-book packaging “simulation data”).
* WhatsApp: **not added**, because no verified WhatsApp number exists.
* RFQ form: labelled, validated, bilingual errors and consent. On submit it opens the visitor’s email client with a structured inquiry, and no data is stored. Product buttons pre-fill the product (`/contact/?product=Fish%20Meal%2065%25#inquiry`).

## 8. SEO

Per-page localised `<title>` and meta description; `hreflang` alternates (en, ar, x-default); canonical; Open Graph basics; Organization JSON-LD with verified facts only (name, alternate Arabic name, founding year, region, email, phones); semantic headings (one `h1` per page); localised `alt` text; robots.txt. Pending the domain: absolute canonicals, `sitemap.xml`, OG image URLs.

## 9. Known limitations

1. Three AI sources (`aerial`, `sardine-spiral`, `powder-pressed`) are 2048 px. On 2×/3× screens they render at 1.3–2.5× density: no visible pixelation, but not full retina sharpness. Replace with real 4000 px+ photography.
2. The logo is a raster extracted from the brand PDF; a vector master is still needed.
3. The form uses `mailto:` until an email/CRM backend is chosen.
4. Real company photography is the largest remaining quality gap.
