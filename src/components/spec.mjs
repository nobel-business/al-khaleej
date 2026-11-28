import { UI, PRODUCTS } from "../content/content.mjs";
import { arr } from "../lib/html.mjs";
import { prodHref, quoteHref } from "../lib/routes.mjs";
import { pic } from "../lib/media.mjs";

export function specRows(lang, p, full = false) {
  const u = UI[lang], on = `<span class="chip">${u.onRequest}</span>`, pend = `<span class="chip">${u.pending}</span>`;
  const rows = [[u.family, p.oil ? u.oil : u.fishmeal], p.oil ? [u.form, u.crude] : [u.grade, `${p.grade}%`],
    [u.packing, p.oil ? `${u.drums} <span class="chip">${u.capacityPending}</span>` : u.bags], [u.rawMaterial, u.rawValue], [u.application, u.appValue]];
  if (full) {
    const extra = p.oil
      ? (lang === "ar" ? ["الأحماض الدهنية الحرة (FFA)", "رقم البيروكسيد (PV)", "رقم الأنيسيدين", "الرطوبة والشوائب", "EPA + DHA"] : ["Free fatty acids (FFA)", "Peroxide value (PV)", "Anisidine value", "Moisture & impurities", "EPA + DHA"])
      : (lang === "ar" ? ["البروتين (حد أدنى)", "الرطوبة (حد أقصى)", "الدهون", "الرماد", "الملح", "النيتروجين الطيّار الكلي (TVN)", "الهيستامين"] : ["Protein (min.)", "Moisture (max.)", "Fat", "Ash", "Salt", "TVN", "Histamine"]);
    extra.forEach((x) => rows.push([x, on]));
  }
  rows.push([u.datasheet, on], [u.coa, pend]);
  return rows;
}
export const table = (rows) => `<table class="spec-table"><tbody>${rows.map((r) => `<tr><th scope="row">${r[0]}</th><td>${r[1]}</td></tr>`).join("")}</tbody></table>`;

export function drawerFor(lang) {
  const u = UI[lang], ar = lang === "ar";
  const drawerData = PRODUCTS.map((p) => ({ name: p.name[lang], desc: p.desc[lang], rows: specRows(lang, p), media: pic(lang, p.img, { sizes: "(max-width:640px) 100vw, 560px" }), url: prodHref(lang, p), quote: quoteHref(lang, p) }));
  const drawer = `<div class="drawer-wrap" aria-hidden="true"><div class="scrim"></div><aside class="drawer" role="dialog" aria-modal="true" aria-label="${ar ? "تفاصيل المنتج" : "Product details"}"><button class="x" type="button" aria-label="${u.close}"><i class="ic ic-x" aria-hidden="true"></i></button><div data-f="media" data-swap></div><div class="in"><div class="idx" data-f="idx" data-swap></div><h2 data-f="name" data-swap></h2><p class="lede" data-f="desc" data-swap></p><table class="spec-table" data-swap><tbody data-f="rows"></tbody></table><div class="acts"><div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn primary" data-f="quote" href="#">${u.quote}</a><a class="btn line" data-f="page" href="#">${u.viewProduct} ${arr}</a></div><div class="pn"><button type="button" data-f="prev">${u.prev}</button><button type="button" data-f="next">${u.next}</button></div></div></div></aside></div><script type="application/json" id="products-data">${JSON.stringify(drawerData).replace(/</g, "\\u003c")}</script>`;
  return drawer;
}

// ---------- status vocabulary (shared by every data component) ----------
export const ST = {
  stated: { en: "Stated", ar: "معلن" },
  request: { en: "On request", ar: "عند الطلب" },
  pending: { en: "Pending verification", ar: "قيد التحقق" },
};
export const stPill = (lang, s) => `<span class="pill st-${s}"><i aria-hidden="true"></i>${ST[s][lang]}</span>`;

// Generic, industry-standard meaning of each analysis parameter (no company claims, no values).
export const PDEF = {
  "Protein (min.)": ["Crude protein content — the principal value parameter of fish meal.", "محتوى البروتين الخام — المؤشر الرئيسي لقيمة مسحوق السمك."],
  "Moisture (max.)": ["Water content; it affects stability in storage and transport.", "محتوى الماء؛ ويؤثر في الثبات أثناء التخزين والنقل."],
  "Fat": ["Residual oil remaining in the meal after pressing.", "الزيت المتبقي في المسحوق بعد العصر."],
  "Ash": ["The mineral fraction, read alongside protein when comparing marine meals.", "الجزء المعدني، ويُقرأ مع البروتين عند مقارنة أنواع المسحوق البحري."],
  "Salt": ["Sodium chloride content of the meal.", "محتوى كلوريد الصوديوم في المسحوق."],
  "TVN": ["Total volatile nitrogen — a widely used indicator of raw-material freshness.", "النيتروجين الطيّار الكلي — مؤشر شائع لطزاجة المادة الخام."],
  "Histamine": ["A biogenic amine monitored as a freshness indicator in fish-based ingredients.", "أمين حيوي يُراقب كمؤشر للطزاجة في المكونات السمكية."],
  "Free fatty acids (FFA)": ["Indicates hydrolysis of the oil; commonly specified for crude fish oil.", "يدل على تحلل الزيت؛ ويُحدَّد عادةً لزيت السمك الخام."],
  "Peroxide value (PV)": ["Measures primary oxidation of the oil.", "يقيس الأكسدة الأولية للزيت."],
  "Anisidine value": ["Measures secondary oxidation products.", "يقيس نواتج الأكسدة الثانوية."],
  "Moisture & impurities": ["Water and insoluble matter content of the oil.", "محتوى الماء والمواد غير الذائبة في الزيت."],
  "EPA + DHA": ["Long-chain fatty acids; values are reported only from verified analysis.", "أحماض دهنية طويلة السلسلة؛ لا تُذكر قيمها إلا من تحليل معتمد."],
};
export const PAR = {
  meal: [["Protein (min.)", "البروتين (حد أدنى)"], ["Moisture (max.)", "الرطوبة (حد أقصى)"], ["Fat", "الدهون"], ["Ash", "الرماد"], ["Salt", "الملح"], ["TVN", "النيتروجين الطيّار الكلي (TVN)"], ["Histamine", "الهيستامين"]],
  oil: [["Free fatty acids (FFA)", "الأحماض الدهنية الحرة (FFA)"], ["Peroxide value (PV)", "رقم البيروكسيد (PV)"], ["Anisidine value", "رقم الأنيسيدين"], ["Moisture & impurities", "الرطوبة والشوائب"], ["EPA + DHA", "EPA + DHA"]],
};

// ---------- specification sheet (replaces the plain table on product pages) ----------
export function specSheet(lang, p) {
  const u = UI[lang], ar = lang === "ar", L2 = (pair) => (ar ? pair[1] : pair[0]);
  const groups = [
    { id: "product", t: ar ? "المنتج" : "Product", rows: [
      { k: u.family, v: p.oil ? u.oil : u.fishmeal, s: "stated" },
      p.oil ? { k: u.form, v: u.crude, s: "stated" } : { k: u.grade, v: `${p.grade}%`, s: "stated" },
      { k: u.packing, v: p.oil ? u.drums : u.bags, s: "stated", note: p.oil ? u.capacityPending : "" },
      { k: u.rawMaterial, v: u.rawValue, s: "stated" },
      { k: u.application, v: u.appValue, s: "stated" },
    ] },
    { id: "analysis", t: ar ? "التحليل" : "Analysis parameters", rows: PAR[p.oil ? "oil" : "meal"].map((pr) => ({ k: L2(pr), s: "request", def: PDEF[pr[0]][ar ? 1 : 0] })) },
    { id: "docs", t: ar ? "المستندات" : "Documents", rows: [{ k: u.datasheet, s: "request" }, { k: u.coa, s: "pending" }] },
  ];
  const all = groups.flatMap((g) => g.rows), cnt = (s) => all.filter((r) => r.s === s).length;
  const seg = [["all", ar ? "الكل" : "All", all.length], ["stated", ST.stated[lang], cnt("stated")], ["request", ST.request[lang], cnt("request")], ["pending", ST.pending[lang], cnt("pending")]];
  const row = (r) => {
    const val = r.v ? `<span class="sv">${r.v}${r.note ? `<small>${r.note}</small>` : ""}</span>` : `<span class="sv dash" aria-hidden="true">—</span>`;
    const head = `<span class="sk">${r.k}</span>${val}${stPill(lang, r.s)}`;
    return r.def
      ? `<details class="srow" data-s="${r.s}"><summary>${head}<i class="chev" aria-hidden="true"></i></summary><p class="sd">${r.def}</p></details>`
      : `<div class="srow" data-s="${r.s}"><div class="srr">${head}<i class="chev ghost" aria-hidden="true"></i></div></div>`;
  };
  return `<div class="sheet" data-sheet>
  <div class="sheet-bar"><div class="seg" role="group" aria-label="${ar ? "تصفية حسب الحالة" : "Filter by status"}">${seg.map(([id, l, n], i) => `<button type="button" data-f="${id}" aria-pressed="${i ? "false" : "true"}">${l}<span>${n}</span></button>`).join("")}<span class="seg-ink" aria-hidden="true"></span></div>
  <p class="sheet-tip">${ar ? "افتح أي مؤشر تحليلي لمعرفة ما يقيسه." : "Open any analysis parameter to see what it measures."}</p></div>
  ${groups.map((g, gi) => `<section class="sgroup" data-g="${g.id}"><h3 class="sg-h"><span>0${gi + 1}</span>${g.t}<em>${g.rows.length}</em></h3>${g.rows.map(row).join("")}</section>`).join("")}
  <p class="sheet-empty" hidden>${ar ? "لا توجد بنود بهذه الحالة." : "No items with this status."}</p>
</div>`;
}

// ---------- product comparison (replaces the range table on the products hub) ----------
export function compare(lang) {
  const u = UI[lang], ar = lang === "ar";
  const rows = [
    [u.family, (p) => (p.oil ? u.oil : u.fishmeal)],
    [u.grade, (p) => (p.oil ? `<span class="na">${ar ? "لا ينطبق" : "Not applicable"}</span>` : `<span class="gbar" style="--g:${p.grade}"><b>${p.grade}%</b><i><em></em></i></span>`)],
    [ar ? "الحالة" : "Form", (p) => (p.oil ? (ar ? "زيت خام، من الذهبي إلى الكهرماني" : "Crude oil, golden to amber") : (ar ? "مسحوق ناعم متجانس" : "Fine, homogeneous powder"))],
    [u.packing, (p) => (p.oil ? `${u.drums}` : u.bags)],
    [u.datasheet, () => stPill(lang, "request")],
    [u.coa, () => stPill(lang, "pending")],
  ];
  return `<div class="cmp" data-cmp style="--n:${PRODUCTS.length}">
  <div class="cmp-grid" role="table" aria-label="${ar ? "مقارنة المنتجات" : "Product comparison"}">
    <div class="cmp-r cmp-h" role="row"><span class="cmp-k" role="columnheader"></span>${PRODUCTS.map((p, i) => `<span class="cmp-c cmp-top" role="columnheader" data-c="${i}"><a href="${prodHref(lang, p)}"><span class="cn">${p.oil ? (ar ? "زيت" : "Oil") : p.grade + "<small>%</small>"}</span><b>${p.name[lang]}</b><span class="go">${u.viewProduct} ${arr}</span></a></span>`).join("")}</div>
    ${rows.map(([k, f]) => `<div class="cmp-r" role="row"><span class="cmp-k" role="rowheader">${k}</span>${PRODUCTS.map((p, i) => `<span class="cmp-c" role="cell" data-c="${i}"><span class="cmp-ml">${k}</span>${f(p)}</span>`).join("")}</div>`).join("")}
  </div>
</div>`;
}

// ---------- readiness board (status lists with expandable meaning) ----------
export function board(lang, items, { title = "", s = "pending" } = {}) {
  const ar = lang === "ar";
  return `<div class="board">${title ? `<div class="board-h"><span>${title}</span><em>${items.length}</em></div>` : ""}${items.map(([k, d], i) => d
    ? `<details class="brow"><summary><span class="bn">${String(i + 1).padStart(2, "0")}</span><span class="bk">${k}</span>${stPill(lang, s)}<i class="chev" aria-hidden="true"></i></summary><p class="bd">${d}</p></details>`
    : `<div class="brow"><div class="br"><span class="bn">${String(i + 1).padStart(2, "0")}</span><span class="bk">${k}</span>${stPill(lang, s)}<i class="chev ghost" aria-hidden="true"></i></div></div>`).join("")}</div>`;
}
