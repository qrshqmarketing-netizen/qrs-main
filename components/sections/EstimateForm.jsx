'use client';

import { useState } from 'react';
import { FOUND_US_OPTIONS, ROOF_TYPES, SERVICE_OPTIONS } from '@/data/estimateOptions';
import { PHONE, TEL } from '@/data/site';
import { rememberLead, trackLead } from '@/lib/tracking';

// Sends the request to app/api/lead/route.js, which emails it and adds it to the leads spreadsheet (lib/leads.js)
export default function EstimateForm() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));
    setStatus('sending');
    try {
      const res = await fetch('/api/lead/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, roofType: data.roof, source: 'estimate-form', page: window.location.pathname }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      form.reset();
      // Off to the thank-you page, which reports the conversion; if storage is blocked, report it here instead
      if (!rememberLead('estimate_form')) trackLead('estimate_form');
      window.location.assign('/thank-you/');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form id="estimateForm" onSubmit={onSubmit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" required autoComplete="name" placeholder="Your name" />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="(310) 555-0123" />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
        </div>
        <div className="field">
          <label htmlFor="zip">ZIP code</label>
          <input id="zip" name="zip" inputMode="numeric" autoComplete="postal-code" placeholder="90001" />
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
        <label htmlFor="foundUs">How did you find us?</label>
        <select id="foundUs" name="foundUs" defaultValue="">
          <option value="">Choose one (optional)</option>
          {FOUND_US_OPTIONS.map((option) => <option key={option}>{option}</option>)}
        </select>
      </div>

      <div className="field">
        <label htmlFor="message">What is going on?</label>
        <textarea id="message" name="message" placeholder="Leak, stain, storm damage, age of roof, buying/selling, or just checking..."></textarea>
      </div>

      {/* Spam trap: hidden from people, but bots fill it in (the server then quietly drops the request) */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button className="btn btn-gold" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Request Sent ✓' : 'Request My Estimate →'}
      </button>
      <p className="form-note">
        By submitting, you agree QRS may contact you by phone, text or email about your request, including with automated technology. Message and data rates may apply; consent isn't required to do business with us. See our <a href="/privacy-policy/">Privacy Policy</a> and <a href="/terms-and-conditions/">Terms &amp; Conditions</a>.
      </p>
      <div className={'success' + (status === 'sent' ? ' show' : '')} id="success" role="status">
        Thanks, your request is in. Quality Roofing Specialists will reach out to follow up.
      </div>
      <div className={'form-error' + (status === 'error' ? ' show' : '')} role="alert">
        Sorry, your request didn&rsquo;t go through. Please try again, or call us at <a href={TEL}>{PHONE}</a>.
      </div>
    </form>
  );
}
