# 04 — Motion Language (production)

**Principle:** *Photography is visible immediately; motion only reveals text, draws diagrams and responds to the visitor.* This revises the Phase 02 approach, where the hero image grew from a small window on scroll, which the product owner rejected.

## 1. What changed from Phase 02

| Phase 02 (Direction A evolution) | Phase 03 production | Reason |
|---|---|---|
| Hero image started as an arched window and expanded on scroll | Hero photograph is full-bleed from the first frame; no expansion | “Images must be large from the beginning” |
| Images revealed by scaling up (`scale(1.14→1)`) | No image scaling except a ≤ 6–10% parallax translate on full-bleed photographs | “Avoid excessive scaling of images” |
| Cursor light / dolly-in shelf | Specimen tiles are large static photographs with a light glint on hover; a quick-view drawer replaces the dolly | Keeps the A signature without shrinking images |
| Horizontal pinned corridor | Vertical alternating step layout with large images | Images large and readable; no scroll-jacking |
| Engagement-gated ambient beams | Removed | No continuous movement |

## 2. Techniques kept from Directions B and C

| Technique | Origin | Where |
|---|---|---|
| Masked line rise for headings (`.ln`) | B | Every `h1`/`h2` (hero: on load; sections: on scroll) |
| Curtain reveal: a paper curtain slides off a full-size image | B (wipe), reworked | Selected large images (alternating with fade so not every image animates the same way) |
| Hairline / underline draw | B | Nav links, `.param` top rule, link underlines |
| Scroll-drawn flow that splits into meal + oil streams | C | Two-stream diagram (`stroke-dashoffset`, 2.2s once on entry) |
| Instrument bezel | C | Quality parameter cards |
| Reading progress | C (depth rail, simplified) | 2px orange line under the header |
| Parallax depth | B (vessel chapter) | Hero, page heroes and bleeds (`translate3d` only, visible elements only) |

## 3. Tokens

| Token | Value |
|---|---|
| `--out` | `cubic-bezier(.16,1,.3,1)`: arrivals, hovers |
| `--io` | `cubic-bezier(.7,0,.2,1)`: curtains, diagram, menu wipe |
| Hero entrance | eyebrow 0.05s → headline lines 0.10/0.18s → sub 0.32s → actions 0.42s → meta 0.55s; total ≤ 1.35s; the photograph is never delayed |
| Section reveal | 0.9–1.0s, stagger 80 ms |
| Curtain | 1.05s |
| Diagram draw | 2.2s |
| Micro | 0.25–0.45s |

## 4. Engineering rules

1. No permanent animation loops. Scroll work is batched into one rAF per frame.
2. Parallax runs only for elements currently in view (IntersectionObserver set).
3. Animated properties: `transform`, `opacity`, `stroke-dashoffset` and `clip`-free transforms. No animated filters, blur, clip-path or custom properties.
4. Reveals are one-shot (`unobserve` after entry).
5. Without JavaScript (`.js-off`) all content is visible.
6. `prefers-reduced-motion`: all durations → 0, parallax off, curtains removed, headings shown.
7. RTL: curtains and underline draws originate from the inline-start edge; diagrams are mirrored.
