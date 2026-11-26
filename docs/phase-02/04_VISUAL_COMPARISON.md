# 04 — Visual Direction Comparison

Three directions, all built on the same verified content, the same brand assets (extracted from the brand PDF, not redrawn) and the same art-directed image set, so the differences come from design philosophy alone.

| | **A — The Specimen Room** | **B — Tidal Editorial** | **C — The Line** |
|---|---|---|---|
| File | `01_VISUAL_DIRECTION_A.html` | `02_VISUAL_DIRECTION_B.html` | `03_VISUAL_DIRECTION_C.html` |
| One-line idea | A dark gallery where the four products are lit specimens. The cursor is the inspection lamp. | A luxury marine journal. Huge type, white space and image reveals, with products as an editorial index. | One continuous descent from sea to inquiry. A live sardine school, a scroll-drawn process and a grade instrument. |
| Relationship to the video | **Closest.** Product-wall hero, cursor-as-light, hover reveal, click dolly-in, side drawer, prev/next pan. | **Same DNA, different philosophy.** Light → lens reveal. Hover reveal → floating product preview. Drawer → full-height spec sheet. | **Pushed further.** The camera never cuts, light drives attention, and the interaction proves the story (school reacts to light; flow splits into two streams). |
| Mode | Dark (navy room, warm gallery light) | Light (paper white, navy type), with dark image chapters | Dark (water depth gradient from surface to abyss) |

---

## Direction A — The Specimen Room

**Visual identity:** navy plaster "room", one warm key light, glass specimen jars of fish meal and an amber flask of crude fish oil on a single long shelf. Very low text density, small precise UI type, orange used only for the CTA and active markers.

**Typography:** Montserrat (Light/Regular/Medium) at modest sizes for headlines and UI, matching the reference's quiet grotesk. Cairo for Arabic lines. No display-size type anywhere. Restraint is the hierarchy.

**Hero:** the shelf *is* the hero. The light follows the pointer and sweeps by itself when idle. The specimen under the light "flashes" and reveals its name and packing. Click → the camera dollies in, a right-hand drawer opens with index `02 / 04`, the spec rows (unverified rows shown as *Available on request* / *Pending verification*) and **Request a quote for this grade**. ← → and Esc work. The CTA pre-fills the RFQ.

**Navigation:** minimal top chrome (logo, breadcrumb, **Index** overlay, quote pill), like the reference's near-invisible chrome. A full-screen index lists all chapters.

**Content presentation:** gallery-label fact lists, a spot-lit sardine-school scene (move the light through the water), a horizontal **corridor** of nine process stations where only the station under the light is lit, quality "plaques" that warm under hover, and a dark RFQ.

**Motion language:** smoothed light-follow, a flash on hover, 520 ms ease-out camera moves, "lights-on" image reveals (dark → lit), slow rises.

| Strengths | Weaknesses / risks |
|---|---|
| Most faithful to the owner's demonstrated taste. The signature interaction maps exactly onto the reference. | Closest to the reference, so the least "ownable" as a concept if competitors adopt the same pattern. |
| Products are visible in the first second, which suits B2B buyers. | Dark, low-density pages carry less long-form information. Some buyers want more text up front. |
| The four-product catalogue suits the specimen-shelf metaphor perfectly. | The camera zoom upscales imagery. Production needs higher-resolution (2–3K) product renders. |
| Strong mobile adaptation: a snap carousel with the centred specimen lit, plus a bottom sheet. | Uses transform/filter effects heavily. Needs performance tuning on low-end Android. |

---

## Direction B — Tidal Editorial

**Visual identity:** a premium magazine. Paper-white ground, navy ink, hairline rules, numbered chapters (01–07) with Arabic chapter names, full-bleed dark photography as chapter breaks. Orange is used only for hairlines, chapter numbers and hover underlines.

**Typography:** **Cairo Bold at display scale** (up to ~200 px) for the headline system, Montserrat Light for long-form body. This is the most typographic of the three, and follows the brand book's own use of Cairo Bold for Latin headings.

**Hero:** "From sea / to industry." split around a cinematic band of the sardine school. The band shows the image in navy duotone. A **lens** follows the cursor and reveals the school in full light and colour (the reference's "flash", translated into an editorial reveal). Lines rise in, and the band wipes open from the centre.

**Navigation:** a classic masthead (split nav around a centred full-colour logo) that condenses on scroll and highlights the active chapter. On mobile, a full-screen editorial menu wipes down.

**Content presentation:** the product **index list**. Huge product names. On hover the row inverts to navy and a product photo floats beside the cursor with inertia and tilt. Click opens a **full-height specification sheet** (image + table + CTA, prev/next, Esc). Manufacturing is **sticky scrollytelling**: images wipe in on a sticky stage as the nine steps scroll past, followed by an SVG "two streams" fork that draws itself. Quality is four giant words with an underline drawn on hover.

**Motion language:** masked line-by-line text rises, clip-path wipes, parallax on the vessel chapter, cursor-following preview, hairlines drawing in. Slower, more deliberate easing (cubic-bezier .7,0,.2,1).

| Strengths | Weaknesses / risks |
|---|---|
| Highest legibility and information capacity. It reads like a serious international corporate site and suits procurement teams. | Light mode moves away from the dark, physical, lit-object feel of the reference. The owner may find it less "2027". |
| Bilingual typography is showcased best (Arabic chapter names, Arabic echoes under English headlines). | The editorial index pattern is known in premium web design. Distinctiveness relies on execution quality. |
| Very robust technically (no canvas, little GPU work). Easiest to localise into RTL and to maintain. | Display type at 200 px requires careful copy-length control in Arabic. |
| The spec sheet gives the most room for future datasheets and COAs. | Imagery is used as editorial breaks rather than as the interactive core. |

---

## Direction C — The Line

**Visual identity:** an immersive, continuous underwater space. The background darkens from surface blue to abyss as you scroll. A **live, procedurally animated sardine school** swims across the hero and reacts to the cursor light: fish near the light flash silver and part around it. Instrument typography: tabular numerals, uppercase micro-labels, outline numerals.

**Typography:** pairs **Montserrat ExtraLight (200)** with **Cairo Bold** in the same headline ("From sea / **to industry.**"). The thin/heavy contrast reads as "measured / manufactured". A Cairo Black outline is used for the grade readout.

**Hero:** centred statement over the live school, light rays from the surface, honest corner readouts (location, est. 2025, product list). No fake coordinates or statistics.

**Navigation:** a vertical **depth rail** (chapter dots that reveal labels, with an orange fill tracking progress). On mobile, a floating **dock** shows the current chapter plus the quote button.

**Content presentation:**
- **Origin:** an iris reveal of the vessel image, scrubbed by scroll.
- **The Line:** a pinned, scroll-drawn flow diagram. One input → pressing → **splits** into a meal stream (to 50 kg bags) and an oil stream (to drums), with particles flowing along the drawn path and a live caption for the current step. Vertical on mobile.
- **Products:** a **grade instrument**: a 270° dial (draggable, keyboard-operable, `role="slider"`) with the needle on 60/65/72, an outline readout, a cross-fading specimen and a crude-oil mode.
- **Quality:** four instrument bezels with a sweeping marker and **no values** (honest).
- **Company:** a **transparency ledger**: "Stated today" (verified facts) vs "Provided on request · in preparation".
- **Inquiry:** a 3-step **console** (Product → Company → Review & send) with progress bars.

**Motion language:** continuous physics (flocking), light-reactive elements, scroll-scrubbed drawing, blur-to-sharp reveals, needle easing. The most motion of the three, all of it purposeful.

| Strengths | Weaknesses / risks |
|---|---|
| The most distinctive and ownable. The process split and the grade dial turn Alkhaleej's real differentiators into interactions. | Highest build and QA cost: canvas animation, scroll-pinned SVG, more device testing. |
| The transparency ledger turns "missing information" into a credibility feature. | The ledger publicly lists items "in preparation". The owner must be comfortable with that honesty. |
| Most memorable first impression; the live school is unmistakably marine. | Heavy motion must be carefully tuned for low-end mobiles and reduced-motion users (fallbacks implemented). |
| The inquiry console qualifies leads better (frequency, destination, review step). | Least conventional navigation. Some corporate visitors may prefer a classic menu. |

---

## How each reflects the owner's taste (from `00_USER_VISUAL_TASTE_ANALYSIS.md`)

| Taste principle | A | B | C |
|---|---|---|---|
| Product-as-hero, no banner | ●●● shelf is the hero | ●○○ hero is typographic; products are chapter 02 | ●●○ products are the instrument chapter; hero is the sea |
| Cursor = light / interaction proves the story | ●●● inspection lamp + flash | ●●○ lens reveal | ●●● school reacts to the light |
| Physical, lit environment | ●●● | ●○○ | ●●○ (water space) |
| Low text density, small precise type | ●●● | ●○○ (editorial, more text) | ●●○ |
| Click = camera move, context preserved | ●●● dolly + pan | ●●○ sheet slides over context | ●●● continuous descent, no page cuts |
| Calm physics | ●●● | ●●● | ●●○ (more motion) |

## Shared across all three (unchanged by direction)

- Verified content only. Unverified items appear as *Available on request* / *Pending verification*.
- Logo used exactly as extracted from the brand PDF (approved colourways, no effects or rotation).
- Contact: **alkhaleej@nobelbusinessgroup.com** · **+20 109 655 5525** · **+20 106 047 3790** · Kafr El-Sheikh, Egypt (full address pending).
- RFQ with labelled fields, validation and consent. It opens a pre-addressed email (an honest prototype behaviour; no server).
- Responsive desktop → mobile, keyboard-operable, `prefers-reduced-motion` fallbacks, no horizontal overflow.
- Every AI image is captioned "Illustrative visualisation".

**No direction is recommended here.** Selection is the product owner's decision. Hybrids are possible, e.g. A's specimen shelf inside C's continuous space, or B's spec sheet in A.
