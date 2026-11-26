import { UI, ALT } from "../content/content.mjs";
import { esc, L } from "../lib/html.mjs";
import { M, pic } from "../lib/media.mjs";
import { layout } from "../layouts/layout.mjs";
import { crumb } from "../components/blocks.mjs";

export const credits = (lang) => {
  const u = UI[lang], ar = lang === "ar";
  const photos = Object.entries(M).filter(([, v]) => v.kind === "photo"), ai = Object.entries(M).filter(([, v]) => v.kind === "ai");
  const body = `<section class="sec hero-plain"><div class="wrap prose" style="max-width:980px"><nav class="crumbs" aria-label="Breadcrumb">${crumb(lang, [u.credits])}</nav><div class="kicker hx-k">${ar ? "المصادر" : "Sources"}</div><h1 class="h1 split-h hero-s"><span class="ln bold"><span>${u.credits}</span></span></h1><p class="lede hx-l">${u.imgNote}</p><h2>${u.industryPhoto}</h2><p>${ar ? "صور من ويكيميديا كومنز، بعد تغيير أحجامها للعرض على الويب. لا تُظهر عمليات الخليج لصناعة الأسماك." : "Photographs from Wikimedia Commons, resized for web delivery. They do not show Alkhaleej Fish Manufacturing operations."}</p>${photos.map(([k, v]) => `<div class="credit" id="${k}">${pic(lang, k, { sizes: "160px", cap: false })}<p><b>${esc(L(ALT[k], lang))}</b><br>${ar ? "المصوّر" : "By"} ${esc(v.credit.artist)} · <a href="${esc(v.credit.licenseUrl || "#")}" rel="license noopener">${esc(v.credit.license)}</a> · <a href="${esc(v.credit.page)}" rel="noopener">${ar ? "المصدر" : "Source"}</a>${ar ? " · مُعدَّلة: تغيير الحجم" : " · Modified: resized"}</p></div>`).join("")}<h2>${u.illus}</h2><p>${ar ? `${ai.length} صورة مُنشأة بالذكاء الاصطناعي لهذا الموقع لأغراض توضيحية. لا تمثل منشآت الخليج أو منتجاته الفعلية، وستُستبدل بتصوير فعلي للشركة.` : `${ai.length} images were generated with AI for this website for illustrative purposes. They do not depict Alkhaleej’s actual facilities or products and will be replaced with authentic company photography.`}</p><h2>${ar ? "الهوية البصرية" : "Brand identity"}</h2><p>${ar ? "الشعار والرمز والنقش مأخوذة من دليل الهوية البصرية الرسمي." : "Logo, symbol and pattern taken from the official brand guidelines."}</p></div></section>`;
  return layout(lang, { key: "credits", title: `${u.credits} | ${u.brand}`, desc: u.credits, body });
};
