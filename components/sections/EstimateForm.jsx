'use client';

import { useState } from 'react';

const SERVICE_OPTIONS = [
  'Roof inspection / roof check',
  'Roof maintenance plan',
  'Roof repair',
  'Roof replacement',
  'Tile lift & relay',
  'Flat roofing',
  'Shingle roofing',
  'Metal roofing or gutters',
  'Commercial or HOA roofing',
  'Not sure yet',
];
const ROOF_TYPES = ['Not sure', 'Tile', 'Shingle', 'Flat', 'Metal'];

export default function EstimateForm() {
  const [saved, setSaved] = useState(false);

  // Starter version: only shows a confirmation in the browser (see README.md "Not connected yet").
  // Send the form data to your CRM/email service here when you're ready.
  const onSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
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
            {SERVICE_OPTIONS.map((option) => <option key={option}>{option}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="roof">Roof type</label>
          <select id="roof" name="roof">
            {ROOF_TYPES.map((option) => <option key={option}>{option}</option>)}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">What is going on?</label>
        <textarea id="message" name="message" placeholder="Leak, stain, storm damage, age of roof, buying/selling, or just checking..."></textarea>
      </div>

      <button className="btn btn-gold" type="submit">{saved ? 'Request Saved ✓' : 'Request My Estimate →'}</button>
      <p className="form-note">
        By submitting, you agree QRS may contact you by phone, text or email about your request, including with automated technology. Message and data rates may apply; consent isn't required to do business with us. See our <a href="/privacy-policy/">Privacy Policy</a> and <a href="/terms-and-conditions/">Terms &amp; Conditions</a>.
      </p>
      <div className={'success' + (saved ? ' show' : '')} id="success">
        Thanks — your request is ready for confirmation. This starter page did not send anything.
      </div>
    </form>
  );
}
