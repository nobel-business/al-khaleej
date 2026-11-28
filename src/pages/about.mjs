import { UI } from "../content/content.mjs";
import { pic, preload } from "../lib/media.mjs";
import { layout } from "../layouts/layout.mjs";
import { arr } from "../lib/html.mjs";
import { href } from "../lib/routes.mjs";
import { kicker, h2, crumb, ENV, ctaBand, opBleed } from "../components/blocks.mjs";
import { board } from "../components/spec.mjs";
import { orbit } from "../components/orbit.mjs";

// About — written in the homepage voice (client copy, Nov 2026): marine protein and oils from whole marine fish,
// integrated supply and manufacturing, Egyptian industry with a global outlook, long-term trade partnerships.
// Facts used are only those already supplied by the client (see docs / homepage copy).
export const about = (lang) => {
  const u = UI[lang], ar = lang === "ar";
  const body = `${opBleed(lang, { img: "boats-dusk", crumbs: crumb(lang, [u.nav.about]), kick: u.nav.about, title: ar ? "الخليج\nلصناعة الأسماك" : "Alkhaleej\nFish Manufacturing", lede: ar ? "صناعة مصرية متخصصة في إنتاج البروتين والزيوت البحرية من الأسماك البحرية الكاملة، من كفر الشيخ إلى الأسواق العالمية." : "Egyptian manufacturing specialised in marine protein and oils from whole marine fish, from Kafr El-Sheikh to global markets." })}
<section class="sec" data-env="${ENV.dawn}">
  <div class="wrap comp comp-57">
    ${pic(lang, "net-haul", { col: 42, mcol: 100, box: 0.8, reveal: "curtain", cls: "tall" })}
    <div>${kicker(ar ? "من نحن" : "Who we are")}${h2(ar ? "نصنع القيمة\nمن الموارد البحرية." : "We create value\nfrom marine resources.")}<div class="body" data-r="up"><p>${ar ? "تأسست الخليج لصناعة الأسماك عام 2025 في كفر الشيخ، جمهورية مصر العربية، لإنتاج مسحوق الأسماك وزيت الأسماك الخام من الأسماك البحرية الكاملة." : "Alkhaleej Fish Manufacturing was established in 2025 in Kafr El-Sheikh, Arab Republic of Egypt, to produce fish meal and crude fish oil from whole marine fish."}</p><p>${ar ? "من مياه البحر الأبيض المتوسط والبحر الأحمر والخليج العربي، نستمد خاماتنا عبر منظومة توريد متكاملة تجمع بين الصيد المباشر بمراكبنا والمصادر البحرية المتنوعة، ثم نحوّلها عبر منظومة تصنيع متكاملة إلى بروتين وزيوت بحرية بمواصفات متنوعة." : "From the Mediterranean, the Red Sea and the Arabian Gulf, we source our raw material through an integrated supply system that combines direct fishing with our own vessels and diverse marine sources, then turn it, through an integrated manufacturing system, into marine proteins and oils in a range of specifications."}</p><p>${ar ? "نخدم مصانع الأعلاف والمستوردين والموزعين، ونعمل على بناء علاقات تجارية مستدامة وشراكات طويلة الأمد في الأسواق الدولية." : "We serve feed manufacturers, importers and distributors, and build lasting trade relationships and long-term partnerships across international markets."}</p></div></div>
  </div>
</section>
<section class="sec company cv" id="company" data-env="${ENV.paper}">
  <div class="wrap co-grid">
    <div class="co-lead">${kicker(ar ? "الشركة" : "The company")}
      <h2 class="h2 split-h" style="margin-top:14px"><span class="thin">${ar ? "صناعة مصرية،" : "Egyptian manufacturing,"}</span><span class="bold">${ar ? "برؤية عالمية." : "with a global vision."}</span></h2>
      <p class="body" data-r="up" style="margin-top:18px">${ar ? "ثروة البحر أساس صناعتنا، ودقة التصنيع أساس جودتنا. من مصنعنا في كفر الشيخ ننتج مسحوق الأسماك بخمس درجات بروتين وزيت الأسماك الخام، لتلبية احتياجات صناعات الأعلاف والتغذية والصناعات الغذائية والأسواق العالمية." : "The sea’s wealth is the basis of our industry, and manufacturing precision the basis of our quality. From our plant in Kafr El-Sheikh we produce fish meal in five protein grades and crude fish oil, serving the feed and nutrition industries, food industries and global markets."}</p>
      <div class="co-acts" data-r="up"><a class="btn line" href="${href(lang, "products")}">${u.nav.products} ${arr}</a><a class="btn line" href="${href(lang, "mfg")}">${u.nav.mfg} ${arr}</a><a class="btn line" href="${href(lang, "quality")}">${u.nav.quality} ${arr}</a></div>
      <div class="co-orbit">${orbit(lang, { interactive: false, size: "sm" })}</div>
    </div>
    <dl class="co-ledger">
      ${[
        ["2025", "", ar ? "سنة التأسيس" : "Established", ar ? "كفر الشيخ، جمهورية مصر العربية" : "Kafr El-Sheikh, Arab Republic of Egypt"],
        ["3", "", ar ? "بحار نستمد منها خاماتنا" : "Seas we source from", ar ? "المتوسط · الأحمر · الخليج العربي" : "Mediterranean · Red Sea · Arabian Gulf"],
        ["5", "", ar ? "درجات بروتين لمسحوق الأسماك" : "Fish meal protein grades", "60 · 62 · 65 · 66 · 72%"],
        ["6", "", ar ? "مؤشرات لزيت الأسماك الخام" : "Crude fish oil parameters", "FFA · PV · p-AV · TOTOX · MI · EPA+DHA"],
        ["5", "", ar ? "مراحل تصنيع" : "Manufacturing stages", ar ? "من استقبال الخامات إلى التعبئة" : "From receiving to packing"],
        ["50", ar ? " كجم" : " kg", ar ? "أكياس مسحوق الأسماك" : "Fish meal bags", ar ? "ويُورَّد زيت الأسماك الخام في براميل" : "Crude fish oil is supplied in drums"],
      ].map(([n, unit, t, d], i) => `<div class="co-row" data-r="up" style="transition-delay:${i * 70}ms"><dt><span class="co-n" data-count="${n === "2025" ? "" : n}">${n}</span>${unit ? `<small>${unit}</small>` : ""}</dt><dd><b>${t}</b><span>${d}</span></dd></div>`).join("")}
    </dl>
  </div>
</section>
<section class="sec" data-env="${ENV.dawn}">
  <div class="wrap">
    <div class="head"><div>${kicker(ar ? "الشفافية" : "Transparency")}${h2(ar ? "معلومات واضحة،\nلقرارات توريد واثقة." : "Clear information,\nfor confident sourcing.")}</div><p class="lede" data-r="up">${ar ? "نشارك المعلومات الموثّقة عن منتجاتنا وعملياتنا، ونستكمل الوثائق الفنية والتجارية التالية لتُقدَّم للمشترين عند الطلب." : "We share verified information about our products and operations, and are completing the technical and commercial documents below, available to buyers on request."}</p></div>
    <div class="ledger2"><div class="ledger-meter" data-r="up" aria-hidden="true"><i style="--w:50%"></i><span>${ar ? "6 بنود متاحة · 6 قيد الإعداد" : "6 available · 6 in preparation"}</span></div><div class="ledger-cols">${board(lang, ar ? [["تأسست عام 2025 · كفر الشيخ، جمهورية مصر العربية"], ["مسحوق الأسماك بدرجات بروتين 60% و62% و65% و66% و72%"], ["زيت الأسماك الخام بمؤشرات FFA وPV وp-AV وTOTOX وMI وEPA+DHA"], ["أسماك بحرية كاملة من المتوسط والأحمر والخليج العربي"], ["مراكب صيد تابعة للشركة وتوريد من الموانئ ومخازن التبريد"], ["أكياس 50 كجم للمسحوق · براميل للزيت"]] : [["Established 2025 · Kafr El-Sheikh, Arab Republic of Egypt"], ["Fish meal in 60%, 62%, 65%, 66% and 72% protein grades"], ["Crude fish oil with FFA, PV, p-AV, TOTOX, MI and EPA+DHA parameters"], ["Whole marine fish from the Mediterranean, Red Sea and Arabian Gulf"], ["Own fishing vessels, plus port and cold-storage supply"], ["50 kg bags for meal · drums for oil"]], { title: ar ? "متاح الآن" : "Available now", s: "stated" })}${board(lang, ar ? [["النشرات الفنية لكل درجة"], ["شهادات التحليل"], ["الشهادات والتراخيص"], ["ميناء التصدير وشروط الشحن"], ["سعة البراميل"], ["العنوان التفصيلي"]] : [["Technical datasheets per grade"], ["Certificates of analysis"], ["Certifications and licences"], ["Port of export and Incoterms"], ["Drum capacity"], ["Full street address"]], { title: ar ? "قيد الإعداد" : "In preparation", s: "pending" })}</div></div>
  </div>
</section>
${ctaBand(lang)}`;
  return layout(lang, { key: "about", over: true, title: ar ? "من نحن | الخليج لصناعة الأسماك" : "About | Alkhaleej Fish Manufacturing", desc: ar ? "صناعة مصرية متخصصة في إنتاج مسحوق الأسماك وزيت الأسماك الخام من الأسماك البحرية الكاملة، من كفر الشيخ إلى الأسواق العالمية." : "Egyptian manufacturer of fish meal and crude fish oil from whole marine fish, from Kafr El-Sheikh to global markets.", body, preloadImg: preload("boats-dusk", { fill: 1, mfill: 0.82 }) });
};
