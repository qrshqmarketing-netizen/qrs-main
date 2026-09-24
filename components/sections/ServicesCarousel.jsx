'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ArrowButton from '@/components/ui/ArrowButton';
import { SERVICES } from '@/data/services';

// Swipeable row of service cards with prev/next arrows (styles in Services.css)
export default function ServicesCarousel() {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    const update = () => {
      setAtStart(track.scrollLeft <= 2);
      setAtEnd(track.scrollLeft >= track.scrollWidth - track.clientWidth - 2);
    };
    update();
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      track.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  // Scroll by one card width (plus the gap)
  const scrollCards = (dir) => {
    const track = trackRef.current;
    const card = track.querySelector('.svc-card');
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = card ? card.getBoundingClientRect().width + gap : track.clientWidth;
    track.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (!atEnd) scrollCards(1);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (!atStart) scrollCards(-1);
    }
  };

  return (
    <>
      <div className="svc-head">
        <h2 id="svcTitle">Roofing Services</h2>
        <div className="svc-arrows">
          <ArrowButton direction="prev" id="svcPrev" aria-label="Previous services" aria-controls="svcTrack" disabled={atStart} onClick={() => scrollCards(-1)} />
          <ArrowButton direction="next" id="svcNext" aria-label="Next services" aria-controls="svcTrack" disabled={atEnd} onClick={() => scrollCards(1)} />
        </div>
      </div>

      <div className="svc-track" id="svcTrack" ref={trackRef} tabIndex={0} aria-roledescription="carousel" aria-labelledby="svcTitle" onKeyDown={onKeyDown}>
        {SERVICES.map((service, i) => (
          <article className="svc-card" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${SERVICES.length}`} key={service.title}>
            <div className={`svc-media ${service.scene}`} aria-hidden="true">
              {service.image && (
                <Image src={service.image} alt="" fill sizes="(min-width: 901px) 390px, (min-width: 621px) 50vw, 86vw" />
              )}
            </div>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
            <a className="btn btn-gold" href={service.href}>More Info</a>
          </article>
        ))}
      </div>
    </>
  );
}
