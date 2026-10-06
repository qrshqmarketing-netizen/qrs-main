import { startHref } from './start';

// Seasonal promo for the free roof evaluation (components/widgets/SeasonPromo.jsx): a centered modal on a visitor's
// first visit, and a "before you go" version when a visitor looks like they are leaving (mouse to the top of the window on desktop;
// a quick flick back up the page or returning from another tab or app on phones). Set `active: false`
// to switch both off. `exclude`: pages where the home offer doesn't apply (commercial, partner and job pages).

export const SEASON_PROMO = {
  active: true,
  eyebrow: 'Get your roof ready before the rain',
  // Forecasters (NOAA, fall 2026) give a very strong, "super" El Niño good odds for November–January
  heading: 'Be Prepared for a Super El Niño',
  text: 'Forecasters expect a very strong El Niño this winter. Book your free drone roof evaluation now and find the weak spots before the storms do.',
  exit: {
    heading: 'Before You Go: Is Your Roof Ready for El Niño?',
    text: 'Heavy El Niño rains are on the way. Book your free drone roof evaluation now and know exactly where your roof stands before the first big storm.',
  },
  cta: { label: 'Book My Free Evaluation Now', href: startHref('inspection') }, // the request steps with the roof inspection already picked
  rain: true, // faint rain falling inside the popup (components/widgets/PromoRain.jsx); false switches it off
  exclude: ['/start/', '/thank-you/', '/commercial-roofing/', '/residential-roofing/hoa-multi-family/', '/service-areas/la-county/vernon/', '/contractors/', '/careers/'],
};

// The old heading fade-ups (every h2 faded up on load) are off and stay off; true brings them back (app/layout.js).
export const PAGE_ENTRANCES = false;

// The subtle scroll reveals (components/ui/RevealSections.jsx): parts of each page fade up a few pixels, once, as they scroll into view.
// They never touch the hero or anything above the fold, skip visitors who ask for reduced motion, and shift nothing. false switches them off.
export const SCROLL_REVEALS = true;
