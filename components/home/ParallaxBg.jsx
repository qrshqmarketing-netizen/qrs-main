'use client';

import { useEffect, useRef } from 'react';

// A section's background photo that moves slower than the page (owner, November 4 2026: the crew photo on the home page). The frame is taller
// than the section and drifts up to about a sixth of the section's height against the scroll; transform only, so nothing shifts. Still for
// reduced motion and in print (CSS), and nothing runs while the section is off screen. The frame's position is also set inline (and the section's
// in HomeCrew), so the photo can never spill over the page if the stylesheet arrives late.
export default function ParallaxBg({ children, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const section = el.parentElement;
    let onScreen = false;
    let queued = false;
    const paint = () => {
      queued = false;
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height))); // 0 entering at the bottom, 1 leaving at the top
      el.style.setProperty('--cy', `${((p - 0.5) * r.height * 0.32).toFixed(1)}px`);
    };
    const onScroll = () => {
      if (onScreen && !queued) {
        queued = true;
        requestAnimationFrame(paint);
      }
    };
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen) paint();
    }, { rootMargin: '100px 0px' });
    io.observe(section);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return (
    <div ref={ref} className={className} style={{ position: 'absolute', inset: '-18% 0', zIndex: -2 }} aria-hidden="true">
      {children}
    </div>
  );
}
