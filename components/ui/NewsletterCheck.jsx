'use client';

import { NEWSLETTER_LABEL } from '@/lib/subscribeClient';

// The "email me the latest news" checkbox on the request forms (owner, November 12 2026). Checked by default (owner, November 12 2026; the visitor can untick it); it only counts
// when they also typed an email. `tr` translates the label on the Spanish pages. The subscription itself (and its confirmation email) is
// requested by the form after the lead is sent: lib/subscribeClient.js.
export default function NewsletterCheck({ id, checked, onChange, tr = (x) => x, className = 'form-check' }) {
  return (
    <label className={className} htmlFor={id}>
      <input id={id} type="checkbox" name="newsletter" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{tr(NEWSLETTER_LABEL)}</span>
    </label>
  );
}
