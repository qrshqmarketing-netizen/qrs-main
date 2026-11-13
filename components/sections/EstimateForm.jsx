'use client';

import { useState } from 'react';
import { usePathname } from '@/lib/sitePath';
import { FOUND_US_OPTIONS, ROOF_TYPES, SERVICE_OPTIONS } from '@/data/estimateOptions';
import { PHONE, TEL } from '@/data/site';
import { currentAttribution } from '@/lib/attribution';
import { postLead } from '@/lib/endpoints';
import { rememberLead, trackLead } from '@/lib/tracking';
import useLang from '@/components/ui/useLang';
import NewsletterCheck from '@/components/ui/NewsletterCheck';
import { subscribeNewsletter } from '@/lib/subscribeClient';
// The form's own styles (the error box stays hidden until a send fails) live with the request section; loaded here so every page that
// shows the form has them, including the redesigned pages without RoofCheck
import './RoofCheck.css';

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
  // [/metal|standing-seam/, 'Metal'], (metal hidden for now, owner, November 2 2026)
];
const fromPath = (table, path, fallback) => table.find(([re]) => re.test(path))?.[1] || fallback;

export default function EstimateForm() {
  const pathname = usePathname() || '/';
  return <Form key={pathname} pathname={pathname} />;
}

// On the Spanish home page (/es/) the words are Spanish (data/i18n/es.js), but every choice's value stays English, so the team's email,
// sheet and CRM read the same; `page: '/es/'` tells them the request came from the Spanish page.
function Form({ pathname }) {
  const { lang, tr } = useLang();
  const [f, setF] = useState({
    name: '', phone: '', email: '', zip: '', message: '', foundUs: '', website: '',
    service: fromPath(SERVICE_BY_PATH, pathname, 'Not sure yet'),
    roofType: fromPath(ROOF_BY_PATH, pathname, 'Not sure'),
  });
  const [news, setNews] = useState(true); // "email me the latest news": checked by default (owner, November 12 2026), counts only with an email, and a confirmation email still has to be clicked
  const [state, setState] = useState({ status: 'idle', error: '' });
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    if (state.status === 'sending') return;
    const digits = f.phone.replace(/\D/g, '').length;
    if (f.name.trim().length < 2) return setState({ status: 'idle', error: tr('Please enter your name.') });
    if (digits < 10 || digits > 15) return setState({ status: 'idle', error: tr('Please enter your full phone number, including the area code.') });
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) return setState({ status: 'idle', error: tr('Please check your email address, or leave it empty.') });
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
        message: lang === 'es' ? ['Idioma: español (página /es/).', f.message.trim()].filter(Boolean).join(' ') : f.message.trim(),
        website: f.website,
        page: pathname,
        utm: currentAttribution(),
      });
      if (!res.ok) throw new Error(String(res.status));
      // The newsletter checkbox: asks for a confirmation email; never holds up or fails the request
      if (news && f.email.trim()) subscribeNewsletter({ email: f.email, name: f.name, source: 'estimate-form' }, { keepalive: true }).catch(() => {});
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
          <label htmlFor="ef-name">{tr('Name')}</label>
          <input id="ef-name" name="name" required autoComplete="name" placeholder={tr('Your name')} value={f.name} onChange={set('name')} />
        </div>
        <div className="field">
          <label htmlFor="ef-phone">{tr('Phone')}</label>
          <input id="ef-phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel" placeholder="(310) 555-0123" value={f.phone} onChange={set('phone')} />
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="ef-email">{tr('Email')} <small>{tr('(optional)')}</small></label>
          <input id="ef-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder={tr('you@example.com')} value={f.email} onChange={set('email')} />
        </div>
        <div className="field">
          <label htmlFor="ef-zip">{tr('ZIP code')}</label>
          <input id="ef-zip" name="zip" inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="90001" value={f.zip} onChange={(e) => setF((v) => ({ ...v, zip: e.target.value.replace(/\D/g, '') }))} />
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="ef-service">{tr('What do you need?')}</label>
          <select id="ef-service" name="service" value={f.service} onChange={set('service')}>
            {SERVICE_OPTIONS.map((o) => <option key={o} value={o}>{tr(o)}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="ef-roof">{tr('Roof type')}</label>
          <select id="ef-roof" name="roofType" value={f.roofType} onChange={set('roofType')}>
            {ROOF_TYPES.map((o) => <option key={o} value={o}>{tr(o)}</option>)}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="ef-message">{tr('What is going on?')} <small>{tr('(optional)')}</small></label>
        <textarea id="ef-message" name="message" placeholder={tr('Leak, stain, storm damage, age of roof, or just checking...')} value={f.message} onChange={set('message')} />
      </div>
      <div className="field">
        <label htmlFor="ef-found">{tr('How did you find us?')} <small>{tr('(optional)')}</small></label>
        <select id="ef-found" name="foundUs" value={f.foundUs} onChange={set('foundUs')}>
          <option value="">{tr('Choose one')}</option>
          {FOUND_US_OPTIONS.map((o) => <option key={o} value={o}>{tr(o)}</option>)}
        </select>
      </div>
      {/* Spam trap: hidden from people (and from password managers), bots fill it in and the server quietly drops the request */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="ef-leave-empty">{tr('Leave this field empty')}</label>
        <input id="ef-leave-empty" name="ef-leave-empty" tabIndex={-1} autoComplete="off" data-1p-ignore data-lpignore="true" value={f.website} onChange={set('website')} />
      </div>
      {state.error && <p className="form-error show" role="alert">{state.error}</p>}
      <button className="btn btn-gold" type="submit" disabled={state.status === 'sending'}>
        {state.status === 'sending' ? tr('Sending…') : <>{tr('Request My Free Estimate')} <span className="arrow">→</span></>}
      </button>
      <NewsletterCheck id="ef-news" checked={news} onChange={setNews} tr={tr} />
      <p className="form-note">
        {tr('By submitting, you agree QRS may contact you by phone, text or email about your request, including with automated technology. Message and data rates may apply; consent isn’t required to do business with us. See our')} <a href="/privacy-policy/">{tr('Privacy Policy')}</a> {tr('and')} <a href="/terms-and-conditions/">{tr('Terms & Conditions')}</a>.
      </p>
      <div className={'form-error' + (state.status === 'error' ? ' show' : '')} role="alert">
        {tr('Sorry, your request didn’t go through. Please try again, or call us at')} <a href={TEL}>{PHONE}</a>.
      </div>
    </form>
  );
}
