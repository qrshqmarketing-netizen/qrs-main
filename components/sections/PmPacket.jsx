'use client';

// The property manager roof packet (lead magnet) on /commercial-roofing/property-managers/ (ServicePage, `leadMagnet: 'pm-packet'` in the
// page data): what the two-page PDF holds beside a short form. It posts to app/api/pm-packet/ (a lead in the CRM, source "Property manager
// packet", and the PDF by email), then shows a direct download link. Copy in data/pmPacket.js, styles in PmPacket.css.
import { useState } from 'react';
import Image from 'next/image';
import Mark from '@/components/ui/Mark';
import { ArrowRight, PhoneIcon } from '@/components/ui/icons';
import { PHONE, TEL } from '@/data/site';
import { PM_BUILDING_COUNTS, PM_PACKET as P, PM_PACKET_FILE } from '@/data/pmPacket';
import { currentAttribution } from '@/lib/attribution';
import { trackEvent, trackLead } from '@/lib/tracking';
import './PmPacket.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function PmPacket() {
  const [f, setF] = useState({ name: '', company: '', email: '', phone: '', buildings: '', website: '' });
  const [state, setState] = useState({ status: 'idle', error: '' });
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    if (state.status === 'sending') return;
    const digits = f.phone.replace(/\D/g, '').length;
    if (f.name.trim().length < 2) return setState({ status: 'idle', error: 'Please enter your name.' });
    if (!f.company.trim()) return setState({ status: 'idle', error: 'Please enter your company.' });
    if (!EMAIL_RE.test(f.email.trim())) return setState({ status: 'idle', error: 'Please enter your work email, so we can send the packet.' });
    if (f.phone.trim() && (digits < 10 || digits > 15)) return setState({ status: 'idle', error: 'Please check your phone number, or leave it empty.' });
    if (!f.buildings) return setState({ status: 'idle', error: 'Please choose how many buildings you manage.' });
    setState({ status: 'sending', error: '' });
    try {
      const res = await fetch('/api/pm-packet/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, name: f.name.trim(), company: f.company.trim(), email: f.email.trim(), phone: f.phone.trim(), page: window.location.pathname, utm: currentAttribution() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      trackLead('pm_packet');
      trackEvent('pm_packet_request', { building_count: f.buildings });
      setState({ status: 'sent', error: '' });
    } catch {
      setState({ status: 'idle', error: 'Something went wrong. Please try again, or call us.' });
    }
  }

  return (
    <section className="section pmp" id="property-manager-packet" aria-labelledby="pmp-title">
      <div className="container pmp-inner">
        <div className="pmp-copy">
          {/* The photo heads the content column and fades into the panel, so the heading sits on its lower edge */}
          <div className="pmp-photo">
            <Image src={P.image} alt={P.imageAlt} fill sizes="(min-width: 1440px) 900px, (min-width: 901px) 62vw, 100vw" quality={75} />
            <span className="pmp-photo-tag">{P.imageTag}</span>
          </div>
          <h2 id="pmp-title"><Mark text={P.heading} /></h2>
          <p className="pmp-lede">{P.lede}</p>
          <div className="pmp-packet">
            <div>
              <div className="pmp-pages" aria-hidden="true">
                <div className="pmp-page pmp-page-back">
                  <div className="pmp-page-bar" />
                  <div className="pmp-page-body">
                    <p className="pmp-page-title">{P.pages[1]}</p>
                    <i /><i /><i /><i style={{ width: '70%' }} />
                  </div>
                </div>
                <div className="pmp-page pmp-page-front">
                  <div className="pmp-page-bar" />
                  <div className="pmp-page-body">
                    <p className="pmp-page-title">{P.pages[0]}</p>
                    <i /><i style={{ width: '80%' }} />
                    <div className="pmp-tiles"><span /><span /><span /><span /></div>
                  </div>
                  <div className="pmp-page-foot" />
                </div>
              </div>
              <p className="pmp-caption">{P.caption}</p>
            </div>
            <ul className="pmp-list">
              {P.points.map(([strong, rest]) => (
                <li key={strong}><strong>{strong}</strong>{rest}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`pmp-card${state.status === 'sent' ? ' is-sent' : ''}`}>
          {state.status === 'sent' ? (
            <div className="pmp-done" role="status" aria-live="polite">
              <p className="pmp-card-title">{P.doneTitle}</p>
              <p>{P.doneText}</p>
              <p>
                <a className="btn btn-gold" href={PM_PACKET_FILE} target="_blank" rel="noopener" onClick={() => trackEvent('pm_packet_download')}>
                  {P.download} <ArrowRight />
                </a>
              </p>
              <p>{P.doneNext}</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <p className="pmp-card-title">{P.formTitle}</p>
              <p className="pmp-intro">{P.formIntro}</p>
              <div className="pmp-row">
                <label>
                  <span>Name</span>
                  <input name="name" autoComplete="name" value={f.name} onChange={set('name')} required maxLength={120} />
                </label>
                <label>
                  <span>Company</span>
                  <input name="organization" autoComplete="organization" value={f.company} onChange={set('company')} required maxLength={120} />
                </label>
              </div>
              <label>
                <span>Work email</span>
                <input name="email" type="email" inputMode="email" autoComplete="email" value={f.email} onChange={set('email')} required maxLength={200} />
              </label>
              <div className="pmp-row">
                <label>
                  <span>Phone <small>(optional)</small></span>
                  <input name="phone" type="tel" inputMode="tel" autoComplete="tel" value={f.phone} onChange={set('phone')} maxLength={40} />
                </label>
                <label>
                  <span>Buildings you manage</span>
                  <select name="buildings" value={f.buildings} onChange={set('buildings')} required>
                    <option value="">Choose one</option>
                    {PM_BUILDING_COUNTS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </label>
              </div>
              <label className="pmp-hp" aria-hidden="true">
                <span>Leave this field empty</span>
                <input name="pmp-leave-empty" tabIndex={-1} autoComplete="off" data-1p-ignore data-lpignore="true" value={f.website} onChange={set('website')} />
              </label>
              {state.error && <p className="pmp-error" role="alert">{state.error}</p>}
              <button className="btn btn-gold" type="submit" disabled={state.status === 'sending'}>
                {state.status === 'sending' ? 'Sending…' : <>{P.button} <ArrowRight /></>}
              </button>
              <p className="pmp-consent">
                By submitting, you agree QRS may contact you by phone, text or email about your request, including with automated technology. Message and data rates may apply; consent isn’t required to do business with us. See our <a href="/privacy-policy/">Privacy Policy</a> and <a href="/terms-and-conditions/">Terms &amp; Conditions</a>.
              </p>
            </form>
          )}
          <p className="pmp-alt">
            {P.alt} <a href={TEL}><PhoneIcon /> Call {PHONE}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
