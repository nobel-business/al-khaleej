# 03 — Cinematic Architecture & Motion Implementation

The home page is now one continuous film: **sea → under the surface → the catch → the plant → fish meal → crude oil → quality → ready for the world → contact.** It is not a numbered timeline. Each chapter uses the technique that suits its content.

## 1. Engine (zero dependencies)

| Decision | Reason |
|---|---|
| **No GSAP / ScrollTrigger** | Pinning uses `position: sticky`, so the browser does the layout work and native scrolling stays intact (no scroll-jacking, no smooth-scroll library). One rAF-batched pass reads each visible scene's progress (`-top / (height − viewport)`) and writes CSS custom properties. This avoids roughly 35 KB gzip of library code. |
| **Scene registry + IntersectionObserver** | A scene's function runs only while the scene is within 15 % of the viewport. Off-screen chapters cost nothing. |
| **CSS does the drawing** | JS writes 1–4 numbers per scene (`--t`, `--w`, `--q`, `--ir`, `--v`…). CSS turns them into `transform`, `opacity` and `clip-path`. No layout properties are animated. |
| **One continuous loop only** | The sardine school canvas runs only while the hero is on screen, the dive has started, the viewport is ≥ 900 px and reduced motion is off. It stops on its own once hidden. |
| **Reveals** | One-shot IntersectionObserver (`[data-r]`, `[data-lines]`, gauges) that unobserves each element after it reveals. |
| **Reduced motion and < 900 px** | Every pinned scene falls back to a natural stacked layout (`height:auto`, no sticky). Images are shown in full, the canvas is not created, and the iris becomes a simple reveal. |

Files: `site/src/cinema.css` (the cinematic layer, loaded after `styles.css` and inlined at build time) and `site/src/main.js` (the engine).

## 2. Chapter by chapter

| # | Chapter | Technique | Origin |
|---|---|---|---|
| 1 | **Opening scene: the sea** (`.dive`, 260 vh pinned) | The hero photo is fully visible from frame 0. On scroll the camera pushes in (`scale 1.04→1.16`); the two headline lines split in opposite directions (thin "From sea" up-left, bold "to industry." up-right); a **water line with foam rises** (`clip-path: inset()` + SVG foam), the camera **dives** and reveals the sardine school. A card "Beneath the surface" arrives. | New; C's descent idea and type contrast |
| 1b | **Living school** | Canvas boids (90–130 fish: separation, alignment, cohesion), drifting toward a moving point and avoiding the cursor "lamp"; fish near the light glow warm. Fish are drawn over the photo in First Light colours. | C1, restyled |
| — | **Environment** | The `<body>` background interpolates between chapter colours (dawn ivory → sea mist → steel → meal sand → oil amber → paper). Every chapter feels like a change of light, not a new block. | C2, in the A palette |
| — | **Depth rail + dock** | Fixed chapter rail with an orange fill; labels appear on hover or focus. On mobile, a dock shows "0N chapter" plus a quote button. Both hide once past the last chapter. | C3 |
| 2 | **The catch** (`.hz`, pinned) | **Controlled horizontal storytelling**: vertical scroll drives a horizontal track of four large frames (boats → sardines → port → receiving pit). The active frame's caption brightens, with a progress bar and a 01/04 counter. Images are never dimmed. RTL scrolls the other way. | New |
| 3 | **The line** (`.theline`, 240 vh pinned) | Full-bleed processing hall behind a card. The two-stream diagram is **drawn by scroll** (main → meal and oil branches), nodes light as the line passes, particles flow along the drawn length, and a live caption names the current stage. | C4 |
| 4 | **Fish meal** | **Loupe**: a 2.6× lens follows the cursor (tap to toggle on touch) to inspect the ultra-fine texture. **Grade instrument**: a 270° dial with needle, arc fill and outline numeral readout (drag, click, arrow keys, buttons) that links to the chosen grade. | New + C5 |
| 5 | **Crude oil** | Layered composition (tall pour + parallax sight-glass image). **Warm light follows the cursor** through the oil (radial light, `mix-blend-mode: screen`). | A signature |
| 6 | **Quality** | Laboratory photograph + four **instrument gauges** whose markers sweep on reveal. No fabricated readings. | C7 |
| 7 | **Ready for the world** (`.iris-sec`, 190 vh pinned) | **Iris**: a circular aperture (`clip-path: circle()`) opens with scroll over the circular purse-seine net, echoing the three-fish circle; title fades, then a card arrives. | C6 |
| 8 | **Contact** | CTA band built on the official brand pattern. | — |

### Inner pages: each opens differently

| Page | Opening composition | Signature interaction |
|---|---|---|
| About | Editorial full bleed, title on image (`boats-dusk`) | Symbol panel on the brand pattern, transparency ledger |
| Raw materials | **Sticky split**: text scrolls past a pinned photograph | Gallery reveals |
| Manufacturing | **Plant theatre** (pinned, n × 90 vh): nine stage images **wipe** into one another (direction-aware clip), live stage text, clickable stage index (meal/oil colour coding) | Index jump; mobile stacked fallback |
| Quality | Editorial bleed (`q-sampling`) | Sweeping gauges |
| International | Editorial bleed (`l-loading`) | — |
| Products hub | **Specimen room**: cursor sunlight across the shelf lights the nearest specimen (scroll-lit on touch); selecting one opens the **drawer** (focus trap, ←/→, Esc) | A signature |
| Product pages | Specimen + grade numeral | Fish meal: loupe + dial pre-set to the grade. Oil: light through oil + layered drums |
| Contact | Typography-first (“Specify. **Request a quote.**”) | **3-step console**: product chips (pre-filled from `?product=`), validation per step, review, mailto | C9 |

## 3. Accessibility & RTL

* All pinned scenes are ordinary document content: headings, links and captions stay in the DOM and in reading order. The rail and dock are real links.
* The dial is a `role="slider"` with `aria-valuenow`/`valuetext` and arrow keys; the grade buttons use `aria-pressed`; the readout is `aria-live="polite"`.
* The drawer is a modal dialog with a focus trap that returns focus on close. The theatre index uses `aria-current="step"`.
* RTL: the horizontal track, theatre wipes and headline split mirror; the hero photo is mirrored around its centre; numeric counters are bidi-isolated (“01 / 09”); `html, body { overflow-x: clip }` prevents RTL off-canvas scroll.
* AI images keep the "Illustrative visualisation" caption, and Commons photos keep author + licence, including during transitions. Only one caption is visible at a time on the dive stage.
