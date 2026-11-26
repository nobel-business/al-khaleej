# 06 — Image Art Direction: "First Light"

**Scope:** photography direction for Direction A (evolution) and for all future Alkhaleej website imagery.
**Inputs inspected:** 18 reference photographs added by the product owner to `DATA/` (inspected visually, one by one, on 24–25 Nov 2026), plus the existing brand book and the Phase 02 video reference.

> **Rights note.** The references are third-party photographs. Several carry visible credits or signatures (e.g. "Brook Peterson", "İbrahim Bilgin", "Corentin", "© Alaska Fish and Game"). They are treated strictly as **mood references** and are **not** used on the website. They are also too small for web use (236–736 px wide).

---

## 1. Reference inventory

| Ref | File | What it shows | Light | Viewpoint |
|---|---|---|---|---|
| R01 | `Commercial Fishing Industry Gets $1_6M in Grants.jpeg` | Crew in orange oilskins sorting catch on deck | Bright daylight, blue sea | Deck level |
| R02 | `Cormorant diving for baitfish_ Photo_ Brook Peterson.jpeg` | A baitfish school opening into an eye-shaped ring around a diving bird | Filtered daylight, teal | Underwater, vertical |
| R03 | `Larga.jpeg` | Purse-seine net drawn up the hull by a power block; crew in hi-vis | Vivid midday, cirrus sky | Deck, looking along hull |
| R04 | `Salmon haul.jpeg` | Brailer full of fish lifted beside a blue vessel | Soft overcast | Water level |
| R05 | `_ (1).jpeg` | Purse seiner, float line arc, water boiling with fish, gulls | Silver overcast | Elevated, from a second boat |
| R06 | `_ (10).jpeg` | Blue-and-yellow trawler in a lively sea with many gulls, orange net | Warm low sun | Water level |
| R07 | `_ (2).jpeg` | Seine operation: vessel, net, float line, small skiff with two fishermen | Clear daylight, deep blue | Elevated |
| R08 | `_ (3).jpeg` | Two fishermen in straw hats pulling a net with a large fish | Daylight, cool sea | Close, human scale |
| R09 | `_ (4).jpeg` | Crew hauling net with power block; sparkling backlit water | Golden backlight | Deck |
| R10 | `_ (5).jpeg` | School of jacks spiralling beneath a sunburst | Cobalt, sun-burst | Underwater, looking up |
| R11 | `_ (6).jpeg` | Sardine school as a sweeping wave against pale, high-key water | High-key | Underwater |
| R12 | `_ (7).jpeg` | Aerial: boat with five circular cast nets on turquoise water | Bright, even | Drone, top-down |
| R13 | `_ (8).jpeg` | Yellow fishing boat bow-on, gulls, coastal town | Bright summer daylight | Water level |
| R14 | `_ (9).jpeg` | Weathered trawler at golden hour, calm sea, gulls | Warm peach / golden | Water level |
| R15 | `_.jpeg` | Fishermen hauling a seine from a wooden boat | Muted overcast | Eye level |
| R16 | `_Moalboal Sardine Run_ … .jpeg` | Sardine "tornado" spiral beneath a sunburst; turtle; reef wall | Bright, luminous blue | Underwater, looking up |
| R17 | `fishermen.jpeg` | Aerial golden hour: three circular cast nets thrown from canoes | Warm gold-green | Drone, top-down |
| R18 | `life.jpeg` | Crew hauling a full seine; orange net; archival tone | Daylight | Deck |

## 2. What the product owner is drawn to (recurring preferences)

**Observed frequency across the 18 references:**

| Theme | Refs | Count |
|---|---|---|
| Authentic catch and human labour at sea | R01, R03, R04, R05, R07, R08, R09, R15, R18 | 9 |
| Vessel as hero, often with seagulls | R05, R06, R13, R14 (+ R07) | 4–5 |
| Fish schools forming spirals or rings, often under a sun-burst | R02, R10, R11, R16 | 4 |
| Aerial geometry of circular nets | R12, R17 (+ R05, R07 float-line arcs) | 2–4 |

**Interpretation:**
1. **Truth over polish.** The owner prefers real working scenes (nets, spray, gulls, gear) to studio sterility. The sea-to-catch journey is the emotional core.
2. **Natural light, mostly bright.** The large majority are in clear daylight or golden hour. Only a few are overcast and none are dark or moody. This directly supports the "First Light" brief.
3. **Circles.** Spirals of fish, rings of floats and circles of cast nets recur strongly. This is a gift: it echoes the **three-fish circular icon** of the brand ("the cyclical nature of life") without ever touching the logo.
4. **Brand-native colour, found in nature.** Cobalt and turquoise sea, white foam, hulls and gulls, and **safety-orange** gear and nets. The references are naturally navy / white / orange.
5. **Energy and abundance.** Motion (spray, flapping gulls, swirling schools) and plenty (full nets, dense schools) without chaos.

## 3. Photography direction: "First Light"

### 3.1 Lighting
- **Primary:** early-morning sun, 15–60 minutes after sunrise. Low angle, warm key light, long soft shadows, gentle mist on water.
- **Secondary:** clean bright morning daylight (clear sky, luminous blue water) for underwater and aerial shots.
- **Avoid:** night, dusk-dark moods, hard noon glare on people, flat grey overcast as a default, and heavy dark vignettes. These were the problem with the v1 dark direction.
- Interiors (plant, samples, packing): **window light** at a low angle, raking across surfaces, forming visible light patches and soft window-frame shadows.

### 3.2 Style
- Documentary realism with an editorial finish: real textures (rope, floats, spray, scales, granules) and natural imperfections.
- People only as they really are: Alkhaleej's own crew and staff, with consent, never posed models. In AI visualisations, people appear only as distant or back-view silhouettes with no identifiable faces (Phase 01 rule: no humans in fake roles).
- Product imagery as a "specimen" still life: glass vessels, travertine and limestone, warm plaster walls, sunlit. This continues Direction A's identity.

### 3.3 Composition and perspective
| Perspective | Use | Example in prototype |
|---|---|---|
| Water level / deck level | Vessels, hauling, the "from the sea" story | Hero window (`hero-sea`), company (`net-haul`) |
| Underwater looking up | Raw-material abundance, the circular school | Lens section (`sardine-spiral`) |
| Aerial top-down | Scale, geometry, the circle motif | International (`aerial`) |
| Still-life eye level | Products, samples, packing | Specimen shelf (`spec-*`), corridor |

- Leave a **calm sky or water area** for typography (top third on landscape heroes).
- Favour **diagonals** (nets, float lines, light shafts) and **circles** (schools, net rings).
- Provide every hero in a composition that survives **two crops**: 16:9 desktop, and a portrait crop (about 4:5) with the subject kept in the right third. The hero uses `object-position: 73% 50%` on mobile.

### 3.4 Colour and tone
| Element | Target |
|---|---|
| Highlights | Warm champagne / ivory. Avoid pure clipped white except specular glints. |
| Mid-tones | Natural skin and gear; orange gear may be the strongest accent |
| Water | Clean luminous cobalt to turquoise, not teal-orange "cinematic" grading |
| Shadows | Lifted, soft blue-grey; avoid crushed black |
| Saturation | Natural. Never neon, never desaturated "matte" |
| UI harmony | Image highlights should sit close to the page ivory (`#F7F2EA`) and sand (`#E4D4BB`) so photographs dissolve into the layout |

### 3.5 Treatment on the website
- Images **enter as light**: a sunrise wipe (veil lifts from the horizon), a clip-path wipe, an iris opening, or a lens. Never a plain fade-in.
- Still-life tiles are **feathered into the wall** (edge masks) so products appear to stand in the room, not in boxes.
- Subtle fixed **grain tile** on the ivory wall only (5.6 KB PNG), not on photographs.
- Every AI image is captioned **"Illustrative visualisation"** in a legible pill.
- Delivery: AVIF → WebP → JPEG via `<picture>` with `srcset`/`sizes`, intrinsic `width`/`height` to prevent layout shift, `loading="lazy"` below the fold, `fetchpriority="high"` + preload for the hero only.

## 4. What was produced for the evolved Direction A

13 new "First Light" visualisations (ElevenLabs · GPT Image 2.5, 2,977 credits) replace the dark v1 set. All are processed into responsive AVIF/WebP/JPEG in `assets/fl/`.

| Asset | Inspired by refs | Used in |
|---|---|---|
| `hero-sea` (2048×1152) — purse seiner at sunrise with gulls, mist, golden path | R06, R13, R14 | Hero window → full-bleed "From sea to industry" |
| `net-haul` (832×1040) — net and float line drawn in at sunrise, distant crew silhouettes | R03, R05, R09 | The company |
| `sardine-spiral` (2048×1152) — sardine spiral beneath a sun-burst, bright turquoise | R02, R10, R11, R16 | From the sea (lens) |
| `aerial` (2048×1152) — top-down vessel inside a circular purse seine at sunrise | R12, R17, R05 | International (iris) |
| `spec-60/65/72/oil` — specimen jars and oil flask on travertine in window light | Direction A identity + brief | Hero shelf, drawer, corridor |
| `sardines-ice`, `steam` (cropped to avoid depicting unverified equipment), `meal-macro`, `sacks` | Brief (process) | Manufacturing corridor |

The v1 dark images remain in `assets/` for the preserved v1 prototype.

## 5. Guide for selecting or producing future imagery

### 5.1 Priority order
1. **Real photography of Alkhaleej's own vessels, crew, plant and products**, shot at dawn. This is the strongest option and removes the "illustrative" caveat. Recommended before launch.
2. Licensed documentary photography that matches §3, where own photography isn't possible (no recognisable third-party brands or vessel registrations).
3. AI visualisations, as now: interim only, captioned, and never depicting unverified equipment, certificates, people in identifiable roles, or named vessels.

### 5.2 Shot list for a commissioned shoot (one dawn + one morning)
| # | Shot | Time | Notes |
|---|---|---|---|
| 1 | Own vessel leaving port / at sea with gulls, sun low behind | Sunrise | Hero; keep sky clean for type; landscape + portrait |
| 2 | Net and float line being hauled, spray backlit | Sunrise +30 min | Crew consent; hi-vis orange welcome |
| 3 | Drone top-down of the seine circle | Early morning | Aerial; circle motif |
| 4 | Fresh whole sardines in crates / on ice at the receiving point | Morning | Real raw material; steel and ice |
| 5 | Plant exterior in first light | Morning | Architecture only; no unconfirmed claims |
| 6 | Steam and light inside the cooking hall | Morning | Abstract, atmospheric; only equipment the client approves showing |
| 7 | Fish-meal samples per grade in glass jars, window light | Morning | Same set-up as the specimen shelf; identical framing for all 4 |
| 8 | Crude fish oil in a glass vessel, back-lit | Morning | Amber glow |
| 9 | 50 kg bags on pallets; drums | Morning | Only real production packaging |

### 5.3 Acceptance checklist (every image)
- [ ] Natural morning or bright daylight; no dark or moody grade
- [ ] Highlights warm, water blue and clean, shadows lifted
- [ ] Clear subject; diagonal or circular structure; space for type if it's a hero
- [ ] Works in both 16:9 and portrait crops
- [ ] No unverified equipment, certificates, competitor or vessel markings, or identifiable people without consent
- [ ] Minimum source size: 2400 px wide (heroes), 1600 px (sections), 1200 px (product)
- [ ] Exported to AVIF/WebP/JPEG at the widths used in the prototype

### 5.4 Prompt template for interim AI visualisations
> *[subject], [viewpoint]. Soft golden early-morning sunlight, low sun, warm champagne highlights, luminous clean blue water, gentle mist, lifted soft shadows. Bright, airy, optimistic, high-key but not overexposed. Natural colour, documentary realism, medium-format look, fine grain. [space for typography if hero]. No text, no logos, no watermarks, no recognisable faces.*
