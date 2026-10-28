'use client';

import { useEffect, useRef } from 'react';

// The WebGL design behind the closing call to action (FinalCta): gold contour lines flowing slowly over the band's solid navy (ctaEngine.js).
// The band's own CSS background is the solid color, so before the engine draws, without WebGL, with Data Saver and in print the band is
// simply solid navy. The engine is fetched only when the band is about to come into view, draws only while it is on screen and stands
// still (one frame) for visitors who ask for reduced motion. Its parent needs `position:relative; isolation:isolate; overflow:hidden`.
export default function CtaBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const band = canvas?.parentElement;
    if (!canvas || !band) return undefined;
    if (navigator.connection?.saveData) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let engine = null;
    let cancelled = false;
    let starter = null;
    let watcher = null;
    let resizer = null;

    const colors = () => {
      const css = getComputedStyle(document.documentElement);
      return { base: getComputedStyle(band).backgroundColor, gold: css.getPropertyValue('--gold'), plum: css.getPropertyValue('--plum') };
    };
    const onLost = () => canvas.classList.remove('is-live');

    const start = async () => {
      try {
        const { CtaEngine } = await import('./ctaEngine');
        if (cancelled) return;
        const created = new CtaEngine(canvas, { reducedMotion, colors: colors() });
        if (!created.ok) return;
        engine = created;
        canvas.classList.add('is-live');
        canvas.addEventListener('cta-lost', onLost);
        if ('ResizeObserver' in window) {
          resizer = new ResizeObserver(() => engine && engine.resize());
          resizer.observe(band);
        }
        if ('IntersectionObserver' in window) {
          watcher = new IntersectionObserver(([entry]) => engine && engine.setVisible(entry.isIntersecting));
          watcher.observe(band);
        }
      } catch {
        // no engine: the solid background stays
      }
    };

    if ('IntersectionObserver' in window) {
      starter = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        starter.disconnect();
        start();
      }, { rootMargin: '400px' });
      starter.observe(band);
    } else {
      start();
    }

    return () => {
      cancelled = true;
      if (starter) starter.disconnect();
      if (watcher) watcher.disconnect();
      if (resizer) resizer.disconnect();
      canvas.removeEventListener('cta-lost', onLost);
      if (engine) engine.destroy();
    };
  }, []);

  return <canvas className="final-gl" ref={canvasRef} aria-hidden="true" />;
}
