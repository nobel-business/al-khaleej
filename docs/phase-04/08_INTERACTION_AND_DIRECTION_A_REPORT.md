# 08 — Overlap Fixes, Direction A Restoration, Three-Fish Orbit, New Interactions

Screenshots and recordings: `docs/phase-04/qa-v3/`. Before = the site at the start of this round, shown in `qa-v2/after/`.

## 1. Text overlap: how it was found, and what was fixed

### Method (in the browser, during animation)
A detector (`overlap.js`, Chromium) walks every page in steps of one third of the viewport. After each step it samples the page **four times: 0, 150, 450 and 900 ms**, so in-flight transitions are measured as well as resting states. Each time it collects every visible text line box. A box counts as visible when the opacity product of its ancestors is ≥ 0.2, and it is clipped by every `overflow` / `clip-path` ancestor. Any two different text runs whose boxes intersect are reported.

Excluded, because they are not visible collisions:
* the opaque fixed header and the rail/dock passing over content;
* successive lines of one text block (tight leading overlaps the line boxes, not the glyphs);
* captions on stacked image layers that are fully covered by the image above;
* content of *closed* `<details>`.

Coverage: 20 pages (10 EN + 10 AR) × 4 widths (1440, 1280, 768, 390).

### Defects found and fixed

| # | Where | What was overlapping | Root cause | Fix |
|---|---|---|---|---|
| 1 | Manufacturing theatre (EN + AR, all wide viewports) | The outgoing stage text (number, title, description, stream chips) under the incoming one, both partially visible (e.g. "Receiving" 36% under "Conveying" 64%) | Both texts were `position:absolute` in the same slot and cross-faded with the same 0.45 s transition, so for ~0.4 s both were readable at once | Strict hand-off: the outgoing text leaves in 0.16 s (opacity + 10 px lift, then `visibility:hidden`); the incoming text starts only after a 0.2 s delay. The two can no longer be visible together |
| 2 | Grade instrument readout (home, fish meal pages; EN + AR) | The 112 px numeral's glyph box intruded into the label above and the product name below | `line-height:.9` on a display numeral: the glyph box (≈1.2 em) was taller than the line box, with no margins | `line-height:1.05` and margins of .12 em above / .06 em below |
| 3 | Product drawer (products hub, all widths) | "COMMERCIAL PROTEIN GRADE" touching its value "65%" | The drawer override set the label cell's inline padding to 0, so a long uppercase label met its value | The label cell wraps, takes 46% of the width, and keeps an 18 px gap |
| 4 | Catch sequence captions (home) | — (contrast, not overlap) | Inactive captions were dimmed to 45% | Dimmed to 90% (passes 4.5:1) |
| 5 | Mobile products room | Breadcrumb tight under the arched window | No spacing between the window and the copy block | 32 px separation at ≤ 980 px |

**Final sweep result:** see §7.

## 2. Product presentation vs Direction A

Reference: `docs/phase-02/01_VISUAL_DIRECTION_A.html`, served at `http://localhost:8080/01_VISUAL_DIRECTION_A.html`.

In Direction A, `#markets` is the international chapter: a card with the inquiry list beside a circular aperture onto the purse-seine net. The **product presentation** is the opening `#room`: the specimen room.

| Direction A (approved) | Implementation before this round | What was lost |
|---|---|---|
| Products are introduced as **one still life**: four specimens standing on one sunlit stone sill, in front of a warm wall with drifting window beams and grain, under an **arched window onto the sea** | Products hub: a full-bleed photo hero, then **four separate framed cards** in a grid | The single composition; the arched window; the beams; the sill; products as part of the scene rather than catalogue tiles |
| Specimens rest slightly dimmed; a **sun follows the cursor**; the lit specimen brightens, scales 3.5%, a **glint sweeps the glass**, and its number and name appear | Cards with a sun overlay and a static label bar on every card | The glint, the name appearing only when lit, the dim/lit contrast |
| Selecting a specimen **dollies the camera in**: the shelf translates and scales so the chosen jar fills the space beside a sliding drawer, with an ivory veil; previous / next keeps the camera moving | The drawer opened over a dark scrim; the shelf did not move | The dolly-in and the ivory veil |
| Headline "Four marine ingredients, seen in first light." with an "est. 2025" kicker | "Marine ingredients for feed manufacturing." | The product-led headline |
| `#markets`: card with the six-item inquiry list beside the circular aperture | Home iris card without the inquiry list | The inquiry list |
| Mobile: horizontal snap shelf | Two-column card grid | The shelf metaphor on mobile |

## 3. Restored product presentation (products hub)
`site/src/build.mjs` → `pages.products`; styles `site/src/signature.css` (`.ra*`); behaviour `site/src/main.js` ("Direction A specimen room").

* **Room composition:** warm wall gradient with two drifting light beams. An arched window (rounded top, inset frame, settle-in photo) shows the sunrise vessel. The four specimens overlap slightly on one stone sill, with soft-masked edges so they read as one continuous still life.
* **Copy:** crumbs → kicker → "Four marine ingredients, / **seen in first light.**" → lede with the verified product line → *View the specimens* (focuses the shelf) / *Compare*.
* **Light:** the cursor-driven sun lights the nearest specimen. It brightens, the glint sweeps the glass, and its number and name rise. Keyboard focus lights a specimen in the same way; on touch, the specimen in view is lit.
* **Dolly-in:** opening a specimen translates and scales the shelf so the chosen jar sits centred in the free space beside the drawer, under an ivory veil. Previous / next (and ←/→) re-dolly to the new specimen. Esc or close returns to the resting shelf. The geometry comes from untransformed layout offsets, so re-dollying during a transition lands exactly. It is RTL-aware: in Arabic the drawer is on the left and the camera centres in the right-hand space.
* **Product morph:** each shelf specimen and its product-page hero share a `view-transition-name` (`spec-fish-meal-65`, …). In Chromium, following *View product* morphs the jar from the shelf into the product page hero.
* **Mobile:** snap-scrolling shelf with names visible; tapping opens the drawer.
* The comparison, packing and CTA sections follow the room unchanged. No product data was added.

## 4. Three-fish orbit (signature motion)
Placed on **About → Our symbol** (interactive) and in the **home company chapter** (quiet, decorative).

**Artwork.** These are original SVG fish, not the logo. The logo must not be altered or recreated, so its fish were not extracted or reused. Each fish is a fusiform silhouette with a deep-teal back shading to a silver belly, a champagne sheen and a fine lateral highlight. It has dorsal, pectoral and pelvic fins, a gill line, an eye with a catch-light, and a **forked tail on its own pivot**. No species is named or implied.

**Motion model** (`main.js` → "three-fish orbit", about 50 lines):
* One shared phase θ advances at 2π / 22 s, scaled by an eased speed factor. Each fish is placed at θ + i·120° on an orbit tilted to a 0.5 ellipse, so this is a circle seen in perspective. Every fish is positioned independently every frame; **no group rotation**.
* **Depth:** front fish are larger (scale .72 → 1.06), more opaque and higher in z-order, and cast a deeper shadow (`--d` drives the drop-shadow). Back fish recede.
* **Heading:** each fish turns along the tangent of its path (pitch damped to 55% for a natural glide). When swimming left it **mirrors instead of turning upside-down**, as a fish seen from the side does.
* **Tail beat:** each tail oscillates ±11° (0.9 s, phase-offset per fish), slowing to 1.6 s while the orbit is slowed.
* **Loop:** continuous phase, so there is no visible restart point.

**Interaction**
* Hovering eases the orbit to 22% speed.
* Selecting a fish (click / tap / Enter) or one of the three meanings, **Unity · Harmony · The cycle of life**, highlights both and slows the orbit to 35%. These meanings come verbatim from the brand guidelines: "three fish swimming in a circle symbolise unity, harmony and the cyclical nature of life — and abundance".
* Fish and meanings are real buttons with `aria-pressed`.

**Performance and accessibility**
* The loop runs only while the orbit is on screen (IntersectionObserver) and writes only `transform`, `opacity`, `z-index` and one custom property. `contain: layout paint` and a fixed aspect ratio mean no layout shift.
* With `prefers-reduced-motion`, the fish rest 120° apart, the tails stop, and selection still works.

**Measured in the browser**

| Check | Result |
|---|---|
| Angular spacing in 6 frames over 7.2 s | 120/120/120° every frame |
| Speed, normal → hovered | 16.6 → 3.7 °/s |
| Depth order | Changes as each fish passes the front |
| Reduced motion | Transform identical after 1.5 s |

Recordings: `qa-v3/recordings/three-fish-orbit.webm`, `three-fish-orbit.gif`.

## 5. New interactive elements

| Element | Where | What it explains | Input |
|---|---|---|---|
| Specimen room: light, glint, dolly-in, drawer, prev/next | Products hub | The range as one composition; each product's facts in place | Mouse, keyboard (Tab/Enter, ←/→, Esc), touch |
| Shelf → product morph | Products hub → product pages | Continuity between overview and detail | Navigation |
| Three-fish orbit + meanings | About, Home | The brand symbol and its verified meaning | Mouse, keyboard, touch |
| **Explorable process diagram**: hover, tap or tab to any stage to show its description and stream; the stage's branch is highlighted and the other dimmed | Manufacturing, all product pages | How one input splits into meal and oil, stage by stage | Mouse, keyboard, touch |
| **Inquiry checklist**: tick what you can tell us; the count updates and the quote button carries the selection into the contact console's requirements field | International → Contact | What a buyer should prepare; it shortens the form | Mouse, keyboard, touch |
| Inquiry list in the iris card (Direction A markets) | Home | What to include in an inquiry | — |

Interactions from earlier rounds remain: dive, catch, line, loupe, dial, oil light, gauges, iris, theatre, specification-sheet filter, comparison highlight, source tabs, route, readiness boards, console.

## 6. Files changed

| File | Change |
|---|---|
| `site/src/signature.css` (new) | Orbit, specimen room, dolly, flow diagram, checklist, iris inquiry list, drawer label fix, morph timing |
| `site/src/build.mjs` | `orbit()` / `orbitMeanings()` and the fish SVG; About symbol section; home company orbit; products hub room; product hero morph name; explorable diagram markup and data; International checklist; iris inquiry list; loads `signature.css` |
| `site/src/main.js` | Orbit engine; room light and dolly; drawer events; flow diagram; checklist; contact `need` prefill |
| `site/src/cinema.css` | Theatre text hand-off; grade readout metrics; catch caption contrast |

## 7. Browser QA (Chromium, final build)

### Text overlap, including mid-animation
| Sweep | Result |
|---|---|
| 1440 / 1280 / 768: 20 pages (EN + AR), 4 time samples per scroll step | **0 overlaps** |
| 390: first run | 2 defects: (a) home "Beneath the surface" card over the underwater photo caption; (b) About / Raw / Contact (EN + AR) breadcrumb over the hero caption |
| 390: after fixes | **0 overlaps** |
| Reduced motion, 1440 (home, about, manufacturing, products, raw) | **0 overlaps** |

The 390 root causes:
* (b) On phones the hero copy becomes `position:relative`, but the desktop `bottom` inset from the system layer still applied. A relative element with `bottom` is shifted up, so it moved 60 px into the photo. Fixed with `inset:auto` at ≤ 760 px.
* (a) Wherever a card deliberately overlaps a photo's lower edge in stacked layouts, the photo caption now sits on the top edge.

### Functional suites
| Suite | Result |
|---|---|
| Round-1 interactions (drawer, dial, rail, console, theatre, mobile menu, dock…) | 16 / 16 |
| Round-2 interactions (spec sheet, comparison, source tabs, route, boards, nav, transitions) | 17 / 17 |
| This round (flow diagram mouse + keyboard; checklist → contact prefill; home orbit; iris inquiry list; morph names; mobile room tap; mobile meaning tap; reduced-motion orbit and tails) | 13 / 13 |
| Orbit motion | 120/120/120° in every frame; 16.6 °/s → 3.7 °/s on hover; selection by click and keyboard |
| Specimen room | Light follows the cursor; dolly-in centres the chosen jar beside the drawer (EN, drawer right; AR, drawer left); → / ← re-dolly; Esc resets the transform |
| 23 routes × 4 widths: console errors, failed requests, broken routes, horizontal overflow, clipped text | **0** |
| Arabic direction check (12 pages × 2 widths) | **0** Arabic runs resolving LTR or left-aligned |
| Lighthouse accessibility (desktop) | 100: products (EN/AR), about, home, manufacturing, international. Fixed during QA: `role="listitem"` on buttons (specimen shelf and theatre index) |

### Screenshots (`qa-v3/`)
* `before/`: products hub, about, manufacturing, international before this round; **Direction A reference** room and markets.
* `after/`: products (EN, AR), about (EN, AR), home, manufacturing, international.
* `interactions/`:

  | Topic | Files |
  |---|---|
  | Room | `room-1-rest`, `room-2-light-glint`, `room-3-dolly-drawer`, `room-4-next`, `room-ar-rest`, `room-ar-dolly` |
  | Orbit | `orbit-frame-a`, `orbit-frame-b`, `orbit-selected` |
  | Process diagram | `flow-oil-stage`, `flow-meal-stage` |
  | Checklist | `inquiry-checklist` |
  | Mobile (390 px) | `390-m-room-top`, `390-m-room-shelf`, `390-m-room-drawer`, `390-m-orbit` |
* `recordings/`: `three-fish-orbit.webm` + `.gif`, `specimen-room.webm`, `manufacturing-theatre.webm` (real browser screencasts).

## 8. Remaining limitations
* View-transition morphs between pages are Chromium-only; other browsers navigate normally.
* Only Chromium was tested (no Safari or Firefox in this environment).
* The fish are original illustrations of a generic fusiform fish. They depict no particular species and make no claim about the catch.
