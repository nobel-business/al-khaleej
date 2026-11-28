import { UI, PRODUCTS, STAGES } from "../content/content.mjs";
import { arr, lines } from "../lib/html.mjs";
import { href, prodHref } from "../lib/routes.mjs";
import { M, pic, preload, imgUrl } from "../lib/media.mjs";
import { layout } from "../layouts/layout.mjs";
import { kicker, h2, ENV, SL, ctaBand, ML } from "../components/blocks.mjs";
import { streamsSVG, gauges, loupe, dialBlock, oilDial } from "../components/diagrams.mjs";

/* homepage quality indicators — client copy (28 Nov 2026) */
const QUAL_HOME = [
  { c: "#14A0A6", g: "fish", t: { ar: "الطزاجة", en: "Freshness" }, d: { ar: "مؤشر لجودة الخامات البحرية وملاءمتها للتصنيع.", en: "Indicates the quality of the marine raw material and its suitability for processing." } },
  { c: "#E8891C", g: "molecule", t: { ar: "البروتين", en: "Protein" }, d: { ar: "مؤشر للقيمة البروتينية والتصنيف التجاري.", en: "Indicates protein value and commercial grade." } },
  { c: "#D4A21A", g: "drop", t: { ar: "الدهون", en: "Fat" }, d: { ar: "مؤشر لقيمة الطاقة والتغذية.", en: "Indicates energy and nutritional value." } },
  { c: "#64748B", g: "crystal", t: { ar: "الرماد", en: "Ash" }, d: { ar: "مؤشر للمحتوى المعدني والتركيب الكيميائي.", en: "Indicates mineral content and chemical composition." } },
  { c: "#2F7FE0", g: "waves", t: { ar: "الرطوبة", en: "Moisture" }, d: { ar: "مؤشر لثبات المنتج أثناء التخزين والنقل.", en: "Indicates product stability in storage and transport." } },
  { c: "#E2555A", g: "flask", t: { ar: "جودة الزيوت", en: "Oil quality" }, d: { ar: "مؤشرات الحموضة والأكسدة لتقييم جودة الزيوت واستقرارها الكيميائي.", en: "Acidity and oxidation indicators to assess oil quality and chemical stability." } },
];
import { orbit } from "../components/orbit.mjs";
import { GULL } from "../components/gull.mjs";

export const home = (lang) => {
  const u = UI[lang], ar = lang === "ar";
  const rail = [["surface", ar ? "البحر" : "The sea"], ["meal", ar ? "مسحوق السمك" : "Fish meal"], ["oil", ar ? "زيت السمك" : "Fish oil"], ["quality", u.nav.quality], ["company", ar ? "الشركة" : "Company"], ["world", u.nav.intl]];
  const body = `
<section class="dive" id="surface" data-env="${ENV.dawn}" aria-label="${u.brand}">
  <div class="dv-stage">
    <div class="dv-surface"><div class="dv-scene" data-scene data-plate="/img/hero-sea-" data-plate-v="${imgUrl("hero-sea", 0, "x").split("?v=")[1]}" data-plate-w="${M["hero-sea"].widths.join(",")}">${pic(lang, "hero-dawn", { eager: true, priority: true, fill: 1, mfill: 0.62, cls: "sc-still" })}<canvas class="sc-water" aria-hidden="true"></canvas><div class="sc-boat" aria-hidden="true"><span class="sc-wet"></span><picture><source type="image/webp" srcset="/assets/scene/boat-700.webp 700w, /assets/scene/boat-1340.webp 1340w" sizes="(max-width:899px) 70vw, 42vw"><img src="/assets/scene/boat-700.png" srcset="/assets/scene/boat-700.png 700w, /assets/scene/boat-1340.png 1340w" sizes="(max-width:899px) 70vw, 42vw" width="1340" height="1220" alt="" decoding="async" loading="lazy"></picture></div><div class="sc-birds" aria-hidden="true">${GULL(0)}${GULL(1)}</div></div></div>
    <div class="dv-wash" aria-hidden="true"></div>
    <div class="dv-under">${pic(lang, "sardine-spiral", { fill: 1, mfill: 0.66 })}<canvas aria-hidden="true"></canvas></div>
    <div class="dv-foam" aria-hidden="true"><svg viewBox="0 0 1200 46" preserveAspectRatio="none"><path d="M0 23 Q 75 8 150 23 T 300 23 T 450 23 T 600 23 T 750 23 T 900 23 T 1050 23 T 1200 23"/><path class="f2" d="M0 30 Q 100 18 200 30 T 400 30 T 600 30 T 800 30 T 1000 30 T 1200 30"/></svg></div>
    <div class="dv-ui">
    <div class="dv-title">
      <h1 class="h1 split-h"><span class="ln thin"><span>${ar ? "من البحر" : "From sea"}</span></span><span class="ln bold"><span>${ar ? "إلى الصناعة." : "to industry."}</span></span></h1>
      <p class="dv-sub">${ar ? "نصنع القيمة من الموارد البحرية، بإنتاج مسحوق الأسماك وزيت السمك الخام، من مصر إلى الأسواق العالمية." : "We create value from marine resources, producing fish meal and crude fish oil, from Egypt to global markets."}</p>
      <div class="dv-row"><a class="btn primary" href="${href(lang, "products")}">${u.explore} ${arr}</a><a class="btn line" href="${href(lang, "contact")}#inquiry">${u.quote}</a></div>
    </div>
    <div class="dv-meta">
      <div class="dv-cue" aria-hidden="true">${ar ? "مرّر للأسفل" : "Scroll to dive"}<i></i></div>
      <span class="dv-spacer" aria-hidden="true"></span>
    </div>
    </div>
    <div class="dv-next"><div class="dv-card">${kicker(ar ? "تحت السطح" : "Beneath the surface")}<h2 class="h2 sea-h"><span class="sea-a">${ar ? "ثروة البحر،" : "The sea’s wealth,"}</span> <span class="sea-b">${ar ? "أساس صناعتنا." : "the foundation of our industry."}</span></h2><p>${ar ? "من مياه البحر الأبيض المتوسط والبحر الأحمر والخليج العربي، نستمد خاماتنا من الأسماك البحرية الكاملة، عبر منظومة توريد متكاملة تجمع بين الصيد المباشر والمصادر البحرية المتنوعة." : "From the waters of the Mediterranean, the Red Sea and the Arabian Gulf, we source our raw material from whole marine fish, through an integrated supply system that combines direct fishing with diverse marine sources."}</p><div class="actions"><a class="sea-btn" href="${href(lang, "raw")}">${ar ? "اكتشف موادنا الخام" : "Discover our raw materials"} ${arr}</a></div></div></div>
  </div>
</section>

<section class="mfx" id="process" data-env="${ENV.paper}" aria-labelledby="mfx-title">
  ${pic(lang, "m-plant", { fill: 0.62, mfill: 0.42, cls: "mfx-img" })}
  <div class="mfx-card" data-r="up">
    <h2 class="h2" id="mfx-title">${ar ? "دقة التصنيع، أساس الجودة." : "Precision manufacturing, the foundation of quality."}</h2>
    <p class="body">${ar ? "نحوّل الأسماك البحرية إلى مكونات بروتينية وزيوت بحرية، عبر منظومة تصنيع متكاملة تجمع بين التقنيات الصناعية والتحكم في عمليات الإنتاج ومتطلبات الجودة والسلامة." : "We turn marine fish into protein ingredients and marine oils, through an integrated manufacturing system that brings together industrial technology, control of production processes, and quality and safety requirements."}</p>
    <a class="link" href="${href(lang, "mfg")}">${ar ? "اكتشف منظومة التصنيع" : "Explore our manufacturing system"} ${arr}</a>
  </div>
</section>

<section class="sec cv" id="meal" data-env="${ENV.sand}" aria-labelledby="pv-title">
  <div class="wrap meal pv">
    <div class="pv-t"><h2 class="h2 split-h" id="pv-title"><span class="thin">${ar ? "قيمة البحر" : "The sea’s value"}</span> <span class="bold">${ar ? "في منتجاتنا." : "in our products."}</span></h2></div>
    <div class="pv-p"><p class="body" data-r="up">${ar ? "ننتج البروتين والزيوت البحرية من أسماك بحرية كاملة، بمواصفات تغذوية متنوعة، توفر مصادر طبيعية للبروتين الحيواني والأحماض الأمينية الأساسية والأحماض الدهنية البحرية، لتلبية متطلبات صناعات الأعلاف والتغذية، وتوفير خامات لصناعات التكرير والتطبيقات الغذائية والدوائية المتخصصة." : "We produce marine proteins and oils from whole marine fish, in a range of nutritional specifications, providing natural sources of animal protein, essential amino acids and marine fatty acids, to meet the needs of the feed and nutrition industries and to supply raw materials for refining and for specialised food and pharmaceutical applications."}</p></div>
    ${loupe(lang, "meal-oil")}
    <div><h3 class="h2 split-h pv-sub"><span class="thin">${ar ? "مسحوق الأسماك" : "Fish meal"}</span></h3>
    ${dialBlock(lang, 2, { url: href(lang, "products"), label: ar ? "اكتشف منتجاتنا" : "Discover our products" })}</div>
  </div>
</section>

<section class="sec cv" id="oil" data-env="${ENV.amber}">
  <div class="wrap meal oilm">
    ${loupe(lang, "oil-beaker", { tip: ar ? "مرّر المؤشر لتفحص خصائص الزيت" : "Move over to inspect the oil" })}
    <div class="copy"><h3 class="h2 split-h pv-sub"><span class="thin">${ar ? "زيت الأسماك الخام" : "Crude fish oil"}</span></h3>
    ${oilDial(lang, prodHref(lang, PRODUCTS.find((p) => p.oil)))}</div>
  </div>
</section>

<section class="sec cv" id="quality" data-env="${ENV.dawn}">
  <div class="wrap qual">
    <div>${kicker(u.nav.quality)}${h2(ar ? "ما نقيسه في الجودة." : "What we measure\nin quality.")}<p class="body" data-r="up" style="margin-top:16px">${ar ? "تبدأ العناية بالجودة من اختيار الخامات البحرية، وتمتد عبر مراحل التصنيع إلى المنتج النهائي. ونهتم بمتابعة المؤشرات الكيميائية والتغذوية الأساسية لمنتجاتنا، بما يتناسب مع مواصفاتها ومتطلبات استخدامها." : "Quality care begins with the choice of marine raw materials and continues through manufacturing to the finished product. We monitor the key chemical and nutritional indicators of our products, in line with their specifications and the requirements of their use."}</p>${gauges(lang, QUAL_HOME)}<p style="margin-top:24px"><a class="link" href="${href(lang, "quality")}"><span>${ar ? "اكتشف معايير الجودة لدينا" : "Discover our quality standards"}</span> ${arr}</a></p></div>
    ${pic(lang, "lab-qc", { col: 48, box: 1280 / 853, reveal: "curtain" })}
  </div>
</section>

<section class="sec company cv" id="company" data-env="${ENV.paper}">
  <div class="wrap co-grid">
    <div class="co-lead">${kicker(ar ? "الشركة" : "The company")}
      <h2 class="h2 split-h" style="margin-top:14px"><span class="thin">${ar ? "شركة مصرية حديثة" : "A new Egyptian producer"}</span><span class="bold">${ar ? "لا تُعلن إلا ما تحقّقت منه." : "stating only what is verified."}</span></h2>
      <p class="body" data-r="up" style="margin-top:18px">${ar ? "تأسس مصنع الخليج لصناعة الأسماك عام 2025 في كفر الشيخ لإنتاج مسحوق السمك وزيت السمك الخام من أسماك بحرية كاملة. تُنشر الشهادات والسعات والمواصفات المعتمدة فور التحقق منها." : "Alkhaleej Fish Manufacturing was established in 2025 in Kafr El-Sheikh to produce fish meal and crude fish oil from whole marine fish. Certifications, capacities and approved specifications are published as soon as they are verified."}</p>
      <div class="co-acts" data-r="up"><a class="btn line" href="${href(lang, "about")}">${u.nav.about} ${arr}</a><a class="btn line" href="${href(lang, "products")}">${u.nav.products} ${arr}</a><a class="btn line" href="${href(lang, "mfg")}">${u.nav.mfg} ${arr}</a></div>
      <div class="co-orbit">${orbit(lang, { interactive: false, size: "sm" })}</div>
    </div>
    <dl class="co-ledger">
      ${[
        ["2025", "", ar ? "سنة التأسيس" : "Established", ar ? "كفر الشيخ، مصر" : "Kafr El-Sheikh, Egypt"],
        ["5", "", ar ? "درجات بروتين لمسحوق السمك" : "Fish meal protein grades", "60 · 62 · 65 · 66 · 72%"],
        ["1", "", ar ? "زيت سمك خام" : "Crude fish oil", ar ? "يُستخلص أثناء التصنيع ويُورَّد في براميل" : "Recovered during processing, in drums"],
        ["5", "", ar ? "مراحل إنتاج" : "Production stages", ar ? "تسع خطوات مؤكدة من الاستقبال إلى التعبئة" : "Nine confirmed steps, receiving to packing"],
        ["2", "", ar ? "مساران من مُدخل واحد" : "Streams from one input", ar ? "كعكة العصر وسائل العصر" : "Press cake and press liquor"],
        ["50", ar ? " كجم" : " kg", ar ? "أكياس مسحوق السمك" : "Fish meal bags", ar ? "ويُورَّد الزيت الخام في براميل" : "Crude oil is supplied in drums"],
      ].map(([n, unit, t, d], i) => `<div class="co-row" data-r="up" style="transition-delay:${i * 70}ms"><dt><span class="co-n" data-count="${n === "2025" ? "" : n}">${n}</span>${unit ? `<small>${unit}</small>` : ""}</dt><dd><b>${t}</b><span>${d}</span></dd></div>`).join("")}
    </dl>
  </div>
</section>

<section class="iris-sec" id="world" data-env="${ENV.dawn}" aria-label="${u.nav.intl}">
  <div class="iris-pin">
    <div class="iris">${pic(lang, "aerial", { fill: 1, mfill: 0.62 })}</div>
    <span class="iris-ring" aria-hidden="true"></span>
    <div class="iris-title" aria-hidden="true"><div class="h1 split-h" style="font-size:clamp(40px,6vw,96px)"><span class="thin">${ar ? "جاهزون" : "Ready"}</span><span class="bold">${ar ? "للعالم." : "for the world."}</span></div></div>
    <div class="iris-copy">${kicker(u.nav.intl)}<h2 class="h2">${ar ? "صناعة مصرية، برؤية عالمية." : "Egyptian manufacturing, with a global vision."}</h2><p class="body">${ar ? "نعمل على بناء علاقات تجارية مستدامة مع مصانع الأعلاف والمستوردين والموزعين في الأسواق الدولية، من خلال تقديم منتجات بحرية تتناسب مع متطلبات الأسواق واحتياجات العملاء." : "We build lasting trade relationships with feed manufacturers, importers and distributors in international markets, offering marine products that meet market requirements and customer needs."}</p><ul class="ask-mini">${(ar ? ["تنوع المواصفات والمنتجات", "التوريد التجاري والصناعي", "مرونة الكميات والتعبئة", "التنسيق اللوجستي والشحن", "مستندات التجارة والتصدير", "الشراكات التجارية طويلة الأمد"] : ["A range of specifications and products", "Commercial and industrial supply", "Flexible volumes and packing", "Logistics and shipping coordination", "Trade and export documentation", "Long-term trade partnerships"]).map((x, i) => `<li><span>0${i + 1}</span>${x}</li>`).join("")}</ul><p style="margin-top:18px"><a class="link" href="${href(lang, "intl")}"><span>${ar ? "اكتشف أسواقنا الدولية" : "Discover our international markets"}</span> ${arr}</a></p></div>
  </div>
</section>
${ctaBand(lang)}`;
  return layout(lang, { key: "home", over: true, rail, title: ar ? "الخليج لصناعة الأسماك | مسحوق السمك وزيت السمك الخام — مصر" : "Alkhaleej Fish Manufacturing | Fish meal & crude fish oil — Egypt",
    desc: ar ? "مسحوق سمك بدرجات بروتين 60% و62% و65% و66% و72% وزيت سمك خام من أسماك بحرية كاملة، كفر الشيخ، مصر." : "Fish meal in 60%, 62%, 65%, 66% and 72% protein grades and crude fish oil from whole marine fish. Kafr El-Sheikh, Egypt.",
    body, preloadImg: preload("hero-dawn", { fill: 1, mfill: 0.62 }) });
};
