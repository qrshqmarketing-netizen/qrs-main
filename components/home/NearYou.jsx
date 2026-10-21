'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import { PHONE, TEL } from '@/data/site';
import { miles } from '@/lib/geo';
import { ZIP_EVENT } from '@/lib/events';
import { storedZip } from '@/lib/zipLookup';
import HomeHead from './HomeHead';
import ZipSearch from './ZipSearch';
import './HomeNav.css';

// "Roofers near you" (after publicstorage.com's "locations in your neighborhood" cards over a pale map): four city pages as cards, with a ZIP
// search. Before a search it shows `start` (the office cities first); after one, from the hero or here, the four city pages closest to that ZIP
// with their distance, and the service-area answer above them (lib/zipLookup.js). Every card links to its city page. places: the city pages
// ({ slug, city, county, path, image, imagePosition, blurb, lat, lng, office }); sketch: the drawn map behind (AreaSketch).
const SHOW = 4;

const answer = (r) =>
  r.status === 'near' ? (
    <>
      <b>Good news:</b> {r.zip} is in our service area. These are our closest city pages.
    </>
  ) : r.status === 'inside' ? (
    <>
      <b>Good news:</b> {r.zip} is inside the area we serve, a longer drive from our nearest city. Call <a href={TEL}>{PHONE}</a> to confirm scheduling.
    </>
  ) : r.status === 'prefix' ? (
    <>
      <b>Good news:</b> {r.zip} is in our Southern California service area.
    </>
  ) : r.status === 'outside' ? (
    <>
      {r.zip} looks outside our current area. Call <a href={TEL}>{PHONE}</a> and we&rsquo;ll let you know.
    </>
  ) : (
    <>
      We couldn&rsquo;t look up {r.zip} just now. Call <a href={TEL}>{PHONE}</a> and we&rsquo;ll confirm.
    </>
  );

export default function NearYou({ heading, text, places, start, sketch, all }) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const saved = storedZip();
    if (saved) setResult(saved);
    const on = (e) => setResult(e.detail);
    window.addEventListener(ZIP_EVENT, on);
    return () => window.removeEventListener(ZIP_EVENT, on);
  }, []);

  const shown = result?.pt
    ? places
        .map((p) => ({ ...p, distance: miles(result.pt, [p.lat, p.lng]) }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, SHOW)
    : start.map((slug) => places.find((p) => p.slug === slug)).filter(Boolean);
  const served = result && result.status !== 'outside' && result.status !== 'unknown';

  return (
    <section className="hc-section hc-near" id="near-you" aria-labelledby="hc-near-title">
      {sketch}
      <div className="hc-wrap">
        <HomeHead id="hc-near-title" heading={heading} text={text} />
        <ZipSearch target={null} className="hc-near-search" label="Enter your ZIP code" />
        <p className="hc-near-answer" role="status" aria-live="polite">
          {result ? answer(result) : null}
        </p>
        <ul className="hc-cards hc-near-cards">
          {shown.map((p) => (
            <li className="hc-card" key={p.slug}>
              <div className="hc-card-photo">
                <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 260px, (min-width: 621px) 50vw, 100vw" quality={60} loading="lazy" style={{ objectPosition: p.imagePosition }} />
              </div>
              <div className="hc-card-body">
                <p className="hc-small">{p.office ? `QRS office · ${p.county}` : p.county}</p>
                <h3>
                  <SiteLink className="hc-stretch" href={p.path}>
                    {p.city}
                  </SiteLink>
                </h3>
                <p>{p.blurb}</p>
                {p.distance != null && <p className="hc-near-miles">{p.distance < 1 ? 'Under a mile' : `${p.distance.toFixed(1)} miles`} from {result.zip}</p>}
                <span className="hc-near-select" aria-hidden="true">
                  Roofing in {p.city} <ArrowRight />
                </span>
              </div>
            </li>
          ))}
        </ul>
        <p className="hc-center hc-near-actions">
          {served && (
            <SiteLink className="hc-pill hc-pill-gold" href="#roof-check">
              Book a free roof evaluation <ArrowRight />
            </SiteLink>
          )}
          <SiteLink className="hc-pill" href={all.href}>
            {all.label} <ArrowRight />
          </SiteLink>
        </p>
      </div>
    </section>
  );
}
