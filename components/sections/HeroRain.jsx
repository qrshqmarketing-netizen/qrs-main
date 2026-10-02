'use client';

import { useEffect, useRef } from 'react';

// Seasonal rain over the hero (HERO_RAIN in data/promo.js): an empty canvas between the photo and the copy
// (Hero.css .hero-rain). The animation itself (lib/heroRain.js) is a separate file, fetched only once the page has
// finished loading and the browser is idle, so nothing about the rain slows the page down. Skipped for visitors who ask
// for reduced motion or less data, and on low-end devices.
export default function HeroRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.parentElement;
    if (!hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData) return;
    if (navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2) return;

    const hasIdle = 'requestIdleCallback' in window; // not in Safari: a short timeout instead
    let stop, idle, cancelled = false;
    const begin = async () => {
      const { startRain } = await import('@/lib/heroRain');
      if (!cancelled) stop = startRain(canvas, hero);
    };
    const whenIdle = () => {
      idle = hasIdle ? requestIdleCallback(begin, { timeout: 3000 }) : setTimeout(begin, 500);
    };
    if (document.readyState === 'complete') whenIdle();
    else window.addEventListener('load', whenIdle, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('load', whenIdle);
      if (hasIdle) cancelIdleCallback(idle);
      else clearTimeout(idle);
      stop?.();
    };
  }, []);

  return <canvas className="hero-rain" ref={canvasRef} aria-hidden="true" />;
}
