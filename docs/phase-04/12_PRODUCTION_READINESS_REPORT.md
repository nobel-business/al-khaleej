# 12 — Final QA & Production Readiness Report

Branch `updates` · build `npm run build` (dependency-free Node generator → `dist/`) · audit date 2026-11-28.
All results below come from real runs in Chromium 156 (Playwright, headless) against the built site; nothing is estimated.

## 1. Executive summary

The site builds cleanly. Every route, in English and Arabic, was crawled and checked at 12 viewport widths (1920 → 360).

**Before release**
- **4 major issues** were found and fixed:
  - stale cached images;
  - a late LCP on mobile without WebGL;
  - the compare table cut off at tablet widths;
  - form errors not announced to screen readers.
- **9 minor issues** were found and fixed.
- **0 critical issues.**

**After the fixes**
- 0 JavaScript errors and 0 failed requests.
- 0 broken images and 0 sideways overflow at any width.
- 0 text collisions and no heading-order problems.
- The functional suite passes 26 of 26.

**What remains** needs hosting or business decisions, not front-end code:
- security headers in the hosting configuration;
- a server-side inquiry endpoint;
- verified legal-entity details;
- a decision on the push and deploy.

**Assessment:** ready for a staging or preview deployment. Production launch depends on the items in §15.

## 2. Pages and routes audited
33 routes: the root redirect, plus 16 pages in each language.

| Page | EN | AR |
|---|---|---|
| Home | `/en/` | `/ar/` |
| About | `/en/about/` | `/ar/about/` |
| Raw materials | `/en/raw-materials/` | `/ar/raw-materials/` |
| Manufacturing | `/en/manufacturing/` | `/ar/manufacturing/` |
| Products | `/en/products/` | `/ar/products/` |
| Product pages ×6 | `/en/products/fish-meal-60\|62\|65\|66\|72/`, `/en/products/crude-fish-oil/` | same under `/ar/` |
| Quality | `/en/quality/` | `/ar/quality/` |
| International markets | `/en/international-markets/` | `/ar/international-markets/` |
| Contact | `/en/contact/` | `/ar/contact/` |
| Privacy | `/en/privacy/` | `/ar/privacy/` |
| Image credits | `/en/credits/` | `/ar/credits/` |
| 404 | any unknown route | |

Interactive features inventoried and tested:
- navbar, active states and language switch;
- the mobile menu;
- breadcrumbs;
- the homepage hero scene, a WebGL scene with a non-WebGL fallback;
- the grade dial and tabs;
- the products specimen room: zoom, drawer, previous/next, keyboard and deep links;
- the compare table;
- the inquiry checklist;
- the 3-step contact form;
- the loupe and the manufacturing stage engine;
- the reveal and scroll effects.

## 3. Issues discovered: 13 (all fixed)

| # | Severity | Area | Issue → root cause | Fix |
|---|---|---|---|---|
| 1 | Major | All images | `vercel.json` serves `/img/*` as `immutable`, cached for 1 year, but image names carry no hash. After the fish-meal recolour and new photos, returning visitors would keep the old images for up to a year. | Every `/img` URL now carries `?v=<content hash>` (`lib/media.mjs`, loupe, home water plate). |
| 2 | Major | Home, mobile, no WebGL | In the no-WebGL fallback, the hero `<img>` was re-sourced to the water plate after load. Chrome counted the swap as a new LCP: **3.7 s** on slow 4G. | The plate is laid over the painted photo as an equal-size sibling; the photo itself is not re-sourced. |
| 3 | Major | Products → compare table | With six products, a status pill overflowed its column at ≤1024 px and was clipped by the page. | Pills wrap inside their column; columns can shrink (`min-width:0`). |
| 4 | Major | Contact form, a11y | Field errors were not tied to their fields (no `aria-describedby` or `aria-invalid`), so screen readers didn't announce them. | Errors are linked to fields; `aria-invalid` is set on the fields and the product group. |
| 5 | Minor | Contact form | The optional phone field was never validated. | When filled, it's checked against `^\+?[\d\s().-]{7,20}$`, with an EN/AR message. |
| 6 | Minor | Contact form, security | The review step escaped only `<` when echoing visitor input. Not exploitable in element content, but incomplete. | Full HTML escaping (`& < > " '`). |
| 7 | Minor | Contact form | A double click could open the email app twice. | One mail hand-off per 4 s (verified: 1 hand-off on double click). |
| 8 | Minor | Products room | A `#fish-meal-66` link followed while already on the page (or with back/forward) did nothing; the hash was read only on load. | `hashchange` opens the specimen. |
| 9 | Minor | Products room, performance | The camera move repainted the zoomed shelf every frame, so the next paint took up to 280 ms. | `will-change: transform` on the shelf while zoomed. |
| 10 | Minor | WCAG 2.2 · 2.5.8 | Undersized targets: footer product links (23 px), legal links (15 px), breadcrumbs (23 px) and diagram nodes (14 px). | 24 px link height; diagram nodes keep their look with a 26 px hit area. |
| 11 | Minor | Content consistency | The About fact list and the Products meta description still listed three grades. | They now list all five (60/62/65/66/72 %). |
| 12 | Minor | Homepage hero | After the copy edits, the scroll cue sat at the corner and the outline quote button was hard to see on the bright sky. | Cue centred; quote button in frosted glass with navy text. |
| 13 | Minor | Readability on glass | Navy text over dark patches of hero photos (About boat, Raw Materials wave) and the dark-sea world card was hard to read. | Letter halo on glass text; denser frost on the dark-sea card. |

Audit false positives, checked and dismissed:
- **"Clipped" buttons and cards:** the decorative hover sheen and glow pseudo-elements count as overflow.
- **"Unnamed" buttons:** these are inside `content-visibility:auto` sections, where `innerText` is empty off-screen. Every one has visible text.
- **Headless software-WebGL warnings:** these come from the test environment.

## 4. Issues remaining
None of these is a front-end code defect. They need access or decisions outside the codebase:

| Item | Where | Reproduce | Actual | Expected | Severity | Next action |
|---|---|---|---|---|---|---|
| Security headers | `vercel.json` | Inspect response headers | Only `X-Content-Type-Options` is set | Also `Referrer-Policy`, `Permissions-Policy`, `Content-Security-Policy` (at least `frame-ancestors 'self'; object-src 'none'; base-uri 'self'`) and `X-Frame-Options` | Major (pre-launch) | Hosting-owner approval to change the hosting config |
| Inquiry delivery | Contact form | Send an inquiry | Opens the visitor's own email app (`mailto:`); no server copy and no delivery confirmation | Server-side submission with confirmation and spam protection | Major (business) | Choose a form backend or endpoint |
| Legal entity details | Footer | Look at the footer legal line | "Legal entity details pending verification" | Verified company name and registration | Minor (content) | Client to supply |
| Real-device and assistive-tech testing | All | — | Automated Chromium only | Safari/iOS, Firefox, real Android; NVDA and VoiceOver passes | Minor | Manual QA round |
| Not pushed | Git | `git status` | Commits are local on `updates` | Pushed for a Vercel preview | — | User go-ahead |

## 5. Severity breakdown
**Critical: 0 · Major: 4 fixed + 2 external (headers, inquiry backend) · Minor: 9 fixed + 3 external.**

## 6. UI/UX improvements implemented this pass
- **Glass cards** (heroes, homepage sardine card, world card, packing card): one frosted-glass language, matched to the client's reference. There's a denser frost where the photo behind is dark, and a halo on the letters for legibility.
- **Organic image shapes:** one site-wide system of oversized soft corners in four families (wide, landscape, portrait, square), with continuous "squircle" curvature where supported. Applied to all 16 in-content image contexts. Overlays inside the images were moved clear of the curves.
- **Homepage:**
  - hero title on one line;
  - hero copy block centred on the ship's mirror point;
  - edited copy;
  - the journey and two-streams sections removed (client request);
  - centred scroll cue and a clearer quote button.
- **Products page:** the hero and the specimen room are now two independent sections with a soft curved seam.

## 7. Responsive testing
- 32 routes × 12 widths: 1920, 1600, 1440, 1366, 1280, 1024, 820, 768, 430, 390, 375 and 360.
- **Full checks** at 1440, 1024, 768 and 390: text collisions sampled while scrolling, contrast, names, labels and headings.
- **Layout checks** at the other eight widths: overflow, off-screen elements, clipping and target size.
- **Result after fixes:** 0 horizontal overflow, 0 off-screen elements, 0 collisions and 0 broken images.
- Arabic RTL was verified on every page.
- The hero and cards were checked visually at desktop and phone sizes; the products page seam at 18 screen sizes, including 1917×916.

## 8–10. Performance (lab measurements)

**Conditions**
- Local preview server, gzip on, cold cache.
- Median of 2 runs.
- **Desktop:** 1440×900, no throttling.
- **Mobile:** 390×844, 4× CPU slowdown, "Slow 4G" (1.6 Mbps down / 750 kbps up / 150 ms RTT).
- The INP column is a proxy: the slowest event in a scripted set of real clicks and taps. It is not field data.
- Headless Chromium renders WebGL in software, so absolute interaction times are pessimistic compared with real GPUs.

PERF_TABLE

**Assets**
- HTML 29–41 KB gzipped, with critical CSS inlined.
- One hashed JavaScript file, 57 KB raw.
- Two font subsets: 31 KB and 38 KB.
- 43 images delivered as AVIF, WebP and JPEG at 3–7 widths.
- Every `<img>` has explicit `width` and `height`; images below the fold load lazily, and the hero is preloaded with `fetchpriority=high`.

## 11. Functional testing: 26 / 26 passed
- **Navigation:**
  - every internal link and every cross-page `#anchor` resolves (crawl of 32 pages);
  - the language switch keeps the current page;
  - `hreflang` alternates are present;
  - the active nav state is marked;
  - unknown routes return a 404 page;
  - the first Tab press reaches the skip link.
- **Grade dial:** works with clicks and with the keyboard.
- **Tabs:** respond to clicks and arrow keys.
- **Products room:** opens, Next works, Escape closes and returns focus, and deep links work both on fresh load and as an in-page hash.
- **Compare table:** highlights the hovered column.
- **Contact form:**
  - empty step blocked;
  - invalid email and phone rejected, with linked errors;
  - review step shows escaped visitor input;
  - consent required;
  - a single mail hand-off on double click.
- **Mobile menu:** opens and closes with `aria-expanded`, Escape closes it, and links navigate.
- **Errors:** no JavaScript errors during the whole run.

## 12. Accessibility (WCAG 2.2 AA, automated + targeted)
- **Pass:**
  - `lang` and `dir` on every page;
  - exactly one `h1`, with no skipped heading levels;
  - every image has `alt`, with AI images labelled illustrative;
  - every form control has a label;
  - no duplicate IDs;
  - a skip link;
  - visible focus styles (the two `outline:none` cases have replacements);
  - `prefers-reduced-motion` respected (the WebGL scene stays a still image, animations are disabled);
  - contrast ≥ 4.5:1 on all solid backgrounds checked.
- **Fixed:** form error announcement (#4) and target size (#10).
- **Glass over photos:** contrast depends on the photo. It was raised with the letter halo and the denser frost, and should be confirmed by eye on real screens.

## 13. Security
- No secrets, keys or tokens in the source; no third-party scripts; no external origins loaded.
- Every `innerHTML` use inserts build-time content, except the form review step, which now escapes fully.
- No `target=_blank` links without `rel`.
- The form only builds a `mailto:` URL with `encodeURIComponent`; nothing is stored.
- Open item: hosting security headers (§4).

## 14. Build and tests
- `npm run build`: 32 pages + 404 build without errors.
- The CI image check (`.github/workflows/build.yml`) was run locally: all 43 manifest images are present, and 555 generated files are committed.
- **Type checking, linting and unit tests:** none configured in this project (plain ES modules, no dependencies), so none were run.
- **Equivalents run:**
  - a syntax check of the client script (`node --check`);
  - the route × width sweep;
  - the functional suite;
  - the lab performance runs.

## 15. Known limitations and external items
See §4. In addition:
- **Imagery:** AI images are illustrations, not the client's plant; this is disclosed on the credits page and in the alt text.
- **Hero ship:** the ship animates in WebGL. The copy block mirrors its starting position.

## 16. Final production readiness assessment
**Ready for a preview or staging release now.**

**Ready for production once three things are in place:**
1. Security headers are added in the hosting config.
2. The inquiry flow has a server-side endpoint, or the client accepts the `mailto:` hand-off.
3. The legal-entity line is confirmed.

Everything inside the codebase that the audit could detect has been fixed and re-tested.
