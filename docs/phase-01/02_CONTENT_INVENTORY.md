# 02 — Content Inventory

Every important statement that could appear on the website, classified.

**Status legend**
- **CONFIRMED** — stated as fact by the factory representative (Master Brief [CONFIRMED]) or measured directly from the official brand book. May be published.
- **PROPOSED** — editorial/strategic wording. May be published **only after client approval**.
- **REQUIRES VERIFICATION** — unknown, incomplete, found only on mockups, or a preliminary reading. **Must not be published** until verified; use a neutral placeholder ("Available on request").

**Source codes:** R1 = Brand PDF (page no.), R2 = Master Brief (§), R3 = index.html prototype.

---

## A. Identity

| ID | Statement (EN) | Statement (AR) | Status | Source | Website rule |
|---|---|---|---|---|---|
| A1 | Brand name on logo | **الخليج لصناعة الأسماك** | CONFIRMED | R1 p4, R2 §1 | Header/brand name in Arabic. Logo is artwork — never retypeset. |
| A2 | Alkhaleej Fish Manufacturing | — | CONFIRMED (as the English name in use) | R2 §1 | Official Latin spelling still to be fixed (see A7). |
| A3 | — | شركة الخليج لصناعة الأسماك ("Alkhaleej Fish Manufacturing Company") | REQUIRES VERIFICATION | R1 p25 label | Legal entity type unknown. |
| A4 | — | مصنع الخليج لصناعة الأسماك / مصنع الخليج للأسماك | PROPOSED (conversational forms) | R2 §1, §10 | Avoid in header; may appear in body if approved. |
| A5 | Established 2025 | تأسس عام 2025 | CONFIRMED | R2 §1 | Publishable. Do not confuse with "2024" on the brand book. |
| A6 | Kafr El-Sheikh Governorate, Egypt | محافظة كفر الشيخ، مصر | CONFIRMED | R2 §1 | Publishable at governorate level. |
| A7 | Latin spelling variants: Alkhaleej / AL KHALEEJ / elkhaleeg | — | REQUIRES VERIFICATION | R1, R2 | Pick one for domain, meta, schema. |
| A8 | Legal name, registration no., tax ID, ownership | — | REQUIRES VERIFICATION | R2 §1 | Footer legal line left blank until supplied. |

## B. Contact

| ID | Item | Status | Source | Rule |
|---|---|---|---|---|
| B1 | Phone 01096555525 | REQUIRES VERIFICATION | R1 p25–26 (packaging mockup) | Do not publish. Ask whether it is a current official line. |
| B2 | Phone 01060473790 | REQUIRES VERIFICATION | R1 p25–26 | Same. |
| B3 | Address: الكيلو 8 طريق المحيط - طلمبات-7 طريق كفرالشيخ بلطيم الدولي- كفرالشيخ- مصر | REQUIRES VERIFICATION | R1 p25–26 | Same. Also needs official English version and map pin. |
| B4 | Email elkhaleegfish@gmail.com | REQUIRES VERIFICATION | R1 p32 (letterhead mockup; same mockup has placeholder phone +12345678910) | Likely mockup content. A Gmail address is weak for B2B export credibility — recommend a domain email. |
| B5 | "Ahmed Ibrahim — Graphic Designer", his phone/email | NOT COMPANY DATA (designer's sample card) | R1 p32 | Never publish. |
| B6 | WhatsApp, website domain, social accounts | REQUIRES VERIFICATION (unknown) | — | — |

## C. Products

| ID | Statement (EN) | Statement (AR) | Status | Source |
|---|---|---|---|---|
| C1 | Fish Meal 60% (commercial protein grade) | مسحوق أسماك 60% | CONFIRMED | R2 §4.1 |
| C2 | Fish Meal 65% | مسحوق أسماك 65% | CONFIRMED | R2 §4.2 |
| C3 | Fish Meal 72% | مسحوق أسماك 72% | CONFIRMED | R2 §4.3 |
| C4 | Crude Fish Oil | زيت الأسماك الخام | CONFIRMED | R2 §4.4 |
| C5 | Fish meal packed in 50 kg bags | معبأ في أكياس/شكاير 50 كجم | CONFIRMED | R2 §1 |
| C6 | Crude fish oil packed in drums | يعبأ في براميل | CONFIRMED | R2 §1 |
| C7 | Grade % = commercial label, **not** a guaranteed minimum spec | — | CONFIRMED (rule) | R2 §1 |
| C8 | Product category: feed-manufacturing ingredients | مكونات لصناعة الأعلاف | CONFIRMED | R2 §1 |
| C9 | "Suitable for aquaculture feed" | — | PROPOSED, qualified ("where technically suitable") | R2 §4.4 |
| C10 | "Premium" | — | REQUIRES VERIFICATION (unproven superlative) | R1 p25 |
| C11 | Per-grade specs: min protein, max moisture/ash/salt/sand, fat range, TVN, histamine, digestibility, amino acids, particle size, color, shelf life | — | REQUIRES VERIFICATION | R2 §4 |
| C12 | Oil specs: drum size, FFA, PV, anisidine, moisture & impurities, EPA/DHA, density, shelf life | — | REQUIRES VERIFICATION | R2 §4.4 |
| C13 | Bag material, bag artwork actually used in production | — | REQUIRES VERIFICATION | R2 §7 |

Product hierarchy (confirmed):
```
Products
├── Fish Meal  (family)
│   ├── Fish Meal 60%
│   ├── Fish Meal 65%
│   └── Fish Meal 72%
└── Crude Fish Oil
```

## D. Raw materials & sourcing

| ID | Statement | Status | Source |
|---|---|---|---|
| D1 | Uses whole marine fish | CONFIRMED | R2 §2 |
| D2 | Including sardines and other suitable species | CONFIRMED | R2 §2 |
| D3 | Supply from the company's own fishing vessels (Mediterranean, high seas, other marine grounds) | CONFIRMED | R2 §2 |
| D4 | Plus fish arriving from ports and refrigerated storage facilities | CONFIRMED | R2 §2 |
| D5 | Species list / Latin names, fleet size, permits, catch areas, traceability, sustainability | REQUIRES VERIFICATION | R2 §2 |
| D6 | "100% own fleet", "sustainably caught", "fully traceable", "freshest", "food-grade" | **PROHIBITED** unless verified | R2 §2 |

## E. Manufacturing process (only confirmed steps may be shown)

| Step | EN | AR | Status | Notes |
|---|---|---|---|---|
| E1 | Receiving — raw fish from port / cold storage into a receiving pit | الاستقبال — بيارة الاستقبال | CONFIRMED | |
| E2 | Mechanical conveying to the cooker | النقل الميكانيكي إلى الطباخ | CONFIRMED (machine names "الكريمة"/"الكور" VERIFY) | Don't name machines. |
| E3 | Indirect steam cooking in a double-jacket cooker | الطبخ بالبخار غير المباشر | CONFIRMED | Temps (~95 °C steam side, 90–95 °C fish) — REQUIRES VERIFICATION before publishing numbers. |
| E4 | Pressing — press cake / press liquor | العصر — الكيك المضغوط / السائل | CONFIRMED | |
| E5 | Oil–water separation → crude fish oil | فصل الزيت عن الماء | CONFIRMED (equipment type VERIFY) | Second output stream. |
| E6 | Drying of press cake | التجفيف | CONFIRMED | "~9% moisture target" = operating target, **not** a spec. Don't publish. |
| E7 | Conveying to cooling / aeration / mixing tank | التبريد والتهوية والخلط | CONFIRMED | |
| E8 | Antioxidant addition to protect fats from oxidation | إضافة مضادات الأكسدة | CONFIRMED (identity, dose, point VERIFY) | |
| E9 | Packing — meal in 50 kg bags, oil in drums | التعبئة | CONFIRMED | |
| E10 | Grinding, decanter/centrifuge, stickwater evaporation, metal detection, sieving, silos, lab, automated packing | — | REQUIRES VERIFICATION | Must **not** be depicted. |

Key narrative structure (confirmed): **one input → two output streams** (solids → fish meal; liquids → crude fish oil).

## F. Quality

| ID | Statement | Status | Source |
|---|---|---|---|
| F1 | Protein, moisture, fat and ash are key fish-meal parameters | CONFIRMED (industry fact) | R2 §6 |
| F2 | Sample measurements exist for these four indicators during production and on finished product | CONFIRMED | R2 §6 |
| F3 | The eight readings (protein 66.77–74.31%, etc.) and their means | **REQUIRES VERIFICATION — never publish** | R2 §5 |
| F4 | HACCP, ISO 22000, GMP+, FAMI-QS, ISO 9001, licences, in-house lab, COAs | REQUIRES VERIFICATION | R2 §6 |
| F5 | "Verified technical specifications will be provided when approved" | PROPOSED copy | R2 §11 |

## G. Market & export

| ID | Statement | Status | Source |
|---|---|---|---|
| G1 | Intends to export fish meal to multiple countries | CONFIRMED (intention) | R2 §1 |
| G2 | Completed exports, overseas distributors, named destination countries, "global reach" | **PROHIBITED** unless verified | R2 §1 |
| G3 | Port of export, Incoterms, payment terms, lead times, export licences, MOQ | REQUIRES VERIFICATION | R2 §1 |
| G4 | Welcomes domestic and international supply inquiries | PROPOSED copy (safe) | R2 §11 |

## H. Audience

Feed manufacturers · aquaculture feed manufacturers · importers · trading companies · industrial distributors · purchasing managers. — CONFIRMED (Phase 01 brief, R2 §8).

## I. Brand story (from brand book — publishable)

| ID | EN | Status | Source |
|---|---|---|---|
| I1 | Three fish swimming in a circle: unity, harmony, the cyclical nature of life. | CONFIRMED (official concept) | R1 p10, p12 |
| I2 | …balance and tranquility; continuous cycle of birth, growth and renewal; abundance / plentiful harvest / prosperous business. | CONFIRMED (official concept) | R1 p12 |
| I3 | Deep blue = water and nature; yellow-orange = warmth and energy. | CONFIRMED | R1 p14 |
| I4 | Arabic translation of I1–I3 | REQUIRES creation + approval | — |

## J. Taglines, headlines & CTAs

| ID | EN | AR | Status | Source |
|---|---|---|---|---|
| J1 | From Sea to Industry | من البحر إلى الصناعة | PROPOSED (not a registered slogan) | R2 §8 |
| J2 | From Sea to Global Markets | من البحر إلى الأسواق العالمية | PROPOSED — risky (implies export record) | R2 §8 |
| J3 | Marine Ingredients for Feed Manufacturing | مكونات بحرية لصناعة الأعلاف | PROPOSED (factual) | R2 §10–11 |
| J4 | From the Sea. To the World. | من البحر. إلى العالم. | PROPOSED — **conflicts with guardrails** | R3 |
| J5 | Rooted in the sea. Built for industry. | من البحر تبدأ الحكاية. وللصناعة نعمل. | PROPOSED | R3 |
| J6 | Egyptian manufacturing. Global ambition. | صناعة مصرية. وطموح عالمي. | PROPOSED ("ambition" is acceptable; review) | R3 |
| J7 | **Request a Quote** (primary CTA) | **اطلب عرض سعر** | PROPOSED (strategic) | R2 §8 |
| J8 | Explore Products (secondary CTA) | استكشف المنتجات | PROPOSED | R2 §8 |
| J9 | Become a Partner | تواصل للتعاون | PROPOSED | R3 |
| J10 | "ALKHALEEJ 2070 — The Future of Marine Industry" | — | **Internal creative codename** — not for public copy unless approved (could read as a claim) | Phase 01 brief |

## K. Ready-made copy blocks available

| Block | EN | AR | Status | Source |
|---|---|---|---|---|
| Hero | ✓ | ✓ | PROPOSED | R2 §10–11 |
| About | ✓ | ✓ | PROPOSED (built on CONFIRMED facts) | R2 §10–11 |
| Products (family-level) | ✓ | ✓ | PROPOSED | R2 §10–11 |
| Manufacturing | ✓ | ✓ | PROPOSED | R2 §10–11 |
| Quality | ✓ | ✓ | PROPOSED | R2 §10–11 |
| International Markets | ✓ | ✓ | PROPOSED | R2 §10–11 |
| Contact | ✓ | ✓ | PROPOSED | R2 §10–11 |
| Per-product detail pages (4) | ✗ | ✗ | **Missing** — to be written in Phase 02/03 | — |
| Vision / Mission | ✗ | ✗ | **Missing** — R2 says only "future vision as a proposal" | R2 §9 |
| Legal / Privacy / Cookie text | ✗ | ✗ | **Missing** | — |
| Form validation & error messages | partial (R3) | partial (R3) | Missing most states | R3 |
| Meta titles/descriptions, OG text | ✗ | ✗ | **Missing** | — |

## L. Prototype (R3) copy that must not be carried forward as-is

- "From the Sea. To the World." (J4) — implies global supply.
- "GLOBAL MARKETS", "GLOBAL AMBITION" (labels) — replace with "International Markets".
- "Fish Meal 65% & 72%" combined card — split.
- 60/65/72 rendered as KPI stats in Quality — misleading.
- "© 2026" — should be dynamic or reflect launch year.
- Product tag "FISH MEAL" / "MARINE OIL" not localised.
