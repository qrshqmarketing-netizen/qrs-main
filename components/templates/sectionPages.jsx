// Builds the hub page and service pages for a section (shingle, tile, flat, commercial), the stand-alone
// service pages (rain gutters, HOA, emergency, maintenance plans, financing) and the service-first hubs
// (roof repair, replacement, inspection). The route files in app/ call these.

import { CONTRACTORS_LINK, HOME, PROGRAMS } from '@/data/catalog';
import {
  cardFor,
  hubFor,
  findService,
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

// Every-roof-type pages listed after a residential hub's own services (inspections and maintenance cover all roof types)
const SHARED_CARDS = [PROGRAMS.inspection.href, PROGRAMS.plans.href];

// ----- Hub pages (/residential-roofing/tile-roofing/, /commercial-roofing/, …) -----
export const hubMetadata = (section) =>
  pageMetadata({ title: section.hub.metaTitle, description: section.hub.metaDescription, path: section.href });

export function SectionHub({ section }) {
  const cards = [...serviceCards(section), ...(isCommercial(section) ? [] : SHARED_CARDS.map(cardFor))];
  const feature = isCommercial(section)
    ? {
        eyebrow: 'Contractors',
        heading: 'Partner With QRS',
        subheading: 'For general contractors, builders and property managers',
        paragraphs: ['Need a roofing partner for your projects? We bring roofer-led assessments, written scopes and photo-documented work to every job we do with you.'],
        cta: { label: 'Partner with us', href: CONTRACTORS_LINK.href },
        image: '/images/bottom-cta-background.webp',
        imageAlt: 'Row of homes with pitched roofs along a residential street',
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
      extraGrid={section.serviceTypes ? { heading: 'Commercial Roofing Services', intro: 'Repairs, replacement and ongoing care for any commercial roof.', cards: serviceTypeCards(section) } : null}
      feature={feature}
      offer={isCommercial(section) ? 'commercial' : 'home'}
    />
  );
}

// ----- Service pages (/residential-roofing/tile-roofing/lift-and-relay/, …) -----
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
      hub={hubFor(serviceHref(section, service))}
      crumbs={serviceCrumbs(section, service)}
      eyebrow={section.label}
      scenes={[section.scenes[i % n], section.scenes[(i + 1) % n]]}
      offer={isCommercial(section) ? 'commercial' : 'home'}
      actions={isRepair(service) ? REPAIR_ACTIONS : undefined}
    />
  );
}

// ----- Stand-alone pages (/residential-roofing/rain-gutters/, /residential-roofing/hoa-multi-family/, /emergency-roof-repair/, /roof-inspection/, /roof-financing/) -----
export const singleMetadata = (single) =>
  pageMetadata({ title: single.page.metaTitle, description: single.page.metaDescription, path: single.href });

export function SinglePage({ single, actions, finalCta }) {
  return (
    <ServicePage
      page={single.page}
      hub={hubFor(single.href)}
      crumbs={singleCrumbs(single)}
      eyebrow={single.parent ? single.parent.label : 'Roof Services'}
      scenes={[single.scenes[0], 'scene-inspect']}
      offer={single.key === 'hoa' ? 'commercial' : 'home'}
      actions={actions}
      {...(finalCta && { finalCta })}
    />
  );
}

// ----- Service-first hubs (/roof-repair/, /roof-replacement/) -----
export const serviceHubMetadata = (page) => pageMetadata({ title: page.hub.metaTitle, description: page.hub.metaDescription, path: page.href });

export function ServiceHub({ page, actions }) {
  return (
    <HubPage
      hub={page.hub}
      crumbs={[HOME, { label: page.label, href: page.href }]}
      eyebrow="Roof Services"
      scene={page.scenes[0]}
      cards={page.cards.map(cardFor).filter(Boolean)}
      process
      offer="home"
      actions={actions}
    />
  );
}
