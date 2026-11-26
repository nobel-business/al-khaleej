# 03 — Sitemap & Page Structure

> **Important:** No live website and no website structure exists in `AL KHALEEJ BD.pdf` (it is a brand book). The only existing website artefact is the one-page prototype `DATA/index.html`. The Master Brief (§9) proposes a multi-page architecture. This document records both **exactly as they exist**, then gives a reconciled architecture **for approval** (no implementation decisions yet).

---

## Part A — Existing prototype (`index.html`): exact structure

Type: single page, anchor navigation, EN default with AR toggle.

### A.0 Global chrome
| Order | Element | Content (EN / AR) |
|---|---|---|
| 0.1 | Top bar (navy, 37 px) | "EGYPT · MARINE INGREDIENTS MANUFACTURING" / "مصر · صناعة المكونات البحرية" — right: "KAFR EL-SHEIKH, EGYPT" / "كفر الشيخ، مصر" |
| 0.2 | Sticky header | Logo (`assets/logo.png`, **missing**) → `#home` |
| 0.3 | Primary nav | HOME · ABOUT · PRODUCTS · MANUFACTURING · QUALITY · GLOBAL MARKETS (AR: الرئيسية · من نحن · المنتجات · التصنيع · الجودة · الأسواق الدولية) |
| 0.4 | Utilities | Language button ("العربية"/"English"); CTA "REQUEST A QUOTE" / "طلب عرض سعر" → `#contact`; hamburger ☰ (≤900 px) |

### A.1 – A.7 Sections (in order)
| # | Anchor | Section | Elements | CTAs |
|---|---|---|---|---|
| 1 | `#home` | Hero | Eyebrow "ALKHALEEJ FISH MANUFACTURING"; H1 "From the Sea. To the World."; paragraph; bottom strip 01 Marine Sourcing · 02 Industrial Processing · 03 Global Ambition; background `assets/hero.png` (**missing**) | "EXPLORE PRODUCTS →" (#products), "DISCOVER ALKHALEEJ" (#about) |
| 2 | `#about` | Who we are | Kicker, H2 "Rooted in the sea. Built for industry.", 2 paragraphs (2025, Kafr El-Sheikh, whole marine fish, sardines, vessels); visual: orange disc "72%" + caption "FISH MEAL · PROTEIN GRADES 60 / 65 / 72" | "OUR MANUFACTURING PROCESS →" (#manufacturing) |
| 3 | `#products` | Our products | Kicker, H2 "Marine ingredients for feed manufacturing.", lead; **3 cards**: Fish Meal 60% · Fish Meal 65% & 72% · Crude Fish Oil (CSS gradient placeholders as images) | none (cards not clickable) |
| 4 | `#manufacturing` | How we make it | H2, lead; **5 steps**: 01 Receiving · 02 Steam Cooking · 03 Pressing & Separation · 04 Drying & Cooling · 05 Packaging | none |
| 5 | `#quality` | Product quality | H2 "Understanding what goes into every product.", lead; 3 "stats" 60% / 65% / 72% "FISH MEAL GRADE" | none |
| 6 | `#markets` | International markets | Navy box, H2 "Egyptian manufacturing. Global ambition.", paragraph | "BECOME A PARTNER →" (#contact) |
| 7 | `#contact` | Get in touch | H2, lead, "Alkhaleej Fish Manufacturing — Kafr El-Sheikh, Egypt", demo notice; form: Full name*, Company*, Business email*, Country, Product (select 4), Requirements (textarea) | "SEND INQUIRY →" (shows demo message) |
| 8 | footer | Footer | "ALKHALEEJ FISH MANUFACTURING", "Marine ingredients for the feed industry. Kafr El-Sheikh, Egypt.", "© 2026" | none |

Observations: only 4 conversion points all leading to one form; products have no detail views; quality and markets sections have no CTA of their own; no legal/privacy pages; no 404.

---

## Part B — Master Brief proposed architecture (R2 §9)

1. **Home / الرئيسية** — hero, short intro, product cards, process overview, quality approach, international inquiries, CTA.
2. **About / من نحن** — 2025, Kafr El-Sheikh, raw materials, industrial focus, future vision (proposal).
3. **Products / المنتجات** — individual pages: Fish Meal 60%, 65%, 72%, Crude Fish Oil. Each: description, qualified applications, packaging, specification table with "Available on request / Pending verification", CTA.
4. **Manufacturing / التصنيع** — confirmed steps only; two output streams; no unverified equipment.
5. **Quality / الجودة** — measured attributes & philosophy; no certificates or test values.
6. **International Markets / الأسواق الدولية** — export-oriented inquiries; no customer map.
7. **Contact / التواصل** — RFQ form + contact details when supplied.
- Footer: brand, links, Kafr El-Sheikh, legal & privacy links; contact placeholders not displayed as fake data.

RFQ fields (R2 §12): company, contact name, email, phone/WhatsApp, country, product, requested grade, quantity, destination port, message, consent checkbox, validation.

---

## Part C — Reconciled architecture (PROPOSED — for approval)

Merges Part A content (nothing omitted) with Part B structure. Visual treatment is deliberately not specified here.

### C.1 Sitemap

```
/{lang}/                          Home
/{lang}/about/                    About
/{lang}/products/                 Products hub
/{lang}/products/fish-meal-60/    Fish Meal 60%
/{lang}/products/fish-meal-65/    Fish Meal 65%
/{lang}/products/fish-meal-72/    Fish Meal 72%
/{lang}/products/crude-fish-oil/  Crude Fish Oil
/{lang}/manufacturing/            Manufacturing
/{lang}/quality/                  Quality
/{lang}/international-markets/    International Markets
/{lang}/contact/                  Contact & Request a Quote (RFQ)
/{lang}/privacy/                  Privacy notice           (content missing)
/{lang}/terms/                    Terms of use             (optional; content missing)
/{lang}/404                       Not found
{lang} = en | ar      (Arabic slugs optional — Decision D-07)
```

Total: 12 page templates × 2 languages. Products hub could merge into Home if the client prefers a leaner site — but individual product URLs are strongly recommended for B2B search ("fish meal 65% Egypt", "مسحوق سمك 65%").

### C.2 Navigation

| Zone | Items |
|---|---|
| Primary nav | About · Products (▾ 60% · 65% · 72% · Crude Fish Oil) · Manufacturing · Quality · International Markets · Contact |
| Persistent utility | Language switch (EN ⇄ العربية, keeps the same page) · **Request a Quote** button (always visible) |
| Mobile | Full-screen menu; RFQ button pinned |
| Footer | Brand lockup · Location (Kafr El-Sheikh, Egypt) · Nav repeat · Products list · Contact block (only verified fields) · Privacy · © year · Language switch |
| In-page | Breadcrumbs on product pages; next/previous product |

### C.3 Page structures (section order)

**Home**
1. Hero — headline (J1 or approved), sub-headline (J3), intro sentence, CTAs: Explore Products · Request a Quote.
2. Company intro — 2025 · Kafr El-Sheikh · whole marine fish → feed ingredients. Link → About.
3. Product portfolio — 4 items (3 grades + oil), each → product page.
4. Process overview — 1 input → 2 streams summary; link → Manufacturing.
5. Quality approach — 4 parameters (protein, moisture, fat, ash) as concepts, no numbers; link → Quality.
6. International inquiries — invitation copy; CTA → RFQ.
7. Final CTA band — Request a Quote.

**About**
1. Intro (established 2025, Kafr El-Sheikh).
2. Raw materials & sourcing (whole marine fish, sardines, own vessels + ports/cold storage).
3. Industrial focus (fish meal & crude fish oil for feed manufacturing).
4. Brand meaning — three-fish icon concept (I1–I3).
5. Vision — *only if client supplies/approves text*.
6. CTA → Products / RFQ.

**Products hub**
1. Intro (J3). 2. Fish meal family (3 grades) — note that grades are commercial protein labels. 3. Crude fish oil. 4. Packaging overview (50 kg bags / drums). 5. Comparison table (grade, form, packing, spec status = "Available on request"). 6. CTA.

**Product detail (×4, same template)**
1. Name + grade + family. 2. Short description. 3. Applications (qualified). 4. Packaging. 5. Specification table — every unverified row shows "Available on request / متاح عند الطلب". 6. Documents (COA/datasheet) — hidden until supplied. 7. "Request a Quote for this product" → RFQ pre-filled with product & grade. 8. Related products / next product.

**Manufacturing**
1. Intro. 2. Confirmed sequence E1–E9 (no machine names, no temperatures until verified). 3. Two output streams (press cake → fish meal; press liquor → crude fish oil). 4. Disclaimer-free but precise wording (no unconfirmed equipment). 5. CTA → Quality / Products.

**Quality**
1. Philosophy (precision, measured attributes). 2. The four parameters and why buyers care. 3. Sampling during production and on finished product (no numbers). 4. "Verified specifications/COAs provided on request once approved." 5. Certifications block — **hidden** until evidence exists. 6. CTA → RFQ.

**International Markets**
1. Positioning: Egyptian manufacturer welcoming international inquiries. 2. Who we serve (audience list). 3. What to include in an inquiry (country, port, grade, volume, frequency, packing, documents). 4. Logistics facts — hidden until verified (port, Incoterms). 5. CTA → RFQ.

**Contact / RFQ**
1. Heading + lead. 2. RFQ form (fields below). 3. Verified contact details only (else omitted). 4. Location (governorate-level until address verified; map only after pin confirmed). 5. Response-time statement — only if client commits. 6. Form status (demo notice until backend exists).

RFQ fields: Company* · Contact name* · Business email* · Phone/WhatsApp · Country* · Product* (4) · Grade (auto from product) · Quantity + unit · Frequency (one-off / monthly / contract) · Destination port · Packing preference · Documents requested · Message · Consent* — all labels/errors bilingual.

### C.4 Content relationships

```
Home ──► Products hub ──► Product detail ──► RFQ (pre-filled product+grade)
  │            ▲                 │
  │            └── Manufacturing ┤ (fish meal stream ↔ 3 grades; oil stream ↔ crude oil)
  │                              └── Quality (parameters relevant to every grade)
  ├──► About ──► Manufacturing
  └──► International Markets ──► RFQ (pre-filled "export inquiry")
```
- Every page ends in a path to RFQ (primary conversion).
- Manufacturing's two streams are the conceptual bridge between the 3 meal grades and the oil product.
- The product data (name, grade, packing, spec rows, status) must live in **one shared data source** so product pages, hub table and RFQ select never diverge.

### C.5 Arabic & English requirements

| Requirement | Detail |
|---|---|
| Parity | Every page, heading, nav item, button, form label, placeholder, validation/error/success message, alt text, meta title/description, OG text, footer and 404 exists in both languages. |
| Direction | AR = `dir="rtl" lang="ar"`; EN = `dir="ltr" lang="en"`. Layouts, arrows, progress/timelines and directional motion mirror in RTL. Logo is **never** mirrored. |
| URLs | Separate URLs per language (`/en/…`, `/ar/…`) with `hreflang` alternates — not a JS text swap (the prototype's approach is not indexable for Arabic). |
| Language switch | Switches to the equivalent page, not to Home. |
| Default | EN default suggested for export audience (R2 §12) — Decision D-08. |
| Numerals | Western (60%) vs Eastern Arabic (٦٠٪) in AR UI — Decision D-06. |
| Register | Modern Standard Arabic, B2B tone; local trade terms (شكاير، بيارة) only if approved. |
| Units | kg / كجم; % ; °C — consistent in both languages. |
| Typography | Arabic: Cairo. Latin: per Decision D-04. Letter-spacing 0 for Arabic. |
