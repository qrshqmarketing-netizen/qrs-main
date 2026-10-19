'use client';

import { useEffect } from 'react';
import { PROMO_NAME } from '@/data/promo';
import { captureAttribution } from '@/lib/attribution';
import { trackEvent } from '@/lib/tracking';

// The ad landing pages' tracking (renders nothing): notes the link's utm tags for the lead (lib/attribution.js) and sends one lp_view event to
// Google Analytics with the page (residential, commercial, el-nino), the message-match variant shown and the ad's source and campaign. The El Niño
// page also keeps sending promo_landing_view, as before.
export default function LandingTracker({ page, variant }) {
  useEffect(() => {
    const found = captureAttribution();
    trackEvent('lp_view', { lp_name: page, lp_variant: variant, utm_source: found.source || 'direct', utm_campaign: found.campaign || '' });
    if (page === 'el-nino') trackEvent('promo_landing_view', { promo_name: PROMO_NAME, promo_variant: found.medium || 'direct', utm_campaign: found.campaign || '' });
  }, [page, variant]);
  return null;
}
