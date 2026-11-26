# 01 — Current State Diagnostic

**Scope:** the running site at `http://localhost:3000` (static build from `site/src`), EN + AR, inspected in Chromium at 1440, 1280, 768 and 390 px. Every page was loaded, scrolled end to end and checked for console errors, failed requests, broken routes, overflow and clipped text. The code was inspected to explain each symptom.

## 1. Primary root cause: the browser was running the old script

| Finding | Evidence |
|---|---|
| The preview server sent `/assets/main.js` with `Cache-Control: public, max-age=31536000, immutable`, but the file name never changed between builds. HTML (with inlined CSS) was `no-cache`. | `site/serve.mjs` line 13; `curl -I` confirmed the header. |
| A browser that had opened the Phase 03 site kept the **Phase 03 `main.js` for a year**, while receiving the **new Phase 04 HTML and CSS**. | Reproduced: served the current HTML with the Phase 03 script (`git show phase-03-implementation:site/src/main.js`). |

**What that mismatch looks like (reproduced in the browser):**

| Expected | What a cached browser showed |
|---|---|
| Hero dives under the water line into the sardine school | Hero frozen; no water line, no school, no "Beneath the surface" card |
| Horizontal catch sequence (4 frames) | One clipped frame; the section never pins or moves |
| Grade instrument (dial) | **Empty box:** the SVG had 0 children because the old script never builds it |
| 3-step inquiry console | **Empty form:** all three panes `display:none`, only a "Continue" button |
| Plant theatre (9 stages) | Stuck on stage 1; index buttons dead |
| Depth rail labels / chapter colour changes | Dots only; background never changes |
| Loupe, oil light, specimen sunlight | No response |

This alone explains the reported symptoms: "missing animations", "no interactions", "visually broken elements".

**Fix:**
* The build writes the script as `main.<content-hash>.js`, so every change gets a new URL.
* Old copies are removed from `dist`.
* The server sends `immutable` **only** for hashed scripts, `/img/` and `/fonts/`; everything else is `no-cache`.

Verified: `/assets/main.13a96e5ccc.js → immutable`, `/assets/brand/pattern.webp → no-cache`. *If an old tab is still open, one reload is enough; it then picks up the new hashed script.*

## 2. Intermediate builds were visible while the server was live

The site was rebuilt many times during Phase 04 while port 3000 stayed up. Several intermediate builds contained bugs that were later fixed. If the site was opened during that window, these were visible:

| Bug | Cause | Status |
|---|---|---|
| "One input. Two streams." stuck at the top-left over the header on every screen | New `.top` class collided with the site header's fixed `.top` | Fixed (`.lc-top`) |
| Giant orange arch and outline arch over the hero and oil chapter | New `.row` and `.line` section classes collided with a 240vh base rule and the `.btn.line` button variant; buttons became 2160 px tall | Fixed (`.dv-row`, `.theline`) |
| Raw-materials image pane hidden; contact panes fighting it | `.pane` used by two components | Fixed (`.cpane`) |
| Hero text not fading on scroll | Entrance `animation-fill-mode: both` held opacity at 1 | Fixed (filter/translate keyframes) |
| Arabic site shifted 200 px sideways, blank strip on the left | Specimen "sun" (520 px) overflowed to the left; in RTL that becomes scrollable | Fixed (`overflow:clip`) |
| Arabic hero photo offset 324 px | RTL mirror pivoted around the 62 % camera-push origin | Fixed |

## 3. Defects found by this audit (all fixed)

| # | Page / viewport | Defect | Cause | Fix |
|---|---|---|---|---|
| 1 | Contact · 390 px | Form and heading 494 px wide in a 390 px screen; right side cut off | Two inputs per row; intrinsic input width ≈ 211 px | Single column ≤ 640 px; `min-width:0` on grid children |
| 2 | Home · all | Line caption said "09 · INPUT" for packing | Stream-label map knew only oil/meal | Full map: Input / Split / Oil stream / Meal stream / Both streams |
| 3 | Home · 390 | "2025" overlapped "Established" | Numeral wider than its 96 px column | 104 px column, 34 px numerals |
| 4 | Home · 390 | Catch captions cramped into one-word lines | Title and text forced side by side | Two-row caption grid |
| 5 | Home · < 900 px | Live stage caption repeated the last stage | Diagram is static on small screens | Caption hidden < 900 px |
| 6 | Home · all | Depth rail drawn over the dark CTA and footer | Rail always visible | Rail and dock hide after the last chapter |
| 7 | Home · desktop | The line appeared fully drawn when the chapter was reached by a jump (anchor, rail) | Scene became visible after the frame had run | Observer entry schedules a frame |
| 8 | Home · desktop | Rail labels covered the line card | Active label always shown | Labels on hover or focus only |
| 9 | Home · keyboard | Dial ignored the first arrow key after tabbing to it | Lazy build raced the focus | Focus triggers the build |
| 10 | Home · catch | Inactive frames dimmed to 55 %, washing out photographs | Opacity on the whole frame | Only captions dim; photos stay at full strength |
| 11 | Products, product pages | Same specimen jars 6–7 times per site | Shelf on home + hub + "other products" photo grid | Typographic cards; jars only on hub + own page |

## 4. Performance defects found

| Defect | Effect | Fix |
|---|---|---|
| Environment colour written as a custom property on `<body>` every scroll frame | Whole-document style recalculation on every frame | Writes `background-color` directly, only when it changes |
| The loupe set its 2048 px JPEG as a background at start-up | 352 KB downloaded on every home visit | Loaded on first hover or tap |
| All scenes measured geometry at boot (env sections, track width, path lengths) and interleaved reads and writes | Forced layouts; mobile LCP render delay ≈ 3 s | Lazy initialisation per scene; one read phase then one write phase per frame |

## 5. Homepage architecture

The homepage told the sea → plant → product story but had **no company or credibility chapter** and no clear "where to go next" from the story. Now:

| # | Chapter | Purpose (what the visitor learns) |
|---|---|---|
| 1 | Opening: "From sea / **to industry.**" | Who: Alkhaleej Fish Manufacturing, est. 2025, Kafr El-Sheikh. What: fish meal and crude fish oil. Explore / quote |
| 1b | Beneath the surface | Raw material: whole marine fish, including sardines, from own vessels, ports, cold storage |
| 2 | The catch | The maritime world, from boat to receiving pit (real port photography) |
| 3 | The line | Industrial capability: one input, two streams; why it matters; link into the plant |
| 4 | Fish meal | Product 1: ultra-fine powder (loupe) in 60 / 65 / 72 % (instrument, links to each grade) |
| 5 | Crude fish oil | Product 2: thick golden-to-amber oil (light through oil), link to product |
| 6 | Quality | The four measured parameters; link to quality |
| 7 | **The company (new)** | Credibility from verified facts only (est. 2025, 3 grades, crude oil, 9 confirmed stages, 2 streams, 50 kg bags/drums) + links to About, Products, Manufacturing |
| 8 | Ready for the world | International buyers |
| 9 | Contact | Quote + email |

## 6. Direction C source

The original Direction C prototype was **recovered from git** (tag `phase-02-checkpoint`) into `docs/phase-04/reference/03_VISUAL_DIRECTION_C.recovered.html`; this is the actual file, not a reconstruction.

Its motion uses **no GSAP or ScrollTrigger**: it is vanilla `requestAnimationFrame` (×3), `IntersectionObserver`, SVG `strokeDashoffset` and `getPointAtLength`, plus a canvas boids simulation. The restored engine uses the same techniques: `05_CINEMATIC_ARCHITECTURE.md` maps each C technique to its new implementation.

## 7. Clean results after fixes

* Console errors: **0** on all 18 audited routes × 4 viewports.
* Failed requests (4xx/5xx): **0**.
* Broken routes: **0**; all pages return 200.
* Page-level horizontal scroll: **0**.
* Off-screen or clipped text: **0**, apart from the closed quick-view drawer, which is intentionally parked off-canvas.
* Interaction test suite: **16 / 16 pass** (drawer, dial keys and buttons, rail, console validation, prefill, back/next, theatre jump, mobile menu, dock, AR overflow).
