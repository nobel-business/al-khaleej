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
   the three fish of the official symbol) · values · industrial philosophy (the chain from source to product) ·
   foundations (four pillars, each a door into the site) · the horizon (looking ahead) · invitation.
   ===================================================================================================== */

const C = {
  ar: {
    hero: { eye: "من نحن", h: "من ثروة البحر، نبني قيمة صناعية.", p: "ننطلق من ثراء الموارد البحرية وتنوعها، لنعمل على تحويلها إلى منتجات ذات قيمة تغذوية وصناعية، من خلال منظومة تجمع بين المعرفة بالخامات البحرية، والتخصص في التصنيع، والاهتمام بجودة المنتج النهائي.", cue: "مرّر للأسفل" },
    who: { eye: "عن الخليج", h: "هوية مصرية، وتخصص صناعي.", p: [
      "تأسس الخليج لصناعة الأسماك عام 2025 في محافظة كفر الشيخ بجمهورية مصر العربية، كمصنع متخصص في إنتاج مسحوق الأسماك والزيوت البحرية، مستندًا إلى ما تتمتع به المنطقة من موارد بحرية متنوعة وموقع يرتبط بقطاع الصيد والصناعات السمكية.",
      "نعتمد في إنتاجنا على الأسماك البحرية الكاملة، من خلال منظومة صناعية تبدأ من اختيار الخامات واستقبالها، مرورًا بمراحل المعالجة والتصنيع والفصل والتجفيف، وصولًا إلى المنتجات النهائية بمواصفاتها المختلفة.",
      "ويتمثل توجهنا في تقديم مكونات بحرية ذات قيمة تغذوية وصناعية، تخدم صناعة الأعلاف والتغذية والصناعات المتخصصة، وتلبي احتياجات العملاء في الأسواق المحلية والدولية."],
      facts: [["عام التأسيس", "2025"], ["الموقع", "كفر الشيخ، جمهورية مصر العربية"], ["القطاع", "الصناعات البحرية"], ["التخصص", "إنتاج البروتين والزيوت البحرية"], ["المنتجات", "مسحوق الأسماك وزيت الأسماك الخام"], ["الأسواق المستهدفة", "المحلية والإقليمية والدولية"]] },
    story: { eye: "البداية والتوجه", h: "حين تتحول الموارد الطبيعية إلى فرص صناعية.", p: [
      "تنبع فكرة الخليج لصناعة الأسماك من الإيمان بالقيمة الاقتصادية والتغذوية للموارد البحرية، وما تحمله من إمكانات لتطوير صناعات متخصصة ترتبط بقطاعات الغذاء والأعلاف والتغذية.",
      "ومن هذا المنطلق، تأسس المصنع ليكون حلقة وصل بين الموارد البحرية الطبيعية واحتياجات الصناعات الحديثة، من خلال تحويل الأسماك البحرية إلى منتجات قابلة للاستخدام الصناعي بمواصفات تغذوية وتجارية متنوعة.",
      "ولا يقتصر طموحنا على الإنتاج فحسب، بل يمتد إلى تطوير المعرفة الصناعية، وتحسين العمليات، وتنويع المنتجات، وبناء علاقات تجارية قائمة على الفهم المتبادل لاحتياجات الأسواق والعملاء."],
      tags: ["الموارد البحرية", "التحويل الصناعي", "الأسواق والعملاء"] },
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
    phil: { eye: "فلسفة التصنيع", h: "القيمة تبدأ من المصدر.", p: [
      "نؤمن بأن القيمة الحقيقية للمنتج تبدأ من طبيعة مواده الخام، وأن التصنيع ليس مجرد عملية تحويل، بل هو منظومة متكاملة تهدف إلى الاستفادة من الخصائص الطبيعية والتغذوية للموارد البحرية.",
      "وتقوم فلسفتنا الصناعية على فهم خصائص الأسماك البحرية، والتعامل مع تنوعها الطبيعي، والتحكم في مراحل المعالجة والتصنيع، بما يتيح إنتاج مسحوق الأسماك والزيوت البحرية بمواصفات مختلفة تتناسب مع متطلبات الاستخدام.",
      "وننظر إلى كل مرحلة من مراحل الإنتاج باعتبارها جزءًا من سلسلة مترابطة، تؤثر في خصائص المنتج وقيمته التغذوية والاقتصادية."],
      chain: ["الموارد البحرية", "اختيار الخامات", "التصنيع المتخصص", "مراقبة الجودة", "المنتج النهائي"], cta: "اكتشف عمليات التصنيع" },
    pil: { eye: "منظومة أعمالنا", h: "ركائز مترابطة، تصنع القيمة.", p: "تقوم أعمال الخليج على أربع ركائز رئيسية، تمثل الأساس الذي ننطلق منه في تطوير قدراتنا الصناعية ومنتجاتنا وعلاقاتنا التجارية.", items: [
      ["الموارد البحرية", "الاستفادة من تنوع الأسماك البحرية الكاملة ومصادرها المختلفة، باعتبارها الأساس الطبيعي لمنتجاتنا.", "اكتشف موادنا الخام", "raw"],
      ["التصنيع المتخصص", "توظيف عمليات المعالجة الحرارية والفصل والتجفيف لاستخلاص البروتين والزيوت البحرية والاستفادة من خصائصها التغذوية.", "اكتشف عمليات التصنيع", "mfg"],
      ["الجودة والمعرفة", "الاهتمام بفهم الخصائص الكيميائية والتغذوية للمنتجات، ومتابعة المؤشرات التي تحدد مواصفاتها وقيمتها الصناعية.", "اكتشف معايير الجودة", "quality"],
      ["الأسواق والشراكات", "تطوير العلاقات التجارية مع مصانع الأعلاف والمستوردين والموزعين، وفهم احتياجات الأسواق المختلفة ومتطلباتها.", "اكتشف أسواقنا الدولية", "intl"]] },
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
      facts: [["Established", "2025"], ["Location", "Kafr El-Sheikh, Arab Republic of Egypt"], ["Sector", "Marine industries"], ["Specialism", "Marine protein and oils"], ["Products", "Fish meal and crude fish oil"], ["Target markets", "Local, regional and international"]] },
    story: { eye: "Origins and direction", h: "When natural resources become industrial opportunities.", p: [
      "The idea behind Alkhaleej Fish Manufacturing comes from a belief in the economic and nutritional value of marine resources, and in their potential to develop specialised industries linked to the food, feed and nutrition sectors.",
      "With that in mind, the plant was established as a link between natural marine resources and the needs of modern industry, turning marine fish into industrially usable products in a range of nutritional and commercial specifications.",
      "Our ambition goes beyond production: to developing industrial knowledge, improving processes, diversifying products and building trade relationships founded on a shared understanding of market and customer needs."],
      tags: ["Marine resources", "Industrial transformation", "Markets and customers"] },
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
    phil: { eye: "Manufacturing philosophy", h: "Value begins at the source.", p: [
      "We believe a product’s real value begins with the nature of its raw material, and that manufacturing is not simply a conversion but an integrated system that makes the most of the natural and nutritional properties of marine resources.",
      "Our industrial philosophy rests on understanding the properties of marine fish, working with their natural diversity and controlling the processing and manufacturing stages, so that fish meal and marine oils can be produced in different specifications to suit each use.",
      "We see every stage of production as part of one connected chain, shaping the product’s properties and its nutritional and economic value."],
      chain: ["Marine resources", "Raw material selection", "Specialised manufacturing", "Quality control", "Final product"], cta: "Discover our manufacturing" },
    pil: { eye: "Our business system", h: "Connected foundations that create value.", p: "Alkhaleej’s business rests on four main foundations, the base from which we develop our industrial capabilities, our products and our trade relationships.", items: [
      ["Marine resources", "Drawing on the diversity of whole marine fish and their different sources, the natural basis of our products.", "Discover our raw materials", "raw"],
      ["Specialised manufacturing", "Using thermal processing, separation and drying to extract marine protein and oils and make the most of their nutritional properties.", "Discover our manufacturing", "mfg"],
      ["Quality and knowledge", "Understanding the chemical and nutritional properties of our products and following the indicators that define their specifications and industrial value.", "Discover our quality standards", "quality"],
      ["Markets and partnerships", "Developing trade relationships with feed manufacturers, importers and distributors, and understanding the needs and requirements of different markets.", "Discover our international markets", "intl"]] },
    fut: { eye: "Looking ahead", h: "We build today, and look further ahead.", p: [
      "We look to develop our industrial capabilities and broaden our product range, keeping pace with the feed and nutrition industries and with demand for marine protein and oils.",
      "We aim to strengthen the presence of Egyptian industry in international markets through industrial specialisation, technical knowledge, better processes and lasting trade relationships.",
      "Our view of the future is not about growth in volume alone, but about developing the value we offer, the capabilities we build and the relationships we establish for the long term."] },
    cta: { h: "Marine value has wider horizons.", p: "Explore our marine protein and oil products, and discover the specifications and options that suit your business.", a: "Explore our products", b: "Contact us" },
    meta: { title: "About | Alkhaleej Fish Manufacturing", desc: "Alkhaleej Fish Manufacturing: from the sea’s wealth, we build industrial value. An Egyptian plant established in 2025 in Kafr El-Sheikh, producing marine protein and oils from whole marine fish." },
  },
};

/* line icons for the six values — drawn on reveal (stroke) */
const VICON = [
  '<path d="M12 3l7 3v5.2c0 4.4-3 8.3-7 9.8-4-1.5-7-5.4-7-9.8V6z"/><path d="M8.6 12.2l2.4 2.4 4.6-4.8"/>',                                        // quality — seal
  '<path d="M5 19c7.5 0 14-5.6 14-14C11 5 5 10.2 5 19z"/><path d="M5 19c2.2-4.8 5.4-8.2 9.4-10.4"/>',                                          // responsibility — leaf
  '<circle cx="12" cy="12" r="8.5"/><path d="M8.4 12.3l2.5 2.5 4.8-5"/>',                                                                      // reliability — confirmed
  '<path d="M4.5 13.5a7.6 7.6 0 0 1 13-5.4L19.5 10"/><path d="M19.5 5v5h-5"/><path d="M19.5 10.5a7.6 7.6 0 0 1-13 5.4L4.5 14"/><path d="M4.5 19v-5h5"/>', // continuous development — cycle
  '<path d="M4 16a8 8 0 1 1 16 0"/><path d="M12 16l4-5"/><circle cx="12" cy="16" r="1.4"/>',                                                    // efficiency — gauge
  '<rect x="3.5" y="8.5" width="10" height="7" rx="3.5"/><rect x="10.5" y="8.5" width="10" height="7" rx="3.5"/>',                              // partnership — linked
];

export const about = (lang) => {
  const u = UI[lang], ar = lang === "ar", c = C[lang];
  const eye = (t) => `<p class="ab-eye" data-r="up">${t}</p>`;
  const H2 = (t, cls = "") => `<h2 class="ab-h2${cls ? " " + cls : ""}" data-lines>${lines(t)}</h2>`;
  const arrow = `<i class="ic ic-arr" aria-hidden="true"></i>`;

  const body = `
<section class="ab-hero" data-env="#F7F2EA" aria-labelledby="ab-h1">
  <div class="ab-hero-stage">
    <div class="ab-layer ab-sea">${pic(lang, "sunrise-sea", { fill: 1, mfill: 1, eager: true, priority: true })}</div>
    <div class="ab-layer ab-ind" aria-hidden="true">${pic(lang, "steam", { fill: 1, mfill: 1 })}</div>
    <span class="ab-tide" aria-hidden="true"></span>
    <div class="ab-scrim" aria-hidden="true"></div>
    <div class="wrap ab-hero-copy">
      <nav class="crumbs ab-crumbs" aria-label="${ar ? "مسار التنقل" : "Breadcrumb"}">${crumb(lang, [u.nav.about])}</nav>
      <p class="ab-hero-eye">${c.hero.eye}</p>
      <h1 class="ab-h1" id="ab-h1">${c.hero.h.split(/(?<=،|,) /).map((l, i) => `<span class="ab-l" style="--d:${i}"><span>${l}</span></span>`).join(" ")}</h1>
      <p class="ab-hero-p">${c.hero.p}</p>
    </div>
    <span class="ab-cue" aria-hidden="true"><i></i>${c.hero.cue}</span>
  </div>
</section>

<section class="ab-who" data-env="#FBF8F3" aria-labelledby="ab-who-h">
  <div class="wrap ab-who-grid">
    <div class="ab-who-copy">${eye(c.who.eye)}<h2 class="ab-h2" id="ab-who-h" data-lines>${lines(c.who.h)}</h2>
      <div class="ab-prose" data-r="up">${c.who.p.map((t) => `<p>${t}</p>`).join("")}</div></div>
    <div class="ab-who-media">${pic(lang, "powder-hall", { col: 46, mcol: 100, box: 0.82, reveal: "curtain" })}</div>
  </div>
  <div class="wrap"><dl class="ab-facts">${c.who.facts.map(([k, v], i) => `<div class="ab-fact" data-r="up" style="transition-delay:${i * 80}ms"><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl></div>
</section>

<section class="ab-story" data-env="#F7F2EA" aria-labelledby="ab-story-h">
  <div class="wrap ab-story-grid">
    <div class="ab-story-media" aria-hidden="true">
      <div class="ab-frames">${["sardine-spiral", "m-separation", "sacks"].map((n, i) => `<div class="ab-frame" data-i="${i}">${pic(lang, n, { col: 46, mcol: 100, box: 0.9 })}</div>`).join("")}</div>
      <ol class="ab-rail">${c.story.tags.map((t, i) => `<li data-i="${i}"><span>0${i + 1}</span>${t}</li>`).join("")}</ol>
    </div>
    <div class="ab-story-text">${eye(c.story.eye)}<h2 class="ab-h2" id="ab-story-h" data-lines>${lines(c.story.h)}</h2>
      ${c.story.p.map((t, i) => `<p class="ab-chap" data-i="${i}">${t}</p>`).join("")}</div>
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

<section class="ab-values" data-env="#F7F2EA" aria-labelledby="ab-val-h">
  <div class="wrap">
    <div class="ab-head">${eye(c.values.eye)}<h2 class="ab-h2" id="ab-val-h" data-lines>${lines(c.values.h)}</h2></div>
    <ul class="ab-val-grid">${c.values.items.map(([t, d], i) => `<li class="ab-val" data-r="up" style="transition-delay:${(i % 3) * 110 + Math.floor(i / 3) * 60}ms"><div class="ab-val-top"><span class="ab-num">0${i + 1}</span><svg class="ab-vic" viewBox="0 0 24 24" aria-hidden="true">${VICON[i]}</svg></div><h3>${t}</h3><p>${d}</p></li>`).join("")}</ul>
  </div>
</section>

<section class="ab-phil" data-env="#FBF8F3" aria-labelledby="ab-phil-h">
  <div class="wrap ab-head">${eye(c.phil.eye)}<h2 class="ab-h2 ab-h2-xl" id="ab-phil-h" data-lines>${lines(c.phil.h)}</h2></div>
  <div class="ab-phil-band">${pic(lang, "aerial", { fill: 0.62, mfill: 0.42 })}</div>
  <div class="wrap ab-phil-body">
    <p class="ab-lead" data-r="up">${c.phil.p[0]}</p>
    <div class="ab-prose ab-cols" data-r="up">${c.phil.p.slice(1).map((t) => `<p>${t}</p>`).join("")}</div>
  </div>
  <div class="wrap">
    <ol class="ab-chain" aria-label="${ar ? "التسلسل من المصدر إلى المنتج" : "From source to product"}">${c.phil.chain.map((t, i) => `<li data-i="${i}"><span class="ab-node"><i>0${i + 1}</i></span><b>${t}</b></li>`).join("")}</ol>
    <p class="ab-chain-cta" data-r="up"><a class="link" href="${href(lang, "mfg")}"><span>${c.phil.cta}</span> ${arrow}</a></p>
  </div>
</section>

<section class="ab-pil" data-env="#F7F2EA" aria-labelledby="ab-pil-h">
  <div class="wrap ab-head ab-head-split">${eye(c.pil.eye)}<h2 class="ab-h2" id="ab-pil-h" data-lines>${lines(c.pil.h)}</h2><p class="ab-intro" data-r="up">${c.pil.p}</p></div>
  <div class="wrap"><div class="ab-pil-row">${c.pil.items.map(([t, d, l, k], i) => `<article class="ab-pil-item${i === 0 ? " on" : ""}" data-i="${i}" data-r="up" style="transition-delay:${i * 90}ms">
      ${pic(lang, ["crates", "m-cooker", "lab-qc", "l-loading"][i], { col: 40, mcol: 100, box: 0.8 })}
      <div class="ab-pil-in"><span class="ab-num">0${i + 1}</span><h3>${t}</h3><div class="ab-pil-more"><p>${d}</p><a class="ab-pil-link" href="${href(lang, k)}"><span>${l}</span> ${arrow}</a></div></div>
    </article>`).join("")}</div></div>
</section>

<section class="ab-fut" data-env="#F7F2EA" aria-labelledby="ab-fut-h">
  <div class="ab-fut-media">${pic(lang, "boats-dusk", { fill: 0.86, mfill: 0.6 })}
    <div class="wrap ab-fut-title">${`<p class="ab-eye ab-eye-light">${c.fut.eye}</p>`}<h2 class="ab-h2 ab-h2-light" id="ab-fut-h" data-lines>${lines(c.fut.h)}</h2></div>
  </div>
  <div class="wrap ab-fut-text">
    <p data-r="up">${c.fut.p[0]}</p><p data-r="up">${c.fut.p[1]}</p>
    <blockquote class="ab-quote" data-r="up"><p>${c.fut.p[2]}</p></blockquote>
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

  return layout(lang, { key: "about", over: true, title: c.meta.title, desc: c.meta.desc, body, preloadImg: preload("sunrise-sea", { fill: 1, mfill: 1 }) });
};
