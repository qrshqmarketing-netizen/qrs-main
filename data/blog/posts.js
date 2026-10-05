// QRS blog posts, newest first. Each post is a page at /blog/<slug>/ (components/templates/BlogPost.jsx).
// noindex: true keeps a post out of search results, the sitemap and the AI files (the blog index still shows it).
//
// Post shape:
//   slug, title (the H1), keyword (in the meta title, meta description, H1 and first 100 words), metaTitle,
//   metaDescription, datePublished, dateModified, author, excerpt (blog index card), image + imageAlt (the thumbnail,
//   in public/images/blog/), heroImage (optional: the same photo without its title text, used as the blog index's hero
//   background while the post is the newest), intro (paragraphs above the table of contents), sections (each one in the table of
//   contents), faqs, closing (the last section, not in the table of contents) and related (service pages to suggest).
//   A section is { heading, blocks }, and each block is one of:
//     'a paragraph'               { h3: 'Subheading' }          { note: 'Callout paragraph' }
//     { list: ['…', '…'] }        { steps: ['…', '…'] }         { checklist: ['…', '…'] }
//     { table: { head: ['…', '…'], rows: [['…', '…'], …] } }
//   Text accepts [link text](/path/) and **bold**; outside links open in a new tab.

const TILE = '/residential-roofing/tile-roofing/';

export const BLOG_POSTS = [
  {
    slug: 'roof-leak-source',
    title: 'How to Find a Roof Leak: Signs, Causes and What to Do Next',
    keyword: 'roof leak',
    metaTitle: 'How to Find a Roof Leak: Signs, Causes and Fixes',
    metaDescription:
      'A roof leak rarely drips where the water gets in. Learn the signs, the usual causes on shingle, tile and flat roofs, and what to do next.',
    datePublished: '2026-10-05',
    dateModified: '2026-10-05',
    excerpt:
      'A ceiling stain rarely sits under the spot where water gets in. Here is how to read the signs of a roof leak, the usual causes on shingle, tile and flat roofs, and what to do while you wait for a repair.',
    intro: [
      'A roof leak is rarely where it seems to be. Water slips past a lifted shingle, a cracked tile or an open seam, runs along the underlayment or a rafter, and shows up somewhere else entirely.',
      'That is why a stain on the ceiling is a clue, not an address. Finding the real source takes a methodical look at the roof, starting above the stain and working across the details where leaks usually begin.',
      'This guide explains the signs of a roof leak, the most common causes on each roof type, what you can safely check yourself and how a roofer finds the source.',
    ],
    sections: [
      {
        heading: 'Why a Roof Leak Rarely Shows Up Where It Starts',
        blocks: [
          'Roofs are built in layers, and water that gets through the top layer does not drop straight down. It follows the slope of the roof, the underlayment, the roof deck and the framing until it finds a place to drip.',
          'A leak can enter in one spot and appear on the ceiling several feet away. A patch placed directly above the stain often fails for exactly this reason.',
          { note: '**The rule of thumb:** Water runs downhill before it drips, so the source is usually upslope of the stain, at a flashing, vent, valley or roof edge.' },
        ],
      },
      {
        heading: 'Signs of a Roof Leak',
        blocks: [
          'Some signs show up inside the house and some on the roof.',
          {
            list: [
              '**Brown or yellow stains** on ceilings or walls, often with a ring around them.',
              '**Bubbling or peeling paint** near the ceiling.',
              '**Drips or damp spots** during or after rain.',
              '**A musty smell or damp insulation** in the attic.',
              '**Daylight in the attic** where the roof boards meet.',
              '**Missing, lifted or cracked roofing** that you can see from the ground.',
              '**Stained or damp areas around skylights, chimneys and vents.**',
            ],
          },
        ],
      },
      {
        heading: 'The Most Common Causes of a Roof Leak',
        blocks: [
          'Leaks start at weak points far more often than in the middle of a roof. The usual suspects depend on the roof type.',
          { h3: 'Shingle roofs' },
          'Pipe boots and vent collars that crack in the sun, flashing that has pulled loose, lifted or missing shingles, exposed nail heads and valleys clogged with debris. See our guide to [shingle roof repair](/residential-roofing/shingle-roofing/repair/).',
          { h3: 'Tile roofs' },
          'Cracked or slipped tiles, flashing at walls and chimneys and, often, worn underlayment beneath tiles that still look fine. Our article on [tile roof underlayment](/blog/tile-roof-underlayment/) explains why. See also [tile roof repair](/residential-roofing/tile-roofing/repair/).',
          { h3: 'Flat roofs' },
          'Open seams, blisters, splits in the surface, failed flashing at walls and equipment, and drains that hold water instead of clearing it. See [flat roof repair](/residential-roofing/flat-roofing/repair/).',
          { h3: 'Skylights and chimneys' },
          'These are openings cut through the roof, so the flashing and sealing around them has to work perfectly. They are among the most common places for a leak on any roof type.',
        ],
      },
      {
        heading: 'What You Can Check Safely',
        blocks: [
          'You do not need to go on the roof to learn useful things. Stay on the ground and inside the house.',
          {
            steps: [
              'Note when it leaks. A leak that appears only in wind-driven rain points to flashing or vents. One that shows up after long rain can point to worn underlayment.',
              'Look at the roof from the ground, with binoculars if you have them, for missing, lifted or cracked pieces.',
              'If the attic is safe to enter, look at the underside of the roof deck near the stain with a flashlight for dark stains, damp insulation or daylight. Work upslope from the stain.',
              'Photograph everything with the date, including the ceiling stain.',
              'Write down where and when you see water, so a roofer can use it.',
            ],
          },
          { note: '**Stay off the roof.** Wet roofs are slippery, and tile breaks underfoot. A fall is a far bigger problem than a leak.' },
        ],
      },
      {
        heading: 'What to Do While You Wait for a Repair',
        blocks: [
          'Move belongings away from the leak, catch the water in a bucket and keep clear of water near light fixtures and outlets.',
          'A roofer can put temporary protection such as a tarp in place to limit the damage. See our guide to [temporary roof repair options](/blog/temporary-roof-repair-options/), or our [emergency roof repair](/roof-repair/emergency/) page if water is coming in now.',
        ],
      },
      {
        heading: 'How a Roofer Finds the Source of a Roof Leak',
        blocks: [
          'A roofer starts upslope of the stain and works across the details where leaks usually begin: flashings, valleys, vents, penetrations and roof edges.',
          'At Quality Roofing Specialists, our [roof repair](/roof-repair/) service finds where water is really getting in, shows you photos of the problem and the finished repair, and gives you a written scope and price before any work.',
          'Not every leak means you need a new roof. When the roof is sound overall and the problem is local, a targeted repair is the sensible fix. When wear is spread across the roof, or the same spots keep failing, we will say so and show you the photos. See our guide to [roof restoration vs. replacement](/blog/roof-restoration-vs-replacement/).',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can a roof leak with no visible damage?',
        a: 'Yes. A worn flashing, a cracked pipe boot or failing underlayment can let water in without any obvious damage on the surface. A roofer checks the details up close and photographs what they find.',
      },
      {
        q: 'Why does my roof only leak in heavy rain?',
        a: 'Heavy or wind-driven rain pushes water into gaps that light rain does not reach, such as flashing, vents and the edges of the roof. That pattern is a clue a roofer can use.',
      },
      {
        q: 'Can I fix a roof leak myself?',
        a: 'A small gap can sometimes be closed with sealant, but finding the real source is hard, and working on a sloped or wet roof is dangerous. A patch in the wrong place can hide the problem without solving it.',
      },
      {
        q: 'Will I know the price before the repair starts?',
        a: 'Yes. We give you a written scope and price before any work begins, with photos of the problem.',
      },
      {
        q: 'How do I know whether I need a repair or a new roof?',
        a: 'It depends on how widespread the wear is. A free roof evaluation gives you photos and a plain-English answer, and a [free roof evaluation](#roof-check) is the best place to start.',
      },
    ],
    closing: {
      heading: 'Find the Leak Before It Finds Your Ceiling',
      blocks: [
        'A roof leak is easiest to fix when it is traced to its real source early.',
        'Quality Roofing Specialists provides [roof repair](/roof-repair/), [emergency roof repair](/roof-repair/emergency/) and [roof inspections](/roof-inspection/) for homes across Los Angeles and Orange County, with photos of what we find.',
        'If you have a leak or a stain you cannot explain, schedule a [free roof evaluation](#roof-check) and a roofer will trace it and explain your next step.',
        '**[Contact Quality Roofing Specialists](/contact-us/) to have your leak traced and repaired.**',
      ],
    },
    related: ['/roof-repair/', '/roof-repair/emergency/', '/roof-inspection/'],
  },
  {
    slug: 'roof-maintenance-checklist',
    title: 'Roof Maintenance Checklist for the Southern California Rainy Season',
    keyword: 'roof maintenance checklist',
    metaTitle: 'Roof Maintenance Checklist Before the Rainy Season',
    metaDescription:
      'A roof maintenance checklist for Southern California homeowners: what to check before the rains, what to leave to a roofer and how often to inspect.',
    datePublished: '2026-10-05',
    dateModified: '2026-10-05',
    excerpt:
      'After a long dry summer, the first heavy rain tests every weak spot on your roof. Use this roof maintenance checklist to check what you safely can, and to know what to leave to a roofer.',
    intro: [
      'Southern California roofs spend months in the sun, then meet heavy rain in a few storms. A roof maintenance checklist done before the rainy season is the cheapest way to find small problems before they become leaks.',
      'Most of the checklist can be done from the ground and from inside the house. A few items belong to a roofer, because they mean working on a sloped roof.',
      'This guide gives you the checklist, how it differs for shingle, tile and flat roofs, how often to inspect and where a professional visit fits in.',
    ],
    sections: [
      {
        heading: 'Why Roof Maintenance Matters Before the Rains',
        blocks: [
          'A dry summer leaves debris in valleys and gutters, and months of sun leave sealant and flashing tired and brittle. When heavy rain finally arrives, water finds every weakness at once.',
          'Small things are easy to fix in the fall: a few lifted shingles, a cracked pipe boot, a clogged valley. The same things can mean a stained ceiling and wet insulation after the first storm.',
        ],
      },
      {
        heading: 'The Roof Maintenance Checklist',
        blocks: [
          'Work through these from the ground and inside the house. Stay off the roof.',
          {
            checklist: [
              '**Look at the whole roof from the ground.** Check for missing, lifted or cracked shingles, and for cracked, slipped or missing tiles.',
              '**Check the gutters and downspouts.** Clear leaves and debris so water leaves the roof freely, and look for sagging or loose sections.',
              '**Look for debris in the valleys.** Leaves and branches can trap water against the roof.',
              '**Trim overhanging branches.** Limbs that touch the roof can scrape it, drop debris and break in a storm.',
              '**Check vents, chimneys and skylights.** Look for cracked sealant, loose flashing or gaps around each one.',
              '**On a flat roof, check the drains and scuppers.** Make sure they are clear and that water is not pooling after it stops raining.',
              '**Look in the attic.** With a flashlight, check for stains, damp insulation, a musty smell or daylight.',
              '**Check the ceilings.** Note any new stains or bubbling paint.',
              '**Take photos.** Photographs of the roof today give you something to compare with later.',
            ],
          },
          { note: '**Stay safe:** Do not climb onto the roof to do this. Use binoculars from the ground, and leave anything that needs roof access to a roofer.' },
        ],
      },
      {
        heading: 'What to Look for on Each Roof Type',
        blocks: [
          {
            table: {
              head: ['Roof type', 'Look for', 'Leave to a roofer'],
              rows: [
                ['Shingle', 'Lifted, creased or missing shingles, cracked pipe boots, granules in the gutters', 'Replacing shingles, resealing and re-flashing vents'],
                ['Tile', 'Cracked, slipped or missing tiles, loose ridge tiles', 'Resetting tiles, repairing flashing, checking the underlayment'],
                ['Flat', 'Ponding water, blisters, open seams, blocked drains', 'Repairing seams and flashing, assessing the surface'],
              ],
            },
          },
          'For more on tile roofs, see our guide to [tile roof underlayment](/blog/tile-roof-underlayment/).',
        ],
      },
      {
        heading: 'What to Leave to a Roofer',
        blocks: [
          'Walking a sloped roof is risky, and tile breaks underfoot. These jobs are best done by a roofer:',
          {
            list: [
              'Replacing lifted or missing shingles and broken tiles.',
              'Repairing or replacing flashing around vents, chimneys and skylights.',
              'Resealing small gaps and cleaning clogged valleys.',
              'Checking the underlayment and the condition of the roof deck.',
              'Anything you spot in the attic that suggests a leak.',
            ],
          },
          'A one-time tune-up is built for exactly this: a focused visit that fixes the small things, like loose pieces, tired sealant and cluttered valleys, before they turn into leaks.',
        ],
      },
      {
        heading: 'How Often Should You Inspect Your Roof?',
        blocks: [
          'Check your roof at least once a year, before the rainy season, and after any major storm or windstorm.',
          'If you would rather not manage it yourself, our [roof maintenance plans](/roof-maintenance-plans/) schedule one or two roofer visits a year, timed to the rains. Each visit includes a full inspection, a written photo report, debris clearing and sealant top-offs.',
          'You can also start with a [roof inspection](/roof-inspection/): a free, roofer-led roof evaluation that shows you the condition of the roof and gives you one clear next step.',
        ],
      },
    ],
    faqs: [
      {
        q: 'When should I do my roof maintenance checklist?',
        a: 'Before the rainy season starts, which in Southern California is generally in the late fall, and again after any big storm or windstorm.',
      },
      {
        q: 'Can I check my roof myself?',
        a: 'You can check a lot from the ground and from inside the house. Stay off the roof itself, because sloped roofs are dangerous and tile cracks underfoot.',
      },
      {
        q: 'What if I find damage during my check?',
        a: 'Take photos and have a roofer look at it. Small problems are usually inexpensive to fix, and they get worse in the rain. See our [roof repair](/roof-repair/) page.',
      },
      {
        q: 'Is roof maintenance worth it?',
        a: 'Catching small problems early is generally cheaper than repairing the damage they cause later. A photo report from each visit also gives you a record of how the roof is aging.',
      },
      {
        q: 'What is the difference between a roof inspection and a maintenance plan?',
        a: 'An inspection looks at the roof once and tells you its condition. A [maintenance plan](/roof-maintenance-plans/) schedules regular visits with inspections, photo reports, debris clearing and sealant top-offs.',
      },
    ],
    closing: {
      heading: 'Check Your Roof Before the First Big Storm',
      blocks: [
        'A short roof maintenance checklist done now can save you a leak later.',
        'Quality Roofing Specialists provides [roof maintenance plans](/roof-maintenance-plans/), [roof repair](/roof-repair/) and [roof inspections](/roof-inspection/) for homes across Los Angeles and Orange County.',
        'If you would like a roofer to look at your roof before the rains, schedule a [free roof evaluation](#roof-check) and get photos and a plain-English next step.',
        '**[Contact Quality Roofing Specialists](/contact-us/) to get your roof ready for the rainy season.**',
      ],
    },
    related: ['/roof-maintenance-plans/', '/roof-inspection/', '/roof-repair/'],
  },
  {
    slug: 'roof-restoration-vs-replacement',
    title: 'Roof Restoration vs. Replacement: Which Does Your Roof Need?',
    keyword: 'roof restoration',
    metaTitle: 'Roof Restoration vs. Replacement: Which Do You Need?',
    metaDescription:
      'Roof restoration can extend a roof’s life if the roof is sound. See what restoration means, when it works and when replacement is the better call.',
    datePublished: '2026-10-05',
    dateModified: '2026-10-05',
    excerpt:
      'Roof restoration can extend the life of a sound roof, but it will not save one that is worn out. Here is what restoration means, when it works and how to decide between restoring and replacing.',
    intro: [
      'Roof restoration sounds like an easy answer: renew the roof you have instead of paying for a new one. Sometimes it is exactly right, and sometimes it only delays a bigger bill.',
      'The difference comes down to the condition of the roof, and the way to know is a careful inspection with photos, not a sales pitch.',
      'This guide explains what roof restoration means, when it makes sense, when replacement is the better call and what to ask any contractor before you decide.',
    ],
    sections: [
      {
        heading: 'What Roof Restoration Means',
        blocks: [
          'Roof restoration generally means repairing and renewing an existing roof instead of tearing it off. The exact work depends on the roof.',
          'It can include repairing damaged pieces, resealing flashings, clearing debris, resetting tiles over new underlayment and, on some low-slope roofs, applying a coating over a sound surface.',
          'The word is used loosely, so ask any contractor to spell out exactly what they would do to your roof, in writing.',
        ],
      },
      {
        heading: 'When Roof Restoration Makes Sense',
        blocks: [
          'Restoration works when the roof is fundamentally sound and the wear is limited. Good candidates share these traits:',
          {
            list: [
              'The roof deck is dry and solid, with no soft spots.',
              'Problems are local, such as a few failed flashings, some broken tiles or a single worn area.',
              'There are not leaks in many places.',
              'The roofing material still has useful life left in it.',
              'Repairs are not already chasing new leaks every season.',
            ],
          },
          'On a tile roof, restoration often means a [tile lift & relay](/residential-roofing/tile-roofing/lift-and-relay/): the tiles come up, the worn underlayment is replaced and the same tiles go back, so the roof keeps its look. Our SecondLife Tile Reset also renews worn battens and flashings and replaces only cracked or broken tiles.',
        ],
      },
      {
        heading: 'When Replacement Is the Better Call',
        blocks: [
          'Restoration cannot fix a roof that has failed. Replacement is usually the better choice when:',
          {
            list: [
              'Wear is spread across most of the roof, not just one area.',
              'The same spots keep leaking after repairs.',
              'The deck is soft, damp or damaged in several places.',
              'Insulation under the roof is wet.',
              'The roof is at the end of its life, with brittle or curling material.',
            ],
          },
          'Putting money into restoring a roof like this only postpones the replacement. A full tear-off lets a roofer see and fix the deck, and install a complete new system. See our [roof replacement](/roof-replacement/) page.',
        ],
      },
      {
        heading: 'Repair, Restoration and Replacement Compared',
        blocks: [
          {
            table: {
              head: ['Option', 'Best when', 'What it involves'],
              rows: [
                ['Repair', 'Damage is local and the roof is otherwise sound', 'Fixing the specific failed area, such as a flashing, pieces or a seam'],
                ['Tile lift & relay', 'A tile roof leaks but the tiles are good', 'Lifting the tiles, replacing the underlayment and flashing, and resetting the tiles'],
                ['Maintenance', 'The roof is in good shape and you want to keep it that way', 'Regular inspections, debris clearing and sealant top-offs'],
                ['Replacement', 'The roof is worn out or failing in many places', 'A full tear-off and a new roof system'],
              ],
            },
          },
        ],
      },
      {
        heading: 'How to Decide',
        blocks: [
          'Start with the facts. A roofer-led inspection with photos shows how widespread the wear is, which is the question that matters most.',
          {
            steps: [
              'Get an inspection with photos. Ask to see what the roofer sees. A [free roof evaluation](#roof-check) gives you photos and a plain-English report.',
              'Ask for a written scope and price for each realistic option, so you can compare them side by side.',
              'Weigh how long you plan to stay in the home against how much life each option adds.',
              'Ask what the warranty covers for each option, and who stands behind it.',
            ],
          },
          'At QRS, our installs are backed by a 10-year workmanship warranty, and repairs carry the manufacturer’s warranty on the materials used, which depends on the product. See also our [roof repair](/roof-repair/) services.',
        ],
      },
      {
        heading: 'Questions to Ask Any Roofing Contractor',
        blocks: [
          {
            checklist: [
              '**Are you licensed?** California contractors have a license number you can check with the state. Ours is shown in our footer.',
              '**What exactly will you do?** Ask for the scope in writing, including what is repaired and what is replaced.',
              '**What does it cost, in writing?** A price before any work begins.',
              '**Who pulls the permits?** We pull the building permits.',
              '**What warranty comes with the work?** And what does it cover?',
              '**Can I see photos?** Of the problem and of the finished work.',
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Is roof restoration cheaper than replacement?',
        a: 'It often costs less up front, but only when the roof is sound enough to restore. If the roof is worn out, restoration can cost you twice, once for the restoration and again for the replacement that follows.',
      },
      {
        q: 'Can any roof be restored?',
        a: 'No. A roof with a soft or damaged deck, widespread wear or leaks in many places is usually past restoring. An inspection with photos shows which case you are in.',
      },
      {
        q: 'How long does a restored roof last?',
        a: 'It depends on the roof, the materials, the work done and the care it gets afterward. Ask any contractor what they expect and what their warranty covers.',
      },
      {
        q: 'What about tile roofs?',
        a: 'A tile roof that leaks while the tiles are still good is often a candidate for a [tile lift & relay](/residential-roofing/tile-roofing/lift-and-relay/), which replaces the underlayment and resets the same tiles.',
      },
      {
        q: 'What about flat roofs?',
        a: 'A local problem on a flat roof, like an open seam or failed flashing, is a repair. If the surface is worn out across most of the roof, a replacement is usually the right fix. See [flat roof repair](/residential-roofing/flat-roofing/repair/) and [flat roof replacement](/residential-roofing/flat-roofing/replacement/).',
      },
    ],
    closing: {
      heading: 'Choose Based on What Your Roof Actually Needs',
      blocks: [
        'The right answer depends on the condition of your roof, and a good inspection makes that visible.',
        'Quality Roofing Specialists provides [roof repair](/roof-repair/), [tile lift & relay](/residential-roofing/tile-roofing/lift-and-relay/), [roof maintenance plans](/roof-maintenance-plans/) and [roof replacement](/roof-replacement/) for homes across Los Angeles and Orange County.',
        'To find out whether your roof can be restored or needs replacing, schedule a [free roof evaluation](#roof-check) and get photos and a clear next step.',
        '**[Contact Quality Roofing Specialists](/contact-us/) to talk through your roof.**',
      ],
    },
    related: ['/roof-repair/', '/roof-replacement/', '/roof-maintenance-plans/', '/residential-roofing/tile-roofing/lift-and-relay/', '/roof-inspection/'],
  },
  {
    slug: 'roof-storm-damage-signs',
    title: 'Roof Storm Damage: How to Spot It and What to Do Next',
    keyword: 'roof storm damage',
    metaTitle: 'Roof Storm Damage: Signs and What to Do Next',
    metaDescription:
      'Roof storm damage can hide from the ground. Learn the signs after wind and heavy rain in Southern California, the first steps and when to call a roofer.',
    datePublished: '2026-10-05',
    dateModified: '2026-10-05',
    excerpt:
      'Wind and heavy rain can damage a roof in ways you cannot see from the street. Here are the signs of roof storm damage, the first steps to take and when it is time to call a roofer.',
    intro: [
      'Roof storm damage is not always dramatic. After a windy night or a heavy downpour, a roof can look fine from the street while a lifted shingle, a slipped tile or a loose flashing is quietly letting water in.',
      'Southern California roofs take a particular kind of punishment. Santa Ana winds can lift and crack roofing materials, and winter rain can arrive in heavy bursts after months of dry heat, which finds every weak spot.',
      'This guide explains the signs of roof storm damage, what to do in the first hours, how damage differs by roof type and when a repair is enough.',
    ],
    sections: [
      {
        heading: 'How Storms Damage Roofs in Southern California',
        blocks: [
          'Most storm damage comes from three things: wind, rain and debris.',
          {
            list: [
              '**Wind:** Strong gusts can lift or crease shingles, shift or crack tiles and loosen flashing and vents.',
              '**Heavy rain:** After long dry spells, rain tests underlayment, flashing and seams that have aged in the sun. Small weak points can become leaks quickly.',
              '**Debris:** Branches and wind-blown objects can crack tiles, puncture a flat roof or clog valleys and drains.',
            ],
          },
          'Older roofs are more vulnerable, because years of sun make materials brittle and sealant tired. That is why a storm often reveals a problem that was already developing.',
        ],
      },
      {
        heading: 'Signs of Roof Storm Damage You Can See From the Ground',
        blocks: [
          'You can learn a lot from the ground. Walk around the house, look up at the roof and check the yard, and stay off the roof itself.',
          {
            list: [
              '**Missing, lifted or creased shingles:** Bare patches, tabs that stand up or visible creases across a shingle.',
              '**Cracked, slipped or missing tiles:** Gaps in the pattern, tiles out of line or pieces lying in the yard.',
              '**Debris on the roof or in the valleys:** Branches, leaves and other material that can trap water.',
              '**Granules in the gutters or at the downspouts:** A sign that shingles are losing their surface.',
              '**Bent or loose gutters, flashing and vents:** Metal parts that have shifted or pulled away.',
              '**Fallen branches:** Any limb that has hit the roof deserves a closer look.',
            ],
          },
          { note: '**Stay safe:** Do not climb onto a roof after a storm. Wet surfaces are slippery, tiles break underfoot, and damaged areas may not hold your weight.' },
        ],
      },
      {
        heading: 'Signs of Storm Damage Inside the House',
        blocks: [
          'Water often shows up inside before it shows up outside. Look for these signs:',
          {
            list: [
              'Brown or yellow ceiling stains, or paint that bubbles or peels.',
              'Drips during or after rain.',
              'Damp insulation or a musty smell in the attic.',
              'Daylight showing through the roof boards in the attic.',
              'Wet spots around vents, chimneys or skylights.',
            ],
          },
          'A stain can sit far from the actual opening, because water travels along the roof deck and framing before it drips. That is why a roofer starts upslope of the stain and checks the flashing, vents and valleys along the way. Our guide to [finding a roof leak](/blog/roof-leak-source/) explains how.',
        ],
      },
      {
        heading: 'What to Do First After Roof Storm Damage',
        blocks: [
          'Follow these steps in order:',
          {
            steps: [
              'Stay safe. Stay off the roof, keep away from fallen power lines and keep away from water near light fixtures or outlets.',
              'Protect what is inside. Move furniture and belongings away from the leak and catch drips with a bucket.',
              'Take photos. Photograph the damage from the ground and inside the house, with the date, before anything is cleaned up or moved.',
              'Limit further damage. A roofer can put temporary protection such as a tarp in place. See our guide to [temporary roof repair options](/blog/temporary-roof-repair-options/).',
              'Call a roofer. A roofer can find the source, photograph it and explain the repair.',
              'Contact your insurer if the damage may be covered. Our guide to [roof insurance claims in California](/blog/roof-insurance-claims-california/) explains what to document.',
            ],
          },
        ],
      },
      {
        heading: 'Storm Damage by Roof Type',
        blocks: [
          'Each roof type fails in its own way, so a roofer looks for different things on each one.',
          {
            table: {
              head: ['Roof type', 'Common storm damage', 'What a roofer checks'],
              rows: [
                ['Shingle', 'Lifted or missing shingles, creased tabs, exposed nails', 'Shingle seals, flashing, vents and the deck beneath any missing pieces'],
                ['Tile', 'Cracked, slipped or missing tiles, loose ridge tiles', 'Underlayment beneath the broken tiles, flashing and valleys'],
                ['Flat', 'Punctures, opened seams, ponding water, blocked drains', 'Seams and laps, drains and scuppers, flashing at walls and equipment'],
              ],
            },
          },
          'Our repair pages cover each one: [shingle roof repair](/residential-roofing/shingle-roofing/repair/), [tile roof repair](/residential-roofing/tile-roofing/repair/) and [flat roof repair](/residential-roofing/flat-roofing/repair/).',
        ],
      },
      {
        heading: 'Repair or Replace After a Storm?',
        blocks: [
          'Many storms leave damage that is local, such as a few lifted shingles, a handful of broken tiles or one failed flashing. A targeted repair is often the sensible fix when the rest of the roof is sound.',
          'When damage is widespread, when the same spots keep failing or when the roof was already near the end of its life, replacement can make more sense than patching.',
          'The photos from an inspection show which case you are in, so the decision rests on what the roof actually looks like. See our [roof repair](/roof-repair/) and [roof replacement](/roof-replacement/) pages for how each works.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How soon should I have my roof checked after a storm?',
        a: 'As soon as it is safe, and before the next rain. Small damage can turn into an interior leak the next time it rains, so a quick inspection is cheaper than waiting.',
      },
      {
        q: 'Can roof storm damage be invisible from the ground?',
        a: 'Yes. A lifted shingle, a cracked tile or a loose flashing can be hard to see from the street. A roofer checks the roof up close and photographs what they find.',
      },
      {
        q: 'Should I climb up to check the damage myself?',
        a: 'No. Wet roofs are slippery, tiles break underfoot and damaged areas may not hold weight. Look from the ground, take photos and call a roofer.',
      },
      {
        q: 'What should I do if water is coming in right now?',
        a: 'Move belongings away from the leak, catch the water, stay away from wet light fixtures and call us. See [emergency roof repair and storm damage](/roof-repair/emergency/) for how we handle active leaks.',
      },
      {
        q: 'Will insurance pay for roof storm damage?',
        a: 'It depends on your policy and the cause of the damage. Your insurer decides coverage, and our guide to [roof insurance claims in California](/blog/roof-insurance-claims-california/) explains what to document.',
      },
    ],
    closing: {
      heading: 'Get Your Roof Checked Before the Next Rain',
      blocks: [
        'Roof storm damage is easiest and cheapest to fix when it is caught early.',
        'Quality Roofing Specialists provides [emergency roof repair](/roof-repair/emergency/), [roof repair](/roof-repair/) and [roof inspections](/roof-inspection/) for homes across Los Angeles and Orange County.',
        'If a storm has hit your area, schedule a [free roof evaluation](#roof-check) and a roofer will check the roof, photograph what they find and explain your next step.',
        '**[Contact Quality Roofing Specialists](/contact-us/) to get your roof checked.**',
      ],
    },
    related: ['/roof-repair/emergency/', '/roof-repair/', '/roof-inspection/', '/roof-replacement/'],
  },
  {
    slug: 'temporary-roof-repair-options',
    title: 'Temporary Roof Repair: What Works Until a Roofer Arrives',
    keyword: 'temporary roof repair',
    metaTitle: 'Temporary Roof Repair: What Works Until a Roofer Comes',
    metaDescription:
      'Temporary roof repair can limit water damage until a roofer arrives. See safe options, what each one fixes and when to call for help.',
    datePublished: '2026-10-05',
    dateModified: '2026-10-05',
    excerpt:
      'A tarp, a little sealant and a few precautions can limit water damage until a roofer can make the real repair. Here are the temporary options that work, what each one fixes and how to stay safe.',
    intro: [
      'A roof leak does not wait for a convenient time. When water is coming in, temporary roof repair can limit the damage until a roofer can make the permanent fix.',
      'The options below are stop-gaps. They are meant to keep water out for days or a few weeks, not years, and some are best left to a roofer. Your safety comes first: a wet roof is slippery, and a fall from a roof can cause serious injury.',
      'This guide covers what to do inside the house, the five temporary roof repair options that work, the mistakes that make things worse and when to call a roofer.',
    ],
    sections: [
      {
        heading: 'Start With Safety and the Inside of the House',
        blocks: [
          'Before you think about the roof, protect yourself and your home.',
          {
            list: [
              '**Stay off a wet, steep or storm-damaged roof.** Wet surfaces are slippery, tile cracks underfoot and damaged areas may not hold your weight.',
              '**Move belongings away from the leak.** Furniture, rugs and electronics first.',
              '**Catch the water.** Put a bucket under each drip and lay plastic sheeting or towels around it.',
              '**Keep away from water near light fixtures and outlets.** Water and electricity do not mix.',
              '**Take photos.** Photograph the damage inside and out, with the date, before you change anything. They help with a roofer’s assessment and with any [insurance claim](/blog/roof-insurance-claims-california/).',
            ],
          },
        ],
      },
      {
        heading: 'Five Temporary Roof Repair Options',
        blocks: [
          'These are the options roofers and homeowners reach for most often, with the limits of each.',
          { h3: '1. A roof tarp' },
          'A tarp is the most useful temporary fix for storm damage and for larger openings. It covers the damaged area and sheds water down the slope. A good tarp job is fastened securely, with the tarp carried past the damage and over the ridge where needed, so the wind cannot lift it and water cannot run underneath. Weights alone are not enough.',
          'Tarping means working on the roof, so it is usually best left to a roofer. A tarp is a temporary cover that is meant to last until the repair is made.',
          { h3: '2. Roofing sealant for small gaps' },
          'Roofing sealant or cement can close a small crack or cover an exposed nail head on a dry day. It is for small gaps only, and it should be used as the product directions say. It will not fix a missing shingle or a broken tile.',
          { h3: '3. A temporary fix for a lifted or missing shingle' },
          'A lifted shingle can sometimes be re-sealed, and a missing one can be replaced with a matching piece. This is quick work for a roofer, and it is much safer than doing it yourself on a sloped roof.',
          { h3: '4. A temporary flashing patch' },
          'Leaks around vents, chimneys and skylights usually come from flashing. A roofer can patch the flashing with sealant or a piece of metal until the proper repair can be made. These spots are where roofs leak most often, so a patch here should be checked soon.',
          { h3: '5. Plastic sheeting and buckets inside' },
          'Plastic sheeting belongs inside the house, over belongings and in the attic under a drip, along with buckets. It is not a roof cover. On the roof, plastic tears in the wind and can trap water.',
        ],
      },
      {
        heading: 'Which Temporary Fix Fits Which Problem',
        blocks: [
          {
            table: {
              head: ['Problem', 'Temporary option', 'What to know'],
              rows: [
                ['Missing shingles or tiles after wind', 'Roof tarp', 'Lasts days to weeks, so book the repair soon'],
                ['Small crack or exposed nail head', 'Roofing sealant on a dry day', 'Closes small gaps only'],
                ['Lifted shingle', 'Re-seal or replace the shingle', 'Quick for a roofer, risky to do yourself'],
                ['Leak at a vent, chimney or skylight', 'Tarp or flashing patch', 'These spots fail often, so have them checked'],
                ['Ceiling drip inside', 'Bucket and plastic sheeting', 'Protects the room but does not stop the leak'],
              ],
            },
          },
        ],
      },
      {
        heading: 'Mistakes That Make a Leak Worse',
        blocks: [
          {
            list: [
              '**Climbing onto a wet or steep roof.** This is the most dangerous mistake. Call a roofer instead.',
              '**Walking on tile.** Tiles crack, and a broken tile can make the leak worse.',
              '**Holding a tarp down with weights alone.** Wind can lift it, and water can run underneath.',
              '**Covering the roof with plastic sheeting.** It tears and traps water.',
              '**Piling sealant everywhere.** It can hide the real source and make the repair harder.',
              '**Skipping photos.** Take them first, before you change anything.',
              '**Waiting.** A small leak can become a damaged ceiling, wet insulation and mold.',
            ],
          },
        ],
      },
      {
        heading: 'When to Call a Roofer',
        blocks: [
          'Call a roofer when water is coming in, when a storm has damaged the roof, when the leak is in more than one place, when a ceiling is sagging or when you have a tile roof.',
          'At Quality Roofing Specialists, a roofer assesses and photographs the damage, puts temporary protection such as a tarp in place when it is needed, then makes the permanent repair, priced in writing first. You can call even after hours or on a weekend.',
          'See [emergency roof repair and storm damage](/roof-repair/emergency/) for how it works, or our [roof repair](/roof-repair/) page for permanent fixes. To trace where the water is getting in, read how to [find a roof leak](/blog/roof-leak-source/).',
        ],
      },
    ],
    faqs: [
      {
        q: 'How long does a temporary roof repair last?',
        a: 'Usually days to a few weeks. A tarp or sealant is meant to hold until the permanent repair is made, and weather, wind and sun can wear it out sooner.',
      },
      {
        q: 'Is roofing cement a permanent fix?',
        a: 'No. Roofing cement can close a small gap for a while, but it does not repair the damaged material underneath. A roofer can tell you whether a patch will hold or whether the area needs a real repair.',
      },
      {
        q: 'Can I tarp my own roof?',
        a: 'It is risky. Tarping means working on a sloped, possibly wet roof, and a poorly fastened tarp can blow off. A roofer has the equipment and experience to do it safely.',
      },
      {
        q: 'Will a temporary repair affect my insurance claim?',
        a: 'Insurers generally expect you to take reasonable steps to prevent more damage. Keep your photos and receipts and tell your insurer what you did. Your policy has the details, and our guide to [roof insurance claims in California](/blog/roof-insurance-claims-california/) covers the basics.',
      },
      {
        q: 'Should I try to walk on my tile roof to find the leak?',
        a: 'No. Tiles crack underfoot and the roof is steep and slippery. Look from the ground and call a roofer.',
      },
    ],
    closing: {
      heading: 'Protect Your Home Now, Repair It Properly Next',
      blocks: [
        'Temporary roof repair buys you time. It does not replace a proper repair, and the sooner a roofer finds the cause, the less damage the leak can do.',
        'Quality Roofing Specialists provides [emergency roof repair](/roof-repair/emergency/) and [roof repair](/roof-repair/) for homes across Los Angeles and Orange County, with photos of the problem and a written scope and price before work begins.',
        'If you are dealing with a leak, schedule a [free roof evaluation](#roof-check) and a roofer will check the roof and explain your next step.',
        '**[Contact Quality Roofing Specialists](/contact-us/) to get a roofer out to your roof.**',
      ],
    },
    related: ['/roof-repair/emergency/', '/roof-repair/', '/roof-inspection/'],
  },
  {
    slug: 'roof-insurance-claims-california',
    title: 'Roof Insurance Claims in California: What to Document and What to Expect',
    keyword: 'roof insurance claims',
    metaTitle: 'Roof Insurance Claims in California: What to Document',
    metaDescription:
      'Roof insurance claims in California go more smoothly with photos, fast protection from further damage and a written repair scope. See what to expect.',
    datePublished: '2026-10-05',
    dateModified: '2026-10-05',
    excerpt:
      'Roof insurance claims go more smoothly when you document the damage, protect the roof from more harm and get a written repair scope. Here is what to do, what insurers usually cover and what a roofer can help with.',
    intro: [
      'Roof insurance claims go more smoothly when you document the damage well, act quickly to prevent more, and get a clear written scope of the repair.',
      'Whether a claim is approved depends on your policy and on what caused the damage, and your insurer makes that decision. What you control is how well the damage is documented and how quickly the roof is protected.',
      'This guide explains what homeowners insurance usually covers, the steps to take after roof damage, what a roofer can and cannot do and what to expect from the process in California.',
    ],
    sections: [
      {
        heading: 'What Homeowners Insurance Usually Covers',
        blocks: [
          'Policies differ, so read yours or ask your agent. In general:',
          {
            list: [
              '**Usually covered:** sudden, accidental damage, such as wind, a fallen tree limb or fire.',
              '**Usually not covered:** wear and tear, age and damage from poor maintenance.',
              '**Earthquake damage:** In California, a standard homeowners policy generally does not cover earthquake damage. That takes separate earthquake coverage.',
            ],
          },
          'A roof’s age can also affect how a claim is paid, because policies treat older roofs differently. Check your policy’s terms for deductibles and for how roof damage is valued.',
        ],
      },
      {
        heading: 'What to Do After Roof Damage',
        blocks: [
          'These steps protect both your home and your claim:',
          {
            steps: [
              'Stay safe. Do not climb onto a damaged roof, and keep away from fallen power lines and from water near light fixtures.',
              'Photograph everything. Take wide and close-up photos, with the date, from the ground and inside the house, before anything is moved or cleaned up.',
              'Prevent further damage. Cover the damage or have a roofer put temporary protection in place, and keep every receipt. See our guide to [temporary roof repair options](/blog/temporary-roof-repair-options/).',
              'Contact your insurer promptly. Policies have deadlines for reporting a loss, so do not wait.',
              'Get a roofer’s inspection and a written scope. A roofer can find the cause, photograph it and put the repair, with a price, in writing.',
              'Keep damaged materials until the adjuster has seen them, if it is safe to do so.',
            ],
          },
        ],
      },
      {
        heading: 'What a Roofer Can and Cannot Do',
        blocks: [
          'A roofer can inspect the roof, photograph the damage, explain the cause in plain English and give you a written scope and price. Those are the documents an adjuster needs to see.',
          'At Quality Roofing Specialists we work with insurance adjusters, and we can give you photos and a written scope to share with yours. Our team is small, so we do what we can to help.',
          'A roofing contractor cannot file or negotiate the claim for you. That is between you and your insurer, or a licensed public adjuster if you choose to hire one. Be careful with anyone who promises that insurance will pay for your roof.',
        ],
      },
      {
        heading: 'What to Expect From the Process',
        blocks: [
          'After you report the loss, your insurer will usually send an adjuster to inspect the damage and prepare an estimate.',
          {
            list: [
              '**The adjuster’s visit:** Show them the photos and the damage, and share your roofer’s written scope.',
              '**The estimate:** The insurer’s estimate may differ from your roofer’s. You can ask questions and provide your own documentation.',
              '**The payment:** Your policy determines how the payment is calculated, including your deductible.',
              '**The timeline:** California rules set deadlines for insurers to respond to claims. The [California Department of Insurance](https://www.insurance.ca.gov/) can explain them and how to get help if you have a problem.',
            ],
          },
        ],
      },
      {
        heading: 'Common Mistakes With Roof Insurance Claims',
        blocks: [
          {
            list: [
              '**Throwing away damaged material or cleaning up before taking photos.**',
              '**Waiting to report the loss or to protect the roof.**',
              '**Signing a repair contract before you understand what your policy covers.**',
              '**Assuming earthquake damage is covered by a standard policy.**',
              '**Hiring anyone who goes door to door after a storm and promises the claim will be approved.**',
            ],
          },
          'For help recognizing damage in the first place, see our guide to [roof storm damage signs](/blog/roof-storm-damage-signs/).',
        ],
      },
    ],
    faqs: [
      {
        q: 'Does homeowners insurance cover a roof replacement?',
        a: 'It can, if the damage came from a covered event such as wind, and your policy’s terms allow it. Roofs that are simply old or worn are generally not covered. Your insurer decides, so ask them and read your policy.',
      },
      {
        q: 'Does insurance cover earthquake damage to a roof in California?',
        a: 'A standard homeowners policy generally does not. Earthquake damage usually requires separate earthquake coverage, so check what you have.',
      },
      {
        q: 'How long do I have to file a roof insurance claim?',
        a: 'Policies set deadlines for reporting a loss, and they differ. Report the damage promptly and check your policy or ask your agent.',
      },
      {
        q: 'Will filing a claim raise my insurance rates?',
        a: 'It can, depending on your insurer and your claim history. Ask your agent before you file if you are unsure whether to.',
      },
      {
        q: 'Can Quality Roofing Specialists handle my claim for me?',
        a: 'No contractor can file or negotiate a claim for you. We can inspect the roof, take photos and give you a written scope and price to share with your adjuster. Start with a [free roof evaluation](#roof-check).',
      },
    ],
    closing: {
      heading: 'Document First, Then Repair',
      blocks: [
        'A good record of the damage and a clear written scope make roof insurance claims easier for everyone involved.',
        'Quality Roofing Specialists provides [emergency roof repair](/roof-repair/emergency/), [roof repair](/roof-repair/) and [roof inspections](/roof-inspection/) for homes across Los Angeles and Orange County, with photos of what we find.',
        'If your roof has been damaged, schedule a [free roof evaluation](#roof-check) and a roofer will photograph the damage and explain your next step.',
        '**[Contact Quality Roofing Specialists](/contact-us/) to get your roof inspected.**',
      ],
    },
    related: ['/roof-repair/emergency/', '/roof-repair/', '/roof-inspection/', '/roof-replacement/'],
  },
  {
    slug: 'wooden-roof-pros-and-cons',
    title: 'Wooden Roof Pros and Cons: Is a Wood Roof Right for Your Home?',
    keyword: 'wooden roof',
    metaTitle: 'Wooden Roof Pros and Cons: Is Wood Worth It?',
    metaDescription:
      'A wooden roof looks warm and natural, but fire rules, upkeep and cost matter in Southern California. See the pros and cons and the alternatives.',
    datePublished: '2026-10-05',
    dateModified: '2026-10-05',
    excerpt:
      'Wood shakes and shingles look beautiful, but fire risk, upkeep and cost make a wooden roof a hard fit for most Southern California homes. Here are the real pros and cons, and the alternatives.',
    image: '/images/blog/wooden-roof-pros-and-cons.webp',
    imageAlt: 'Clay tile roof on a Spanish-style building in Los Angeles, one of the alternatives to a wooden roof',
    intro: [
      'A wooden roof has a warmth that other roofing materials struggle to copy. Cedar and redwood shakes and shingles age to a soft silver-gray, and a good wood roof gives a home real character.',
      'Before you choose one, it helps to know what a wooden roof asks of you in return. In Southern California, fire rules, sun, dry heat and cost all shape the decision, and for most homes the answer ends up being [tile](/residential-roofing/tile-roofing/) or [shingle](/residential-roofing/shingle-roofing/) instead.',
      'This guide covers the pros and cons of a wooden roof, what to check before you commit, and the alternatives that look good and perform better where wildfire is a risk.',
    ],
    sections: [
      {
        heading: 'What Is a Wooden Roof?',
        blocks: [
          'A wooden roof is covered with wood shakes or wood shingles, most often cedar and sometimes redwood.',
          'Wood shingles are sawn, so they are thin and uniform. Wood shakes are thicker and rougher, and many are split rather than sawn, which gives them a more rustic look.',
          'Both are installed in overlapping rows over underlayment, and both weather to gray over a few years unless they are stained or treated.',
          'Pressure-treated and fire-retardant-treated wood are also sold, and they change how the roof performs in a fire.',
          { note: '**Not the same as asphalt shingles:** Asphalt shingles are made of asphalt and fiberglass, and they are far more common on homes today. This article is about real wood.' },
        ],
      },
      {
        heading: 'The Pros of a Wooden Roof',
        blocks: [
          { h3: 'Natural beauty' },
          'Wood has a textured, natural look that suits Craftsman, cottage, Tudor and rustic homes. No two roofs weather quite the same way, and many homeowners love the aged, silvery finish.',
          { h3: 'A natural, renewable material' },
          'Wood is renewable when it comes from responsibly managed forests. If that matters to you, ask the supplier where the wood was sourced.',
          { h3: 'It can last for decades when it is looked after' },
          'A wooden roof that has good ventilation, a sound installation and regular upkeep can last a long time. How long varies widely with the wood, the installation and the care it gets.',
          { h3: 'A look other materials only imitate' },
          'Some roofing products are made to look like wood, but they are different materials. If real wood is the look you want, there is no exact substitute.',
        ],
      },
      {
        heading: 'The Cons of a Wooden Roof',
        blocks: [
          { h3: 'Fire risk, the biggest issue in Southern California' },
          'Wood burns. Untreated wood shakes and shingles generally have the weakest fire resistance of any common roof covering, and wind-blown embers during Santa Ana wind events can land on a roof and ignite it.',
          'Roofs are rated Class A, B or C for fire resistance, with Class A the best. In California’s high fire hazard zones, roofs generally have to meet Class A, and many cities restrict wood roofs outright.',
          'Fire-retardant treatment and special roof assemblies can improve a wooden roof’s rating, but the result depends on the product and the installation, and treatment can wear over time.',
          { h3: 'Upkeep' },
          'Wood needs regular attention. Debris has to be cleared, split or curled pieces replaced and, in shaded or damp spots, moss and algae kept in check.',
          { h3: 'Sun, moisture and pests' },
          'Hot, dry sun can split, curl and warp wood, and moisture can lead to rot. Termites and other insects can feed on it, and birds and small animals sometimes nest under loose pieces.',
          { h3: 'Cost' },
          'A wood roof usually costs more than asphalt shingles, and repairs call for roofers who know the material. When the budget matters, wood is often the hardest option to justify.',
          { h3: 'Insurance and code' },
          'Some insurers charge more for a wood roof, or limit coverage, in fire-prone areas. Ask your insurer before you decide.',
        ],
      },
      {
        heading: 'Wood vs. Shingle vs. Tile',
        blocks: [
          'This comparison shows how the three most common choices for a Southern California home stack up.',
          {
            table: {
              head: ['Roof covering', 'Look', 'Fire resistance', 'Upkeep'],
              rows: [
                ['Wood shake or shingle', 'Natural, textured, weathers to gray', 'Weakest unless treated or specially assembled', 'Higher'],
                ['Asphalt shingle', 'Wide range of colors and textures', 'Many products are rated Class A', 'Lower'],
                ['Clay or concrete tile', 'Classic Spanish and Mediterranean look', 'Does not burn, and typically rated Class A', 'Lower'],
              ],
            },
          },
          'Fire ratings depend on the specific product and how the whole roof is assembled, so check the rating of the exact roof system you are considering.',
        ],
      },
      {
        heading: 'Is a Wooden Roof Right for Your Home?',
        blocks: [
          'For most Southern California homes, wood is a difficult fit because of the fire risk, the upkeep and the cost.',
          'A wooden roof can still make sense in a few cases, such as a home outside a high fire hazard zone where wood roofs are allowed, or a historic home whose look depends on wood and whose owner is ready to budget for upkeep.',
          'Even then, check these before you commit:',
          {
            checklist: [
              '**Local rules:** Ask your city’s building department whether wood roofs are allowed at your address, and what fire rating is required.',
              '**Your fire hazard zone:** Homes in high fire hazard zones face the strictest rules.',
              '**Your insurance:** Ask whether a wood roof changes your coverage or your premium.',
              '**Upkeep:** Plan for regular cleaning, repairs and inspections.',
              '**Cost:** Compare the full installed price of wood with shingle and tile.',
            ],
          },
        ],
      },
      {
        heading: 'Alternatives That Still Look Great',
        blocks: [
          'If you love the look of wood but want better fire performance and less upkeep, two options are worth a close look.',
          { h3: 'Architectural asphalt shingles' },
          'These shingles come in a range of colors and have a dimensional, textured surface. See our [shingle roofing](/residential-roofing/shingle-roofing/) services, including [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/).',
          { h3: 'Clay and concrete tile' },
          'Tile is a classic in Southern California, especially on Spanish and Mediterranean homes, and it does not burn. See our [tile roofing](/residential-roofing/tile-roofing/) services, including [tile roof replacement](/residential-roofing/tile-roofing/replacement/).',
        ],
      },
    ],
    faqs: [
      {
        q: 'Are wooden roofs allowed in Los Angeles and Orange County?',
        a: 'It depends on where your home is. Rules vary by city and by fire hazard zone, and many areas restrict wood roofs or require a Class A fire rating. Your city’s building department can tell you what applies to your address before you spend any money.',
      },
      {
        q: 'How long does a wooden roof last?',
        a: 'It varies widely with the type of wood, the installation, ventilation and upkeep. Sun, dry heat, moisture and pests can all shorten a wooden roof’s life, and a roofer can tell you what condition yours is in.',
      },
      {
        q: 'Is a wooden roof worth the cost in Southern California?',
        a: 'For most homes, no. Wood usually costs more than asphalt shingles, needs more upkeep and carries a higher fire risk, so we usually point homeowners to shingle or tile instead.',
      },
      {
        q: 'What can I use instead of a wooden roof?',
        a: 'Architectural asphalt shingles and clay or concrete tile are the two most common choices. Both are available in styles that suit many kinds of homes, and many shingle products are rated Class A for fire.',
      },
      {
        q: 'I already have a wood roof. What should I do?',
        a: 'Start by finding out what condition it is in. A [free roof evaluation](#roof-check) gives you photos and a plain-English report, and you can then decide whether to keep up the roof or replace it with tile or shingle.',
      },
    ],
    closing: {
      heading: 'Choosing a Roof That Fits Your Home',
      blocks: [
        'A wooden roof is beautiful, but it is a demanding choice, and in much of Southern California the fire risk, the rules and the cost point toward other materials.',
        'Quality Roofing Specialists provides roofing services for homes across Los Angeles and Orange County, including [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/), [tile roof replacement](/residential-roofing/tile-roofing/replacement/) and [roof inspections](/roof-inspection/).',
        'If you are weighing your options, schedule a [free roof evaluation](#roof-check) to see what condition your roof is in and which choices make sense for your home.',
        '**[Contact Quality Roofing Specialists](/contact-us/) to talk through your roof and plan your next steps.**',
      ],
    },
    related: ['/residential-roofing/shingle-roofing/replacement/', '/residential-roofing/tile-roofing/replacement/', '/residential-roofing/shingle-roofing/', '/residential-roofing/tile-roofing/', '/roof-inspection/'],
  },
  {
    slug: 'tile-roof-underlayment',
    title: 'Tile Roof Underlayment: When Should It Be Replaced?',
    keyword: 'tile roof underlayment',
    metaTitle: 'Tile Roof Underlayment: When to Replace It',
    metaDescription:
      'Tile roof underlayment often wears out before clay or concrete tiles do. See the warning signs, lift & relay options and what affects cost in Los Angeles.',
    datePublished: '2026-10-02',
    dateModified: '2026-10-02',
    author: 'Tony G.',
    excerpt:
      'Clay and concrete tiles can last for decades, but the waterproofing beneath them has a shorter service life. Here’s how to tell when tile roof underlayment needs replacing, and what the work involves.',
    image: '/images/blog/tile-roof-underlayment.webp',
    heroImage: '/images/blog/tile-roof-underlayment-hero.webp',
    imageAlt: 'Roofer lifting clay tiles to expose the underlayment on a tile roof, with the downtown Los Angeles skyline in the distance',
    intro: [
      `[Clay and concrete roof tiles](${TILE}) can protect a Southern California home for decades, but the waterproofing layer beneath them has a different job and a different service life.`,
      'When tile roof underlayment deteriorates, water can reach the roof deck and create leaks even when the tiles appear intact.',
      'For homeowners in [Los Angeles](/service-areas/la-county/los-angeles/), understanding when underlayment needs replacement can help prevent avoidable water damage and make roof maintenance decisions more informed.',
    ],
    sections: [
      {
        heading: 'What Is Tile Roof Underlayment?',
        blocks: [
          'Tile roof underlayment is a water-resistant or waterproofing layer installed between the roof deck and the clay or concrete tiles.',
          'Roof tiles shed most rainfall, while the underlayment provides a secondary line of defense against water that passes beneath the tile covering.',
          'A complete tile roofing system also relies on properly installed flashing, valleys, penetrations, drainage paths, and sound roof decking.',
          'California’s residential building code requires roof underlayment to meet applicable material and installation requirements, with the specific assembly depending on the roof covering and installation conditions.',
          'The [California Residential Code](https://codes.iccsafe.org/content/CARC2025P2/chapter-9-roof-assemblies) provides technical requirements for roof assemblies and underlayment installation.',
          { note: '**The important distinction:** Long-lasting roof tiles do not automatically mean the underlayment beneath them remains serviceable.' },
        ],
      },
      {
        heading: 'How Long Does Tile Roof Underlayment Last?',
        blocks: [
          'There is no single replacement age that applies to every tile roof.',
          'The service life of underlayment depends on the product, installation quality, roof design, environmental exposure, and maintenance history.',
          'Southern California’s extended periods of sun and heat, followed by seasonal rainfall, make it worthwhile to evaluate older roofing systems before leaks appear.',
          'The following table provides a practical way to think about underlayment age without treating an estimate as a guaranteed expiration date.',
          {
            table: {
              head: ['Roof condition', 'Recommended approach'],
              rows: [
                ['Recently installed underlayment', 'Keep installation records and follow manufacturer maintenance guidance.'],
                ['Older roof with no known leak history', 'Arrange an inspection if the underlayment’s age or condition is unknown.'],
                ['Roof with recurring leaks', 'Investigate the source rather than assuming the tiles or underlayment are solely responsible.'],
                ['Brittle, torn, or visibly deteriorated underlayment', 'Have a roofing professional assess the affected area and the wider roof assembly.'],
                ['Roof undergoing tile replacement or major reroofing', 'Evaluate the deck, underlayment, flashing, and applicable code requirements together.'],
              ],
            },
          },
          'A [roof inspection](/roof-inspection/#tile-roofs) can help establish whether the existing system remains serviceable or whether replacement should be planned.',
        ],
      },
      {
        heading: '7 Signs Your Tile Roof Underlayment May Need Replacement',
        blocks: [
          'Underlayment is largely concealed by the tile covering, so many warning signs appear inside the home or around other roof components.',
          'The following symptoms warrant investigation, although none independently proves that the underlayment has failed.',
          { h3: '1. Water stains on ceilings or walls' },
          'Brown discoloration, bubbling paint, peeling finishes, or damp drywall can indicate water intrusion.',
          'The leak could originate from underlayment, flashing, damaged tiles, roof penetrations, or another part of the building envelope.',
          { h3: '2. Leaks that return after repairs' },
          'A recurring leak may mean the original repair addressed the visible symptom rather than the underlying source.',
          'Repeated repairs in the same area justify a more comprehensive roof assessment.',
          { h3: '3. Deteriorated or brittle underlayment' },
          'During authorized roof work, a contractor may discover material that has become brittle, cracked, torn, or difficult to handle without damage.',
          'These findings can indicate that the material no longer provides dependable water protection.',
          { h3: '4. Cracked, displaced, or missing roof tiles' },
          'Damaged tiles can expose the underlayment to more direct weather exposure and create pathways for water intrusion.',
          `Even a small area of displaced tiles deserves attention, particularly around ridges, valleys, roof edges, and penetrations. A targeted [tile roof repair](${TILE}repair/) is often the fix when the layers beneath are still sound.`,
          { h3: '5. Problems around flashing and roof penetrations' },
          'Chimneys, plumbing vents, skylights, and wall-to-roof intersections require carefully integrated flashing and waterproofing details.',
          'Failures in these locations can produce symptoms similar to underlayment deterioration.',
          { h3: '6. Moisture or deterioration in the roof decking' },
          'Soft or deteriorated sheathing, visible water damage, and signs of persistent moisture can indicate a more extensive roofing problem.',
          'The affected decking should be evaluated before a replacement system is installed.',
          { h3: '7. An aging roof with little maintenance history' },
          'An older roof is not automatically defective, but uncertainty about the installation date, material type, and previous repairs makes an inspection more valuable.',
          'A documented assessment can help prioritize repairs before the next period of heavy rain.',
          { note: '**Homeowner tip:** Do not lift roof tiles or walk on a sloped tile roof yourself, because tiles can break and the roof surface can be hazardous.' },
        ],
      },
      {
        heading: 'Why Tile Roofs Can Leak Even When Tiles Look Fine',
        blocks: [
          'One of the most common misconceptions about tile roofing is that intact tiles guarantee a watertight roof.',
          'Tile coverings are designed to shed water, but wind-driven rain and water moving beneath the tiles can still reach vulnerable roof details.',
          'The underlayment, flashing, and drainage system must work together to manage that water.',
          'Common causes of leaks include:',
          {
            list: [
              '**Underlayment deterioration:** Aging or damaged material may no longer provide adequate secondary water protection.',
              '**Flashing failure:** Poorly integrated or deteriorated flashing can allow water into roof intersections.',
              '**Broken or displaced tiles:** Openings in the tile covering can expose the layers beneath.',
              '**Valley problems:** Debris, damaged components, or defective installation can interfere with drainage.',
              '**Roof penetrations:** Plumbing vents, skylights, and other openings require appropriate waterproofing details.',
              '**Roof deck damage:** Prolonged moisture exposure can compromise the surface supporting the roofing system.',
            ],
          },
          'A professional inspection should trace the likely water-entry path rather than automatically recommending full replacement based on a ceiling stain alone.',
          'Homeowners can also explore [roof repair services](/roof-repair/) when a leak or other roofing issue needs investigation.',
        ],
      },
      {
        heading: 'Can You Replace Underlayment Without Replacing the Tiles?',
        blocks: [
          'Yes, in many cases, existing clay or concrete roof tiles can be removed, inspected, and reinstalled with new underlayment.',
          `This approach is commonly called a tile reset or [tile lift-and-relay](${TILE}lift-and-relay/) project.`,
          'The feasibility depends on the condition of the existing tiles, their availability, the roof deck, the roof design, and the scope of necessary repairs.',
          'A typical project may involve the following steps:',
          {
            steps: [
              'Inspect the roof and document existing damage.',
              'Carefully remove the tiles from the areas included in the project.',
              'Sort and inspect the tiles for cracks, breakage, and deterioration.',
              'Remove the existing underlayment as required by the approved scope.',
              'Inspect the exposed roof deck and repair damaged sections where necessary.',
              'Install the specified underlayment and address flashing and waterproofing details.',
              'Reinstall serviceable tiles and replace unsuitable or missing pieces.',
              'Complete a final inspection of the finished roof assembly.',
            ],
          },
          'Reusing existing tiles may reduce material waste and avoid the expense of purchasing a completely new tile covering.',
          'However, it does not eliminate the labor involved in removing and reinstalling the tiles, and brittle or discontinued tiles can make the project more complicated.',
          'The contractor should explain how tile breakage, replacement materials, deck repairs, permits, and any concealed damage will be handled.',
        ],
      },
      {
        heading: 'Which Underlayment Is Right for a Tile Roof?',
        blocks: [
          'The appropriate material depends on the roof assembly, slope, exposure, product specifications, and applicable building requirements.',
          'Three broad material categories commonly encountered in roofing discussions are asphalt-saturated felt, synthetic underlayment, and self-adhered modified-bitumen membranes.',
          {
            table: {
              head: ['Material category', 'General characteristics', 'What to evaluate'],
              rows: [
                ['Asphalt-saturated felt', 'Traditional sheet material used in many roofing assemblies.', 'Product classification, installation requirements, and compatibility with the tile system.'],
                ['Synthetic underlayment', 'Polymer-based sheets with product-specific strength and handling characteristics.', 'Approved application, exposure limits, fastening, and compatibility.'],
                ['Self-adhered membrane', 'Membrane with an adhesive backing designed for specified roofing applications.', 'Approved use, deck compatibility, installation conditions, and required system details.'],
              ],
            },
          },
          'These categories are not interchangeable simply because they can be placed beneath roofing materials.',
          'The selected product must comply with the applicable code provisions and the installation instructions for the roofing assembly.',
          'California’s requirements can also vary with roof slope and other installation conditions, so a contractor should confirm the requirements applicable to the particular property.',
          'For additional technical information, consult the [California Building Code’s roof assembly requirements](https://codes.iccsafe.org/content/CABC2025P2/chapter-15-roof-assemblies-and-rooftop-structures).',
        ],
      },
      {
        heading: 'What Happens During Tile Roof Underlayment Replacement?',
        blocks: [
          'Understanding the process helps homeowners evaluate proposals and compare the scope of work between contractors.',
          { h3: 'Step 1: Roof inspection and project planning' },
          'The contractor evaluates the tile covering, roof geometry, visible damage, flashing, access, and known leak locations.',
          'The assessment should identify areas requiring closer examination and clarify what is included in the proposed work.',
          { h3: 'Step 2: Tile removal and sorting' },
          'Tiles are removed in a controlled sequence and sorted for potential reuse.',
          'The quantity of reusable tile depends on its actual condition, availability of matching replacements, and the handling requirements of the project.',
          { h3: 'Step 3: Roof deck evaluation' },
          'Once the existing roofing layers are exposed, the contractor can inspect the deck for water damage, deterioration, and other conditions that were previously concealed.',
          'Any necessary repairs should be documented and addressed before the new roofing layers are installed.',
          { h3: 'Step 4: Underlayment and flashing installation' },
          'The roofers install the specified underlayment according to the approved system and manufacturer instructions.',
          'Roof edges, valleys, penetrations, walls, and other transitions require appropriate attention because these details can be vulnerable to water intrusion.',
          'You can see tile-rated underlayment going down beneath new clay tile in our [Mid-Wilshire tile roof project](/projects/tile-flat-roofing-in-mid-wilshire-90019/).',
          { h3: 'Step 5: Tile reinstallation and final inspection' },
          'Serviceable tiles are reset, unsuitable tiles are replaced as agreed, and the completed work is inspected.',
          'The contractor should explain the applicable workmanship warranty, product warranty, and any maintenance recommendations.',
          'A clear proposal should distinguish the planned work from repairs that may be necessary after concealed conditions are discovered.',
        ],
      },
      {
        heading: 'What Affects Replacement Costs?',
        blocks: [
          'There is no reliable single price for tile roof underlayment replacement without understanding the property and the scope of work.',
          'Two homes with similar roof areas can have substantially different project requirements.',
          'The following factors can influence the estimate:',
          {
            list: [
              '**Roof size:** Larger roof areas generally require more labor and materials.',
              '**Roof complexity:** Multiple slopes, hips, valleys, and penetrations can increase installation time.',
              '**Tile condition:** Fragile, damaged, or discontinued tiles can complicate removal and reinstallation.',
              '**Underlayment selection:** Material type, product specifications, and required layers affect material costs.',
              '**Deck repairs:** Damaged sheathing or structural components can add work beyond the original scope.',
              '**Flashing and waterproofing details:** Defective or outdated components may need replacement or modification.',
              '**Access and site conditions:** Steep slopes, limited access, landscaping, and property layout can affect labor requirements.',
              '**Permits and code compliance:** Applicable local requirements and project conditions may affect the work and documentation.',
            ],
          },
          'When comparing estimates, check whether each proposal includes tile removal, disposal, underlayment, deck repairs, flashing, tile replacement allowances, cleanup, and final inspection.',
          'A lower initial estimate may cover a different scope of work, so comparing the line items is more informative than comparing the total alone.',
          `For homeowners considering broader roofing work, [tile roof replacement](${TILE}replacement/) and our other [roof replacement services](/roof-replacement/) provide related options to explore, and [roof financing](/roof-financing/) can spread the cost of a larger project.`,
        ],
      },
      {
        heading: 'Preparing Your Tile Roof for Southern California’s Rainy Season',
        blocks: [
          'Los Angeles homeowners often experience long dry periods between seasonal rainfall events.',
          'That weather pattern can make roof maintenance easy to postpone until a leak becomes visible indoors.',
          'Planning an inspection before significant rain provides an opportunity to identify visible problems and determine whether additional investigation is needed. A [roof maintenance plan](/roof-maintenance-plans/) can schedule that visit every year before the rains.',
          'Use this checklist as a starting point:',
          {
            checklist: [
              'Check ceilings and upper walls for new stains or discoloration.',
              'Look for visible cracked or displaced tiles from a safe location on the ground.',
              'Check accessible attic areas for signs of moisture or water damage.',
              'Keep gutters and roof drainage outlets clear where safely accessible.',
              'Ask about recurring leaks and previously repaired roof areas during an inspection.',
              'Gather available records showing the roof’s installation date and past repairs.',
              'Request documentation of any recommended underlayment repairs or replacement.',
            ],
          },
          'A visual check from the ground cannot establish the condition of concealed underlayment.',
          'If your roof is older, has a history of leaks, or has an unknown maintenance history, a professional assessment can help determine the appropriate next step.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How often should tile roof underlayment be replaced?',
        a: 'There is no universal replacement interval for every tile roof. The appropriate timing depends on the installed product, roof conditions, installation quality, maintenance history, and evidence of deterioration.',
      },
      {
        q: 'Can tile roof underlayment fail before the tiles do?',
        a: 'Yes, because the tile covering and the underlying waterproofing layer serve different functions and can age at different rates. A roof can retain many serviceable tiles while the underlayment requires attention.',
      },
      {
        q: 'Does a leaking tile roof always need new underlayment?',
        a: 'No, because leaks can also result from cracked tiles, flashing defects, blocked drainage, and improperly sealed roof penetrations. The source of the leak should be identified before the repair scope is determined.',
      },
      {
        q: 'Can old roof tiles be reused after underlayment replacement?',
        a: 'Often, yes, provided the tiles are in suitable condition and compatible replacement pieces are available when needed. The contractor should assess tile condition and explain the expected reuse and replacement allowances before work begins.',
      },
      {
        q: 'Is synthetic underlayment always better than felt?',
        a: 'Not necessarily, because product performance depends on the specific material, approved application, installation quality, and roof assembly. The appropriate choice should be based on the property’s requirements rather than the material category alone.',
      },
      {
        q: 'Does underlayment replacement require a permit in Los Angeles?',
        a: 'Permit requirements depend on the property’s jurisdiction and the proposed scope of work. Homeowners should confirm the applicable requirements with the relevant building department and contractor before work begins.',
      },
      {
        q: 'Should underlayment be inspected after every major storm?',
        a: 'Not every storm requires a professional roof inspection, but visible damage, new interior leaks, displaced tiles, or recurring water intrusion warrant prompt assessment, and an active leak calls for [emergency roof repair](/roof-repair/emergency/). Avoid walking on the roof or attempting to remove tiles to investigate a suspected problem.',
      },
    ],
    closing: {
      heading: 'Protect the Roof Beneath Your Tiles',
      blocks: [
        'The condition of your tile roof underlayment matters just as much as the appearance of the tiles above it.',
        'Recognizing warning signs, investigating recurring leaks, and documenting the condition of an aging roof can help homeowners plan repairs before water intrusion causes additional damage.',
        `Quality Roofing Specialists provides roofing services for residential properties in the Los Angeles area, including [roof inspections](/roof-inspection/), [tile roof repairs](${TILE}repair/), and [roof replacement](${TILE}replacement/).`,
        'If you are unsure about the condition of the waterproofing beneath your tiles, schedule a [free roof evaluation](#roof-check) to determine whether maintenance, targeted repairs, or underlayment replacement is appropriate.',
        '**[Contact Quality Roofing Specialists](/contact-us/) to discuss your tile roof and plan the next steps for protecting your home.**',
      ],
    },
    related: [`${TILE}lift-and-relay/`, `${TILE}repair/`, `${TILE}replacement/`, '/roof-inspection/'],
  },
];

// Posts search engines and AI assistants should know about
export const PUBLISHED_POSTS = BLOG_POSTS.filter((p) => !p.noindex);

// The newest published post (its heroImage, else its thumbnail, is the blog index's hero background)
export const LATEST_POST = [...PUBLISHED_POSTS].sort((a, b) => b.datePublished.localeCompare(a.datePublished))[0];
// The newest post that has a picture: the blog index's hero background (a new post without a picture yet doesn't blank it)
export const HERO_POST = [...PUBLISHED_POSTS].filter((p) => p.image).sort((a, b) => b.datePublished.localeCompare(a.datePublished))[0];

// A heading's anchor for the table of contents: "Southern California’s Rainy Season" → "southern-californias-rainy-season"
export const headingId = (heading) =>
  heading
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
