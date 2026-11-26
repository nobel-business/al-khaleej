# 03 — Navigation Architecture

## Evaluation of the previous order

`Home · Products ▾ · About · Raw materials · Manufacturing · Quality · International · Contact`

| Question | Assessment |
|---|---|
| Does the order follow the company story? | No. The homepage narrative runs sea → plant → products → quality → company → contact, but the navbar jumped to Products before the visitor understood who the company is and where its raw material comes from. |
| Are related pages grouped? | Partly. Raw materials and Manufacturing (the "how it is made" pair) were adjacent, but separated from the products they produce. |
| Is the most important destination discoverable? | Yes. Products and "Request a quote" were both visible. |
| Is the dropdown justified? | Yes. Four product pages plus a hub benefit from one grouped entry; flattening would add four top-level items. |
| Same structure on desktop, mobile and footer? | No. The mobile menu matched desktop, but the footer had no Products link and a different order. |
| Are labels concise? | Yes. "International" stays rather than "International markets" to keep the bar on one row at 1024 px. |

## Proposed and implemented hierarchy

The order now mirrors the visitor journey in the brief:

| # | Item | Visitor question it answers |
|---|---|---|
| 1 | Home | — |
| 2 | About | Who is Alkhaleej? |
| 3 | Raw materials | Where does the raw material come from? |
| 4 | Manufacturing | How is it made? |
| 5 | Products ▾ (All products · 60 % · 65 % · 72 % · Crude oil) | What can I buy? |
| 6 | Quality | Can I trust it? |
| 7 | International | Can they supply my market? |
| 8 | Contact | How do I reach them? |
| CTA | Request a quote (button) | Primary conversion, always visible on desktop ≥ 1180 px and at the end of the mobile menu |

**Desktop:** `Home · About · Raw materials · Manufacturing · Products ▾ · Quality · International · Contact` + language + **Request a quote**.
**Mobile menu:** same order, with product pages indented under Products and the active page marked with an orange dot.
**Footer:** same order (Products added).

No URLs changed and no pages were added.

## Behaviour
* The active page is underlined (1.5 px orange) with `aria-current="page"`. The Products item is active on the hub and on every product page.
* Hover draws the underline from the reading-start side; keyboard focus shows a 2 px orange ring.
* The header becomes solid after the hero, and a 2 px progress line shows reading position.
* The header keeps its own view-transition name, so it stays still while the page content cross-fades between routes.

## Verified (browser)
* EN and AR at 1440 / 1280: one row, with clear space to the logo and the tools on both sides.
* At 1024 px: one row; the quote button moves into the menu at ≤ 1180 px, as before.
* At 768 / 390: burger menu with the same order; Home is first and is marked active on the homepage.
* Navigation order test: `Home · About · Raw materials · Manufacturing · Products · Quality · International · Contact` ✔.

Screenshots: `qa-v2/interactions/13-navbar-story-order.png`, `14-navbar-story-order-ar.png`.
