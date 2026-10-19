'use client';

import { useEffect } from 'react';

// The landing pages' scroll effects (renders nothing; CSS in Landing.css, "Motion"): an element with data-lp-in gets the class is-in once it is
// a fifth of the way into view (the steps' gold line draws itself), and the hero photo dims a little as the hero scrolls away (--lp-p, 0 to 1,
// one passive scroll handler, transform-free). Nothing runs for reduced motion; the page looks finished without JavaScript.
export default function LandingMotion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const root = document.documentElement;
    root.classList.add('lp-motion');

    const io = 'IntersectionObserver' in window
      ? new IntersectionObserver(
          (entries) => entries.forEach((e) => {
            if (!e.isIntersecting) return;
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }),
          { rootMargin: '0px 0px -20% 0px' }
        )
      : null;
    document.querySelectorAll('[data-lp-in]').forEach((el) => (io ? io.observe(el) : el.classList.add('is-in')));

    const hero = document.querySelector('.lp-hero');
    let frame = 0;
    const onScroll = () => {
      if (frame || !hero) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const h = hero.offsetHeight || 1;
        hero.style.setProperty('--lp-p', Math.min(1, Math.max(0, window.scrollY / h)).toFixed(3));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      io?.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
      root.classList.remove('lp-motion');
    };
  }, []);
  return null;
}
