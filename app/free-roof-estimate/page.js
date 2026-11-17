import Link from 'next/link';
import InstantQuote from '@/components/widgets/InstantQuote';
import Faq from '@/components/sections/Faq';
import JsonLd from '@/components/ui/JsonLd';
import Mark from '@/components/ui/Mark';
import Rich from '@/components/ui/Rich';
import { ArrowRight, PhoneIcon } from '@/components/ui/icons';
import { HOME } from '@/data/catalog';
import { PHONE, TEL } from '@/data/site';
import { QUOTE_PAGE as P } from '@/data/pages/freeRoofEstimate';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';
import './estimate.css';

// /free-roof-estimate/: the Instant Quote as a page of its own (owner, November 17 2026). The estimator is the hero (InstantQuote `inline`),
// the copy around it explains how it works for the "free online roof estimate" / "online roofing estimator" searches. A focus page like /start/
// (lib/landing.js): limited header and footer, no side tab, no pop-up, no phone bar. Copy in data/pages/freeRoofEstimate.js.
export const metadata = pageMetadata({ title: P.metaTitle, description: P.metaDescription, path: P.path });

const CRUMBS = [HOME, { label: P.label, href: P.path }];

export default function FreeRoofEstimatePage() {
  return (
    <main id="top" className="fre">
      <JsonLd data={pageJsonLd({ path: P.path, title: P.metaTitle, description: P.metaDescription, crumbs: CRUMBS, faqs: P.faqs })} />

      <section className="fre-hero" aria-labelledby="fre-title">
        <div className="container fre-hero-grid">
          <div className="fre-copy fre-head">
            <nav className="fre-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link> <span aria-hidden="true">/</span> <span aria-current="page">{P.label}</span>
            </nav>
            <p className="fre-eyebrow">{P.eyebrow}</p>
            <h1 id="fre-title"><Mark text={P.heading} animate /></h1>
            <p className="fre-outcome">{P.outcome}</p>
          </div>
          {/* On phones the estimator comes right after the headline (CSS order); the intro and points follow it */}
          <div className="fre-copy fre-more">
            <p className="fre-intro">{P.intro}</p>
            <ul className="fre-points">
              {P.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
            <p className="fre-call">
              Rather talk to a roofer? <a href={TEL}><PhoneIcon /> {PHONE}</a>
            </p>
          </div>
          <div className="fre-tool">
            <InstantQuote inline title={P.toolTitle} kicker={P.toolKicker} />
          </div>
        </div>
      </section>

      <section className="section fre-steps" aria-labelledby="fre-steps-title">
        <div className="container">
          <h2 id="fre-steps-title">{P.steps.heading}</h2>
          <p className="fre-lead">{P.steps.lead}</p>
          <ol className="fre-step-list">
            {P.steps.items.map((s, i) => (
              <li key={s.title}>
                <span className="fre-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="fre-again">
            <a className="btn btn-gold" href="#rm" data-rm-open="">Start my free estimate <ArrowRight className="arrow" /></a>
          </p>
        </div>
      </section>

      <section className="section fre-factors" aria-labelledby="fre-factors-title">
        <div className="container">
          <h2 id="fre-factors-title">{P.factors.heading}</h2>
          <p className="fre-lead">{P.factors.lead}</p>
          <div className="fre-cards">
            {P.factors.items.map((f) => (
              <div className="fre-card" key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section fre-written" aria-labelledby="fre-written-title">
        <div className="container fre-narrow">
          <h2 id="fre-written-title">{P.written.heading}</h2>
          {P.written.paragraphs.map((t) => <p key={t}><Rich text={t} /></p>)}
          <p><Rich text={P.financing} /></p>
        </div>
      </section>

      <section className="section fre-materials" aria-labelledby="fre-mat-title">
        <div className="container">
          <h2 id="fre-mat-title">{P.materials.heading}</h2>
          <div className="fre-cards">
            {P.materials.items.map((m) => (
              <Link className="fre-card fre-link" href={m.href} key={m.href}>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
                <span className="fre-learn">Learn more <ArrowRight className="arrow" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Faq id="fre-faq" heading="Online roof estimate __questions__" sub="Straight answers about the free online roof estimate." faqs={P.faqs} cta={false} />

      <section className="section fre-close" aria-labelledby="fre-close-title">
        <div className="container fre-narrow">
          <h2 id="fre-close-title">Your free online roof estimate is one address away</h2>
          <p>Measure your roof now, or call and talk to a roofer.</p>
          <div className="fre-close-actions">
            <a className="btn btn-gold" href="#rm" data-rm-open="">Get my free estimate <ArrowRight className="arrow" /></a>
            <a className="btn btn-plum" href={TEL}><PhoneIcon /> Call {PHONE}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
