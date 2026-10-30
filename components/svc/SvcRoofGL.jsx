'use client';

import { useEffect, useRef } from 'react';

// The WebGL roof shape behind a service page hero (svcRoofEngine.js). Fetched after the page has loaded and only while the hero is near the
// screen; draws only while on screen and the tab is visible; one still frame for reduced motion; nothing with Data Saver or without WebGL (the
// hero's gradient carries on alone). The colors are the theme's gold and the brand blue. Decorative (aria-hidden). `kind="commercial"` draws
// the commercial building (the commercial pages) instead of the house, `kind="dollar"` a dollar sign (the financing page).
export default function SvcRoofGL({ kind = 'home' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || navigator.connection?.saveData) return undefined;
    const hero = canvas.closest('section');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let stage = null;
    let cancelled = false;
    let watch;
    let resizer;
    let onScroll;

    const start = async () => {
      try {
        const { createSvcRoof } = await import('./svcRoofEngine');
        if (cancelled) return;
        const gold = getComputedStyle(document.documentElement).getPropertyValue('--gold').trim() || '#d4b572';
        stage = createSvcRoof(canvas, { reducedMotion, gold, kind });
        if (!stage) return;
        canvas.classList.add('on');
        resizer = new ResizeObserver(() => stage?.resize());
        resizer.observe(canvas);
        watch = new IntersectionObserver(([e]) => stage?.setVisible(e.isIntersecting));
        watch.observe(hero || canvas);
        onScroll = () => {
          const r = (hero || canvas).getBoundingClientRect();
          stage?.setScroll(Math.max(-1, Math.min(1, -r.top / Math.max(1, r.height))));
        };
        window.addEventListener('scroll', onScroll, { passive: true });
      } catch {
        // no WebGL: the gradient stays on its own
      }
    };

    const later = () => ('requestIdleCallback' in window ? window.requestIdleCallback(start, { timeout: 1500 }) : setTimeout(start, 300));
    if (document.readyState === 'complete') later();
    else window.addEventListener('load', later, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('load', later);
      if (onScroll) window.removeEventListener('scroll', onScroll);
      resizer?.disconnect();
      watch?.disconnect();
      stage?.destroy();
    };
  }, [kind]);

  return <canvas className="sv-gl" ref={ref} aria-hidden="true" />;
}
