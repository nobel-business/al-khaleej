import fs from "node:fs"; import path from "node:path";
import { ASSETS } from "./paths.mjs";

// image manifest written by scripts/images.py
export const M = JSON.parse(fs.readFileSync(path.join(ASSETS, "images", "manifest.json"), "utf8"));
import { UI, ALT } from "../content/content.mjs";
import { esc, L } from "./html.mjs";

// ---------- picture ----------
export function pic(lang, name, { sizes = "100vw", fill = 0, mfill = 0, col = 0, mcol = 100, box = 0, eager = false, priority = false, cap = true, px = 0, cls = "", reveal = "", style = "" } = {}) {
  const m = M[name]; if (!m) throw new Error("missing image " + name);
  const a = m.w / m.h;
  if (fill) { // full-bleed box: 100vw wide, fill × viewport-height tall, object-fit:cover
    const mq = (f) => `(max-aspect-ratio:${Math.round(a * f * 1000)}/1000) ${Math.ceil(a * f * 100)}vh`;
    sizes = `(max-width:640px) and ${mq(mfill || fill).replace(/\) /, ") ")}, (max-width:640px) 100vw, ${mq(fill)}, 100vw`;
  } else if (col) { // column box with known aspect (w/h): cover needs max(1, imgAspect/boxAspect) × column width
    const f = box ? Math.max(1, a / box) : 1;
    sizes = `(max-width:980px) ${Math.ceil(mcol * f)}vw, ${Math.ceil(col * f)}vw`;
  }
  const set = (ext) => m.widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(", ");
  const mid = m.widths[Math.min(m.widths.length - 1, Math.floor(m.widths.length / 2))];
  const h = Math.round((m.h * m.widths[m.widths.length - 1]) / m.w);
  const alt = L(ALT[name], lang) || "";
  const altFull = m.kind === "ai" ? `${alt} (${UI[lang].illus})` : alt;
  let capHtml = "";
  if (cap) {
    // visitor-facing caption overlays removed — disclosure is site-wide (footer) and attribution is on /credits/
  }
  return `<figure class="media ${cls}"${reveal ? ` data-r="${reveal}"` : ""}${px ? ` data-px="${px}"` : ""}${style ? ` style="${style}"` : ""}><picture>` +
    `<source type="image/avif" srcset="${set("avif")}" sizes="${sizes}"><source type="image/webp" srcset="${set("webp")}" sizes="${sizes}">` +
    `<img src="/img/${name}-${mid}.jpg" srcset="${set("jpg")}" sizes="${sizes}" width="${m.widths[m.widths.length - 1]}" height="${h}" alt="${esc(altFull)}" style="object-position:${m.focal}" decoding="async"${eager ? "" : ' loading="lazy"'}${priority ? ' fetchpriority="high"' : ""}></picture>${capHtml}</figure>`;
}
export const preload = (name, sizes) => { if (typeof sizes === 'object') sizes = sizesFor(name, sizes); const m = M[name]; return `<link rel="preload" as="image" type="image/avif" fetchpriority="high" imagesrcset="${m.widths.map((w) => `/img/${name}-${w}.avif ${w}w`).join(", ")}" imagesizes="${sizes}">`; };

export function sizesFor(name, o) { const m = M[name], a = m.w / m.h; const mq = (f) => `(max-aspect-ratio:${Math.round(a * f * 1000)}/1000) ${Math.ceil(a * f * 100)}vh`; return `(max-width:640px) and ${mq(o.mfill || o.fill)}, (max-width:640px) 100vw, ${mq(o.fill)}, 100vw`; }

// ---------- Direction A specimen images (docs/phase-02/assets/fl/spec-*: the approved shelf photographs) ----------
export const SPEC = { "fish-meal-60": ["spec-60", [360, 600, 604]], "fish-meal-62": ["spec-62", [360, 540]], "fish-meal-66": ["spec-66", [360, 540]], "fish-meal-65": ["spec-65", [360, 600, 754]], "fish-meal-72": ["spec-72", [360, 535]], "crude-fish-oil": ["spec-oil", [360, 600, 610]] };
export const specPic = (lang, p, style = "") => { const [n, ws] = SPEC[p.slug], set = (e) => ws.map((w) => `/assets/spec/${n}-${w}.${e} ${w}w`).join(", "), sz = "(max-width:980px) 46vw, 27vh";
  return `<figure class="media"${style ? ` style="${style}"` : ""}><picture><source type="image/avif" srcset="${set("avif")}" sizes="${sz}"><source type="image/webp" srcset="${set("webp")}" sizes="${sz}"><img src="/assets/spec/${n}-360.jpg" srcset="${set("jpg")}" sizes="${sz}" width="600" height="800" alt="${esc(L(ALT[p.img], lang) || p.name[lang])} (${UI[lang].illus})" decoding="async"></picture></figure>`; };
