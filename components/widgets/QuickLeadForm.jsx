'use client';

import { useState } from 'react';
import { ArrowRight } from '@/components/ui/icons';
import { currentAttribution } from '@/lib/attribution';
import { postLead } from '@/lib/endpoints';
import { rememberLead, trackLead } from '@/lib/tracking';
import './QuickLeadForm.css';

// A short request form (name, phone, email, ZIP) for a landing page hero. It sends the same fields as the request steps (/start/) to the lead endpoint
// (lib/endpoints.js: /api/lead/ or the Supabase function), so the lead goes to the team's email, the Google Sheet and Supabase, with the page's utm tags;
// then the thank-you page opens (it reports the conversion). service: one of SERVICE_OPTIONS (data/estimateOptions.js); note: what the email's message says.
export default function QuickLeadForm({ title = 'Book your free roof evaluation', text, service = 'Roof inspection / roof check', note, page, leadSource = 'quick_form', button = 'Book My Free Evaluation' }) {
  const [f, setF] = useState({ name: '', phone: '', email: '', zip: '', website: '' });
  const [state, setState] = useState({ status: 'idle', error: '' });
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    if (state.status === 'sending') return;
    const digits = f.phone.replace(/\D/g, '').length;
    if (f.name.trim().length < 2) return setState({ status: 'idle', error: 'Please enter your name.' });
    if (digits < 10 || digits > 15) return setState({ status: 'idle', error: 'Please enter your full phone number, including the area code.' });
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) return setState({ status: 'idle', error: 'Please check your email address, or leave it empty.' });
    setState({ status: 'sending', error: '' });
    try {
      const res = await postLead({
        source: 'estimate-form',
        name: f.name.trim(),
        phone: f.phone.trim(),
        email: f.email.trim(),
        zip: f.zip.trim(),
        service,
        message: note || '',
        website: f.website,
        page: page || window.location.pathname,
        utm: currentAttribution(),
      });
      if (!res.ok) throw new Error(String(res.status));
      if (!rememberLead(leadSource)) trackLead(leadSource);
      window.location.assign('/thank-you/');
    } catch {
      setState({ status: 'idle', error: 'Something went wrong. Please try again, or call us.' });
    }
  }

  return (
    <form className="qlf" onSubmit={submit} noValidate>
      <p className="qlf-title">{title}</p>
      {text && <p className="qlf-text">{text}</p>}
      <label>
        <span>Name</span>
        <input name="name" autoComplete="name" value={f.name} onChange={set('name')} required />
      </label>
      <label>
        <span>Phone</span>
        <input name="phone" type="tel" inputMode="tel" autoComplete="tel" value={f.phone} onChange={set('phone')} required />
      </label>
      <div className="qlf-row">
        <label>
          <span>Email <small>(optional)</small></span>
          <input name="email" type="email" inputMode="email" autoComplete="email" value={f.email} onChange={set('email')} />
        </label>
        <label>
          <span>ZIP</span>
          <input name="zip" inputMode="numeric" autoComplete="postal-code" maxLength={5} value={f.zip} onChange={(e) => setF((v) => ({ ...v, zip: e.target.value.replace(/\D/g, '') }))} />
        </label>
      </div>
      <label className="qlf-hp" aria-hidden="true">
        <span>Leave this field empty</span>
        <input name="qlf-leave-empty" tabIndex={-1} autoComplete="off" data-1p-ignore data-lpignore="true" value={f.website} onChange={set('website')} />
      </label>
      {state.error && <p className="qlf-error" role="alert">{state.error}</p>}
      <button className="btn btn-gold" type="submit" disabled={state.status === 'sending'}>
        {state.status === 'sending' ? 'Sending…' : <>{button} <ArrowRight /></>}
      </button>
      <p className="qlf-fine">Free and no obligation. A roofer calls you to schedule.</p>
    </form>
  );
}
