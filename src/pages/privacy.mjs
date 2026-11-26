import { CONTACT, UI } from "../content/content.mjs";
import { layout } from "../layouts/layout.mjs";
import { crumb } from "../components/blocks.mjs";

export const privacy = (lang) => {
  const u = UI[lang], ar = lang === "ar";
  const body = `<section class="sec hero-plain"><div class="wrap prose"><nav class="crumbs" aria-label="Breadcrumb">${crumb(lang, [u.privacy])}</nav><div class="kicker hx-k">${ar ? "قانوني" : "Legal"}</div><h1 class="h1 split-h hero-s"><span class="ln bold"><span>${u.privacy}</span></span></h1><p class="lede hx-l">${ar ? "إشعار الخصوصية الكامل قيد المراجعة القانونية وسيُنشر هنا." : "The full privacy notice is under legal review and will be published here."}</p><h2>${ar ? "كيف يعمل نموذج الاستفسار حاليًا" : "How the inquiry form works today"}</h2><ul><li>${ar ? "لا يرسل النموذج بياناتك إلى أي خادم ولا يخزنها." : "The form does not send your details to any server and does not store them."}</li><li>${ar ? "عند الإرسال، يفتح تطبيق البريد على جهازك برسالة جاهزة موجّهة إلى " : "On submit, your device’s email app opens with a pre-filled message addressed to "}<a href="mailto:${CONTACT.email}">${CONTACT.email}</a>.</li><li>${ar ? "لا يستخدم الموقع ملفات تعريف ارتباط للتتبع أو أدوات تحليل." : "The website uses no tracking cookies or analytics tools."}</li></ul><h2>${ar ? "للاستفسار" : "Questions"}</h2><p>${ar ? "راسلنا على " : "Write to "}<a href="mailto:${CONTACT.email}">${CONTACT.email}</a>.</p></div></section>`;
  return layout(lang, { key: "privacy", title: `${u.privacy} | ${u.brand}`, desc: u.privacy, body });
};
