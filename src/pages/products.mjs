import { UI, PRODUCTS } from "../content/content.mjs";
import { arr, lines } from "../lib/html.mjs";
import { prodHref, quoteHref } from "../lib/routes.mjs";
import { pic, preload, specPic } from "../lib/media.mjs";
import { layout } from "../layouts/layout.mjs";
import { kicker, h2, crumb, ENV, ctaBand, heroCopy } from "../components/blocks.mjs";
import { specRows, compare } from "../components/spec.mjs";

export const products = (lang) => {
  const u = UI[lang], ar = lang === "ar";
  const wall = `<div class="ra-wall" aria-hidden="true"><span class="beam" style="--bx:6vw"></span><span class="beam b2" style="--bx:26vw"></span></div>`;
  // two independent sections: the hero (copy + arched window) and the specimen room (shelf, light, camera, drawer)
  const body = `<section class="ab-hero pr-hero" data-env="${ENV.paper}" aria-labelledby="ab-h1">
  <div class="ab-hero-stage">
    <div class="ab-layer ab-sea">${pic(lang, "pr-hero", { fill: 1, mfill: 1, eager: true, priority: true })}</div>
    <div class="ab-scrim" aria-hidden="true"></div>
    <div class="wrap ab-hero-copy">
      <div class="ab-card">
        <nav class="crumbs ab-crumbs" aria-label="${ar ? "مسار التنقل" : "Breadcrumb"}">${crumb(lang, [u.nav.products])}</nav>
        <p class="ab-hero-eye">${u.nav.products}</p>
        <h1 class="ab-h1" id="ab-h1">${(ar ? ["قيمة البحر", "في منتجاتنا."] : ["The value of the sea", "in our products."]).map((l, i) => `<span class="ab-l" style="--d:${i}"><span>${l}</span></span>`).join(" ")}</h1>
        <p class="ab-hero-p">${ar ? "نقدم منتجات البروتين والزيوت البحرية من الأسماك الكاملة، بمواصفات متنوعة تجمع بين القيمة الغذائية ومتطلبات صناعات الأعلاف والتغذية والصناعات المتخصصة." : "We offer protein and marine oil products made from whole fish, in a range of specifications that combine nutritional value with the requirements of the feed, nutrition and specialised industries."}</p>
      </div>
    </div>
    <span class="ab-cue" aria-hidden="true"><i></i>${ar ? "مرّر للأسفل" : "Scroll"}</span>
  </div>
</section>
<section class="ra ra-products" id="specimens" data-env="${ENV.paper}" aria-labelledby="ra-h">
  ${wall}
  <div class="ra-veil" aria-hidden="true"></div>
  <div class="wrap pr-head ra-head"><p class="ab-eye" data-r="up">${ar ? "غرفة العيّنات" : "Specimen room"}</p><h2 class="ab-h2" id="ra-h" data-lines>${lines(ar ? "استعرض العيّنات." : "View the specimens.")}</h2><p class="pr-lede" data-r="up"><i class="pr-dot" aria-hidden="true"></i>${ar ? "مرّر الضوء على الرف، واختر عيّنة لعرض تفاصيلها." : "Move the light along the shelf. Select a specimen for its details."}</p></div>
  <div class="ra-space" aria-hidden="true"></div>
  <div class="ra-band">
    <span class="ra-sill" aria-hidden="true"></span>
    <div class="ra-shelf" role="group" aria-label="${ar ? "رف العيّنات" : "Specimen shelf"}">${PRODUCTS.map((p, i) => `<button type="button" class="ra-spec" data-i="${i}" data-slug="${p.slug}" aria-controls="ra-drawer" aria-expanded="false" aria-label="${p.name[lang]} — ${ar ? "عرض التفاصيل" : "view details"}"><span class="num" aria-hidden="true">0${i + 1}</span>${specPic(lang, p, `view-transition-name:spec-${p.slug}`)}<span class="glint" aria-hidden="true"></span><span class="tint" aria-hidden="true"></span><span class="tag"><b>${p.name[lang]}</b></span></button>`).join("")}</div>
    <span class="sun" aria-hidden="true"></span>
  </div>
  <aside class="ra-drawer" id="ra-drawer" aria-label="${ar ? "تفاصيل العيّنة" : "Specimen details"}" inert>
    <button type="button" class="ra-x" aria-label="${u.close}"><i class="ic ic-x" aria-hidden="true"></i></button>
    <div class="ra-dcs" aria-live="polite">${PRODUCTS.map((p, i) => `<div class="ra-dc${i ? "" : " on"}" data-i="${i}"><p class="ra-idx">0${i + 1} / ${String(PRODUCTS.length).padStart(2, "0")} · ${p.oil ? u.oil : u.fishmeal}</p><h2 class="ra-name">${p.name[lang]}</h2><p class="ra-desc">${p.desc[lang]}</p><dl class="ra-rows">${specRows(lang, p).slice(0, 5).map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl><div class="ra-acts"><a class="btn primary" href="${quoteHref(lang, p)}">${p.oil ? (ar ? "اطلب عرض سعر لزيت السمك" : "Request a quote for crude fish oil") : (ar ? "اطلب عرض سعر لهذه الدرجة" : "Request a quote for this grade")} ${arr}</a><a class="link" href="${prodHref(lang, p)}">${ar ? "صفحة المنتج" : "Product page"} ${arr}</a></div></div>`).join("")}</div>
    <div class="ra-nav"><button type="button" class="ra-prev"><i class="ic ic-arr" aria-hidden="true"></i><span>${ar ? "السابق" : "Previous"}</span></button><span class="ra-count"><b>01</b> / ${String(PRODUCTS.length).padStart(2, "0")}</span><button type="button" class="ra-next"><span>${ar ? "التالي" : "Next"}</span><i class="ic ic-arr" aria-hidden="true"></i></button></div>
  </aside>
</section>
<section class="sec" id="compare" data-env="${ENV.dawn}" aria-labelledby="cmp-h">
  <div class="wrap">
    <div class="pr-head"><p class="ab-eye" data-r="up">${ar ? "مقارنة" : "Compare"}</p><h2 class="ab-h2" id="cmp-h" data-lines>${lines(ar ? "المنتجات جنبًا إلى جنب." : "The range, side by side.")}</h2><p class="pr-lede pr-one" data-r="up">${ar ? "مرّر المؤشر فوق أي منتج لإبراز عموده. تُقدَّم المواصفات المعتمدة عند الطلب." : "Hover or focus a product to highlight its column. Verified specifications are provided on request."}</p></div>
    ${compare(lang)}
  </div>
</section>
<section class="bleed pr-pack" data-env="${ENV.steel}">${pic(lang, "sacks", { px: 0.08, fill: 0.92, mfill: 0.62 })}<div class="card">${kicker(u.packing)}${h2(ar ? "معبّأ للتوريد\nالصناعي." : "Packed for\nindustrial supply.")}<p class="body" data-r="up">${ar ? "يُعبأ مسحوق السمك في أكياس 50 كجم، ويُعبأ زيت السمك الخام في براميل." : "Fish meal is packed in 50 kg bags; crude fish oil is packed in drums."}</p></div></section>
${ctaBand(lang)}`;
  return layout(lang, { key: "products", over: true, preloadImg: preload("pr-hero", { fill: 1, mfill: 1 }), title: ar ? "المنتجات | الخليج لصناعة الأسماك" : "Products | Alkhaleej Fish Manufacturing", desc: ar ? "مسحوق سمك 60% و62% و65% و66% و72% وزيت سمك خام." : "Fish meal 60%, 62%, 65%, 66%, 72% and crude fish oil.", body });
};
