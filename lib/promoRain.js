// The promo popup's rain animation (components/widgets/PromoRain.jsx loads this file on its own, only after the page
// has finished loading and the browser is idle). Draws faint, slightly wind-blown streaks in two depths on the popup
// card's canvas, and only while the card is on screen and the tab is visible.

const WIND = 0.12; // sideways drift per pixel of fall: drops lean slightly, falling down and to the left
const AREA_PER_DROP = 6000; // px² of card per drop (a 460×540 card gets about 40)
const MAX_DROPS = 240;
const MAX_DPR = 1.5; // soft streaks look the same at 1.5× as at 2–3×, for about half the pixels to clear and draw
const SLOW_FRAME_MS = 4; // when a frame's drawing averages more than this, draw every other frame (30 fps)

// Each drop belongs to one tier, and each tier is drawn as a single path: a handful of strokes per frame
const TIERS = [
  { near: false, alpha: 0.15, width: 1.1 },
  { near: false, alpha: 0.19, width: 1.1 },
  { near: false, alpha: 0.23, width: 1.1 },
  { near: true, alpha: 0.3, width: 1.4 },
  { near: true, alpha: 0.35, width: 1.4 },
  { near: true, alpha: 0.4, width: 1.4 },
];
const NEAR_SHARE = 0.35; // the rest are fainter, shorter, slower drops further away

function resetDrop(d, w, h, anywhere) {
  d.x = Math.random() * (w + h * WIND);
  d.y = anywhere ? Math.random() * h : -Math.random() * 120 - 30;
  d.len = d.near ? 18 + Math.random() * 14 : 9 + Math.random() * 7;
  d.speed = d.near ? 760 + Math.random() * 240 : 420 + Math.random() * 140; // px per second
  return d;
}

// Starts the rain on `canvas` sized to `card`; returns a function that stops it and lets go of everything
export function startRain(canvas, card) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
  let w = 0, h = 0, tiers = [], frame = 0, last = 0, onScreen = false, drawMs = 0, skip = false, odd = false;

  const resize = () => {
    w = card.clientWidth;
    h = card.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.strokeStyle = 'rgb(222,232,244)';
    ctx.lineCap = 'round';
    tiers = TIERS.map(() => []);
    const count = Math.min(MAX_DROPS, Math.round((w * h) / AREA_PER_DROP));
    for (let i = 0; i < count; i++) {
      const near = Math.random() < NEAR_SHARE;
      const t = (near ? 3 : 0) + Math.floor(Math.random() * 3);
      tiers[t].push(resetDrop({ near }, w, h, true));
    }
  };

  const tick = (t) => {
    frame = requestAnimationFrame(tick);
    if (skip && (odd = !odd)) return;
    const dt = Math.min((t - last) / 1000, 0.05); // a long gap (slow frame, tab switch) doesn't teleport the drops
    last = t;
    const start = performance.now();
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < TIERS.length; i++) {
      ctx.globalAlpha = TIERS[i].alpha;
      ctx.lineWidth = TIERS[i].width;
      ctx.beginPath();
      for (const d of tiers[i]) {
        d.y += d.speed * dt;
        d.x -= d.speed * WIND * dt;
        if (d.y - d.len > h) resetDrop(d, w, h, false);
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.len * WIND, d.y - d.len);
      }
      ctx.stroke();
    }
    drawMs = drawMs * 0.9 + (performance.now() - start) * 0.1;
    if (drawMs > SLOW_FRAME_MS) skip = true;
  };

  const run = () => {
    const go = onScreen && document.visibilityState === 'visible';
    if (go && !frame) {
      last = performance.now();
      frame = requestAnimationFrame(tick);
    } else if (!go && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  };

  resize();
  const sizes = new ResizeObserver(resize);
  sizes.observe(card);
  const seen = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    run();
  });
  seen.observe(card);
  document.addEventListener('visibilitychange', run);
  canvas.classList.add('is-on');

  return () => {
    cancelAnimationFrame(frame);
    frame = 0;
    sizes.disconnect();
    seen.disconnect();
    document.removeEventListener('visibilitychange', run);
  };
}
