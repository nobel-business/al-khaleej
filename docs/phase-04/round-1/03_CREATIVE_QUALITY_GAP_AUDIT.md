# 01 — Creative Quality Gap Audit

**Compared:** Phase 03 production site (`site/`, git tag `phase-03-implementation`) vs the original prototypes, recovered unmodified from tag `phase-02-checkpoint` into `docs/phase-04/reference/`:
`03_VISUAL_DIRECTION_C.recovered.html`, `02_VISUAL_DIRECTION_B.recovered.html`. Direction A (both versions) is still in `docs/phase-02/`.

The audit is based on the actual source of each file (HTML, CSS and JS logic), not on screenshots.

## 1. What made Direction C distinctive (from its code)

| # | Technique | How C implemented it | Why it worked |
|---|---|---|---|
| C1 | **A living sea** | `<canvas id="sea">`: 240-fish boids flock (separation, alignment, cohesion), steering away from a cursor "lamp"; fish near the light flash warm white; surface light rays | The page is *alive* and marine before any copy is read; the cursor becomes a light under water |
| C2 | **Continuous descent** | `.depth` background gradient interpolated with scroll position (`lerpC`) from surface blue to abyss | One environment instead of separate blocks; each section feels deeper |
| C3 | **Depth rail + dock** | Fixed vertical rail of chapter dots with labels and an orange fill; mobile dock shows the current chapter plus a quote button | Orientation inside a long journey; chapters instead of a navbar |
| C4 | **The Line** | 420vh pinned section; SVG paths drawn by scroll (`strokeDashoffset`), nodes light as the line passes, particles flowing along `getPointAtLength`, live caption of the current stage | Manufacturing explained as motion: one input visibly splitting into meal and oil |
| C5 | **Grade instrument** | 270° SVG dial with needle; drag, click and arrow keys; outline numeral readout; specimen crossfade; data row | Products become something you *operate*, not cards you click |
| C6 | **Iris reveal** | `clip-path: circle()` scrubbed by scroll on the origin image | A cinematic aperture, echoing the circular net and the three-fish circle |
| C7 | **Instrument gauges** | Bezel ticks + sweeping marker on reveal | Quality as measurement without fake numbers |
| C8 | **Transparency ledger** | Stated today vs in preparation | Credibility from honesty |
| C9 | **Inquiry console** | 3-step form with progress bars and a review step | Ordering feels like specifying, not filling a form |
| C10 | **Typographic contrast** | Montserrat 200 + Cairo 700 in one headline (“From sea / **to industry.**”); corner readouts (location, est., products) | Instrument-like precision with drama |

## 2. What was lost in Phase 03

| Item | Phase 03 status |
|---|---|
| C1 living sea | **Lost**: no canvas, no cursor light anywhere |
| C2 continuous environment | **Lost**: fixed ivory/paper alternation; sections read as separate blocks |
| C3 depth rail / dock | **Lost**: only a 2px progress bar |
| C4 The Line | **Simplified**: static SVG that draws once on entry; no pinning, no live caption, no particles, no images per stage |
| C5 grade instrument | **Lost**: grades are buttons/links |
| C6 iris | **Lost** |
| C7 gauges | **Simplified**: static bezel, no sweep |
| C9 console | **Lost**: single long form |
| C10 type contrast | **Lost**: uniform Montserrat 300 |
| A signature: cursor light on specimens, dolly-in | **Lost**: replaced by a hover glint |
| Hero → next section | **Generic**: hero simply scrolls away; next block starts with a kicker and a statement |

## 3. Sections that became generic

* All inner pages share one hero template (`.phero`: photo + overlapping title card): 9 pages × the same layout.
* The same sequence repeats on most pages: kicker → two-line H2 → lede → split image → CTA band.
* A navy CTA band with the same image closes 11 of 14 pages.
* Product pages are four copies of one template, differing only by image and numeral.
* The manufacturing page is a vertical list of nine step rows: readable, but a timeline, not an experience.

## 4. Repetitive layouts (count, Phase 03, EN)

| Pattern | Pages |
|---|---|
| `.phero` hero | 9 |
| `.split` image/text | 12 placements |
| `.head` (H2 left, lede right) | 14 placements |
| CTA band (identical) | 11 |

## 5. Photography repetition (measured)

82 image placements on the English site use only **22 images**. Worst offenders: `aerial` 12 uses (the CTA band on 11 pages), `jar-65` 7, `oil-flask` 7, `jar-60`/`jar-72`/`powder-pressed` 6 each, `powder-hall` 5. Full table: `04_IMAGE_USAGE_AUDIT.md`.

## 6. What must be restored or redesigned (Phase 04 plan)

| Restore / redesign | Where | Technique |
|---|---|---|
| Hero as the opening scene of a film, with a **dive** transition | Home | Pinned hero; full photo at frame 0; camera push, headline splits, water line rises and reveals the underwater world; the C1 living sardine school appears beneath the surface |
| Continuous environment | Whole site | Page background interpolates per chapter: dawn ivory → sea mist → steel → meal sand → oil amber → ivory (A palette only) |
| Depth rail + dock (C3) | Home | Chapter rail with labels; mobile dock |
| The catch | Home | Pinned **horizontal** photographic sequence (real photos), large frames |
| The Line (C4) | Home teaser + Manufacturing page | Home: scroll-scrubbed two-stream diagram with flowing particles. Manufacturing page: pinned **plant theatre** with stage images wiping into one another, live stage caption, diagram nodes, clickable stage index |
| Grade instrument (C5) | Home (fish meal chapter), product hub | Dial with drag, keys and readouts |
| Powder fineness interaction | Home + fish meal pages | Cursor/touch **loupe** magnifying the ultra-fine texture |
| Crude oil light | Home + oil page | Cursor-driven warm backlight through the oil (A signature) + layered parallax |
| Specimen shelf (A signature) | Products hub | Sunlight follows the cursor; selecting a specimen opens the drawer |
| Gauges sweep (C7) | Quality | Sweep on reveal |
| Iris (C6) | Home "ready to ship" + International hero | Scroll-scrubbed circle aperture |
| Console (C9) | Contact | 3 steps with review |
| Type contrast (C10) + corner readouts | Hero, chapter titles | Montserrat 300/600 pairing |
| Distinct page openings | Each inner page | No shared hero template; each page opens with its own composition and image |
| No repeated CTA image | All pages | CTA band uses the brand's official three-fish pattern instead of a photo |
| Photography | Whole site | 11 new chapter images + 5 additional open-licence photos; every major chapter gets its own primary image |

**Engineering decision:** no animation library is added. The site already has an event-driven scroll engine. Pinned sections use `position: sticky` and one rAF-batched progress calculation per visible section, which is lighter than GSAP + ScrollTrigger (~35 KB gzip). The only continuous loop (the sardine school) runs only while visible and not reduced-motion.
