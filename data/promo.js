// Seasonal promo for the $199 Roof Check (components/widgets/SeasonPromo.jsx): a centered modal on a visitor's
// first visit, and a "before you go" version when a desktop visitor moves to leave the page. Set `active: false`
// to switch both off. `exclude`: pages where the home offer doesn't apply (commercial, partner and job pages).

export const SEASON_PROMO = {
  active: true,
  eyebrow: 'El Niño season prep',
  heading: 'Get Your Roof Ready Before the Rain',
  text: 'Our optional $199 Roof Check tune-up seals the vents, pipes and flashings where most leaks start. Not sure you need it? The drone roof evaluation is free.',
  exit: {
    heading: 'Before You Go: Beat the El Niño Rains',
    text: 'Book the $199 Roof Check and we seal the vents, pipes and flashings before the storms arrive. The $199 counts toward a replacement if you move forward.',
  },
  cta: { label: 'Book the $199 Roof Check', href: '#roof-check' },
  exclude: ['/commercial-roofing/', '/hoa-multi-family/', '/service-areas/la-county/vernon/', '/contractors/', '/careers/'],
};
