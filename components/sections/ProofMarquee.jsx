'use client';

import { useEffect, useRef } from 'react';

const SPEED = 38; // pixels a second
const COPIES = 4; // the points repeated end to end: one copy is the loop, the rest keep the strip full on a wide screen
const RESUME_MS = 2500; // how long after the visitor last touched it the strip waits before it drifts again

// The proof strip above the header (ProofBar `strip`): the points inline (heading and line side by side) in a horizontal marquee. It drifts on its
// own and can also be scrolled by hand (swipe, trackpad, arrow keys) in either direction; it pauses while the pointer is over it, while it has
// keyboard focus and for a moment after the visitor scrolls it, and it only moves while it is on screen and the tab is visible. Visitors who
// ask for reduced motion get a strip that doesn't move by itself, but still scrolls. Without JavaScript it is simply a scrollable row.
// The repeated copies are hidden from screen readers and from the tab order.
export default function ProofMarquee({ points, label }) {
  const view = useRef(null);

  useEffect(() => {
    const el = view.current;
    if (!el) return undefined;
    const track = el.firstElementChild;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // The drift moves the track with a transform (November 5 2026), not the strip's scroll position: setting scrollLeft 60 times a second fired
    // a scroll event every frame, and the session-recording script (Clarity) inspected each one, which kept a phone's processor busy all the
    // time. The visitor's own scrolling still moves scrollLeft; the two add up, and the copies repeat, so it looks the same.
    // The width of one copy, measured once and again only when its size changes (reading it every frame forced a layout each time)
    let width = track.scrollWidth / COPIES;
    const unit = () => width;
    const sizer = 'ResizeObserver' in window ? new ResizeObserver(() => { width = track.scrollWidth / COPIES; }) : null;
    sizer?.observe(track);
    let pos = 0, last = 0, raf = 0, resume = 0, hover = false, focus = false, onScreen = true;
    let own = true; // our own first scroll below isn't the visitor's
    el.scrollLeft = width; // start a copy in, so the visitor can scroll either way

    const paused = () => hover || focus || !onScreen || document.hidden || performance.now() < resume;
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (reduced || paused() || unit() < 50) return;
      pos += SPEED * dt;
      if (pos >= unit()) pos -= unit();
      track.style.transform = `translate3d(${-pos.toFixed(1)}px,0,0)`;
    };

    // The visitor's scroll: wait a moment, and keep the position between one and two copies in so it never runs out at either end
    const onScroll = () => {
      if (own) {
        own = false;
        return;
      }
      resume = performance.now() + RESUME_MS;
      const u = unit();
      if (el.scrollLeft >= u * 2) el.scrollLeft -= u;
      else if (el.scrollLeft <= 0) el.scrollLeft += u;
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
      sizer?.disconnect();
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
