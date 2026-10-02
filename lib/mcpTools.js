// Tools exposed to AI agents over MCP (see app/mcp/route.js). Most are read-only lookups over real site
// data, the same data the pages and the chat assistant (lib/chatRetrieval.js) already use, so answers stay
// grounded in what's actually on the site. request_estimate is the one exception: it submits a real lead
// through the same pipeline as the website's forms and chat (lib/leads.js) — see its own comment below for the
// safeguards around that.

import { ROOF_TYPES, SERVICE_OPTIONS } from '@/data/estimateOptions';
import { cityPath, LOCATIONS, SERVICE_RADIUS_MI } from '@/data/locations';
import { BUSINESS, OFFICES, PHONE, SITE_URL } from '@/data/site';
import { findRelevantPages } from './chatRetrieval';
import { after } from 'next/server';
import { deliverLead } from './leads';
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

// --- request_estimate: the one tool here that writes anything ---
//
// Best-effort in-memory rate limit, keyed by caller IP: blunts a scripted flood from one source. It resets
// on cold start/redeploy and isn't shared across server instances, so it's not a substitute for a real
// WAF/rate-limit layer — just a cheap first line of defense for a publicly reachable write endpoint.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const submissionsByIP = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const hits = (submissionsByIP.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  hits.push(now);
  submissionsByIP.set(ip, hits);
  return hits.length > RATE_LIMIT_MAX;
}

const PHONE_RE = /(\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;
const clip = (s, max) => String(s || '').trim().slice(0, max);

// Submits a real lead through the same pipeline as the website's forms and chat (lib/leads.js: email + leads
// spreadsheet), tagged source: 'mcp' so it's distinguishable from web-form and chat leads.
async function requestEstimate(args, { ip } = {}) {
  if (rateLimited(ip || 'unknown')) {
    return text('Too many requests submitted recently. Please call ' + PHONE + ' directly.', true);
  }

  const name = clip(args?.name, 120);
  const phone = clip(args?.phone, 40);
  if (!name) return text('A name is required to submit an estimate request.', true);
  if (!PHONE_RE.test(phone)) return text('A valid US phone number is required to submit an estimate request.', true);

  const email = clip(args?.email, 200);
  const zip = clip(args?.zip, 10);
  const service = SERVICE_OPTIONS.includes(args?.service) ? args.service : '';
  const roofType = ROOF_TYPES.includes(args?.roofType) ? args.roofType : '';
  const message = clip(args?.message, 1000);

  after(() => deliverLead({ source: 'mcp', name, phone, email, zip, service, roofType, message }).catch(() => {}));

  return text(
    `Thanks, ${name} — your request is in. Quality Roofing Specialists will reach out at ${phone}${email ? ' or ' + email : ''} to follow up${service ? ' about ' + service.toLowerCase() : ''}. ` +
      `By submitting this, ${name} agreed QRS may contact them by phone, text or email about the request, including with automated technology — consent isn't required to do business with QRS. ` +
      `See ${SITE_URL}/privacy-policy/ and ${SITE_URL}/terms-and-conditions/.`
  );
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
    annotations: { readOnlyHint: true, openWorldHint: false },
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
    annotations: { readOnlyHint: true, openWorldHint: false },
    run: searchSite,
  },
  {
    name: 'get_business_info',
    description: 'Get Quality Roofing Specialists contact details: phone, email, hours, CSLB license number, and office addresses.',
    inputSchema: { type: 'object', properties: {} },
    annotations: { readOnlyHint: true, openWorldHint: false },
    run: getBusinessInfo,
  },
  {
    name: 'request_estimate',
    description:
      'Submit a real roofing estimate/contact request to Quality Roofing Specialists on behalf of a real person who wants to be contacted. ' +
      'This creates an actual business lead and QRS will call, text or email the person about it — only call this after the person has given ' +
      'their real name and phone number and clearly agreed they want QRS to reach out. Do not call this speculatively or with placeholder/guessed ' +
      'contact info. This does not measure a roof or produce a price (no instant quote) — it just requests a callback for one.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: "The person's full name" },
        phone: { type: 'string', description: 'A real US phone number QRS can call or text back' },
        email: { type: 'string', description: 'Optional email address' },
        zip: { type: 'string', description: 'Optional ZIP code of the property' },
        service: { type: 'string', enum: SERVICE_OPTIONS, description: 'Optional: what they need' },
        roofType: { type: 'string', enum: ROOF_TYPES, description: 'Optional: their roof type, if known' },
        message: { type: 'string', description: "Optional: what's going on with the roof, in their own words" },
      },
      required: ['name', 'phone'],
    },
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
    run: requestEstimate,
  },
];
