import Breadcrumbs from '@/components/sections/Breadcrumbs';
import ProjectMap from '@/components/sections/ProjectMap';
import StudioProjects from '@/components/studio/StudioProjects';
import Rich from '@/components/ui/Rich';
import JsonLd from '@/components/ui/JsonLd';
import { HOME, PROJECTS_LINK } from '@/data/catalog';
import { MID_WILSHIRE_PROJECT } from '@/data/pages/mid-wilshire-project';
import { heroOutcome } from '@/data/heroOutcomes';
import { PROJECT_PAGES, PROJECTS_PAGE as page } from '@/data/pages/projects';
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
            <h1>
              {page.hero.heading}
              <span className="sr-only"> — </span>
              <span className="projects-hub-outcome">{heroOutcome('/projects/')}</span>
            </h1>
            <p><Rich text={page.hero.intro} /></p>
            {page.hero.more && <p className="projects-hub-more"><Rich text={page.hero.more} /></p>}
          </div>
        </div>
      </section>
      <ProjectMap projects={PROJECT_PAGES} />
      <StudioProjects projects={PROJECT_PAGES} label="All projects" heading="Every project, newest first" allLink={false} />
    </main>
  );
}
