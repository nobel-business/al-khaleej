# 05 — Raw Materials Redesign

Before: `qa-v2/before/en-raw-materials.jpg`, `qa-v2/before/ar-raw-materials.jpg`.
After: `qa-v2/after/en-raw-materials.jpg`, `qa-v2/after/ar-raw-materials.jpg`, `qa-v2/after/m390-en-raw-materials.jpg`, `qa-v2/after/m390-ar-raw-materials.jpg`.
Interaction states: `qa-v2/interactions/05–09`.

## What was wrong
* It was the only page with a non-standard hero: a grey 50/50 sticky split, which read as a different website.
* It had no narrative: four numbered paragraphs, a generic gallery, then a bleed card.
* It had no interaction.
* Three reference photos were shown side by side as a collage, with no story attached.

## New narrative (verified content only)

| # | Chapter | Content | Technique |
|---|---|---|---|
| 1 | **Hero** "Value begins / at sea." | Sunrise over a fishing ground; lede: whole marine fish, including sardines, from own vessels, ports and cold storage, to the receiving pit. Actions: *Explore the sources*, *Manufacturing* | Hero family: full bleed + mist; settle entrance; scroll exit |
| 2 | **At a glance** | Statement: quality begins before the plant. Four facts: *Whole* (fish used whole) · *Sardines* (and other suitable species) · *3* routes (own vessels, ports, cold storage) · *1* point of entry (receiving pit) | Ruled fact rail with staggered reveal |
| 3 | **Sources: three sources, one raw material** | Interactive profiles: **Company vessels** (Mediterranean, high seas, other grounds; fleet details *pending*) · **Ports & cold storage** (list of ports *pending*) · **The raw material** (whole fish; sardines and other suitable species; species list and catch areas *pending*) | Accessible tabs (click, arrows, Home/End); image wipe; facts with status pills |
| 4 | **The route: from the sea to the receiving pit** | Fishing grounds → Ports & cold storage → Transfer to the plant → Receiving pit → Two streams | SVG route drawn by scroll; nodes light in order; vertical timeline on mobile |
| 5 | **Into ingredients: one raw material, two ingredients** | After indirect steam cooking and pressing, the press cake becomes fish meal and crude fish oil is recovered from the press liquor. Links: Fish meal 60–72 %, Crude fish oil, *See the nine stages* | 7:5 composition, curtain reveal, linked product tiles |
| 6 | **Quality close** | "The quality of the raw material is the foundation of fish meal and fish oil quality." Board of what is *published once verified*: species list, catch areas, fleet details, ports and cold-storage list | Quote + readiness board |
| 7 | CTA | Brand-pattern band | — |

## Accuracy
* Every statement comes from the Phase 01 source content: own vessels in the Mediterranean, the high seas and other grounds; supply from ports and refrigerated storage; whole marine fish including sardines; transfer to the receiving pit; the nine confirmed stages.
* Nothing unverified is shown as fact. Fleet size, species list, catch areas and port list appear explicitly as **Pending verification**.
* The transfer mode to the plant is not stated (the step is "Transfer to the plant", with no truck or ship named).
* All photographs are captioned as industry reference photos from other ports, with authors and licences.

## Images (no repetition with other pages)
Hero `sunrise-sea` · Vessels `trawler` · Ports `crates` · Raw material `sardines-stack` · Ingredients `sardines-baskets`. Each is used once on the site, apart from credit thumbnails.

## Verified in the browser
* Tabs: click selects, ArrowRight moves focus and selection, the panel and image switch ✔.
* Route: 10 % / 45 % / 80 % / 100 % drawn at the matching scroll positions, lighting 1 / 2 / 4 / 5 nodes ✔.
* Arabic: the route mirrors and draws from the right; tabs sit on the right; "60–72 %" reads correctly ✔.
* 390 px: image-first hero, swipeable source tabs, vertical route ✔.
* Lighthouse accessibility 100 (EN and AR) ✔.
