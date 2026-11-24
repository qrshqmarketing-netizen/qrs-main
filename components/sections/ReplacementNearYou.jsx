import Image from 'next/image';
import Mark from '@/components/ui/Mark';
import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import { REGIONS, LOCATIONS, cityPath, regionPath } from '@/data/locations';
import { replacementProjectsByRegion } from '@/data/projects';
import { OFFICES } from '@/data/site';
import './ReplacementNearYou.css';

// "Roof replacement near you" on /roof-replacement/ (owner, November 24 2026, from a competitor analysis: "roof replacement near me" is a
// large, low-difficulty search, and local proof beats thin city pages). Every roof we have replaced, grouped by county, each card linking to its
// project page, the county page and the city pages in that county, plus who pulls the permit. Built from the project pages, so a new
// replacement project shows up here by itself. Lives inside main.svc (HubPage), so it uses the sv- section classes.
const PER_REGION = 6;

const officeLinks = () =>
  OFFICES.map((o) => {
    const city = LOCATIONS.find((l) => l.slug === o.citySlug);
    return city ? `[${city.city}](${cityPath(city.slug)})` : o.name;
  });

const list = (items) => (items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`);

export default function ReplacementNearYou() {
  const groups = replacementProjectsByRegion(REGIONS);
  if (!groups.length) return null;
  const total = groups.reduce((n, g) => n + g.projects.length, 0);
  return (
    <section className="sv-section sv-bg-white rny" id="near-you" aria-labelledby="rny-h">
      <div className="sv-wrap">
        <div className="sv-head">
          <h2 id="rny-h">
            <Mark text="Roof replacement __near__ you" />
          </h2>
          <p>
            <Rich
              text={`Looking for roof replacement near you? These are ${total} roofs our roofers have replaced, grouped by county, each with its photos and how the work was done. We work from offices in ${list(officeLinks())}, and we pull the permit with your city’s building department, or the county’s in unincorporated areas. Our [guide to roofing permits](/blog/roofing-permits-los-angeles/) explains how that works.`}
            />
          </p>
        </div>
        {groups.map(({ region, projects }) => {
          const cities = LOCATIONS.filter((l) => l.region === region.slug);
          return (
            <div className="rny-region" key={region.slug}>
              <h3>
                <SiteLink href={regionPath(region.slug)}>Roof replacements in {region.name}</SiteLink>
              </h3>
              <ul className="rny-grid">
                {projects.slice(0, PER_REGION).map((p) => (
                  <li key={p.href}>
                    <SiteLink href={p.href} className="rny-card">
                      <span className="rny-img">{p.image && <Image src={p.image} alt={p.alt || ''} fill sizes="(min-width: 1100px) 30vw, (min-width: 621px) 45vw, 100vw" quality={60} loading="lazy" />}</span>
                      <b>{p.label || p.title}</b>
                      <span>{p.caption}</span>
                    </SiteLink>
                  </li>
                ))}
              </ul>
              {(projects.length > PER_REGION || cities.length > 0) && (
                <p className="rny-more">
                  {projects.length > PER_REGION && (
                    <>
                      <SiteLink href="/projects/">
                        All {projects.length} in {region.name} on our projects map
                      </SiteLink>
                      {cities.length > 0 && ' · '}
                    </>
                  )}
                  {cities.length > 0 && (
                    <>
                      Roofers near you:{' '}
                      {cities.map((c, i) => (
                        <span key={c.slug}>
                          {i > 0 && ', '}
                          <SiteLink href={cityPath(c.slug)}>{c.city}</SiteLink>
                        </span>
                      ))}
                    </>
                  )}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
