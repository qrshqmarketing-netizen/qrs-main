'use client';

import { useEffect } from 'react';
import { takeRememberedLead, trackLead } from '@/lib/tracking';

// On the thank-you page: reports the conversion (generate_lead) once, and only when the visitor arrived from a
// delivered form, so reloads and direct visits to /thank-you/ don't count as leads.
export default function LeadConversion() {
  useEffect(() => {
    const source = takeRememberedLead();
    if (source) {
      window.__qrsLead = true; // read by ChatGptPixel: this visit follows a delivered form
      trackLead(source);
    }
  }, []);
  return null;
}
