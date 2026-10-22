import Breadcrumbs from '@/components/sections/Breadcrumbs';
import ProjectMap from '@/components/sections/ProjectMap';
import JsonLd from '@/components/ui/JsonLd';
import { HOME, PROJECTS_LINK } from '@/data/catalog';
import { MID_WILSHIRE_PROJECT } from '@/data/pages/mid-wilshire-project';
import { heroOutcome } from '@/data/heroOutcomes';
import { PROJECT_PAGES, PROJECTS_PAGE as page } from '@/data/pages/projects';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';
import './projects.css';
import RoofCheck from '@/components/sections/RoofCheck';
import HomeWork from '@/components/home/HomeWork';
import '@/components/home/HomeClean.css';
import '@/components/home/CleanPages.css';
import AreaLinks from '@/components/home/AreaLinks';
import { AREA_LINKS } from '@/data/nearYou';

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
    <main id="top" className="projects-hub clean-page">
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
          </div>
        </div>
      </section>
      <ProjectMap projects={PROJECT_PAGES} heading="Find roofing projects near you" />
      {/* Every project as a card under the map (the clean format, October 21 2026) */}
      <HomeWork heading="Every project, __newest__ first" projects={PROJECT_PAGES} />
      <RoofCheck tone="white" />
      <AreaLinks {...AREA_LINKS} />
    </main>
  );
}
