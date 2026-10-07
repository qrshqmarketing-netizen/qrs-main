'use client';

import { useEffect, useRef } from 'react';

const SPEED = 38; // pixels a second
const COPIES = 4; // the points repeated end to end: one copy is the loop, the rest keep the strip full on a wide screen
const RESUME_MS = 2500; // how long after the visitor last touched it the strip waits before it drifts again

// The proof strip under the hero (ProofBar `strip`): the points inline (heading and line side by side) in a horizontal marquee. It drifts on its
// own and can also be scrolled by hand (swipe, trackpad, arrow keys) in either direction; it pauses while the pointer is over it, while it has
// keyboard focus and for a moment after the visitor scrolls it, and it only moves while it is on screen and the tab is visible. Visitors who
// ask for reduced motion get a strip that doesn't move by itself, but still scrolls. Without JavaScript it is simply a scrollable row.
// The repeated copies are hidden from screen readers and from the tab order.
export default function ProofMarquee({ points, label }) {
  const view = useRef(null);

  useEffect(() => {
    const el = view.current;
    if (!el) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const unit = () => el.scrollWidth / COPIES; // the width of one copy
    let pos = 1, set = 1, last = 0, raf = 0, resume = 0, hover = false, focus = false, onScreen = true;
    el.scrollLeft = 1;

    const paused = () => hover || focus || !onScreen || document.hidden || performance.now() < resume;
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (reduced || paused() || unit() < 50) return;
      pos += SPEED * dt;
      if (pos >= unit()) pos -= unit();
      set = pos;
      el.scrollLeft = pos;
    };

    // A scroll we didn't make: the visitor's. Carry on from there, wrap at either end so it never runs out, and wait a moment.
    const onScroll = () => {
      if (Math.abs(el.scrollLeft - set) <= 2) return;
      resume = performance.now() + RESUME_MS;
      const u = unit();
      if (el.scrollLeft >= u * (COPIES - 1)) el.scrollLeft -= u;
      else if (el.scrollLeft <= 0) el.scrollLeft += u;
      pos = set = el.scrollLeft;
    };
    const touched = () => {
      resume = performance.now() + RESUME_MS;
    };
    const enter = (e) => {
      if (e.pointerType === 'mouse') hover = true;
    };
    const leave = (e) => {
      if (e.pointerType === 'mouse') hover = false;
    };
    const focusIn = () => {
      focus = true;
    };
    const focusOut = () => {
      focus = false;
    };
    const watcher = 'IntersectionObserver' in window ? new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; }) : null;
    watcher?.observe(el);

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('pointerdown', touched, { passive: true });
    el.addEventListener('wheel', touched, { passive: true });
    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointerleave', leave);
    el.addEventListener('focusin', focusIn);
    el.addEventListener('focusout', focusOut);
    last = performance.now();
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      watcher?.disconnect();
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('pointerdown', touched);
      el.removeEventListener('wheel', touched);
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointerleave', leave);
      el.removeEventListener('focusin', focusIn);
      el.removeEventListener('focusout', focusOut);
    };
  }, []);

  return (
    <div className="pm" ref={view} role="region" aria-label={label} tabIndex={0}>
      <div className="pm-track">
        {Array.from({ length: COPIES }, (_, copy) => (
          <div className="pm-set" key={copy} {...(copy > 0 && { 'aria-hidden': 'true', inert: true })}>
            {points.map((point) => (
              <div className="pm-item" key={point.title}>
                <h4>{point.title}</h4>
                <span>{point.text}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
