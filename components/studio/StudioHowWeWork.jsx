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
// From 901px with motion the section is pinned while it scrolls: the four headings stay listed at the left, the current one bright with a
// gold bar filling under it, its paragraph below the list and the stage at the right, whose camera flies to the current principle's scene
// (transform and opacity only, no layout shift). Phones, reduced motion and no JavaScript show the four as a plain stacked list, each with its
// own small stage. Styles: "How we work" in Studio.css, the stage in HowStage.css.

const offices = OFFICES.length === 1 ? 'one office' : `${OFFICES.length} offices`;

export const PRINCIPLES = [
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

const LIVE = '(min-width: 901px) and (prefers-reduced-motion: no-preference)';

export default function StudioHowWeWork() {
  const root = useRef(null);
  const [live, setLive] = useState(false);
  const [active, setActive] = useState(0);

  // Pinned scrolling on wide screens with motion
  useEffect(() => {
    const media = window.matchMedia(LIVE);
    const sync = () => setLive(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  // While live: the scroll position through the tall track picks the principle, and fills its bar (--p, 0 to 1)
  useEffect(() => {
    if (!live) return undefined;
    const el = root.current;
    const bars = el.querySelectorAll('.st-how-bar i');
    let raf = 0, current = -1;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / (span || 1))) * PRINCIPLES.length;
      const i = Math.min(PRINCIPLES.length - 1, Math.floor(p));
      bars.forEach((bar, k) => bar.style.setProperty('--p', k < i ? 1 : k > i ? 0 : Math.min(1, p - i)));
      if (i !== current) setActive((current = i));
    };
    const onScroll = () => raf || (raf = requestAnimationFrame(update));
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [live]);

  return (
    <section className={'st-section st-how' + (live ? ' is-live' : '')} aria-labelledby="how-we-work" ref={root} data-no-reveal="">
      <div className="st-how-pin">
        <div className="container st-how-grid">
          <div className="st-how-copy">
            <h2 id="how-we-work" className="st-how-label">How we work</h2>
            <ol className="st-how-list">
              {PRINCIPLES.map((p, i) => (
                <li key={p.title} className={live && i === active ? 'on' : undefined}>
                  <span className="st-how-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{p.title}</h3>
                  <span className="st-how-bar" aria-hidden="true"><i /></span>
                  <div className="st-how-body">
                    <p>{p.text}</p>
                    {p.link && (
                      <SiteLink className="st-link" href={p.link.href}>
                        {p.link.label} <ArrowRight />
                      </SiteLink>
                    )}
                  </div>
                  <HowStage className="st-how-img" stations={[i]} active={i} />
                </li>
              ))}
            </ol>
            <div className="st-how-actions">
              <SiteLink className="btn btn-gold" href="#roof-check">
                Get Pro Advice <span className="arrow">→</span>
              </SiteLink>
              <a className="btn btn-dark" href={TEL}>
                Call {PHONE}
              </a>
            </div>
          </div>
          {/* Wide screens: one 3D stage for all four principles in its own column; its camera flies to the current one (decorative) */}
          {live && (
            <div className="st-how-media" aria-hidden="true">
              <HowStage stations={[0, 1, 2, 3]} active={active} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
