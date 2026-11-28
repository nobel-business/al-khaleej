import { UI, PRODUCTS } from "../content/content.mjs";
import { pic, preload } from "../lib/media.mjs";
import { layout } from "../layouts/layout.mjs";
import { lines } from "../lib/html.mjs";
import { href, prodHref } from "../lib/routes.mjs";
import { crumb } from "../components/blocks.mjs";

/* =====================================================================================================
   Manufacturing — «دقة التصنيع، أساس الجودة.»
   Source of truth: the client's approved Manufacturing content (Arabic, Nov 2026), used verbatim; three sections only.
   English is our translation, pending client approval. Only the client's own figures appear (90–95 °C, ≈9% moisture,
   protein grades, 50 kg bags, drums). No operating readings, analysis results or unapproved specifications —
   the control-panel gauges are illustrative and carry no numbers. All imagery is AI-generated and labelled illustrative.
   ===================================================================================================== */

const C = {
  ar: {
    meta: { title: "عمليات التصنيع | الخليج لصناعة الأسماك", desc: "تعرف على منظومة تصنيع مسحوق الأسماك واستخلاص الزيوت البحرية لدى الخليج لصناعة الأسماك، ومراحل المعالجة الحرارية والعصر والفصل والتجفيف والرقابة الصناعية." },
    hero: { eye: "التصنيع", h: "دقة التصنيع، أساس الجودة.", cue: "مرّر للأسفل",
      p: "نعتمد في الخليج لصناعة الأسماك على منظومة صناعية متكاملة لتحويل الأسماك البحرية الكاملة إلى منتجات بروتينية وزيتية ذات قيمة تغذوية وصناعية." },
    ov: { eye: "منظومة التصنيع", p: [
      "وتقوم عمليات التصنيع على مجموعة من المراحل الحرارية والميكانيكية المترابطة، تبدأ باستقبال الخامات البحرية، مرورًا بالطبخ بالبخار غير المباشر والعصر والفصل بالطرد المركزي والتجفيف، وصولًا إلى تهيئة المنتجات النهائية وتعبئتها.",
      "ونهتم بالتحكم في المتغيرات التشغيلية المؤثرة في خصائص المنتجات، بما يساعد على المحافظة على القيمة التغذوية للخامات، وتحسين كفاءة الفصل، وتحقيق المواصفات المستهدفة لمسحوق الأسماك والزيوت البحرية."],
      sub: "الركائز الفنية",
      pillars: ["المعالجة الحرارية المدروسة", "الفصل الميكانيكي للمكونات", "استخلاص الزيوت بالطرد المركزي", "التحكم في الرطوبة", "المحافظة على القيمة التغذوية", "استقرار المنتجات النهائية"] },
    flow: { eye: "رحلة التصنيع", h: "من الأسماك البحرية إلى المنتج النهائي.",
      p: "تمر الأسماك البحرية بمجموعة من العمليات الصناعية المتتابعة، يتم خلالها فصل المكونات البروتينية والزيتية والمائية والاستفادة من خصائصها الطبيعية، عبر مسارين إنتاجيين مترابطين لإنتاج مسحوق الأسماك وزيت الأسماك الخام.",
      hint: "اضغط على أي مرحلة لعرض تفاصيلها",
      lanes: { pro: ["المسار البروتيني", "Protein Production Line", "الكتلة الصلبة"], oil: ["المسار الزيتي", "Oil Production Line", "السوائل الناتجة عن العصر"] },
      main: "الخط الرئيسي", both: "المساران",
      nodes: { fish: "الأسماك البحرية الكاملة", s1: "الاستقبال", s2: "النقل والتغذية", s3: "الطبخ بالبخار", s4: "العصر", s6: "التجفيف", s7: "التبريد والتهيئة", s8: "مضادات الأكسدة", s9p: "التعبئة", meal: "مسحوق الأسماك",
        o1: "فصل المكونات الصلبة", o2: "الفصل بالطرد المركزي", o3: "تجميع الزيت", s9o: "التعبئة", oil: "زيت الأسماك الخام" },
      prev: "المرحلة السابقة", next: "المرحلة التالية", of: "من",
      stages: [
        { t: "استقبال المواد الخام", en: "Raw Material Reception", p: ["تبدأ العملية الصناعية باستقبال الأسماك البحرية الكاملة وتفريغها في أحواض الاستقبال المخصصة، مع الاهتمام بحالة الخامات وطزاجتها ومدى ملاءمتها للتصنيع."] },
        { t: "نقل الخامات وتغذية خط الإنتاج", en: "Material Feeding", p: ["تُنقل الأسماك من أحواض الاستقبال إلى وحدات المعالجة الحرارية عبر منظومة نقل صناعية، تتيح تنظيم تدفق الخامات واستمرارية تغذية خط الإنتاج."] },
        { t: "الطبخ بالبخار غير المباشر", en: "Indirect Steam Cooking", p: ["تخضع الأسماك للمعالجة الحرارية باستخدام البخار غير المباشر، من خلال نظام التسخين مزدوج الجدار (Double Jacket)، ضمن نطاق حراري مستهدف يتراوح بين 90 و95 درجة مئوية.", "وتعمل هذه المرحلة على تخثر البروتينات وتحرير جزء من الدهون والمياه الموجودة داخل الأنسجة السمكية، تمهيدًا لعمليات العصر والفصل."],
          facts: [["90–95 °C", "النطاق الحراري المستهدف"], ["Double Jacket", "نظام التسخين مزدوج الجدار"]] },
        { t: "العصر الميكانيكي", en: "Mechanical Pressing", p: ["تنتقل الأسماك المطبوخة إلى وحدات العصر الميكانيكي، حيث يتم فصل جزء كبير من السوائل والزيوت عن المكونات الصلبة.", "وتشكل هذه المرحلة نقطة انقسام خط الإنتاج إلى مسارين رئيسيين:"],
          split: [["pro", "المكون الصلب (Press Cake)", "ينتقل إلى مسار إنتاج مسحوق الأسماك."], ["oil", "المكون السائل (Press Liquor)", "ينتقل إلى مسار استخلاص الزيوت البحرية."]] },
        { t: "استخلاص الزيوت البحرية", en: "Fish Oil Extraction", p: ["تخضع السوائل الناتجة عن العصر لعمليات فصل المكونات الصلبة الدقيقة، ثم الفصل بالطرد المركزي، الذي يعتمد على اختلاف الكثافات بين الزيت والمياه والمكونات الأخرى.", "ويتم تجميع الزيت المستخلص باعتباره زيت أسماك خامًا، يحتوي بصورة طبيعية على الأحماض الدهنية البحرية، وتختلف خصائصه وفق طبيعة الخامات وظروف التصنيع."] },
        { t: "التجفيف", en: "Drying", p: ["تنتقل الكتلة الصلبة الناتجة عن العصر إلى وحدات التجفيف، بهدف خفض محتواها من الرطوبة وتهيئتها للتخزين والتداول.", "ويتم الاهتمام بظروف التجفيف لتحقيق التوازن بين إزالة الرطوبة والمحافظة على الخصائص التغذوية للمنتج، مع استهداف مستوى رطوبة يقارب 9% وفق المواصفات المطلوبة."],
          facts: [["≈ 9%", "مستوى الرطوبة المستهدف"]] },
        { t: "التبريد والتهيئة", en: "Cooling & Conditioning", p: ["يمر مسحوق الأسماك بعد التجفيف بعمليات التبريد والتهوية والتقليب، بهدف خفض درجة حرارته والحد من تراكم الحرارة وتهيئته للمراحل النهائية قبل التعبئة."] },
        { t: "الحماية من الأكسدة", en: "Antioxidant Protection", p: ["تُستخدم مضادات الأكسدة المناسبة للمساعدة على الحد من أكسدة الدهون البحرية والمحافظة على الاستقرار الكيميائي لمسحوق الأسماك خلال التخزين والنقل، وفق مواصفات المنتج ومتطلبات الاستخدام."] },
        { t: "التعبئة والتخزين", en: "Packaging & Storage", p: ["تُعبأ المنتجات النهائية وفق طبيعتها وخصائصها ومتطلبات تداولها."],
          pack: { meal: ["مسحوق الأسماك", "درجات البروتين", "مستويات الدهون", "التعبئة: أكياس بوزن 50 كيلوجرامًا."], oil: ["زيت الأسماك الخام", ["التعبئة في براميل.", "مراعاة ظروف الحفظ والتداول المناسبة للمنتجات الزيتية."]] } },
      ] },
    ctl: { eye: "هندسة الجودة والكفاءة", h: "لكل مرحلة مؤشرات، ولكل عملية قيمة.", p: ["نهتم بمتابعة المتغيرات الفنية خلال مراحل التصنيع وتأثيرها على الخصائص الكيميائية والتغذوية للمنتجات، لتحقيق المواصفات المستهدفة وتعظيم الاستفادة من الخامات البحرية، مع تحسين كفاءة العمليات واستخدام الموارد والطاقة."],
      items: [
        ["حالة المواد الخام", "Raw Material Condition", "متابعة طبيعة الخامات وطزاجتها وملاءمتها للمعالجة الصناعية."],
        ["التحكم الحراري", "Thermal Control", "الاهتمام بدرجات الحرارة خلال مراحل الطبخ والتجفيف والتبريد وتأثيرها على خصائص المنتجات."],
        ["كفاءة الفصل", "Separation Efficiency", "تحسين الاستفادة من المكونات الصلبة والسائلة والزيتية خلال عمليات العصر والفصل."],
        ["التحكم في الرطوبة", "Moisture Control", "متابعة المحتوى الرطوبي لمسحوق الأسماك باعتباره أحد المؤشرات المؤثرة في استقرار المنتج."],
        ["القيمة التغذوية", "Nutritional Value", "متابعة مؤشرات البروتين والدهون والرماد وغيرها من الخصائص المرتبطة بالمواصفات النهائية."],
        ["الاستقرار الكيميائي", "Chemical Stability", "الاهتمام بمؤشرات الحموضة والأكسدة واستقرار المكونات الدهنية والزيتية."]],
      a: "استكشف منتجاتنا", b: "اكتشف معايير الجودة لدينا", live: "مراقبة العمليات" },
  },
  en: {
    meta: { title: "Manufacturing | Alkhaleej Fish Manufacturing", desc: "Discover how Alkhaleej Fish Manufacturing produces fish meal and recovers marine oils: thermal processing, pressing, separation, drying and industrial process control." },
    hero: { eye: "Manufacturing", h: "Precision manufacturing, the foundation of quality.", cue: "Scroll",
      p: "At Alkhaleej Fish Manufacturing we rely on an integrated industrial system to turn whole marine fish into protein and oil products of nutritional and industrial value." },
    ov: { eye: "Our manufacturing system", p: [
      "Manufacturing rests on a series of linked thermal and mechanical stages: from receiving the marine raw materials, through indirect steam cooking, pressing, centrifugal separation and drying, to preparing and packing the final products.",
      "We pay close attention to the operating variables that shape product properties, helping to preserve the nutritional value of the raw materials, improve separation efficiency and meet the target specifications for fish meal and marine oils."],
      sub: "Technical pillars",
      pillars: ["Considered thermal treatment", "Mechanical separation of components", "Centrifugal oil recovery", "Moisture control", "Preserving nutritional value", "Stability of final products"] },
    flow: { eye: "The manufacturing journey", h: "From marine fish to the final product.",
      p: "Marine fish pass through a sequence of industrial processes in which their protein, oil and water components are separated and their natural properties put to use, across two linked production streams that produce fish meal and crude fish oil.",
      hint: "Select any stage to see its details",
      lanes: { pro: ["Protein line", "المسار البروتيني", "Press cake"], oil: ["Oil line", "المسار الزيتي", "Press liquor"] },
      main: "Main line", both: "Both lines",
      nodes: { fish: "Whole marine fish", s1: "Reception", s2: "Feeding", s3: "Steam cooking", s4: "Pressing", s6: "Drying", s7: "Cooling", s8: "Antioxidant", s9p: "Packing", meal: "Fish meal",
        o1: "Fine-solids separation", o2: "Centrifugal separation", o3: "Oil collection", s9o: "Packing", oil: "Crude fish oil" },
      prev: "Previous stage", next: "Next stage", of: "of",
      stages: [
        { t: "Raw material reception", en: "استقبال المواد الخام", p: ["The industrial process begins with receiving whole marine fish and unloading them into dedicated receiving pits, with attention to the condition and freshness of the raw material and its suitability for processing."] },
        { t: "Material feeding", en: "نقل الخامات وتغذية خط الإنتاج", p: ["The fish are carried from the receiving pits to the thermal-processing units by an industrial conveying system that regulates the flow of raw material and keeps the production line continuously fed."] },
        { t: "Indirect steam cooking", en: "الطبخ بالبخار غير المباشر", p: ["The fish are heat-treated with indirect steam through a double-jacket heating system, within a target temperature range of 90 to 95 °C.", "This stage coagulates the proteins and releases part of the fat and water held in the fish tissue, preparing it for pressing and separation."],
          facts: [["90–95 °C", "Target temperature range"], ["Double Jacket", "Double-wall heating system"]] },
        { t: "Mechanical pressing", en: "العصر الميكانيكي", p: ["The cooked fish move on to the mechanical presses, where a large part of the liquids and oils is separated from the solids.", "This is where the production line divides into two main streams:"],
          split: [["pro", "Solid component (Press Cake)", "moves on to the fish meal stream."], ["oil", "Liquid component (Press Liquor)", "moves on to the marine oil recovery stream."]] },
        { t: "Fish oil extraction", en: "استخلاص الزيوت البحرية", p: ["The press liquor goes through separation of fine solids, then centrifugal separation, which relies on the different densities of oil, water and other components.", "The recovered oil is collected as crude fish oil; it naturally contains marine fatty acids, and its properties vary with the raw material and processing conditions."] },
        { t: "Drying", en: "التجفيف", p: ["The solid press cake moves to the drying units to reduce its moisture content and prepare it for storage and handling.", "Drying conditions are managed to balance moisture removal with preserving the product’s nutritional properties, targeting a moisture level of around 9% in line with the required specifications."],
          facts: [["≈ 9%", "Target moisture level"]] },
        { t: "Cooling & conditioning", en: "التبريد والتهيئة", p: ["After drying, the fish meal goes through cooling, aeration and turning to lower its temperature, limit heat build-up and prepare it for the final stages before packing."] },
        { t: "Antioxidant protection", en: "الحماية من الأكسدة", p: ["Suitable antioxidants are used to help limit oxidation of the marine fats and maintain the chemical stability of the fish meal during storage and transport, in line with the product specification and intended use."] },
        { t: "Packaging & storage", en: "التعبئة والتخزين", p: ["Final products are packed according to their nature, properties and handling requirements."],
          pack: { meal: ["Fish meal", "Protein grades", "Fat levels", "Packing: 50 kg bags."], oil: ["Crude fish oil", ["Packed in drums.", "Storage and handling conditions suited to oil products."]] } },
      ] },
    ctl: { eye: "Quality and efficiency engineering", h: "Every stage has its indicators; every process, its value.", p: ["We follow the technical variables throughout manufacturing and their effect on the chemical and nutritional properties of our products, to meet target specifications and make the most of marine raw materials, while improving the efficiency of our processes and of resource and energy use."],
      items: [
        ["Raw material condition", "حالة المواد الخام", "Following the nature, freshness and suitability of the raw material for industrial processing."],
        ["Thermal control", "التحكم الحراري", "Attention to temperatures during cooking, drying and cooling, and their effect on product properties."],
        ["Separation efficiency", "كفاءة الفصل", "Making better use of the solid, liquid and oil components during pressing and separation."],
        ["Moisture control", "التحكم في الرطوبة", "Following the moisture content of fish meal as one of the indicators that affect product stability."],
        ["Nutritional value", "القيمة التغذوية", "Following protein, fat, ash and other properties linked to the final specifications."],
        ["Chemical stability", "الاستقرار الكيميائي", "Attention to acidity and oxidation indicators and to the stability of the fat and oil components."]],
      a: "Explore our products", b: "Discover our quality standards", live: "Process monitoring" },
  },
};

/* line icons (24×24, drawn with pathLength=1 so they can draw themselves in) */
const I = {
  fish: '<path d="M3 12c3.2-4.4 9.5-5.6 14-2.2l3.6-2.8v10l-3.6-2.8C12.5 17.6 6.2 16.4 3 12z"/><circle cx="7.6" cy="11.2" r=".9"/>',
  hopper: '<path d="M3.5 5.5h17l-6 7.5v5.5h-5V13z"/><path d="M7 8.5h10"/>',
  conveyor: '<path d="M3 18.5 20 7.5"/><path d="M4.6 21 21 10.4"/><circle cx="4" cy="19.8" r="1.2"/><circle cx="20.3" cy="9" r="1.2"/>',
  cooker: '<rect x="3" y="9" width="18" height="9" rx="4.5"/><path d="M8 6.5c0-1.2 1.2-1.2 1.2-2.5M12 6.5c0-1.2 1.2-1.2 1.2-2.5M16 6.5c0-1.2 1.2-1.2 1.2-2.5"/>',
  press: '<rect x="3" y="7" width="18" height="10" rx="2"/><path d="M6 10.2 7.8 13.8 9.6 10.2 11.4 13.8 13.2 10.2 15 13.8 16.8 10.2 18 12.6"/><path d="M8 20h8"/>',
  sieve: '<path d="M3.5 7h17l-3.5 6.5H7z"/><path d="M9 17v.5M12 18.5v.5M15 17v.5"/>',
  centrifuge: '<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 8 8"/><path d="M12 9.2c1.4 1.8 2.2 2.9 2.2 3.9a2.2 2.2 0 0 1-4.4 0c0-1 .8-2.1 2.2-3.9z"/>',
  tank: '<path d="M6 5h12v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"/><path d="M6 11h12M10 2.8h4"/>',
  dryer: '<circle cx="12" cy="12" r="3.6"/><path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M6 18l1.6-1.6M16.4 7.6 18 6"/>',
  cool: '<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9"/><path d="M10 4.6 12 6.4l2-1.8M10 19.4l2-1.8 2 1.8"/>',
  shield: '<path d="M12 21c-4.6-2-7.5-5.5-7.5-9.6V5.8L12 3l7.5 2.8v5.6c0 4.1-2.9 7.6-7.5 9.6z"/><path d="M12 8.2c1.4 1.9 2.3 3 2.3 4.1a2.3 2.3 0 0 1-4.6 0c0-1.1.9-2.2 2.3-4.1z"/>',
  sack: '<path d="M7.5 4h9l-1.2 3.2c2.2 2.1 3.2 4.8 3.2 7.8a5 5 0 0 1-5 5h-3a5 5 0 0 1-5-5c0-3 1-5.7 3.2-7.8z"/><path d="M8.3 7.2h7.4"/>',
  drum: '<rect x="6" y="3" width="12" height="18" rx="2"/><path d="M6 8h12M6 16h12"/>',
  meal: '<path d="M3 19.5h18"/><path d="M5 19.5c1.5-5.2 4-8.5 7-8.5s5.5 3.3 7 8.5"/><path d="M9.5 15.5h.01M13 14h.01M14.5 17h.01"/>',
  flask: '<path d="M8 4.5h8M9.5 4.5v4.2L5.2 17.4A2.2 2.2 0 0 0 7.2 20.6h9.6a2.2 2.2 0 0 0 2-3.2L14.5 8.7V4.5"/><path d="M7.6 14.5h8.8"/>',
  thermo: '<path d="M10 4.5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0z"/><path d="M12 9v6.5"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>',
  drop: '<path d="M12 3.5c3.3 4.3 5.4 7.1 5.4 9.7a5.4 5.4 0 0 1-10.8 0c0-2.6 2.1-5.4 5.4-9.7z"/><path d="M9.6 14.2h4.8"/>',
  leaf: '<path d="M5 19c0-8 5-13 14-14 0 9-5 14-14 14z"/><path d="M5 19l7-7"/>',
  check: '<path d="M12 21c-4.6-2-7.5-5.5-7.5-9.6V5.8L12 3l7.5 2.8v5.6c0 4.1-2.9 7.6-7.5 9.6z"/><path d="M9 12l2.1 2.1L15.2 10"/>',
  split: '<path d="M3 12h6l4-5.5h8M9 12l4 5.5h8"/><path d="M18.5 4.5l2.5 2-2.5 2M18.5 15.5l2.5 2-2.5 2"/>',
  bars: '<path d="M5 20V11M10 20V6M15 20v-8M20 20V9"/><path d="M3 20h18"/>',
  lab: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M7.5 15h9"/>',
};
const ic = (k, cls) => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${I[k].replace(/<(path|circle|rect)/g, '<$1 pathLength="1"')}</svg>`;
const PILLAR_IC = ["thermo", "gear", "centrifuge", "drop", "leaf", "check"];
const CTL_IC = ["fish", "thermo", "split", "drop", "bars", "lab"];
const GAUGE = [0.42, 0.55, 0.48, 0.38, 0.6, 0.5];   // needle rest positions (fraction of the arc) — decorative, no values

/* production-flow nodes: k = key, s = stage index (0–8) or null, lane, icon · desktop grid (c,r) · phone grid (mc,mr) */
const NODES = [
  { k: "fish", s: null, lane: "main", icon: "fish", c: 1, r: 3, mc: "1/3", mr: 1 },
  { k: "s1", s: 0, lane: "main", icon: "hopper", c: 2, r: 3, mc: "1/3", mr: 2 },
  { k: "s2", s: 1, lane: "main", icon: "conveyor", c: 3, r: 3, mc: "1/3", mr: 3 },
  { k: "s3", s: 2, lane: "main", icon: "cooker", c: 4, r: 3, mc: "1/3", mr: 4 },
  { k: "s4", s: 3, lane: "main", icon: "press", c: 5, r: 3, mc: "1/3", mr: 5 },
  { k: "s6", s: 5, lane: "pro", icon: "dryer", c: 6, r: 2, mc: 1, mr: 7 },
  { k: "s7", s: 6, lane: "pro", icon: "cool", c: 7, r: 2, mc: 1, mr: 8 },
  { k: "s8", s: 7, lane: "pro", icon: "shield", c: 8, r: 2, mc: 1, mr: 9 },
  { k: "s9p", s: 8, lane: "pro", icon: "sack", c: 9, r: 2, mc: 1, mr: 10 },
  { k: "meal", s: null, lane: "pro", icon: "meal", c: 10, r: 2, mc: 1, mr: 11, end: "meal" },
  { k: "o1", s: 4, lane: "oil", icon: "sieve", c: 6, r: 4, mc: 2, mr: 7, nonum: true },
  { k: "o2", s: 4, lane: "oil", icon: "centrifuge", c: 7, r: 4, mc: 2, mr: 8 },
  { k: "o3", s: 4, lane: "oil", icon: "tank", c: 8, r: 4, mc: 2, mr: 9, nonum: true },
  { k: "s9o", s: 8, lane: "oil", icon: "drum", c: 9, r: 4, mc: 2, mr: 10 },
  { k: "oil", s: null, lane: "oil", icon: "flask", c: 10, r: 4, mc: 2, mr: 11, end: "oil" },
];
const STAGE_LANE = ["main", "main", "main", "main", "oil", "pro", "pro", "pro", "both"];

export const mfg = (lang) => {
  const u = UI[lang], ar = lang === "ar", c = C[lang], f = c.flow;
  const eye = (t) => `<p class="ab-eye" data-r="up">${t}</p>`;
  const H2 = (t, id, cls = "") => `<h2 class="ab-h2${cls ? " " + cls : ""}" id="${id}" data-lines>${lines(t)}</h2>`;
  const arrow = `<i class="ic ic-arr" aria-hidden="true"></i>`;
  const oil = PRODUCTS.find((p) => p.oil);
  const two = (n) => String(n).padStart(2, "0");
  const laneName = (l) => (l === "main" ? f.main : l === "both" ? f.both : f.lanes[l][0]);

  const node = (n) => {
    const st = `style="--c:${n.c};--r:${n.r};--mc:${n.mc};--mr:${n.mr}"`;
    const dot = `<span class="mf-dot">${ic(n.icon, "mf-ic")}${n.s != null && !n.nonum ? `<b class="mf-no">${two(n.s + 1)}</b>` : ""}</span><span class="mf-lb">${f.nodes[n.k]}</span>`;
    if (n.s != null) return `<button type="button" class="mf-node" data-k="${n.k}" data-s="${n.s}" data-lane="${n.lane}" aria-pressed="${n.s === 0}" ${st}>${dot}</button>`;
    if (n.end) return `<a class="mf-node is-end" data-k="${n.k}" data-lane="${n.lane}" href="${n.end === "oil" ? prodHref(lang, oil) : href(lang, "products")}" ${st}>${dot}</a>`;
    return `<div class="mf-node is-src" data-k="${n.k}" data-lane="${n.lane}" ${st}>${dot}</div>`;
  };

  const stage = (s, i) => {
    const lane = STAGE_LANE[i];
    const facts = s.facts ? `<dl class="mf-facts">${s.facts.map(([v, l]) => `<div><dt dir="ltr">${v}</dt><dd>${l}</dd></div>`).join("")}</dl>` : "";
    const split = s.split ? `<ul class="mf-split">${s.split.map(([l, t, d]) => `<li data-lane="${l}"><b>${t}</b><span>${d}</span></li>`).join("")}</ul>` : "";
    const pack = s.pack ? `<div class="mf-pack">
        <div data-lane="pro"><h4>${s.pack.meal[0]}</h4><p class="mf-pk-lb">${s.pack.meal[1]}</p><div class="mf-chips">${[60, 62, 65, 66, 72].map((g) => `<span>${g}%</span>`).join("")}</div>
          <p class="mf-pk-lb">${s.pack.meal[2]}</p><div class="mf-chips" dir="ltr"><span>High Fat</span><span>Low Fat</span></div><p class="mf-pk-note">${s.pack.meal[3]}</p></div>
        <div data-lane="oil"><h4>${s.pack.oil[0]}</h4><ul>${s.pack.oil[1].map((t) => `<li>${t}</li>`).join("")}</ul></div></div>` : "";
    return `<article class="mf-st" data-s="${i}" data-lane="${lane}" aria-hidden="${i !== 0}">
      <div class="mf-st-img">${pic(lang, `mf-s${i + 1}`, { col: 40, mcol: 100, box: 4 / 3 })}</div>
      <div class="mf-st-txt"><div class="mf-st-top"><span class="mf-st-no">${two(i + 1)}</span><span class="mf-tag" data-lane="${lane}">${laneName(lane)}</span></div>
        <h3>${s.t}</h3>${s.p.map((t) => `<p>${t}</p>`).join("")}${split}${facts}${pack}</div></article>`;
  };

  const gauge = (v) => `<svg class="mf-gauge" viewBox="0 0 120 68" aria-hidden="true" style="--g:${v}"><path class="g-trk" d="M10 62a50 50 0 0 1 100 0"/><path class="g-band" pathLength="1" d="M10 62a50 50 0 0 1 100 0"/>${
    Array.from({ length: 11 }, (_, k) => { const a = Math.PI * (1 - k / 10), r2 = k % 5 ? 40 : 36; return `<path class="g-tick" d="M${(60 + Math.cos(a) * 44).toFixed(1)} ${(62 - Math.sin(a) * 44).toFixed(1)}L${(60 + Math.cos(a) * r2).toFixed(1)} ${(62 - Math.sin(a) * r2).toFixed(1)}"/>`; }).join("")
  }<g class="g-needle"><path d="M60 62L60 24"/><circle cx="60" cy="62" r="4.5"/></g></svg>`;

  const body = `
<section class="ab-hero mf-hero" data-env="#F7F2EA" aria-labelledby="ab-h1">
  <div class="ab-hero-stage">
    <div class="ab-layer ab-sea">${pic(lang, "mf-hero", { fill: 1, mfill: 1, eager: true, priority: true })}</div>
    <div class="ab-scrim" aria-hidden="true"></div>
    <div class="wrap ab-hero-copy">
      <div class="ab-card">
        <nav class="crumbs ab-crumbs" aria-label="${ar ? "مسار التنقل" : "Breadcrumb"}">${crumb(lang, [u.nav.mfg])}</nav>
        <p class="ab-hero-eye">${c.hero.eye}</p>
        <h1 class="ab-h1" id="ab-h1">${c.hero.h.split(/(?<=،|,) /).map((l, i) => `<span class="ab-l" style="--d:${i}"><span>${l}</span></span>`).join(" ")}</h1>
        <p class="ab-hero-p">${c.hero.p}</p>
      </div>
    </div>
    <span class="ab-cue" aria-hidden="true"><i></i>${c.hero.cue}</span>
  </div>
</section>

<section class="mf-ov" data-env="#FBF8F3" aria-labelledby="mf-ov-title">
  <div class="wrap mf-ov-grid">
    <div class="mf-ov-copy">${H2(c.ov.eye, "mf-ov-title")}<div class="mf-prose" data-r="up">${c.ov.p.map((t) => `<p>${t}</p>`).join("")}</div></div>
    <div class="mf-pillars"><h3 class="mf-sub" id="mf-ov-h" data-r="up">${c.ov.sub}</h3>
      <ul>${c.ov.pillars.map((t, i) => `<li data-r="up" style="transition-delay:${i * 80}ms">${ic(PILLAR_IC[i], "mf-pic")}<span>${t}</span><b class="mf-pn">${two(i + 1)}</b></li>`).join("")}</ul></div>
  </div>
</section>

<section class="mf-flow" data-env="#F7F2EA" data-s="0" aria-labelledby="mf-flow-h">
  <div class="wrap">
    <div class="mf-head">${eye(f.eye)}${H2(f.h, "mf-flow-h")}<p class="mf-lede" data-r="up">${f.p}</p></div>
    <div class="mf-board" data-r="fade">
      <div class="mf-map" role="group" aria-label="${f.h}">
        <svg class="mf-wires" aria-hidden="true"></svg>
        <p class="mf-lane-lb" data-lane="pro" style="--c:6/11;--r:1;--mc:1;--mr:6"><i></i><b>${f.lanes.pro[0]}</b><span class="mf-branch">${f.lanes.pro[2]}</span></p>
        <p class="mf-lane-lb" data-lane="oil" style="--c:6/11;--r:5;--mc:2;--mr:6"><i></i><b>${f.lanes.oil[0]}</b><span class="mf-branch">${f.lanes.oil[2]}</span></p>
        ${NODES.map(node).join("\n        ")}
      </div>
      <p class="mf-hint">${f.hint}</p>
      <div class="mf-panel" aria-live="polite">
        <div class="mf-panel-nav"><button type="button" class="mf-prev" aria-label="${f.prev}"><i class="ic ic-arr" aria-hidden="true"></i></button><span class="mf-count"><b>01</b> ${f.of} 09</span><button type="button" class="mf-next" aria-label="${f.next}"><i class="ic ic-arr" aria-hidden="true"></i></button></div>
        <div class="mf-stages">${f.stages.map(stage).join("")}</div>
      </div>
    </div>
  </div>
</section>

<section class="mf-ctl" data-env="#FBF8F3" aria-labelledby="mf-ctl-h">
  <div class="wrap">
    <div class="mf-ctl-head"><div>${eye(c.ctl.eye)}${H2(c.ctl.h, "mf-ctl-h")}</div>
      <div><div class="mf-prose" data-r="up">${c.ctl.p.map((t) => `<p>${t}</p>`).join("")}</div>
        <div class="mf-acts" data-r="up"><a class="btn primary" href="${href(lang, "products")}">${c.ctl.a} ${arrow}</a><a class="btn line" href="${href(lang, "quality")}">${c.ctl.b} ${arrow}</a></div></div></div>
    <div class="mf-console">
      <div class="mf-console-img" data-r="fade">${pic(lang, "mf-control", { col: 30, mcol: 100, box: 0.75 })}<span class="mf-live" aria-hidden="true"><i></i>${c.ctl.live}</span></div>
      <ul class="mf-tiles">${c.ctl.items.map(([t, other, d], i) => `<li class="mf-tile" data-r="up" style="transition-delay:${i * 90}ms">
        <div class="mf-tile-top">${ic(CTL_IC[i], "mf-tic")}<span class="mf-tn">${two(i + 1)}</span></div>
        <h3>${t}</h3><p>${d}</p>${gauge(GAUGE[i])}</li>`).join("")}</ul>
    </div>
  </div>
</section>`;

  return layout(lang, { key: "mfg", over: true, title: c.meta.title, desc: c.meta.desc, body, preloadImg: preload("mf-hero", { fill: 1, mfill: 1 }) });
};
