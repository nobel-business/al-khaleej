import { UI, PRODUCTS } from "../content/content.mjs";
import { arr } from "../lib/html.mjs";
import { prodHref, quoteHref } from "../lib/routes.mjs";
import { pic, preload, specPic } from "../lib/media.mjs";
import { layout } from "../layouts/layout.mjs";
import { kicker, h2, crumb, ENV, ctaBand, heroCopy } from "../components/blocks.mjs";
import { specRows, compare } from "../components/spec.mjs";

export const products = (lang) => {
  const u = UI[lang], ar = lang === "ar";
  const body = `<section class="ra hf" id="specimens" data-env="${ENV.paper}" aria-label="${ar ? "غرفة العيّنات" : "Specimen room"}">
  <div class="ra-wall" aria-hidden="true"><span class="beam" style="--bx:6vw"></span><span class="beam b2" style="--bx:26vw"></span></div>
  <div class="ra-window">${pic(lang, "hero-dawn", { eager: true, col: 46, mcol: 100, box: 1.6 })}</div>
  <div class="ra-veil" aria-hidden="true"></div>
  <div class="ra-copy">${heroCopy(lang, { crumbs: crumb(lang, [u.nav.products]), title: ar ? "أربعة مكونات بحرية،\nتحت ضوء الصباح." : "Four marine ingredients,\nseen in first light.", size: "hero-m",
    lede: ar ? "مسحوق سمك بدرجات بروتين تجارية 60% و65% و72%، وزيت سمك خام، من أسماك بحرية كاملة في كفر الشيخ، مصر." : "Fish meal in 60%, 65% and 72% commercial protein grades, and crude fish oil — processed from whole marine fish in Kafr El-Sheikh, Egypt.",
    actions: `<button type="button" class="btn primary" data-explore>${ar ? "استعرض العيّنات" : "View the specimens"} ${arr}</button><a class="btn line" href="#compare">${ar ? "قارن" : "Compare"}</a>` })}</div>
  <div class="ra-band">
    <div class="ra-meta"><p class="hint"><i aria-hidden="true"></i><span>${ar ? "مرّر الضوء على الرف، واختر عيّنة لعرض تفاصيلها." : "Move the light along the shelf. Select a specimen for its details."}</span></p></div>
    <span class="ra-sill" aria-hidden="true"></span>
    <div class="ra-shelf" role="group" aria-label="${ar ? "رف العيّنات" : "Specimen shelf"}">${PRODUCTS.map((p, i) => `<button type="button" class="ra-spec" data-i="${i}" data-slug="${p.slug}" aria-controls="ra-drawer" aria-expanded="false" aria-label="${p.name[lang]} — ${ar ? "عرض التفاصيل" : "view details"}"><span class="num" aria-hidden="true">0${i + 1}</span>${specPic(lang, p, `view-transition-name:spec-${p.slug}`)}<span class="glint" aria-hidden="true"></span><span class="tag"><b>${p.name[lang]}</b><small>${p.oil ? u.drums : u.bags}</small></span></button>`).join("")}</div>
    <span class="sun" aria-hidden="true"></span>
  </div>
  <aside class="ra-drawer" id="ra-drawer" aria-label="${ar ? "تفاصيل العيّنة" : "Specimen details"}" inert>
    <button type="button" class="ra-x" aria-label="${u.close}"><i class="ic ic-x" aria-hidden="true"></i></button>
    <div class="ra-dcs" aria-live="polite">${PRODUCTS.map((p, i) => `<div class="ra-dc${i ? "" : " on"}" data-i="${i}"><p class="ra-idx">0${i + 1} / 04 · ${p.oil ? u.oil : u.fishmeal}</p><h2 class="ra-name">${p.name[lang]}</h2><p class="ra-desc">${p.desc[lang]}</p><dl class="ra-rows">${specRows(lang, p).slice(0, 5).map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl><div class="ra-acts"><a class="btn primary" href="${quoteHref(lang, p)}">${p.oil ? (ar ? "اطلب عرض سعر لزيت السمك" : "Request a quote for crude fish oil") : (ar ? "اطلب عرض سعر لهذه الدرجة" : "Request a quote for this grade")} ${arr}</a><a class="link" href="${prodHref(lang, p)}">${ar ? "صفحة المنتج" : "Product page"} ${arr}</a></div></div>`).join("")}</div>
    <div class="ra-nav"><button type="button" class="ra-prev"><i class="ic ic-arr" aria-hidden="true"></i><span>${ar ? "السابق" : "Previous"}</span></button><span class="ra-count"><b>01</b> / 04</span><button type="button" class="ra-next"><span>${ar ? "التالي" : "Next"}</span><i class="ic ic-arr" aria-hidden="true"></i></button></div>
  </aside>
</section>
<section class="sec" id="compare" data-env="${ENV.dawn}">
  <div class="wrap">
    <div class="sec-head split-head">${kicker(ar ? "مقارنة" : "Compare")}${h2(ar ? "المنتجات\nجنبًا إلى جنب." : "The range,\nside by side.")}<p class="lede" data-r="up">${ar ? "مرّر المؤشر فوق أي منتج لإبراز عموده. تُقدَّم المواصفات المعتمدة عند الطلب." : "Hover or focus a product to highlight its column. Verified specifications are provided on request."}</p></div>
    ${compare(lang)}
  </div>
</section>
<section class="bleed" data-env="${ENV.steel}">${pic(lang, "sacks", { px: 0.08, fill: 0.92, mfill: 0.62 })}<div class="card">${kicker(u.packing)}${h2(ar ? "معبّأ للتوريد\nالصناعي." : "Packed for\nindustrial supply.")}<p class="body" data-r="up">${ar ? "يُعبأ مسحوق السمك في أكياس 50 كجم، ويُعبأ زيت السمك الخام في براميل." : "Fish meal is packed in 50 kg bags; crude fish oil is packed in drums."}</p></div></section>
${ctaBand(lang)}`;
  return layout(lang, { key: "products", over: true, preloadImg: preload("hero-dawn", "(max-width:980px) 100vw, 46vw"), title: ar ? "المنتجات | الخليج لصناعة الأسماك" : "Products | Alkhaleej Fish Manufacturing", desc: ar ? "مسحوق سمك 60% و65% و72% وزيت سمك خام." : "Fish meal 60%, 65%, 72% and crude fish oil.", body });
};
