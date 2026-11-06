import FinalCta from '@/components/sections/FinalCta';
import ProofBar from '@/components/sections/ProofBar';
import RoofDiagram from '@/components/sections/RoofDiagram';
import TrustLogos from '@/components/sections/TrustLogos';
import { QhAccount, QhBanner, QhHero, QhOffer, QhPoints, QhPosts, QhProjects, QhReviews, QhServices, QhSteps, QhStart, QhStory, QhSurveyFrame } from '@/components/home/QrsSections';
import { PROCESS_STEPS } from '@/data/process';
import JsonLd from '@/components/ui/JsonLd';
import { heroOutcome } from '@/data/heroOutcomes';
import { projectsShownOn } from '@/data/projectPages';
import { diagramFor } from '@/data/roofDiagrams';
import { HERO_ANNOTATIONS } from '@/data/site';
import { articlesFor } from '@/lib/articles';
import { searchHeading } from '@/lib/headings';
import { pageJsonLd } from '@/lib/structuredData';
import { closingCta } from './shared';

// A hub page in the new home page's theme (owner, November 6 2026; the Commercial Roofing page first, via SectionHub): the same content, photos,
// links, structured data and meta as HubPage, laid out with the shared sections of components/home/QrsSections.jsx (styles QrsHome.css). Hero
// visual: `visual` (Roof Repair: the leak traced to its source), else the hub's photo in a survey frame with the roof survey card and the building types as links. The survey is never called free.
const listItem = (c, fallback, alt) => ({ title: c.title, text: c.text, href: c.href, image: c.image || fallback, caption: c.title, alt });

export default async function QhHubPage({ hub, crumbs, image, imageAlt, cards, extraGrid, feature, offer = 'home', actions, process = false, visual, extra }) {
  const path = crumbs.at(-1).href;
  const commercial = offer === 'commercial';
  const schema = pageJsonLd({
    path,
    title: hub.metaTitle,
    description: hub.metaDescription,
    type: 'CollectionPage',
    crumbs,
    service: { name: crumbs.at(-1).label, type: hub.keyword, catalog: [...(extraGrid?.cards || []), ...cards].map((c) => ({ name: c.title, href: c.href })) },
    faqs: hub.faqs,
    image,
  });
  const photos = [image, ...[...(extraGrid?.cards || []), ...cards].map((c) => c.image)].filter((src, i, a) => src && a.indexOf(src) === i);
  return (
    <main id="top" className="qh">
      <JsonLd data={schema} />
      <QhHero
        crumbs={crumbs}
        title={searchHeading(hub.hero.heading, { place: false })}
        outcome={heroOutcome(path)}
        text={hub.hero.intro}
        checks={hub.heroNotes || HERO_ANNOTATIONS[commercial ? 'commercial' : 'home']}
        cta={commercial ? 'Request a roof survey' : 'Book a free roof evaluation'}
        actions={actions}
        badges
        visual={
          visual || <QhSurveyFrame
            image={image}
            alt={imageAlt}
            chips={cards.slice(0, 6).map((c) => ({ label: c.title.replace(/ Roofing$/, ''), href: c.href }))}
            card={commercial ? { title: 'Roofer-led roof survey', text: 'Photos, a written scope and price before any work.' } : { title: 'Free roof evaluation', text: 'Photos and a written price before any work.' }}
          />
        }
      />
      <ProofBar strip />
      <TrustLogos />
      <QhStory
        id="overview"
        heading={hub.overview.heading}
        paragraphs={hub.overview.paragraphs}
        images={photos.slice(0, 3).map((src) => ({ src, alt: '' }))}
      />
      {extraGrid && <QhServices id="services" heading={extraGrid.heading} lede={extraGrid.intro} items={extraGrid.cards.map((c) => listItem(c, image))} />}
      <QhServices id={extraGrid ? 'buildings' : 'services'} heading={hub.cards.heading} lede={hub.cards.intro} items={cards.map((c) => listItem(c, image))} />
      <RoofDiagram diagram={diagramFor(path)} />
      <QhAccount commercial={commercial} />
      {hub.highlights?.points?.length > 0 && <QhPoints id="why-qrs" kicker="Why QRS" heading={hub.highlights.heading} items={hub.highlights.points} />}
      {extra}
      {process && <QhSteps heading="Roofing, the QRS way" steps={PROCESS_STEPS} />}
      <QhOffer offer={offer} />
      <QhProjects projects={projectsShownOn(path).projects} heading="Recent roofing projects" />
      <QhReviews path={path} />
      {feature && <QhBanner heading={feature.heading} text={feature.paragraphs.join(' ')} image={feature.image} cta={feature.cta.label} href={feature.cta.href} links={false} />}
      <QhPosts posts={await articlesFor(path)} heading="Related roofing articles" />
      {hub.faqs?.length > 0 && <QhStart faqs={hub.faqs} heading="Frequently asked questions" offer={offer} />}
      <FinalCta {...closingCta(hub.keyword, offer)} />
    </main>
  );
}
