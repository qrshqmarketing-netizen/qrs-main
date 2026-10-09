// The "use my address" picture, recolored in the browser. The server (lib/aerialRoof.js) sends the roof's aerial photo and a soft mask; here the picture is
// enlarged and any color is painted on the roof in an instant, keeping the shingle texture and the shading: each roof pixel keeps its brightness relative to the
// roof's average, scaled onto the new color, and the mask's soft edge blends it in. Nothing is sent to the server for a new color.

const SCALE = 3; // the aerial picture is about 10 cm per pixel, so it is enlarged for the screen

const load = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('picture'));
    img.src = src;
  });

function canvasOf(w, h) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  return { canvas, ctx };
}

// Loads the two pictures once: returns what `paint` needs plus the enlarged original ("before")
export async function prepareAerial(beforeSrc, maskSrc) {
  const [photo, mask] = await Promise.all([load(beforeSrc), load(maskSrc)]);
  const w = photo.naturalWidth * SCALE;
  const h = photo.naturalHeight * SCALE;
  const base = canvasOf(w, h);
  base.ctx.drawImage(photo, 0, 0, w, h);
  const m = canvasOf(w, h);
  m.ctx.drawImage(mask, 0, 0, w, h);
  const pixels = base.ctx.getImageData(0, 0, w, h);
  const alpha = m.ctx.getImageData(0, 0, w, h).data; // the red channel is the roof (0-255)
  let sum = 0;
  let n = 0;
  for (let i = 0; i < pixels.data.length; i += 4) {
    if (alpha[i] > 127) {
      sum += 0.299 * pixels.data[i] + 0.587 * pixels.data[i + 1] + 0.114 * pixels.data[i + 2];
      n++;
    }
  }
  return { w, h, pixels, alpha, meanLum: sum / Math.max(n, 1) || 1, before: base.canvas.toDataURL('image/jpeg', 0.92) };
}

// The picture with the roof in `hex`
export function paintAerial(prep, hex) {
  const { w, h, pixels, alpha, meanLum } = prep;
  const t = [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
  const out = canvasOf(w, h);
  const img = out.ctx.createImageData(w, h);
  const src = pixels.data;
  const dst = img.data;
  for (let i = 0; i < src.length; i += 4) {
    const a = alpha[i] / 255;
    if (a === 0) {
      dst[i] = src[i];
      dst[i + 1] = src[i + 1];
      dst[i + 2] = src[i + 2];
      dst[i + 3] = 255;
      continue;
    }
    const lum = 0.299 * src[i] + 0.587 * src[i + 1] + 0.114 * src[i + 2];
    const shade = Math.min(1.75, Math.max(0.35, 1 + 1.15 * (lum / meanLum - 1)));
    for (let c = 0; c < 3; c++) {
      const painted = Math.min(255, t[c] * shade);
      dst[i + c] = src[i + c] + (painted - src[i + c]) * a;
    }
    dst[i + 3] = 255;
  }
  out.ctx.putImageData(img, 0, 0);
  return out.canvas.toDataURL('image/jpeg', 0.92);
}
