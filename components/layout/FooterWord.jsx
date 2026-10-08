'use client';

import { useEffect, useRef, useState } from 'react';

// The big faint brand word across the bottom of the footer. When it scrolls into view each letter slides up out of its own mask, one after the other (about 0.09 s
// apart). Decorative (aria-hidden): the real text is in the page title, the logo and the copyright line. Without JavaScript, in print and for reduced motion the
// letters are simply there.
export default function FooterWord({ word = 'QUALITY' }) {
  const ref = useRef(null);
  const [state, setState] = useState('static'); // 'static' (visible) -> 'ready' (hidden, waiting) -> 'in' (revealed)

  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const el = ref.current;
    if (!el || el.getBoundingClientRect().top < window.innerHeight) return undefined; // already on screen at load: leave it
    setState('ready');
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setState('in');
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={'ft-name' + (state === 'static' ? '' : ` is-${state}`)} aria-hidden="true" ref={ref}>
      {[...word].map((letter, i) => (
        <span className="ft-l" style={{ '--i': i }} key={i}>
          <span>{letter}</span>
        </span>
      ))}
    </div>
  );
}
