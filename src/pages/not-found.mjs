import { arr } from "../lib/html.mjs";
import { layout } from "../layouts/layout.mjs";

export const notFound = () => layout("en", { key: "404", title: "Page not found | Alkhaleej Fish Manufacturing", desc: "Page not found", body: `<section class="sec" style="padding-top:170px;min-height:70svh"><div class="wrap"><div class="kicker">404</div><h1 class="h1" style="margin-top:18px">Page not found.</h1><p class="lede ar" dir="rtl" lang="ar" style="margin-top:12px;text-align:start">الصفحة غير موجودة.</p><div style="margin-top:28px;display:flex;gap:10px;flex-wrap:wrap"><a class="btn primary" href="/en/">Home ${arr}</a><a class="btn line" href="/ar/" lang="ar">الرئيسية</a></div></div></section>` });
