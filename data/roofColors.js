// The home page's shingle color section (components/roofColors/RoofColors.jsx): a real roof photo and a row of swatches; tapping a swatch shows the roof in that
// color. No manufacturer is named anywhere (the owner's choice): the colors are the range of Owens Corning's Duration COOL shingles, with the brand and line names
// left out. `hex` is an approximation, enough to preview a look; a color's `swatch` ('/images/roof-colors/<id>.webp') shows the official swatch picture on the
// chip instead of the flat color.

export const SHOW_ROOF_COLORS = true; // the section on the home page

export const ROOF_COLORS = [
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
];

export const ROOF_COLORS_COPY = {
  label: 'Shingle colors',
  heading: 'See a roof in a __new color__',
  sub: 'Tap a color to see it on a real roof we finished. Every roof replacement starts with a free roof evaluation, and we can bring physical samples so you see the color in your own light.',
  note: 'Colors on screen are approximate. Check a physical sample before you decide.',
};
