import CardGrid from '@/components/sections/CardGrid';
import FinalCta from '@/components/sections/FinalCta';
import Hero from '@/components/sections/Hero';
import Overview from '@/components/sections/Overview';
import RoofCheck from '@/components/sections/RoofCheck';
import SplitFeature from '@/components/sections/SplitFeature';
import ValueGrid from '@/components/sections/ValueGrid';
import JsonLd from '@/components/ui/JsonLd';
import { pageJsonLd } from '@/lib/structuredData';
import { LOCATION_CTA } from './shared';

// A hub page (e.g. /tile-roofing/ or /commercial-roofing/): intro, cards for every page in the section,
// why-choose points and the Roof Check form. Content shape: `hub` in data/services/*.js.
// cards: [{ title, text, href, scene, image? }]; extraGrid: optional { heading, intro, cards } shown before them
// (commercial services); feature: optional SplitFeature props (e.g. contractors teaser); actions: hero buttons (Hero).
export default function HubPage({ hub, crumbs, eyebrow, image, imageAlt, cards, extraGrid, feature, offer, actions }) {
  const schema = pageJsonLd({
    path: crumbs.at(-1).href,
    title: hub.metaTitle,
    description: hub.metaDescription,
    type: 'CollectionPage',
    crumbs,
    service: { name: crumbs.at(-1).label, type: hub.keyword, catalog: [...(extraGrid?.cards || []), ...cards].map((c) => ({ name: c.title, href: c.href })) },
    image,
  });
  return (
    <main id="top">
      <JsonLd data={schema} />
      <Hero
        crumbs={crumbs}
        eyebrow={eyebrow}
        title={hub.hero.heading}
        intro={hub.hero.intro}
        image={image}
        imageAlt={imageAlt}
        {...(actions && { actions })}
      />
      <Overview heading={hub.overview.heading} paragraphs={hub.overview.paragraphs} />
      {extraGrid && <CardGrid id="services" heading={extraGrid.heading} intro={extraGrid.intro} cards={extraGrid.cards} tone="wash" />}
      <CardGrid id={extraGrid ? 'buildings' : 'services'} heading={hub.cards.heading} intro={hub.cards.intro} cards={cards} tone={extraGrid ? undefined : 'wash'} />
      <ValueGrid heading={hub.highlights.heading} items={hub.highlights.points} columns={3} />
      {feature && <SplitFeature {...feature} tone="wash" />}
      <RoofCheck tone="white" offer={offer} />
      <FinalCta {...LOCATION_CTA} />
    </main>
  );
}
