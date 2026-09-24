// Tile Roofing section: the /tile-roofing/ hub page and its six service pages.
// Rich fields accept [link text](/path/) and **bold**. Plain fields take text only.

export const TILE_CONTENT = {
  hub: {
    keyword: 'tile roofing',
    metaTitle: 'Tile Roofing in LA & Orange County',
    metaDescription: 'Tile roofing in Los Angeles & Orange County: clay and concrete tile repair, lift & relay, replacement and roof care. Start with a $199 Roof Check.',
    hero: {
      heading: 'Tile Roofing Services',
      intro: 'Clay and concrete tiles often outlast the layers beneath them, so a tile roof is only as sound as the parts you can’t see. Our tile roofing work across Los Angeles and Orange County covers repairs, tune-ups, relays and replacement, and it starts with a roofer-led look at the whole system.',
      highlights: ['Clay barrel, S tile and concrete profiles', 'Focused on what’s under the tile', 'Roofer-led $199 Roof Check to start'],
    },
    overview: {
      heading: 'A Tile Roof Is More Than Its Tiles',
      paragraphs: [
        'Tile is part of the look of Southern California, from the clay barrel tile on Spanish Revival homes in Pasadena and Glendale to the concrete tile on newer Mediterranean-style homes in Irvine. The tiles themselves are tough. What actually keeps water out is the underlayment beneath them, helped by the flashings and valleys that steer water off the roof. Heat, Santa Ana winds and the occasional earthquake work on those layers for years, and they usually wear out well before the tile does. That’s why every tile job we do starts with what’s happening under the tile.',
        'The right service depends on where your roof is in its life. A few cracked or slipped tiles call for a targeted [tile roof repair](/tile-roofing/repairs/). Worn underlayment beneath tiles that are still sound is the job for a [tile lift & relay](/tile-roofing/lift-and-relay/), which keeps your home’s original look. When the tiles themselves are failing, a [tile roof replacement](/tile-roofing/replacement/) starts fresh. In between, a tune-up or scheduled roof care keeps small problems small, and a $199 Roof Check tells you which of these your roof actually needs.',
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
      { q: 'How long does a tile roof last?', a: 'The tiles and the layers under them age on different clocks. Well-kept clay and concrete tile can go for decades, while the underlayment beneath is usually what gives out first, especially after years of Southern California heat. When an older tile roof starts leaking, that hidden layer is the usual suspect.' },
      { q: 'Is it safe to walk on a tile roof?', a: 'We’d advise against it. Tiles crack when weight lands on an unsupported spot, and the damage often can’t be seen from the ground. If someone needs roof access for other work, ask how they plan to protect the tile before they climb up.' },
      { q: 'My Spanish-style home has flat roof sections too. Can you handle both?', a: 'Yes. Many Spanish Revival homes pair tile with flat areas behind parapet walls, and the transitions between them need as much attention as either roof. We look at both during the Roof Check, and our [flat roofing](/flat-roofing/) work covers the low-slope side.' },
      { q: 'Do you work on tile roofs in my area?', a: 'We serve homeowners throughout Los Angeles County and Orange County, from Santa Monica and Burbank to Long Beach and Newport Beach. See our [service locations](/locations/), or book a [$199 Roof Check](#roof-check) and we’ll confirm your address is covered.' },
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
      metaDescription: 'Tile roof replacement in Los Angeles & Orange County: full tear-off, new underlayment, flashings and clay or concrete tile. Book your $199 Roof Check.',
      hero: {
        intro: 'Sometimes the tiles themselves are finished. A tile roof replacement takes the roof down to the deck and builds a complete new system, from underlayment and flashings to the tile and ridge.',
        highlights: ['Full tear-off down to the deck', 'Clay or concrete tile to suit your home', 'Lifetime workmanship warranty'],
      },
      overview: {
        paragraphs: [
          'Tile is durable, but it isn’t permanent. Older concrete tile can turn brittle and porous as its surface wears away, clay can crack after years of foot traffic and shaking, and some roofs carry so many mismatched patches that little is left worth saving. When the tiles are failing along with the underlayment, relaying them only puts worn material back on your house. In that case, **starting fresh** is the lasting fix: new underlayment, flashings and tile, built for Southern California sun, wind and winter storms.',
          'If your tiles are still sound, a [tile lift & relay](/tile-roofing/lift-and-relay/) usually costs less and keeps the original look, and we’ll tell you when that’s the better route. When replacement is the right call, it’s also your chance to choose the tile profile and color that suit your home. Your written scope spells out the tile, underlayment, flashings, ridge details and clean-up before work starts, so you know exactly what you’re paying for.',
        ],
      },
      process: {
        subheading: 'How a tile roof replacement works',
        steps: [
          { title: 'Roof Check and recommendation', text: 'We inspect the roof and photo-document the tile, flashing and underlayment condition, so the case for replacement is clear to you, not just to us.' },
          { title: 'Choose your tile', text: 'We talk through clay and concrete options, profiles and colors, and help you pick a tile that suits your home and budget.', bullets: ['Clay barrel or S tile', 'Flat or S concrete tile', 'Colors that suit your home’s style'] },
          { title: 'Tear-off to the deck', text: 'The old tile, underlayment and battens come off, and the deck gets a close look while it’s exposed.', bullets: ['Old roof removed down to the deck', 'Deck damage photographed', 'Debris cleared as we go'] },
          { title: 'New tile system installed', text: 'Qualified crews install the new system cleanly and to spec, layer by layer, exactly as your scope describes.', bullets: ['New underlayment across the deck', 'Battens where the tile system calls for them', 'Flashings, valley metal and eave closures', 'New tile set and fastened to spec', 'Ridge and hip details finished'] },
          { title: 'Final walkthrough with you', text: 'We walk the finished roof with you, share photos from each stage and go over your lifetime workmanship warranty in plain English.' },
        ],
      },
      why: {
        heading: 'Why Choose QRS for Tile Roof Replacement?',
        intro: 'A new tile roof is a long-term investment, and most of what makes it last sits under the tile.',
        points: [
          { title: 'A straight answer on relay vs. replace', text: 'It starts with a [$199 Roof Check](#roof-check). If your tiles can be saved, we’ll say so, and replacement is only recommended when the roof truly needs it.' },
          { title: 'Built for Southern California', text: 'Underlayment, flashings and fastening are planned for intense sun, Santa Ana winds and heavy winter rain, not just for how the tile looks.' },
          { title: 'A clean site, start to finish', text: 'Tile tear-offs are heavy, dusty work. We keep the job site clean throughout, and it’s something customers praise in their Google reviews.' },
          { title: 'Lifetime workmanship warranty', text: 'Every new tile roof we install is backed by the QRS Guarantee, and our follow-through doesn’t end when the crew packs up.' },
        ],
      },
      faqs: [
        { q: 'How do I know my tile roof needs replacing, not relaying?', a: 'The tiles tell you. Widespread cracking, concrete tile that has gone soft or porous, or a patchwork of mismatched repairs usually points to replacement. If most tiles are sound and the trouble is underneath, a relay is often the better value, and a [tile roof inspection](/tile-roofing/inspection/) shows which side of that line your roof is on.' },
        { q: 'Should I choose clay or concrete tile for my new roof?', a: 'It comes down to looks, weight and budget. Clay is the traditional choice for Spanish Revival architecture and holds its color well, while concrete comes in many colors and profiles and suits a wide range of home styles. We’ll walk you through both before anything goes into your written scope.' },
        { q: 'Can I replace my tile roof with a different roof type?', a: 'Yes. Some homeowners choose a [shingle roof installation](/shingle-roofing/installation/) or [standing seam metal roofing](/metal-roofing/standing-seam/) instead, while others want to keep the character tile gives their home. We’ll lay out the trade-offs in plain English, including how each option would look on your house.' },
        { q: 'Does the underlayment matter if the tile is brand new?', a: 'It matters most. Even new tile sheds water rather than sealing it out, so wind-driven rain that gets past the tiles depends on the underlayment and flashings to stop it. That’s why your scope covers those layers in as much detail as the tile you can see.' },
      ],
      related: ['/tile-roofing/lift-and-relay/', '/tile-roofing/inspection/', '/tile-roofing/repairs/'],
    },

    {
      slug: 'repairs',
      keyword: 'tile roof repair',
      title: 'Tile Roof Repair',
      navLabel: 'Roof Repairs',
      card: 'Cracked or slipped tiles, loose ridges, failed flashings and clogged valleys, traced to their source and fixed with photos of the work.',
      metaTitle: 'Tile Roof Repair in Los Angeles & OC',
      metaDescription: 'Tile roof repair in Los Angeles & Orange County: leaks traced to the source, cracked tiles matched and flashings fixed, with photos. Book a $199 Roof Check.',
      hero: {
        intro: 'Good tile roof repair starts with finding where water really gets in, which is often well away from the stain on your ceiling. We fix the tiles, flashings or underlayment responsible and show you photos of the repair.',
        highlights: ['Leaks traced to where water gets in', 'Closest available tile match', 'Photos of the problem and the fix'],
      },
      overview: {
        paragraphs: [
          'Tile roofs shed water in layers. The tiles turn away most rain, and the underlayment beneath catches what slips past. So when water shows up inside, the cause could be a cracked or slipped tile, a valley clogged with leaves, a failed flashing at a wall or chimney, or worn underlayment in one section of the roof. Water can also run a long way along the underlayment before it finds a way in. Finding the **real entry point**, instead of patching the spot that happens to drip, is what makes a repair last.',
          'Once the source is clear, the fix is targeted. Cracked tiles are replaced with the closest available match, loose ridge and hip tiles are reset, and failing mortar or flashings are repaired or replaced. If your roof has a handful of small issues rather than one leak, a [tile roof tune-up](/tile-roofing/tune-up/) can handle them in one visit. And if the underlayment is worn across the whole roof, we’ll tell you that a [tile lift & relay](/tile-roofing/lift-and-relay/) is the lasting fix instead of selling you repair after repair.',
        ],
      },
      process: {
        subheading: 'How a tile roof repair works',
        steps: [
          { title: 'Trace the leak', text: 'We inspect the roof above and around the problem area and photo-document what we find, tracing water back to where it actually gets in.', bullets: ['Broken or shifted tiles', 'Flashings at walls, chimneys and vents', 'Valleys, ridges and eave closures'] },
          { title: 'Written repair scope', text: 'You approve a written scope and price for the repair before any work starts, including which tiles will be replaced.' },
          { title: 'Careful access', text: 'We step only where tiles are supported and lift the overlapping courses by hand, so fixing one problem doesn’t create another.' },
          { title: 'Repair and reset', text: 'Damaged pieces are replaced, flashings or underlayment are repaired as scoped, and the surrounding tiles go back in their original pattern.', bullets: ['Replacement tiles matched as closely as possible', 'Mortar and fasteners renewed where needed', 'Surrounding tiles reset and secured'] },
          { title: 'Photos and follow-through', text: 'We show you before-and-after photos of the repair and explain, in plain English, what to keep an eye on next.' },
        ],
      },
      why: {
        heading: 'Why Choose QRS for Tile Roof Repair?',
        intro: 'A tile repair should fix the cause, not just the drip, without leaving a trail of cracked tiles behind.',
        points: [
          { title: 'Experience with how tile is built', text: 'With 30+ years of roofing experience, we know how clay and concrete tile roofs are layered, fastened and flashed, and that’s what finding a leak depends on.' },
          { title: 'Honest when a repair won’t hold', text: 'A [$199 Roof Check](#roof-check) gives you photos and a straight answer on whether a repair will last or the roof needs more.' },
          { title: 'Photo proof of every fix', text: 'You get photos of the damage and the finished repair, so you’re never just taking our word for it.' },
          { title: 'Matching that doesn’t stand out', text: 'We look for the closest available color and profile, so a repair on a front-facing slope doesn’t draw the eye.' },
        ],
      },
      faqs: [
        { q: 'Is one cracked tile worth fixing right away?', a: 'Usually, yes. A cracked tile lets sun and water reach the underlayment beneath it, which ages that spot faster and can eventually cause a leak. Replacing a single tile is a small job, and doing it early protects the layer that actually keeps your home dry.' },
        { q: 'Can you match tiles that aren’t made anymore?', a: 'Often, though not always perfectly. Many older clay and concrete profiles and colors have been discontinued, and weathered tiles rarely look identical to new ones. We look for the closest available match and tell you up front how close it will be.' },
        { q: 'Why does my tile roof only leak in heavy rain?', a: 'Heavy, wind-driven rain pushes more water under the tiles, testing worn underlayment, clogged valleys and tired flashings in ways a light shower doesn’t. That’s why a leak can stay hidden for a long time and then show up in one storm. A [tile roof inspection](/tile-roofing/inspection/) can pinpoint the weak spot before the next one.' },
        { q: 'What if the leak is where my tile roof meets a flat section?', a: 'That transition is a common leak point on Spanish-style homes, especially along parapet walls. We check both sides of it, and if the flat side is the source, a [flat roof repair](/flat-roofing/repairs/) becomes part of the fix.' },
        { q: 'Can you fix tiles cracked by other work on the roof?', a: 'Yes. Tiles often break when painters, HVAC technicians or other trades walk a roof without knowing where to step. We replace the broken tiles, check the underlayment beneath them for damage and photograph the finished repair.' },
      ],
      related: ['/tile-roofing/lift-and-relay/', '/tile-roofing/tune-up/', '/tile-roofing/inspection/'],
    },

    {
      slug: 'lift-and-relay',
      keyword: 'tile lift & relay',
      title: 'Tile Lift & Relay',
      navLabel: 'Lift & Relay',
      card: 'Keep the tile roof you love. We lift the tiles, replace the worn underlayment underneath and reset your roof in its original pattern.',
      metaTitle: 'Tile Lift & Relay in Los Angeles',
      metaDescription: 'Tile lift & relay in Los Angeles & Orange County: new underlayment under your existing tiles, reset cleanly to keep your look. Start with a $199 Roof Check.',
      hero: {
        intro: 'Most tile roofs don’t fail at the tile; they fail at the underlayment beneath it. A tile lift & relay replaces that hidden layer and puts your own tiles back, so your roof keeps its look.',
        highlights: ['Your tiles reused, broken ones matched', 'New underlayment and flashings', 'Written scope and price first'],
      },
      overview: {
        paragraphs: [
          'Clay and concrete tiles can last for decades, but the underlayment that actually keeps water out wears out much sooner. Once it dries out and cracks after years of Southern California heat, water that slips past the tiles has nowhere to go but into the deck. A **lift & relay** fixes the problem at its source: we remove the tiles, install new underlayment, renew worn battens and flashings, and reset the same tiles, replacing only the ones that are cracked or broken.',
          'A relay is often the right middle ground between a patch and a full [tile roof replacement](/tile-roofing/replacement/). It’s especially worth considering on Spanish Revival homes, where the original clay tile is part of the character and an exact match can be hard to find. Not sure which your roof needs? Our [$199 Roof Check](#roof-check) looks at the underlayment, flashings and tile condition, then gives you a clear recommendation in plain English.',
        ],
      },
      process: {
        subheading: 'How a tile lift & relay works',
        steps: [
          { title: 'Roof Check and scope', text: 'We inspect the roof and photo-document what we find, including the underlayment wherever it can be seen, so the case for a relay is clear.', bullets: ['Underlayment condition', 'Cracked, slipped or missing tiles', 'Valleys, flashings and penetrations'] },
          { title: 'Careful tile removal', text: 'Tiles are heavy and can crack if mishandled, so they come off by hand and are stacked with care until they go back in the same pattern. Some older tiles break anyway, which is why matching replacements are planned from the start.' },
          { title: 'New underlayment and flashings', text: 'We install new underlayment, then address worn battens, flashings, valley metal and other details your written scope calls for.', bullets: ['New underlayment across the roof', 'Worn battens replaced', 'Flashings, valleys and vents addressed', 'Deck checked while it’s exposed'] },
          { title: 'Reset and match', text: 'Sound tiles go back in their original pattern, and broken ones are replaced with the closest available match.', bullets: ['Ridge and hip tiles reset', 'Bird stops and eave closures in place', 'Tiles secured as your scope specifies'] },
          { title: 'Final walkthrough', text: 'We review the finished roof with you, share photos of the work and go over your lifetime workmanship warranty.' },
        ],
      },
      why: {
        heading: 'Why Choose QRS for Tile Lift & Relay?',
        intro: 'A lift & relay touches every tile on your roof twice. How the tiles come off, what goes under them and how they go back decides how well the finished roof performs.',
        points: [
          { title: 'Roofer-led assessment', text: 'A roofer, not a salesperson, tells you whether a relay is right for your roof or whether a smaller repair will do.' },
          { title: 'Photo-documented work', text: 'You see the old underlayment, the new layers going in and the finished roof.' },
          { title: 'Written scope and price', text: 'You know exactly what’s included, from underlayment and battens to flashings and ridge details, before work starts.' },
          { title: 'Lifetime workmanship warranty', text: 'Every relay is backed by the QRS Guarantee, and [ongoing tile roof care](/tile-roofing/roof-care/) afterward helps keep the new underlayment protected.' },
        ],
      },
      faqs: [
        { q: 'How do I know if my tile roof needs a lift & relay?', a: 'Common signs are leaks with no visibly broken tiles, ceiling stains after heavy rain, repeated repairs in different spots, and underlayment that’s brittle or torn where it can be seen. A [tile roof inspection](/tile-roofing/inspection/) confirms it with photos.' },
        { q: 'Will my roof look the same afterward?', a: 'That’s the point of a relay. We reuse your tiles wherever they’re sound and replace broken ones with the closest available match. Where a match isn’t exact, replacement tiles can go on less visible slopes so the originals stay where people will see them.' },
        { q: 'Is a lift & relay less expensive than a new tile roof?', a: 'Usually, because the tiles are reused. Your written scope shows the price before any work starts, and if replacement makes more sense, we’ll explain why.' },
        { q: 'Can you replace just a few cracked tiles instead?', a: 'If the underlayment is still in good shape, a targeted [tile roof repair](/tile-roofing/repairs/) may be all you need. The Roof Check tells you which applies.' },
        { q: 'What happens to the battens, bird stops and ridge tiles?', a: 'The relay is the natural time to fix them. Damp battens can rot, and missing bird stops let birds, debris and embers in at the eaves. Ridge and hip tiles go back in fresh mortar or with a mechanically fastened detail, and your written scope spells out which.' },
      ],
      related: ['/tile-roofing/repairs/', '/tile-roofing/replacement/', '/tile-roofing/inspection/'],
    },

    {
      slug: 'inspection',
      keyword: 'tile roof inspection',
      title: 'Tile Roof Inspection',
      navLabel: 'Inspections',
      card: 'Our $199 Roof Check for tile: a roofer looks at the tiles, ridges, flashings and valleys, photo-documents it all and gives you a clear next step.',
      metaTitle: 'Tile Roof Inspection in Los Angeles',
      metaDescription: 'Tile roof inspection in Los Angeles & Orange County: a roofer checks tiles, flashings, valleys and visible underlayment, with photos. Book your $199 Roof Check.',
      hero: {
        intro: 'A tile roof can look perfect from the street while the layer underneath wears out. A tile roof inspection with our $199 Roof Check puts a roofer’s eyes on the whole system, with photos and a plain-English next step.',
        highlights: ['Roofer-led, not a sales visit', 'Photo-documented findings', 'No deposit: pay after the visit'],
      },
      overview: {
        paragraphs: [
          'Inspecting a tile roof takes more care than most. Tiles crack underfoot, so a roofer has to know where to step, and the part that matters most, the underlayment, is mostly hidden. We read what the roof shows: cracked or slipped tiles, loose ridge and hip tiles, crumbling mortar, missing bird stops and debris in the valleys. On clay tile, we look closely for hairline cracks and shifted pieces; on concrete, for surfaces worn thin and porous. We also check the flashings at walls, chimneys, skylights and vents, and the underlayment wherever it can be seen.',
          'An inspection makes sense when you’re **buying or selling a home**, after strong Santa Ana winds or a noticeable earthquake, once other trades have worked on your roof, or before you choose between repair, a relay and replacement. Every [$199 Roof Check](#roof-check) ends with photos, a plain-English explanation and one clear recommendation: repair, monitor, maintain or replace. There’s no deposit, and you pay after the visit.',
        ],
      },
      process: {
        subheading: 'How a tile roof inspection works',
        steps: [
          { title: 'Tell us what you’ve noticed', text: 'A stain, a slipped tile, a recent storm or a home purchase: knowing why you called helps us focus on the right areas first.' },
          { title: 'Tile-safe roof access', text: 'We move across the roof only where tiles overlap and are supported, so the inspection doesn’t leave new cracks behind.' },
          { title: 'Whole-roof system check', text: 'We look at the tiles and everything that holds them in place or keeps water out.', bullets: ['Cracks, slips and gaps in the tile', 'Ridge and hip tiles and their mortar', 'Valleys, flashings and vents', 'Bird stops and eave closures', 'Underlayment where it can be seen'] },
          { title: 'Photos, explained plainly', text: 'You see photos of what we found and hear a roofer’s explanation in plain English, including what’s urgent and what can wait.' },
          { title: 'A clear next step', text: 'Repair, monitor, maintain or replace: you get one recommendation, plus a written scope and price if work is needed.' },
        ],
      },
      why: {
        heading: 'Why Choose QRS for a Tile Roof Inspection?',
        intro: 'An inspection is only useful if it’s honest, and on tile it has to be careful too.',
        points: [
          { title: 'An honest picture, not a pitch', text: 'The visit is about your roof’s real condition, not a sale, and the photos let you check our read for yourself.' },
          { title: 'Tile details, not just tiles', text: 'We check what tile roofs depend on, like bird stops, ridge mortar and valley metal, not only the tiles you can see from the ground.' },
          { title: 'Photos you can share', text: 'Clear photos make it easy to compare options or show the roof’s condition to family, a buyer or a seller.' },
          { title: 'A straight recommendation', text: 'If your roof only needs monitoring, that’s what we’ll tell you. When work is needed, you’ll know whether it’s a [tile roof repair](/tile-roofing/repairs/), a relay or a replacement.' },
        ],
      },
      faqs: [
        { q: 'Should I get a tile roof inspected before buying a home?', a: 'It’s a smart step. A tile roof can look sound from the street even when its underlayment is near the end, which is an expensive thing to discover after closing. A roofer’s inspection gives you photos and a clear picture of what the roof may need.' },
        { q: 'Can you tell how much life my underlayment has left?', a: 'Not to the year, and we won’t pretend otherwise. Most of it is hidden under the tile, so we judge it from the areas we can see, the roof’s history and signs like leaks or stains. If the evidence points to worn underlayment, a [tile lift & relay](/tile-roofing/lift-and-relay/) is usually the fix.' },
        { q: 'Is an inspection worth it after an earthquake or strong winds?', a: 'Yes, if the event was strong enough to notice. Shaking can crack ridge mortar and nudge tiles out of place, and Santa Ana gusts can lift tiles that were already loose. Those problems are hard to spot from the ground, and a [tile roof tune-up](/tile-roofing/tune-up/) can often fix them in one visit.' },
        { q: 'Do I have to hire you for the work after the Roof Check?', a: 'No. You pay for the visit, see the photos and decide what’s next, with no pressure either way. If you’d like us to do the work, you’ll get a written scope and price first.' },
      ],
      related: ['/tile-roofing/repairs/', '/tile-roofing/lift-and-relay/', '/tile-roofing/tune-up/'],
    },

    {
      slug: 'tune-up',
      keyword: 'tile roof tune-up',
      title: 'Tile Roof Tune-Up',
      navLabel: 'Tune-Ups',
      card: 'One focused visit to reset slipped tiles, replace a few cracked ones, reseal flashings and clear valleys before small issues turn into leaks.',
      metaTitle: 'Tile Roof Tune-Up in Los Angeles & OC',
      metaDescription: 'Tile roof tune-up in Los Angeles & Orange County: slipped tiles reset, cracked tiles replaced, flashings resealed, valleys cleared. Book a $199 Roof Check.',
      hero: {
        intro: 'Small problems on a tile roof stay small for a while, and then they don’t. A tile roof tune-up is one focused visit that resets, reseals, replaces and clears the little things before the next rainy season finds them.',
        highlights: ['Slipped and loose tiles reset', 'Vent and flashing seals renewed', 'Valleys and eaves cleared of debris'],
      },
      overview: {
        paragraphs: [
          'Plenty of tile roof leaks start small. A tile slips after a windy week, a crack opens in the ridge mortar, the sealant around a vent pipe dries out, or leaves and needles pile up in a valley until water backs up under the tiles. None of these is a big job on its own. Left alone through a wet winter, any of them can soak the underlayment and become a stain on your ceiling. A **tune-up** works through the whole list in a single visit.',
          'It’s different from a [tile roof repair](/tile-roofing/repairs/), which chases one specific problem, and from [ongoing tile roof care](/tile-roofing/roof-care/), which keeps watch over the years. Think of a tune-up as a one-time reset. It’s especially useful before the rainy season, after Santa Ana winds or an earthquake, or after painters, HVAC technicians or other trades have been on the roof. We photo-document what we fix, so you know what condition your roof is in when we leave.',
        ],
      },
      process: {
        subheading: 'How a tile roof tune-up works',
        steps: [
          { title: 'Roof Check first', text: 'We go over the roof carefully and photo-document the small stuff, from slipped tiles to dried-out sealant.' },
          { title: 'A clear tune-up scope', text: 'You get a written list of what the visit covers and its price before we start, so you know exactly what you’re getting.' },
          { title: 'Fix the small stuff', text: 'In one visit, we work through everything the scope lists.', bullets: ['Slipped tiles reset and secured', 'A few cracked tiles replaced', 'Loose ridge and hip tiles reset', 'Vent pipes and flashings resealed', 'Valleys and eaves cleared'] },
          { title: 'Photos before we leave', text: 'We show you what we found and what we fixed, and flag anything bigger, like worn underlayment, so you can plan around it.' },
        ],
      },
      why: {
        heading: 'Why Choose QRS for a Tile Roof Tune-Up?',
        intro: 'Tune-ups are small jobs, but on a tile roof, small jobs done carelessly create new problems.',
        points: [
          { title: 'Starts with a roofer’s eyes', text: 'A roofer-led [$199 Roof Check](#roof-check) sets the tune-up scope, so the visit covers what your roof actually needs.' },
          { title: 'A clear list, not an open tab', text: 'Your written scope says exactly what the tune-up covers and what it costs before any work begins.' },
          { title: 'Fixed while we’re up there', text: 'We don’t just note slipped tiles and dried sealant; the tune-up takes care of them during the same visit.' },
          { title: 'Every fix photographed', text: 'Before-and-after photos show each item we handled, so you know what was done without climbing up yourself.' },
        ],
      },
      faqs: [
        { q: 'When is the right time for a tile roof tune-up?', a: 'Before the rainy season is the classic choice, so valleys are clear and tiles are seated before the first big storm. It also makes sense after strong winds, a noticeable earthquake or other work on the roof, and before you list your home for sale.' },
        { q: 'Will a tune-up stop a leak I already have?', a: 'Sometimes, if the cause is a slipped tile, a clogged valley or a dried-out seal. Leaks from worn underlayment or a failed flashing need a proper repair instead, and the Roof Check tells you which you’re dealing with.' },
        { q: 'Do you replace cracked tiles during a tune-up?', a: 'A few, yes, using the closest available match. If we find widespread cracking, that points to a bigger issue, and we’ll walk you through repair or replacement options instead.' },
        { q: 'Can a tune-up make up for old underlayment?', a: 'No, and we won’t pretend it can. A tune-up keeps tiles in place and water moving off the roof, which protects what’s underneath, but it can’t renew underlayment that’s worn out. When that’s the real issue, a [tile lift & relay](/tile-roofing/lift-and-relay/) is the lasting fix.' },
      ],
      related: ['/tile-roofing/roof-care/', '/tile-roofing/repairs/', '/tile-roofing/inspection/'],
    },

    {
      slug: 'roof-care',
      keyword: 'tile roof care',
      title: 'Tile Roof Care',
      navLabel: 'Roof Care',
      card: 'Scheduled checks, clear valleys and a running photo record, so wear on your tile roof is caught early and planned for, not found in a storm.',
      metaTitle: 'Tile Roof Care & Maintenance in LA',
      metaDescription: 'Ongoing tile roof care in Los Angeles & Orange County: seasonal checks, clear valleys and photo records that catch wear early. Start with a $199 Roof Check.',
      hero: {
        intro: 'A tile roof ages quietly, one slipped tile and clogged valley at a time. Scheduled tile roof care catches that wear early and keeps a photo record, so you can plan big decisions instead of reacting to a leak.',
        highlights: ['Seasonal checks timed to the weather', 'Valleys, eaves and drains kept clear', 'Photo records, year over year'],
      },
      overview: {
        paragraphs: [
          'The tiles on your roof can go a long time without much attention. The parts around them can’t. Valleys fill with leaves and needles, ridge mortar cracks a little more with each season of heat, bird stops go missing, and a tile knocked loose by wind or another trade sits there until someone notices. **Regular care** means someone does notice, on a schedule, before a winter storm finds the weak spot. If your roof needs a catch-up first, a [tile roof tune-up](/tile-roofing/tune-up/) clears the backlog in one visit.',
          'Each care visit is a focused check with photos, compared against the last set, so slow changes like a shifting ridge line or a spreading crack stand out. When something needs fixing, you get a written scope and price before any work. Over time, that history also helps you see when the underlayment may be nearing the end, so you can plan a [tile lift & relay](/tile-roofing/lift-and-relay/) on your own timeline instead of after a leak.',
        ],
      },
      process: {
        subheading: 'How ongoing tile roof care works',
        steps: [
          { title: 'Baseline Roof Check', text: 'We start with a thorough Roof Check and a full set of photos, so every later visit has something to compare against.' },
          { title: 'A schedule that fits', text: 'We suggest a visit schedule based on your roof’s age, nearby trees and exposure, timed around the rainy season and windy stretches.' },
          { title: 'Seasonal care visits', text: 'Each visit covers the upkeep that keeps water moving off a tile roof.', bullets: ['Valleys and eaves cleared of debris', 'Gutters and drains kept flowing', 'Slipped or cracked tiles flagged', 'Ridge mortar and bird stops checked'] },
          { title: 'Updated photo record', text: 'You get fresh photos after each visit, and anything that needs attention is explained in plain English and quoted in writing before work starts.' },
        ],
      },
      why: {
        heading: 'Why Choose QRS for Tile Roof Care?',
        intro: 'Roof care works when someone keeps showing up, looks closely and tells you the truth each time.',
        points: [
          { title: 'Roofer-led from the first visit', text: 'Care starts with a roofer-led [$199 Roof Check](#roof-check), so the plan fits your actual roof rather than a generic checklist.' },
          { title: 'A record you can use', text: 'Years of photos make it easier to plan and budget, and if you sell, they show buyers how the roof was looked after.' },
          { title: 'No pressure to replace', text: 'Care visits are about keeping your roof working. When we recommend bigger work, it comes with photos, reasons and a written price, and the choice stays yours.' },
          { title: 'Local to LA and Orange County', text: 'Salt air corrodes flashings near the coast, inland heat bakes underlayment, and Santa Ana winds loosen tiles and fill valleys. We plan care around how those conditions play out across [Los Angeles and Orange County](/locations/).' },
        ],
      },
      faqs: [
        { q: 'How often should a tile roof be checked?', a: 'A visit before the rainy season is a good anchor, with an extra look after strong Santa Ana winds or a noticeable earthquake. Homes under big trees or near the coast, from Santa Monica to Newport Beach, may need checks more often.' },
        { q: 'Can I clean or pressure-wash my tile roof myself?', a: 'We’d steer you away from both. Tile cracks easily underfoot, and pressure-washing can wear down the surface of concrete tile and drive water under the tiles. Valleys and eaves get cleared on every care visit, so you don’t have to climb up there.' },
        { q: 'Is roof care worth it if my tile roof is fairly new?', a: 'Yes. A newer roof needs less work, but valleys still fill with debris, and wind and earthquakes don’t check a roof’s age first. Starting early also gives you a photo baseline from the beginning.' },
        { q: 'Does tile roof care include my gutters?', a: 'Keeping gutters and drains clear of debris is part of routine care, since clogged gutters can back water up at the eaves. If yours are damaged or undersized, our [rain gutter](/rain-gutters/) service can replace them.' },
      ],
      related: ['/tile-roofing/tune-up/', '/tile-roofing/inspection/', '/tile-roofing/lift-and-relay/'],
    },
  ],
};
