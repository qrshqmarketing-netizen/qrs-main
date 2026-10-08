import Image from 'next/image';
import { Fragment } from 'react';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import FinalCta from '@/components/sections/FinalCta';
import RelatedLinks from '@/components/sections/RelatedLinks';
import ProjectCounter from '@/components/project/ProjectCounter';
import ProjectGallery from '@/components/project/ProjectGallery';
import JsonLd from '@/components/ui/JsonLd';
import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import { HOME, PROJECTS_LINK } from '@/data/catalog';
import { relatedLinks } from '@/data/content';
import { PROJECT_PAGES } from '@/data/pages/projects';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';
import './ProjectDetail.css';

// A project page (e.g. /projects/shingle-roof-replacements-90731/), in the studio style: a full-bleed cover photo with the title and the ZIP code rolling up
// like an odometer; a facts column (where, what, how many photos) beside the story's lead paragraph; the rest of the story in sections; every photo in a
// gallery you can switch between Detail (editorial rows), Grid and Slider, each opening full screen; then the next project and the related services.
// page: a project from data/pages/ ({ path, title, metaTitle?, description, image, imageAlt, place, label, photos: [{ src, alt }], paragraphs, headings?, related? }).
// metaTitle: a shorter <title> than `title` (which is also the headline) when that one runs past ~60 characters.
// headings: { position: 'text' } labels the paragraph at that position; related: pages shown as "Related services".
// The first photo in `photos` is also `image` (share image, structured data, Projects map). The facts come from the data: `place`, the work named in the
// title (the words before the last " in ") and the photo count; the number is the ZIP code found in `place`.
export const projectMetadata = (page) => pageMetadata({ title: page.metaTitle || page.title, description: page.description, path: page.path });

const workOf = (title) => {
  const at = title.lastIndexOf(' in ');
  return at > 0 ? title.slice(0, at) : title;
};

export default function ProjectDetail({ page }) {
  const crumbs = [HOME, PROJECTS_LINK, { label: page.title, href: page.path }];
  const schema = pageJsonLd({ path: page.path, title: page.title, description: page.description, crumbs, image: page.image });
  const place = (page.place || '').replace(/,?\s*CA\b/, '');
  const zip = (page.place || '').match(/\b9\d{4}\b/)?.[0];
  const [lead, ...rest] = page.paragraphs;
  const at = PROJECT_PAGES.findIndex((p) => p.path === page.path);
  const next = PROJECT_PAGES.length > 1 ? PROJECT_PAGES[(at + 1) % PROJECT_PAGES.length] : null;
  const words = page.title.split(' ');
  const cut = Math.ceil(words.length / 2);

  return (
    <main id="top" className="project-detail">
      <JsonLd data={schema} />

      <section className="pd-hero" aria-label={page.title}>
        <Image className="pd-hero-img" src={page.image} alt={page.imageAlt || ''} fill sizes="100vw" quality={75} preload fetchPriority="high" />
        <div className="pd-hero-shade" aria-hidden="true"></div>
        <div className="container pd-hero-inner">
          <Breadcrumbs items={crumbs} />
          <div className="pd-hero-bottom">
            <h1>
              <span>{words.slice(0, cut).join(' ')}</span> <span>{words.slice(cut).join(' ')}</span>
            </h1>
            {zip && <ProjectCounter value={zip} label="ZIP code" />}
          </div>
        </div>
      </section>

      <section className="pd-intro">
        <div className="container pd-intro-grid">
          <dl className="pd-facts">
            <div>
              <dt>Location</dt>
              <dd>{place}</dd>
            </div>
            <div>
              <dt>Work</dt>
              <dd>{workOf(page.title)}</dd>
            </div>
            <div>
              <dt>Photos</dt>
              <dd>{page.photos.length} from the job</dd>
            </div>
          </dl>
          <p className="pd-lead">
            <Rich text={lead} />
          </p>
        </div>
      </section>

      <ProjectGallery photos={page.photos} name={page.title} />

      <article className="pd-story">
        <div className="container">
          {rest.map((paragraph, i) => (
            <Fragment key={paragraph}>
              <div className="pd-story-row">
                <h2>{page.headings?.[i + 1] || ''}</h2>
                <p>
                  <Rich text={paragraph} />
                </p>
              </div>
            </Fragment>
          ))}
        </div>
      </article>

      {next && next.path !== page.path && (
        <section className="pd-next" aria-label="Next project">
          <div className="container">
            <p className="pd-next-label">Next project</p>
            <SiteLink className="pd-next-card" href={next.path}>
              <span className="pd-next-img">
                <Image src={next.image} alt="" fill sizes="(min-width: 901px) 50vw, 100vw" quality={65} loading="lazy" />
              </span>
              <span className="pd-next-text">
                <small>{(next.place || '').replace(/,?\s*CA\b/, '')}</small>
                <b>{next.title}</b>
                <span>
                  View project <ArrowRight />
                </span>
              </span>
            </SiteLink>
          </div>
        </section>
      )}

      <RelatedLinks heading="Related services" links={relatedLinks(page.related)} />
      <FinalCta />
    </main>
  );
}
