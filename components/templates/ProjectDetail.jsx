import Breadcrumbs from '@/components/sections/Breadcrumbs';
import MorphSlider from '@/components/sections/MorphSlider';
import JsonLd from '@/components/ui/JsonLd';
import Rich from '@/components/ui/Rich';
import { HOME, PROJECTS_LINK } from '@/data/catalog';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';
import './ProjectDetail.css';

// A project page (e.g. /projects/shingle-roof-replacements-90731/): a photo slider, then the story.
// page: a project from data/pages/ ({ path, title, description, image, photos: [{ src, alt }], paragraphs }).
// The first photo in `photos` is also `image` (share image, structured data, Projects map).
export const projectMetadata = (page) => pageMetadata({ title: page.title, description: page.description, path: page.path });

export default function ProjectDetail({ page }) {
  const crumbs = [HOME, PROJECTS_LINK, { label: page.title, href: page.path }];
  const slides = page.photos.map((p) => ({ image: p.src, caption: p.alt }));
  const schema = pageJsonLd({ path: page.path, title: page.title, description: page.description, crumbs, image: page.image });
  return (
    <main id="top" className="project-detail">
      <JsonLd data={schema} />
      <section className="project-detail-gallery" aria-label="Project photos">
        <div className="container">
          <figure className="project-detail-photo">
            <MorphSlider items={slides} transition="fade" radius={14} autoplay loop captionBelowOnMobile aria-label="Project photos" />
          </figure>
        </div>
      </section>
      <article className="project-detail-story">
        <div className="container">
          <Breadcrumbs items={crumbs} />
          <div className="project-detail-copy">
            <h1>{page.title}</h1>
            {page.paragraphs.map((paragraph) => (
              <p key={paragraph}>
                <Rich text={paragraph} />
              </p>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
