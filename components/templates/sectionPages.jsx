// Builds the hub page and service pages for a section (shingle, tile, flat, metal, commercial), the stand-alone
// service pages (rain gutters, HOA, emergency, maintenance plans, financing) and the service-first hubs
// (roof repair, replacement, inspection). The route files in app/ call these.

import { CONTRACTORS_LINK, HOME, roofTypeCards, typeCard, SINGLES } from '@/data/catalog';
import {
  cardFor,
  COMMERCIAL,
  findService,
  relatedLinks,
  sectionCrumbs,
  sectionPages,
  serviceCards,
  serviceCrumbs,
  serviceHref,
  serviceTypeCards,
  singleCrumbs,
} from '@/data/content';
import { pageMetadata } from '@/lib/pages';
import HubPage from './HubPage';
import ServicePage from './ServicePage';
import { isRepair, REPAIR_ACTIONS } from './shared';

const isCommercial = (section) => section.key === 'commercial';

// Carousel shown on a page: other roof types on residential pages, other building types on commercial pages
function carouselFor(section, excludeHref) {
  if (isCommercial(section)) {
    return { title: 'More Commercial Roofing', items: serviceCards(COMMERCIAL).filter((c) => c.href !== excludeHref) };
  }
  return { title: 'Roofing Types', items: roofTypeCards(section.href) };
}

// ----- Hub pages (/tile-roofing/, /commercial-roofing/, …) -----
export const hubMetadata = (section) =>
  pageMetadata({ title: section.hub.metaTitle, description: section.hub.metaDescription, path: section.href });

export function SectionHub({ section }) {
  const cards = serviceCards(section);
  if (section.key === 'metal') cards.push(typeCard(SINGLES.gutters)); // the Metal menu also lists rain gutters
  const feature = isCommercial(section)
    ? {
        eyebrow: 'Contractors',
        heading: 'Partner With QRS',
        subheading: 'For general contractors, builders and property managers',
        paragraphs: ['Need a roofing partner for your projects? We bring roofer-led assessments, written scopes and photo-documented work to every job we do with you.'],
        cta: { label: 'Partner with us', href: CONTRACTORS_LINK.href },
        image: '/images/qrs-truck-4k.webp',
        imageAlt: 'Quality Roofing Specialists truck parked on a residential street',
      }
    : null;
  return (
    <HubPage
      hub={section.hub}
      crumbs={sectionCrumbs(section)}
      eyebrow={section.parent ? section.parent.label : 'Los Angeles & Orange County'}
      image={section.image}
      imageAlt={section.imageAlt}
      scene={section.scenes[0]}
      cards={cards}
      carousel={isCommercial(section) ? null : { title: 'Roofing Types', items: roofTypeCards(section.href) }}
      extraGrid={section.serviceTypes ? { heading: 'Commercial Roofing Services', intro: 'Repairs, replacement and ongoing care for any commercial roof.', cards: serviceTypeCards(section) } : null}
      feature={feature}
      offer={isCommercial(section) ? 'commercial' : 'home'}
    />
  );
}

// ----- Service pages (/tile-roofing/lift-and-relay/, …) -----
export const serviceParams = (section) => sectionPages(section).map((s) => ({ service: s.slug }));

export function serviceMetadata(section, slug) {
  const service = findService(section, slug);
  return pageMetadata({ title: service.metaTitle, description: service.metaDescription, path: serviceHref(section, service) });
}

export function SectionService({ section, slug }) {
  const service = findService(section, slug);
  const i = sectionPages(section).indexOf(service);
  const n = section.scenes.length;
  return (
    <ServicePage
      page={service}
      crumbs={serviceCrumbs(section, service)}
      eyebrow={section.label}
      related={relatedLinks(service.related)}
      carousel={carouselFor(section, serviceHref(section, service))}
      scenes={[section.scenes[i % n], section.scenes[(i + 1) % n]]}
      offer={isCommercial(section) ? 'commercial' : 'home'}
      actions={isRepair(service) ? REPAIR_ACTIONS : undefined}
    />
  );
}

// ----- Stand-alone pages (/rain-gutters/, /hoa-multi-family/, /emergency-roof-repair/, /roof-maintenance-plans/, /financing/) -----
export const singleMetadata = (single) =>
  pageMetadata({ title: single.page.metaTitle, description: single.page.metaDescription, path: single.href });

export function SinglePage({ single, actions, finalCta }) {
  return (
    <ServicePage
      page={single.page}
      crumbs={singleCrumbs(single)}
      eyebrow={single.parent ? single.parent.label : 'Roof Services'}
      related={relatedLinks(single.page.related)}
      carousel={{ title: 'Roofing Types', items: roofTypeCards(single.href) }}
      scenes={[single.scenes[0], 'scene-inspect']}
      offer={single.key === 'hoa' ? 'commercial' : 'home'}
      actions={actions}
      {...(finalCta && { finalCta })}
    />
  );
}

// ----- Service-first hubs (/roof-repair/, /roof-replacement/, /roof-inspection/) -----
export const serviceHubMetadata = (page) => pageMetadata({ title: page.hub.metaTitle, description: page.hub.metaDescription, path: page.href });

export function ServiceHub({ page, actions }) {
  return (
    <HubPage
      hub={page.hub}
      crumbs={[HOME, { label: page.label, href: page.href }]}
      eyebrow="Roof Services"
      scene={page.scenes[0]}
      cards={page.cards.map(cardFor).filter(Boolean)}
      carousel={{ title: 'Roofing Types', items: roofTypeCards() }}
      offer="home"
      actions={actions}
    />
  );
}
