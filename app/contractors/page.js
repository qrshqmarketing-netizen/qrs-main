import CheckBand from '@/components/home/CheckBand';
import '@/components/home/HomeClean.css';
import '@/components/home/CleanPages.css';
import { checksFor } from '@/data/nearYou';
import Faq from '@/components/sections/Faq';
import FeatureBand from '@/components/sections/FeatureBand';
import Hero from '@/components/sections/Hero';
import Overview from '@/components/sections/Overview';
import ProcessSteps from '@/components/sections/ProcessSteps';
import RelatedLinks from '@/components/sections/RelatedLinks';
import RoofCheck from '@/components/sections/RoofCheck';
import ValueGrid from '@/components/sections/ValueGrid';
import JsonLd from '@/components/ui/JsonLd';
import { CONTRACTORS_LINK, HOME } from '@/data/catalog';
import { relatedLinks } from '@/data/content';
import { CONTRACTORS_PAGE as page } from '@/data/pages/contractors';
import { PHONE, TEL } from '@/data/site';
import { heroOutcome } from '@/data/heroOutcomes';
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
  service: { name: 'Roofing Crews for Contractors', type: page.keyword },
});

const RELATED = relatedLinks(['/commercial-roofing/', '/residential-roofing/hoa-multi-family/', '/residential-roofing/flat-roofing/', '/residential-roofing/']);

// Contractor partnerships (B2B) page (content in data/pages/contractors.js)
export default function ContractorsPage() {
  return (
    <main id="top" className="clean-page">
      <JsonLd data={schema} />
      <Hero
        crumbs={CRUMBS}
        eyebrow="Contractor Partnerships"
        title={page.hero.heading}
        outcome={heroOutcome('/contractors/')}
        stats
        intro={page.hero.intro}
        image="/images/contractors-hero-roofer-tablet.webp"
        imageAlt="Roofer on a rooftop reviewing a scope on a tablet"
        actions={[
          { label: 'Start a Conversation', href: '#roof-check', style: 'gold' },
          { label: `Call ${PHONE}`, href: TEL, style: 'line' },
        ]}
      />
      <Overview heading={page.overview.heading} paragraphs={page.overview.paragraphs} />
      <ValueGrid heading={page.audiences.heading} items={page.audiences.points} tone="wash" />
      <FeatureBand id="white-label" {...page.whiteLabel} />
      <ProcessSteps heading={page.process.heading} subheading={page.process.subheading} steps={page.process.steps} image="/images/contractors-process-roofer-tablet.webp" imageAlt="Roofer on a rooftop smiling while reviewing a scope on a tablet" tone="white" />
      {/* In the clean format with the publicstorage.com patterns like the other sub pages (owner, October 22 2026): the checklist band (the
          commercial list) in place of the QRS Difference band and "Why choose QRS", four FAQs, the request form and the area links */}
      <CheckBand {...checksFor('/contractors/')} />
      <RelatedLinks heading="Related pages" links={RELATED} />
      <Faq heading="Contractor FAQs" sub="Straight answers for contractors and property management clients." faqs={page.faqs} cta={false} limit={4} />
      <RoofCheck tone="white" offer="commercial" />
    </main>
  );
}
