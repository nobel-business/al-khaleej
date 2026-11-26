# 07 — Browser QA and Responsive Report

**Environment:** Chromium (Playwright headless shell 1248) against the running site on `localhost:3000`, with real scrolling, pointer and keyboard input. Lighthouse 12 for accessibility and performance.
**Viewports:** 1440 × 900, 1280 × 800, 768 × 1024 (touch), 390 × 844 (mobile, touch).

## 1. Automated sweep: 23 routes × 4 viewports
Routes: EN home, about, products hub, four product pages, raw materials, manufacturing, quality, international, contact, privacy, credits; AR home, raw materials, Fish Meal 65, about, quality, international, manufacturing, contact, products hub. Each was scrolled end to end.

| Check | Result |
|---|---|
| JavaScript / console errors | **0** |
| Failed requests (4xx/5xx) | **0** |
| Routes not returning 200 | **0** |
| Horizontal page overflow | **0** |
| Clipped / off-screen text | **0** (excluding the closed quick-view drawer, which is parked off-canvas by design) |
| Broken images | **0** |

## 2. Arabic direction check
Every element containing Arabic text on 12 Arabic pages at 1440 and 390 was tested for computed `direction: ltr` or a resolved left alignment.

| | Count |
|---|---|
| Before | 12 elements per page that carries the process diagram (stage labels) |
| After | **0** |

## 3. Interaction tests: 33 / 33 pass
New (17):

| Interaction | Result |
|---|---|
| Specification sheet: all 14 rows; Stated → 5; Pending → 1; On request (keyboard) → 8; empty groups hide; indicator sized | Pass |
| Parameter row expands with its definition | Pass |
| Comparison: hovering 72 % highlights all 7 cells of its column; grade bars animate | Pass |
| Products hub drawer still opens | Pass |
| Raw tabs: click switches tab, panel and image; ArrowRight moves focus and selection | Pass |
| Raw route scrubs with scroll (30 % → 75 %; separately 10/45/80/100 % drawn with 1/2/4/5 nodes lit) | Pass |
| Hero exit writes `--hx` while scrolling | Pass |
| Readiness-board row expands | Pass |
| Navigation order is the story order | Pass |
| Page transitions and prefetch rules present | Pass |

Earlier suite (16): drawer, dial keys and buttons, rail (8 chapters), console prefill, validation, review, back, theatre jump, mobile menu, dock, AR overflow. All pass.

## 4. Responsive review (screenshots in `qa-v2/after/`)

| Area | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| Navbar | 1 row, story order | 1 row | Burger, same order | Burger, same order; Home first |
| Heroes | Family compositions | ″ | Image-first stack | Image-first stack; type on ivory |
| Compositions | 5:7 / 7:5 / 1:1 | ″ | One column, image first | ″ |
| Specification sheet | 4-column rows | ″ | ″ | Label above value + status |
| Comparison | Grid with highlight | ″ | Swipeable cards | Swipeable cards |
| Raw profiles | Tabs + image + panel | ″ | Swipeable tab row | ″ |
| Raw route | Horizontal, scroll-drawn | ″ | Vertical timeline | Vertical timeline |
| Boards | Numbered rows | ″ | ″ | Status under the title |
| RTL | Mirrored | ″ | ″ | ″ |

## 5. Accessibility (Lighthouse)
100 on: EN home, AR home, EN/AR raw materials, products hub, Fish Meal 65, about, international, contact (desktop and mobile). Fixes made during QA:
* A link carrying `role="columnheader"` was restructured.
* Inactive catch captions and source-tab descriptions were raised to 4.5:1 contrast.
* Raw route labels stay fully readable before they are reached.
* Contact now has a proper h2 between the h1 and the footer headings.

## 6. Screenshots
| Folder | Contents |
|---|---|
| `qa-v2/before/` | Full-page strips before this round: EN raw materials, products, Fish Meal 65, about, quality, international, contact; AR raw materials |
| `qa-v2/after/` | The same pages after, plus EN home, manufacturing, AR Fish Meal 65, and 390 px strips for raw materials and Fish Meal 65 (EN + AR) |
| `qa-v2/interactions/` | Specification sheet (all, filtered, expanded); comparison highlight; raw profiles (before, mid-wipe, after); route (half, complete); hero settled and mid-exit; board expanded; navbar EN/AR |

## 7. Remaining limitations
* **Browsers:** only Chromium was tested; Safari/iOS and Firefox were not available here. View Transitions are Chromium-only and degrade to normal navigation elsewhere. Everything else uses widely supported CSS (sticky, clip-path, `text-wrap: balance` falls back to normal wrapping).
* **Mobile home performance:** 90 EN; Arabic varies with CPU throttling (see `06`). The cinematic opening loads more photography early than a static page would.
* **Photography:** AI images remain labelled as illustrative and Commons photos as industry references; real plant photography is still needed before launch.
* **Pending content:** species list, catch areas, fleet, ports, certifications, specifications and logistics terms are marked *Pending verification* and should be filled as the company supplies them.
