// Frequently asked questions. The first one starts open.
// Answers can be plain text, or use <a href="..."> for links like the last one.

import { PHONE, TEL } from './site';

export const FAQS = [
  {
    q: 'What is the $199 Roof Check?',
    a: 'It’s a roofer-led inspection of your roof’s condition — not a sales pitch. We photo-document what we find, explain it in plain English and give you a clear next step: repair, monitor, maintain or replace.',
  },
  {
    q: 'Do I have to pay anything up front?',
    a: 'No. There’s no deposit to start the Roof Check — you pay after the visit.',
  },
  {
    q: 'Do I need a full roof replacement?',
    a: 'Not always. Many roofs just need a targeted repair or a tile lift & relay. The Roof Check tells you what your roof actually needs, so you’re not paying for work you don’t need.',
  },
  {
    q: 'Will I know the price before work starts?',
    a: 'Yes. Before any work begins, you get a written scope and price. No pressure, no mystery pricing and no surprises.',
  },
  {
    q: 'What kind of warranty do you offer?',
    a: 'Our installs are backed by a lifetime workmanship warranty. At the final walkthrough we go over your warranty with you in plain English.',
  },
  {
    q: 'What types of roofs do you work on?',
    a: 'We handle tile, shingle and flat roofing, including roof replacements, roof repairs, tile lift & relay, inspections and ongoing roof care.',
  },
  {
    q: 'What areas do you serve?',
    a: (
      <>
        We serve homeowners across Los Angeles and Orange County. Enter your ZIP code in our{' '}
        <a href="#service-area">service area map</a> to check your city, or call <a href={TEL}>{PHONE}</a>.
      </>
    ),
  },
];
