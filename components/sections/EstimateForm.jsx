'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FOUND_US_OPTIONS, ROOF_TYPES, SERVICE_OPTIONS } from '@/data/estimateOptions';
import { PHONE, TEL } from '@/data/site';
import { currentAttribution } from '@/lib/attribution';
import { postLead } from '@/lib/endpoints';
import { rememberLead, trackLead } from '@/lib/tracking';
import { ZIP_EVENT } from '@/lib/events';
import { storedZip } from '@/lib/zipLookup';

// The estimate form in the request section at the bottom of every page (RoofCheck.jsx, id="roof-check"), back in October 2026 after the
// step-by-step form at /start/ brought in fewer leads. Every "Get Pro Advice" link on a page with this section scrolls to it (SiteLink).
// It posts to the lead endpoint (lib/endpoints.js: /api/lead/ or the Supabase function), so the lead goes to the team's email, the Google Sheet
// and Supabase with the page's utm tags, then the thank-you page opens (it reports the conversion). The service and roof type start out
// matched to the page the visitor is on.
const SERVICE_BY_PATH = [
  [/lift-and-relay/, 'Tile lift & relay'],
  [/^\/roof-maintenance|maintenance/, 'Roof maintenance plan'],
  [/^\/roof-inspection/, 'Roof inspection / roof check'],
  [/^\/commercial-roofing|hoa-multi-family/, 'Commercial or HOA roofing'],
  [/repair|emergency/, 'Roof repair'],
  [/replacement|installation|standing-seam/, 'Roof replacement'],
  [/flat-roofing/, 'Flat roofing'],
  [/shingle-roofing/, 'Shingle roofing'],
];
const ROOF_BY_PATH = [
  [/tile|lift-and-relay|slate|concrete/, 'Tile'],
  [/shingle/, 'Shingle'],
  [/flat-roofing|tpo/, 'Flat'],
  [/metal|standing-seam/, 'Metal'],
];
const fromPath = (table, path, fallback) => table.find(([re]) => re.test(path))?.[1] || fallback;

export default function EstimateForm() {
  const pathname = usePathname() || '/';
  return <Form key={pathname} pathname={pathname} />;
}

function Form({ pathname }) {
  const [f, setF] = useState({
    name: '', phone: '', email: '', zip: '', message: '', foundUs: '', website: '',
    service: fromPath(SERVICE_BY_PATH, pathname, 'Not sure yet'),
    roofType: fromPath(ROOF_BY_PATH, pathname, 'Not sure'),
  });
  const [state, setState] = useState({ status: 'idle', error: '' });
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));

  // A ZIP the visitor searched for on this visit (the home page's ZIP search, components/home/ZipSearch.jsx) fills an empty ZIP field
  useEffect(() => {
    const fill = (r) => r?.zip && setF((v) => (v.zip ? v : { ...v, zip: r.zip }));
    fill(storedZip());
    const on = (e) => fill(e.detail);
    window.addEventListener(ZIP_EVENT, on);
    return () => window.removeEventListener(ZIP_EVENT, on);
  }, []);

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
        service: f.service,
        roofType: f.roofType,
        foundUs: f.foundUs,
        message: f.message.trim(),
        website: f.website,
        page: pathname,
        utm: currentAttribution(),
      });
      if (!res.ok) throw new Error(String(res.status));
      // Off to the thank-you page, which reports the conversion; if storage is blocked, report it here instead
      if (!rememberLead('estimate_form')) trackLead('estimate_form');
      window.location.assign('/thank-you/');
    } catch {
      setState({ status: 'error', error: '' });
    }
  }

  return (
    <form id="estimateForm" onSubmit={submit} noValidate>
      <div className="form-row">
        <div className="field">
          <label htmlFor="ef-name">Name</label>
          <input id="ef-name" name="name" required autoComplete="name" placeholder="Your name" value={f.name} onChange={set('name')} />
        </div>
        <div className="field">
          <label htmlFor="ef-phone">Phone</label>
          <input id="ef-phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel" placeholder="(310) 555-0123" value={f.phone} onChange={set('phone')} />
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="ef-email">Email <small>(optional)</small></label>
          <input id="ef-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" value={f.email} onChange={set('email')} />
        </div>
        <div className="field">
          <label htmlFor="ef-zip">ZIP code</label>
          <input id="ef-zip" name="zip" inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="90001" value={f.zip} onChange={(e) => setF((v) => ({ ...v, zip: e.target.value.replace(/\D/g, '') }))} />
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="ef-service">What do you need?</label>
          <select id="ef-service" name="service" value={f.service} onChange={set('service')}>
            {SERVICE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="ef-roof">Roof type</label>
          <select id="ef-roof" name="roofType" value={f.roofType} onChange={set('roofType')}>
            {ROOF_TYPES.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="ef-message">What is going on? <small>(optional)</small></label>
        <textarea id="ef-message" name="message" placeholder="Leak, stain, storm damage, age of roof, or just checking..." value={f.message} onChange={set('message')} />
      </div>
      <div className="field">
        <label htmlFor="ef-found">How did you find us? <small>(optional)</small></label>
        <select id="ef-found" name="foundUs" value={f.foundUs} onChange={set('foundUs')}>
          <option value="">Choose one</option>
          {FOUND_US_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>
      {/* Spam trap: hidden from people (and from password managers), bots fill it in and the server quietly drops the request */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="ef-leave-empty">Leave this field empty</label>
        <input id="ef-leave-empty" name="ef-leave-empty" tabIndex={-1} autoComplete="off" data-1p-ignore data-lpignore="true" value={f.website} onChange={set('website')} />
      </div>
      {state.error && <p className="form-error show" role="alert">{state.error}</p>}
      <button className="btn btn-gold" type="submit" disabled={state.status === 'sending'}>
        {state.status === 'sending' ? 'Sending…' : <>Request My Free Estimate <span className="arrow">→</span></>}
      </button>
      <p className="form-note">
        By submitting, you agree QRS may contact you by phone, text or email about your request, including with automated technology. Message and data rates may apply; consent isn&rsquo;t required to do business with us. See our <a href="/privacy-policy/">Privacy Policy</a> and <a href="/terms-and-conditions/">Terms &amp; Conditions</a>.
      </p>
      <div className={'form-error' + (state.status === 'error' ? ' show' : '')} role="alert">
        Sorry, your request didn&rsquo;t go through. Please try again, or call us at <a href={TEL}>{PHONE}</a>.
      </div>
    </form>
  );
}
