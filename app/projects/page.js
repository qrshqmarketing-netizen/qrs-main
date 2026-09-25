import CardGrid from '@/components/sections/CardGrid';
import DifferenceBand from '@/components/sections/DifferenceBand';
import FinalCta from '@/components/sections/FinalCta';
import PageHero from '@/components/sections/PageHero';
import ProjectGallery from '@/components/sections/ProjectGallery';
import RoofCheck from '@/components/sections/RoofCheck';
import JsonLd from '@/components/ui/JsonLd';
import { GROUPS, HOME, PROJECTS_LINK, SINGLES, typeCard } from '@/data/catalog';
import { PROJECTS_PAGE as page } from '@/data/pages/projects';
import { allProjects } from '@/data/projects';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: PROJECTS_LINK.href });

const CRUMBS = [HOME, PROJECTS_LINK];
const HERO_IMAGE = '/images/roof-drone-palms.webp';
const schema = pageJsonLd({ path: PROJECTS_LINK.href, title: page.metaTitle, description: page.metaDescription, type: 'CollectionPage', crumbs: CRUMBS, image: HERO_IMAGE });

// Projects page: every project in data/projects.js (temporary stand-ins until the CRM feed), then the services behind them
export default function ProjectsPage() {
  return (
    <main id="top">
      <JsonLd data={schema} />
      <PageHero
        crumbs={CRUMBS}
        eyebrow="Projects"
        title={page.hero.heading}
        intro={page.hero.intro}
        image={HERO_IMAGE}
        imageAlt="Aerial view of a dark shingle hip roof on a home with palm trees"
        imagePosition="center 45%"
      />
      <ProjectGallery heading={page.gallery.heading} sub={page.gallery.sub} projects={allProjects()} all id="work" pattern />
      <CardGrid heading="Explore Our Roofing Services" intro="See how we handle each kind of roof, from a single repair to a whole community." cards={[GROUPS.shingle, GROUPS.tile, GROUPS.flat, GROUPS.metal, SINGLES.hoa, GROUPS.commercial].map(typeCard)} />
      <DifferenceBand />
      <RoofCheck tone="white" />
      <FinalCta />
    </main>
  );
}
