'use client';

import { useEffect, useRef } from 'react';

// A thin gold bar along the top of the screen that fills as the article is read (the height of <article class="post">). Layout-free: it only
// scales a fixed bar. Left out for visitors who ask for reduced motion's smoothing (the bar still moves, without the easing).
export default function ReadingProgress() {
  const bar = useRef(null);
  useEffect(() => {
    const article = document.querySelector('article.post');
    const el = bar.current;
    if (!article || !el) return undefined;
    let raf = 0;
    let gone = false; // a scroll or frame that arrives while the page is being left (the new page is scrolled to its top) must not touch the old bar
    const update = () => {
      raf = 0;
      if (gone || !el.isConnected) return;
      const rect = article.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      const read = Math.min(1, Math.max(0, (-rect.top + window.innerHeight * 0.25) / Math.max(total, 1)));
      el.style.transform = `scaleX(${read})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      gone = true;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return <div className="rp" aria-hidden="true"><i ref={bar} /></div>;
}
