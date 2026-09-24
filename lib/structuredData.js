// Structured data (JSON-LD) that describes the business and each page to search engines and AI assistants:
// who QRS is, what a page offers, where it sits in the site and its FAQs. Built from the data/ files so it
// always matches what the page shows.

import { LOCATIONS, SERVICE_COUNTIES } from '@/data/locations';
import { SERVICES } from '@/data/services';
import { BUSINESS, PHONE_INTL, SITE_URL, SOCIAL } from '@/data/site';
import { plainText } from './richText';

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const SHARE_IMAGE = `${SITE_URL}/og-image.jpg`;

const url = (path) => `${SITE_URL}${path}`;
const sentence = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const COUNTIES = SERVICE_COUNTIES.map((name) => ({ '@type': 'AdministrativeArea', name }));

// The business. Every page includes it, so each page's structured data stands on its own.
function business() {
  const { address, geo } = BUSINESS;
  return {
    '@type': 'RoofingContractor',
    '@id': ORG_ID,
    name: BUSINESS.name,
    alternateName: BUSINESS.shortName,
    url: url('/'),
    logo: { '@type': 'ImageObject', url: url('/apple-touch-icon.png'), width: 180, height: 180 },
    image: SHARE_IMAGE,
    description: BUSINESS.description,
    telephone: PHONE_INTL,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: geo.latitude, longitude: geo.longitude },
    hasMap: BUSINESS.mapUrl,
    openingHoursSpecification: BUSINESS.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days.length === 1 ? h.days[0] : h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: [...COUNTIES, ...LOCATIONS.map((l) => ({ '@type': 'City', name: `${l.city}, CA` }))],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      name: `California contractor license #${BUSINESS.license}`,
      recognizedBy: { '@type': 'GovernmentOrganization', name: 'Contractors State License Board', url: 'https://www.cslb.ca.gov/' },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Roofing services',
      itemListElement: SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.schemaName, url: url(s.href) } })),
    },
    sameAs: [BUSINESS.mapUrl, ...Object.values(SOCIAL).filter((link) => link.startsWith('http'))],
  };
}

const website = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: url('/'),
  name: BUSINESS.name,
  alternateName: BUSINESS.shortName,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-US',
});

const question = (faq) => ({
  '@type': 'Question',
  name: plainText(faq.q),
  acceptedAnswer: { '@type': 'Answer', text: plainText(faq.a) },
});

// What a page offers. service: { name, type, category, area, catalog: [{ name, href }] }
// area defaults to both counties; catalog lists the services the page links to.
function serviceNode(pageUrl, description, service) {
  return {
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: service.name,
    serviceType: sentence(service.type || service.name),
    ...(service.category && { category: service.category }),
    description,
    url: pageUrl,
    provider: { '@id': ORG_ID },
    areaServed: service.area || COUNTIES,
    ...(service.catalog?.length > 0 && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: service.name,
        itemListElement: service.catalog.map((c) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: c.name, url: url(c.href) } })),
      },
    }),
  };
}

// Structured data for a page, from the same title, description and address as its meta tags.
// type: 'WebPage', 'CollectionPage' (hubs and lists) or 'AboutPage'. crumbs: the breadcrumb trail shown on the page.
// service: what the page offers (see serviceNode). faqs: the FAQs shown on the page. parts: pages it lists, [{ label, href }].
// image: the page's main photo, when it has one.
export function pageJsonLd({ path, title, description, type = 'WebPage', crumbs, service, faqs = [], parts, image }) {
  const pageUrl = url(path);
  const page = {
    '@type': faqs.length > 0 ? [type, 'FAQPage'] : type,
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: path === '/' ? title : `${title} | ${BUSINESS.name}`, // matches the <title> (the home title already has the name)
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': service ? `${pageUrl}#service` : ORG_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: image ? url(image) : SHARE_IMAGE },
    inLanguage: 'en-US',
  };
  if (type === 'AboutPage') page.mainEntity = { '@id': ORG_ID };
  if (faqs.length > 0) page.mainEntity = faqs.map(question);
  if (parts) page.hasPart = parts.map((p) => ({ '@type': 'WebPage', '@id': `${url(p.href)}#webpage`, url: url(p.href), name: p.label }));

  const graph = [business(), website(), page];
  if (crumbs) {
    page.breadcrumb = { '@id': `${pageUrl}#breadcrumb` };
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: url(c.href) })),
    });
  }
  if (service) graph.push(serviceNode(pageUrl, description, service));
  return { '@context': 'https://schema.org', '@graph': graph };
}
