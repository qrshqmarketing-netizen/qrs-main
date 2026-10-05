'use client';

import { useEffect, useRef, useState } from 'react';
import { FOUND_US_OPTIONS, VISIT_TIMES } from '@/data/estimateOptions';
import { OFFERS } from '@/data/offers';
import { BUSINESS, PHONE, TEL } from '@/data/site';
import {
  askRole, askTiming, leadFields, NEEDS, prefillForPath, PROPERTIES, ROLES, ROOFS, START_PATH, stepDone, stepsFor, STEP_LABELS,
  TIMINGS, URGENCY, zipLikelyServed,
} from '@/data/start';
import { currentAttribution } from '@/lib/attribution';
import { zipPrefixServed } from '@/lib/geo';
import { hoursText } from '@/lib/hours';
import { lastPage } from '@/lib/pageTrail';
import { rememberLead, trackEvent, trackLead } from '@/lib/tracking';
import './RoofCheck.css'; // the offer card and form card styles
import './StartStepper.css';

const ADVANCE_MS = 170; // a single-choice answer moves on after this short beat, so the pick is seen
const isoDay = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; // the visitor's own calendar day

// The request steps on /start/ (rules and wording in data/start.js). Questions that don't apply are left out, answers the visitor's
// previous page implies are filled in, and the offer card beside it switches to the commercial survey for HOA and commercial
// properties. Sends to /api/lead/ like the old estimate form did, then opens /thank-you/.
export default function StartStepper() {
  const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState({ name: '', phone: '', email: '', zip: '', company: '', foundUs: '', message: '', date: '', time: '', website: '' });
  // Earliest and latest day the date picker offers (tomorrow to six months out). Set in the browser: this page is built ahead of time, so "today" isn't known yet.
  const [days, setDays] = useState({ min: '', max: '' });
  const [step, setStep] = useState('need');
  const [prefilled, setPrefilled] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'
  const [error, setError] = useState('');
  const heading = useRef(null);
  const mounted = useRef(false);
  const timer = useRef(null);

  const steps = stepsFor(answers);
  const firstOpen = (a) => stepsFor(a).find((s) => s !== 'contact' && !stepDone(s, a)) || 'contact';
  const index = Math.max(0, steps.indexOf(step));
  const openAt = steps.indexOf(firstOpen(answers)); // later steps can't be opened until the ones before them are answered

  // Start from what the visitor already told us: ?need= and ?property= in the link (a page's start card, the Google profile links), and what
  // the page they came from implies
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const need = params.get('need');
    const property = params.get('property');
    const known = {
      ...prefillForPath(lastPage()),
      ...(NEEDS.some((n) => n.id === need) && { need }),
      ...(PROPERTIES.some((p) => p.id === property) && { property }),
    };
    if (!Object.keys(known).length) return;
    setAnswers(known);
    setPrefilled(true);
    setStep(firstOpen(known));
  }, []);

  // Move the screen reader and keyboard to the new question; report the step to Google Analytics
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    heading.current?.focus({ preventScroll: true });
    trackEvent('estimate_step', { step_name: step, step_number: index + 1 });
  }, [step]);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    const day = new Date();
    const min = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
    const max = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 183);
    setDays({ min: isoDay(min), max: isoDay(max) });
  }, []);

  const go = (id) => {
    clearTimeout(timer.current);
    setStep(id);
    setError('');
  };

  // Answer a question. Answers for questions that no longer apply are dropped; single-choice screens move on by themselves.
  const choose = (key, value, { advance = true } = {}) => {
    const next = { ...answers, [key]: value };
    if (next.need !== 'repair') delete next.urgency;
    if (!askTiming(next)) delete next.timing;
    if (!askRole(next)) delete next.role;
    setAnswers(next);
    if (advance) {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => go(firstOpen(next)), ADVANCE_MS);
    }
  };
  const toggle = (key, value) => setAnswers((a) => ({ ...a, [key]: a[key] === value ? undefined : value }));
  const setField = (key) => (e) => setContact((c) => ({ ...c, [key]: key === 'zip' ? e.target.value.replace(/\D/g, '').slice(0, 5) : e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const digits = contact.phone.replace(/\D/g, '').length;
    if (digits < 10 || digits > 15) {
      setError('Please enter your full phone number, including the area code.');
      return;
    }
    setError('');
    setStatus('sending');
    try {
      const res = await fetch('/api/lead/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // `page` is the page the visitor was on before /start/, so the lead says where it came from
        body: JSON.stringify({ ...leadFields(answers, contact), website: contact.website, source: 'estimate-form', page: lastPage() || START_PATH, utm: currentAttribution() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      // Off to the thank-you page, which reports the conversion; if storage is blocked, report it here instead
      if (!rememberLead('estimate_form')) trackLead('estimate_form');
      window.location.assign('/thank-you/');
    } catch {
      setStatus('error');
    }
  };

  const offer = OFFERS[askRole(answers) ? 'commercial' : 'home'];
  const urgent = answers.need === 'repair' && answers.urgency === 'yes';
  const summary = [
    NEEDS.find((n) => n.id === answers.need)?.label,
    PROPERTIES.find((p) => p.id === answers.property)?.label,
    answers.roof && `${ROOFS.find((r) => r.value === answers.roof)?.label} roof`,
  ].filter(Boolean);
  const outOfArea = contact.zip.length === 5 && !zipLikelyServed(contact.zip, zipPrefixServed);
  const pickedDay = contact.date ? new Date(`${contact.date}T12:00:00`).getDay() : -1;
  const weekend = pickedDay === 0 || pickedDay === 6;

  const choices = (items, field) => (
    <div className="st-choices">
      {items.map((item) => (
        <button
          type="button"
          key={item.id}
          className={'st-choice' + (answers[field] === item.id ? ' is-on' : '')}
          aria-pressed={answers[field] === item.id}
          onClick={() => choose(field, item.id, { advance: !(field === 'urgency' && item.id === 'yes') })}
        >
          <b>{item.label}</b>
          {item.hint && <span>{item.hint}</span>}
        </button>
      ))}
    </div>
  );

  const chips = (label, items, field) => (
    <fieldset className="st-group">
      <legend>{label}</legend>
      <div className="st-chips">
        {items.map((item) => {
          const value = item.value || item;
          const on = answers[field] === value;
          return (
            <button type="button" key={value} className={'st-chip' + (on ? ' is-on' : '')} aria-pressed={on} onClick={() => toggle(field, value)}>
              {item.label || item}
            </button>
          );
        })}
      </div>
    </fieldset>
  );

  return (
    <div className="container check-grid start-grid">
      <aside className="check-card">
        <div className="eyebrow">{offer.eyebrow}</div>
        {offer.price && <div className="price">{offer.price}</div>}
        <h2>{offer.heading}</h2>
        <p>{offer.text}</p>
        <div className="check-points">
          {offer.points.map((point) => (
            <div key={point.title}>
              <b>✓</b>
              <span>
                <strong>{point.title}</strong> {point.text}
              </span>
            </div>
          ))}
        </div>
      </aside>

      <div className="form-card st-card" id="estimate">
        <div className="eyebrow">Start here</div>
        <h1>Tell us what you need.</h1>

        <div className="st-progress" role="progressbar" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={index + 1} aria-label={`Step ${index + 1} of ${steps.length}`}>
          <span style={{ width: `${((index + 1) / steps.length) * 100}%` }} />
        </div>
        <ol className="st-steps">
          {steps.map((id, i) => (
            <li key={id} className={(id === step ? 'is-current ' : '') + (i < openAt || stepDone(id, answers) ? 'is-done' : '')}>
              {i <= openAt && id !== step ? (
                <button type="button" onClick={() => go(id)}>
                  <i>{i + 1}</i> <span className="st-l">{STEP_LABELS[id]}</span>
                </button>
              ) : (
                <span aria-current={id === step ? 'step' : undefined}>
                  <i>{i + 1}</i> <span className="st-l">{STEP_LABELS[id]}</span>
                </span>
              )}
            </li>
          ))}
        </ol>
        {prefilled && index === openAt && <p className="st-note">We filled in what we could from the page you were on. Tap a step above to change an answer.</p>}

        {step === 'need' && (
          <section aria-labelledby="st-q">
            <h2 id="st-q" tabIndex={-1} ref={heading}>What do you need help with?</h2>
            {choices(NEEDS, 'need')}
          </section>
        )}

        {step === 'property' && (
          <section aria-labelledby="st-q">
            <h2 id="st-q" tabIndex={-1} ref={heading}>What kind of property is it?</h2>
            {choices(PROPERTIES, 'property')}
          </section>
        )}

        {step === 'urgency' && (
          <section aria-labelledby="st-q">
            <h2 id="st-q" tabIndex={-1} ref={heading}>Is water coming in right now?</h2>
            {choices(URGENCY, 'urgency')}
            {urgent && (
              <div className="st-urgent" role="status">
                <p>
                  <strong>Call us now.</strong> The fastest way to reach a roofer is by phone, even after hours or on a weekend. You can also finish this request and we’ll follow up.
                </p>
                <a className="btn btn-plum" href={TEL}>Call {PHONE}</a>
                <button className="btn btn-gold" type="button" onClick={() => go(firstOpen(answers))}>Continue my request <span className="arrow">→</span></button>
              </div>
            )}
          </section>
        )}

        {step === 'details' && (
          <section aria-labelledby="st-q">
            <h2 id="st-q" tabIndex={-1} ref={heading}>A little about the roof</h2>
            {chips('What kind of roof is it?', ROOFS, 'roof')}
            {askTiming(answers) && chips('When would you like to start? (optional)', TIMINGS, 'timing')}
            {askRole(answers) && chips('Which best describes you? (optional)', ROLES, 'role')}
            <div className="st-actions">
              <button className="btn btn-gold" type="button" disabled={!answers.roof} onClick={() => go('contact')}>Next <span className="arrow">→</span></button>
            </div>
          </section>
        )}

        {step === 'contact' && (
          <form onSubmit={submit} aria-labelledby="st-q">
            <h2 id="st-q" tabIndex={-1} ref={heading}>Where should we reach you?</h2>
            {summary.length > 0 && <p className="st-summary">{summary.join(' · ')}</p>}
            {urgent && (
              <p className="st-urgent-line">
                Water coming in? Call <a href={TEL}>{PHONE}</a> now, even after hours.
              </p>
            )}
            <div className="form-row">
              <div className="field">
                <label htmlFor="st-name">Name</label>
                <input id="st-name" name="name" required autoComplete="name" placeholder="Your name" value={contact.name} onChange={setField('name')} />
              </div>
              <div className="field">
                <label htmlFor="st-phone">Phone</label>
                <input id="st-phone" name="phone" type="tel" required autoComplete="tel" placeholder="(310) 555-0123" value={contact.phone} onChange={setField('phone')} />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="st-zip">ZIP code of the property</label>
                <input id="st-zip" name="zip" required inputMode="numeric" autoComplete="postal-code" placeholder="90001" pattern="[0-9]{5}" title="Five-digit ZIP code" value={contact.zip} onChange={setField('zip')} />
                {outOfArea && <small className="st-hint">That ZIP is outside the area we usually work in. You can still send your request, and we’ll tell you for sure.</small>}
              </div>
              <div className="field">
                <label htmlFor="st-email">Email (optional)</label>
                <input id="st-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={contact.email} onChange={setField('email')} />
              </div>
            </div>
            {!urgent && (
              <div className="form-row">
                <div className="field">
                  <label htmlFor="st-date">Preferred date to visit (optional)</label>
                  <input id="st-date" name="date" type="date" min={days.min} max={days.max} value={contact.date} onChange={setField('date')} />
                  {weekend && <small className="st-hint">We’re open {hoursText(BUSINESS.hours)}, so we’ll suggest the closest weekday.</small>}
                </div>
                <div className="field">
                  <label htmlFor="st-time">Preferred time (optional)</label>
                  <select id="st-time" name="time" value={contact.time} onChange={setField('time')}>
                    <option value="">No preference</option>
                    {VISIT_TIMES.map((option) => <option key={option}>{option}</option>)}
                  </select>
                  <small className="st-hint">We’ll confirm the time with you.</small>
                </div>
              </div>
            )}
            {askRole(answers) && (
              <div className="field">
                <label htmlFor="st-company">Property or company name (optional)</label>
                <input id="st-company" name="company" autoComplete="organization" value={contact.company} onChange={setField('company')} />
              </div>
            )}
            <div className="field">
              <label htmlFor="st-found">How did you find us? (optional)</label>
              <select id="st-found" name="foundUs" value={contact.foundUs} onChange={setField('foundUs')}>
                <option value="">Choose one</option>
                {FOUND_US_OPTIONS.map((option) => <option key={option}>{option}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="st-message">Anything else we should know? (optional)</label>
              <textarea id="st-message" name="message" placeholder="Leak, stain, storm damage, age of roof, buying or selling, or just checking..." value={contact.message} onChange={setField('message')} />
            </div>

            {/* Spam trap: hidden from people, but bots fill it in (the server then quietly drops the request) */}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="st-website">Leave this field empty</label>
              <input id="st-website" name="website" tabIndex={-1} autoComplete="off" value={contact.website} onChange={setField('website')} />
            </div>

            <div className="st-actions">
              <button className="btn btn-gold" type="submit" disabled={status === 'sending' || status === 'sent'}>
                {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Request Sent ✓' : <>Request My Estimate <span className="arrow">→</span></>}
              </button>
            </div>
            <p className="form-note">
              By submitting, you agree QRS may contact you by phone, text or email about your request, including with automated technology. Message and data rates may apply; consent isn't required to do business with us. See our <a href="/privacy-policy/">Privacy Policy</a> and <a href="/terms-and-conditions/">Terms &amp; Conditions</a>.
            </p>
            <div className={'form-error' + (error ? ' show' : '')} role="alert">{error}</div>
            <div className={'form-error' + (status === 'error' ? ' show' : '')} role="alert">
              Sorry, your request didn&rsquo;t go through. Please try again, or call us at <a href={TEL}>{PHONE}</a>.
            </div>
          </form>
        )}

        {index > 0 && (
          <button className="st-back" type="button" onClick={() => go(steps[index - 1])}>← Back</button>
        )}
      </div>
    </div>
  );
}
