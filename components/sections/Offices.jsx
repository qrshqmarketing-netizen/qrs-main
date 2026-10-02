import SiteLink from '@/components/ui/SiteLink';
import ScrollParallaxImage from './ScrollParallaxImage';
import { ArrowRight } from '@/components/ui/icons';
import { cityPath, findCity } from '@/data/locations';
import { OFFICES, PHONE, TEL } from '@/data/site';
import './Offices.css';

// One office: address, phone, directions and (optionally) a link to the city page it sits in.
// `photo={false}` leaves out the office's photo, so it matches cards without one.
export function OfficeCard({ office, cityLink = true, photo = true }) {
  const { street, city, region, postalCode } = office.address;
  const image = photo && office.image;
  return (
    <div className={'office-card' + (image ? ' office-card-photo' : '')}>
      {image && (
        <div className="office-photo">
          <ScrollParallaxImage src={office.image} alt={office.imageAlt || ''} sizes="(min-width: 901px) 560px, 100vw" />
        </div>
      )}
      <h3>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.5a7 7 0 0 0-7 7c0 5.2 7 12 7 12s7-6.8 7-12a7 7 0 0 0-7-7Z" />
          <circle cx="12" cy="9.5" r="2.6" />
        </svg>
        {office.name}
      </h3>
      <address>
        {street}
        <br />
        {city}, {region} {postalCode}
      </address>
      <a className="office-phone" href={TEL}>{PHONE}</a>
      <div className="office-links">
        <a href={office.mapUrl} target="_blank" rel="noopener">Get directions</a>
        {cityLink && (
          <SiteLink href={cityPath(office.citySlug)}>
            {findCity(office.citySlug).city} roofing <ArrowRight />
          </SiteLink>
        )}
      </div>
    </div>
  );
}

// Service Areas and Contact Us pages: every office (data/site.js). `photos={false}`: plain, matching cards.
export default function Offices({ heading = 'Our Offices', sub, note, photos = true }) {
  return (
    <section className="offices tile-pattern">
      <div className="container">
        <div className="section-head">
          <h2>{heading}</h2>
          {sub && <p>{sub}</p>}
        </div>
        <div className="office-grid">
          {OFFICES.map((office) => (
            <OfficeCard office={office} photo={photos} key={office.name} />
          ))}
        </div>
        {note && <p className="office-note">{note}</p>}
      </div>
    </section>
  );
}
