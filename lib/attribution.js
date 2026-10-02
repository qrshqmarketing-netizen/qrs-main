// Where a visit came from: the utm_* tags on the link (Google Business Profile links, ads, emails...) and the page the
// link landed on. CampaignWelcome notes them in sessionStorage so they're still known when the visitor reaches a form on
// a later page; the form widgets send them with the lead, and app/api/lead and app/api/chat clean them again before
// lib/leads.js puts them in the email and spreadsheet.
import { session } from '@/lib/storage';

const KEY = 'qrs-utm';
const TAGS = ['source', 'medium', 'campaign'];

// Letters, numbers and a few separators only, so a crafted link can't carry markup into an email or sheet
const cleanTag = (value) => (typeof value === 'string' ? value.replace(/[^A-Za-z0-9 ._~+-]/g, '').trim().slice(0, 80) : '');

// A page address like /service-areas/la-county/vernon/ (no query string), or '' for anything else
const cleanPath = (value) => (typeof value === 'string' && value.startsWith('/') ? value.replace(/[^A-Za-z0-9/_.~%-]/g, '').slice(0, 200) : '');

// { source, medium, campaign, landing }, keeping only the parts that are present
export function cleanAttribution(value) {
  const clean = {};
  for (const tag of TAGS) {
    const text = cleanTag(value?.[tag]);
    if (text) clean[tag] = text;
  }
  const landing = cleanPath(value?.landing);
  if (landing) clean.landing = landing;
  return clean;
}

// Browser only. Notes the current link's utm tags and the page it landed on (a new tagged visit replaces the old note)
// and returns what's known. A visit without utm tags notes nothing.
export function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  const found = cleanAttribution(Object.fromEntries(TAGS.map((tag) => [tag, params.get(`utm_${tag}`)])));
  if (Object.keys(found).length) session.set(KEY, JSON.stringify({ ...found, landing: window.location.pathname }));
  return currentAttribution();
}

// Browser only. The utm tags noted earlier in this visit: {} for a visit without any.
export function currentAttribution() {
  try {
    return cleanAttribution(JSON.parse(session.get(KEY)));
  } catch {
    return {};
  }
}

// The lead fields lib/leads.js shows (email rows, spreadsheet columns) for a { source, medium, campaign, landing } object
export function leadAttribution(value) {
  const utm = cleanAttribution(value);
  return { utmSource: utm.source || '', utmMedium: utm.medium || '', utmCampaign: utm.campaign || '', landingPage: utm.landing || '' };
}
