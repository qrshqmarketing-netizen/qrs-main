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
  'roof-leak-source': [B('leaking-skylight-reseal-or-replace'), B('small-roof-leak-big-problem'), B('failing-chimney-flashing'), B('how-to-trace-a-roof-leak-in-the-attic'), B('how-to-read-a-ceiling-stain'), B('how-to-find-a-roof-leak'), B('how-to-stop-a-leaking-roof-now'), B('roof-repair-cost')],
  'temporary-roof-repair-options': [B('how-to-stop-a-leaking-roof-now'), B('stop-a-roof-leak'), B('roof-repair-cost')],
  'stop-a-roof-leak': [B('first-hour-active-roof-leak'), B('how-to-stop-a-leaking-roof-now'), B('how-to-find-a-roof-leak'), B('roof-repair-cost')],
  'how-to-stop-a-leaking-roof-now': [B('first-hour-active-roof-leak'), B('how-to-read-a-ceiling-stain'), B('roof-leak-source'), B('roof-insurance-claims-california')],
  'how-to-find-a-roof-leak': [B('how-to-trace-a-roof-leak-in-the-attic'), B('how-to-read-a-ceiling-stain'), B('how-to-stop-a-leaking-roof-now'), B('roof-repair-cost')],
  'roof-repair-cost': [B('cheapest-roofing-quote'), B('small-roof-leak-big-problem'), B('how-to-find-a-roof-leak'), B('how-to-stop-a-leaking-roof-now'), B('roof-restoration-vs-replacement')],
  // Storms and upkeep
  'roof-storm-damage-signs': [B('tree-branches-over-your-roof'), B('hail-damage-vs-normal-wear'), B('sagging-roofline-urgent'), B('curling-cracked-missing-shingles'), B('how-to-check-your-roof-from-the-ground'), B('prepare-your-roof-for-el-nino'), B('how-to-stop-a-leaking-roof-now'), B('roof-insurance-claims-california')],
  'how-to-trace-a-roof-leak-in-the-attic': [B('sagging-roofline-urgent'), B('roof-leak-source'), B('how-to-stop-a-leaking-roof-now'), B('roof-repair-cost')],
  'how-to-read-a-ceiling-stain': [B('leaking-skylight-reseal-or-replace'), B('how-to-trace-a-roof-leak-in-the-attic'), B('roof-leak-source'), B('stop-a-roof-leak'), B('roof-repair-cost')],
  'how-to-check-your-roof-from-the-ground': [B('tree-branches-over-your-roof'), B('how-old-is-my-roof'), B('hail-damage-vs-normal-wear'), B('shingle-granule-loss'), B('how-to-read-a-ceiling-stain'), B('roof-storm-damage-signs'), B('roof-leak-source'), B('roof-drip-edge-flashing')],
  'yearly-roof-tune-up': [B('keep-critters-out-of-your-roofline'), B('how-to-check-your-roof-from-the-ground'), B('never-pressure-wash-shingles'), B('prepare-your-roof-for-el-nino'), B('how-old-is-my-roof'), B('repair-or-replace-roof-3-question-test')],
  'roof-maintenance-checklist': [B('yearly-roof-tune-up'), B('moss-on-roof-myth-vs-fact'), B('how-to-check-your-roof-from-the-ground'), B('prepare-your-roof-for-el-nino'), B('roof-drip-edge-flashing'), B('what-does-a-roof-inspection-include')],
  'prepare-your-roof-for-el-nino': [B('roof-maintenance-checklist'), B('roof-storm-damage-signs'), B('stop-a-roof-leak'), B('prepare-a-commercial-roof-for-el-nino')],
  'what-does-a-roof-inspection-include': [B('how-to-check-your-roof-from-the-ground'), B('roof-maintenance-checklist'), B('commercial-roof-inspection-checklist')],
  // Commercial and industrial
  'prepare-a-commercial-roof-for-el-nino': [B('commercial-roof-drains-and-scuppers'), B('commercial-roof-inspection-checklist'), B('commercial-roof-leak-repair'), C_MAINT, WAREHOUSES, INDUSTRIAL],
  'commercial-roof-inspection-checklist': [B('commercial-roof-lifespan'), B('prepare-a-commercial-roof-for-el-nino'), B('how-to-vet-commercial-roofing-near-me'), C_MAINT, MANAGERS],
  'commercial-roof-leak-repair': [B('find-a-leak-on-a-commercial-flat-roof'), B('ponding-water-commercial-flat-roof'), B('commercial-roof-repair-company'), B('prepare-a-commercial-roof-for-el-nino'), C_REPAIR, INDUSTRIAL, WAREHOUSES],
  'how-to-choose-a-commercial-roofing-contractor': [B('how-to-choose-a-commercial-roofing-company-los-angeles'), B('how-to-vet-commercial-roofing-near-me'), B('commercial-roof-repair-company'), MANAGERS, INDUSTRIAL],
  'how-to-choose-a-commercial-roofing-company-los-angeles': [B('how-to-vet-commercial-roofing-near-me'), B('commercial-roof-repair-company'), B('most-in-demand-commercial-roofing'), MANAGERS],
  'how-to-vet-commercial-roofing-near-me': [B('most-in-demand-commercial-roofing'), B('commercial-roof-inspection-checklist'), INDUSTRIAL, WAREHOUSES],
  'commercial-roof-repair-company': [B('roof-coating-worth-it'), B('ponding-water-commercial-flat-roof'), B('how-to-vet-commercial-roofing-near-me'), B('commercial-roof-leak-repair'), C_REPAIR, INDUSTRIAL, WAREHOUSES],
  'commercial-roof-replacement-planning': [B('commercial-roof-lifespan'), B('most-in-demand-commercial-roofing'), B('how-to-choose-a-commercial-roofing-company-los-angeles'), INDUSTRIAL, WAREHOUSES, MANAGERS],
  'tpo-roofing-pros-and-cons': [B('commercial-cool-roof-cooling-costs'), B('tpo-vs-epdm-vs-modified-bitumen'), B('most-in-demand-commercial-roofing'), B('commercial-roof-replacement-planning'), WAREHOUSES, INDUSTRIAL],
  'most-in-demand-commercial-roofing': [B('tpo-vs-epdm-vs-modified-bitumen'), B('tpo-roofing-pros-and-cons'), B('torch-down-roofing-app-vs-sbs'), B('commercial-roof-replacement-planning'), INDUSTRIAL, WAREHOUSES],
  // Tile
  'how-to-choose-a-roofing-firm-near-me': [B('how-to-choose-a-roofer-los-angeles-ca'), B('roof-warranty-explained'), B('how-to-choose-a-shingle-roofer-los-angeles'), B('tile-roofing-specialist-los-angeles')],
  'tile-roof-guide-southern-california': [B('spanish-tile-roof-los-angeles'), B('tile-roof-reset-vs-repair'), B('tile-roofing-specialist-los-angeles'), B('roof-warranty-explained')],
  'spanish-tile-roof-los-angeles': [B('keep-critters-out-of-your-roofline'), B('tile-roof-guide-southern-california'), B('clay-vs-concrete-tile-roof'), B('tile-roof-underlayment'), B('tile-roof-reset-vs-repair'), B('tile-lift-and-relay-vs-new-tile-roof')],
  'tile-lift-and-relay-vs-new-tile-roof': [B('tile-roof-reset-vs-repair'), B('tile-roofing-specialist-los-angeles')],
  'tile-roof-underlayment': [B('spanish-tile-roof-los-angeles'), B('tile-roof-reset-vs-repair'), B('tile-roofing-specialist-los-angeles')],
  'clay-vs-concrete-tile-roof': [B('spanish-tile-roof-los-angeles'), B('tile-roof-reset-vs-repair')],
  'tile-roof-reset-vs-repair': [B('spanish-tile-roof-los-angeles'), B('tile-roof-underlayment'), B('tile-lift-and-relay-vs-new-tile-roof'), B('best-roof-for-solar-panels')],
  'best-roof-for-solar-panels': [B('roof-replacement-guide'), B('tile-roof-guide-southern-california'), B('asphalt-shingle-roof-guide'), B('flat-roofs-los-angeles-guide'), B('tile-roof-underlayment'), B('roof-warranty-explained')],
  // Shingle
  'asphalt-shingle-roof-guide': [B('never-pressure-wash-shingles'), B('types-of-asphalt-shingles'), B('new-shingles-over-old-shingles'), B('roof-drip-edge-flashing'), B('how-to-choose-a-shingle-roofer-los-angeles'), B('top-qualities-shingle-roofers-los-angeles-orange-county')],
  'how-to-choose-a-shingle-roofer-los-angeles': [B('top-qualities-shingle-roofers-los-angeles-orange-county'), B('roof-drip-edge-flashing'), B('how-to-choose-a-roofer-los-angeles-ca')],
  'top-qualities-shingle-roofers-los-angeles-orange-county': [B('how-to-choose-a-roofer-los-angeles-ca'), B('roof-drip-edge-flashing')],
  'torch-down-roofing-app-vs-sbs': [B('tpo-vs-epdm-vs-modified-bitumen'), B('flat-roofs-los-angeles-guide'), B('tpo-roofing-pros-and-cons')],
  'cool-roof-southern-california': [B('commercial-cool-roof-cooling-costs'), B('flat-roofs-los-angeles-guide'), B('tpo-vs-epdm-vs-modified-bitumen')],
  'commercial-cool-roof-cooling-costs': [B('cool-roof-southern-california'), B('commercial-roof-lifespan'), B('ponding-water-commercial-flat-roof'), B('commercial-roof-drains-and-scuppers'), MANAGERS],
  'commercial-roof-lifespan': [B('commercial-cool-roof-cooling-costs'), B('commercial-roof-replacement-planning'), B('tpo-vs-epdm-vs-modified-bitumen'), B('commercial-roof-inspection-checklist'), B('ponding-water-commercial-flat-roof'), B('roof-coating-worth-it')],
  'tpo-vs-epdm-vs-modified-bitumen': [B('commercial-cool-roof-cooling-costs'), B('commercial-roof-lifespan'), B('tpo-roofing-pros-and-cons'), B('most-in-demand-commercial-roofing'), B('torch-down-roofing-app-vs-sbs'), B('commercial-roof-repair-company'), B('roof-coating-worth-it')],
  'roof-coating-worth-it': [B('commercial-cool-roof-cooling-costs'), B('commercial-roof-lifespan'), B('tpo-vs-epdm-vs-modified-bitumen'), B('ponding-water-commercial-flat-roof'), B('find-a-leak-on-a-commercial-flat-roof'), B('commercial-roof-repair-company'), B('how-to-vet-commercial-roofing-near-me'), B('roof-restoration-vs-replacement')],
  'commercial-roof-drains-and-scuppers': [B('ponding-water-commercial-flat-roof'), B('find-a-leak-on-a-commercial-flat-roof'), B('commercial-roof-leak-repair'), B('prepare-a-commercial-roof-for-el-nino'), B('commercial-roof-repair-company')],
  'find-a-leak-on-a-commercial-flat-roof': [B('commercial-roof-drains-and-scuppers'), B('commercial-roof-leak-repair'), B('ponding-water-commercial-flat-roof'), B('commercial-roof-repair-company'), B('how-to-vet-commercial-roofing-near-me'), B('prepare-a-commercial-roof-for-el-nino')],
  'ponding-water-commercial-flat-roof': [B('roof-coating-worth-it'), B('commercial-roof-drains-and-scuppers'), B('find-a-leak-on-a-commercial-flat-roof'), B('commercial-roof-repair-company'), B('how-to-vet-commercial-roofing-near-me'), B('commercial-roof-leak-repair'), B('flat-roofs-los-angeles-guide'), B('clean-gutters-without-damaging-roof-edge')],
  'clean-gutters-without-damaging-roof-edge': [B('never-pressure-wash-shingles'), B('ponding-water-commercial-flat-roof'), B('roof-drip-edge-flashing'), B('shingle-granules-in-gutter'), B('roof-maintenance-checklist'), B('how-to-check-your-roof-from-the-ground'), B('moss-on-roof-myth-vs-fact')],
  'prepare-for-a-roof-replacement': [B('roof-replacement-guide'), B('cheapest-roofing-quote'), B('new-shingles-over-old-shingles'), B('roofing-permits-los-angeles'), B('how-to-pay-for-a-new-roof')],
  'types-of-asphalt-shingles': [B('architectural-vs-3-tab-shingles'), B('asphalt-shingle-roof-guide'), B('new-shingles-over-old-shingles'), B('shingle-granule-loss'), B('curling-cracked-missing-shingles')],
  'architectural-vs-3-tab-shingles': [B('types-of-asphalt-shingles'), B('new-shingles-over-old-shingles'), B('roof-drip-edge-flashing'), B('top-qualities-shingle-roofers-los-angeles-orange-county')],
  'roof-restoration-vs-replacement': [B('roof-coating-worth-it'), B('repair-or-replace-roof-3-question-test'), B('how-old-is-my-roof')],
  'roof-replacement-cost-los-angeles': [B('cheapest-roofing-quote'), B('repair-or-replace-roof-3-question-test')],
  'cheapest-roofing-quote': [B('prepare-for-a-roof-replacement'), B('how-to-choose-a-roofer-los-angeles-ca'), B('roof-warranty-explained'), B('repair-or-replace-roof-3-question-test'), B('roofing-permits-los-angeles')],
  'new-shingles-over-old-shingles': [B('cheapest-roofing-quote'), B('asphalt-shingle-roof-guide'), B('repair-or-replace-roof-3-question-test'), B('architectural-vs-3-tab-shingles'), B('roof-replacement-guide')],
  'repair-or-replace-roof-3-question-test': [B('new-shingles-over-old-shingles'), B('roof-restoration-vs-replacement'), B('roof-replacement-guide'), B('roof-repair-cost'), B('small-roof-leak-big-problem')],
  'how-old-is-my-roof': [B('new-shingles-over-old-shingles'), B('repair-or-replace-roof-3-question-test'), B('roof-replacement-guide'), B('curling-cracked-missing-shingles'), B('how-to-check-your-roof-from-the-ground'), B('what-does-a-roof-inspection-include')],
  'hail-damage-vs-normal-wear': [B('roof-storm-damage-signs'), B('curling-cracked-missing-shingles'), B('roof-insurance-claims-california'), B('what-does-a-roof-inspection-include')],
  'small-roof-leak-big-problem': [B('roof-leak-source'), B('how-to-find-a-roof-leak'), B('stop-a-roof-leak')],
  'first-hour-active-roof-leak': [B('small-roof-leak-big-problem'), B('how-to-read-a-ceiling-stain'), B('roof-leak-source'), B('roof-repair-cost')],
  'sagging-roofline-urgent': [B('first-hour-active-roof-leak'), B('how-to-stop-a-leaking-roof-now'), B('roof-storm-damage-signs'), B('roof-replacement-guide')],
  'never-pressure-wash-shingles': [B('moss-on-roof-myth-vs-fact'), B('shingle-granules-in-gutter'), B('curling-cracked-missing-shingles'), B('roof-maintenance-checklist'), B('how-to-check-your-roof-from-the-ground')],
  'keep-critters-out-of-your-roofline': [B('wildfire-resistant-roof-los-angeles'), B('yearly-roof-tune-up'), B('spanish-tile-roof-los-angeles'), B('how-to-check-your-roof-from-the-ground'), B('roof-drip-edge-flashing')],
  'tree-branches-over-your-roof': [B('keep-critters-out-of-your-roofline'), B('yearly-roof-tune-up'), B('how-to-check-your-roof-from-the-ground'), B('roof-storm-damage-signs'), B('roof-maintenance-checklist'), B('first-hour-active-roof-leak'), B('never-pressure-wash-shingles')],
  'moss-on-roof-myth-vs-fact': [B('tree-branches-over-your-roof'), B('never-pressure-wash-shingles'), B('shingle-granules-in-gutter'), B('roof-drip-edge-flashing'), B('prepare-your-roof-for-el-nino')],
  'leaking-skylight-reseal-or-replace': [B('roof-leak-source'), B('failing-chimney-flashing'), B('how-to-trace-a-roof-leak-in-the-attic'), B('small-roof-leak-big-problem'), B('roof-repair-cost')],
  'failing-chimney-flashing': [B('leaking-skylight-reseal-or-replace'), B('roof-leak-source'), B('how-to-find-a-roof-leak'), B('roof-repair-cost'), B('roof-drip-edge-flashing')],
  'curling-cracked-missing-shingles': [B('repair-or-replace-roof-3-question-test'), B('hail-damage-vs-normal-wear'), B('roof-storm-damage-signs'), B('roof-repair-cost'), B('how-to-check-your-roof-from-the-ground')],
  'shingle-granule-loss': [B('never-pressure-wash-shingles'), B('curling-cracked-missing-shingles'), B('shingle-granules-in-gutter'), B('how-to-check-your-roof-from-the-ground'), B('architectural-vs-3-tab-shingles')],
  'shingle-granules-in-gutter': [B('never-pressure-wash-shingles'), B('clean-gutters-without-damaging-roof-edge'), B('shingle-granule-loss'), B('roof-drip-edge-flashing'), B('how-to-check-your-roof-from-the-ground')],
  'roof-drip-edge-flashing': [B('clean-gutters-without-damaging-roof-edge'), B('failing-chimney-flashing'), B('shingle-granules-in-gutter'), B('roof-maintenance-checklist')],
  // Replacement and choosing a roofer
  'roof-replacement-guide': [B('prepare-for-a-roof-replacement'), B('new-shingles-over-old-shingles'), B('repair-or-replace-roof-3-question-test'), B('how-old-is-my-roof'), B('how-to-choose-a-roofer-los-angeles-ca'), B('roof-warranty-explained'), B('roofing-permits-los-angeles'), B('roof-replacement-cost-los-angeles'), B('how-to-pay-for-a-new-roof'), B('best-roof-for-solar-panels')],
  'best-roofer-los-angeles': [B('how-to-choose-a-roofer-los-angeles-ca'), B('top-qualities-shingle-roofers-los-angeles-orange-county')],
  'how-to-choose-a-roofer-los-angeles-ca': [B('cheapest-roofing-quote'), B('how-to-choose-a-roofing-firm-near-me'), B('best-roofer-los-angeles'), B('how-to-choose-a-shingle-roofer-los-angeles'), B('how-to-vet-commercial-roofing-near-me')],
  'roof-warranty-explained': [B('how-to-choose-a-roofing-firm-near-me'), B('how-to-choose-a-roofer-los-angeles-ca')],
  // Flat
  'flat-roofs-los-angeles-guide': [B('ponding-water-commercial-flat-roof'), B('torch-down-roofing-app-vs-sbs'), B('cool-roof-southern-california'), B('most-in-demand-commercial-roofing'), '/residential-roofing/flat-roofing/torch-down/'],
};
