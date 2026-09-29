// Services carousel on the home page (and city pages).
// `scene` is a CSS placeholder "photo" (styles in app/globals.css).
// To show a real job photo, add image: '/images/your-photo.webp' and put the file in public/images.
// `schemaName` is the service name given to search engines; `href` is where "More Info" goes.

export const SERVICES = [
  {
    title: 'Roof Replacement',
    schemaName: 'Roof Replacement',
    scene: 'scene-replace',
    image: '/images/shingle-roof-completed-drone-view.webp',
    text: 'Full tear-off and new roof systems built for Southern California conditions, installed with a clear written scope and a 10-year workmanship warranty.',
    href: '/roof-replacement/',
  },
  {
    title: 'Roof Repairs',
    schemaName: 'Roof Repair',
    scene: 'scene-repair',
    image: '/images/shingle-roof-repair-ridge-finish.webp',
    text: 'Leaks, cracked tiles and storm damage addressed with photo documentation, so you see exactly what was wrong and what we fixed.',
    href: '/roof-repair/',
  },
  {
    title: 'Tile Lift & Relay',
    schemaName: 'Tile Lift & Relay',
    scene: 'scene-tile',
    image: '/images/tile-lift-off-and-reset-drone-view.webp',
    text: 'We lift your existing tiles, replace the worn underlayment underneath and reset the roof cleanly, keeping the look you already love.',
    href: '/tile-roofing/lift-and-relay/',
  },
  {
    title: 'Flat Roofing',
    schemaName: 'Flat Roofing',
    scene: 'scene-flat',
    image: '/images/flat-roof-torch-down-drone-view-services.webp',
    text: 'Modified bitumen and low-slope systems planned around your roof’s condition, drainage and the way water actually moves across it.',
    href: '/flat-roofing/',
  },
  {
    title: 'Shingle Roofing',
    schemaName: 'Shingle Roofing',
    scene: 'scene-shingle',
    image: '/images/shingle-roof-grey-roofing-services-card.webp',
    text: 'Premium shingle systems installed to the manufacturer’s requirements, with clean lines, proper ventilation and tidy detailing.',
    href: '/shingle-roofing/',
  },
  {
    title: 'Inspections & Roof Care',
    schemaName: 'Roof Inspections & Roof Care',
    scene: 'scene-inspect',
    image: '/images/shingle-roof-inspection-overhead.webp',
    text: 'Detailed inspections and maintenance designed to catch small problems early, starting with our roofer-led $199 Roof Check.',
    href: '/roof-inspection/',
  },
];
