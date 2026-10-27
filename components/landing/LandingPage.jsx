import Image from 'next/image';
import Faq from '@/components/sections/Faq';
import ReviewMarquee from '@/components/sections/ReviewMarquee';
import JsonLd from '@/components/ui/JsonLd';
import Rich from '@/components/ui/Rich';
import { PhoneIcon } from '@/components/ui/icons';
import PromoRain from '@/components/widgets/PromoRain';
import QuickLeadForm from '@/components/widgets/QuickLeadForm';
import { FAQS } from '@/data/faqs';
import { CREDENTIALS_PAGE, CREDENTIALS_PUBLIC } from '@/data/pages/credentials';
import { PROJECT_PAGES } from '@/data/pages/projects';
import { PHONE, TEL } from '@/data/site';
import { PAGE_INDEX } from '@/lib/pageIndex';
import { pageJsonLd } from '@/lib/structuredData';
import LandingMotion from './LandingMotion';
import LandingTracker from './LandingTracker';
import './Landing.css';

// The paid-ad landing page template (data/pages/landing.js; owner, October 19 2026). Built to convert:
//  1. Hero: the ad's message-matched headline (the H1), one line, four check points and the proof line at the left; the request form in a white
//     card at the right (id="estimate", so every "Get Pro Advice" button and the phone action bar scroll to it). Phones: headline, then the form.
//  2. Proof strip, the manufacturer badges, "What we do" (service cards without links; residential and commercial), 3. three steps, 4. Google reviews, 5. recent work (photos only, no links away), 6. FAQs (links removed), 7. a closing call
//     with a button back up to the form and the phone number.
// No menu, chat, quote tab or pop-up here (lib/landing.js). The page is noindex.
const plain = (text) => String(text).replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // FAQ answers without links, so nothing leads off the page

function faqsFor(spec) {
  if (spec.from === 'home') return spec.questions.map((q) => FAQS.find((f) => f.q.startsWith(q))).filter(Boolean).map((f) => ({ q: f.q, a: plain(f.a) }));
  const page = PAGE_INDEX.find((p) => p.path === spec.from);
  return (page?.faqs || []).slice(0, spec.count || 5).map((f) => ({ q: f.q, a: plain(f.a) }));
}

export default function LandingPage({ page, variant }) {
  const faqs = faqsFor(page.faqs);
  const badges = CREDENTIALS_PAGE.manufacturers.items.filter((m) => m.logo);
  // Commercial: real QRS job photos only (owner, October 19 2026)
  const work = page.name === 'commercial'
    ? [
        { src: '/images/cta-white-flat-roof-tile-coping-drone-view.webp', alt: 'Drone view of a finished white flat roof edged with clay tile on a multi-unit building', label: 'White flat roof with tile edge' },
        { src: '/images/commercial-retail-flat-roof-tear-off-drone-view.webp', alt: 'Drone view of a retail building’s flat roof during the tear-off', label: 'Retail flat roof tear-off' },
        { src: '/images/cta-flat-roof-install-drone-view.webp', alt: 'Drone view of a white flat roof being installed on a multi-unit building, with the crew at work', label: 'Multi-unit flat roof install' },
      ]
    : PROJECT_PAGES.slice(0, 3).map((p) => ({ src: p.image, alt: p.imageAlt, label: p.label }));

  return (
    <main id="top" className={`lp lp-${page.name}`}>
      <JsonLd data={pageJsonLd({ path: page.path, title: page.metaTitle, description: page.metaDescription })} />
      <LandingTracker page={page.name} variant={variant.tag} />
      <LandingMotion />

      <section className={'lp-hero' + (page.storm ? ' lp-storm' : '')} aria-labelledby="lp-title">
        <Image className="lp-hero-photo" src={page.image} alt="" fill sizes="100vw" preload fetchPriority="high" />
        {/* El Niño: the pop-up's rain over the storm photo (PromoRain: fetched after load, skipped for reduced motion, Data Saver and low-end devices) */}
        <span className="lp-grain" aria-hidden="true"></span>
        {page.storm && <PromoRain rich />}
        <div className="lp-hero-inner">
          <div className="lp-hero-copy">
            <p className="lp-eyebrow">{page.eyebrow}</p>
            <h1 id="lp-title">{variant.heading}</h1>
            <p className="lp-sub">{variant.sub}</p>
            <ul className="lp-points">
              {page.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className="lp-proof">
              {page.proof.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </p>
            <a className="lp-call" href={TEL}>
              <PhoneIcon /> Prefer to talk? Call {PHONE}
            </a>
          </div>
          <div className="lp-hero-form" id="estimate">
            <QuickLeadForm
              title={page.form.title}
              text={page.form.text}
              button={page.form.button}
              fine={page.form.fine}
              askCompany={page.form.askCompany}
              service={variant.service}
              note={`Ad landing page: ${page.name}${variant.tag !== 'default' ? ` (${variant.tag})` : ''}.`}
              page={page.path}
              leadSource={`lp_${page.name}`}
              source="landing-page"
            />
          </div>
        </div>
      </section>

      <section className="lp-strip" aria-label="Why choose QRS">
        <ul>
          {page.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      {/* The manufacturer certification badges from the Credentials page (data/pages/credentials.js), right under the proof strip */}
      {CREDENTIALS_PUBLIC && badges.length > 0 && (
        <section className="lp-badges" aria-label="Manufacturer certifications">
          <div className="lp-wrap">
            <ul>
              {badges.map((m) => (
                <li key={m.id}>
                  <Image src={m.logo} alt={`${m.name}${m.program ? ` ${m.program}` : ''} logo`} width={m.width || 400} height={m.height || 200} sizes="180px" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {page.services?.length > 0 && (
        <section className="lp-services" aria-labelledby="lp-services-title">
          <div className="lp-wrap">
            <h2 id="lp-services-title">What we do</h2>
            <ul>
              {page.services.map((s) => (
                <li key={s.title}>
                  <h3>
                    <Rich text={s.title} />
                  </h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ul>
            <a className="btn btn-gold lp-jump" href="#estimate">
              {page.form.button} <span className="arrow">→</span>
            </a>
          </div>
        </section>
      )}

      <section className="lp-steps" aria-labelledby="lp-steps-title">
        <div className="lp-wrap">
          <h2 id="lp-steps-title">How it works</h2>
          <ol data-lp-in="">
            {page.steps.map((s, i) => (
              <li key={s.title}>
                <span className="lp-step-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <a className="btn btn-gold lp-jump" href="#estimate">
            {page.form.button} <span className="arrow">→</span>
          </a>
        </div>
      </section>

      <ReviewMarquee heading={page.reviewsHeading} text={`${page.proof[0]} from the people we roof for.`} />

      <section className="lp-work" aria-labelledby="lp-work-title">
        <div className="lp-wrap">
          <h2 id="lp-work-title">Recent work</h2>
          <ul>
            {work.map((w) => (
              <li key={w.src}>
                <div className="lp-work-photo">
                  <Image src={w.src} alt={w.alt || ''} fill sizes="(min-width: 901px) 33vw, 100vw" quality={60} />
                </div>
                <p>{w.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {faqs.length > 0 && <Faq id="lp-faq" heading="Questions, answered" sub="" faqs={faqs} cta={false} />}

      <section className="lp-final" aria-labelledby="lp-final-title">
        <div className="lp-wrap">
          <h2 id="lp-final-title">{page.closing.heading}</h2>
          <p>{page.closing.text}</p>
          <div className="lp-final-actions">
            <a className="btn btn-gold" href="#estimate">
              {page.form.button} <span className="arrow">→</span>
            </a>
            <a className="btn btn-line" href={TEL}>
              <PhoneIcon /> Call {PHONE}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
