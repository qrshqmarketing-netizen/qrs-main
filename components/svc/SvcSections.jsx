import Image from 'next/image';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import { DEFAULT_ACTIONS, HeadlineText } from '@/components/sections/Hero';
import Mark from '@/components/ui/Mark';
import Rich from '@/components/ui/Rich';
import QuoteTrigger from '@/components/ui/QuoteTrigger';
import SiteLink from '@/components/ui/SiteLink';
import { PhoneIcon } from '@/components/ui/icons';
import { heroUnderline } from '@/data/heroOutcomes';
import { INSTANT_QUOTE_ENABLED } from '@/data/instantQuote';
import { OFFERS } from '@/data/offers';
import { CREDENTIALS_PAGE, CREDENTIALS_PUBLIC } from '@/data/pages/credentials';
import { GOOGLE_REVIEWS as REVIEW_LIST } from '@/data/reviews';
import { BUSINESS, GOOGLE_REVIEWS, HERO_ANNOTATIONS } from '@/data/site';
import { sortReviewsFor } from '@/lib/reviewTopics';
import SvcRoofGL from './SvcRoofGL';
import './Svc.css';

// The service pages' sections (owner, October 29 2026; the section patterns, gradients and voice of the owner's reference
// remote.com/global-hr/global-payroll, in QRS's complementary colors: deep navy → brand blue → warm cream, the opposite of the home page's sky).
// Order on a page (ServicePage.jsx): hero with the WebGL roof frame and the manufacturer badges, the proof strip, the page's own story as
// feature cards, the roof diagram, local credibility with numbers, what every job includes, the written-price offer, projects, review cards,
// related services, articles, FAQ, the request form and the closing call to action. Every page keeps all of its own copy; the voice of the
// section headings follows the reference (short statements ending in a period). Only facts the site already states. Styles: Svc.css.

const isCommercialPath = (path) => /^\/(commercial-roofing|contractors)\//.test(path);
const anA = (w = '') => (/^[aeiou]/i.test(w) ? 'an' : 'a');

// ---------- Hero ----------
export function SvcHero({ crumbs, title, outcome, intro, actions: allActions = DEFAULT_ACTIONS, annotations }) {
  const path = crumbs.at(-1).href;
  const actions = INSTANT_QUOTE_ENABLED ? allActions : allActions.filter((a) => !a.drawer);
  const notes = annotations || HERO_ANNOTATIONS[isCommercialPath(path) ? 'commercial' : 'home'];
  const lead = notes.some((n) => /free roof evaluation/i.test(n)) ? intro?.replace(/\s*(Start with|Book) a free roof evaluation\.\s*$/, '') : intro;
  const badges = CREDENTIALS_PUBLIC ? CREDENTIALS_PAGE.manufacturers.items.filter((m) => m.logo) : [];
  return (
    <section className="sv-hero" aria-label={typeof title === 'string' ? title : 'Roofing service'}>
      <SvcRoofGL kind={path === '/roof-financing/' ? 'dollar' : isCommercialPath(path) ? 'commercial' : 'home'} />
      <div className="sv-wrap sv-hero-in">
        <Breadcrumbs items={crumbs} />
        <h1 className="sv-h1">
          <HeadlineText title={title} phrase={heroUnderline(path)} />
        </h1>
        {outcome && <p className="sv-outcome">{outcome.replace(/__/g, '')}</p>}
        {lead && (
          <p className="sv-lead">
            <Rich text={lead} />
          </p>
        )}
        <ul className="sv-ticks" aria-label="What you get">
          {notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
        <div className="sv-actions">
          {actions.map((a) =>
            a.drawer ? (
              <button className={`btn btn-${a.style || 'gold'}`} type="button" data-rm-open="" key={a.label}>
                {a.label}
              </button>
            ) : (
              <SiteLink className={`btn btn-${a.style || 'gold'}`} href={a.href} key={a.href}>
                {a.href.startsWith('tel:') && <PhoneIcon />}
                {a.label}
                {!a.href.startsWith('tel:') && a.style !== 'line' && <span className="arrow">→</span>}
              </SiteLink>
            )
          )}
          {!actions.some((a) => a.drawer) && <QuoteTrigger />}
        </div>
      </div>
      {badges.length > 0 && (
        <div className="sv-wrap sv-badges">
          <p>Certified with the manufacturers we install</p>
          <ul>
            {badges.map((m) => (
              <li key={m.id}>
                <Image src={m.logo} alt={m.name} width={m.width} height={m.height} sizes="140px" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

// ---------- The page's own story (or its steps) as feature cards ----------
export function SvcFeatures({ label, heading, text, subheading, cards, photos }) {
  return (
    <section className="sv-section sv-bg-cream-white" aria-label={label || 'How we work'}>
      <div className="sv-wrap">
        <div className="sv-head">
          {label && <p className="sv-eyebrow">{label}</p>}
          <h2>
            <Mark text={heading} />
          </h2>
          {text && (
            <p>
              <Rich text={text} />
            </p>
          )}
        </div>
        {subheading && <h3 className="sv-subhead">{subheading}</h3>}
        <div className="sv-cards">
          {cards.map((c, i) => (
            <article className="sv-card" key={c.title}>
              {photos[i % photos.length] && (
                <div className="sv-card-img">
                  <Image src={photos[i % photos.length][0]} alt={photos[i % photos.length][1]} fill sizes="(min-width: 1100px) 25vw, (min-width: 621px) 50vw, 100vw" quality={60} loading="lazy" />
                </div>
              )}
              <div className="sv-card-body">
                <span className="sv-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>
                  <Rich text={c.title} />
                </h3>
                <p>
                  <Rich text={c.text} />
                </p>
                {c.bullets?.length > 0 && (
                  <ul className="sv-mini">
                    {c.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Local credibility with numbers ----------
export function SvcTrust({ path }) {
  const commercial = isCommercialPath(path);
  const points = [
    `Licensed, bonded and insured California contractor, CSLB #${BUSINESS.license}`,
    'Certified with the manufacturers whose systems we install',
    'We pull the permits',
    'A written scope and price before any work',
    '10-year workmanship warranty on installs (call for details)',
  ];
  return (
    <section className="sv-section sv-bg-white" aria-labelledby="sv-trust">
      <div className="sv-wrap sv-trust">
        <div className="sv-trust-copy">
          <h2 id="sv-trust">Local roofers. Real accountability.</h2>
          <p>
            {commercial
              ? 'A roofer surveys your building first, and you get photos and a written scope and price before any work. One company answers for the roof, from the survey to the closeout photos for your files.'
              : 'A roofer looks at your roof first, and you get photos and a written price before anything starts. One family-owned company answers for the roof, from the first visit to the walk across the finished roof with you.'}
          </p>
          <ul className="sv-checks">
            {points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <SiteLink className="sv-arrow" href="/credentials/">
            See our credentials <span aria-hidden="true">→</span>
          </SiteLink>
        </div>
        <div className="sv-stats">
          <div className="sv-stat"><b>{GOOGLE_REVIEWS.count}</b><span>Google reviews from the people we roof for</span></div>
          <div className="sv-stat"><b>2020</b><span>Licensed California contractor since</span></div>
          <div className="sv-stat"><b>12</b><span>Crews across Southern California</span></div>
          <div className="sv-stat"><b>4</b><span>Counties: Los Angeles, Orange, Riverside and San Bernardino</span></div>
        </div>
      </div>
    </section>
  );
}

// ---------- What every job includes ----------
export function SvcIncludes({ keyword, heading, intro, points }) {
  if (!points?.length) return null;
  return (
    <section className="sv-section sv-bg-white" aria-labelledby="sv-includes">
      <div className="sv-wrap">
        <div className="sv-head">
          <h2 id="sv-includes">{heading || `What every ${keyword} job includes.`}</h2>
          {intro && (
            <p>
              <Rich text={intro} />
            </p>
          )}
        </div>
        <ul className="sv-includes">
          {points.map((p) => (
            <li key={p.title || p}>
              {p.title ? (
                <>
                  <b>
                    <Rich text={p.title} />
                  </b>
                  {p.text && (
                    <span>
                      <Rich text={p.text} />
                    </span>
                  )}
                </>
              ) : (
                <b>{p}</b>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ---------- The written-price offer (the reference's pricing section) ----------
export function SvcOffer({ offer = 'home' }) {
  const o = OFFERS[offer] || OFFERS.home;
  const home = offer !== 'commercial';
  return (
    <section className="sv-section sv-bg-white-cream" aria-labelledby="sv-offer">
      <div className="sv-wrap sv-offer">
        <div className="sv-offer-copy">
          <h2 id="sv-offer">{home ? 'A written price, before any work.' : 'A written scope, before any work.'}</h2>
          <p>{home ? 'Start with a free roof evaluation. A roofer tells you what’s worth fixing, and you decide what to hire us for.' : o.text}</p>
          <ul className="sv-checks">
            {o.points.map((p) => (
              <li key={p.title}>
                <b>{p.title}</b> {p.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="sv-price">
          <small>{o.eyebrow}</small>
          <h3>{home ? 'Roof evaluation' : 'Roof survey'}</h3>
          <p className="sv-price-big">{home ? <>Free<span>no obligation</span></> : <>Roofer-led<span>written scope and price</span></>}</p>
          <p>{home ? o.text : 'Photos you can share with owners and tenants, and a clear next step.'}</p>
          <SiteLink className="btn btn-gold" href="#roof-check">
            {home ? 'Book my free evaluation' : 'Request a roof survey'}
          </SiteLink>
        </div>
      </div>
    </section>
  );
}

// ---------- Review cards ----------
export function SvcReviews({ path, heading }) {
  const reviews = sortReviewsFor(REVIEW_LIST, path).slice(0, 4);
  return (
    <section className="sv-section sv-bg-cream-white" id="reviews" aria-labelledby="sv-reviews">
      <div className="sv-wrap">
        <div className="sv-row-head">
          <h2 id="sv-reviews">{heading || 'Homes across Los Angeles, roofed right.'}</h2>
          <SiteLink className="sv-arrow" href="/reviews/">
            Read more reviews <span aria-hidden="true">→</span>
          </SiteLink>
        </div>
        <div className="sv-reviews">
          {reviews.map((r) => (
            <figure className="sv-review" key={r.name}>
              <div className="sv-stars" aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote>“{r.text.replace(/\s*\n\s*/g, ' ')}”</blockquote>
              <figcaption>
                <b>{r.name}</b>
                <small>Google review</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Related services ----------
export function SvcRelated({ links, commercial }) {
  if (!links?.length) return null;
  return (
    <section className="sv-section sv-bg-white" aria-labelledby="sv-related">
      <div className="sv-wrap">
        <div className="sv-row-head">
          <h2 id="sv-related">{commercial ? 'More ways we look after your building.' : 'More ways we look after your roof.'}</h2>
        </div>
        <div className="sv-related">
          {links.slice(0, 4).map((l, i) => (
            <SiteLink className={'sv-rel' + (i === 0 ? ' sv-rel-feat' : '')} href={l.href} key={l.href}>
              <span className="sv-rel-ico" aria-hidden="true" />
              <b>{l.label}</b>
              <span className="sv-arrow">
                Learn more <span aria-hidden="true">→</span>
              </span>
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  );
}

export { anA };

// ---------- A page's overview: a centered heading and its paragraphs (hubs and pages without a story) ----------
export function SvcIntro({ heading, paragraphs = [], cta }) {
  if (!paragraphs.length) return null;
  return (
    <section className="sv-section sv-bg-cream-white" aria-label={heading ? undefined : 'Overview'}>
      <div className="sv-wrap">
        {heading && (
          <div className="sv-head">
            <h2>
              <Mark text={heading} />
            </h2>
          </div>
        )}
        <div className="sv-prose">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>
              <Rich text={p} />
            </p>
          ))}
          {cta && (
            <SiteLink className="sv-arrow" href={cta.href}>
              {cta.label} <span aria-hidden="true">→</span>
            </SiteLink>
          )}
        </div>
      </div>
    </section>
  );
}

// ---------- The services of a hub as photo cards (every card is a link to its page) ----------
export function SvcCardGrid({ id, heading, intro, cards = [], tone = 'white' }) {
  if (!cards.length) return null;
  return (
    <section className={`sv-section ${tone === 'cream' ? 'sv-bg-white-cream' : 'sv-bg-white'}`} id={id} aria-label={typeof heading === 'string' ? heading.replace(/__/g, '') : undefined}>
      <div className="sv-wrap">
        <div className="sv-head">
          <h2>
            <Mark text={heading} />
          </h2>
          {intro && (
            <p>
              <Rich text={intro} />
            </p>
          )}
        </div>
        <ul className="sv-grid">
          {cards.map((c) => (
            <li key={c.href}>
              <SiteLink className="sv-tile" href={c.href}>
                <span className={`sv-tile-img${c.image ? '' : ` art ${c.scene || 'scene-shingle'}`}`}>
                  {c.image && <Image src={c.image} alt="" fill sizes="(min-width: 1100px) 30vw, (min-width: 621px) 46vw, 100vw" quality={60} loading="lazy" />}
                </span>
                <span className="sv-tile-body">
                  <b>
                    <Rich text={c.title} />
                  </b>
                  {c.text && <span>{c.text}</span>}
                  <span className="sv-arrow">
                    Learn more <span aria-hidden="true">→</span>
                  </span>
                </span>
              </SiteLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
