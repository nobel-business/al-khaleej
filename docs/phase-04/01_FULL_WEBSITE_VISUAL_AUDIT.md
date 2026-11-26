# 01 — Full Website Visual Audit

**Method.** Every page was walked top to bottom in Chromium with real scrolling: 10 page types × EN + AR at 1440 px, plus 390 px for the most complex pages. Screenshots were taken at each viewport step, so scroll-driven scenes, reveals and lazy images ran as they do for a visitor. Code was then traced to explain each finding. An automated pass checked every element containing Arabic text for its computed direction and alignment.

Before screenshots: `qa-v2/before/` (full-page strips per page).

## 1. Findings by category

### Spacing and rhythm
| Finding | Cause |
|---|---|
| Large empty bands between chapters (up to about 300 px) | `.sec{padding:clamp(80px,12vh,150px) 0}` applied above *and* below every section, so two paddings stack at each boundary |
| Uneven gaps between a heading, its lede and its content | Gaps came from ad-hoc inline `margin-top` values (10–36 px) instead of a scale |
| CTA bands and some sections taller than their content | Fixed `padding: clamp(72px,10vw,140px)` |

### Typography
| Finding | Cause |
|---|---|
| Labels, chips, captions and table headers too small (10.5–11.5 px) | Uppercase micro-labels: `.cap` 10.5 px, `.mono` 10.5 px, `.chip` 11 px, spec headers 11.5 px |
| Body copy hard to read | 16 px at weight 300 in mid-grey |
| Section headings sometimes oversized next to small copy | `.h2` up to 58 px, without width control |
| Many one-off font sizes | Inline `style="font-size:…"` overrides on individual elements |

### Arabic / RTL
| Finding | Cause |
|---|---|
| Stage numbers rendered after the Arabic names in the process diagram ("01 الاستقبال" visually reversed) | The diagram SVG was forced to `direction:ltr` to keep anchors stable, so Arabic runs were laid out in an LTR paragraph |
| Phone numbers in the Arabic footer aligned to the left edge of a right-aligned column | Inline `text-align:start` on `dir="ltr"` links |
| "60–72%" shown as "72–60" in the Arabic two-ingredient links | Number range not isolated from the surrounding RTL run |

The automated check found these were the only elements where Arabic text resolved to LTR or left alignment. After the fix the count is **0** on every page at both widths.

### Image / content composition
| Finding | Cause |
|---|---|
| Product pages: half-screen, full-height specimen photograph beside a small text column | `.pp-top{grid-template-columns:1.05fr 1fr;min-height:calc(100svh - 76px)}` |
| About / International: tall portrait image dominating a 50/50 split | `.split{1.25fr 1fr}` + `aspect-ratio:4/5` at 52 vw, with no height cap |
| Repetitive image + text blocks across pages | One `.split` template reused everywhere |

### Tables and data
| Finding | Cause |
|---|---|
| Specification, comparison, certification and logistics data shown as plain ruled tables | A single generic `.spec-table` for every data type |
| No way to tell stated facts from pending items at a glance | Status was a small chip in the last column |
| Mobile: comparison table needed horizontal scrolling of a raw table | `min-width:640px` table |

### Hero consistency
| Page | Before |
|---|---|
| Home | Cinematic dive (approved) |
| About, Quality, International | Editorial full bleed |
| Raw materials | **Different template**: grey sticky split, text column + photograph pane |
| Products hub | No image hero; heading above the shelf |
| Product pages | Half-screen image split |
| Contact | Text-only heading inside the form section |
| Privacy / Credits | Unstyled heading |

### Navigation
| Finding |
|---|
| Order (Home · Products · About · Raw materials · Manufacturing · Quality · International · Contact) put Products before the company and sourcing story the homepage tells |
| Desktop, mobile and footer orders differed (the footer had no Products link) |

### Motion and interaction
| Finding |
|---|
| Inner-page heroes had a line reveal only, with no exit transition |
| Page-to-page navigation was an abrupt reload |
| Data had no interaction (no filtering, no expansion, no highlighting) |
| Raw Materials had no interaction at all |

## 2. Raw Materials (specific)
The page used the only non-standard hero on the site: a grey 50/50 sticky split. It continued with a heading-plus-gallery block and a bleed card. It had no interaction, repeated generic layouts and had no narrative arc. See `05_RAW_MATERIALS_REDESIGN.md`.

## 3. What was already working (kept)
The homepage cinematic journey, the plant theatre, the loupe, the grade instrument, the iris and the contact console were kept and checked for regressions.
