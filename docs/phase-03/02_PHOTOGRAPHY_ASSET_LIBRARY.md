# 02 — Photography Asset Library

All website imagery is in `site/src/images/` (masters) and is delivered from `site/dist/img/` as responsive AVIF → WebP → JPEG with `srcset`/`sizes`. Every image on the site carries a visible caption:

* **“Illustrative visualisation” / «تصوّر توضيحي»**: AI-generated. Never presented as Alkhaleej facilities, fleet, staff or products.
* **“Industry reference photo · author, licence”**: real open-licence photographs from **other** locations. Each links to `/credits/`, which gives author, licence, source and modifications (CC BY-SA attribution requirement).

No competitor images were used or hotlinked. No image comes from Google Images. No Alkhaleej-owned photography was supplied (see §6).

## 1. Raw materials & fish species

| Asset | Subject | Master size | Source / licence | Used in |
|---|---|---|---|---|
| `sardines-load` | Trawler hold filled with freshly landed sardines, Rameswaram, India | 3840×2880 | [Commons](https://commons.wikimedia.org/wiki/File:Trawler_filled_with_sardines_..JPG) · Rudolph.A.furtado · **CC0** | Home “Raw materials” bleed |
| `sardines-baskets` | Sardines loaded into weighing baskets, Rameswaram port | 3840×2880 | [Commons](https://commons.wikimedia.org/wiki/File:Tonnes_of_sardines_at_Rameswaram_fishing_port_in_India..JPG) · Rudolph.A.furtado · **CC0** | Raw materials split |
| `sardines-stack` | Baskets of sardines stacked on a trawler | 3840×2880 | [Commons](https://commons.wikimedia.org/wiki/File:%27Baskets_of_Sardines%27_stacked_in_a_fishing_trawler_in_Rameswaram_Port_in_India..JPG) · Rudolph.A.furtado · **CC0** | Raw materials gallery |
| `sardine-spiral` | Sardine school under a sunlit surface | 2048×1152 | AI (ElevenLabs · GPT Image 2.5) | Raw materials bleed |

Species: only **sardines** (and “other suitable species”) are confirmed (Phase 01, D2). No anchovy, mackerel or menhaden imagery is used. Species names in the reference captions describe the photograph, not Alkhaleej’s supply.

## 2. Fishing vessels & raw-material supply

| Asset | Subject | Master | Source / licence | Used in |
|---|---|---|---|---|
| `hero-dawn` | Purse seiner heading to the coast at sunrise | **3840×2160** | AI | Home hero |
| `med-boats` | Fishing boats returning on the Mediterranean near **Alexandria, Egypt** | 3840×2560 | [Commons](https://commons.wikimedia.org/wiki/File:Fishermen_Returning.jpg) · Myousry6666 · **CC BY-SA 4.0** | About hero, home International bleed, International split |
| `trawler` | Trawler BM482 off Berry Head, England | 3840×2880 | [Commons](https://commons.wikimedia.org/wiki/File:Brixham_Trawler_BM482_off_Berry_Head.jpg) · Partonez · **CC BY-SA 4.0** | Raw materials hero |
| `unloading` | Unloading fish, Newlyn Harbour fish market | 3840×2160 | [Commons](https://commons.wikimedia.org/wiki/File:Newlyn_Harbour_fish_market_unloading_fish.jpg) · Tom Corser · **CC BY-SA 3.0** | Contact hero, Raw materials gallery |
| `crates` | Fish crates on a fishing-port quay | 3840×2762 | [Commons](https://commons.wikimedia.org/wiki/File:In_the_fishing_port.jpg) · BogTar201213 · **CC BY-SA 4.0** | Manufacturing step 01, Raw materials gallery |
| `net-haul` | Purse-seine net drawn in at sunrise | 2K | AI | About split |
| `aerial` | Aerial: vessel inside a circular purse seine at sunrise | 2048×1152 | AI | International hero, CTA band |

## 3. Fishmeal (product accuracy: ultra-fine powder)

Every fishmeal image was inspected at **100% crop** for particle appearance. A first macro was **rejected** because it showed crumbly granules (see `05_IMPLEMENTATION_REPORT.md` §4). Accepted images show a smooth, velvety, homogeneous powder.

| Asset | Subject | Master | Source | Used in |
|---|---|---|---|---|
| `powder-pressed` | Ultra-fine powder in a steel tray, spatula-smoothed face against a loose feathered area | 2048×1360 | AI | Home fishmeal feature, Products, Quality hero, product galleries |
| `powder-flow` | Fine powder flowing from a steel scoop | 1664×2080 | AI | Home feature, product galleries |
| `powder-hall` | Bulk heap in a sunlit storage hall | 2048×1152 | AI | Products hero, Manufacturing step 06, galleries |
| `jar-60`, `jar-65`, `jar-72` | Fine powder in glass specimen jars on travertine, morning light | 1536×2048 | AI | Specimen shelf, product pages |

Colour: “natural warm tan-brown”. **Not** claimed as the colour of Alkhaleej grades. Each product page states that the actual colour of each lot is confirmed by sample.

## 4. Crude fish oil

| Asset | Subject | Master | Source | Used in |
|---|---|---|---|---|
| `oil-pour` | Thick, slightly cloudy amber crude oil poured in a viscous ribbon into a beaker | 1664×2080 | AI | Home oil feature, Manufacturing step 05, oil product gallery |
| `oil-tanks` | Sampling tap on a stainless tank filling a jar with amber oil | 2048×1152 | AI | Oil product gallery, Manufacturing “accuracy” note |
| `oil-flask` | Amber oil in a round-bottom flask on travertine | 2K | AI | Specimen shelf, oil product page |

No consumer supplement imagery (capsules, retail bottles) is used.

## 5. Manufacturing, factory, quality, storage & logistics

| Asset | Subject | Master | Source | Used in |
|---|---|---|---|---|
| `steam` | Steam and sunlight in a bright processing hall (no identifiable machinery) | 4K | AI | Manufacturing hero, step 03 |
| `sacks` | Unbranded white sacks on a pallet, bright warehouse | 2K | AI | Manufacturing step 09 |
| — | Decanters, centrifuges, presses, dryers, control rooms, laboratories, workers | — | **Not used** | These are unconfirmed for Alkhaleej (Phase 01 E10). Commons candidates were found (a rotary dryer, CC BY 3.0, and a laboratory spectrometer, CC BY-SA 4.0) but deliberately left out so that no unconfirmed equipment is implied. |

## 6. Gaps: authentic company photography required

The industry benchmark shows that credibility comes from real operations. The single most valuable next step is a two-session shoot (one dawn, one morning):

| # | Shot | Replaces |
|---|---|---|
| 1 | Own vessel at sea at sunrise (landscape + portrait) | `hero-dawn` |
| 2 | Net haul on an Alkhaleej vessel, crew with consent | `net-haul` |
| 3 | Sardines landed / delivered to the receiving pit | `sardines-*`, `crates` |
| 4 | Plant exterior and processing hall in morning light | `steam` |
| 5 | Each grade (60/65/72) photographed identically in glass, plus macro | `jar-*`, `powder-*` |
| 6 | Crude oil sample from the plant | `oil-*` |
| 7 | 50 kg bags and drums as actually used | `sacks` |
| 8 | QC sampling (if an in-house lab exists) | — |

Minimum source size: 4000 px on the long edge. Deliver RAW or maximum-quality JPEG; run `python -I site/src/images.py` to regenerate all variants.

## 7. Delivery specification

| Rule | Implementation |
|---|---|
| Formats | AVIF (q52) → WebP (q80) → progressive JPEG (q82) |
| Widths | 640 → up to 3200 (photos) / source maximum (AI), never upscaled |
| Hero | `<link rel=preload as=image imagesrcset>`, `fetchpriority=high`, no lazy-loading |
| Below the fold | `loading=lazy`, `decoding=async` |
| Layout stability | Intrinsic `width`/`height` on every `<img>`; aspect-ratio boxes |
| Focal point | Per-image `object-position` from the manifest (`site/src/images.py`) |
