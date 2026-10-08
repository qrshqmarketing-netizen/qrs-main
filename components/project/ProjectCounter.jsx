'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import './ProjectCounter.css';

// A big number whose digits roll up into place (like an odometer) the first time it is on screen. The full number is real text in the page (visually hidden,
// and the visible digits are aria-hidden), so search engines, screen readers and visitors without JavaScript get it as-is. Reduced motion: no roll.
export default function ProjectCounter({ value, label }) {
  const ref = useRef(null);
  const [phase, setPhase] = useState('done'); // 'done' (final digits shown) -> 'zero' (digits reset to 0) -> 'roll' (rolling to the number)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return undefined;
    setPhase('zero');
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        requestAnimationFrame(() => requestAnimationFrame(() => setPhase('roll')));
      },
      { threshold: 0.4 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const digits = String(value).split('');
  return (
    <div className="pd-counter" ref={ref}>
      <span className="sr-only">{value}</span>
      <span className="pd-digits" aria-hidden="true">
        {digits.map((d, i) => (
          <span className="pd-digit" key={i}>
            <span
              className={'pd-strip' + (phase === 'zero' ? ' is-zero' : '')}
              style={{ '--to': `-${Number(d) * 10}%`, '--i': i }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <span key={n}>{n}</span>
              ))}
            </span>
          </span>
        ))}
      </span>
      {label && <span className="pd-counter-label">{label}</span>}
    </div>
  );
}
