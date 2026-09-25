import Image from 'next/image';
import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import { PhoneIcon, QrsMark } from '@/components/ui/icons';
import { PHONE, TEL } from '@/data/site';
import Breadcrumbs from './Breadcrumbs';
import './PageHero.css';

const DEFAULT_ACTIONS = [
  { label: 'Get Pro Advice', href: '#roof-check', style: 'gold' },
  { label: `Call ${PHONE}`, href: TEL, style: 'line' },
];

// Inner-page hero: title and intro on the left; a photo (or, until one is added, a branded card) on the right.
// actions: [{ label, href, style: 'gold' | 'red' | 'line' }]; an action with `drawer: true` opens the Instant Quote instead.
// Red phone buttons get a handset icon; other gold and red buttons get an arrow.
// card: { kicker, scene, highlights: ['...', '...', '...'], offer: 'home' | 'commercial' }
export default function PageHero({ crumbs, eyebrow, title, intro, image, imageAlt = '', imagePosition, card, actions = DEFAULT_ACTIONS }) {
  return (
    <section className="page-hero">
      <div className="container page-hero-grid">
        <div className="page-hero-copy">
          {crumbs && <Breadcrumbs items={crumbs} />}
          {eyebrow && <div className="eyebrow">{eyebrow}</div>}
          <h1>{title}</h1>
          {intro && (
            <p className="page-hero-intro">
              <Rich text={intro} />
            </p>
          )}
          {actions?.length > 0 && (
            <div className="page-hero-actions">
              {actions.map((a) =>
                a.drawer ? (
                  <button className={`btn btn-${a.style || 'gold'}`} type="button" data-rm-open="" key={a.label}>
                    {a.label}
                    {a.style !== 'line' && <span className="arrow">→</span>}
                  </button>
                ) : (
                  <SiteLink className={`btn btn-${a.style || 'gold'}`} href={a.href} key={a.href}>
                    {a.href.startsWith('tel:') && a.style === 'red' && <PhoneIcon />}
                    {a.label}
                    {a.style !== 'line' && !a.href.startsWith('tel:') && <span className="arrow">→</span>}
                  </SiteLink>
                )
              )}
            </div>
          )}
        </div>

        <div className="page-hero-visual">
          {image ? (
            <div className="page-hero-media">
              <Image src={image} alt={imageAlt} fill preload sizes="(min-width: 901px) 520px, 100vw" style={imagePosition ? { objectPosition: imagePosition } : undefined} />
            </div>
          ) : (
            <HeroCard {...card} />
          )}
        </div>
      </div>
    </section>
  );
}

const FOOTS = {
  home: { title: '$199 Roof Check', text: 'Roofer-led · Photo-documented · Pay after the visit' },
  commercial: { title: 'Roofer-led roof survey', text: 'Photo-documented · Written scope & price first' },
};

// Navy card with the page's highlights, shown when a page has no photo yet
function HeroCard({ kicker = 'What you can expect', scene = 'scene-shingle', highlights = [], offer = 'home' }) {
  const foot = FOOTS[offer];
  return (
    <div className="hero-card">
      <div className={`hero-card-art art ${scene}`} aria-hidden="true">
        <span className="hero-card-badge">
          <svg viewBox="0 0 64 64">
            <QrsMark />
          </svg>
        </span>
      </div>
      <div className="hero-card-body">
        <div className="hero-card-kicker">{kicker}</div>
        <ul className="hero-card-points">
          {highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <div className="hero-card-foot">
          <b>{foot.title}</b>
          <span>{foot.text}</span>
        </div>
      </div>
    </div>
  );
}
