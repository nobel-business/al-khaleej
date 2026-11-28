import { CONTACT, UI, PRODUCTS } from "../content/content.mjs";
import { arr } from "../lib/html.mjs";
import { preload } from "../lib/media.mjs";
import { layout } from "../layouts/layout.mjs";
import { crumb, ENV, opBleed } from "../components/blocks.mjs";

export const contact = (lang) => {
  const u = UI[lang], ar = lang === "ar";
  const T = ar
    ? { required: "مطلوب", email: "أدخل بريدًا إلكترونيًا صحيحًا", phone: "أدخل رقم هاتف صحيحًا", fix: "يرجى استكمال الحقول المحددة.", consent: "يرجى الموافقة على التواصل معك.", sent: "سيفتح تطبيق البريد لديك برسالة موجّهة إلى " + CONTACT.email + ".", subject: "طلب عرض سعر", next: "متابعة", send: "تجهيز رسالة الاستفسار", stepNames: ["الخطوة 1 من 3 · المنتج والوجهة", "الخطوة 2 من 3 · الشركة", "الخطوة 3 من 3 · المراجعة والإرسال"],
        labels: [["product", "المنتج"], ["quantity", "الكمية"], ["frequency", "دورية الشحن"], ["country", "الدولة"], ["port", "ميناء الوصول"], ["company", "الشركة"], ["name", "الاسم"], ["email", "البريد"], ["phone", "الهاتف"]] }
    : { required: "Required", email: "Enter a valid email", phone: "Enter a valid phone number", fix: "Please complete the highlighted fields.", consent: "Please confirm consent to be contacted.", sent: "Your email app should now open with the inquiry addressed to " + CONTACT.email + ".", subject: "Quote request", next: "Continue", send: "Prepare inquiry email", stepNames: ["Step 1 of 3 · Product & destination", "Step 2 of 3 · Company", "Step 3 of 3 · Review & send"],
        labels: [["product", "Product"], ["quantity", "Quantity"], ["frequency", "Frequency"], ["country", "Country"], ["port", "Destination port"], ["company", "Company"], ["name", "Contact"], ["email", "Email"], ["phone", "Phone/WhatsApp"]] };
  const F = (id, label, attrs = "", req = false, w = false) => `<div class="f${w ? " w" : ""}"><label for="${id}">${label}${req ? " <i>*</i>" : ""}</label><input id="${id}" ${attrs}${req ? " required" : ""}><span class="err"></span></div>`;
  const body = `${opBleed(lang, { img: "harbour-vessel", short: true, env: ENV.dawn, crumbs: crumb(lang, [u.nav.contact]), kick: u.nav.contact, title: ar ? "حدّد احتياجك.\nاطلب عرض سعر." : "Specify.\nRequest a quote.", lede: ar ? "تبحث عن مسحوق سمك أو زيت سمك خام لمصنعك؟ أرسل استفسارك وسيتواصل معك فريقنا." : "Looking for fish meal or crude fish oil for your business? Send your inquiry and our team will follow up." })}
<section class="sec contact-sec" id="inquiry" data-env="${ENV.dawn}">
  <div class="wrap contact">
    <div><h2 class="kicker">${ar ? "تواصل مباشر" : "Direct contact"}</h2>
      <div class="lines" data-r="up"><a href="mailto:${CONTACT.email}"><span><small>${u.email}</small>${CONTACT.email}</span>${arr}</a>${CONTACT.phones.map((p) => `<a href="${CONTACT.wa(p)}" target="_blank" rel="noopener" aria-label="${lang === "ar" ? "محادثة واتساب" : "WhatsApp chat"} ${p.label}"><span><small>${lang === "ar" ? "واتساب" : "WhatsApp"}</small><span dir="ltr">${p.label}</span></span>${arr}</a>`).join("")}<div><span><small>${u.loc}</small>${u.location}</span><span class="chip v">${u.addressPending}</span></div></div></div>
    <form class="rfq" novalidate data-to="${CONTACT.email}">
      <div class="console-steps" aria-hidden="true"><span></span><span></span><span></span></div><div class="stepnm mono"></div>
      <div class="cpane"><div class="f w"><span class="lbl" style="font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-2);font-weight:500">${ar ? "المنتج" : "Product"} <i style="color:var(--chip);font-style:normal">*</i></span><div class="chips" role="radiogroup" aria-label="${ar ? "المنتج" : "Product"}" aria-describedby="prod-err">${PRODUCTS.map((p) => `<label><input type="radio" name="product" value="${p.name.en}"><span>${p.name[lang]}</span></label>`).join("")}</div><span class="err" id="prod-err"></span></div>
        ${F("f-qty", ar ? "الكمية" : "Quantity", `name="quantity" placeholder="${ar ? "مثال: طن لكل شحنة" : "e.g. tonnes per shipment"}"`)}
        <div class="f"><label for="f-freq">${ar ? "دورية الشحن" : "Frequency"}</label><select id="f-freq" name="frequency"><option value="">${ar ? "اختر" : "Select"}</option><option>${ar ? "مرة واحدة" : "One-off"}</option><option>${ar ? "شهري" : "Monthly"}</option><option>${ar ? "عقد" : "Contract"}</option></select><span class="err"></span></div>
        ${F("f-country", ar ? "الدولة" : "Destination country", 'name="country" autocomplete="country-name"', true)}${F("f-port", ar ? "ميناء الوصول" : "Destination port", 'name="port"')}</div>
      <div class="cpane">${F("f-company", ar ? "الشركة" : "Company", 'name="company" autocomplete="organization"', true)}${F("f-name", ar ? "اسم المسؤول" : "Contact name", 'name="name" autocomplete="name"', true)}${F("f-email", ar ? "بريد العمل الإلكتروني" : "Business email", 'name="email" type="email" autocomplete="email" dir="ltr"', true)}${F("f-phone", ar ? "الهاتف / واتساب" : "Phone / WhatsApp", 'name="phone" type="tel" autocomplete="tel" dir="ltr"')}<div class="f w"><label for="f-msg">${ar ? "المتطلبات" : "Requirements"}</label><textarea id="f-msg" name="message" placeholder="${ar ? "التعبئة، المستندات المطلوبة، موعد التسليم…" : "Packing, documents required, delivery window…"}"></textarea></div></div>
      <div class="cpane"><dl class="review"></dl><label class="consent"><input type="checkbox" name="consent"> <span>${ar ? "أوافق على أن يستخدم الخليج لصناعة الأسماك هذه البيانات للرد على استفساري." : "I agree that Alkhaleej Fish Manufacturing may use these details to respond to my inquiry."}</span></label></div>
      <div class="pnav"><button type="button" class="btn line" data-back style="visibility:hidden">${ar ? "رجوع" : "Back"}</button><button type="button" class="btn primary" data-fwd>${ar ? "متابعة" : "Continue"} ${arr}</button></div>
      <p class="formnote">${ar ? "لا يحفظ الموقع بياناتك: يفتح الإرسال تطبيق البريد لديك برسالة موجّهة إلى " + CONTACT.email + "." : "The website does not store your details: the final step opens your email app with the inquiry addressed to " + CONTACT.email + "."}</p>
      <p class="formmsg" role="status" aria-live="polite"></p>
    </form>
  </div>
</section>
<script type="application/json" id="form-i18n">${JSON.stringify(T)}</script>`;
  return layout(lang, { key: "contact", over: true, preloadImg: preload("harbour-vessel", { fill: 0.62, mfill: 0.62 }), title: ar ? "تواصل معنا | الخليج لصناعة الأسماك" : "Contact | Alkhaleej Fish Manufacturing", desc: ar ? "اطلب عرض سعر لمسحوق السمك أو زيت السمك الخام." : "Request a quote for fish meal or crude fish oil.", body });
};
