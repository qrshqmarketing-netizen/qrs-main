// "Use my address" for the Roof Visualizer: finds the address, asks Google's Solar API (Data Layers) for the sharpest aerial picture of that roof (about 10 cm per
// pixel where Google has it) and the roof mask that goes with it, cuts out the visitor's own roof (the connected roof under the address, not the neighbors) and
// returns a cropped picture plus a soft mask. The browser (components/visualizer/aerial.js) then paints any color on the roof at once, so one lookup serves every
// color the visitor tries. Server only (Node): it decodes GeoTIFFs. Key: GOOGLE_MAPS_KEY, else NEXT_PUBLIC_GOOGLE_MAPS_KEY (the Instant Quote's key; Solar API and
// Geocoding API enabled). Google's pictures are used only to answer this request and are never stored.
import { fromArrayBuffer } from 'geotiff';
import jpeg from 'jpeg-js';
import { PNG } from 'pngjs';

const RADIUS_M = 45;
const QUALITIES = [
  ['HIGH', 0.1],
  ['MEDIUM', 0.25],
  ['LOW', 0.5],
];

// GOOGLE_GEOCODE_URL / GOOGLE_SOLAR_URL replace Google's web addresses (for tests with a stand-in server only)
const geocodeUrl = (env) => env.GOOGLE_GEOCODE_URL || 'https://maps.googleapis.com/maps/api/geocode/json';
const solarUrl = (env) => env.GOOGLE_SOLAR_URL || 'https://solar.googleapis.com/v1/dataLayers:get';

const keyOf = (env) => (env.GOOGLE_MAPS_KEY || env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '').trim();

// Errors are thrown as short codes: 'config', 'addr' (address not found), 'roof' (no usable imagery or roof), 'api'
export async function geocodeAddress(env, fetchFn, address) {
  const key = keyOf(env);
  if (!key) throw 'config';
  const res = await fetchFn(`${geocodeUrl(env)}?components=country:US&address=${encodeURIComponent(address)}&key=${key}`, { signal: AbortSignal.timeout(10000) });
  const data = await res.json().catch(() => ({}));
  if (data.status === 'ZERO_RESULTS') throw 'addr';
  if (data.status !== 'OK' || !data.results?.[0]) throw 'api';
  const g = data.results[0];
  return { lat: g.geometry.location.lat, lng: g.geometry.location.lng, label: String(g.formatted_address || '').replace(/, USA$/, '') };
}

// The Data Layers answer for the sharpest quality Google has at this spot: { rgbUrl, maskUrl, imageryDate, imageryQuality }
export async function findLayers(env, fetchFn, lat, lng) {
  const key = keyOf(env);
  if (!key) throw 'config';
  for (const [quality, pixel] of QUALITIES) {
    const url =
      `${solarUrl(env)}?location.latitude=${lat.toFixed(6)}&location.longitude=${lng.toFixed(6)}` +
      `&radiusMeters=${RADIUS_M}&view=IMAGERY_LAYERS&requiredQuality=${quality}&pixelSizeMeters=${pixel}&key=${key}`;
    const res = await fetchFn(url, { signal: AbortSignal.timeout(15000) });
    if (res.status === 404 || res.status === 400) continue; // not available at this quality: try the next
    if (!res.ok) throw 'api';
    const data = await res.json();
    if (data.rgbUrl && data.maskUrl) return data;
  }
  throw 'roof';
}

async function readTiff(env, fetchFn, url) {
  const res = await fetchFn(`${url}${url.includes('?') ? '&' : '?'}key=${keyOf(env)}`, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw 'api';
  const image = await (await fromArrayBuffer(await res.arrayBuffer())).getImage();
  const width = image.getWidth();
  const height = image.getHeight();
  const stride = image.getSamplesPerPixel();
  const data = await image.readRasters({ interleave: true });
  return { width, height, stride, data };
}

// Nearest masked pixel to (cx, cy), looking out in growing squares; -1 if none within `limit` pixels
function nearestMasked(mask, w, h, cx, cy, limit) {
  for (let r = 0; r <= limit; r++) {
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
        const x = cx + dx;
        const y = cy + dy;
        if (x >= 0 && y >= 0 && x < w && y < h && mask[y * w + x]) return y * w + x;
      }
    }
  }
  return -1;
}

// The roof under the address: every masked pixel connected (4-way) to the one nearest the address. Returns a Uint8Array of 0/1, or null when it is too small to be a roof.
export function roofComponent(mask, w, h, cx, cy, limit = Math.round(Math.min(w, h) * 0.35)) {
  const seed = nearestMasked(mask, w, h, Math.round(cx), Math.round(cy), limit);
  if (seed < 0) return null;
  const out = new Uint8Array(w * h);
  const stack = [seed];
  out[seed] = 1;
  let count = 0;
  while (stack.length) {
    const i = stack.pop();
    count++;
    const x = i % w;
    const y = (i - x) / w;
    if (x > 0 && mask[i - 1] && !out[i - 1]) { out[i - 1] = 1; stack.push(i - 1); }
    if (x < w - 1 && mask[i + 1] && !out[i + 1]) { out[i + 1] = 1; stack.push(i + 1); }
    if (y > 0 && mask[i - w] && !out[i - w]) { out[i - w] = 1; stack.push(i - w); }
    if (y < h - 1 && mask[i + w] && !out[i + w]) { out[i + w] = 1; stack.push(i + w); }
  }
  return count >= 150 ? out : null;
}

// The box around the roof plus some margin, kept inside the picture
export function cropBox(comp, w, h, pad = 0.14) {
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (!comp[y * w + x]) continue;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
  }
  const mx = Math.max(24, Math.round((x1 - x0 + 1) * pad));
  const my = Math.max(24, Math.round((y1 - y0 + 1) * pad));
  return { x0: Math.max(0, x0 - mx), y0: Math.max(0, y0 - my), x1: Math.min(w - 1, x1 + mx), y1: Math.min(h - 1, y1 + my) };
}

// A softened edge (two 3x3 box blurs) so the new color blends into the shingles at the roof's edge: Uint8 0-255
export function softMask(comp, w, h) {
  let a = Float32Array.from(comp);
  for (let pass = 0; pass < 2; pass++) {
    const b = new Float32Array(w * h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let sum = 0;
        let n = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const xx = x + dx;
            const yy = y + dy;
            if (xx >= 0 && yy >= 0 && xx < w && yy < h) { sum += a[yy * w + xx]; n++; }
          }
        }
        b[y * w + x] = sum / n;
      }
    }
    a = b;
  }
  return Uint8Array.from(a, (v) => Math.round(v * 255));
}

const dataUrl = (type, bytes) => `data:${type};base64,${Buffer.from(bytes).toString('base64')}`;

// The whole lookup. Returns { before (JPEG data URL), mask (PNG data URL, the red channel is the roof), width, height, label, imageryDate, quality }.
export async function aerialRoof({ env, fetch: fetchFn, address }) {
  const place = await geocodeAddress(env, fetchFn, address);
  const layers = await findLayers(env, fetchFn, place.lat, place.lng);
  const [rgb, maskTiff] = await Promise.all([readTiff(env, fetchFn, layers.rgbUrl), readTiff(env, fetchFn, layers.maskUrl)]);
  const { width: w, height: h } = rgb;
  if (rgb.stride < 3) throw 'api';

  // The mask, on the picture's grid (nearest pixel, in case the two differ in size)
  const mask = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    const my = Math.min(maskTiff.height - 1, Math.floor((y * maskTiff.height) / h));
    for (let x = 0; x < w; x++) {
      const mx = Math.min(maskTiff.width - 1, Math.floor((x * maskTiff.width) / w));
      mask[y * w + x] = maskTiff.data[(my * maskTiff.width + mx) * maskTiff.stride] > 0 ? 1 : 0;
    }
  }
  const comp = roofComponent(mask, w, h, w / 2, h / 2);
  if (!comp) throw 'roof';
  const box = cropBox(comp, w, h);
  const cw = box.x1 - box.x0 + 1;
  const ch = box.y1 - box.y0 + 1;
  const soft = softMask(comp, w, h);

  const photo = Buffer.alloc(cw * ch * 4);
  const maskPng = new PNG({ width: cw, height: ch });
  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      const src = (y + box.y0) * w + (x + box.x0);
      const o = (y * cw + x) * 4;
      photo[o] = rgb.data[src * rgb.stride];
      photo[o + 1] = rgb.data[src * rgb.stride + 1];
      photo[o + 2] = rgb.data[src * rgb.stride + 2];
      photo[o + 3] = 255;
      const m = soft[src];
      maskPng.data[o] = m;
      maskPng.data[o + 1] = m;
      maskPng.data[o + 2] = m;
      maskPng.data[o + 3] = 255;
    }
  }
  const d = layers.imageryDate;
  return {
    before: dataUrl('image/jpeg', jpeg.encode({ data: photo, width: cw, height: ch }, 90).data),
    mask: dataUrl('image/png', PNG.sync.write(maskPng)),
    width: cw,
    height: ch,
    label: place.label,
    imageryDate: d?.year ? `${d.year}-${String(d.month || 1).padStart(2, '0')}` : '',
    quality: layers.imageryQuality || '',
  };
}
