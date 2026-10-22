// Tile Roofing section: the /residential-roofing/tile-roofing/ hub page and its six service pages.
// Rich fields accept [link text](/path/) and **bold**. Plain fields take text only.

export const TILE_CONTENT = {
  hub: {
    keyword: 'tile roofing',
    metaTitle: 'Tile Roofing in Los Angeles & Orange County',
    metaDescription: 'Tile roofing in Los Angeles & Orange County: clay, concrete and slate tile repair, lift & relay, replacement and roof care. Start with a free roof evaluation.',
    hero: {
      heading: 'Tile Roofing Services',
      intro: 'Tile roofing from QRS covers repairs, tune-ups, inspections, roof care, lift & relay and replacement for clay, concrete and slate tile roofs across Los Angeles and Orange County. Because the tiles often outlast the layers beneath them, we focus on the underlayment, flashings and valleys you can’t see. Every job starts with a free roof evaluation.',
      highlights: ['Clay, concrete and slate options', 'Focused on what’s under the tile', 'Free drone roof evaluation to start'],
    },
    overview: {
      heading: 'A Tile Roof Is More Than Its Tiles',
      paragraphs: [
        'Tile roofing from QRS covers repairs, tune-ups, inspections, roof care, lift & relay and replacement for clay, concrete and slate tile roofs. Tile is part of the look of Southern California, from the clay barrel tile on Spanish Revival homes in Pasadena and Glendale to the concrete tile on newer Mediterranean-style homes in Irvine. The tiles themselves are tough. What actually keeps water out is the underlayment beneath them, helped by the flashings and valleys that steer water off the roof. Heat, Santa Ana winds and the occasional earthquake work on those layers for years, and they usually wear out well before the tile does. That’s why every tile job we do starts with what’s happening under the tile.',
        'The right service depends on where your roof is in its life. A few cracked or slipped tiles call for a targeted [tile roof repair](/residential-roofing/tile-roofing/repair/). Worn underlayment beneath tiles that are still sound is the job for a [tile lift & relay](/residential-roofing/tile-roofing/lift-and-relay/), which keeps your home’s original look. If you are comparing materials, explore [concrete tile roofing](/residential-roofing/tile-roofing/concrete/) and [slate tile roofing](/residential-roofing/tile-roofing/slate/). When the tiles themselves are failing, a [tile roof replacement](/residential-roofing/tile-roofing/replacement/) starts fresh. A free roof evaluation helps identify what your roof needs.',
      ],
    },
    cards: {
      heading: 'Find the Right Tile Roof Service',
      intro: 'From a single cracked tile to a complete new roof, every service starts with a roofer looking at the whole roof, not just the spot you called about.',
    },
    highlights: {
      heading: 'Why Tile Suits Southern California',
      points: [
        { title: 'Built for sun and heat', text: 'Clay and concrete tile stand up to intense sun, and intact tiles shade the underlayment from direct UV. That protection holds as long as the tiles stay whole and in place.' },
        { title: 'Noncombustible by nature', text: 'Tile itself doesn’t burn, which matters in wildfire country. Bird stops and eave closures help keep wind-blown embers and debris from getting under the tiles.' },
        { title: 'True to the architecture', text: 'Barrel and S tile are part of what makes Spanish Revival and Mediterranean homes look right. Keeping that look through every repair and relay comes down to careful handling and close tile matching.' },
      ],
    },
    faqs: [
      { q: 'What’s the difference between clay and concrete tile?', a: 'Clay tile is fired in a kiln, tends to hold its color and is the traditional choice for barrel and S profiles. Concrete tile is made from cement and sand, comes in flat and S profiles and can fade or turn porous as its surface weathers. Both crack under careless footsteps, and each needs its own approach when replacement tiles have to be matched.' },
      { q: 'How long does a tile roof last?', a: 'The tiles and the layers under them age on different clocks. Well-kept clay and concrete tile can go for decades, while the underlayment beneath is usually what gives out first, especially after years of Southern California heat. When an older tile roof starts leaking, that hidden layer is the usual suspect. Our guide to [when tile roof underlayment should be replaced](/blog/tile-roof-underlayment/) covers the warning signs.' },
      { q: 'Is it safe to walk on a tile roof?', a: 'We’d advise against it. Tiles crack when weight lands on an unsupported spot, and the damage often can’t be seen from the ground. If someone needs roof access for other work, ask how they plan to protect the tile before they climb up.' },
      { q: 'My Spanish-style home has flat roof sections too. Can you handle both?', a: 'Yes. Many Spanish Revival homes pair tile with flat areas behind parapet walls, and the transitions between them need as much attention as either roof. We look at both during the roof evaluation, and our [flat roofing](/residential-roofing/flat-roofing/) work covers the low-slope side.' },
      { q: 'Do you work on tile roofs in my area?', a: 'We serve homeowners throughout Los Angeles County and Orange County, from Santa Monica and Burbank to Long Beach and Newport Beach. See our [service locations](/service-areas/), or book a [free roof evaluation](#roof-check) and we’ll confirm your address is covered.' },
    ],
  },

  services: [
    {
      slug: 'replacement',
      keyword: 'tile roof replacement',
      title: 'Tile Roof Replacement',
      navLabel: 'Roof Replacement',
      card: 'When the old tiles are past saving, we tear off to the deck and build a complete new tile system, from underlayment and flashings to ridge.',
      metaTitle: 'Tile Roof Replacement in Los Angeles',
      metaDescription: 'Tile roof replacement in Los Angeles & Orange County: full tear-off, new underlayment, flashings and clay or concrete tile. Book your free roof evaluation.',
      image: '/images/tile-roof-replacement.webp',
      imageAlt: 'Finished clay barrel tile roof on a home, viewed from above',
      hero: {
        intro: 'A tile roof replacement takes your roof down to the deck and builds a complete new system: underlayment, flashings, clay or concrete tile and ridge details. QRS replaces tile roofs across Los Angeles and Orange County when the tiles themselves are past saving, backed by our 10-year workmanship warranty (call for details). It starts with a free roof evaluation.',
        highlights: ['Full tear-off down to the deck', 'Clay or concrete tile to suit your home', '10-Year workmanship warranty (call for details)'],
      },
      // Told the home page's way (owner, October 16 2026; ServiceStory): one statement, one paragraph, then the principles, each fact said once
      story: {
        label: 'Tile roof replacement',
        lead: 'Most of what makes a tile roof last sits __under__ the tile.',
        text: 'Tile is durable, but not permanent: older concrete tile turns brittle and porous, clay cracks after years of foot traffic, and some roofs carry more patches than sound tile. When the tiles fail along with the underlayment, relaying them only puts worn material back on your house.',
        heading: 'How we replace a tile roof',
        image: '/images/tile-roof-replacement-drone-view.webp',
        imageAlt: 'Aerial view of a large finished clay tile roof',
        principles: [
          { title: 'Relay or replace? A straight answer.', text: 'A roofer-led evaluation photographs the tile, flashing and underlayment, so the case is clear to you, not just to us. If your tiles can be saved, a [tile lift & relay](/residential-roofing/tile-roofing/lift-and-relay/) usually costs less and keeps the original look, and we’ll tell you so.' },
          { title: 'The tile that suits your home.', text: 'Replacement is your chance to choose the profile and color. We talk through the clay and concrete options and help you pick one that suits your home and budget.', bullets: ['Clay barrel or S tile', 'Flat or S concrete tile', 'Colors that suit your home’s style'] },
          { title: 'Built for sun, Santa Anas and winter rain.', text: 'The old tile, underlayment and battens come off and the deck is checked and photographed while it’s exposed. Then the new system goes on layer by layer, exactly as the written scope describes.', bullets: ['New underlayment across the deck', 'Battens where the tile system calls for them', 'Flashings, valley metal and eave closures', 'Ridge and hip details finished'] },
          { title: 'A clean site and a walkthrough.', text: 'Tile tear-offs are heavy, dusty work, so the site is kept clean throughout. At the end we walk the finished roof with you, share photos from each stage and go over our 10-year workmanship warranty (call for details).' },
        ],
      },
      faqs: [
        { q: 'How much does a tile roof replacement cost?', a: 'It depends on the roof’s size, pitch and number of stories, whether you choose clay or concrete tile, and how much of the deck, underlayment and flashing needs replacing. If your tiles are still sound, a [tile lift & relay](/residential-roofing/tile-roofing/lift-and-relay/) usually costs less, because the tiles are reused. Your written scope and price come after a [free roof evaluation](#roof-check), before work begins.' },
        { q: 'Do you pull the permits?', a: 'Yes. When your roofing project needs a building permit, we pull it for you.' },
        { q: 'How do I know my tile roof needs replacing, not relaying?', a: 'The tiles tell you. Widespread cracking, concrete tile that has gone soft or porous, or a patchwork of mismatched repairs usually points to replacement. If most tiles are sound and the trouble is underneath, a relay is often the better value, and a [tile roof inspection](/roof-inspection/#tile-roofs) shows which side of that line your roof is on.' },
        { q: 'Should I choose clay or concrete tile for my new roof?', a: 'It comes down to looks, weight and budget. Clay is the traditional choice for Spanish Revival architecture and holds its color well, while concrete comes in many colors and profiles and suits a wide range of home styles. We’ll walk you through both before anything goes into your written scope.' },
        { q: 'Can I replace my tile roof with a different roof type?', a: 'Yes. Some homeowners choose a [shingle roof installation](/residential-roofing/shingle-roofing/installation/) instead, while others want to keep the character tile gives their home. We’ll lay out the trade-offs in plain English, including how each option would look on your house.' },
        { q: 'Does the underlayment matter if the tile is brand new?', a: 'It matters most. Even new tile sheds water rather than sealing it out, so wind-driven rain that gets past the tiles depends on the underlayment and flashings to stop it. That’s why your scope covers those layers in as much detail as the tile you can see.' },
      ],
      related: ['/residential-roofing/tile-roofing/lift-and-relay/', '/roof-inspection/#tile-roofs', '/residential-roofing/tile-roofing/repair/'],
    },

    {
      slug: 'repair',
      keyword: 'tile roof repair',
      title: 'Tile Roof Repair',
      navLabel: 'Roof Repairs',
      card: 'Cracked or slipped tiles, loose ridges, failed flashings and clogged valleys, traced to their source and fixed with photos of the work.',
      metaTitle: 'Tile Roof Repair in Los Angeles & Orange County',
      metaDescription: 'Tile roof repair in Los Angeles & Orange County: leaks traced, cracked tiles matched and flashings fixed, with photos. Book a free roof evaluation.',
      image: '/images/tile-lift-off-and-reset-drone-view-2.webp',
      imageAlt: 'Tile roof repair and relay in progress, with tiles staged on the roof',
      hero: {
        intro: 'Tile roof repair finds where water really gets in, often well away from the stain on your ceiling, and fixes the tiles, flashings or underlayment responsible. QRS repairs tile roofs across Los Angeles and Orange County with the closest available tile match and photos of the problem and the fix.',
        highlights: ['Leaks traced to where water gets in', 'Closest available tile match', 'Photos of the problem and the fix'],
      },
      // Told the home page's way (owner, October 16 2026; ServiceStory): one statement, one paragraph, then the principles, each fact said once
      story: {
        label: 'Tile roof repair',
        lead: 'A tile roof keeps water out in __two__ layers, and a leak can start in either.',
        text: 'The tiles turn away most of the rain and the underlayment beneath catches what slips past, so water can run a long way before it finds a way in. Finding the real entry point, instead of patching the spot that drips, is what makes a tile repair last.',
        heading: 'How we repair a tile roof',
        principles: [
          { title: 'Trace the water. Then touch the tiles.', text: 'A roofer inspects the roof above and around the problem, photographs what they find and follows the water back to where it gets in. You approve a written scope and price, including which tiles will be replaced, before work starts.', bullets: ['Broken or shifted tiles', 'Flashings at walls, chimneys and vents', 'Valleys, ridges and eave closures'] },
          { title: 'Step where the tiles are supported.', text: 'We walk only where tiles are supported and lift the overlapping courses by hand, so fixing one problem doesn’t crack the tiles around it.' },
          { title: 'Matched tiles. The original pattern.', text: 'Damaged pieces are replaced with the closest available color and profile, mortar and fasteners are renewed where needed, and the surrounding tiles go back in their original pattern. You see before-and-after photos of the repair.' },
          { title: 'A repair, a tune-up or a relay.', text: 'One leak gets a targeted repair. A handful of small issues can be handled in one [tile roof tune-up](/roof-maintenance-plans/#tune-up). If the underlayment is worn across the whole roof, we’ll tell you a [tile lift & relay](/residential-roofing/tile-roofing/lift-and-relay/) is the lasting fix, instead of selling you repair after repair.' },
        ],
      },
      faqs: [
        { q: 'Is one cracked tile worth fixing right away?', a: 'Usually, yes. A cracked tile lets sun and water reach the underlayment beneath it, which ages that spot faster and can eventually cause a leak. Replacing a single tile is a small job, and doing it early protects the layer that actually keeps your home dry.' },
        { q: 'Can you match tiles that aren’t made anymore?', a: 'Often, though not always perfectly. Many older clay and concrete profiles and colors have been discontinued, and weathered tiles rarely look identical to new ones. We look for the closest available match and tell you up front how close it will be.' },
        { q: 'Why does my tile roof only leak in heavy rain?', a: 'Heavy, wind-driven rain pushes more water under the tiles, testing worn underlayment, clogged valleys and tired flashings in ways a light shower doesn’t. That’s why a leak can stay hidden for a long time and then show up in one storm. A [tile roof inspection](/roof-inspection/#tile-roofs) can pinpoint the weak spot before the next one, and our [tile roof underlayment guide](/blog/tile-roof-underlayment/) explains why tiles can look fine while the roof leaks.' },
        { q: 'What if the leak is where my tile roof meets a flat section?', a: 'That transition is a common leak point on Spanish-style homes, especially along parapet walls. We check both sides of it, and if the flat side is the source, a [flat roof repair](/residential-roofing/flat-roofing/repair/) becomes part of the fix.' },
        { q: 'Can you fix tiles cracked by other work on the roof?', a: 'Yes. Tiles often break when painters, HVAC technicians or other trades walk a roof without knowing where to step. We replace the broken tiles, check the underlayment beneath them for damage and photograph the finished repair.' },
      ],
      related: ['/residential-roofing/tile-roofing/lift-and-relay/', '/roof-maintenance-plans/#tune-up', '/roof-inspection/#tile-roofs'],
    },

    {
      slug: 'lift-and-relay',
      keyword: 'tile lift & relay',
      title: 'Tile Lift & Relay · *SecondLife*',
      navLabel: 'Lift & Relay',
      card: 'Keep the tile roof you love. We lift the tiles, replace the worn underlayment underneath and reset your roof in its original pattern.',
      metaTitle: 'Tile Lift & Relay in Los Angeles',
      metaDescription: 'Tile lift & relay in LA & Orange County: new underlayment under your existing tiles, reset cleanly to keep your look. Start with a free roof evaluation.',
      image: '/images/tile-lift-off-and-reset-drone-view.webp',
      imageAlt: 'Aerial view of tiles lifted off a roof during a tile lift and relay, exposing the underlayment',
      hero: {
        intro: 'A tile lift & relay removes your existing tiles, replaces the worn underlayment beneath them and resets the same tiles in their original pattern, so your roof keeps its look. QRS does it across Los Angeles and Orange County as our *SecondLife* Tile Reset, renewing worn battens and flashings and replacing only cracked or broken tiles.',
        highlights: ['Your tiles reused, broken ones matched', 'New underlayment and flashings', 'Written scope and price first'],
      },
      // Told the home page's way (owner, October 16 2026; ServiceStory): one statement, one paragraph, then the principles, each fact said once
      story: {
        label: 'Tile lift & relay',
        lead: 'Your tiles can last for decades. The layer __beneath__ them can’t.',
        text: 'Underlayment dries out and cracks after years of Southern California heat, and water that slips past the tiles then has nowhere to go but into the deck. A lift & relay fixes it at the source and keeps your roof’s look.',
        heading: 'How we do a tile lift & relay',
        image: '/images/tile-lift-off-and-reset-drone-view-2.webp',
        imageAlt: 'Aerial view of a tile roof mid lift and relay, with tiles staged and a crew member on a ladder',
        principles: [
          { title: 'A relay, a repair or a new roof.', text: 'A roofer photographs the underlayment wherever it can be seen, along with the tiles and details, and tells you whether a relay is right, a smaller repair will do, or the tiles are past saving and a [tile roof replacement](/residential-roofing/tile-roofing/replacement/) makes more sense.', bullets: ['Underlayment condition', 'Cracked, slipped or missing tiles', 'Valleys, flashings and penetrations'] },
          { title: 'Off by hand, stacked with care.', text: 'Tiles are heavy and crack if mishandled, so they come off by hand and are stacked until they go back in the same pattern. Some older tiles break anyway, which is why matching replacements are planned from the start.' },
          { title: 'New underlayment, renewed details.', text: 'With the tiles off, new underlayment goes on across the roof and the worn details beneath are renewed, as your written scope and price spell out before work starts.', bullets: ['New underlayment across the roof', 'Worn battens replaced', 'Flashings, valleys and vents addressed', 'Deck checked while it’s exposed'] },
          { title: 'The same tiles, back in their pattern.', text: 'Sound tiles go back in their original pattern and broken ones are replaced with the closest available match, with ridge and hip tiles, bird stops and eave closures in place. On a Spanish Revival home, where the original clay is part of the character, that matters. We finish with a walkthrough, photos and our 10-year workmanship warranty (call for details).' },
        ],
      },
      faqs: [
        { q: 'How do I know if my tile roof needs a lift & relay?', a: 'Common signs are leaks with no visibly broken tiles, ceiling stains after heavy rain, repeated repairs in different spots, and underlayment that’s brittle or torn where it can be seen. A [tile roof inspection](/roof-inspection/#tile-roofs) confirms it with photos, and our guide to [tile roof underlayment](/blog/tile-roof-underlayment/) walks through the signs in more detail.' },
        { q: 'Will my roof look the same afterward?', a: 'That’s the point of a relay. We reuse your tiles wherever they’re sound and replace broken ones with the closest available match. Where a match isn’t exact, replacement tiles can go on less visible slopes so the originals stay where people will see them.' },
        { q: 'Is a lift & relay less expensive than a new tile roof?', a: 'Usually, because the tiles are reused. Your written scope shows the price before any work starts, and if replacement makes more sense, we’ll explain why.' },
        { q: 'Do you pull the permits?', a: 'Yes. When your roofing project needs a building permit, we pull it for you.' },
        { q: 'Can you replace just a few cracked tiles instead?', a: 'If the underlayment is still in good shape, a targeted [tile roof repair](/residential-roofing/tile-roofing/repair/) may be all you need. The roof evaluation tells you which applies.' },
        { q: 'What happens to the battens, bird stops and ridge tiles?', a: 'The relay is the natural time to fix them. Damp battens can rot, and missing bird stops let birds, debris and embers in at the eaves. Ridge and hip tiles go back in fresh mortar or with a mechanically fastened detail, and your written scope spells out which.' },
      ],
      related: ['/residential-roofing/tile-roofing/repair/', '/residential-roofing/tile-roofing/replacement/', '/roof-inspection/#tile-roofs'],
    },

    {
      slug: 'slate',
      keyword: 'slate tile roofing',
      title: 'Slate Tile Roofing',
      navLabel: 'Slate Tile Roofing',
      card: 'A distinctive natural-stone roof option, planned around your home’s structure, roof details and the slate profile you want.',
      metaTitle: 'Slate Tile Roofing in Los Angeles & Orange County',
      metaDescription: 'Slate tile roofing in Los Angeles & Orange County: a natural-stone roof planned around structure, underlayment and flashing. Request a roof evaluation.',
      image: '/images/tile-roof-replacement.webp',
      imageAlt: 'Tile roof on a Southern California home',
      hero: {
        intro: 'Slate tile roofing gives a home the natural color and texture of stone, and QRS plans slate roofs across Los Angeles and Orange County from the structure up. Because slate is heavy, we review the framing and roof details first and put the full scope in writing before work begins. It starts with a roof evaluation.',
        highlights: ['Natural slate appearance', 'Roof structure and details reviewed', 'Written scope before work begins'],
      },
      // Told the home page's way (owner, October 16 2026; ServiceStory): one statement, one paragraph, then the principles, each fact said once
      story: {
        label: 'Slate tile roofing',
        lead: 'A slate roof starts with the __structure__, not the stone.',
        text: 'Slate gives a home the natural color and texture of stone and a long service life when the roof is designed and installed for it. It’s heavy and fastened its own way, so planning matters more than with most roofs.',
        heading: 'How we plan a slate roof',
        principles: [
          { title: 'Look at the home first.', text: 'We document the roof’s condition, shape and visible details, and talk through the look and the goals for the project.' },
          { title: 'Check the framing before choosing the material.', text: 'Slate is a substantial roofing material, so the roof framing, slope, drainage and the project’s requirements are reviewed before a final system is selected.' },
          { title: 'Every layer in the written scope.', text: 'The proposal explains the roof assembly, the slate selection, underlayment, flashing, drainage and clean-up, with the price, before installation begins.' },
          { title: 'Laid out with care, or a lighter option.', text: 'Work follows the approved scope, with attention to the slate layout and every transition, and we review the finished roof and photos with you. If slate isn’t the right fit for the structure or budget, [concrete tile roofing](/residential-roofing/tile-roofing/concrete/) and other [tile roof replacement](/residential-roofing/tile-roofing/replacement/) options are worth a look.' },
        ],
      },
      faqs: [
        { q: 'Can every home support slate tile roofing?', a: 'Not necessarily. Slate is heavy, so the existing framing and project requirements need to be reviewed before choosing it. A roof evaluation is the right first step.' },
        { q: 'What does slate roofing cost?', a: 'Cost depends on the roof, access, slate selection and the work needed beneath it. We inspect the roof and provide a written scope and price for the specific home.' },
        { q: 'What if slate is not a fit for my home?', a: 'We can compare other options, including [concrete tile roofing](/residential-roofing/tile-roofing/concrete/) and a complete [tile roof replacement](/residential-roofing/tile-roofing/replacement/), based on the home and your goals.' },
      ],
      related: ['/residential-roofing/tile-roofing/concrete/', '/residential-roofing/tile-roofing/replacement/', '/roof-inspection/#tile-roofs'],
    },
    {
      slug: 'concrete',
      keyword: 'concrete tile roofing',
      title: 'Concrete Tile Roofing',
      navLabel: 'Concrete Tile Roofing',
      card: 'Explore concrete tile profiles and colors, with a roof system planned around the deck, underlayment and flashing.',
      metaTitle: 'Concrete Tile Roofing in Los Angeles & Orange County',
      metaDescription: 'Concrete tile roofing in Los Angeles & Orange County: compare profiles, colors and roof-system details with a local roofing crew. Request a roof evaluation.',
      image: '/images/tile-roof-replacement.webp',
      imageAlt: 'Concrete tile roof on a Southern California home',
      hero: {
        intro: 'Concrete tile roofing comes in a range of profiles and colors, and QRS installs it on homes across Los Angeles and Orange County as a complete roof system. We help you choose the profile and color, then plan the deck, underlayment, flashing and drainage alongside the tile, with a written scope before work begins.',
        highlights: ['Multiple profiles and color choices', 'Underlayment and flashing included in planning', 'Written scope before work begins'],
      },
      // Told the home page's way (owner, October 16 2026; ServiceStory): one statement, one paragraph, then the principles, each fact said once
      story: {
        label: 'Concrete tile roofing',
        lead: 'The tile you see is only one part of the __roof__.',
        text: 'Concrete tile suits many home styles, from Spanish-inspired architecture to newer Mediterranean designs. What keeps it dry is planned underneath: the deck, the underlayment, the flashing and the way water runs off.',
        heading: 'How we plan a concrete tile roof',
        principles: [
          { title: 'Start with the roof you have.', text: 'We photograph the roof, check what can be seen and talk through your goals. If the tiles can be reused and the underlayment is the real concern, a [tile lift & relay](/residential-roofing/tile-roofing/lift-and-relay/) may be worth considering instead.' },
          { title: 'A profile and color that fit the house.', text: 'We go through the concrete tile options and how each fits your home’s architecture and the project. If you’re drawn to a natural-stone look, we can also talk through [slate tile roofing](/residential-roofing/tile-roofing/slate/).' },
          { title: 'The layers below, planned with the tile.', text: 'Your written scope covers removal as needed, the underlayment, the flashing and drainage details that direct water off the roof, and the tile installation, so nothing under the tile is left to chance.' },
          { title: 'Installed, then walked through.', text: 'Our crew completes the approved work and reviews the finished roof and the photos with you. As a small local company, we take on focused tile work and larger roof projects alike.' },
        ],
      },
      faqs: [
        { q: 'What concrete tile styles are available?', a: 'Concrete tiles come in different profiles and colors. The options available for your project depend on the home, product selection and scope; we can review those during the estimate.' },
        { q: 'Can you replace only damaged concrete tiles?', a: 'Often, yes. We inspect the surrounding tiles and underlayment, then explain whether a targeted [tile roof repair](/residential-roofing/tile-roofing/repair/) or more extensive work makes sense.' },
        { q: 'Can concrete tile be installed over my existing roof?', a: 'That depends on the existing roof assembly and project requirements. We evaluate the roof and describe any tear-off or preparation needed in the written scope.' },
      ],
      related: ['/residential-roofing/tile-roofing/slate/', '/residential-roofing/tile-roofing/replacement/', '/residential-roofing/tile-roofing/repair/'],
    },
  ],
};
