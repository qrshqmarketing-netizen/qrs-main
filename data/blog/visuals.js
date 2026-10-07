// Visuals for blog articles (components/blog/PostVisuals.jsx): where an article's plain structure is shown as a richer component instead.
// Each entry is { article slug: { section heading: { what to restyle: how } } }. The text still comes from the article itself (the dashboard's
// Supabase copy), so editing an article changes the visual too, and a heading that no longer matches simply leaves that section as plain text.
// Nothing here adds facts or numbers; a section only gets a visual where its content suits one.
//
//   steps: 'timeline'       the numbered steps as a vertical timeline (steps that are only a question or a sentence are shown plain)
//   groups: 'timeline'      the "1. Title" / "Step 1: Title" subheading + paragraph groups as a numbered timeline; the h3s stay real headings
//   groups: 'pros' | 'cons' | 'cards'   those groups as a grid of cards with a check, a caution mark, or a number/magnifier
//   checklist: 'tracker'    a checklist you can tick off, with a progress ring (ticks are kept on the device)
//   list: 'flags'           warnings (red flags, mistakes) as cards with a flag mark
//   list: 'facts' | 'facts-numbered'    "**Lead:** text" items as a grid of cards
//   list: 'layers'          "**Cause:** text" items as an interactive cross-section of a tile roof
//   table: 'tabs'           a table whose first column is a choice (roof type) as tabs with bullet lists
//   table: 'versus'         a three-column comparison table (label, A, B) as side-by-side cards
//   table: 'decide'         options as cards to pick from ("Which sounds most like your roof?")
//   table: 'picker'         problem / option / what to know as a picker
//   table: 'document'       the parts of a proposal as a drawn proposal page
//   table: 'cards'          rows to compare as cards with labelled lines
//   table: 'hotspots'       "where / what goes wrong" rows as an interactive picture of a flat commercial roof
export const POST_VISUALS = {
  'how-to-choose-a-commercial-roofing-contractor': {
    'What to Verify Before You Hire': { list: 'facts' },
    'Ten Questions to Ask a Commercial Roofing Contractor': { steps: 'timeline' },
    'What a Good Commercial Roofing Proposal Includes': { table: 'document' },
    'Red Flags': { list: 'flags' },
  },
  'commercial-roof-leak-repair': {
    'Where Commercial Roofs Leak': { table: 'hotspots' },
    'What to Do Right Away': { steps: 'timeline' },
    'How a Roofer Traces a Commercial Roof Leak': { list: 'facts-numbered' },
  },
  'commercial-roof-replacement-planning': {
    'Repair, Restore or Replace?': { table: 'decide' },
    'How a Phased Commercial Roof Replacement Works': { steps: 'timeline' },
    'What to Plan Around': { checklist: 'tracker' },
  },
  'tpo-roofing-pros-and-cons': {
    'The Pros of TPO Roofing': { groups: 'pros' },
    'The Cons of TPO Roofing': { groups: 'cons' },
    'TPO vs. Modified Bitumen': { table: 'versus' },
    'Questions to Ask Before Choosing TPO': { steps: 'timeline' },
  },
  'commercial-roof-inspection-checklist': {
    'How Often to Inspect a Commercial Roof': { list: 'facts' },
    'The Commercial Roof Inspection Checklist': { checklist: 'tracker' },
  },
  'roof-leak-source': {
    'Signs of a Roof Leak': { list: 'facts' },
    'The Most Common Causes of a Roof Leak': { groups: 'cards' },
    'What You Can Check Safely': { steps: 'timeline' },
  },
  'roof-maintenance-checklist': {
    'The Roof Maintenance Checklist': { checklist: 'tracker' },
    'What to Look for on Each Roof Type': { table: 'tabs' },
  },
  'roof-restoration-vs-replacement': {
    'Repair, Restoration and Replacement Compared': { table: 'decide' },
    'How to Decide': { steps: 'timeline' },
    'Questions to Ask Any Roofing Contractor': { checklist: 'tracker' },
  },
  'roof-storm-damage-signs': {
    'How Storms Damage Roofs in Southern California': { list: 'facts' },
    'What to Do First After Roof Storm Damage': { steps: 'timeline' },
    'Storm Damage by Roof Type': { table: 'tabs' },
  },
  'temporary-roof-repair-options': {
    'Five Temporary Roof Repair Options': { groups: 'cards' },
    'Which Temporary Fix Fits Which Problem': { table: 'picker' },
    'Mistakes That Make a Leak Worse': { list: 'flags' },
  },
  'roof-insurance-claims-california': {
    'What Homeowners Insurance Usually Covers': { list: 'facts' },
    'What to Do After Roof Damage': { steps: 'timeline' },
    'What to Expect From the Process': { list: 'facts-numbered' },
    'Common Mistakes With Roof Insurance Claims': { list: 'flags' },
  },
  'wooden-roof-pros-and-cons': {
    'The Pros of a Wooden Roof': { groups: 'pros' },
    'The Cons of a Wooden Roof': { groups: 'cons' },
    'Wood vs. Shingle vs. Tile': { table: 'cards' },
    'Is a Wooden Roof Right for Your Home?': { checklist: 'tracker' },
    'Alternatives That Still Look Great': { groups: 'cards' },
  },
  'tile-roof-underlayment': {
    '7 Signs Your Tile Roof Underlayment May Need Replacement': { groups: 'timeline' },
    'Why Tile Roofs Can Leak Even When Tiles Look Fine': { list: 'layers' },
    'Can You Replace Underlayment Without Replacing the Tiles?': { steps: 'timeline' },
    'Which Underlayment Is Right for a Tile Roof?': { table: 'cards' },
    'What Happens During Tile Roof Underlayment Replacement?': { groups: 'timeline' },
    'What Affects Replacement Costs?': { list: 'facts' },
    'Preparing Your Tile Roof for Southern California’s Rainy Season': { checklist: 'tracker' },
  },
};

export const visualFor = (slug, heading) => POST_VISUALS[slug]?.[heading] || null;
