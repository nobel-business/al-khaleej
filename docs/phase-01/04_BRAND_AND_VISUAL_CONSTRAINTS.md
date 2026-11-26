# 04 — Brand & Visual Constraints

Source: `AL KHALEEJ BD.pdf` (Brand Guidelines 2024, 35 pp.), verified by pixel sampling and visual inspection. Colors below were **measured** from the PDF rasters, not just read from labels.

---

## 1. MANDATORY (non-negotiable)

### 1.1 Logo
| Rule | Detail | Source |
|---|---|---|
| Composition | Arabic wordmark **الخليج** + subline **لصناعة الأسماك** (Cairo Regular) + three-fish circular icon to the **right** of the wordmark. | p4 |
| Approved lockups | (1) Full horizontal lockup; (2) Wordmark alone (p6); (3) Icon alone (p11). | p4, p6, p11 |
| Approved colorways — lockup | Navy wordmark + orange icon on **white**; white wordmark + orange icon on **navy**; white wordmark + navy icon on **orange**. Nothing else. | p7 |
| Approved colorways — icon | Orange on navy; white on orange; navy on white. | p13 |
| Clear space | Defined by construction grid; measured ≈ ⅕ of lockup height on all sides (lockup), ≈ 19% of icon width (icon). Exact unit to be confirmed from the vector master. | p5, p11 |
| Prohibited | No drop shadows or strokes · no effects (glow, gradient, bevel, blur, glass) · do not add/remove elements · do not resize elements independently, flip, stretch, rotate, warp or change letter spacing. | p9 |
| Proportion | Lockup aspect ≈ 3.98 : 1 (from PDF p4). | measured |
| Never | Recreate, redraw, AI-generate, trace, retype or recolor the logo. Never mirror it in RTL layouts. | Phase-01 brief, p9 |

**Implications for a "2070" experience:** the logo cannot be animated by deformation, particle-dissolve, 3D extrusion, chrome/glass shading, or glow. Permitted: fade, uniform scale, mask/reveal by a clean wipe, and placement over approved background colors. Rotating the *icon as a whole* is a rotation → **not permitted** without explicit approval (Decision D-09) — even though the icon concept is about circular motion.

### 1.2 Colors (measured)
| Token | HEX | RGB | Role in book |
|---|---|---|---|
| Navy | **#0C3048** | 12, 48, 72 | Water & nature; wordmark; dominant dark |
| Orange | **#E38B06** | 227, 139, 6 | Warmth & energy; icon; accent |
| White | **#FFFFFF** | 255, 255, 255 | Ground |

No secondary or neutral palette is defined in the book.

### 1.3 Typography
| Role (book) | Font | Scripts shown in book |
|---|---|---|
| Heading | **Cairo Bold** | Arabic **and Latin** (p17) |
| Sub-heading | **Cairo Regular** | Arabic **and Latin** (p18) |
| Description | **Montserrat Light** | Latin (p19) |
| Lettermark (logo lettering only) | **ElHurra Regular** | Arabic + Latin (p8) — not for UI text |

⚠ **Conflict C-04:** the Phase 01 brief specifies "English headings and body: Montserrat Light". The brand book uses **Cairo Bold for Latin headings** and Montserrat Light for description text. → Decision D-04. Options:
- (a) Follow the book strictly: Cairo for all headings (AR+EN), Montserrat Light for English body, Cairo Regular for Arabic body.
- (b) Follow the brief: Cairo for Arabic, Montserrat (Light body + heavier headings) for English.

Both Cairo and Montserrat are open-source (SIL OFL) on Google Fonts and support variable weights — no licensing blocker. ElHurra licensing is unknown but irrelevant if it is used only inside the logo artwork.

### 1.4 Pattern
Icon-derived tessellation in three approved colorways: orange-on-navy (p21), navy-on-white (p22), white-on-orange (p23). Used in the book as **bands/borders** (packaging bottom band, notebook, folder) — not as full-page wallpaper in applications. Master Brief: "subtle use, avoid over-decoration".

### 1.5 Icon meaning (approved narrative)
"Three fish swimming in a circle — unity, harmony, the cyclical nature of life… balance and tranquility… birth, growth and renewal… abundance, a plentiful harvest or a prosperous business." (p10, p12)

---

## 2. REINVENTABLE (open for the 2070 direction)

| Element | What the book does | Freedom |
|---|---|---|
| Layout & grid | Slide-style layouts, oversized section numerals (01–06) | Fully reinventable. |
| Photography style | Stock-like fish photos (mullet in teal water, koi, tilapia) | Fully reinventable — and **should** change: these species are not sardines/marine feed fish. |
| Imagery medium | Photo + mockups | AI imagery, 3D, scientific visualization, video allowed (with honesty rules, §5). |
| Extended palette | Not defined | May add tints/shades derived from navy & orange (see §3). |
| Type scale, weights, rhythm | Not defined | Free within approved families. |
| Iconography (UI icons) | Not defined | Free; must harmonise with geometric/Kufi character. |
| Motion | Not defined | Free, except it must never deform/rotate the logo. |
| Pattern usage on web | Bands only | May become a subtle texture/mask/data-motif — colors stay in approved pairs. |
| Packaging visuals on site | Mockups incl. "Premium" label & contact block | May show packaging only after the real bag artwork is confirmed; never show unverified label text. |

---

## 3. Derived palette — proposal (requires approval, D-10)

Derived from official hues only (no new hues). Values are candidates to validate in Phase 02.

| Proposed token | HEX | Derivation | Intended use |
|---|---|---|---|
| navy-950 "Abyss" | #061A28 | Navy darkened | Deepest backgrounds for cinematic sections |
| navy-900 | #0A2638 | Navy −15% L | Elevated dark surfaces |
| **navy-800 (brand)** | **#0C3048** | Official | Primary dark |
| navy-600 | #1F4A66 | Navy +L | Borders/dividers on dark |
| navy-300 | #8FA6B5 | Navy tint | Secondary text on dark (verify contrast) |
| navy-50 | #EEF3F6 | Navy tint | Light section grounds |
| **orange-500 (brand)** | **#E38B06** | Official | Accent, CTA fill, data highlight |
| orange-600 | #C67A05 | Orange darkened (already used in R3 hover) | Hover/pressed |
| orange-100 | #FCEBD0 | Orange tint | Subtle highlight on light |
| white | #FFFFFF | Official | — |

## 4. Accessibility constraints on the brand colors (WCAG 2.2, measured)

| Pair | Contrast | Normal text (≥4.5) | Large text / UI (≥3.0) |
|---|---|---|---|
| Navy on white | **13.71 : 1** | ✓ | ✓ |
| Orange on navy | **5.20 : 1** | ✓ | ✓ |
| Navy on orange | **5.20 : 1** | ✓ | ✓ |
| Orange on #061A28 | 6.71 : 1 | ✓ | ✓ |
| **Orange on white** | **2.64 : 1** | ✗ | ✗ |
| **White on orange** | **2.64 : 1** | ✗ | ✗ |

**Actionable rules**
1. **Never** set white text on an orange button. The prototype's primary CTA ("REQUEST A QUOTE", white on #E38B06) fails WCAG. Use **navy text on orange** (5.20:1) or orange outline/text on navy.
2. **Never** use orange for text or thin UI elements on white. On light backgrounds orange is decoration only (lines, fills, large shapes with a non-color cue).
3. The approved logo colorway "white wordmark on orange" is a logo, not text — allowed (logos are exempt), but avoid it at small sizes for legibility.
4. Prototype greys `#84939B` on white (3.17:1) and `#6E7D85` (4.26:1) fail for body text.

## 5. Imagery honesty rules (from Master Brief §12)

- AI-generated images are allowed (user preference) but must **never** be presented as photographs of the actual factory, fleet, products or people.
- Do not depict equipment not confirmed (grinders, centrifuges, evaporators, labs, silos, robots).
- Do not show certification marks, flags/maps of customer countries, or fake documents.
- No species other than sardine-type marine fish when representing raw material.
- Recommend a discreet caption/convention (e.g., "Illustrative visualisation") for any image that looks photographic — Decision D-11.

## 6. Asset status

| Asset | Available? | Quality | Action |
|---|---|---|---|
| Logo — vector master (SVG/AI/EPS/PDF) | ✗ | — | **Request from identity designer.** Blocking for production. |
| Logo — PDF p4 raster | ✓ (inside PDF) | ≈1000×250 px, correct colors/proportions | Acceptable for Phase 02 prototypes only (extract, never redraw). |
| Logo — `IMG_2829.PNG` | ✓ | Wrong colors (#04293E / #E08001), wrong proportions (3.15:1) | **Reject** as master. |
| Wordmark-only, icon-only, white/orange variants | Only as PDF rasters | Low-mid res | Request vectors. |
| Favicon / app icon | ✗ | — | Derive from icon-only vector once supplied (no redraw). |
| Pattern tile | Only as PDF rasters | Raster | Request vector tile. |
| Fonts | Google Fonts (Cairo, Montserrat) | OFL | Self-host for performance in build phase. |
| Packaging artwork (real) | ✗ (mockups only) | — | Request final production artwork. |
| Real factory / product photography | ✗ | — | Request; or approve AI-illustration policy. |
