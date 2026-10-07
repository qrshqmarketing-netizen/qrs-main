import Image from 'next/image';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import './Studio.css';

// Projects as large photos that stack: each card is pinned just below the header while the next one scrolls up over it, so the cards pile on top of each
// other as the page moves (CSS `position: sticky`, offsets from --i). Each has a small caption card (place, headline, link). Used on the home page (the
// newest project pages) and on the city pages (the projects in or near that city, data/projects.js projectsNear).
// projects: project pages ({ path, title, place, image, imageAlt }) or gallery photos ({ href?, title, place, image, alt }); a photo with no page has no link.
export default function StudioProjects({ projects, label = 'Featured projects', heading = 'Roofs we have finished, from tear-off to the last row', allLink = true, id }) {
  if (!projects?.length) return null;
  return (
    <section className="st-section st-projects tinted" id={id}>
      <div className="container">
        <div className="st-split st-head">
          <p className="st-label">{label}</p>
          <div>
            <h2>{heading}</h2>
            {allLink && (
              <SiteLink className="st-link" href="/projects/">
                See all projects <ArrowRight />
              </SiteLink>
            )}
          </div>
        </div>
        <div className="st-proj-list">
          {projects.map((p, i) => {
            const href = p.href || p.path;
            const place = (p.place || '').replace(/,?\s*CA\b/, '');
            const caption = (
              <>
                {place && <small>{place}</small>}
                <b>{p.title}</b>
                {href && (
                  <span>
                    View project <ArrowRight />
                  </span>
                )}
              </>
            );
            return (
              <article className="st-proj" style={{ '--i': i }} key={p.image}>
                <Image src={p.image} alt={p.imageAlt || p.alt || ''} fill sizes="(min-width: 1540px) 1500px, 100vw" quality={75} loading={i === 0 ? 'eager' : 'lazy'} />
                {href ? (
                  <SiteLink className="st-proj-card" href={href}>
                    {caption}
                  </SiteLink>
                ) : (
                  <div className="st-proj-card">{caption}</div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
