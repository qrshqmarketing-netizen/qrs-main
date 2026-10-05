'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import HeroSlides from './HeroSlides';

export default function HeroParallax({ image, mobileImage, imageAlt = '', imagePosition, slides }) {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const background = backgroundRef.current;
    const hero = background?.parentElement;
    if (!background || !hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const heroTop = hero.getBoundingClientRect().top + window.scrollY;
        const offset = (window.scrollY - heroTop) * 0.16;
        background.style.setProperty('--hero-parallax-y', `${offset}px`);
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
    <div className={'hero-background' + (!image && !mobileImage ? ' hero-background-fallback' : '')} ref={backgroundRef} aria-hidden="true">
      {image && (
        <div className={'hero-roof-texture' + (mobileImage ? ' hero-roof-texture-desktop' : '')}>
          {slides?.length > 1 ? (
            <HeroSlides slides={slides} imagePosition={imagePosition} />
          ) : (
            <Image src={image} alt={imageAlt} fill preload fetchPriority="high" sizes="100vw" style={imagePosition ? { objectPosition: imagePosition } : undefined} />
          )}
        </div>
      )}
      {mobileImage && (
        <div className="hero-roof-texture hero-roof-texture-mobile">
          <Image src={mobileImage} alt={imageAlt} fill preload fetchPriority="high" sizes="100vw" />
        </div>
      )}
    </div>
  );
}
