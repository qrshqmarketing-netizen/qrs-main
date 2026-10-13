'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Two scroll-linked touches adapted from fluid.glass, re-bound on every page (mounted in app/layout.js):
// 1. The page's hero (sub-page Hero, project cover, the home El Niño hero): as it scrolls away, its photo dims and the copy drifts down a little
//    and fades, so the page seems to move over it. --hero-p (0 → 1 over the hero's height) is set on the hero; the CSS is at the end of
//    app/globals.css.
// 2. Bands marked data-expand (the closing call to action): they open from an inset, rounded card to the full width as they rise into view.
//    --ex (0 → 1) is set on the band.
// Only transform, opacity and clip-path change, so nothing shifts. Not for reduced motion, in print or on /admin; without JavaScript the CSS
// defaults show everything as it was.
const HEROES = '.promo-home, main .hero, .pd-hero';

export default function ScrollScenes() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith('/admin') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let frame = 0;
    let hero = null;
    let bands = [];
    const bind = () => {
      hero = document.querySelector(HEROES);
      bands = [...document.querySelectorAll('[data-expand]')];
      hero?.classList.add('hero-scene');
      bands.forEach((band) => band.classList.add('expand-scene'));
    };
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      if (hero) {
        const box = hero.getBoundingClientRect();
        const p = box.height ? Math.min(1, Math.max(0, -box.top / box.height)) : 0;
        if (box.bottom > -50) hero.style.setProperty('--hero-p', p.toFixed(4));
      }
      for (const band of bands) {
        const top = band.getBoundingClientRect().top;
        if (top > vh * 1.2 || top < -vh) continue;
        const ex = Math.min(1, Math.max(0, (vh - top) / (vh * 0.75)));
        band.style.setProperty('--ex', ex.toFixed(4));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    // After the new page has rendered
    const start = setTimeout(() => {
      bind();
      update();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
    }, 120);
    return () => {
      clearTimeout(start);
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      hero?.classList.remove('hero-scene');
      hero?.style.removeProperty('--hero-p');
      bands.forEach((band) => {
        band.classList.remove('expand-scene');
        band.style.removeProperty('--ex');
      });
    };
  }, [pathname]);

  return null;
}
