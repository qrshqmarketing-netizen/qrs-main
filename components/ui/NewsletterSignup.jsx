'use client';

import { useState } from 'react';
import { subscribeNewsletter } from '@/lib/subscribeClient';
import useLang from '@/components/ui/useLang';
import './NewsletterSignup.css';

// The footer's "get new articles by email" box (owner, November 12 2026). Posts the address to /api/subscribe/, which emails a confirmation link
// (double opt-in); every new article is then emailed to confirmed subscribers (lib/newsletter.js). The hidden "website" field is a spam trap.
export default function NewsletterSignup() {
  const { tr } = useLang();
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [state, setState] = useState({ status: 'idle', error: '' });

  async function submit(e) {
    e.preventDefault();
    if (state.status === 'sending') return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return setState({ status: 'idle', error: tr('Please check your email address.') });
    setState({ status: 'sending', error: '' });
    try {
      const res = await subscribeNewsletter({ email, source: 'footer', website });
      if (!res.ok) throw new Error(res.error || 'failed');
      setState({ status: 'sent', error: '' });
    } catch (err) {
      setState({ status: 'idle', error: tr('Sorry, that didn’t go through. Please try again in a moment.') });
    }
  }

  return (
    <div className="ft-news" id="subscribe">
      <div className="ft-news-copy">
        <h3>{tr('Get our latest articles by email')}</h3>
        <p>{tr('A short email when we publish a new roofing article. No spam, and you can unsubscribe any time.')}</p>
      </div>
      {state.status === 'sent' ? (
        <p className="ft-news-done" role="status">{tr('Check your inbox: we sent you a link to confirm your subscription.')}</p>
      ) : (
        <form className="ft-news-form" onSubmit={submit} noValidate>
          <label className="sr-only" htmlFor="ft-news-email">{tr('Email address')}</label>
          <input id="ft-news-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder={tr('you@example.com')} value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="ft-news-website">{tr('Leave this field empty')}</label>
            <input id="ft-news-website" name="website" tabIndex={-1} autoComplete="off" data-1p-ignore data-lpignore="true" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
          <button type="submit" disabled={state.status === 'sending'}>{state.status === 'sending' ? tr('Sending…') : tr('Subscribe')}</button>
          {state.error && <p className="ft-news-error" role="alert">{state.error}</p>}
        </form>
      )}
    </div>
  );
}
