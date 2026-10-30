import Image from 'next/image';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import { HeadlineText } from '@/components/sections/Hero';
import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight, PhoneIcon } from '@/components/ui/icons';
import HeroVideo from '@/components/widgets/HeroVideo';
import { heroUnderline } from '@/data/heroOutcomes';
import { cityPath } from '@/data/locations';
import { BUSINESS, COMPANY, OFFICES, PHONE, TEL } from '@/data/site';
import { NUMBERS } from './AboutSections';
import './aboutRemote.css';

// The About page after the owner's reference remote.com/about (October 29 2026), in QRS colors: an inset hero card with a three-stop vertical
// gradient (the reference's violet → lilac → aqua, here soft plum → warm cream → sky) holding the H1 and intro at the left and the drone video in a
// frame at the right; "who we are" beside a collage of job photos on a grid; the numbers; the story; the values as an accordion whose open item
// shows its own photo; how every job runs; the team as cards; the offices and the careers/partner cards in the reference's "open positions" grid.
// Every fact comes from data/pages/about.js and data/site.js. Styles: aboutRemote.css (scoped main.abr).

const VIDEO = [
  { src: '/videos/home-hero-drone.webm', type: 'video/webm' },
  { src: '/videos/home-hero-drone-h264.mp4', type: 'video/mp4' },
];

// The hero card. `media`: { video: true } for the drone film (the About page), else { image, alt, position } for a photo. `actions`: buttons as
// [{ label, href, style }] (style "dark" by default, "line" white, "gold"); by default "Book a free roof evaluation" and the phone.
const DEFAULT_ACTIONS = [
  { label: 'Book a free roof evaluation', href: '#roof-check', style: 'dark' },
  { label: PHONE, href: TEL, style: 'line' },
];

export function AbrHero({ crumbs, path, title, outcome, intro, media = { video: true }, actions = DEFAULT_ACTIONS, tag }) {
  return (
    <section className="abr-hero-wrap" aria-label={typeof title === 'string' ? title : 'Quality Roofing Specialists'}>
      <div className="abr-hero">
        <div className="abr-hero-copy">
          <Breadcrumbs items={crumbs} />
          <h1>
            <HeadlineText title={title} phrase={heroUnderline(path)} />
          </h1>
          {outcome && <p className="abr-outcome">{outcome.replace(/__/g, '')}</p>}
          {intro && (
            <p className="abr-intro">
              <Rich text={intro} />
            </p>
          )}
          {actions.length > 0 && (
            <div className="abr-actions">
              {actions.map((a) => {
                const tel = a.href.startsWith('tel:');
                const cls = `btn btn-${a.style === 'line' ? 'line' : a.style === 'gold' ? 'gold' : 'dark'}`;
                return tel || a.href.startsWith('mailto:') ? (
                  <a className={cls} href={a.href} key={a.href}>
                    {tel && <PhoneIcon />} {a.label}
                  </a>
                ) : (
                  <SiteLink className={cls} href={a.href} key={a.href}>
                    {a.label} <span className="arrow">→</span>
                  </SiteLink>
                );
              })}
            </div>
          )}
        </div>
        <div className="abr-film">
          {media.video ? (
            <>
              <Image src="/images/home-hero-drone-poster.webp" alt="Drone footage of a QRS roofing job from above" fill sizes="(min-width: 901px) 44vw, 100vw" priority quality={70} />
              <HeroVideo sources={VIDEO} className="abr-film-video" />
            </>
          ) : (
            <Image src={media.image} alt={media.alt || ''} fill sizes="(min-width: 901px) 44vw, 100vw" priority quality={70} style={media.position ? { objectPosition: media.position } : undefined} />
          )}
          {(tag || media.video) && <span className="abr-film-tag">{tag || 'QRS on the job'}</span>}
        </div>
      </div>
    </section>
  );
}

// Who we are, beside a collage of job photos on a grid with gold and plum shapes
export function AbrWho({ intro }) {
  const licensed = new Date(BUSINESS.licenseSince).getUTCFullYear();
  return (
    <section className="abr-section" aria-labelledby="abr-who">
      <div className="abr-wrap abr-split">
        <div className="abr-collage" aria-hidden="true">
          <span className="abr-shape abr-shape-a" />
          <span className="abr-shape abr-shape-b" />
          <span className="abr-pic abr-pic-1"><Image src="/images/how-we-work-roofer-tablet-report.webp" alt="" fill sizes="240px" quality={60} loading="lazy" /></span>
          <span className="abr-pic abr-pic-2"><Image src="/images/how-we-work-plain-english-homeowners.webp" alt="" fill sizes="300px" quality={60} loading="lazy" /></span>
          <span className="abr-pic abr-pic-3"><Image src="/images/how-we-work-clean-site-tile-roof.webp" alt="" fill sizes="220px" quality={60} loading="lazy" /></span>
          <span className="abr-chip">Licensed since {licensed} · CSLB #{BUSINESS.license}</span>
        </div>
        <div>
          <p className="abr-kicker">Who we are</p>
          <h2 id="abr-who">{intro.heading}</h2>
          <p className="abr-lead">{COMPANY.belief}</p>
          {intro.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>
              <Rich text={p} />
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AbrNumbers() {
  return (
    <section className="abr-section abr-numbers" aria-labelledby="abr-numbers">
      <div className="abr-wrap">
        <h2 id="abr-numbers" className="abr-center">A few numbers about us</h2>
        <dl className="abr-num-grid">
          {NUMBERS.map((n) => (
            <div key={n.label}>
              <dt>
                {n.value}
                {n.unit && <small>{n.unit}</small>}
              </dt>
              <dd>{n.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function AbrStory({ story }) {
  return (
    <section className="abr-section" aria-labelledby="abr-story">
      <div className="abr-wrap abr-split abr-split-rev">
        <div>
          <p className="abr-kicker">{story.eyebrow}</p>
          <h2 id="abr-story">{story.heading}</h2>
          {story.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>
              <Rich text={p} />
            </p>
          ))}
        </div>
        <div className="abr-photo">
          <Image src="/images/home-hero-shingle-neighborhood-drone-view.webp" alt="Aerial view of shingle roofs on homes in a Southern California neighborhood" fill sizes="(min-width: 901px) 44vw, 100vw" quality={65} loading="lazy" />
        </div>
      </div>
    </section>
  );
}

// The values as an accordion: one open at a time (native <details name>), the open one showing its photo at the right from 901px
const VALUE_PHOTOS = [
  ['/images/how-we-work-roofer-tablet-report.webp', 'A roofer reviewing a roof report on a tablet'],
  ['/images/how-we-work-plain-english-homeowners.webp', 'A roofer talking through a roof with homeowners'],
  ['/images/how-we-work-clean-site-tile-roof.webp', 'A clean job site on a tile roof'],
  ['/images/roofscan-360-roofer-chimney-flashing.webp', 'A roofer pointing out chimney flashing during an inspection'],
  ['/images/how-we-work-local-crews-commercial-roof.webp', 'A crew on a commercial roof'],
  ['/images/careers-process-roofer-crew.webp', 'A roofing crew working together'],
  ['/images/how-we-work-clean-site-multi-family-shingle.webp', 'A finished shingle reroof on a row of townhomes'],
];

export function AbrValues({ mission }) {
  return (
    <section className="abr-section abr-values-sec" aria-labelledby="abr-values">
      <div className="abr-wrap">
        <div className="abr-head">
          <p className="abr-kicker">{mission.eyebrow}</p>
          <h2 id="abr-values">Our values guide our work</h2>
          <p>{COMPANY.mission}</p>
          <p className="abr-muted">{COMPANY.vision}</p>
        </div>
        <div className="abr-values">
          {COMPANY.values.map((v, i) => {
            const [src, alt] = VALUE_PHOTOS[i % VALUE_PHOTOS.length];
            return (
              <details key={v.title} name="abr-values" open={i === 0}>
                <summary>
                  <span className="abr-vnum">{String(i + 1).padStart(2, '0')}</span>
                  {v.title}
                </summary>
                <p>{v.text}</p>
                <span className="abr-vphoto">
                  <Image src={src} alt={alt} fill sizes="(min-width: 901px) 44vw, 100vw" quality={60} loading="lazy" />
                </span>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function AbrProcess({ process }) {
  return (
    <section className="abr-section abr-process" aria-labelledby="abr-process">
      <div className="abr-wrap">
        <div className="abr-head abr-center">
          <p className="abr-kicker">{process.label}</p>
          <h2 id="abr-process">{process.heading}</h2>
        </div>
        <ol className="abr-steps">
          {process.items.map((s, i) => (
            <li key={s.title}>
              <span className="abr-step-n">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// The team as cards: initials for the co-founders, a roof mark for the roles (no team photos yet)
const initials = (name) => (/^[A-Z][a-z]+ [A-Z][a-z]+$/.test(name) ? name.split(' ').map((w) => w[0]).join('') : null);

export function AbrTeam({ team }) {
  return (
    <section className="abr-section" id="team" aria-labelledby="abr-team">
      <div className="abr-wrap">
        <div className="abr-head abr-center">
          <h2 id="abr-team">Meet our team</h2>
          <p>Real people behind every roof, from the office to the ridge line.</p>
        </div>
        <ul className="abr-team">
          {team.items.map((m) => {
            const ini = initials(m.title);
            return (
              <li key={m.title}>
                <span className={'abr-avatar' + (ini ? '' : ' role')} aria-hidden="true">
                  {ini || (
                    <svg viewBox="0 0 24 24">
                      <path d="M2.5 13 12 5l9.5 8" />
                      <path d="M5 11v8.5h14V11" />
                    </svg>
                  )}
                </span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

// The offices and the two ways to work with us, as the reference's "open positions" grid
export function AbrOffices() {
  const names = OFFICES.map((o) => (o.citySlug === 'woodland-hills' ? 'Woodland Hills' : o.name.replace(/ Office$/, '')));
  return (
    <section className="abr-section abr-grid-sec" aria-labelledby="abr-offices">
      <div className="abr-wrap">
        <div className="abr-head abr-center">
          <h2 id="abr-offices">Three offices across Los Angeles</h2>
          <p>
            Our crews work across Los Angeles County, Orange County and the Inland Empire from {names.slice(0, -1).join(', ')} and {names.at(-1)}. Each office has its own
            number, or call our main line, <a href={TEL}>{PHONE}</a>.
          </p>
        </div>
        <ul className="abr-tiles">
          {OFFICES.map((o) => (
            <li key={o.name}>
              <h3>{o.name}</h3>
              <address>
                {o.address.street}
                <br />
                {o.address.city}, {o.address.region} {o.address.postalCode}
              </address>
              <a href={o.tel || TEL}>{o.phone || PHONE}</a>
              <SiteLink className="abr-tile-link" href={cityPath(o.citySlug)}>
                Roofing near this office <ArrowRight />
              </SiteLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AbrGiving({ text }) {
  return (
    <section className="abr-section" aria-labelledby="abr-giving">
      <div className="abr-wrap">
        <div className="abr-band">
          <p className="abr-kicker">Giving back</p>
          <h2 id="abr-giving">Rooted in the neighborhoods we roof</h2>
          <p>{text}</p>
        </div>
      </div>
    </section>
  );
}

export function AbrJoin({ careers, partners }) {
  const cards = [careers, partners];
  return (
    <section className="abr-section abr-grid-sec" aria-labelledby="abr-join">
      <div className="abr-wrap">
        <div className="abr-head abr-center">
          <h2 id="abr-join">Work with us. Which one is for you?</h2>
        </div>
        <ul className="abr-tiles abr-tiles-2">
          {cards.map((c) => (
            <li key={c.heading}>
              <p className="abr-kicker">{c.eyebrow}</p>
              <h3>{c.heading}</h3>
              <p>{c.paragraphs[0]}</p>
              <SiteLink className="abr-tile-link" href={c.cta.href}>
                {c.cta.label} <ArrowRight />
              </SiteLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
