# 06 — Technical Audit

Read-only inspection. No files were modified.

---

## 1. Project state

| Item | Finding |
|---|---|
| Root | `D:\IMPORTANT\NOBEL Buiseness\AL khaleej\` containing only `DATA\` (+ this `docs\` folder created in Phase 01) |
| Version control | **None** — not a git repository |
| Framework / build | **None** — no `package.json`, bundler, config, lockfile, tests, CI or deployment config |
| Code | One file: `DATA/index.html` (23.7 KB; inline minified CSS + inline JS) |
| Asset folder | **Missing** — `index.html` references `assets/logo.png` and `assets/hero.png`; neither exists → broken logo image and hero falls back to gradient only |
| Routes | One page, 7 hash anchors: `#home #about #products #manufacturing #quality #markets #contact` |
| Integrations | None (no form backend, analytics, CMS, maps, email, CRM) |
| Live site / domain | None supplied |

**Conclusion:** there is no codebase to migrate. Phase 03 will be a greenfield build; `index.html` is reference material only.

## 2. Local tooling available (verified)

| Tool | Version |
|---|---|
| OS | Windows 11 Pro (10.0.26200) |
| Node.js / npm | v24.15.0 / 11.12.1 |
| Git | 2.53.0 |
| Python | 3.13 with PyMuPDF 1.28 (MuPDF 1.29), OpenCV, Pillow, pypdf |
| Poppler | `pdftotext` available |
| ffmpeg | Not found (video frames were extracted with OpenCV instead) |

## 3. `index.html` — detailed findings

### 3.1 Architecture & i18n
- Bilingual by storing both languages in `data-en` / `data-ar` attributes and swapping `innerHTML` with JS.
  - Arabic content is **not in the served HTML** → not indexable by search engines; no Arabic URL to share.
  - Language choice is not persisted (no URL/storage); reload returns to English.
  - `lang` and `dir` on `<html>` are updated correctly on toggle (good).
  - Several strings are not localised: product tags "FISH MEAL"/"MARINE OIL", `<option>` product names, brand name in footer.
- RTL handled partly with overrides (`.ar .hero` gradient, `.ar .stat` border) and physical properties (`margin-right`, `border-left`) instead of CSS logical properties → fragile mirroring.
- Arrows swapped by text (`→` / `←`) — works but should be handled by `dir`-aware icons.

### 3.2 Typography loading
- Google Fonts: Cairo 400–800 and Montserrat 400–800 via render-blocking stylesheet.
- **Montserrat 300 (Light) — the brand's description weight — is not loaded.**
- 10 font files requested; weights 500/600/800 are mostly unused.

### 3.3 Accessibility (WCAG 2.2 AA)
| Issue | Severity |
|---|---|
| Form inputs have **no `<label>`** (placeholder only) | High (1.3.1, 3.3.2) |
| Primary CTA white text on #E38B06 = **2.64:1** | High (1.4.3) |
| `.note` #84939B on white = 3.17:1; `.card p` #6E7D85 = 4.26:1 at 12 px | Medium (1.4.3) |
| Body/UI text at 10–12 px (nav, cards, steps, footer) | Medium (readability, 1.4.4 at zoom) |
| Menu button: no `aria-expanded`/`aria-controls`; no Escape/focus management | Medium (4.1.2) |
| Language button lacks `lang="ar"` on its Arabic label and state | Low |
| `scroll-behavior:smooth` not gated by `prefers-reduced-motion` | Low (2.3.3) |
| Required fields not indicated visually; select's first option is a selectable value | Low |
| Logo `alt` is Arabic while page is English | Low |
| Semantics: `header/nav/main/section/footer`, single `h1`, `h2` per section — **good** | — |

### 3.4 Form
- Inputs have **no `name` attributes** — even with a backend, nothing would be submitted.
- Fields: name, company, email, country, product, message. Missing vs Brief RFQ: phone/WhatsApp, grade, quantity, destination port, consent, frequency, packing, documents.
- Submission is intercepted and shows an honest demo message via `aria-live` — **keep this honesty pattern** until a backend exists.

### 3.5 SEO & sharing
Missing: meta description, canonical, `hreflang`, Open Graph/Twitter tags, favicon/app icons, `theme-color`, `robots.txt`, `sitemap.xml`, structured data (`Organization`/`Product` — only with verified facts), Arabic-indexable content.

### 3.6 Performance
- Tiny payload (good) but will depend on `hero.png` (no responsive `srcset`, no modern formats, no preload).
- Render-blocking Google Fonts; no `font-display` tuning beyond `swap` in URL; no self-hosting.

### 3.7 Responsive
- Breakpoints at 900 px and 600 px; grid collapses sensibly. Header CTA hidden on phones (≤600 px) — the primary conversion disappears on mobile.

## 4. Platform capabilities available in this workspace (not configured in the project)

| Capability | Tool | Relevance | Caveat |
|---|---|---|---|
| Design prototyping, design-to-code | Figma MCP | Phase 02 visual prototypes / design system | Requires a Figma file/session |
| AI image & video generation | ElevenLabs creative tools; Figma `generate_image`; Canva `generate-image` | Brief prefers AI imagery | **Consumes user credits** — run only with approval |
| Rapid app builder | Lovable MCP | Alternative build route | Less control over premium motion/RTL; vendor lock-in |
| Deployment | Vercel MCP | Hosting candidate | Not authenticated |
| Browser QA, screenshots | Claude in Chrome, `run` skill | Visual/RTL/responsive verification | — |
| Shareable prototypes | Artifacts | Stakeholder review links | Private by default |

## 5. Skills identified for this project

Skills in Claude Code load per task (there is no persistent "enable" switch); they will be invoked at the start of the relevant phase.

| Need | Available skill(s) | Coverage |
|---|---|---|
| Premium UI/UX design, design intelligence | `ui-ux-pro-max` (styles, palettes, font pairings, UX guidelines, **GSAP motion presets**, Three.js/Astro/Next.js stack data) | Strong |
| Design system / tokens | `ui-ux-pro-max:design-system`, `ui-ux-pro-max:ui-styling` | Strong |
| Brand consistency | `ui-ux-pro-max:brand` | Good |
| Creative direction / hero visuals | `ui-ux-pro-max:design`, `ui-ux-pro-max:banner-design`, `canvas-design` | Partial |
| Frontend architecture & build | `ui-ux-pro-max` stack guidance, `web-artifacts-builder` (prototype artifacts only) | Partial — no dedicated framework skill |
| Animation & motion | `ui-ux-pro-max` (GSAP presets) | Partial |
| Responsive & visual QA | `run`, `claude-in-chrome` | Good |
| Data presentation (spec tables/comparisons) | `dataviz` | Good |
| Code quality | `code-review`, `simplify`, `security-review` | Good |
| Accessibility | covered inside `ui-ux-pro-max` UX guidelines | **No dedicated a11y audit skill** |
| SEO | — | **No dedicated skill** (handled manually) |
| Bilingual localisation / RTL | — | **No dedicated skill** (handled manually) |

## 6. Architecture options for Phase 03 (for decision — not decided)

| Option | Strengths | Weaknesses | Fits when |
|---|---|---|---|
| **A. Static-first framework with islands (e.g., Astro) + GSAP; WebGL only for signature moments** | Pre-rendered bilingual routes, excellent SEO/LCP, ship JS only where motion lives, simple static hosting | Team must know the framework | Content site with premium motion, no heavy app logic — *closest fit to current scope* |
| B. React meta-framework (e.g., Next.js) | Large ecosystem, i18n routing, easy server functions for RFQ | More JS by default; heavier for a mostly static site | Future portal/CMS/customer area planned |
| C. Hand-built static HTML/CSS/JS (extend prototype) | Zero tooling, tiny | 24 pages × 2 languages by hand; data duplication; hard to maintain | Very small budget, few updates |
| D. Lovable | Fastest to a running site | Limited control over cinematic motion & RTL quality; lock-in | Speed over craft |

Decision inputs needed: hosting target (G-32), who edits content later (CMS need), RFQ delivery channel (G-12), budget/timeline for 3D/video production.

## 7. Non-functional requirements to carry into Phase 02/03

- **Performance budget (proposed):** LCP ≤ 2.5 s and INP ≤ 200 ms on a mid-range Android over 4G; CLS ≤ 0.1; initial JS ≤ ~150 KB gzip; WebGL/video lazy-loaded after first paint with static poster fallbacks.
- **Motion:** full `prefers-reduced-motion` alternative; no essential content only inside canvas/video.
- **Accessibility:** WCAG 2.2 AA; keyboard-complete; visible focus; labelled bilingual form errors.
- **i18n:** pre-rendered `/en/` and `/ar/` routes, `hreflang`, logical CSS properties, per-language metadata.
- **Data:** single product data source (JSON/MD collection) feeding product pages, hub table, RFQ select, and structured data.
- **Form:** server-side validation, spam protection (honeypot/turnstile), consent logging, delivery to the channel defined in G-12; demo state until then.
- **Security/privacy:** HTTPS, no third-party trackers before consent, privacy notice (G-30).
