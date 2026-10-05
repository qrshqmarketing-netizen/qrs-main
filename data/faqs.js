// Home page FAQ. The first one starts open.
// Answers can link to pages with [words](/path/) (see components/ui/Rich.jsx).

import { formatDate } from '@/lib/dates';
import { BUSINESS, PHONE, TEL } from './site';

export const FAQS = [
  {
    q: 'Is the roof evaluation free? What is the $199 Roof Check?',
    a: 'Yes, the roof evaluation is free. We use drone footage to see the condition of your roof, explain what we find in plain English and give you a clear next step: repair, monitor, maintain or replace. The $199 Roof Check is optional. It’s a tune-up where we seal the vents, pipes and flashings as much as possible, and if you move forward with a repair or replacement, the $199 is credited toward the job.',
  },
  {
    q: 'Do I have to pay anything up front?',
    a: 'No. The roof evaluation is free, and if you choose the optional $199 Roof Check, there’s no deposit — you pay after the visit.',
  },
  {
    q: 'Do I need a full roof replacement?',
    a: 'Not always. Many roofs just need a targeted repair or a [tile lift & relay](/residential-roofing/tile-roofing/lift-and-relay/). The free roof evaluation tells you what your roof actually needs, so you’re not paying for work you don’t need.',
  },
  {
    q: 'Will I know the price before work starts?',
    a: 'Yes. Before any work begins, you get a written scope and price. No pressure, no mystery pricing and no surprises.',
  },
  {
    q: 'What kind of warranty do you offer?',
    a: 'Our installs are backed by a 10-year workmanship warranty, and the roofing materials carry the manufacturer’s warranty, which depends on the product and its warranty tier. At the final walkthrough we go over your warranty with you in plain English.',
  },
  {
    q: 'Is Quality Roofing Specialists a licensed roofing contractor in Los Angeles?',
    a: `Yes. QRS is a licensed, bonded and insured California roofing contractor: CSLB license #${BUSINESS.license}, licensed since ${formatDate(BUSINESS.licenseSince)}. We work on homes and businesses across Los Angeles and Orange County.`,
  },
  {
    q: 'What types of roofs do you work on?',
    a: 'We handle [tile](/residential-roofing/tile-roofing/), [shingle](/residential-roofing/shingle-roofing/) and [flat roofing](/residential-roofing/flat-roofing/), including roof replacements, roof repairs, tile lift & relay, inspections and ongoing roof care.',
  },
  {
    q: 'What areas do you serve?',
    a: `We serve homeowners across [Southern California](/service-areas/). Enter your ZIP code in our [service area map](#service-area) to check your city, or call [${PHONE}](${TEL}).`,
  },
];
