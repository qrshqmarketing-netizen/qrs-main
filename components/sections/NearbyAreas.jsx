import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import { cityPath, findCity } from '@/data/locations';
import './NearbyAreas.css';

// City pages: links to the closest other service areas
export default function NearbyAreas({ city, nearby = [] }) {
  const cities = nearby.map(findCity).filter(Boolean);
  if (!cities.length) return null;
  return (
    <section className="nearby">
      <div className="container nearby-inner">
        <h2>Also serving near {city}</h2>
        <ul className="chips">
          {cities.map((c) => (
            <li key={c.slug}>
              <SiteLink className="chip" href={cityPath(c.slug)}>
                {c.city} roofing <ArrowRight />
              </SiteLink>
            </li>
          ))}
          <li>
            <SiteLink className="chip chip-all" href="/service-areas/">
              All service areas <ArrowRight />
            </SiteLink>
          </li>
        </ul>
      </div>
    </section>
  );
}
