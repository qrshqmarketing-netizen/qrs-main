// Structured data (JSON-LD) that tells search engines about the business: address, hours,
// service area and services. Built from the data/ files so it stays in sync with the page.

import { LOCATIONS, SERVICE_COUNTIES } from '@/data/locations';
import { SERVICES } from '@/data/services';
import { BUSINESS, PHONE_INTL, SITE_URL } from '@/data/site';

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function homeJsonLd({ title }) {
  const { address, geo } = BUSINESS;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'RoofingContractor',
        '@id': ORG_ID,
        name: BUSINESS.name,
        alternateName: BUSINESS.shortName,
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/apple-touch-icon.png`,
        image: `${SITE_URL}/og-image.jpg`,
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
        areaServed: [
          ...SERVICE_COUNTIES.map((name) => ({ '@type': 'AdministrativeArea', name })),
          ...LOCATIONS.map((l) => ({ '@type': 'City', name: `${l.city}, CA` })),
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Roofing services',
          itemListElement: SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.schemaName } })),
        },
        sameAs: [BUSINESS.mapUrl],
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: BUSINESS.name,
        publisher: { '@id': ORG_ID },
        inLanguage: 'en-US',
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: title,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORG_ID },
        primaryImageOfPage: `${SITE_URL}/og-image.jpg`,
        inLanguage: 'en-US',
      },
    ],
  };
}

// Breadcrumb trail for search engines: [{ label, href }], from Home to the current page
export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}
