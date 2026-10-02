// Google Business Profile visitors. A link with utm_campaign=gbp-<profile>, like
//   /service-areas/la-county/vernon/?utm_source=google&utm_medium=organic&utm_campaign=gbp-vernon
// shows a small welcome card on that visit (components/widgets/CampaignWelcome.jsx), and the campaign is attached to any
// lead the visitor sends (lib/attribution.js). Only the campaign names listed here get a card, and the card shows the
// words below, never text taken from the link. To add a profile, add a line with its utm_campaign name.
//
// place: the profile's name in the heading; office: which office the card shows (citySlug in OFFICES, data/site.js);
// line: one sentence about the work from that office; cta: label of the gold button (it goes to the page's estimate form).
import { OFFICES } from '@/data/site';

const officeIn = (citySlug) => OFFICES.find((o) => o.citySlug === citySlug);

export const GBP_PROFILES = {
  'gbp-west-hollywood': {
    place: 'West Hollywood',
    office: officeIn('los-angeles'),
    line: 'Roofing for West Hollywood homes, from our Los Angeles office in the Fairfax area.',
    cta: 'Get Pro Advice',
  },
  'gbp-woodland-hills': {
    place: 'Woodland Hills',
    office: officeIn('woodland-hills'),
    line: 'Roofing for Woodland Hills homes, from our Valley office on Ventura Boulevard.',
    cta: 'Get Pro Advice',
  },
  'gbp-vernon': {
    place: 'Vernon',
    office: officeIn('vernon'),
    line: 'Roof repair, replacement and maintenance for Vernon’s warehouses and plants, from our local office.',
    cta: 'Request a Roof Survey',
  },
};
