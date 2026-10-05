'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const INTERVAL_MS = 7000; // each photo stays up this long before the next fades in
const START_DELAY_MS = 1500; // after the page has loaded, so the rotation never competes with it

// A hero photo slider (Hero's `slides`: [{ src, alt }]). The first photo is the page's main image and loads with it; the rest
// are added to the page in the background, one ahead of the one on screen, so each is ready before it fades in. Visitors who
// ask for reduced motion keep the first photo. Used inside HeroParallax's .hero-roof-texture (the dark overlay sits above it).
export default function HeroSlides({ slides, imagePosition }) {
  const [active, setActive] = useState(0);
  const [rendered, setRendered] = useState(1); // how many slides are in the page
  const ready = useRef(new Set([0]));

  useEffect(() => {
    if (slides.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let timer, cancelled = false, current = 0;

    const advance = () => {
      if (cancelled) return;
      const next = (current + 1) % slides.length;
      // Wait for the next photo (and for the tab to be visible) before fading to it, then queue the one after
      if (document.visibilityState !== 'visible' || !ready.current.has(next)) {
        timer = setTimeout(advance, 400);
        return;
      }
      current = next;
      setActive(next);
      setRendered((r) => Math.max(r, Math.min(next + 2, slides.length)));
      timer = setTimeout(advance, INTERVAL_MS);
    };

    const start = () => {
      setRendered(2); // the second photo loads while the first is on screen
      timer = setTimeout(advance, INTERVAL_MS);
    };
    let begin;
    if (document.readyState === 'complete') begin = setTimeout(start, START_DELAY_MS);
    else {
      const onLoad = () => (begin = setTimeout(start, START_DELAY_MS));
      window.addEventListener('load', onLoad, { once: true });
      return () => {
        cancelled = true;
        window.removeEventListener('load', onLoad);
        clearTimeout(begin);
        clearTimeout(timer);
      };
    }
    return () => {
      cancelled = true;
      clearTimeout(begin);
      clearTimeout(timer);
    };
  }, [slides.length]);

  return slides.slice(0, rendered).map((slide, i) => (
    <div className={'hero-slide' + (i === active ? ' is-active' : '')} key={slide.src}>
      <Image
        src={slide.src}
        alt={slide.alt || ''}
        fill
        sizes="100vw"
        preload={i === 0}
        fetchPriority={i === 0 ? 'high' : undefined}
        loading={i === 0 ? undefined : 'eager'}
        onLoad={() => ready.current.add(i)}
        style={imagePosition ? { objectPosition: imagePosition } : undefined}
      />
    </div>
  ));
}
