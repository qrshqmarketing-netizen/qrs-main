// "Keep reading": for an article (by slug), the articles and service pages it should link to at its end (owner, November 10 2026, from the
// blog search review: ten newer articles had no link from any other article, the guides didn't list the newer articles in their topic, and
// the commercial articles didn't link to each other or to the industrial, warehouse and property manager pages).
// It lives here, not in the article text, so the live copy in Supabase needs no sync and dashboard edits are never overwritten.
// A blog address shows only while that article is live (a scheduled or hidden one is skipped), with its current title; a service page shows
// its menu name (relatedLinks in data/content.js). A link the article's own text already has is left out (BlogPost.jsx).
const B = (slug) => `/blog/${slug}/`;
const INDUSTRIAL = '/commercial-roofing/industrial/';
const WAREHOUSES = '/commercial-roofing/warehouses/';
const MANAGERS = '/commercial-roofing/property-managers/';
const C_MAINT = '/commercial-roofing/maintenance/';
const C_REPAIR = '/commercial-roofing/repair/';

export const KEEP_READING = {
  // Roof leaks
  'roof-leak-source': [B('how-to-find-a-roof-leak'), B('how-to-stop-a-leaking-roof-now'), B('roof-repair-cost')],
  'temporary-roof-repair-options': [B('how-to-stop-a-leaking-roof-now'), B('stop-a-roof-leak'), B('roof-repair-cost')],
  'stop-a-roof-leak': [B('how-to-stop-a-leaking-roof-now'), B('how-to-find-a-roof-leak'), B('roof-repair-cost')],
  'how-to-stop-a-leaking-roof-now': [B('roof-leak-source'), B('roof-insurance-claims-california')],
  'how-to-find-a-roof-leak': [B('how-to-stop-a-leaking-roof-now'), B('roof-repair-cost')],
  'roof-repair-cost': [B('how-to-find-a-roof-leak'), B('how-to-stop-a-leaking-roof-now'), B('roof-restoration-vs-replacement')],
  // Storms and upkeep
  'roof-storm-damage-signs': [B('prepare-your-roof-for-el-nino'), B('how-to-stop-a-leaking-roof-now'), B('roof-insurance-claims-california')],
  'roof-maintenance-checklist': [B('prepare-your-roof-for-el-nino'), B('roof-drip-edge-flashing'), B('what-does-a-roof-inspection-include')],
  'prepare-your-roof-for-el-nino': [B('roof-maintenance-checklist'), B('roof-storm-damage-signs'), B('stop-a-roof-leak'), B('prepare-a-commercial-roof-for-el-nino')],
  'what-does-a-roof-inspection-include': [B('roof-maintenance-checklist'), B('commercial-roof-inspection-checklist')],
  // Commercial and industrial
  'prepare-a-commercial-roof-for-el-nino': [B('commercial-roof-inspection-checklist'), B('commercial-roof-leak-repair'), C_MAINT, WAREHOUSES, INDUSTRIAL],
  'commercial-roof-inspection-checklist': [B('prepare-a-commercial-roof-for-el-nino'), B('how-to-vet-commercial-roofing-near-me'), C_MAINT, MANAGERS],
  'commercial-roof-leak-repair': [B('commercial-roof-repair-company'), B('prepare-a-commercial-roof-for-el-nino'), C_REPAIR, INDUSTRIAL, WAREHOUSES],
  'how-to-choose-a-commercial-roofing-contractor': [B('how-to-choose-a-commercial-roofing-company-los-angeles'), B('how-to-vet-commercial-roofing-near-me'), B('commercial-roof-repair-company'), MANAGERS, INDUSTRIAL],
  'how-to-choose-a-commercial-roofing-company-los-angeles': [B('how-to-vet-commercial-roofing-near-me'), B('commercial-roof-repair-company'), B('most-in-demand-commercial-roofing'), MANAGERS],
  'how-to-vet-commercial-roofing-near-me': [B('most-in-demand-commercial-roofing'), B('commercial-roof-inspection-checklist'), INDUSTRIAL, WAREHOUSES],
  'commercial-roof-repair-company': [B('how-to-vet-commercial-roofing-near-me'), B('commercial-roof-leak-repair'), C_REPAIR, INDUSTRIAL, WAREHOUSES],
  'commercial-roof-replacement-planning': [B('most-in-demand-commercial-roofing'), B('how-to-choose-a-commercial-roofing-company-los-angeles'), INDUSTRIAL, WAREHOUSES, MANAGERS],
  'tpo-roofing-pros-and-cons': [B('most-in-demand-commercial-roofing'), B('commercial-roof-replacement-planning'), WAREHOUSES, INDUSTRIAL],
  'most-in-demand-commercial-roofing': [B('tpo-roofing-pros-and-cons'), B('torch-down-roofing-app-vs-sbs'), B('commercial-roof-replacement-planning'), INDUSTRIAL, WAREHOUSES],
  // Tile
  'how-to-choose-a-roofing-firm-near-me': [B('how-to-choose-a-roofer-los-angeles-ca'), B('roof-warranty-explained'), B('how-to-choose-a-shingle-roofer-los-angeles'), B('tile-roofing-specialist-los-angeles')],
  'tile-roof-guide-southern-california': [B('spanish-tile-roof-los-angeles'), B('tile-roof-reset-vs-repair'), B('tile-roofing-specialist-los-angeles'), B('roof-warranty-explained')],
  'spanish-tile-roof-los-angeles': [B('tile-roof-guide-southern-california'), B('clay-vs-concrete-tile-roof'), B('tile-roof-underlayment'), B('tile-roof-reset-vs-repair'), B('tile-lift-and-relay-vs-new-tile-roof')],
  'tile-lift-and-relay-vs-new-tile-roof': [B('tile-roof-reset-vs-repair'), B('tile-roofing-specialist-los-angeles')],
  'tile-roof-underlayment': [B('spanish-tile-roof-los-angeles'), B('tile-roof-reset-vs-repair'), B('tile-roofing-specialist-los-angeles')],
  'clay-vs-concrete-tile-roof': [B('spanish-tile-roof-los-angeles'), B('tile-roof-reset-vs-repair')],
  'tile-roof-reset-vs-repair': [B('spanish-tile-roof-los-angeles'), B('tile-roof-underlayment'), B('tile-lift-and-relay-vs-new-tile-roof')],
  // Shingle
  'asphalt-shingle-roof-guide': [B('roof-drip-edge-flashing'), B('how-to-choose-a-shingle-roofer-los-angeles'), B('top-qualities-shingle-roofers-los-angeles-orange-county')],
  'how-to-choose-a-shingle-roofer-los-angeles': [B('top-qualities-shingle-roofers-los-angeles-orange-county'), B('roof-drip-edge-flashing'), B('how-to-choose-a-roofer-los-angeles-ca')],
  'top-qualities-shingle-roofers-los-angeles-orange-county': [B('how-to-choose-a-roofer-los-angeles-ca'), B('roof-drip-edge-flashing')],
  'architectural-vs-3-tab-shingles': [B('roof-drip-edge-flashing'), B('top-qualities-shingle-roofers-los-angeles-orange-county')],
  'shingle-granules-in-gutter': [B('roof-drip-edge-flashing')],
  'roof-drip-edge-flashing': [B('shingle-granules-in-gutter'), B('roof-maintenance-checklist')],
  // Replacement and choosing a roofer
  'roof-replacement-guide': [B('how-to-choose-a-roofer-los-angeles-ca'), B('roof-warranty-explained'), B('roofing-permits-los-angeles'), B('roof-replacement-cost-los-angeles'), B('how-to-pay-for-a-new-roof')],
  'best-roofer-los-angeles': [B('how-to-choose-a-roofer-los-angeles-ca'), B('top-qualities-shingle-roofers-los-angeles-orange-county')],
  'how-to-choose-a-roofer-los-angeles-ca': [B('how-to-choose-a-roofing-firm-near-me'), B('best-roofer-los-angeles'), B('how-to-choose-a-shingle-roofer-los-angeles'), B('how-to-vet-commercial-roofing-near-me')],
  'roof-warranty-explained': [B('how-to-choose-a-roofing-firm-near-me'), B('how-to-choose-a-roofer-los-angeles-ca')],
  // Flat
  'flat-roofs-los-angeles-guide': [B('torch-down-roofing-app-vs-sbs'), B('cool-roof-southern-california'), B('most-in-demand-commercial-roofing'), '/residential-roofing/flat-roofing/torch-down/'],
};
