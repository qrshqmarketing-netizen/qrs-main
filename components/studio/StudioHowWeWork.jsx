'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import { CREDENTIALS_PAGE } from '@/data/pages/credentials';
import { BUSINESS, OFFICES, PHONE, TEL } from '@/data/site';
import './Studio.css';

// "How we work" on the home page (owner, October 15 2026; the story approach of the owner's reference maben.com.au, adapted to QRS): four
// principles with short two-beat headings, each with one paragraph and a photo. It replaces the home page's "Why QRS", process steps and
// credentials strip, which said the same things three times. Every fact is one the site already states (data/site.js, the About page,
// the credentials page). Photos: the owner's own four, one per principle (October 16 2026), each with a focal point (`position`) for the portrait
// frame on desktop and the landscape one on phones.
// From 901px with motion the section is pinned while it scrolls: the four headings stay listed at the left, the current one bright with a
// gold bar filling under it, its paragraph below the list and its photo at the right, all changing as the page scrolls (transform and
// opacity only, no layout shift). Phones, reduced motion and no JavaScript show the four as a plain stacked list. Styles: "How we work"
// in Studio.css.

const offices = OFFICES.length === 1 ? 'one office' : `${OFFICES.length} offices`;

const PRINCIPLES = [
  {
    title: 'A roofer looks first. The price is in writing.',
    text: 'A trained in-house roofer inspects your roof, with drone footage of the areas of concern. Before any work starts, you get a written scope and price: no pressure and no mystery pricing.',
    image: '/images/how-we-work-roofer-tablet-report.webp',
    alt: 'Roofer holding a tablet with a roof inspection report and estimate in front of a home',
    position: 'center center',
  },
  {
    title: 'Clear answers. Plain English.',
    text: 'We photo-document what we find and explain it in plain English, then give you a clear next step: repair, monitor, maintain or replace. You decide with the facts in front of you.',
    image: '/images/how-we-work-plain-english-homeowners.webp',
    alt: 'Roofer going over a roofing plan with two homeowners at their backyard table',
    position: '38% center',
  },
  {
    title: 'Family-owned. Local crews.',
    text: `QRS is family-owned, woman-owned and locally owned, with ${offices} across Southern California and one phone number that reaches them all. Our 12 crews work on shingle, tile and flat roofs, and we speak English, Spanish and Tagalog.`,
    image: '/images/how-we-work-local-crews-commercial-roof.webp',
    alt: 'Crew installing a white membrane on a large commercial flat roof',
    position: 'center',
  },
  {
    title: 'Clean sites. Work that’s backed.',
    text: `We pull the permits, tarp the landscaping and sweep for nails every day. Installs are backed by a 10-year workmanship warranty (call for details), from a licensed, bonded and insured California contractor (CSLB #${BUSINESS.license}) certified with the manufacturers we install.`,
    image: '/images/how-we-work-clean-site-multi-family-shingle.webp',
    alt: 'Roofing crew in harnesses installing new shingles on a row of townhomes, with ladders, a lift and the work trucks parked behind cones',
    position: 'center center',
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
                  <div className="st-how-img">
                    <Image src={p.image} alt={p.alt} fill sizes="(min-width: 901px) 44vw, 100vw" quality={60} style={{ objectPosition: p.position }} />
                  </div>
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
          {/* Wide screens: the photos again in their own column, one at a time (decorative copies; the list items above carry the alt text) */}
          {live && (
            <div className="st-how-media" aria-hidden="true">
              {PRINCIPLES.map((p, i) => (
                <div key={p.image} className={'st-how-frame' + (i === active ? ' on' : '')}>
                  <Image src={p.image} alt="" fill sizes="44vw" quality={60} style={{ objectPosition: p.position }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
