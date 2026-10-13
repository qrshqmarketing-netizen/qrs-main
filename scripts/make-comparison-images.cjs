// Builds the comparison images for the five "vs." blog articles (the files listed at the bottom, in public/images/blog/), 1536 x 1024 like the other article images:
// real QRS project photos side by side, or drawn roof surfaces where we have no photo (metal, concrete tile, 3-tab), with labels and a VS mark.
// Run: node scripts/make-comparison-images.cjs (overwrites those files; a changed picture on a live article needs a new file name, 30-day image cache).
const sharp = require('sharp');
const path = require('path');
const ROOT = path.join(__dirname, '..', 'public');
const OUT = path.join(ROOT, 'images/blog');
const W = 1536, H = 1024, HALF = W / 2;
const NAVY = '#0a1b2c', GOLD = '#c9a35a';
const FONT = "Helvetica Neue, Helvetica, Arial, sans-serif";

// Deterministic randomness, so the drawings come out the same every run
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const pick = (a) => a[Math.floor(rnd() * a.length)];
const esc = (s) => s.replace(/&/g, '&amp;');

function labels(left, right) {
  const pill = (x, text) => {
    const w = text.length * 21 + 64;
    return `<g><rect x="${x}" y="${H - 132}" width="${w}" height="72" rx="36" fill="${NAVY}" fill-opacity=".86"/>
      <text x="${x + w / 2}" y="${H - 85}" text-anchor="middle" font-family="${FONT}" font-size="30" font-weight="700" letter-spacing="3" fill="#fff">${esc(text.toUpperCase())}</text></g>`;
  };
  return `${pill(48, left)}${pill(HALF + 48, right)}
    <rect x="${HALF - 3}" y="0" width="6" height="${H}" fill="#fff"/>
    <circle cx="${HALF}" cy="${H / 2}" r="54" fill="${GOLD}" stroke="#fff" stroke-width="6"/>
    <text x="${HALF}" y="${H / 2 + 12}" text-anchor="middle" font-family="${FONT}" font-size="34" font-weight="800" letter-spacing="1" fill="${NAVY}">VS</text>`;
}
const svgDoc = (body, defs = '') => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs>${defs}
  <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset=".72" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".38"/></linearGradient></defs>${body}
  <rect width="${W}" height="${H}" fill="url(#shade)"/></svg>`);

async function photoPair(file, left, right, leftLabel, rightLabel, pos = ['centre', 'centre']) {
  const a = await sharp(path.join(ROOT, left)).resize(HALF, H, { fit: 'cover', position: pos[0] }).toBuffer();
  const b = await sharp(path.join(ROOT, right)).resize(HALF, H, { fit: 'cover', position: pos[1] }).toBuffer();
  await sharp({ create: { width: W, height: H, channels: 3, background: '#000' } })
    .composite([{ input: a, left: 0, top: 0 }, { input: b, left: HALF, top: 0 }, { input: svgDoc(labels(leftLabel, rightLabel)), left: 0, top: 0 }])
    .webp({ quality: 82 }).toFile(path.join(OUT, file));
}

// ---------- Drawn roof surfaces (each fills one half, x0 to x0 + HALF) ----------
function shingles3Tab(x0) {
  let s = `<rect x="${x0}" y="0" width="${HALF}" height="${H}" fill="#3a3f45"/>`;
  const ch = 64, tab = 128;
  for (let row = -1, y = -20; y < H; row++, y += ch) {
    const off = (row % 2) * (tab / 2);
    for (let x = x0 - tab + off; x < x0 + HALF; x += tab) {
      const c = pick(['#4b5158', '#4d535a', '#4a5057']);
      s += `<rect x="${x + 3}" y="${y}" width="${tab - 6}" height="${ch + 4}" fill="${c}"/>`;
      s += `<rect x="${x + 3}" y="${y}" width="${tab - 6}" height="8" fill="#000" fill-opacity=".28"/>`;
    }
  }
  return s;
}
function shinglesArchitectural(x0) {
  let s = `<rect x="${x0}" y="0" width="${HALF}" height="${H}" fill="#2a2e33"/>`;
  const ch = 72;
  for (let y = -30; y < H; y += ch) {
    let x = x0 - 60 - rnd() * 60;
    while (x < x0 + HALF) {
      const w = 46 + rnd() * 96;
      const top = pick(['#4f555c', '#575d64', '#464b52', '#5f656c', '#3f444a']);
      const depth = 30 + rnd() * 26;
      s += `<rect x="${x + 2}" y="${y}" width="${w - 4}" height="${ch + 8}" fill="#33373c"/>`; // lower layer
      s += `<rect x="${x + 2}" y="${y}" width="${w - 4}" height="${depth}" fill="${top}"/>`; // upper tab
      s += `<rect x="${x + 2}" y="${y + depth}" width="${w - 4}" height="5" fill="#000" fill-opacity=".35"/>`; // shadow line
      s += `<rect x="${x + 2}" y="${y}" width="${w - 4}" height="9" fill="#000" fill-opacity=".3"/>`;
      x += w;
    }
  }
  return s;
}
function standingSeam(x0) {
  const pw = 118;
  let s = `<rect x="${x0}" y="0" width="${HALF}" height="${H}" fill="#33383e"/>`;
  for (let x = x0 - 20; x < x0 + HALF; x += pw) {
    s += `<rect x="${x}" y="0" width="${pw}" height="${H}" fill="url(#panel)"/>`;
    s += `<rect x="${x + pw - 12}" y="0" width="5" height="${H}" fill="#1c1f23"/>`; // shadow side of the seam
    s += `<rect x="${x + pw - 7}" y="0" width="9" height="${H}" fill="url(#seam)"/>`; // the raised seam
  }
  s += `<rect x="${x0}" y="0" width="${HALF}" height="${H}" fill="url(#sheen)"/>`;
  return s;
}
const METAL_DEFS = `<linearGradient id="panel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3d434a"/><stop offset=".5" stop-color="#474d55"/><stop offset="1" stop-color="#3a4046"/></linearGradient>
  <linearGradient id="seam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7d858e"/><stop offset=".5" stop-color="#a3abb4"/><stop offset="1" stop-color="#5c636b"/></linearGradient>
  <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></linearGradient>`;

function clayBarrel(x0) {
  let s = `<rect x="${x0}" y="0" width="${HALF}" height="${H}" fill="#6e2f17"/>`;
  const tw = 84, ch = 118;
  for (let row = 0, y = -40; y < H; row++, y += ch) {
    for (let i = 0, x = x0 - 40; x < x0 + HALF + tw; i++, x += tw) {
      const cap = i % 2 === 0;
      const g = cap ? pick(['capA', 'capB', 'capC']) : 'pan';
      s += `<rect x="${x}" y="${y}" width="${tw + (cap ? 6 : 0)}" height="${ch + 30}" rx="${cap ? 40 : 8}" fill="url(#${g})"/>`;
    }
    s += `<rect x="${x0}" y="${y + ch - 6}" width="${HALF}" height="16" fill="#000" fill-opacity=".32"/>`;
  }
  return s;
}
const CLAY_DEFS = ['capA:#b9532a:#e08758', 'capB:#a8492a:#d27a4f', 'capC:#c05e33:#e8956a'].map((d) => {
  const [id, edge, mid] = d.split(':');
  return `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${edge}" stop-opacity=".95"/><stop offset=".42" stop-color="${mid}"/><stop offset="1" stop-color="#7a3519"/></linearGradient>`;
}).join('') + `<linearGradient id="pan" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6b2d15"/><stop offset=".5" stop-color="#9c4424"/><stop offset="1" stop-color="#6b2d15"/></linearGradient>`;

function concreteFlat(x0) {
  // Flat concrete tile: wide tiles in staggered courses; each course's thick lower edge (the butt) casts a shadow on the course below
  let s = `<rect x="${x0}" y="0" width="${HALF}" height="${H}" fill="#6f685f"/>`;
  const tw = 176, ch = 120;
  const rows = [];
  for (let row = -1, y = -40; y < H + ch; row++, y += ch) rows.push([row, y]);
  for (const [row, y] of rows) {
    const off = (row % 2) * (tw / 2);
    for (let x = x0 - tw + off; x < x0 + HALF; x += tw) {
      const c = pick(['#8a8176', '#837a70', '#90877b', '#7f776d']);
      s += `<rect x="${x + 1}" y="${y}" width="${tw - 2}" height="${ch}" fill="${c}"/>`;
      for (let k = 0; k < 34; k++) s += `<circle cx="${x + 6 + rnd() * (tw - 12)}" cy="${y + 6 + rnd() * (ch - 20)}" r="${0.7 + rnd() * 1.4}" fill="${pick(['#655e55', '#a59c90', '#71695f'])}" fill-opacity=".6"/>`;
      s += `<rect x="${x}" y="${y}" width="2" height="${ch}" fill="#3e3933" fill-opacity=".8"/>`;
      s += `<rect x="${x + 1}" y="${y}" width="${tw - 2}" height="${ch * 0.45}" fill="#fff" fill-opacity=".05"/>`;
    }
  }
  for (const [, y] of rows) {
    s += `<rect x="${x0}" y="${y + ch - 13}" width="${HALF}" height="13" fill="#5a534b"/>`;
    s += `<rect x="${x0}" y="${y + ch - 13}" width="${HALF}" height="2" fill="#fff" fill-opacity=".14"/>`;
    s += `<rect x="${x0}" y="${y + ch}" width="${HALF}" height="12" fill="url(#buttShadow)"/>`;
  }
  return s;
}
const CONCRETE_DEFS = `<linearGradient id="buttShadow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".4"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>`;

async function drawn(file, leftFn, rightFn, leftLabel, rightLabel, defs = '') {
  const body = `<svg x="0" y="0" width="${HALF}" height="${H}" overflow="hidden">${leftFn(0)}</svg>
    <svg x="${HALF}" y="0" width="${HALF}" height="${H}" overflow="hidden">${rightFn(0)}</svg>
    <rect width="${W}" height="${H}" fill="url(#vignette)"/>${labels(leftLabel, rightLabel)}`;
  const allDefs = defs + `<radialGradient id="vignette" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient>`;
  await sharp(svgDoc(body, allDefs)).webp({ quality: 84 }).toFile(path.join(OUT, file));
}

(async () => {
  const P = '/images/projects/';
  await photoPair('asphalt-shingle-vs-tile-roof.webp', P + 'shingle-roof-replacement-granada-hills-91344/shingle-granada-hills-91344-01.webp', P + 'tile-flat-roofing-in-mid-wilshire-90019/mid-wilshire-tile-flat-roof-10.webp', 'Asphalt shingle', 'Clay tile');
  await photoPair('tile-lift-and-relay-vs-new-tile-roof.webp', '/images/tile-lift-off-and-reset-drone-view.webp', '/images/tile-roof-replacement-drone-view.webp', 'Lift and relay', 'New tile roof');
  await drawn('architectural-vs-3-tab-shingles.webp', shingles3Tab, shinglesArchitectural, '3-tab', 'Architectural');
  await drawn('metal-roof-vs-shingles.webp', shinglesArchitectural, standingSeam, 'Asphalt shingle', 'Standing seam', METAL_DEFS);
  await drawn('clay-vs-concrete-tile-roof.webp', clayBarrel, concreteFlat, 'Clay tile', 'Concrete tile', CLAY_DEFS + CONCRETE_DEFS);
  console.log('done');
})();
