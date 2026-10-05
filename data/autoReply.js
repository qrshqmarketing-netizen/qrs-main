// The wording of the confirmation email (built in lib/autoReply.js) that a visitor gets after sending the request form on /start/ or the
// Instant Quote with an email address. Keep what it promises in line with the thank-you page (data/pages/thankYou.js): it names no
// response time, no price for a roof evaluation or survey, and no claim the site doesn't already make.
// {phone} and {hours} are filled in from data/site.js.

export const AUTO_REPLY = {
  subject: 'We received your roof request',
  thanks: 'Thank you for contacting Quality Roofing Specialists. We received your request, and our team will reach out by phone or email.',
  // Only when they picked a preferred date or time on /start/. {when} is like "Tuesday, October 14, 2026 · Morning (8 am–12 pm)".
  preferred: 'Your preferred time: {when}. We’ll confirm your visit with you, and nothing is booked until we do.',
  // Only for the Instant Quote
  quoteNote: 'The range you saw in the Instant Quote is a starting point, not a final price. Your written price comes after a roofer has looked at your roof.',
  // Only when the visitor said water is coming in now
  urgent: {
    heading: 'Water coming in right now?',
    text: 'Don’t wait for us to call you. Call {phone} now so we can talk through what to do next.',
  },
  nextHeading: 'What happens next',
  steps: {
    home: [
      { title: 'We reach out', text: 'Our team contacts you to talk through your roof and set up a time for your free roof evaluation.' },
      { title: 'A dedicated roofing specialist will come out', text: 'They look at your roof and photograph what they find, so you can see it for yourself.' },
      { title: 'You get a written scope and price', text: 'You get one clear next step, with a written scope and price before any work begins. No pressure.' },
    ],
    // HOA, multi-family and commercial requests
    commercial: [
      { title: 'We reach out', text: 'Our team contacts you to learn about the building and set up a time for a roofer-led roof survey.' },
      { title: 'A dedicated roofing specialist will come out', text: 'They look at the roof and photo-document its condition, so owners, managers and tenants can all see it.' },
      { title: 'You get a written scope and price', text: 'You get one clear next step, with a written scope and price before any work begins. No pressure.' },
    ],
  },
  prepareHeading: 'To help us get ready',
  prepareIntro: 'All optional, but it speeds things up. You can reply to this email with photos.',
  prepare: {
    home: [
      'Photos of any leak, stain or damage.',
      'About when the roof was last repaired or replaced, if you know.',
      'The best times to reach you.',
    ],
    commercial: [
      'Photos or a description of any leaks or problem areas.',
      'Who can give our roofers access to the roof, and how.',
      'The roof type and age, if you know them.',
      'Anyone else who should get updates, such as an owner or property manager.',
    ],
  },
  sooner: {
    heading: 'Need us sooner?',
    text: 'Call {phone} ({hours}), or just reply to this email. It goes straight to our team.',
  },
  // Why they got it (a one-time confirmation, so no unsubscribe link)
  notYou: 'You are receiving this one-time confirmation because this email address was entered on qualityroofingspecialists.com. If that wasn’t you, you can ignore this message.',
};
