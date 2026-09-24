// Central place for content you'll want to edit.

export const PHONE = '(310) 340-1643';
export const TEL = 'tel:+13103401643';

// Services carousel. `scene` is a CSS placeholder background (see globals.css).
// To use a real photo, add `image: '/images/roof-replacement.jpg'` (file in /public/images).
export const SERVICES = [
  {
    title: 'Roof Replacement',
    scene: 'scene-replace',
    text: 'Full tear-off and new roof systems built for Southern California conditions, installed with a clear written scope and a lifetime workmanship warranty.',
    href: '#estimate',
  },
  {
    title: 'Roof Repairs',
    scene: 'scene-repair',
    text: 'Leaks, cracked tiles and storm damage addressed with photo documentation, so you see exactly what was wrong and what we fixed.',
    href: '#estimate',
  },
  {
    title: 'Tile Lift & Relay',
    scene: 'scene-tile',
    text: 'We lift your existing tiles, replace the worn underlayment underneath and reset the roof cleanly, keeping the look you already love.',
    href: '#estimate',
  },
  {
    title: 'Flat Roofing',
    scene: 'scene-flat',
    text: 'Modified bitumen and low-slope systems planned around your roof’s condition, drainage and the way water actually moves across it.',
    href: '#estimate',
  },
  {
    title: 'Shingle Roofing',
    scene: 'scene-shingle',
    text: 'Premium shingle systems installed to the manufacturer’s requirements, with clean lines, proper ventilation and tidy detailing.',
    href: '#estimate',
  },
  {
    title: 'Inspections & Roof Care',
    scene: 'scene-inspect',
    text: 'Detailed inspections and maintenance designed to catch small problems early, starting with our roofer-led $199 Roof Check.',
    href: '#roof-check',
  },
];

// Replace with verified customer reviews only.
export const REVIEWS = [
  {
    quote: 'Replace this with a verified homeowner review about working with QRS on a roof project — the communication, the crew, the workmanship and how the finished roof turned out. Longer, specific reviews like this read best in this layout.',
    name: 'Customer Name',
    date: 'Month DD, YYYY',
  },
  {
    quote: 'Replace this with a verified customer review about the $199 Roof Check or inspection process — getting a clear, photo-documented answer before any work started, with no pressure to buy.',
    name: 'Customer Name',
    date: 'Month DD, YYYY',
  },
  {
    quote: 'Replace this with a verified customer review about the install crew, how clean the job site was left and the final walkthrough of the finished roof and warranty.',
    name: 'Customer Name',
    date: 'Month DD, YYYY',
  },
];

// YouTube embed URL for the process video, e.g. 'https://www.youtube.com/embed/VIDEO_ID'.
// Leave empty until the video is ready.
export const VIDEO_EMBED = '';

// Service-area pins: [city, latitude, longitude]
export const LOCATIONS = [
  ['Los Angeles', 34.0522, -118.2437],
  ['Santa Monica', 34.0195, -118.4912],
  ['Pasadena', 34.1478, -118.1445],
  ['Glendale', 34.1425, -118.2551],
  ['Burbank', 34.1808, -118.309],
  ['Torrance', 33.8358, -118.3406],
  ['Long Beach', 33.7701, -118.1937],
  ['Anaheim', 33.8366, -117.9143],
  ['Santa Ana', 33.7455, -117.8677],
  ['Huntington Beach', 33.6595, -117.9988],
  ['Irvine', 33.6846, -117.8265],
  ['Newport Beach', 33.6189, -117.9298],
];

// A ZIP within this many miles of a pin counts as "in our service area".
export const SERVICE_RADIUS_MI = 15;
