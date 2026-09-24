'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ArrowButton from '@/components/ui/ArrowButton';
import SiteLink from '@/components/ui/SiteLink';
import { SERVICES } from '@/data/services';
import './Services.css';

// Swipeable row of photo cards with prev/next arrows.
// items: [{ title, text, href, scene, image?, cta? }]; idPrefix keeps ids unique if a page has two carousels.
export default function ServicesCarousel({ title = 'Roofing Services', items = SERVICES, idPrefix = 'svc' }) {
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

  const ids = { title: `${idPrefix}Title`, track: `${idPrefix}Track` };

  return (
    <>
      <div className="svc-head">
        <h2 id={ids.title}>{title}</h2>
        <div className="svc-arrows">
          <ArrowButton direction="prev" id={`${idPrefix}Prev`} aria-label={`Previous ${title.toLowerCase()}`} aria-controls={ids.track} disabled={atStart} onClick={() => scrollCards(-1)} />
          <ArrowButton direction="next" id={`${idPrefix}Next`} aria-label={`Next ${title.toLowerCase()}`} aria-controls={ids.track} disabled={atEnd} onClick={() => scrollCards(1)} />
        </div>
      </div>

      <div className="svc-track" id={ids.track} ref={trackRef} tabIndex={0} aria-roledescription="carousel" aria-labelledby={ids.title} onKeyDown={onKeyDown}>
        {items.map((item, i) => (
          <article className="svc-card" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${items.length}`} key={item.title}>
            <div className={`svc-media ${item.scene || ''}`} aria-hidden="true">
              {item.image && <Image src={item.image} alt="" fill sizes="(min-width: 901px) 390px, (min-width: 621px) 50vw, 86vw" />}
            </div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <SiteLink className="btn btn-gold" href={item.href} aria-label={`${item.cta || 'More Info'}: ${item.title}`}>
              {item.cta || 'More Info'}
            </SiteLink>
          </article>
        ))}
      </div>
    </>
  );
}
