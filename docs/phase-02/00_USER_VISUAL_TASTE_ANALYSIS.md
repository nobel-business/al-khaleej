# 00 — Product Owner Visual Taste Analysis

**Reference:** `DATA/WhatsApp Video 2026-11-24 at 10.24.26 PM.mp4`
**Format:** 384×848 portrait screen recording, 14.0 s, 60 fps, 839 frames.
**Method:** Every frame was decoded. Frames were inspected sequentially at 0.25 s intervals (56 frames), with a frame-difference motion timeline (one sample per 0.17 s) to time each transition. The monitor area was cropped and studied separately from the Instagram UI.

Labels used: **[OBS]** = observed fact in the video · **[INT]** = design interpretation.

---

## 1. What the video is

- [OBS] An Instagram Reel (account handle `gencsloworks.jo`, caption "…بمستقبل تصميم المواقع") recorded on a phone. It films a desktop monitor showing a website. The overlay stickers alternate between **"مواقع 2027 🔥"** (2027 websites) and **"مواقع 2026 😐"** (2026 websites), plus **"راسلنا خاص لموقعك"** (DM us for your website).
- [OBS] The **"2027"** website: a fictional footwear store, **"LEDGE — The Flash collection"**, browser title "LEDGE | The Flash collection".
- [OBS] The **"2026"** website (shown 10.2–11.4 s): the same brand built as a conventional e-commerce page, with a pastel hero banner ("Ten pairs, picked by hand." / "Knit, mesh and suede."), a carousel, primary and secondary buttons, a "New arrivals" grid of product cards with "Add to cart" buttons, and a top nav (New in · Runners · Trail · Court · High-tops · Knit · Sale).
- [INT] The reel's argument, which the product owner endorsed by sharing it: **the conventional card-grid site is "2026 😐". The immersive, object-centred, physically lit experience is the future.** The owner is asking us to stay as far as possible from template e-commerce and corporate layouts.

## 2. Timeline of the "2027" experience (observed)

| Time | Event |
|---|---|
| 0.0–0.3 s | **Hero = the product wall.** A taupe/stone plaster wall with two long floating glass shelves. Ten sneakers stand on them in a 5 × 2 rhythm. Lower-left copy in a neutral grotesk: **"Ten pairs. / Made for the flash."** plus a tiny caption line ("…a pair to fire the flash. Click for sizes."). Chrome is almost invisible: tiny "LEDGE" wordmark top-left, a breadcrumb-like "The Flash collection · Latest arrivals", a small "Bag" pill top-right. |
| 0.3–2.2 s | **Cursor as a light source.** As the pointer moves, a soft warm spotlight follows it across the wall. The shoe under the cursor **"flashes"**: its reflective stripes go bright white as if hit by a camera flash, and its name and price fade in beneath it in small type ("Apertura High · 130 JOD"). Shoes outside the pool of light fall back into dim ambient. Light-follow latency is short but visibly smoothed (≈100–200 ms ease). |
| 2.3–2.8 s | **Click → camera dolly-in.** The wall scales up around the clicked shoe (Safelight Trail) in about 0.4–0.5 s with a strong ease-out. Neighbouring shoes stay partly visible at the frame edges, so spatial context is kept. At the same moment a **dark charcoal drawer slides in from the right** (≈22% of the width). |
| 2.8–5.2 s | **Drawer content:** index "03 / 10", product name (medium weight), a one-line material descriptor, price, a small "Flash on" toggle pill, a size grid (39–45, 3 × 2), and a full-width primary button that changes to **"Add to bag · 140 JOD"** once a size is picked. "‹ Previous" sits at the bottom-left of the drawer. Under the drawer the shoe stays lit and centred. |
| 5.3–5.7 s | **Next product = lateral camera pan** along the shelf (≈0.4 s). The previous shoe slides off left, the next one (Cyanotype Runner) slides to centre. The drawer content cross-fades without the drawer closing. |
| 6.3–7.2 s | A second pan to "Highlight Knit". At the end of the shelf an **architectural light slot** (vertical warm LED line in the wall) comes into view. The environment has edges and depth. |
| 7.35–7.8 s | **Exit = dolly-out** back to the full wall (largest motion spike in the timeline), drawer retracts. |
| 8.0–10.1 s | More cursor-light exploration: the light pool tracks the pointer to the upper-right corner, then across the lower shelf. Each shoe flashes in turn. |
| 10.2–11.4 s | Cut to the "2026" version (contrast). |
| 11.5–14.0 s | Back to the "2027" wall, cursor sweeps again. Loop. |

Motion timing extracted from frame differences: UI micro-states ≈ 150–250 ms. Camera moves (dolly/pan) ≈ 350–500 ms, ease-out dominant, no bounce. Light-follow is continuous, smoothed, never snapping.

## 3. Design DNA — what the product owner appreciates

### 3.1 Visual language
| # | Characteristic | Evidence | Interpretation |
|---|---|---|---|
| V1 | **Product-as-hero, no banner** | [OBS] The first screen *is* the merchandise wall; there is no hero image with a headline overlaid in the conventional sense. | [INT] Show the actual offer immediately. For Alkhaleej, the four products should be visible early, not three scrolls down. |
| V2 | **Physical, gallery-like environment** | [OBS] Real plaster texture, glass shelves, cast shadows, a lit wall slot. | [INT] The page feels like a *place*, not a document. Depth, material and light carry the premium feel. |
| V3 | **Monochrome environment, colour comes from the objects** | [OBS] Neutral taupe wall. The products hold the colour accents. | [INT] Use navy as the "room" and let product materials (golden meal, amber oil, silver fish) be the colour. Orange stays a rare signal. |
| V4 | **Very low text density** | [OBS] Two short lines of headline, one micro-caption, tiny chrome. | [INT] Concept-led copy, fewer words, larger silence. |
| V5 | **Small, neutral, precise typography** | [OBS] Grotesk sans, regular/medium weights, small sizes for UI, no decorative type. | [INT] Typography should be a quiet instrument. Hierarchy comes from scale and spacing, not weight or colour. |
| V6 | **Consistent, high-end lighting across all imagery** | [OBS] Every shoe is lit by the same warm key light from above. | [INT] All imagery must look like one shoot: same light direction, same colour grade. |

### 3.2 Motion & interaction language
| # | Pattern | Evidence | Interpretation |
|---|---|---|---|
| M1 | **Cursor = light** | [OBS] A spotlight follows the pointer; the hovered object reacts. | [INT] The signature move. The interaction *expresses the product story* (reflective shoes, made for the flash). For Alkhaleej: light reveals silver sardine scales, amber oil glowing when back-lit, and the texture of the meal. Light means inspection, clarity and quality. |
| M2 | **Hover reveals identity** | [OBS] Name and price appear only for the lit item. | [INT] Progressive disclosure. Labels are quiet until asked for. |
| M3 | **Click = camera move, not page change** | [OBS] Dolly-in to the object; context preserved at the edges. | [INT] Spatial continuity. The visitor never "leaves" the room. |
| M4 | **In-context spec drawer** | [OBS] Right-side drawer with index, name, descriptor, options, single CTA. | [INT] For B2B: grade, family, packing, spec status and **Request a Quote for this grade** as the single primary action. |
| M5 | **Sequential browsing by pan** | [OBS] Previous/next pans along the shelf; drawer persists. | [INT] Products feel like a collection in one space. "01 / 04" indexing. |
| M6 | **Calm physics** | [OBS] Ease-out moves of 0.35–0.5 s, no bounce, no overshoot, no flashy page transitions. | [INT] Premium = restraint and smoothness, not quantity of animation. |

### 3.3 Experience design
- [INT] **Story through interaction, not paragraphs.** "Made for the flash" is a two-word concept that the interaction proves. Alkhaleej needs an equivalent one-line concept that its interaction demonstrates, e.g. light revealing quality.
- [INT] **Attention is guided by light.** Whatever is lit is what matters. Everything else recedes.
- [INT] **Information on demand.** The first impression is emotional (the wall). Details appear only after intent (hover → click).
- [INT] **What makes it premium:** a real-feeling environment, perfect consistency of light, very little chrome, interactions that respond with fluid physics, and a single clear action per state.

## 4. What must NOT be copied literally

- The LEDGE brand, its products, its copy ("Ten pairs. Made for the flash."), the taupe/brown palette, the glass-shelf wall as a literal layout clone.
- Retail mechanics: prices, size grids, "Add to bag", cart pill. Alkhaleej sells B2B by inquiry. There are no public prices and the CTA is **Request a Quote**.
- The ten-item 5 × 2 grid. Alkhaleej has **four** products (Fish Meal 60% · 65% · 72% · Crude Fish Oil).
- Any implication that our AI imagery shows real stock, a real warehouse or the real factory. Every image is labelled "Illustrative visualisation".

## 5. Translation into Alkhaleej's brand & business context

| Reference principle | Alkhaleej translation |
|---|---|
| Product wall hero | A **specimen shelf** of the four products: three fish-meal grades in glass specimen jars and crude fish oil in a glass vessel. Navy "room", warm gallery light. |
| Cursor = flash of light | **Inspection light.** The cursor is a lamp. It makes meal granules glow golden, oil glow amber, sardine scales flash silver. Concept line candidates: *"Under the light, quality shows."* / *"Measured in the light."* (copy for approval). |
| Hover reveals name/price | Hover reveals **grade + family + packing** (no prices, no unverified specs). |
| Dolly-in + drawer | **Grade drawer:** "02 / 04 · Fish Meal 65% · Commercial protein grade · 50 kg bags · Specifications: available on request" plus **Request a Quote for this grade** (pre-fills the RFQ). |
| Pan between items | Previous / next grade, keyboard arrows supported. |
| Monochrome room, coloured objects | Navy #0C3048 / abyss tones as the environment. Products carry gold/amber. Orange #E38B06 only for the active state and CTAs (navy text on orange for AA contrast). |
| Small precise type | Cairo + Montserrat Light at small, well-spaced sizes for UI. Large, quiet display type only for one concept line per scene. |
| Calm physics | 350–500 ms ease-out camera moves, 150–250 ms UI states, smoothed light-follow, full reduced-motion fallback. |

## 6. How each Phase 02 direction uses this DNA

| Direction | Relationship to the reference |
|---|---|
| **A — "The Specimen Room"** | **Closest adaptation.** Product-shelf hero, cursor-as-inspection-light, hover reveal, click dolly-in, right-hand grade drawer, prev/next pan. The rest of the site keeps the "room" feeling: dark, lit, low density. |
| **B — "Tidal Editorial"** | **Same DNA, different philosophy.** Light-mode luxury editorial. The "light reveals" principle becomes **mask reveals**: a cursor lens uncovers the sardine school's silver flash in the hero. Products become an editorial index where hovering a row brings its object into focus (hover reveal). Drawer becomes a full-height spec sheet. Restraint, whitespace and object focus are kept. |
| **C — "The Line"** | **Ambitious alternative.** One continuous scroll-driven space (the camera never cuts): sea → vessel → plant → two-stream process → product instrument → inquiry. A live canvas sardine school reacts to the cursor light. The process splits into two glowing streams. Products sit on a grade "instrument". The reference's continuity, light-led attention and calm physics are pushed further. |
