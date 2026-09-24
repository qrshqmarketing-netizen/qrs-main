'use client';

import { useEffect, useState } from 'react';
import { PRIVACY_POLICY_URL } from '@/data/site';
import { COOKIE_OK_EVENT, COOKIE_OK_KEY } from '@/lib/events';
import { local } from '@/lib/storage';
import './CookieNotice.css';

// Small cookie notice for first-time visitors, in the bottom-left corner. "Got it" hides it for good in that browser.
// The review pop-up doesn't start until the visitor clicks "Got it"; the chat teaser waits while the notice is up.
export default function CookieNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (local.get(COOKIE_OK_KEY)) return;
    const t = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('cookie-open', open);
  }, [open]);

  if (!open) return null;

  const dismiss = () => {
    local.set(COOKIE_OK_KEY, '1');
    window.dispatchEvent(new Event(COOKIE_OK_EVENT));
    setOpen(false);
  };

  return (
    <div className="cookie" role="region" aria-label="Cookie notice">
      <p>
        We use cookies to improve your experience on our site.
        {PRIVACY_POLICY_URL && (
          <>
            {' '}
            <a href={PRIVACY_POLICY_URL}>Privacy policy</a>
          </>
        )}
      </p>
      <button className="cookie-ok" type="button" onClick={dismiss}>
        Got it
      </button>
    </div>
  );
}
