# 04 — Motion and Transition System

## Principles
1. **Motion explains.** Every movement shows a process (the line, the route, the theatre), reveals a detail (the loupe, specimen light, expandable parameters) or marks a change of place (hero exits, page transitions, chapter colour).
2. **Photography is never hidden.** Images are visible from the first frame; motion only settles, wipes between two photos, or adds depth.
3. **One engine, native scroll.** There is no scroll hijacking and no animation library. Sticky positioning + one rAF-batched pass reads all geometry, then writes CSS variables; CSS turns them into `transform`, `opacity` and `clip-path`.
4. **Direction-aware.** Every directional effect mirrors in Arabic.
5. **Reduced motion.** All pinned scenes become stacked layouts, entrance animations are removed and page transitions are disabled.

The Direction C prototype (recovered from git) used the same vanilla approach: `requestAnimationFrame`, `IntersectionObserver`, `strokeDashoffset` and `getPointAtLength`. Its techniques are reused here.

## Vocabulary

| Layer | Motion | Where | Origin |
|---|---|---|---|
| **Page → page** | Cross-document View Transition: old page lifts and fades in 220 ms, new page rises in 500 ms; the header stays fixed (`view-transition-name: site-header`). Same-site links are prefetched on intent (Speculation Rules, moderate). | All pages (Chromium; other browsers navigate normally) | New |
| **Hero entrance** | Photo settles 107 % → 100 % (2.2 s), mist lifts, crumbs/kicker → headline lines → lede → actions rise in sequence | Every hero | A + C10 typography |
| **Hero exit** | Scroll-linked `--hx`: copy lifts and fades, photo desaturates slightly, parallax continues | Every full-bleed hero | New |
| **Home opening** | Camera push, split headline, rising water line, dive into the living sardine school | Home | C1/C2 |
| **Chapter change** | Page background interpolates between chapter colours (dawn → mist → steel → sand → amber → paper) | Every page with chapters | C2 |
| **Scroll storytelling** | Horizontal catch (pinned); two-stream line drawn by scroll with particles; plant theatre wipes; iris aperture | Home, Manufacturing | C4, C6 |
| **Route** | Raw-material route drawn by scroll; nodes light in order | Raw materials | New (C4 language) |
| **Reveals** | Headline lines rise from a mask; images open with a curtain; facts and rows stagger 70–90 ms | All | A |
| **Data state changes** | Filter indicator slides between segments; filtered rows collapse (`grid-template-rows 1fr → 0fr`); expanding rows fade in; grade bars and the ledger meter draw on reveal; comparison columns highlight | Product pages, Products hub, About, Quality, International | New |
| **Tabs** | New source image wipes over the previous one (direction-aware) and settles; the panel rises | Raw materials | New |
| **Micro-interactions** | Button fill sweep, link underline draw, card lift, dial needle, loupe, light through oil, specimen sunlight | All | A + C5 |

## Timing tokens
`--t-fast` .25 s (hover and colour) · `--t-mid` .5 s (state changes) · `--t-slow` .9 s (wipes and reveals). Easing: `--out` `cubic-bezier(.16,1,.3,1)` for arrivals, `--io` `cubic-bezier(.7,0,.2,1)` for wipes.

## Performance rules
* Only `transform`, `opacity`, `clip-path` and `filter` are animated, never layout properties.
* Scenes run only when near the viewport, and initialise lazily the first time they are seen.
* Each frame reads all geometry first, then writes (no forced layout thrash).
* The single continuous loop (the sardine school) runs only while visible, on screens ≥ 900 px.
* Page transitions add no delay: the new page renders immediately and the animation plays over it.
