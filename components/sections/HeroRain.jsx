'use client';

import { useEffect, useRef } from 'react';

const WIND = 0.12; // sideways drift per pixel of fall: drops lean slightly, falling down and to the left
const AREA_PER_DROP = 8000; // px² of hero per drop (a 1440×820 hero gets about 150, a phone hero about 40)
const MAX_DROPS = 180;
const NEAR_SHARE = 0.35; // the rest are fainter, shorter, slower drops further away

const newDrop = (w, h, anywhere) => {
  const near = Math.random() < NEAR_SHARE;
  return {
    near,
    x: Math.random() * (w + h * WIND),
    y: anywhere ? Math.random() * h : -Math.random() * 120 - 30,
    len: near ? 16 + Math.random() * 12 : 8 + Math.random() * 6,
    speed: near ? 760 + Math.random() * 240 : 420 + Math.random() * 140, // px per second
    alpha: near ? 0.2 + Math.random() * 0.1 : 0.1 + Math.random() * 0.08,
  };
};

// Seasonal rain over the hero (HERO_RAIN in data/promo.js): faint streaks on a canvas between the photo and the copy
// (Hero.css .hero-rain), fading in once the page has loaded. It runs only while the hero is on screen and the tab is
// visible, and not at all for visitors who ask for reduced motion or less data.
export default function HeroRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, drops = [], frame = 0, last = 0, onScreen = false, started = false;

    const resize = () => {
      w = hero.clientWidth;
      h = hero.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.strokeStyle = 'rgb(222,232,244)';
      ctx.lineCap = 'round';
      drops = Array.from({ length: Math.min(MAX_DROPS, Math.round((w * h) / AREA_PER_DROP)) }, () => newDrop(w, h, true));
    };

    const tick = (t) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min((t - last) / 1000, 0.05); // a long gap (tab switch, slow frame) doesn't teleport the drops
      last = t;
      ctx.clearRect(0, 0, w, h);
      for (const d of drops) {
        d.y += d.speed * dt;
        d.x -= d.speed * WIND * dt;
        if (d.y - d.len > h) Object.assign(d, newDrop(w, h, false));
        ctx.globalAlpha = d.alpha;
        ctx.lineWidth = d.near ? 1.2 : 1;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.len * WIND, d.y - d.len);
        ctx.stroke();
      }
    };

    const run = () => {
      const go = started && onScreen && document.visibilityState === 'visible';
      if (go && !frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      } else if (!go && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const sizes = new ResizeObserver(resize);
    sizes.observe(hero);
    const seen = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      run();
    });
    seen.observe(hero);
    document.addEventListener('visibilitychange', run);

    // Wait for the page (and the hero photo) to finish loading, so the rain never competes with it
    const start = () => {
      started = true;
      canvas.classList.add('is-on');
      run();
    };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });

    return () => {
      cancelAnimationFrame(frame);
      sizes.disconnect();
      seen.disconnect();
      document.removeEventListener('visibilitychange', run);
      window.removeEventListener('load', start);
    };
  }, []);

  return <canvas className="hero-rain" ref={canvasRef} aria-hidden="true" />;
}
