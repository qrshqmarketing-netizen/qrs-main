import CardCarousel from '@/components/sections/CardCarousel';
import DifferenceBand from '@/components/sections/DifferenceBand';
import Faq from '@/components/sections/Faq';
import FinalCta from '@/components/sections/FinalCta';
import Overview from '@/components/sections/Overview';
import PageHero from '@/components/sections/PageHero';
import ProcessSteps from '@/components/sections/ProcessSteps';
import RelatedLinks from '@/components/sections/RelatedLinks';
import RoofCheck from '@/components/sections/RoofCheck';
import WhyChoose from '@/components/sections/WhyChoose';
import JsonLd from '@/components/ui/JsonLd';
import { pageJsonLd } from '@/lib/structuredData';
import { LOCATION_CTA } from './shared';

// A service page (e.g. /tile-roofing/lift-and-relay/). Content shape: see data/services/*.js.
// crumbs: breadcrumb trail; eyebrow: section label above the H1; carousel: { title, items } of related sections;
// related: [{ label, href }] closest related pages; scenes: [heroArt, processArt] placeholder art until photos exist.
// actions: hero buttons (PageHero); finalCta: the closing call to action (FinalCta props).
export default function ServicePage({ page, crumbs, eyebrow, carousel, related, scenes = [], offer, actions, finalCta = LOCATION_CTA }) {
  const [heroScene = 'scene-shingle', processScene = heroScene] = scenes;
  const schema = pageJsonLd({
    path: crumbs.at(-1).href,
    title: page.metaTitle,
    description: page.metaDescription,
    crumbs,
    faqs: page.faqs,
    service: { name: page.title, type: page.keyword, category: eyebrow },
    image: page.image,
  });
  return (
    <main id="top">
      <JsonLd data={schema} />
      <PageHero
        crumbs={crumbs}
        eyebrow={eyebrow}
        title={page.title}
        intro={page.hero.intro}
        image={page.image}
        imageAlt={page.imageAlt}
        card={{ kicker: `${page.navLabel} with QRS`, scene: heroScene, highlights: page.hero.highlights, offer }}
        {...(actions && { actions })}
      />
      <Overview paragraphs={page.overview.paragraphs} />
      <ProcessSteps heading={page.process.heading} subheading={page.process.subheading} steps={page.process.steps} scene={processScene} />
      <WhyChoose heading={page.why.heading} intro={page.why.intro} points={page.why.points} />
      <RelatedLinks links={related} />
      <DifferenceBand />
      {carousel?.items?.length > 0 && <CardCarousel title={carousel.title} items={carousel.items} idPrefix="types" />}
      <Faq heading="Frequently Asked Questions" sub={`Straight answers about ${page.keyword || page.title.toLowerCase()}.`} faqs={page.faqs} cta={false} />
      <RoofCheck tone="white" offer={offer} />
      <FinalCta {...finalCta} />
    </main>
  );
}
