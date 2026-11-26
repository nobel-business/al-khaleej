import { UI, PRODUCTS } from "../content/content.mjs";
import { arr } from "../lib/html.mjs";
import { href, prodHref } from "../lib/routes.mjs";
import { pic, preload } from "../lib/media.mjs";
import { layout } from "../layouts/layout.mjs";
import { kicker, h2, crumb, ENV, ctaBand, opBleed } from "../components/blocks.mjs";
import { stPill, board } from "../components/spec.mjs";

export const raw = (lang) => {
  const u = UI[lang], ar = lang === "ar";
  const facts = ar
    ? [["كاملة", "أسماك بحرية تُستخدم كاملة"], ["السردين", "وأنواع بحرية أخرى مناسبة"], ["3", "مصادر: مراكب الشركة والموانئ ومخازن التبريد"], ["1", "نقطة دخول: حوض الاستقبال في المصنع"]]
    : [["Whole", "Marine fish, used whole"], ["Sardines", "and other suitable marine species"], ["3", "Routes: own vessels, ports, cold storage"], ["1", "Point of entry: the plant’s receiving pit"]];
  const profiles = [
    { id: "vessels", img: "trawler", t: ar ? "مراكب الشركة" : "Company vessels", lead: ar ? "رحلات صيد تقوم بها مراكب الشركة." : "Fishing trips by the company’s own vessels.",
      d: ar ? "تشمل الإمدادات رحلات صيد تقوم بها مراكب الشركة في البحر المتوسط وأعالي البحار ومناطق صيد بحرية أخرى." : "Supply includes fishing trips by the company’s own vessels in the Mediterranean Sea, the high seas and other marine fishing grounds.",
      rows: [[ar ? "مناطق الصيد" : "Fishing grounds", ar ? "البحر المتوسط · أعالي البحار · مناطق أخرى" : "Mediterranean · high seas · other grounds", "stated"], [ar ? "تفاصيل الأسطول" : "Fleet details", "", "pending"]] },
    { id: "ports", img: "crates", t: ar ? "الموانئ ومخازن التبريد" : "Ports & cold storage", lead: ar ? "إمدادات مكمّلة من الموانئ ومخازن التبريد." : "Complementary supply from the quay and from refrigeration.",
      d: ar ? "تصل أسماك أيضًا من الموانئ ومخازن التبريد لتكمل الإمدادات، ثم تُنقل إلى حوض الاستقبال في المصنع." : "Fish also arrive from ports and refrigerated storage facilities to complete the supply, then move to the factory’s receiving pit.",
      rows: [[ar ? "المصادر" : "Sources", ar ? "الموانئ · مخازن التبريد" : "Ports · cold storage", "stated"], [ar ? "قائمة الموانئ" : "List of ports", "", "pending"]] },
    { id: "fish", img: "sardine-spiral", t: ar ? "المادة الخام" : "The raw material", lead: ar ? "أسماك بحرية كاملة، منها السردين." : "Whole marine fish, including sardines.",
      d: ar ? "نعتمد على أسماك بحرية كاملة، منها السردين وأنواع أخرى مناسبة. تُنشر قائمة الأنواع ومناطق الصيد عند التحقق منها." : "We use whole marine fish, including sardines and other suitable species. The species list and catch areas will be published once verified.",
      rows: [[ar ? "الشكل" : "Form", ar ? "أسماك كاملة" : "Whole fish", "stated"], [ar ? "الأنواع" : "Species", ar ? "السردين وأنواع بحرية أخرى مناسبة" : "Sardines and other suitable marine species", "stated"], [ar ? "قائمة الأنواع ومناطق الصيد" : "Species list & catch areas", "", "pending"]] },
  ];
  const route = ar
    ? [["مناطق الصيد", "البحر المتوسط وأعالي البحار"], ["الموانئ ومخازن التبريد", "مصادر إمداد مكمّلة"], ["النقل إلى المصنع", "من الميناء أو مخازن التبريد"], ["حوض الاستقبال", "حيث يبدأ التصنيع"], ["مساران للإنتاج", "مسحوق السمك · زيت السمك الخام"]]
    : [["Fishing grounds", "Mediterranean and the high seas"], ["Ports & cold storage", "Complementary supply"], ["Transfer to the plant", "From port or cold storage"], ["Receiving pit", "Where manufacturing begins"], ["Two streams", "Fish meal · crude fish oil"]];
  const body = `${opBleed(lang, { img: "sunrise-sea", env: ENV.mist, crumbs: crumb(lang, [u.nav.raw]), kick: u.nav.raw, title: ar ? "تبدأ القيمة\nمن البحر." : "Value begins\nat sea.",
    lede: ar ? "أسماك بحرية كاملة، منها السردين، تصل من مراكب الشركة ومن الموانئ ومخازن التبريد إلى حوض الاستقبال في المصنع." : "Whole marine fish, including sardines — from the company’s own vessels, ports and cold storage, to the plant’s receiving pit.",
    actions: `<a class="btn primary" href="#sources">${ar ? "تعرّف على المصادر" : "Explore the sources"} ${arr}</a><a class="btn line" href="${href(lang, "mfg")}">${u.nav.mfg}</a>` })}

<section class="sec rm-intro" data-env="${ENV.mist}">
  <div class="wrap">
    <div class="rm-lead">${kicker(ar ? "المادة الخام في لمحة" : "Raw material at a glance")}<p class="statement" data-r="up">${ar ? "جودة <b>مسحوق السمك</b> و<b>زيت السمك الخام</b> تبدأ قبل المصنع — بالأسماك نفسها، ومن أين تأتي، وكيف تصل." : "The quality of <b>fish meal</b> and <b>crude fish oil</b> begins before the plant — with the fish itself, where it comes from, and how it arrives."}</p></div>
    <dl class="rm-facts">${facts.map(([n, t], i) => `<div data-r="up" style="transition-delay:${i * 80}ms"><dt>${n}</dt><dd>${t}</dd></div>`).join("")}</dl>
  </div>
</section>

<section class="sec rm-sources" id="sources" data-env="${ENV.dawn}">
  <div class="wrap">
    <div class="sec-head">${kicker(ar ? "المصادر" : "Sources")}${h2(ar ? "ثلاثة مصادر،\nمادة خام واحدة." : "Three sources,\none raw material.")}</div>
    <div class="profiles" data-profiles>
      <div class="pf-tabs" role="tablist" aria-label="${ar ? "مصادر المادة الخام" : "Raw material sources"}">${profiles.map((p, i) => `<button type="button" role="tab" id="pf-t-${p.id}" aria-controls="pf-p-${p.id}" aria-selected="${i ? "false" : "true"}" tabindex="${i ? "-1" : "0"}"><span class="n">0${i + 1}</span><span class="tt"><b>${p.t}</b><small>${p.lead}</small></span><i class="bar" aria-hidden="true"></i></button>`).join("")}</div>
      <div class="pf-stage">${profiles.map((p, i) => `<div class="pf-img${i ? "" : " on"}" data-i="${i}">${pic(lang, p.img, { col: 58, mcol: 100, box: 4 / 3, eager: false })}</div>`).join("")}</div>
      <div class="pf-panels">${profiles.map((p, i) => `<div class="pf-panel${i ? "" : " on"}" role="tabpanel" id="pf-p-${p.id}" aria-labelledby="pf-t-${p.id}"${i ? " hidden" : ""}><p class="body">${p.d}</p><div class="pf-rows">${p.rows.map(([k, v, s]) => `<div class="pf-row"><span class="sk">${k}</span><span class="sv">${v || "—"}</span>${stPill(lang, s)}</div>`).join("")}</div></div>`).join("")}</div>
    </div>
  </div>
</section>

<section class="sec rm-journey" data-env="${ENV.steel}">
  <div class="wrap">
    <div class="jr-head">${h2(ar ? "من البحر\nإلى حوض الاستقبال." : "From the sea\nto the receiving pit.")}<p class="lede" data-r="up">${ar ? "خمس محطات بين الصيد وبداية التصنيع." : "Five stops between the catch and the start of manufacturing."}</p></div>
    <div class="jr-track" aria-hidden="true"><i></i></div>
    <ol class="journey" data-journey>${route.map(([t, d], i) => `<li class="jr" data-r="up" style="transition-delay:${i * 90}ms">${pic(lang, ["trawler", "unloading", "crates", "m-receiving", "m-press"][i], { col: 20, mcol: 70, box: 3 / 4 })}<div class="jr-t"><span class="n">0${i + 1}</span><b>${t}</b><small>${d}</small></div></li>`).join("")}</ol>
  </div>
</section>

<section class="sec rm-two" data-env="${ENV.dawn}">
  <div class="wrap comp comp-75">
    ${pic(lang, "m-press", { col: 52, mcol: 100, box: 4 / 3, reveal: "curtain" })}
    <div class="comp-copy">${kicker(ar ? "إلى المكونات" : "Into ingredients")}${h2(ar ? "مادة خام واحدة،\nمنتجان." : "One raw material,\ntwo ingredients.")}
      <p class="body" data-r="up">${ar ? "بعد الطبخ بالبخار غير المباشر والعصر، تنقسم كل دفعة إلى مسارين: تتحول كعكة العصر إلى مسحوق سمك، ويُستخلص زيت السمك الخام من سائل العصر." : "After indirect steam cooking and pressing, every batch divides into two streams: the press cake becomes fish meal, and crude fish oil is recovered from the press liquor."}</p>
      <div class="two-links" data-r="up"><a href="${prodHref(lang, PRODUCTS[1])}"><span class="cn" dir="ltr">60–72<small>%</small></span><b>${u.fishmeal}</b><span class="go">${arr}</span></a><a href="${prodHref(lang, PRODUCTS[3])}"><span class="cn">${ar ? "زيت" : "Oil"}</span><b>${u.oil}</b><span class="go">${arr}</span></a></div>
      <p style="margin-top:22px"><a class="link" href="${href(lang, "mfg")}">${ar ? "شاهد مراحل الإنتاج الخمس" : "See the five production stages"} ${arr}</a></p></div>
  </div>
</section>

<section class="sec rm-close" data-env="${ENV.paper}">
  <div class="wrap comp comp-55">
    <div>${kicker(u.nav.quality)}<blockquote class="quote" data-r="up">${ar ? "جودة المادة الخام هي أساس جودة مسحوق السمك وزيت السمك." : "The quality of the raw material is the foundation of fish meal and fish oil quality."}</blockquote><p style="margin-top:26px"><a class="link" href="${href(lang, "quality")}">${u.nav.quality} ${arr}</a></p></div>
    <div>${board(lang, ar ? [["قائمة الأنواع"], ["مناطق الصيد"], ["تفاصيل الأسطول"], ["قائمة الموانئ ومخازن التبريد"]] : [["Species list"], ["Catch areas"], ["Fleet details"], ["Ports and cold-storage list"]], { title: ar ? "تُنشر عند التحقق" : "Published once verified" })}</div>
  </div>
</section>
${ctaBand(lang)}`;
  return layout(lang, { key: "raw", over: true, title: ar ? "المواد الخام | الخليج لصناعة الأسماك" : "Raw materials | Alkhaleej Fish Manufacturing", desc: ar ? "أسماك بحرية كاملة منها السردين، من مراكب الشركة والموانئ ومخازن التبريد." : "Whole marine fish including sardines, from own vessels, ports and cold storage.", body, preloadImg: preload("sunrise-sea", { fill: 1, mfill: 0.62 }) });
};
