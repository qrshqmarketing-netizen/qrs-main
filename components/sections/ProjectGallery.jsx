import Image from 'next/image';
import SiteLink from '@/components/ui/SiteLink';
import { findCity } from '@/data/locations';
import './ProjectGallery.css';

// Tile counts the bento layouts are drawn for (ProjectGallery.css)
const LAYOUTS = [6, 4, 3, 2, 1];

// Splits projects into bento grids of the sizes above: 11 projects → grids of 6, 4 and 1
function grids(projects, all) {
  const out = [];
  let rest = projects;
  while (rest.length > 0) {
    const n = LAYOUTS.find((size) => rest.length >= size);
    out.push(rest.slice(0, n));
    rest = all ? rest.slice(n) : [];
  }
  return out;
}

// Where a real project is ("Bungalow Heaven, Pasadena"); stand-ins have no place, so they show their label instead
const place = (p, city) => (p.city ? [p.area, findCity(p.city)?.city || city].filter(Boolean).join(', ') : '');

// Bento photo grid of roofing projects (city pages and the Projects page). projects: see data/projects.js.
// Tiles without a photo show roof-type artwork; a tile with `href` links to that service page.
// all: show every project in several grids (Projects page); otherwise up to 6.
export default function ProjectGallery({ city, heading, sub, projects = [], all = false, id = 'projects', pattern = false }) {
  if (!projects.length) return null;
  return (
    <section className={'gallery' + (pattern ? ' tile-pattern' : '')} id={id}>
      <div className="container">
        <div className="section-head">
          <h2>{heading}</h2>
          {sub && <p>{sub}</p>}
        </div>
        {grids(projects, all).map((group, g) => (
          <ul className={`bento bento-${group.length}`} key={g}>
            {group.map((p, i) => (
              <li className="bento-tile" key={`${p.title}-${i}`}>
                <div className={`bento-media art ${p.scene || 'scene-shingle'}`}>
                  {p.image && (
                    <Image
                      src={p.image}
                      alt={p.alt || ''}
                      fill
                      sizes="(min-width: 901px) 580px, 100vw"
                      style={p.position ? { objectPosition: p.position } : undefined}
                    />
                  )}
                </div>
                <div className="bento-caption">
                  <span>{place(p, city) || p.label}</span>
                  <h3>{p.href ? <SiteLink className="bento-link" href={p.href}>{p.title}</SiteLink> : p.title}</h3>
                </div>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
