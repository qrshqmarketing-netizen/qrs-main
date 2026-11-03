import Link from 'next/link';
import { OFFERS } from '@/data/offers';
import { START_PATH } from '@/data/start';
import EstimateForm from './EstimateForm';
import './RoofCheck.css';
import Mark from '@/components/ui/Mark';
import { t } from '@/lib/lang';

// Offer card (data/offers.js) + the estimate form (EstimateForm.jsx). Every page has one, so "Get Pro Advice" always has a target on the page
// (SiteLink scrolls to #roof-check); a small link still opens the step-by-step form at /start/.
// tone="white" drops the pale blue background when the section above is also pale blue.
// `lang`: 'es' on the Spanish home page (the offer and form words from data/i18n/es.js; the step-by-step form link is left out there, it is English)
export default function RoofCheck({ tone, offer = 'home', lang = 'en' }) {
  const T = (x) => t(lang, x);
  const o = OFFERS[offer];
  return (
    <section className={'section check' + (tone === 'white' ? ' check-white' : '')} id="roof-check">
      <div className="container check-grid">
        <aside className="check-card">
          <div className="eyebrow">{T(o.eyebrow)}</div>
          {o.price && <div className="price">{T(o.price)}</div>}
          <h2>{T(o.heading)}</h2>
          <p>{T(o.text)}</p>
          <div className="check-points">
            {o.points.map((point) => (
              <div key={point.title}>
                <b>✓</b>
                <span>
                  <strong>{T(point.title)}</strong> {T(point.text)}
                </span>
              </div>
            ))}
          </div>
        </aside>

        <div className="form-card" id="estimate">
          <div className="eyebrow">{T('Start here')}</div>
          <h2>{lang === 'en' ? <>Tell us what you <Mark text="__need__" />.</> : <Mark text={T('Tell us what you __need__.')} />}</h2>
          <p className="lead">{T('Two minutes. A clear next step. No pressure.')}</p>
          <EstimateForm />
          {lang === 'en' && (
            <p className="check-steps">
              Prefer to answer a few questions instead? <Link href={START_PATH} prefetch={false}>Use the step-by-step form</Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
