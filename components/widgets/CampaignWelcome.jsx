'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import SiteLink from '@/components/ui/SiteLink';
import { CloseIcon, PhoneIcon } from '@/components/ui/icons';
import { GBP_PROFILES, SHOW_WELCOME_CARD } from '@/data/campaigns';
import { PHONE, TEL } from '@/data/site';
import { captureAttribution } from '@/lib/attribution';
import './CampaignWelcome.css';

// On every page load this notes the link's utm tags for lead attribution (lib/attribution.js). When SHOW_WELCOME_CARD is on
// and the campaign is one of the Google Business Profiles in data/campaigns.js, it also shows a small welcome card for
// that profile, on the page the visitor landed on (it goes away on the next page, or with ✕). It runs in the browser
// only, so the pages stay static and search engines never see it.
export default function CampaignWelcome() {
  const [welcome, setWelcome] = useState(null); // { profile, target } | null
  const pathname = usePathname();
  const landing = useRef(null);

  useEffect(() => {
    const campaign = captureAttribution().campaign || '';
    const profile = SHOW_WELCOME_CARD && GBP_PROFILES[campaign.toLowerCase()];
    if (!profile) return;
    landing.current = window.location.pathname;
    // The gold button goes to the estimate form when this page has one, otherwise to the contact page
    setWelcome({ profile, target: document.getElementById('roof-check') ? '#roof-check' : '/contact-us/' });
  }, []);

  useEffect(() => {
    if (landing.current && pathname !== landing.current) setWelcome(null);
  }, [pathname]);

  if (!welcome) return null;
  const { profile, target } = welcome;
  const { street, city, region, postalCode } = profile.office.address;

  return (
    <aside className="cw" aria-label={`Welcome from our ${profile.place} Google profile`}>
      <button className="cw-x" type="button" aria-label="Close welcome message" onClick={() => setWelcome(null)}>
        <CloseIcon />
      </button>
      <p className="cw-eyebrow">Welcome from our {profile.place} Google profile</p>
      <p className="cw-line">{profile.line}</p>
      <p className="cw-addr">
        <a href={profile.office.mapUrl} target="_blank" rel="noopener noreferrer">
          {street}, {city}, {region} {postalCode}
        </a>
      </p>
      <div className="cw-actions">
        <a className="btn btn-plum" href={TEL}>
          <PhoneIcon />
          Call {PHONE}
        </a>
        <SiteLink className="btn btn-gold" href={target}>
          {profile.cta}
        </SiteLink>
      </div>
    </aside>
  );
}
