import { QhHero, QhProjectWall } from '@/components/home/QrsSections';
import ProjectMap from '@/components/sections/ProjectMap';
import RoofCheck from '@/components/sections/RoofCheck';
import TrustLogos from '@/components/sections/TrustLogos';
import JsonLd from '@/components/ui/JsonLd';
import { HOME, PROJECTS_LINK } from '@/data/catalog';
import { MID_WILSHIRE_PROJECT } from '@/data/pages/mid-wilshire-project';
import { heroOutcome } from '@/data/heroOutcomes';
import { PROJECT_PAGES, PROJECTS_PAGE as page } from '@/data/pages/projects';
import { noPlace } from '@/lib/headings';
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

// Projects page in the new home page's theme (owner, November 6 2026; components/home/QrsSections.jsx, QrsHome.css): the dark blue hero with the
// breadcrumb trail, the H1 (the heading with its outcome line inside it, as before), the page's intro and its own visual, a tilted wall of every
// project's cover photo drifting in three columns (each a link to its project), the manufacturer logos, then the review logos, the project map
// with every project, and the request form. Same meta, H1, structured data, photos and links as before.
export default function ProjectsPage() {
  return (
    <main id="top" className="qh projects-hub">
      <JsonLd data={schema} />
      <QhHero
        crumbs={CRUMBS}
        title={
          <>
            {noPlace(page.hero.heading)}
            <span className="sr-only"> — </span>
            <span className="qh-h1-outcome">{heroOutcome('/projects/')}</span>
          </>
        }
        text={page.hero.intro}
        badges
        visual={<QhProjectWall projects={PROJECT_PAGES} />}
      />
      {/* Google, BBB and Yelp logos linking to our profiles (owner, November 2 2026) */}
      <TrustLogos />
      <ProjectMap projects={PROJECT_PAGES} heading="Find roofing projects near you" />
      <RoofCheck tone="white" />
    </main>
  );
}
