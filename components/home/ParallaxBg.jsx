'use client';

import { useEffect, useRef } from 'react';

// A section's background photo that moves slower than the page (owner, November 4 2026: the crew photo on the home page). The frame is taller
// than the section and drifts up to about a sixth of the section's height against the scroll; transform only, so nothing shifts. Still for
// reduced motion and in print (CSS), and nothing runs while the section is off screen. The frame's position is also set inline (and the section's
// in HomeCrew), so the photo can never spill over the page if the stylesheet arrives late.
// overscan: how far (in % of the section's height) the frame reaches past the top and bottom; strength: the drift as a share of the section's
// height (it must stay under 2 x overscan or a gap shows). The transform is set inline too, so it works even if the stylesheet is late.
export default function ParallaxBg({ children, className = '', overscan = 18, strength = 0.32 }) {
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
      const y = ((p - 0.5) * r.height * strength).toFixed(1);
      el.style.setProperty('--cy', `${y}px`);
      el.style.transform = `translate3d(0, ${y}px, 0)`;
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
  }, [strength]);
  return (
    <div ref={ref} className={className} style={{ position: 'absolute', left: 0, right: 0, top: `-${overscan}%`, bottom: `-${overscan}%`, zIndex: -2, willChange: 'transform' }} aria-hidden="true">
      {children}
    </div>
  );
}
