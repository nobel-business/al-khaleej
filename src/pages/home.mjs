import { UI, PRODUCTS, STAGES } from "../content/content.mjs";
import { arr, lines } from "../lib/html.mjs";
import { href, prodHref } from "../lib/routes.mjs";
import { M, pic, preload } from "../lib/media.mjs";
import { layout } from "../layouts/layout.mjs";
import { kicker, h2, ENV, SL, ctaBand, ML } from "../components/blocks.mjs";
import { streamsSVG, gauges, loupe, dialBlock } from "../components/diagrams.mjs";
import { orbit } from "../components/orbit.mjs";
import { GULL } from "../components/gull.mjs";

export const home = (lang) => {
  const u = UI[lang], ar = lang === "ar";
  const rail = [["surface", ar ? "البحر" : "The sea"], ["catch", ar ? "الصيد" : "The catch"], ["line", ar ? "التصنيع" : "The line"], ["meal", ar ? "مسحوق السمك" : "Fish meal"], ["oil", ar ? "زيت السمك" : "Fish oil"], ["quality", u.nav.quality], ["company", ar ? "الشركة" : "Company"], ["world", u.nav.intl]];
  const catchFrames = [["med-boats", ar ? "العودة إلى الساحل" : "Back to the coast", ar ? "قوارب صيد عائدة في البحر المتوسط قرب الإسكندرية — البحر الذي ننطلق منه." : "Fishing boats returning on the Mediterranean near Alexandria — the sea we work from."],
    ["net-haul", ar ? "سردين طازج" : "Fresh sardines", ar ? "تشمل المادة الخام السردين وأنواعًا بحرية أخرى مناسبة، تُستخدم كاملة." : "Raw material includes sardines and other suitable marine species, used whole."],
    ["unloading", ar ? "التفريغ في الميناء" : "Landed at port", ar ? "تصل الأسماك أيضًا من الموانئ ومخازن التبريد، إلى جانب رحلات مراكب الشركة." : "Fish also arrive from ports and cold storage, alongside the company’s own fishing trips."],
    ["m-receiving", ar ? "حوض الاستقبال" : "The receiving pit", ar ? "تبدأ رحلة التصنيع حين تُستقبل الأسماك الكاملة في المصنع." : "Manufacturing begins when whole fish are received at the plant."]];
  const stepsJSON = JSON.stringify(STAGES.map((s, i) => ({ k: String(i + 1).padStart(2, "0") + " · " + ({ oil: SL(lang), meal: ML(lang), main: ar ? "المُدخل" : "Input", split: ar ? "نقطة الانقسام" : "Split", both: ar ? "المساران" : "Both streams" }[s.stream]), t: s.t[lang], d: s.d[lang] })));
  const body = `
<section class="dive" id="surface" data-env="${ENV.dawn}" aria-label="${u.brand}">
  <div class="dv-stage">
    <div class="dv-surface"><div class="dv-scene" data-scene data-plate="/img/hero-sea-" data-plate-w="${M["hero-sea"].widths.join(",")}">${pic(lang, "hero-dawn", { eager: true, priority: true, fill: 1, mfill: 0.62, cls: "sc-still" })}<canvas class="sc-water" aria-hidden="true"></canvas><div class="sc-boat" aria-hidden="true"><span class="sc-wet"></span><picture><source type="image/webp" srcset="/assets/scene/boat-700.webp 700w, /assets/scene/boat-1340.webp 1340w" sizes="(max-width:899px) 70vw, 42vw"><img src="/assets/scene/boat-700.png" srcset="/assets/scene/boat-700.png 700w, /assets/scene/boat-1340.png 1340w" sizes="(max-width:899px) 70vw, 42vw" width="1340" height="1220" alt="" decoding="async" loading="lazy"></picture></div><div class="sc-birds" aria-hidden="true">${GULL(0)}${GULL(1)}</div></div></div>
    <div class="dv-wash" aria-hidden="true"></div>
    <div class="dv-under">${pic(lang, "sardine-spiral", { fill: 1, mfill: 0.66 })}<canvas aria-hidden="true"></canvas></div>
    <div class="dv-foam" aria-hidden="true"><svg viewBox="0 0 1200 46" preserveAspectRatio="none"><path d="M0 23 Q 75 8 150 23 T 300 23 T 450 23 T 600 23 T 750 23 T 900 23 T 1050 23 T 1200 23"/><path class="f2" d="M0 30 Q 100 18 200 30 T 400 30 T 600 30 T 800 30 T 1000 30 T 1200 30"/></svg></div>
    <div class="dv-ui">
    <div class="dv-title">
      <div class="eyebrow">${ar ? "الخليج لصناعة الأسماك · تأسست 2025" : "Alkhaleej Fish Manufacturing · Est. 2025"}</div>
      <h1 class="h1 split-h"><span class="ln thin"><span>${ar ? "من البحر" : "From sea"}</span></span><span class="ln bold"><span>${ar ? "إلى الصناعة." : "to industry."}</span></span></h1>
      <p class="dv-sub">${ar ? "نحوّل الأسماك البحرية الكاملة إلى مسحوق سمك وزيت سمك خام في كفر الشيخ، مصر." : "We process whole marine fish into fish meal and crude fish oil in Kafr El-Sheikh, Egypt."}</p>
      <div class="dv-row"><a class="btn primary" href="${href(lang, "products")}">${u.explore} ${arr}</a><a class="btn line" href="${href(lang, "contact")}#inquiry">${u.quote}</a></div>
    </div>
    <div class="dv-meta">
      <div class="dv-corner dv-c1"><b>${ar ? "الموقع" : "Location"}</b>${u.location}</div>
      <div class="dv-cue" aria-hidden="true">${ar ? "مرّر للأسفل" : "Scroll to dive"}<i></i></div>
      <span class="dv-spacer" aria-hidden="true"></span>
    </div>
    </div>
    <span class="dv-hint mono" aria-hidden="true">${ar ? "حرّك الضوء داخل السرب" : "Move the light through the school"}</span>
    <div class="dv-next"><div class="dv-card">${kicker(ar ? "تحت السطح" : "Beneath the surface")}<h2 class="h2">${ar ? "أسماك بحرية كاملة، منها السردين." : "Whole marine fish, including sardines."}</h2><p>${ar ? "من رحلات مراكب الشركة في البحر الأبيض المتوسط والبحر الأحمر والخليج العربي، ومن الموانئ ومخازن التبريد." : "From the company’s own vessels in the Mediterranean, the Red Sea and the Arabian Gulf, and from ports and cold storage."}</p><div class="actions"><a class="link" href="${href(lang, "raw")}">${u.nav.raw} ${arr}</a></div></div></div>
  </div>
</section>

<section class="hz" id="catch" data-env="${ENV.mist}" aria-label="${ar ? "الصيد" : "The catch"}">
  <div class="hz-pin">
    <div class="hz-head"><div><div class="kicker">${ar ? "من البحر إلى المصنع" : "From the sea to the plant"}</div><h2 class="h2" data-lines>${lines(ar ? "رحلة المادة الخام." : "The journey of\nthe raw material.")}</h2></div></div>
    <div class="hz-track">${catchFrames.map(([img, t, dsc], i) => `<article class="hz-frame${i ? " dim" : ""}">${pic(lang, img, { fill: 0.6, mfill: 0.4, sizes: "" }).replace(/sizes="[^"]*"/g, `sizes="(max-width:899px) 100vw, 1100px"`)}<div class="txt"><span class="no">0${i + 1}</span><b>${t}</b><span>${dsc}</span></div></article>`).join("")}</div>
    <div class="hz-count mono"><span class="num">01 / 0${catchFrames.length}</span><span class="bar"><i></i></span></div>
  </div>
</section>

<section class="theline" id="line" data-env="${ENV.steel}" aria-label="${u.nav.mfg}">
  <div class="line-pin">
    ${pic(lang, "steam", { fill: 1, mfill: 0.56 })}
    <div class="line-veil" aria-hidden="true"></div>
    <div class="line-card">
      <div class="lc-top"><div>${kicker(u.nav.mfg)}<h2 class="h2 split-h" style="margin-top:10px"><span class="thin">${ar ? "مُدخل واحد." : "One input."}</span><span class="bold">${ar ? "مساران للإنتاج." : "Two streams."}</span></h2><p class="why">${ar ? "يفصل العصر كل دفعة إلى مسارين: مسحوق سمك غني بالبروتين وزيت سمك خام. تابع الخط وهو يُرسم مع التمرير." : "Pressing separates every batch into two products — protein-rich fish meal and crude fish oil. Follow the line as it draws with your scroll."}</p></div><div class="now" aria-live="polite"></div></div>
      ${streamsSVG(lang, { scrub: true })}
      <script type="application/json" id="line-steps">${stepsJSON}</script>
      <p style="margin-top:10px"><a class="link" href="${href(lang, "mfg")}">${ar ? "ادخل إلى المصنع" : "Step inside the plant"} ${arr}</a></p>
    </div>
  </div>
</section>

<section class="sec cv" id="meal" data-env="${ENV.sand}">
  <div class="wrap meal">
    ${loupe(lang, "powder-pressed")}
    <div>${kicker(u.fishmeal)}<h2 class="h2 split-h" style="margin-top:14px"><span class="thin">${ar ? "مسحوق فائق النعومة." : "Ultra-fine."}</span><span class="bold">${ar ? "بخمس درجات." : "In five grades."}</span></h2>
    <p class="body" data-r="up" style="margin-top:16px">${ar ? "مسحوق السمك منتج جاف ومتجانس، بدرجات بروتين تجارية 60% و62% و65% و66% و72%، بنوعين عالي الدهن ومنخفض الدهن، ويُعبأ في أكياس 50 كجم. أدِر المؤشر لاختيار الدرجة." : "Fish meal is a dry, homogeneous powder in 60%, 62%, 65%, 66% and 72% commercial protein grades, in high-fat and low-fat types, packed in 50 kg bags. Turn the instrument to choose a grade."}</p>
    ${dialBlock(lang)}
    <p class="small muted" style="margin-top:14px">${ar ? "أرقام الدرجات تسميات تجارية وليست حدودًا دنيا مضمونة." : "Grade figures are commercial labels, not guaranteed minimum specifications."}</p></div>
  </div>
</section>

<section class="sec cv" id="oil" data-env="${ENV.amber}">
  <div class="wrap oilx">
    <div class="a glowable">${pic(lang, "oil-pour", { col: 50, box: 0.8, reveal: "curtain" })}<span class="glow" aria-hidden="true"></span></div>
    <div class="copy">${kicker(u.oil)}<h2 class="h2 split-h" style="margin-top:14px"><span class="thin">${ar ? "زيت خام،" : "Crude oil,"}</span><span class="bold">${ar ? "من الذهبي إلى الكهرماني." : "golden to amber."}</span></h2><p class="body" data-r="up" style="margin-top:16px">${ar ? "يُستخلص من سائل العصر بفصل الزيت عن الماء بالطرد المركزي، ويُورَّد في براميل." : "Recovered from the liquid stream after pressing, by centrifugal oil–water separation, and supplied in drums."}</p><p style="margin-top:22px"><a class="btn line" href="${prodHref(lang, PRODUCTS.find((p) => p.oil))}">${u.viewProduct} ${arr}</a></p></div>
    <div class="b glowable" data-px="0.06">${pic(lang, "m-centrifuge", { col: 42, box: 1.6, reveal: "fade" })}<span class="glow" aria-hidden="true"></span></div>
  </div>
</section>

<section class="sec cv" id="quality" data-env="${ENV.dawn}">
  <div class="wrap qual">
    <div>${kicker(u.nav.quality)}${h2(ar ? "ما يكشفه القياس." : "What the light\nmeasures.")}<p class="body" data-r="up" style="margin-top:16px">${ar ? "تشمل قياسات العيّنات المتاحة لدينا البروتين والرطوبة والدهون والرماد خلال التصنيع وعلى المنتج النهائي." : "Our available sample measurements cover protein, moisture, fat and ash during production and on finished product."}</p>${gauges(lang)}<p style="margin-top:24px"><a class="link" href="${href(lang, "quality")}">${u.nav.quality} ${arr}</a></p></div>
    ${pic(lang, "lab", { col: 48, box: 4 / 3, reveal: "curtain" })}
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
    <div class="iris-copy">${kicker(u.nav.intl)}<h2 class="h2">${ar ? "صناعة مصرية، منفتحة على المشترين الدوليين." : "Egyptian manufacturing, open to international buyers."}</h2><p class="body">${ar ? "نتطلع إلى تطوير علاقات توريد مع مصانع الأعلاف والمستوردين والموزعين في أسواق متعددة." : "We aim to build supply relationships with feed manufacturers, importers and distributors across international markets."}</p><ul class="ask-mini">${(ar ? ["الدولة وميناء الوصول", "المنتج ودرجة البروتين", "الكمية ودورية الشحن", "طريقة التعبئة", "المستندات المطلوبة", "موعد التسليم"] : ["Destination country & port", "Product & protein grade", "Volume & frequency", "Packing preference", "Documents required", "Target delivery window"]).map((x, i) => `<li><span>0${i + 1}</span>${x}</li>`).join("")}</ul><p style="margin-top:18px"><a class="link" href="${href(lang, "intl")}">${u.nav.intl} ${arr}</a></p></div>
  </div>
</section>
${ctaBand(lang)}`;
  return layout(lang, { key: "home", over: true, rail, title: ar ? "الخليج لصناعة الأسماك | مسحوق السمك وزيت السمك الخام — مصر" : "Alkhaleej Fish Manufacturing | Fish meal & crude fish oil — Egypt",
    desc: ar ? "مسحوق سمك بدرجات بروتين 60% و62% و65% و66% و72% وزيت سمك خام من أسماك بحرية كاملة، كفر الشيخ، مصر." : "Fish meal in 60%, 62%, 65%, 66% and 72% protein grades and crude fish oil from whole marine fish. Kafr El-Sheikh, Egypt.",
    body, preloadImg: preload("hero-dawn", { fill: 1, mfill: 0.62 }) });
};
