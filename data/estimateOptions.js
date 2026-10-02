// Shared between the on-page estimate form (components/sections/EstimateForm.jsx), the Instant Quote
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

export const ROOF_TYPES = ['Not sure', 'Tile', 'Shingle', 'Flat'];

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
