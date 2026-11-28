import { PRODUCTS, STAGES, PARAMS, ALT } from "../content/content.mjs";
import { esc, L, arr } from "../lib/html.mjs";
import { prodHref, href } from "../lib/routes.mjs";
import { M, pic, imgUrl } from "../lib/media.mjs";
import { SL, ML } from "./blocks.mjs";

// node: [stepIndex, x, y, branch, order (0..1 of scrub), labelBelow]
export const NODES = [[0, 110, 170, "main", 0, 1], [1, 400, 170, "main", 0.36, 1],
  [3, 800, 80, "meal", 0.72, 0], [4, 1120, 80, "meal", 1, 0],
  [2, 800, 260, "oil", 0.72, 1], [4, 1120, 260, "oil", 1, 1]];
export function streamsSVG(lang, { scrub = false } = {}) {
  const ar = lang === "ar", W = 1200, mx = (x) => (ar ? W - x : x), anchor = ar ? "end" : "start";
  const tdir = ar ? ' direction="rtl"' : "", flipA = (a) => (ar ? ({ start: "end", end: "start" }[a] || a) : a);
  const lab = (s, branch) => (s === 4 ? (branch === "oil" ? (ar ? "براميل" : "Drums") : (ar ? "أكياس 50 كجم" : "50 kg bags")) : STAGES[s].t[lang]);
  const P = (dd) => dd.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (m, x, y) => `${mx(+x)} ${y}`);
  const main = P("M110 170 L470 170"), meal = P("M470 170 C540 170 540 80 620 80 L1120 80"), oil = P("M470 170 C540 170 540 260 620 260 L1120 260");
  const nodes = NODES.map(([s, x, y, br, o, below], i) => `<circle class="node${br === "oil" ? " oil" : ""}${scrub ? "" : " on"}" cx="${mx(x)}" cy="${y}" r="7" data-i="${i}" data-o="${o}" data-s="${s}" data-b="${br}"${scrub ? "" : ` tabindex="0" role="button" aria-label="${String(s + 1).padStart(2, "0")} ${lab(s, br)}"`}/><text class="n" x="${mx(x)}" y="${below ? y + 30 : y - 30}" text-anchor="middle"${tdir}>${String(s + 1).padStart(2, "0")}</text><text x="${mx(x)}" y="${below ? y + 48 : y - 14}" text-anchor="middle"${tdir}>${lab(s, br)}</text>`).join("");
  const h = `<svg class="h" viewBox="0 0 1200 352" role="img" aria-label="${ar ? "مخطط المسارين" : "Two-stream process diagram"}"><path class="base" d="${main}"/><path class="base" d="${meal}"/><path class="base" d="${oil}"/><path class="ink main" d="${main}"/><path class="ink meal" d="${meal}"/><path class="ink oil" d="${oil}"/>${nodes}<text class="t" x="${mx(620)}" y="22" text-anchor="${flipA(anchor)}"${tdir}>${ar ? "كعكة العصر ← مسحوق السمك" : "Press cake → fish meal"}</text><text class="t" x="${mx(620)}" y="346" text-anchor="${flipA(anchor)}"${tdir}>${ar ? "سائل العصر ← زيت السمك الخام" : "Press liquor → crude fish oil"}</text></svg>`;
  const vx = (x) => (ar ? 400 - x : x), cx = 200, L1 = 70, R1 = 330, s = STAGES.map((x) => x.t[lang]);
  const vn = (x, y, i, l, oil = false, side = "r") => { const tx = side === "r" ? vx(x) + (ar ? -16 : 16) : vx(x) + (ar ? 16 : -16); const nn = String(i).padStart(2, "0"); if (ar) { const an = side === "r" ? "start" : "end"; return `<circle class="node on${oil ? " oil" : ""}" cx="${vx(x)}" cy="${y}" r="7"/><text x="${tx}" y="${y + 5}" text-anchor="${an}" direction="rtl">${side === "r" ? `${nn}  ${l}` : `${l}  ${nn}`}</text>`; } const an = side === "r" ? "start" : "end"; return `<circle class="node on${oil ? " oil" : ""}" cx="${vx(x)}" cy="${y}" r="7"/><text x="${tx}" y="${y + 5}" text-anchor="${an}">${an === "end" ? `${l}  ${nn}` : `${nn}  ${l}`}</text>`; };
  const v = `<svg class="v" viewBox="0 0 400 680" role="img" aria-label="${ar ? "مخطط المسارين" : "Two-stream process diagram"}"><path class="base" d="M${vx(cx)} 30 V270 C${vx(cx)} 330 ${vx(L1)} 320 ${vx(L1)} 380 V650"/><path class="base" d="M${vx(cx)} 270 C${vx(cx)} 330 ${vx(R1)} 320 ${vx(R1)} 380 V650"/><path class="ink meal" style="stroke:var(--navy)" d="M${vx(cx)} 30 V270 C${vx(cx)} 330 ${vx(L1)} 320 ${vx(L1)} 380 V650"/><path class="ink oil" d="M${vx(cx)} 270 C${vx(cx)} 330 ${vx(R1)} 320 ${vx(R1)} 380 V650"/>${vn(cx, 60, 1, s[0])}${vn(cx, 220, 2, s[1])}${vn(L1, 440, 4, s[3])}${vn(L1, 630, 5, ar ? "أكياس 50 كجم" : "50 kg bags")}${vn(R1, 490, 3, s[2], true, "l")}${vn(R1, 630, 5, ar ? "براميل" : "Drums", true, "l")}</svg>`;
  if (scrub) return `<div class="streams scrub">${h}${v}</div>`;
  const data = STAGES.map((x, i) => ({ k: String(i + 1).padStart(2, "0"), t: x.t[lang], d: x.d[lang], s: x.stream }));
  const streamLabel = { main: ar ? "المُدخل" : "Input", split: ar ? "نقطة الانقسام" : "Split", oil: SL(lang), meal: ML(lang), both: ar ? "المساران" : "Both streams" };
  return `<div class="streams live" data-flow>${h}${v}<script type="application/json" class="st-data">${JSON.stringify({ steps: data, labels: streamLabel })}</script><div class="st-cap" aria-live="polite"><span class="k">${ar ? "مخطط تفاعلي" : "Interactive"}</span><div><b>${ar ? "اختر مرحلة" : "Select a stage"}</b><p>${ar ? "مرّر المؤشر أو انقر على أي مرحلة لعرض ما يجري فيها والمسار الذي تتبعه." : "Hover, tap or tab to any stage to see what happens there and which stream it belongs to."}</p></div></div></div>`;
}
export const bezel = (k, cls = "") => { let t = ""; for (let i = 0; i < 48; i++) { const a = (i * 7.5 * Math.PI) / 180, r1 = i % 6 ? 21 : 18; t += `<line x1="${(26 + r1 * Math.cos(a)).toFixed(1)}" y1="${(26 + r1 * Math.sin(a)).toFixed(1)}" x2="${(26 + 24 * Math.cos(a)).toFixed(1)}" y2="${(26 + 24 * Math.sin(a)).toFixed(1)}" stroke="#0C3048" stroke-opacity="${i % 6 ? 0.25 : 0.6}"/>`; } return `<svg viewBox="0 0 52 52" aria-hidden="true">${t}<circle cx="26" cy="26" r="13" fill="none" stroke="#0C3048" stroke-opacity=".2"/><circle class="sw" cx="26" cy="26" r="24" fill="none" stroke-width="3" stroke-linecap="round" transform="rotate(${-90 + k * 90} 26 26)"/></svg>`; };
export function gauges(lang) { return `<div class="gauges">${PARAMS.map((p, i) => `<div class="gauge" style="transition-delay:${i * 90}ms">${bezel(i)}<div><b>${p.t[lang]}</b><p>${p.d[lang]}</p></div></div>`).join("")}</div>`; }
export const loupe = (lang, img, { col = 55, box = 4 / 3.4, tip = null } = {}) => { const m = M[img]; const big = m.widths[m.widths.length - 1]; return `<div class="loupe" data-src="${imgUrl(img, big, "jpg")}" data-focal="${m.focal}" role="img" aria-label="${esc(L(ALT[img], lang))}">${pic(lang, img, { col, box })}<span class="lens" aria-hidden="true"></span><span class="tip mono">${tip || (lang === "ar" ? "مرّر المؤشر لتفحّص نعومة المسحوق" : "Move over the powder to inspect its fineness")}</span></div>`; };
export function dialBlock(lang, start = 2, fixed = null) {
  const ar = lang === "ar", G = PRODUCTS.filter((p) => !p.oil).map((p) => ({ g: p.grade, name: p.name[lang], url: prodHref(lang, p), cta: ar ? `عرض ${p.name.ar}` : `View ${p.name.en}` }));
  return `<div class="dial-wrap" data-start="${start}"><script type="application/json">${JSON.stringify(G)}</script>
  <div class="dial" role="slider" tabindex="0" aria-label="${ar ? "درجة البروتين" : "Protein grade"}" aria-valuemin="60" aria-valuemax="72" aria-valuenow="65"><svg viewBox="0 0 240 240" aria-hidden="true"></svg></div>
  <div class="readout" aria-live="polite"><div class="mono">${ar ? "درجة البروتين" : "Protein grade"}</div><div class="val">65<small>%</small></div><div class="nm"></div>
  <div class="grades" role="group" aria-label="${ar ? "الدرجات" : "Grades"}">${G.map((g) => `<button type="button" aria-pressed="false">${g.g}%</button>`).join("")}</div>
  <p style="margin-top:18px">${fixed ? `<a class="link" href="${fixed.url}"><span>${fixed.label}</span> ${arr}</a>` : `<a class="link" data-grade-link href="${G[start].url}"><span>${G[start].cta}</span> ${arr}</a>`}</p></div></div>`;
}

/* crude fish oil dial — same component and structure as the protein dial, driven by the client's crude fish oil
   specification (supplied 28 Nov 2026). Each parameter has its own gauge scale; EPA + DHA is a range. */
export function oilDial(lang, url) {
  const ar = lang === "ar", T = (e, a) => (ar ? a : e);
  // client references (28 Nov 2026): name above, value, code/unit below; each parameter on its own scale, needle on the value
  // [chip, name en, name ar, comparator, value text, unit beside the figure, line below, needle value, lo, hi, major]
  const rows = [
    ["FFA", "Free fatty acids", "الأحماض الدهنية الحرة", "≤", "5", "%", "FFA", 5, 0, 10, 2.5],
    ["PV", "Peroxide value", "رقم البيروكسيد", "≤", "10", "", "meq O₂/kg", 10, 0, 20, 5],
    ["p-AV", "Anisidine value", "رقم الأنيسيدين", "≤", "30", "", "p-AV", 30, 0, 60, 15],
    ["TOTOX", "Total oxidation", "الأكسدة الكلية", "≤", "50", "", "TOTOX", 50, 0, 100, 25],
    ["MI", "Moisture & impurities", "الرطوبة والشوائب", "≤", "1", "%", "MI", 1, 0, 2, 0.5],
    ["EPA+DHA", "EPA + DHA content", "محتوى EPA + DHA", "", "15–25", "%", "EPA+DHA", [15, 25], 10, 30, 5],
  ];
  const items = rows.map(([chip, en, a, cmp, num, unit, below, v, lo, hi, major]) => ({
    chip, title: T(en, a), name: below, v, lo, hi, major, step: major / 5, long: Array.isArray(v),
    disp: `${cmp ? `<span class="le">${cmp}</span>` : ""}<span class="n" dir="ltr">${num}</span>${unit ? `<small>${unit}</small>` : ""}`,
    aria: `${T(en, a)} (${chip}): ${cmp}${num}${unit}${below.includes("/") ? " " + below : ""}` }));
  const cfg = { hub: true, items };
  const f = items[0];
  return `<div class="dial-wrap oil-dial" data-start="0"><script type="application/json">${JSON.stringify(cfg)}</script>
  <div class="dial" role="slider" tabindex="0" aria-label="${T("Crude fish oil specification", "مواصفات زيت الأسماك الخام")}" aria-valuemin="0" aria-valuemax="10" aria-valuenow="5"><svg viewBox="0 0 240 240" aria-hidden="true"></svg></div>
  <div class="readout" aria-live="polite"><div class="mono">${f.title}</div><div class="val" dir="${ar ? "rtl" : "ltr"}">${f.disp}</div><div class="nm" dir="ltr">${f.name}</div>
  <div class="grades" role="group" aria-label="${T("Specification", "المواصفات")}">${items.map((g) => `<button type="button" aria-pressed="false">${g.chip}</button>`).join("")}</div>
  <p style="margin-top:18px"><a class="link" href="${url}"><span>${T("Discover our products", "اكتشف منتجاتنا")}</span> ${arr}</a></p></div></div>`;
}
