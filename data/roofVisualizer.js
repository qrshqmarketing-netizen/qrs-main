// Roof Visualizer (/roof-visualizer/, the home page section): a visitor gives their name and email, uploads a photo of their roof, picks a manufacturer
// and a swatch color, and Gemini shows the roof in that color. This file is the catalog and the wording; the work is done by the Edge Function
// supabase/functions/visualize (or the site's own route app/api/visualize), whose logic is supabase/functions/_shared/visualizer.js.
//
// No manufacturer is named anywhere (the owner's choice): the visualizer offers one set of roof colors, the color range of a popular cool-roof architectural shingle line,
// without its brand name. `hex` is an approximation, enough to preview a look. A color's `swatch` ('/images/visualizer/<file>.webp', files in
// public/images/visualizer/) shows that shingle's swatch picture instead of the flat hex, and is sent to Gemini with the photo so the result matches its color and
// texture; add one to each color when the swatch pictures are available. To list a manufacturer by name later, add an entry below without `generic`.
// With only one entry the manufacturer step is hidden. `kind`: 'shingle' (steep-slope asphalt shingles) or 'membrane' (a low-slope / flat roof membrane): it
// changes how the roof is described to the model.
// After any change, run `npm run functions:sync` and redeploy the visualize function.

export const VISUALIZER_BRANDS = [
  {
    id: 'popular',
    name: 'Popular roof colors',
    line: 'Asphalt shingle',
    kind: 'shingle',
    generic: true, // no manufacturer: the picture is made from the color alone (no brand name in the request, the page or the lead)
    colors: [
      { id: 'night-sky', name: 'Night Sky', hex: '#3d4147' },
      { id: 'mountainside', name: 'Mountainside', hex: '#777b80' },
      { id: 'sierra-gray', name: 'Sierra Gray', hex: '#9a9ea2' },
      { id: 'oyster-shell', name: 'Oyster Shell', hex: '#b9b6ae' },
      { id: 'shasta-white', name: 'Shasta White', hex: '#d8d7d1' },
      { id: 'sand-castle', name: 'Sand Castle', hex: '#c2b08f' },
      { id: 'amber', name: 'Amber', hex: '#b8a07e' },
      { id: 'mojave', name: 'Mojave', hex: '#8a6a4f' },
      { id: 'summerwood', name: 'Summerwood', hex: '#6e5f4a' },
      { id: 'forest-brown', name: 'Forest Brown', hex: '#6a5646' },
    ],
  },
];

// The shape the Edge Function needs (no copy for people): written into supabase/functions/_shared/generated.js by `npm run functions:sync`
export const VISUALIZER_CATALOG = VISUALIZER_BRANDS.map((b) => ({ id: b.id, name: b.name, line: b.line, kind: b.kind, generic: Boolean(b.generic), colors: b.colors.map((c) => ({ id: c.id, name: c.name, hex: c.hex, ...(c.swatch && { swatch: c.swatch }) })) }));

export const VISUALIZER_PATH = '/roof-visualizer/';
export const VISUALIZER_TOKEN_KEY = 'qrs-visualizer'; // localStorage: the visitor's signed pass (name and email already given)

// Where the browser sends the visualizer's requests: the site's own route, or the Supabase Edge Function when NEXT_PUBLIC_VISUALIZE_ENDPOINT is set
export const SITE_VISUALIZE_ENDPOINT = '/api/visualize/';
export const VISUALIZE_ENDPOINT = process.env.NEXT_PUBLIC_VISUALIZE_ENDPOINT || SITE_VISUALIZE_ENDPOINT;

export const VISUALIZER_COPY = {
  label: 'Roof Visualizer',
  heading: 'See your roof in a __new color__ before you decide',
  sub: 'Take a photo of your house, choose a roof color, and we show you the new roof on your own photo. Free, and it takes about a minute.',
  gateTitle: 'Get your free preview',
  gateText: 'Enter your name and email to use the visualizer. We’ll also send you roofing tips and offers from Quality Roofing Specialists, Inc. You can unsubscribe at any time.',
  consent: 'Yes, email me roofing tips and offers from Quality Roofing Specialists, Inc.',
  disclaimer: 'Previews are for visualization only. Actual shingle color and texture vary with lighting, your screen and the product, so check a physical sample before you decide.',
};
