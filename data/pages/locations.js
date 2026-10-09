// Locations page (/service-areas/): map, every city and service-area FAQs. Each city's own page copy is in data/locationPages.js.

import { ALL_PLACES } from '../locations';

export const LOCATIONS_PAGE = {
  keyword: 'roofing service areas',
  metaTitle: 'Roofing Service Areas in LA & OC',
  metaDescription:
    'Roofing service areas across LA & Orange County, from Santa Monica and Pasadena to Long Beach and Irvine. Check your ZIP and book a free roof evaluation.',
  hero: {
    heading: 'Roofing Service Areas in Los Angeles & Orange County',
    intro:
      `Our roofing service areas cover homes and businesses in ${ALL_PLACES.length} cities across Los Angeles County, Orange County and the Inland Empire (Riverside County and the southwest corner of San Bernardino County), plus the neighborhoods around them. Find your city below, or check your ZIP code on the map.`,
  },
  faqs: [
    {
      q: 'Do you serve my neighborhood?',
      a: 'If you’re in or near one of the cities on this page, there’s a good chance we do. Enter your ZIP code in the map for a quick answer, or call us and we’ll let you know.',
    },
    {
      q: 'Do you work in both Los Angeles and Orange County?',
      a: 'Yes. Our team works across Los Angeles County and Orange County, and also in the Inland Empire, in [Riverside County](/service-areas/riverside-county/) and [San Bernardino County](/service-areas/san-bernardino-county/), from Riverside and Corona to Temecula and Ontario. In Los Angeles and Orange Counties that runs from [Santa Monica](/service-areas/la-county/santa-monica/) and [Pasadena](/service-areas/la-county/pasadena/) to [Irvine](/service-areas/orange-county/irvine/) and [Newport Beach](/service-areas/orange-county/newport-beach/).',
    },
    {
      q: 'What if my city isn’t listed?',
      a: 'We may still be able to help. Call [(310) 340-1643](tel:+13103401643) and tell us where the property is.',
    },
    {
      q: 'Do you work on commercial properties in these areas too?',
      a: 'Yes. Along with homes, we handle [commercial roofing](/commercial-roofing/) and [HOA & multi-family](/residential-roofing/hoa-multi-family/) properties across our service areas.',
    },
  ],
};
