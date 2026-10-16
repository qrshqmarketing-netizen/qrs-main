// Builds the roof mask for the shingle color picker (components/roofColors/): a grayscale picture, white where the roof is, the size the
// browser repaints at (1280 wide). The roof is found from the photo itself, not drawn by hand: neutral gray pixels darker than the trim,
// in an area that is dark on average and has the tiles' strong top-to-bottom texture (the course lines), which the smoother, lighter lap
// siding and the white stucco don't have; then only the large connected pieces inside the house's outline (HULL) are kept (windows, the
// street and gaps in the bushes drop out) and small gaps from lighter tiles are filled.
//   node scripts/roof-colors/make-mask.mjs <photo.webp> <mask.webp> [overlay.jpg]
import sharp from 'sharp';

const [src, out, overlay] = process.argv.slice(2);
const W = 1280;
// The house's rough outline (in the 1280-wide picture): only roof inside it counts. Loose on purpose; the roof itself is found by color.
const HULL = [[165, 440], [355, 288], [455, 228], [560, 210], [780, 210], [960, 288], [1000, 288], [1208, 410], [1204, 430], [730, 438]];

// Hand corrections, read off a zoomed grid of this photo: INCLUDE adds the dark, neutral pixels inside each shape (the left gable's rake strip,
// in shade and too smooth for the texture test); EXCLUDE removes everything inside (the shadow under the gutters).
const INCLUDE = [[[352, 296], [362, 302], [179, 426], [169, 417]]];
const EXCLUDE = [
  [[735, 414], [835, 414], [835, 416], [1210, 416], [1210, 470], [735, 470]],
  [[690, 431], [735, 426], [735, 470], [690, 470]],
];

const { data, info } = await sharp(src).resize({ width: W }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const H = info.height, N = W * H;
const lum = new Float32Array(N), sat = new Float32Array(N), green = new Float32Array(N);
for (let p = 0; p < N; p++) {
  const r = data[p * 3], g = data[p * 3 + 1], b = data[p * 3 + 2];
  lum[p] = 0.299 * r + 0.587 * g + 0.114 * b;
  sat[p] = Math.max(r, g, b) - Math.min(r, g, b);
  green[p] = g - Math.max(r, b); // leaves in shade are gray-ish but still lean green
}
// Box means with summed-area tables: brightness and the top-to-bottom change
const gv = new Float32Array(N);
for (let y = 0; y < H - 1; y++) for (let x = 0; x < W; x++) gv[y * W + x] = Math.abs(lum[(y + 1) * W + x] - lum[y * W + x]);
const integral = (a) => {
  const s = new Float64Array((W + 1) * (H + 1));
  for (let y = 0; y < H; y++) {
    let row = 0;
    for (let x = 0; x < W; x++) { row += a[y * W + x]; s[(y + 1) * (W + 1) + x + 1] = s[y * (W + 1) + x + 1] + row; }
  }
  return s;
};
const boxMean = (s, x, y, r) => {
  const x0 = Math.max(0, x - r), y0 = Math.max(0, y - r), x1 = Math.min(W, x + r + 1), y1 = Math.min(H, y + r + 1);
  return (s[y1 * (W + 1) + x1] - s[y0 * (W + 1) + x1] - s[y1 * (W + 1) + x0] + s[y0 * (W + 1) + x0]) / ((x1 - x0) * (y1 - y0));
};
const sL = integral(lum), sG = integral(gv), sGr = integral(green);
const inside = (poly, x, y) => {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
};
const inHull = (x, y) => inside(HULL, x, y);
const cand = new Uint8Array(N);
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const p = y * W + x;
  if (!inHull(x, y) || sat[p] > 30 || lum[p] > 182 || green[p] > 4 || boxMean(sGr, x, y, 3) > 2) continue;
  const mL = boxMean(sL, x, y, 5);
  // tiles: dark on average with strong course lines; or a shaded strip of roof: very dark and neutral even where it is smooth
  if ((mL <= 160 && boxMean(sG, x, y, 5) >= 12) || (mL <= 95 && sat[p] <= 22)) cand[p] = 1;
}
// Not the shadow band under a gutter: a dark pixel with a thin bright line (the gutter) just above it and roof above that line
for (let y = 14; y < H; y++) for (let x = 0; x < W; x++) {
  const p = y * W + x;
  if (!cand[p]) continue;
  for (let k = 1; k <= 7; k++) {
    if (lum[(y - k) * W + x] < 195) continue;
    let top = y - k;
    while (top > 0 && y - top < 14 && lum[(top - 1) * W + x] >= 195) top--;
    if (top > 2 && y - top < 14 && lum[(top - 2) * W + x] < 150) cand[p] = 0;
    break;
  }
}

// Connected pieces: keep the big ones (the roof planes), drop small ones (windows, odd pixels)
const label = new Int32Array(N).fill(-1), sizes = [];
const stack = new Int32Array(N);
for (let p = 0; p < N; p++) {
  if (!cand[p] || label[p] >= 0) continue;
  const id = sizes.length; let n = 0, top = 0; stack[top++] = p; label[p] = id;
  while (top) {
    const q = stack[--top]; n++;
    const x = q % W, y = (q / W) | 0;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx, ny = y + dy; if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const r = ny * W + nx; if (cand[r] && label[r] < 0) { label[r] = id; stack[top++] = r; }
    }
  }
  sizes.push(n);
}
const MIN_PIECE = +(process.env.MIN_PIECE || 900);
const mask = new Uint8Array(N);
for (let p = 0; p < N; p++) if (label[p] >= 0 && sizes[label[p]] >= MIN_PIECE) mask[p] = 1;
// Fill small enclosed gaps (lighter tiles, specks): background pieces under MAX_HOLE pixels that don't touch the picture's edge
const MAX_HOLE = +(process.env.MAX_HOLE || 160);
const seen = new Uint8Array(N);
for (let p = 0; p < N; p++) {
  if (mask[p] || seen[p]) continue;
  const list = []; let top = 0, edge = false; stack[top++] = p; seen[p] = 1;
  while (top) {
    const q = stack[--top]; list.push(q);
    const x = q % W, y = (q / W) | 0; if (x === 0 || y === 0 || x === W - 1 || y === H - 1) edge = true;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx, ny = y + dy; if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const r = ny * W + nx; if (!mask[r] && !seen[r]) { seen[r] = 1; stack[top++] = r; }
    }
    if (list.length > MAX_HOLE) { edge = true; }
  }
  if (!edge && list.length <= MAX_HOLE) for (const q of list) mask[q] = 1;
}
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const p = y * W + x;
  if (INCLUDE.some((poly) => inside(poly, x, y)) && lum[p] < 160 && sat[p] <= 30) mask[p] = 1;
  if (EXCLUDE.some((poly) => inside(poly, x, y))) mask[p] = 0;
}
const px = Buffer.alloc(N);
let count = 0;
for (let p = 0; p < N; p++) { px[p] = mask[p] ? 255 : 0; count += mask[p]; }
await sharp(px, { raw: { width: W, height: H, channels: 1 } }).blur(0.6).webp({ lossless: true }).toFile(out);
console.log(`mask ${W}x${H}, roof ${(100 * count / N).toFixed(1)}% of the picture, ${sizes.filter((s) => s >= MIN_PIECE).length} pieces`);
if (overlay) {
  const o = Buffer.alloc(N * 3);
  for (let p = 0; p < N; p++) { const m = mask[p]; o[p * 3] = m ? 255 : data[p * 3] * 0.5; o[p * 3 + 1] = m ? data[p * 3 + 1] * 0.3 : data[p * 3 + 1] * 0.5; o[p * 3 + 2] = m ? data[p * 3 + 2] * 0.3 : data[p * 3 + 2] * 0.5; }
  await sharp(o, { raw: { width: W, height: H, channels: 3 } }).jpeg({ quality: 85 }).toFile(overlay);
}
