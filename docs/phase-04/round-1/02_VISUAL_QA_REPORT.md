# 02 — Visual QA Report

**Build:** `site/dist` from `site/src` (script `main.<hash>.js`), served at `http://localhost:3000`.
**Browser:** Chromium (Playwright headless shell 1248, the same engine as Chrome), real rendering, real scrolling and pointer input.
**Viewports:** 1440 × 900 (desktop), 1280 × 800 (laptop), 768 × 1024 (tablet, touch), 390 × 844 (mobile, touch).
**Languages:** English and Arabic (RTL).

All screenshots are in `docs/phase-04/qa/`.

## 1. Automated checks: 18 routes × 4 viewports

Routes: EN home, about, products hub, 4 product pages, raw materials, manufacturing, quality, international, contact, privacy, credits; AR home, manufacturing, contact, products hub. Each page was loaded and scrolled end to end so lazy images and reveals run.

| Check | Result |
|---|---|
| JavaScript errors / console errors | **0** |
| Failed requests (4xx / 5xx) | **0** |
| Routes not returning 200 | **0** |
| Page-level horizontal scroll | **0** |
| Clipped or off-screen text | **0** (excluding the closed product drawer, which is parked off-canvas by design) |
| Broken images | **0** |

## 2. Interaction tests (real input in the browser): 16 / 16 pass

| # | Interaction | Result |
|---|---|---|
| 1–3 | Product drawer: opens on the selected specimen, → moves to the next product, Esc closes and returns focus | Pass |
| 4–5 | Grade instrument: arrow key moves 65 → 72 and updates the link; grade button selects 60 | Pass |
| 6 | Depth rail lists all 8 chapters | Pass |
| 7 | Contact console: `?product=` pre-selects the product | Pass |
| 8–12 | Console: step 1 blocks without a country; step 2 shown; invalid email flagged; review lists the entered data; Back returns to step 2 | Pass |
| 13 | Plant theatre: clicking stage 06 scrolls to "Drying" | Pass |
| 14–16 | Mobile (AR): menu opens; chapter dock appears; no horizontal overflow | Pass |

Navigation (added in the navbar refinement):

| Check | Result |
|---|---|
| Desktop Home click from /en/contact/ → `/en/` | Pass |
| Mobile menu: first item is Home (`aria-current="page"` on the homepage), click from /quality/ → `/en/` and `/ar/` | Pass |
| Keyboard: Tab reaches Home after skip link and logo; visible orange focus ring | Pass |

## 3. Homepage: chapter by chapter

Desktop (1440 and 1280): `qa/home-1440-*.jpg`, `qa/home-1280-sheet.jpg`.

| Chapter | What the browser shows | Verdict |
|---|---|---|
| 01 Hero | Full First Light photograph from frame 0; headline in thin/bold contrast; corner readouts; scroll cue | ✔ |
| 02 Dive (hero exit) | Camera pushes in, headline lines split apart, **a water line with foam rises** and the view goes beneath the surface | ✔ the hero-to-content transition |
| 03 Beneath the surface | Sardine school photograph + living canvas school reacting to the cursor light; "Whole marine fish, including sardines" card | ✔ |
| 04–05 The catch | Pinned **horizontal** sequence of four large photographs, counter 01/04 → 04/04, progress bar | ✔ |
| 06–07 The line | Two-stream diagram drawn by scroll, nodes lighting, particles flowing, live stage caption | ✔ |
| 08 Fish meal | Loupe on the ultra-fine powder + grade instrument | ✔ |
| 09 Crude oil | Tall pour + parallax sight glass, warm light following the cursor | ✔ |
| 10 Quality | Laboratory photograph + sweeping gauges | ✔ |
| 11 Company | Verified-facts ledger with counting numerals; links to About / Products / Manufacturing | ✔ (new) |
| 12–13 Ready for the world | Iris aperture opens over the circular net, card arrives | ✔ |
| 14 Contact | Brand-pattern CTA band (no repeated photo) | ✔ |

Tablet and mobile (768 / 390): `qa/home-768-sheet.jpg`, `qa/home-390-sheet.jpg`. Pinned scenes become a stacked sequence: photo, then type on the ivory surface. The canvas is off and images are shown whole. A chapter dock (current chapter + quote) appears after the hero.

## 4. Product experience

| Screenshot | Shows |
|---|---|
| `qa/product-01-shelf-light.jpg` | Products hub: cursor sunlight on the shelf lights the nearest specimen |
| `qa/product-02-drawer.jpg`, `-03-drawer-next.jpg` | Drawer with specification rows, quote and page links; arrow navigation |
| `qa/product-04-loupe-dial.jpg` | Fish Meal 65 %: 2.6× loupe over the powder; dial pre-set to 65 % |
| `qa/product-05-oil-light.jpg` | Crude Fish Oil: warm light passing through the oil under the cursor |

## 5. Manufacturing experience

`qa/mfg-stage-01…09.jpg`, `qa/mfg-wipe-in-progress.jpg`: pinned plant theatre with nine confirmed stages. Each stage image **wipes** over the previous one (direction-aware in Arabic), with live stage text and an index (meal stream navy, oil stream orange). The index is clickable.

## 6. Navbar and hero typography (refinement)

* Navbar before/after: `qa/nav-before-after-en.jpg`, `qa/nav-before-after-ar.jpg`; focus state `qa/nav-focus.png`; mobile menu `qa/mobile-menu-en.png`, `qa/mobile-menu-ar.png`.
* Hero sheets before/after: `qa/heroes-before-1440-en.jpg` ↔ `qa/heroes-after-1440-en.jpg`, the same for `-1440-ar` and `-390-en`.

Navbar metrics (minimum clear space from the nav to the logo / to the tools; single row everywhere):

| Viewport | EN | AR |
|---|---|---|
| 1440 | 122 px / 122 px, 1 row | 170 px / 170 px, 1 row |
| 1280 | 81 px / 81 px, 1 row | 129 px / 129 px, 1 row |
| 1024 | 1 row (quote button moves to the menu at ≤ 1180 as before) | 1 row |
| 768, 390 | Burger menu; Home first | Burger menu; Home first |

## 7. Performance

See `06_PERFORMANCE_RESULTS.md` for the final Lighthouse table against the Phase 03 baseline.

## 8. Remaining limitations (honest list)

* **Mobile home performance.** The cinematic home has more content in its first screens (hero + underwater + catch) than Phase 03, so mobile Lighthouse on the home page is lower than Phase 03's 98 (see `06`). Desktop stays at 100 / CLS 0. The Arabic home costs more because Arabic text shaping is about 2× the layout cost of English on the same structure: measured 510 ms vs 290 ms with all CSS removed, under 4× CPU throttle.
* **Headless only.** All tests ran in Chromium. Safari/iOS and Firefox were not available in this environment. The techniques used (sticky, clip-path, IntersectionObserver, CSS custom properties) are supported there, but they have not been visually verified.
* **Photography is illustrative.** AI images remain labelled; the site needs real plant photography before launch.
