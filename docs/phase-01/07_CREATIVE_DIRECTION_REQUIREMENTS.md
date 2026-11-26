# 07 — Creative Direction Requirements

This document defines what Phase 02 concepts must satisfy. It sets requirements and a recommended territory; it does **not** fix the final design.

---

## 1. The creative problem in one paragraph

Alkhaleej is a **new (2025)** Egyptian plant making **four commodity-grade ingredients** for B2B buyers who judge suppliers on **specification, consistency and trust**. The "2070" ambition must therefore make the company look *precise, modern and serious* — not big, old or global, which it cannot yet prove. The future here is a **future of precision and transparency**, not of spectacle. Every striking visual must carry real information (process, grade, parameter, stream) or move the buyer toward an inquiry.

## 2. North star

> **"The sea, measured."** — A cinematic journey from open water to a precisely engineered ingredient, told with the calm authority of a scientific instrument.

(Internal phrase for the team. Public tagline remains subject to approval — J1 "From Sea to Industry" is the current safe candidate.)

## 3. Experience principles (testable)

| # | Principle | Test in Phase 02 review |
|---|---|---|
| P1 | **Information is the ornament.** Visual complexity comes from real data/process, not decoration. | Remove any element that encodes no fact — does anything meaningful disappear? If not, delete it. |
| P2 | **One object in focus.** Each scene has one hero subject (fish, stream, grade, bag, parameter). | Can a buyer say what each screen is about in 3 words? |
| P3 | **Continuous space.** Navigation feels like moving through one environment (sea → plant → product → inquiry), not jumping between pages. | Transitions preserve spatial context. |
| P4 | **Precision typography.** Large calm type, tabular numerals, measured spacing; Arabic and English equally designed. | AR layout reviewed as a first-class design, not a mirror afterthought. |
| P5 | **Honest futurism.** Visualisation and illustration, never fake photography of facilities or claims. | Zero items from the Prohibited Claims list (05 §3). |
| P6 | **Inquiry is always one move away.** | RFQ reachable from every scene in ≤1 action, including mobile. |
| P7 | **Fast first, cinematic second.** Content readable before heavy media loads. | Page usable with JS/WebGL disabled and with reduced motion. |

## 4. Recommended creative territory — "Marine Precision" (for approval)

Three territories were considered; one is recommended.

| Territory | Idea | Verdict |
|---|---|---|
| **A. Marine Precision** ✅ | Deep-navy, almost architectural space; light behaves like light in water; the product line is shown as a clean **flow diagram/instrument** (one input → two streams). Orange is used like a laboratory indicator — sparse, meaningful, always tied to a value or action. | **Recommended.** Uses the brand's navy dominance, the icon's "cycle" meaning, and the business's real differentiator: grades and process. |
| B. Deep Current | Full-bleed ocean cinematography carries the whole site; industry appears late. | Beautiful but weak on B2B specifics; heavy media; risks stock-ocean cliché. Use as the *opening* only. |
| C. Industrial Monument | Brutalist plant architecture, steel, scale. | Implies scale and capacity the company cannot yet substantiate; risks fabricated-facility imagery. |

### 4.1 Signature moments (candidates to prototype in Phase 02)

1. **Opening — "From the sea"**: a slow descent from water surface into deep navy; sardine-type school forms and resolves into the three-fish *circular* rhythm (as motion of fish, **not** a deformation of the logo). Logo appears by a clean fade only.
2. **The Line — one input, two streams**: scroll-driven process diagram E1→E9. At pressing, the flow **splits**: solids → drying → cooling → antioxidant → 50 kg bags; liquids → separation → crude fish oil → drums. Each node reveals only confirmed wording. This is the site's intellectual centrepiece.
3. **The Grade Instrument**: 60 / 65 / 72 presented as a calibrated selector (dial/scale aesthetic). Selecting a grade focuses that product (camera glide, as in the video reference) and opens an in-context **spec drawer** whose unverified rows read "Available on request", with **Request a Quote for this grade** as the drawer's primary action.
4. **The Four Parameters**: protein · moisture · fat · ash shown as an elegant measurement interface explaining *why* each matters to feed formulators — **no numbers** until COAs are approved.
5. **Inquiry console**: the RFQ form designed as a calm, guided "order specification" (product → grade → volume → destination → documents), pre-filled from the scene the buyer came from.

### 4.2 Reading of the video reference (what to borrow)
| Borrow | Do not borrow |
|---|---|
| Product wall → camera glides to one item | Retail mechanics (price, sizes, cart) |
| Contextual side drawer with specs | Warm brown palette, lifestyle props |
| Minimal chrome, generous negative space | The LEDGE brand, layout or imagery |
| Physically convincing lighting | Ten-item scale (we have four products) |

## 5. Visual language requirements

- **Color:** Navy-dominant (dark-first experience recommended; light sections allowed for long-form reading). Orange ≤ ~5–8% of any screen; used for active states, data highlights, CTAs (navy text on orange). White for type and air. Only derived tints/shades of official hues (04 §3).
- **Type:** Cairo (AR, and headings per D-04), Montserrat Light for English body; tabular/lining numerals for grades; generous sizes (body ≥ 16 px; no 10–12 px body text).
- **Pattern:** the three-fish tessellation may appear as a subtle masked texture, a loading/transition motif or a section band — in approved color pairs only.
- **Imagery:** AI-generated or 3D-rendered *visualisations* (sea, sardine schools, abstract steam/pressing/drying, meal texture macro, oil viscosity, sealed bags/drums) — art-directed as one coherent set (same light, lens, grade). No humans in fake roles, no fake factory interiors, no certification marks, no world maps.
- **Iconography:** thin, geometric line icons consistent with Montserrat Light; no emoji-style or glossy 3D icons.
- **Data display:** spec tables and parameters designed as instruments — tabular alignment, units, status chips (Verified / Available on request).

## 6. Motion requirements

| Rule | Detail |
|---|---|
| Purpose | Motion explains flow, focus or state. No idle decorative loops except subtle ambient water light. |
| Character | Slow, damped, fluid ("water physics"): ease-out curves, 400–900 ms for scene transitions, 150–250 ms for UI. |
| Logo | Fade / uniform scale / clean reveal only. **No rotation (pending D-09), deformation, glow, particles, 3D.** |
| RTL | Directional motion (flows, timelines, swipes) mirrors in Arabic. Fluid process diagram must read right-to-left in AR or be direction-neutral (vertical). |
| Reduced motion | Every scroll-driven scene has a static, fully informative equivalent. |
| Performance | Animate `transform`/`opacity`; WebGL scenes lazy-loaded with poster fallback; 60 fps target on mid-range devices. |

## 7. Anti-patterns (reject on sight)

Neon glows · cyberpunk/HUD gaming interfaces · random holograms · floating 3D blobs/abstract spheres · glassmorphism everywhere · glitch effects · fake terminal text · stock "handshake/globe" imagery · world map with export arcs · countdown counters of fake numbers · certification badge rows · AI images of the "factory" captioned as real · scroll-jacking that blocks reading · auto-playing sound.

## 8. Conversion requirements

- Persistent **Request a Quote** (desktop & mobile).
- Product-level RFQ entry points that pre-fill product/grade.
- International Markets page tells buyers exactly what to include in an inquiry.
- Trust signals limited to verified facts: est. 2025, Kafr El-Sheikh, own vessels, whole marine fish, two-stream process, 50 kg / drums, four measured parameters.
- Future slots (hidden until evidence): COAs, certifications, capacity, port/Incoterms.

## 9. Bilingual creative requirements

- Design Arabic and English compositions **in parallel** for every key screen in Phase 02.
- Headline lengths differ (Arabic often shorter in width, taller in line-height) — layouts must flex, not depend on exact line breaks.
- Never letter-space Arabic; never use Latin-only display effects on Arabic text.
- Numerals per D-06.

## 10. Phase 02 deliverables expected (proposal)

1. Moodboard & art-direction sheet for "Marine Precision" (+ the two alternatives as small comparison frames).
2. Design tokens v0 (color incl. contrast table, type scale AR/EN, spacing, radii, motion tokens).
3. Key-screen prototypes, EN + AR, desktop + mobile: Home hero/opening, Process "The Line", Product detail with spec drawer, RFQ.
4. Motion study of the opening and the two-stream split (prototype or video).
5. AI imagery test set (6–8 frames) — **only after approval to spend generation credits**.
6. Review against the rubric below.

## 11. Concept evaluation rubric (score 1–5)

| Criterion | Weight |
|---|---|
| Brand fidelity (logo/color/type rules respected) | 20% |
| B2B clarity — buyer understands products, grades, process in < 60 s | 20% |
| Distinctiveness / "2070" sophistication without sci-fi clichés | 15% |
| Factual integrity (zero unverified claims) | 15% |
| Conversion path strength | 10% |
| Arabic quality & RTL integrity | 10% |
| Feasibility within performance & accessibility budgets | 10% |
