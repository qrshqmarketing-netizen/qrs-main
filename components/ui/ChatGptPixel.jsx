'use client';

import { useEffect } from 'react';
import { currentConsent, CONSENT_EVENT } from '@/lib/consent';

// The OpenAI (ChatGPT ads) conversion pixel, on the thank-you page only (owner, November 11 2026). It is the vendor's setup script as given
// (oaiq stub, then oaiq.min.js from bzrcdn.openai.com, then init with our pixel id), with debug off, loaded after the page has loaded and only
// when the visitor's cookie choice allows Analytics (lib/consent.js, the same key as Google Analytics and Google Ads: a visitor who switches
// Analytics on later gets it at once). Rendered by app/thank-you/page.js only on the live site (LOAD_TRACKING). One setup script per page.
export default function ChatGptPixel({ pixelId }) {
  useEffect(() => {
    let started = false;
    const start = () => {
      if (started || !currentConsent().analytics) return;
      started = true;
      (function (w, d, s, u) {
        if (w.oaiq) return;
        const q = function () { q.q.push(arguments); };
        q.q = [];
        w.oaiq = q;
        const j = d.createElement(s);
        j.async = 1;
        j.src = u;
        const f = d.getElementsByTagName(s)[0];
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'https://bzrcdn.openai.com/sdk/oaiq.min.js');
      window.oaiq('init', { pixelId, debug: false });
      // The conversion: a lead was created. Only for a visit that follows a delivered form (LeadConversion sets the flag), so a reload or a direct
      // visit to /thank-you/ never counts as a lead.
      if (window.__qrsLead) {
        window.oaiq('measure', 'lead_created', { type: 'customer_action' });
        window.__qrsLead = false;
      }
    };
    start();
    window.addEventListener(CONSENT_EVENT, start);
    return () => window.removeEventListener(CONSENT_EVENT, start);
  }, [pixelId]);
  return null;
}
