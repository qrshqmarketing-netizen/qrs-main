'use client';

import { usePathname } from 'next/navigation';
import { QUOTE_EXCLUDE } from '@/data/instantQuote';
import './QuoteTrigger.css';

// Phones only: opens the Instant Quote drawer (its side tab is hidden on phones). Shown in the hero and closing
// CTA button groups, except on pages the quote doesn't cover (QUOTE_EXCLUDE in data/instantQuote.js).
export default function QuoteTrigger({ label = 'Get an Instant Quote' }) {
  const pathname = usePathname();
  if (QUOTE_EXCLUDE.some((p) => pathname.startsWith(p))) return null;
  return (
    <button className="btn btn-outline quote-trigger" type="button" data-rm-open="">
      {label}
    </button>
  );
}
