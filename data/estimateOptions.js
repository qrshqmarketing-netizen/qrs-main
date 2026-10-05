// Shared between the /start/ request steps (data/start.js), the Instant Quote
// (components/widgets/InstantQuote.jsx), the lead endpoint (app/api/lead/route.js) and the MCP request_estimate
// tool (lib/mcpTools.js), so they all offer, and accept, the exact same choices.

export const SERVICE_OPTIONS = [
  'Roof inspection / roof check',
  'Roof maintenance plan',
  'Roof repair',
  'Roof replacement',
  'Tile lift & relay',
  'Flat roofing',
  'Shingle roofing',
  'Commercial or HOA roofing',
  'Not sure yet',
];

export const ROOF_TYPES = ['Not sure', 'Tile', 'Shingle', 'Flat', 'Metal'];

// "Preferred time" for the visit (optional, on /start/): windows inside our weekday hours (BUSINESS.hours in data/site.js, Monday-Friday 8 am-6 pm).
// Shown in the lead email and its own spreadsheet column, next to the preferred date.
export const VISIT_TIMES = ['Morning (8 am–12 pm)', 'Afternoon (12–3 pm)', 'Late afternoon (3–6 pm)', 'Flexible'];

// "How did you find us?" (optional). Shown in the lead email and its own spreadsheet column.
export const FOUND_US_OPTIONS = [
  'Google search',
  'Google Maps',
  'AI chat (ChatGPT, Gemini, Copilot, etc.)',
  'Yelp',
  'Facebook or Instagram',
  'Nextdoor',
  'Friend, family or neighbor',
  'Returning customer',
  'Other',
];
