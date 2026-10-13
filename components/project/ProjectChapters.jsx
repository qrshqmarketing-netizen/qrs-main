'use client';

import Image from 'next/image';
import { Fragment, useEffect, useRef } from 'react';
import Rich from '@/components/ui/Rich';
import './ProjectChapters.css';

const pad = (n) => String(n).padStart(2, '0');
const WIDE = '(min-width: 901px) and (prefers-reduced-motion: no-preference)';

// The rest of the project's story as numbered chapters with photos from the job between them, adapted from the pinned "Our process" strip on
// fluid.glass/approach. From 901px (and not for reduced motion) the strip is pinned on screen and slides sideways as the page scrolls, with
// a thin progress line at the top; on phones, in print and without JavaScript the chapters simply stack. The text and headings stay in the
// page's HTML in reading order either way. chapters: [{ heading, text, photo?: { src, alt } }] (the photo shows after its chapter).
export default function ProjectChapters({ chapters }) {
  const root = useRef(null);
  const track = useRef(null);

  useEffect(() => {
    const el = root.current;
    const strip = track.current;
    if (!el || !strip) return undefined;
    const media = window.matchMedia(WIDE);
    let frame = 0;
    let near = false;
    let run = 0; // how far the strip slides, in px

    const measure = () => {
      if (!media.matches) {
        el.classList.remove('is-pinned');
        el.style.removeProperty('--run');
        strip.style.transform = '';
        return;
      }
      el.classList.add('is-pinned');
      run = Math.max(0, Math.max(strip.scrollWidth, strip.offsetWidth) - window.innerWidth);
      el.style.setProperty('--run', run + 'px'); // the section is this much taller than the screen, so the sideways slide has room
      update();
    };
    const update = () => {
      frame = 0;
      if (!media.matches) return;
      const box = el.getBoundingClientRect();
      const p = run > 0 ? Math.min(1, Math.max(0, -box.top / run)) : 0;
      strip.style.transform = `translate3d(${(-p * run).toFixed(1)}px,0,0)`;
      el.style.setProperty('--p', p.toFixed(4));
    };
    const onScroll = () => {
      if (near && !frame) frame = requestAnimationFrame(update);
    };
    const watcher = new IntersectionObserver(([entry]) => {
      near = entry.isIntersecting;
      onScroll();
    }, { rootMargin: '300px 0px' });
    const sizer = new ResizeObserver(measure);

    watcher.observe(el);
    sizer.observe(strip);
    media.addEventListener('change', measure);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    measure();
    return () => {
      watcher.disconnect();
      sizer.disconnect();
      cancelAnimationFrame(frame);
      media.removeEventListener('change', measure);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      el.classList.remove('is-pinned');
    };
  }, []);

  return (
    <section className="pd-chapters" ref={root} aria-label="How the job went" data-no-reveal="">
      <div className="pd-ch-stage">
        <div className="container pd-ch-top">
          <p className="pd-label">How the job went</p>
          <span className="pd-ch-bar" aria-hidden="true">
            <i></i>
          </span>
        </div>
        <div className="pd-ch-strip" ref={track}>
          {chapters.map((chapter, i) => (
            <Fragment key={chapter.text}>
              <div className="pd-ch-text">
                <div className="pd-ch-head">
                  <span className="pd-ch-num">
                    {pad(i + 1)} <small>/ {pad(chapters.length)}</small>
                  </span>
                  {chapter.heading && <h2>{chapter.heading}</h2>}
                </div>
                <p>
                  <Rich text={chapter.text} />
                </p>
              </div>
              {chapter.photo && (
                <figure className="pd-ch-photo">
                  <Image src={chapter.photo.src} alt={chapter.photo.alt} fill sizes="(min-width: 901px) 70vw, 100vw" quality={70} loading="lazy" />
                </figure>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
