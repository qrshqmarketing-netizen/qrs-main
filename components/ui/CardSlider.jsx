'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from '@/components/ui/icons';

// A horizontal, swipeable row of cards (scroll-snap) with dots and previous/next arrows.
// children: <li className="cs-slide"> items. Every card stays in the page's HTML, so all links are crawlable.
// The arrows and dots are hidden when every card already fits.
export default function CardSlider({ children, label }) {
  const track = useRef(null);
  const [state, setState] = useState({ page: 0, pages: 1, atStart: true, atEnd: true });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const slides = el.children.length;
    const step = slides > 1 ? (el.children[1].offsetLeft - el.children[0].offsetLeft) : el.clientWidth;
    const perView = Math.max(1, Math.round(el.clientWidth / step));
    const pages = max > 4 ? Math.max(1, slides - perView + 1) : 1;
    const page = max > 4 ? Math.min(pages - 1, Math.round((el.scrollLeft / max) * (pages - 1))) : 0;
    setState({ page, pages, atStart: el.scrollLeft <= 4, atEnd: el.scrollLeft >= max - 4 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  const go = (dir) => {
    const el = track.current;
    if (!el) return;
    const first = el.children[0];
    const step = el.children[1] ? el.children[1].offsetLeft - first.offsetLeft : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };
  const goTo = (i) => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const slide = el.children[i];
    el.scrollTo({ left: Math.min(max, slide ? slide.offsetLeft - el.children[0].offsetLeft : 0), behavior: 'smooth' });
  };

  const many = state.pages > 1;
  return (
    <div className="cs">
      <ul className="cs-track" ref={track} onScroll={measure} role="region" aria-label={label} tabIndex={0}>
        {children}
      </ul>
      {many && (
        <div className="cs-controls">
          <div className="cs-dots">
            {Array.from({ length: state.pages }, (_, i) => (
              <button type="button" key={i} className={i === state.page ? 'on' : ''} aria-label={`Show cards from ${i + 1}`} aria-current={i === state.page} onClick={() => goTo(i)} />
            ))}
          </div>
          <div className="cs-arrows">
            <button type="button" className="cs-arrow" aria-label="Previous cards" disabled={state.atStart} onClick={() => go(-1)}><ArrowLeft /></button>
            <button type="button" className="cs-arrow" aria-label="Next cards" disabled={state.atEnd} onClick={() => go(1)}><ArrowRight /></button>
          </div>
        </div>
      )}
    </div>
  );
}
