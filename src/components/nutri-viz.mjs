import { GEO } from "./sardine-geo.mjs";

/* =====================================================================================================
   Interactive marine nutritional composition — «القيمة الكامنة في الخامات»
   One persistent, multilayer SVG built over the approved sardine illustration (rw-illus). Every layer shares the
   1600×900 canvas of that artwork (see sardine-geo.mjs), so professional artwork can replace any layer later by
   dropping in a group drawn on the same canvas — the state config, CSS and controller do not change.

   PROVISIONAL ARTWORK: the anatomical, molecular and indicator layers below are schematic illustrations drawn in
   code, not approved production artwork. Molecular drawings: the amino-acid chain is a conceptual peptide chain;
   EPA (C20:5 n-3, double bonds at C5, 8, 11, 14, 17) and DHA (C22:6 n-3, C4, 7, 10, 13, 16, 19) are skeletal
   formulas with correct carbon counts and double-bond positions, drawn as straight zigzags (cis geometry not shown).
   No percentages or measurements are shown; highlighted regions are illustrative, not where nutrients are exclusive.
   ===================================================================================================== */

/* declarative state config — n = state index on .rw-nu[data-n]; "x" is the default whole-fish state */
export const NV_STATES = [
  { n: "x", layers: [] },
  { n: "0", key: "protein", layers: ["muscle", "lens", "fib", "lead-p", "mark-p"] },
  { n: "1", key: "amino", layers: ["muscle", "lens", "mol", "lead-p", "mark-p"] },
  { n: "2", key: "lipid", layers: ["lipid", "drops", "lens", "drop1", "lead-l", "mark-l"] },
  { n: "3", key: "omega", layers: ["lipid", "drops", "omega", "lead-o", "mark-o"] },
  { n: "4", key: "minerals", layers: ["tint", "skel", "min"] },
  { n: "5", key: "vitamins", layers: ["vit"] },
];

const VB = { x: 250, y: 110, w: 1100, h: 618.75 };       // crop of the 1600×900 canvas (16:9) that frames the fish
const at = (arr, x) => {                                  // linear interpolation along a per-x sample list
  for (let i = 1; i < arr.length; i++) if (arr[i][0] >= x) { const [x0, y0] = arr[i - 1], [x1, y1] = arr[i]; return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0 || 1); }
  return arr[arr.length - 1][1];
};
const spine = (x) => at(GEO.spine, x), top = (x) => at(GEO.top, x), bot = (x) => at(GEO.bot, x);
const r1 = (v) => Math.round(v * 10) / 10;
const LENS = { cx: 600, cy: 246, r: 122 };
const lead = (cls, ax, ay, c = LENS) => {                 // leader line from a lens/capsule edge to an anatomical anchor
  const dx = ax - c.cx, dy = ay - c.cy, d = Math.hypot(dx, dy), sx = c.cx + (dx / d) * c.r, sy = c.cy + (dy / d) * c.r;
  return `<path class="nv-L nv-lead ${cls}" pathLength="1" d="M${r1(sx)} ${r1(sy)} Q${r1((sx + ax) / 2 + 30)} ${r1((sy + ay) / 2)} ${ax} ${ay}"/>`;
};
const mark = (cls, x, y) => `<g class="nv-L nv-mark ${cls}" transform="translate(${x} ${y})"><circle r="16"/><circle class="nv-ping" r="16"/><circle class="nv-core" r="4.5"/></g>`;

/* skeletal formula of a fatty acid: n carbons, double bonds after carbons in `db`, carboxyl at C1 */
const fattyAcid = (x0, y, n, db, dx = 30, h = 17) => {
  const P = Array.from({ length: n }, (_, i) => [x0 + i * dx, i % 2 ? y - h : y]);
  let d = "";
  for (let i = 0; i < n - 1; i++) d += `M${P[i][0]} ${P[i][1]}L${P[i + 1][0]} ${P[i + 1][1]}`;
  const dbl = db.map((c) => { const [a, b] = [P[c - 1], P[c]], vx = b[0] - a[0], vy = b[1] - a[1], L = Math.hypot(vx, vy), nx = -vy / L, ny = vx / L, s = ny > 0 ? 5.5 : -5.5;
    const ax = a[0] + vx * 0.16 + nx * s, ay = a[1] + vy * 0.16 + ny * s, bx = b[0] - vx * 0.16 + nx * s, by = b[1] - vy * 0.16 + ny * s;
    return `M${r1(ax)} ${r1(ay)}L${r1(bx)} ${r1(by)}`; }).join("");
  const [c1x, c1y] = P[0];
  const cooh = `M${c1x} ${c1y}L${c1x - 24} ${c1y + 14}M${c1x - 3} ${c1y + 5}L${c1x - 22} ${c1y + 16}M${c1x} ${c1y}L${c1x - 24} ${c1y - 14}`;
  const [wx, wy] = P[n - 1];
  return `<path class="nv-bond" d="${d}${cooh}"/><path class="nv-bond nv-db" d="${dbl}"/>
    <text class="nv-atom" x="${c1x - 34}" y="${c1y + 30}">O</text><text class="nv-atom" x="${c1x - 62}" y="${c1y - 16}">HO</text>
    <text class="nv-omega-end" x="${wx + 8}" y="${wy + (n % 2 ? 6 : -4)}">ω</text>`;
};

export const nutriViz = (lang, alt) => {
  const ar = lang === "ar";
  const T = ar ? { lys: "الليسين", met: "الميثيونين", thr: "الثريونين", ca: "الكالسيوم", p: "الفوسفور", vit: "Vit", play: "إيقاف العرض التلقائي", epa: "حمض إيكوسابنتاينويك", dha: "حمض دوكوساهيكسانويك" }
               : { lys: "Lysine", met: "Methionine", thr: "Threonine", ca: "Calcium", p: "Phosphorus", vit: "Vit", play: "Pause autoplay", epa: "Eicosapentaenoic acid", dha: "Docosahexaenoic acid" };

  /* muscle: myomeres (W-shaped myosepta) pointing toward the head */
  let myo = "";
  for (let x = 468; x <= 1052; x += 30) { const t = top(x) + 5, b = bot(x) - 5, m = spine(x);
    myo += `M${x} ${r1(t)}Q${x + 26} ${r1((t + m) / 2)} ${x + 6} ${r1(m)}Q${x + 26} ${r1((m + b) / 2)} ${x} ${r1(b)}`; }

  /* skeleton: vertebral column, neural/haemal spines, ribs, skull, caudal rays */
  let vert = "", spines = "", ribs = "";
  for (let x = 440; x <= 1066; x += 17) { const y = spine(x), y2 = spine(x + 4), a = (Math.atan2(y2 - y, 4) * 180) / Math.PI;
    vert += `<rect x="${x - 6}" y="${r1(y - 8.5)}" width="12" height="17" rx="4" transform="rotate(${r1(a)} ${x} ${r1(y)})"/>`;
    spines += `M${x} ${r1(y - 9)}L${x - 7} ${r1(top(x) + 12)}`;
    if (x < 700) spines += `M${x} ${r1(y + 9)}L${x - 8} ${r1(bot(x) - 12)}`;
    else if (x % 2 === 0) ribs += `M${x} ${r1(y + 8)}Q${x + 4} ${r1((y + bot(x)) / 2 + 6)} ${x - 18} ${r1(bot(x) - 9)}`; }
  const hx0 = 1072, eye = [1160, 490];
  const skull = `M${hx0} ${r1(top(hx0) + 8)}C1120 ${r1(top(1120) + 4)} 1190 ${r1(top(1190) + 6)} 1226 ${r1(spine(1226) + 8)}C1190 ${r1(bot(1190) - 6)} 1120 ${r1(bot(1120) - 8)} ${hx0} ${r1(bot(hx0) - 10)}`;
  const oper = `M1088 ${r1(top(1088) + 12)}Q1112 ${r1(spine(1100) + 20)} 1086 ${r1(bot(1088) - 10)}`;
  const tailPts = (() => { const m = GEO.outline.match(/[\d.]+ [\d.]+/g).map((p) => p.split(" ").map(Number)).filter(([x]) => x <= 418); return m.filter((_, i) => i % 3 === 0); })();
  const rays = tailPts.map(([x, y]) => `M424 ${r1(spine(424) + (y - spine(424)) * 0.08)}L${x + 6} ${y}`).join("");

  /* amino-acid chain (conceptual) inside the lens */
  const AA = [[520, 284], [552, 250], [584, 286], [616, 250], [648, 286], [680, 250]];
  const key = { 1: ["Lys", "lys", "#0C3048"], 3: ["Met", "met", "#E38B06"], 5: ["Thr", "thr", "#2F7FB5"] };
  const chain = AA.slice(1).map(([x, y], i) => `M${AA[i][0]} ${AA[i][1]}L${x} ${y}`).join("");
  const side = Object.keys(key).map((k) => { const [x, y] = AA[k]; return `M${x} ${y}L${x} ${y - 34}`; }).join("");

  /* lipid droplets (body) */
  const DROPS = [[560, 542, 9], [640, 562, 11], [722, 522, 8], [800, 576, 12], [880, 548, 9], [960, 572, 10], [1020, 532, 8], [700, 588, 7]];

  /* vitamins: four indicators on a light orbital path above the fish */
  const VIT = [["A", 430, 300, 1], ["D", 660, 214, 0.9], ["E", 990, 222, 1], ["B12", 1236, 326, 0.92]];

  const bodyClip = `clip-path="url(#nvBody)"`;
  return `<svg class="nv" viewBox="${VB.x} ${VB.y} ${VB.w} ${VB.h}" direction="ltr" role="img" aria-label="${alt}" focusable="false">
  <defs>
    <clipPath id="nvBody"><path d="${GEO.body}"/></clipPath>
    <clipPath id="nvTrunk"><rect x="380" y="0" width="694" height="900"/></clipPath>
    <clipPath id="nvLens"><circle cx="${LENS.cx}" cy="${LENS.cy}" r="${LENS.r - 4}"/></clipPath>
    <linearGradient id="nvMuscle" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9C3B35"/><stop offset=".45" stop-color="#C85E52"/><stop offset="1" stop-color="#E49A86"/></linearGradient>
    <radialGradient id="nvSoft"><stop offset=".45" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>
    <mask id="nvReveal" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="900"><rect x="0" y="0" width="1600" height="900" fill="#000"/><circle class="nv-rv" cx="760" cy="515" r="330" fill="url(#nvSoft)"/></mask>
    <pattern id="nvFibP" width="44" height="13" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)"><rect width="44" height="13" fill="#B94E44"/><path d="M0 6.5Q11 3 22 6.5T44 6.5" fill="none" stroke="#E7A291" stroke-width="2.2"/><path d="M11 0v13M33 0v13" stroke="#8E332E" stroke-width="1" opacity=".55"/></pattern>
    <linearGradient id="nvSweep" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".38"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <radialGradient id="nvAmber" cx=".38" cy=".34" r=".7"><stop offset="0" stop-color="#FFF1C8" stop-opacity=".95"/><stop offset=".45" stop-color="#F1BE57" stop-opacity=".9"/><stop offset="1" stop-color="#B9731B" stop-opacity=".85"/></radialGradient>
    <linearGradient id="nvAmberCap" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF4D6" stop-opacity=".92"/><stop offset="1" stop-color="#F3CF7E" stop-opacity=".9"/></linearGradient>
    <linearGradient id="nvFat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F4C766" stop-opacity="0"/><stop offset="1" stop-color="#E6A43A" stop-opacity=".75"/></linearGradient>
  </defs>

  <image class="nv-skin" href="/img/rw-illus-1600.webp" x="0" y="0" width="1600" height="900" preserveAspectRatio="none"/>

  <g class="nv-L nv-tint"><path d="${GEO.body}" fill="rgba(251,248,243,.55)" stroke="rgba(12,48,72,.45)" stroke-width="2"/><path d="${GEO.outline}" fill="none" stroke="rgba(12,48,72,.28)" stroke-width="1.5" stroke-dasharray="5 6"/></g>

  <g class="nv-L nv-lipid" ${bodyClip}>
    <path d="${GEO.body}" fill="none" stroke="#E9B24C" stroke-width="30" stroke-opacity=".55"/>
    <path d="M540 ${r1(bot(540) - 34)}${[600, 680, 760, 840, 920, 1000, 1050].map((x) => `L${x} ${r1(bot(x) - 42)}`).join("")}L1050 ${r1(bot(1050))}L540 ${r1(bot(540))}Z" fill="url(#nvFat)"/>
    <path d="M460 ${r1(spine(460) - 16)}${[560, 680, 800, 920, 1040].map((x) => `L${x} ${r1(spine(x) - 16)}`).join("")}" fill="none" stroke="#F0C060" stroke-width="9" stroke-opacity=".45" stroke-linecap="round"/>
  </g>

  <g class="nv-L nv-muscle" ${bodyClip}><g clip-path="url(#nvTrunk)"><g mask="url(#nvReveal)">
    <path d="${GEO.body}" fill="url(#nvMuscle)" opacity=".82"/>
    <path class="nv-myo" d="${myo}" fill="none" stroke="#F6C7B9" stroke-width="2.2" stroke-linecap="round"/>
  </g></g></g>

  <g class="nv-L nv-skel">
    <path d="${spines}${ribs}" fill="none" stroke="#E9DCC0" stroke-width="5" stroke-linecap="round" opacity=".55"/>
    <path d="${spines}${ribs}" fill="none" stroke="#B49A6A" stroke-width="1.8" stroke-linecap="round"/>
    <path d="${skull}" fill="rgba(246,236,214,.75)" stroke="#B49A6A" stroke-width="2"/><path d="${oper}" fill="none" stroke="#B49A6A" stroke-width="2"/>
    <circle cx="${eye[0]}" cy="${eye[1]}" r="21" fill="none" stroke="#B49A6A" stroke-width="2"/>
    <path d="${rays}" fill="none" stroke="#C8B183" stroke-width="1.5" stroke-linecap="round"/>
    <g class="nv-vert" fill="#F6EDD8" stroke="#A88E5E" stroke-width="1.6">${vert}</g>
  </g>

  <g class="nv-L nv-drops">${DROPS.map(([x, y, r], i) => `<g class="nv-dp" style="--i:${i}"><circle cx="${x}" cy="${y}" r="${r}" fill="url(#nvAmber)"/><circle cx="${x - r * 0.35}" cy="${y - r * 0.38}" r="${r1(r * 0.28)}" fill="#fff" opacity=".75"/></g>`).join("")}</g>

  ${lead("lead-p", 690, 506)}${lead("lead-l", 800, 576)}${lead("lead-o", 860, 562, { cx: 800, cy: 245, r: 118 })}
  ${mark("mark-p", 690, 506)}${mark("mark-l", 800, 576)}${mark("mark-o", 860, 562)}

  <g class="nv-L nv-lens">
    <circle cx="${LENS.cx}" cy="${LENS.cy}" r="${LENS.r + 10}" fill="#fff" opacity=".9"/>
    <g clip-path="url(#nvLens)">
      <circle cx="${LENS.cx}" cy="${LENS.cy}" r="${LENS.r}" fill="#FBF6EC"/>
      <g class="nv-L nv-fib"><rect x="${LENS.cx - LENS.r}" y="${LENS.cy - LENS.r}" width="${LENS.r * 2}" height="${LENS.r * 2}" fill="url(#nvFibP)"/>
        <rect class="nv-sweep" x="${LENS.cx - LENS.r - 90}" y="${LENS.cy - LENS.r}" width="90" height="${LENS.r * 2}" fill="url(#nvSweep)"/></g>
      <g class="nv-L nv-mol">
        <path class="nv-chain" pathLength="1" d="${chain}${side}" fill="none" stroke="#0C3048" stroke-width="3" stroke-linecap="round"/>
        ${AA.map(([x, y], i) => key[i] ? `<g class="nv-aa" style="--i:${i}"><circle cx="${x}" cy="${y - 34}" r="16" fill="${key[i][2]}"/><text x="${x}" y="${y - 29}" class="nv-aa-t">${key[i][0]}</text></g>` : "").join("")}
        ${AA.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#fff" stroke="#0C3048" stroke-width="2.5"/>`).join("")}
      </g>
      <g class="nv-L nv-drop1"><g class="nv-wob"><circle cx="${LENS.cx}" cy="${LENS.cy}" r="80" fill="url(#nvAmber)"/><ellipse cx="${LENS.cx - 26}" cy="${LENS.cy - 34}" rx="24" ry="13" fill="#fff" opacity=".7" transform="rotate(-24 ${LENS.cx - 26} ${LENS.cy - 34})"/>
        <circle cx="${LENS.cx + 28}" cy="${LENS.cy + 22}" r="12" fill="#FFF3CF" opacity=".55"/><circle cx="${LENS.cx - 18}" cy="${LENS.cy + 36}" r="7" fill="#FFF3CF" opacity=".5"/></g></g>
    </g>
    <circle cx="${LENS.cx}" cy="${LENS.cy}" r="${LENS.r}" fill="none" stroke="#0C3048" stroke-width="4"/>
    <circle cx="${LENS.cx}" cy="${LENS.cy}" r="${LENS.r - 7}" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>
    <g class="nv-L nv-mol nv-legend">${[1, 3, 5].map((k, j) => `<g transform="translate(748 ${172 + j * 44})"><circle r="9" fill="${key[k][2]}"/><text x="20" y="7" class="nv-lg-a">${key[k][0]}</text><text x="74" y="7" class="nv-lg-n">${T[key[k][1]]}</text></g>`).join("")}</g>
  </g>

  <g class="nv-L nv-omega">
    <rect x="330" y="128" width="940" height="236" rx="118" fill="url(#nvAmberCap)" stroke="#D9A23F" stroke-width="2.5"/>
    <ellipse cx="470" cy="160" rx="110" ry="14" fill="#fff" opacity=".45"/>
    <g class="nv-row nv-epa"><text x="372" y="200" class="nv-fa">EPA</text><text x="372" y="222" class="nv-fa-s">C20:5 ω-3</text>${fattyAcid(600, 214, 20, [5, 8, 11, 14, 17])}</g>
    <g class="nv-row nv-dha"><text x="372" y="292" class="nv-fa">DHA</text><text x="372" y="314" class="nv-fa-s">C22:6 ω-3</text>${fattyAcid(600, 306, 22, [4, 7, 10, 13, 16, 19])}</g>
  </g>

  <g class="nv-L nv-min">
    ${[["Ca", T.ca, 520, 205, [[620, spine(620)]]], ["P", T.p, 1010, 196, [[900, spine(900)], [1130, top(1130) + 26]]]].map(([s, name, x, y, anc]) =>
      `<g class="nv-mi">${anc.map(([ax, ay]) => `<path class="nv-lead" pathLength="1" d="M${x} ${y + 34}Q${r1((x + ax) / 2)} ${r1(y + 120)} ${ax} ${r1(ay)}"/><circle class="nv-core" cx="${ax}" cy="${r1(ay)}" r="5"/><circle class="nv-ping2" cx="${ax}" cy="${r1(ay)}" r="12"/>`).join("")}
        <circle cx="${x}" cy="${y}" r="34" fill="#FBF3E2" stroke="#B49A6A" stroke-width="2.5"/><text x="${x}" y="${y + 10}" class="nv-el">${s}</text><text x="${x + 46}" y="${y + 8}" class="nv-el-n">${name}</text></g>`).join("")}
  </g>

  <g class="nv-L nv-vit">
    <path d="M330 420C340 250 560 150 800 150S1250 210 1330 400" fill="none" stroke="#C99A3E" stroke-width="1.6" stroke-dasharray="3 9" opacity=".6"/>
    ${VIT.map(([v, x, y, s], i) => `<g transform="translate(${x} ${y}) scale(${s})" opacity="${s < 1 ? 0.82 : 1}"><g class="nv-orb" style="--i:${i}"><circle r="48" fill="#fff" stroke="#E3B860" stroke-width="3"/><circle r="40" fill="none" stroke="#F3E2BF" stroke-width="1.5"/>
      <text y="-14" class="nv-vt-s">${T.vit}</text><text y="${v.length > 1 ? 20 : 24}" class="nv-vt${v.length > 1 ? " sm" : ""}">${v}</text></g></g>`).join("")}
  </g>
</svg>
<button type="button" class="nv-play" aria-pressed="true" data-on="${T.play}" data-off="${ar ? "تشغيل العرض التلقائي" : "Play autoplay"}" aria-label="${T.play}"><i aria-hidden="true"></i></button>`;
};
