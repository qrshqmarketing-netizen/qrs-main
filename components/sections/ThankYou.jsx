import Image from 'next/image';
import Mark from '@/components/ui/Mark';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight, PhoneIcon } from '@/components/ui/icons';
import { BUSINESS, PHONE, TEL } from '@/data/site';
import './ThankYou.css';

// The thank-you page (copy in data/pages/thankYou.js): a split hero (a check mark that draws itself, the heading and the buttons beside a photo of a roofer),
// the three next steps, a call box for a leak that can't wait, and three photo cards to keep reading while they wait.
export default function ThankYou({ page }) {
  const { hero, next, urgent, more } = page;
  return (
    <>
      <section className="ty-hero">
        <div className="container ty-hero-grid">
          <div className="ty-copy">
            <svg className="ty-check" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
              <circle className="ty-check-ring" cx="32" cy="32" r="29" pathLength="1" />
              <path className="ty-check-tick" d="M19 33.5 L28 42 L45.5 23.5" pathLength="1" />
            </svg>
            <p className="ty-label">{hero.eyebrow}</p>
            <h1><Mark text={hero.heading} animate /></h1>
            <p className="ty-intro">{hero.intro}</p>
            <div className="ty-actions">
              <a className="btn btn-gold" href={TEL}><PhoneIcon /> Call {PHONE}</a>
              <SiteLink className="btn btn-line" href="/">Back to the home page</SiteLink>
            </div>
          </div>
          <figure className="ty-photo">
            <Image src={hero.image} alt={hero.imageAlt} fill sizes="(min-width: 901px) 50vw, 100vw" quality={75} preload fetchPriority="high" />
            <figcaption>{BUSINESS.legalName} · CSLB Lic # {BUSINESS.license}</figcaption>
          </figure>
        </div>
      </section>

      <section className="ty-next">
        <div className="container">
          <h2><Mark text={next.heading} /></h2>
          <ol className="ty-steps">
            {next.steps.map((s, i) => (
              <li key={s.title}>
                <span className="ty-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <aside className="ty-urgent">
            <div>
              <p className="ty-urgent-title"><span className="ty-dot" aria-hidden="true" />{urgent.heading}</p>
              <p>{urgent.text}</p>
            </div>
            <div className="ty-urgent-actions">
              <a className="btn btn-plum" href={TEL}><PhoneIcon /> {PHONE}</a>
              <SiteLink className="ty-link" href={urgent.link.href}>{urgent.link.label} <ArrowRight /></SiteLink>
            </div>
          </aside>
        </div>
      </section>

      <section className="ty-more">
        <div className="container">
          <h2><Mark text={more.heading} /></h2>
          <div className="ty-cards">
            {more.cards.map((c) => (
              <SiteLink className="ty-card" href={c.href} key={c.href}>
                <span className="ty-card-img">
                  <Image src={c.image} alt="" fill sizes="(min-width: 901px) 33vw, 100vw" quality={60} loading="lazy" />
                </span>
                <span className="ty-card-body">
                  <b>{c.title}</b>
                  <span>{c.text}</span>
                  <i aria-hidden="true"><ArrowRight /></i>
                </span>
              </SiteLink>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
