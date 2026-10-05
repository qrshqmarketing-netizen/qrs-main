import Link from 'next/link';
import { OFFERS } from '@/data/offers';
import { NEEDS, START_PATH, startHref } from '@/data/start';
import './RoofCheck.css';

// Offer card (data/offers.js) + a start card that opens the request steps at /start/ (components/sections/StartStepper.jsx). Every page
// has one. The start card asks the first question: each choice opens /start/ with that answer already given.
// tone="white" drops the pale blue background when the section above is also pale blue.
export default function RoofCheck({ tone, offer = 'home' }) {
  const o = OFFERS[offer];
  return (
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
          <h2>Tell us what you need.</h2>
          <p className="lead">A few quick steps. A clear next step. No pressure.</p>
          <p className="check-ask" id="check-ask">What do you need help with?</p>
          <div className="check-chips" role="group" aria-labelledby="check-ask">
            {NEEDS.map((need) => (
              <Link className="check-chip" href={startHref(need.id)} prefetch={false} key={need.id}>
                {need.label}
              </Link>
            ))}
          </div>
          <Link className="btn btn-gold" href={START_PATH}>
            Start My Free Roof Evaluation →
          </Link>
        </div>
      </div>
    </section>
  );
}
