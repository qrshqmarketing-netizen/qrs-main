// QRS blog posts, newest first. Each post is a page at /blog/<slug>/ (components/templates/BlogPost.jsx).
// NOTE: the articles are now edited in the team dashboard at /admin/ (Supabase `posts` table, lib/postsStore.js). This file is the starting copy that
// the dashboard imports once, and the fallback the site uses when Supabase isn't configured or can't be reached. It also still defines the
// article shape below, and `headingId`.
// noindex: true keeps a post out of search results, the sitemap and the AI files (the blog index still shows it).
//
// Post shape:
//   slug, title (the H1), topics (what it covers, most important first: leak, repair, emergency, storm, insurance, maintenance,
//   inspection, replacement, restoration, tile, shingle, flat, metal, wood, underlayment, commercial, ventilation; service and city pages
//   show the articles whose topics match theirs, lib/articles.js), keyword (in the meta title, meta description, H1 and first 100 words), metaTitle,
//   metaDescription, datePublished, dateModified, author, excerpt (blog index card), image + imageAlt (the thumbnail,
//   in public/images/blog/), cardImage (optional: a stand-in picture for the cards only, until the post has its own image; remove it
//   when the image is added), heroImage (optional: the same photo without its title text, used as the blog index's hero
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
    slug: 'how-to-pay-for-a-new-roof',
    title: 'How to Pay for a New Roof When Money Is Tight',
    keyword: 'pay for a new roof',
    topics: ['replacement', 'repair', 'insurance', 'maintenance'],
    metaTitle: 'How to Pay for a New Roof When Money Is Tight',
    metaDescription:
      'Can’t afford to pay for a new roof right now? Repair first, financing, insurance, home repair programs and planning ahead, for Los Angeles homeowners.',
    datePublished: '2026-10-26',
    dateModified: '2026-10-26',
    excerpt:
      'A roof that needs work rarely arrives at a convenient time. Here are the realistic ways Los Angeles homeowners pay for a new roof, starting with finding out whether you need one yet.',
    // A stand-in picture for the blog cards until the article has its own (remove it then)
    cardImage: '/images/how-we-work-plain-english-homeowners.webp',
    intro: [
      'If you need to pay for a new roof and the money isn’t there right now, you have more options than it might seem, and the first one costs nothing: finding out whether you need a new roof yet.',
      'A roof that needs work rarely shows up at a convenient time. The good news is that many roof problems can be fixed with a targeted repair, and when a replacement is due, there are ways to spread the cost.',
      'This guide walks through the options in the order we’d suggest them to a homeowner in Los Angeles or Orange County, from a free look at the roof to financing, insurance and home repair programs.',
    ],
    sections: [
      {
        heading: 'Start by Finding Out What the Roof Really Needs',
        blocks: [
          'Before you look for money, make sure you know the size of the problem. A leak, a few missing shingles or a stain on the ceiling doesn’t automatically mean a new roof.',
          'A [free roof evaluation](/roof-inspection/) from QRS includes drone footage of the areas of concern and photos of what we find, explained in plain English, with one clear next step: repair, monitor, maintain or replace. Sometimes the honest answer is that the roof is fine for now, and we’ll say so.',
          'If work is needed, you get a written scope and price before anything starts. That written price is also what a lender or an insurer will want to see.',
        ],
      },
      {
        heading: 'Repair Now, Replace Later',
        blocks: [
          'When the wear is in one place, a targeted repair can fix the leak and buy time to plan and save for a replacement.',
          {
            list: [
              '**Leaks at a detail.** Most leaks start at a flashing, a vent boot, a valley or a cracked tile, and a [roof repair](/roof-repair/) fixes the cause without touching the rest of the roof.',
              '**Tile roofs with worn underlayment.** A [tile lift and relay](/residential-roofing/tile-roofing/lift-and-relay/) reuses your tiles over new underlayment, which usually costs less than a new tile roof.',
              '**A tune-up.** A handful of small issues can often be handled in one visit, such as resealing vents, pipes and flashings.',
            ],
          },
          'Repairs make sense while the rest of the roof still has life in it. When the wear is spread across the whole roof, more patching only delays the bill, and we’ll show you that in the photos.',
        ],
      },
      {
        heading: 'Financing a Roof Replacement',
        blocks: [
          'If a replacement is due, [roof financing](/roof-financing/) lets you spread the cost into monthly payments instead of paying all at once.',
          {
            list: [
              '**Who it’s through.** QRS works with Momnt Financing and Service Financing. Approval and terms depend on your credit and the lender.',
              '**What it covers.** Home roof replacements. It doesn’t cover repairs or commercial projects.',
              '**When to apply.** After you have the written scope and price, so you know exactly what you’re financing.',
            ],
          },
          'Compare the monthly payment with what repeated repairs and water damage would cost you over the same years. Read the terms before you sign, and ask the lender anything that isn’t clear.',
        ],
      },
      {
        heading: 'Check Whether Insurance Applies',
        blocks: [
          'Homeowners insurance usually pays for roof damage from a sudden, covered event, such as wind or a fallen tree limb, under the terms of your policy. It usually doesn’t pay for a roof that is simply old or worn.',
          'If a storm or another event caused the damage, photograph it, protect the roof from more water and report it to your insurer promptly. Our photos and written scope give you documentation to share with your adjuster. Our guide to [roof insurance claims in California](/blog/roof-insurance-claims-california/) walks through the process.',
        ],
      },
      {
        heading: 'Look Into Home Repair Assistance Programs',
        blocks: [
          'Some cities, counties and nonprofit groups run home repair programs, often for seniors, veterans, people with disabilities or lower-income homeowners. They come and go, and the rules differ from place to place.',
          {
            steps: [
              '**Ask your city or county housing department** whether it has a home repair or rehabilitation program, and who qualifies.',
              '**Ask before any work starts.** Programs usually have to approve the contractor and the scope first.',
              '**Keep your documents ready:** proof of ownership and income, and the roofer’s written scope and price.',
            ],
          },
        ],
      },
      {
        heading: 'Other Ways Homeowners Pay',
        blocks: [
          'Some homeowners use savings, a home equity loan or line of credit, or a personal loan from their own bank. Each has its own costs and risks, so compare the interest and terms, and talk to your bank or a financial adviser about what fits your situation.',
          { note: 'Be careful with anyone who knocks on your door after a storm and promises that insurance will pay for a new roof, or who asks for a large payment up front. Hire a licensed contractor, and get the scope and price in writing.' },
        ],
      },
      {
        heading: 'Plan Ahead So the Next Roof Isn’t a Surprise',
        blocks: [
          'The cheapest roof work is the work you catch early. Clear gutters and drains before the rainy season, have small problems fixed while they’re small, and keep dated photos of the roof.',
          'A [roof maintenance plan](/roof-maintenance-plans/) schedules those visits for you, with a photo report each time, so you can see a replacement coming years ahead and set money aside for it.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can I get a new roof with no money down?',
        a: 'It depends on the financing and your credit. The lenders we work with set their own terms, so ask them about any down payment once you have the written price. Before that, a free evaluation tells you whether a repair can solve the problem for less.',
      },
      {
        q: 'Are there government grants for a new roof?',
        a: 'Some cities, counties and nonprofits offer home repair help, usually for seniors, veterans or lower-income homeowners, and the programs change over time. Your city or county housing department is the place to ask.',
      },
      {
        q: 'Is it cheaper to repair or replace my roof?',
        a: 'A repair is cheaper up front and is the right call when the problem is in one place. When the wear is across the whole roof, repeated repairs can end up costing more than a replacement. The photos from a roof evaluation show which one you’re facing.',
      },
      {
        q: 'Does financing cover roof repairs?',
        a: 'Not through QRS. Financing through Momnt Financing or Service Financing is for home roof replacements, subject to credit approval. Repairs and commercial projects aren’t covered.',
      },
      {
        q: 'Will insurance pay for an old roof?',
        a: 'Usually not. Insurance generally covers damage from a sudden, covered event, not wear and age. Your insurer decides, based on your policy and what caused the damage.',
      },
    ],
    closing: {
      heading: 'Find Out Where You Stand First',
      blocks: [
        'You can’t plan how to pay for a roof until you know what it needs. Book a [free roof evaluation](#roof-check): you’ll get photos, a plain-English explanation and a clear next step, and if work makes sense, a written scope and price before anything starts. No pressure, no mystery pricing.',
        'Call [(310) 340-1643](tel:+13103401643) (Monday to Friday, 8 am to 6 pm) or [request your free evaluation](#roof-check).',
      ],
    },
    related: ['/roof-financing/', '/roof-repair/', '/roof-inspection/', '/roof-maintenance-plans/'],
  },
  {
    slug: 'shingle-granules-in-gutter',
    revision: 1, // meta title shortened for " | QRS" (owner, October 27 2026); `revision` copies it to the live copy once
    title: 'Granules in Your Gutter? What’s Normal and When to Call a Roofer',
    keyword: 'granules in your gutter',
    topics: ['shingle', 'maintenance', 'inspection', 'repair', 'replacement'],
    metaTitle: 'Granules in Your Gutter? Normal Wear or a Problem?',
    metaDescription:
      'Finding granules in your gutter? Learn what’s normal on a new roof, what signals wear, and how a roofer checks. Free drone evaluation in LA & OC.',
    datePublished: '2026-10-26',
    dateModified: '2026-10-26',
    excerpt:
      'A little grit in your gutter is usually normal, especially on a new roof. What matters is how old your roof is, whether the loss is even across the roof, and whether your shingles are showing bare spots.',
    image: '/images/blog/shingle-granules-in-gutter.webp',
    imageAlt: 'A roofer in gloves pointing at shingle granules collected in a rain gutter at the edge of an asphalt shingle roof',
    intro: [
      'A few granules in your gutter are usually normal, especially on a new roof. What matters is how old your roof is, whether the loss is even across the roof, and whether your shingles are showing bare spots.',
      'Those gritty, sand-like grains are granules from your asphalt shingles. Seeing them collect in a gutter or at the bottom of a downspout is one of the most common roofing worries homeowners have, and the answer is often calmer than the worry.',
      'This guide explains what’s normal, what isn’t, and how to tell the difference from the ground. If you’d rather have a roofer look for you, QRS offers a [free drone roof evaluation](/roof-inspection/) across Los Angeles and Orange County.',
    ],
    sections: [
      {
        heading: 'What Those Granules Actually Are',
        blocks: [
          'Granules are the small, mineral-coated grains pressed into the top of an asphalt shingle. They look like decoration, but they do the heavy lifting.',
          {
            list: [
              '**UV protection.** Granules shield the asphalt and the fiberglass mat underneath from the sun’s ultraviolet rays, which would otherwise break both down quickly.',
              '**Color.** They give the shingle its look, so heavy loss can show up as a changing roof color.',
              '**Fire resistance.** Some granules add a measure of fire protection to the surface.',
            ],
          },
          'In Southern California, where a [shingle roof](/residential-roofing/shingle-roofing/) gets strong sun most of the year, that UV shield is the part that matters most.',
        ],
      },
      {
        heading: 'On a New Roof, Granules in the Gutter Are Normal',
        blocks: [
          'If your roof is new or only a few years old, granules in the gutter are almost always excess granules from manufacturing, not a sign that something is wrong.',
          'Shingle makers apply extra granules during production so the asphalt is fully covered. Some of that excess isn’t firmly embedded. Manufacturers call these “hitchhiker” or “rider” granules, and they wash off with the first rains. IKO’s technical bulletin says this loss is normal and doesn’t reduce the shingle’s weatherproofing life. It becomes a concern only when bare spots of asphalt show on the surface.',
          'GAF’s technical bulletin says the same thing. Loss from excess granules is usually heaviest right after installation and tapers off over time. GAF often recommends waiting several months to see if it corrects itself, since in its experience it usually does.',
          'One more thing to rule out: granules in the gutter after a roof replacement can also come from the old roof that was just removed. Cleaning the gutters out and checking again after the next rain tells you whether the new roof is still shedding.',
          'GAF advises contacting the manufacturer’s warranty department if, several months after installation, the loss is still significant, the roof is visibly changing color, or the shingles show other damage.',
        ],
      },
      {
        heading: 'On an Older Roof, the Pattern Tells the Story',
        blocks: [
          'On a roof that’s been up for years, some granule loss is simply aging. Over time the bond between the granules and the asphalt weakens, and rain carries the loose ones away. InterNACHI, the home inspectors’ association, describes loss that is even across the whole roof as usually normal weathering rather than a defect.',
          'So the question isn’t “are there granules in the gutter?” It’s “how old is the roof, and what do the shingles look like?” How long shingles last depends on the shingle line, sun exposure, attic ventilation and installation quality, so the paperwork from your installation is the best guide to what’s normal for your roof.',
          'A few patterns to watch for:',
          {
            list: [
              '**Even loss across the roof.** Usually aging. Plan ahead, but it isn’t an emergency.',
              '**Loss on one slope.** InterNACHI notes that south- and west-facing slopes take the most sun, so they often wear first. That’s common in Southern California.',
              '**Loss along foot paths.** Scuffing from people walking the roof, or from other trades, can wear granules off in a trail.',
              '**Blistering with bare asphalt.** Blisters that have popped and exposed the asphalt speed up wear.',
            ],
          },
          'The rate of loss also depends on shingle quality and climate. A premium shingle in a mild climate and a budget shingle on a hot, sunny roof won’t age on the same schedule.',
        ],
      },
      {
        heading: 'Five Signs It’s More Than Normal Shedding',
        blocks: [
          'Granules in the gutter alone don’t mean much. These signs, taken together with your roof’s age, suggest it’s time to have someone look.',
          {
            steps: [
              '**Bare spots or exposed asphalt.** Once the dark asphalt shows through, that area has lost its sun protection. Both IKO and the Colorado Roofing Association name this as the line between normal shedding and a real concern.',
              '**Loss that keeps going.** A new roof should settle down over the first few months. If granules keep piling up well past that, or after every rain, have it checked.',
              '**Patchy loss.** One slope, one section, or a stripe that follows the shingle layout points to a cause worth finding, not just age.',
              '**A visible color change.** If the roof looks lighter, blotchy, or faded compared with when it was installed, granules are probably thinning.',
              '**Other damage.** Curling, cracking, blistering, or any leak inside the home makes granule loss more urgent.',
            ],
          },
          'None of these is a diagnosis on its own. They’re reasons to get a roofer’s eyes on it before the next rainy season.',
        ],
      },
      {
        heading: 'How to Check From the Ground',
        blocks: [
          'You can learn a lot without setting foot on the roof. Please don’t climb up yourself. Wet or sun-baked shingles are slippery, and walking on them can scuff off granules and make things worse.',
          {
            steps: [
              '**Look at the gutters and downspout outlets.** Note roughly how much grit is there and whether it’s mixed with dirt and leaves.',
              '**Clean them out and check again after the next rain.** If it fills back up fast, the roof is still shedding.',
              '**Stand back and look at the whole roof.** Is the color even? Are there lighter patches or one slope that looks different from the others?',
              '**Use binoculars on the south- and west-facing slopes.** Those take the most sun and usually show wear first.',
              '**Take photos.** A dated photo of the gutter and of each slope gives you something to compare against later, and something to show a roofer.',
            ],
          },
          'If you spot bare asphalt, patchy slopes, or color change, that’s the point to book an [inspection](/roof-inspection/).',
        ],
      },
      {
        heading: 'What Causes Granules to Wear Off Faster Than They Should',
        blocks: [
          'When loss is heavier than the roof’s age explains, one of these is usually behind it:',
          {
            list: [
              '**Sun and heat.** UV is the main long-term enemy of asphalt shingles, and hot, south- and west-facing slopes age faster than shaded ones.',
              '**Poor attic ventilation.** A hot, stuffy attic bakes shingles from below and shortens their life.',
              '**Foot traffic and cleaning.** Walking on the roof, pressure washing, and trades like gutter or solar crews can scuff granules loose.',
              '**Installation or batch problems.** Mixing shingles from different production batches can make parts of a roof weather at different rates, and InterNACHI describes patterns that follow the shingle layout.',
              '**Manufacturing defects.** Rare, but poor-quality asphalt or flaws in the process can weaken the bond early. This is the case manufacturer warranties are written for.',
              '**Hail and storms.** A major factor in many parts of the country, and less common in Los Angeles and Orange County, so it’s usually not the first suspect here.',
            ],
          },
          'The cause matters because it decides the fix: a ventilation problem needs ventilation, a damaged section needs a repair, and an aged roof needs a plan.',
        ],
      },
      {
        heading: 'What a Roofer Looks At',
        blocks: [
          'At QRS, a roofer looks at your roof before anyone tries to sell you one. For granule concerns, that means a look at the whole picture, not just the gutter:',
          {
            list: [
              '**Roof age and shingle type,** so we know what “normal” should look like.',
              '**Several slopes compared side by side,** including the sun-facing ones.',
              '**Bare asphalt, blistering, cracking, and curling,** up close, with drone footage of the areas of concern.',
              '**Flashings, vents, and penetrations,** where leaks usually start.',
              '**Ventilation and previous repairs,** which affect how fast shingles age.',
            ],
          },
          'You get photos of what we find, a plain-English explanation, and a clear next step: repair, monitor, maintain, or replace. If you move forward, you get a written scope and price before any work begins.',
          'The [drone roof evaluation](/roof-inspection/) is free. There’s also an optional $199 Roof Check, a tune-up where we seal the vents, pipes, and flashings as much as possible. There’s no deposit, you pay after the visit, and the $199 is credited toward a repair or replacement if you go ahead.',
        ],
      },
      {
        heading: 'Repair, Monitor, or Replace?',
        blocks: [
          'The right answer depends on how much granule loss there is, where it is, and how much life the roof has left.',
          {
            list: [
              '**Monitor** when the roof is new or fairly young, the loss is light and even, and there are no bare spots. Clean the gutters, take dated photos, and check again in a few months.',
              '**Repair** when the problem is limited to one area, such as a worn section, damaged shingles, or a leaking flashing. Matching and sealing replacement shingles works best when the rest of the roof still has life in it. See [roof repair](/roof-repair/).',
              '**Plan a replacement** when bare asphalt is widespread, the shingles are brittle or cracking, and the roof is near the end of its expected life. See [roof replacement](/roof-replacement/).',
            ],
          },
          { note: 'A note on coatings and sealants: they can slow further wear and add some temporary protection, but they don’t put lost granules back. They’re a stopgap, not a cure.' },
          'If replacement is the answer, you don’t have to rush it into an emergency. A free evaluation gives you a written price and a timeline you can plan around, and our [roof replacement cost guide](/blog/roof-replacement-cost-los-angeles/) explains what sets the price. [Financing](/roof-financing/) is available for qualifying home roof replacements through Momnt Financing or Service Financing, subject to credit approval. It doesn’t cover repairs or commercial projects.',
        ],
      },
      {
        heading: 'What About the Warranty?',
        blocks: [
          'There are two kinds of coverage, and they protect against different things.',
          {
            list: [
              '**The manufacturer’s warranty covers defects in the shingles.** GAF’s technical bulletin says its warranty covers manufacturing defects, and it doesn’t cover the changed look of light to moderate granule loss. Severe loss caused by a manufacturing defect may be covered under the terms of the limited warranty.',
              '**Workmanship coverage protects against installation problems.** QRS installs are backed by a 10-year workmanship warranty (call for details).',
            ],
          },
          'Every manufacturer’s terms are different, so read your own paperwork. If you think your granule loss is excessive on a roof that isn’t old, photos and your install date are the first things the manufacturer or your roofer will ask for.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is it normal to find granules in my gutter after a new roof?',
        a: 'Yes. Shingles are made with extra granules, and the loose ones wash off after installation. It should taper off over the first few months. If it doesn’t, or you see bare spots, have the roof checked.',
      },
      {
        q: 'How long does a new roof shed granules?',
        a: 'There’s no fixed date. Manufacturers say the loss is usually heaviest right after installation and gradually lessens, and GAF suggests waiting several months before judging whether it has settled.',
      },
      {
        q: 'Can I clean the granules out myself?',
        a: 'Yes. Scoop them out of the gutter, check that the downspout isn’t clogged, and bag them with your trash. Use a stable ladder, or hire someone if you’re not comfortable on one. Don’t walk on the roof.',
      },
      {
        q: 'Do granules in the gutter mean I need a new roof?',
        a: 'Not by themselves. A new roof is on the table when granule loss comes with bare asphalt, patchy slopes, cracking or curling, and a roof that’s near the end of its life. A roofer can tell you which situation you’re in.',
      },
      {
        q: 'Will shingles that lost granules leak?',
        a: 'Not immediately. But once the asphalt is exposed to the sun, it dries out, cracks, and curls faster, and that’s when leaks become more likely. Leaks also tend to start at flashings, vents, and penetrations, so those are worth checking at the same time.',
      },
      {
        q: 'Does insurance cover granule loss?',
        a: 'InterNACHI notes that long-term, even granule loss is generally treated as normal aging rather than functional damage, unless shingles appear to be failing prematurely. Storm damage is evaluated separately and case by case. Our photos and written scope give you clear documentation to share with your insurance company.',
      },
    ],
    closing: {
      heading: 'Not Sure What Your Roof Is Telling You?',
      blocks: [
        'A roofer should look before anyone tries to sell you a roof. Book a [free drone roof evaluation](#roof-check) and you’ll get photos of what we find, a plain-English explanation, and a clear next step. If a repair or replacement makes sense, you’ll have a written scope and price before any work starts. No pressure, no mystery pricing.',
        'Call [(310) 340-1643](tel:+13103401643) (Monday to Friday, 8 am to 6 pm) or [request your free evaluation](#roof-check).',
        'Quality Roofing Specialists is a licensed, bonded, and insured California contractor, CSLB #1061942, serving Los Angeles and Orange County.',
        { h3: 'Sources' },
        {
          list: [
            '[IKO, “Excess Roofing Granules on Shingles” (technical bulletin)](https://iko.com/na/document/tbr02-excess-roofing-granules-on-shingles-product-bulletin)',
            '[GAF, “Granule Loss on New Shingles,” Technical Advisory TAB-R-112](https://www.inspectapedia.com/roof/Granule-Loss-on-New-Shingles-GAF.pdf)',
            '[InterNACHI, “Mastering Roof Inspections: Asphalt Composition Shingles, Part 34”](https://www.nachi.org/asphalt-comp-shingles-part34-88.htm)',
            '[Colorado Roofing Association, “Is It Normal for a New Roof to Lose Granules?”](https://www.coloradoroofing.org/news/granule-loss-on-new-asphalt-roof)',
          ],
        },
      ],
    },
    related: ['/residential-roofing/shingle-roofing/', '/roof-inspection/', '/roof-repair/', '/roof-replacement/'],
  },
  {
    slug: 'asphalt-shingle-vs-tile-roof',
    title: 'Asphalt Shingle vs. Tile Roof: Cost, Weight and Upkeep in Los Angeles',
    keyword: 'shingle vs. tile roof',
    topics: ['replacement', 'shingle', 'tile', 'underlayment'],
    metaTitle: 'Shingle vs. Tile Roof: Which Is Right for Your Home?',
    metaDescription:
      'Shingle vs. tile roof for a Los Angeles home: how cost, weight, aging, fire rating and upkeep compare, and which homes each roof suits best.',
    datePublished: '2026-10-13',
    dateModified: '2026-10-16',
    // No prices in this article (owner, October 16 2026): cost is described in general terms. `revision` copies this text over the live
    // copy in Supabase once (lib/postsStore.js applyFileRevisions); raise it after the next change made here.
    revision: 2,
    excerpt:
      'Asphalt shingles and tile are the two roofs you see most across Los Angeles. Here is how they compare on cost, weight, aging, fire rating and upkeep, and how to tell which one your home is built for.',
    image: '/images/blog/asphalt-shingle-vs-tile-roof.webp',
    imageAlt: 'Side by side: a gray asphalt shingle roof in Granada Hills and a new clay tile roof in Mid-Wilshire, both QRS projects',
    intro: [
      'Shingle vs. tile roof is the first choice many Los Angeles homeowners face when a roof needs replacing. You see asphalt shingles on many ranch homes and newer houses, and clay and concrete tile on Spanish Revival and Mediterranean homes across the city.',
      'Both can make a sound roof. They differ in cost, weight, how they age and what they need over the years. This guide compares them side by side and helps you see which one your home is built for.',
    ],
    sections: [
      {
        heading: 'Shingle vs. Tile at a Glance',
        blocks: [
          {
            table: {
              head: ['Compare', 'Asphalt shingle', 'Tile (clay or concrete)'],
              rows: [
                ['Up-front cost', 'The lower of the two', 'Higher: costlier material, more weight and more labor'],
                ['Weight per square (100 sq ft)', 'About 200 to 350 lbs', 'About 600 to 1,100 lbs'],
                ['How it ages', 'The shingles wear out: the sun breaks down the asphalt and the granules wash off', 'The tiles can last for decades; the underlayment under them wears out first'],
                ['Fire rating', 'Most are Class A', 'Class A'],
                ['Walking on it', 'Easy for a roofer to work on', 'Tiles can crack underfoot'],
                ['Look', 'Many colors, dimensional or flat', 'Spanish, Mediterranean and many other profiles'],
              ],
            },
          },
        ],
      },
      {
        heading: 'Cost: Tile Costs More Up Front',
        blocks: [
          'A new tile roof costs noticeably more up front than an asphalt shingle roof on the same home. The tiles themselves cost more, they are heavier to carry up and set, and the work takes longer.',
          'Every roof is priced on its own. Its size, pitch and height, the layers coming off, the condition of the deck and the details around chimneys, skylights and vents all change the number. That is why a roofer looks at your roof first and you get a written scope and price before any work starts.',
          'A tile roof whose tiles are still sound often doesn’t need new tile at all. A [tile lift and relay](/residential-roofing/tile-roofing/lift-and-relay/) replaces the underlayment and puts your own tiles back, and it usually costs less than a new tile roof. See our full guide to [roof replacement cost](/blog/roof-replacement-cost-los-angeles/).',
        ],
      },
      {
        heading: 'Weight: Tile Needs a Roof Built for It',
        blocks: [
          'Tile weighs several times as much as asphalt shingles. A home designed for tile has framing sized for that load; a home built for shingles may not.',
          { note: '**Switching from shingles to tile?** The framing has to be checked first, and it may need reinforcing. Going the other way, from tile to shingles, takes weight off the roof.' },
        ],
      },
      {
        heading: 'How Each Roof Ages',
        blocks: [
          { h3: 'Asphalt shingles' },
          'Southern California sun breaks down the asphalt a little every summer. The granules that shield it wash off, and the shingles turn brittle, then curl or cup. Once that wear is across the whole roof, it is time for a [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/). Balanced attic ventilation helps shingles last, because heat trapped in the attic shortens their life.',
          { h3: 'Tile' },
          'Clay and concrete tile can protect a home for decades, but the tiles are not what keeps water out on their own. The underlayment beneath them does most of that work, and it dries out and cracks well before the tile does. Our guide to [tile roof underlayment](/blog/tile-roof-underlayment/) explains the signs.',
        ],
      },
      {
        heading: 'Fire, Wind and Upkeep',
        blocks: [
          {
            list: [
              '**Fire.** Tile is Class A, and so are most fiberglass asphalt shingles. Either way, vents and the open ends of tile at the eaves matter as much as the covering. See [fire-resistant roofs](/blog/wildfire-resistant-roof-los-angeles/).',
              '**Wind.** Strong Santa Ana winds can lift shingles whose seal has broken, and can loosen tiles that are not fastened well.',
              '**Upkeep on shingles.** Replace lifted or missing shingles and cracked pipe boots, and keep valleys clear.',
              '**Upkeep on tile.** Reset slipped tiles, replace cracked ones and plan for new underlayment as the roof ages.',
            ],
          },
        ],
      },
      {
        heading: 'Which Is Right for Your Home?',
        blocks: [
          {
            table: {
              head: ['Option', 'Best when', 'Keep in mind'],
              rows: [
                ['Asphalt shingle', 'The home was built for shingles and you want a sound roof for the lowest cost', 'It will need replacing sooner than the tiles on a tile roof'],
                ['New tile roof', 'The home was built for tile, or its style calls for it', 'Higher cost, and the framing must carry the weight'],
                ['Tile lift and relay', 'You have tile, the tiles are sound and the underlayment has failed', 'Only works when the tiles can be reused'],
              ],
            },
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Is a tile roof more expensive than shingles?',
        a: 'Yes. A new tile roof usually costs noticeably more up front than asphalt shingles on the same home. If your tiles are still sound, a tile lift and relay usually costs less than new tile. The written price you get after a free roof evaluation is the number to plan around.',
      },
      {
        q: 'Can I put a tile roof on a house that had shingles?',
        a: 'Sometimes. Tile is several times heavier than shingles, so the roof framing has to be checked first and may need reinforcing.',
      },
      {
        q: 'Which lasts longer, tile or shingles?',
        a: 'The tiles themselves outlast asphalt shingles, but the underlayment beneath tile wears out much sooner than the tile does, so a tile roof needs that layer renewed during its life.',
      },
      {
        q: 'Can I replace a tile roof with shingles?',
        a: 'Yes. It takes weight off the roof and costs less, though it changes the look of the home. Check any HOA rules first.',
      },
    ],
    closing: {
      heading: 'Not Sure Which Your Roof Needs?',
      blocks: [
        '[Book a free roof evaluation](/contact-us/). A roofer looks at your roof, explains your options in plain English and gives you a written scope and price before any work.',
      ],
    },
    related: ['/residential-roofing/shingle-roofing/replacement/', '/residential-roofing/tile-roofing/replacement/', '/residential-roofing/tile-roofing/lift-and-relay/'],
  },
  {
    slug: 'tile-lift-and-relay-vs-new-tile-roof',
    title: 'Tile Lift and Relay vs. a New Tile Roof: Which Does Your Roof Need?',
    keyword: 'tile lift and relay',
    topics: ['tile', 'underlayment', 'restoration', 'repair', 'replacement', 'leak'],
    metaTitle: 'Tile Lift and Relay vs. a New Tile Roof',
    metaDescription:
      'Tile lift and relay or a new tile roof? How each works, what each costs per square foot and the signs that point to one or the other.',
    datePublished: '2026-10-13',
    dateModified: '2026-10-22',
    // No prices in this article (owner, October 22 2026): cost is described in general terms. `revision` copies this text over the live
    // copy in Supabase once (lib/postsStore.js applyFileRevisions); raise it after the next change made here.
    revision: 1,
    excerpt:
      'When a tile roof leaks, the tiles are often fine and the underlayment beneath them is not. Here is how a lift and relay compares with a new tile roof, and how to tell which one your roof needs.',
    image: '/images/blog/tile-lift-and-relay-vs-new-tile-roof.webp',
    imageAlt: 'Side by side: clay tiles stacked on a roof during a tile lift and relay, and a finished clay tile roof seen from above',
    intro: [
      'A tile lift and relay and a new tile roof both end with a tile roof that keeps water out. The difference is what happens to your tiles: a relay lifts them off, renews the layers underneath and puts the same tiles back, while a new roof replaces the tiles too.',
      'This guide compares the two, with prices, the signs that point to each and the questions to ask.',
    ],
    sections: [
      {
        heading: 'Lift and Relay vs. New Tile Roof at a Glance',
        blocks: [
          {
            table: {
              head: ['Compare', 'Tile lift and relay', 'New tile roof'],
              rows: [
                ['What happens to the tiles', 'Your tiles come off by hand and go back in their pattern; only cracked or broken ones are replaced', 'New tile throughout'],
                ['Underlayment, battens and flashings', 'Renewed', 'Renewed'],
                ['Cost', 'Lower: you pay for labor and underlayment, not new tile', 'Higher: new tile plus the labor to lay it'],
                ['Look afterward', 'The same roof, with its original tile', 'A new look, in the profile and color you choose'],
                ['Best for', 'Sound tiles over failed underlayment', 'Worn, brittle or mismatched tile, or a new look'],
              ],
            },
          },
        ],
      },
      {
        heading: 'Why Tile Roofs Leak When the Tiles Look Fine',
        blocks: [
          'Clay and concrete tiles can last for decades, but the underlayment that actually keeps water out wears out much sooner. After years of Southern California heat it dries out and cracks, and water that slips past the tiles has nowhere to go but into the deck.',
          'That is why a leak on a tile roof often has no broken tile above it, and why patching tiles does not stop it. Our guide to [tile roof underlayment](/blog/tile-roof-underlayment/) walks through the signs.',
        ],
      },
      {
        heading: 'How a Tile Lift and Relay Works',
        blocks: [
          {
            steps: [
              'A roofer inspects the roof and photographs the underlayment wherever it can be seen, the tiles, the valleys and the flashings.',
              'The tiles come off by hand and are stacked with care. Older tiles sometimes break anyway, so matching replacements are planned from the start.',
              'New underlayment goes down across the roof, and worn battens, flashings and valley metal are renewed as the written scope calls for.',
              'The same tiles go back in their original pattern, with cracked or broken ones replaced by the closest available match.',
            ],
          },
          'At QRS this is our *SecondLife* Tile Reset. Where a match is not exact, replacement tiles can go on less visible slopes, so the originals stay where people see them.',
        ],
      },
      {
        heading: 'When a New Tile Roof Makes More Sense',
        blocks: [
          {
            list: [
              '**The tiles themselves are worn.** Concrete tile can turn brittle and porous as its surface wears away, and clay can crack after years of foot traffic and shaking.',
              '**Too many tiles are broken or mismatched** from years of repairs.',
              '**You want a different look,** profile or color.',
              '**The deck or framing needs major work** that a relay would not cover.',
            ],
          },
          'See [tile roof replacement](/residential-roofing/tile-roofing/replacement/) for how a new tile roof is built.',
        ],
      },
      {
        heading: 'Which Does Your Roof Need?',
        blocks: [
          {
            table: {
              head: ['Option', 'Best when', 'What it involves'],
              rows: [
                ['Tile repair', 'One area leaks and the underlayment is otherwise sound', 'Fixing the failed spot: slipped or cracked tiles, a flashing, a valley'],
                ['Tile lift and relay', 'The tiles are sound but the underlayment has failed across the roof', 'Lifting the tiles, renewing the layers underneath and resetting the same tiles'],
                ['New tile roof', 'The tiles are worn out, or you want a new look', 'A full tear-off and a new tile roof system'],
              ],
            },
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Is a lift and relay cheaper than a new tile roof?',
        a: 'Usually, because the tiles are reused: you pay for labor and underlayment rather than new tile. Your written scope shows the price before any work.',
      },
      {
        q: 'Will my roof look the same after a lift and relay?',
        a: 'That is the point of a relay. Your tiles are reused wherever they are sound, and broken ones are replaced with the closest available match.',
      },
      {
        q: 'How do I know if my tile roof needs a lift and relay?',
        a: 'Common signs are leaks with no visibly broken tiles, ceiling stains after heavy rain, repeated repairs in different spots and underlayment that is brittle or torn where it can be seen. A roof inspection confirms it with photos.',
      },
      {
        q: 'Can concrete tiles be reused in a lift and relay?',
        a: 'Often, yes, as long as they are still sound. Concrete tile whose surface has worn brittle and porous is a reason to consider a new tile roof instead.',
      },
    ],
    closing: {
      heading: 'Find Out What Your Tile Roof Needs',
      blocks: [
        '[Book a free roof evaluation](/contact-us/). A roofer checks the underlayment, flashings and tiles, shows you the photos and gives you a written scope and price before any work.',
      ],
    },
    related: ['/residential-roofing/tile-roofing/lift-and-relay/', '/residential-roofing/tile-roofing/replacement/', '/residential-roofing/tile-roofing/repair/'],
  },
  {
    slug: 'clay-vs-concrete-tile-roof',
    title: 'Clay vs. Concrete Tile Roofs: How They Differ and Which to Choose',
    keyword: 'clay vs. concrete tile',
    topics: ['tile', 'replacement', 'underlayment', 'repair'],
    metaTitle: 'Clay vs. Concrete Tile Roofs: Key Differences',
    metaDescription:
      'Clay vs. concrete tile for a Southern California roof: what each is made of, weight, color, how they age and how to tell which you have.',
    datePublished: '2026-10-13',
    dateModified: '2026-10-13',
    excerpt:
      'Clay and concrete tile can look alike from the street, but they are made differently, weigh differently and age differently. Here is how to tell them apart and which one suits your home.',
    image: '/images/blog/clay-vs-concrete-tile-roof.webp',
    imageAlt: 'Illustration: orange clay barrel tiles beside gray flat concrete roof tiles',
    intro: [
      'Clay vs. concrete tile is a choice most tile roof owners in Southern California face sooner or later, whether they are replacing a roof or just matching a few broken pieces. From the street the two can look alike, but they are made from different materials and behave differently on a roof.',
      'This guide explains the differences, how to tell which you have and what to weigh when you choose.',
    ],
    sections: [
      {
        heading: 'Clay vs. Concrete Tile at a Glance',
        blocks: [
          {
            table: {
              head: ['Compare', 'Clay tile', 'Concrete tile'],
              rows: [
                ['What it is', 'Natural clay, shaped and fired in a kiln', 'Sand, cement and water, molded and cured'],
                ['Weight per square (100 sq ft)', 'About 600 to 950 lbs', 'About 820 to 1,100 lbs'],
                ['Color', 'Fired into the clay, holds its color', 'Mixed in or on the surface, can fade over time'],
                ['Water absorption', 'Lower', 'Higher, so it can stain or grow moss in shade'],
                ['Profiles', 'Barrel (Spanish), S and flat', 'Many, including looks that copy clay, slate and wood shake'],
                ['Cost', 'Usually more', 'Usually less'],
              ],
            },
          },
        ],
      },
      {
        heading: 'How to Tell Which Tile You Have',
        blocks: [
          {
            list: [
              '**Look at a broken edge.** Clay is one fired color all the way through. Concrete shows gray cement and sand inside, even when the surface is colored.',
              '**Look at the surface.** Clay stays smooth and keeps its color. Older concrete tile often looks rough or sandy, with faded color.',
              '**Check the age and style of the home.** Many older Spanish Revival homes have clay tile; many newer tract homes have concrete.',
              '**Ask a roofer.** A roof inspection identifies the tile and its condition, with photos.',
            ],
          },
          { note: '**Stay off the roof.** Tiles of both kinds crack underfoot, and a wet tile roof is slippery.' },
        ],
      },
      {
        heading: 'How Clay and Concrete Tile Age',
        blocks: [
          'Both can protect a home for decades. Clay holds its color and surface well. Concrete tile can turn brittle and porous as its surface wears away, which is one reason older concrete roofs sometimes need new tile rather than a reset.',
          'With either one, the underlayment beneath the tile wears out well before the tile itself. Our guide to [tile roof underlayment](/blog/tile-roof-underlayment/) explains why, and a [tile lift and relay](/residential-roofing/tile-roofing/lift-and-relay/) renews it while keeping sound tiles.',
        ],
      },
      {
        heading: 'Weight Matters When You Switch',
        blocks: [
          'Concrete tile is generally heavier than clay. Replacing clay with concrete, or putting tile on a home built for shingles, means the framing has to be checked first and may need reinforcing.',
        ],
      },
      {
        heading: 'Matching Tiles for Repairs',
        blocks: [
          'Matching an older tile, especially a clay tile whose color has aged, can take some searching. Salvaged or close-match tiles can go on less visible slopes, so the original tiles stay where people see them. See [tile roof repair](/residential-roofing/tile-roofing/repair/).',
        ],
      },
      {
        heading: 'Which Should You Choose?',
        blocks: [
          {
            table: {
              head: ['Option', 'Best when', 'Keep in mind'],
              rows: [
                ['Clay tile', 'The home’s style calls for it, or you want color that holds', 'Usually costs more; matching aged clay takes care'],
                ['Concrete tile', 'You want a tile roof at a lower cost, or a profile clay does not come in', 'Heavier, and its color and surface can wear'],
                ['Keep your tiles (lift and relay)', 'Your existing tiles are still sound', 'Only works when the tiles can be reused'],
              ],
            },
          },
          'QRS installs [concrete tile](/residential-roofing/tile-roofing/concrete/) and clay tile roofs, and [slate tile](/residential-roofing/tile-roofing/slate/), across Los Angeles and Orange County.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Which is better, clay or concrete tile?',
        a: 'Neither is better for every home. Clay holds its color and is generally lighter; concrete usually costs less and comes in more profiles but is heavier and can fade. The home’s style, framing and budget decide it.',
      },
      {
        q: 'Is concrete tile heavier than clay?',
        a: 'Generally, yes: about 820 to 1,100 pounds per 100 square feet for concrete against about 600 to 950 for clay, depending on the profile.',
      },
      {
        q: 'Can I replace a few clay tiles with concrete ones?',
        a: 'It is better to match the material and profile. A close match placed on a less visible slope keeps the roof looking right and sheds water the same way.',
      },
      {
        q: 'How do I know if my roof is clay or concrete tile?',
        a: 'A broken edge tells you: clay is one fired color all the way through, while concrete shows gray cement and sand inside. A roof inspection confirms it.',
      },
    ],
    closing: {
      heading: 'Get Your Tile Roof Checked',
      blocks: [
        '[Book a free roof evaluation](/contact-us/). A roofer identifies your tile, checks it and the underlayment, and gives you a written scope and price before any work.',
      ],
    },
    related: ['/residential-roofing/tile-roofing/', '/residential-roofing/tile-roofing/concrete/', '/residential-roofing/tile-roofing/lift-and-relay/'],
  },
  {
    slug: 'metal-roof-vs-shingles',
    title: 'Metal Roof vs. Shingles: What Los Angeles Homeowners Should Know',
    keyword: 'metal roof vs. shingles',
    topics: ['metal', 'shingle', 'replacement'],
    metaTitle: 'Metal Roof vs. Shingles: Pros and Cons for LA Homes',
    metaDescription:
      'Metal roof vs. shingles for a Los Angeles home: cost, weight, fire, heat, noise, repairs and looks, and when standing seam metal is worth it.',
    datePublished: '2026-10-13',
    dateModified: '2026-10-22',
    // No prices in this article (owner, October 22 2026): cost is described in general terms. `revision` copies this text over the live
    // copy in Supabase once (lib/postsStore.js applyFileRevisions); raise it after the next change made here.
    revision: 1,
    excerpt:
      'Standing seam metal is showing up on more Los Angeles homes. Here is how it compares with asphalt shingles on cost, weight, fire, heat, noise and repairs, and when it is worth it.',
    image: '/images/blog/metal-roof-vs-shingles.webp',
    imageAlt: 'Illustration: dark asphalt shingles beside a dark standing seam metal roof with raised seams',
    intro: [
      'Metal roof vs. shingles is a question we hear more often in Los Angeles, especially from homeowners near brush and canyons and from those building ADUs and modern additions. Asphalt shingles remain the most common roof on homes here; standing seam metal costs more but brings a different set of strengths.',
      'This guide compares the two on what matters most for a home in Southern California.',
    ],
    sections: [
      {
        heading: 'Metal vs. Shingles at a Glance',
        blocks: [
          {
            table: {
              head: ['Compare', 'Asphalt shingles', 'Standing seam metal'],
              rows: [
                ['Cost', 'Lower', 'Higher up front'],
                ['Weight', 'About 200 to 350 lbs per square', 'Lighter than shingles'],
                ['Fire', 'Most are Class A', 'The panels are noncombustible'],
                ['Heat', 'Cool-rated shingles are available', 'Reflective finishes suited to Southern California heat'],
                ['Fasteners', 'Nailed under the course above', 'Hidden under the seams, held by clips'],
                ['Repairs', 'Simple: replace the damaged shingles', 'Panels and trims need matching, specialized work'],
                ['Look', 'Familiar, many colors', 'Clean, modern lines'],
              ],
            },
          },
        ],
      },
      {
        heading: 'How Standing Seam Works',
        blocks: [
          'Standing seam metal uses long panels that run from ridge to eave, joined along seams that stand up above the flat of each panel. Concealed clips under those seams hold everything down, so no screws pierce the face of the metal. The clips also let each panel expand in the afternoon sun and contract at night without working fasteners loose.',
          'QRS installs standing seam as our *LockSeam* Metal System. See [standing seam metal roofing](/residential-roofing/metal-roofing/standing-seam/).',
        ],
      },
      {
        heading: 'Where Metal Stands Out',
        blocks: [
          {
            list: [
              '**Fire.** The panels themselves won’t burn, a real consideration for homes near brush, hillsides and canyons. See [fire-resistant roofs](/blog/wildfire-resistant-roof-los-angeles/).',
              '**Heat.** Reflective finishes help keep the roof cooler in the sun.',
              '**Fewer openings.** With the fasteners hidden under the seams, there are fewer places for water to get in.',
              '**Small roofs and additions.** Standing seam is common on porch roofs, patio covers and ADUs.',
            ],
          },
        ],
      },
      {
        heading: 'Where Shingles Win',
        blocks: [
          {
            list: [
              '**Cost.** Shingles cost less up front.',
              '**Repairs.** A damaged shingle is simple to replace; metal panels and trims take matching and specialized work.',
              '**Familiar look.** Shingles suit most traditional homes and neighborhoods.',
            ],
          },
          'See [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/) for how a new shingle roof is built.',
        ],
      },
      {
        heading: 'Is a Metal Roof Noisy?',
        blocks: [
          'Not usually on a home. Over a solid deck with underlayment and an insulated attic, rain on metal sounds much like rain on other roofs. The drumming people remember comes from panels over open framing, like a barn or a metal patio cover.',
        ],
      },
      {
        heading: 'How Long Does Each Last?',
        blocks: [
          'Metal roofs are known for long service lives, but we won’t promise you a number of years. How long a roof lasts depends on the material and finish, the sun and salt air it faces, how well it is ventilated and how it is installed. Asphalt shingles age faster in Southern California sun as the asphalt breaks down and the granules wash off.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is a metal roof better than shingles?',
        a: 'It depends on the home. Metal brings noncombustible panels, hidden fasteners and a modern look at a higher cost; shingles cost less and are simpler to repair. Homes near brush and canyons, and modern designs, often lean toward metal.',
      },
      {
        q: 'Does a metal roof cost more than shingles?',
        a: 'Yes, up front. Shingles are the lower-cost roof to install; a standing seam roof is priced from a roof evaluation and a written scope.',
      },
      {
        q: 'Is a metal roof noisy in the rain?',
        a: 'Not usually on a home. Over a solid deck with underlayment and an insulated attic, rain sounds much like it does on other roofs.',
      },
      {
        q: 'What is oil-canning on a metal roof?',
        a: 'A slight waviness that can appear in the flat part of metal panels, most visible in low light. It is cosmetic and does not change how the roof keeps water out.',
      },
    ],
    closing: {
      heading: 'Talk Through Your Options',
      blocks: [
        '[Book a free roof evaluation](/contact-us/). A roofer looks at your roof, slope and exposure and gives you a written scope and price for the roof you choose.',
      ],
    },
    related: ['/residential-roofing/metal-roofing/', '/residential-roofing/metal-roofing/standing-seam/', '/residential-roofing/shingle-roofing/replacement/'],
  },
  {
    slug: 'architectural-vs-3-tab-shingles',
    title: 'Architectural vs. 3-Tab Shingles: The Difference and Which to Choose',
    keyword: 'architectural vs. 3-tab shingles',
    topics: ['shingle', 'replacement', 'repair', 'storm'],
    metaTitle: 'Architectural vs. 3-Tab Shingles: Which to Choose',
    metaDescription:
      'Architectural vs. 3-tab shingles: how they are made and look, weight, wind resistance, cost and repairs, and which to choose for a new roof.',
    datePublished: '2026-10-13',
    dateModified: '2026-10-13',
    excerpt:
      'Architectural and 3-tab shingles are both asphalt, but they are built differently. Here is how they compare on looks, weight, wind and cost, and what it means when you repair or replace a shingle roof.',
    image: '/images/blog/architectural-vs-3-tab-shingles.webp',
    imageAlt: 'Illustration: flat, even 3-tab shingles beside layered, dimensional architectural shingles',
    intro: [
      'Architectural vs. 3-tab shingles is the main choice within asphalt shingles. Both are made from the same basic materials, but a 3-tab shingle is one flat layer cut into three tabs, while an architectural shingle is two or more layers bonded together for a thicker, dimensional look.',
      'Here is how they compare, and what the difference means when you repair or replace a shingle roof.',
    ],
    sections: [
      {
        heading: 'Architectural vs. 3-Tab at a Glance',
        blocks: [
          {
            table: {
              head: ['Compare', '3-tab shingles', 'Architectural shingles'],
              rows: [
                ['How it is made', 'One flat layer with three tabs', 'Two or more layers laminated together'],
                ['Look', 'Flat and uniform', 'Dimensional, with shadow lines'],
                ['Weight per square', 'About 200 to 240 lbs', 'About 240 to 320 lbs or more'],
                ['Wind resistance', 'Generally lower ratings', 'Generally higher ratings'],
                ['Cost', 'Less per square', 'A little more per square'],
                ['Availability', 'Fewer product lines today', 'The standard on most new roofs'],
              ],
            },
          },
        ],
      },
      {
        heading: 'How They Look on the Roof',
        blocks: [
          'A 3-tab roof shows neat, even rows of identical tabs. An architectural roof has tabs of different widths and layers that cast shadow lines, so it reads as more textured, closer to wood shake or slate from the street. Most homeowners choosing a new roof today pick architectural shingles for that look.',
        ],
      },
      {
        heading: 'Wind and Weather',
        blocks: [
          'Because it is thicker and heavier, an architectural shingle generally carries a higher wind rating than a 3-tab shingle. Wind ratings depend on the specific product and how it is installed, so check the rating of the shingle line in your scope. Strong Santa Ana winds can lift shingles whose seal has broken; see [roof storm damage](/blog/roof-storm-damage-signs/).',
        ],
      },
      {
        heading: 'Repairs on an Older 3-Tab Roof',
        blocks: [
          'Many older Los Angeles homes still have 3-tab shingles. A repair needs shingles that match in shape and color, and with fewer 3-tab lines made today, a close match can take some searching. When a 3-tab roof is worn across the whole surface, replacing it is usually the better spend. See [shingle roof repair](/residential-roofing/shingle-roofing/repair/).',
        ],
      },
      {
        heading: 'Warranties',
        blocks: [
          'Manufacturers offer different warranties for different shingle lines and warranty tiers, so compare what each one covers. That is separate from the roofer’s workmanship warranty: QRS backs its installs with a 10-year workmanship warranty (call for details).',
        ],
      },
      {
        heading: 'Which Should You Choose?',
        blocks: [
          'For a new roof, architectural shingles are the usual choice: the look most homeowners want, generally better wind resistance and the widest choice of colors, for a little more per square. Our *TotalShield* Shingle System is the whole roof, not just the shingles: a full tear-off, a deck check, underlayment, flashings and balanced attic ventilation. See [shingle roof replacement](/residential-roofing/shingle-roofing/replacement/).',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is the difference between architectural and 3-tab shingles?',
        a: 'A 3-tab shingle is one flat layer cut into three tabs. An architectural shingle is two or more layers bonded together, so it is thicker, heavier and has a dimensional look.',
      },
      {
        q: 'Are architectural shingles worth the extra cost?',
        a: 'For most new roofs, yes. They cost a little more per square, and in return you get the dimensional look, generally higher wind ratings and the widest choice of colors.',
      },
      {
        q: 'Can I repair a 3-tab roof with architectural shingles?',
        a: 'It is better to match the existing shingle. A repair with a different shingle can look out of place and may not seal into the rows around it the same way.',
      },
      {
        q: 'How long does a shingle roof replacement take?',
        a: 'Most home roof replacements take 3 to 5 days, depending on the roof’s size, any decking repairs and the weather.',
      },
    ],
    closing: {
      heading: 'Planning a New Shingle Roof?',
      blocks: [
        '[Book a free roof evaluation](/contact-us/). A roofer checks your roof, helps you choose the shingle style and color and gives you a written scope and price before any work.',
      ],
    },
    related: ['/residential-roofing/shingle-roofing/replacement/', '/residential-roofing/shingle-roofing/repair/', '/residential-roofing/shingle-roofing/'],
  },
  {
    slug: 'roof-replacement-cost-los-angeles',
    title: 'Roof Replacement Cost in Los Angeles: What Sets the Price',
    keyword: 'roof replacement cost',
    topics: ['replacement', 'shingle', 'tile', 'flat', 'restoration'],
    metaTitle: 'Roof Replacement Cost in Los Angeles, Explained',
    metaDescription:
      'Roof replacement cost in Los Angeles: how roof type, size, pitch and the deck shape the price, why your roof isn’t your square footage, and how to compare bids.',
    datePublished: '2026-10-13',
    dateModified: '2026-10-22',
    // No prices in this article (owner, October 22 2026): cost is described in general terms, as in the shingle vs. tile article; the exact
    // figure comes from the free roof evaluation. `revision` copies this text over the live copy in Supabase once (lib/postsStore.js
    // applyFileRevisions); raise it after the next change made here.
    revision: 3, // meta title shortened for " | QRS" (owner, October 27 2026); `revision` copies it to the live copy once
    excerpt:
      'What shapes the cost of a new roof in Los Angeles: how each roof type compares, how roofers measure a roof, what moves the price and how to compare bids line by line.',
    cardImage: '/images/shingle-roof-replacement-tear-off-drone-view.webp',
    intro: [
      'Roof replacement cost in Los Angeles depends mostly on three things: the size of the roof, the roof type and how hard the roof is to work on. Roofers price by the square foot of roof surface, or by the square, which is 100 square feet.',
      'This guide explains how those pieces come together, why your roof’s size is not your home’s square footage, what moves the price up or down and what to check when you compare bids. For the figure on your own roof, a roofer gives you a written scope and price.',
    ],
    sections: [
      {
        heading: 'How Roof Type Shapes the Cost',
        blocks: [
          'Every roof type is priced by the square foot of roof surface for a full [roof replacement](/roof-replacement/) with tear-off, but the material and the labor differ a lot from one roof to the next.',
          {
            list: [
              '**Asphalt shingle** is usually the least costly roof to replace: the material is light and goes on quickly.',
              '**A new tile roof** costs the most: the tiles cost more, they are heavy, and laying them takes longer.',
              '**A tile lift and relay** reuses your tiles and replaces the underlayment beneath them, so you pay for labor and underlayment rather than new tile. When the tiles are still sound, it costs less than a new tile roof.',
              '**A flat roof** usually falls between shingles and a new tile roof, depending on the system and how much drainage work the roof needs.',
            ],
          },
          { note: '**Small jobs** still need setup, permits and cleanup, so a small roof costs more per square foot than a large one.' },
        ],
      },
      {
        heading: 'Your Roof Is Not Your Home’s Square Footage',
        blocks: [
          'Listing sites show a home’s living area, added up across every floor. A roof covers the footprint of the house plus the overhangs, and a sloped roof has more surface than the flat area under it.',
          {
            list: [
              '**A one-story home** usually has a roof a little larger than its living area, because of the overhangs and the slope.',
              '**A two-story home** can have a roof about half its living area, because two floors sit under one roof.',
              '**Slope adds area.** A 4/12 roof has about 5% more surface than the ground it covers, a 6/12 roof about 12% more and an 8/12 roof about 20% more.',
            ],
          },
          'Roofers also order about 10% extra material for cuts, starter rows, hips and ridges, so a 2,000 square foot roof is priced on about 2,200 square feet. A steep roof or a two- or three-story home takes longer and needs more safety equipment, which adds to the cost.',
          'That is why we measure the roof itself, from satellite imagery for a quick range and on the roof before a final price.',
        ],
      },
      {
        heading: 'What Changes the Price of a New Roof',
        blocks: [
          {
            list: [
              '**Roof type and material.** Tile costs more than shingles to install; a lift and relay saves the cost of new tile when the tiles are still sound.',
              '**Size and shape.** Every hip, valley and extra roof plane adds cutting and flashing.',
              '**Pitch and height.** Steeper roofs and taller homes take longer and need more safety work.',
              '**What comes off.** More than one layer of old roofing means more tear-off and disposal.',
              '**The roof deck.** Soft or damaged decking found under the old roof has to be replaced. A good written scope says how that will be handled before work starts.',
              '**Penetrations and details.** Skylights, chimneys, vents, equipment and parapet walls each need flashing and time.',
              '**Flat roof drainage.** Low spots, drains and scuppers may need extra work so water clears the roof.',
            ],
          },
        ],
      },
      {
        heading: 'Repair, Lift and Relay, or Replace?',
        blocks: [
          'Not every old roof needs a full replacement. A local problem can often be repaired. On a tile roof whose tiles are still sound, a [tile lift and relay](/residential-roofing/tile-roofing/lift-and-relay/) replaces the worn underlayment and puts your own tiles back, for less than a new tile roof.',
          'When wear is spread across the whole roof, repairs buy less time each round. Our guide to [roof restoration vs. replacement](/blog/roof-restoration-vs-replacement/) walks through how to tell the difference.',
        ],
      },
      {
        heading: 'How to Compare Roofing Bids',
        blocks: [
          'Two bids with different totals often describe different jobs. Put them side by side and compare the scope, not just the price.',
          {
            checklist: [
              'Is it a full tear-off down to the deck, or an overlay?',
              'How is damaged decking handled, and at what price?',
              'Which underlayment, and which flashings are replaced rather than reused?',
              'Are vents and ventilation included?',
              'Who pulls the permit?',
              'What is the workmanship warranty, and what does the manufacturer’s warranty cover?',
              'Is the price written down before any work starts?',
              'How is the site protected and cleaned up each day?',
            ],
          },
          'At QRS you get a written scope and price before any work starts, we pull the permits, and our installs carry a 10-year workmanship warranty (call for details). We price it right the first time; if you have a written bid from another licensed roofer, show it to us and we can match it.',
        ],
      },
      {
        heading: 'Paying for a New Roof',
        blocks: ['Most homeowners spread the cost of a new roof over time. See [roof financing](/roof-financing/) for monthly payment options.'],
      },
    ],
    faqs: [
      {
        q: 'How much does it cost to replace the roof on a 2,000-square-foot house?',
        a: 'It depends on the roof, not the floor plan. A 2,000-square-foot house can have more or less roof area than that, depending on the pitch, overhangs and how many stories it has, and the roof type matters most of all. For a quick range, try the Instant Quote on our site; for an exact figure, a [free roof evaluation](/roof-inspection/) measures the roof and ends with a written price.',
      },
      {
        q: 'What is included in a roof replacement?',
        a: 'Usually the tear-off down to the deck, deck repairs where needed, new underlayment, flashings, vents and drip edge, the new roofing, permits, daily cleanup and a final walk-through. A good written scope lists each of these, so you can compare bids line by line.',
      },
      {
        q: 'How much does a new roof cost in Los Angeles?',
        a: 'It depends on the size of the roof, the roof type, the pitch and height of the home and what is found under the old roof. Asphalt shingles are usually the least costly to replace and a new tile roof the most. The free roof evaluation gives you the exact figure: a written scope and price before any work starts.',
      },
      {
        q: 'What is a roofing square?',
        a: 'A square is 100 square feet of roof surface, the unit roofers use to price and order material. A 2,000 square foot roof is 20 squares, plus about 10% extra material for cuts, hips and ridges.',
      },
      {
        q: 'Is a tile lift and relay cheaper than a new tile roof?',
        a: 'Usually, yes. A [lift and relay](/residential-roofing/tile-roofing/lift-and-relay/) reuses your tiles and replaces the underlayment beneath them, so you pay for labor and underlayment rather than new tile.',
      },
      {
        q: 'Why is my roof size different from my home’s square footage?',
        a: 'Square footage counts the living area on every floor. A roof covers the footprint plus the overhangs, and slope adds surface. A two-story home can have a roof about half its living area; a one-story home usually has a roof a little larger than its living area.',
      },
      {
        q: 'Is the roof estimate free?',
        a: 'For homes, yes. The roof evaluation is free, and you get a written scope and price before any work starts.',
      },
    ],
    closing: {
      heading: 'Get a Price for Your Roof',
      blocks: [
        'For a quick range, the Instant Quote measures your roof from satellite imagery in about a minute. For a firm price, [book a free roof evaluation](/contact-us/): a roofer looks at your roof and gives you a written scope and price before any work.',
      ],
    },
    related: ['/roof-replacement/', '/residential-roofing/tile-roofing/lift-and-relay/', '/roof-financing/'],
  },
  {
    slug: 'torch-down-roofing-app-vs-sbs',
    // Search Console FAQ additions (owner, October 26 2026); `revision` copies this text over the live copy once
    revision: 1,
    title: 'Torch-Down Roofing: APP vs. SBS Modified Bitumen for Flat Roofs',
    keyword: 'torch-down roofing',
    topics: ['flat', 'replacement', 'repair', 'commercial'],
    metaTitle: 'Torch-Down Roofing: APP vs. SBS for Flat Roofs',
    metaDescription:
      'Torch-down roofing explained: how APP and SBS modified bitumen differ, how a two-layer flat roof is built, signs it needs repair and how it compares with TPO.',
    datePublished: '2026-10-13',
    dateModified: '2026-10-13',
    excerpt:
      'Torch-down is the flat roof you see across Los Angeles. Here is how APP and SBS modified bitumen differ, how a torch-down roof is built layer by layer, the signs it needs work and how it compares with TPO.',
    cardImage: '/images/flat-roof-torch-down-drone-view-services.webp',
    intro: [
      'Torch-down roofing is one of the most common flat roofs in Los Angeles, on homes and on commercial buildings. It is built from rolls of modified bitumen, an asphalt sheet strengthened with polymers, that are heated with a torch so each layer fuses to the one below.',
      'This guide explains the two main types, APP and SBS, how a torch-down roof is put together, what wears out first and how it compares with TPO.',
    ],
    sections: [
      {
        heading: 'What Is Torch-Down Roofing?',
        blocks: [
          'A torch-down roof is a modified bitumen roof applied with heat. The roofer unrolls the sheet and warms its underside with a torch until the asphalt softens, then presses it into place. The seams where sheets overlap melt together, so the finished roof is one continuous waterproof surface.',
          'Most torch-down roofs have two layers: a **base sheet** on the deck and a **cap sheet** on top. The cap sheet is usually covered in mineral granules that shield the asphalt from the sun, often in white or light colors to reflect heat.',
        ],
      },
      {
        heading: 'APP vs. SBS Modified Bitumen',
        blocks: [
          'The letters name the polymer blended into the asphalt, and it changes how the sheet behaves.',
          {
            table: {
              head: ['', 'APP (atactic polypropylene)', 'SBS (styrene-butadiene-styrene)'],
              rows: [
                ['Feel', 'Stiffer, plastic-like', 'Flexible, rubber-like'],
                ['How it is applied', 'Almost always torched', 'Torched, set in hot asphalt, cold adhesive or self-adhered'],
                ['Strengths', 'Holds up well to heat and sun', 'Stretches and recovers, flexible in cold'],
                ['Where it fits', 'Sunny, warm climates', 'Roofs that move, colder climates, places where a torch should not be used'],
              ],
            },
          },
          'In Southern California’s mild climate both work well. The details matter more than the letters: a sound deck, a good base sheet, a cap sheet that protects the asphalt from the sun and careful flashing at every wall, drain and penetration.',
        ],
      },
      {
        heading: 'How a Torch-Down Roof Is Built',
        blocks: [
          {
            steps: [
              'Tear the old roof off down to the deck and replace any soft or damaged boards.',
              'Fasten or bond the base sheet to the deck.',
              'Torch the cap sheet over the base sheet, overlapping and fusing every seam.',
              'Flash the edges, walls, parapets, drains and every penetration with matching membrane.',
              'Check that water drains to the drains and scuppers rather than sitting in low spots.',
            ],
          },
          'On every flat roof replacement QRS does a full tear-off, so the deck can be checked before the new roof goes on. Our flat roofs, part of our *FlatGuard* flat roof system, can be finished with a white reflective cap sheet, as on this [round flat roof in Hollywood Hills West](/projects/flat-roof-replacement-hollywood-hills-west-90046/).',
        ],
      },
      {
        heading: 'Is Torch-Down Roofing Safe?',
        blocks: [
          'Torch-down uses an open flame, so it needs trained roofers who work carefully around wood, parapet walls, vents and anything that can burn. Where a flame is the wrong tool, such as against wood siding or tight details, a self-adhered SBS sheet can be used instead.',
        ],
      },
      {
        heading: 'Signs a Torch-Down Roof Needs Work',
        blocks: [
          {
            list: [
              '**Blisters** where air or moisture is trapped between layers.',
              '**Open or lifting seams** at the overlaps.',
              '**Cracked or pulled flashing** at walls, parapets and penetrations.',
              '**Ponding water** that sits long after rain.',
              '**Bare patches** where the granules have worn off the cap sheet.',
              '**Water stains** inside, often far from where water gets in. See [how to find a roof leak](/blog/roof-leak-source/).',
            ],
          },
          'Many of these can be repaired on their own. When the problems are spread across the roof, see [flat roof replacement](/residential-roofing/flat-roofing/replacement/).',
        ],
      },
      {
        heading: 'Torch-Down vs. TPO',
        blocks: [
          'TPO is a single-ply membrane, usually white, whose seams are welded with hot air rather than a torch. It is common on larger commercial roofs. Torch-down is a thicker, multi-layer asphalt system that stands up well to foot traffic and is common on homes and smaller buildings. Our guide to [TPO roofing pros and cons](/blog/tpo-roofing-pros-and-cons/) covers TPO in detail, and QRS installs [TPO roofing](/commercial-roofing/tpo-roofing/) on commercial buildings.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What does SBS stand for in roofing?',
        a: 'Styrene-butadiene-styrene, a rubber-like polymer mixed into the asphalt so the membrane stays flexible, even when it’s cold. APP stands for atactic polypropylene, a plastic polymer that makes the membrane stiffer and more heat-resistant.',
      },
      {
        q: 'What is the difference between APP and SBS torch-down?',
        a: 'Both are modified bitumen. APP is blended with a plastic-like polymer, is stiffer and is almost always torched; it holds up well to heat and sun. SBS is blended with a rubber-like polymer, stays flexible in cold and can be torched, set in hot asphalt, glued or self-adhered.',
      },
      {
        q: 'Can a torch-down roof go over an old roof?',
        a: 'It is better to tear the old roof off so the deck can be checked and repaired. QRS does a full tear-off on every flat roof replacement.',
      },
      {
        q: 'Can a torch-down roof be repaired?',
        a: 'Yes. Open seams, blisters and failed flashing can usually be repaired with matching membrane. See [flat roof repair](/residential-roofing/flat-roofing/repair/).',
      },
      {
        q: 'Is torch-down roofing good for Los Angeles?',
        a: 'Yes. It suits the mild climate and the sun, especially with a granulated or reflective cap sheet, and it is one of the most common flat roofs on Los Angeles homes and small buildings.',
      },
    ],
    closing: {
      heading: 'Get Your Flat Roof Checked',
      blocks: [
        'QRS installs and repairs torch-down flat roofs on homes and commercial buildings across Los Angeles and Orange County. [Book a free roof evaluation](/contact-us/) for a home, and you get a written scope and price before any work.',
      ],
    },
    related: ['/residential-roofing/flat-roofing/replacement/', '/residential-roofing/flat-roofing/repair/', '/commercial-roofing/tpo-roofing/'],
  },
  {
    slug: 'cool-roof-southern-california',
    title: 'Cool Roofs in Southern California: What They Are and When You Need One',
    keyword: 'cool roof',
    topics: ['flat', 'replacement', 'ventilation', 'commercial'],
    metaTitle: 'Cool Roofs in Southern California: Homeowner Guide',
    metaDescription:
      'What a cool roof is, how reflectance and emittance work, cool options for flat, shingle, tile and metal roofs, and when California’s energy code calls for one.',
    datePublished: '2026-10-13',
    dateModified: '2026-10-13',
    excerpt:
      'A cool roof reflects more of the sun and sheds heat faster. Here is how that works, the cool options for each roof type, when the energy code comes into it and what to ask when your roof is replaced.',
    cardImage: '/images/flat-roof-replacement-completed-white-membrane.webp',
    intro: [
      'A cool roof is a roof surface that reflects more sunlight and gives off the heat it does absorb more easily than a standard roof. On a hot day it stays cooler, and so does the attic or the room under it.',
      'In the inland valleys of Los Angeles and Orange County, where roofs bake for much of the year, that can make a real difference. This guide explains how cool roofs work, the options for each roof type and when California’s energy code comes into it.',
    ],
    sections: [
      {
        heading: 'How a Cool Roof Works',
        blocks: [
          'Two numbers describe a cool roof:',
          {
            list: [
              '**Solar reflectance:** how much of the sun’s energy the surface reflects instead of absorbing.',
              '**Thermal emittance:** how readily the surface gives off the heat it has absorbed.',
            ],
          },
          'The Cool Roof Rating Council tests and lists roofing products by these numbers, so you can compare them. A dark roof can run far hotter than the air on a sunny day; a reflective one stays much closer to it.',
        ],
      },
      {
        heading: 'Cool Roof Options by Roof Type',
        blocks: [
          { h3: 'Flat roofs' },
          'A flat roof can be finished with a white or light reflective surface: a white granulated cap sheet on a [torch-down roof](/blog/torch-down-roofing-app-vs-sbs/), or a white TPO membrane, common on commercial buildings. See our [white flat roof in Brentwood](/projects/white-flat-roof-los-angeles-90049/).',
          { h3: 'Shingle roofs' },
          'Several manufacturers make cool-rated asphalt shingles, with reflective granules, in a range of colors, not just white.',
          { h3: 'Tile roofs' },
          'Lighter clay and concrete tiles reflect more sun, and some tiles are rated as cool products. Air moving under the tiles also helps carry heat away.',
          { h3: 'Metal roofs' },
          'Factory-finished metal panels come in cool-rated colors that reflect sunlight and shed heat quickly.',
        ],
      },
      {
        heading: 'Is a Cool Roof Required in California?',
        blocks: [
          'California’s energy code (Title 24, Part 6) includes cool roof requirements for some new roofs and roof replacements. Whether they apply depends on the type of building, the slope of the roof and the climate zone, and the permit for the job sets what is needed.',
          { note: '**Before you choose a material,** ask your roofer whether the permit for your job will call for a cool roof, and get the product written into the scope.' },
        ],
      },
      {
        heading: 'Cool Roofs and Your Attic',
        blocks: [
          'A cool surface keeps heat from getting into the roof in the first place. [Attic ventilation](/residential-roofing/attic-ventilation/) moves out the heat that does get in. The two work together: a cool roof over an attic that cannot breathe still traps hot, humid air.',
        ],
      },
      {
        heading: 'Things to Know Before You Choose One',
        blocks: [
          {
            list: [
              '**Dirt lowers reflectance.** A white roof works best when it is kept clear of debris.',
              '**Light colors show stains** more than dark ones.',
              '**The roof is only part of it.** Insulation, ventilation and windows also affect how hot a home gets.',
              '**Coatings are one route some roofers offer.** QRS does not apply roof coatings; we use cool-rated materials when a roof is replaced or a flat roof is redone.',
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Does a cool roof have to be white?',
        a: 'No. White is the most reflective, but cool-rated shingles, tiles and metal come in many colors, using reflective granules and pigments.',
      },
      {
        q: 'Is a cool roof required in California?',
        a: 'Sometimes. California’s energy code (Title 24, Part 6) has cool roof requirements for some new roofs and replacements, depending on the building, the roof slope and the climate zone. The permit for the job sets what applies.',
      },
      {
        q: 'Will a cool roof lower my energy bill?',
        a: 'It keeps the roof and the space under it cooler on sunny days, which can reduce how hard air conditioning works. How much depends on the home, its insulation and ventilation and how it is cooled.',
      },
      {
        q: 'Can you turn my existing roof into a cool roof?',
        a: 'QRS does not apply roof coatings. We use cool-rated materials when a roof is replaced, or when a flat roof is redone with a white reflective cap sheet.',
      },
    ],
    closing: {
      heading: 'Talk to a Roofer About Your Roof',
      blocks: [
        'Thinking about a new roof? [Book a free roof evaluation](/contact-us/). A roofer looks at your roof and gives you a written scope and price, with the materials named, before any work.',
      ],
    },
    related: ['/residential-roofing/flat-roofing/', '/commercial-roofing/tpo-roofing/', '/residential-roofing/attic-ventilation/'],
  },
  {
    slug: 'wildfire-resistant-roof-los-angeles',
    title: 'Fire-Resistant Roofs in Los Angeles: Class A Roofing, Vents and Embers',
    keyword: 'fire-resistant roof',
    topics: ['replacement', 'tile', 'shingle', 'metal', 'ventilation', 'maintenance'],
    metaTitle: 'Fire-Resistant Roofs in Los Angeles: What Matters',
    metaDescription:
      'A fire-resistant roof in Los Angeles is more than its shingles: Class A ratings, ember-resistant vents, tile eave closures and the upkeep that keeps embers out.',
    datePublished: '2026-10-13',
    dateModified: '2026-10-13',
    excerpt:
      'In a wildfire, embers carried on the wind are a bigger threat to a roof than the fire front. Here is what a Class A rating means, where embers get in, and what to check and fix before fire season.',
    cardImage: '/images/tile-roof-replacement-drone-view.webp',
    intro: [
      'A fire-resistant roof matters in Los Angeles, where homes sit against brush-covered hills and canyons and fire season comes with strong, dry winds. During a wildfire, burning embers can travel far ahead of the flames and land on roofs, in vents and in piles of dry leaves.',
      'This guide explains what a Class A fire rating means, which roofing materials reach it, the weak spots where embers get in and what you can check before fire season.',
    ],
    sections: [
      {
        heading: 'Why Embers Are the Biggest Threat to a Roof',
        blocks: [
          'Fire researchers have found that many homes lost in wildfires are ignited by wind-blown embers and small fires they start, not by the main fire front. Embers settle in roof valleys, against walls and in debris, and they get into attics through open vents and gaps.',
          'So a fire-resistant roof is two things: a covering that won’t catch fire easily, and details that keep embers out.',
        ],
      },
      {
        heading: 'What a Class A Fire Rating Means',
        blocks: [
          'Roof coverings are rated Class A, B or C in standard fire tests. Class A is the highest rating: the roof resists severe fire exposure from outside.',
          {
            table: {
              head: ['Material', 'Fire rating'],
              rows: [
                ['Clay and concrete tile', 'Class A'],
                ['Metal', 'Class A (noncombustible panels; some as part of a rated assembly)'],
                ['Asphalt shingles (fiberglass)', 'Most are Class A'],
                ['Wood shakes', 'Untreated shakes are not Class A; treated ones can reach a higher rating with special underlayment'],
              ],
            },
          },
          'Some materials reach Class A only as part of a tested assembly, with a specific underlayment. Our guide to [wooden roof pros and cons](/blog/wooden-roof-pros-and-cons/) covers wood in more detail.',
        ],
      },
      {
        heading: 'California’s Rules for Homes in Fire Zones',
        blocks: [
          'In California’s fire hazard severity zones, the building code (Chapter 7A) sets wildfire-resistant requirements for roofs, vents and other parts of a home, and a roof replacement may have to meet them. The permit for the job confirms which rules apply to your address.',
          'In a fire hazard zone, attic and soffit vents have to be fire-rated and listed by the State Fire Marshal.',
        ],
      },
      {
        heading: 'Where Embers Get Into a Roof',
        blocks: [
          {
            list: [
              '**Attic, soffit and gable vents.** Open or torn screens let embers into the attic. Ember-resistant vents use fine metal mesh or baffles. See [attic ventilation](/residential-roofing/attic-ventilation/).',
              '**The open ends of tile at the eaves.** Barrel tiles leave gaps at the eave where embers and debris collect; eave closures (bird stops) close them.',
              '**Gaps at ridges and hips** where caps have slipped or cracked.',
              '**Valleys and corners full of leaves and needles,** which catch embers and burn.',
              '**Missing or broken pieces** that expose the underlayment and deck.',
            ],
          },
        ],
      },
      {
        heading: 'Before Fire Season: What to Check',
        blocks: [
          {
            checklist: [
              'Clear leaves, needles and debris from the roof, the valleys and against walls.',
              'Look for torn, clogged or missing vent screens.',
              'Check that tile eave closures are in place.',
              'Replace cracked, slipped or missing tiles and shingles.',
              'Trim branches that hang over the roof.',
              'Photograph the roof so you have a record of its condition.',
            ],
          },
          'Our [Roof Care Plan](/roof-maintenance-plans/) includes a fire-code vent check: attic and soffit vent screens and eave closures checked and photographed.',
          { note: '**Stay off the roof.** Look from the ground or a secure ladder at the eaves, and leave climbing to a roofer.' },
        ],
      },
      {
        heading: 'Replacing a Roof With Fire in Mind',
        blocks: [
          'When a roof is due for replacement, it is the moment to choose a Class A covering and fix the details: tile, Class A shingles or a [metal roof](/residential-roofing/metal-roofing/), whose panels won’t burn, with ember-resistant vents and closed eaves. Ask for the fire rating and the vents to be written into the scope.',
          'QRS replaces [tile](/residential-roofing/tile-roofing/replacement/), [shingle](/residential-roofing/shingle-roofing/replacement/) and metal roofs across Los Angeles and Orange County, with a written scope and price before any work and permits pulled.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is a Class A roof?',
        a: 'A roof covering with the highest rating in standard fire tests. Clay and concrete tile, metal and most fiberglass asphalt shingles reach Class A, some as part of a tested assembly with a specific underlayment.',
      },
      {
        q: 'Is a tile roof fire resistant?',
        a: 'Clay and concrete tile are rated Class A. The weak spots on a tile roof are the open tile ends at the eaves, slipped ridge caps and debris in the valleys, where embers can lodge.',
      },
      {
        q: 'Are asphalt shingles fire resistant?',
        a: 'Most fiberglass asphalt shingles are rated Class A. Check the rating of the specific product and the underlayment it is tested with.',
      },
      {
        q: 'What vents are required in a fire zone?',
        a: 'In a California fire hazard zone, attic and soffit vents have to be fire-rated and listed by the State Fire Marshal. The permit for the job confirms the rules for your address.',
      },
    ],
    closing: {
      heading: 'Get Your Roof Ready Before Fire Season',
      blocks: [
        '[Book a free roof evaluation](/contact-us/). A roofer checks the roof, the vents and the eaves, photographs what they find and gives you a written scope and price before any work.',
      ],
    },
    related: ['/residential-roofing/tile-roofing/replacement/', '/residential-roofing/metal-roofing/', '/roof-maintenance-plans/'],
  },
  {
    slug: 'how-to-choose-a-commercial-roofing-contractor',
    title: 'How to Choose a Commercial Roofing Contractor in Los Angeles',
    keyword: 'commercial roofing contractor',
    topics: ['commercial', 'replacement', 'repair', 'inspection'],
    metaTitle: 'How to Choose a Commercial Roofing Contractor',
    metaDescription:
      'Choosing a commercial roofing contractor in Los Angeles? See what to verify, ten questions to ask, red flags and what a good proposal includes.',
    datePublished: '2026-10-05',
    dateModified: '2026-10-05',
    excerpt:
      'A commercial roof is a big decision for an owner or property manager. Here is what to verify before you hire, the questions to ask, the red flags to watch for and what a good proposal should include.',
    image: '/images/blog/how-to-choose-a-commercial-roofing-contractor-site-walk.webp',
    imageAlt: 'Three people in hard hats on a flat commercial roof, a roofer kneeling with a tablet and pointing at the surface while a man and a woman with a clipboard look on, with rooftop equipment behind',
    intro: [
      'Choosing a commercial roofing contractor is one of the larger decisions an owner or property manager makes. The roof protects the building, the tenants and everything inside, and a poor job can mean leaks, disruption and a second bill.',
      'Prices differ from bid to bid, but price is the least useful way to compare them until you know that each contractor is offering the same work, backed by the same license, insurance and warranty.',
      'This guide covers what to verify before you hire, ten questions to ask, the red flags to watch for and what a good written proposal includes.',
    ],
    sections: [
      {
        heading: 'What to Verify Before You Hire',
        blocks: [
          'Start with the basics that you can check yourself. A contractor who is happy to prove them is usually a contractor who has nothing to hide.',
          {
            list: [
              '**A California contractor license.** Roofing contractors in California need a license, and you can look up any license number on the [Contractors State License Board](https://www.cslb.ca.gov/) website to see that it is active and in good standing.',
              '**Insurance.** Ask for a certificate of insurance showing liability coverage and workers’ compensation, and ask whether you need to be named on it.',
              '**Experience with your kind of roof.** A flat roof on a warehouse is a different job from a shingle roof on a house. Ask for photos of similar buildings.',
              '**A local office.** A contractor with offices near the building can respond faster when something goes wrong.',
            ],
          },
          'Quality Roofing Specialists is a licensed, bonded and insured California contractor, CSLB license #1061942, licensed since January 3, 2020.',
        ],
      },
      {
        heading: 'Ten Questions to Ask a Commercial Roofing Contractor',
        blocks: [
          'Put these to every contractor you consider and compare the answers side by side.',
          {
            steps: [
              'Who will survey the roof, and will I see photos of what they find?',
              'Will I get a written scope and price before any work starts?',
              'What roof system do you recommend, and why is it right for this building?',
              'How will the work be phased so the building can stay open?',
              'Who pulls the permits?',
              'What warranty comes with the work, and what exactly does it cover?',
              'How do you protect the building, tenants and inventory during the work?',
              'Who will be my point of contact, and how will you keep me updated?',
              'What happens if you find damage to the deck or insulation once the old roof is off?',
              'Can you give me a recent job to look at, or references from a similar building?',
            ],
          },
        ],
      },
      {
        heading: 'What a Good Commercial Roofing Proposal Includes',
        blocks: [
          'A proposal should let you compare contractors on the same terms. Look for these parts:',
          {
            table: {
              head: ['Part of the proposal', 'What it should say'],
              rows: [
                ['Scope of work', 'Exactly what is removed, repaired and installed, section by section'],
                ['Roof system and materials', 'The membrane or system, how it is attached, and any insulation or cover board'],
                ['Flashing and details', 'How walls, curbs, penetrations, drains and edges will be handled'],
                ['Phasing and schedule', 'The order of the work and how the building stays open'],
                ['Permits', 'Who pulls them and whether the cost is included'],
                ['Warranty', 'What the contractor warrants, for how long, and what the manufacturer covers'],
                ['Exclusions', 'What is not included, such as concealed deck damage, and how it will be priced if found'],
                ['Price and payment terms', 'The total and when payments are due'],
              ],
            },
          },
        ],
      },
      {
        heading: 'Red Flags',
        blocks: [
          {
            list: [
              '**No license number, or one you cannot verify.**',
              '**A verbal price with nothing in writing.**',
              '**A vague scope** that says “new roof” without saying what is removed, repaired and installed.',
              '**Pressure to sign today.**',
              '**No answer on who pulls the permits.**',
              '**A warranty that is hard to explain.**',
              '**Door-to-door storm chasers** who promise things they cannot back up.',
            ],
          },
        ],
      },
      {
        heading: 'How We Work With Commercial Clients',
        blocks: [
          'Every commercial project at QRS starts with a roofer-led roof survey and a written scope and price. We photo-document what we find, plan the work around how your building runs and keep your building open during the work.',
          'We pull the building permits, and we hand over closeout photos for your records. Our installs are backed by a 10-year workmanship warranty (call for details), and the materials carry the manufacturer’s warranty, which depends on the product.',
          'See our [commercial roofing](/commercial-roofing/) services, including [commercial roof repair](/commercial-roofing/repair/), [commercial roof replacement](/commercial-roofing/replacement/) and [commercial roof maintenance](/commercial-roofing/maintenance/).',
        ],
      },
    ],
    faqs: [
      {
        q: 'How do I check a roofing contractor’s license in California?',
        a: 'Look up the license number on the [Contractors State License Board](https://www.cslb.ca.gov/) website. It shows whether the license is active, its classification and any complaints on record.',
      },
      {
        q: 'Should I get more than one bid for a commercial roof?',
        a: 'Yes, for a major project. Make sure each bid covers the same scope, the same system and the same warranty, so the prices are comparable.',
      },
      {
        q: 'What insurance should a commercial roofing contractor have?',
        a: 'At minimum, liability insurance and workers’ compensation. Ask for a certificate of insurance, and ask your own insurer or attorney whether you need to be named on it.',
      },
      {
        q: 'What is a roof survey?',
        a: 'A roofer walks the roof section by section, photographs drains, seams, flashing and equipment, and reports the condition in plain English. At QRS the survey comes before any scope or price, and it shows whether the roof needs repair, maintenance or replacement.',
      },
      {
        q: 'Can a commercial roof be replaced while the building stays open?',
        a: 'Yes, when the work is phased. The roof is replaced section by section, with each section dried in as it is opened. See our guide to [commercial roof replacement planning](/blog/commercial-roof-replacement-planning/).',
      },
    ],
    closing: {
      heading: 'Choose on Facts, Not on the Lowest Number',
      blocks: [
        'The right commercial roofing contractor is the one who shows you what is wrong, writes down what they will do and stands behind it.',
        'Quality Roofing Specialists provides commercial roofing across Los Angeles and Orange County, from offices and retail to warehouses and industrial buildings.',
        'To start, request a roofer-led roof survey and get photos, a written scope and a price before any work begins.',
        '**[Contact Quality Roofing Specialists](/contact-us/) to request a commercial roof survey.**',
      ],
    },
    related: ['/commercial-roofing/', '/commercial-roofing/repair/', '/commercial-roofing/replacement/', '/commercial-roofing/maintenance/'],
  },
  {
    slug: 'commercial-roof-leak-repair',
    // Search Console FAQ additions (owner, October 26 2026); `revision` copies this text over the live copy once
    revision: 1,
    title: 'Commercial Roof Leak Repair: How to Find the Source on a Flat Roof',
    keyword: 'commercial roof leak repair',
    topics: ['commercial', 'leak', 'repair', 'flat', 'emergency'],
    metaTitle: 'Commercial Roof Leak Repair: Finding the Source',
    metaDescription:
      'Commercial roof leak repair starts with finding the real source. Learn where flat roofs leak, what to do right away and how a roofer traces it.',
    datePublished: '2026-10-05',
    dateModified: '2026-10-05',
    excerpt:
      'On a commercial flat roof, water can travel a long way before it drips. Here is where commercial roofs leak, what to do right away and how a roofer traces the real source before repairing it.',
    image: '/images/blog/commercial-roof-leak-repair-flat-roof-source.webp',
    imageAlt: 'A roofer in a navy cap and orange safety vest kneeling on a flat commercial roof and pointing at standing water near a roof drain, with a rooftop air conditioning unit and the downtown Los Angeles skyline behind',
    intro: [
      'Commercial roof leak repair starts with finding where the water really gets in, and on a large flat roof that is rarely where the stain is. Water travels across the deck and insulation before it reaches a ceiling tile.',
      'Fixing the wrong spot wastes money and leaves the leak in place, so the first job is tracing it. After that, the repair itself is usually straightforward.',
      'This guide covers where commercial roofs leak, what to do in the first hours, how a roofer traces a leak and when repair stops making sense.',
    ],
    sections: [
      {
        heading: 'Why Commercial Roof Leaks Are Hard to Trace',
        blocks: [
          'A commercial roof is large, low-slope and full of details. Water that gets in can run along the deck, through insulation and over a beam before it shows up as a drip, often over a different office, aisle or bay.',
          'That is why patching directly above the stain so often fails. The opening is usually upslope or off to the side, at a detail that a patch over the stain never touches.',
        ],
      },
      {
        heading: 'Where Commercial Roofs Leak',
        blocks: [
          'Most leaks begin at details, not in the middle of an intact membrane.',
          {
            table: {
              head: ['Where it leaks', 'What goes wrong'],
              rows: [
                ['Drains and scuppers', 'Debris blocks them, water ponds and finds the weak points'],
                ['Seams and laps', 'Seams open, split or lose their bond over time'],
                ['Flashing at walls and parapets', 'Flashing pulls away, cracks or loses its sealant'],
                ['Rooftop equipment and curbs', 'Flashing around HVAC units and curbs fails, or the curb itself moves'],
                ['Penetrations', 'Pipes, vents and conduits lose their seals'],
                ['Skylights', 'Flashing and seals around them wear out'],
                ['The membrane surface', 'Punctures, blisters and splits, often from foot traffic or debris'],
                ['Roof edges', 'Edge metal loosens and lets water in'],
              ],
            },
          },
          'Not every drip is a roof leak. Condensate from an air conditioner or a plumbing leak can look the same, so a roofer checks those too.',
        ],
      },
      {
        heading: 'What to Do Right Away',
        blocks: [
          {
            steps: [
              'Protect people and property. Move inventory and equipment away from the drip, catch the water and keep clear of wet light fixtures and electrical panels.',
              'Take photos. Photograph the ceiling, the floor and the date, so there is a record for the owner, the tenant and any insurance claim.',
              'Note when it leaks. Does it happen only in heavy rain, in wind-driven rain, or after rain has stopped? That helps a roofer.',
              'Stay off the roof unless your staff has fall protection and training. Wet flat roofs are slippery and edges are dangerous.',
              'Call a roofer to trace and repair it. If water is coming in now, see [emergency roof repair](/roof-repair/emergency/).',
            ],
          },
        ],
      },
      {
        heading: 'How a Roofer Traces a Commercial Roof Leak',
        blocks: [
          'A roofer starts inside, noting where the water shows up, then moves to the roof and works upslope of those spots, section by section.',
          {
            list: [
              'Check the drains, scuppers and any ponding.',
              'Inspect the seams and laps across the area.',
              'Check the flashing at walls, parapets and rooftop equipment.',
              'Check each penetration, skylight and edge.',
              'Photograph the cause before fixing it.',
            ],
          },
          'At Quality Roofing Specialists, our [commercial roof repair](/commercial-roofing/repair/) traces the leak to where water actually gets in, repairs what failed, and keeps your building open while we work. Every repair comes with before-and-after photos.',
        ],
      },
      {
        heading: 'Repair or Replace?',
        blocks: [
          'A single failed flashing or open seam is a repair. A roof that leaks in many places, has widespread blisters or splits, or has wet insulation under much of its surface is telling you something different.',
          'A roofer-led survey with photos shows which case you are in. See our guide to [commercial roof replacement planning](/blog/commercial-roof-replacement-planning/), or our [commercial roof replacement](/commercial-roofing/replacement/) page.',
        ],
      },
      {
        heading: 'Keeping Leaks From Coming Back',
        blocks: [
          'Most commercial leaks are preventable with regular attention to the details above. Clear drains and scuppers, reseal flashing where needed and catch early wear before it becomes interior damage.',
          'Our [commercial roof maintenance](/commercial-roofing/maintenance/) program does this with scheduled roofer visits and a photo report for owners and managers.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Why is my new commercial roof leaking?',
        a: 'Most often at a detail rather than the open field of the roof: a flashing at a curb, drain or wall, a penetration added after the roof was finished, or damage from another trade working up there. Call the installer first, since new work is usually covered by their workmanship warranty. If you need a second opinion, we trace the leak, photograph the cause and put the fix in writing.',
      },
      {
        q: 'How do you find a leak on a flat commercial roof?',
        a: 'By working upslope from where the water shows up inside, and checking each drain, seam, flashing, penetration and edge along the way. The cause is photographed before it is fixed.',
      },
      {
        q: 'Can a commercial roof be repaired while the building stays open?',
        a: 'Yes. We repair commercial roofs while the building stays open, and we plan the work around how your building runs.',
      },
      {
        q: 'Why does my flat roof leak in some rains and not others?',
        a: 'Heavy or wind-driven rain pushes water into details that light rain does not reach, such as flashing, edges and seams. The pattern is a clue a roofer can use to find the source.',
      },
      {
        q: 'Should my maintenance staff patch the leak?',
        a: 'A small, temporary patch may slow a leak, but it can also hide the source, and working on a roof is dangerous without training and fall protection. Have a roofer trace it. See our guide to [temporary roof repair options](/blog/temporary-roof-repair-options/).',
      },
      {
        q: 'Will I know what a commercial roof repair costs before it starts?',
        a: 'Yes. You get a written scope and price before any work begins, with photos of the problem.',
      },
    ],
    closing: {
      heading: 'Trace It First, Then Fix It',
      blocks: [
        'The cheapest commercial roof leak repair is the one that fixes the real source the first time.',
        'Quality Roofing Specialists provides [commercial roof repair](/commercial-roofing/repair/), [emergency roof repair](/roof-repair/emergency/) and [commercial roof maintenance](/commercial-roofing/maintenance/) across Los Angeles and Orange County.',
        'If you have a leak, request a roofer-led roof survey and get photos, a written scope and a price before any work starts.',
        '**[Contact Quality Roofing Specialists](/contact-us/) to have your commercial roof leak traced and repaired.**',
      ],
    },
    related: ['/commercial-roofing/repair/', '/roof-repair/emergency/', '/commercial-roofing/maintenance/', '/commercial-roofing/replacement/'],
  },
  {
    slug: 'commercial-roof-replacement-planning',
    title: 'Commercial Roof Replacement: How to Plan It and Keep Your Doors Open',
    keyword: 'commercial roof replacement',
    topics: ['commercial', 'replacement', 'flat', 'restoration'],
    metaTitle: 'Commercial Roof Replacement: How to Plan It',
    metaDescription:
      'Commercial roof replacement works best when it is planned in phases. See the signs, the steps, what to plan around and what a written scope should say.',
    datePublished: '2026-10-05',
    dateModified: '2026-10-05',
    excerpt:
      'A commercial roof replacement does not have to close your business. Here are the signs it is time, how a phased replacement works, what to plan around and what a written scope should say.',
    image: '/images/blog/commercial-roof-replacement-planning-roof-install.webp',
    imageAlt: 'Roofers in hard hats and safety vests peeling back old roofing and rolling out a white membrane on a large flat commercial roof, with loading docks and the downtown Los Angeles skyline behind',
    intro: [
      'A commercial roof replacement is a big project, but it does not have to stop your business. Planned well, the roof comes off and goes back on in sections, and your doors stay open.',
      'The work goes best when the decision rests on facts: the condition of the roof, a clear plan for the phases and a written scope that says exactly what will be done.',
      'This guide covers the signs it is time to replace, how a phased replacement works, what to plan around and what a good written scope includes.',
    ],
    sections: [
      {
        heading: 'Signs It Is Time to Replace a Commercial Roof',
        blocks: [
          'One leak does not mean a new roof. These signs together do:',
          {
            list: [
              'Leaks in more than one place, or the same leaks returning after repairs.',
              'Blisters, splits or open seams across much of the surface.',
              'Ponding water that stays after the rain stops.',
              'Wet or compressed insulation under the membrane.',
              'A membrane that is worn, cracked or brittle across large areas.',
              'Flashing at walls and equipment failing in many spots.',
            ],
          },
          'A roofer-led roof survey with photos shows how widespread the problems are, which is the question that decides between repair and replacement.',
        ],
      },
      {
        heading: 'Repair, Restore or Replace?',
        blocks: [
          {
            table: {
              head: ['Option', 'Best when'],
              rows: [
                ['Repair', 'The roof is sound overall and the problem is local, such as a failed flashing or an open seam'],
                ['Maintenance', 'The roof is in good shape and you want to keep it that way'],
                ['Replacement', 'The roof is worn out or failing in many places'],
              ],
            },
          },
          'Restoration sits between repair and replacement, and only works on a sound roof. See our guide to [roof restoration vs. replacement](/blog/roof-restoration-vs-replacement/), or our [commercial roof repair](/commercial-roofing/repair/) page.',
        ],
      },
      {
        heading: 'How a Phased Commercial Roof Replacement Works',
        blocks: [
          'Phasing is what keeps the building open. The roof is replaced one section at a time, and each section is dried in before the crew stops for the day.',
          {
            steps: [
              'Roofer-led survey. A roofer inspects and photographs the roof and decides what the new system must tie into.',
              'Written scope and price. You get the system, the attachment method, the insulation, the flashings, the phases and the price in writing.',
              'Permits. We pull the building permits.',
              'Phase plan. The sections, the order and the access routes are agreed with you before work begins.',
              'Tear-off and deck repair. The old roofing comes off in sections, and the deck is repaired where needed.',
              'New roof system. The new system goes on, with walls, curbs, penetrations and drains flashed and detailed.',
              'Closeout. We walk the roof with you and hand over photos for your records.',
            ],
          },
          'Our [commercial roof replacement](/commercial-roofing/replacement/) follows this process, and our installs are backed by a 10-year workmanship warranty (call for details). The materials carry the manufacturer’s warranty, which depends on the product.',
        ],
      },
      {
        heading: 'What to Plan Around',
        blocks: [
          'Tell your roofer how the building runs. The more they know, the better the phases fit.',
          {
            checklist: [
              '**Operating hours and busy periods.** When can noisy work happen, and when can it not?',
              '**Tenants and customers.** Entrances, walkways and parking that need to stay open.',
              '**Deliveries and loading.** Docks and routes that cannot be blocked.',
              '**Rooftop equipment.** HVAC units, exhaust fans and anything that has to keep running.',
              '**Access and staging.** Where materials and equipment can be kept.',
              '**Inventory and equipment under the roof.** What needs to be covered or moved.',
              '**Communication.** Who tells tenants, and how.',
            ],
          },
        ],
      },
      {
        heading: 'Choosing a Roof System',
        blocks: [
          'Flat and low-slope commercial roofs use systems built for them, such as single-ply membranes and layered asphalt-based systems. The right one depends on the building, the roof’s condition and what is on it.',
          'TPO is one of the most common single-ply choices. See our guide to [TPO roofing for commercial buildings](/blog/tpo-roofing-pros-and-cons/), or our [TPO roofing](/commercial-roofing/tpo-roofing/) page.',
        ],
      },
      {
        heading: 'What a Written Scope Should Say',
        blocks: [
          {
            list: [
              'What will be removed, repaired and installed, section by section.',
              'The roof system and how it is attached.',
              'Insulation, cover board and flashing details.',
              'The phases and how the building stays open.',
              'Permits, and who pulls them.',
              'The warranty on the work and on the materials.',
              'What is excluded, such as concealed deck damage, and how it will be priced if found.',
              'The price and payment terms.',
            ],
          },
          'See also our guide to [choosing a commercial roofing contractor](/blog/how-to-choose-a-commercial-roofing-contractor/).',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can the building stay open during a commercial roof replacement?',
        a: 'Yes. We phase the work section by section and keep your building open during the work.',
      },
      {
        q: 'How long does a commercial roof replacement take?',
        a: 'It depends on the size of the roof, the system, the weather and how many phases are needed. Your written scope includes the schedule.',
      },
      {
        q: 'Do I need a permit to replace a commercial roof?',
        a: 'Commercial roof replacements typically need building permits. We pull the building permits for our projects.',
      },
      {
        q: 'Can a new commercial roof go over the old one?',
        a: 'Sometimes, if the existing roof is dry and sound and the code allows it. Often a tear-off is the better route, so you start from a clean, solid deck. The survey tells us which applies.',
      },
      {
        q: 'What if you find hidden damage once the old roof is off?',
        a: 'Concealed damage to the deck or insulation is possible on any tear-off. Your scope should say how it will be handled and priced, and we show you photos of anything we find.',
      },
    ],
    closing: {
      heading: 'Plan the Roof Around the Business',
      blocks: [
        'A good commercial roof replacement is one your tenants and customers barely notice.',
        'Quality Roofing Specialists provides [commercial roof replacement](/commercial-roofing/replacement/), [commercial roof repair](/commercial-roofing/repair/) and [commercial roof maintenance](/commercial-roofing/maintenance/) across Los Angeles and Orange County.',
        'To start, request a roofer-led roof survey and get photos, a written scope and a price before any work begins.',
        '**[Contact Quality Roofing Specialists](/contact-us/) to plan your commercial roof replacement.**',
      ],
    },
    related: ['/commercial-roofing/replacement/', '/commercial-roofing/tpo-roofing/', '/commercial-roofing/repair/', '/commercial-roofing/'],
  },
  {
    slug: 'tpo-roofing-pros-and-cons',
    title: 'TPO Roofing for Commercial Buildings: Pros, Cons and Questions to Ask',
    keyword: 'tpo roofing',
    topics: ['commercial', 'flat', 'replacement', 'tpo'],
    metaTitle: 'TPO Roofing Pros and Cons for Commercial Roofs',
    metaDescription:
      'TPO roofing is a popular white membrane for flat commercial roofs. See the pros, the cons, how it compares with modified bitumen and what to ask.',
    datePublished: '2026-10-05',
    dateModified: '2026-10-05',
    excerpt:
      'TPO is one of the most common roofing membranes for flat commercial roofs. Here are its pros and cons, how it compares with modified bitumen and the questions to ask before you choose it.',
    image: '/images/blog/tpo-roofing-pros-and-cons-membrane-install.webp',
    imageAlt: 'Roofers in hard hats and safety vests rolling out a white single-ply membrane across a large flat commercial roof, with rooftop equipment and the downtown Los Angeles skyline behind',
    intro: [
      'TPO roofing is one of the most common choices for flat and low-slope commercial roofs. It is a white, single-ply membrane that is welded at the seams, and it is popular in sunny places like Southern California.',
      'It is a good fit for many buildings, but not all of them, and a TPO roof is only as good as the installation behind it.',
      'This guide explains what TPO is, its pros and cons, how it compares with modified bitumen and what to ask before you choose it.',
    ],
    sections: [
      {
        heading: 'What Is TPO Roofing?',
        blocks: [
          'TPO stands for thermoplastic polyolefin. It is a single-ply roofing membrane that comes in wide rolls, usually white, and is laid over the roof and joined at the seams with hot air so the seams fuse together.',
          'The membrane can be attached in different ways, including mechanically fastened, fully adhered or held down with ballast. The right method depends on the roof and the building.',
        ],
      },
      {
        heading: 'The Pros of TPO Roofing',
        blocks: [
          { h3: 'It reflects sunlight' },
          'A white membrane reflects much of the sun’s energy instead of absorbing it, which can keep the roof surface cooler in Southern California’s heat.',
          { h3: 'Welded seams' },
          'Heat-welded seams form a continuous surface when they are done well, and wide rolls mean fewer seams across the roof.',
          { h3: 'Fits many flat roofs' },
          'TPO is made for flat and low-slope roofs, and it can be installed with different attachment methods to suit the deck.',
          { h3: 'It can help meet cool roof rules' },
          'California’s Title 24 energy code includes cool roof requirements for many low-slope commercial roofs, and a reflective membrane is one way to meet them. The exact requirement depends on the building and the product.',
        ],
      },
      {
        heading: 'The Cons of TPO Roofing',
        blocks: [
          { h3: 'Quality varies by product' },
          'TPO membranes are made by many manufacturers, and they are not all the same. Ask which membrane is being proposed and what its manufacturer warranty covers.',
          { h3: 'Workmanship matters a lot' },
          'The seams, flashing and details decide how a TPO roof performs. A good membrane installed badly can still leak.',
          { h3: 'It can be punctured' },
          'Like other single-ply membranes, TPO can be punctured by dropped tools or heavy foot traffic. Walkway pads help in busy areas.',
          { h3: 'Check what is on the roof' },
          'Some rooftop exhaust, such as from kitchens, can deposit grease or oils on a roof. Tell your roofer what the building vents, since some membranes handle exposure better than others.',
        ],
      },
      {
        heading: 'TPO vs. Modified Bitumen',
        blocks: [
          'Both are used on flat commercial roofs, and they work differently.',
          {
            table: {
              head: ['Compare', 'TPO', 'Modified bitumen'],
              rows: [
                ['What it is', 'A single-ply membrane in wide rolls', 'A layered, asphalt-based system'],
                ['Seams', 'Welded with hot air', 'Overlapped and bonded'],
                ['Typical look', 'White or light', 'Usually dark, unless it has a reflective cap'],
                ['Where it often fits', 'Large flat roofs where reflectivity matters', 'Roofs that need extra layers or heavy wear resistance'],
              ],
            },
          },
          'Other single-ply membranes, such as PVC and EPDM, are also used on flat roofs. The right choice depends on your roof, so a roofer should compare them with you from the survey.',
        ],
      },
      {
        heading: 'Questions to Ask Before Choosing TPO',
        blocks: [
          {
            steps: [
              'Is TPO the right system for this roof, and why?',
              'Which membrane and manufacturer are you proposing?',
              'How will it be attached?',
              'How will walls, curbs, penetrations and drains be flashed?',
              'What does the warranty on the work cover, and what does the manufacturer’s cover?',
              'What does the building vent onto the roof?',
              'How will the work be phased so the building can stay open?',
            ],
          },
          'At Quality Roofing Specialists, we survey the roof first and recommend TPO only when it suits the building. See our [TPO roofing](/commercial-roofing/tpo-roofing/) page, or our guide to [commercial roof replacement planning](/blog/commercial-roof-replacement-planning/).',
        ],
      },
    ],
    faqs: [
      {
        q: 'What does TPO stand for?',
        a: 'Thermoplastic polyolefin. It is a type of single-ply roofing membrane widely used on flat commercial roofs.',
      },
      {
        q: 'How long does a TPO roof last?',
        a: 'It depends on the membrane, the installation, the details at walls and penetrations and how the roof is maintained. We do not promise a number of years. We focus on the installation, which is backed by our 10-year workmanship warranty (call for details).',
      },
      {
        q: 'Is TPO good for Southern California?',
        a: 'Often, because a white membrane reflects sunlight and can keep the roof surface cooler. Whether it fits your building depends on the roof, so a roofer should survey it first.',
      },
      {
        q: 'Can you repair a TPO roof?',
        a: 'Yes. Leaks on a TPO roof usually come from a seam, a flashing or a penetration. See our [commercial roof leak repair](/blog/commercial-roof-leak-repair/) guide and our [commercial roof repair](/commercial-roofing/repair/) page.',
      },
      {
        q: 'Can TPO go over an existing roof?',
        a: 'Sometimes, if the existing roof is dry and sound and the code allows it. Often a tear-off is the better route. The survey tells us which applies to your building.',
      },
    ],
    closing: {
      heading: 'Choose the System for the Building',
      blocks: [
        'TPO is a strong choice for many flat commercial roofs, and the installation matters as much as the membrane.',
        'Quality Roofing Specialists provides [TPO roofing](/commercial-roofing/tpo-roofing/), [commercial roof replacement](/commercial-roofing/replacement/) and [commercial roof repair](/commercial-roofing/repair/) across Los Angeles and Orange County.',
        'To find out whether TPO suits your building, request a roofer-led roof survey and get photos, a written scope and a price before any work begins.',
        '**[Contact Quality Roofing Specialists](/contact-us/) to talk about TPO for your roof.**',
      ],
    },
    related: ['/commercial-roofing/tpo-roofing/', '/commercial-roofing/replacement/', '/commercial-roofing/repair/', '/commercial-roofing/'],
  },
  {
    slug: 'commercial-roof-inspection-checklist',
    title: 'Commercial Roof Inspection Checklist: What to Check and How Often',
    keyword: 'commercial roof inspection',
    topics: ['commercial', 'inspection', 'maintenance', 'leak'],
    metaTitle: 'Commercial Roof Inspection Checklist and Schedule',
    metaDescription:
      'A commercial roof inspection checklist for owners and managers: what to check, how often to inspect and what a roofer-led survey should include.',
    datePublished: '2026-10-05',
    dateModified: '2026-10-05',
    excerpt:
      'Regular inspections catch small commercial roof problems before they become leaks. Here is what to check, how often to inspect and what a roofer-led survey should include.',
    image: '/images/blog/commercial-roof-inspection-checklist-seam-check.webp',
    imageAlt: 'A roofer in a hard hat and safety vest kneeling on a flat commercial roof with a tablet, pointing at a seam, with rooftop air conditioning units and skylights behind',
    intro: [
      'A commercial roof inspection finds small problems while they are still inexpensive to fix. A clogged drain, a lifted seam or a cracked flashing is a minor job today and an interior leak after the next rain.',
      'Owners and property managers can do a basic walk-through safely from the ground and from inside the building. A fuller inspection of the roof itself belongs to a roofer, because working on a roof is dangerous without training and fall protection.',
      'This checklist covers what to check, how often to inspect and what a roofer-led survey should deliver.',
    ],
    sections: [
      {
        heading: 'How Often to Inspect a Commercial Roof',
        blocks: [
          'A good rule is at least twice a year, and after any major storm.',
          {
            list: [
              '**Before the rainy season.** Find and fix weak points while the weather is dry.',
              '**After the rainy season.** Check for damage and wear the winter exposed.',
              '**After major storms or high winds.**',
              '**When you buy or lease a building,** so you know the roof’s condition up front.',
              '**Before a manufacturer’s warranty period ends,** if your roof has one.',
            ],
          },
        ],
      },
      {
        heading: 'The Commercial Roof Inspection Checklist',
        blocks: [
          'A roofer works through the following on the roof itself. You can check the first and last items yourself.',
          {
            checklist: [
              '**Inside the building:** Ceiling stains, damp tiles, drips and musty smells.',
              '**Drains, scuppers and gutters:** Clear of debris, and no standing water around them.',
              '**Ponding:** Any water that stays on the roof after the rain stops.',
              '**Seams and laps:** Open, split or lifting edges.',
              '**The membrane surface:** Punctures, blisters, splits, cracks or worn areas.',
              '**Flashing:** At walls, parapets, curbs and edges, for gaps, cracks and loose pieces.',
              '**Rooftop equipment:** The flashing and curbs around HVAC units and exhaust fans.',
              '**Penetrations:** Pipes, vents and conduits, and the seals around them.',
              '**Skylights:** Seals and flashing around each one.',
              '**Roof edges and parapets:** Loose metal, copings or damaged edges.',
              '**Debris and traffic damage:** Loose items, and wear where people walk.',
              '**Photos:** A dated photo record of every area, for comparison next time.',
            ],
          },
          { note: '**Safety:** Do not send staff onto a roof without fall protection and training. Roof edges, skylights and wet surfaces are serious hazards.' },
        ],
      },
      {
        heading: 'What a Roofer-Led Roof Survey Should Include',
        blocks: [
          'A professional survey should leave you with more than a verbal “it looks fine.”',
          {
            list: [
              'Photos of each area of the roof, including problems.',
              'A plain-English report on the condition of the roof.',
              'A list of what needs attention now and what can wait.',
              'A written scope and price for any recommended work.',
              'One clear next step: repair, maintain or replace.',
            ],
          },
          'At Quality Roofing Specialists, every commercial project starts with a roofer-led survey, with photo-documented findings for owners and property management clients.',
        ],
      },
      {
        heading: 'Keep a Record',
        blocks: [
          'A simple log makes decisions easier. Keep dated photos and reports for each inspection, along with a note of repairs and who did them.',
          'The record shows how the roof is aging, helps you budget for repairs or replacement, and supports any warranty or insurance claim. If your roof has a manufacturer’s warranty, check whether it requires regular maintenance.',
        ],
      },
      {
        heading: 'Inspection vs. a Maintenance Plan',
        blocks: [
          'An inspection looks at the roof once and tells you its condition. Maintenance goes further, with regular visits that clear drains and gutters, reseal flashing where needed and catch early wear.',
          'Our [commercial roof maintenance](/commercial-roofing/maintenance/) starts with a baseline roof survey, and every visit ends with a photo report for owners, managers or boards.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How often should a commercial roof be inspected?',
        a: 'At least twice a year, before and after the rainy season, and after any major storm or windstorm.',
      },
      {
        q: 'Who should inspect a commercial roof?',
        a: 'A roofer. Staff can do a ground-level and indoor walk-through, but the roof itself is best checked by someone trained, with fall protection.',
      },
      {
        q: 'What does a commercial roof inspection report include?',
        a: 'Photos, a plain-English description of the roof’s condition, what needs attention now and what can wait, and a written scope and price for recommended work.',
      },
      {
        q: 'Does a roof inspection find leaks?',
        a: 'It can find the causes of leaks, such as open seams, failed flashing and clogged drains, and often finds problems before they leak. If you already have a leak, see our guide to [commercial roof leak repair](/blog/commercial-roof-leak-repair/).',
      },
      {
        q: 'Do you inspect roofs for buyers and tenants?',
        a: 'A roofer-led survey gives owners, managers and tenants a photo record of the roof’s condition, which is useful when buying, selling or leasing a building. Contact us to set one up.',
      },
    ],
    closing: {
      heading: 'Inspect Before the Rain, Not After the Leak',
      blocks: [
        'A regular commercial roof inspection is one of the least expensive ways to protect a building.',
        'Quality Roofing Specialists provides [commercial roof maintenance](/commercial-roofing/maintenance/), [commercial roof repair](/commercial-roofing/repair/) and [commercial roof replacement](/commercial-roofing/replacement/) across Los Angeles and Orange County.',
        'To start, request a roofer-led roof survey and get photos, a plain-English report and one clear next step.',
        '**[Contact Quality Roofing Specialists](/contact-us/) to schedule a commercial roof survey.**',
      ],
    },
    related: ['/commercial-roofing/maintenance/', '/commercial-roofing/repair/', '/commercial-roofing/', '/commercial-roofing/replacement/'],
  },
  {
    slug: 'roof-leak-source',
    title: 'How to Find a Roof Leak: Signs, Causes and What to Do Next',
    keyword: 'roof leak',
    topics: ['leak', 'repair', 'shingle', 'tile', 'flat', 'inspection'],
    metaTitle: 'How to Find a Roof Leak: Signs, Causes and Fixes',
    metaDescription:
      'A roof leak rarely drips where the water gets in. Learn the signs, the usual causes on shingle, tile and flat roofs, and what to do next.',
    datePublished: '2026-10-05',
    dateModified: '2026-10-05',
    excerpt:
      'A ceiling stain rarely sits under the spot where water gets in. Here is how to read the signs of a roof leak, the usual causes on shingle, tile and flat roofs, and what to do while you wait for a repair.',
    image: '/images/blog/roof-leak-source-ceiling-drip.webp',
    imageAlt: 'A homeowner holding a tablet and looking up at a stained ceiling where water drips into a bucket set on a stepladder',
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
    topics: ['maintenance', 'inspection', 'storm', 'shingle', 'tile', 'flat'],
    metaTitle: 'Roof Maintenance Checklist Before the Rainy Season',
    metaDescription:
      'A roof maintenance checklist for Southern California homeowners: what to check before the rains, what to leave to a roofer and how often to inspect.',
    datePublished: '2026-10-05',
    dateModified: '2026-10-05',
    excerpt:
      'After a long dry summer, the first heavy rain tests every weak spot on your roof. Use this roof maintenance checklist to check what you safely can, and to know what to leave to a roofer.',
    image: '/images/blog/roof-maintenance-checklist-wet-shingle-check.webp',
    imageAlt: 'A roofer in a rain jacket and cap kneeling on a wet shingle roof and checking the shingles beside a roof vent, holding a tablet',
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
    // Search Console FAQ additions (owner, October 26 2026); `revision` copies this text over the live copy once
    revision: 1,
    title: 'Roof Restoration vs. Replacement: Which Does Your Roof Need?',
    keyword: 'roof restoration',
    topics: ['replacement', 'restoration', 'repair', 'tile', 'flat', 'maintenance'],
    metaTitle: 'Roof Restoration vs. Replacement: Which Do You Need?',
    metaDescription:
      'Roof restoration can extend a roof’s life if the roof is sound. See what restoration means, when it works and when replacement is the better call.',
    datePublished: '2026-10-05',
    dateModified: '2026-10-05',
    excerpt:
      'Roof restoration can extend the life of a sound roof, but it will not save one that is worn out. Here is what restoration means, when it works and how to decide between restoring and replacing.',
    image: '/images/blog/roof-restoration-vs-replacement-side-by-side.webp',
    imageAlt: 'Two roofers side by side: on the left one cleaning an older shingle roof with a pressure washer, on the right one kneeling to install new dark shingles with a nail gun',
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
          'It can include repairing damaged pieces, resealing flashings, clearing debris and resetting tiles over new underlayment. Some contractors also apply a coating over a sound low-slope roof. Quality Roofing Specialists does not apply roof coatings: when a roof is sound we repair it, and when it is worn out we replace it.',
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
          'At QRS, our installs are backed by a 10-year workmanship warranty (call for details), and repairs carry the manufacturer’s warranty on the materials used, which depends on the product. See also our [roof repair](/roof-repair/) services.',
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
        q: 'What is the difference between roof repair and roof restoration?',
        a: 'A repair fixes one problem in one place, such as a leaking flashing or a cracked tile. Restoration works across the whole roof to renew it without a tear-off: repairing damaged pieces, resealing flashings and, on tile roofs, resetting the tiles over new underlayment. Replacement starts over from the deck.',
      },
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
    topics: ['storm', 'emergency', 'repair', 'insurance', 'leak'],
    metaTitle: 'Roof Storm Damage: Signs and What to Do Next',
    metaDescription:
      'Roof storm damage can hide from the ground. Learn the signs after wind and heavy rain in Southern California, the first steps and when to call a roofer.',
    datePublished: '2026-10-05',
    dateModified: '2026-10-05',
    excerpt:
      'Wind and heavy rain can damage a roof in ways you cannot see from the street. Here are the signs of roof storm damage, the first steps to take and when it is time to call a roofer.',
    image: '/images/blog/roof-storm-damage-signs-lifted-shingles.webp',
    imageAlt: 'A roofer in a rain jacket on a ladder lifting storm-damaged shingles to show the exposed roof deck, with broken branches and leaves scattered across the roof',
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
    // Search Console FAQ additions (owner, October 26 2026); `revision` copies this text over the live copy once
    revision: 1,
    title: 'Temporary Roof Repair: What Works Until a Roofer Arrives',
    keyword: 'temporary roof repair',
    topics: ['emergency', 'repair', 'leak', 'storm'],
    metaTitle: 'Temporary Roof Repair: What Works Until a Roofer Comes',
    metaDescription:
      'Temporary roof repair can limit water damage until a roofer arrives. See safe options, what each one fixes and when to call for help.',
    datePublished: '2026-10-05',
    dateModified: '2026-10-05',
    excerpt:
      'A tarp, a little sealant and a few precautions can limit water damage until a roofer can make the real repair. Here are the temporary options that work, what each one fixes and how to stay safe.',
    image: '/images/blog/temporary-roof-repair-options-patch.webp',
    imageAlt: 'A roofer in a rain jacket and cap kneeling on a wet shingle roof and cutting a sheet of waterproof patch material, with a bucket of sealant and a roll of tape beside him and a vent behind',
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
        q: 'How do I temporarily fix a leaking flat roof?',
        a: 'Only if the roof is dry, low and safe to reach. Clear the drain or scupper so water can leave, then cover the leaking area with a tarp weighted at the edges, or seal a small, clean, dry split with roofing cement. On a flat roof the leak is often away from the drip inside, so a tarp over a wide area works better than a dab of sealant. Then have a roofer find the source; see [flat roof repair](/residential-roofing/flat-roofing/repair/).',
      },
      {
        q: 'How do I temporarily patch a hole in my roof?',
        a: 'From inside, catch the water and protect your belongings first. On the roof, and only if it’s safe, a tarp that runs over the ridge and is weighted or battened at the edges is the most reliable short-term cover; roofing cement only suits small holes and cracks on a dry surface. A hole means the deck may be damaged, so call a roofer: our [emergency roof repair](/roof-repair/emergency/) page explains what we do.',
      },
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
    // Search Console wording (owner, October 23 2026): "roof insurance claim help", "roof insurance claim process", "roof damage insurance claim",
    // "roofing insurance claim", "roof claim". `revision` copies this text over the live copy in Supabase once (lib/postsStore.js applyFileRevisions).
    revision: 5, // meta title shortened for " | QRS" (owner, October 27 2026); `revision` copies it to the live copy once
    title: 'Roof Insurance Claims in California: Help, the Process and What to Document',
    keyword: 'roof insurance claims',
    topics: ['insurance', 'storm', 'emergency', 'repair', 'replacement'],
    metaTitle: 'Roof Insurance Claims in California: Help & Process',
    metaDescription:
      'Roof insurance claims in California: the roof insurance claim process, what to document after roof damage and the claim help a roofer can give you.',
    datePublished: '2026-10-05',
    dateModified: '2026-10-23',
    excerpt:
      'Roof insurance claims go more smoothly when you document the damage, protect the roof from more harm and get a written repair scope. Here is the roof insurance claim process, what insurers usually cover and the help a roofer can give.',
    image: '/images/blog/roof-insurance-claims-california-photo-documentation.webp',
    imageAlt: 'A roofer in a navy cap on a ladder photographing storm-damaged shingles and exposed roof decking with a tablet, to document the damage',
    intro: [
      'Roof insurance claims go more smoothly when you document the damage well, act quickly to prevent more, and get a clear written scope of the repair.',
      'Whether a claim is approved depends on your policy and on what caused the damage, and your insurer makes that decision. What you control is how well the damage is documented and how quickly the roof is protected.',
      'This guide explains what homeowners insurance usually covers, the first steps of a roof damage insurance claim, the roof insurance claim help a roofer can and cannot give, and what to expect from the roof insurance claim process in California.',
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
        heading: 'Filing a Roof Damage Insurance Claim: What to Do First',
        blocks: [
          'Whether it’s a small roof claim or a large one, these steps protect both your home and your claim:',
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
        heading: 'Roof Insurance Claim Help: What a Roofer Can and Cannot Do',
        blocks: [
          'A roofer can inspect the roof, photograph the damage, explain the cause in plain English and give you a written scope and price. Those are the documents an adjuster needs to see.',
          'That is the kind of roofing insurance claim help a contractor can honestly give. At Quality Roofing Specialists we work with insurance adjusters, and we can give you photos and a written scope to share with yours. Our team is small, so we do what we can to help.',
          'A roofing contractor cannot file or negotiate the claim for you. That is between you and your insurer, or a licensed public adjuster if you choose to hire one. Be careful with anyone who promises that insurance will pay for your roof.',
        ],
      },
      {
        heading: 'The Roof Insurance Claim Process: What to Expect',
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
        q: 'Does homeowners insurance cover a leaking roof?',
        a: 'It depends on why it leaks. A leak caused by a sudden, covered event, such as wind or a fallen branch, is often covered under the terms of your policy. A leak from age, wear or skipped maintenance usually isn’t. Your insurer decides, so check your policy, and get the roof photographed and the cause written down before anything is repaired.',
      },
      {
        q: 'Do I need an insurance-approved roofer?',
        a: 'Ask your insurer whether your policy has any rules about contractors. Whoever you hire should hold an active California contractor license, carry insurance and give you photos and a written scope and price you can share with your adjuster.',
      },
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
        q: 'Where can I get help with a roof insurance claim?',
        a: 'Your insurer and your agent explain your policy, and the [California Department of Insurance](https://www.insurance.ca.gov/) can help if you have a problem with a claim. A licensed public adjuster can handle the claim for you, for a fee. A roofer helps with the evidence: photos of the damage, the cause in plain English and a written scope and price for your adjuster.',
      },
      {
        q: 'What are the steps of the roof insurance claim process?',
        a: 'Stay safe and photograph the damage, protect the roof from further harm, report the loss to your insurer promptly, get a roofer’s inspection and written scope, then meet the adjuster and compare their estimate with your roofer’s. Your policy decides how the payment is calculated.',
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
    // Search Console FAQ additions (owner, October 26 2026); `revision` copies this text over the live copy once
    revision: 1,
    title: 'Wooden Roof Pros and Cons: Is a Wood Roof Right for Your Home?',
    keyword: 'wooden roof',
    topics: ['wood', 'shingle', 'tile', 'replacement'],
    metaTitle: 'Wooden Roof Pros and Cons: Is Wood Worth It?',
    metaDescription:
      'A wooden roof looks warm and natural, but fire rules, upkeep and cost matter in Southern California. See the pros and cons and the alternatives.',
    datePublished: '2026-10-05',
    dateModified: '2026-10-05',
    excerpt:
      'Wood shakes and shingles look beautiful, but fire risk, upkeep and cost make a wooden roof a hard fit for most Southern California homes. Here are the real pros and cons, and the alternatives.',
    image: '/images/blog/wooden-roof-pros-and-cons-cedar-shake.webp',
    imageAlt: 'A wood shake roof on a home with gabled dormers and a stone chimney, in natural daylight with tall evergreen trees behind',
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
        q: 'What are the disadvantages of a wooden roof?',
        a: 'Fire risk is the big one in Southern California, along with more upkeep than tile or shingles (cleaning, treating and replacing split or cupped pieces), sensitivity to moss and rot where it stays damp, a higher cost to install, and local fire rules that may require a fire-treated product or a different roof altogether.',
      },
      {
        q: 'What wood is used for roofing?',
        a: 'Mostly western red cedar, which resists rot and insects naturally, and sometimes redwood. They come as shakes (split, thicker and more rustic) or shingles (sawn, thinner and smoother). In fire-prone areas, look for fire-treated products that meet the local fire rating.',
      },
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
    topics: ['tile', 'underlayment', 'repair', 'replacement', 'leak'],
    metaTitle: 'Tile Roof Underlayment: When to Replace It',
    metaDescription:
      'Tile roof underlayment often wears out before clay or concrete tiles do. See the warning signs, lift & relay options and what affects cost in Los Angeles.',
    datePublished: '2026-10-02',
    dateModified: '2026-10-02',
    author: 'Tony G.',
    excerpt:
      'Clay and concrete tiles can last for decades, but the waterproofing beneath them has a shorter service life. Here’s how to tell when tile roof underlayment needs replacing, and what the work involves.',
    image: '/images/blog/tile-roof-underlayment-replacement.webp',
    imageAlt: 'A roofer in a cap and safety harness kneeling on a clay tile roof that has been stripped to new underlayment with wooden battens, with stacks of clay tiles ready to be set back',
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

// The newest published post that has a picture (else the newest): its thumbnail is shown beside the blog index's hero heading
// (components/sections/HeroLatestPost.jsx), so a new post without a picture yet doesn't empty the hero
const byNewest = [...PUBLISHED_POSTS].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
export const LATEST_POST = byNewest.find((p) => p.image) || byNewest[0];

// A heading's anchor for the table of contents: "Southern California’s Rainy Season" → "southern-californias-rainy-season"
export const headingId = (heading) =>
  heading
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
