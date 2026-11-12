'use client';

import { useEffect, useRef } from 'react';

// A muted, looping background video over a hero's photo (the home page's final clip: VP9 WebM, with an H.264 .mp4 for browsers without WebM). The
// photo underneath stays the page's first paint and the fallback: the video's
// files are only fetched after the page has loaded, and it fades in once it is actually playing. Nothing loads for visitors who ask for
// reduced motion or have Data Saver on, or when autoplay is blocked; they keep the photo. `sources`: [{ src, type }], best first.
export default function HeroVideo({ sources, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    // Plays on every screen size, phones included (owner, November 11 2026; from November 5 until then phones and tablets below 901px kept the photo
    // for speed: the video is 3.5 to 4.5 MB). It is still fetched only after the page has loaded, so the photo is what paints first. A visitor with
    // Data Saver on or who asks for reduced motion keeps the photo.
    if (!video || navigator.connection?.saveData || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const onPlaying = () => video.classList.add('on');
    const start = () => {
      if (!video.querySelector('source')) {
      for (const { src, type } of sources) {
        const s = document.createElement('source');
        s.src = src;
        s.type = type;
        video.appendChild(s);
      }
      }
      video.muted = true;
      video.setAttribute('muted', ''); // iOS Safari reads the attribute, not only the property
      video.setAttribute('playsinline', '');
      video.load();
      // Blocked (iOS in Low Power Mode, some Android data savers): the photo stays, and the first tap or click on the page tries once more, since
      // those browsers allow a muted video to start from a user gesture
      video.play().catch(() => {
        const retry = () => video.play().catch(() => {});
        for (const type of ['touchstart', 'pointerdown', 'click']) window.addEventListener(type, retry, { once: true, passive: true });
      });
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
