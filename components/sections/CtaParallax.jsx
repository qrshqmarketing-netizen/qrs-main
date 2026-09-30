'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function CtaParallax() {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const background = backgroundRef.current;
    const cta = background?.parentElement;
    if (!background || !cta || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const ctaTop = cta.getBoundingClientRect().top + window.scrollY;
        const offset = (window.scrollY - ctaTop) * 0.16;
        background.style.setProperty('--cta-parallax-y', `${offset}px`);
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="cta-parallax" ref={backgroundRef} aria-hidden="true">
      <Image
        className="cta-scene"
        src="/images/cta-shingle-reroof-crew-drone-view.webp"
        fill
        sizes="100vw"
        alt=""
      />
    </div>
  );
}
