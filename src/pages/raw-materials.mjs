import { UI, PRODUCTS } from "../content/content.mjs";
import { pic, preload } from "../lib/media.mjs";
import { layout } from "../layouts/layout.mjs";
import { lines } from "../lib/html.mjs";
import { href, prodHref } from "../lib/routes.mjs";
import { crumb } from "../components/blocks.mjs";

/* =====================================================================================================
   Raw materials — «ثروة البحر، أساس صناعتنا.»
   Source of truth: the client's approved Raw Materials content (Arabic, Nov 2026), used verbatim.
   English is our translation, pending client approval. No species lists, nutrient figures, fishing sites or
   supply ports beyond the supplied content; the map marks only the three seas and the plant's location.
   ===================================================================================================== */

const C = {
  ar: {
    meta: { title: "المواد الخام البحرية | الخليج لصناعة الأسماك", desc: "اكتشف مصادر وخصائص الأسماك البحرية الكاملة المستخدمة في إنتاج مسحوق الأسماك والزيوت البحرية لدى الخليج لصناعة الأسماك، وتركيبها التغذوي وعلاقتها بجودة المنتجات." },
    hero: { eye: "المواد الخام", h: "ثروة البحر، أساس صناعتنا.", p: "تمثل الأسماك البحرية الكاملة المصدر الطبيعي لمنتجاتنا من البروتين والزيوت البحرية. ومن خلال تنوع الموارد البحرية وخصائصها التغذوية، تبدأ رحلتنا الصناعية نحو إنتاج مكونات ذات قيمة تغذوية واقتصادية.", cue: "مرّر للأسفل" },
    mat: { eye: "طبيعة المواد الخام", h: "أسماك بحرية كاملة، بقيمتها الطبيعية.", p: [
      "نعتمد في الخليج لصناعة الأسماك على الأسماك البحرية الكاملة باعتبارها المادة الخام الأساسية لإنتاج مسحوق الأسماك وزيت الأسماك الخام.",
      "وتتميز هذه الخامات باحتوائها الطبيعي على البروتين الحيواني والأحماض الأمينية الأساسية والدهون البحرية والأحماض الدهنية والمعادن، مما يجعلها مصدرًا مهمًا للمكونات المستخدمة في صناعات الأعلاف والتغذية والتطبيقات الصناعية المتخصصة.",
      "ويتيح استخدام الأسماك الكاملة الاستفادة من مكوناتها الطبيعية المختلفة، وتحويلها من خلال عمليات التصنيع إلى منتجات بروتينية وزيتية ذات مواصفات تغذوية وتجارية متنوعة."],
      els: ["أسماك بحرية كاملة", "بروتين حيواني طبيعي", "أحماض أمينية أساسية", "أحماض دهنية بحرية", "معادن وعناصر تغذوية"] },
    seas: { eye: "جغرافيا الموارد البحرية", h: "بحار متعددة، وموارد متنوعة.", p: [
      "تتميز المنطقة الجغرافية التي ننطلق منها بتنوع بيئاتها البحرية، وامتدادها إلى مناطق صيد غنية بالموارد السمكية، تختلف فيها أنواع الأسماك وخصائصها الطبيعية ومواسم توافرها.",
      "وتشمل نطاقات الموارد البحرية التي نستهدف الاستفادة منها البحر الأبيض المتوسط والبحر الأحمر والخليج العربي، بما يوفر فرصًا لتنويع مصادر الخامات والخصائص التغذوية للمنتجات."],
      items: [["البحر الأبيض المتوسط", "بيئة بحرية غنية بأنواع متعددة من الأسماك، من بينها الأسماك السطحية الصغيرة مثل السردين، التي تمثل مصدرًا طبيعيًا للبروتين والدهون البحرية."],
        ["البحر الأحمر", "بيئة بحرية تتميز بتنوعها البيولوجي وخصائصها الطبيعية المختلفة، وتضم موارد سمكية ذات خصائص تغذوية متنوعة."],
        ["الخليج العربي", "منطقة بحرية تتميز بظروفها البيئية ومواردها السمكية الخاصة، وتوفر فرصًا لتنويع مصادر الخامات البحرية."]],
      egypt: "مصر", plant: "كفر الشيخ", mapLabel: "خريطة البحار الثلاثة" },
    sp: { eye: "التنوع الطبيعي", h: "لكل نوع خصائصه، ولكل خامة قيمتها.", p: ["يختلف التركيب الكيميائي الغذائي للأسماك البحرية باختلاف النوع والعمر والحجم والبيئة والموسم والتغذية، مما يؤثر في نسب البروتين والدهون والمعادن وخصائص الزيوت، ويشكل أساسًا لاختيار الخامات وتحديد مواصفات المنتجات النهائية."],
      items: [["السردين", "Sardine", "يعد السردين من الأسماك البحرية السطحية الصغيرة، ويتميز بمحتواه الطبيعي من البروتين والدهون البحرية والأحماض الدهنية، مما يجعله من الخامات المهمة في صناعة مسحوق الأسماك وزيت الأسماك."],
        ["الأسماك البحرية السطحية", "Pelagic Fish", "مجموعة من الأسماك التي تعيش في الطبقات المائية المفتوحة، وتتميز بتنوع خصائصها التغذوية ومحتواها من البروتين والدهون."],
        ["الأسماك البحرية الأخرى", "Other Marine Fish", "تختلف خصائصها الطبيعية باختلاف الأنواع والبيئات البحرية، ويتم تقييم ملاءمتها للتصنيع وفق تركيبها التغذوي وحالتها عند الاستقبال."]] },
    src: { eye: "من البحر إلى المصنع", h: "العناية بالخامات تبدأ قبل التصنيع.", p: [
      "تبدأ العملية الصناعية قبل وصول الأسماك إلى المصنع، من خلال اختيار مصادر الخامات والتعامل معها خلال مراحل الصيد والتجميع والنقل والحفظ.",
      "وتعتمد منظومة توفير الخامات البحرية على مجموعة من المصادر والقنوات التي تتيح التعامل مع اختلاف مواسم الصيد وتنوع الموارد البحرية ومتطلبات الإنتاج."],
      seq: ["الصيد والتجميع", "الحفظ والتبريد", "النقل والاستقبال"],
      items: [["الصيد والتجميع", "الاستفادة من الأسماك البحرية التي يتم الحصول عليها من خلال مراكب الصيد التابعة للمصنع، ومن مصادر الصيد والتجميع وفق توافر الأسماك وملاءمتها للتصنيع، بما يعزز ارتباط العملية الصناعية بمصادر الخامات."],
        ["الحفظ والتبريد", "الاستفادة من الخامات البحرية المحفوظة والمبردة، وفق حالتها وخصائصها ومدى ملاءمتها لمتطلبات الإنتاج."],
        ["النقل والاستقبال", "الاهتمام بظروف نقل الخامات وتداولها واستقبالها داخل المصنع، باعتبارها عوامل مؤثرة في خصائص المادة الخام وجودة المنتج النهائي."]] },
    nu: { eye: "القيمة الكامنة في الخامات", h: "أكثر من مجرد مادة خام.", p: [
      "تحتوي الأسماك البحرية على عناصر غذائية تمنحها أهمية خاصة في صناعة الأعلاف والأغذية.",
      "وتتكامل هذه المكونات لتشكل القيمة الغذائية لمسحوق الأسماك والزيوت البحرية."],
      items: [["البروتين الحيواني", "Animal Protein", "يمثل البروتين أحد المكونات الرئيسية للأسماك البحرية، ويعد أساس القيمة التغذوية لمسحوق الأسماك."],
        ["الأحماض الأمينية", "Amino Acids", "تحتوي البروتينات البحرية على مجموعة من الأحماض الأمينية الأساسية، من بينها الليسين والميثيونين والثريونين، التي تؤدي أدوارًا مهمة في النمو وبناء الأنسجة والتغذية الحيوانية."],
        ["الدهون البحرية", "Marine Lipids", "تمثل الدهون البحرية مصدرًا للطاقة والأحماض الدهنية، وتعد المكون الأساسي الذي يتم استخلاصه خلال إنتاج زيت الأسماك."],
        ["أحماض أوميغا 3", "Omega-3 Fatty Acids", "تحتوي العديد من الأسماك البحرية بصورة طبيعية على أحماض دهنية متعددة غير مشبعة، من بينها EPA وDHA، بنسب تختلف وفق النوع والبيئة والموسم."],
        ["المعادن", "Minerals", "تحتوي الأسماك الكاملة على عناصر معدنية طبيعية، من بينها الكالسيوم والفوسفور، والتي تساهم في القيمة المعدنية لمسحوق الأسماك."],
        ["الفيتامينات", "Vitamins", "تحتوي الخامات البحرية بصورة طبيعية على مجموعة من الفيتامينات، تختلف مستوياتها باختلاف أنواع الأسماك وخصائصها وظروف المعالجة."]] },
    vr: { eye: "فهم طبيعة الموارد البحرية", h: "البحر متنوع بطبيعته.", p: [
      "لا تمتلك جميع الأسماك البحرية التركيب الكيميائي والتغذوي نفسه، إذ تتغير خصائصها الطبيعية نتيجة مجموعة من العوامل البيولوجية والبيئية.",
      "ويمثل فهم هذه المتغيرات جزءًا مهمًا من المعرفة الصناعية اللازمة للتعامل مع الخامات البحرية وتطوير مواصفات المنتجات."],
      sub: "العوامل المؤثرة في خصائص الخامات",
      items: [["نوع الأسماك", "تختلف نسب البروتين والدهون والمعادن باختلاف الأنواع السمكية."],
        ["موسم الصيد", "تتأثر خصائص الأسماك بتغير المواسم ودورات التغذية والتكاثر."],
        ["البيئة البحرية", "تؤثر درجات حرارة المياه والملوحة وتوافر الغذاء الطبيعي في التركيب البيولوجي للأسماك."],
        ["الحجم والعمر", "تختلف نسب المكونات الطبيعية تبعًا لمراحل نمو الأسماك وأحجامها."],
        ["الحالة والطزاجة", "تؤثر ظروف التداول والحفظ والفترة الزمنية قبل التصنيع في الحالة الكيميائية والبيولوجية للخامات."]] },
    q: { eye: "الجودة قبل التصنيع", h: "جودة المنتج تبدأ من جودة الخامة.", p: [
      "تمثل حالة المواد الخام أحد العوامل الأساسية المؤثرة في خصائص مسحوق الأسماك والزيوت البحرية.",
      "ولهذا نهتم بتقييم الخامات البحرية من حيث حالتها العامة وطزاجتها وخصائصها الطبيعية ومدى ملاءمتها لعمليات التصنيع.",
      "وتساعد متابعة هذه المؤشرات على فهم طبيعة الخامات والتعامل معها بما يتناسب مع خصائصها ومتطلبات الإنتاج."],
      sub: "مؤشرات تقييم الخامات", cta: "اكتشف معايير الجودة لدينا",
      items: [["الطزاجة", "Freshness", "تقييم الحالة العامة للخامات والمؤشرات المرتبطة بالتغيرات الكيميائية الناتجة عن تدهور الطزاجة."],
        ["الحالة الظاهرية", "Physical Condition", "تقييم المظهر العام وسلامة الخامات وحالتها عند الاستقبال."],
        ["التركيب التغذوي", "Nutritional Composition", "متابعة خصائص البروتين والدهون والرطوبة والمكونات المعدنية."],
        ["ظروف الحفظ", "Preservation Conditions", "متابعة ظروف التداول والحفظ والتبريد قبل التصنيع."],
        ["ملاءمة التصنيع", "Processing Suitability", "تقييم مدى ملاءمة الخامات للمعالجة وإنتاج المنتجات المستهدفة."]] },
    fl: { eye: "القيمة الصناعية للموارد البحرية", h: "مصدر واحد، ومنتجات متعددة.", p: "من خلال عمليات المعالجة الحرارية والعصر والفصل والتجفيف، يتم تحويل الأسماك البحرية الكاملة إلى مسارين إنتاجيين رئيسيين، يمثل كل منهما جانبًا من القيمة الطبيعية والتغذوية للخامات.",
      src: "أسماك بحرية كاملة",
      meal: { t: "مسحوق الأسماك", en: "Fish Meal", d: "منتج غني بالبروتين الحيواني والأحماض الأمينية والمعادن، يتم إنتاجه بدرجات بروتينية ومستويات دهون مختلفة، بما يتناسب مع متطلبات الاستخدام والتصنيف التجاري.", gl: "درجات البروتين", fl: "خيارات الدهون", cta: "استكشف مسحوق الأسماك" },
      oil: { t: "زيت الأسماك الخام", en: "Crude Fish Oil", d: "زيت بحري يتم استخلاصه وفصله خلال عمليات التصنيع، ويحتوي على الدهون والأحماض الدهنية البحرية، ويستخدم في صناعة الأعلاف وكخامة لعمليات التكرير والتطبيقات الأخرى وفق مواصفاته ومدى ملاءمته للاستخدام.", cta: "استكشف زيت الأسماك" } },
    cta: { h: "من طبيعة البحر إلى دقة التصنيع.", p: "اكتشف كيف تتحول الموارد البحرية الطبيعية إلى منتجات بروتينية وزيتية، من خلال مراحل المعالجة والفصل والتجفيف والتصنيع.", a: "اكتشف عمليات التصنيع", b: "استكشف منتجاتنا" },
  },
  en: {
    meta: { title: "Marine raw materials | Alkhaleej Fish Manufacturing", desc: "Discover the sources and properties of the whole marine fish Alkhaleej Fish Manufacturing uses to produce fish meal and marine oils, their nutritional composition and how they shape product quality." },
    hero: { eye: "Raw materials", h: "The sea’s wealth, the foundation of our industry.", p: "Whole marine fish are the natural source of our marine protein and oil products. Through the diversity of marine resources and their nutritional properties, our industrial journey begins towards ingredients of nutritional and economic value.", cue: "Scroll" },
    mat: { eye: "The nature of our raw materials", h: "Whole marine fish, with their natural value.", p: [
      "At Alkhaleej Fish Manufacturing we rely on whole marine fish as the main raw material for producing fish meal and crude fish oil.",
      "These raw materials naturally contain animal protein, essential amino acids, marine fats, fatty acids and minerals, making them an important source of ingredients for the feed, nutrition and specialised industrial sectors.",
      "Using whole fish makes the most of their different natural components, turning them through manufacturing into protein and oil products of varied nutritional and commercial specifications."],
      els: ["Whole marine fish", "Natural animal protein", "Essential amino acids", "Marine fatty acids", "Minerals and nutrients"] },
    seas: { eye: "The geography of marine resources", h: "Many seas, diverse resources.", p: [
      "The region we operate from has diverse marine environments, reaching fishing grounds rich in fish resources, where species, natural properties and seasons of availability vary.",
      "The marine resource areas we aim to draw on include the Mediterranean, the Red Sea and the Arabian Gulf, offering opportunities to diversify raw-material sources and the nutritional properties of our products."],
      items: [["The Mediterranean", "A marine environment rich in many fish species, among them small pelagic fish such as sardines, a natural source of protein and marine fats."],
        ["The Red Sea", "A marine environment known for its biodiversity and distinct natural properties, holding fish resources of varied nutritional character."],
        ["The Arabian Gulf", "A marine area with its own environmental conditions and fish resources, offering opportunities to diversify marine raw-material sources."]],
      egypt: "Egypt", plant: "Kafr El-Sheikh", mapLabel: "Map of the three seas" },
    sp: { eye: "Natural diversity", h: "Every species has its properties, every raw material its value.", p: ["The chemical and nutritional composition of marine fish varies with species, age, size, environment, season and feeding, which affects the proportions of protein, fat and minerals and the properties of the oils, and forms the basis for selecting raw materials and setting the specifications of final products."],
      items: [["Sardine", "السردين", "Sardines are small pelagic marine fish, naturally rich in protein, marine fats and fatty acids, which makes them an important raw material for fish meal and fish oil."],
        ["Pelagic fish", "الأسماك البحرية السطحية", "A group of fish living in the open water column, with varied nutritional properties and protein and fat content."],
        ["Other marine fish", "الأسماك البحرية الأخرى", "Their natural properties vary with species and marine environment; their suitability for processing is assessed by nutritional composition and condition on receipt."]] },
    src: { eye: "From the sea to the plant", h: "Care for raw materials begins before manufacturing.", p: [
      "The industrial process begins before the fish reach the plant, through the choice of raw-material sources and their handling during fishing, collection, transport and preservation.",
      "Our marine raw-material supply relies on a range of sources and channels that let us respond to changing fishing seasons, diverse marine resources and production requirements."],
      seq: ["Fishing and collection", "Preservation and cooling", "Transport and receiving"],
      items: [["Fishing and collection", "Marine fish obtained through the plant’s own fishing vessels and from fishing and collection sources, according to fish availability and suitability for processing, strengthening the link between the industrial process and its raw-material sources."],
        ["Preservation and cooling", "Preserved and chilled marine raw materials, used according to their condition, properties and suitability for production."],
        ["Transport and receiving", "Attention to how raw materials are transported, handled and received at the plant, as factors that shape the raw material and the quality of the final product."]] },
    nu: { eye: "The value within the raw material", h: "More than a raw material.", p: [
      "Marine fish contain nutrients that give them particular importance in the feed and food industries.",
      "Together these components form the nutritional value of fish meal and marine oils."],
      items: [["Animal protein", "البروتين الحيواني", "Protein is one of the main components of marine fish and the basis of fish meal’s nutritional value."],
        ["Amino acids", "الأحماض الأمينية", "Marine proteins contain essential amino acids, among them lysine, methionine and threonine, which play important roles in growth, tissue building and animal nutrition."],
        ["Marine lipids", "الدهون البحرية", "Marine fats are a source of energy and fatty acids, and the main component extracted in the production of fish oil."],
        ["Omega-3 fatty acids", "أحماض أوميغا 3", "Many marine fish naturally contain polyunsaturated fatty acids, among them EPA and DHA, in proportions that vary with species, environment and season."],
        ["Minerals", "المعادن", "Whole fish contain natural minerals, among them calcium and phosphorus, which contribute to the mineral value of fish meal."],
        ["Vitamins", "الفيتامينات", "Marine raw materials naturally contain a range of vitamins, whose levels vary with fish species, their properties and processing conditions."]] },
    vr: { eye: "Understanding marine resources", h: "The sea is diverse by nature.", p: [
      "Not all marine fish share the same chemical and nutritional composition; their natural properties change with a range of biological and environmental factors.",
      "Understanding these variables is an important part of the industrial knowledge needed to work with marine raw materials and develop product specifications."],
      sub: "Factors that shape raw-material properties",
      items: [["Fish species", "Protein, fat and mineral proportions differ between species."],
        ["Fishing season", "Fish properties change with the seasons and with feeding and breeding cycles."],
        ["Marine environment", "Water temperature, salinity and natural food availability affect the fish’s biological composition."],
        ["Size and age", "The proportions of natural components vary with the fish’s growth stage and size."],
        ["Condition and freshness", "Handling, preservation and the time before processing affect the raw material’s chemical and biological condition."]] },
    q: { eye: "Quality before manufacturing", h: "Product quality begins with raw-material quality.", p: [
      "The condition of raw materials is one of the main factors shaping the properties of fish meal and marine oils.",
      "That is why we assess marine raw materials for their general condition, freshness, natural properties and suitability for processing.",
      "Following these indicators helps us understand the raw material and handle it according to its properties and production requirements."],
      sub: "Raw-material assessment indicators", cta: "Discover our quality standards",
      items: [["Freshness", "الطزاجة", "Assessing the general condition of the raw material and indicators linked to chemical changes caused by loss of freshness."],
        ["Physical condition", "الحالة الظاهرية", "Assessing general appearance, integrity and condition on receipt."],
        ["Nutritional composition", "التركيب التغذوي", "Following protein, fat, moisture and mineral properties."],
        ["Preservation conditions", "ظروف الحفظ", "Following handling, preservation and cooling conditions before processing."],
        ["Processing suitability", "ملاءمة التصنيع", "Assessing how suitable the raw material is for processing and for the target products."]] },
    fl: { eye: "The industrial value of marine resources", h: "One source, many products.", p: "Through cooking, pressing, separation and drying, whole marine fish are turned into two main production streams, each representing one side of the raw material’s natural and nutritional value.",
      src: "Whole marine fish",
      meal: { t: "Fish meal", en: "مسحوق الأسماك", d: "A product rich in animal protein, amino acids and minerals, produced in different protein grades and fat levels to suit use requirements and commercial grading.", gl: "Protein grades", fl: "Fat options", cta: "Explore fish meal" },
      oil: { t: "Crude fish oil", en: "زيت الأسماك الخام", d: "A marine oil extracted and separated during manufacturing, containing marine fats and fatty acids, used in feed manufacturing and as a raw material for refining and other applications according to its specification and suitability.", cta: "Explore fish oil" } },
    cta: { h: "From the nature of the sea to manufacturing precision.", p: "Discover how natural marine resources become protein and oil products, through processing, separation, drying and manufacturing.", a: "Discover our manufacturing", b: "Explore our products" },
  },
};

/* line icons (pathLength=1 so they draw themselves in) */
const ln = (d, cls) => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${d.replace(/<(path|circle|rect|ellipse)/g, '<$1 pathLength="1"')}</svg>`;
const FISH = '<path d="M3 12c3.2-4.4 9.5-5.6 14-2.2l3.6-2.8v10l-3.6-2.8C12.5 17.6 6.2 16.4 3 12z"/><circle cx="7.6" cy="11.2" r=".9"/>';
const FLASK = '<path d="M8 4.5h8M9.5 4.5v4.2L5.2 17.4A2.2 2.2 0 0 0 7.2 20.6h9.6a2.2 2.2 0 0 0 2-3.2L14.5 8.7V4.5"/><path d="M7.6 14.5h8.8"/>';
const MOLECULE = '<circle cx="6" cy="8" r="2.2"/><circle cx="18" cy="8" r="2.2"/><circle cx="12" cy="17" r="2.2"/><path d="M8 9.2l2.6 6M16 9.2l-2.6 6M8.2 8h7.6"/>';
const DROP = '<path d="M12 3.5c3.3 4.3 5.4 7.1 5.4 9.7a5.4 5.4 0 0 1-10.8 0c0-2.6 2.1-5.4 5.4-9.7z"/><path d="M9.6 13.6a2.6 2.6 0 0 0 2.4 2.4"/>';
const CRYSTAL = '<path d="M12 3l7.5 4.3v9.4L12 21l-7.5-4.3V7.3z"/><path d="M12 3v18M4.5 7.3 19.5 16.7M19.5 7.3 4.5 16.7"/>';
const EL = [FISH, FLASK, MOLECULE, DROP, CRYSTAL];
const NU = [FLASK, MOLECULE, DROP, '<path d="M4 8.5q4-4 8 0t8 0M4 15.5q4-4 8 0t8 0"/><path d="M12 4.5v15"/>', CRYSTAL, '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v9M7.5 12h9"/>'];
const QI = [
  '<path d="M12 21c4.2-2.4 6.5-5.6 6.5-9.6V5.5L12 3 5.5 5.5v5.9c0 4 2.3 7.2 6.5 9.6z"/><path d="M8.8 11.8l2.3 2.3 4.3-4.6"/>',
  '<circle cx="11" cy="11" r="6.5"/><path d="M15.8 15.8 20.5 20.5"/>',
  '<path d="M5 19V9M10 19V5M15 19v-7M20 19v-11"/>',
  '<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9"/><path d="M9.5 4.5 12 6.6l2.5-2.1M9.5 19.5 12 17.4l2.5 2.1"/>',
  '<path d="M4 12.5l5 5L20 6.5"/>',
];
/* the five variability factors — small scientific drawings (animate when chosen) */
const VR = [
  `<g class="v-ty"><g transform="translate(8 22)"><g class="v-swim" style="--sd:0.0s"><path d="M0 0C8-6 26-7 40-3L47-7 45 0 47 7 40 3C26 7 8 6 0 0Z"/><path d="M11-4.5q-2.2 4.5 0 9"/><circle class="v-eye" cx="5.5" cy="-1" r="1"/></g></g><rect class="v-trk" x="70" y="19" width="102" height="6" rx="3"/><rect class="v-seg v-p" x="70" y="19" width="56.8" height="6" rx="3" style="--d:0.15s"/><rect class="v-seg v-f" x="128.8" y="19" width="29.4" height="6" rx="3" style="--d:0.27s"/><rect class="v-seg v-m" x="160.2" y="19" width="11.8" height="6" rx="3" style="--d:0.39s"/><g transform="translate(8 58)"><g class="v-swim" style="--sd:-0.9s"><path d="M0 0C10-8 30-8 42-3L50-8 47 0 50 8 42 3C30 8 10 8 0 0Z"/><path d="M12-5.5q-2.4 5.5 0 11"/><path d="M18-5l4 4M24-6l4 4M30-6l4 4M36-4.5l3 3"/><circle class="v-eye" cx="5.5" cy="-1.2" r="1"/></g></g><rect class="v-trk" x="70" y="55" width="102" height="6" rx="3"/><rect class="v-seg v-p" x="70" y="55" width="49.0" height="6" rx="3" style="--d:0.33s"/><rect class="v-seg v-f" x="121.0" y="55" width="39.2" height="6" rx="3" style="--d:0.45s"/><rect class="v-seg v-m" x="162.2" y="55" width="9.8" height="6" rx="3" style="--d:0.57s"/><g transform="translate(8 96)"><g class="v-swim" style="--sd:-1.8s"><path d="M0 1C4-10 18-14 32-8C38-5 41-2 43-1L50-8 48 1 50 9 43 3C36 9 20 13 6 8C2 6 0 4 0 1Z"/><path d="M13-9.5q-3 9 0 17"/><circle class="v-eye" cx="6" cy="-1" r="1.1"/></g></g><rect class="v-trk" x="70" y="93" width="102" height="6" rx="3"/><rect class="v-seg v-p" x="70" y="93" width="62.7" height="6" rx="3" style="--d:0.51s"/><rect class="v-seg v-f" x="134.7" y="93" width="17.6" height="6" rx="3" style="--d:0.63s"/><rect class="v-seg v-m" x="154.3" y="93" width="17.6" height="6" rx="3" style="--d:0.75s"/></g>`,
  `<g class="v-se"><circle cx="90" cy="64" r="40"/><path d="M90 24v10M90 94v10M50 64h10M120 64h10"/><circle class="v-dot" cx="90" cy="24" r="6"/></g>`,
  `<g class="v-en"><path class="v-wave" d="M10 84q15-12 30 0t30 0 30 0 30 0 30 0 30 0"/><path class="v-wave w2" d="M10 100q15-12 30 0t30 0 30 0 30 0 30 0 30 0"/><rect x="82" y="14" width="16" height="50" rx="8"/><circle cx="90" cy="70" r="11"/><path class="v-merc" d="M90 66V34"/></g>`,
  `<g class="v-sz"><path d="M20 76c4-6 11-7 16-3l4-3v12l-4-3c-5 4-12 3-16-3z"/><path d="M58 74c7-9 19-11 27-5l7-5v20l-7-5c-8 6-20 4-27-5z"/><path d="M110 72c10-13 28-16 40-7l10-7v28l-10-7c-12 9-30 6-40-7z"/></g>`,
  `<g class="v-fr"><path d="M60 64h40M80 44v40M66 50l28 28M94 50 66 78"/><circle cx="140" cy="64" r="24"/><path class="v-hand" d="M140 64V48M140 64l10 6"/></g>`,
];

/* simplified coastlines (lon/lat → x=(lon−24)·16, y=(38−lat)·16): Mediterranean, Red Sea, Arabian Gulf */
const SEAS = [
  "M0 0L0 96 19.2 102.4 52.8 107.2 94.4 108.8 120 104 132.8 107.2 164.8 105.6 174.4 86.4 184 64 190.4 41.6 193.6 22.4 169.6 19.2 144 28.8 120 22.4 96 27.2 72 19.2 52.8 14.4 44.8 0Z",
  "M136.8 128.8L153.6 166.4 166.4 192 185.6 225.6 211.2 272 217.6 299.2 233.6 321.6 251.2 358.4 275.2 380.8 297.6 400 308.8 406.4 312 401.6 300.8 371.2 297.6 345.6 278.4 313.6 259.2 284.8 241.6 260.8 225.6 230.4 209.6 204.8 195.2 185.6 179.2 161.6 164.8 164 150.4 150.4 139.2 134.4Z",
  "M384 128L382.4 137.6 393.6 155.2 409.6 174.4 419.2 188.8 425.6 201.6 430.4 211.2 436.8 190.4 441.6 204.8 441.6 217.6 457.6 220.8 483.2 220.8 502.4 203.2 513.6 192 518.4 185.6 516.8 172.8 502.4 179.2 484.8 180.8 464 176 444.8 163.2 430.4 145.6 420.8 134.4 404.8 126.4 393.6 123.2Z",
];
const SEA_LABEL = [[92, 58], [236, 300], [462, 150]];

export const raw = (lang) => {
  const u = UI[lang], ar = lang === "ar", c = C[lang];
  const eye = (t) => `<p class="ab-eye" data-r="up">${t}</p>`;
  const H2 = (t, id, cls = "") => `<h2 class="ab-h2${cls ? " " + cls : ""}" id="${id}" data-lines>${lines(t)}</h2>`;
  const arrow = `<i class="ic ic-arr" aria-hidden="true"></i>`;
  const oil = PRODUCTS.find((p) => p.oil);
  const alt = (s) => `dir="${ar ? "ltr" : "rtl"}"`;

  const body = `
<section class="ab-hero rw-hero" data-env="#F7F2EA" aria-labelledby="ab-h1">
  <div class="ab-hero-stage">
    <div class="ab-layer ab-sea">${pic(lang, "rw-hero", { fill: 1, mfill: 1, eager: true, priority: true })}</div>
    <div class="ab-scrim" aria-hidden="true"></div>
    <div class="wrap ab-hero-copy">
      <div class="ab-card">
        <nav class="crumbs ab-crumbs" aria-label="${ar ? "مسار التنقل" : "Breadcrumb"}">${crumb(lang, [u.nav.raw])}</nav>
        <p class="ab-hero-eye">${c.hero.eye}</p>
        <h1 class="ab-h1" id="ab-h1">${c.hero.h.split(/(?<=،|,) /).map((l, i) => `<span class="ab-l" style="--d:${i}"><span>${l}</span></span>`).join(" ")}</h1>
        <p class="ab-hero-p">${c.hero.p}</p>
      </div>
    </div>
    <span class="ab-cue" aria-hidden="true"><i></i>${c.hero.cue}</span>
  </div>
</section>

<section class="rw-mat" data-env="#F7F2EA" aria-labelledby="rw-mat-h">
  <div class="wrap rw-split">
    <div class="rw-copy">${eye(c.mat.eye)}${H2(c.mat.h, "rw-mat-h")}<div class="rw-prose" data-r="up">${c.mat.p.map((t) => `<p>${t}</p>`).join("")}</div></div>
    <div class="rw-media">${pic(lang, "rw-fish", { col: 44, mcol: 100, box: 0.8, reveal: "curtain" })}</div>
  </div>
  <div class="wrap"><ul class="rw-els">${c.mat.els.map((t, i) => `<li data-r="up" style="transition-delay:${i * 90}ms">${ln(EL[i], "rw-ic")}<span>${t}</span></li>`).join("")}</ul></div>
</section>

<section class="rw-sp" data-env="#FBF8F3" aria-labelledby="rw-sp-h">
  <div class="wrap rw-head-split"><div>${eye(c.sp.eye)}${H2(c.sp.h, "rw-sp-h")}</div><div class="rw-prose" data-r="up">${c.sp.p.map((t) => `<p>${t}</p>`).join("")}</div></div>
  <div class="wrap rw-sp-grid">${c.sp.items.map(([t, other, d], i) => `<article class="rw-sp-item${i === 0 ? " is-lead" : ""}" data-r="up" style="transition-delay:${i * 120}ms">
      <div class="rw-sp-img">${pic(lang, ["rw-sardine", "rw-pelagic", "rw-other"][i], { col: i ? 30 : 52, mcol: 100, box: i ? 1.3 : 0.9 })}</div>
      <div class="rw-sp-txt"><h3>${t}</h3><p class="rw-other-name" ${alt()}>${other}</p><p>${d}</p></div></article>`).join("")}</div>
</section>

<section class="rw-src" data-env="#F7F2EA" aria-labelledby="rw-src-h">
  <div class="rw-src-stage">
    <div class="wrap rw-src-head">
      <div>${eye(c.src.eye)}${H2(c.src.h, "rw-src-h")}</div>
      <div class="rw-prose" data-r="up">${c.src.p.map((t) => `<p>${t}</p>`).join("")}</div>
    </div>
    <ol class="wrap rw-seq" aria-label="${ar ? "رحلة الخامات" : "The raw-material journey"}">${c.src.seq.map((t, i) => `<li data-i="${i}"><i></i><span>${t}</span></li>`).join("")}</ol>
    <div class="rw-track-win"><div class="rw-track">${c.src.items.map(([t, d], i) => `<article class="rw-frame" data-i="${i}">
        <div class="rw-frame-img">${pic(lang, ["rw-j1", "rw-j2", "rw-j3"][i], { col: 40, mcol: 100, box: 1.6 })}</div>
        <div class="rw-frame-txt"><span class="rw-n">0${i + 1}</span><h3>${t}</h3><p>${d}</p></div></article>`).join("")}</div></div>
  </div>
</section>

<section class="rw-nu" data-env="#FBF8F3" data-n="0" aria-labelledby="rw-nu-h">
  <div class="wrap">
    <div class="rw-head-center">${eye(c.nu.eye)}${H2(c.nu.h, "rw-nu-h")}<div class="rw-prose" data-r="up">${c.nu.p.map((t) => `<p>${t}</p>`).join("")}</div></div>
    <div class="rw-nu-stage">
      <div class="rw-nu-col" data-r="up">${c.nu.items.slice(0, 3).map(([t, other], i) => `<button type="button" class="rw-nu-node" data-i="${i}" aria-pressed="${i === 0}">${ln(NU[i], "rw-ic")}<span><b>${t}</b><small ${alt()}>${other}</small></span></button>`).join("")}</div>
      <figure class="rw-nu-fish" data-r="fade">${pic(lang, "rw-illus", { col: 44, mcol: 100, box: 16 / 9 })}</figure>
      <div class="rw-nu-col" data-r="up">${c.nu.items.slice(3).map(([t, other], k) => `<button type="button" class="rw-nu-node" data-i="${k + 3}" aria-pressed="false">${ln(NU[k + 3], "rw-ic")}<span><b>${t}</b><small ${alt()}>${other}</small></span></button>`).join("")}</div>
    </div>
    <div class="rw-nu-panel" aria-live="polite">${c.nu.items.map(([t, other, d], i) => `<div class="rw-nu-desc" data-i="${i}"><h3>${t} <small ${alt()}>${other}</small></h3><p>${d}</p></div>`).join("")}</div>
  </div>
</section>

<section class="rw-vr" data-env="#F7F2EA" data-v="0" aria-labelledby="rw-vr-h">
  <div class="wrap rw-vr-grid">
    <div class="rw-copy">${eye(c.vr.eye)}${H2(c.vr.h, "rw-vr-h")}<div class="rw-prose" data-r="up">${c.vr.p.map((t) => `<p>${t}</p>`).join("")}</div></div>
    <div class="rw-vr-lab" data-r="up">
      <p class="rw-sub">${c.vr.sub}</p>
      <div class="rw-vr-tabs" role="group" aria-label="${c.vr.sub}">${c.vr.items.map(([t], i) => `<button type="button" data-i="${i}" aria-pressed="${i === 0}">${t}</button>`).join("")}</div>
      <div class="rw-vr-board">${c.vr.items.map(([t, d], i) => `<div class="rw-vr-card" data-i="${i}"><svg class="rw-vr-art" viewBox="0 0 180 120" aria-hidden="true">${VR[i]}</svg><div><h3>${t}</h3><p>${d}</p>${i === 0 ? `<ul class="rw-vr-key">${(ar ? ["البروتين", "الدهون", "المعادن"] : ["Protein", "Fat", "Minerals"]).map((k, n) => `<li><i class="k${n}"></i>${k}</li>`).join("")}</ul>` : ""}</div></div>`).join("")}</div>
    </div>
  </div>
</section>

<section class="ab-cta" data-env="#FBF8F3" aria-labelledby="ab-cta-h">
  <div class="wrap ab-cta-in">
    <span class="ab-horizon" aria-hidden="true"></span>
    <h2 class="ab-h2 ab-h2-xl" id="ab-cta-h" data-lines>${lines(c.cta.h)}</h2>
    <p class="ab-cta-p" data-r="up">${c.cta.p}</p>
    <div class="ab-cta-acts" data-r="up"><a class="btn primary" href="${href(lang, "mfg")}">${c.cta.a} ${arrow}</a><a class="btn line" href="${href(lang, "products")}">${c.cta.b} ${arrow}</a></div>
  </div>
</section>`;

  return layout(lang, { key: "raw", over: true, title: c.meta.title, desc: c.meta.desc, body, preloadImg: preload("rw-hero", { fill: 1, mfill: 1 }) });
};
