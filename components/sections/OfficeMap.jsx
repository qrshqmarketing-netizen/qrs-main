import { ArrowRight } from '@/components/ui/icons';
import { PHONE, TEL } from '@/data/site';
import './OfficeMap.css';

// The office's Google Maps listing on its city page (owner, October 27 2026; first on Woodland Hills): the embed Google gives for the listing
// (OFFICES[].mapEmbed in data/site.js), lazy-loaded so it costs nothing until it scrolls near, with the address, phone (the office's own, else the
// main number) and a directions link beside it. It replaces the office card in the city intro (LocationPage.jsx), so the address shows once.
// '08:00' -> '8:00 AM'
const time = (t) => {
  const [h, m] = t.split(':').map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
};

export default function OfficeMap({ office, city }) {
  const a = office.address;
  return (
    <section className="section office-map" aria-labelledby="officeMapTitle">
      <div className="container office-map-inner">
        <div className="office-map-copy">
          <h2 id="officeMapTitle">Find our {city} office</h2>
          <p className="office-map-address">
            <b>Quality Roofing Specialists, {office.name}</b>
            <br />
            {a.street}
            <br />
            {a.city}, {a.region} {a.postalCode}
          </p>
          <p>
            <a href={office.tel || TEL}>{office.phone || PHONE}</a>
          </p>
          {/* An office with its own hours (San Jose) shows them; the others share the business hours on the Contact page */}
          {office.hours && (
            <dl className="office-map-hours">
              {office.hours.map((h) => (
                <div key={h.days.join()}>
                  <dt>{h.days.length > 1 ? `${h.days[0]} – ${h.days.at(-1)}` : h.days[0]}</dt>
                  <dd>{time(h.opens)} – {time(h.closes)}</dd>
                </div>
              ))}
              {office.closed && (
                <div>
                  <dt>{office.closed}</dt>
                  <dd>Closed</dd>
                </div>
              )}
            </dl>
          )}
          {/* Directions: the office's Google listing, else a Google Maps search of the address */}
          {(office.gbpUrl || office.mapUrl) && (
            <a className="btn btn-line office-map-link" href={office.gbpUrl || office.mapUrl} target="_blank" rel="noopener">
              Get directions <ArrowRight />
            </a>
          )}
        </div>
        <div className="office-map-frame">
          <iframe
            src={office.mapEmbed}
            title={`Map of the Quality Roofing Specialists ${office.name} in ${a.city}`}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
