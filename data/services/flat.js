// Flat roofing section: the hub page (/residential-roofing/flat-roofing/) and its six service pages.
// Plain data only. Rich fields accept [link text](/path/) and **bold** (see the content brief).

export const FLAT_CONTENT = {
  hub: {
    keyword: 'flat roofing',
    metaTitle: 'Flat Roofing Services by Flat Roof Specialists', // owner, October 22 2026 (the H1 stays "Flat Roofing in Los Angeles & Orange County")
    metaDescription: 'Residential flat roofing: modified bitumen roofs for homes, ADUs, garages and patio covers, planned around drainage. Book a free roof evaluation.',
    // The hero's check points on this page (Hero `annotations`), in place of the home set
    heroNotes: ['Licensed flat roof contractor · CSLB #1061942', 'Free roof evaluation', 'Written price before any work', '10-year workmanship warranty (call for details)'],
    // A card on this hub reads differently from the same page's card elsewhere (menus and the service-first hubs keep `title` and `card`)
    cardOverrides: {
      replacement: { title: 'Flat Roof Replacement in Los Angeles, CA · *FlatGuard*', text: 'Flat roof replacement in Los Angeles, CA: a full tear-off down to the deck and a new modified bitumen or low-slope system, planned around how your roof drains.' },
    },
    projectMore: 'View this Los Angeles flat roof project',
    hero: {
      heading: 'Flat Roofing Services · *FlatGuard*',
      intro: 'Flat roofing from QRS covers new installs, replacements and repairs for modified bitumen and other low-slope roofs on homes, ADUs, garages and patio covers. Every drain, seam and flashing is detailed so water leaves the roof, and our *FlatGuard* Roof System covers low-slope replacements and new installs. Start with a free roof evaluation.',
      highlights: ['Modified bitumen and low-slope systems', 'Drains, scuppers and parapets detailed', 'Written scope and price before work starts'],
    },
    overview: {
      heading: 'Flat Roofs Need Their Own Kind of Detail',
      paragraphs: [
        'QRS is a flat roof specialist: our flat roofing covers new installs, replacements and repairs for low-slope roofs on homes, ADUs, garages and patio covers. Low-slope roofs are everywhere: on mid-century and modern homes, over garages, patio covers and room additions, on new backyard ADUs, and tucked behind the parapet walls of Spanish-style houses. Every one of them still has to drain. That takes a gentle, deliberate slope that carries rainwater to a drain, a scupper (an opening through the parapet) or a gutter instead of letting it sit. When that slope is missing or a drain is blocked, water ponds, the sun bakes the membrane, and seams and flashings start to give way.',
        'We install **modified bitumen and other low-slope systems**, chosen for your roof’s condition, how it drains and what sits on it, from HVAC equipment to skylights. Our advice comes from a roofer on your roof, not a salesperson at your kitchen table. The [free roof evaluation](#roof-check) photo-documents the membrane, seams, drains and flashings, explains the findings in plain English and ends with a clear next step: repair, monitor, maintain or replace. You see a written scope and price before any work begins, and finished installs carry our 10-year workmanship warranty (call for details).',
        'As Orange County flat roofers, we serve [Irvine](/service-areas/orange-county/irvine/), Costa Mesa, [Newport Beach](/service-areas/orange-county/newport-beach/), [Anaheim](/service-areas/orange-county/anaheim/), [Santa Ana](/service-areas/orange-county/santa-ana/), [Huntington Beach](/service-areas/orange-county/huntington-beach/) and the rest of [Orange County](/service-areas/orange-county/) with the same free roof evaluation, written price and 10-year workmanship warranty (call for details) as our Los Angeles homeowners.',
      ],
    },
    cards: {
      heading: 'Our Flat Roofing Services',
      intro: 'From one open seam to a full tear-off, each service starts with an honest look at what your flat roof actually needs.',
    },
    highlights: {
      heading: 'What a Well-Built Flat Roof Gets Right',
      points: [
        { title: 'Slope that moves water', text: 'Water should flow steadily toward the drains and scuppers, then down through downspouts or rain gutters. We look for low spots and ponding first, because standing water wears a roof out faster.' },
        { title: 'Laps that stay sealed', text: 'Flat roof leaks usually start at a joint, not out in the open field of the roof. Laps, the overlaps where one sheet meets the next, get extra care because that’s where water looks for a way in.' },
        { title: 'Flashing at every wall and curb', text: 'Parapet walls, HVAC curbs, vents and skylights all interrupt the membrane. Each one needs flashing detailed to direct water away, not just a bead of sealant.' },
      ],
    },
    faqs: [
      { q: 'How do I maintain a flat roof in Los Angeles?', a: 'Keep the drains, scuppers and gutters clear, especially before the rainy season and after Santa Ana winds. Look for water that is still standing a day or two after rain, and keep foot traffic and other trades off the roof unless needed. Have a roofer check the seams, flashings and parapet caps once a year; a [roof maintenance plan](/roof-maintenance-plans/) schedules those visits with a photo report each time.' },
      { q: 'Is a flat roof actually flat?', a: 'No. Unlike steep-slope roofs, which shed water quickly, a flat roof is really a low-slope roof that needs a gentle pitch toward its drains. On a well-built one that slope is often too gentle to notice, but it moves water off the roof. If water still sits in the same spots long after the rain stops, the slope or the drainage needs attention.' },
      { q: 'What is modified bitumen?', a: 'It’s a tough, asphalt-based roofing membrane with built-in reinforcement, typically installed in layers with overlapping, sealed laps. It handles routine foot traffic and strong sun well, one reason it’s so common on low-slope homes in Southern California. The right system for your roof still depends on its condition and drainage.' },
      { q: 'Do you work on the flat sections of Spanish-style homes?', a: 'Yes. Many Spanish and Mediterranean homes pair [tile roofing](/residential-roofing/tile-roofing/) with flat sections hidden behind parapet walls, drained by scuppers through the wall. We look at the flat areas, the parapet caps and the wall flashings, not just the tile you can see from the street.' },
      { q: 'Do you work on flat roofs for commercial buildings?', a: 'Yes. As a flat roof contractor in Los Angeles and Orange County, we also work on the low-slope roofs of offices, shops, warehouses and many other commercial buildings, planned around each building’s condition and drainage. Visit our [commercial roofing](/commercial-roofing/) section for details.' },
      { q: 'Do you work on flat roofs in my part of LA or Orange County?', a: 'We work across Los Angeles County and Orange County, in cities such as Glendale, Torrance, Anaheim, Santa Ana and Huntington Beach as well as Los Angeles itself. Our [service area](/service-areas/) page shows whether your city is on the list.' },
      { q: 'How long does a flat roof last?', a: 'There’s no single answer. The roofing system, how well the roof drains, how much sun it takes and how often it’s maintained all play a part, and water that sits on a flat roof after rain shortens its life. Rather than guessing from the roof’s age, a [free roof evaluation](#roof-check) looks at its actual condition.' },
    ],
  },

  services: [
    {
      slug: 'replacement',
      keyword: 'flat roof replacement',
      title: 'Flat Roof Replacement · *FlatGuard*',
      navLabel: 'Roof Replacement',
      card: 'A full tear-off down to the deck and a new modified bitumen or low-slope system, planned around how your roof drains.',
      metaTitle: 'Flat Roof Replacement by Quality Roofers',
      metaDescription: 'Flat roof replacement: full tear-off to the deck and a new low-slope system planned to drain. Start with a free roof evaluation.',
      image: '/images/flat-roof-replacement-completed-white-membrane.webp',
      imageAlt: 'Aerial view of a completed white flat roof membrane with tile coping',
      hero: {
        intro: 'A flat roof replacement removes the old roofing down to the deck, addresses any damaged decking and installs a new modified bitumen or other low-slope system planned around how your roof drains. QRS replaces worn-out flat roofs with our *FlatGuard* low-slope system, starting with a free roof evaluation.',
        highlights: ['Full tear-off down to the deck', 'Drainage planned into the new roof', '10-Year workmanship warranty (call for details)'],
      },
      // Told the home page's way (owner, October 16 2026; ServiceStory): one statement, one paragraph, then the principles, each fact said once
      story: {
        label: 'Flat roof replacement',
        lead: 'Flat roofs rarely fail all at once. They wear __out__.',
        text: 'The surface dries and cracks under the sun, blisters rise where moisture is trapped, laps open and patches pile up around the same drains and walls. Once the problems are spread across the roof, or water has reached the deck, more patching stops making sense.',
        heading: 'How we replace a flat roof',
        image: '/images/flat-roof-replacement-tear-off-drone-view.webp',
        imageAlt: 'Aerial view of a flat roof tear-off in progress, down to the plywood deck with new curbs framed in',
        principles: [
          { title: 'Tear it off. Don’t roof over it.', text: 'The old layers come off down to the deck, so anything holding moisture goes with them, and damaged decking is found, photographed and explained instead of buried under new layers.', bullets: ['Membrane wear, blisters and splits', 'Ponding and drainage patterns', 'Parapets, curbs and penetrations'] },
          { title: 'Plan the roof around the water.', text: 'We study the slope, the low spots where water has been ponding and whether the drains, scuppers and downspouts can keep up with a winter storm. Where it helps, the scope includes crickets, small raised sections that steer water around curbs toward the outlets.' },
          { title: 'Every lap sealed, every curb flashed.', text: 'The modified bitumen or other low-slope system named in your scope goes on with every lap sealed and every parapet, curb, vent and skylight flashed.', bullets: ['Laps and seams sealed', 'Parapet and wall flashings', 'HVAC curbs, vents and skylights'] },
          { title: 'In writing first, in photos after.', text: 'You know the system, the drainage work and the price before the tear-off begins. When the roof is done, we walk through the photos from tear-off to finish and explain our 10-year workmanship warranty (call for details). Not sure it’s time? A [flat roof inspection](/roof-inspection/#flat-roofs) shows whether a [flat roof repair](/residential-roofing/flat-roofing/repair/) would still do.' },
        ],
      },
      faqs: [
        { q: 'How much does a flat roof replacement cost?', a: 'It depends on the roof’s size, how many old layers come off, the condition of the deck and the details: drains, scuppers, parapets and rooftop equipment that need flashing. Our Instant Quote gives a quick estimated range, and your written scope and price come after a [free roof evaluation](#roof-check), before work begins.' },
        { q: 'Do you pull the permits?', a: 'Yes. When your roofing project needs a building permit, we pull it for you.' },
        { q: 'What are the signs a flat roof is past repairing?', a: 'Common signs include leaks in more than one spot, blisters and splits across much of the surface, soft areas in the deck and patches that keep failing. A [free roof evaluation](#roof-check) documents what we find with photos, so you can see the reasons behind our recommendation.' },
        { q: 'Can you put a new flat roof over the old one?', a: 'A full tear-off is the standard for a lasting result: taking the old layers off lets us check the deck, get rid of trapped moisture and give the new system a sound surface to start from, rather than hiding problems underneath it. On some commercial buildings, repairing an existing system that’s still sound can be the right call instead — your roof evaluation will tell you which situation you’re in.' },
        { q: 'Will a new roof stop water from ponding?', a: 'Replacement is the natural time to improve drainage, whether that means adding crickets, building up low spots or changing how water reaches the drains and scuppers. How much can change depends on the roof’s structure, and your written scope spells out the drainage work before anything starts.' },
        { q: 'Should the gutters and downspouts be replaced at the same time?', a: 'Not always, but we check them as part of the scope, because a new roof can only drain as fast as its outlets.' },
        { q: 'Can a new flat roof have a lighter, reflective surface?', a: 'Usually, yes. Light-colored, reflective surfaces bounce back more of the sun’s heat than dark ones, which is worth considering on a roof that sits in full sun most of the year. We’ll go over the surface options that fit your system.' },
      ],
      related: ['/residential-roofing/flat-roofing/repair/', '/roof-inspection/#flat-roofs', '/residential-roofing/flat-roofing/installation/'],
    },

    {
      slug: 'repair',
      keyword: 'flat roof repair',
      title: 'Flat Roof Repair',
      h1: 'Flat Roof Repair in Los Angeles & Orange County',
      navLabel: 'Roof Repairs',
      card: 'Leaks, blisters, open seams and failed flashings traced to the source, repaired carefully and documented with photos.',
      metaTitle: 'Flat Roof Repair & Flat Roof Leak Repair Services', // "flat roof leak repair" added (owner, October 22 2026)
      // Search Console wording (owner, October 23 2026): "flat roof repair los angeles", "flat roof repair service(s)", "flat roof repairs", "flat roofing
      // experts los angeles", "roof repair specialist los angeles", "flat roof repair contractor". Polyurethane (foam) roofs, Woodland Beach and Delano
      // are not used (not a confirmed system / outside the area).
      metaDescription: 'Flat roof repair and flat roof leak repair: we trace leaks to the source and fix seams, blisters and flashings, with photos. Book a free roof evaluation.',
      image: '/images/flat-roof-replacement-tear-off-drone-view.webp',
      imageAlt: 'Aerial view of a flat roof with roofing work in progress',
      hero: {
        intro: 'QRS handles flat roof repair services, tracing each leak back to where water gets in and fixing the open seam, blister, split or failed flashing behind it. A ceiling stain can sit far from the actual leak, so we check the whole area and show you photos of the problem and the fix.',
        highlights: ['Leaks traced to where water enters', 'Seams, blisters and flashings repaired', 'Photos of the damage and the fix'],
      },
      // Told the home page's way (owner, October 16 2026; ServiceStory): one statement, one paragraph, then the principles, each fact said once
      story: {
        label: 'Flat roof repair',
        lead: 'Water on a flat roof moves slowly and finds every __weakness__.',
        text: 'It can travel under the membrane before it drips, so the stain on your ceiling may sit far from the opening. That’s why we check the whole area around a leak, not just the spot above the stain. As flat roofing experts in Los Angeles, we handle flat roof repairs on homes, garages, patio covers and additions across Los Angeles County and Orange County, from one open seam to a full flat roof leak repair.',
        heading: 'How we repair a flat roof',
        principles: [
          { title: 'Check the whole area. Find the opening.', text: 'A roofer works around and upslope of the leak until the cause is found, and photographs it before anything is fixed.', bullets: ['Seams, laps and blisters', 'Parapet caps and wall flashings', 'Drains, scuppers and equipment curbs', 'Vents and skylights'] },
          { title: 'Repair with what your roof is made of.', text: 'Damaged membrane is cut out, open laps are resealed and failed flashings are rebuilt, with materials that work with your existing roof system.' },
          { title: 'Open drains. A repair that stays dry.', text: 'We make sure nearby drains and scuppers are clear, because a repair lasts longer when water isn’t standing on it.' },
          { title: 'Patch or replace, said plainly.', text: 'A targeted repair makes sense when the rest of the roof is in reasonable shape. If the membrane is worn out across the surface, we’ll tell you that more patching only delays a [flat roof replacement](/residential-roofing/flat-roofing/replacement/). Either way, the scope and price are in writing before we start, and you get photos of the finished repair.' },
        ],
      },
      faqs: [
        { q: 'Why does my flat roof leak in big storms but not light rain?', a: 'Light rain may drain away before it finds a weak spot, but a heavy storm deepens the water on the roof and pushes it into open laps, cracked flashings and overflowing scuppers. Water that’s still ponding after the storm is a clue that drainage is part of the problem. A [flat roof inspection](/roof-inspection/#flat-roofs) shows you where the water is getting in.' },
        { q: 'Can you fix blisters on a flat roof?', a: 'Yes. Small blisters that are still intact are often left alone and watched, while cracked or growing blisters are cut out and patched. We’ll show you which ones need attention and explain why.' },
        { q: 'Are you a flat roof repair contractor in Los Angeles?', a: 'Yes. QRS is a licensed roofing contractor, and our flat roof repair service covers Los Angeles, the rest of Los Angeles County and Orange County. A roofer, not a salesperson, finds the leak, photographs it and gives you a written scope and price before any flat roof repairs start.' },
        { q: 'The leak is near a wall. Is it the roof or the wall?', a: 'It can be either. On roofs with parapets, water often gets in through cracked parapet caps, gaps in the stucco or failed wall flashings rather than the roof surface itself. We check the parapet from cap to base and tell you exactly where the water is entering.' },
        { q: 'Do you repair flat roofs on garages, patio covers and additions?', a: 'Yes. These smaller low-slope roofs leak for the same reasons as the main roof, usually at the seams, the drainage or the joint where they meet the house. They get the same photo-documented approach as any other repair.' },
        { q: 'What if you find more than one problem?', a: 'We photograph each one and list it in your written scope, so you can decide what to fix now. If the roof is sound overall but has a handful of small issues, a [flat roof tune-up](/roof-maintenance-plans/#tune-up) may cover them in one visit.' },
      ],
      related: ['/roof-maintenance-plans/#tune-up', '/residential-roofing/flat-roofing/replacement/', '/roof-inspection/#flat-roofs'],
    },

    {
      slug: 'installation',
      keyword: 'flat roof installation',
      title: 'New Flat Roof Installation · *FlatGuard*',
      navLabel: 'New Installations',
      card: 'New low-slope roofs for ADUs, additions, garages and patio covers, with slope, drains and tie-ins planned from the start.',
      metaTitle: 'Flat Roof Installation for ADUs, Additions & Garages',
      metaDescription: 'New flat roof installation for ADUs, additions, garages and patio covers, planned around slope and drains. Request an estimate.',
      image: '/images/flat-roof-torch-down-drone-view-services.webp',
      imageAlt: 'Aerial view of a completed flat roof system',
      hero: {
        intro: 'A new flat roof installation puts a modified bitumen or other low-slope roof on an ADU, addition, garage or patio cover, with the slope, drains and tie-ins planned before the first layer goes down. QRS builds new flat roofs as part of the *FlatGuard* Roof System. Request an estimate to get started.',
        highlights: ['ADUs, additions, garages and patio covers', 'Slope and drain locations planned early', 'Clean tie-ins to your existing roof'],
      },
      // Told the home page's way (owner, October 16 2026; ServiceStory): one statement, one paragraph, then the principles, each fact said once
      story: {
        label: 'Flat roof installation',
        lead: 'A new flat roof is the one chance to get the __slope__ right.',
        text: 'Backyard ADUs, room additions, new garages, solid patio covers and contemporary homes all grow with low-slope roofs. With no old roof to work around, the slope, the drains and the tie-ins can be planned properly, and they’re far easier to decide on paper than to correct later.',
        heading: 'How we install a new flat roof',
        principles: [
          { title: 'See the plans early.', text: 'We review your plans or visit the site, because the slope is usually built into the framing. You’ll know where water will go before the roof exists, so you’re not dealing with ponding after move-in.', bullets: ['Slope and drainage direction', 'Drain and scupper locations', 'Walls, parapets and tie-ins'] },
          { title: 'Matched to what the roof carries.', text: 'Once the deck is ready, the edges and the flashings at drains, scuppers, walls and curbs are built, and the modified bitumen or other low-slope system goes on, matched to how the roof drains and whether it carries an HVAC unit, a skylight or nothing at all.' },
          { title: 'A tie-in that sends water away.', text: 'Where the new roof meets an existing tile or shingle roof, the transition is flashed for how water actually flows across it, so it runs away from the joint, not into it.', bullets: ['Sealed laps across the whole roof', 'Tie-ins to tile or shingle roofs', 'Vents, skylights and HVAC curbs'] },
          { title: 'A record of what’s hidden.', text: 'The scope names the system, flashings and drainage details with the price before work starts, and we photograph the base layers, flashings and tie-ins as they go on. Already have a worn flat roof? [Flat roof replacement](/residential-roofing/flat-roofing/replacement/) is the service you’re looking for.' },
        ],
      },
      faqs: [
        { q: 'Do you pull the permits?', a: 'Yes. When your roofing project needs a building permit, we pull it for you.' },
        { q: 'When should I bring a roofer into my ADU or addition project?', a: 'Ideally while the plans are still being finalized. That’s when slope, drain locations and roof-to-wall details are easy to adjust. If framing is already underway, we can still look at it before any roofing goes on.' },
        { q: 'Can a new flat roof tie into my existing tile or shingle roof?', a: 'Yes. The transition needs careful flashing so water coming off the pitched roof lands on the flat roof without getting under either one. We plan that detail in your written scope, whether the main house has a [tile roof](/residential-roofing/tile-roofing/) or a [shingle roof](/residential-roofing/shingle-roofing/).' },
        { q: 'Do you install flat roofs on patio covers?', a: 'Yes, on solid patio covers framed and sheathed to take a roof. We check the slope and how the cover meets the house, because the joint at the wall is a common leak point on patio roofs.' },
        { q: 'Can you coordinate with my contractor?', a: 'Yes. We partner with contractors and can coordinate directly with yours on scheduling and roofing details. Learn more about our [contractor partnerships](/contractors/).' },
        { q: 'How is the price for a new flat roof worked out?', a: 'It depends on the roof’s size, the system, the drainage details and how the roof ties into the rest of the house. Each of those items is spelled out in your written scope, with the price, before work on the roof begins. To get the process moving, [request an estimate](#roof-check) and tell us about your project.' },
      ],
      related: ['/residential-roofing/flat-roofing/replacement/', '/roof-maintenance-plans/'],
    },

  ],
};
