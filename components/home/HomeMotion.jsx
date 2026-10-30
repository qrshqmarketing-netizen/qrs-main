'use client';

import { useEffect } from 'react';

// Scroll and pointer motion on the home page (owner, October 29 2026), on top of the site's section and line reveals (RevealSections,
// StudioMotion). Styles: "Home motion" at the end of HomeGradient.css.
//  - The hero logo drifts apart as the hero scrolls away: every piece rises at its own random speed and turns a little (the `translate` and
//    `rotate` properties, so it never fights the entrance animation's `transform`). The video frame and the hero's bottom gradient don't move
//    or grow (owner, October 29 2026).
//  - Cards lean toward the pointer (mouse only): principle cards, repair tiles, plans, area cards, project and guide cards.
//  - The hero and commercial buttons are magnetic: they lean a few pixels toward the pointer.
//  - The commercial numbers (review count, crews, counties) count up when they come into view; the HTML always holds the real number.
// Nothing runs for reduced motion; everything is passive and stops off screen.
const TILT = '.hg-core, .hg-tile, .hg-plan, .hg-postcard, .hg-seg';
const MAGNET = '.hg-ctas .btn, .hg-sys-ctas .btn, .hg-hero .btn';

export default function HomeMotion() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const off = [];
    const on = (el, type, fn, opts) => {
      el.addEventListener(type, fn, opts);
      off.push(() => el.removeEventListener(type, fn, opts));
    };

    // 1. The hero logo on scroll
    const hero = document.querySelector('.hg-hero');
    const pieces = hero ? [...hero.querySelectorAll('.hg-wordmark [data-wm]')] : [];
    const speeds = pieces.map(() => ({ y: -(60 + Math.random() * 220), r: (Math.random() - 0.5) * 24, x: (Math.random() - 0.5) * 60 }));
    let ticking = false;
    let heroOn = true;
    const paint = () => {
      ticking = false;
      if (!hero || !heroOn) return;
      const rect = hero.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height * 0.8)));
      pieces.forEach((el, i) => {
        const s = speeds[i];
        el.style.translate = p ? `${(s.x * p).toFixed(1)}px ${(s.y * p).toFixed(1)}px` : '';
        el.style.rotate = p ? `${(s.r * p).toFixed(1)}deg` : '';
      });
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(paint);
      }
    };
    if (hero) {
      const io = new IntersectionObserver(([e]) => {
        heroOn = e.isIntersecting;
        if (heroOn) onScroll();
      });
      io.observe(hero);
      off.push(() => io.disconnect());
      on(window, 'scroll', onScroll, { passive: true });
      paint();
    }

    const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

    // 2. Cards lean toward the pointer
    if (finePointer) {
      document.querySelectorAll(TILT).forEach((card) => {
        card.classList.add('hg-tilt');
        on(card, 'pointermove', (e) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          card.style.setProperty('--rx', `${(-y * 7).toFixed(2)}deg`);
          card.style.setProperty('--ry', `${(x * 9).toFixed(2)}deg`);
        });
        on(card, 'pointerleave', () => {
          card.style.removeProperty('--rx');
          card.style.removeProperty('--ry');
        });
      });

      // 3. Magnetic buttons
      document.querySelectorAll(MAGNET).forEach((btn) => {
        btn.classList.add('hg-magnet');
        on(btn, 'pointermove', (e) => {
          const r = btn.getBoundingClientRect();
          btn.style.translate = `${((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1)}px ${((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1)}px`;
        });
        on(btn, 'pointerleave', () => {
          btn.style.translate = '';
        });
      });
    }

    // 4. Numbers count up as they come into view (only plain counts, not years; only ones still below the fold, so nothing visible changes)
    const counters = [...document.querySelectorAll('.hg-stat b, .hg-q-stat b')].filter((el) => /^\d{1,4}$/.test(el.textContent.trim()) && +el.textContent < 1900 && el.getBoundingClientRect().top > innerHeight);
    if (counters.length) {
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            io.unobserve(e.target);
            const el = e.target;
            const end = +el.dataset.count;
            const t0 = performance.now();
            const step = (now) => {
              const k = Math.min(1, (now - t0) / 1400);
              el.textContent = String(Math.round(end * (1 - Math.pow(1 - k, 3))));
              if (k < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }),
        { threshold: 0.6 }
      );
      counters.forEach((el) => {
        el.dataset.count = el.textContent.trim();
        el.style.minWidth = `${el.getBoundingClientRect().width}px`;
        el.textContent = '0';
        io.observe(el);
      });
      off.push(() => {
        io.disconnect();
        counters.forEach((el) => (el.textContent = el.dataset.count));
      });
    }

    return () => off.forEach((f) => f());
  }, []);
  return null;
}
