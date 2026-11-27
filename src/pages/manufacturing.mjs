import { UI, STEPS, STAGES } from "../content/content.mjs";
import { arr } from "../lib/html.mjs";
import { href } from "../lib/routes.mjs";
import { pic, preload } from "../lib/media.mjs";
import { layout } from "../layouts/layout.mjs";
import { kicker, h2, crumb, ENV, SL, ctaBand, opBleed, ML } from "../components/blocks.mjs";
import { streamsSVG } from "../components/diagrams.mjs";

export const TIMG = ["m-receiving", "m-conveyor", "m-cooker", "m-press", "m-centrifuge", "dryer", "m-cooling", "steam", "m-packing"];
export const mfg = (lang) => {
  const u = UI[lang], ar = lang === "ar";
  const tag = (s) => ({ main: "", split: `<span class="chip v">${ML(lang)}</span><span class="chip">${SL(lang)}</span>`, oil: `<span class="chip">${SL(lang)}</span>`, meal: `<span class="chip v">${ML(lang)}</span>`, both: `<span class="chip v">${ML(lang)}</span><span class="chip">${SL(lang)}</span>` }[s]);
  const body = `${opBleed(lang, { img: "m-receiving", env: ENV.steel, crumbs: crumb(lang, [u.nav.mfg]), title: ar ? "داخل\nالمصنع." : "Inside\nthe plant.",
    lede: ar ? "خمس مراحل إنتاج، من استقبال الأسماك الكاملة إلى التعبئة." : "Five production stages, from receiving whole fish to packing.",
    actions: `<a class="btn primary" href="#stages">${ar ? "تابع المراحل" : "Follow the stages"} ${arr}</a><a class="btn line" href="${href(lang, "products")}">${u.nav.products}</a>` })}
<section class="sec mf" id="stages" data-env="${ENV.paper}" aria-label="${ar ? "مراحل الإنتاج" : "Production stages"}">
  <div class="wrap mf-grid">
    <div class="mf-media" aria-hidden="true">${STAGES.map((st, i) => `<div class="mf-fig${i ? "" : " on"}" data-i="${i}">${pic(lang, st.img, { col: 50, mcol: 100, box: 0.8, cap: false })}${st.inset ? `<div class="mf-inset">${pic(lang, st.inset, { col: 15, mcol: 30, box: 1, cap: false })}</div>` : ""}</div>`).join("")}<span class="mf-num"><b>01</b> / 05</span><div class="mf-prog">${STAGES.map((st, i) => `<i class="${i ? "" : "on"}"></i>`).join("")}</div></div>
    <ol class="mf-list">${STAGES.map((st, i) => `<li class="mf-st${i ? "" : " on"}" data-i="${i}"><div class="mf-m">${pic(lang, st.img, { col: 100, mcol: 100, box: 1.5, cap: false })}</div><span class="mf-no">0${i + 1} / 05</span><h2 class="mf-t">${st.t[lang]}</h2><p class="mf-d">${st.d[lang]}</p><div class="mf-sub">${st.steps.map((k) => `<span>${STEPS[k].t[lang]}</span>`).join("")}</div><div class="mf-tags">${tag(st.stream)}</div></li>`).join("")}</ol>
  </div>
</section>
<section class="sec" data-env="${ENV.dawn}"><div class="wrap"><div class="head"><div>${kicker(ar ? "المساران" : "Two streams")}${h2(ar ? "مُدخل واحد.\nمساران للإنتاج." : "One input.\nTwo output streams.")}</div><p class="lede" data-r="up">${ar ? "يفصل العصر كعكة العصر عن سائله: تتحول الكعكة إلى مسحوق سمك، ويُستخلص زيت السمك الخام من السائل." : "Pressing separates press cake from press liquor: the first becomes fish meal, and crude fish oil is recovered from the second."}</p></div>${streamsSVG(lang)}</div></section>
${ctaBand(lang)}`;
  return layout(lang, { key: "mfg", over: true, title: ar ? "التصنيع | الخليج لصناعة الأسماك" : "Manufacturing | Alkhaleej Fish Manufacturing", desc: ar ? "خمس مراحل إنتاج، من استقبال الأسماك الكاملة إلى التعبئة." : "Five production stages, from receiving whole fish to packing.", body, preloadImg: preload("m-receiving", { fill: 1, mfill: 0.5 }) });
};
