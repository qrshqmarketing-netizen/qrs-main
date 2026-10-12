// Repaints the roof in a photo, in the browser. The roof is a polygon (percent of the photo's width and height); every pixel inside keeps its brightness
// relative to the roof's average, scaled onto the new color, so the shingle texture, ridges and shadows stay. A soft edge blends the new color in.

const MAX_W = 1280; // the photo is drawn at most this wide, so a repaint takes a few milliseconds

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

// Draws the photo and the roof mask once; returns what `paint` needs
export async function prepareRoof(src, polygon) {
  const img = await loadImage(src);
  const scale = Math.min(1, MAX_W / img.naturalWidth);
  const w = Math.round(img.naturalWidth * scale);
  const h = Math.round(img.naturalHeight * scale);
  const photo = document.createElement('canvas');
  photo.width = w;
  photo.height = h;
  const pc = photo.getContext('2d', { willReadFrequently: true });
  pc.drawImage(img, 0, 0, w, h);
  const mask = document.createElement('canvas');
  mask.width = w;
  mask.height = h;
  const mc = mask.getContext('2d', { willReadFrequently: true });
  mc.filter = 'blur(1.5px)'; // a soft edge
  mc.fillStyle = '#fff';
  mc.beginPath();
  polygon.forEach(([x, y], i) => (i ? mc.lineTo((x / 100) * w, (y / 100) * h) : mc.moveTo((x / 100) * w, (y / 100) * h)));
  mc.closePath();
  mc.fill();
  const pixels = pc.getImageData(0, 0, w, h);
  const alpha = mc.getImageData(0, 0, w, h).data;
  let sum = 0;
  let n = 0;
  for (let i = 0; i < alpha.length; i += 4) {
    if (alpha[i] > 200) {
      sum += 0.299 * pixels.data[i] + 0.587 * pixels.data[i + 1] + 0.114 * pixels.data[i + 2];
      n++;
    }
  }
  return { w, h, pixels, alpha, meanLum: sum / Math.max(n, 1) || 1 };
}

// The photo with the roof in `hex`, as a JPEG data URL
export function paintRoof(prep, hex) {
  const { w, h, pixels, alpha, meanLum } = prep;
  const t = [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  const out = ctx.createImageData(w, h);
  const src = pixels.data;
  const dst = out.data;
  for (let i = 0; i < src.length; i += 4) {
    const a = alpha[i] / 255;
    if (a === 0) {
      dst[i] = src[i];
      dst[i + 1] = src[i + 1];
      dst[i + 2] = src[i + 2];
    } else {
      const lum = 0.299 * src[i] + 0.587 * src[i + 1] + 0.114 * src[i + 2];
      const shade = Math.min(1.6, Math.max(0.4, 1 + 1.1 * (lum / meanLum - 1)));
      for (let c = 0; c < 3; c++) dst[i + c] = src[i + c] + (Math.min(255, t[c] * shade) - src[i + c]) * a;
    }
    dst[i + 3] = 255;
  }
  ctx.putImageData(out, 0, 0);
  return canvas.toDataURL('image/jpeg', 0.88);
}
