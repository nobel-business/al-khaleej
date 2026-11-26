# 07 — Motion Language: "Light arrives"

**Applies to:** `01_VISUAL_DIRECTION_A.html` (First Light evolution). The previous dark version is preserved as `01_VISUAL_DIRECTION_A_v1_dark.html`.

## 1. One principle

> **Nothing simply appears. It is lit.**

Every motion in the site behaves like morning light reaching an object: it rises from below or from the horizon, it sweeps across surfaces, it opens like an aperture, and it settles without bounce. This single idea lets techniques taken from Directions B and C feel native to Direction A instead of being a collage.

Supporting rules:
1. **Motion carries meaning.** It reveals, focuses, connects (process flow) or responds (pointer light). There are no idle ornaments beyond the slow ambient light drift.
2. **Calm physics.** Strong ease-out, no overshoot, no spring bounce (from the owner's video reference).
3. **Content first.** The headline is readable within ~0.6 s, and all hero content within ~1.2 s.
4. **Compositor-first.** Animate `transform` and `opacity`. `clip-path` is used only for single scroll-linked surfaces.

## 2. Motion tokens

| Token | Value | Use |
|---|---|---|
| `--out` | `cubic-bezier(.16,1,.3,1)` | Arrivals, settles, camera, light inertia |
| `--io` | `cubic-bezier(.7,0,.2,1)` | Wipes, sweeps, overlays (deliberate start and finish) |
| Micro | 150–300 ms | Hover colour, chips, buttons |
| Reveal | 900–1100 ms | Text line rises, fade-ups |
| Image wipe | 1250 ms (+1800 ms image settle) | Section photographs |
| Camera | 600 ms | Specimen dolly-in, pan between grades |
| Light inertia | 800 ms (CSS transition) | Sun follows the pointer; lens follows the pointer (900 ms) |
| Stagger | 80–120 ms | Lines, specimens, plaques |
| Ambient | 24 s / 31 s alternate | Window light beams drifting. Starts only after the visitor's first scroll, pointer, key or touch; paused off-screen |
| Idle demo | every 2.6 s | Light visits each specimen when an engaged visitor goes idle (hero visible only) |

## 3. Technique inventory: what came from where

| Technique | Origin | How it lives in A now | Implementation |
|---|---|---|---|
| **Cursor = light** on the specimen shelf | A (video DNA) | Now *sunlight*: a warm screen-blended glow follows the pointer; the nearest specimen loses its haze, gains a glint sweep and shows its label | Event-driven `pointermove` → one rAF → `transform` (no permanent loop); `.lit` class |
| **Glint / flash** on the lit specimen | A | Diagonal light sweep across glass, once per arrival | Pseudo-layer `translateX` keyframe |
| **Dolly-in + side drawer**, ← → pan, Esc | A (video DNA) | Kept; drawer is now ivory; the rest of the room fades under an ivory veil | Shelf `transform` (translate + scale), 600 ms |
| **Masked line rise** for headings | **B** (editorial hero) | Every section heading enters line by line | `overflow:hidden` line + `translateY(108%)→0` |
| **Clip-path wipe + image settle** | **B** (chapter images) | Photographs rise from below like light over a horizon; the image settles from 1.14× | `clip-path: inset()` + `transform: scale` |
| **Cursor lens reveal** | **B** (hero band) | "From the sea": the sardine spiral sits under a morning haze; a circular lens of clear water follows the pointer and drifts on its own when idle | Rebuilt as a **transform-only** lens (moving circle + counter-moving image), so the compositor runs it |
| **Hairline draw** | **B** (rules) | Quality plaques draw an orange top line on hover; reading-progress hairline under the header | `scaleX` from left |
| **Continuous camera / no page cut** | **C** (The Line) | **Signature transition:** on scroll, the hero's arched dawn window opens to a full-bleed seascape, and "From sea to industry" settles in the sky. The room and shelf sink away below. | One scroll-linked variable `--p` drives `clip-path` geometry, image scale, copy fade and shelf drop |
| **Scroll-drawn flow with lighting nodes, split into two streams** | **C** (The Line) | Above the A corridor: a line draws as you travel through the nine stations and splits at *Pressing* into a navy **meal stream** and an orange **oil stream**; nodes light as the light passes | SVG paths revealed by a clip rectangle (one attribute per frame) |
| **Iris reveal** | **C** (Origin) | "International": the aerial circular seine opens through a widening circle (the circle motif) | Scroll-linked `clip-path: circle()` + image scale |
| **Instrument bezels** | **C** (gauges) | Small bezel icon on each quality plaque, with no values (honest) | Static inline SVG |
| **Progress rail** | **C** (depth rail) | Simplified to a 2 px orange reading-progress line in the header | `scaleX` |
| Sunrise veil | New | Hero window: a sand veil lifts upward to reveal the dawn sea (sunrise from the horizon) | `scaleY` 1→0, 1.15 s |
| Ambient light beams | New | Two skewed light shafts drift slowly across the ivory wall | `transform` keyframes, paused when off-screen |

### Considered and deliberately not used
| Technique | Origin | Reason |
|---|---|---|
| Blur-to-sharp reveals | C | `filter: blur` animation is expensive on mobile; the masked rise gives the same "focus" feeling cheaply |
| Floating product preview following the cursor | B | It duplicates A's own product interaction (light + dolly) and would compete with it |
| Canvas fish school (flocking simulation) | C | A permanent animation loop. It conflicts with the performance requirement, and the lens section carries the marine story instead |
| Sticky image cross-fade storytelling | B | A's horizontal corridor is a stronger, preferred structure |
| Multi-step inquiry console | C | A content/IA decision, not motion; it can be reconsidered in Phase 03 |

## 4. Hero sequence (desktop)

| t (s) | Event | Purpose |
|---|---|---|
| 0.00 | Ivory room with a warm glow in the upper-left is painted immediately (no blank screen) | Atmospheric opening |
| 0.10 → 1.9 | Two light beams fade in; they begin their slow 24 s / 31 s drift once the visitor engages | Living environment without a never-settling page |
| 0.12 → 1.27 | Sand veil lifts off the arched window, revealing the dawn sea from the horizon up | Timed image reveal |
| 0.20 | Eyebrow fades up | Orientation |
| 0.38 / 0.50 | Headline lines rise ("Four marine ingredients," / "seen in first light.") | Typography entrance |
| 0.62 → 1.92 | Four specimens rise onto the sill, staggered by 100 ms | Product-as-hero (video DNA) |
| 0.78 / 0.90 | Paragraph, then CTAs | Supporting content |
| 1.10 | Bottom-left meta (Arabic tagline, location, hint) | Supporting content |
| after engagement | If the visitor then goes idle for 2.4 s, the light visits each specimen every 2.6 s | Teaches the interaction |
| On scroll | Window opens to full-bleed sea (`--p` 0→1). Copy rises out, shelf sinks out, then "From sea to industry." settles (`--q`) | Cinematic transition to the next chapter |

**Mobile** keeps the same story without pinning: an arched dawn window (portrait crop, vessel kept in frame), an overlapping ivory copy card, then a swipeable shelf where the centred specimen is lit. The bottom sheet replaces the dolly.

## 5. Interaction states

| Element | Rest | Hover / focus | Active |
|---|---|---|---|
| Specimen | Light sand haze (34%) | Haze clears, 3.5% scale, glint sweep, label rises | Dolly-in + drawer (desktop) / bottom sheet (touch) |
| Buttons | Solid orange with navy text, or outline | Arrow gap widens (450 ms) | — |
| Contact rows | Hairline list | Indent 10 px, text to chip colour | — |
| Plaques | Paper card | Lift 6 px, sunlight sweep, orange top line draws | — |
| Index overlay | — | — | Wipes down (`clip-path`), links rise in with 45 ms stagger |

## 6. Reduced motion

`prefers-reduced-motion: reduce` gives:
- all durations → ~0 and all delays removed
- headings and reveals shown in their final state
- the hero is not pinned and does not expand; the full-bleed "From sea to industry" frame is skipped
- the lens doesn't drift, the idle light demo doesn't run, and the corridor shows every station lit
- the iris shows fully open

## 7. Performance rules (enforced in code)

1. No permanent `requestAnimationFrame` loops. Pointer handlers schedule at most one frame; the scroll engine runs one rAF per scroll event batch.
2. Scroll-linked work runs only for sections currently near the viewport (IntersectionObserver flags).
3. Decorative infinite animations (beam drift, lens drift, idle light demo) start only after the first visitor engagement (`body.engaged`) and pause off-screen (`.stage.off`, lens `auto` class toggled by IO). An untouched page settles completely after the 1.9 s entrance, so it is cheap for battery, Speed Index and blocking time.
4. Animated properties are limited to `transform` and `opacity`. `clip-path` is used for 3 scroll-linked or one-shot surfaces only. No animated filters, no animated custom properties (the v1 lens drift was rewritten because custom properties cannot run on the compositor).
5. Measurement (`getBoundingClientRect`, `offsetLeft`) never runs during initial parsing. It is deferred to the moment a section approaches.
6. Off-screen sections use `content-visibility: auto`; corridor stations are built only when the corridor approaches.
