// The utm tags on the link a visitor arrived by (the website's lib/attribution.js): letters, numbers and a few separators only, so a crafted link can't
// carry markup into an email or spreadsheet.
const TAGS = ['source', 'medium', 'campaign'];
const cleanTag = (value) => (typeof value === 'string' ? value.replace(/[^A-Za-z0-9 ._~+-]/g, '').trim().slice(0, 80) : '');
const cleanPath = (value) => (typeof value === 'string' && value.startsWith('/') ? value.replace(/[^A-Za-z0-9/_.~%-]/g, '').slice(0, 200) : '');

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

export function leadAttribution(value) {
  const utm = cleanAttribution(value);
  return { utmSource: utm.source || '', utmMedium: utm.medium || '', utmCampaign: utm.campaign || '', landingPage: utm.landing || '' };
}
