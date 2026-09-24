import Image from 'next/image';
import SiteLink from '@/components/ui/SiteLink';
import './ProjectGallery.css';

// Tile counts the bento layouts are drawn for (ProjectGallery.css); extra projects are left out
const LAYOUTS = [6, 4, 3, 2, 1];

// Bento photo grid of roofing projects (city pages). projects: see data/projects.js.
// Tiles without a photo show roof-type artwork; a tile with `href` links to that service page.
export default function ProjectGallery({ city, heading, sub, projects = [] }) {
  const count = LAYOUTS.find((n) => projects.length >= n);
  if (!count) return null;
  return (
    <section className="gallery" id="projects">
      <div className="container">
        <div className="section-head">
          <h2>{heading}</h2>
          {sub && <p>{sub}</p>}
        </div>
        <ul className={`bento bento-${count}`}>
          {projects.slice(0, count).map((p, i) => (
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
                <span>{p.area ? `${p.area}, ${city}` : p.label}</span>
                <h3>{p.href ? <SiteLink className="bento-link" href={p.href}>{p.title}</SiteLink> : p.title}</h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
