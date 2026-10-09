'use client';

import { useState } from 'react';
import { ArrowRight } from '@/components/ui/icons';
import { currentAttribution } from '@/lib/attribution';
import { SITE_VISUALIZE_ENDPOINT, VISUALIZE_ENDPOINT, VISUALIZER_COPY, VISUALIZER_PATH, VISUALIZER_TOKEN_KEY } from '@/data/roofVisualizer';

// POST to the visualizer, on the Edge Function when it is set up and on the site's own route if it can't be reached (like the lead form, lib/endpoints.js)
export async function postVisualizer(payload) {
  const send = (url) => fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  if (VISUALIZE_ENDPOINT === SITE_VISUALIZE_ENDPOINT) return send(SITE_VISUALIZE_ENDPOINT);
  try {
    const res = await send(VISUALIZE_ENDPOINT);
    if (res.ok || res.status === 400 || res.status === 401 || res.status === 429) return res;
  } catch {}
  return send(SITE_VISUALIZE_ENDPOINT);
}

// The address lookup only runs on the site's own server (it decodes GeoTIFF pictures), never on the Edge Function; it uses the same signed pass
export const postAerial = (payload) => fetch(SITE_VISUALIZE_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });

export const savedPass = () => {
  try {
    return window.localStorage.getItem(VISUALIZER_TOKEN_KEY) || '';
  } catch {
    return '';
  }
};
export const clearPass = () => {
  try {
    window.localStorage.removeItem(VISUALIZER_TOKEN_KEY);
  } catch {}
};

// The gate: name and email (and the box agreeing to emails) before anyone can use the visualizer. On success the signed pass is kept in the browser and
// the visitor goes on: `onDone(token)` on the visualizer page, or to the visualizer page from the home page section (`redirect`).
export default function VisualizerGate({ redirect = false, onDone, compact = false }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(true);
  const [website, setWebsite] = useState(''); // hidden field: only bots fill it in
  const [state, setState] = useState({ busy: false, error: '' });

  async function submit(e) {
    e.preventDefault();
    if (state.busy) return;
    setState({ busy: true, error: '' });
    try {
      const res = await postVisualizer({ action: 'subscribe', name, email, consent, website, page: window.location.pathname, utm: currentAttribution() || undefined });
      const data = await res.json().catch(() => ({}));
      if (res.status === 503) throw new Error('The visualizer is not available right now. Please call us and we will help.');
      if (!res.ok || !data.token) throw new Error(data.error && res.status < 500 ? data.error : 'Something went wrong. Please try again, or call us.');
      try {
        window.localStorage.setItem(VISUALIZER_TOKEN_KEY, data.token);
      } catch {}
      if (typeof window.gtag === 'function') window.gtag('event', 'visualizer_signup', { method: redirect ? 'home-section' : 'visualizer-page' });
      if (redirect) window.location.assign(VISUALIZER_PATH);
      else onDone?.(data.token);
    } catch (err) {
      setState({ busy: false, error: err.message });
    }
  }

  return (
    <form className={'viz-gate' + (compact ? ' compact' : '')} onSubmit={submit} noValidate>
      <h3 className="viz-gate-title">{VISUALIZER_COPY.gateTitle}</h3>
      {!compact && <p className="viz-gate-text">{VISUALIZER_COPY.gateText}</p>}
      <label>
        <span>Your name</span>
        <input name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label className="viz-website" aria-hidden="true">
        <span>Website</span>
        <input name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </label>
      <label className="viz-consent">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>{VISUALIZER_COPY.consent}</span>
      </label>
      {state.error && <p className="viz-error" role="alert">{state.error}</p>}
      <button className="btn btn-gold" type="submit" disabled={state.busy}>
        {state.busy ? 'One moment…' : 'Try the visualizer'} <ArrowRight />
      </button>
      {compact && <p className="viz-fine">{VISUALIZER_COPY.gateText}</p>}
    </form>
  );
}
