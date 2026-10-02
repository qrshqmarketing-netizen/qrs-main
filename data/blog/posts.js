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

// A heading's anchor for the table of contents: "Southern California’s Rainy Season" → "southern-californias-rainy-season"
export const headingId = (heading) =>
  heading
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
