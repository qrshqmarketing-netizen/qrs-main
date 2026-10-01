import Faq from '@/components/sections/Faq';
import FeatureBand from '@/components/sections/FeatureBand';
import FinalCta from '@/components/sections/FinalCta';
import Hero from '@/components/sections/Hero';
import PartnerLogos from '@/components/sections/PartnerLogos';
import ProjectCarousel from '@/components/sections/ProjectCarousel';
import QrsStandard from '@/components/sections/QrsStandard';
import ReviewStrip from '@/components/sections/ReviewStrip';
import RoofCheck from '@/components/sections/RoofCheck';
import ServiceArea from '@/components/sections/ServiceArea';
import Services from '@/components/sections/Services';
import WhyQrs from '@/components/sections/WhyQrs';
import JsonLd from '@/components/ui/JsonLd';
import { COMMERCIAL_LINK, RESIDENTIAL } from '@/data/catalog';
import { FAQS } from '@/data/faqs';
import { CAREERS_PAGE, CAREERS_TEASER } from '@/data/pages/careers';
import { HOME_DESCRIPTION, HOME_TITLE } from '@/data/site';
import { RECENT_WORK, RECENT_WORK_SUB } from '@/data/recentWork';
import { ROOF_FINANCING } from '@/data/services/programs';
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

const HOME_PRODUCTS = [
  { title: '*TotalShield* Shingle Systems', text: 'Complete shingle replacements and new installations, built from the deck up.', href: '/residential-roofing/shingle-roofing/replacement/', scene: 'scene-shingle', image: '/images/shingle-roof-completed-drone-view.webp' },
  { title: '*FlatGuard* Flat Roofing', text: 'Flat roof systems planned around drainage, seams and lasting protection.', href: '/residential-roofing/flat-roofing/replacement/', scene: 'scene-flat', image: '/images/flat-roof-torch-down-drone-view-services.webp' },
  { title: '*LeakRescue* Roof Repairs', text: 'Leaks traced to the source and repaired with clear photos and a written scope.', href: '/roof-repair/', scene: 'scene-repair' },
  { title: '*RoofScan 360* Inspections', text: 'A roofer-led inspection with photos, plain-English findings and a clear next step.', href: '/roof-inspection/', scene: 'scene-inspect' },
  { title: '*SecondLife* Tile Reset', text: 'Keep sound roof tiles while replacing the worn underlayment below.', href: '/residential-roofing/tile-roofing/lift-and-relay/', scene: 'scene-tile' },
  { title: '*RoofCare Plan*', text: 'Scheduled roof care with seasonal visits and a photo report each time.', href: '/roof-maintenance-plans/', scene: 'scene-inspect' },
  { title: '*ReserveReady* HOA Roofing', text: 'Roof inspections, clear scopes and planning support for community boards.', href: '/residential-roofing/hoa-multi-family/', scene: 'scene-hoa' },
];

// Home page: sections in order, top to bottom, matching the site's top-nav structure — an intro paragraph,
// Services/Residential/Commercial together, Service Areas, About, Projects, then the
// lead-capture "Get Pro Advice" form. Reorder or remove a line to change the page.
export default function HomePage() {
  return (
    <>
      <JsonLd data={pageJsonLd({ path: '/', title: HOME_TITLE, description: HOME_DESCRIPTION, faqs: FAQS })} />
      <main id="top">
        {/* The keyword line above the big headline is the page's H1 (matches the page title) */}
        <Hero
          h1="eyebrow"
          intro="Clear inspections. Straightforward estimates. Clean workmanship."
          image="/images/home-hero-shingle-closeup-drone-view.webp"
          imageAlt="Close aerial view of a dimensional shingle roof on a Southern California home"
          className="hero-top-pad"
          stats
        />
        <Services items={HOME_SERVICES} compact cta={false} />
        <QrsStandard />
        <ReviewStrip />
        <Services title="Roofing Systems" items={HOME_PRODUCTS} compact cta={false} pattern={false} slider id="roofing-systems" />
        <ServiceArea />
        <WhyQrs />
        <ProjectCarousel heading="Recent Work" sub={RECENT_WORK_SUB} projects={RECENT_WORK} id="work" pattern />
        <PartnerLogos {...ROOF_FINANCING.partners} />
        <FeatureBand
          id="careers"
          tone="light"
          {...CAREERS_TEASER}
          points={CAREERS_PAGE.roles.items.map((role) => ({ title: role.title, text: role.text, href: '/careers/#roles' }))}
        />
        <Faq cta={false} />
        <RoofCheck />
        <FinalCta />
      </main>
    </>
  );
}
