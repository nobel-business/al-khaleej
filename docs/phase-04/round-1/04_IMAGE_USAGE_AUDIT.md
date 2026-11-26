# 02 — Image Usage Audit

Measured on the built English site (`site/dist/en`, every page except `/credits/`, whose thumbnails are attribution records). The Arabic site uses the same placements. A *placement* is one `<img>` rendered on a page.

## Before: Phase 03

**82 placements using 22 images.** Heaviest repetition:

| Image | Uses | Main cause |
|---|---|---|
| `aerial` | 12 | Identical CTA band closing 11 pages, plus the home page |
| `jar-65` | 7 | Shelf on home + products hub, product hero, "other products" grid on 3 product pages, drawer |
| `oil-flask` | 7 | Same pattern |
| `jar-60`, `jar-72` | 6 each | Same pattern |
| `powder-pressed` | 6 | Home, products hub, 3 fish meal pages, quality |
| `powder-hall` | 5 | Products hub, quality, product pages |
| `powder-flow`, `med-boats` | 4 each | Several page heroes and splits |

Because the same frames recurred in different box shapes (tall split, wide bleed, card), several pages showed different *crops* of one photograph. A visitor reads these as one recycled image.

## Changes made

1. **The CTA band has no photograph.** It now uses the brand's official three-fish pattern from the brand guidelines, which removed 11 `aerial` placements.
2. **Specimen jars appear in exactly two places:** the products-hub shelf and that product's own page. The home page shelf was removed, because the home journey now has dedicated fish meal and crude oil chapters. "Other products" on each product page became typographic cards (grade numeral plus name).
3. **Each chapter has its own primary image.** Sixteen new images were added:
   - **AI chapter images (11):** receiving, conveyor, cooker, press, separation, cooling, packing, sampling, loading, drums and sieve. Each depicts a stage confirmed in the Phase 01 source documents.
   - **Open-licence Commons photographs (5):** rotary dryer, food laboratory, boats at dusk, sunrise sea and harbour vessel.
4. **No crops presented as new images.** Every placement uses the full frame with object-fit cover at its focal point. The loupe magnifies the *same* image in place and is labelled as an inspection tool, not a new picture.
5. **No upscaling.** New AI images were generated at 2048 px wide (1664 px for portrait); Commons photos are 1920–3840 px. `sizes` is computed from each box's geometry, so the browser selects a variant at least as wide as the rendered size × DPR (method in Phase 03 `06`).

## After: Phase 04

**46 visible placements using 38 images. Every image appears at most twice.**

The manufacturing page renders its nine stage images twice in the DOM: once in the pinned theatre (≥ 900 px) and once in the stacked mobile version. Only one of the two is displayed, so these are counted once. Hidden copies are lazy and not downloaded; the one exception is the first theatre image, which is eager for desktop LCP and therefore also fetched on phones. The specimen drawer re-shows the selected card's image at a larger size; that is the same picture enlarged on demand, not a new placement.

| Image | Subject | Source | Source resolution | Visible uses | Pages |
|---|---|---|---|---|---|
| `f-sieve` | Ultra-fine fish meal sifting through a laboratory test sieve like mist | AI-generated · illustrative | 1664×2080 | 2 | /en/quality/, /en/products/fish-meal-65/ |
| `jar-60` | Fine fish meal powder in a glass specimen jar in morning light | AI-generated · illustrative | 1536×2048 | 2 | /en/products/, /en/products/fish-meal-60/ |
| `jar-65` | Fine fish meal powder in a glass specimen jar in morning light | AI-generated · illustrative | 1536×2048 | 2 | /en/products/, /en/products/fish-meal-65/ |
| `jar-72` | Fine fish meal powder in a glass specimen jar in morning light | AI-generated · illustrative | 1536×2048 | 2 | /en/products/, /en/products/fish-meal-72/ |
| `m-receiving` | Fresh sardines tipped into a stainless-steel receiving hopper | AI-generated · illustrative | 2048×1360 | 2 | /en/, /en/manufacturing/, /en/manufacturing/ (mobile stack) |
| `m-separation` | Golden crude fish oil separating above water in a tank sight glass | AI-generated · illustrative | 2048×1360 | 2 | /en/, /en/manufacturing/, /en/manufacturing/ (mobile stack) |
| `oil-flask` | Amber crude fish oil in a glass laboratory flask | AI-generated · illustrative | 1536×2048 | 2 | /en/products/, /en/products/crude-fish-oil/ |
| `steam` | Steam rising in a bright processing hall | AI-generated · illustrative | 3840×2160 | 2 | /en/, /en/manufacturing/, /en/manufacturing/ (mobile stack) |
| `aerial` | Aerial view of a fishing vessel inside a circular purse-seine net at sunrise | AI-generated · illustrative | 2048×1152 | 1 | /en/ |
| `boats-dusk` | Fishing boats at anchor on a still sea at sunrise | Commons · Susan Bell, CC BY 2.0 | 3840×2560 | 1 | /en/about/ |
| `crates` | Fish crates on the quay of a fishing port | Commons · BogTar201213, CC BY-SA 4.0 | 3840×2762 | 1 | /en/raw-materials/ |
| `dryer` | A large industrial rotary dryer in a processing hall | Commons · Heyl &amp; Patterson Inc., CC BY 3.0 | 3840×2498 | 1 | /en/manufacturing/, /en/manufacturing/ (mobile stack) |
| `harbour-vessel` | A fishing vessel under way in New York Harbour | Commons · ImagePerson, CC BY 4.0 | 3840×2276 | 1 | /en/international-markets/ |
| `hero-dawn` | A purse-seine fishing vessel heading toward the coast at sunrise | AI-generated · illustrative | 3840×2160 | 1 | /en/ |
| `l-drums` | Rows of navy steel drums in a sunlit warehouse | AI-generated · illustrative | 2048×1152 | 1 | /en/products/crude-fish-oil/ |
| `l-loading` | A pallet of 50 kg sacks loaded onto a truck at sunrise | AI-generated · illustrative | 2048×1152 | 1 | /en/international-markets/ |
| `lab` | An infrared spectrometer in a food-testing laboratory, Czech Republic | Commons · Sarka Na kopci, CC BY-SA 4.0 | 1920×1210 | 1 | /en/ |
| `m-conveyor` | Whole sardines carried up an inclined stainless-steel conveyor | AI-generated · illustrative | 2048×1360 | 1 | /en/manufacturing/, /en/manufacturing/ (mobile stack) |
| `m-cooker` | A horizontal stainless-steel steam cooker in a bright processing hall | AI-generated · illustrative | 2048×1152 | 1 | /en/manufacturing/, /en/manufacturing/ (mobile stack) |
| `m-cooling` | Ultra-fine fish meal turned by a paddle screw in a cooling trough | AI-generated · illustrative | 2048×1360 | 1 | /en/manufacturing/, /en/manufacturing/ (mobile stack) |
| `m-packing` | Fish meal filled into a 50 kg sack at a bagging station | AI-generated · illustrative | 2048×1360 | 1 | /en/manufacturing/, /en/manufacturing/ (mobile stack) |
| `m-press` | Press cake leaving a screw press while press liquor drains below | AI-generated · illustrative | 2048×1360 | 1 | /en/manufacturing/, /en/manufacturing/ (mobile stack) |
| `med-boats` | Fishing boats returning on the Mediterranean near Alexandria, Egypt | Commons · Myousry6666, CC BY-SA 4.0 | 3840×2560 | 1 | /en/ |
| `net-haul` | A purse-seine net being drawn in at sunrise | AI-generated · illustrative | 1664×2080 | 1 | /en/about/ |
| `oil-pour` | Thick amber crude fish oil being poured into a glass beaker | AI-generated · illustrative | 1664×2080 | 1 | /en/ |
| `oil-tanks` | Crude fish oil sampled from a stainless-steel tank into a glass jar | AI-generated · illustrative | 2048×1152 | 1 | /en/products/crude-fish-oil/ |
| `powder-flow` | Fine fish meal powder flowing from a steel scoop | AI-generated · illustrative | 1664×2080 | 1 | /en/products/fish-meal-60/ |
| `powder-hall` | A heap of fine fish meal powder in a sunlit storage hall | AI-generated · illustrative | 2048×1152 | 1 | /en/products/fish-meal-72/ |
| `powder-pressed` | Ultra-fine fish meal powder in a steel sample tray, partly smoothed with a spatula | AI-generated · illustrative | 2048×1360 | 1 | /en/ |
| `q-sampling` | A fish meal sample on an analytical balance in a bright laboratory | AI-generated · illustrative | 2048×1360 | 1 | /en/quality/ |
| `sacks` | Stacked white industrial sacks on a pallet in a bright warehouse | AI-generated · illustrative | 2048×1360 | 1 | /en/products/ |
| `sardine-spiral` | A school of sardines spiralling beneath a sunlit sea surface | AI-generated · illustrative | 2048×1152 | 1 | /en/ |
| `sardines-baskets` | Sardines being loaded into weighing baskets at a fishing port, India | Commons · Rudolph.A.furtado, CC0 | 3840×2880 | 1 | /en/raw-materials/ |
| `sardines-load` | A fishing boat hold filled with freshly landed sardines, Rameswaram, India | Commons · Rudolph.A.furtado, CC0 | 3840×2880 | 1 | /en/ |
| `sardines-stack` | Baskets of sardines stacked on a fishing boat, India | Commons · Rudolph.A.furtado, CC0 | 3840×2880 | 1 | /en/raw-materials/ |
| `sunrise-sea` | A fishing boat on the horizon at sunrise off Chennai, India | Commons · Timothy A. Gonsalves, CC BY-SA 4.0 | 3840×2560 | 1 | /en/raw-materials/ |
| `trawler` | A fishing trawler at sea off Berry Head, England | Commons · Partonez, CC BY-SA 4.0 | 3840×2880 | 1 | /en/raw-materials/ |
| `unloading` | Unloading fish at Newlyn Harbour fish market, England | Commons · Tom Corser, CC BY-SA 3.0 | 3840×2160 | 1 | /en/ |

### Primary image per major chapter

| Chapter | Primary image | Secondary |
|---|---|---|
| Home · the sea (hero) | `hero-dawn` | `sardine-spiral` (revealed under the water line) |
| Home · the catch | `med-boats`, `sardines-load`, `unloading`, `m-receiving` (horizontal sequence) | — |
| Home · the line | `steam` | — |
| Home · fish meal | `powder-pressed` (with loupe) | — |
| Home · crude oil | `oil-pour` | `m-separation` |
| Home · quality | `lab` | — |
| Home · ready for the world | `aerial` (iris) | — |
| About | `boats-dusk` | `net-haul` |
| Raw materials | `trawler` | `sardines-stack`, `sardines-baskets`, `crates`, `sunrise-sea` |
| Manufacturing | 9 stage images (`m-*`, `dryer`, `steam`) | — |
| Quality | `q-sampling` | `f-sieve` |
| International | `l-loading` | `harbour-vessel` |
| Products hub | 4 specimens | `sacks` |
| Fish Meal 60 / 65 / 72 | `jar-60` / `jar-65` / `jar-72` | `powder-flow` / `f-sieve` / `powder-hall` |
| Crude Fish Oil | `oil-flask` | `oil-tanks`, `l-drums` |
| Contact | — (form-first page; no decorative image) | — |

### Product accuracy

* **Fish meal** is always shown as an ultra-fine, homogeneous powder: `powder-pressed`, `powder-flow`, `powder-hall`, `f-sieve`, `m-cooling` and the jars. The fineness of each was checked at a 100 % crop; no granules, flakes or fragments appear.
* **Crude fish oil** is shown thick, unrefined and golden-to-amber (`oil-pour`, `oil-flask`, `oil-tanks`). Oil–water separation shows an oil layer over water in a sight glass, without naming the equipment type (centrifuges and decanters are not confirmed).

### Known resolution limits

Some AI images are 2048 px wide at source: `aerial`, `sardine-spiral`, `powder-pressed`, and the 2048-wide stage images. At full-bleed on 2–3× DPR displays wider than about 1000 CSS px, the browser serves the 2048 variant below native density. This is not visible at 1× and 1.5×, and these images are never artificially upscaled. Replacing them with commissioned photography of the actual plant removes the limit.
