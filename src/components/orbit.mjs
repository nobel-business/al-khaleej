import fs from "node:fs"; import path from "node:path";
import { ASSETS } from "../lib/paths.mjs";

// ---------- three-fish orbit: the three fish of the official symbol, isolated from the brand book ----------
// brand/symbol-fish.json: traced from DATA/AL KHALEEJ BD.pdf p.11 (largest rendering of the icon); each fish is its own path
export const SYMF = JSON.parse(fs.readFileSync(path.join(ASSETS, "brand", "symbol-fish.json"), "utf8"));
export const FISH_SVG = (k) => { const f = SYMF.fish[k], [x0, y0, x1, y1] = f.bbox, p = 2;
  return `<svg class="fish-svg" viewBox="${x0 - p} ${y0 - p} ${x1 - x0 + 2 * p} ${y1 - y0 + 2 * p}" aria-hidden="true" focusable="false"><path d="${f.d}" fill="currentColor" fill-rule="evenodd"/></svg>`; };
export const FISH_DATA = (k) => { const f = SYMF.fish[k], [x0, y0, x1, y1] = f.bbox, p = 2;
  return `data-geo="${[x0 - p, y0 - p, x1 - x0 + 2 * p, y1 - y0 + 2 * p, f.c[0], f.c[1], f.theta, f.r].map((v) => +(+v).toFixed(3)).join(",")}"`; };
export const MEANINGS = {
  en: [["Unity", "Three fish moving together in one circle."], ["Harmony", "Equal spacing, one shared path."], ["The cycle of life", "The cyclical nature of life — and abundance, a plentiful harvest."]],
  ar: [["الوحدة", "ثلاث سمكات تتحرك معًا في دائرة واحدة."], ["الانسجام", "مسافات متساوية ومسار واحد مشترك."], ["دورة الحياة", "الطبيعة الدورية للحياة — والوفرة والحصاد الوفير."]],
};
export function orbit(lang, { interactive = true, size = "" } = {}) {
  const M = MEANINGS[lang];
  const fish = [0, 1, 2].map((i) => interactive
    ? `<button type="button" class="fish" data-i="${i}" ${FISH_DATA(i)} aria-pressed="false" aria-label="${M[i][0]}">${FISH_SVG(i)}</button>`
    : `<span class="fish" data-i="${i}" ${FISH_DATA(i)}>${FISH_SVG(i)}</span>`).join("");
  return `<div class="orbit${size ? " orbit-" + size : ""}" data-orbit data-sym="${SYMF.symbol.w},${SYMF.symbol.h},${SYMF.symbol.cx},${SYMF.symbol.cy}"${interactive ? "" : ' aria-hidden="true"'}>
  <svg class="orbit-path" aria-hidden="true" focusable="false"><ellipse/></svg>
  ${fish}
</div>`;
}
export function orbitMeanings(lang) {
  const M = MEANINGS[lang];
  return `<div class="meanings" role="group" aria-label="${lang === "ar" ? "معاني الرمز" : "Meanings of the symbol"}">${M.map(([t, d], i) => `<button type="button" class="meaning" data-i="${i}" aria-pressed="false"><span class="mn">0${i + 1}</span><span class="mt"><b>${t}</b><small>${d}</small></span></button>`).join("")}</div>`;
}
