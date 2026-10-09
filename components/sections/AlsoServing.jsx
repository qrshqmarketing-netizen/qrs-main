import SiteLink from '@/components/ui/SiteLink';
import Mark from '@/components/ui/Mark';
import { ALSO_SERVING, regionPath } from '@/data/locations';
import { PHONE } from '@/data/site';
import './ServiceArea.css';

// "We also serve": the places inside our service area that have no page of their own, as plain names grouped by county (ALSO_SERVING in
// data/locations.js). Each has a pin on the service area map. region: show only that county's places (its county page); without it, every county.
export default function AlsoServing({ region, heading = 'Other Places We __Serve__', sub }) {
  const groups = ALSO_SERVING.filter((g) => !region || g.region === region);
  if (!groups.length) return null;
  return (
    <section className="area" id="also-serving">
      <div className="container">
        <div className="sa-also">
          <h3><Mark text={heading} /></h3>
          <p className="sa-also-sub">{sub || 'Our service area reaches well beyond the cities with their own page. If you are in or near any of these places, we cover you.'}</p>
          <div className={'sa-also-grid' + (region ? ' sa-also-one' : '')}>
            {groups.map((group) => (
              <div className="sa-also-group" key={group.name}>
                <h4>{region ? 'Cities' : <SiteLink href={regionPath(group.region)}>{group.name}</SiteLink>}</h4>
                <ul>
                  {group.places.map((place) => (
                    <li key={place}>{place}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="sa-also-note">Don&rsquo;t see your city? Enter your ZIP code in the <SiteLink href="/service-areas/#service-area">service area map</SiteLink> or call <b>{PHONE}</b> and we&rsquo;ll let you know.</p>
        </div>
      </div>
    </section>
  );
}
