import FeatureBand from '@/components/sections/FeatureBand';
import FinalCta from '@/components/sections/FinalCta';
import PartnerLogos from '@/components/sections/PartnerLogos';
import ProofBar from '@/components/sections/ProofBar';
import RoofDiagram from '@/components/sections/RoofDiagram';
import TrustLogos from '@/components/sections/TrustLogos';
import { QhFlatFix, QhFlatReroof, QhShingleFix, QhShingleCourses, QhChurchCampus, QhFinancePath, QhHero, QhStormTarp, QhSteps, QhIndustrialRoof, QhShopPatches, QhWarehouseSections, QhOfficeLeak, QhStorefront, QhPoints, QhPosts, QhProjects, QhReviews, QhStart, QhStory } from '@/components/home/QrsSections';
import SiteLink from '@/components/ui/SiteLink';
import JsonLd from '@/components/ui/JsonLd';
import { RESIDENTIAL_TYPES, ROOF_REPAIR_LINK } from '@/data/catalog';
import { cardFor } from '@/data/content';
import { heroOutcome } from '@/data/heroOutcomes';
import { projectsShownOn } from '@/data/projectPages';
import { diagramFor } from '@/data/roofDiagrams';
import { HERO_ANNOTATIONS, PHONE, TEL } from '@/data/site';
import { articlesFor } from '@/lib/articles';
import { searchHeading } from '@/lib/headings';
import { unmark } from '@/lib/richText';
import { pageJsonLd } from '@/lib/structuredData';

// A service page told with a `story` (ServiceStory's content) in the new home page's theme (owner, November 6 2026; components/home/QrsSections.jsx,
// QrsHome.css). Chosen by ServicePage for the addresses in QH_SERVICE_PAGES there; the same meta, H1, structured data, copy, photos and links as
// the studio layout: the hero (the page's intro, check points and buttons, a visual of its own, the manufacturer logos), the proof strip and review
// logos, the story's statement and paragraph beside the page's photos, "How we …" with its principles (and their bullets), the roof diagram, the
// page's `about` and `sections`, projects, a review, partner logos, articles, the FAQ beside the request form and the closing call to action.

// Labels for related pages that have no card (the service-first hubs)
const OTHER_LABELS = { [ROOF_REPAIR_LINK.href]: ROOF_REPAIR_LINK.label, '/roof-replacement/': 'Roof Replacement' };

// Each page's hero visual, by address
const VISUALS = {
  '/residential-roofing/flat-roofing/repair/': (page, links) => <QhFlatFix caption={unmark(page.story.lead)} links={links} />,
  '/residential-roofing/flat-roofing/replacement/': (page, links) => <QhFlatReroof caption={unmark(page.story.lead)} links={links} />,
  '/residential-roofing/shingle-roofing/repair/': (page, links) => <QhShingleFix caption={unmark(page.story.lead)} links={links} />,
  '/residential-roofing/shingle-roofing/replacement/': (page, links) => <QhShingleCourses caption="Most home roof replacements take 3 to 5 days." links={links} />,
  '/roof-repair/emergency/': (page) => (
    <QhStormTarp
      labels={['Calls after hours and weekends', 'Tarps when needed', 'Photos for your insurance']}
      caption={unmark(page.story.lead)}
    />
  ),
  '/roof-financing/': (page, links) => (
    <QhFinancePath
      items={['Tear-off and deck check', 'Underlayment and flashings', 'Your new roof', 'Cleanup and walkthrough']}
      lenders={page.partners?.items.map((p) => p.name) || []}
      labels={['Written scope and price come first', 'Subject to credit approval']}
      caption="For home roof replacements. Your written price comes before you apply."
      links={links}
    />
  ),
  '/commercial-roofing/office-buildings/': (page, links) => (
    <QhOfficeLeak
      labels={['Curbs and flashings at rooftop HVAC', 'Parapet walls and coping', 'A stained ceiling tile']}
      caption={unmark(page.story.lead)}
      links={links}
    />
  ),
  '/commercial-roofing/churches/': (page, links) => (
    <QhChurchCampus
      labels={['Clay tile sanctuary roof', 'Valleys, flashings and underlayment', 'Low-slope hall roof and drains']}
      caption={unmark(page.story.lead)}
      links={links}
    />
  ),
  '/commercial-roofing/industrial/': (page, links) => (
    <QhIndustrialRoof
      labels={['Stacks, vents and ductwork', 'Equipment supports and curbs', 'Walk paths and ponding areas']}
      caption={unmark(page.story.lead)}
      links={links}
    />
  ),
  '/commercial-roofing/warehouses/': (page, links) => (
    <QhWarehouseSections
      labels={['Drains, scuppers and crickets', 'Ponding and low spots', 'Skylight curbs and roof hatches']}
      caption={unmark(page.story.lead)}
      links={links}
    />
  ),
  '/commercial-roofing/shops/': (page, links) => (
    <QhShopPatches
      labels={['Old patches and worn seams', 'Exhaust fans, vents and skylights', 'Drains and scuppers']}
      caption={unmark(page.story.lead)}
      links={links}
    />
  ),
  '/commercial-roofing/retail/': (page, links) => (
    <QhStorefront
      labels={['Rooftop units, skylights and sign mounts', 'Mansard or façade roofing', 'A leak over one aisle']}
      caption={unmark(page.story.lead)}
      links={links}
    />
  ),
};

export default async function QhServicePage({ page, crumbs, eyebrow, offer, actions, finalCta, processImage, processImageAlt }) {
  const path = crumbs.at(-1).href;
  const commercial = offer === 'commercial';
  const story = page.story; // pages without one show their overview, process steps and reasons instead
  const work = projectsShownOn(path);
  const schema = pageJsonLd({
    path,
    title: page.metaTitle,
    description: page.metaDescription,
    crumbs,
    service: { name: page.title, type: page.keyword, category: eyebrow },
    faqs: page.faqs,
    image: page.image,
  });
  // Related pages as links: a service page's card title, or a roof type hub's label
  const links = (page.related || [])
    .map((href) => {
      const c = cardFor(href);
      const label = c?.title || RESIDENTIAL_TYPES.find((t) => t.href === href)?.label || OTHER_LABELS[href];
      return label && { label: label.replace(/\s*·.*$/, ''), href };
    })
    .filter(Boolean);
  const storyImage = story?.image === false ? null : story?.image || processImage;
  const images = [
    page.image && { src: page.image, alt: page.imageAlt || '' },
    storyImage && { src: storyImage, alt: story?.image ? story.imageAlt || '' : processImageAlt || '' },
    ...links.map((l) => cardFor(l.href)?.image || RESIDENTIAL_TYPES.find((t) => t.href === l.href)?.cardImage).filter(Boolean).map((src) => ({ src, alt: '' })),
  ].filter((img, i, a) => img && a.findIndex((x) => x?.src === img.src) === i).slice(0, 3);
  const cta = commercial ? 'Request a Roof Survey' : 'Get Pro Advice';
  const jump = (
    <div className="qh-actions">
      <SiteLink className="qh-btn qh-btn-sun" href="#roof-check">{cta}</SiteLink>
      <a className="qh-link" href={TEL}>or call {PHONE}</a>
    </div>
  );
  return (
    <main id="top" className="qh">
      <JsonLd data={schema} />
      <QhHero
        crumbs={crumbs}
        title={searchHeading(page.h1 || page.title, { place: false })}
        outcome={heroOutcome(path)}
        text={page.hero.intro}
        checks={page.heroNotes || HERO_ANNOTATIONS[commercial ? 'commercial' : 'home']}
        cta={commercial ? 'Request a roof survey' : 'Book a free roof evaluation'}
        actions={actions}
        badges
        visual={VISUALS[path]?.(page, links)}
      />
      <ProofBar strip />
      <TrustLogos />
      {story ? (
        <>
          {images.length > 0 && (
            <QhStory id="overview" kicker={story.label} heading={unmark(story.lead)} headingTag="p" paragraphs={[story.text]} images={images} actions={jump} />
          )}
          <QhPoints id="how-we-work" kicker="How we work" heading={unmark(story.heading)} items={story.principles} actions={jump} />
        </>
      ) : (
        <>
          {page.overview && images.length > 0 && (
            <QhStory id="overview" kicker={page.title} heading={page.statement || page.title} headingTag="p" paragraphs={page.overview.paragraphs} images={images} actions={jump} />
          )}
          {page.process?.steps?.length > 0 && <QhSteps heading={page.process.heading || page.process.subheading} steps={page.process.steps} />}
          {page.why?.points?.length > 0 && <QhPoints id="why-qrs" kicker="Why QRS" heading={page.why.heading} paragraphs={page.why.intro ? [page.why.intro] : []} items={page.why.points} actions={jump} />}
        </>
      )}
      <RoofDiagram diagram={diagramFor(path)} />
      {page.about && <QhStory id="about" heading={page.about.heading} paragraphs={page.about.paragraphs} images={images.slice(0, 1)} />}
      {page.sections?.map((section, i) => (
        <FeatureBand key={section.heading} {...section} tone={i % 2 ? 'navy' : 'light'} />
      ))}
      <QhProjects projects={work.projects} heading={work.exact ? 'This work, on real roofs' : 'Recent roofing projects'} />
      {page.showReviews !== false && <QhReviews path={path} {...(page.reviewsHeading && { heading: page.reviewsHeading })} />}
      {page.partners && <PartnerLogos {...page.partners} />}
      <QhPosts posts={await articlesFor(path)} heading="Related roofing articles" />
      {page.faqs?.length > 0 && <QhStart faqs={page.faqs} heading="Frequently asked questions" offer={offer} finance={path !== '/roof-financing/'} />}
      <FinalCta {...finalCta} />
    </main>
  );
}
