import { CONTACT, UI, PRODUCTS } from "../content/content.mjs";
import { CSS, JS_URL } from "../lib/bundle.mjs";
import { esc, arr } from "../lib/html.mjs";
import { R, href, prodHref } from "../lib/routes.mjs";

// ---------- layout ----------
export function layout(lang, { key, title, desc, body, over = false, preloadImg = "", drawer = "", rail = null }) {
  const u = UI[lang], o = u.other;
  const self = `/${lang}/${R[key] ?? key}`, alt = `/${o}/${R[key] ?? key}`;
  const cur = (k) => (k === key || (k === "products" && String(key).startsWith("products/")) ? ' aria-current="page"' : "");
  const navLinks = [["about", u.nav.about], ["raw", u.nav.raw], ["mfg", u.nav.mfg], ["products", u.nav.products], ["quality", u.nav.quality], ["intl", u.nav.intl], ["contact", u.nav.contact]];
  const ld = { "@context": "https://schema.org", "@type": "Organization", name: "Alkhaleej Fish Manufacturing", alternateName: "الخليج لصناعة الأسماك", foundingDate: "2025", email: CONTACT.email, telephone: CONTACT.phones.map((p) => p.tel), address: { "@type": "PostalAddress", addressRegion: "Kafr El-Sheikh", addressCountry: "EG" } };
  return `<!DOCTYPE html>
<html lang="${lang}" dir="${u.dir}" class="js-off">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#F7F2EA">
<link rel="canonical" href="${self}">
<link rel="alternate" hreflang="${lang}" href="${self}"><link rel="alternate" hreflang="${o}" href="${alt}"><link rel="alternate" hreflang="x-default" href="/en/${R[key] ?? key}">
<meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:locale" content="${lang === "ar" ? "ar_EG" : "en_US"}">
<link rel="icon" href="/assets/brand/icon-orange.png" type="image/png">
<link rel="preload" href="/assets/fonts/${lang === "ar" ? "cairo-arabic" : "montserrat-latin"}.woff2" as="font" type="font/woff2" crossorigin>
${preloadImg}
<style>${CSS}</style>
${lang === "ar" ? `<script>(function(d){var h=d.documentElement;if(!d.fonts||!d.fonts.load)return;h.classList.add("fl");var k=function(){h.classList.remove("fl")};Promise.all([d.fonts.load("600 1em Cairo","العربية"),d.fonts.load("500 1em Montserrat","2025")]).then(k,k);setTimeout(k,900)})(document)</script>` : ""}
<script type="speculationrules">{"prefetch":[{"where":{"href_matches":"/*"},"eagerness":"moderate"}]}</script>
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<a class="skip" href="#main">${u.skip}</a>
<header class="top${over ? " over" : " solid"}">
  <div class="bar">
    <a class="brand" href="${href(lang, "home")}" aria-label="${esc(u.brand)} — ${u.home}"><img src="/assets/brand/logo-primary.png" width="1013" height="264" alt="الخليج لصناعة الأسماك — Alkhaleej Fish Manufacturing"></a>
    <nav class="nav" aria-label="${u.menu}">
      <a class="nav-home" href="${href(lang, "home")}"${cur("home")}>${u.home}</a>
      ${navLinks.map(([k, l]) => `<a href="${href(lang, k)}"${cur(k)}>${l}</a>`).join("")}
    </nav>
    <div class="tools">
      <a class="lang" href="${alt}" hreflang="${o}" lang="${o}"><span${o === "ar" ? ' class="ar"' : ""}>${u.otherLabel}</span></a>
      <a class="btn primary hide-md" href="${href(lang, "contact")}#inquiry">${u.quote}</a>
      <button class="burger" type="button" aria-label="${u.menu}" aria-expanded="false" aria-controls="mnav"><i></i><i></i></button>
    </div>
  </div>
</header>
<nav class="mnav" id="mnav" aria-label="${u.menu}">
  <a href="${href(lang, "home")}"${cur("home")}>${u.home}${arr}</a>
  ${navLinks.map(([k, l]) => `<a href="${href(lang, k)}"${cur(k)}>${l}${arr}</a>`).join("")}
  <a class="btn primary" href="${href(lang, "contact")}#inquiry">${u.quote}</a>
</nav>
<main id="main">
${body}
</main>
${drawer}
<footer class="ft">
  <span class="ft-pat" aria-hidden="true"></span><span class="ft-light" aria-hidden="true"></span><span class="ft-light l2" aria-hidden="true"></span>
  <div class="wrap">
    ${key === "contact" ? "" : `<div class="ft-cta"><div><h2 class="ft-h">${lang === "ar" ? "لنتحدث عن احتياجاتكم من التوريد." : "Let’s talk about your supply needs."}</h2><p>${lang === "ar" ? "تواصلوا مع فريقنا لمناقشة متطلباتكم من البروتين والزيوت البحرية، والمواصفات والكميات وخيارات التوريد." : "Contact our team to discuss your marine protein and oil requirements, specifications, volumes and supply options."}</p></div><div class="ft-acts"><a class="btn primary" href="${href(lang, "contact")}#inquiry">${u.quote} ${arr}</a><a class="btn ft-glass ft-mail" href="${href(lang, "contact")}"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.8 6.6l8.2 6.1 8.2-6.1"/></svg><span>${u.nav.contact}</span></a></div></div>`}
    <div class="ft-main">
      <div class="ft-brand"><a href="${href(lang, "home")}" aria-label="${esc(u.brand)} — ${u.home}"><img src="/assets/brand/logo-reversed.png" width="635" height="169" alt="الخليج لصناعة الأسماك" loading="lazy"></a><p>${u.footerLine.split("\n").join("<br>")}</p><span class="ft-loc"><i aria-hidden="true"></i>${u.location}</span></div>
      <div class="ft-contact">
        <a class="ft-card" href="mailto:${CONTACT.email}"><span class="ft-k">${lang === "ar" ? "البريد الإلكتروني" : "Email"}</span><span class="ft-v">${CONTACT.email}</span>${arr}</a>
        ${CONTACT.phones.map((p) => `<a class="ft-card" href="tel:${p.tel}"><span class="ft-k">${lang === "ar" ? "الهاتف" : "Phone"}</span><span class="ft-v" dir="ltr">${p.label}</span>${arr}</a>`).join("")}
      </div>
      <nav class="ft-nav" aria-label="${u.brand}">
        <div class="ft-links"><span>${lang === "ar" ? "استكشف الخليج" : "Explore Alkhaleej"}</span>${[["about", u.nav.about], ["raw", u.nav.raw], ["mfg", lang === "ar" ? "عمليات التصنيع" : "Manufacturing processes"], ["quality", u.nav.quality], ["intl", u.nav.intl]].map(([k, l]) => `<a href="${href(lang, k)}"${cur(k)}>${l}</a>`).join("")}</div>
        <div class="ft-prods"><span>${u.nav.products}</span>${PRODUCTS.map((p) => `<a href="${prodHref(lang, p)}">${p.name[lang]}</a>`).join("")}</div>
      </nav>
    </div>
    <div class="ft-legal"><span>© <span data-year>2026</span> ${u.brand} · ${u.legal}</span><span><a href="${href(lang, "privacy")}">${u.privacy}</a> · <a href="${href(lang, "credits")}">${u.credits}</a></span></div>
  </div>
</footer>
<script src="${JS_URL}" defer></script>
</body>
</html>`;
}
