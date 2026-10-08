'use client';

import { useEffect, useRef } from 'react';

// `rich` (the landing page's full-width hero) makes the rain denser and a little brighter than in the small popup.
// Seasonal rain inside the season promo popup (SEASON_PROMO.rain in data/promo.js): an empty canvas between the card's
// photo and its copy (SeasonPromo.css .promo-rain). The animation itself (lib/promoRain.js) is a separate file, fetched
// only once the page has finished loading and the browser is idle, so nothing about the rain slows the page down.
// Skipped for visitors who ask for reduced motion or less data, and on low-end devices.
export default function PromoRain({ rich = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const card = canvas?.parentElement;
    if (!card) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData) return;
    if (navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2) return;

    const hasIdle = 'requestIdleCallback' in window; // not in Safari: a short timeout instead
    let stop, idle, cancelled = false;
    const begin = async () => {
      const { startRain } = await import('@/lib/promoRain');
      if (!cancelled) stop = startRain(canvas, card);
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

  return <canvas className="promo-rain" ref={canvasRef} data-rich={rich ? '1' : undefined} aria-hidden="true" />;
}
