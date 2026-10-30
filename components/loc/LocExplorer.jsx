'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { PHONE, TEL } from '@/data/site';

// The explorer of a location hub (built by LocHub.jsx): a search box and a filter over the county, city and place cards, after the owner's
// reference remote.com/us-state-explorer. Every card is in the server HTML; a card that doesn't match is only `hidden`, so all the links stay
// crawlable and the page works without JavaScript.

const PinIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 14.5s4.5-4.6 4.5-8.2A4.5 4.5 0 0 0 3.5 6.3c0 3.6 4.5 8.2 4.5 8.2Z" /><circle cx="8" cy="6.3" r="1.7" /></svg>
);
const OfficeIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 14.5h12M3.5 14.5V3.5h6v11M9.5 7h3v7.5" /><path d="M5.5 6h2M5.5 8.5h2M5.5 11h2" /></svg>
);
const RoofIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1.5 8.5 8 3l6.5 5.5" /><path d="M3.5 7v6.5h9V7" /><path d="M6.5 13.5v-3h3v3" /></svg>
);
const SearchIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="9" cy="9" r="5.5" /><path d="m13.2 13.2 4 4" /></svg>
);

const matches = (card, q, filter) => (!q || card.terms.includes(q)) && (filter === 'all' || card.tags.includes(filter));

export default function LocExplorer({ label, heading, text, counties = [], cities = [], places = [], placesHeading, placesText, filters = [], placeholder = 'Search for a city…' }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const q = query.trim().toLowerCase();
  const shown = useMemo(
    () => ({
      counties: counties.filter((c) => matches(c, q, filter)).map((c) => c.key),
      cities: cities.filter((c) => matches(c, q, filter)).map((c) => c.key),
      places: places.filter((c) => matches(c, q, filter)).map((c) => c.key),
    }),
    [counties, cities, places, q, filter]
  );
  const total = counties.length + cities.length + places.length;
  const count = shown.counties.length + shown.cities.length + shown.places.length;
  const filtered = q || filter !== 'all';
  // Only the filters that have something to show
  const options = filters.filter((f) => f.value === 'all' || [...counties, ...cities, ...places].some((c) => c.tags.includes(f.value)));

  return (
    <section className="lc-section lc-hub" id="explore" aria-labelledby="lc-hub-title">
      <div className="lc-wrap">
        <form className="lc-tools" role="search" onSubmit={(e) => e.preventDefault()}>
          <label className="lc-search">
            <SearchIcon />
            <span className="sr-only">Search the cities we serve</span>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} autoComplete="off" />
          </label>
          {options.length > 2 && (
            <label className="lc-select">
              <span className="sr-only">Filter</span>
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                {options.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </label>
          )}
        </form>

        <div className="lc-hub-head">
          {label && <p className="lc-kicker">{label}</p>}
          <h2 id="lc-hub-title">{heading}</h2>
          {text && <p>{text}</p>}
          <p className="lc-count" aria-live="polite">
            {filtered ? `Showing ${count} of ${total}` : ''}
          </p>
        </div>

        {counties.length > 0 && (
          <ul className="lc-grid lc-grid-county">
            {counties.map((c) => (
              <li key={c.key} hidden={!shown.counties.includes(c.key)}>
                <article className="lc-xcard">
                  <div className="lc-xcard-img">
                    <Image src={c.image} alt="" fill sizes="(min-width: 1100px) 22vw, (min-width: 621px) 45vw, 100vw" quality={60} style={{ objectPosition: c.position }} />
                  </div>
                  <div className="lc-xcard-body">
                    <h3>
                      <Link href={c.href}>{c.name}</Link>
                    </h3>
                    <ul className="lc-facts">
                      <li>
                        <span className="lc-fact-ico"><RoofIcon /></span>
                        {c.counts.cities ? `${c.counts.cities} city pages, ${c.counts.places} places served` : `${c.counts.places} places served`}
                      </li>
                      <li>
                        <span className="lc-fact-ico"><OfficeIcon /></span>
                        {c.offices ? `${c.offices} QRS office${c.offices > 1 ? 's' : ''} in the county` : 'Served from our nearby offices'}
                      </li>
                    </ul>
                    <p className="lc-pills"><span>County guide</span></p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}

        {cities.length > 0 && (
          <ul className="lc-grid">
            {cities.map((c) => (
              <li key={c.key} hidden={!shown.cities.includes(c.key)}>
                <article className="lc-xcard">
                  <div className="lc-xcard-img">
                    <Image src={c.image} alt="" fill sizes="(min-width: 1100px) 28vw, (min-width: 621px) 45vw, 100vw" quality={60} style={{ objectPosition: c.position }} />
                  </div>
                  <div className="lc-xcard-body">
                    <h3>
                      <Link href={c.href}>{c.name}</Link>
                    </h3>
                    <ul className="lc-facts">
                      <li>
                        <span className="lc-fact-ico"><PinIcon /></span>
                        {c.county}
                      </li>
                      <li>
                        <span className="lc-fact-ico"><OfficeIcon /></span>
                        {c.office ? `Home of our ${c.office}` : c.nearest ? `Nearest office: ${c.nearest.name}` : 'Served from our offices'}
                      </li>
                      {c.projects > 0 && (
                        <li>
                          <span className="lc-fact-ico"><RoofIcon /></span>
                          {c.projects === 1 ? 'A recent project nearby' : `${c.projects} recent projects nearby`}
                        </li>
                      )}
                    </ul>
                    {c.hoods.length > 0 && (
                      <p className="lc-pills">
                        {c.hoods.map((h) => (
                          <span key={h}>{h}</span>
                        ))}
                      </p>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}

        {places.length > 0 && (
          <div className="lc-places-wrap" hidden={!shown.places.length}>
            {placesHeading && <h3 className="lc-places-title">{placesHeading}</h3>}
            {placesText && <p className="lc-places-text">{placesText}</p>}
            <ul className="lc-places">
              {places.map((p) => (
                <li key={p.key} hidden={!shown.places.includes(p.key)}>
                  {p.href ? (
                    <Link href={p.href}>
                      <b>{p.name}</b>
                      <small>{p.county}</small>
                    </Link>
                  ) : (
                    <span>
                      <b>{p.name}</b>
                      <small>{p.county}</small>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {filtered && count === 0 && (
          <div className="lc-empty">
            <p>
              <b>No match for “{query.trim() || 'this filter'}”.</b> We may still cover you: check your ZIP code on the{' '}
              <Link href="/service-areas/#service-area">service area map</Link> or call <a href={TEL}>{PHONE}</a>.
            </p>
            <button type="button" className="btn btn-line" onClick={() => { setQuery(''); setFilter('all'); }}>
              Show every place
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
