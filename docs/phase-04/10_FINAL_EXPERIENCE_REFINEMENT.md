# 10 — Final Experience Refinement
Hero excellence · native Arabic experience · original logo fish · Direction A product interaction · global consistency · dotted rail removed

Baseline: `phase-04-hero-ar` (round 4). Evidence: `docs/phase-04/qa-v5/`.

---

## 0. Dotted side rail: removed
**What it was:** `<nav class="rail">` ("Page chapters"), rendered by `layout()` in `build.mjs` on the homepage only.
- It had eight dots, hover labels, an orange active-section fill line and a connecting line.
- Styles: `cinema.css` (13 lines of `.rail` rules) and `system.css` (1 rule).
- Active-chapter logic: `main.js` (`railLinks`, `railFill`, `.off`).

**Removed:**
- The markup.
- All `.rail` CSS, including the RTL variants.
- The rail logic in `main.js`.
- The space the rail reserved:
  - `hero.css` padded the hero copy by `64px` at its inline end.
  - Arabic had an extra `124px` clearance rule.

  Both are gone, so the hero copy now uses the normal gutter.

**Kept, because it is a separate component:**
- The mobile quote dock (`.dock`, the "Request a quote" bar on phones). It now reads its chapter names from a `data-ch` attribute.
- Environment colour changes, smooth scrolling and every scroll scene are unchanged.

**Verified:** 0 rail elements across 54 page loads (9 pages × EN/AR × 1440/768/390). Screenshots: `qa-v5/no-rail-home-{en,ar}.jpg`.

## 1. Homepage hero
| Area | Before | After |
|---|---|---|
| Boat in the water | The hull was cut in a straight line with a jagged white rim; it read as "pasted" | The bottom of the hull takes the water's colour progressively under a moving wave line, so it sits *in* the water. A distorted hull reflection and soft shadow appear beneath it, with lacy, broken foam |
| Wake | Straight white "scratch" streaks | Turbulent white water from domain-warped noise that drifts away from the stern and dies out, plus soft broken Kelvin arms |
| Boat movement (primary) | ~100 css-px over 55 s; easy to miss | Gathers way from rest, then a clearly readable passage toward the hills (~180 css-px at 1440 over 80 s), shrinking with distance. It then settles into a very slow drift, with no loop or reversal. Swell bob and roll continue |
| Water (environmental) | Unchanged character | Same perspective ripples and sun glints; now also carries the reflection, shadow, foam and wake |
| Gulls (secondary) | First gull at 1.2 s, competing with the boat | First gull at 4.5 s, the second ~7 s later. Paths are remapped below the header (always ≥ 96 px clear) |
| Copy | Lede 15–18 px | Lede 16–19 px (Arabic 16–19.5 px at line-height 1.85); the eyebrow wraps balanced, with no orphaned "2025" on phones |
| Exit into the next section | Headline lines slid 22–26vw sideways while fading slowly, leaving ghosted type over the sky. The sea surface arrived as a hard horizontal clip line | Copy lifts and clears by ~250 px of scroll, before the surface arrives. The underwater layer rises through a soft mask with a lit meniscus band |
| Arabic composition | Copy floated mid-screen on the left, right-aligned to nothing | Copy is anchored to the reading-start (right) edge like the navigation and every other Arabic page. The whole scene (photo, water, vessel, gulls) is mirrored once, so the vessel sits on the open left side |
| Scroll cue | 10 px, faint over water | Darker ink; Arabic cue at 12.5 px |

**Overlap (re-measured):** gaps between the buttons and the readouts are EN 253 / AR 230 px at 1440 and EN 195 / AR 173 px at 1280. At 768/390 the readouts sit in a ruled row 26 px below the copy.

## 2. Arabic edition
The content review (464 strings, unified terminology, ~40 phrasing fixes) was done in round 4. This round reviewed **every Arabic page visually against its English counterpart** at 1440 (`qa-v5/parity/`), and fixed:

| Defect | Fix |
|---|---|
| Arabic hero copy floating mid-screen | Right-anchored composition (see §1) |
| Breadcrumb and kicker illegible over busy photo heroes (International: dark truck body; Contact: hull) | A calm wash from the reading-start side under the copy column (left in English, right in Arabic) on all photo heroes; breadcrumbs darkened. Photos with lettering are **not** mirrored |
| Ledes at line-height 1.6 (Latin rhythm) | Arabic ledes at 1.85, statements at 1.55 |
| Quality gauge descriptions at 13 px | 14.5 px / 1.8 in Arabic |
| Raw-materials route: first and last captions clipped by the page edge ("editerranean", and the Arabic "مناطق الصيد") | End captions align inward from their dot (both directions) |
| Raw-materials lede broke onto a line starting with "—" | Rewritten: «…تصل من مراكب الشركة ومن الموانئ ومخازن التبريد إلى حوض الاستقبال في المصنع.» |
| Product showcase had no Arabic-specific layout | Shelf order, detail column, prev/next arrows and arrow-key direction are all mirrored; Cairo sizes for the name and rows (see §4) |

Checked and correct in both languages: navigation, breadcrumbs, buttons (icons flip only where they indicate direction), spec sheet and comparison column order, the manufacturing theatre and stage index, the flow diagram (it reads right to left), forms, the footer column order, and number, email and phone isolation.

## 3. The three fish: exact original logo artwork
**Source.** No vector logo exists in the project; `DATA/AL KHALEEJ BD.pdf` is a raster-only brand book. The highest-quality original rendering of the icon is on **page 11 of 35 ("Icon · Safe-Space")**: an embedded 1920×1080 image in which the symbol measures 413 px, the largest in the book. Its construction guides are thin navy hairlines that never touch the orange artwork. The DATA folder was only read.

**Extraction** (script kept at `qa-v5/fish-extract.py` → output `site/src/brand/symbol-fish.json`; fidelity map `qa-v5/fish-extraction-fidelity.png`):
1. Coverage of the brand orange over white is computed per pixel. The navy guides are rejected by colour. The measured fill is **#E38B06**, the brand orange.
2. Connected-component analysis finds **exactly three components**: 15,185 / 15,168 / 15,153 px, i.e. the three fish (body and tail joined at the waist, the eye as a hole).
3. Each outline is the 0.5 iso-contour of the original anti-aliased pixels, traced at 8× super-sampling into one SVG path per fish (outline + eye, `fill-rule: evenodd`).
4. **Fidelity:** IoU **0.9933** against the original pixels; the 307 differing pixels out of 45,506 all lie on the anti-aliased edge.
5. **Self-check:** the three fish sit at −172.2°, −52.3° and 67.7° around the symbol centre (**exactly 120° apart**) at radii of 128.2–128.4 px. This matches the symbol's construction.

Nothing is redrawn, stylised or recoloured. The logo files are untouched. The previous generic fish illustrations were removed.

**Motion** (`main.js`, "three-fish orbit"):
- **Opening:** each fish is its own `<button>`/`<span>` with its own transform; the orbit container never rotates. On entering view, the fish start in the **exact logo formation**, then over 1.8 s glide outward onto one shared path: a circle seen in slight perspective, at a radius 1.32× the logo's.
- **Swimming:** they swim **counter-clockwise, head first**, as in the logo, ~120° apart. Each fish turns with its own tangent; at rest this is exactly its logo pose, so there is no spin about its own centre.
- **Independence:** each fish has its own phase, so the spacing breathes ±2.6° (never closing), with a gentle per-fish swim sway.
- **Depth:** a uniform scale of ±5% with layering; the artwork is never squashed, distorted or mirrored.
- **Hover:** it slows to 25% speed.
- **Meanings:** choosing a meaning (Unity / Harmony / The cycle of life) highlights its fish.
- **Path ring:** a faint dotted ring shows the shared path; there is no glow and no particles.

The same artwork and logic drive **About → Our symbol** and the smaller **homepage company section**, scaled to each.

**Reduced motion:** the static exact logo formation.

## 4. Products: Direction A interaction restored
**Reference inspected:**
- The prototype (`docs/phase-02/01_VISUAL_DIRECTION_A.html`) has one product interaction, the sunlit specimen room `#room`. Its `#markets` anchor is the international-inquiries iris.
- Its behaviour: `focusSpec(i)` dollies the whole shelf so the chosen specimen grows while its neighbours stay visible beside it. **Any visible specimen can be clicked while zoomed** (`if(!(zoomed&&current===i)) focusSpec(i)`), plus arrows and Escape.
- The port-8080 preview was not running, so the file itself was inspected.

**Old site problem (measured):** opening a product slid a full-height modal drawer over the right side and the navigation. A scrim covered the selected jar and the page heading covered the neighbours. **No other product could be clicked** (`elementFromPoint` hit the scrim or H2), so visitors had to close it first.

**New showcase** (`build.mjs` products hub, `signature.css` `.sx-*`, `main.js` "Direction A specimen showcase"):
- **Initial state:** four specimen panels on the sunlit shelf. The Direction A light follows the pointer, and the nearest jar catches a glint.
- **Selecting one:** it grows to ~59% of the shelf and becomes the focus, showing the jar with its details beside it. The details are the index, name, description, three key rows, *View product* and *Request a quote*. The other three narrow but **stay on the shelf, visible and clickable**; the next product is always beside it.
- **Switching directly:** clicking any other panel while one is open shrinks the current one and grows the new one in one coordinated 0.8 s transition (`cubic-bezier(.7,0,.2,1)`). The old details fade out in 0.22 s and the new ones fade in after 0.36 s. The showcase **never returns to the initial state**.
- **Navigation:** prev/next buttons with a "02 / 04" counter, ← → keys (mirrored in Arabic), Escape, and a "Show all" control. `aria-expanded`/`aria-controls`; hidden details are `inert` and `visibility:hidden`. The URL hash deep-links a product (`/en/products/#fish-meal-65`). The product-page morph (`view-transition-name`) is kept.
- **Direction A camera (zoom and dolly), added after a side-by-side comparison with the reference:**

  | | Reference shelf | Before this change | Now |
  |---|---|---|---|
  | Select | Shelf dollies in to 1.55× within ~300 ms | The panel widened but the jar stayed 1.02× ("a card resizing") | The jar zooms to **1.42×** (1.32× at 120 ms, settled by ~550 ms), anchored on the jar, in step with its panel growing |
  | Switch | The camera glides to the next jar | Panels re-flowed | The outgoing jar zooms back out as its panel narrows while the incoming one zooms in: a dolly from specimen to specimen |
  | Depth | A veil drops the background back | — | Unselected specimens recede under a soft light veil (lifting on hover) but stay readable and clickable |
  | Light | The sun settles on the chosen jar | It followed the pointer | The light leaves the pointer and travels with the layout to settle on the chosen specimen |

  Phones use a gentler 1.14× zoom inside the open panel. Reduced motion switches instantly with no zoom. Recordings: `qa-v5/reference-direction-a-shelf.webm` vs `qa-v5/products-showcase-{en,ar}.webm`.
- **Tablet and phone:** the shelf stacks inside a fixed-height frame. The open specimen takes the space and the others become **thumbnail bars you can tap directly**. This is a stacked layout of its own, not a shrunken desktop.
- **No layout shift:** the shelf height is constant in every state, so the page height never changes.
- **Accuracy:** names, images, descriptions, grades, packing, chips and routes all come from the existing `PRODUCTS` / `specRows` data; nothing new is claimed.

## 5. Global consistency
- Photo-hero legibility system: reading-side wash and darker breadcrumbs (all `op-bleed` heroes).
- Route timeline end captions.
- Arabic reading rhythm (ledes, statements, small text).
- Section labels reveal from above (round 4) so they never pass over headings.
- The hero copy uses the standard gutter now that the rail is gone.
- The products room uses a proper two-column top (copy + arched window) instead of absolute stacking, so the window can never collide with the copy.

## 6. Files changed
| File | Change |
|---|---|
| `site/src/build.mjs` | Rail removed; dock chapter data; logo-fish orbit markup; products showcase markup (drawer no longer used there); Arabic raw-materials lede |
| `site/src/main.js` | Rail logic removed; hero shader (submerged waterline, reflection, shadow, lace foam, turbulent wake), boat path, gull timing and band; orbit engine; showcase engine |
| `site/src/hero.css` | Rail reserve removed; Arabic scene mirroring and right-anchored copy; hero exit; soft surface; cue and lede sizes |
| `site/src/cinema.css` | All `.rail` rules removed |
| `site/src/system.css` | Rail rule removed; photo-hero wash; route end captions; Arabic rhythm; label reveal |
| `site/src/signature.css` | Orbit styles; showcase styles; old shelf/drawer-zoom rules removed |
| `site/src/brand/symbol-fish.json` (new) | The three fish paths traced from the brand book, with source and method recorded |

## 7. Browser QA (Playwright · Chromium, run one at a time)
| Check | Scope | Result |
|---|---|---|
| Hero content never overlaps (readouts vs title, lede, buttons) | Home EN/AR × 1440 / 1280 / 768 / 390 | **0 hits**; gaps EN/AR 253/230 · 195/173 · 26/26 · 26/26 px |
| Hero scene running | same | WebGL live at every size; no fallback |
| Text collisions **during animation** (sampled at 0/150/450/900 ms per scroll step) | 10 pages × EN/AR × 1440, 1280, 768, 390 (80 runs) | **0** |
| Horizontal overflow · console/JS errors · 4xx · clipped text · broken images | 23 pages × 4 widths | **0**. The 60 "offscreen" flags are the hidden details inside *collapsed* showcase panels (zero width, `visibility:hidden`, `inert`); a direct check finds **0 visible** elements off-screen |
| Arabic direction | 12 pages × 1440/390 | **0** Arabic runs resolving LTR or left-aligned |
| Dotted rail removed | 9 pages × EN/AR × 1440/768/390 (54 loads) | **0** rail elements; no reserved space |
| Orbit uses the three logo fish, moving independently | About EN/AR, Home | Container transform `none`; 3 separate fish, one traced path each; positions advance counter-clockwise (161°→133° in 2 s), ~112–124° apart (per-fish breathing + perspective); each fish's own rotation differs (−29→−63°, −28→−57°, −30→−56°) |
| Product showcase: open → switch directly → switch again → keyboard → Escape | EN/AR × 1440, 1280, 768, 390 | Every product **directly reachable while another is open**; never returns to the initial state; **no overlap** in any 100 ms transition sample; shelf height and page height constant (no layout shift); hash, counter and `aria-expanded` correct; no errors |
| Showcase content fits (no clipped buttons) | 4 products × EN/AR × 1440, 1280, 768, 390, 360 | All fit; actions on one line |
| Reduced motion | Hero, orbit, showcase (EN/AR) | Hero: still image only. Orbit: static exact logo formation. Showcase: switches instantly. No errors |

**Recordings:** `qa-v5/orbit-logo-fish-{en,ar}.webm`, `qa-v5/products-showcase-{en,ar}.webm`, `qa-v5/products-showcase-mobile-en.webm`. Hero recordings from round 4 remain in `qa-v4/`.
**Before / after:** `qa-v5/before-after/compare-*.jpg`. "Before" was rebuilt from `phase-04-hero-ar` and captured with identical actions: products open (EN 1440, AR 390), our symbol, Arabic and English hero, homepage rail, raw-materials route, International hero (AR).
**EN | AR parity sheets:** `qa-v5/parity/`.

## 8. Remaining notes
- The `localhost:8080` Direction A preview was not running. The reference was inspected from its source file instead of starting a second server.
- No vector logo exists in the project. The fish are traced from the largest raster in the brand book at IoU 0.9933. If an official SVG/AI file is provided, `symbol-fish.json` can be regenerated from it with no other change.
- During QA the machine ran low on memory and the system stopped the preview server and one sweep. The sweeps were re-run one viewport at a time; all results above come from the final build.
