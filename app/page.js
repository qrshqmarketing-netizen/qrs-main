import FinalCta from '@/components/sections/FinalCta';
import Hero from '@/components/sections/Hero';
import ProjectCarousel from '@/components/sections/ProjectCarousel';
import QrsStandard from '@/components/sections/QrsStandard';
import ReviewSlider from '@/components/sections/ReviewSlider';
import RoofCheck from '@/components/sections/RoofCheck';
import ServiceArea from '@/components/sections/ServiceArea';
import Services from '@/components/sections/Services';
import WhyQrs from '@/components/sections/WhyQrs';
import JsonLd from '@/components/ui/JsonLd';
import { COMMERCIAL_LINK, RESIDENTIAL } from '@/data/catalog';
import { HOME_DESCRIPTION, HOME_TITLE } from '@/data/site';
import { openGraphBase, twitterBase } from '@/lib/seo';
import { pageJsonLd } from '@/lib/structuredData';

export const metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: { ...openGraphBase, url: '/', title: HOME_TITLE, description: HOME_DESCRIPTION },
  twitter: { ...twitterBase, title: HOME_TITLE, description: HOME_DESCRIPTION },
};

// The home page's "Roofing Services" section: just the two top-level categories from the nav.
const HOME_SERVICES = [
  {
    title: 'Residential Roofing',
    schemaName: 'Residential Roofing',
    scene: 'scene-shingle',
    image: '/images/home-services-residential-shingle-drone-view.webp',
    text: 'Every residential roof type under one roofer-led process, from a single repair to a full tear-off.',
    href: RESIDENTIAL.href,
  },
  {
    title: 'Commercial Roofing',
    schemaName: 'Commercial Roofing',
    scene: 'scene-commercial',
    image: '/images/home-services-commercial-flat-roof-drone-view.webp',
    text: 'Roofing for offices, retail, churches and warehouses, with written scopes built around your building.',
    href: COMMERCIAL_LINK.href,
  },
];

// The home page's "Recent Work" slider: its own photos, independent of the /projects/ page and city pages.
const HOME_RECENT_WORK = [
  { title: 'Shingle Roof Replacement', image: '/images/recent-work-shingle-multi-hip-drone-view.webp' },
  { title: 'Flat Roof Replacement', image: '/images/recent-work-round-flat-roof-drone-view.webp' },
  { title: 'Commercial Flat Roofing', image: '/images/recent-work-commercial-flat-roof-drone-view.webp' },
  { title: 'Shingle Roof Replacement', image: '/images/recent-work-shingle-row-drone-view.webp' },
  { title: 'Flat Roof Replacement', image: '/images/recent-work-tudor-flat-roof-street-view.webp' },
  { title: 'Tile & Flat Roofing', image: '/images/recent-work-spanish-tile-flat-roof-street-view.webp' },
];

// Home page: sections in order, top to bottom, matching the site's top-nav structure — Testimonials, an
// intro paragraph, Services/Residential/Commercial together, Service Areas, About, Projects, then the
// lead-capture "Get Pro Advice" form. Reorder or remove a line to change the page.
export default function HomePage() {
  return (
    <>
      <JsonLd data={pageJsonLd({ path: '/', title: HOME_TITLE, description: HOME_DESCRIPTION })} />
      <main id="top">
        {/* The keyword line above the big headline is the page's H1 (matches the page title) */}
        <Hero
          h1="eyebrow"
          intro="Clear inspections. Straightforward estimates. Clean workmanship."
          image="/images/home-hero-shingle-closeup-drone-view.webp"
          imageAlt="Close aerial view of a dimensional shingle roof on a Southern California home"
          className="hero-top-pad"
        />
        <section className="section">
          <div className="container">
            <div className="tst-standalone">
              <ReviewSlider />
            </div>
          </div>
        </section>
        <QrsStandard />
        <Services items={HOME_SERVICES} compact cta={false} />
        <ServiceArea />
        <WhyQrs />
        <ProjectCarousel heading="Recent Work" sub="A look at the roofing projects our crews take on." projects={HOME_RECENT_WORK} id="work" pattern />
        <RoofCheck />
        <FinalCta />
      </main>
    </>
  );
}
