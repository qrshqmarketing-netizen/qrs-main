import Faq from '@/components/sections/Faq';
import FinalCta from '@/components/sections/FinalCta';
import Hero from '@/components/sections/Hero';
import ProcessSteps from '@/components/sections/ProcessSteps';
import RelatedLinks from '@/components/sections/RelatedLinks';
import RoofCheck from '@/components/sections/RoofCheck';
import JsonLd from '@/components/ui/JsonLd';
import RoofVisualizer from '@/components/visualizer/RoofVisualizer';
import { HOME, ROOF_VISUALIZER_LINK } from '@/data/catalog';
import { relatedLinks } from '@/data/content';
import { VISUALIZER_COPY } from '@/data/roofVisualizer';
import { ROOF_VISUALIZER_PAGE as page } from '@/data/pages/roofVisualizer';
import { heroOutcome } from '@/data/heroOutcomes';
import { PHONE, TEL } from '@/data/site';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: ROOF_VISUALIZER_LINK.href });

const CRUMBS = [HOME, ROOF_VISUALIZER_LINK];

const schema = pageJsonLd({
  path: ROOF_VISUALIZER_LINK.href,
  title: page.metaTitle,
  description: page.metaDescription,
  crumbs: CRUMBS,
  faqs: page.faqs,
  service: { name: 'Roof Color Visualizer', type: page.keyword },
});

const RELATED = relatedLinks(['/residential-roofing/shingle-roofing/', '/roof-replacement/', '/roof-inspection/', '/residential-roofing/']);

// The roof color visualizer: the page explains it and holds the tool, which asks for a name and email first (components/visualizer/)
export default function RoofVisualizerPage() {
  return (
    <main id="top">
      <JsonLd data={schema} />
      <Hero
        crumbs={CRUMBS}
        eyebrow="Roof Visualizer"
        title={page.hero.heading}
        outcome={heroOutcome(ROOF_VISUALIZER_LINK.href)}
        stats
        intro={page.hero.intro}
        image="/images/shingle-roof-completed-drone-view.webp"
        imageAlt="Aerial view of a home with a new shingle roof"
        actions={[
          { label: 'Get Pro Advice', href: '#roof-check', style: 'gold' },
          { label: `Call ${PHONE}`, href: TEL, style: 'line' },
        ]}
      />
      <section className="section" id="visualizer">
        <div className="container">
          <div className="section-head">
            <h2>{VISUALIZER_COPY.label}</h2>
            <p>{VISUALIZER_COPY.sub}</p>
          </div>
          <RoofVisualizer />
        </div>
      </section>
      <ProcessSteps heading={page.how.heading} steps={page.how.steps} image="/images/shingle-roof-inspection-overhead.webp" imageAlt="Overhead view of a shingle roof" />
      <Faq heading="Roof Visualizer FAQs" sub="Straight answers about the visualizer." faqs={page.faqs} cta={false} />
      <RelatedLinks heading="Related Roofing Pages" links={RELATED} />
      <RoofCheck tone="white" />
      <FinalCta heading="Ready for the Real Thing?" text="Love a color? Start with a free roof evaluation. A roofer looks at your roof, explains what it needs and gives you a clear next step with a written scope and price." />
    </main>
  );
}
