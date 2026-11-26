# 01 — Reference Audit

**Project:** ALKHALEEJ 2070 — Website Transformation
**Phase:** 01 Discovery (read-only; no source files modified)
**Audit date:** 2026-11-24
**Scope:** Every file in `D:\IMPORTANT\NOBEL Buiseness\AL khaleej\` (only the `DATA\` folder exists)

---

## 1. File inventory

| # | File | Type / size | What it actually is | Authority level |
|---|---|---|---|---|
| R1 | `DATA/AL KHALEEJ BD.pdf` | PDF 1.4, 35 pages, 20.9 MB | **Brand Guidelines book (2024)** exported from Adobe Photoshop as a slide presentation. Every page is a single 1920×1080 flattened raster image. | **Authoritative for brand identity only** (logo, colors, type, pattern, packaging look). |
| R2 | `DATA/ALKHALEEJ_MASTER_BRIEF.md` | Markdown, 19 KB, v1.0 dated 24 Nov 2026 | Business & content brief with evidence labels ([CONFIRMED]/[SAMPLE]/[PROPOSED]/[VERIFY]), bilingual copy, process, sample readings, proposed sitemap. | **Authoritative for business facts** (where labelled [CONFIRMED]). |
| R3 | `DATA/index.html` | Static HTML, 23.7 KB, single file | Earlier one-page bilingual website prototype (EN/AR toggle). | **Draft only** — useful as a content/structure baseline, not as fact or design authority. |
| R4 | `DATA/IMG_2829.PNG` | PNG RGBA, 2168×725, 532 KB, transparent background | Horizontal logo lockup (wordmark + fish icon). | **Not conformant** to the PDF master — see §5. Do not use as master. |
| R5 | `DATA/WhatsApp Video 2026-11-24 at 10.24.26 PM.mp4` | MP4, 384×848 portrait, 14.0 s, 60 fps | Screen recording of a third-party Instagram Reel comparing "websites 2026" vs "websites 2027" (a shoe store). | **Mood / interaction reference only.** Third-party content — never reproduce. |

Not found anywhere in the project: vector logo files (SVG/AI/EPS/PDF-vector), favicon, font files, photography of the actual factory, product photos, datasheets/COAs, `assets/` folder, a code repository, `package.json`, git history, or a live website URL.

---

## 2. Critical finding — what the PDF is (and is not)

The Phase 01 brief states that `AL KHALEEJ BD.pdf` contains "the original website structure and page hierarchy", "the products and their classifications" and "the business narrative".

**After inspecting all 35 pages visually, this is not the case.** The PDF is purely a **visual identity guideline** (Contents: 01 Logo · 02 Icon · 03 Colors · 04 Typography · 05 Pattern · 06 Packaging). It contains:

- No website pages, navigation, sitemap or wireframes.
- No company history, mission, vision, process description, capacity or market information.
- Product information limited to a single packaging mockup label: **"Premium — 60% FISH MEAL — ٦٠٪ بروتين مسحوق سمك — إنتاج شركة الخليج لصناعة الأسماك"**.

Consequently the website architecture in this audit is reconstructed from **R2 (Master Brief §9)** and **R3 (index.html prototype)**, and the business narrative comes from **R2** only. → *Decision D-01 in the completion report.*

Technical note: the PDF has **no extractable text** except one live span on page 35 (`لصناعة الأسماك`, font `Cairo-Regular`, 14.65 pt, inside the cover logo). All other content was read visually from page renders. PDF metadata: Creator "PDF Presentation Adobe Photoshop", created 2024-11-13 13:14 (+02:00).

---

## 3. Page-by-page audit of `AL KHALEEJ BD.pdf`

| Pg | Section | Content observed | Website relevance |
|---|---|---|---|
| 1 | Cover | Underwater photo of swimming fish (mullet-like species, teal water). Logo top-right (white wordmark + orange icon). "Brand Guidelines", "2024". | Shows the logo-on-photo usage. The photo is stock-style, not company footage. 2024 = guideline year, **not** founding year (2025). |
| 2 | Table of Contents | 01 Logo, 02 Icon, 03 Colors, 04 Typography, 05 Pattern, 06 Packaging. Orange koi photo on black at right. | Confirms the scope of the book. |
| 3 | Divider 01 | Full orange (#E38B06) page, "Logo", huge navy "01". | Divider style (oversized numerals) — a graphic habit, not a rule. |
| 4 | Wordmark & Icon | Primary horizontal lockup on white: navy Arabic wordmark **الخليج**, subline **لصناعة الأسماك**, orange three-fish icon to the right. | **Master logo reference.** Measured: navy = #0C3048, orange = #E38B06. Lockup aspect ≈ 3.98 : 1. |
| 5 | Safe-Space (logo) | Construction grid showing clear-space margin around the full lockup and a gutter between wordmark and icon. | Clear-space rule (margin ≈ ⅕ of lockup height; exact unit not annotated). |
| 6 | Wordmark | Wordmark-only lockup (no icon) with clear-space grid. | Approved secondary lockup: wordmark alone. |
| 7 | Color Variations | (a) White wordmark + orange icon on navy; (b) white wordmark + navy icon on orange; (c) navy wordmark + orange icon on white. | **The only three approved logo color combinations.** |
| 8 | Lettermark | "ElHurra- Regular" specimen — Arabic and Latin alphabets in orange/white on navy. | Identifies **ElHurra** as the typeface family behind the wordmark lettering. It is a display face for the logo, not a website font. Licensing unknown. |
| 9 | Do's & Don'ts | Text: "Incorrect usage of the logo results in the dilution of its overall impact and communication. It conveys the wrong image for the brand. Individual discretionary usage of the logo is not permitted. The following application methods of the logo are not permitted. 1. No drop shadow nor strokes 2. Do not apply any effects to the logo 3. Do not remove nor add elements from or to the logo 4. Do not resize, flip, or extend the elements or change the spaces between the letters." Eight incorrect examples: rotated, gradient fill, horizontally squashed, drop shadow, vertically stretched, outline-only, re-spaced/condensed, arched/warped. | **Hard rules** (see 04). Note: the book shows only "Don'ts", no positive "Do" examples. |
| 10 | Divider 02 Icon | Navy page: "Three fish swimming in a circle, symbolizing unity, harmony, and the cyclical nature of life." | Official icon meaning (usable as brand-story copy). |
| 11 | Safe-Space (icon) | Clear-space grid around the icon alone (margin ≈ 19% of icon width). | Icon may be used standalone (favicon/app mark candidate). |
| 12 | Concept | "Three fish swimming in a circle symbolizes unity, harmony, and the cyclical nature of life. The interconnectedness of all living things is represented by the three fish swimming together. The graceful movement of the fish suggests balance and tranquility, while the circular formation symbolizes the continuous cycle of birth, growth, and renewal. Additionally, three fish can represent abundance, signifying a plentiful harvest or a prosperous business." | Full icon concept text. **Strategic hook:** "cycle / three / rotation" is the only official motif with meaning — a legitimate basis for motion design. |
| 13 | Icon Color Variations | Orange icon on navy; white icon on orange; navy icon on white. | Approved icon colorways. |
| 14 | Divider 03 Colors | "The color scheme conveys different meanings. Deep blue and represent water and nature, while yellow-orange represents warmth and energy." (sic — typo "and represent" in source) | Color meaning. |
| 15 | Primary | Three swatches: **#0c3048**, **#e38b06**, **#ffffff**. | Verified by pixel sampling: exact match. No secondary palette defined. |
| 16 | Divider 04 Typography | "The font used is clean and easy to read, ensuring clarity and legibility across various applications and sizes…" | — |
| 17 | Heading | **Cairo – Bold**, Arabic + **Latin** specimen ("ABCDEFGHIJKL"). Text describes Cairo as a Kufi-inspired multilingual family. | Cairo Bold is the **heading** face in **both scripts** — see conflict C-04. |
| 18 | Sub-Heading | **Cairo – Regular**, Arabic + Latin specimen on orange. | Sub-heading face. |
| 19 | Description | **Montserrat – Light**, Latin upper/lower specimen. | Body/description face (Latin). |
| 20 | Divider 05 Pattern | — | — |
| 21 | Pattern A | Icon-derived tessellation: orange fish on navy. | Approved pattern colorway. |
| 22 | Pattern B | Navy fish on white. | Approved pattern colorway. |
| 23 | Pattern C | White fish on orange. | Approved pattern colorway. |
| 24 | Divider 06 Packaging | — | — |
| 25 | Flats | Two label flats (white body / navy body) with logo badge, "Premium", "60% FISH MEAL", "٦٠٪ بروتين مسحوق سمك", "إنتاج شركة الخليج لصناعة الأسماك", **phones 01096555525 · 01060473790**, **address "الكيلو 8 طريق المحيط - طلمبات-7 طريق كفرالشيخ بلطيم الدولي- كفرالشيخ- مصر."**, orange pattern band at bottom. | **Contains possible real contact data** not mentioned in the Master Brief → REQUIRES VERIFICATION (G-01/G-02). "Premium" is an unverified superlative. |
| 26 | Sack | 3D sack mockup of the white flat ("FISH MEAL 60%"). | Visual of a 60% bag; does not confirm material, size or that it is the production bag. |
| 27 | Carton | Kraft carton with orange pattern tape, "FISH MEAL" stamp. | Mockup only. No evidence cartons are used (product is shipped in 50 kg bags). |
| 28 | Coasters | Navy round coasters with white/orange logo. | Merchandise mockup. |
| 29 | Pen | Navy pen with logo. | Merchandise mockup. |
| 30 | Notebook | Navy notebook with pattern band and orange strap on orange background. | Shows "pattern as a band/border" usage. |
| 31 | Pin badges | Navy pin badges with logo. | Merchandise mockup. |
| 32 | Stationery | Business card (**"Ahmed Ibrahim – Graphic Designer"**, placeholder phone, personal Gmail — the designer's own sample), envelope with **lorem ipsum**, letterhead footer **"+12345678910"** and **"elkhaleegfish@gmail.com"**. | Business card and phone are placeholders. The email *might* be real → REQUIRES VERIFICATION (G-03). Do not publish any of it. |
| 33 | Mug | Navy mug with logo, orange interior. | Merchandise mockup. |
| 34 | Folder | Navy presentation folder with pattern band, orange inner flap. | Merchandise mockup. |
| 35 | Thank you | Photo of crowded orange/pink fish (tilapia/carp-like, freshwater farming look); logo top-right; "Thank you". | Photo species are **not** sardines/marine fish — do not reuse as product imagery. |

---

## 4. Audit of `ALKHALEEJ_MASTER_BRIEF.md` (R2)

- Well-structured, conservative, evidence-labelled. It is the **only** source of business facts, process, products, audience, positioning and ready-made bilingual copy.
- It already contains the eight preliminary instrument readings (§5) with explicit "do not publish as specs" rules.
- It proposes a 7-page architecture (§9) and RFQ field list (§12).
- It does **not** mention the phones/address/email visible in the PDF mockups (§3 above) — either they were deliberately excluded or overlooked. Must be resolved.
- §12 records a user preference: **"generate all necessary imagery with AI (not stock)"**, with the rule that AI images must never be presented as photographs of the actual factory.

## 5. Audit of `IMG_2829.PNG` (R4) — logo file is non-conformant

Side-by-side comparison against the PDF master (page 4, native raster):

| Property | PDF master (p.4) | IMG_2829.PNG | Verdict |
|---|---|---|---|
| Navy | #0C3048 | ≈ #04293E (darker, cooler) | ✗ Off-brand |
| Orange | #E38B06 | ≈ #E08001 (redder) | ✗ Off-brand |
| Lockup aspect ratio | ≈ 3.98 : 1 | ≈ 3.15 : 1 | ✗ Icon enlarged / gutter reduced |
| Icon : wordmark scale | Icon height ≈ wordmark height | Icon visibly larger | ✗ Proportions altered |
| Subline weight | Cairo Regular (thin) | Heavier | ✗ |
| Edges / alpha | — | Almost every pixel semi-transparent (only 5,084 fully opaque px); soft painterly edges | Suggests an upscaled, traced, or AI-regenerated file |

**Conclusion:** IMG_2829.PNG violates Do's & Don'ts rules 3–4 (proportions/spacing changed) and the color spec. It must not be used as the website master logo. → *Gap G-10, Decision D-03.*

The best brand-accurate source currently available is the raster logo on PDF page 4 (≈1000×250 px at native page resolution) — sufficient for a header mockup, insufficient for retina/large hero use. **An original vector file from the identity designer is required.**

## 6. Audit of `index.html` (R3)

Full technical analysis in `06_TECHNICAL_AUDIT.md`. Content-level summary:

- Single page, 7 sections: Hero → About → Products → Manufacturing → Quality → International Markets → Contact, plus top bar, sticky header, footer.
- Bilingual by `data-en` / `data-ar` attribute swap; RTL handled by toggling `dir`.
- References `assets/logo.png` and `assets/hero.png` — **neither exists** (broken images on open).
- Contains copy that departs from the Master Brief's guardrails (see conflicts C-01, C-02, C-09, C-10).
- Honest demo-form notice is present (good practice to keep).

## 7. Audit of the video reference (R5)

- Content: an Instagram Reel overlay text "مواقع 2026 😐" vs "مواقع 2027 🔥" and "راسلنا خاص لموقعك". The "2027" site is a footwear store ("LEDGE — The Flash collection") shown on a desktop monitor in a warmly lit room.
- "2026" example (≈11 s): conventional e-commerce — banner + grid of product cards.
- "2027" example (0–10 s, 12–14 s): a **photographic, physically lit product wall**; hover/click on one product → the camera glides to that product, it becomes hero-scale in place, and a **dark side drawer** opens with product name, short descriptor, price, size grid, "Add to cart"; previous/next navigation through the collection; headline "Ten pairs. Made for the flash."
- **What the user is signalling:** spatial, cinematic, object-centred navigation with continuous camera moves instead of page jumps, minimal chrome, product-as-hero, and a spec panel that appears in context.
- **Usable takeaways (principles, not visuals):** continuity of space, one object in focus at a time, in-context specification drawer, restrained typography over rich imagery, real-feeling light. See `07_CREATIVE_DIRECTION_REQUIREMENTS.md` §6.
- **Not usable:** the brand, imagery, layout, warm-brown palette, retail mechanics (price, size, cart). Alkhaleej is B2B — the drawer's CTA must be *Request a Quote*, not a cart.

---

## 8. Cross-source conflicts register

| ID | Conflict | Sources | Recommended resolution (for approval) |
|---|---|---|---|
| C-01 | Hero "From the Sea. To the World." / "Global ambition" imply established global reach. | R3 vs R2 §1, §8 | Use R2 "From Sea to Industry / من البحر إلى الصناعة" or another approved line; avoid implying exports. |
| C-02 | Nav label "GLOBAL MARKETS" vs "International Markets". | R3 vs R2 §9 | "International Markets / الأسواق الدولية". |
| C-03 | "Premium" on packaging. | R1 p25–26 vs R2 §8 (avoid unproven superlatives) | Do not use "Premium" on the website unless approved by the company with justification. |
| C-04 | Typography: Phase 01 brief says *English headings = Montserrat*; PDF sets **Latin headings in Cairo Bold** (p17) and reserves Montserrat Light for description text (p19). | Phase-01 brief vs R1 | Decision D-04. |
| C-05 | Logo file colors/proportions differ from master. | R4 vs R1 p4 | Use vector master; reject R4. |
| C-06 | Contact data: R2 says none known; R1 mockups show 2 mobile numbers, a street address and an email. | R1 p25/p32 vs R2 §1, §13 | Confirm with factory before any use. |
| C-07 | Latin name spelling: "Alkhaleej" (R2), "AL KHALEEJ" (R1 filename), "elkhaleeg" (R1 p32 email). | R1, R2 | Decision D-05: one official Latin spelling for site, domain, schema.org. |
| C-08 | Arabic name forms: "الخليج لصناعة الأسماك" (logo), "شركة الخليج لصناعة الأسماك" (packaging), "مصنع الخليج لصناعة الأسماك" (R2 About copy), "مصنع الخليج للأسماك" (conversational). | R1, R2 | Logo form in header; legal form TBD (G-05). |
| C-09 | Products: R3 merges "Fish Meal 65% & 72%" into one card. | R3 vs R2 §4 | Keep four distinct products. |
| C-10 | Quality section in R3 shows "60% / 65% / 72%" styled as KPI stats — can be misread as measured results. | R3 vs R2 §5 rule | Present grades as commercial grade labels, never as measured values. |
| C-11 | CTA wording "طلب عرض سعر" (R3) vs "اطلب عرض سعر" (R2). | R3 vs R2 | Use R2 imperative form. |
| C-12 | "شكاير" (colloquial Egyptian) in R2 Arabic copy vs formal B2B register. | R2 | Decision on register: "أكياس 50 كجم" (formal) vs "شكاير" (local trade term). |
| C-13 | PDF uses Eastern-Arabic numerals "٦٠٪" on packaging; R2/R3 Arabic copy uses Western "60%". | R1 vs R2/R3 | Decision D-06 (numeral system in Arabic UI). |

---

## 9. Source precedence rule (proposed)

1. Written confirmation from the factory representative (future).
2. `ALKHALEEJ_MASTER_BRIEF.md` items labelled **[CONFIRMED]**.
3. `AL KHALEEJ BD.pdf` — **brand identity rules only**.
4. `ALKHALEEJ_MASTER_BRIEF.md` items labelled [PROPOSED] — usable as drafts once approved.
5. `index.html` — structural/content baseline only.
6. Video reference — inspiration only.

Anything labelled [SAMPLE] or [VERIFY], and anything found only on mockups, never reaches public pages without explicit approval.
