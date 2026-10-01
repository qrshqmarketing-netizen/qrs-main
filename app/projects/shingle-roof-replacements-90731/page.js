import Breadcrumbs from '@/components/sections/Breadcrumbs';
import ScrollParallaxImage from '@/components/sections/ScrollParallaxImage';
import JsonLd from '@/components/ui/JsonLd';
import Rich from '@/components/ui/Rich';
import { HOME, PROJECTS_LINK } from '@/data/catalog';
import { SAN_PEDRO_PROJECT as page } from '@/data/pages/san-pedro-project';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';
import '@/components/templates/ProjectDetail.css';

export const metadata = pageMetadata({ title: page.title, description: page.description, path: page.path });

const CRUMBS = [HOME, PROJECTS_LINK, { label: page.title, href: page.path }];
const schema = pageJsonLd({
  path: page.path,
  title: page.title,
  description: page.description,
  crumbs: CRUMBS,
  image: page.image,
});

export default function SanPedroProjectPage() {
  return (
    <main id="top" className="project-detail">
      <JsonLd data={schema} />
      <section className="project-detail-gallery" aria-label="Project photos">
        <div className="container">
          <figure className="project-detail-photo">
            <ScrollParallaxImage src={page.image} alt={page.imageAlt} sizes="(max-width: 900px) 100vw, 1200px" preload />
          </figure>
        </div>
      </section>
      <article className="project-detail-story">
        <div className="container">
          <Breadcrumbs items={CRUMBS} />
          <div className="project-detail-copy">
            <h1>{page.title}</h1>
            {page.paragraphs.map((paragraph) => <p key={paragraph}><Rich text={paragraph} /></p>)}
          </div>
        </div>
      </article>
    </main>
  );
}
