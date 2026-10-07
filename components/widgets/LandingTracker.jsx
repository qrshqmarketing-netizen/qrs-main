'use client';

import { useEffect } from 'react';
import { PROMO_NAME } from '@/data/promo';
import { captureAttribution } from '@/lib/attribution';
import { trackEvent } from '@/lib/tracking';

// The El Niño landing page's tracking (renders nothing): notes the link's utm tags for the lead (lib/attribution.js; the layout does this on
// every page load too, this makes sure of it here) and sends one promo_landing_view event to Google Analytics saying which piece
// (utm_medium: modal-timed, modal-exit, home-section) brought the visitor. A visit with no tags counts as "direct".
export default function LandingTracker() {
  useEffect(() => {
    const found = captureAttribution();
    trackEvent('promo_landing_view', { promo_name: PROMO_NAME, promo_variant: found.medium || 'direct', utm_campaign: found.campaign || '' });
  }, []);
  return null;
}
