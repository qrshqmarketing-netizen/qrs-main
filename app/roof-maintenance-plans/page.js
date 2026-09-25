import CarePlanPricing from '@/components/sections/CarePlanPricing';
import Faq from '@/components/sections/Faq';
import FeatureBand from '@/components/sections/FeatureBand';
import FinalCta from '@/components/sections/FinalCta';
import PageHero from '@/components/sections/PageHero';
import PlanScope from '@/components/sections/PlanScope';
import ProcessSteps from '@/components/sections/ProcessSteps';
import RoofCheck from '@/components/sections/RoofCheck';
import ValueGrid from '@/components/sections/ValueGrid';
import JsonLd from '@/components/ui/JsonLd';
import { HOME, PROGRAMS } from '@/data/catalog';
import { CARE_PLAN as page } from '@/data/pages/carePlan';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

// The Roof Care Plan (content in data/pages/carePlan.js): three priced maintenance tiers with an
// interactive size-based pricing table (components/sections/CarePlanPricing.jsx).
const LINK = PROGRAMS.plans;

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: LINK.href });

const CRUMBS = [HOME, { label: LINK.label, href: LINK.href }];
const schema = pageJsonLd({ path: LINK.href, title: page.metaTitle, description: page.metaDescription, crumbs: CRUMBS, faqs: page.faqs });

export default function RoofMaintenancePlansPage() {
  return (
    <main id="top">
      <JsonLd data={schema} />
      <PageHero crumbs={CRUMBS} eyebrow="Maintenance Plans" title={page.hero.heading} intro={page.hero.intro} card={{ scene: LINK.scenes[0], highlights: page.hero.highlights }} />
      <ValueGrid heading={page.whatGoesWrong.heading} items={page.whatGoesWrong.items} tone="wash" pattern />
      <CarePlanPricing />
      <PlanScope />
      <ProcessSteps heading={page.schedule.heading} steps={page.schedule.steps} scene="scene-inspect" tone="white" />
      <FeatureBand eyebrow={page.memberBenefits.eyebrow} heading={page.memberBenefits.heading} paragraphs={page.memberBenefits.paragraphs} points={page.memberBenefits.points} cta={{ label: 'Get Started', href: '#roof-check' }} />
      <Faq heading="Roof Care Plan FAQs" sub="Straight answers about how the plan works." faqs={page.faqs} />
      <RoofCheck />
      <FinalCta heading={page.final.heading} text={page.final.text} />
    </main>
  );
}
