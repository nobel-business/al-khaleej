/* Alkhaleej — interaction & cinematic engine.
   One rAF-batched scroll pass; scenes run only while near the viewport; no permanent loops
   (the sardine school animates only while visible). */
(() => {
  "use strict";
  const d = document, root = d.documentElement;
  root.classList.remove("js-off");
  const $ = (s, c = d) => c.querySelector(s), $$ = (s, c = d) => [...c.querySelectorAll(s)];
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const WIDE = () => matchMedia("(min-width:900px)").matches;
  const FINE = matchMedia("(hover:hover) and (pointer:fine)").matches;
  const AR = root.dir === "rtl";
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  $$("[data-year]").forEach((e) => (e.textContent = new Date().getFullYear()));

  /* ================= scene registry ================= */
  const scenes = [];
  const near = new IntersectionObserver((es) => { es.forEach((e) => { const s = scenes.find((x) => x.el === e.target); if (s) s.vis = e.isIntersecting; }); kick(); }, { rootMargin: "15% 0px" });
  const scene = (el, fn, opts = {}) => { if (!el) return; const s = { el, fn, vis: false, ...opts }; scenes.push(s); near.observe(el); };
  const once = (el, fn, margin = "60% 0px") => { let done = false; const run = () => { if (!done) { done = true; io.disconnect(); fn(); } }; const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) run(); }, { rootMargin: margin }); io.observe(el); el.addEventListener("focusin", run, { capture: true }); };
  const progress = (el) => { const r = el.getBoundingClientRect(); const span = el.offsetHeight - innerHeight; return span > 0 ? clamp(-r.top / span) : clamp((innerHeight - r.top) / (innerHeight + r.height)); };

  /* ================= header, menus, progress ================= */
  const top = $(".top"), prog = $(".progress"), burger = $(".burger"), mnav = $(".mnav");
  const overHero = top && top.classList.contains("over");
  if (burger) {
    const set = (o) => { top.classList.toggle("menu-open", o); mnav.classList.toggle("open", o); burger.setAttribute("aria-expanded", o); d.body.style.overflow = o ? "hidden" : ""; };
    burger.addEventListener("click", () => set(!top.classList.contains("menu-open")));
    $$("a", mnav).forEach((a) => a.addEventListener("click", () => set(false)));
    addEventListener("keydown", (e) => { if (e.key === "Escape" && top.classList.contains("menu-open")) { set(false); burger.focus(); } });
  }
  /* ================= reveals: play when an element enters, from whichever side it enters ================= */
  // Text reveals reset only once an element is well out of view (35% beyond the viewport), so they replay when the
  // reader returns — from above they settle downward, from below upward — without flickering while reading.
  // Stateful widgets (diagram, gauges, iris, comparison) reveal once and stay visible.
  const rv = new IntersectionObserver((es) => es.forEach((e) => { if (!e.isIntersecting) return; const el = e.target; el.classList.add("in"); if (!el.matches("[data-r],[data-lines]")) rv.unobserve(el); }), { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });
  const rvReset = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting || RM) return; const el = e.target; el.classList.remove("in"); el.classList.toggle("rv-above", e.boundingClientRect.bottom < 0); }), { rootMargin: "35% 0px 35% 0px" });
  $$("[data-r],[data-lines],.streams:not(.scrub),.gauge,.iris,[data-cmp]").forEach((el) => { rv.observe(el); if (el.matches("[data-r],[data-lines]")) rvReset.observe(el); });

  /* ================= hero → content: the hero recedes while the next section rises over it ================= */
  $$(".hf:not(.ra)").forEach((h) => {
    const nx = h.nextElementSibling; if (nx && nx.dataset && nx.dataset.env) nx.style.backgroundColor = nx.dataset.env;
    if (!RM) scene(h, () => { if (!WIDE()) return; const r = h.getBoundingClientRect(); h.style.setProperty("--hx", clamp(-r.top / Math.max(1, r.height)).toFixed(4)); }, { always: true });
  });

  /* ================= hidden-until-chosen images (tabs, stage crossfades) load before they are needed ================= */
  $$("[data-profiles], .mf-media").forEach((el) => once(el, () => $$("img[loading=lazy]", el).forEach((i) => { i.loading = "eager"; }), "90% 0px"));

  /* ================= Raw Materials journey: the route line follows the scroll, both ways ================= */
  $$(".rm-journey").forEach((j) => { const t = $(".jr-track", j); if (t && !RM) scene(j, () => { const p = progress(j); t.style.setProperty("--jp", clamp((p - 0.18) / 0.5).toFixed(4)); }, { always: true }); else if (t) t.style.setProperty("--jp", 1); });

  /* ================= Manufacturing: five stages — the visual follows the chapter in view (both directions) ================= */
  $$(".mf").forEach((mf) => {
    const figs = $$(".mf-fig", mf), sts = $$(".mf-st", mf), pips = $$(".mf-prog i", mf), num = $(".mf-num b", mf); let cur = 0;
    const set = (i) => { if (i === cur) return; cur = i; figs.forEach((f, k) => f.classList.toggle("on", k === i)); sts.forEach((x, k) => x.classList.toggle("on", k === i)); pips.forEach((x, k) => x.classList.toggle("on", k <= i)); if (num) num.textContent = "0" + (i + 1); };
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) set(+e.target.dataset.i); }), { rootMargin: "-45% 0px -45% 0px" });
    sts.forEach((x) => io.observe(x));
  });

  /* ================= counting numerals (company ledger) ================= */
  const cio = new IntersectionObserver((es) => es.forEach((e) => { if (!e.isIntersecting) return; cio.unobserve(e.target); const el = e.target, to = +el.dataset.count, t0 = performance.now(); if (RM || !to) return; const step = (t) => { const k = Math.min(1, (t - t0) / 1100); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); }; el.textContent = "0"; requestAnimationFrame(step); }), { threshold: 0.6 });
  $$("[data-count]").forEach((el) => { if (el.dataset.count) cio.observe(el); });

  /* ================= parallax (visible only) ================= */
  $$("[data-px]").forEach((el) => scene(el, () => { if (RM) return; const r = el.getBoundingClientRect(); el.style.setProperty("--py", ((r.top + r.height / 2 - innerHeight / 2) * -(+el.dataset.px || 0.08)).toFixed(1) + "px"); }, { always: true }));

  /* ================= environment colour + chapter readout (mobile dock) ================= */
  const envs = $$("[data-env]");
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.substr(i, 2), 16));
  const mix = (a, b, t) => "rgb(" + a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",") + ")";
  const envC = envs.map((e) => hex(e.dataset.env)); let envGeo = [];
  const measureEnv = () => { envGeo = envs.map((e, i) => { const r = e.getBoundingClientRect(); return { top: r.top + scrollY, h: r.height, c: envC[i] }; }); };
  const dock = $(".dock"), where = dock && $(".where", dock), chapters = dock ? (dock.dataset.ch || "").split("|") : [];
  let lastChap = -1, lastBg = "";
  function env() {
    if (!envGeo.length) return;
    const y = scrollY + innerHeight * 0.5; let i = 0;
    for (let k = 0; k < envGeo.length; k++) if (y >= envGeo[k].top) i = k;
    const g = envGeo[i], n = envGeo[i + 1];
    const t = n ? clamp((y - (g.top + g.h * 0.72)) / (g.h * 0.28)) : 0;
    const bg = n ? mix(g.c, n.c, t * t * (3 - 2 * t)) : mix(g.c, g.c, 0); if (bg !== lastBg) { lastBg = bg; d.body.style.backgroundColor = bg; }
    if (i !== lastChap) {
      lastChap = i;
      if (where) where.innerHTML = `<b>0${i + 1}</b>${chapters[i] || ""}`;
    }
    const end = envGeo[envGeo.length - 1], past = y > end.top + end.h;
    if (dock) dock.classList.toggle("show", scrollY > innerHeight * 0.8 && !past);
  }

  /* ================= 1. hero dive ================= */
  const dive = $(".dive"), stage = dive && $(".dv-stage", dive), next = dive && $(".dv-next", dive);
  let schoolOn = false;
  if (dive && !RM) scene(dive, (p) => {
    if (!WIDE()) return;
    const t = clamp(p / 0.34), s = clamp(p / 0.62), w = 1 - clamp((p - 0.2) / 0.42), q = clamp((p - 0.6) / 0.14), x = clamp((p - 0.9) / 0.1);   // q: text arrives · x: text leaves before the scene ends
    stage.style.setProperty("--t", t.toFixed(4)); stage.style.setProperty("--s", s.toFixed(4));
    stage.style.setProperty("--w", w.toFixed(4)); stage.style.setProperty("--q", q.toFixed(4)); stage.style.setProperty("--x", x.toFixed(4));
    next.classList.toggle("live", q > 0.5 && x < 0.5);
    schoolOn = q > 0.02;
    if (schoolOn) school.start();
  });

  /* ================= living sardine school (C1), First Light version ================= */
  const school = (() => {
    const cv = dive && $(".dv-under canvas", dive); if (!cv || RM) return { start() {} };
    const ctx = cv.getContext("2d"); let W = 0, H = 0, DPR = 1, F = [], raf = 0, lx = -1e4, ly = -1e4, mx = -1e4, my = -1e4, ptr = false;
    const size = () => { DPR = Math.min(devicePixelRatio || 1, 2); W = cv.width = cv.clientWidth * DPR; H = cv.height = cv.clientHeight * DPR; };
    const init = () => { size(); const N = innerWidth < 1200 ? 90 : 130; F = []; for (let i = 0; i < N; i++) { const a = Math.random() * 6.28; F.push({ x: W * (0.35 + Math.random() * 0.4), y: H * (0.25 + Math.random() * 0.4), vx: Math.cos(a) * 2, vy: Math.sin(a) * 2, s: 0.75 + Math.random() * 0.5, ph: Math.random() * 6.28 }); } };
    cv.parentElement.addEventListener("pointermove", (e) => { const r = cv.getBoundingClientRect(); mx = (e.clientX - r.left) * DPR; my = (e.clientY - r.top) * DPR; ptr = true; }, { passive: true });
    function frame(t) {
      raf = 0; if (!schoolOn || !scenes.find((x) => x.el === dive).vis) return;
      if (!ptr) { mx = W * (0.55 + 0.25 * Math.sin(t / 3300)); my = H * (0.42 + 0.14 * Math.sin(t / 2100)); }
      lx += (mx - lx) * 0.12; ly += (my - ly) * 0.12;
      ctx.clearRect(0, 0, W, H);
      const LR = Math.min(W, H) * 0.3, cx = W * (0.55 + 0.18 * Math.sin(t / 5200)), cy = H * (0.38 + 0.12 * Math.sin(t / 3900));
      const g = ctx.createRadialGradient(lx, ly, 0, lx, ly, LR); g.addColorStop(0, "rgba(255,236,196,.22)"); g.addColorStop(1, "rgba(255,236,196,0)"); ctx.fillStyle = g; ctx.fillRect(lx - LR, ly - LR, LR * 2, LR * 2);
      const sep = 16 * DPR, view = 56 * DPR, maxV = 2.4 * DPR, n = F.length;
      for (let i = 0; i < n; i++) {
        const f = F[i]; let ax = 0, ay = 0, cxs = 0, cys = 0, avx = 0, avy = 0, c = 0;
        for (let j = 0; j < n; j++) { if (i === j) continue; const o = F[j], dx = o.x - f.x, dy = o.y - f.y, d2 = dx * dx + dy * dy; if (d2 < view * view) { c++; cxs += o.x; cys += o.y; avx += o.vx; avy += o.vy; if (d2 < sep * sep) { ax -= (dx / (d2 + 1)) * 40; ay -= (dy / (d2 + 1)) * 40; } } }
        if (c) { ax += (cxs / c - f.x) * 0.0009 + (avx / c - f.vx) * 0.06; ay += (cys / c - f.y) * 0.0009 + (avy / c - f.vy) * 0.06; }
        ax += (cx - f.x) * 0.00012; ay += (cy - f.y) * 0.00012;
        const ldx = f.x - lx, ldy = f.y - ly, ld = Math.hypot(ldx, ldy) || 1; if (ld < LR * 0.5) { ax += (ldx / ld) * 0.09; ay += (ldy / ld) * 0.09; }
        f.vx += ax * DPR; f.vy += ay * DPR; const sp = Math.hypot(f.vx, f.vy) || 1, lim = maxV * (0.7 + 0.3 * f.s);
        if (sp > lim) { f.vx = (f.vx / sp) * lim; f.vy = (f.vy / sp) * lim; } else if (sp < lim * 0.45) { f.vx *= 1.05; f.vy *= 1.05; }
        f.x += f.vx; f.y += f.vy; if (f.x < -40) f.x = W + 40; if (f.x > W + 40) f.x = -40; if (f.y < -40) f.y = H + 40; if (f.y > H + 40) f.y = -40;
        const lit = Math.max(0, 1 - Math.hypot(f.x - lx, f.y - ly) / LR), fl = 0.5 + 0.5 * Math.sin(t / 170 + f.ph), L = 11 * DPR * f.s, Hh = 2.3 * DPR * f.s;
        ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(Math.atan2(f.vy, f.vx));
        ctx.fillStyle = lit > 0.12 ? `rgba(255,250,236,${0.45 + lit * 0.5 * (0.6 + 0.4 * fl)})` : "rgba(214,232,238,.42)";
        ctx.beginPath(); ctx.ellipse(0, 0, L, Hh, 0, 0, 6.283); ctx.fill();
        ctx.beginPath(); ctx.moveTo(-L * 0.85, 0); ctx.lineTo(-L * 1.35, -Hh * 1.5); ctx.lineTo(-L * 1.35, Hh * 1.5); ctx.closePath(); ctx.fill(); ctx.restore();
      }
      raf = requestAnimationFrame(frame);
    }
    let ready = false;
    return { start() { if (!WIDE()) return; if (!ready) { init(); ready = true; addEventListener("resize", () => { if (ready) size(); }, { passive: true }); } if (!raf) raf = requestAnimationFrame(frame); } };
  })();


  /* ================= hero exit (every page hero) ================= */
  $$(".op-bleed.hf").forEach((h) => {
    if (RM) return;
    scene(h, (x) => { if (!WIDE()) { h.style.removeProperty("--hx"); return; } h.style.setProperty("--hx", x.toFixed(3)); }, { pr: (el) => { const r = el.getBoundingClientRect(); return clamp(-r.top / (r.height * 0.8)); } });
  });

  /* ================= specification sheet: filter by status ================= */
  $$("[data-sheet]").forEach((sh) => {
    const btns = $$(".seg button", sh), ink = $(".seg-ink", sh), rows = $$(".srow", sh), groups = $$(".sgroup", sh), empty = $(".sheet-empty", sh);
    const move = (b) => { ink.style.width = b.offsetWidth + "px"; ink.style.transform = `translateX(${b.offsetLeft}px)`; };
    const apply = (f) => {
      rows.forEach((r) => { const out = f !== "all" && r.dataset.s !== f; r.classList.toggle("out", out); r.inert = out; if (out && r.open) r.open = false; });
      groups.forEach((g) => g.classList.toggle("empty", !$$(".srow:not(.out)", g).length));
      empty.hidden = rows.some((r) => !r.classList.contains("out"));
    };
    btns.forEach((b) => b.addEventListener("click", () => { btns.forEach((x) => x.setAttribute("aria-pressed", x === b)); move(b); apply(b.dataset.f); }));
    once(sh, () => move(btns[0]), "20% 0px"); addEventListener("resize", () => move(btns.find((b) => b.getAttribute("aria-pressed") === "true")), { passive: true });
  });

  /* ================= comparison: highlight a product column ================= */
  $$("[data-cmp]").forEach((c) => {
    const cells = $$("[data-c]", c); let cur = null;
    const hl = (i) => { if (i === cur) return; cur = i; cells.forEach((x) => x.classList.toggle("hl", i !== null && x.dataset.c === i)); };
    c.addEventListener("pointerover", (e) => { const t = e.target.closest("[data-c]"); hl(t ? t.dataset.c : null); });
    c.addEventListener("pointerleave", () => hl(null));
    c.addEventListener("focusin", (e) => { const t = e.target.closest("[data-c]"); if (t) hl(t.dataset.c); });
    c.addEventListener("focusout", () => hl(null));
  });

  /* ================= raw-material source profiles (tabs) ================= */
  $$("[data-profiles]").forEach((pf) => {
    const tabs = $$('[role="tab"]', pf), imgs = $$(".pf-img", pf), panels = $$('[role="tabpanel"]', pf); let cur = 0;
    const sel = (i, focus) => {
      if (i === cur) return; const prev = cur; cur = i;
      tabs.forEach((t, k) => { t.setAttribute("aria-selected", k === i); t.tabIndex = k === i ? 0 : -1; });
      panels.forEach((p, k) => { p.hidden = k !== i; p.classList.toggle("on", k === i); });
      imgs.forEach((m) => m.classList.remove("was")); imgs[prev].classList.remove("on"); imgs[prev].classList.add("was"); imgs[i].classList.add("on");
      setTimeout(() => imgs[prev].classList.remove("was"), 950);
      if (focus) tabs[i].focus();
    };
    tabs.forEach((t, k) => { t.addEventListener("click", () => sel(k)); t.addEventListener("keydown", (e) => {
      const fwd = AR ? "ArrowLeft" : "ArrowRight", back = AR ? "ArrowRight" : "ArrowLeft";
      if (e.key === fwd || e.key === "ArrowDown") { e.preventDefault(); sel((cur + 1) % tabs.length, true); }
      else if (e.key === back || e.key === "ArrowUp") { e.preventDefault(); sel((cur - 1 + tabs.length) % tabs.length, true); }
      else if (e.key === "Home") { e.preventDefault(); sel(0, true); } else if (e.key === "End") { e.preventDefault(); sel(tabs.length - 1, true); } }); });
  });

  /* ================= raw-material route: drawn by scroll ================= */
  $$("[data-route]").forEach((rt) => {
    const ink = $(".r-ink", rt), nodes = $$(".route-nodes li", rt), xs = nodes.map((n) => parseFloat(n.style.getPropertyValue("--x")) / 100); let len = 0;
    const setup = () => { len = ink.getTotalLength(); ink.style.strokeDasharray = len; ink.style.strokeDashoffset = len; };
    scene(rt, (x) => {
      if (!len) setup();
      const P = RM || !WIDE() ? 1 : x;
      ink.style.strokeDashoffset = (len * (1 - P)).toFixed(1);
      nodes.forEach((n, i) => n.classList.toggle("on", P >= xs[i] - 0.02));
    }, { pr: (el) => { const r = el.getBoundingClientRect(); return clamp((innerHeight * 0.88 - r.top) / (innerHeight * 0.6)); } });
  });


  /* ================= three-fish orbit: the three fish of the official symbol ================= */
  // Each fish is an independent element on one shared elliptical path (a circle seen in slight perspective).
  // It enters in the exact logo formation, then the fish glide outward and swim counter-clockwise, head first,
  // ~120° apart. Every fish turns with its own tangent; spacing breathes slightly per fish; nothing rotates as a group.
  $$("[data-orbit]").forEach((ob) => {
    const [SW, SH, SCX, SCY] = ob.dataset.sym.split(",").map(Number);
    const fish = $$(".fish", ob).map((el, i) => { const [vx, vy, vw, vh, cx, cy, th, r] = el.dataset.geo.split(",").map(Number); return { el, i, vx, vy, vw, vh, cx, cy, th, r, ph: i * 2.09 + 0.7 }; });
    const ell = $(".orbit-path ellipse", ob), mean = ob.closest("section") ? $$(".meaning", ob.closest("section")) : [];
    const TAU = Math.PI * 2, PERIOD = 26, OPEN = 1.32, TILT = 0.84;            // seconds per revolution; orbit radius vs logo; perspective
    let W = 0, H = 0, u = 1, travel = 0, spd = 0, target = 1, form = RM ? 0 : 0, raf = 0, last = 0, vis = false, sel = -1, t = 0;
    const size = () => {
      W = ob.clientWidth; H = ob.clientHeight; u = Math.min(W / 640, H / 600);
      fish.forEach((f) => { f.el.style.width = f.vw * u + "px"; f.el.style.height = f.vh * u + "px"; f.el.style.transformOrigin = `${(f.cx - f.vx) * u}px ${(f.cy - f.vy) * u}px`; });
    };
    const ease = (x) => 1 - Math.pow(1 - x, 3);
    const tan = (a, k) => Math.atan2(-k * Math.cos(a), Math.sin(a));     // direction of travel (θ decreasing) on the ellipse
    const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));
    const place = () => {
      const e = ease(Math.min(1, form)), R = 1 + (OPEN - 1) * e, k = 1 - (1 - TILT) * e;
      const ox = W / 2, oy = H / 2;
      if (ell) { ell.setAttribute("cx", ox); ell.setAttribute("cy", oy); ell.setAttribute("rx", fish[0].r * R * u); ell.setAttribute("ry", fish[0].r * R * k * u); }
      fish.forEach((f) => {
        const a = f.th - travel + e * 0.045 * Math.sin(t * 0.37 + f.ph);   // own phase: spacing breathes ±2.6°, never closes
        const x = ox + Math.cos(a) * f.r * R * u, y = oy + Math.sin(a) * f.r * R * k * u;
        const turn = (a - f.th) + wrap(tan(a, k) - tan(a, 1));               // follows its own tangent (exactly the logo pose at rest)
        const sway = e * 0.035 * Math.sin(t * 1.9 + f.ph * 1.7);             // a gentle swim
        const depth = (Math.sin(a) + 1) / 2, sc = 1 + e * (depth - 0.5) * 0.1 + (f.i === sel ? 0.06 : 0);
        f.el.style.transform = `translate3d(${(x - (f.cx - f.vx) * u).toFixed(2)}px,${(y - (f.cy - f.vy) * u).toFixed(2)}px,0) rotate(${(turn + sway).toFixed(4)}rad) scale(${sc.toFixed(4)})`;
        f.el.style.zIndex = 10 + Math.round(depth * 10);
      });
    };
    const loop = (now) => {
      raf = 0; if (!vis) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0; last = now; t += dt;
      if (form < 1) form = Math.min(1, form + dt / 1.8);                    // formation -> orbit
      spd += (target * ease(form) - spd) * Math.min(1, dt * 2.4);
      travel += (TAU / PERIOD) * spd * dt;
      place(); raf = requestAnimationFrame(loop);
    };
    const run = () => { if (RM) { place(); return; } if (!raf) { last = 0; raf = requestAnimationFrame(loop); } };
    new IntersectionObserver((es) => { vis = es[0].isIntersecting; if (vis) { ob.classList.add("live"); run(); } }, { threshold: 0.35 }).observe(ob);
    addEventListener("resize", () => { size(); place(); }, { passive: true });
    ob.addEventListener("pointerenter", () => { target = 0.25; });
    ob.addEventListener("pointerleave", () => { target = sel > -1 ? 0.4 : 1; });
    const choose = (i) => {
      sel = sel === i ? -1 : i; target = sel > -1 ? 0.4 : 1; ob.classList.toggle("has-sel", sel > -1);
      fish.forEach((f) => f.el.tagName === "BUTTON" && f.el.setAttribute("aria-pressed", f.i === sel));
      mean.forEach((m, k) => m.setAttribute("aria-pressed", k === sel));
      if (RM) place();
    };
    fish.forEach((f) => f.el.tagName === "BUTTON" && f.el.addEventListener("click", () => choose(f.i)));
    mean.forEach((m, i) => m.addEventListener("click", () => choose(i)));
    size(); place();
  });

  /* ================= Direction A specimen room: light · dolly-in · in-room drawer · direct switching ================= */
  // Source of truth: docs/phase-02/01_VISUAL_DIRECTION_A.html (focusSpec / dolly / release), motion as in the owner's
  // reference video: ease-out camera moves ~0.5–0.8 s, the drawer persists while the camera pans between specimens.
  $$(".ra").forEach((room) => {
    const band = $(".ra-band", room), shelf = $(".ra-shelf", room), specs = $$(".ra-spec", room), sun = $(".sun", room);
    const drawer = $(".ra-drawer", room), dcs = $$(".ra-dc", room), cnt = $(".ra-count b", room);
    if (!shelf || !drawer) return;
    let lit = -1, cur = -1, r = 0, ex = 0, ey = 0;
    const light = (i) => { if (i === lit) return; if (lit > -1) specs[lit].classList.remove("lit"); lit = i; if (i > -1) specs[i].classList.add("lit"); };
    const sunTo = (x, y) => { if (sun) sun.style.transform = `translate(${x}px,${y}px)`; };
    if (FINE) band.addEventListener("pointermove", (e) => { if (cur > -1) return; ex = e.clientX; ey = e.clientY; if (!r) r = requestAnimationFrame(() => { r = 0; const rb = band.getBoundingClientRect(); sunTo(ex - rb.left, ey - rb.top); let best = -1, bd = 1e9; specs.forEach((x, k) => { const q = x.getBoundingClientRect(); const dd = Math.hypot(q.left + q.width / 2 - ex, (q.top + q.height / 2 - ey) * 1.3); if (dd < bd) { bd = dd; best = k; } }); light(bd < specs[0].offsetWidth * 0.62 ? best : -1); }); });
    band.addEventListener("pointerleave", () => { if (cur < 0) light(-1); });
    specs.forEach((x, k) => x.addEventListener("focus", () => { if (cur < 0) light(k); }));
    // camera dolly (Direction A: scale 1.55, the chosen specimen centred in the room beside the drawer); geometry in room space
    const dolly = (i) => {
      if (!WIDE()) { shelf.style.transform = ""; return; }
      const R = room.getBoundingClientRect(), B = band.getBoundingClientRect(), sp = specs[i], S = 1.55;
      const sl = B.left - R.left + shelf.offsetLeft, st = B.top - R.top + shelf.offsetTop, sw = shelf.offsetWidth;
      const px = sl + sp.offsetLeft + sp.offsetWidth / 2, py = st + sp.offsetTop + sp.offsetHeight / 2;
      const dw = drawer.offsetWidth, vh = Math.min(R.height, innerHeight), top = 72;
      const cx = AR ? (dw + R.width) / 2 : (R.width - dw) / 2, cy = top + (vh - top) * 0.53;
      const ox = AR ? sl + sw : sl, oy = st;
      shelf.style.transform = `translate(${(cx - (ox + (px - ox) * S)).toFixed(1)}px,${(cy - (oy + (py - oy) * S)).toFixed(1)}px) scale(${S})`;
      const q = { x: cx, y: cy }; if (sun) sunTo(q.x - (B.left - R.left), q.y - (B.top - R.top));
    };
    const show = (i) => {
      const first = cur < 0; cur = (i + specs.length) % specs.length;
      room.classList.add("zoom"); drawer.inert = false;
      specs.forEach((x, k) => { x.classList.toggle("cur", k === cur); x.setAttribute("aria-expanded", k === cur); });
      dcs.forEach((x, k) => x.classList.toggle("on", k === cur)); if (cnt) cnt.textContent = "0" + (cur + 1); light(cur);
      try { history.replaceState(null, "", "#" + specs[cur].dataset.slug); } catch (e) {}
      if (WIDE()) {
        const t = room.getBoundingClientRect().top;
        if (first && Math.abs(t) > 4) scrollTo({ top: scrollY + t, behavior: RM ? "auto" : "smooth" });
        dolly(cur);
        if (first) $(".ra-x", drawer).focus({ preventScroll: true });
      } else {
        specs[cur].scrollIntoView({ behavior: RM ? "auto" : "smooth", inline: "center", block: "nearest" });
        const b = shelf.getBoundingClientRect(); if (b.top < 64 || b.bottom > innerHeight * 0.42) scrollBy({ top: b.top - 76, behavior: RM ? "auto" : "smooth" });
      }
    };
    const release = () => {
      if (cur < 0) return; const k = cur; cur = -1;
      room.classList.remove("zoom"); shelf.style.transform = ""; drawer.inert = true; light(-1);
      specs.forEach((x) => { x.classList.remove("cur"); x.setAttribute("aria-expanded", "false"); });
      try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
      specs[k].focus({ preventScroll: true });
    };
    specs.forEach((x, k) => x.addEventListener("click", () => { if (k !== cur) show(k); }));
    $(".ra-x", drawer).addEventListener("click", release);
    $(".ra-prev", drawer).addEventListener("click", () => show(cur - 1));
    $(".ra-next", drawer).addEventListener("click", () => show(cur + 1));
    addEventListener("keydown", (e) => {
      if (cur < 0) return;
      if (e.key === "Escape") release();
      else if (e.key === "ArrowRight" || e.key === "ArrowLeft") { if (e.target.closest && e.target.closest("input,textarea,select")) return; show(cur + ((e.key === "ArrowRight") !== AR ? 1 : -1)); e.preventDefault(); }
    });
    addEventListener("resize", () => { if (cur > -1) dolly(cur); }, { passive: true });
    const ex1 = $("[data-explore]"); if (ex1)   /* the button now lives in the hero section above the room */ ex1.addEventListener("click", () => show(cur > -1 ? cur : 0));
    const h = location.hash.slice(1), k0 = specs.findIndex((x) => x.dataset.slug === h); if (k0 > -1) setTimeout(() => show(k0), 300);
    addEventListener("hashchange", () => { const k = specs.findIndex((x) => x.dataset.slug === location.hash.slice(1)); if (k > -1 && k !== cur) show(k); });   // in-page links, back/forward
  });

  /* ================= interactive flow diagram ================= */
  $$("[data-flow]").forEach((fl) => {
    const D = JSON.parse($(".st-data", fl).textContent), cap = $(".st-cap", fl), nodes = $$(".h .node", fl); let cur = null;
    const show = (n) => {
      if (n === cur) return; cur = n; const st = D.steps[+n.dataset.s], br = n.dataset.b;
      nodes.forEach((x) => x.classList.toggle("sel", x === n));
      fl.classList.toggle("hl-meal", br === "meal"); fl.classList.toggle("hl-oil", br === "oil");
      const lab = D.labels[st.s] || "", kind = st.s === "oil" ? "st-pending" : st.s === "meal" ? "st-stated" : "st-request";
      cap.classList.remove("swap"); void cap.offsetWidth; cap.classList.add("swap");
      cap.innerHTML = `<span class="k">${st.k}</span><div><b>${st.t}</b><p>${st.d}</p></div><span class="pill ${kind}"><i></i>${lab}</span>`;
    };
    nodes.forEach((n) => { n.addEventListener("pointerenter", () => show(n)); n.addEventListener("focus", () => show(n)); n.addEventListener("click", () => show(n)); n.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(n); } }); });
    fl.addEventListener("pointerleave", () => { fl.classList.remove("hl-meal", "hl-oil"); });
  });

  /* ================= inquiry checklist → contact console ================= */
  $$("[data-pick]").forEach((pk) => {
    const btns = $$("button", pk), cta = $("[data-pick-cta]", pk.parentElement), cnt = $(".pick-out .count", pk.parentElement), base = cta.getAttribute("href").split("#")[0];
    const upd = () => { const on = btns.filter((b) => b.getAttribute("aria-pressed") === "true").map((b) => b.dataset.v);
      cta.href = on.length ? `${base}?need=${encodeURIComponent((AR ? "يمكنني تقديم: " : "I can provide: ") + on.join(" · "))}#inquiry` : `${base}#inquiry`;
      cnt.textContent = on.length ? (AR ? `${on.length} من ${btns.length} محددة — ستُضاف إلى استفسارك` : `${on.length} of ${btns.length} selected — added to your inquiry`) : ""; };
    btns.forEach((b) => b.addEventListener("click", () => { b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") !== "true"); upd(); }));
  });


  /* ================= homepage plant feature: scroll-linked opening, parallax, exit (reverses on scroll up) ================= */
  $$(".mfx").forEach((mx) => { if (RM) return;
    scene(mx, (p) => { const e = clamp(p / 0.42), x = clamp((p - 0.68) / 0.32);
      mx.style.setProperty("--e", e.toFixed(4)); mx.style.setProperty("--x", x.toFixed(4)); mx.style.setProperty("--p", p.toFixed(4)); });
  });

  /* ================= About: hero settle/exit · pinned values stage · pinned horizon (three statements) · invitation ================= */
  // Scroll-linked (so every effect plays in reverse on the way up); scenes run only while near the viewport.
  (() => {
    const hero = $(".ab-hero"); if (!hero) return;
    if (!RM) scene(hero, (p) => { const x = clamp((p - 0.5) / 0.42); hero.style.setProperty("--p", p.toFixed(4)); hero.style.setProperty("--x", x.toFixed(4)); });
    const vals = $(".ab-values");
    if (vals) { const btns = $$(".ab-val-index button", vals), wide = matchMedia("(min-width:900px)"), G = 3, per = Math.ceil(btns.length / G);
      /* values arrive in groups (two at a time): the index lights both names of the group */
      const set = (g) => { if (vals.dataset.g === String(g)) return; vals.dataset.g = String(g); btns.forEach((b, k) => b.setAttribute("aria-pressed", Math.floor(k / per) === g)); };
      scene(vals, (p) => { if (!wide.matches || RM) return; vals.style.setProperty("--vp", p.toFixed(4)); set(Math.min(G - 1, Math.floor(p * G * 0.9999))); });
      btns.forEach((b, k) => b.addEventListener("click", () => { const g = Math.floor(k / per); if (!wide.matches || RM) { set(g); return; }
        const top = vals.getBoundingClientRect().top + scrollY, span = vals.offsetHeight - innerHeight; scrollTo({ top: Math.round(top + (span * (g + 0.5)) / G), behavior: "smooth" }); })); }
    const fut = $(".ab-fut");
    if (fut) scene(fut, (p) => { const a = RM ? 2 : p < 0.36 ? 0 : p < 0.7 ? 1 : 2; if (fut.dataset.a !== String(a)) fut.dataset.a = String(a);
      fut.style.setProperty("--f", p.toFixed(4)); fut.style.setProperty("--fr", (RM ? 1 : clamp((p - 0.02) / 0.72)).toFixed(4)); });
    const cta = $(".ab-cta");
    if (cta) new IntersectionObserver((es) => es.forEach((e) => cta.classList.toggle("in-view", e.isIntersecting)), { threshold: 0.3 }).observe(cta);
  })();

  /* ================= Raw materials: seas map · species · pinned sourcing journey · nutrition · variability · two streams ================= */
  (() => {
    const pick = (root, attr, btnSel, extra) => { if (!root) return; const btns = $$(btnSel, root);
      const set = (i) => { root.dataset[attr] = String(i); btns.forEach((b) => b.setAttribute("aria-pressed", b.dataset.i === String(i))); extra && extra(i); };
      btns.forEach((b) => { b.addEventListener("click", () => set(+b.dataset.i)); if (FINE) b.addEventListener("pointerenter", () => set(+b.dataset.i)); b.addEventListener("focus", () => set(+b.dataset.i)); }); return set; };
    const seas = $(".rw-seas"); const setSea = pick(seas, "s", ".rw-sea-list button");
    if (seas) $$(".rw-sea", seas).forEach((p) => p.addEventListener("click", () => setSea(+p.dataset.i)));
    pick($(".rw-nu"), "n", ".rw-nu-node");
    pick($(".rw-vr"), "v", ".rw-vr-tabs button");
    const src = $(".rw-src");
    if (src) { const track = $(".rw-track", src), seq = $(".rw-seq", src), dots = $$(".rw-seq li", src), wide = matchMedia("(min-width:900px)");
      scene(src, (p) => { if (!wide.matches || RM) return; const over = Math.max(0, track.scrollWidth - innerWidth + (parseFloat(getComputedStyle(track).paddingInlineStart) || 0)); const q = clamp((p - 0.06) / 0.88);
        track.style.setProperty("--tx", ((AR ? 1 : -1) * over * q).toFixed(1)); seq.style.setProperty("--sp", q.toFixed(4));
        dots.forEach((d, i) => d.classList.toggle("on", q >= i / (dots.length - 1) - 0.001 && q > 0.001 || i === 0)); }); }
    const fl = $(".rw-fl-map");
    if (fl) scene(fl, (p) => fl.style.setProperty("--fl", (RM ? 1 : clamp((p - 0.15) / 0.35)).toFixed(4)));
  })();

  /* ================= homepage hero copy mirrors the ship ================= */
  // The ship (image px box 2140,420 1340×1220 in the 3840×2160 hero photo, mirrored in Arabic) is located through
  // object-fit:cover exactly as the scene does; the copy block is centred on the ship's mirror point, vertically on
  // its centre, and the one-line title is scaled down only if it would not fit that width. Desktop only.
  { const ui = $(".dv-ui"), tt = ui && $(".dv-title", ui), ph = $(".sc-still img"), h1 = tt && $("h1", tt);
    if (ui && tt && ph && h1) {
      const place = () => {
        h1.style.fontSize = "";
        if (!WIDE()) { ui.classList.remove("mirror"); return; }
        const q = ph.getBoundingClientRect(); if (q.width < 10) return;
        const op = getComputedStyle(ph).objectPosition.split(" ").map((v) => parseFloat(v) / 100), fx = isNaN(op[0]) ? 0.5 : op[0], fy = isNaN(op[1]) ? 0.5 : op[1];
        const s = Math.max(q.width / 3840, q.height / 2160), ox = (q.width - 3840 * s) * fx, oy = (q.height - 2160 * s) * fy;
        let cx = q.left + ox + 2810 * s; if (AR) cx = 2 * (q.left + q.width / 2) - cx;   // the scene is mirrored in Arabic
        const cy = q.top + oy + 1200 * s, u = ui.getBoundingClientRect();   // optical centre of the vessel (hull + deck), below the rigging
        const g = parseFloat(getComputedStyle(tt).getPropertyValue("--g")) || Math.min(64, Math.max(20, innerWidth * 0.04));
        const D = AR ? cx - u.left : u.right - cx, W = Math.max(320, 2 * (D - g));          // copy spans [gutter, mirror point × 2]
        ui.style.setProperty("--mw", W + "px"); ui.style.setProperty("--my", cy - u.top + "px"); ui.classList.add("mirror");
        const need = h1.scrollWidth, room = tt.clientWidth * 0.98;
        if (need > room) h1.style.fontSize = (parseFloat(getComputedStyle(h1).fontSize) * room) / need + "px";
      };
      place(); (d.fonts && d.fonts.ready ? d.fonts.ready : Promise.resolve()).then(place);
      let rq = 0; addEventListener("resize", () => { cancelAnimationFrame(rq); rq = requestAnimationFrame(place); }, { passive: true });
    }
  }

  /* ================= living hero: water + boat (WebGL) · gulls ================= */
  $$("[data-scene]").forEach((sc) => {
    if (RM) return;                                            // reduced motion: the original still image stays
    const still = $(".sc-still img", sc), cv = $(".sc-water", sc), boatEl = $(".sc-boat", sc), gulls = $$(".gull", sc);
    const IW = 3840, IH = 2160, HOR = 1325;                    // source image space; horizon line in image px
    // boat cut-out (from the original frame): placement in image px, pivot at midship waterline, stern at the gantry
    const B = { x: 2140, y: 420, w: 1340, h: 1220, px: 670, py: 1140, stx: 1190, sty: 1132 };
    let W = 0, H = 0, sc0 = 1, ox = 0, oy = 0, dpr = 1, vis = true, raf = 0, T0 = 0, gl = null, U = {};
    const geo = () => {
      W = sc.clientWidth; H = sc.clientHeight;
      const op = getComputedStyle(still).objectPosition.split(" ").map((v) => parseFloat(v) / 100);
      sc0 = Math.max(W / IW, H / IH); ox = (W - IW * sc0) * (op[0] || 0.5); oy = (H - IH * sc0) * (isNaN(op[1]) ? 0.5 : op[1]);
      Object.assign(boatEl.style, { width: B.w * sc0 + "px", height: B.h * sc0 + "px" });
      if (gl) { dpr = Math.min(devicePixelRatio || 1, W < 900 ? 1 : 1.25); cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); gl.viewport(0, 0, cv.width, cv.height); }
    };
    // ---- boat: bow-first passage to the left and away toward the hills, shrinking with distance; then a slow drift.
    //      Swell bob, roll and a faint pitch run throughout.
    const boatAt = (t) => {
      // ease in from rest (a vessel gathers way), cruise, then settle into a very slow drift — never loops or reverses
      const T = 80, x = Math.min(1, t / T), u = x * x * (3 - 2 * x) * 0.7 + (1 - Math.pow(1 - x, 2)) * 0.3, late = Math.max(0, t - T);
      const dx = -430 * u - Math.min(120, late * 0.6), dy = -128 * u - Math.min(40, late * 0.2);
      const k = (1 - 0.22 * u - Math.min(0.04, late * 0.0002)) * (1 + Math.sin(t * 1.27 + 1.4) * 0.004);
      const bob = Math.sin(t * 1.27) * 7 + Math.sin(t * 0.61 + 1.2) * 4.5;
      const roll = (Math.sin(t * 0.93) * 0.8 + Math.sin(t * 0.41 + 0.5) * 0.45) * Math.PI / 180;
      return { dx, dy: dy + bob, k, roll };
    };
    // ---- gulls: independent flights; wings beat then glide; banking follows the path; enter and leave softly
    const G = gulls.map((el, i) => ({ el, i, life: 0, next: 4.5 + i * 7, nextGlide: 2 }));
    const spawn = (g, t) => {
      g.kind = g.i % 2; g.t0 = t; g.life = g.kind ? 13 + Math.random() * 5 : 17 + Math.random() * 6;
      g.y0 = g.kind ? 0.34 + Math.random() * 0.04 : 0.1 + Math.random() * 0.12; g.ph = Math.random() * 6;
      g.el.style.setProperty("--beat", (0.38 + Math.random() * 0.12).toFixed(2) + "s");
    };
    const gullAt = (g, t) => {
      if (!g.life) { if (t > g.next) spawn(g, t); else { g.el.style.opacity = 0; return; } }
      const p = (t - g.t0) / g.life;
      if (p >= 1) { g.life = 0; g.next = t + 3 + Math.random() * 7; g.el.style.opacity = 0; return; }
      let x, y, s, vx, vy;
      if (g.kind === 0) { x = W * (1.06 - 0.6 * p); y = H * (g.y0 - 0.05 * p) + Math.sin(t * 0.8 + g.ph) * H * 0.012; s = 1 - 0.45 * p; vx = -1; vy = -0.05 + Math.cos(t * 0.8 + g.ph) * 0.03; }
      else { x = W * (0.62 + 0.5 * p * p); y = H * (g.y0 - 0.26 * p); s = 0.32 + 0.9 * p; vx = 1; vy = -0.5; }
      y = 112 + y * (H - 112) / H;                      // flight band starts below the header: never crosses the logo or nav
      const fade = Math.min(1, p / 0.08) * (1 - Math.max(0, (p - 0.86) / 0.14)) * (g.kind ? Math.min(1, p / 0.25) : 1);
      const bank = Math.atan2(vy, Math.abs(vx)) * 0.5 * 57.3 + Math.sin(t * 1.1 + g.ph) * 4;
      g.el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) scale(${(vx < 0 ? -1 : 1) * s},${s}) rotate(${bank.toFixed(1)}deg)`;
      g.el.style.opacity = fade.toFixed(2);
      if (t > g.nextGlide) { const on = !g.el.classList.contains("glide"); g.el.classList.toggle("glide", on); g.nextGlide = t + (on ? 0.9 + Math.random() * 0.8 : 2.2 + Math.random() * 2.4); }
    };
    // ---- shader: sea plate with perspective ripples, sun-column glints, wake; the boat composited in-scene so the
    //      water cuts its hull at a moving waterline and foam wraps it
    const VS = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
    const FS = `precision mediump float;uniform sampler2D tex,btx;uniform vec2 res,off,img,bpv,bsz,bpl,stn;uniform float scl,t,hor,bk,brl;
float h(vec2 q){q=fract(q*vec2(123.34,456.21));q+=dot(q,q+45.32);return fract(q.x*q.y);}
float n(vec2 q){vec2 i=floor(q),f=fract(q);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x),f.y);}
void main(){vec2 px=vec2(gl_FragCoord.x,res.y-gl_FragCoord.y);vec2 ip=(px-off)/scl;vec2 uv=ip/img;float dy=ip.y-hor;vec3 c;
if(dy>0.){float d=clamp(dy/(img.y-hor),0.,1.);float pr=1./(.06+d);vec2 w=vec2(uv.x*pr*2.2,pr*1.6);
 float a=n(w*vec2(6.,9.)+vec2(t*.05,-t*.32))+.5*n(w*vec2(13.,21.)+vec2(-t*.08,-t*.55));float b=n(w*vec2(5.,8.)+vec2(-t*.04,-t*.26)+17.3);
 vec2 suv=uv+vec2(a-.75,(b-.5)*.7)*(.0007+.005*d*d);suv.y=max(suv.y,(hor+3.)/img.y);c=texture2D(tex,suv).rgb;
 float cm=exp(-pow((uv.x-.135)/.032,2.));float sp=n(w*vec2(38.,58.)+vec2(0.,-t*1.15));c+=vec3(1.,.86,.6)*smoothstep(.83,1.,sp)*cm*(.35+.65*d)*.75;
 }else c=texture2D(tex,uv).rgb;
float cr=cos(-brl),sr=sin(-brl);vec2 rl=ip-bpv;rl=vec2(cr*rl.x-sr*rl.y,sr*rl.x+cr*rl.y);vec2 lc=rl/bk+bpl;
float wv=3.5*sin(lc.x*.034+t*1.7)+2.*sin(lc.x*.11-t*2.6)+3.*(n(vec2(lc.x*.045,t*.7))-.5);
if(dy>0.){
 float r=lc.y-bpl.y;
 if(r>-10.&&r<320.){float jx=(n(vec2(lc.x*.018,lc.y*.07-t*1.1))-.5)*30.+(n(vec2(lc.x*.06,lc.y*.19-t*1.9))-.5)*12.;
  vec2 m=vec2(lc.x+jx,bpl.y-max(r,0.)*1.2-10.);vec4 r1=texture2D(btx,m/bsz),r2=texture2D(btx,(m-vec2(0.,16.))/bsz);
  float fa=(r1.a+r2.a)*.5*(1.-smoothstep(10.,280.,r));
  c=mix(c,c*vec3(.6,.66,.72),fa*.5);
  c=mix(c,mix(c,(r1.rgb+r2.rgb)*.42,.55),fa*.3);}
 vec2 ax=normalize(vec2(.85,1.)),pe=vec2(-ax.y,ax.x);vec2 sv=ip-stn;float al=dot(sv,ax),ac=dot(sv,pe);
 if(al>-24.*bk){float L=720.*bk;float wd=38.*bk+max(al,0.)*.36;
  float body=(1.-smoothstep(wd*.3,wd,abs(ac)))*(1.-smoothstep(0.,L,al));
  vec2 q=vec2(ac,al-t*48.*bk)/(24.*bk);q+=vec2(n(q*.6+vec2(t*.15,0.)),n(q*.6+vec2(9.,t*.12)))*1.5;
  float f=n(q)*.62+n(q*2.4+3.1)*.38;
  float churn=body*smoothstep(.44,.8,f)*(1.-.55*smoothstep(0.,L*.85,al));
  float near=(1.-smoothstep(0.,120.*bk,length(sv)))*smoothstep(.32,.7,f);
  float kel=exp(-pow((abs(ac)-wd*1.08)/(10.*bk),2.))*(1.-smoothstep(0.,L*.75,al))*smoothstep(.55,.85,n(vec2(al/(34.*bk)-t*.8,ac*.025)));
  c=mix(c,mix(c*1.08+.035,vec3(.92,.94,.95),.55),clamp(churn*.55+near*.5+kel*.28,0.,.68));}
}
vec2 bu=lc/bsz;
if(bu.x>0.&&bu.x<1.&&bu.y>0.&&bu.y<1.){vec4 bc=texture2D(btx,bu);
 float a6=texture2D(btx,(lc+vec2(0.,6.+wv))/bsz).a,a16=texture2D(btx,(lc+vec2(0.,17.+wv))/bsz).a,a30=texture2D(btx,(lc+vec2(0.,32.+wv))/bsz).a;
 float zone=smoothstep(bpl.y-120.,bpl.y-70.,lc.y);
 float sub=((1.-a30)*.3+(1.-a16)*.35+(1.-a6)*.35)*zone;
 vec3 hull=mix(bc.rgb,c*.88+bc.rgb*.12,smoothstep(.18,.95,sub)*.82);
 c=mix(c,hull,bc.a*(1.-smoothstep(.7,1.,sub)));
 float up=texture2D(btx,(lc-vec2(0.,14.))/bsz).a*zone;float band=up*(1.-bc.a*(1.-smoothstep(.7,1.,sub)));
 float lace=smoothstep(.5,.86,n(lc*vec2(.08,.16)+vec2(t*.6,-t*.25))*.6+n(lc*.21+vec2(-t*.9,t*.3))*.4);
 c=mix(c,vec3(.93,.95,.96),clamp(band*lace*.48+smoothstep(.55,1.,sub)*bc.a*lace*.22,0.,.5));}
gl_FragColor=vec4(c,1.);}`;
    const tex = (img, rgba) => { const tx = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tx);
      [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach((k) => gl.texParameteri(gl.TEXTURE_2D, k, gl.CLAMP_TO_EDGE));
      [gl.TEXTURE_MIN_FILTER, gl.TEXTURE_MAG_FILTER].forEach((k) => gl.texParameteri(gl.TEXTURE_2D, k, gl.LINEAR));
      gl.texImage2D(gl.TEXTURE_2D, 0, rgba ? gl.RGBA : gl.RGB, rgba ? gl.RGBA : gl.RGB, gl.UNSIGNED_BYTE, img); return tx; };
    const initGL = (plate, boatImg) => {
      try {
        gl = cv.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" });
        if (!gl) throw new Error("no WebGL context");
        if (plate.naturalWidth > gl.getParameter(gl.MAX_TEXTURE_SIZE)) throw new Error("texture too large");
        const sh = (ty, src) => { const o = gl.createShader(ty); gl.shaderSource(o, src); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o)); return o; };
        const prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error("link failed"); gl.useProgram(prog);
        const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        gl.activeTexture(gl.TEXTURE0); tex(plate, false); gl.activeTexture(gl.TEXTURE1); tex(boatImg, true);
        ["tex", "btx", "res", "off", "img", "bpv", "bsz", "bpl", "stn", "scl", "t", "hor", "bk", "brl"].forEach((k) => (U[k] = gl.getUniformLocation(prog, k)));
        gl.uniform1i(U.tex, 0); gl.uniform1i(U.btx, 1); gl.uniform2f(U.img, IW, IH); gl.uniform1f(U.hor, HOR);
        gl.uniform2f(U.bsz, B.w, B.h); gl.uniform2f(U.bpl, B.px, B.py);
        cv.addEventListener("webglcontextlost", (e) => { e.preventDefault(); gl = null; sc.classList.add("no-gl"); }, { once: true });
        return true;
      } catch (e) { console.warn("[scene] water shader unavailable:", e && e.message); gl = null; return false; }
    };
    const frame = (now) => {
      raf = 0; if (!vis || d.hidden) return;
      const t = (now - T0) / 1000, bt = boatAt(t);
      const pvx = B.x + B.px + bt.dx, pvy = B.y + B.py + bt.dy;          // pivot (midship waterline) in image px
      if (gl) {
        const cr = Math.cos(bt.roll), sr = Math.sin(bt.roll), lx = (B.stx - B.px) * bt.k, ly = (B.sty - B.py) * bt.k;
        gl.uniform2f(U.res, cv.width, cv.height); gl.uniform2f(U.off, ox * dpr, oy * dpr); gl.uniform1f(U.scl, sc0 * dpr); gl.uniform1f(U.t, t);
        gl.uniform2f(U.bpv, pvx, pvy); gl.uniform1f(U.bk, bt.k); gl.uniform1f(U.brl, bt.roll);
        gl.uniform2f(U.stn, pvx + cr * lx - sr * ly, pvy + sr * lx + cr * ly);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      } else {
        // fallback (no WebGL): the cut-out boat moves over the clean plate
        boatEl.style.transform = `translate3d(${(ox + (B.x + bt.dx) * sc0).toFixed(1)}px,${(oy + (B.y + bt.dy) * sc0).toFixed(1)}px,0) rotate(${bt.roll.toFixed(4)}rad) scale(${bt.k.toFixed(4)})`;
      }
      G.forEach((g) => gullAt(g, t));
      raf = requestAnimationFrame(frame);
    };
    const run = () => { if (!raf && vis && !d.hidden && T0) raf = requestAnimationFrame(frame); };
    new IntersectionObserver((es) => { vis = es[0].isIntersecting; run(); }, { threshold: 0 }).observe(sc);
    d.addEventListener("visibilitychange", run);
    const stage = sc.closest(".dv-stage");
    if (stage) new MutationObserver(() => { const w = parseFloat(stage.style.getPropertyValue("--w")); const v = !(w < 0.02) && sc.getBoundingClientRect().bottom > 0; if (v !== vis) { vis = v; run(); } }).observe(stage, { attributes: true, attributeFilter: ["style"] });
    addEventListener("resize", geo, { passive: true });
    const start = () => {
      geo();
      const ws = sc.dataset.plateW.split(",").map(Number), need = Math.max(W, IW * sc0) * Math.min(devicePixelRatio || 1, 1.5);
      const pw = Math.min(ws.find((w) => w >= need) || ws[ws.length - 1], 2560);
      const plate = new Image(); plate.src = `${sc.dataset.plate}${pw}.webp${sc.dataset.plateV ? "?v=" + sc.dataset.plateV : ""}`;
      const bImg = new Image(); bImg.src = "/assets/scene/boat-1340.webp";
      Promise.all([plate.decode(), bImg.decode()]).then(() => {
        if (!initGL(plate, bImg)) {
          // no WebGL: the empty-sea plate is laid over the painted hero photo as an equal-size sibling (the photo is not
          // re-sourced, so the already-painted hero stays the page's largest paint), and the boat animates as a DOM layer
          sc.classList.add("no-gl");
          const im = d.createElement("img"); im.src = plate.src; im.alt = ""; im.setAttribute("aria-hidden", "true"); im.decoding = "async";
          im.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:" + getComputedStyle(still).objectPosition;
          still.after(im); im.decode().then(() => { still.style.visibility = "hidden"; }, () => im.remove());
          $("img", boatEl).loading = "eager";
        }
        geo(); T0 = performance.now(); sc.classList.add("live"); run();
      }).catch((e) => console.warn("[scene] assets failed:", e && e.message));
    };
    if (d.readyState === "complete") setTimeout(start, 200); else addEventListener("load", () => setTimeout(start, 200), { once: true });
  });

  /* ================= 2. horizontal catch ================= */
  $$(".hz").forEach((hz) => {
    const track = $(".hz-track", hz), frames = $$(".hz-frame", hz), bar = $(".hz-count", hz), num = bar && $(".num", bar);
    let maxX = 0; const measure = () => { if (!WIDE() || RM) { hz.style.height = ""; return; } maxX = Math.max(0, track.scrollWidth - innerWidth); hz.style.height = `calc(${Math.round(maxX)}px + 100vh)`; };
    measure(); addEventListener("resize", measure, { passive: true }); addEventListener("load", measure);
    let last = -1;
    if (!RM) scene(hz, (p) => {
      if (!WIDE()) return;
      track.style.transform = `translate3d(${(AR ? 1 : -1) * p * maxX}px,0,0)`;
      if (bar) bar.style.setProperty("--hp", p.toFixed(3));
      const a = Math.round(p * (frames.length - 1));
      if (a !== last) { last = a; frames.forEach((f, i) => f.classList.toggle("dim", i !== a)); if (num) num.textContent = `0${a + 1} / 0${frames.length}`; }
    });
  });

  /* ================= 3. the line (scrubbed two-stream + particles) ================= */
  $$(".theline").forEach((ln) => {
    const pin = $(".line-pin", ln), sv = $(".streams .h", ln); if (!sv) return;
    const inks = $$(".ink", sv), nodes = $$(".node", sv), cap = $(".now", ln);
    let L = [], order = [], steps = [], parts = [], ready = false;
    const setup = () => {
      ready = true; L = inks.map((p) => p.getTotalLength()); inks.forEach((p, i) => { p.style.strokeDasharray = L[i]; p.style.strokeDashoffset = L[i]; });
      order = nodes.map((n) => +n.dataset.o); steps = JSON.parse($("#line-steps", ln).textContent);
      const NS = "http://www.w3.org/2000/svg";
      inks.forEach((p, k) => { for (let i = 0; i < 5; i++) { const c = d.createElementNS(NS, "circle"); c.setAttribute("r", 3.2); c.setAttribute("class", "p" + (p.classList.contains("oil") ? " oil" : "")); c.setAttribute("opacity", 0); sv.appendChild(c); parts.push({ c, k, o: i / 5 }); } });
    };
    let prog = [0, 0, 0], lastS = -1, praf = 0;
    const flow = () => { praf = 0; if (!scenes.find((x) => x.el === ln).vis) return; parts.forEach((q) => { const lim = prog[q.k]; if (lim < 0.02) { q.c.setAttribute("opacity", 0); return; } q.o = (q.o + 0.004) % 1; const pt = inks[q.k].getPointAtLength(q.o * lim * L[q.k]); q.c.setAttribute("cx", pt.x); q.c.setAttribute("cy", pt.y); q.c.setAttribute("opacity", (Math.sin(q.o * Math.PI) * 0.9).toFixed(2)); }); praf = requestAnimationFrame(flow); };
    scene(ln, (p) => {
      if (!ready) setup();
      const P = RM || !WIDE() ? 1 : clamp((p - 0.05) / 0.85);
      pin.style.setProperty("--lp", p.toFixed(3));
      const pm = clamp(P / 0.42), pb = clamp((P - 0.42) / 0.58); prog = [pm, pb, pb];
      inks.forEach((path, i) => (path.style.strokeDashoffset = L[i] * (1 - prog[i])));
      let s = 0; nodes.forEach((n, i) => { const on = P >= order[i] - 0.001; n.classList.toggle("on", on); if (on) s = Math.max(s, +n.dataset.s); });
      if (s !== lastS && cap) { lastS = s; const st = steps[s]; cap.innerHTML = `<div class="k">${st.k}</div><b>${st.t}</b><span>${st.d}</span>`; }
      if (!RM && !praf) praf = requestAnimationFrame(flow);
    });
  });

  /* ================= 7. iris ================= */
  $$(".iris-sec").forEach((sec) => {
    const pin = $(".iris-pin", sec);
    if (!RM) scene(sec, (p) => { if (!WIDE()) return; const ip = clamp(p / 0.7); pin.style.setProperty("--ir", (30 + ip * 62).toFixed(2) + "%"); pin.style.setProperty("--irs", ((30 + ip * 62) / 30).toFixed(4)); pin.style.setProperty("--ip", ip.toFixed(3)); pin.style.setProperty("--ic", clamp((p - 0.55) / 0.25).toFixed(3)); });
    else pin.style.setProperty("--ic", 1);
  });

  /* ================= 8. plant theatre ================= */
  $$(".theatre").forEach((th) => {
    const figs = $$(".th-stage figure", th), texts = $$(".th-text", th), idx = $$(".th-index button", th), n = texts.length;
    const sizeIt = () => { th.style.height = WIDE() && !RM ? n * 90 + 100 + "vh" : ""; }; sizeIt(); addEventListener("resize", sizeIt, { passive: true });
    let last = -1;
    if (!RM) scene(th, (p) => {
      if (!WIDE()) return;
      const x = p * n;
      figs.forEach((f, k) => { if (k === 0) return; const img = +f.dataset.s; f.style.setProperty("--v", clamp((x - img + 0.3) / 0.35).toFixed(3)); });
      const a = Math.min(n - 1, Math.floor(x));
      if (a !== last) { last = a; texts.forEach((t, i) => t.classList.toggle("on", i === a)); idx.forEach((b, i) => { b.classList.toggle("on", i === a); b.classList.toggle("done", i <= a); b.setAttribute("aria-current", i === a ? "step" : "false"); }); }
    });
    idx.forEach((b, i) => b.addEventListener("click", () => { const r = th.getBoundingClientRect(); scrollTo({ top: scrollY + r.top + ((i + 0.45) / n) * (th.offsetHeight - innerHeight), behavior: RM ? "auto" : "smooth" }); }));
  });

  /* ================= 4a. powder loupe ================= */
  $$(".loupe").forEach((lp) => {
    const img = $("img", lp), lens = $(".lens", lp), Z = 2.6; let on = false;
    let src = false; const load = () => { if (!src) { src = true; lens.style.backgroundImage = `url(${lp.dataset.src})`; } };
    const place = (cx, cy) => {
      const r = lp.getBoundingClientRect(), x = cx - r.left, y = cy - r.top;
      const nat = img.naturalWidth / img.naturalHeight || 1.5, sc = Math.max(r.width / nat, r.height); const rw = sc * nat, rh = sc;
      const [fx, fy] = (lp.dataset.focal || "50% 50%").split(" ").map((v) => parseFloat(v) / 100);
      const ox = (r.width - rw) * fx, oy = (r.height - rh) * fy, lr = lens.offsetWidth / 2;
      lens.style.transform = "none"; lens.style.left = x + "px"; lens.style.top = y + "px";
      lens.style.backgroundSize = `${rw * Z}px ${rh * Z}px`;
      lens.style.backgroundPosition = `${-((x - ox) * Z - lr)}px ${-((y - oy) * Z - lr)}px`;
    };
    lp.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") { load(); on = true; lp.classList.add("on"); } });
    lp.addEventListener("pointerleave", () => { on = false; lp.classList.remove("on"); lens.style.transform = ""; });
    lp.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") { load(); on = !on; lp.classList.toggle("on", on); if (on) place(e.clientX, e.clientY); } });
    lp.addEventListener("pointermove", (e) => { if (on) place(e.clientX, e.clientY); }, { passive: true });
  });

  /* ================= 4b. grade instrument (C5) ================= */
  $$(".dial-wrap").forEach((w) => once(w, () => {
    // Config: an array of grades (protein dial, one shared scale) or { items, lo, hi, major, step, hub } where an item may
    // carry its own scale (lo/hi/major/step), a value v (number or [from, to] range) and a pre-built readout (disp).
    const CFG = JSON.parse($("script", w).textContent), G = Array.isArray(CFG) ? CFG : CFG.items, dial = $(".dial", w), svg = $("svg", dial), btns = $$(".grades button", w);
    const ttl = $(".readout .mono", w), val = $(".readout .val", w), nm = $(".readout .nm", w), cta = $("[data-grade-link]", w), NS = "http://www.w3.org/2000/svg";
    const A0 = 135, SPAN = 270, R = 96, C = 120, pol = (a, r) => [C + r * Math.cos((a * Math.PI) / 180), C + r * Math.sin((a * Math.PI) / 180)];
    const el = (n, a, p = svg) => { const e = d.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
    const V = (g) => g.v ?? g.g, mid = (v) => (Array.isArray(v) ? (v[0] + v[1]) / 2 : v), perItem = G.some((g) => g.lo != null);
    const S = (g) => ({ lo: g.lo ?? CFG.lo ?? 55, hi: g.hi ?? CFG.hi ?? 75, mj: g.major ?? CFG.major ?? 5, st: g.step ?? CFG.step ?? 1 });
    const ang = (v, s) => A0 + ((v - s.lo) / (s.hi - s.lo)) * SPAN;
    const [sx, sy] = pol(A0, R), [ex, ey] = pol(A0 + SPAN, R);
    el("path", { d: `M${sx} ${sy} A${R} ${R} 0 1 1 ${ex} ${ey}`, fill: "none", stroke: "rgba(12,48,72,.16)", "stroke-width": 1 });
    const scale = el("g", { class: "scale" }), arc = el("path", { d: "", fill: "none", class: "arcv", "stroke-width": 2.5, "stroke-linecap": "round" });
    let drawn = "";
    const draw = (s, dots) => {
      const key = `${s.lo}/${s.hi}/${dots.join(",")}`; if (key === drawn) return; drawn = key; scale.replaceChildren();
      for (let v = s.lo; v <= s.hi + 1e-9; v += s.st) { const a = ang(v, s), q = (v - s.lo) / s.mj, mj = Math.abs(q - Math.round(q)) < 1e-6, [x1, y1] = pol(a, mj ? 80 : 86), [x2, y2] = pol(a, 92);
        el("line", { x1, y1, x2, y2, class: "tk" + (mj ? " mj" : ""), "stroke-width": mj ? 1.5 : 1 }, scale);
        if (mj && CFG.labels !== false) { const [tx, ty] = pol(a, 66); const t = el("text", { x: tx, y: ty + 4, "text-anchor": "middle", class: "lb", "data-g": +v.toFixed(4) }, scale); t.textContent = +v.toFixed(4); } }
      dots.forEach((v) => { const [x, y] = pol(ang(v, s), 101); el("circle", { cx: x, cy: y, r: 3, fill: "#0C3048" }, scale); });
    };
    const ndl = el("g", { class: "ndl" }); el("line", { x1: C, y1: C, x2: C + 78, y2: C, stroke: "#0C3048", "stroke-width": 2, "stroke-linecap": "round" }, ndl); el("circle", { cx: C, cy: C, r: 6, fill: "#FBF8F3", stroke: "#0C3048", "stroke-width": 1.5 }, ndl);
    const hub = CFG.hub ? el("text", { x: C, y: C + 80, "text-anchor": "middle", class: "hub" }) : null;
    let cur = 0;
    const set = (i) => {
      cur = (i + G.length) % G.length; const g = G[cur], s = S(g), v = V(g), n = mid(v);
      draw(s, perItem ? [].concat(v) : G.map((x) => mid(V(x))));
      ndl.style.transform = `rotate(${ang(n, s)}deg)`;
      const rng = Array.isArray(v), from = rng ? v[0] : s.lo, to = rng ? v[1] : n, [fx, fy] = pol(ang(from, s), R), [tx, ty] = pol(ang(to, s), R);
      arc.setAttribute("d", `M${fx} ${fy} A${R} ${R} 0 ${ang(to, s) - ang(from, s) > 180 ? 1 : 0} 1 ${tx} ${ty}`);
      val.innerHTML = g.disp ?? `${g.g}<small>${AR ? "\u200F%" : "%"}</small>`; val.classList.toggle("long", !!g.long); nm.textContent = g.name;
      if (g.title && ttl) ttl.textContent = g.title; if (hub) hub.textContent = g.chip || ""; if (cta) { cta.href = g.url; cta.querySelector("span").textContent = g.cta; }
      btns.forEach((b, k) => b.setAttribute("aria-pressed", k === cur));
      dial.setAttribute("aria-valuemin", s.lo); dial.setAttribute("aria-valuemax", s.hi); dial.setAttribute("aria-valuenow", n); dial.setAttribute("aria-valuetext", g.aria || g.name);
      const near = (s.hi - s.lo) * 0.15; $$(".lb", svg).forEach((t) => t.classList.toggle("on", rng ? +t.dataset.g >= v[0] && +t.dataset.g <= v[1] : Math.abs(+t.dataset.g - n) < near));
    };
    btns.forEach((b, k) => b.addEventListener("click", () => set(k)));
    dial.addEventListener("keydown", (e) => { const fwd = ["ArrowRight", "ArrowUp"], back = ["ArrowLeft", "ArrowDown"]; if (fwd.includes(e.key)) { e.preventDefault(); set(Math.min(G.length - 1, cur + 1)); } if (back.includes(e.key)) { e.preventDefault(); set(Math.max(0, cur - 1)); } });
    let drag = false; const from = (e) => { const r = svg.getBoundingClientRect(); const x = ((e.clientX - r.left) / r.width) * 240 - C, y = ((e.clientY - r.top) / r.height) * 240 - C; let a = (Math.atan2(y, x) * 180) / Math.PI; if (a < 0) a += 360; if (a < A0 - 20) a += 360; const f = Math.min(1, Math.max(0, (a - A0) / SPAN));
      let b = cur; if (perItem) b = Math.round(f * (G.length - 1)); else { const s = S(G[0]), g = s.lo + f * (s.hi - s.lo); let bd = 1e9; G.forEach((x, k) => { const dv = Math.abs(mid(V(x)) - g); if (dv < bd) { bd = dv; b = k; } }); } if (b !== cur) set(b); };
    dial.addEventListener("pointerdown", (e) => { drag = true; dial.setPointerCapture(e.pointerId); from(e); });
    dial.addEventListener("pointermove", (e) => { if (drag) from(e); });
    dial.addEventListener("pointerup", () => (drag = false));
    set(+w.dataset.start || 0);
  }));

  /* ================= 5. light through oil / specimen sunlight ================= */
  if (FINE) $$(".glowable").forEach((g) => { const gl = $(".glow", g); let r = 0, ex = 0, ey = 0; g.addEventListener("pointermove", (e) => { ex = e.clientX; ey = e.clientY; if (!r) r = requestAnimationFrame(() => { r = 0; const b = g.getBoundingClientRect(); gl.style.setProperty("--gx", ex - b.left + "px"); gl.style.setProperty("--gy", ey - b.top + "px"); }); }, { passive: true }); });
  $$(".room .shelf").forEach((sh) => {
    const sun = $(".sun", sh), specs = $$(".spec", sh); let r = 0, ex = 0, ey = 0, lit = -1;
    const light = (i) => { if (i === lit) return; if (lit > -1) specs[lit].classList.remove("lit"); lit = i; if (i > -1) specs[i].classList.add("lit"); };
    if (FINE) sh.addEventListener("pointermove", (e) => { ex = e.clientX; ey = e.clientY; if (!r) r = requestAnimationFrame(() => { r = 0; const b = sh.getBoundingClientRect(); sun.style.transform = `translate(${ex - b.left}px,${ey - b.top}px)`; let best = -1, bd = 1e9; specs.forEach((s, k) => { const q = s.getBoundingClientRect(), dd = Math.hypot(q.left + q.width / 2 - ex, q.top + q.height / 2 - ey); if (dd < bd) { bd = dd; best = k; } }); light(bd < specs[0].offsetWidth * 0.7 ? best : -1); }); }, { passive: true });
    sh.addEventListener("pointerleave", () => light(-1));
    specs.forEach((s, k) => s.addEventListener("focus", () => light(k)));
    if (!FINE) { const io = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle("lit", e.isIntersecting)), { threshold: 0.7 }); specs.forEach((s) => io.observe(s)); }
  });

  /* ================= specimen quick view (drawer) ================= */
  const data = $("#products-data"), wrap = $(".drawer-wrap");
  if (data && wrap) {
    const P = JSON.parse(data.textContent), dr = $(".drawer", wrap); let cur = 0, last = null;
    const fill = (i) => { const p = P[i]; cur = i; $("[data-f=idx]", dr).textContent = `0${i + 1} / 0${P.length}`; $("[data-f=name]", dr).textContent = p.name; $("[data-f=desc]", dr).textContent = p.desc; $("[data-f=rows]", dr).innerHTML = p.rows.map((r) => `<tr><th scope="row">${r[0]}</th><td>${r[1]}</td></tr>`).join(""); $("[data-f=media]", dr).innerHTML = p.media; $("[data-f=page]", dr).href = p.url; $("[data-f=quote]", dr).href = p.quote; };
    const open = (i) => { last = d.activeElement; fill(i); d.dispatchEvent(new CustomEvent("spec:open", { detail: i })); wrap.classList.add("open"); wrap.setAttribute("aria-hidden", "false"); d.body.style.overflow = "hidden"; setTimeout(() => $(".x", dr).focus(), 60); };
    const close = () => { d.dispatchEvent(new CustomEvent("spec:close")); wrap.classList.remove("open"); wrap.setAttribute("aria-hidden", "true"); d.body.style.overflow = ""; if (last) last.focus({ preventScroll: true }); };
    const swap = (i) => { dr.classList.add("swapping"); setTimeout(() => { fill((i + P.length) % P.length); d.dispatchEvent(new CustomEvent("spec:open", { detail: (i + P.length) % P.length })); dr.classList.remove("swapping"); }, 200); };
    $$("[data-quick]").forEach((a) => a.addEventListener("click", (e) => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); open(+a.dataset.quick); }));
    $(".x", dr).addEventListener("click", close); $(".scrim", wrap).addEventListener("click", close);
    $("[data-f=prev]", dr).addEventListener("click", () => swap(cur - 1)); $("[data-f=next]", dr).addEventListener("click", () => swap(cur + 1));
    addEventListener("keydown", (e) => {
      if (!wrap.classList.contains("open")) return;
      if (e.key === "Escape") close(); else if (e.key === "ArrowRight") swap(cur + (AR ? -1 : 1)); else if (e.key === "ArrowLeft") swap(cur + (AR ? 1 : -1));
      else if (e.key === "Tab") { const f = $$("a[href],button", dr).filter((x) => x.offsetParent); if (!f.length) return; if (e.shiftKey && d.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && d.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); } }
    });
  }

  /* ================= inquiry console (C9) ================= */
  const form = $("form.rfq");
  if (form) {
    const msg = $(".formmsg", form), T = JSON.parse($("#form-i18n").textContent), panes = $$(".cpane", form), bars = $$(".console-steps span", form), back = $("[data-back]", form), fwd = $("[data-fwd]", form);
    let step = 0, sentAt = 0;
    const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
    // every field error is tied to its field for assistive technology
    $$(".f", form).forEach((f) => { const el = $("input:not([type=radio]),select,textarea", f), er = $(".err", f); if (el && er && el.id) { er.id = el.id + "-err"; el.setAttribute("aria-describedby", er.id); } });
    const q = new URLSearchParams(location.search).get("product"), need = new URLSearchParams(location.search).get("need");
    if (need) { const ta = $("#f-msg", form); if (ta && !ta.value) ta.value = need; }
    if (q) { const r = $$("[name=product]", form).find((x) => x.value === q); if (r) r.checked = true; }
    const show = (s) => {
      step = s; panes.forEach((p, i) => p.classList.toggle("on", i === s)); bars.forEach((b, i) => b.classList.toggle("on", i <= s));
      $(".stepnm", form).innerHTML = `<span>${T.stepNames[s]}</span><span>0${s + 1} / 03</span>`;
      back.style.visibility = s ? "visible" : "hidden"; fwd.firstChild.textContent = s < 2 ? T.next + " " : T.send + " "; msg.textContent = "";
      if (s === 2) { const v = Object.fromEntries(new FormData(form)); $(".review", form).innerHTML = T.labels.map(([k, l]) => `<div><dt>${l}</dt><dd>${esc(v[k] || "—")}</dd></div>`).join(""); }
      const f = $("input,select,textarea", panes[s]); if (f && d.activeElement !== d.body) f.focus({ preventScroll: true });
    };
    const valid = (s) => {
      let ok = true;
      $$(".f", panes[s]).forEach((f) => { const el = $("input:not([type=radio]),select,textarea", f), er = $(".err", f); if (!el || !er) return; let m = ""; if (el.required && !el.value.trim()) m = T.required; else if (el.type === "email" && el.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim())) m = T.email; else if (el.type === "tel" && el.value.trim() && !/^\+?[\d\s().-]{7,20}$/.test(el.value.trim())) m = T.phone; f.classList.toggle("bad", !!m); er.textContent = m; el.setAttribute("aria-invalid", m ? "true" : "false"); if (m) ok = false; });
      if (s === 0) { const p = $("[name=product]:checked", form), er = $("#prod-err", form), g = $("[role=radiogroup]", form); er.textContent = p ? "" : T.required; if (g) g.setAttribute("aria-invalid", p ? "false" : "true"); if (!p) ok = false; }
      return ok;
    };
    fwd.addEventListener("click", () => {
      if (step < 2) { if (valid(step)) show(step + 1); else msg.textContent = T.fix; return; }
      if (!$("[name=consent]", form).checked) { msg.textContent = T.consent; return; }
      if (Date.now() - sentAt < 4000) return; sentAt = Date.now();   // one mail hand-off per click burst
      const v = Object.fromEntries(new FormData(form));
      const body = T.labels.map(([k, l]) => `${l}: ${v[k] || "-"}`).join("\n") + "\n\n" + (v.message || "");
      location.href = `mailto:${form.dataset.to}?subject=${encodeURIComponent(T.subject + " — " + v.product)}&body=${encodeURIComponent(body)}`;
      msg.textContent = T.sent;
    });
    back.addEventListener("click", () => show(step - 1));
    form.addEventListener("submit", (e) => e.preventDefault());
    show(0);
  }

  /* ================= engine ================= */
  let ticking = false; const hasDive = !!$(".dive");
  function frame() {
    ticking = false; const y = scrollY, h = root.scrollHeight - innerHeight;
    if (envs.length) measureEnv();                               // read
    const run = scenes.filter((s) => s.vis), ps = run.map((s) => (s.pr ? s.pr(s.el) : progress(s.el))); // read
    if (overHero) top.classList.toggle("solid", y > innerHeight * 0.85 || !hasDive); // write…
    if (prog) prog.style.transform = `scaleX(${h > 0 ? clamp(y / h) : 0})`;
    env();
    run.forEach((s, i) => s.fn(ps[i]));
  }
  const kick = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  addEventListener("scroll", kick, { passive: true });
  let rz = 0; addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(kick, 120); }, { passive: true });
  if (scrollY > 0) kick(); else { addEventListener("load", kick); }
})();
