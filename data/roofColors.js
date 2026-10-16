// The home page's shingle color section (components/roofColors/RoofColors.jsx): a real roof photo and a row of swatches; tapping a swatch shows the roof in that
// color. No manufacturer is named anywhere (the owner's choice): the colors are the range of Owens Corning's Duration COOL shingles, with the brand and line names
// left out. `hex` is an approximation, enough to preview a look; a color's `swatch` ('/images/roof-colors/<id>.webp') shows the official swatch picture on the
// chip instead of the flat color.

export const SHOW_ROOF_COLORS = true; // the section on the shingle roofing page (it was on the home page until October 15 2026)

// The colors offered (owner, October 16 2026): all cool roof colors with a Solar Reflectance Index of 20 or more, in order from light to dark.
// `hex` is a hand-picked approximation for the chip and the preview; a `swatch` picture replaces the chip when there is one.
export const ROOF_COLORS = [
  { id: 'shasta-white', name: 'Shasta White', hex: '#d9d7cf' },
  { id: 'oyster-shell', name: 'Oyster Shell', hex: '#bdb8ad' },
  { id: 'amber', name: 'Amber', hex: '#b79f7c' },
  { id: 'golden-meadow', name: 'Golden Meadow', hex: '#a98c5c' },
  { id: 'sierra-grey', name: 'Sierra Grey', hex: '#9b9fa3' },
  { id: 'cliffside-gray', name: 'Cliffside Gray', hex: '#8f8b84' },
  { id: 'rolling-stone', name: 'Rolling Stone', hex: '#847d73' },
  { id: 'mystic-gray', name: 'Mystic Gray', hex: '#73777d' },
  { id: 'copper-trail', name: 'Copper Trail', hex: '#8a5a3f' },
  { id: 'prairie-wood', name: 'Prairie Wood', hex: '#6f5b48' },
  { id: 'midnight', name: 'Midnight', hex: '#2c2e32' },
];

export const ROOF_COLORS_COPY = {
  label: 'Shingle colors',
  heading: 'See a roof in a __new color__',
  sub: 'Tap a color to see it on a home’s roof. Every roof replacement starts with a free roof evaluation, and we can bring physical samples so you see the color in your own light.',
  sri: 'Every color here is a cool roof color rated SRI 20 or higher. The Solar Reflectance Index measures how well a roof sheds the sun’s heat, so a higher number means a cooler roof and attic.',
  note: 'Colors on screen are approximate. Check a physical sample before you decide.',
};
