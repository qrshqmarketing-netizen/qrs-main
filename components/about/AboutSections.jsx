import Image from 'next/image';
import ProjectCounter from '@/components/project/ProjectCounter';
import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import { BUSINESS, COMPANY, OFFICES, PHONE, TEL } from '@/data/site';
import { cityPath } from '@/data/locations';
import './about.css';
import Mark from '@/components/ui/Mark';

// The About page's sections in the studio style (layout adapted from the owner's reference digidop.com/about-us): a lead statement with the year we were
// licensed rolling up, a grid of numbers, the story beside a photo, the offices, the mission with the values as numbered rows, the team, recognition,
// and two closing cards (careers and partners). Every number and claim comes from data the owner already confirmed (data/site.js, data/pages/about.js).

const Label = ({ children }) => <p className="ab-label">{children}</p>;

export function AboutIntro({ page }) {
  const licensedYear = String(new Date(BUSINESS.licenseSince).getUTCFullYear());
  return (
    <section className="ab-section ab-intro">
      <div className="container ab-split">
        <Label>Who we are</Label>
        <div>
          <p className="ab-lead">{COMPANY.belief}</p>
          <div className="ab-since">
            <ProjectCounter value={licensedYear} label="Licensed California contractor since" />
          </div>
          <div className="ab-cols">
            {page.intro.paragraphs.map((p) => (
              <p key={p}>
                <Rich text={p} />
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const NUMBERS = [
  { value: '10', unit: 'year', label: 'Workmanship warranty on our installs' },
  { value: '12', unit: '', label: 'Crews for shingle, tile and flat roofs' },
  { value: String(OFFICES.length), unit: '', label: 'Offices across Los Angeles' },
  { value: '3', unit: '', label: 'Languages: English, Spanish and Tagalog' },
  { value: '2', unit: 'counties', label: 'Los Angeles and Orange County' },
  { value: '6,000', unit: '', label: 'Homes we aim to protect in the next 10 years' },
];

export function AboutNumbers() {
  return (
    <section className="ab-section ab-numbers tinted">
      <div className="container">
        <div className="ab-split ab-head">
          <Label>By the numbers</Label>
          <h2><Mark text="A few numbers about us" auto /></h2>
        </div>
        <dl className="ab-grid">
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

export function AboutStory({ story }) {
  return (
    <section className="ab-section ab-story">
      <div className="container ab-split">
        <Label>{story.eyebrow}</Label>
        <div className="ab-story-grid">
          <div>
            <h2><Mark text={story.heading} auto /></h2>
            {story.paragraphs.map((p) => (
              <p key={p}>
                <Rich text={p} />
              </p>
            ))}
          </div>
          <div className="ab-photo">
            <Image src="/images/home-hero-shingle-neighborhood-drone-view.webp" alt="Aerial view of shingle roofs on homes in a Southern California neighborhood" fill sizes="(min-width: 901px) 40vw, 100vw" quality={70} loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutOffices() {
  return (
    <section className="ab-section ab-offices tinted">
      <div className="container">
        <div className="ab-split ab-head">
          <Label>Where we are</Label>
          <div>
            <h2>Three offices. One number.</h2>
            <p className="ab-sub">
              Our crews work across Los Angeles and Orange County from the Fairfax area, Woodland Hills and Vernon. Call <a href={TEL}>{PHONE}</a> and it reaches all of them.
            </p>
          </div>
        </div>
        <ul className="ab-offices-list">
          {OFFICES.map((o) => (
            <li key={o.name}>
              {o.image && (
                <span className="ab-office-img">
                  <Image src={o.image} alt={o.imageAlt || ''} fill sizes="(min-width: 901px) 33vw, 100vw" quality={65} loading="lazy" />
                </span>
              )}
              <h3>{o.name}</h3>
              <address>
                {o.address.street}
                <br />
                {o.address.city}, {o.address.region} {o.address.postalCode}
              </address>
              <SiteLink href={cityPath(o.citySlug)}>
                Roofing in {o.address.city === 'Los Angeles' ? 'Los Angeles' : o.address.city} <ArrowRight />
              </SiteLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AboutMission({ mission }) {
  return (
    <section className="ab-section ab-mission">
      <div className="container">
        <div className="ab-split ab-head">
          <Label>{mission.eyebrow}</Label>
          <div>
            <p className="ab-lead">{COMPANY.mission}</p>
            <p className="ab-sub">{COMPANY.vision}</p>
          </div>
        </div>
        <div className="ab-split ab-values-wrap">
          <Label>Our values</Label>
          <ol className="ab-values">
            {COMPANY.values.map((v, i) => (
              <li key={v.title}>
                <span className="ab-num">{String(i + 1).padStart(2, '0')}</span>
                <b>{v.title}</b>
                <span>{v.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function AboutTeam({ team }) {
  return (
    <section className="ab-section ab-team tinted">
      <div className="container">
        <div className="ab-split ab-head">
          <Label>{team.heading}</Label>
          <h2>Real people behind every roof, from the office to the ridge line</h2>
        </div>
        <ul className="ab-team-list">
          {team.items.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AboutRecognition({ giving }) {
  return (
    <section className="ab-section ab-recognition">
      <div className="container ab-split">
        <Label>Recognition and giving back</Label>
        <div className="ab-rec-text">
          <h2>Recognized in the industry, rooted in the neighborhood</h2>
          <p>{giving}</p>
        </div>
      </div>
    </section>
  );
}

export function AboutCards({ careers, partners }) {
  const cards = [
    { ...careers, image: '/images/careers-hero-crew-shingle-roof.webp', alt: 'Roofers working on a shingle roof' },
    { ...partners, image: '/images/contractors-hero-roofer-tablet.webp', alt: 'Roofer documenting a roof inspection on a tablet' },
  ];
  return (
    <section className="ab-section ab-cards">
      <div className="container">
        <div className="ab-cards-grid">
          {cards.map((c) => (
            <SiteLink className="ab-card" href={c.cta.href} key={c.heading}>
              <Image src={c.image} alt={c.alt} fill sizes="(min-width: 901px) 50vw, 100vw" quality={65} loading="lazy" />
              <span className="ab-card-body">
                <small>{c.eyebrow}</small>
                <b>{c.heading}</b>
                <span>{c.paragraphs[0]}</span>
                <i>
                  {c.cta.label} <ArrowRight />
                </i>
              </span>
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutServices({ services }) {
  return (
    <section className="ab-section ab-services">
      <div className="container ab-split">
        <Label>What we do</Label>
        <div>
          <h2><Mark text={services.heading} auto /></h2>
          {services.paragraphs.map((p) => (
            <p key={p}>
              <Rich text={p} />
            </p>
          ))}
          <SiteLink className="ab-link" href={services.cta.href}>
            {services.cta.label} <ArrowRight />
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
