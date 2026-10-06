'use client';

import { useEffect, useRef } from 'react';
import './AuroraBackground.css';

// Aurora borealis behind the "Why Choose QRS" section and the footer: slow curtains of gold, blue and plum over a navy night sky and a row
// of rooftops, drawn by a small WebGL shader (auroraEngine.js). `variant` is 'section' (the bright one) or 'footer' (a calmer dusk, with
// warm light along the horizon and denser rooftops, so the footer's links stay easy to read). Sits behind its parent's content (the parent
// needs `position:relative; isolation:isolate; overflow:hidden`).
// Until the engine has drawn its first frame, and wherever WebGL isn't available or Data Saver is on, the CSS poster in
// AuroraBackground.css shows instead, so the section always looks finished. The engine is fetched only when the section is about to
// come into view, draws only while it is on screen and stands still for visitors who ask for reduced motion.
export default function AuroraBackground({ variant = 'section' }) {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return undefined;
    if (navigator.connection?.saveData) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let engine = null;
    let cancelled = false;
    let starter = null;
    let watcher = null;
    let resizer = null;

    // The site's own colors, so changing them in globals.css recolors the sky too (the engine has matching defaults)
    const themeColors = () => {
      const css = getComputedStyle(document.documentElement);
      return { gold: css.getPropertyValue('--gold'), plum: css.getPropertyValue('--plum') };
    };

    const onLost = () => host.classList.remove('is-live');

    const start = async () => {
      try {
        const { AuroraEngine } = await import('./auroraEngine');
        if (cancelled) return;
        const created = new AuroraEngine(canvas, { variant, reducedMotion, colors: themeColors() });
        if (!created.ok) return;
        engine = created;
        host.classList.add('is-live');
        canvas.addEventListener('aurora-lost', onLost);
        if ('ResizeObserver' in window) {
          resizer = new ResizeObserver(() => engine && engine.resize());
          resizer.observe(host);
        }
        if ('IntersectionObserver' in window) {
          watcher = new IntersectionObserver(([entry]) => engine && engine.setVisible(entry.isIntersecting));
          watcher.observe(host);
        }
      } catch {
        // no engine: the poster stays
      }
    };

    if ('IntersectionObserver' in window) {
      starter = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        starter.disconnect();
        start();
      }, { rootMargin: '300px' });
      starter.observe(host);
    } else {
      start();
    }

    return () => {
      cancelled = true;
      if (starter) starter.disconnect();
      if (watcher) watcher.disconnect();
      if (resizer) resizer.disconnect();
      canvas.removeEventListener('aurora-lost', onLost);
      if (engine) engine.destroy();
    };
  }, [variant]);

  return (
    <div className={variant === 'footer' ? 'aurora aurora-footer' : 'aurora'} ref={hostRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
