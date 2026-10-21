'use client';

import { useEffect, useRef } from 'react';

// A band of small "+" marks in loose clusters (after the canvas bands on getaethr.ai): a few in gold, some twinkling. Drawn on a canvas, so it
// adds no DOM; it draws only while on screen and the tab is visible, at a slow pace, and stands still for reduced motion. Colors come from the
// theme (--ink, --gold), re-read when the theme changes. Decorative. seed: a different pattern per band.
const GRID = 13;
const hash = (x, y, s) => {
  let h = (x * 374761393 + y * 668265263 + s * 2246822519) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
};
// Smooth value noise, so the marks gather in clusters instead of a flat speckle
const noise = (x, y, s) => {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi, s), b = hash(xi + 1, yi, s), c = hash(xi, yi + 1, s), d = hash(xi + 1, yi + 1, s);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
};

export default function PlusField({ seed = 1, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let marks = [];
    let colors = { ink: '#10243a', gold: '#d4b572' };
    let raf = 0, last = 0, onScreen = false;

    const readColors = () => {
      const cs = getComputedStyle(canvas);
      colors = { ink: cs.getPropertyValue('--ink').trim() || colors.ink, gold: cs.getPropertyValue('--gold').trim() || colors.gold };
    };
    const layout = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const w = canvas.clientWidth, h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      marks = [];
      const cols = Math.ceil(w / GRID), rows = Math.max(1, Math.floor(h / GRID));
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const n = noise(i / 6, j / 2.2, seed);
          if (n < 0.56) continue;
          const r = hash(i, j, seed + 7);
          marks.push({ x: i * GRID + GRID / 2, y: j * GRID + GRID / 2 + (h - rows * GRID) / 2, base: 0.18 + (n - 0.56) * 1.6, gold: r > 0.93, twinkle: r < 0.18 ? r * 40 : -1 });
        }
      }
    };
    const draw = (t) => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      ctx.lineWidth = 1;
      for (const m of marks) {
        let a = Math.min(m.base, 0.75);
        if (m.twinkle >= 0 && !still) a *= 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t / 900 + m.twinkle));
        ctx.globalAlpha = m.gold ? Math.min(1, a + 0.35) : a;
        ctx.strokeStyle = m.gold ? colors.gold : colors.ink;
        ctx.beginPath();
        ctx.moveTo(m.x - 2.5, m.y); ctx.lineTo(m.x + 2.5, m.y);
        ctx.moveTo(m.x, m.y - 2.5); ctx.lineTo(m.x, m.y + 2.5);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };
    const loop = (t) => {
      raf = 0;
      if (!onScreen || document.hidden) return;
      if (t - last > 110) { draw(t); last = t; }
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (!raf && !still) raf = requestAnimationFrame(loop); };

    readColors();
    layout();
    draw(0);
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; if (onScreen) start(); });
    io.observe(canvas);
    const ro = new ResizeObserver(() => { layout(); draw(performance.now()); });
    ro.observe(canvas);
    const mo = new MutationObserver(() => { readColors(); draw(performance.now()); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const vis = () => start();
    document.addEventListener('visibilitychange', vis);
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); mo.disconnect(); document.removeEventListener('visibilitychange', vis); };
  }, [seed]);
  return <canvas ref={ref} className={`hd-plus ${className}`} aria-hidden="true" />;
}
