'use client';

import { Fragment, useState } from 'react';
import { CARE_PLAN } from '@/data/pages/carePlan';
import { PHONE, TEL } from '@/data/site';
import './CarePlanPricing.css';

const { bands, plans, billingNote, disclaimer } = CARE_PLAN;

// Interactive plan pricing: pick a roof size band and the price for each of the three plans updates.
// Real pricing is banded (three fixed price points per plan), not continuous, so this is a single-select
// pill picker rather than a slider — it doesn't fake precision the underlying prices don't have.
export default function CarePlanPricing() {
  const [band, setBand] = useState(bands[0].key);

  return (
    <section className="section care-pricing">
      <div className="container">
        <div className="section-head center">
          <h2>The Plans</h2>
          <p>Pick your roof size to see the right price for each plan.</p>
        </div>

        <fieldset className="cp-bands">
          <legend>
            Your roof size <small>Pick the closest match</small>
          </legend>
          <div>
            {bands.map((b, i) => (
              <Fragment key={b.key}>
                <input type="radio" name="cpBand" id={`cpBand${i}`} value={b.key} checked={band === b.key} onChange={() => setBand(b.key)} />
                <label htmlFor={`cpBand${i}`}>{b.label}</label>
              </Fragment>
            ))}
          </div>
        </fieldset>

        <div className="cp-grid">
          {plans.map((plan) => (
            <div className={'cp-card' + (plan.popular ? ' cp-popular' : '')} key={plan.key}>
              {plan.popular && <span className="cp-badge">Most Popular</span>}
              <h3>{plan.name}</h3>
              <p className="cp-tagline">{plan.tagline}</p>
              <div className="cp-price">
                <b>${plan.prices[band].toLocaleString()}</b>
                <span>/year</span>
              </div>
              <p className="cp-visits">{plan.visits}</p>
              <a className={'btn ' + (plan.popular ? 'btn-gold' : 'btn-line')} href="#roof-check">
                Get Started
              </a>
            </div>
          ))}
        </div>

        <p className="cp-over">
          Homes over 5,000 sq ft? <a href={TEL}>Call {PHONE}</a> for a custom price.
        </p>
        <p className="form-note cp-fine">
          {billingNote} {disclaimer}
        </p>
      </div>
    </section>
  );
}
