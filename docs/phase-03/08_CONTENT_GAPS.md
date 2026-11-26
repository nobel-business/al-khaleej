# 08 — Content Gaps & Traceability

## 1. Traceability: every public statement → source

All copy lives in `site/src/content.mjs` and `site/src/build.mjs`. Every factual statement maps to a **CONFIRMED** item in `docs/phase-01/02_CONTENT_INVENTORY.md`:

| Website statement | Inventory ID |
|---|---|
| Arabic name الخليج لصناعة الأسماك; English “Alkhaleej Fish Manufacturing” | A1, A2 (D-05 English naming) |
| Established 2025; Kafr El-Sheikh Governorate, Egypt | A5, A6 |
| Fish meal 60 / 65 / 72% commercial protein grades; crude fish oil | C1–C4 |
| Grade = commercial label, not guaranteed minimum | C7 |
| 50 kg bags; drums | C5, C6 |
| Feed manufacturing; aquaculture feed “where technically suitable” | C8, C9 |
| Whole marine fish incl. sardines; own vessels (Mediterranean, high seas); ports and cold storage | D1–D4 |
| Process steps 1–9 (receiving pit … packing), two streams | E1–E9 |
| Four parameters; sample measurements in production and on finished product | F1, F2 |
| Intention to build international supply relationships (not completed exports) | G1, G4 |
| Icon meaning; colour meaning | I1–I3 |
| Email `alkhaleej@nobelbusinessgroup.com` | Phase 02 brief (approved) |
| Phones +20 109 655 5525 / +20 106 047 3790 | Brand PDF p.25 “simulation data” (Phase 02 decision) |

**Deliberately not published:** “Premium”, Omega-3/EPA-DHA values, sample readings, temperatures, ~9% moisture target, machine names, capacity, certifications, export history, customer names, “sustainable”, “100% own fleet”, “fully traceable”.

## 2. Open gaps (public placeholders shown as chips)

| ID | Gap | Where it shows on the site | Priority |
|---|---|---|---|
| G-01/02 | Full street address + map pin (official) | Contact, footer: “Full address pending” | P0 |
| G-05 | Legal entity name, registration, tax ID | Footer: “Legal entity details pending verification” | P0 |
| G-06 | Domain; needed for absolute canonical URLs, `sitemap.xml`, OG image URLs | Technical (relative canonicals used meanwhile) | P0 |
| G-30 | Privacy notice (legal review) | `/privacy/` states it is under review and describes actual form behaviour | P0 |
| D-20 | Which phone(s) are official; WhatsApp number | WhatsApp link not added (no verified number) | P1 |
| D-16 | English name alignment with Nobel group site (“Gulf Fish Manufacturing”) | — | P1 |
| G-15/16 | Datasheets per grade and for oil (protein, moisture, fat, ash, salt, TVN, histamine; FFA, PV, anisidine, M&I, EPA+DHA) | Spec tables: “Available on request” | P1 |
| G-17 | Certificates of analysis | “Pending verification” | P1 |
| G-25 | Certifications and licences | Quality page table: “Pending verification” | P1 |
| G-27 | Port of export, Incoterms, payment terms, MOQ, lead time | International page table: “Pending verification” | P1 |
| G-16 | Drum capacity | “Capacity pending” | P1 |
| G-28 | Species list, catch areas, fleet details | Raw materials copy says it will be published once verified | P2 |
| G-07 | Vision / mission | Not shown (no approved text) | P2 |
| — | **Sustainability page** | **Not built.** The approved sitemap (Phase 01, 03 Part C) has no sustainability page, and no verified sustainability facts exist. Building it would require unverified claims. Add when policies and data are supplied. | P2 |
| — | Real company photography | All operations imagery is AI or third-party; see `02_PHOTOGRAPHY_ASSET_LIBRARY.md` §6 | P1 |
| G-10 | Vector logo (SVG) | Raster logo extracted from the brand PDF is used (sharp at header size) | P1 |
| — | Form backend (email/CRM delivery) | Form opens the visitor’s email client (honest, works without a server) | P1 |
| — | Analytics / consent | None installed, so no cookie banner is needed | P2 |
