// The /start/ page: a short step-by-step request form (components/sections/StartStepper.jsx) that replaced the estimate form
// that used to sit at the bottom of every page. Every "Get Pro Advice" / "Request an Estimate" link goes here: the data files
// still say '#roof-check', and SiteLink turns that into START_PATH (components/ui/SiteLink.jsx), so change the address in one place.
//
// The steps adapt to the answers (stepsFor): the urgency question appears only for repairs, the roof screen adds a timing
// question for repairs and replacements and a role question for HOA and commercial properties, and the page picks up answers
// from the page the visitor came from (prefillForPath) and from the ?need= choice made on a page's start card.
// Everything is sent to /api/lead/ in the fields it already has (service, roofType, zip, message…), so the email and the
// spreadsheet need no changes.

export const START_PATH = '/start/';
export const ROOF_CHECK_HASH = '#roof-check'; // what the data files link to; SiteLink sends it to START_PATH

// ?need=repair on the start link pre-answers the first question (the start card on each page uses these)
export const startHref = (need) => (need ? `${START_PATH}?need=${need}` : START_PATH);

// Step 1. `service` is the value the lead email and spreadsheet use (data/estimateOptions.js SERVICE_OPTIONS).
export const NEEDS = [
  { id: 'repair', label: 'Roof repair', hint: 'A leak, damage or something that looks wrong', service: 'Roof repair' },
  { id: 'replacement', label: 'Roof replacement', hint: 'A new roof, or mine is near the end', service: 'Roof replacement' },
  { id: 'inspection', label: 'Roof inspection', hint: 'A free roofer-led evaluation with photos', service: 'Roof inspection / roof check' },
  { id: 'maintenance', label: 'Roof maintenance', hint: 'Scheduled care that catches small problems early', service: 'Roof maintenance plan' },
  { id: 'unsure', label: 'Not sure yet', hint: 'Help me work out what the roof needs', service: 'Not sure yet' },
];

// Step 2. HOA and commercial properties are sent as "Commercial or HOA roofing" (the need goes in the message).
export const PROPERTIES = [
  { id: 'home', label: 'My home', hint: 'House, townhome, condo or ADU' },
  { id: 'hoa', label: 'An HOA or multi-family building', hint: 'Apartments, condos and community associations' },
  { id: 'commercial', label: 'A business or commercial building', hint: 'Offices, retail, churches, warehouses' },
];

// Step 3 (repairs only)
export const URGENCY = [
  { id: 'yes', label: 'Yes, water is coming in now' },
  { id: 'no', label: 'No, it can be scheduled' },
];

// Roof screen. `value` is what /api/lead/ accepts (data/estimateOptions.js ROOF_TYPES).
export const ROOFS = [
  { value: 'Tile', label: 'Tile' },
  { value: 'Shingle', label: 'Shingle' },
  { value: 'Flat', label: 'Flat or low-slope' },
  { value: 'Not sure', label: 'Not sure' },
];
export const TIMINGS = ['As soon as possible', 'Within a month', 'In 1 to 3 months', 'Just exploring'];
export const ROLES = ['Owner', 'Property manager', 'HOA board member or manager', 'Other'];

// The steps to show for these answers, in order. A step that doesn't apply is simply left out (and its answer isn't sent).
export function stepsFor(a) {
  return ['need', 'property', ...(a.need === 'repair' ? ['urgency'] : []), 'details', 'contact'];
}
export const STEP_LABELS = { need: 'Service', property: 'Property', urgency: 'Urgency', details: 'Roof', contact: 'Contact' };

// Extra questions on the roof screen
export const askTiming = (a) => a.need === 'replacement' || (a.need === 'repair' && a.urgency === 'no');
export const askRole = (a) => a.property === 'hoa' || a.property === 'commercial';

// Is this step answered? (the contact step is finished by sending it)
export function stepDone(step, a) {
  if (step === 'need') return Boolean(a.need);
  if (step === 'property') return Boolean(a.property);
  if (step === 'urgency') return Boolean(a.urgency);
  if (step === 'details') return Boolean(a.roof);
  return false;
}

// Answers the page the visitor came from already implies, so they don't have to give them again. Only what's certain.
export function prefillForPath(path = '') {
  const a = {};
  const has = (s) => path.includes(s);
  if (path.startsWith('/commercial-roofing')) a.property = 'commercial';
  if (has('/hoa-multi-family')) a.property = 'hoa';
  if (has('/roof-repair') || has('/repair/')) a.need = 'repair';
  if (has('/roof-replacement') || has('/replacement/') || has('/installation/')) a.need = 'replacement';
  if (has('/roof-inspection')) a.need = 'inspection';
  if (has('/roof-maintenance-plans') || has('/maintenance/')) a.need = 'maintenance';
  if (has('/tile-roofing')) a.roof = 'Tile';
  if (has('/shingle-roofing')) a.roof = 'Shingle';
  if (has('/flat-roofing')) a.roof = 'Flat';
  return a;
}

// ZIP prefixes where we usually work: Los Angeles and Orange counties plus the Inland Empire on the service area map.
// Only used for a friendly heads-up under the ZIP field; it never blocks a request.
export function zipLikelyServed(zip, zipPrefixServed) {
  const prefix = +String(zip).slice(0, 3);
  return zipPrefixServed(zip) || prefix === 923 || prefix === 924 || prefix === 925;
}

// The request as the lead endpoint takes it: the existing fields, plus the details written into the message
export function leadFields(a, contact) {
  const need = NEEDS.find((n) => n.id === a.need);
  const property = PROPERTIES.find((p) => p.id === a.property);
  const urgent = a.need === 'repair' && a.urgency === 'yes';
  const lines = [
    urgent && 'URGENT: water is coming in right now.',
    property && `Property: ${property.label}`,
    need && `Looking for: ${need.label}`,
    a.roof && `Roof: ${ROOFS.find((r) => r.value === a.roof)?.label || a.roof}`,
    askTiming(a) && a.timing && `Timing: ${a.timing}`,
    askRole(a) && a.role && `Their role: ${a.role}`,
    askRole(a) && contact.company && `Property or company: ${contact.company}`,
    contact.message && `Notes: ${contact.message}`,
  ].filter(Boolean);
  return {
    name: contact.name,
    phone: contact.phone,
    email: contact.email,
    zip: contact.zip,
    foundUs: contact.foundUs,
    service: askRole(a) ? 'Commercial or HOA roofing' : need?.service || '',
    roofType: a.roof || '',
    message: lines.join('\n'),
  };
}
