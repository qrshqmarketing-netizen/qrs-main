// Privacy Policy (/privacy-policy/) and Terms & Conditions (/terms-and-conditions/): the same addresses as the old site.
// DRAFTS written from how this website works. Have them reviewed by your attorney before launch, and update them
// when the site changes (for example when analytics, advertising pixels or new forms are added).
// sections: [{ heading, paragraphs?: [...] (before the list), items?: [...] (a bulleted list), after?: [...] }].
// Text can link with [words](/path/).

const UPDATED = 'September 25, 2026';
const CONTACT = 'email [info@qualityroofingspecialists.com](mailto:info@qualityroofingspecialists.com), call [(310) 340-1643](tel:+13103401643) or write to Quality Roofing Specialists, 1444 N Poinsettia Pl, Unit 308, Los Angeles, CA 90046';

export const PRIVACY_POLICY = {
  keyword: 'privacy policy',
  metaTitle: 'Privacy Policy',
  metaDescription: 'Privacy policy for Quality Roofing Specialists: what our website collects, how we use it, who we share it with, and your choices and California privacy rights.',
  title: 'Privacy Policy',
  updated: UPDATED,
  intro: 'This privacy policy explains what information Quality Roofing Specialists (“QRS,” “we,” “us”) collects through qualityroofingspecialists.com, how we use it and the choices you have. It covers this website and the requests you send us through it.',
  sections: [
    {
      heading: 'Information you give us',
      paragraphs: ['When you request an estimate, use the Instant Quote, chat with our website assistant, email us or call us, you may give us:'],
      items: [
        'Your name, phone number and email address',
        'The property address or ZIP code',
        'Details about your roof and project, such as roof size, pitch and roof type',
        'Photos or other files you choose to send',
      ],
    },
    {
      heading: 'Information collected automatically',
      items: [
        '**Approximate location.** When you view our service area map, the site asks our hosting provider for your approximate, city-level location based on your internet connection (IP address), so it can show the QRS location nearest you. We don’t store it.',
        '**Browser storage.** We use your browser’s local storage to remember simple choices, such as closing the cookie notice or the review pop-up. This stays in your browser.',
        '**Technical logs.** Like most websites, our hosting provider records technical information such as IP address, browser type and the pages requested, to keep the site running and secure.',
        '**Cookies and analytics.** If we use analytics tools such as Google Analytics, they may set cookies that help us understand how visitors use the site. You can block or delete cookies in your browser settings.',
      ],
    },
    {
      heading: 'Services that help run this website',
      items: [
        'The service area map loads map tiles from OpenStreetMap, and ZIP code lookups are sent to OpenStreetMap’s Nominatim service.',
        'When you enter an address in the Instant Quote, it’s sent to a mapping service (Google Maps Platform, or OpenStreetMap in demo mode) to find the roof and estimate its size, and satellite imagery is loaded from Esri.',
        'Our website assistant sends your chat messages to an AI language model provider (via OpenRouter) to generate a reply. If you share your name and a phone number or email while chatting, that information may be passed to our customer management system so our team can follow up.',
        'Requests you submit may be delivered to our customer management system so our team can follow up.',
      ],
      after: ['These services receive the information needed to do their job, such as the address you enter and your IP address, and handle it under their own privacy policies.'],
    },
    {
      heading: 'How we use information',
      items: [
        'To respond to your requests, schedule Roof Checks and prepare estimates and written scopes',
        'To provide our roofing services and follow up after the work',
        'To contact you by phone, text or email about your request or project',
        'To keep the website working, secure and useful',
        'To meet legal, tax and accounting obligations',
      ],
    },
    {
      heading: 'How we share information',
      paragraphs: [
        'We share information only as needed to run our business: with service providers that work for us (such as hosting, customer management, email, phone and mapping services); with a financing provider if you choose to apply for financing; when the law requires it or to protect our rights and the safety of others; and as part of a merger or sale of the business.',
        '**We do not sell your personal information, and we do not share it for cross-context behavioral advertising.**',
      ],
    },
    {
      heading: 'Your California privacy rights',
      paragraphs: [
        'If you live in California, the California Consumer Privacy Act, as amended by the California Privacy Rights Act, gives you the right to:',
      ],
      items: [
        'Know what personal information we collect about you and how we use and share it',
        'Get a copy of your personal information',
        'Correct information that’s inaccurate',
        'Delete your personal information, subject to exceptions allowed by law',
        'Opt out of the sale or sharing of personal information (we don’t sell or share it)',
        'Not be treated differently for using these rights',
      ],
    },
    {
      heading: 'How to make a request',
      paragraphs: [
        `To use any of these rights, ${CONTACT}. We’ll confirm your identity before acting on a request, and you can have an authorized agent make a request for you. Because we don’t sell or share personal information, we don’t act on Do Not Track or Global Privacy Control signals differently.`,
      ],
    },
    {
      heading: 'How long we keep information',
      paragraphs: ['We keep information for as long as we need it to respond to you, provide our services, keep business records and meet legal requirements, and then delete it or keep it in a form that no longer identifies you.'],
    },
    {
      heading: 'Security',
      paragraphs: ['We use reasonable measures to protect the information you give us. No website or online service is completely secure, so please don’t send sensitive information such as payment card or Social Security numbers through our forms.'],
    },
    {
      heading: 'Children',
      paragraphs: ['This website isn’t meant for children under 16, and we don’t knowingly collect their personal information. If you believe a child has given us information, contact us and we’ll delete it.'],
    },
    {
      heading: 'Links to other websites',
      paragraphs: ['Our site links to other websites, such as Google reviews and maps. We aren’t responsible for their content or privacy practices.'],
    },
    {
      heading: 'Changes to this policy',
      paragraphs: ['We may update this policy from time to time. The date at the top shows when it last changed.'],
    },
    {
      heading: 'Contact us',
      paragraphs: [`Questions about this policy? Please ${CONTACT}.`],
    },
  ],
};

export const TERMS = {
  keyword: 'terms and conditions',
  metaTitle: 'Terms & Conditions',
  metaDescription: 'Terms and conditions for using the Quality Roofing Specialists website, including estimates, the Instant Quote, financing examples and how we contact you.',
  title: 'Terms & Conditions',
  updated: UPDATED,
  intro: 'These terms and conditions apply to your use of qualityroofingspecialists.com, the website of Quality Roofing Specialists (“QRS,” “we,” “us”). By using the site, you agree to them. Roofing work itself is covered by the written scope and agreement you sign with us.',
  sections: [
    {
      heading: 'Information on this website',
      paragraphs: ['The information on this site is general and provided for your convenience. Every roof is different, so it isn’t a substitute for an inspection of your roof by a qualified roofer. We may change the site’s content at any time.'],
    },
    {
      heading: 'Estimates and the Instant Quote',
      paragraphs: ['Prices from the Instant Quote are ballpark estimates based on the information you enter and on satellite imagery. They aren’t a quote, an offer or a contract. Your actual price comes in a written scope after a roofer inspects the roof and confirms its measurements and condition.'],
    },
    {
      heading: 'Roof Checks and roofing services',
      paragraphs: ['Roof Checks and other visits are scheduled based on availability. The work we perform, its price, schedule and warranty are set out in the written scope and agreement for your project, and those documents control if they differ from anything on this website.'],
    },
    {
      heading: 'Financing',
      paragraphs: ['Financing is offered through third-party lenders, subject to credit approval and each lender’s own terms. Monthly payment examples on this site are illustrations only, not an offer of credit.'],
    },
    {
      heading: 'How we contact you',
      paragraphs: ['When you send a request through this site, you agree that QRS may contact you by phone, text message or email about that request, including with automated tools. Message and data rates may apply. You can ask us to stop at any time, for example by replying STOP to a text. Agreeing to be contacted isn’t a condition of buying anything from us.'],
    },
    {
      heading: 'Photos and information you send',
      paragraphs: ['If you send us photos or other material, you confirm you have the right to share it, and you allow us to use it to evaluate, plan and carry out your project.'],
    },
    {
      heading: 'Our content',
      paragraphs: ['The text, photos, logos and design of this website belong to QRS or are used with permission. Please don’t copy or reuse them without our written permission.'],
    },
    {
      heading: 'Other websites and services',
      paragraphs: ['This site uses and links to services run by others, such as maps and reviews. We don’t control them and aren’t responsible for their content or availability.'],
    },
    {
      heading: 'Disclaimer and limitation of liability',
      paragraphs: ['This website is provided “as is.” To the fullest extent the law allows, we make no promises about the website itself and aren’t liable for indirect or consequential damages from using it. This doesn’t limit the workmanship warranty or other terms in your written agreement with us.'],
    },
    {
      heading: 'Contractor license',
      paragraphs: ['Quality Roofing Specialists is a licensed California contractor, CSLB License #1061942. You can verify a contractor’s license with the [Contractors State License Board](https://www.cslb.ca.gov/).'],
    },
    {
      heading: 'Governing law and changes',
      paragraphs: ['These terms are governed by the laws of the State of California. We may update them from time to time; the date at the top shows when they last changed.'],
    },
    {
      heading: 'Contact us',
      paragraphs: [`Questions about these terms? Please ${CONTACT}.`],
    },
  ],
};

export const ACCESSIBILITY = {
  keyword: 'accessibility statement',
  metaTitle: 'Accessibility Statement',
  metaDescription: 'Quality Roofing Specialists is committed to a website that works for everyone. Read our accessibility statement and how to reach us about accessibility.',
  title: 'Accessibility Statement',
  updated: UPDATED,
  intro: 'Quality Roofing Specialists (“QRS,” “we,” “us”) wants everyone, including people with disabilities, to be able to use qualityroofingspecialists.com.',
  sections: [
    {
      heading: 'Our approach',
      paragraphs: ['We work toward meeting the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA, as a general standard for this website, and we review and improve the site over time. This is an ongoing effort, not a claim that every page fully meets that standard today.'],
    },
    {
      heading: 'If you have trouble using this site',
      paragraphs: [`If you have difficulty accessing any part of this website, or need information in a different format, please ${CONTACT}. Let us know the page and what happened, and we’ll do our best to help and to fix the issue.`],
    },
    {
      heading: 'Third-party content',
      paragraphs: ['Some features on this site, such as maps, embedded reviews and our website assistant, are provided by other companies. We can’t guarantee the accessibility of those third-party tools, but we choose them with accessibility in mind where we can.'],
    },
    {
      heading: 'Changes to this statement',
      paragraphs: ['We may update this statement as the website changes. The date at the top shows when it last changed.'],
    },
  ],
};
