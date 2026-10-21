import CardGrid from '@/components/sections/CardGrid';
import ReviewMarquee from '@/components/sections/ReviewMarquee';
import Faq from '@/components/sections/Faq';
import HomeArticles from '@/components/home/HomeArticles';
import HomeWork from '@/components/home/HomeWork';
import '@/components/home/HomeClean.css';
import '@/components/home/CleanPages.css';
import FinalCta from '@/components/sections/FinalCta';
import Hero from '@/components/sections/Hero';
import Overview from '@/components/sections/Overview';
import Process from '@/components/sections/Process';
import RoofCheck from '@/components/sections/RoofCheck';
import SplitFeature from '@/components/sections/SplitFeature';
import ValueGrid from '@/components/sections/ValueGrid';
import RoofDiagram from '@/components/sections/RoofDiagram';
import { diagramFor } from '@/data/roofDiagrams';
import JsonLd from '@/components/ui/JsonLd';
import { pageJsonLd } from '@/lib/structuredData';
import { closingCta, faqSub } from './shared';
import { heroOutcome } from '@/data/heroOutcomes';
import { articlesFor } from '@/lib/articles';
import { projectsShownOn } from '@/data/projectPages';
import { searchHeading } from '@/lib/headings';

// A hub page (e.g. /residential-roofing/tile-roofing/ or /commercial-roofing/): intro, cards for every page in the section,
// why-choose points and the Roof Check form. Content shape: `hub` in data/services/*.js.
// cards: [{ title, text, href, scene, image? }]; extraGrid: optional { heading, intro, cards } shown before them
// (commercial services); feature: optional SplitFeature props (e.g. contractors teaser); actions: hero buttons (Hero);
// process: show the general "QRS Way" steps (the service-first hubs /roof-repair/ and /roof-replacement/).
// `extra`: a section of the hub's own, after its highlights (the shingle roofing page's shingle colors)
export default async function HubPage({ hub, crumbs, eyebrow, image, imageAlt, cards, extraGrid, feature, offer, actions, process = false, extra }) {
  const schema = pageJsonLd({
    path: crumbs.at(-1).href,
    title: hub.metaTitle,
    description: hub.metaDescription,
    type: 'CollectionPage',
    crumbs,
    service: { name: crumbs.at(-1).label, type: hub.keyword, catalog: [...(extraGrid?.cards || []), ...cards].map((c) => ({ name: c.title, href: c.href })) },
    faqs: hub.faqs,
    image,
  });
  const hubWork = projectsShownOn(crumbs.at(-1).href).projects;
  return (
    <main id="top" className="clean-page">
      <JsonLd data={schema} />
      <Hero
        crumbs={crumbs}
        eyebrow={eyebrow}
        title={searchHeading(hub.hero.heading)}
        outcome={heroOutcome(crumbs.at(-1).href)}
        intro={hub.hero.intro}
        image={image}
        imageAlt={imageAlt}
        stats
        {...(actions && { actions })}
      />
      <Overview heading={hub.overview.heading} paragraphs={hub.overview.paragraphs} />
      {extraGrid && <CardGrid id="services" heading={extraGrid.heading} intro={extraGrid.intro} cards={extraGrid.cards} tone="wash" />}
      <CardGrid id={extraGrid ? 'buildings' : 'services'} heading={hub.cards.heading} intro={hub.cards.intro} cards={cards} tone={extraGrid ? undefined : 'wash'} />
      {/* Google reviews, a few sections below the hero (owner, October 14 2026) */}
      {/* The blog's roof illustration where it explains this hub (data/roofDiagrams.js) */}
      <RoofDiagram diagram={diagramFor(crumbs.at(-1).href)} />
      {/* The work itself, right after the services (owner, October 15 2026, after maben.com.au): projects on this hub's pages, newest first */}
      {hubWork.length > 0 && <HomeWork heading="Recent roofing __projects__" projects={hubWork.slice(0, 3)} all={{ label: 'View all projects', href: '/projects/' }} />}
      <ReviewMarquee />
      <ValueGrid heading={hub.highlights.heading} items={hub.highlights.points} columns={3} />
      {extra}
      {process && <Process />}
      {feature && <SplitFeature {...feature} tone="wash" />}
      <HomeArticles posts={await articlesFor(crumbs.at(-1).href)} heading="Related articles" />
      {hub.faqs?.length > 0 && <Faq heading="Frequently Asked __Questions__" sub={faqSub(hub.keyword)} faqs={hub.faqs} cta={false} />}
      <RoofCheck tone="white" offer={offer} />
      <FinalCta {...closingCta(hub.keyword, offer)} />
    </main>
  );
}
