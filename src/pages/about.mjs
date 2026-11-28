import { UI } from "../content/content.mjs";
import { pic, preload } from "../lib/media.mjs";
import { layout } from "../layouts/layout.mjs";
import { arr, lines } from "../lib/html.mjs";
import { href } from "../lib/routes.mjs";
import { crumb } from "../components/blocks.mjs";
import { orbit } from "../components/orbit.mjs";

/* =====================================================================================================
   About — «من ثروة البحر، نبني قيمة صناعية.»
   Source of truth: the client's approved About content (Arabic, Nov 2026). Arabic text is used verbatim.
   English is our translation of that content, pending client approval.
   Narrative: sea → industry (hero) · identity (who) · origin (story) · direction (vision, mission, ambition —
   the three fish of the official symbol) · values · the horizon (looking ahead) · invitation.
   ===================================================================================================== */

const C = {
  ar: {
    hero: { eye: "من نحن", h: "من ثروة البحر، نبني قيمة صناعية.", p: "ننطلق من ثراء الموارد البحرية وتنوعها، لنعمل على تحويلها إلى منتجات ذات قيمة تغذوية وصناعية، من خلال منظومة تجمع بين المعرفة بالخامات البحرية، والتخصص في التصنيع، والاهتمام بجودة المنتج النهائي.", cue: "مرّر للأسفل" },
    who: { eye: "عن الخليج", h: "هوية مصرية، وتخصص صناعي.", p: [
      "تأسس الخليج لصناعة الأسماك عام 2025 في محافظة كفر الشيخ بجمهورية مصر العربية، كمصنع متخصص في إنتاج مسحوق الأسماك والزيوت البحرية، مستندًا إلى ما تتمتع به المنطقة من موارد بحرية متنوعة وموقع يرتبط بقطاع الصيد والصناعات السمكية.",
      "نعتمد في إنتاجنا على الأسماك البحرية الكاملة، من خلال منظومة صناعية تبدأ من اختيار الخامات واستقبالها، مرورًا بمراحل المعالجة والتصنيع والفصل والتجفيف، وصولًا إلى المنتجات النهائية بمواصفاتها المختلفة.",
      "ويتمثل توجهنا في تقديم مكونات بحرية ذات قيمة تغذوية وصناعية، تخدم صناعة الأعلاف والتغذية والصناعات المتخصصة، وتلبي احتياجات العملاء في الأسواق المحلية والدولية."],
      factsH: "نبذة مختصرة عنا",
      facts: [["عام التأسيس", "2025"], ["الموقع", "كفر الشيخ، جمهورية مصر العربية"], ["القطاع", "الصناعات البحرية"], ["التخصص", "إنتاج البروتين والزيوت البحرية"], ["المنتجات", "مسحوق الأسماك وزيت الأسماك الخام"], ["الأسواق المستهدفة", "المحلية والإقليمية والدولية"]] },
    vm: { eye: "توجهنا المؤسسي", h: "رؤية للمستقبل، ورسالة تقود أعمالنا.", items: [
      ["رؤيتنا", "أن نرسخ مكانة الخليج كإحدى الشركات الصناعية المصرية الرائدة في مجال البروتين والزيوت البحرية، وأن نطور حضورًا تنافسيًا ومستدامًا في الأسواق الإقليمية والدولية."],
      ["رسالتنا", "تعظيم القيمة التغذوية والاقتصادية للموارد البحرية من خلال التصنيع المتخصص، وتطوير العمليات الصناعية، والاهتمام بجودة المنتجات، وبناء علاقات تجارية تحقق قيمة مشتركة مع عملائنا وشركائنا."],
      ["طموحنا", "بناء كيان صناعي قادر على النمو والتطور، يستفيد من المعرفة والتكنولوجيا والخبرات الصناعية، ويواكب المتغيرات في احتياجات الأسواق وصناعات التغذية العالمية."]] },
    values: { eye: "ما نؤمن به", h: "قيم تنعكس في كل ما نقوم به.", items: [
      ["الجودة", "نتعامل مع الجودة باعتبارها جزءًا من العملية الصناعية، يبدأ من اختيار الخامات ويمتد إلى تقييم خصائص المنتج النهائي."],
      ["المسؤولية", "ندرك مسؤوليتنا تجاه الموارد التي نستخدمها، والمنتجات التي نقدمها، والعلاقات التي نبنيها مع عملائنا وشركائنا."],
      ["الموثوقية", "نسعى إلى بناء الثقة من خلال وضوح المواصفات، وشفافية التعامل، والالتزام بالاتفاقات التجارية."],
      ["التطوير المستمر", "نؤمن بأن التطور الصناعي عملية مستمرة تقوم على المعرفة والتجربة وتحسين الأداء والاستفادة من التقنيات الحديثة."],
      ["الكفاءة", "نعمل على تحسين الاستفادة من الموارد والعمليات الصناعية، بما يعزز القيمة الاقتصادية والتغذوية للمنتجات."],
      ["الشراكة", "ننظر إلى علاقاتنا التجارية باعتبارها شراكات طويلة الأمد، تقوم على المصالح المشتركة وفهم احتياجات العملاء والأسواق."]] },
    fut: { eye: "آفاق المستقبل", h: "نبني اليوم، ونتطلع إلى ما هو أبعد.", p: [
      "نتطلع إلى تطوير قدراتنا الصناعية وتوسيع نطاق منتجاتنا، بما يواكب تطور صناعة الأعلاف والتغذية والطلب على البروتين والزيوت البحرية.",
      "ونسعى إلى تعزيز حضور الصناعة المصرية في الأسواق الدولية، من خلال التخصص الصناعي، وتطوير المعرفة الفنية، وتحسين العمليات، وبناء علاقات تجارية مستدامة.",
      "إن رؤيتنا للمستقبل لا تقوم على النمو في حجم الأعمال وحده، بل على تطوير القيمة التي نقدمها، والقدرات التي نبنيها، والعلاقات التي نؤسسها على المدى الطويل."] },
    cta: { h: "للقيمة البحرية آفاق أوسع.", p: "تعرف على منتجاتنا من البروتين والزيوت البحرية، واكتشف المواصفات والخيارات التي تتناسب مع احتياجات أعمالكم.", a: "استكشف منتجاتنا", b: "تواصل معنا" },
    meta: { title: "من نحن | الخليج لصناعة الأسماك", desc: "الخليج لصناعة الأسماك: من ثروة البحر نبني قيمة صناعية. مصنع مصري تأسس عام 2025 في كفر الشيخ لإنتاج البروتين والزيوت البحرية من الأسماك البحرية الكاملة." },
  },
  en: {
    hero: { eye: "About us", h: "From the sea’s wealth, we build industrial value.", p: "We begin with the richness and diversity of marine resources and turn them into products of nutritional and industrial value, through a system that brings together knowledge of marine raw materials, specialised manufacturing and care for the quality of the final product.", cue: "Scroll" },
    who: { eye: "About Alkhaleej", h: "An Egyptian identity, an industrial specialism.", p: [
      "Alkhaleej Fish Manufacturing was established in 2025 in Kafr El-Sheikh Governorate, Arab Republic of Egypt, as a plant specialised in producing fish meal and marine oils, drawing on the region’s diverse marine resources and its ties to the fishing and fish-processing sector.",
      "We produce from whole marine fish, through an industrial system that begins with selecting and receiving the raw material, continues through processing, manufacturing, separation and drying, and ends with finished products in their different specifications.",
      "Our direction is to supply marine ingredients of nutritional and industrial value, serving the feed, nutrition and specialised industries and meeting the needs of customers in local and international markets."],
      factsH: "About us in brief",
      facts: [["Established", "2025"], ["Location", "Kafr El-Sheikh, Arab Republic of Egypt"], ["Sector", "Marine industries"], ["Specialism", "Marine protein and oils"], ["Products", "Fish meal and crude fish oil"], ["Target markets", "Local, regional and international"]] },
    vm: { eye: "Our direction", h: "A vision for the future, a mission that guides our work.", items: [
      ["Our vision", "To establish Alkhaleej as one of Egypt’s leading industrial companies in marine protein and oils, and to build a competitive, sustainable presence in regional and international markets."],
      ["Our mission", "To maximise the nutritional and economic value of marine resources through specialised manufacturing, developing industrial processes, care for product quality, and trade relationships that create shared value with our customers and partners."],
      ["Our ambition", "To build an industrial enterprise able to grow and evolve, drawing on knowledge, technology and industrial expertise, and keeping pace with changing market needs and the global nutrition industries."]] },
    values: { eye: "What we believe", h: "Values reflected in everything we do.", items: [
      ["Quality", "We treat quality as part of the industrial process, beginning with the choice of raw material and extending to the assessment of the final product’s properties."],
      ["Responsibility", "We recognise our responsibility towards the resources we use, the products we supply and the relationships we build with our customers and partners."],
      ["Reliability", "We build trust through clear specifications, transparent dealings and commitment to trade agreements."],
      ["Continuous development", "We believe industrial progress is continuous, built on knowledge, experience, better performance and the use of modern technology."],
      ["Efficiency", "We work to make better use of resources and industrial processes, strengthening the economic and nutritional value of our products."],
      ["Partnership", "We see our trade relationships as long-term partnerships, founded on shared interests and an understanding of customer and market needs."]] },
    fut: { eye: "Looking ahead", h: "We build today, and look further ahead.", p: [
      "We look to develop our industrial capabilities and broaden our product range, keeping pace with the feed and nutrition industries and with demand for marine protein and oils.",
      "We aim to strengthen the presence of Egyptian industry in international markets through industrial specialisation, technical knowledge, better processes and lasting trade relationships.",
      "Our view of the future is not about growth in volume alone, but about developing the value we offer, the capabilities we build and the relationships we establish for the long term."] },
    cta: { h: "Marine value has wider horizons.", p: "Explore our marine protein and oil products, and discover the specifications and options that suit your business.", a: "Explore our products", b: "Contact us" },
    meta: { title: "About | Alkhaleej Fish Manufacturing", desc: "Alkhaleej Fish Manufacturing: from the sea’s wealth, we build industrial value. An Egyptian plant established in 2025 in Kafr El-Sheikh, producing marine protein and oils from whole marine fish." },
  },
};

export const about = (lang) => {
  const u = UI[lang], ar = lang === "ar", c = C[lang];
  const eye = (t) => `<p class="ab-eye" data-r="up">${t}</p>`;
  const H2 = (t, cls = "") => `<h2 class="ab-h2${cls ? " " + cls : ""}" data-lines>${lines(t)}</h2>`;
  const arrow = `<i class="ic ic-arr" aria-hidden="true"></i>`;

  const body = `
<section class="ab-hero" data-env="#F7F2EA" aria-labelledby="ab-h1">
  <div class="ab-hero-stage">
    <div class="ab-layer ab-sea">${pic(lang, "ab-sea", { fill: 1, mfill: 1, eager: true, priority: true })}</div>
    <div class="ab-scrim" aria-hidden="true"></div>
    <div class="wrap ab-hero-copy">
      <div class="ab-card">
        <nav class="crumbs ab-crumbs" aria-label="${ar ? "مسار التنقل" : "Breadcrumb"}">${crumb(lang, [u.nav.about])}</nav>
        <p class="ab-hero-eye">${c.hero.eye}</p>
        <h1 class="ab-h1" id="ab-h1">${c.hero.h.split(/(?<=،|,) /).map((l, i) => `<span class="ab-l" style="--d:${i}"><span>${l}</span></span>`).join(" ")}</h1>
        <p class="ab-hero-p">${c.hero.p}</p>
      </div>
    </div>
    <span class="ab-cue" aria-hidden="true"><i></i>${c.hero.cue}</span>
  </div>
</section>

<section class="ab-who" data-env="#FBF8F3" aria-labelledby="ab-who-h">
  <div class="wrap ab-who-grid">
    <div class="ab-who-copy">${eye(c.who.eye)}<h2 class="ab-h2" id="ab-who-h" data-lines>${lines(c.who.h)}</h2>
      <div class="ab-prose" data-r="up">${c.who.p.map((t) => `<p>${t}</p>`).join("")}</div></div>
    <div class="ab-who-media">${pic(lang, "ab-who", { col: 46, mcol: 100, box: 0.82, reveal: "curtain" })}</div>
  </div>
</section>

<section class="ab-brief" data-env="#F7F2EA" aria-labelledby="ab-brief-h">
  <div class="wrap ab-brief-grid">
    <div class="ab-brief-lead">
      <h2 class="ab-h2 ab-brief-h" id="ab-brief-h" data-lines>${lines(c.who.factsH)}</h2>
      <p class="ab-brief-year" data-r="up"><span>${c.who.facts[0][0]}</span><b>${c.who.facts[0][1]}</b></p>
      <div class="ab-brief-media">${pic(lang, "ab-ind", { col: 42, mcol: 100, box: 1.5, reveal: "curtain" })}</div>
    </div>
    <dl class="ab-brief-list">${c.who.facts.slice(1).map(([k, v], i) => `<div class="ab-brief-row" data-r="up" style="transition-delay:${i * 90}ms"><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
  </div>
</section>

<section class="ab-vm" data-env="#FBF8F3" aria-labelledby="ab-vm-h">
  <div class="wrap">
    <div class="ab-head ab-center">${eye(c.vm.eye)}<h2 class="ab-h2" id="ab-vm-h" data-lines>${lines(c.vm.h)}</h2></div>
    <div class="ab-vm-grid">
      <div class="ab-vm-orbit">${orbit(lang, { labels: c.vm.items.map(([t]) => t) })}</div>
      <div class="ab-vm-list" role="group" aria-label="${c.vm.eye}">${c.vm.items.map(([t, d], i) => `<button type="button" class="meaning ab-vm-item" data-i="${i}" aria-pressed="false" data-r="up" style="transition-delay:${i * 120}ms"><span class="mn">0${i + 1}</span><span class="mt"><b>${t}</b><small>${d}</small></span></button>`).join("")}</div>
    </div>
  </div>
</section>

<section class="ab-values" data-env="#F7F2EA" data-a="0" aria-labelledby="ab-val-h">
  <div class="ab-val-stage">
    <div class="wrap ab-val-wrap">
      <div class="ab-val-head">${eye(c.values.eye)}<h2 class="ab-h2" id="ab-val-h" data-lines>${lines(c.values.h)}</h2></div>
      <div class="ab-val-body">
        <div class="ab-val-index" role="group" aria-label="${c.values.eye}">${c.values.items.map(([t], i) => `<button type="button" data-i="${i}" aria-pressed="${i === 0}">${t}</button>`).join("")}</div>
        <div class="ab-val-show">
          <span class="ab-val-glow" aria-hidden="true"></span>
          ${c.values.items.map(([t, d], i) => `<article class="ab-val-item" data-i="${i}" data-r="up"><span class="ab-val-ghost" aria-hidden="true">${t}</span><h3>${t}</h3><p>${d}</p></article>`).join("")}
          <span class="ab-val-progress" aria-hidden="true"><i></i></span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="ab-fut" data-env="#F7F2EA" data-a="0" aria-labelledby="ab-fut-h">
  <div class="ab-fut-stage">
    <div class="ab-fut-bg" aria-hidden="true">${pic(lang, "ab-horizon", { fill: 1, mfill: 1 })}</div>
    <span class="ab-fut-sun" aria-hidden="true"></span>
    <div class="wrap ab-fut-head"><p class="ab-eye">${c.fut.eye}</p><h2 class="ab-h2 ab-h2-xl ab-fut-title" id="ab-fut-h">${c.fut.h}</h2></div>
    <div class="wrap ab-fut-deck">
      <ol class="ab-fut-rail" aria-hidden="true">${c.fut.p.map((_, i) => `<li data-i="${i}"><i></i><span>0${i + 1}</span></li>`).join("")}</ol>
      <div class="ab-fut-cards">${c.fut.p.map((t, i) => `<article class="ab-fut-card${i === 2 ? " is-quote" : ""}" data-i="${i}"><span class="ab-num">0${i + 1}</span><p>${t}</p></article>`).join("")}</div>
    </div>
  </div>
</section>

<section class="ab-cta" data-env="#FBF8F3" aria-labelledby="ab-cta-h">
  <div class="wrap ab-cta-in">
    <span class="ab-horizon" aria-hidden="true"></span>
    <h2 class="ab-h2 ab-h2-xl" id="ab-cta-h" data-lines>${lines(c.cta.h)}</h2>
    <p class="ab-cta-p" data-r="up">${c.cta.p}</p>
    <div class="ab-cta-acts" data-r="up"><a class="btn primary" href="${href(lang, "products")}">${c.cta.a} ${arrow}</a><a class="btn line" href="${href(lang, "contact")}">${c.cta.b} ${arrow}</a></div>
  </div>
</section>`;

  return layout(lang, { key: "about", over: true, title: c.meta.title, desc: c.meta.desc, body, preloadImg: preload("ab-sea", { fill: 1, mfill: 1 }) });
};
