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
import { QhDrainPlan, QhLeakTrace, QhTileLift, QhReroof, QhShingleColors } from '@/components/home/QrsSections';
import { ROOF_COLORS, SHOW_ROOF_COLORS } from '@/data/roofColors';
import ServicePage from './ServicePage';
import { isRepair, REPAIR_ACTIONS } from './shared';

const isCommercial = (section) => section.key === 'commercial';

// Every-roof-type pages listed after a residential hub's own services (inspections and maintenance cover all roof types)
const SHARED_CARDS = [PROGRAMS.inspection.href, PROGRAMS.plans.href];

// ----- Hub pages (/residential-roofing/tile-roofing/, /commercial-roofing/, …) -----
export const hubMetadata = (section) =>
  pageMetadata({ title: section.hub.metaTitle, description: section.hub.metaDescription, path: section.href });

export function SectionHub({ section, extra }) {
  // `hub.cardOverrides` (by service slug) changes a card's title or line on this hub only
  const own = serviceCards(section).map((c, i) => ({ ...c, ...section.hub.cardOverrides?.[section.services[i].slug] }));
  const cards = [...own, ...(isCommercial(section) ? [] : SHARED_CARDS.map(cardFor))];
  const feature = isCommercial(section)
    ? {
        eyebrow: 'Contractors',
        heading: 'Partner With QRS',
        subheading: 'For contractors, builders and property management clients',
        paragraphs: ['Need a roofing partner for your projects? We bring roofer-led assessments, written scopes and photo-documented work to every job we do with you.'],
        cta: { label: 'Partner with us', href: CONTRACTORS_LINK.href },
        image: '/images/bottom-cta-background.webp',
        imageAlt: 'Row of homes with pitched roofs along a residential street',
      }
    : null;
  // The Commercial Roofing page in the new home page's theme (owner, November 6 2026); the other hubs keep HubPage for now
  // Shingle roofing too, with its own hero visual: the roof cycling through the shingle colors (owner, November 6 2026)
  const shingle = section.href === '/residential-roofing/shingle-roofing/';
  // Flat roofing too: a flat roof seen from above, water running to its drain and scupper (owner, November 6 2026)
  const flat = section.href === '/residential-roofing/flat-roofing/';
  // Tile roofing too: a band of clay tiles lifting off the underlayment (owner, November 6 2026)
  const tile = section.href === '/residential-roofing/tile-roofing/';
  const Template = HubPage; // the new-theme hero only (HubQhHero), on the earlier layout (owner, November 10 2026)
  return (
    <Template
      hub={section.hub}
      crumbs={sectionCrumbs(section)}
      eyebrow={section.parent ? section.parent.label : isCommercial(section) ? 'Offices, Retail & Warehouses' : 'Los Angeles & Orange County'}
      image={section.image}
      imageAlt={section.imageAlt}
      scene={section.scenes[0]}
      cards={cards}
      extraGrid={section.serviceTypes ? { heading: 'Commercial Roofing Services', intro: 'Repairs, replacement and ongoing care for any commercial roof.', cards: serviceTypeCards(section) } : null}
      feature={feature}
      offer={isCommercial(section) ? 'commercial' : 'home'}
      extra={extra}
      {...(tile && {
        visual: (
          <QhTileLift
            labels={['Clay, concrete and slate tile', 'The underlayment under the tile', 'Flashings and valleys']}
            caption="The tiles often outlast the layers beneath them."
            links={own.map((c) => ({ label: c.title.replace(/\s*·.*$/, ''), href: c.href }))}
          />
        ),
      })}
      {...(flat && {
        visual: (
          <QhDrainPlan
            labels={section.hub.highlights.points.map((p) => p.title)}
            caption="Flat roofing built so water leaves the roof."
            links={own.map((c) => ({ label: c.title.replace(/\s*·.*$/, '').replace(/ in Los Angeles, CA$/, ''), href: c.href }))}
          />
        ),
      })}
      {...(shingle && {
        visual: <QhShingleColors colors={ROOF_COLORS} note={SHOW_ROOF_COLORS ? 'Cool roof colors, every one rated SRI 20 or higher' : undefined} {...(!SHOW_ROOF_COLORS && { href: '#services', label: 'See our shingle roofing services' })} />,
      })}
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

// ----- Stand-alone pages (/residential-roofing/hoa-multi-family/, /roof-repair/emergency/, /roof-inspection/, /roof-financing/) -----
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
  // Roof Repair in the new home page's theme with its own hero visual, the leak traced to its source (owner, November 6 2026)
  // Roof Replacement too, with its own hero visual: one roof in the four stages of a replacement (owner, November 6 2026)
  const repair = page.href === '/roof-repair/';
  const replacement = page.href === '/roof-replacement/';
  const cards = page.cards.map(cardFor).filter(Boolean);
  const Template = HubPage; // the new-theme hero only (HubQhHero), on the earlier layout (owner, November 10 2026)
  const short = (c) => ({ label: c.title.replace(/\s*·.*$/, '').replace(/ Roof (Repair|Replacement)$/, '').replace(/^Emergency.*/, 'Emergency'), href: c.href });
  return (
    <Template
      {...(repair && { visual: <QhLeakTrace links={cards.filter((c) => !/lift-and-relay/.test(c.href)).map(short)} /> })}
      {...(replacement && { visual: <QhReroof links={cards.map(short)} /> })}
      hub={page.hub}
      crumbs={[HOME, { label: page.label, href: page.href }]}
      eyebrow="Roof Services"
      image={page.image}
      imageAlt={page.imageAlt}
      scene={page.scenes[0]}
      cards={cards}
      process
      offer="home"
      actions={actions}
    />
  );
}
