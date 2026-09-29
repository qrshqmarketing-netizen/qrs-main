import FinalCta from '@/components/sections/FinalCta';
import Hero from '@/components/sections/Hero';
import ProjectCarousel from '@/components/sections/ProjectCarousel';
import RoofCheck from '@/components/sections/RoofCheck';
import JsonLd from '@/components/ui/JsonLd';
import { HOME, PROJECTS_LINK } from '@/data/catalog';
import { PROJECTS_PAGE as page } from '@/data/pages/projects';
import { allProjects } from '@/data/projects';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: PROJECTS_LINK.href });

const CRUMBS = [HOME, PROJECTS_LINK];
const HERO_IMAGE = '/images/projects-hero-round-roof-drone-view.webp';
const schema = pageJsonLd({ path: PROJECTS_LINK.href, title: page.metaTitle, description: page.metaDescription, type: 'CollectionPage', crumbs: CRUMBS, image: HERO_IMAGE });

// Projects page: every project in data/projects.js (temporary stand-ins until the CRM feed), then the services behind them
export default function ProjectsPage() {
  return (
    <main id="top">
      <JsonLd data={schema} />
      <Hero
        crumbs={CRUMBS}
        eyebrow="Projects"
        title={page.hero.heading}
        intro={page.hero.intro}
        image={HERO_IMAGE}
        imageAlt="Aerial view of a round flat roof surrounded by trees"
        imagePosition="center 45%"
      />
      <ProjectCarousel heading={page.gallery.heading} sub={page.gallery.sub} projects={allProjects()} id="work" pattern />
      <RoofCheck tone="white" />
      <FinalCta />
    </main>
  );
}
