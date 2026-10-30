'use client';

import { useEffect, useRef, useState } from 'react';

// Google reviews as a slider, each quote beside a number card (HomeGradient.css, "Reviews"). It moves on by itself every 8 seconds while on screen,
// pauses on hover and keyboard focus, and stays put for reduced motion. Every quote is in the HTML; the arrows and dots move between them.
export default function HomeQuotes({ slides }) {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const [seen, setSeen] = useState(false);
  const root = useRef(null);
  const go = (n) => setI((n + slides.length) % slides.length);

  useEffect(() => {
    const el = root.current;
    if (!('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (hold || !seen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), 8000);
    return () => clearTimeout(t);
  }, [i, hold, seen, slides.length]);

  return (
    <div
      ref={root}
      onPointerEnter={() => setHold(true)}
      onPointerLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHold(false)}
    >
      <div className="hg-q-viewport">
        <div className="hg-q-track" style={{ transform: `translateX(-${i * 100}%)` }}>
          {slides.map((s, n) => (
            <div className="hg-q-slide" key={s.name} aria-hidden={n !== i} inert={n !== i ? true : undefined}>
              <figure className="hg-q-main">
                <div>
                  <div className="hg-stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <blockquote>“{s.text}”</blockquote>
                </div>
                <figcaption className="hg-who">
                  <span className="hg-avatar" aria-hidden="true">{s.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
                  <span>
                    <b>{s.name}</b>
                    <small>Google review</small>
                  </span>
                </figcaption>
              </figure>
              <div className={`hg-q-stat ${s.statClass}`}>
                <b>{s.stat}</b>
                <span>{s.statText}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hg-q-dots">
        <span className="hg-q-ctrl">
          <button type="button" className="hg-q-btn" aria-label="Previous review" onClick={() => go(i - 1)}>←</button>
        </span>
        {slides.map((s, n) => (
          <button key={s.name} type="button" aria-label={`Review ${n + 1} of ${slides.length}`} aria-current={n === i} onClick={() => go(n)}>
            <i />
          </button>
        ))}
        <span className="hg-q-ctrl">
          <button type="button" className="hg-q-btn" aria-label="Next review" onClick={() => go(i + 1)}>→</button>
        </span>
      </div>
    </div>
  );
}
