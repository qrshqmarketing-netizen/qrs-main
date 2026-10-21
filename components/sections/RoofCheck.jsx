import Link from 'next/link';
import { OFFERS } from '@/data/offers';
import { START_PATH } from '@/data/start';
import EstimateForm from './EstimateForm';
import WordBand from '@/components/home/WordBand';
import { BAND_WORDS } from '@/data/homeServices';
import './RoofCheck.css';
import Mark from '@/components/ui/Mark';

// Offer card (data/offers.js) + the estimate form (EstimateForm.jsx). Every page has one, so "Get Pro Advice" always has a target on the page
// (SiteLink scrolls to #roof-check); a small link still opens the step-by-step form at /start/.
// tone="white" drops the pale blue background when the section above is also pale blue. band={false} leaves out the "+" band with the
// service words above it (decorations after getaethr.ai, October 21 2026; the home page has its own bands).
export default function RoofCheck({ tone, offer = 'home', band = true }) {
  const o = OFFERS[offer];
  return (
    <>
    {band && <WordBand words={BAND_WORDS} seed={5} className="hd-band-form" />}
    <section className={'section check' + (tone === 'white' ? ' check-white' : '')} id="roof-check">
      <div className="container check-grid">
        <aside className="check-card">
          <div className="eyebrow">{o.eyebrow}</div>
          {o.price && <div className="price">{o.price}</div>}
          <h2>{o.heading}</h2>
          <p>{o.text}</p>
          <div className="check-points">
            {o.points.map((point) => (
              <div key={point.title}>
                <b>✓</b>
                <span>
                  <strong>{point.title}</strong> {point.text}
                </span>
              </div>
            ))}
          </div>
        </aside>

        <div className="form-card" id="estimate">
          <div className="eyebrow">Start here</div>
          <h2>Tell us what you <Mark text="__need__" />.</h2>
          <p className="lead">Two minutes. A clear next step. No pressure.</p>
          <EstimateForm />
          <p className="check-steps">
            Prefer to answer a few questions instead? <Link href={START_PATH} prefetch={false}>Use the step-by-step form</Link>
          </p>
        </div>
      </div>
    </section>
    </>
  );
}
