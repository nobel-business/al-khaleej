import { UI } from "../content/content.mjs";
import { lines } from "../lib/html.mjs";
import { href } from "../lib/routes.mjs";
import { pic } from "../lib/media.mjs";

// ---------- shared blocks ----------
export const kicker = () => "";   // section labels removed: every heading stands on its own
export const h2 = (t, cls = "h2") => `<h2 class="${cls}" data-lines>${lines(t)}</h2>`;
export const crumb = (lang, items) => [`<a href="${href(lang, "home")}">${UI[lang].home}</a>`, ...items].join(" <span aria-hidden=\"true\">/</span> ");
export const ENV = { dawn: "#F7F2EA", mist: "#E9EEEC", steel: "#EDECE8", sand: "#F1E7D7", amber: "#F4E8D4", paper: "#FBF8F3" };
export const SL = (lang) => (lang === "ar" ? "مسار الزيت" : "Oil stream"), ML = (lang) => (lang === "ar" ? "مسار المسحوق" : "Meal stream");
export function ctaBand() { return ""; }   // the closing invitation now lives in the footer

// ---------- shared hero family ----------
// One anatomy for every page opening: crumbs → kicker → split headline (thin / bold) → lede → actions.
// Compositions differ (full bleed, framed, short band) but type, mist, motion and spacing are shared.
export function heroCopy(lang, { crumbs, kick, title, lede, actions = "", size = "hero-l", tag = "h1" }) {
  const t = title.split("\n").map((x, i) => `<span class="ln ${i ? "bold" : "thin"}"><span>${x}</span></span>`).join(" ");
  return `<nav class="crumbs" aria-label="Breadcrumb">${crumbs}</nav><${tag} class="h1 split-h ${size}">${t}</${tag}>${lede ? `<p class="lede hx-l">${lede}</p>` : ""}${actions ? `<div class="hx-a">${actions}</div>` : ""}`;
}
export function opBleed(lang, { img, crumbs, kick, title, lede, actions = "", env = ENV.dawn, short = false }) {
  return `<section class="op-bleed hf${short ? " short" : ""}" data-env="${env}">${pic(lang, img, { eager: true, priority: true, px: 0.06, fill: short ? 0.62 : 1, mfill: 0.62 })}<div class="in">${heroCopy(lang, { crumbs, kick, title, lede, actions, size: short ? "hero-m" : "hero-l" })}</div></section>`;
}
