# 09 — Hero Refinement, Living Marine Scene, Arabic Edition, Image Annotations

Baseline: `phase-04-signature`. Screenshots and recordings: `docs/phase-04/qa-v4/`.

## 1. Hero overlap: Arabic location vs buttons

**Symptom.** "الموقع · كفر الشيخ، مصر" collided with the hero buttons on shorter desktop windows, e.g. 1280 × 800.

**Root cause.** Two independent absolute layers with no relationship to each other:
* The copy block (eyebrow, headline, lede, buttons) was pinned **from the top**: `top: clamp(118px, 20svh, 210px)`.
* The location and products readouts were pinned **from the bottom**: `bottom: clamp(24px, 5svh, 46px)`.
* The headline size depended only on viewport **width**.

Arabic sets the headline at line-height 1.25 (vs 0.98 in English), so the block is about 25% taller. Whenever the window was short relative to its width, the bottom of the buttons ran into the readouts.

**Fix (structural).** A single layout container `.dv-ui` spans the hero as a flex column: copy at the top, a readouts row (`.dv-meta`: location · scroll cue · products) at the bottom, and an enforced gap of at least `clamp(20px, 3.5svh, 40px)` between them. Neither part is absolutely positioned any more.

The headline now scales with height as well as width: `clamp(42px, min(7.4vw, 11.2svh), 128px)`, and in Arabic `min(6.6vw, 9.6svh)`. In stacked layouts (phones, small tablets) the readouts become a ruled row under the buttons. In Arabic the copy column also keeps 35–42 px of clearance from the chapter rail.

**Measured gap between the buttons and the readouts row:**

| Viewport | EN | AR |
|---|---|---|
| 1440 × 900 | 254 px | 243 px |
| 1280 × 800 | 195 px | 184 px |
| 768 / 390 (stacked) | 26 px, ruled row | 26 px, ruled row |

## 2. The living marine scene

### Assets: separated from the approved hero, not reinvented
The hero is one flattened AI image (`hero-dawn`, 3840 × 2160) with the vessel, its wake and five gulls painted in. To animate them:

| Layer | How it was made | Quality |
|---|---|---|
| **Boat** (`/assets/scene/boat-1340.webp`, alpha) | Full-resolution crop around the vessel (1340 × 1220) → BiRefNet v2 background removal (ElevenLabs). Masts, antennas, rigging, nets and floats are preserved. | Original pixels; no regeneration |
| **Clean sea plate** (`hero-sea`, 3840 × 2160) | Seedream 5.5 edit of the hero (boat, wake and gulls removed), generated at 2864 × 1610 (the model's maximum area). It is used **only inside a feathered mask**: the boat's sky footprint (pixel-aligned with the original), the hull and wake region, and the gull positions found by difference. Everything else is the **original 3840 px image**. | Original resolution everywhere except the patched areas |
| **Gulls** | Hand-drawn SVG (body + two independently hinged wings, dark wingtips, warm underside) | Vector; crisp at any size |

The vessel is the same illustrative vessel already in the approved hero. No new vessel was introduced, and the footer disclosure states that imagery does not depict Alkhaleej vessels.

### Motion (`site/src/main.js` → "living hero")
* **Water:** a WebGL1 fragment shader renders the plate.
  * Below the horizon only, it displaces the image with two-octave value noise in a perspective-corrected space. Ripples are larger and slower near the viewer, finer toward the horizon, and drift with the swell.
  * Soft warm glints sparkle in the sun's reflection column.
  * The sky, mountains and town are untouched.
* **Boat:** composited inside the shader, so the water can occlude its hull.
  * The waterline is found per pixel by sampling the boat's alpha just below, then cut with a moving wave line, so the hull genuinely sits in the water.
  * A foam band wraps the hull.
  * The vessel moves bow-first (cabin forward, gantry and nets at the stern): left and away toward the hills over about 55 s. It shrinks with distance and rises toward the horizon, then continues a slow drift instead of looping.
  * Swell bob (two sine components), roll (±0.8°) and a faint pitch run throughout.
* **Wake:** trails from the stern's *current* position toward the lower right, where the original painted foam was. It is a churned band with streaks moving along it, plus Kelvin edge lines and a brighter churn patch at the stern.
* **Gulls:** two gulls on independent paths.
  * One crosses the sky right to left and recedes; the other rises out of the distance toward the camera and leaves to the right.
  * Wings beat (0.38–0.50 s, per bird) and periodically switch to a glide. Each bird banks with its path, fades in and out at the edges, and returns after a random pause.
  * They fly only in the open sky away from the headline.
* **Composition:** the scene shares the hero's camera push and its "dive" exit (the whole scene scales and lifts as one). A soft First Light mist at the bottom edge keeps the readouts legible over moving water.

### Performance and safety
* The original hero image remains the LCP element and is shown instantly. The plate (WebP, sized to the rendered hero) and the boat load **after** page load, then cross-fade in over 0.9 s.
* Canvas resolution is capped at 1.25× DPR on desktop and 1× on phones.
* Rendering stops when the hero is off-screen, when the dive has covered it, or when the tab is hidden.
* Only `transform` and `opacity` change in the DOM, so there is no layout shift.
* **Without WebGL**, the cut-out boat moves over the clean plate as a DOM layer, and the gulls still fly.
* **Reduced motion:** none of this runs. The original still hero is shown unchanged.

### RTL
The photograph is **no longer mirrored in Arabic**, so the sun, town and the vessel's heading keep their real meaning. The Arabic copy column moves to the open left side of the scene, right-aligned, clear of the vessel and the rail.

## 3. Arabic edition: language review (464 strings reviewed)

### Terminology unified across all pages

| Before | After | Reason |
|---|---|---|
| مسحوق الأسماك / مسحوق أسماك | **مسحوق السمك / مسحوق سمك** | Standard feed-industry term for fish meal |
| زيت الأسماك (الخام) | **زيت السمك (الخام)** | Standard term for (crude) fish oil |
| الكيك المضغوط | **كعكة العصر** | Proper Arabic technical term (press cake) |
| السائل (after pressing) | **سائل العصر** | Press liquor |
| بيارة الاستقبال | **حوض الاستقبال** | Clear, non-colloquial |
| المياه المفتوحة | **أعالي البحار** | The correct term for "high seas" |

The company name **الخليج لصناعة الأسماك** is unchanged.

### Phrasing corrected (examples)

| Before | After | Issue |
|---|---|---|
| ما يقيسه الضوء | ما يكشفه القياس | Literal calque of "what the light measures" |
| منتج مصري جديد · يعلن ما تم التحقق منه فقط | شركة مصرية حديثة · لا تُعلن إلا ما تحقّقت منه | "منتج" read as "product"; awkward |
| جاهز · للعالم | جاهزون · للعالم | Agreement |
| ينقسم كل دفعة … يتحول الكيك المضغوط | تنقسم كل دفعة … تتحول كعكة العصر | Gender agreement |
| يدخل الكيك المضغوط إلى المجفف | تدخل كعكة العصر إلى المجفف | Gender / term |
| ينقل سير ناقل المسحوق … | يُنقل المسحوق على سير ناقل … | Ambiguous subject |
| مُعِدّ التركيبات العلفية | أخصائي تركيب الأعلاف | Natural professional term |
| مكوّن علفي بحري المصدر … معبأ | مكوّن علفي من مصدر بحري … يُعبّأ | Fluency |
| لا نذكر ملاءمة لاستخدامات … | ولا ندّعي ملاءمته للاستخدامات … | Register |
| الدقة (fineness) | النعومة | Wrong word: "دقة" reads as "accuracy" |
| جدول المواصفات | صحيفة المواصفات | It is no longer a table |
| ذهبي إلى كهرماني | من الذهبي إلى الكهرماني | Grammar |
| مرّر لرؤية دقة المسحوق | مرّر المؤشر لتفحّص نعومة المسحوق | Clarity |
| انزل إلى البحر (scroll cue) | مرّر للأسفل | Natural UI phrasing |

Plus about 25 smaller fixes: punctuation, hint wording, form labels ("بريد العمل الإلكتروني"), the credits wording, and the products readout ("مسحوق السمك 60 · 65 · 72% · زيت السمك الخام").

No company fact, figure or claim was changed.

### RTL / typography
* Arabic headline sizes are tuned for Cairo's taller line box. The hero readouts use 13–14 px Arabic labels at line-height 1.75.
* The existing direction check (every element containing Arabic text, 12 pages × 2 widths) still reports **0** runs resolving LTR or left-aligned.
* Numbers, emails and phone numbers stay isolated LTR runs inside RTL blocks.

## 4. Visible image annotations removed

| Removed from the visitor-facing pages | Where |
|---|---|
| "Illustrative visualisation" caption overlays | Every AI image |
| "Industry reference photo · author, licence" caption overlays | Every Commons photo |
| "Reference photographs from other fishing ports…" / "Reference photograph from a fishing port in India" | Raw materials |
| "Illustrative visualisation" note | Products room |
| "Illustrative image." prefix | Product pages (the factual colour/appearance note stays) |
| "Images are illustrative…" paragraph | Manufacturing accuracy note |

**What remains, by design:**
* One site-wide disclosure in every footer: "Imagery on this website is illustrative — AI-generated visualisations and licensed industry reference photographs. It does not depict Alkhaleej facilities, vessels or products. Photographers and licences are listed on the image credits page." (Arabic equivalent on Arabic pages.)
* The **Image credits** page, linked from every footer, keeps title, author, licence (with link) and source for all 12 Wikimedia Commons photographs.
* AI images keep "(Illustrative visualisation)" in their alt text for screen-reader users. This is not visible.

### Licensing
| Licence | Photos | Attribution requirement | How it is met |
|---|---|---|---|
| CC0 | 3 | None | Credited anyway |
| CC BY 4.0 / CC BY-SA 4.0 | 6 | Attribution "in any reasonable manner … may be satisfied by providing a link to a resource that includes the required information" | Credits page, linked from every page |
| CC BY 2.0, CC BY 3.0, CC BY-SA 3.0 | 3 | Credit "reasonable to the medium or means" | Credits page, linked from every page; this is standard web practice |

**Limitation:** for the three 2.0/3.0-licensed photographs (`boats-dusk`, `dryer`, `unloading`), a sitewide credits page is the common and generally accepted interpretation of "reasonable to the medium". If the company's counsel prefers credits adjacent to each image, they can be restored as a hover or focus detail without returning to visible captions. No image was found that requires an on-image attribution, so none needed replacing. The resized photographs are not presented as Alkhaleej photography anywhere.

## 5. Files changed
| File | Change |
|---|---|
| `site/src/hero.css` (new) | Hero layout container, scene layers, gull wings, bottom mist, stacked and reduced-motion rules, RTL composition, rail clearance |
| `site/src/build.mjs` | Hero markup (scene + `dv-ui` + `dv-meta`); gull SVG; scene asset copying; loads `hero.css`; caption overlays removed in `pic()`; section notes removed; Arabic phrase corrections |
| `site/src/main.js` | Living-hero engine (WebGL water + in-shader boat, DOM fallback, gulls, pausing); sardine-school canvas scoped to the underwater layer (it previously claimed the first canvas in the hero) |
| `site/src/content.mjs` | Arabic terminology and phrasing; new footer disclosure (EN + AR) |
| `site/src/images.py` | Registers `hero-sea` |
| `site/src/images/ai/hero-sea.png` (new) | Clean composite plate (3840 × 2160) |
| `site/src/scene/boat-*.webp / .png` (new) | Boat cut-out, 1340 and 700 px |

## 6. Browser QA (Playwright, Chromium headless, run sequentially)

| Check | Scope | Result |
|---|---|---|
| Hero overlap (readouts vs title, buttons, lede) | EN + AR × 1440 / 1280 / 768 / 390 | **0 hits**; gaps 254 / 243 / 195 / 184 / 26 / 26 / 26 / 26 px |
| Scene running | same 8 viewports | WebGL **live** at every size, no fallback |
| Boat moves | 20 s frame strip | Moves left and away, shrinking (`qa-v4/hero-motion-strip-0s-10s-20s.jpg`) |
| Gulls | 30 s sampling, AR 1280 + EN 390 | 167 / 181 visible samples; always ≥ 96 px below the header (paths remapped below the nav) |
| Text collisions **during animation** | 10 pages × EN/AR × 4 widths (80 runs) | 1 hit: a section label sliding over its heading while revealing (EN home, 390) → fixed (labels now settle from above); re-run **0** |
| Horizontal overflow, console / JS errors, 4xx, clipped text, broken images | 23 pages × 4 widths | **None** (the 32 "offscreen" lines are the closed product drawer, identical to the `phase-04-signature` baseline) |
| Arabic direction | 12 pages × 1440 / 390 | **0** Arabic runs resolving LTR or left-aligned |
| Visible annotations | all built EN/AR pages except /credits/ | **0** caption overlays or source notes |
| Reduced motion | EN/AR × 1440 / 390 | Still image only; water, boat and gull layers off; no errors (`qa-v4/reduced-motion-*.jpg`) |

**Recordings:** `qa-v4/hero-living-en.webm`, `hero-living-ar.webm` (real time, including the dive exit) and `hero-living-en-2x.gif` (20 s at 2× speed).
**Before / after:** `qa-v4/before/` (rebuilt from `phase-04-signature`), `qa-v4/after/hero-{en,ar}-{1440,1280,768,390}.jpg`, side by side in `qa-v4/compare-hero-{ar,en}-1280.jpg`.
