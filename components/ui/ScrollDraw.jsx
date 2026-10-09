'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Every page: the hand-drawn underlines and circles below the first screen draw themselves as they scroll into view (a hero's underline draws on load by
// itself, see components/ui/HandUnderline.jsx). Started after the page has loaded and the browser is idle, and again after every page change, so the first
// paint is never touched; each drawing is hidden (`hand-wait`) only once this runs, so with no JavaScript, for reduced motion or in print every line
// simply shows, finished. Drawings in a sideways slider wait until they slide into view.
const TARGETS = 'main .hand-line:not(.hand-draw), main .hand-circle';

export default function ScrollDraw() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return undefined;
    let io;
    let cancelled = false;
    let t;
    const run = () => {
      if (cancelled) return;
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add('hand-go');
            io.unobserve(entry.target);
          }
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0 }
      );
      document.querySelectorAll(TARGETS).forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.9 && r.right > 0 && r.left < window.innerWidth) return; // already on screen: leave it drawn
        el.classList.add('hand-wait');
        io.observe(el);
      });
    };
    const later = () => {
      t = setTimeout(() => ('requestIdleCallback' in window ? window.requestIdleCallback(run, { timeout: 1500 }) : run()), 250);
    };
    if (document.readyState === 'complete') later();
    else window.addEventListener('load', later, { once: true });
    return () => {
      cancelled = true;
      clearTimeout(t);
      window.removeEventListener('load', later);
      io?.disconnect();
    };
  }, [pathname]);
  return null;
}
