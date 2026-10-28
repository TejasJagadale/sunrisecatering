// Generates the illustrated SAMPLE images in public/images/sample/.
// These are placeholders – not photos of Sunrise Caterers' work.
// Replace them with real photographs via src/config/images.js (see README).
//
//   npm run images
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(root, 'public/images/sample');
fs.mkdirSync(OUT, { recursive: true });

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */
const C = {
  green: '#183F32', orange: '#F47B35', cream: '#FFF7E9', yellow: '#FFD66B', red: '#DB493B', char: '#242824',
  leaf: '#3E8E55', leafD: '#2A6B3F', leafL: '#6DBB7C', white: '#FFFCF4', brown: '#8A5A36', gold: '#E9B44C',
  pink: '#F4A6A0', steel: '#D9D6CC', steelD: '#B9B5A8',
};
const THEMES = {
  warm: { bg: '#FFEBC8', bg2: '#FFD66B', table: '#8A5A36', ink: C.green },
  cream: { bg: '#FFF7E9', bg2: '#FBDCA8', table: '#C98B52', ink: C.green },
  green: { bg: '#1E4F3F', bg2: '#2C6652', table: '#13342A', ink: C.cream },
  sunset: { bg: '#F9B27A', bg2: '#F47B35', table: '#7A4A2B', ink: C.green },
  rose: { bg: '#F8D4C6', bg2: '#EE9B86', table: '#8F4B3C', ink: C.green },
  sage: { bg: '#D4E6CC', bg2: '#A5CF9F', table: '#5B7B4D', ink: C.green },
  dusk: { bg: '#2B3B34', bg2: '#183F32', table: '#0F241C', ink: C.cream },
  butter: { bg: '#FFE7A0', bg2: '#FFD66B', table: '#A8672F', ink: C.green },
};

const rng = (seed) => { let s = seed >>> 0; return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296; };
const n = (v) => Math.round(v * 10) / 10;
const circle = (x, y, r, fill, extra = '') => `<circle cx="${n(x)}" cy="${n(y)}" r="${n(r)}" fill="${fill}" ${extra}/>`;
const ell = (x, y, rx, ry, fill, extra = '') => `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(rx)}" ry="${n(ry)}" fill="${fill}" ${extra}/>`;
const rect = (x, y, w, h, fill, r = 0, extra = '') => `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${r}" fill="${fill}" ${extra}/>`;
const pth = (d, fill = 'none', stroke = 'none', sw = 0, extra = '') => `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
const g = (t, inner) => `<g transform="${t}">${inner}</g>`;

const mound = (x, y, r, col, hl = '#fff') =>
  circle(x, y, r, col) + pth(`M${n(x - r * 0.6)} ${n(y - r * 0.15)} Q${n(x - r * 0.3)} ${n(y - r * 0.75)} ${n(x + r * 0.25)} ${n(y - r * 0.62)}`, 'none', hl, r * 0.13, 'stroke-opacity=".55"');

const plate = (x, y, r, fill = C.white) =>
  ell(x + r * 0.05, y + r * 0.1, r, r * 0.97, '#000', 'opacity=".14"') + circle(x, y, r, fill) + circle(x, y, r * 0.78, 'none', `stroke="${C.steel}" stroke-width="${n(r * 0.035)}"`);

const flame = (x, y, s = 1) =>
  `<path d="M${x} ${y - 34 * s} Q${x + 15 * s} ${y - 12 * s} ${x + 9 * s} ${y} Q${x} ${y + 9 * s} ${x - 9 * s} ${y} Q${x - 15 * s} ${y - 12 * s} ${x} ${y - 34 * s}Z" fill="${C.orange}"/><path d="M${x} ${y - 20 * s} Q${x + 7 * s} ${y - 8 * s} ${x + 4 * s} ${y - 1 * s} Q${x} ${y + 3 * s} ${x - 4 * s} ${y - 1 * s} Q${x - 7 * s} ${y - 8 * s} ${x} ${y - 20 * s}Z" fill="${C.yellow}"/>`;

function leaf(x, y, rx, ry, rot = 0) {
  let veins = '';
  for (let i = -8; i <= 8; i++) {
    const vx = (i * rx) / 9;
    const h = ry * 0.92 * Math.sqrt(1 - (vx / rx) ** 2);
    veins += `<path d="M${n(vx)} 0 L${n(vx + 26)} ${n(-h)} M${n(vx)} 0 L${n(vx + 26)} ${n(h)}" stroke="${C.leafL}" stroke-opacity=".42" stroke-width="3" fill="none"/>`;
  }
  return `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M${-rx} 0 Q${-rx * 0.5} ${-ry * 1.2} 0 ${-ry} Q${rx * 0.5} ${-ry * 1.2} ${rx} 0 Q${rx * 0.5} ${ry * 1.2} 0 ${ry} Q${-rx * 0.5} ${ry * 1.2} ${-rx} 0Z" fill="${C.leaf}"/>${veins}<path d="M${-rx} 0 L${rx} 0" stroke="${C.leafD}" stroke-width="6" stroke-linecap="round"/></g>`;
}

function banana(x, y, s = 1, rot = 0) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0 Q60 20 120 -50 Q126 -58 118 -62 Q70 0 -4 -22 Z" fill="${C.yellow}" stroke="#C9962B" stroke-width="4" stroke-linejoin="round"/><circle cx="-2" cy="-10" r="6" fill="${C.brown}"/><circle cx="120" cy="-58" r="5" fill="${C.brown}"/></g>`;
}

function garland(x1, y1, cx, cy, x2, y2, r = 15, step = 0.045) {
  let s = '';
  let i = 0;
  for (let t = 0; t <= 1.0001; t += step) {
    const x = (1 - t) ** 2 * x1 + 2 * (1 - t) * t * cx + t ** 2 * x2;
    const y = (1 - t) ** 2 * y1 + 2 * (1 - t) * t * cy + t ** 2 * y2;
    s += circle(x, y, r, i % 3 === 0 ? C.yellow : i % 3 === 1 ? C.orange : '#F9A23B') + circle(x, y, r * 0.35, '#B9561F', 'opacity=".55"');
    i++;
  }
  return s;
}

function wrap(w, h, t, inner, seed) {
  const r = rng(seed);
  const s = (Math.min(w, h) / 1000) * (w / h > 1.4 ? 1.12 : 1);
  let bg = `<rect width="${w}" height="${h}" fill="${t.bg}"/>`;
  bg += circle(w * 0.84, h * 0.1, Math.min(w, h) * 0.55, t.bg2, 'opacity=".55"');
  bg += circle(w * 0.08, h * 0.96, Math.min(w, h) * 0.36, t.bg2, 'opacity=".4"');
  for (let i = 0; i < 30; i++) {
    bg += circle(r() * w, r() * h, 3 + r() * 8, [C.orange, C.yellow, C.red, C.leaf][i % 4], 'opacity=".32"');
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="Illustrated sample image">${bg}<g transform="translate(${n((w - 1000 * s) / 2)} ${n((h - 1000 * s) / 2)}) scale(${n(s * 1000) / 1000})">${inner}</g></svg>`;
}

/* ------------------------------------------------------------------ */
/* scenes – each draws inside a 1000 x 1000 box                         */
/* ------------------------------------------------------------------ */
const scenes = {
  sadya(t, r) {
    let s = rect(-2000, 790, 5000, 3000, t.table);
    s += ell(500, 800, 520, 60, '#000', 'opacity=".15"');
    s += leaf(500, 520, 470, 330, -6);
    const cols = ['#E9B44C', '#E8642C', '#7DBB5D', '#B7352B', '#F6EFD9', '#7A4326', '#E8C98A'];
    cols.forEach((c, i) => { s += mound(200 + i * 100, 340 + (i % 2) * 14 + Math.abs(i - 3) * 8, 36, c); });
    s += mound(420, 530, 112, '#FFFDF7');
    for (let i = 0; i < 40; i++) s += circle(350 + r() * 140, 470 + r() * 120, 3, '#E9E2CE', 'opacity=".8"');
    s += circle(640, 520, 58, '#E8C98A') + circle(640, 520, 48, '#F2D9A0');
    for (let i = 0; i < 10; i++) s += circle(615 + r() * 50, 497 + r() * 46, 4, '#C98B52');
    s += banana(250, 690, 0.9, -8) + banana(310, 720, 0.8, 4);
    s += mound(520, 690, 40, '#6DBB7C') + mound(580, 700, 34, '#E8642C');
    // payasam cup
    s += pth('M690 640 L780 640 L765 725 L705 725 Z', '#FFF7E9', '#C9B88F', 4) + ell(735, 640, 45, 12, '#F2D9A0', 'stroke="#C9B88F" stroke-width="4"');
    for (let i = 0; i < 3; i++) s += pth(`M${450 + i * 40} 410 q-14 -34 0 -62 q14 -26 0 -52`, 'none', '#fff', 7, 'opacity=".5"');
    return s;
  },
  cloche(t, r) {
    let s = rect(-2000, 700, 5000, 3000, t.table) + ell(500, 712, 450, 36, '#000', 'opacity=".18"');
    s += ell(500, 730, 360, 58, C.steel) + ell(500, 718, 345, 48, C.white);
    s += ell(500, 690, 215, 112, '#F2B84B');
    for (let i = 0; i < 90; i++) s += circle(300 + r() * 400, 600 + r() * 160, 4 + r() * 3, i % 5 === 0 ? '#B7352B' : i % 3 === 0 ? '#FFF1BF' : '#F8D27A', 'opacity=".9"');
    s += mound(420, 640, 34, C.red) + mound(560, 650, 30, C.leafL) + mound(500, 610, 36, '#FFF7E9');
    for (let i = 0; i < 4; i++) s += pth(`M${400 + i * 70} 560 q-26 -52 0 -104 q26 -52 0 -104`, 'none', '#fff', 9, 'opacity=".55"');
    s += g('translate(-150 -170) rotate(-22 500 700)', pth('M230 700 Q230 330 500 330 Q770 330 770 700 Z', '#E5E1D5') + pth('M280 640 Q290 420 440 370', 'none', '#fff', 14, 'opacity=".7"') + circle(500, 316, 30, C.steelD) + rect(220, 690, 560, 24, C.steelD, 12));
    [120, 880].forEach((x) => { s += rect(x - 24, 560, 48, 150, C.cream, 8) + flame(x, 560, 1.2); });
    return s;
  },
  buffet(t, r) {
    let s = rect(-2000, 640, 5000, 3000, t.table) + rect(-2000, 600, 5000, 70, C.cream);
    for (let i = 0; i < 12; i++) s += pth(`M${i * 90} 70 L${i * 90 + 45} 150 L${i * 90 + 90} 70Z`, [C.orange, C.yellow, C.red, C.leaf][i % 4]);
    s += pth('M0 70 L1000 70', 'none', C.char, 4);
    const fills = ['#E8642C', '#F2B84B', '#7DBB5D', '#B7352B'];
    for (let i = 0; i < 4; i++) {
      const x = 90 + i * 220;
      s += rect(x, 520, 190, 90, C.steel, 8) + ell(x + 95, 520, 100, 26, C.steelD) + ell(x + 95, 520, 86, 18, fills[i]);
      s += pth(`M${x + 30} 520 Q${x + 30} 430 ${x + 95} 430 Q${x + 160} 430 ${x + 160} 520`, 'none', '#fff', 6, 'opacity=".3"');
      s += rect(x + 60, 610, 70, 24, C.steelD, 4) + flame(x + 95, 660, 0.9);
      s += rect(x + 40, 330, 110, 56, C.cream, 10, `stroke="${C.char}" stroke-width="4"`) + rect(x + 58, 350, 74, 8, C.char, 4) + rect(x + 70, 366, 50, 6, C.char, 3);
      s += rect(x + 93, 386, 4, 44, C.char);
    }
    for (let i = 0; i < 5; i++) s += ell(120 + i * 6, 728 - i * 14, 70, 16, C.white, `stroke="${C.steel}" stroke-width="3"`);
    for (let i = 0; i < 5; i++) s += ell(860 + i * 2, 740 - i * 14, 70, 16, C.white, `stroke="${C.steel}" stroke-width="3"`);
    return s;
  },
  cake(t, r) {
    let s = rect(-2000, 800, 5000, 3000, t.table) + ell(500, 806, 380, 30, '#000', 'opacity=".16"');
    for (let i = 0; i < 12; i++) s += pth(`M${i * 90} 40 L${i * 90 + 45} 120 L${i * 90 + 90} 40Z`, [C.yellow, C.orange, C.pink, C.leafL][i % 4]);
    [[170, 330, C.red], [270, 230, C.yellow], [830, 300, C.orange], [740, 200, C.leafL], [900, 440, C.pink]].forEach(([x, y, c], i) => {
      s += pth(`M${x} ${y + 60} Q${x + (i % 2 ? 30 : -30)} ${y + 200} 500 780`, 'none', C.char, 2, 'opacity=".4"') + ell(x, y, 56, 70, c) + pth(`M${x - 16} ${y - 30} Q${x - 10} ${y - 50} ${x + 6} ${y - 52}`, 'none', '#fff', 8, 'opacity=".5"');
    });
    s += rect(280, 640, 440, 170, C.pink, 24) + rect(340, 500, 320, 150, C.cream, 24) + rect(410, 380, 180, 130, C.pink, 22);
    [[280, 640, 440], [340, 500, 320], [410, 380, 180]].forEach(([x, y, w]) => { let d = `M${x} ${y + 16}`; for (let k = 0; k < w / 40; k++) d += ` q20 40 40 0`; s += pth(d, C.white, 'none', 0); });
    [450, 500, 550].forEach((x, i) => { s += rect(x - 6, 300, 12, 82, [C.yellow, C.orange, C.leafL][i], 4) + flame(x, 298, 0.9); });
    for (let i = 0; i < 40; i++) s += rect(280 + r() * 440, 640 + r() * 150, 10, 5, [C.yellow, C.orange, C.red, C.leaf][i % 4], 2, `transform="rotate(${n(r() * 180)} 500 700)"`);
    return s;
  },
  lamps(t, r) {
    let s = rect(-2000, 790, 5000, 3000, t.table);
    s += garland(60, 140, 500, 330, 940, 140, 17);
    s += garland(150, 360, 500, 470, 850, 360, 14);
    // nilavilakku
    s += ell(500, 770, 120, 28, C.gold) + rect(480, 440, 40, 330, C.gold, 14) + ell(500, 445, 40, 14, '#C99A2E');
    [[500, 405, 150], [500, 365, 110], [500, 330, 70]].forEach(([x, y, w]) => { s += rect(x - w, y, w * 2, 16, C.gold, 8); [-w + 12, 0, w - 12].forEach((o) => { s += flame(x + o, y - 4, 1.1); }); });
    s += flame(500, 300, 1.4);
    [[170, 800], [300, 830], [700, 830], [830, 800]].forEach(([x, y]) => { s += pth(`M${x - 56} ${y} Q${x} ${y + 56} ${x + 56} ${y} Z`, '#C0522A') + flame(x, y - 4, 0.9); });
    s += plate(880, 880, 0);
    for (let i = 0; i < 7; i++) s += mound(420 + (i % 4) * 54 + (i > 3 ? 27 : 0), 905 - (i > 3 ? 44 : 0), 26, '#F2A33A');
    return s;
  },
  conference(t, r) {
    let s = rect(0, 0, 1000, 1000, 'none') + rect(120, 60, 760, 120, C.green, 16) + rect(170, 95, 400, 14, C.cream, 6) + rect(170, 125, 250, 10, C.yellow, 5);
    [[250, 440], [750, 440], [500, 780]].forEach(([x, y]) => {
      s += circle(x, y, 150, C.white, `stroke="${C.steel}" stroke-width="6"`) + circle(x, y, 40, C.orange) + circle(x, y, 22, C.yellow);
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        s += circle(x + Math.cos(a) * 205, y + Math.sin(a) * 205, 34, [C.green, '#2E6B57'][i % 2]);
        s += circle(x + Math.cos(a) * 112, y + Math.sin(a) * 112, 24, C.white, `stroke="${C.steel}" stroke-width="3"`) + circle(x + Math.cos(a + 0.28) * 126, y + Math.sin(a + 0.28) * 126, 8, '#9BD1E3');
      }
    });
    return s;
  },
  desserts(t, r) {
    let s = rect(-2000, 760, 5000, 3000, t.table) + ell(500, 780, 440, 40, '#000', 'opacity=".15"');
    [[240, 640], [500, 680], [760, 640]].forEach(([x, y], i) => {
      s += pth(`M${x - 90} ${y - 100} L${x + 90} ${y - 100} L${x + 66} ${y + 70} L${x - 66} ${y + 70}Z`, C.cream, '#C9B88F', 5) + ell(x, y - 100, 90, 22, ['#F2D9A0', '#F7C7A0', '#E7E1A8'][i], 'stroke="#C9B88F" stroke-width="5"');
      for (let k = 0; k < 8; k++) s += circle(x - 50 + r() * 100, y - 108 + r() * 14, 4, ['#6B3A22', C.leaf, C.red][k % 3]);
      s += pth(`M${x - 90} ${y - 20} Q${x} ${y + 20} ${x + 90} ${y - 20}`, 'none', [C.orange, C.red, C.leaf][i], 8, 'opacity=".5"');
    });
    // laddu pyramid
    [[430, 470], [500, 470], [570, 470], [465, 410], [535, 410], [500, 350]].forEach(([x, y]) => { s += mound(x, y, 38, '#F2A33A') + circle(x - 8, y - 8, 4, '#C0752A'); });
    // jalebi
    [[160, 480], [840, 480]].forEach(([x, y]) => { s += circle(x, y, 70, '#F7B731', 'opacity=".95"'); s += pth(`M${x} ${y} m-8 0 a8 8 0 1 1 16 0 a16 16 0 1 1 -32 0 a24 24 0 1 1 48 0 a32 32 0 1 1 -64 0 a40 40 0 1 1 80 0`, 'none', '#D9731C', 8); });
    // halwa
    for (let i = 0; i < 5; i++) s += rect(110 + i * 150, 840, 110, 56, ['#E8642C', '#F2B84B', '#7DBB5D', '#B7352B', '#F2B84B'][i], 10) + circle(165 + i * 150, 840, 8, '#FFF7E9');
    return s;
  },
  drinks(t, r) {
    let s = rect(-2000, 780, 5000, 3000, t.table);
    const cols = ['#F47B35', '#DB493B', '#8FD3A6'];
    [[230, 0], [500, 1], [770, 2]].forEach(([x, i]) => {
      s += pth(`M${x - 100} 330 L${x + 100} 330 L${x + 76} 780 L${x - 76} 780Z`, '#EAF4F2', '#B8D6D2', 6, 'opacity=".95"') + pth(`M${x - 92} 420 L${x + 92} 420 L${x + 72} 770 L${x - 72} 770Z`, cols[i], 'none', 0, 'opacity=".92"');
      for (let k = 0; k < 7; k++) s += circle(x - 55 + r() * 110, 450 + r() * 300, 10 + r() * 10, '#fff', 'opacity=".35"');
      s += pth(`M${x + 40} 360 L${x + 90} 190`, 'none', i === 1 ? C.leafL : C.cream, 12) + circle(x - 90, 330, 34, C.yellow, 'stroke="#C9962B" stroke-width="5"') + circle(x - 90, 330, 18, '#FFF1BF');
      s += circle(x, 780, 0, 'none');
    });
    s += circle(500, 270, 0, 'none');
    s += ell(500, 300, 42, 20, C.leafL) + pth('M470 300 q30 -70 60 0', C.leafL);
    return s;
  },
  starters(t, r) {
    let s = rect(-2000, 800, 5000, 3000, t.table) + plate(500, 570, 400, C.white);
    [[400, 450], [520, 420], [640, 470], [350, 590], [480, 560]].forEach(([x, y]) => { s += ell(x, y, 70, 52, '#C98B2C') + ell(x - 6, y - 8, 56, 38, '#E0A53D') + pth(`M${x - 40} ${y - 6} q20 -20 40 -6`, 'none', '#fff', 5, 'opacity=".3"'); });
    [[640, 600], [560, 680], [420, 690]].forEach(([x, y], i) => { s += pth(`M${x - 60} ${y + 40} L${x} ${y - 52} L${x + 60} ${y + 40}Z`, '#D9A04A', '#B87723', 5) + pth(`M${x - 24} ${y + 10} q24 -14 48 0`, 'none', '#B87723', 4); });
    for (let i = 0; i < 4; i++) s += pth(`M${300 + i * 36} 790 L${420 + i * 36} 640`, 'none', C.brown, 6) + circle(330 + i * 36, 750, 14, [C.red, C.leaf, C.yellow, C.red][i]);
    s += circle(850, 760, 74, C.cream, `stroke="${C.steel}" stroke-width="5"`) + circle(850, 760, 54, '#7DBB5D') + circle(150, 740, 70, C.cream, `stroke="${C.steel}" stroke-width="5"`) + circle(150, 740, 50, C.red);
    s += pth('M730 640 a70 70 0 0 1 140 0Z', C.yellow, '#C9962B', 5) + pth('M780 640 l-4 -60 M820 640 l4 -60', 'none', '#E8B84E', 4);
    return s;
  },
  mains(t, r) {
    let s = rect(-2000, 790, 5000, 3000, t.table) + ell(300, 800, 260, 36, '#000', 'opacity=".2"');
    s += pth('M110 560 Q110 800 300 800 Q490 800 490 560Z', '#A52F26') + ell(300, 560, 190, 44, '#8C241D') + rect(86, 586, 40, 26, '#7A1F18', 12) + rect(474, 586, 40, 26, '#7A1F18', 12);
    s += ell(300, 556, 172, 34, '#F2B84B');
    for (let i = 0; i < 90; i++) s += circle(160 + r() * 280, 530 + r() * 50, 4, i % 6 === 0 ? C.red : i % 4 === 0 ? '#fff' : '#F8D27A');
    s += mound(300, 520, 60, '#F8D27A') + circle(250, 500, 12, C.leaf) + circle(340, 500, 12, C.red);
    for (let i = 0; i < 3; i++) s += pth(`M${230 + i * 70} 470 q-24 -50 0 -100 q24 -50 0 -100`, 'none', '#fff', 9, 'opacity=".55"');
    for (let i = 0; i < 5; i++) s += ell(740, 740 - i * 30, 170, 40, i % 2 ? '#E8C98A' : '#F0D7A0', 'stroke="#C9A25B" stroke-width="4"');
    s += pth('M600 700 q50 20 140 20 q90 0 140 -20', 'none', '#C9A25B', 4);
    s += circle(750, 580, 100, C.white, `stroke="${C.steel}" stroke-width="5"`) + circle(750, 580, 76, '#C0432B') + pth('M700 570 q50 -40 100 0 q-50 30 -100 0', '#FFF7E9');
    s += rect(540, 330, 20, 280, C.steelD, 10) + ell(550, 640, 50, 24, C.steel);
    return s;
  },
  prep(t, r) {
    let s = rect(0, 0, 1000, 1000, 'none') + rect(40, 150, 920, 14, C.steelD, 7);
    [[150, 'ladle'], [320, 'spoon'], [490, 'whisk'], [660, 'ladle'], [830, 'spoon']].forEach(([x, k]) => { s += pth(`M${x} 164 L${x} 340`, 'none', C.steelD, 10) + (k === 'whisk' ? ell(x, 390, 28, 52, 'none', `stroke="${C.steelD}" stroke-width="6"`) : ell(x, 370, 34, 40, C.steel)); });
    s += rect(-2000, 760, 5000, 3000, t.table) + rect(40, 770, 440, 40, '#C98B52', 10);
    s += pth('M510 440 L890 440 L860 740 L540 740Z', '#9A9588') + ell(700, 440, 190, 36, '#6F6B60') + ell(700, 446, 170, 26, '#E8642C') + rect(470, 520, 60, 26, '#6F6B60', 12) + rect(870, 520, 60, 26, '#6F6B60', 12);
    for (let i = 0; i < 4; i++) s += pth(`M${620 + i * 50} 400 q-26 -50 0 -100 q26 -50 0 -100`, 'none', '#fff', 10, 'opacity=".55"');
    [560, 640, 720, 800].forEach((x) => { s += flame(x, 790, 1.1); });
    s += circle(130, 690, 52, C.red) + pth('M110 650 q20 -26 40 0', C.leafL) + circle(240, 700, 46, '#E36F57') + circle(330, 690, 44, '#D9C0E3') + pth('M290 690 q40 -50 80 0', 'none', '#A980BC', 4) + pth('M120 730 L220 760', 'none', C.orange, 18) + pth('M270 770 q60 -30 120 0', 'none', C.red, 12) + pth('M380 740 q60 -50 110 -10', 'none', C.leaf, 12);
    s += pth('M70 760 L240 710', 'none', C.steel, 12) + rect(40, 744, 70, 26, C.char, 8, 'transform="rotate(-16 70 760)"');
    return s;
  },
  mandap(t, r) {
    let s = rect(-2000, 800, 5000, 3000, '#8F2A2E') + rect(120, 800, 760, 260, '#B33A3A') + rect(-2000, 780, 5000, 24, C.gold);
    s += rect(130, 250, 70, 540, '#F5E2B8', 8) + rect(800, 250, 70, 540, '#F5E2B8', 8) + rect(110, 230, 780, 50, C.gold, 12) + pth('M130 230 Q500 20 870 230', 'none', C.gold, 26);
    s += pth('M150 270 Q300 380 480 270 Q660 380 850 270', C.cream, 'none', 0, 'opacity=".9"');
    s += garland(165, 270, 165, 520, 165, 780, 13, 0.05) + garland(835, 270, 835, 520, 835, 780, 13, 0.05) + garland(200, 220, 500, 40, 800, 220, 14, 0.04);
    s += ell(500, 740, 130, 24, C.gold) + rect(486, 570, 28, 170, C.gold, 8);
    [[-70, 590], [0, 560], [70, 590]].forEach(([o, y]) => { s += rect(500 + o - 40, y, 80, 12, C.gold, 6) + flame(500 + o, y - 2, 1.1); });
    s += flame(500, 530, 1.5);
    for (let i = 0; i < 40; i++) s += circle(120 + r() * 760, 820 + r() * 160, 6, [C.yellow, C.orange, C.cream][i % 3], 'opacity=".85"');
    return s;
  },
  table(t, r) {
    let s = rect(-2000, 560, 5000, 3000, '#F5ECD6') + rect(-2000, 560, 5000, 30, '#E7D8B3');
    for (let i = 0; i < 14; i++) s += circle(70 + i * 68, 120 + (i % 2) * 18, 8, C.yellow) + pth(`M${70 + i * 68} ${i % 2 ? 138 : 120} L${70 + i * 68} ${i % 2 ? 160 : 140}`, 'none', C.char, 2, 'opacity=".4"');
    s += pth('M0 120 Q500 220 1000 120', 'none', C.char, 3, 'opacity=".35"');
    for (let i = 0; i < 5; i++) {
      const x = 130 + i * 185;
      s += leaf(x, 760, 82, 112, 90) + circle(x - 22, 740, 16, '#FFFDF7') + circle(x + 22, 774, 12, C.red) + circle(x + 22, 734, 12, C.yellow) + circle(x - 22, 790, 12, C.leafL);
      s += pth(`M${x + 66} 668 L${x + 66} 856`, 'none', C.steelD, 7) + pth(`M${x - 84} 668 L${x - 84} 856`, 'none', C.steelD, 7);
    }
    [320, 680].forEach((x) => { s += rect(x - 40, 560, 80, 80, C.cream, 10, `stroke="${C.steel}" stroke-width="4"`) + pth(`M${x} 560 Q${x - 20} 470 ${x - 60} 450 M${x} 560 Q${x + 10} 450 ${x + 6} 420 M${x} 560 Q${x + 30} 470 ${x + 70} 460`, 'none', C.leaf, 8) + circle(x - 60, 450, 22, C.pink) + circle(x + 6, 420, 24, C.orange) + circle(x + 70, 460, 20, C.yellow); });
    [510].forEach((x) => { s += rect(x - 16, 520, 32, 120, C.cream, 6) + flame(x, 520, 1.1); });
    return s;
  },
  family(t, r) {
    let s = circle(500, 500, 380, '#F5ECD6', `stroke="${t.table}" stroke-width="22"`) + circle(500, 500, 120, C.green) + circle(500, 500, 104, C.cream);
    for (let i = 0; i < 9; i++) { const a = (i / 9) * Math.PI * 2; s += circle(500 + Math.cos(a) * 52, 500 + Math.sin(a) * 52, 22, [C.pink, C.orange, C.yellow][i % 3]); }
    s += circle(500, 500, 18, C.red);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
      const x = 500 + Math.cos(a) * 262;
      const y = 500 + Math.sin(a) * 262;
      s += circle(500 + Math.cos(a) * 440, 500 + Math.sin(a) * 440, 66, [C.green, '#2E6B57'][i % 2]);
      s += leaf(x, y, 72, 60, (a * 180) / Math.PI + 90) + circle(x, y, 22, '#FFFDF7') + circle(x + 24, y - 22, 12, C.red) + circle(x - 24, y + 24, 12, C.yellow);
    }
    return s;
  },
  serving(t, r) {
    let s = rect(-2000, 820, 5000, 3000, t.table);
    [[140, 760], [860, 760]].forEach(([x, y]) => { s += circle(x, y, 110, C.cream, `stroke="${C.steel}" stroke-width="6"`); });
    s += rect(360, 560, 280, 330, C.green, 40) + pth('M420 560 L500 700 L580 560Z', C.orange) + rect(410, 700, 180, 190, C.cream, 28) + circle(500, 450, 86, '#E8A878') + pth('M416 430 Q500 330 584 430 Q560 380 500 376 Q440 380 416 430Z', C.char);
    s += circle(470, 458, 8, C.char) + circle(530, 458, 8, C.char) + pth('M470 492 Q500 522 530 492', 'none', C.char, 6) + circle(448, 480, 14, C.orange, 'opacity=".4"') + circle(552, 480, 14, C.orange, 'opacity=".4"');
    s += pth('M640 610 Q760 600 790 470', 'none', C.green, 56) + circle(796, 452, 32, '#E8A878');
    s += rect(660, 400, 280, 28, C.steel, 12) + ell(800, 400, 120, 20, C.steelD) + pth('M690 392 Q690 290 800 290 Q910 290 910 392Z', '#E5E1D5') + circle(800, 276, 18, C.steelD);
    s += pth('M360 640 Q290 700 330 780', 'none', C.green, 56) + circle(334, 796, 30, '#E8A878');
    return s;
  },
};

/* ------------------------------------------------------------------ */
/* image list                                                          */
/* ------------------------------------------------------------------ */
const P = [1200, 1500], L = [1500, 1000], Sq = [1200, 1200], W = [1800, 1000], T = [1000, 1400];
const list = [
  // home
  ['hero-main', 'sadya', P, 'warm'], ['hero-side', 'cloche', Sq, 'green'], ['hero-small', 'starters', L, 'sunset'],
  ['intro', 'family', P, 'butter'],
  // about
  ['about-story', 'prep', P, 'cream'], ['about-kitchen', 'prep', L, 'sage'], ['about-serving', 'serving', P, 'warm'], ['about-setup', 'table', L, 'rose'], ['about-dishes', 'mains', L, 'butter'],
  // services
  ['svc-wedding', 'mandap', P, 'warm'], ['svc-engagement', 'lamps', L, 'rose'], ['svc-birthday', 'cake', L, 'butter'], ['svc-anniversary', 'cloche', L, 'dusk'],
  ['svc-private', 'family', L, 'sage'], ['svc-festival', 'lamps', P, 'sunset'], ['svc-corporate', 'conference', L, 'cream'],
  ['svc-engagement-2', 'table', T, 'warm'], ['svc-festival-2', 'sadya', Sq, 'butter'], ['svc-wedding-2', 'buffet', Sq, 'cream'],
  // weddings
  ['wed-hero', 'mandap', W, 'dusk'], ['wed-feast', 'sadya', P, 'butter'], ['wed-buffet', 'buffet', L, 'warm'], ['wed-planning', 'desserts', L, 'cream'],
  ['wed-prep', 'prep', L, 'sage'], ['wed-serving', 'serving', P, 'rose'], ['wed-engagement', 'lamps', P, 'warm'], ['wed-family', 'family', L, 'butter'], ['wed-table', 'table', W, 'cream'],
  // menu
  ['menu-kerala', 'sadya', L, 'warm'], ['menu-veg', 'mains', L, 'sage'], ['menu-nonveg', 'mains', L, 'sunset'], ['menu-starters', 'starters', L, 'butter'],
  ['menu-mains', 'mains', L, 'cream'], ['menu-desserts', 'desserts', L, 'rose'], ['menu-beverages', 'drinks', L, 'sage'],
  // gallery
  ['g01', 'mandap', P, 'warm'], ['g02', 'sadya', L, 'butter'], ['g03', 'family', Sq, 'cream'], ['g04', 'cake', P, 'rose'], ['g05', 'conference', L, 'sage'],
  ['g06', 'buffet', L, 'sunset'], ['g07', 'desserts', Sq, 'butter'], ['g08', 'table', P, 'cream'], ['g09', 'lamps', L, 'dusk'], ['g10', 'starters', P, 'warm'],
  ['g11', 'cloche', Sq, 'rose'], ['g12', 'drinks', L, 'butter'], ['g13', 'serving', L, 'sage'], ['g14', 'mains', Sq, 'cream'], ['g15', 'prep', P, 'sunset'], ['g16', 'cake', L, 'sage'],
];

let count = 0;
list.forEach(([name, scene, [w, h], theme], i) => {
  const t = THEMES[theme];
  const r = rng(1000 + i * 37);
  const inner = scenes[scene](t, r);
  fs.writeFileSync(path.join(OUT, `${name}.svg`), wrap(w, h, t, inner, 500 + i * 11));
  count++;
});
console.log(`[images] wrote ${count} sample SVGs to public/images/sample`);

// Social preview image (PNG – most platforms ignore SVG for og:image).
try {
  const { default: sharp } = await import('sharp');
  const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#183F32"/>
  <circle cx="1010" cy="140" r="340" fill="#245844"/>
  <g stroke="#FFD66B" stroke-width="10" stroke-linecap="round"><path d="M1000 90v40"/><path d="M930 120l24 28"/><path d="M1070 120l-24 28"/><path d="M890 190h40"/><path d="M1110 190h-40"/></g>
  <path d="M900 330a100 100 0 0 1 200 0z" fill="#F47B35"/>
  <rect x="860" y="340" width="280" height="16" rx="8" fill="#FFF7E9"/>
  <text x="80" y="250" font-family="Georgia, serif" font-size="92" font-weight="700" fill="#FFF7E9">Sunrise</text>
  <text x="80" y="345" font-family="Georgia, serif" font-size="64" font-style="italic" fill="#FFD66B">Caterers &amp; Event Management</text>
  <text x="80" y="450" font-family="Arial, sans-serif" font-size="36" fill="#FFF7E9">Good Food. Grand Celebrations.</text>
  <text x="80" y="520" font-family="Arial, sans-serif" font-size="28" fill="#F47B35">Kallekkad, Palakkad · +91 84880 70589</text>
</svg>`;
  await sharp(Buffer.from(ogSvg)).png().toFile(path.join(root, 'public/og-image.png'));
  console.log('[images] wrote public/og-image.png');
} catch (e) {
  console.warn('[images] skipped og-image.png (sharp unavailable):', e.message);
}
