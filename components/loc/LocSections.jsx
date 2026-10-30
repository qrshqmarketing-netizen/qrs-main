import Image from 'next/image';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import { HeadlineText } from '@/components/sections/Hero';
import Mark from '@/components/ui/Mark';
import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import { PhoneIcon } from '@/components/ui/icons';
import { RESIDENTIAL_TYPES, typeCard } from '@/data/catalog';
import { CREDENTIALS_PAGE, CREDENTIALS_PUBLIC } from '@/data/pages/credentials';
import { GOOGLE_REVIEWS as REVIEW_LIST } from '@/data/reviews';
import { heroUnderline } from '@/data/heroOutcomes';
import { PHONE, TEL } from '@/data/site';
import { sortReviewsFor } from '@/lib/reviewTopics';
import './Loc.css';

// The location pages' sections (owner, October 29 2026; the patterns, gradients and approach of the owner's reference
// remote.com/global-hr/small-business, in QRS colors and made our own). The reference's hero is an inset rounded card whose gradient runs light
// to saturated (aqua at the top, bright blue at the bottom), with the copy and a dark button at the left, award badges under it, and a
// perspective wireframe box holding app cards at the right; then a centered heading over three icon columns, copy beside an accordion whose
// open item is dark with a photo, icon feature columns, customer quote cards, a gradient call-to-action card and a two-column FAQ.
// Ours: pale sky → brand blue (the opposite direction of the service pages' navy → cream), a wireframe house that draws itself with three
// cards floating in it, and each city's own copy, conditions, neighborhoods, projects and reviews. Only facts the site already states.
// The header stays a solid sticky bar above the inset hero, as in the reference. Styles: Loc.css.

const Ico = ({ d }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
);
const ICONS = {
  repair: <Ico d={<><path d="M12 3.5s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" /><path d="m9.5 14 1.8 1.8L15 12" /></>} />,
  replace: <Ico d={<><path d="M2.5 13 12 5l9.5 8" /><path d="M5 11v8.5h14V11" /><path d="M2.5 13h19" /></>} />,
  inspect: <Ico d={<><circle cx="11" cy="11" r="6" /><path d="m20 20-4.5-4.5" /><path d="M8.5 11h5M11 8.5v5" /></>} />,
};

// ---------- Hero: an inset rounded card ----------
export function LocHero({ crumbs, path, title, outcome, sub, place, commercial }) {
  const badges = CREDENTIALS_PUBLIC ? CREDENTIALS_PAGE.manufacturers.items.filter((m) => m.logo) : [];
  return (
    <section className="lc-hero-wrap" aria-label={`QRS roofing in ${place}`}>
      <div className="lc-hero">
        <div className="lc-hero-copy">
          <Breadcrumbs items={crumbs} />
          <h1>
            <HeadlineText title={title} phrase={heroUnderline(path)} />
          </h1>
          {outcome && <p className="lc-outcome">{outcome.replace(/__/g, '')}</p>}
          {sub && (
            <p className="lc-sub">
              <Rich text={sub} />
            </p>
          )}
          <div className="lc-actions">
            <SiteLink className="btn btn-dark" href="#roof-check">
              {commercial ? 'Request a roof survey' : 'Book a free roof evaluation'} <span className="arrow">→</span>
            </SiteLink>
            <a className="btn btn-line" href={TEL}>
              <PhoneIcon /> {PHONE}
            </a>
          </div>
          {badges.length > 0 && (
            <ul className="lc-badges" aria-label="Certified with the manufacturers we install">
              {badges.map((m) => (
                <li key={m.id}>
                  <Image src={m.logo} alt={m.name} width={m.width} height={m.height} sizes="90px" />
                </li>
              ))}
            </ul>
          )}
        </div>
        <LocHouse place={place} commercial={commercial} />
      </div>
    </section>
  );
}

// The hero illustration: a wireframe house in perspective (white lines that draw themselves once), with three cards floating in it
function LocHouse({ place, commercial }) {
  const cards = [
    { k: 'a', t: commercial ? 'Roofer-led roof survey' : 'Free roof evaluation', s: 'Drone photos of your roof' },
    { k: 'b', t: 'Written price first', s: 'Before any work starts' },
    { k: 'c', t: `Roofers near ${place}`, s: 'Local, family-owned' },
  ];
  return (
    <div className="lc-house" aria-hidden="true">
      <svg viewBox="0 0 520 420" className="lc-wire">
        {/* the front gable, the depth lines and the back gable: a house box with a pitched roof, seen from the front left */}
        <path pathLength="1" d="M60 400 V220 L190 110 L320 220 V400 Z" />
        <path pathLength="1" d="M60 220 H320" />
        <path pathLength="1" d="M190 110 L330 40 L470 150 V330 L320 400" />
        <path pathLength="1" d="M320 220 L470 150" />
        <path pathLength="1" d="M60 400 L210 330 H470" />
        <path pathLength="1" d="M210 330 V150 L330 40" className="lc-wire-faint" />
        <path pathLength="1" d="M210 150 H470" className="lc-wire-faint" />
      </svg>
      <ul className="lc-cards">
        {cards.map((c) => (
          <li key={c.k} className={`lc-card lc-card-${c.k}`}>
            <span className="lc-dot" />
            <span>
              <b>{c.t}</b>
              <small>{c.s}</small>
            </span>
            <i>✓</i>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------- A centered heading over three icon columns, and two dark buttons ----------
export function LocColumns({ place }) {
  const cols = [
    { icon: 'repair', title: 'Roof repair', text: 'Leaks traced to the source and fixed, with photos of the problem and the fix.', href: '/roof-repair/' },
    { icon: 'replace', title: 'Roof replacement', text: 'A complete new roof from the deck up, with a written price before any work.', href: '/roof-replacement/' },
    { icon: 'inspect', title: 'Inspection & care', text: 'A free drone roof evaluation, then one clear next step: repair, monitor, maintain or replace.', href: '/roof-inspection/' },
  ];
  return (
    <section className="lc-section" aria-labelledby="lc-cols">
      <div className="lc-wrap">
        <h2 id="lc-cols" className="lc-center">Roofing in {place}, start to finish.</h2>
        <ul className="lc-cols">
          {cols.map((c) => (
            <li key={c.title}>
              <span className="lc-ico">{ICONS[c.icon]}</span>
              <SiteLink href={c.href}>
                <b>{c.title}</b>
              </SiteLink>
              <p>{c.text}</p>
            </li>
          ))}
        </ul>
        <div className="lc-btns">
          <SiteLink className="btn btn-dark" href="/residential-roofing/">
            Residential roofing <span className="arrow">→</span>
          </SiteLink>
          <SiteLink className="btn btn-dark" href="/commercial-roofing/">
            Commercial roofing <span className="arrow">→</span>
          </SiteLink>
        </div>
      </div>
    </section>
  );
}

// ---------- The place's own intro beside an accordion of local roof conditions, with the place's photo ----------
export function LocStory({ place, heading, paragraphs = [], considerations = [], neighborhoods = [], photo, photoAlt }) {
  return (
    <section className="lc-section lc-bg-wash" aria-labelledby="lc-story">
      <div className="lc-wrap lc-split">
        <div>
          <h2 id="lc-story">
            <Mark text={heading} />
          </h2>
          <div className="lc-prose">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>
                <Rich text={p} />
              </p>
            ))}
          </div>
          {considerations.length > 0 && (
            <>
              <h3 className="lc-acc-title">Roof conditions we plan for in {place}</h3>
              <div className="lc-acc">
                {considerations.map((c, i) => (
                  <details key={c.title} name="lc-conditions" open={i === 0}>
                    <summary>{c.title}</summary>
                    <p>
                      <Rich text={c.text} />
                    </p>
                  </details>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="lc-side">
          {photo && (
            <div className="lc-photo">
              <Image src={photo} alt={photoAlt || `A roof in ${place}`} fill sizes="(min-width: 901px) 45vw, 100vw" quality={65} loading="lazy" />
            </div>
          )}
          {neighborhoods.length > 0 && (
            <div className="lc-hoods">
              <h3>Neighborhoods we serve</h3>
              <ul>
                {neighborhoods.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ---------- Every roof type as icon feature columns ----------
export function LocRoofTypes({ place }) {
  const types = RESIDENTIAL_TYPES.map(typeCard);
  return (
    <section className="lc-section" aria-labelledby="lc-types">
      <div className="lc-wrap">
        <h2 id="lc-types" className="lc-center">Every kind of roof in {place}.</h2>
        <p className="lc-center lc-lead">Shingle, tile, flat and metal, each with the details that keep it dry.</p>
        <ul className="lc-features">
          {types.map((t) => (
            <li key={t.href}>
              <SiteLink href={t.href}>
                <span className={`lc-feat-img${t.image ? '' : ` art ${t.scene}`}`}>
                  {t.image && <Image src={t.image} alt="" fill sizes="(min-width: 1100px) 22vw, 50vw" quality={60} loading="lazy" />}
                </span>
                <b>
                  <Rich text={t.title} />
                </b>
                <span>{t.text}</span>
              </SiteLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ---------- Customer quote cards ----------
export function LocReviews({ path, place, places = [] }) {
  const reviews = sortReviewsFor(REVIEW_LIST, path, places).slice(0, 4);
  return (
    <section className="lc-section" id="reviews" aria-labelledby="lc-reviews">
      <div className="lc-wrap">
        <h2 id="lc-reviews" className="lc-center">A word from the people we roof for.</h2>
        <p className="lc-center lc-lead">Google reviews from homeowners and clients across Los Angeles and Orange County, the ones closest to {place} first.</p>
        <div className="lc-quotes">
          {reviews.map((r) => (
            <figure className="lc-quote" key={r.name}>
              <div className="lc-stars" aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote>“{r.text.replace(/\s*\n\s*/g, ' ')}”</blockquote>
              <figcaption>
                <span className="lc-avatar" aria-hidden="true">{r.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
                <span>
                  <b>{r.name}</b>
                  <small>Google review</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="lc-center">
          <SiteLink className="lc-link" href="/reviews/">
            Read more reviews <span aria-hidden="true">→</span>
          </SiteLink>
        </p>
      </div>
    </section>
  );
}

// ---------- The gradient call-to-action card ----------
export function LocCta({ place, commercial }) {
  return (
    <section className="lc-section lc-cta-wrap" aria-labelledby="lc-cta">
      <div className="lc-wrap">
        <div className="lc-cta">
          <h2 id="lc-cta">Need a roofer in {place}?</h2>
          <p>
            {commercial
              ? 'Start with a roofer-led roof survey. You get photos and a written scope and price before any work.'
              : 'Start with a free roof evaluation. A roofer, not a salesperson, looks at your roof and gives you a written scope and price.'}
          </p>
          <div className="lc-actions lc-actions-center">
            <SiteLink className="btn btn-dark" href="#roof-check">
              {commercial ? 'Request a roof survey' : 'Book a free roof evaluation'} <span className="arrow">→</span>
            </SiteLink>
            <a className="btn btn-line" href={TEL}>
              <PhoneIcon /> {PHONE}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- A two-column FAQ: the heading at the left, the questions at the right (the open one dark) ----------
export function LocFaq({ heading, sub, faqs = [] }) {
  if (!faqs.length) return null;
  return (
    <section className="lc-section lc-bg-wash" id="faq" aria-labelledby="lc-faq">
      <div className="lc-wrap lc-faq">
        <div>
          <h2 id="lc-faq">{heading}</h2>
          {sub && <p className="lc-lead">{sub}</p>}
          <p className="lc-lead">
            Still have a question? Call <a href={TEL}>{PHONE}</a>.
          </p>
        </div>
        <div className="lc-acc lc-acc-faq">
          {faqs.map((f, i) => (
            <details key={f.q} name="lc-faq" open={i === 0}>
              <summary>
                <Rich text={f.q} />
              </summary>
              <div>
                <Rich text={f.a} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
