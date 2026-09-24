import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import { cityPath, LOCATIONS } from '@/data/locations';
import './CityCards.css';

// Locations page: every city, grouped by county. blurbs: { [slug]: 'one line about that city page' }
export default function CityCards({ blurbs = {} }) {
  const counties = [...new Set(LOCATIONS.map((l) => l.county))];
  return (
    <section className="city-cards" id="cities">
      <div className="container">
        {counties.map((county) => (
          <div className="city-county" key={county}>
            <h2>{county}</h2>
            <div className="city-grid">
              {LOCATIONS.filter((l) => l.county === county).map((l) => (
                <SiteLink className="city-card" href={cityPath(l.slug)} key={l.slug}>
                  <b>{l.city}</b>
                  {blurbs[l.slug] && <span>{blurbs[l.slug]}</span>}
                  <em>
                    {l.city} roofing <ArrowRight />
                  </em>
                </SiteLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
