// The roofing glossary (/roofing-glossary/): plain-English definitions of the words roofers use, grouped by topic, each linking to the page that
// covers it where there is one. Rendered by app/roofing-glossary/page.js, with DefinedTermSet structured data, and listed in the AI files.
// Definitions explain general roofing; anything about QRS itself must be a confirmed claim (see the memory note on confirmed site claims).

export const GLOSSARY_PAGE = {
  path: '/roofing-glossary/',
  keyword: 'roofing terms',
  metaTitle: 'Roofing Terms Glossary: Plain-English Definitions',
  metaDescription:
    'Roofing terms explained in plain English: flashing, underlayment, pitch, squares, valleys, torch-down, TPO, lift and relay and more, from our roofers.',
  hero: {
    heading: 'Roofing Terms Glossary',
    intro:
      'Roofing terms can make an estimate hard to follow. This glossary explains the words roofers use in plain English, from the parts of a roof to the materials, the problems we find and the paperwork, so you can read a scope and ask the right questions.',
    image: '/images/shingle-roof-installation-underlayment.webp',
    imageAlt: 'Roofers laying new underlayment over the roof deck before the shingles go on',
  },
  groups: [
    {
      title: 'Parts of a roof',
      terms: [
        { term: 'Roof deck (sheathing)', def: 'The layer of plywood or boards fastened to the rafters that everything else is built on. A full tear-off exposes it, so damaged sections can be replaced before the new roof goes on.' },
        { term: 'Rafters and trusses', def: 'The wood framing that holds up the roof deck and sets the shape and slope of the roof.' },
        { term: 'Underlayment', def: 'The water-resistant layer between the roof deck and the shingles, tile or metal. It is the roof’s second line of defense, and on a tile roof it does most of the waterproofing.', href: '/blog/tile-roof-underlayment/' },
        { term: 'Ridge', def: 'The top edge where two roof slopes meet. It is covered with ridge caps.' },
        { term: 'Hip', def: 'The sloped edge where two roof planes meet on the outside of a corner, running from the ridge down to the eave.' },
        { term: 'Valley', def: 'The channel where two roof slopes meet on the inside of a corner. Valleys carry a lot of water, so they are a common place for leaks and debris.' },
        { term: 'Eave', def: 'The lower edge of a roof that hangs past the wall.' },
        { term: 'Rake', def: 'The sloped outer edge of a gable roof, from the eave up to the ridge.' },
        { term: 'Gable', def: 'The triangle of wall at the end of a pitched roof. A gable roof slopes down on two sides; a hip roof slopes down on all four.' },
        { term: 'Fascia', def: 'The board along the eave that the roof edge finishes against.' },
        { term: 'Soffit', def: 'The underside of the eave overhang. Soffit vents let air into the attic.' },
        { term: 'Penetration', def: 'Anything that passes through the roof: plumbing vents, exhaust fans, skylights, chimneys, solar mounts or equipment supports. Each one has to be flashed and sealed.' },
        { term: 'Parapet', def: 'A low wall that rises above the edge of a flat roof, common on Spanish-style homes and commercial buildings.' },
        { term: 'Coping', def: 'The cap along the top of a parapet wall that keeps water out of the wall itself.' },
        { term: 'Scupper', def: 'An opening in a parapet wall that lets water run off a flat roof.' },
        { term: 'Cricket (saddle)', def: 'A small peaked section built behind a chimney or between slopes to steer water around it instead of letting it pool.' },
      ],
    },
    {
      title: 'Flashing and details',
      terms: [
        { term: 'Flashing', def: 'Metal or membrane pieces that seal the joints where the roof meets a wall, chimney, skylight, vent or another roof plane. Most leaks start at flashing, not in the middle of a roof.', href: '/blog/roof-leak-source/' },
        { term: 'Step flashing', def: 'Small L-shaped pieces woven in with each course of shingles where a sloped roof meets a wall.' },
        { term: 'Counter flashing', def: 'Flashing set into the wall or chimney that laps over the step or base flashing below it, so water can’t get behind it.' },
        { term: 'Drip edge', def: 'A metal strip along the eaves and rakes that guides water off the roof edge and protects the deck’s edge.' },
        { term: 'Pipe boot (pipe jack)', def: 'The collar that seals around a plumbing vent pipe. Rubber boots crack in the sun and are one of the most common small leaks on shingle roofs.' },
        { term: 'Ridge vent', def: 'A vent that runs along the ridge so warm, moist air can leave the attic.', href: '/residential-roofing/attic-ventilation/' },
        { term: 'Eave closure (bird stop)', def: 'A piece that closes the open ends of the first row of tiles at the eave, keeping out birds, pests and wind-blown embers.' },
        { term: 'Battens', def: 'Strips of wood or other material fastened across the roof that some tile roofs hang on.' },
      ],
    },
    {
      title: 'Measuring a roof',
      terms: [
        { term: 'Square', def: 'Roofers price and order by the square: 100 square feet of roof surface. A 2,000 square foot roof is 20 squares.', href: '/blog/roof-replacement-cost-los-angeles/' },
        { term: 'Pitch (slope)', def: 'How steep a roof is, written as the rise in inches for every 12 inches across: a 4/12 roof rises 4 inches per foot. Steeper roofs take more time and safety work.' },
        { term: 'Low-slope roof', def: 'A roof that is nearly flat, usually under 3/12. It needs a continuous membrane rather than overlapping shingles or tile.', href: '/residential-roofing/flat-roofing/' },
        { term: 'Waste factor', def: 'The extra material ordered for cuts, starter rows, hips and ridges, usually given as a percentage of the roof area.' },
        { term: 'Roof facet (plane)', def: 'One flat surface of a roof. A simple gable roof has two; a complex roof can have twenty or more, and every extra facet adds cuts, valleys and flashing.' },
      ],
    },
    {
      title: 'Roofing materials',
      terms: [
        { term: 'Architectural shingle', def: 'A thicker, layered asphalt shingle with a dimensional look. It has largely replaced the flat three-tab shingle on new roofs.', href: '/residential-roofing/shingle-roofing/' },
        { term: 'Three-tab shingle', def: 'A thinner, single-layer asphalt shingle with three flat tabs per strip.' },
        { term: 'Starter strip', def: 'The first course of shingles along the eave, which seals the edge and gives the first visible row something to bond to.' },
        { term: 'Clay tile', def: 'Fired clay roof tile, the classic Spanish (barrel) or flat profile seen across Southern California. The tile itself can outlast the underlayment beneath it.', href: '/residential-roofing/tile-roofing/' },
        { term: 'Concrete tile', def: 'Roof tile made from concrete, heavier than clay and made in many profiles and colors.', href: '/residential-roofing/tile-roofing/concrete/' },
        { term: 'Standing seam metal', def: 'A metal roof made of long panels joined by raised seams, with the fasteners hidden under the seams.', href: '/residential-roofing/metal-roofing/standing-seam/' },
        { term: 'Modified bitumen', def: 'An asphalt roofing membrane strengthened with polymers, laid in rolls on flat roofs. APP and SBS are the two main types.', href: '/blog/torch-down-roofing-app-vs-sbs/' },
        { term: 'Torch-down roofing', def: 'Modified bitumen sheets bonded to the roof by heating them with a torch, so the layers fuse into one waterproof surface.', href: '/blog/torch-down-roofing-app-vs-sbs/' },
        { term: 'Base sheet and cap sheet', def: 'The two layers of a modified bitumen roof: the base sheet goes down first, the cap sheet is the finished, often granulated, top layer.' },
        { term: 'TPO', def: 'Thermoplastic polyolefin: a single-ply membrane, usually white, whose seams are welded with hot air. Common on commercial flat roofs.', href: '/blog/tpo-roofing-pros-and-cons/' },
        { term: 'Built-up roof (BUR)', def: 'An older flat roof made of alternating layers of asphalt and felt, often finished with gravel.' },
        { term: 'Cool roof', def: 'A roof surface that reflects more sunlight and gives off heat more easily than a standard roof, which keeps the roof and the rooms below cooler.', href: '/blog/cool-roof-southern-california/' },
        { term: 'Class A fire rating', def: 'The highest fire rating a roof covering can get in standard fire tests. Clay and concrete tile, metal and most asphalt shingles can reach it.', href: '/blog/wildfire-resistant-roof-los-angeles/' },
      ],
    },
    {
      title: 'Problems we find',
      terms: [
        { term: 'Ponding water', def: 'Water that sits on a flat roof long after rain instead of draining. It wears the surface and finds any weak seam.' },
        { term: 'Blister', def: 'A raised bubble in a flat roof membrane where air or moisture is trapped between layers.' },
        { term: 'Granule loss', def: 'Asphalt shingles shedding their mineral surface, which leaves the shingle exposed to the sun. Granules washing off the roof and bare, dark patches are signs of an aging roof.' },
        { term: 'Nail pop', def: 'A roofing nail that has backed out and lifted the shingle above it, leaving a path for water.' },
        { term: 'Slipped tile', def: 'A roof tile that has moved out of place, often because its fastener or the batten under it has failed.' },
        { term: 'Wind-lifted shingle', def: 'A shingle whose seal has broken in the wind, so its edge can flap, crease or tear off.', href: '/blog/roof-storm-damage-signs/' },
      ],
    },
    {
      title: 'The work and the paperwork',
      terms: [
        { term: 'Tear-off', def: 'Removing the old roofing down to the deck before the new roof goes on, so the deck can be checked and repaired.', href: '/roof-replacement/' },
        { term: 'Overlay (re-roof)', def: 'Installing new shingles over an existing layer instead of tearing it off. It hides the deck and adds weight, and the number of layers allowed is limited.' },
        { term: 'Lift and relay', def: 'A tile roof repair where the tiles are lifted off, the worn underlayment beneath them is replaced, and the same tiles are put back.', href: '/residential-roofing/tile-roofing/lift-and-relay/' },
        { term: 'Scope of work', def: 'The written list of exactly what a roofer will do: materials, details, how damage found during the job is handled and the price. Compare scopes, not just totals.' },
        { term: 'Building permit', def: 'Approval from the city or county for the roof work, followed by an inspection. QRS pulls the permits for its jobs.' },
        { term: 'Workmanship warranty', def: 'The roofer’s own guarantee on how the roof was installed, separate from the manufacturer’s warranty on the materials. QRS backs its installs with a 10-year workmanship warranty (call for details).' },
        { term: 'Manufacturer’s warranty', def: 'The material maker’s warranty on its products. The coverage depends on the product and the warranty tier.' },
        { term: 'CSLB license', def: 'California’s Contractors State License Board licenses roofers. You can look up any contractor’s license number on the CSLB website before you hire.', href: '/credentials/' },
      ],
    },
  ],
};
