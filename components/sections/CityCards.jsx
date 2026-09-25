import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import { citiesIn, cityPath, REGIONS, regionPath } from '@/data/locations';
import './CityCards.css';

// City cards grouped by region. blurbs: { [slug]: 'one line about that city page' }.
// regions: which regions to show (default: all). linkRegions: each region heading links to its region page.
// heading: optional heading instead of the region name (for a page that shows one region).
export default function CityCards({ blurbs = {}, regions = REGIONS.map((r) => r.slug), linkRegions = false, heading }) {
  return (
    <section className="city-cards" id="cities">
      <div className="container">
        {REGIONS.filter((r) => regions.includes(r.slug)).map((r) => (
          <div className="city-county" key={r.slug}>
            <h2>
              {heading ||
                (linkRegions ? (
                  <SiteLink href={regionPath(r.slug)}>
                    {r.name} <ArrowRight />
                  </SiteLink>
                ) : (
                  r.name
                ))}
            </h2>
            <div className="city-grid">
              {citiesIn(r.slug).map((l) => (
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
