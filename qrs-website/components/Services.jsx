'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { SERVICES } from '@/data/site';
import { ArrowLeft, ArrowRight } from './Icons';

export default function Services() {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    setAtStart(t.scrollLeft <= 2);
    setAtEnd(t.scrollLeft >= t.scrollWidth - t.clientWidth - 2);
  }, []);

  const scrollByCard = (dir) => {
    const t = trackRef.current;
    if (!t) return;
    const card = t.querySelector('.svc-card');
    const gap = parseFloat(getComputedStyle(t).columnGap) || 0;
    const step = card ? card.getBoundingClientRect().width + gap : t.clientWidth;
    t.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="svc-head">
          <h2 id="svcTitle">Roofing Services</h2>
          <div className="svc-arrows">
            <button className="svc-arrow" type="button" aria-label="Previous services" aria-controls="svcTrack" disabled={atStart} onClick={() => scrollByCard(-1)}>
              <ArrowLeft />
            </button>
            <button className="svc-arrow" type="button" aria-label="Next services" aria-controls="svcTrack" disabled={atEnd} onClick={() => scrollByCard(1)}>
              <ArrowRight />
            </button>
          </div>
        </div>

        <div
          className="svc-track"
          id="svcTrack"
          ref={trackRef}
          tabIndex={0}
          aria-roledescription="carousel"
          aria-labelledby="svcTitle"
          onScroll={update}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); scrollByCard(1); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); scrollByCard(-1); }
          }}
        >
          {SERVICES.map((s, i) => (
            <article key={s.title} className="svc-card" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${SERVICES.length}`}>
              <div className={`svc-media ${s.scene}`} aria-hidden="true">
                {s.image && <img src={s.image} alt="" />}
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <a className="btn btn-gold" href={s.href}>More Info</a>
            </article>
          ))}
        </div>

        <div className="svc-about">
          <h2>The QRS Standard</h2>
          <p>At Quality Roofing Specialists, we believe roofing should be detail-first. With 30+ years of roofing experience, our crews bring the same care to every roof replacement, roof repair, tile lift &amp; relay and flat or shingle roof &mdash; with clear scopes, no pressure and no mystery pricing.</p>
          <p>Before any work starts, you get a written scope and price. We document what we find with photos, explain it in plain English and back our installs with a lifetime workmanship warranty. Straightforward, honest work from a local roofing team across Los Angeles and Orange County.</p>
          <p>Not sure what your roof needs? Start with our roofer-led $199 Roof Check.</p>
          <a className="btn btn-gold" href="#roof-check">Start a Roof Check</a>
        </div>
      </div>
    </section>
  );
}
