import Image from 'next/image';
import CircledWord from '@/components/ui/HandCircle';
import Mark from '@/components/ui/Mark';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import StudioProjectIndex from './StudioProjectIndex';
import './Studio.css';

// Projects as large photos that stack: each card is pinned just below the header while the next one scrolls up over it, so the cards pile on top of each
// other as the page moves (CSS `position: sticky`, offsets from --i). Each has a small caption card (place, headline, link). Used on the home page (the
// newest project pages) and on the city pages (the projects in or near that city, data/projects.js projectsNear).
// projects: project pages ({ path, title, place, image, imageAlt }) or gallery photos ({ href?, title, place, image, alt }); a photo with no page has no link.
// The title with its ZIP code circled by hand ("... in Granada Hills 91344")
function circleZip(title) {
  const m = /\b9\d{4}\b/.exec(title || '');
  if (!m) return title;
  return (
    <>
      {title.slice(0, m.index)}
      <CircledWord>{m[0]}</CircledWord>
      {title.slice(m.index + m[0].length)}
    </>
  );
}

// more: further project pages listed as rows under the cards (StudioProjectIndex), as on the home page.
// A project as an index row: its page, title, short name, cover photo and photo count (project pages, or the city pages' nearby list)
const toRow = (p) => ({ path: p.path || p.href, title: p.title, label: p.label || p.caption || p.title, image: p.image, photos: typeof p.photos === 'number' ? p.photos : p.photos?.length || 0 });

// layout="list": every project as a hairline row with the hover photo (StudioProjectIndex) instead of the stacked cards (the city pages, to mix it up).
export default function StudioProjects({ projects, label = 'Featured projects', heading = 'Roofs we have finished, from tear-off to the __last row__', allLink = true, more, id, layout = 'cards' }) {
  if (!projects?.length) return null;
  return (
    <section className="st-section st-projects tinted" id={id}>
      <div className="container">
        <div className="st-split st-head">
          <p className="st-label">{label}</p>
          <div>
            <h2><Mark text={heading} /></h2>
            {allLink && (
              <SiteLink className="st-link" href="/projects/">
                See all projects <ArrowRight />
              </SiteLink>
            )}
          </div>
        </div>
        {layout === 'list' ? (
          <StudioProjectIndex label={null} projects={projects.map(toRow)} />
        ) : (
        <div className="st-proj-list">
          {projects.map((p, i) => {
            const href = p.href || p.path;
            const place = (p.place || '').replace(/,?\s*CA\b/, '');
            const caption = (
              <>
                {place && <small>{place}</small>}
                <b>{circleZip(p.title)}</b>
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
        )}
        {more?.length > 0 && (
          <StudioProjectIndex projects={more.map(toRow)} />
        )}
        {allLink && (
          <p className="st-proj-more">
            <SiteLink className="st-link" href="/projects/">
              See all our roofing projects <ArrowRight />
            </SiteLink>
          </p>
        )}
      </div>
    </section>
  );
}
