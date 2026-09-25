// Services carousel on the home page (and city pages).
// `scene` is a CSS placeholder "photo" (styles in app/globals.css).
// To show a real job photo, add image: '/images/your-photo.webp' and put the file in public/images.
// `schemaName` is the service name given to search engines; `href` is where "More Info" goes.

export const SERVICES = [
  {
    title: 'Roof Replacement',
    schemaName: 'Roof Replacement',
    scene: 'scene-replace',
    text: 'Full tear-off and new roof systems built for Southern California conditions, installed with a clear written scope and a lifetime workmanship warranty.',
    href: '/roof-replacement/',
  },
  {
    title: 'Roof Repairs',
    schemaName: 'Roof Repair',
    scene: 'scene-repair',
    text: 'Leaks, cracked tiles and storm damage addressed with photo documentation, so you see exactly what was wrong and what we fixed.',
    href: '/roof-repair/',
  },
  {
    title: 'Tile Lift & Relay',
    schemaName: 'Tile Lift & Relay',
    scene: 'scene-tile',
    text: 'We lift your existing tiles, replace the worn underlayment underneath and reset the roof cleanly, keeping the look you already love.',
    href: '/tile-roofing/lift-and-relay/',
  },
  {
    title: 'Flat Roofing',
    schemaName: 'Flat Roofing',
    scene: 'scene-flat',
    text: 'Modified bitumen and low-slope systems planned around your roof’s condition, drainage and the way water actually moves across it.',
    href: '/flat-roofing/',
  },
  {
    title: 'Shingle Roofing',
    schemaName: 'Shingle Roofing',
    scene: 'scene-shingle',
    text: 'Premium shingle systems installed to the manufacturer’s requirements, with clean lines, proper ventilation and tidy detailing.',
    href: '/shingle-roofing/',
  },
  {
    title: 'Inspections & Roof Care',
    schemaName: 'Roof Inspections & Roof Care',
    scene: 'scene-inspect',
    text: 'Detailed inspections and maintenance designed to catch small problems early, starting with our roofer-led $199 Roof Check.',
    href: '/roof-inspection/',
  },
];
