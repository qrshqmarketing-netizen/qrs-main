import CardCarousel from '@/components/sections/CardCarousel';
import CardGrid from '@/components/sections/CardGrid';
import DifferenceBand from '@/components/sections/DifferenceBand';
import Faq from '@/components/sections/Faq';
import FinalCta from '@/components/sections/FinalCta';
import Overview from '@/components/sections/Overview';
import PageHero from '@/components/sections/PageHero';
import RoofCheck from '@/components/sections/RoofCheck';
import SplitFeature from '@/components/sections/SplitFeature';
import ValueGrid from '@/components/sections/ValueGrid';
import JsonLd from '@/components/ui/JsonLd';
import { pageJsonLd } from '@/lib/structuredData';
import { LOCATION_CTA } from './shared';

// A hub page (e.g. /tile-roofing/ or /commercial-roofing/): intro, cards for every page in the section,
// why-choose points, FAQs and the Roof Check form. Content shape: `hub` in data/services/*.js.
// cards: [{ title, text, href, scene, image? }]; feature: optional SplitFeature props (e.g. contractors teaser).
export default function HubPage({ hub, crumbs, eyebrow, image, imageAlt, scene, cards, carousel, feature, offer }) {
  const schema = pageJsonLd({
    path: crumbs.at(-1).href,
    title: hub.metaTitle,
    description: hub.metaDescription,
    type: 'CollectionPage',
    crumbs,
    faqs: hub.faqs,
    service: { name: crumbs.at(-1).label, type: hub.keyword, catalog: cards.map((c) => ({ name: c.title, href: c.href })) },
    image,
  });
  return (
    <main id="top">
      <JsonLd data={schema} />
      <PageHero
        crumbs={crumbs}
        eyebrow={eyebrow}
        title={hub.hero.heading}
        intro={hub.hero.intro}
        image={image}
        imageAlt={imageAlt}
        card={{ kicker: offer === 'commercial' ? 'Why owners call QRS' : 'Why homeowners call QRS', scene, highlights: hub.hero.highlights, offer }}
      />
      <Overview heading={hub.overview.heading} paragraphs={hub.overview.paragraphs} />
      <CardGrid id="services" heading={hub.cards.heading} intro={hub.cards.intro} cards={cards} tone="wash" />
      <ValueGrid heading={hub.highlights.heading} items={hub.highlights.points} columns={3} />
      {feature && <SplitFeature {...feature} tone="wash" />}
      <DifferenceBand />
      {carousel?.items?.length > 0 && <CardCarousel title={carousel.title} items={carousel.items} idPrefix="types" />}
      <Faq heading="Frequently Asked Questions" sub={`Straight answers about ${hub.keyword || hub.hero.heading.toLowerCase()}.`} faqs={hub.faqs} cta={false} />
      <RoofCheck tone="white" offer={offer} />
      <FinalCta {...LOCATION_CTA} />
    </main>
  );
}
