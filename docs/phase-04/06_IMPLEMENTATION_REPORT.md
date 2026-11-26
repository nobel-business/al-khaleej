# 06 — Implementation Report

## Files changed

| File | Change |
|---|---|
| `site/src/system.css` | **New.** Unified design system: spacing, type, widths, composition classes, hero family, status pills, specification sheet, comparison, readiness board, source profiles, route, interaction states, page transitions, responsive rules. Loaded last. |
| `site/src/build.mjs` | Hero family helpers (`heroCopy`, `opBleed` with `short` variant); data components (`specSheet`, `compare`, `board`, `stPill`, parameter definitions); new **Raw Materials** page; Products hub (hero + comparison); product pages (framed hero + specification sheet); About (5:7 composition, readiness ledger); Quality / International (readiness boards, compositions); Contact (short hero band); Privacy / Credits (plain hero); navigation order (desktop, mobile, footer); Speculation Rules prefetch; Arabic diagram text direction; footer phone runs; loads `system.css` |
| `site/src/main.js` | Scenes may define their own progress; hero exit; specification-sheet filter; comparison column highlight; source-profile tabs (keyboard); route drawn by scroll |
| `site/src/cinema.css` | Catch caption dimming raised to an accessible contrast |
| `docs/phase-04/*` | This document set; the earlier recovery round moved to `round-1/` |

No URLs changed, no pages were added or removed, `DATA/` was untouched and the logo was not modified.

## What changed, by priority

1. **Global system:** one spacing scale (chapter rhythm 72–120 px instead of up to 300 px), one type scale (body 17/18 px at weight 400; labels ≥ 12.5 px), one composition system (5:7, 7:5, 1:1, sheet 4:7, product 5:7 with capped image heights).
2. **Navigation:** story order `Home · About · Raw materials · Manufacturing · Products ▾ · Quality · International · Contact`, identical on desktop, mobile and footer (`03`).
3. **Hero family:** every page opens with the same anatomy and motion. Raw Materials, Products, Contact and the product pages were brought into the family.
4. **Motion and transitions:** cross-page View Transitions with a persistent header and prefetch on intent; hero entrance settle and scroll-linked exit; data state animations; the route; the tab wipe (`04`).
5. **Typography and spacing:** applied through tokens; inline font-size overrides on heroes removed.
6. **Composition:** product heroes no longer use a half-screen image; About and International portraits are capped and paired with 7/12 copy.
7. **Data presentation:**

   | Before | After |
   |---|---|
   | Product spec table | Filterable, expandable **specification sheet** |
   | Products range table | **Comparison** with column highlight and grade bars |
   | Quality certification table, International logistics table, About ledger | **Readiness boards** with expandable meaning and a stated / in-preparation meter |

8. **Raw Materials:** complete rebuild (`05`).
9. **Interactions:** buttons (fill sweep, focus ring), links (direction-aware underline), cards (lift), tabs, accordions, filters and highlights, all keyboard-accessible.
10. **Responsive:** every composition collapses intentionally. The comparison becomes swipeable cards, the route becomes a vertical timeline, and tabs become a swipeable row.

## Interactions implemented in this round

| Interaction | Page | Keyboard |
|---|---|---|
| Status filter with moving indicator; groups collapse when empty | Product pages | Tab + Enter/Space |
| Expandable analysis parameters with definitions | Product pages | Enter/Space (`<details>`) |
| Column highlight in comparison | Products hub | Focus on product header |
| Source-profile tabs with image wipe | Raw materials | Arrows, Home, End |
| Route drawn by scroll | Raw materials | — (scroll) |
| Expandable readiness rows | Quality, International, About, Raw | Enter/Space |
| Hero exit (scroll-linked) | All full-bleed heroes | — |
| Page transitions + prefetch | All | — |

All earlier interactions still pass (home dive, catch, line, loupe, dial, oil light, gauges, iris, theatre, specimen light, drawer, console, rail, dock, menus).

## Facts and data
No new company facts were introduced. New explanatory text is limited to generic definitions of what standard parameters and documents mean (for example "TVN — a widely used indicator of raw-material freshness"; "Incoterms — the delivery terms that define where costs and risk pass to the buyer"). Every company-specific item that is not verified appears as **Pending verification**.

## Image usage
48 visible placements of 38 images: 28 used once and 10 used twice. No image is used more than twice. The Raw Materials page uses five images that appear nowhere else.

## Performance (Lighthouse, median of 2)
| Page | Desktop | Mobile | CLS |
|---|---|---|---|
| Home EN | 100 | 90 | 0 |
| Home AR | 100 | 66* | 0 |
| Raw materials | 100 | 97 | 0 |
| Products hub | 100 | 94 | 0 |
| Fish Meal 65 % | 100 | 96 | 0.001 |
| Manufacturing | 100 | 88 | 0 |
| Contact | 100 | 97 | 0 |

\*Arabic home mobile blocking time is dominated by Arabic text shaping on a 4×-throttled CPU (measured in round 1: about 510 ms vs 290 ms for English with all CSS removed) and varied by more than 2× between runs.

Accessibility: **100** on every audited page, desktop and mobile, EN and AR. Best practices: 100. SEO: 85, because canonical and hreflang URLs await a production domain.
