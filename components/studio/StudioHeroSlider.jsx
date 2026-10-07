'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

const INTERVAL_MS = 7000;

// The home hero's photo slider: the newest projects' cover photos cross-fade every 7 seconds. A small "up next" card at the bottom right previews the next
// photo (thumbnail, project name, place) with a ring that fills as a countdown to the change; clicking it jumps there. Only the photo on screen and the next
// two are in the page at any time. Reduced motion: no automatic change and no countdown (the card still works as a button). A hidden tab pauses the clock.
// slides: [{ src, alt, title, place }]
export default function StudioHeroSlider({ slides }) {
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0); // restarts the countdown (a new key) when the tab comes back or a photo is chosen by hand
  const [still, setStill] = useState(false);
  const count = slides.length;
  const next = (active + 1) % count;

  useEffect(() => setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches), []);

  useEffect(() => {
    if (count < 2 || still) return undefined;
    let timer;
    const start = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setActive((i) => (i + 1) % count), INTERVAL_MS);
    };
    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        setTick((t) => t + 1);
        start();
      } else clearTimeout(timer);
    };
    if (document.visibilityState === 'visible') start();
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [active, tick, count, still]);

  const jump = useCallback((i) => {
    setActive(i);
    setTick((t) => t + 1);
  }, []);

  const shown = (i) => i === active || i === next || i === (active + 2) % count;
  const nextSlide = slides[next];

  return (
    <>
      <div className="st-hero-bg" aria-hidden="true">
        {slides.map((s, i) =>
          shown(i) || i === 0 ? (
            <Image
              key={s.src}
              className={i === active ? 'on' : ''}
              src={s.src}
              alt={i === 0 ? s.alt : ''}
              fill
              sizes="100vw"
              preload={i === 0}
              fetchPriority={i === 0 ? 'high' : undefined}
              loading={i === 0 ? undefined : 'lazy'}
            />
          ) : null
        )}
      </div>
      {count > 1 && (
        <button className="st-next" type="button" onClick={() => jump(next)} aria-label={`Show the next project photo: ${nextSlide.title}`}>
          <span className="st-next-thumb">
            <Image src={nextSlide.src} alt="" fill sizes="120px" quality={60} />
          </span>
          <span className="st-next-text">
            <small>
              Up next · {String(next + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </small>
            <b>{nextSlide.title}</b>
            {nextSlide.place && <span>{nextSlide.place}</span>}
          </span>
          <span className="st-next-ring" aria-hidden="true">
            <svg viewBox="0 0 40 40">
              <circle className="track" cx="20" cy="20" r="17" />
              <circle key={`${active}-${tick}`} className={'fill' + (still ? ' still' : '')} cx="20" cy="20" r="17" style={{ animationDuration: `${INTERVAL_MS}ms` }} />
            </svg>
            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </button>
      )}
    </>
  );
}
