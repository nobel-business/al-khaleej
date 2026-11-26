# 01 — Industry & Competitor Benchmark

**Date:** 25 Nov 2026 · **Method:** each homepage was loaded in headless Chrome at 1440×900. I captured the hero plus five scroll positions, and extracted navigation, headings, fonts, background colour, image counts and largest image width from the live DOM. Screenshots are in `docs/phase-03/research/` (`*_hero.jpg`, `strip_*.jpg`). Observations are from those captures only. Nothing was copied.

## 1. Companies reviewed

| # | Company | Country | Role | Link | Captured |
|---|---|---|---|---|---|
| 1 | Pelagia | Norway | Pelagic fish, fishmeal/oil, EPAX omega-3 | https://www.pelagia.com/ | ✓ |
| 2 | Daybrook Fisheries | USA | Menhaden fishmeal, fish oil, solubles | https://daybrook.com/ | ✓ |
| 3 | TASA | Peru | Largest Peruvian fishmeal & oil producer | https://www.tasa.com.pe/ | ✓ |
| 4 | IFFO — The Marine Ingredients Organisation | International | Industry body | https://www.iffo.com/ | ✓ |
| 5 | Omega Protein (Cooke) | USA | Menhaden protein & oil | https://www.omegaprotein.com/ | ✓ |
| 6 | Corpesca | Chile | Fishmeal & oil | https://www.corpesca.cl/ | ✓ |
| 7 | FF Skagen | Denmark | Fishmeal & oil | https://www.ffskagen.dk/ | ✓ |
| 8 | Pesquera Diamante | Peru | Fishmeal, oil, food fish | https://www.diamante.com.pe/ | ✓ |
| 9 | Oceana Group | South Africa | Fishing & processing (incl. fishmeal/oil) | https://www.oceana.co.za/ | ✓ |
| 10 | Exalmar | Peru | Fishmeal, oil, food fish | https://www.exalmar.com.pe/ | ✓ |
| — | Copeinca (Peru) | | | https://www.copeinca.com.pe/ | ✗ connection timed out |
| — | Triple Nine (Denmark) | | | https://www.triplenine.com/ | ✗ TLS certificate error |
| — | IFFO member directory | | | https://www.iffo.com/our-members | ✗ returned “521 Web server is down” at capture time. Additional producers were identified from industry knowledge instead (rows 6–10). Re-check later. |

## 2. Observations per company

| Company | Hero | Visual identity / type | Products presentation | Manufacturing & credibility | Notable |
|---|---|---|---|---|---|
| **Pelagia** | Video of crew on deck; headline “It’s all about the fish” in a coloured block | Warm off-white page (`rgb(249,249,244)`), Aeonik sans 60 px, pill navigation, strong purple accent | Small square product tiles (fish, meal, oil) | “We don’t waste, we innovate”; facilities; communities; career photography with real staff | Warm light background plus real people: closest to First Light |
| **Daybrook** | Full-screen video, logo centred, “Premium Marine Ingredients from a Sustainable Resource” | Lato 70 px, saturated blue/yellow | Three product panels (Fishmeal, Fish Oil, Fish Solubles) over large product photography: a meal heap, oil in lab glassware | Stats in copy (share of US Gulf catch) | Large product imagery of meal and oil is the strongest product storytelling in the set |
| **TASA** | Modal pop-up on arrival (fraud warning) covering the page; “client / supplier” persona split | No H1; serif fallback rendering at capture | Hidden behind persona choice | — | Shows the cost of interruptions: the first impression is a warning |
| **IFFO** | Fishing vessel photograph with birds; cookie panel over half the screen | Open Sans, institutional | Explains “What are marine ingredients?” | Industry statistics, membership | Useful educational reference; heavy consent UI |
| **Omega Protein** | Text slider “INCREDIBLY NUTRITIOUS PROTEIN. OCEANS OF IT.” (white at capture while loading) | Montserrat + Roboto Slab | Bags in warehouse; lab technician with sample flask | “Traceability”, “Certified sustainable” | Lab/QC photography with real staff builds credibility |
| **Corpesca** | Video, ocean in blue overlay, centred headline | Hanken Grotesk 44 px | Products & markets cards with photos | Six stat cards (export share, continents, certifications); certification logos (MarinTrust) | Numbers-first credibility, which Alkhaleej cannot use yet |
| **FF Skagen** | Carousel: vessel at quay, large condensed headline | Tahoma; dense mega-nav | Bag/pack photos, certificate thumbnails | Many policy pages | Dated, but very transparent |
| **Pesquera Diamante** | Decorative diamond graphic on white | Helvetica | Many images, mostly small | Fleet, plants | Graphic splash delays any photography |
| **Oceana** | Factory interior: worker in blue, steam, stainless equipment | Blue/yellow, card grid | Brand cards | Investor-heavy | Steam + stainless + worker is the archetypal processing image |
| **Exalmar** | Cookie modal; video; dusk sea | Varela Round | Product category cards | “Exalmar en cifras” | Very large source images (up to 9184 px) without responsive delivery |

## 3. Industry-wide patterns

**Strongest practices**
1. Real operations photography: crews on deck, steam in the plant, a lab technician with a sample. Credibility comes from people and places that clearly exist.
2. Product as material: fishmeal shown as a heap or close-up, and oil as amber liquid in glass (Daybrook, Pelagia).
3. Short, confident headlines over large imagery.
4. Numbers and certifications as trust devices (Corpesca, Omega Protein, FF Skagen).
5. Sustainability and traceability as standing navigation items.

**Weaknesses and opportunities**
1. Interruptions on arrival: pop-ups and cookie walls (TASA, IFFO, Exalmar) push the hero off screen.
2. Video heroes that are blank while loading (Omega Protein captured white). The image should be visible immediately.
3. Card grids with small thumbnails. Products are rarely given large, product-specific layouts.
4. Generic corporate blue dominates (Daybrook, Oceana, Corpesca, Exalmar). A warm, bright palette is distinctive in this category; Pelagia is the only one close.
5. Manufacturing is usually described in text. Few show the meal/oil split visually.
6. Arabic-language presence is absent across the benchmark set, which is an opening for an Egyptian producer.

## 4. Industry photography standards (what buyers expect to see)

| Subject | Standard observed | Alkhaleej approach |
|---|---|---|
| Vessels | Working vessels at sea, birds, gear on deck | AI dawn visualisation (hero) + open-licence trawler/Alexandria boats; replace with own fleet photography |
| Raw fish | Holds and baskets full of small pelagics | Open-licence sardine photographs (CC0), captioned as industry references |
| Fishmeal | Heap or close-up; brown, fine | Ultra-fine powder macro, flow and bulk (AI, checked at 100% for fineness) |
| Fish oil | Amber oil in lab glass, tanks | AI: viscous amber pour, tank sampling |
| Factory | Steam, stainless, workers in PPE | AI steam hall (no identifiable equipment); real plant photography is the biggest gap |
| QC | Lab technician, sample jars | Specimen jars; lab photography pending |
| Logistics | Bags on pallets, warehouses | AI sacks, powder hall |

## 5. Recommendations applied to Alkhaleej

| # | Recommendation | Implemented |
|---|---|---|
| R1 | Never interrupt the first view: no pop-ups, no cookie wall (the site uses no tracking cookies) | ✓ |
| R2 | Hero is a photograph, visible at first paint (AVIF preload, `fetchpriority=high`), not a video | ✓ |
| R3 | Give each product its own page with large imagery and a spec sheet structure buyers recognise | ✓ 4 product pages |
| R4 | Show the meal/oil split as a diagram (unique in the set) | ✓ two-stream diagram on 6 pages |
| R5 | Warm, bright First Light palette as category differentiator | ✓ |
| R6 | Use transparency instead of unproven stats: “Available on request / Pending verification” chips and a stated vs in-preparation ledger | ✓ |
| R7 | Full Arabic version with real RTL | ✓ 14 Arabic pages |
| R8 | Plan a real photo shoot (vessels, plant, lab, staff); this is what competitors win with | Documented in `02_PHOTOGRAPHY_ASSET_LIBRARY.md` §6 and `08_CONTENT_GAPS.md` |
