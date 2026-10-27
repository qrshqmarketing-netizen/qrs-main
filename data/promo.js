// Seasonal promo for the free roof evaluation (components/widgets/SeasonPromo.jsx): a centered modal on a visitor's
// first visit, and a "before you go" version when a visitor looks like they are leaving (mouse to the top of the window on desktop;
// a quick flick back up the page or returning from another tab or app on phones). Set `active: false`
// to switch both off. `exclude`: pages where the home offer doesn't apply (commercial, partner and job pages).

export const SEASON_PROMO = {
  active: true,
  eyebrow: 'Get your roof ready before the rain',
  // Forecasters (NOAA, fall 2026) give a very strong, "super" El Niño good odds for November–January
  heading: 'Be prepared for a super El Niño', // sentence case shows on the home hero; the popup and the El Niño page set it in capitals
  modalHeading: 'Is Your Roof Ready for a Super El Niño?', // the first-visit popup and the "before you go" popup (the El Niño page and home section keep `heading`)
  text: 'Forecasters expect a very strong El Niño this winter. Book your roof readiness inspection today and find the weak spots before the storms do.',
  exit: {
    text: 'Heavy El Niño rains are on the way. Book your roof readiness inspection today and know exactly where your roof stands before the first big storm.',
  },
  cta: { label: 'Claim My Free Evaluation' }, // opens the El Niño landing page, tagged utm_medium=modal-timed or modal-exit (components/widgets/SeasonPromo.jsx)
  rain: true, // faint rain falling inside the popup (components/widgets/PromoRain.jsx); false switches it off
  // The home page shows it too now that its hero is a background video (add '/' to keep it off the home page only)
  exclude: ['/start/', '/thank-you/', '/el-nino-roof-check/', '/lp/residential/', '/lp/commercial/', '/commercial-roofing/', '/residential-roofing/hoa-multi-family/', '/service-areas/la-county/vernon/', '/contractors/', '/careers/'],
};

// The old heading fade-ups (every h2 faded up on load) are off and stay off; true brings them back (app/layout.js).
export const PAGE_ENTRANCES = false;

// The subtle scroll reveals (components/ui/RevealSections.jsx): parts of each page fade up a few pixels, once, as they scroll into view.
// They never touch the hero or anything above the fold, skip visitors who ask for reduced motion, and shift nothing. false switches them off.
export const SCROLL_REVEALS = true;

// The El Niño landing page (app/el-nino-roof-check/page.js) that the promo's button opens. Every link to it is tagged with utm_source=website,
// utm_campaign=el-nino-2026 and a utm_medium that says which piece was clicked: modal-timed (the popup 15 seconds after the page loads),
// modal-exit (the "before you go" popup) or home-section (the card on the home page, above the request card). The landing page notes the
// tags (lib/attribution.js), so the lead email, the sheet and Supabase say which one brought the visitor, and Google Analytics reads them
// from the address. PromoCard also sends promo_view / promo_click / promo_call events with the same name.
export const PROMO_NAME = 'el-nino-2026';
export const PROMO_LANDING_PATH = '/el-nino-roof-check/';
export const promoLandingHref = (medium) => `${PROMO_LANDING_PATH}?utm_source=website&utm_medium=${medium}&utm_campaign=${PROMO_NAME}`;

// The studio look (components/studio/StudioSite.css) on every page: light sentence-case headings and quiet labels, like the home page. false returns the other
// pages to the condensed uppercase headings.
export const STUDIO_THEME = true;

// The three scroll effects of components/studio/StudioMotion.jsx (each can be switched off on its own; none runs for visitors who ask for reduced motion):
// headings (and the home page's big statement) slide up word by word out of a mask, photos drift a little inside their frames, and the mouse wheel and trackpad glide.
export const LINE_REVEALS = true;
export const IMAGE_PARALLAX = true;
export const SMOOTH_SCROLL = true;
