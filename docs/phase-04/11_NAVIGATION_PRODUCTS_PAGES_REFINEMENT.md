# 11 — Navigation, Products (Direction A), Raw Materials, Manufacturing, Heroes, Footer

Baseline: `phase-04-final`. Evidence: `docs/phase-04/qa-v6/`.

## References used (exact files)
| Reference | Path | Notes |
|---|---|---|
| Owner's product-showcase video | `DATA/WhatsApp Video 2026-11-24 at 10.24.26 PM.mp4` | 384×848, 14.0 s, 60 fps. A wall of products where the cursor acts as light; a click dollies the camera in, with neighbours kept at the frame edges and a side drawer; next and previous pan laterally while the drawer stays open; exit dollies out. Moves are ease-out, 0.35–0.5 s. Frames inspected again this round (read-only). |
| Latest approved Direction A | `docs/phase-02/01_VISUAL_DIRECTION_A.html` | Modified 2026-11-25 01:14, the latest. `01_VISUAL_DIRECTION_A_v1_dark.html` (00:01) is the earlier dark version. Inspected in a real browser, together with its `focusSpec` / `dolly` / `release` logic and stage CSS. |

## 1. Navigation
- **Products dropdown removed.** Products is now a normal top-level link to the Products page, in English and Arabic. No product lists appear in the navbar or the phone menu.
- Logo and **Home** link kept.
- **Glass navbar:**
  - One frosted surface (`blur 20px · saturate 1.6`) with a white hairline and an inner highlight.
  - The links sit in a glass capsule. Hover lightens the link; the active page is a white pill with an orange dot.
  - Over the homepage hero it is lighter; when scrolled it is more opaque, so text never shows through.
  - RTL order is mirrored.

## 2. Products: the Direction A room, restored
The panel showcase from the previous round was replaced. It was not the approved interaction. The page now reproduces Direction A:

| | Direction A | Products page | Measured |
|---|---|---|---|
| Initial composition | Copy top-left, arched window, four specimens on a sunlit stone sill (`--wb 42svh`, shelf 3vw from the edge) | Same geometry and the **same specimen photographs** (`spec-60/65/72/oil`, copied from `docs/phase-02/assets/fl/` into `site/src/spec/`) | No copy, window or shelf collisions at 1024 / 1280 / 1440 |
| Light | Follows the pointer; nearest jar glints and shows its name | Same | — |
| Click | Camera dolly-in **×1.55**, chosen jar centred beside the drawer | Same | Scale 1.55 vs 1.55. Centre x 500 vs 474–510 |
| Drawer | Paper drawer, right, ~420 px | Glass drawer **inside the room** (no page modal, no scrim), 440 px | — |
| Other products | Visible and clickable beside the chosen one | Same | With #2 open: #1, #3 clickable, #4 under the drawer (identical in both) |
| Switching | Click a visible specimen, or Previous/Next, pans the camera; drawer content cross-fades; never returns to the initial state | Same; ←/→ keys (mirrored in Arabic); Escape or × dollies out | Direct switch #2→#3 verified in both |
| Phones | — | Swipe shelf + glass **bottom sheet**; the shelf stays tappable above it | Tap 1 → 2 → 4 without closing (EN/AR 390, 768) |

Recordings:
- `qa-v6/products-switching-en.webm` and `products-switching-ar.webm` (A → B → C, keyboard, Escape).
- `qa-v6/products-switching-phone-en.webm`.

Reference recording: `qa-v6/reference-direction-a-shelf.webm`. Side by side: `qa-v6/products-direction-a-vs-site.jpg`.

Product names, descriptions, specification rows and routes come from the existing verified data.

## 3. Raw Materials
- Hero category label and dash removed. The heading is now one confident line.
- Intro sentence: **two lines on desktop and tablet in both languages** (measured at 1440, 1280 and 768), in a measured column.
- "From the sea to the receiving pit" redesigned:
  - The scroll-to-draw diagram and its scroll instruction are gone.
  - It is now a **five-stop photographic journey** (trawler at sea → port → quay and cold-storage crates → receiving pit → pressing into two streams).
  - The stops are staggered like a route, with one route line that follows the scroll in both directions.
  - On phones it becomes a swipe row.
- "One raw material, two ingredients":
  - The photo with a burned-in date stamp was replaced by the press image (cake and liquor = two products).
  - The cards were rebuilt with the arrow in its own column, so nothing overlaps.
- **Date-stamped photographs are no longer used on any page**: `sardines-baskets/load/stack` were replaced in Raw Materials and on the homepage. They are still credited on the credits page.

## 4. Manufacturing: nine steps → five stages
| Stage | Verified steps grouped | Stream |
|---|---|---|
| 01 Receiving and conveying | Receiving · Conveying | Input |
| 02 Cooking and pressing | Indirect steam cooking · Pressing | Split |
| 03 Oil recovery | Oil–water separation | Oil |
| 04 Drying and conditioning | Drying · Cooling and conditioning · Antioxidant addition | Meal |
| 05 Packing | Packing (50 kg bags · drums) | Both |

- Descriptions reuse the verified step texts, and the original nine step names appear as chips under each stage. Nothing was added.
- The presentation is a **sticky photograph that crossfades per stage**, with an inset of the second process, a glass stage counter and progress, beside the stage chapters. It follows the scroll in both directions. On phones each stage shows its own image.
- The two-stream diagram, the homepage line and the homepage ledger ("5 · Production stages · nine confirmed steps") use the same five stages.
- **"What we don't show yet" / "ما لا نعرضه بعد" removed** in both languages. The diagram follows the stages directly.

## 5. Heroes: the white fog removed
- Removed:
  - the cream fade over the bottom 62% of photo heroes (up to 97% opacity);
  - the side wash;
  - the homepage wash and bottom mist.
- Hero photographs are now crisp, at full colour and contrast, at every breakpoint.
- Readability comes from a **small glass plate behind the text only**, in the footer's glass language: clear tint, `blur 42px · saturate 1.35 · brightness 1.2`, hairline and highlight. It is used on desktop only; on phones the text already sits below the image.
- The first section after each hero rises over it as a rounded sheet, while the hero image recedes. This is scroll-linked and transform-only.
- Removed from the hero at your request: the products readout ("مسحوق السمك 60 · 65 · 72% · زيت السمك الخام / المنتجات").

## 6. Footer
- The closing invitation is merged into the footer as one glass panel; the separate band on every page is gone.
- The footer has:
  - brand and location chip;
  - **glass contact cards** for email and the two verified phone numbers;
  - navigation pills;
  - the product list;
  - a legal line.
- Responsive in both languages; checked at 360 and 390 px without clipping.
- Removed at your request: the footer image note ("الصور في هذا الموقع توضيحية…"). It remains on the **Image credits page**, which is still linked from every footer with full photographer and licence attribution.

## 7. Website-wide
- Section labels and decorative dashes removed (simplicity): headings stand on their own.
- Headlines flow onto one line when they fit, instead of always breaking in two.
- Arabic and English parity reviewed for every element above.

## 8. Lazy loading and scroll behaviour
- Below-the-fold images are `loading="lazy"` with explicit `width`/`height`; hero images are eager with `fetchpriority="high"` and preload.
- Images hidden until chosen (source tabs, stage crossfades) **load before they are needed**, when their section approaches, so there is no blank frame on switch.
- Reveals now **replay in both directions**:
  - Text reveals reset only when an element is more than 35% of a screen out of view.
  - Entering from above, they settle downward; from below, upward.
  - Stateful widgets reveal once and stay visible.
  - Print always shows everything.
- **Results:**

  | Measure | Result |
  |---|---|
  | Elements left hidden in view (down and up) | **0**, on Home, About, Raw Materials, Manufacturing and Products, EN/AR, 1440/390 |
  | Lazy images left blank in view after scrolling stops | **0** |
  | Replays per lower heading over a down–up–down pass | 4–6 |

- **CLS:**
  - 0.000–0.019 on every page tested.
  - The iris ring was changed to grow by transform (it previously caused up to 0.28).
  - The Arabic hero plate waits ≤0.9 s for its fonts, removing a 0.108 font-swap shift.

## 9. Browser QA (Playwright · Chromium)
| Check | Scope | Result |
|---|---|---|
| Text collisions during animation | 10 pages × EN/AR × 1440 / 1280 / 768 / 390 | **0** |
| Horizontal overflow · console/JS errors · 4xx · broken images | 23 pages × 4 widths | **0**. One clipped footer email button at 390 found and fixed. Remaining "offscreen" flags are the closed products drawer, which is hidden off-canvas. |
| Arabic direction | 12 pages × 1440/390 | **0** issues |
| Products interaction vs Direction A | EN/AR 1440, EN/AR 390, EN 768 | See §2 |

## 10. Files changed
| File | Change |
|---|---|
| `site/src/build.mjs` | Navbar (no dropdown) and phone menu; glass footer with the merged invitation; heading flow; no hero or section labels; five-stage diagram; Raw Materials journey and cards; Manufacturing stages; Direction A products room with in-room drawer; hero readout and footer note removed; Arabic font gate |
| `site/src/content.mjs` | `STAGES` (five stages grouping the verified steps) |
| `site/src/main.js` | Reveals in both directions; hero recede; journey line; stage engine; preloading of hidden images; Direction A room engine; iris transform |
| `site/src/refine.css` (new) | All styling for the above |
| `site/src/signature.css` | Panel showcase removed |
| `site/src/spec/*` (new) | Direction A specimen photographs (copies of `docs/phase-02/assets/fl/spec-*`) |

## 11. Limitations
- Direction A specimen photographs exist only at up to ~600–750 px wide. At the 1.55× dolly on 2× screens they are slightly soft, exactly as in the prototype.
- With specimen 3 selected, specimen 1 is off-screen and specimen 4 is under the drawer, as in Direction A. They are reached by clicking a visible neighbour or by Previous/Next.
- On the About hero, the boat behind the glass plate shows as a soft shadow, which is natural glass behaviour.
