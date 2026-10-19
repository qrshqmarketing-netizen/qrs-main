// The lead pipeline's steps, shared by the dashboard's server code (lib/adminLeads.js) and its views in the browser (Kanban columns, status
// menus, chips). The ids are what the `leads` table's `status` column holds.
export const LEAD_STATUSES = [
  { id: 'new', label: 'New' },
  { id: 'contacted', label: 'Contacted' },
  { id: 'scheduled', label: 'Scheduled' },
  { id: 'won', label: 'Won' },
  { id: 'lost', label: 'Lost' },
  { id: 'remarketing', label: 'Remarketing' }, // a lost lead worth contacting again later (owner, October 19 2026)
];
export const STATUS_IDS = LEAD_STATUSES.map((s) => s.id);
export const statusLabel = (id) => LEAD_STATUSES.find((s) => s.id === id)?.label || 'New';

// The source a lead gets when someone adds it by hand in the dashboard
export const MANUAL_SOURCE = 'Added in dashboard';
