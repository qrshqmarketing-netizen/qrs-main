import Faq from '@/components/sections/Faq';
import LatestArticles from '@/components/sections/LatestArticles';
import FinalCta from '@/components/sections/FinalCta';
import Process from '@/components/sections/Process';
import ProofBar from '@/components/sections/ProofBar';
import RoofCheck from '@/components/sections/RoofCheck';
import SplitFeature from '@/components/sections/SplitFeature';
import StudioProjects from '@/components/studio/StudioProjects';
import RoofDiagram from '@/components/sections/RoofDiagram';
import { diagramFor } from '@/data/roofDiagrams';
import JsonLd from '@/components/ui/JsonLd';
import { SvcCardGrid, SvcHero, SvcIncludes, SvcIntro, SvcOffer, SvcReviews, SvcTrust } from '@/components/svc/SvcSections';
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
  const path = crumbs.at(-1).href;
  // Layout (owner, October 29 2026): the service pages' design after remote.com (components/svc/): the gradient hero with the WebGL roof
  // frame, the proof strip, the overview, the hub's services as photo cards, the roof diagram, credibility with numbers, the highlights,
  // the hub's own extra section, the written-price offer, projects, review cards, articles, FAQ, the request form and the closing call to action.
  return (
    <main id="top" className="svc">
      <JsonLd data={schema} />
      <SvcHero
        crumbs={crumbs}
        title={searchHeading(hub.hero.heading)}
        outcome={heroOutcome(path)}
        intro={hub.hero.intro}
        {...(hub.heroNotes && { annotations: hub.heroNotes })}
        {...(actions && { actions })}
      />
      <ProofBar strip />
      <SvcIntro heading={hub.overview.heading} paragraphs={hub.overview.paragraphs} />
      {extraGrid && <SvcCardGrid id="services" heading={extraGrid.heading} intro={extraGrid.intro} cards={extraGrid.cards} />}
      <SvcCardGrid id={extraGrid ? 'buildings' : 'services'} heading={hub.cards.heading} intro={hub.cards.intro} cards={cards} tone={extraGrid ? 'cream' : 'white'} />
      {/* The blog's roof illustration where it explains this hub (data/roofDiagrams.js) */}
      <RoofDiagram diagram={diagramFor(path)} />
      <SvcTrust path={path} />
      <SvcIncludes heading={hub.highlights.heading} points={hub.highlights.points} />
      {extra}
      {process && <Process />}
      <SvcOffer offer={offer} />
      <StudioProjects projects={projectsShownOn(path).projects} heading="Recent roofing projects" />
      <SvcReviews path={path} />
      {feature && <SplitFeature {...feature} tone="wash" />}
      <LatestArticles posts={await articlesFor(path)} heading="Related Roofing Articles" />
      {hub.faqs?.length > 0 && (
        <div className="sv-faq-wrap">
          <Faq heading="Frequently Asked __Questions__" sub={faqSub(hub.keyword)} faqs={hub.faqs} cta={false} />
        </div>
      )}
      <RoofCheck tone="white" offer={offer} />
      <FinalCta {...closingCta(hub.keyword, offer)} />
    </main>
  );
}
