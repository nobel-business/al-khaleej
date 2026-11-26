# 05 — Design Decisions (Phase 02)

Records every decision taken while building the three explorations, why it was taken, and what still needs the product owner.

## 1. Approved inputs applied

| Item | Applied as | Source |
|---|---|---|
| Contact email | `alkhaleej@nobelbusinessgroup.com` (mailto links + RFQ destination) | Owner approval, Phase 02 brief |
| Contact phone | **+20 109 655 5525** and **+20 106 047 3790** (`tel:` links) | "Existing simulation data" = the packaging label mockup in `AL KHALEEJ BD.pdf` p.25–26, which shows both numbers (`01096555525 · 01060473790`). This is the only Alkhaleej-specific phone data in the project. |
| English naming | **Alkhaleej Fish Manufacturing** (D-05 recommendation in Phase 01) | `docs/phase-01/00_README_AND_DECISIONS.md` |
| Arabic name | الخليج لصناعة الأسماك (logo form) | Brand PDF p.4 |
| Facts | Only items marked CONFIRMED in Phase 01 `02_CONTENT_INVENTORY.md` | Phase 01 |

> ⚠ **Please confirm:** the brief says "the approved phone number" (singular), but the mockup carries two numbers. Both are shown. Tell us if only one should remain.

### Phones deliberately *not* used
The Nobel Business Group website project (`lasteditsnobel/nobel-frontend`) lists group phones `+966 541 252 773` / `+966 507 062 900`. These are Saudi group lines, not Alkhaleej's, so they were not used.

### Naming conflict found (needs a decision)
The same Nobel site names this company **"Gulf Fish Manufacturing"** in English (`src/content/en.ts`, id `gulf-fish`) and describes its oil as **"Fish oil (Omega-3)"**. The prototypes follow the approved Phase 01 naming (**Alkhaleej**) and do **not** repeat the Omega-3 claim (unverified: no EPA/DHA data). → **D-16:** align the English name across both sites. → **D-17:** should the Alkhaleej site mention being part of Nobel Business Group? (The email domain implies it; the prototypes currently do not state it.)

## 2. Assets

| Asset | Origin | Method | Notes |
|---|---|---|---|
| `logo-primary.png` | PDF p.4 | Pixel extraction + background removal by colour unmixing against the known white ground | Exact brand pixels; no redrawing. ~1013 px wide. |
| `logo-reversed.png` | PDF p.7 (navy panel) | Same, against #0C3048 | Approved colourway: white wordmark + orange icon on navy. |
| `logo-on-orange.png` | PDF p.7 (orange panel) | Same, against #E38B06 | Extracted for completeness; unused. |
| `icon-orange.png` | PDF p.13 | Same, against navy | Used only as a quoted brand symbol in B. Never rotated or animated. |
| `pattern-orange-navy.jpg`, `pattern-orange-alpha.png` | PDF p.21 | Raster crop | Extracted for later use; not used in Phase 02 prototypes. |
| 11 photographs (`*.jpg`) | AI-generated (ElevenLabs · `gpt-image-2.5-sunburst`, 1280×720) | One art-direction brief: navy room, single warm key light, medium-format look, no text/logos | ~2,090 credits spent (11 × ~190). All captioned "Illustrative visualisation". |

`IMG_2829.PNG` was **not** used (off-brand, see Phase 01).
**Production note:** the PDF logo rasters are sharp at header sizes but will soften on large retina hero use. The vector master (Phase 01 gap G-10) is still required.

## 3. Cross-direction decisions

| # | Decision | Rationale |
|---|---|---|
| X-1 | Same content, same images and same logo files in all three directions | Isolates design philosophy as the only variable, for a fair comparison |
| X-2 | Video reference applied at three intensities (A close, B translated, C extended) | Owner's explicit request in the Phase 02 brief |
| X-3 | Orange CTA buttons use **navy text on orange** (5.20 : 1) | White on orange fails WCAG (2.64 : 1), per Phase 01 |
| X-4 | Logo never animated beyond opacity/position; never rotated, glowed or distorted | Brand book p.9; D-09 |
| X-5 | RFQ opens a pre-addressed email instead of a fake "sent" message | No backend exists. Honest and still functional for review. |
| X-6 | Unverified data shown as chips: *Available on request*, *Pending verification*, *Capacity pending*, *Full address pending* | Phase 01 placeholder convention |
| X-7 | "Premium", Omega-3, certifications, capacity, export history and customer names omitted | Phase 01 prohibited-claims list |
| X-8 | English-first prototypes with Arabic typographic accents (taglines, product names, chapter names); full RTL mode not built | Phase 02 brief focuses on visual exploration. Full RTL belongs in the chosen direction's build (D-08: EN default). |
| X-9 | Self-contained HTML (inline CSS/JS, no frameworks). Only external dependency: Google Fonts (Cairo, Montserrat). | Opens by double-click; no build step |
| X-10 | Every motion has a `prefers-reduced-motion` path | Accessibility requirement (Phase 01 §7) |
| X-11 | Grade numbers never animate as "counting up" | Counters would imply measured values |

## 4. Direction-specific decisions

**A — The Specimen Room**
- Light-follow computed per specimen (distance falloff) instead of duplicate masked layers, which stays robust under camera zoom.
- An idle autonomous light sweep (as the reel's demo cursor does), so the effect reads even before the visitor moves the mouse.
- The header's actions hide while zoomed, so the drawer owns the interface (mirrors the reference).
- Mobile replaces the dolly with a snap carousel + bottom sheet (hover-less devices).

**B — Tidal Editorial**
- Cairo Bold at display scale for Latin headlines, following the brand book (p.17) rather than the Phase 01 brief's Montserrat-headline wording (D-04 remains open).
- Hero lens replaces the cursor flash: duotone base, full-colour reveal under the lens.
- Manufacturing on a sticky stage with step-synchronised wipes. On mobile the stage shrinks and the active-step trigger moves lower so text is never covered.

**C — The Line**
- Procedural canvas school (240 fish desktop / 110 mobile, DPR capped at 2) instead of video: interactive, light-reactive, tiny payload.
- Flow diagram re-laid out vertically on mobile (not scaled down) for legibility.
- Dial limited to the three commercial grades. The scale 55–75 is a reading aid, not a spec range.
- Transparency ledger: a novel credibility device. Owner approval needed before it goes public (D-18).

## 5. Validation performed (headless Chromium 156, desktop 1440×900 + mobile 390×844 touch)

| Check | A | B | C |
|---|---|---|---|
| Console / page errors | none | none | none |
| Broken images | none | none (after fix) | none |
| Horizontal overflow | 0 px | 0 px | 0 px |
| Fonts loaded (Cairo, Montserrat incl. Light 300) | ✓ | ✓ | ✓ (also Montserrat 200) |
| Navigation (anchors, index/menu, Esc) | ✓ | ✓ | ✓ (rail + mobile dock) |
| Signature interaction | light-follow → flash ✓; dolly + drawer ✓; ← → ✓ | lens ✓; floating preview ✓; spec sheet ← → Esc ✓ | school reacts ✓; flow draws 2→5→11 nodes ✓; dial click/drag/keys ✓ |
| Product → RFQ pre-fill | ✓ | ✓ | ✓ (radio pre-selected) |
| Form validation messages | ✓ | ✓ | ✓ per step |
| Contact details shown | email + both phones ✓ | ✓ | ✓ |

Issues found during QA and fixed: visible tile edges and headline/shelf overlap (A); Arabic "65%" bidi order (A); header covering the drawer close button (A); hero overflow below the fold, empty company column, mobile caption overlap, mobile sticky stage covering text (B); flow label collisions and rail overlap (C); Arabic alignment in the readout (C); fixed logo over text on mobile (C).

Integrity: SHA-256 of all `DATA/` files and all `docs/phase-01/` files re-checked after the build and identical to the pre-build baseline.

## 6. Open decisions for the product owner

| ID | Decision |
|---|---|
| **D-19** | **Select a direction** (A, B, C or a defined hybrid) for Phase 03 |
| D-04 | Latin headline face: Cairo Bold (B, C) vs Montserrat (A) |
| D-16 | English name: "Alkhaleej Fish Manufacturing" vs "Gulf Fish Manufacturing" (Nobel site) |
| D-17 | Mention Nobel Business Group affiliation? |
| D-18 | Approve the public "transparency ledger" concept (C) |
| D-20 | One or both phone numbers? WhatsApp-enabled? |
| D-21 | Approve the AI image set for production, or commission real photography of the facility/products |
| D-22 | Dark-first (A, C) vs light-first (B) brand presence |
