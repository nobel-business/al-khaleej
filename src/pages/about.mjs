import { UI } from "../content/content.mjs";
import { pic, preload } from "../lib/media.mjs";
import { layout } from "../layouts/layout.mjs";
import { arr } from "../lib/html.mjs";
import { href } from "../lib/routes.mjs";
import { kicker, h2, crumb, ENV, ctaBand, opBleed } from "../components/blocks.mjs";
import { board } from "../components/spec.mjs";
import { orbit } from "../components/orbit.mjs";

export const about = (lang) => {
  const u = UI[lang], ar = lang === "ar";
  const body = `${opBleed(lang, { img: "boats-dusk", crumbs: crumb(lang, [u.nav.about]), kick: u.nav.about, title: ar ? "الخليج\nلصناعة الأسماك" : "Alkhaleej\nFish Manufacturing", lede: ar ? "مصنع للمكوّنات العلفية البحرية في كفر الشيخ، مصر، تأسس عام 2025." : "A marine ingredients manufacturer in Kafr El-Sheikh, Egypt, established in 2025." })}
<section class="sec" data-env="${ENV.dawn}">
  <div class="wrap comp comp-57">
    ${pic(lang, "net-haul", { col: 42, mcol: 100, box: 0.8, reveal: "curtain", cls: "tall" })}
    <div>${kicker(ar ? "من نحن" : "Who we are")}${h2(ar ? "من البحر\nإلى صناعة الأعلاف." : "From the sea\nto feed manufacturing.")}<div class="body" data-r="up"><p>${ar ? "تأسس مصنع الخليج لصناعة الأسماك عام 2025 في محافظة كفر الشيخ، مصر، لإنتاج مسحوق السمك وزيت السمك الخام." : "Alkhaleej Fish Manufacturing was established in 2025 in Kafr El-Sheikh Governorate, Egypt, to produce fish meal and crude fish oil."}</p><p>${ar ? "نعتمد على أسماك بحرية كاملة، منها السردين، من رحلات مراكب الصيد التابعة لنا ومصادر التوريد البحرية، ونحوّلها إلى مكونات تُستخدم في صناعة الأعلاف." : "We process whole marine fish, including sardines, sourced through our fishing vessel operations and other marine supply channels, into ingredients used in feed manufacturing."}</p><p>${ar ? "نرحّب باستفسارات التوريد من المشترين المحليين والدوليين." : "We welcome supply inquiries from domestic and international buyers."}</p></div></div>
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
<section class="sec" data-env="${ENV.dawn}">
  <div class="wrap">
    <div class="head"><div>${kicker(ar ? "الشفافية" : "Transparency")}${h2(ar ? "ما نعلنه اليوم،\nوما سيُنشر لاحقًا." : "What we state today,\nand what follows.")}</div><p class="lede" data-r="up">${ar ? "ننشر المعلومات بعد التحقق منها. البنود التالية قيد الإعداد وتُقدَّم عند الطلب." : "We publish facts as they are verified. The items below are in preparation and can be discussed on request."}</p></div>
    <div class="ledger2"><div class="ledger-meter" data-r="up" aria-hidden="true"><i style="--w:50%"></i><span>${ar ? "6 بنود معلنة · 6 قيد الإعداد" : "6 stated · 6 in preparation"}</span></div><div class="ledger-cols">${board(lang, ar ? [["تأسست عام 2025 · كفر الشيخ، مصر"], ["مسحوق سمك بدرجات 60% و62% و65% و66% و72%"], ["زيت سمك خام يُستخلص أثناء التصنيع"], ["أسماك بحرية كاملة، منها السردين"], ["مراكب صيد تابعة للشركة وتوريد من الموانئ ومخازن التبريد"], ["أكياس 50 كجم للمسحوق · براميل للزيت"]] : [["Established 2025 · Kafr El-Sheikh, Egypt"], ["Fish meal in 60%, 62%, 65%, 66% and 72% grades"], ["Crude fish oil recovered during processing"], ["Whole marine fish, including sardines"], ["Own vessels, plus port and cold-storage supply"], ["50 kg bags for meal · drums for oil"]], { title: ar ? "معلن اليوم" : "Stated today", s: "stated" })}${board(lang, ar ? [["النشرات الفنية لكل درجة"], ["شهادات التحليل"], ["الشهادات والتراخيص"], ["ميناء التصدير وشروط الشحن"], ["سعة البراميل"], ["العنوان التفصيلي"]] : [["Technical datasheets per grade"], ["Certificates of analysis"], ["Certifications and licences"], ["Port of export and Incoterms"], ["Drum capacity"], ["Full street address"]], { title: ar ? "قيد الإعداد" : "In preparation", s: "pending" })}</div></div>
  </div>
</section>
${ctaBand(lang)}`;
  return layout(lang, { key: "about", over: true, title: ar ? "من نحن | الخليج لصناعة الأسماك" : "About | Alkhaleej Fish Manufacturing", desc: ar ? "مصنع مصري لمسحوق السمك وزيت السمك الخام، تأسس عام 2025 في كفر الشيخ." : "Egyptian producer of fish meal and crude fish oil, established in 2025 in Kafr El-Sheikh.", body, preloadImg: preload("boats-dusk", { fill: 1, mfill: 0.82 }) });
};
