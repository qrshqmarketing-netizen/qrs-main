'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import './ProjectReveal.css';

// "During the job → finished", adapted from fluid.glass/approach (a line drawing wipes away to the finished photo as you scroll past it):
// a frame pinned on screen holds the finished roof under a photo taken during the job; scrolling through the section wipes the job photo
// up and away from the bottom, and both photos settle from a slight zoom. Only for a pair shot from about the same spot (`reveal` in the
// project's data file), so the wipe reads as the same roof changing. before/after: { src, alt }, both photos from the job.
// Reduced motion and no JavaScript: the two photos side by side, labelled. Transform and clip-path only, so nothing shifts.
export default function ProjectReveal({ before, after, heading }) {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    el.classList.add('is-live');
    let frame = 0;
    let near = false;
    const update = () => {
      frame = 0;
      const box = el.querySelector('.pd-reveal-track').getBoundingClientRect();
      const run = box.height - window.innerHeight;
      const p = run > 0 ? Math.min(1, Math.max(0, -box.top / run)) : 0;
      // A short hold at each end, so the job photo is seen whole before the wipe and the finished roof after it
      const w = Math.min(1, Math.max(0, (p - 0.12) / 0.72));
      el.style.setProperty('--p', p.toFixed(4));
      el.style.setProperty('--w', w.toFixed(4));
    };
    const onScroll = () => {
      if (near && !frame) frame = requestAnimationFrame(update);
    };
    const watcher = new IntersectionObserver(([entry]) => {
      near = entry.isIntersecting;
      onScroll();
    }, { rootMargin: '300px 0px' });
    watcher.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      watcher.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      el.classList.remove('is-live');
    };
  }, []);

  return (
    <section className="pd-reveal" ref={root} aria-label="The roof during the job and finished" data-no-reveal="">
      <div className="container pd-reveal-head">
        <p className="pd-label">The change</p>
        <h2>{heading}</h2>
      </div>
      <div className="pd-reveal-track">
        <div className="pd-reveal-stage">
          <div className="container">
            <div className="pd-reveal-frame">
              <figure className="pd-reveal-pic pd-reveal-after">
                <Image src={after.src} alt={after.alt} fill sizes="(min-width: 1240px) 1200px, 100vw" quality={75} loading="lazy" />
                <figcaption>Finished</figcaption>
              </figure>
              <figure className="pd-reveal-pic pd-reveal-before">
                <Image src={before.src} alt={before.alt} fill sizes="(min-width: 1240px) 1200px, 100vw" quality={75} loading="lazy" />
                <figcaption>During the job</figcaption>
              </figure>
              <span className="pd-reveal-edge" aria-hidden="true"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
