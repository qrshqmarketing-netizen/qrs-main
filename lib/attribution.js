// Where a visit came from: the utm_* tags on the link (Google Business Profile links, ads, emails...).
// The landing page notes them in sessionStorage (CampaignWelcome) so they're still known when the visitor reaches a
// form on a later page; the form widgets send them with the lead, and app/api/lead and app/api/chat clean them again
// before lib/leads.js puts them in the email and spreadsheet.
import { session } from '@/lib/storage';

const KEY = 'qrs-utm';
const TAGS = ['source', 'medium', 'campaign'];

// Letters, numbers and a few separators only, so a crafted link can't carry markup into an email or sheet
const cleanTag = (value) => (typeof value === 'string' ? value.replace(/[^A-Za-z0-9 ._~+-]/g, '').trim().slice(0, 80) : '');

// { source, medium, campaign }, keeping only the tags that are present
export function cleanAttribution(value) {
  const clean = {};
  for (const tag of TAGS) {
    const text = cleanTag(value?.[tag]);
    if (text) clean[tag] = text;
  }
  return clean;
}

// Browser only. Notes the current link's utm tags (a new tagged visit replaces the old note) and returns what's known.
export function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  const found = cleanAttribution(Object.fromEntries(TAGS.map((tag) => [tag, params.get(`utm_${tag}`)])));
  if (Object.keys(found).length) session.set(KEY, JSON.stringify(found));
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

// The lead fields lib/leads.js shows (email rows, spreadsheet columns) for a { source, medium, campaign } object
export function leadAttribution(value) {
  const utm = cleanAttribution(value);
  return { utmSource: utm.source || '', utmMedium: utm.medium || '', utmCampaign: utm.campaign || '' };
}
