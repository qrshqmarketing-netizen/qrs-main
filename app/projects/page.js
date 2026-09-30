import Breadcrumbs from '@/components/sections/Breadcrumbs';
import ProjectCarousel from '@/components/sections/ProjectCarousel';
import Rich from '@/components/ui/Rich';
import JsonLd from '@/components/ui/JsonLd';
import { HOME, PROJECTS_LINK } from '@/data/catalog';
import { MID_WILSHIRE_PROJECT } from '@/data/pages/mid-wilshire-project';
import { PROJECTS_PAGE as page } from '@/data/pages/projects';
import { RECENT_WORK, RECENT_WORK_SUB } from '@/data/recentWork';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';
import './projects.css';

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: PROJECTS_LINK.href });

const CRUMBS = [HOME, PROJECTS_LINK];
const schema = pageJsonLd({
  path: PROJECTS_LINK.href,
  title: page.metaTitle,
  description: page.metaDescription,
  type: 'CollectionPage',
  crumbs: CRUMBS,
  image: MID_WILSHIRE_PROJECT.image,
});

export default function ProjectsPage() {
  return (
    <main id="top" className="projects-hub">
      <JsonLd data={schema} />
      <section className="projects-hub-intro">
        <div className="container">
          <Breadcrumbs items={CRUMBS} />
          <div className="projects-hub-copy">
            <h1>{page.hero.heading}</h1>
            <p><Rich text={page.hero.intro} /></p>
          </div>
        </div>
      </section>
      <ProjectCarousel
        heading={page.gallery.heading}
        sub={RECENT_WORK_SUB}
        projects={RECENT_WORK}
        id="work"
        pattern
      />
    </main>
  );
}
