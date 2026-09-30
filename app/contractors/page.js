import DifferenceBand from '@/components/sections/DifferenceBand';
import Faq from '@/components/sections/Faq';
import FeatureBand from '@/components/sections/FeatureBand';
import FinalCta from '@/components/sections/FinalCta';
import Hero from '@/components/sections/Hero';
import ProofBar from '@/components/sections/ProofBar';
import ReviewStrip from '@/components/sections/ReviewStrip';
import Overview from '@/components/sections/Overview';
import ProcessSteps from '@/components/sections/ProcessSteps';
import RelatedLinks from '@/components/sections/RelatedLinks';
import RoofCheck from '@/components/sections/RoofCheck';
import ValueGrid from '@/components/sections/ValueGrid';
import WhyChoose from '@/components/sections/WhyChoose';
import JsonLd from '@/components/ui/JsonLd';
import { CONTRACTORS_LINK, HOME } from '@/data/catalog';
import { relatedLinks } from '@/data/content';
import { CONTRACTORS_PAGE as page } from '@/data/pages/contractors';
import { PHONE, TEL } from '@/data/site';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: CONTRACTORS_LINK.href });

const CRUMBS = [HOME, CONTRACTORS_LINK];

const schema = pageJsonLd({
  path: CONTRACTORS_LINK.href,
  title: page.metaTitle,
  description: page.metaDescription,
  crumbs: CRUMBS,
  faqs: page.faqs,
  service: { name: 'Roofing Subcontractor Services', type: page.keyword },
});

const RELATED = relatedLinks(['/commercial-roofing/', '/hoa-multi-family/', '/flat-roofing/', '/residential-roofing/']);

// Contractor partnerships (B2B) page (content in data/pages/contractors.js)
export default function ContractorsPage() {
  return (
    <main id="top">
      <JsonLd data={schema} />
      <Hero
        crumbs={CRUMBS}
        eyebrow="Contractor Partnerships"
        title={page.hero.heading}
        intro={page.hero.intro}
        image="/images/contractors-hero-roofer-tablet.webp"
        imageAlt="Roofer on a rooftop reviewing a scope on a tablet"
        actions={[
          { label: 'Start a Conversation', href: '#roof-check', style: 'gold' },
          { label: `Call ${PHONE}`, href: TEL, style: 'line' },
        ]}
      />
      <ReviewStrip />
      <Overview heading={page.overview.heading} paragraphs={page.overview.paragraphs} />
      <ProofBar />
      <ValueGrid heading={page.audiences.heading} items={page.audiences.points} tone="wash" />
      <FeatureBand id="white-label" {...page.whiteLabel} />
      <ProcessSteps heading={page.process.heading} subheading={page.process.subheading} steps={page.process.steps} image="/images/contractors-process-roofer-tablet.webp" imageAlt="Roofer on a rooftop smiling while reviewing a scope on a tablet" tone="white" />
      <DifferenceBand />
      <WhyChoose heading={page.why.heading} intro={page.why.intro} points={page.why.points} cta={{ label: 'Start a Conversation', href: '#roof-check' }} />
      <RelatedLinks heading="Related pages" links={RELATED} />
      <Faq heading="Contractor FAQs" sub="Straight answers for contractors and property managers." faqs={page.faqs} cta={false} />
      <RoofCheck tone="white" offer="commercial" />
      <FinalCta heading="Let’s Build Something Together" text="Tell us about your project and we’ll start with a roofer-led look at the roof." cta={{ label: 'Start a Conversation', href: '#roof-check' }} />
    </main>
  );
}
