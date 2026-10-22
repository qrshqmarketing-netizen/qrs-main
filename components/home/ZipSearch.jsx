'use client';

import { useId, useState } from 'react';
import { lookupZip, scrollToSection, shareZip } from '@/lib/zipLookup';
import './ZipSearch.css';

// The ZIP search (after publicstorage.com's one search field): a pill with a ZIP field and a round gold search button. It looks the ZIP up
// (lib/zipLookup.js), shares the answer with the "Roofers near you" cards and the estimate form, then scrolls to `target` (the cards).
// tone: 'dark' over a photo (the home hero), 'light' on the page.
export default function ZipSearch({ target = 'near-you', tone = 'light', label = 'Enter your ZIP code', className = '' }) {
  const id = useId();
  const [zip, setZip] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!/^\d{5}$/.test(zip)) return setError('Please enter a 5-digit ZIP code.');
    setError('');
    setBusy(true);
    const result = await lookupZip(zip);
    setBusy(false);
    shareZip(result);
    if (target) scrollToSection(target);
  };

  return (
    <form className={`zs zs-${tone} ${className}`} onSubmit={submit} role="search" aria-label="Find roofers near you" noValidate>
      <div className="zs-field">
        <label htmlFor={id} className="sr-only">
          ZIP code
        </label>
        <input
          id={id}
          inputMode="numeric"
          autoComplete="off" // not "postal-code": that makes LastPass put its icon inside the field before React loads (a hydration mismatch)
          maxLength={5}
          placeholder={label}
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
          data-lpignore="true"
          data-1p-ignore
          data-form-type="other"
        />
        <button type="submit" aria-label={busy ? 'Checking your ZIP code' : 'Find roofers near you'} disabled={busy}>
          {busy ? (
            <span className="zs-spin" aria-hidden="true" />
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m15.5 15.5 5 5" />
            </svg>
          )}
        </button>
      </div>
      {error && (
        <p className="zs-error" id={`${id}-err`} role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
