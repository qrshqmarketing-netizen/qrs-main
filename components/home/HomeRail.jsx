'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from '@/components/ui/icons';

// The sideways row of cards and its two round arrow buttons (digitalocean.com's "Resources" row). The cards scroll by touch, trackpad or the
// arrows; the arrows grey out at either end and hide when every card fits. children: the <li> cards.
export default function HomeRail({ label, children }) {
  const track = useRef(null);
  const [ends, setEnds] = useState({ start: true, end: false, fits: false });
  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEnds({ start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4, fits: max <= 4 });
  }, []);
  useEffect(() => {
    measure();
    const el = track.current;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    el.addEventListener('scroll', measure, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener('scroll', measure);
    };
  }, [measure]);
  const go = (dir) => {
    const el = track.current;
    const card = el.querySelector('li');
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  return (
    <>
      <div className="hc-arrows" hidden={ends.fits}>
        <button type="button" onClick={() => go(-1)} disabled={ends.start} aria-label={`Previous ${label}`}>
          <ArrowLeft />
        </button>
        <button type="button" onClick={() => go(1)} disabled={ends.end} aria-label={`Next ${label}`}>
          <ArrowRight />
        </button>
      </div>
      <ul className="hc-rail" ref={track} data-lenis-prevent-wheel="">
        {children}
      </ul>
    </>
  );
}
