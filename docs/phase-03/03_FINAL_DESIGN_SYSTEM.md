# 03 — Final Design System: First Light

Source of truth: `site/src/styles.css` (tokens at `:root`). This document explains the rules behind it.

## 1. Colour

| Token | Hex | Role |
|---|---|---|
| `--ivory` | `#F7F2EA` | Page ground (default) |
| `--paper` | `#FBF8F3` | Raised surfaces: cards, forms, title bands, alternate sections |
| `--cream` | `#EFE6D8` | Image placeholders, gradient section ends |
| `--sand` / `--stone` | `#E4D4BB` / `#D9CDBA` | Tonal depth (sparingly) |
| `--champagne` | `#C9A96E` | Reserved highlight (not used for text) |
| `--ink` = brand navy | `#0C3048` | Headings, body emphasis, buttons outline, footer ground |
| `--ink-2` | `#3A5265` | Body text (7.3 : 1 on ivory) |
| `--ink-3` | `#5E6B73` | Secondary/meta text (4.9 : 1 on ivory) |
| `--chip` | `#8A5300` | Orange-family text: kicker numbers, chips, links accents (5.7 : 1) |
| `--orange` = brand orange | `#E38B06` | CTA fill (navy text, 5.2 : 1), hairlines, progress bar, diagram oil stream |
| `--navy-2` | `#163D58` | Hover |

Rules:
* Orange is **never** text on light backgrounds (2.4 : 1 fails). Orange-family text uses `--chip`.
* White text never sits on orange.
* Navy is the only large dark surface: footer and one CTA band per page (over a 32%-opacity photograph). No other dark sections.
* Brightness comes from ivory/paper grounds plus photography, not flat white.

## 2. Typography

| Role | Latin | Arabic | Size |
|---|---|---|---|
| Display (`.h1`) | Montserrat 300, −0.03em | Cairo 600, line-height 1.3 | clamp(40px → 96px) |
| Section (`.h2`) | Montserrat 300, −0.02em | Cairo 600 | clamp(30px → 58px) |
| Sub (`.h3`) | Montserrat 400 | Cairo 600 | 21 → 26px |
| Statement | Montserrat 300 | Cairo 600 | clamp(26px → 46px) |
| Lede | Montserrat 300 | Cairo 400 | 16 → 19px |
| Body | Montserrat 300 / 16px / 1.65 | Cairo 400 | 16px |
| Kicker | Montserrat 500, 11.5px, 0.18em caps, orange rule | Cairo 600, 14px, no tracking | |
| Grade numeral (product pages) | Montserrat 300, 84 → 168px | same digits | |

Fonts are self-hosted variable subsets: Montserrat Latin 300–600 (38 KB) and Cairo Arabic 400–700 (31 KB). They use `font-display:swap`, a metric-matched Arial fallback (`size-adjust 112%`) to limit layout shift, and only the page-language font is preloaded. Western digits are used in Arabic (Phase 01 D-06 recommendation). Arabic letter-spacing is always 0.

## 3. Layout

* Container: `min(1320px, 100% − 2 × gutter)`, gutter `clamp(20px, 4vw, 64px)`.
* Section rhythm: `clamp(80px, 12vh, 150px)` vertical padding; `.tight` variant.
* Header: 76px (68px mobile), transparent over the home hero, then a solid paper bar with blur and a 2px orange reading-progress line.
* Logical properties throughout (`inset-inline`, `padding-inline-start`, `text-align:start`), so RTL mirrors automatically.

## 4. Image presentation rules (photography-first)

| Pattern | Use | Rules |
|---|---|---|
| **Full-bleed hero** (`.hero`) | Home | Photograph fills the viewport at first paint (preloaded AVIF, `fetchpriority=high`); never animated in. Only a soft light-wash gradient on the text side. |
| **Page hero** (`.phero`) | Inner pages | Photograph 72svh full width; title band overlaps the bottom edge on a paper card. |
| **Bleed + card** (`.bleed`) | Chapter breaks | 92svh full-width photograph, card anchored to one corner (becomes a stacked layout on mobile). |
| **Split** (`.split`) | Narrative + image | 1.25 : 1, image 4:3 or 4:5. |
| **Feature** (`.feature`) | Product families | 12-col editorial: large 3:2 image (7 cols) + portrait image + text. |
| **Specimen shelf** (`.shelf`) | Product browsing | 4 large 3:4 tiles (2 × 2 on mobile, never thumbnails), label overlay, light glint on hover. |
| **Gallery** (`.gallery`) | Product pages, raw materials | 1 tall + 2 stacked. |
| **Product top** (`.pp-top`) | Product pages | Half-screen photograph + grade numeral and actions. |

Never: images smaller than about 30% of the viewport width for primary subjects; images that grow from small; heavy overlays (maximum 72% light wash on one side of the hero only); upscaled sources (the pipeline caps widths at source size); blur.

Captions: a pill in the image corner, either “Illustrative visualisation” (AI) or “Industry reference photo · author, licence” (link to credits).

## 5. Components

Buttons (`.btn.primary` orange/navy, `.btn.line`, `.btn.light`), text link with orange underline (`.link`), chips (`.chip`, `.chip.v`), spec table (`.spec-table`), parameter cards (`.param`, with instrument bezel SVG), two-stream diagram (`.streams`, horizontal + vertical variants), ledger lists, product quick-view drawer, RFQ form, and a footer with four columns.

## 6. Accessibility baseline

WCAG 2.2 AA colour contrast; visible focus ring (navy 2px); skip link; one `<h1>` per page; labelled form fields with inline errors and `aria-live` status; drawer is a modal dialog with focus trap and Escape; menu buttons expose `aria-expanded`; `lang`/`dir` set per page; decorative SVGs `aria-hidden`; all images have localised `alt`.
