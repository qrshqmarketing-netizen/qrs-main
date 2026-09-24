'use client';

import { useState } from 'react';

export default function RoofCheck() {
  const [sent, setSent] = useState(false);

  // Starter behavior: shows a confirmation only. Connect this to your CRM / email endpoint.
  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="section check" id="roof-check">
      <div className="container check-grid">
        <aside className="check-card">
          <div className="eyebrow">Roofer-led roof check</div>
          <div className="price">$199</div>
          <h2 style={{ fontSize: '2.35rem', marginTop: '12px' }}>Before you talk replacement.</h2>
          <p>Get a roofer to look at your roof before a salesperson tries to sell you one.</p>
          <div className="check-points">
            <div><b>✓</b><span><strong>Roofer first.</strong> Condition-focused visit — not a pitch.</span></div>
            <div><b>✓</b><span><strong>Photo documentation.</strong> See what we see, in plain English.</span></div>
            <div><b>✓</b><span><strong>Clear next step.</strong> Repair, monitor, maintain or replace.</span></div>
            <div><b>✓</b><span><strong>Pay after the visit.</strong> No deposit to start the inspection.</span></div>
          </div>
        </aside>

        <div className="form-card" id="estimate">
          <div className="eyebrow" style={{ color: '#c98500' }}>Start here</div>
          <h2 style={{ fontSize: '2.35rem' }}>Tell us what you need.</h2>
          <p className="lead" style={{ fontSize: '.95rem', marginBottom: '25px' }}>Two minutes. A clear next step. No pressure.</p>

          <form id="estimateForm" onSubmit={onSubmit}>
            <div className="form-row">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" required placeholder="Your name" />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" required placeholder="(310) 555-0123" />
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="you@example.com" />
              </div>
              <div className="field">
                <label htmlFor="zip">ZIP code</label>
                <input id="zip" name="zip" inputMode="numeric" placeholder="90001" />
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label htmlFor="service">What do you need?</label>
                <select id="service" name="service">
                  <option>Roof inspection / roof check</option>
                  <option>Roof repair</option>
                  <option>Roof replacement</option>
                  <option>Tile lift &amp; relay</option>
                  <option>Flat roofing</option>
                  <option>Shingle roofing</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="roof">Roof type</label>
                <select id="roof" name="roof">
                  <option>Not sure</option>
                  <option>Tile</option>
                  <option>Shingle</option>
                  <option>Flat</option>
                  <option>Metal</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="message">What is going on?</label>
              <textarea id="message" name="message" placeholder="Leak, stain, storm damage, age of roof, buying/selling, or just checking..."></textarea>
            </div>

            <button className="btn btn-gold" type="submit" style={{ width: '100%' }}>{sent ? 'Request Saved ✓' : 'Request My Estimate →'}</button>
            <div className="form-note">This starter version only shows a confirmation in the browser. Connect the form to your CRM/email endpoint when you're ready.</div>
            <div className={`success${sent ? ' show' : ''}`} id="success">Thanks — your request is ready for confirmation. This starter page did not send anything.</div>
          </form>
        </div>
      </div>
    </section>
  );
}
