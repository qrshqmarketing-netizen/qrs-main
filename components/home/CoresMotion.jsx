'use client';

import { useEffect, useRef } from 'react';

// Starts the four principle cards' motion (HomeGradient.css, "Principle cards in motion"): `hg-seen` plays the entrance once when the cards
// scroll into view, `hg-live` runs the loops only while they are on screen. Cards already on screen at load skip the entrance (`hg-static`),
// so nothing that was painted disappears. Nothing for reduced motion: the pictures stay as drawn.
export default function CoresMotion() {
  const ref = useRef(null);
  useEffect(() => {
    const grid = ref.current?.parentElement?.querySelector('.hg-cores');
    if (!grid || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = grid.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) grid.classList.add('hg-static', 'hg-seen');
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) grid.classList.add('hg-seen');
        grid.classList.toggle('hg-live', e.isIntersecting);
      },
      { threshold: 0.2 }
    );
    io.observe(grid);
    return () => io.disconnect();
  }, []);
  return <span ref={ref} hidden />;
}
