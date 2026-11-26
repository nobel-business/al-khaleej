# 06 — Performance Results (Phase 04 vs Phase 03)

Lighthouse 12, median of 2 runs per page and mode (Phase 03: median of 3), on the same machine and local server. Mobile = simulated Moto G-class device with 4× CPU throttle and slow 4G. Desktop = Lighthouse desktop preset.

## Results

| Page | Mode | Perf P03 → P04 | LCP P03 → P04 | CLS | Image KB P03 → P04 |
|---|---|---|---|---|---|
| Home EN | desktop | 100 → **100** | 0.54 → 0.60 s | 0 | 200 → 400 |
| Home EN | mobile | 98 → **87** | 2.4 → 3.5 s | 0 | 137 → 645 |
| Home AR | desktop | 100 → **100** | 0.57 → 0.60 s | 0 | 200 → 400 |
| Home AR | mobile | 96 → **77** | 2.6 → 3.5 s | 0 | 200 → 645 |
| Manufacturing | desktop | 100 → **100** | 0.50 → 0.55 s | 0 | 253 → 144 |
| Manufacturing | mobile | 97 → **86** | 2.5 → 4.1 s | 0 | 253 → 552 |
| Fish Meal 65 % | desktop | 100 → **100** | 0.42 → 0.47 s | 0 | 215 → 126 |
| Fish Meal 65 % | mobile | 98 → **94** | 2.3 → 2.4 s | 0 | 292 → 160 |
| Contact | desktop | 100 → **100** | 0.49 → 0.43 s | 0 | 138 → 37 |
| Contact | mobile | 98 → **99** | 2.3 → 2.2 s | 0 | 138 → 37 |

Accessibility is 100 on the re-audited pages after the footer fix (below); best practices are 100 everywhere. SEO is 85 everywhere because canonical and hreflang URLs are relative until a production domain exists; this is unchanged from Phase 03.

> **TBT in the final run is unreliable.** Simple pages such as Contact reported 0.4–1.6 s of blocking time, against about 0.1 s in every earlier run of the identical page. The machine was also running other work. LCP, CLS and image weight are network/layout-driven and were stable between runs; use those for comparison.

## What was fixed along the way

| Fix | Effect |
|---|---|
| Content-hashed script + correct cache headers | Browsers can no longer run a stale script against new markup |
| Environment colour writes `background-color`, not a custom property on `<body>` | Removes a whole-document style recalculation on every scroll frame |
| Loupe loads its large source on first use | −352 KB on every home visit |
| Scenes initialise lazily; one read phase then one write phase per frame | No forced layouts at boot from scene setup |
| `content-visibility:auto` on below-the-fold, non-pinned chapters | English home first layout 622 → 313 ms under 4× throttle |
| Footer kept fully rendered | Accessibility contrast audit returns to 100 (it misread a skipped navy footer as white-on-ivory) |

## Why the mobile home pages are lower than Phase 03

1. **More imagery in the first screens.** The cinematic opening shows the hero *and* the underwater chapter, then the four-photo catch sequence. Chrome's lazy-loading starts images up to about 2500 px before they appear on slow connections, so under simulated slow 4G they compete with the hero image for bandwidth (645 KB vs 137 KB). The pinned theatre has the same effect on Manufacturing.
2. **Arabic text shaping.** Measured with all CSS removed, under 4× throttle, laying out the Arabic home costs about 510 ms versus about 290 ms for English. That is content cost, not design cost.
3. The **desktop** experience, where the pinned cinematic scenes run, is 100 on every page with CLS 0.

### Options if mobile scores must return to ≥ 95

* Serve smaller `sizes` for the underwater and catch images on phones (stacked layout at 100 vw rather than cover-fill), about −300 KB.
* Load the catch photographs with `fetchpriority="low"` and a scroll-proximity loader instead of native lazy loading.
* Defer the line diagram's Arabic SVG labels until the chapter approaches.

These trade a little image sharpness on phones for score; they were not applied without a decision.
