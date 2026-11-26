# 02 — Unified Design System

Source: `site/src/system.css`. It is loaded last, after `styles.css` (base) and `cinema.css` (motion layer), so it governs every page. Pages keep their own compositions; the tokens and components below make them one family.

## 1. Tokens

### Spacing (8-pt based)
| Token | Value | Use |
|---|---|---|
| `--s1`…`--s7` | 8 · 12 · 16 · 24 · 32 · 48 · 64 px | Internal component spacing |
| `--sec` | `clamp(72px, 7.6vw, 120px)` (mobile `clamp(56px,14vw,80px)`) | Vertical rhythm between chapters (was up to 150 px top **and** bottom) |
| `--sec-tight` | `clamp(48px, 5vw, 80px)` | Hero-adjacent sections |
| `--head-gap` | `clamp(32px, 3.6vw, 56px)` | Section head → content |

### Widths
`--max` 1320 px page width · `--w-text` 64ch body · `--w-lede` 54ch lede. Headings: `.h2` max 20ch; hero lines are balanced with `text-wrap: balance`.

### Type scale
| Role | EN | AR |
|---|---|---|
| Display (home hero) | `clamp(48px, 7.6vw, 128px)` | same, line height 1.28 |
| Hero L (editorial openings) | `clamp(40px, 5.1vw, 80px)` | ″ |
| Hero M (surface / tool pages, contact) | `clamp(34px, 3.9vw, 58px)` | ″ |
| Hero S (utility) | `clamp(32px, 3.3vw, 50px)` | ″ |
| H2 | `clamp(32px, 3.3vw, 50px)`, line height 1.08 | line height 1.3, no tracking |
| H3 | `clamp(21px, 1.6vw, 25px)` | ″ |
| Lede | `clamp(18px, 1.3vw, 20.5px)`, weight 400 | ″ |
| Body | **17 px**, weight 400, line height 1.7 (was 16 px / 300) | **18 px**, line height 1.85 |
| Small / notes | 14.5 px | 15.5 px |
| Meta (crumbs) | 13.5 px | 14.5 px |
| Label (kicker, table headers) | 12.5 px, tracking .16em (min was 10.5 px) | 13.5 px, no tracking |
| Buttons | 14.5 px, 50 px tall | 15 px |

Weights: display/hero thin lines 300 and bold lines 600 (Arabic 500 / 700). Body copy is now 400 for readability.

### Colour (unchanged First Light)
Ivory `#F7F2EA`, paper `#FBF8F3`, cream `#EFE6D8`, ink `#0C3048`, ink-2 `#3A5265`, ink-3 `#5E6B73`, chip `#8A5300`, orange `#E38B06`. Status colours are tints of these: stated = sea-green tint, on request = ink outline, pending = orange tint.

## 2. Composition system (image ↔ copy)
| Class | Ratio | Use |
|---|---|---|
| `.comp-57` | 5 : 7 | Portrait image (4:5, max 76svh / 720 px) + generous copy (About, International) |
| `.comp-75` | 7 : 5 | Landscape image (4:3) + copy (Raw → ingredients) |
| `.comp-55` | 1 : 1, top-aligned | Text + data side by side (Quality, Raw close) |
| `.comp-sheet` | 4 : 7 with sticky left column | Specification copy + sheet |
| `.pph` | 5 : 7 | Product hero: framed specimen (4:5, max 78svh) + copy (was a half-screen bleed) |
| `.split-head` | heading / lede on one baseline | Section heads |

Every image has a declared aspect ratio and a height cap, so no image can dominate its neighbour. All compositions collapse to one column at ≤ 980 px, with the image first.

## 3. Hero family
Anatomy on every page: **crumbs → kicker → split headline (thin / bold) → lede → actions**.

| Composition | Pages |
|---|---|
| Home dive (display) | Home |
| Full bleed + ivory mist (`.op-bleed.hf`) | About, **Raw materials**, **Products**, Quality, International |
| Short band (`.op-bleed.hf.short`) | **Contact** |
| Pinned theatre | Manufacturing |
| Framed specimen (`.pp-hero.hf`) | 4 product pages |
| Plain (`.hero-plain`) | Privacy, Credits |

Shared behaviour:
* **Entrance:** the photograph is fully visible at frame 0 and settles from 107 % to 100 % scale; the mist lifts in; copy rises in sequence.
* **Exit:** scroll-linked; copy lifts and fades, and the photo desaturates slightly.
* **Mobile:** image first, then type on the ivory surface (no text over photographs).

## 4. Components
| Component | Replaces | Behaviour |
|---|---|---|
| **Status pill** (`stated` · `on request` · `pending`) | Text chips | One vocabulary across every data view |
| **Specification sheet** | Plain spec table | Groups (Product / Analysis / Documents) with counts; segmented filter by status with a moving indicator; rows collapse smoothly; analysis parameters expand to a neutral definition of what each one measures |
| **Comparison** | Range table | Column per product; hover or focus highlights the whole column; grade bars draw on reveal; becomes swipeable cards on mobile |
| **Readiness board** | Certification / logistics tables, About ledger | Numbered rows with status; rows expand to explain the item; header with count; About adds a stated-vs-in-preparation meter |
| **Source profiles** | — (Raw) | WAI-ARIA tabs with arrow / Home / End keys; image wipe; facts with status |
| **Route** | — (Raw) | Path drawn by scroll; nodes light in sequence; vertical timeline on mobile |
| **Buttons** | — | Primary fills with a warm sweep; outline buttons fill navy; 2 px orange focus ring |
| **Links** | — | Underline draws from the reading-start side (RTL-aware) |

## 5. RTL rules
* Direction comes from `<html dir>`; no text is forced to the right globally.
* Numbers, emails and phone numbers are isolated as `dir="ltr"` runs *inside* RTL blocks, so they keep their own order while the block stays right-aligned.
* Diagram text in Arabic is a real `direction="rtl"` run, with mirrored anchors so the stage number sits next to its node.
* Directional motion (bars, underlines, wipes, the route) uses `transform-origin` and `clip-path` mirrored under `[dir=rtl]`.
