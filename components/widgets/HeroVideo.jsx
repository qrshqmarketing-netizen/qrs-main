'use client';

import { useEffect, useRef } from 'react';

// A muted, looping background video over a hero's photo (the home page's El Niño hero: public/videos/home-hero-el-nino.webm, slowed 30% when it
// was encoded, with an H.264 .mp4 for browsers without WebM). The photo underneath stays the page's first paint and the fallback: the video's
// files are only fetched after the page has loaded, and it fades in once it is actually playing. Nothing loads for visitors who ask for
// reduced motion or have Data Saver on, or when autoplay is blocked; they keep the photo. `sources`: [{ src, type }], best first.
export default function HeroVideo({ sources, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || navigator.connection?.saveData || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const onPlaying = () => video.classList.add('on');
    const start = () => {
      for (const { src, type } of sources) {
        const s = document.createElement('source');
        s.src = src;
        s.type = type;
        video.appendChild(s);
      }
      video.muted = true;
      video.load();
      video.play().catch(() => {}); // blocked: the photo stays
    };
    video.addEventListener('playing', onPlaying);
    const later = () => ('requestIdleCallback' in window ? window.requestIdleCallback(start, { timeout: 1500 }) : setTimeout(start, 300));
    if (document.readyState === 'complete') later();
    else window.addEventListener('load', later, { once: true });
    return () => {
      window.removeEventListener('load', later);
      video.removeEventListener('playing', onPlaying);
      video.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <video ref={ref} className={'hero-video ' + className} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} disablePictureInPicture />;
}
