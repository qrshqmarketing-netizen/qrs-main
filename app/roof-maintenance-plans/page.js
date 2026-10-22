import CarePlanPricing from '@/components/sections/CarePlanPricing';
import AreaLinks from '@/components/home/AreaLinks';
import BandCards from '@/components/home/BandCards';
import HomeArticles from '@/components/home/HomeArticles';
import ReviewTrio from '@/components/home/ReviewTrio';
import '@/components/home/HomeClean.css';
import '@/components/home/CleanPages.css';
import { AREA_LINKS } from '@/data/nearYou';
import Faq from '@/components/sections/Faq';
import Hero from '@/components/sections/Hero';
import PlanScope from '@/components/sections/PlanScope';
import ProcessSteps from '@/components/sections/ProcessSteps';
import RoofCheck from '@/components/sections/RoofCheck';
import ValueGrid from '@/components/sections/ValueGrid';
import JsonLd from '@/components/ui/JsonLd';
import { HOME, PROGRAMS } from '@/data/catalog';
import { CARE_PLAN as page } from '@/data/pages/carePlan';
import { articlesFor } from '@/lib/articles';
import { heroOutcome } from '@/data/heroOutcomes';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';
import { searchHeading } from '@/lib/headings';

// The Roof Care Plan (content in data/pages/carePlan.js): three priced maintenance tiers with an
// interactive size-based pricing table (components/sections/CarePlanPricing.jsx).
const LINK = PROGRAMS.plans;

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: LINK.href });

const CRUMBS = [HOME, { label: LINK.label, href: LINK.href }];
const schema = pageJsonLd({ path: LINK.href, title: page.metaTitle, description: page.metaDescription, crumbs: CRUMBS, faqs: page.faqs, image: page.image });

export default async function RoofMaintenancePlansPage() {
  return (
    <main id="top" className="clean-page">
      <JsonLd data={schema} />
      <Hero crumbs={CRUMBS} eyebrow="Maintenance Plans" title={searchHeading(page.hero.heading)} outcome={heroOutcome(PROGRAMS.plans.href)} intro={page.hero.intro} image={page.image} imageAlt={page.imageAlt} stats />
      <ValueGrid heading={page.whatGoesWrong.heading} items={page.whatGoesWrong.items} tone="wash" pattern />
      <CarePlanPricing />
      <PlanScope />
      {/* In the clean format with the publicstorage.com patterns like the other sub pages (owner, October 22 2026): three reviews, the tune-up and
          member benefits as two cards in one row, the related articles row, four FAQs, the request form and the area links */}
      <ReviewTrio path={LINK.href} />
      <ValueGrid id="roof-types" heading={page.byRoof.heading} intro={page.byRoof.intro} items={page.byRoof.items} columns={3} tone="wash" />
      <ProcessSteps heading={page.schedule.heading} steps={page.schedule.steps} scene="scene-inspect" image={page.schedule.image} imageAlt={page.schedule.imageAlt} tone="white" />
      <BandCards heading="Tune-ups and member __benefits__" sections={[page.tuneUp, page.memberBenefits]} />
      <HomeArticles posts={await articlesFor(PROGRAMS.plans.href)} heading="Related articles" />
      <Faq heading="Roof Care Plan FAQs" sub="Straight answers about how the plan works." faqs={page.faqs} cta={false} limit={4} />
      <RoofCheck />
      <AreaLinks {...AREA_LINKS} />
    </main>
  );
}
