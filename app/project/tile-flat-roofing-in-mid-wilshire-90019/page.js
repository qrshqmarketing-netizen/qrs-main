import Breadcrumbs from '@/components/sections/Breadcrumbs';
import MorphSlider from '@/components/sections/MorphSlider';
import JsonLd from '@/components/ui/JsonLd';
import Rich from '@/components/ui/Rich';
import { PROJECTS_LINK } from '@/data/catalog';
import { MID_WILSHIRE_PROJECT as page } from '@/data/pages/mid-wilshire-project';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';
import '@/components/templates/ProjectDetail.css';

export const metadata = pageMetadata({ title: page.title, description: page.description, path: page.path });

const CRUMBS = [
  { label: 'Home', href: '/' },
  PROJECTS_LINK,
  { label: page.title, href: page.path },
];
// Slider photos (page.photos; the first is also page.image)
const SLIDES = page.photos.map((p) => ({ image: p.src, caption: p.alt }));

const schema = pageJsonLd({
  path: page.path,
  title: page.title,
  description: page.description,
  crumbs: CRUMBS,
  image: page.image,
});

export default function MidWilshireProjectPage() {
  return (
    <main id="top" className="project-detail">
      <JsonLd data={schema} />
      <section className="project-detail-gallery" aria-label="Project photos">
        <div className="container">
          <figure className="project-detail-photo">
            <MorphSlider items={SLIDES} transition="melt" intensity={0.55} aberration={0.35} drift={0.4} radius={0} autoplay loop aria-label="Project photos" />
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
