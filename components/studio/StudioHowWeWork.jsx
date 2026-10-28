'use client';

import { useEffect, useRef, useState } from 'react';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import { CREDENTIALS_PAGE } from '@/data/pages/credentials';
import { BUSINESS, OFFICES, PHONE, TEL } from '@/data/site';
import HowStage from './HowStage';
import './Studio.css';

// "How we work" on the home page (owner, October 15 2026; the story approach of the owner's reference maben.com.au, adapted to QRS): four
// principles with short two-beat headings, each with one paragraph and a 3D scene. It replaces the home page's "Why QRS", process steps and
// credentials strip, which said the same things three times. Every fact is one the site already states (data/site.js, the About page,
// the credentials page). The scenes (owner, October 20 2026: they replace the four AI photos) are a WebGL stage with glass cards and labels
// (HowStage.jsx, howEngine.js): a home with a drone scanning the roof and a written-scope card; a roof close-up with marked problems, photo
// frames and the next-step choice; the service area as a 3D map with the three offices and twelve crews; a roof assembling layer by layer
// with the warranty shield. Decorative (the text below carries the content), fetched only when the section is near, still for reduced motion.
// Compact auto slider (owner, October 28 2026; it replaces the 400svh pinned scroll): the four headings are tabs, the current one bright
// with a gold bar that fills over AUTO_MS; when it is full the next principle comes in, and the stage's camera flies to its scene. Clicking a
// heading jumps there. It pauses while the pointer is over the section or a tab has keyboard focus, and while the section is off screen;
// with reduced motion it doesn't advance on its own. Every paragraph is in the HTML (the hidden ones stacked in the same cell, so the height
// never changes). Styles: "How we work" in Studio.css, the stage in HowStage.css.

const offices = OFFICES.length === 1 ? 'one office' : `${OFFICES.length} offices`;

const PRINCIPLES = [
  {
    title: 'A roofer looks first. The price is in writing.',
    text: 'A trained in-house roofer inspects your roof, with drone footage of the areas of concern. Before any work starts, you get a written scope and price: no pressure and no mystery pricing.',
  },
  {
    title: 'Clear answers. Plain English.',
    text: 'We photo-document what we find and explain it in plain English, then give you a clear next step: repair, monitor, maintain or replace. You decide with the facts in front of you.',
  },
  {
    title: 'Family-owned. Local crews.',
    text: `QRS is family-owned, woman-owned and locally owned, with ${offices} across Southern California and one phone number that reaches them all. Our 12 crews work on shingle, tile and flat roofs, and we speak English, Spanish and Tagalog.`,
  },
  {
    title: 'Clean sites. Work that’s backed.',
    text: `We pull the permits, tarp the landscaping and sweep for nails every day. Installs are backed by a 10-year workmanship warranty (call for details), from a licensed, bonded and insured California contractor (CSLB #${BUSINESS.license}) certified with the manufacturers we install.`,
    link: { label: 'See our credentials', href: CREDENTIALS_PAGE.path },
  },
];

const AUTO_MS = 7000;

export default function StudioHowWeWork() {
  const root = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(true); // starts paused until it is on screen
  const [hold, setHold] = useState(false); // pointer over the section or keyboard focus in it
  const [still, setStill] = useState(false); // reduced motion: no automatic change

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setStill(media.matches);
    sync();
    media.addEventListener('change', sync);
    const el = root.current;
    const seen = 'IntersectionObserver' in window ? new IntersectionObserver(([e]) => setPaused(!e.isIntersecting), { threshold: 0.35 }) : null;
    if (seen) seen.observe(el);
    else setPaused(false);
    return () => {
      media.removeEventListener('change', sync);
      if (seen) seen.disconnect();
    };
  }, []);

  const next = () => setActive((i) => (i + 1) % PRINCIPLES.length);
  const running = !still && !paused && !hold;

  return (
    <section
      className={'st-section st-how' + (running ? ' is-running' : '') + (still ? ' is-still' : '')}
      aria-labelledby="how-we-work"
      ref={root}
      data-no-reveal=""
      onPointerEnter={() => setHold(true)}
      onPointerLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHold(false)}
    >
      <div className="container st-how-grid">
        <div className="st-how-copy">
          <h2 id="how-we-work" className="st-how-label">How we work</h2>
          <ol className="st-how-list">
            {PRINCIPLES.map((p, i) => (
              <li key={p.title} className={i === active ? 'on' : undefined}>
                <h3>
                  <button type="button" className="st-how-tab" aria-expanded={i === active} aria-controls={`how-body-${i}`} onClick={() => setActive(i)}>
                    <span className="st-how-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <span className="st-how-t">{p.title}</span>
                  </button>
                </h3>
                <span className="st-how-bar" aria-hidden="true">
                  {/* the fill is a CSS animation; when it ends, the next principle comes in */}
                  <i key={i === active ? `on-${active}` : 'off'} onAnimationEnd={i === active ? next : undefined} />
                </span>
              </li>
            ))}
          </ol>
          <div className="st-how-panels">
            {PRINCIPLES.map((p, i) => (
              <div key={p.title} id={`how-body-${i}`} className={'st-how-body' + (i === active ? ' on' : '')} aria-hidden={i !== active}>
                <p>{p.text}</p>
                {p.link && (
                  <SiteLink className="st-link" href={p.link.href} tabIndex={i === active ? undefined : -1}>
                    {p.link.label} <ArrowRight />
                  </SiteLink>
                )}
              </div>
            ))}
          </div>
          <div className="st-how-actions">
            <SiteLink className="btn btn-gold" href="#roof-check">
              Get Pro Advice <span className="arrow">→</span>
            </SiteLink>
            <a className="btn btn-dark" href={TEL}>
              Call {PHONE}
            </a>
          </div>
        </div>
        {/* One 3D stage for all four principles; its camera flies to the current one (decorative) */}
        <div className="st-how-media" aria-hidden="true">
          <HowStage stations={[0, 1, 2, 3]} active={active} />
        </div>
      </div>
    </section>
  );
}
