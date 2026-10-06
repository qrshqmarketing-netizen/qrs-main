'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import QuoteTrigger from '@/components/ui/QuoteTrigger';
import SiteLink from '@/components/ui/SiteLink';
import { PHONE, TEL } from '@/data/site';
import './HomeHero.css';

const ROTATE_MS = 7000;
const SLOTS = 3;

// The home page's hero: a collage of the three newest projects' cover photos (each links to its project page) and a navy panel with the
// headline, intro and buttons. The arrows (and, unless the visitor asks for reduced motion, a timer) move the photos along one project at a
// time. `projects`: [{ path, image, imageAlt, label }], newest first. The keyword line is the page's H1. The proof strip goes right under it.
export default function HomeHero({ projects, eyebrow, title, intro }) {
  const count = projects.length;
  const [start, setStart] = useState(0);
  const paused = useRef(false);
  const move = (step) => setStart((s) => (s + step + count) % count);

  useEffect(() => {
    if (count <= SLOTS || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let timer;
    const begin = () => {
      timer = setInterval(() => {
        if (!paused.current && document.visibilityState === 'visible') setStart((s) => (s + 1) % count);
      }, ROTATE_MS);
    };
    // after the page has loaded, so the rotation never competes with it
    const wait = setTimeout(begin, 2500);
    return () => {
      clearTimeout(wait);
      clearInterval(timer);
    };
  }, [count]);

  const tile = (slot, className) => {
    const project = projects[(start + slot) % count];
    return (
      <div className={`hh-tile ${className}`} key={slot}>
        <Image
          key={project.path}
          className="hh-photo"
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes={slot === 1 ? '(min-width: 901px) 62vw, 100vw' : '(min-width: 901px) 40vw, 50vw'}
          preload={slot === 0 && start === 0}
          fetchPriority={slot === 0 && start === 0 ? 'high' : undefined}
          loading={slot === 0 && start === 0 ? undefined : 'eager'}
        />
        <Link className="hh-link" href={project.path} prefetch={false}>
          <small>{project.label}</small>
          <span>View this project</span>
        </Link>
      </div>
    );
  };

  return (
    <>
      <section className="home-hero" aria-label="QRS Southern California roofing" onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}>
        {tile(0, 'hh-a')}
        {tile(1, 'hh-b')}
        {tile(2, 'hh-c')}
        <div className="hh-shade" aria-hidden="true" />
        <button className="hh-arrow hh-prev" type="button" aria-label="Previous projects" onClick={() => move(-1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <button className="hh-arrow hh-next" type="button" aria-label="Next projects" onClick={() => move(1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
        </button>
        <div className="hh-panel">
          <h1 className="eyebrow">{eyebrow}</h1>
          <p className="hh-title">{title}</p>
          <p className="hh-intro">{intro}</p>
          <div className="hh-actions">
            <SiteLink className="btn btn-gold" href="#roof-check">
              Get Pro Advice <span className="arrow">→</span>
            </SiteLink>
            <SiteLink className="btn btn-line" href={TEL}>Call {PHONE}</SiteLink>
            <QuoteTrigger />
          </div>
        </div>
      </section>
    </>
  );
}
