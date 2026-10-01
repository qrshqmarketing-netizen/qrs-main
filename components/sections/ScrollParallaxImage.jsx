'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import './ScrollParallaxImage.css';

export default function ScrollParallaxImage({ src, alt = '', sizes = '100vw', preload = false }) {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    const frame = layer?.parentElement;
    if (!layer || !frame || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let animationFrame = 0;
    let isVisible = false;
    const update = () => {
      if (!isVisible) return;
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const bounds = frame.getBoundingClientRect();
        const distance = Math.max(0, Math.min(-bounds.top, bounds.height));
        layer.style.setProperty('--section-parallax-y', `${distance * 0.12}px`);
      });
    };
    const visibility = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      layer.classList.toggle('scroll-parallax-active', isVisible);
      if (isVisible) update();
    }, { rootMargin: '100px 0px' });

    visibility.observe(frame);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(animationFrame);
      visibility.disconnect();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="scroll-parallax-layer" ref={layerRef}>
      <Image src={src} alt={alt} fill sizes={sizes} preload={preload} />
    </div>
  );
}
