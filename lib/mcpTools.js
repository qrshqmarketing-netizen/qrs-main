// Tools exposed to AI agents over MCP (see app/mcp/route.js). Read-only: nothing here submits a lead, a
// form, or writes anywhere — each tool just looks up real site data, the same data the pages and the chat
// assistant (lib/chatRetrieval.js) already use, so answers stay grounded in what's actually on the site.

import { cityPath, LOCATIONS, SERVICE_RADIUS_MI } from '@/data/locations';
import { BUSINESS, OFFICES, PHONE, SITE_URL } from '@/data/site';
import { findRelevantPages } from './chatRetrieval';
import { formatDate } from './dates';
import { miles, nominatimSearch, zipPrefixServed } from './geo';
import { hoursText } from './hours';

const text = (t, isError = false) => ({ content: [{ type: 'text', text: t }], ...(isError ? { isError: true } : {}) });

function nearestLocation(point) {
  let location = LOCATIONS[0], distance = Infinity;
  for (const l of LOCATIONS) {
    const d = miles(point, [l.lat, l.lng]);
    if (d < distance) { distance = d; location = l; }
  }
  return { location, distance };
}

// Mirrors the ZIP lookup on the Service Area map (components/sections/ServiceArea.jsx): geocode the ZIP,
// find the nearest QRS city, and check it's within SERVICE_RADIUS_MI; falls back to an LA/OC ZIP-prefix
// check if geocoding fails.
async function checkServiceArea({ zip }) {
  const z = String(zip || '').trim();
  if (!/^\d{5}$/.test(z)) return text('Please provide a 5-digit US ZIP code.', true);

  try {
    const hit = await nominatimSearch(`postalcode=${z}&country=US`);
    if (!hit) throw new Error('no match');
    const { location, distance } = nearestLocation([+hit.lat, +hit.lon]);
    const near = `${location.city} (${SITE_URL}${cityPath(location.slug)})`;
    return text(
      distance <= SERVICE_RADIUS_MI
        ? `Yes — ZIP ${z} is inside the QRS service area. Nearest QRS city: ${near}, about ${distance.toFixed(1)} miles away. Call ${PHONE} for a roof check.`
        : `ZIP ${z} looks outside the current QRS service area. Nearest coverage: ${near}, about ${distance.toFixed(1)} miles away. Call ${PHONE} to confirm — service areas expand periodically.`
    );
  } catch {
    return text(
      zipPrefixServed(z)
        ? `ZIP ${z} is within QRS's Southern California service area (Los Angeles County and Orange County). Call ${PHONE} for details.`
        : `ZIP ${z} may be outside the current QRS service area. Call ${PHONE} to confirm.`
    );
  }
}

// Same grounding the chat assistant uses (app/api/chat/route.js): keyword search over every page's real
// content — services, pricing, FAQs, policies — so results are verbatim from the site, not invented.
function searchSite({ query }) {
  const q = String(query || '').trim();
  if (!q) return text('Please provide a search query, e.g. "tile roof replacement cost" or "cancellation policy".', true);
  const blocks = findRelevantPages(q, 3);
  return text(blocks.length ? blocks.join('\n\n---\n\n') : `No close match on the site for "${q}". Try get_business_info, or call ${PHONE}.`);
}

function getBusinessInfo() {
  const lines = [
    `${BUSINESS.name} (${BUSINESS.shortName}) — CSLB license #${BUSINESS.license}, licensed since ${formatDate(BUSINESS.licenseSince)}`,
    BUSINESS.description,
    '',
    `Phone: ${PHONE}`,
    `Email: ${BUSINESS.email}`,
    `Hours: ${hoursText(BUSINESS.hours)}`,
    '',
    'Offices:',
    ...OFFICES.map((o) => `- ${o.name}: ${o.address.street}, ${o.address.city}, ${o.address.region} ${o.address.postalCode}`),
    '',
    `Website: ${SITE_URL}/`,
  ];
  return text(lines.join('\n'));
}

export const TOOLS = [
  {
    name: 'check_service_area',
    description:
      "Check whether a US ZIP code is inside Quality Roofing Specialists' Southern California service area, and find the nearest QRS office/city.",
    inputSchema: {
      type: 'object',
      properties: { zip: { type: 'string', description: '5-digit US ZIP code' } },
      required: ['zip'],
    },
    run: checkServiceArea,
  },
  {
    name: 'search_site',
    description:
      "Search Quality Roofing Specialists' website — services, pricing, roof care plans, FAQs, service areas, policies — and get back the most relevant page content, verbatim from the site.",
    inputSchema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'What to look up, e.g. "tile roof replacement cost" or "cancellation policy"' } },
      required: ['query'],
    },
    run: searchSite,
  },
  {
    name: 'get_business_info',
    description: 'Get Quality Roofing Specialists contact details: phone, email, hours, CSLB license number, and office addresses.',
    inputSchema: { type: 'object', properties: {} },
    run: getBusinessInfo,
  },
];
