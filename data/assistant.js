// QRS Roof Assistant (chat bubble in the bottom-right corner).
// Answers are matched top to bottom: the first `match` that fits the visitor's message wins.
// `chips` are the suggested follow-up buttons. null = the starter questions, [] = none.

import { BUSINESS, PHONE, TEL } from './site';

// The chat assistant's backend: app/api/chat/route.js (an OpenRouter model — see OPENROUTER_API_KEY and
// OPENROUTER_MODEL in .env.local). Set NEXT_PUBLIC_CHAT_ENDPOINT only to point the widget at a different,
// separately hosted backend instead. Either way, the backend receives POST {messages:[{role,content}]} and
// returns {reply:"..."}; if it's unreachable or NEXT_PUBLIC_CHAT_ENDPOINT is explicitly set to nothing while
// OPENROUTER_API_KEY is also unset, the built-in answers below are used instead.
export const CHAT_ENDPOINT = process.env.NEXT_PUBLIC_CHAT_ENDPOINT || '/api/chat/';

const call = `<a href="${TEL}">${PHONE}</a>`;
const check = '<a href="#roof-check" data-qa-close>$199 Roof Check</a>';

export const GREETING = [
  'Hi! I\'m the QRS Roof Assistant. 👋 I can answer questions about roof repairs, replacements, our $199 Roof Check and more.',
  'What can I help you with?',
];

// System prompt for the AI backend (app/api/chat/route.js). Keep facts here in sync with data/site.js and
// the built-in ANSWERS below, and update it whenever those change.
export const SYSTEM_PROMPT = `You are the QRS Roof Assistant, a chat assistant on the ${BUSINESS.name} website (qualityroofingspecialists.com). You help visitors with roofing questions and help route them to a callback or the right next step. Before your answer, you may be given a "Relevant content from this website" message with real content pulled from the specific pages that match what the visitor asked. Treat it as your best source: pull out its actual specifics — names, numbers, neighborhoods, steps, prices, list items — instead of answering in vague generalities. Only fall back to the short facts below when no relevant content is given or it doesn't cover the question.

Facts you can rely on:
- Services: roof repair, roof replacement, tile lift & relay, flat roofing, shingle roofing, metal roofing, rain gutters, HOA & multi-family roofing, commercial roofing, and roof inspections.
- Installs are backed by a lifetime workmanship warranty.
- Service area: Los Angeles and Orange County, Southern California.
- Phone: ${PHONE}. Quality Roofing Specialists is a licensed California contractor, CSLB License #${BUSINESS.license}.

Rules:
- Never invent facts, prices, warranty terms or timelines beyond what's given here or in the relevant content. If you don't know something, say so and offer a call to ${PHONE}.
- Don't make up a price for a repair or replacement — every roof is different, and that pricing comes only after an on-site inspection. If the relevant content gives you real prices (for example, Roof Care Plan tiers), quote those exactly.
- When relevant content is given, be specific — mention the actual names, numbers or items it contains rather than a generic restatement. A vague answer when specific content was provided is a failure.
- Don't give legal, contractual or financing advice, and don't promise financing terms.
- Never ask for or accept payment details, Social Security numbers or other sensitive personal information.
- Never recommend, mention or link to another company's website or a third-party resource (no other contractors, review sites, "search online for...", etc.). Everything a visitor needs is on this website or a call away — guide them to the right page or ${PHONE} instead.
- If asked whether you're an AI, say yes.
- Always be warm, friendly and helpful — keep answers short (2-4 sentences) and specific to roofing, and steer the visitor toward a clear next step on this site.
- Answer in plain conversational text only. The chat window doesn't render Markdown or links, so never write [text](url) links, **bold**, bullet lists or headings — if you want to point to a page, just say its name in plain words (e.g. "our Financing page").
- If the visitor has shared enough for someone to follow up with them (their name, and a phone number or email), thank them naturally, mention someone from QRS will follow up, and end your reply with a line starting with [[LEAD]] followed by compact JSON with keys name, phone, email, zip, interest (use "" for anything not given). Only do this once, the first time you have a name and a phone or email — never repeat it later in the conversation, and never mention this line or show it to the visitor.`;

export const STARTERS = ['I have a leak', 'What is the $199 Roof Check?', 'How much does it cost?', 'What areas do you serve?'];

// Chip label → message sent when it's tapped (when they differ)
export const CHIP_PROMPTS = {
  'Book a Roof Check': 'I want to book a roof check',
  'Talk to a person': 'Can I talk to a person?',
  'What is tile lift & relay?': 'What is tile lift and relay?',
};

export const ANSWERS = [
  {
    match: /leak|drip|water|stain|ceiling|storm|emergenc|damage|wind|rain/,
    answer: 'Sorry you\'re dealing with that. For an active leak or storm damage, the fastest route is to call us at ' + call + '. Otherwise, a ' + check + ' will pinpoint the cause and we\'ll photo-document exactly what we find.',
    chips: ['Book a Roof Check', 'Talk to a person'],
  },
  {
    match: /199|roof check|inspect|inspection|look at/,
    answer: 'The ' + check + ' is a roofer-led inspection — not a sales pitch. We photo-document your roof\'s condition, explain it in plain English and give you a clear next step: repair, monitor, maintain or replace. There\'s no deposit; you pay after the visit.',
    chips: ['Book a Roof Check', 'What areas do you serve?'],
  },
  {
    match: /cost|price|how much|quote|estimate|expensive|afford|pricing/,
    answer: 'Every roof is different, so we don\'t guess at prices. After a ' + check + ' you get a written scope and price before any work starts — no pressure and no mystery pricing.',
    chips: ['Book a Roof Check', 'Do I need a new roof?'],
  },
  {
    match: /warrant|guarantee/,
    answer: 'Our installs are backed by a lifetime workmanship warranty. At the final walkthrough we go over your warranty with you in plain English. <a href="#guarantee" data-qa-close>See the QRS Guarantee</a>.',
    chips: ['How does the process work?', 'Book a Roof Check'],
  },
  {
    match: /area|serve|zip|city|location|near|orange county|los angeles|\bla\b|\boc\b|\b9\d{4}\b|santa monica|pasadena|glendale|burbank|torrance|long beach|anaheim|santa ana|huntington|irvine|newport/,
    answer: 'We serve homeowners across Los Angeles and Orange County. You can enter your ZIP in our <a href="/service-areas/" data-qa-close>service area map</a> to check your city, or call ' + call + '.',
    chips: ['Book a Roof Check', 'What services do you offer?'],
  },
  {
    match: /replace|new roof|re-?roof|need a new|old roof|age/,
    answer: 'Not always! Many roofs just need a targeted repair or a tile lift &amp; relay. A ' + check + ' tells you what your roof actually needs, so you don\'t pay for work you don\'t need.',
    chips: ['What is tile lift & relay?', 'Book a Roof Check'],
  },
  {
    match: /tile lift|relay|underlayment/,
    answer: 'With a tile lift &amp; relay, we lift your existing tiles, replace the worn underlayment underneath and reset the roof cleanly — keeping the look you already love.',
    chips: ['Book a Roof Check', 'What services do you offer?'],
  },
  {
    match: /service|offer|do you do|tile|shingle|flat|type/,
    answer: 'We handle roof replacements, roof repairs, tile lift &amp; relay, flat roofing, shingle roofing, and inspections &amp; roof care. <a href="/residential-roofing/" data-qa-close>See all services</a>.',
    chips: ['Do I need a new roof?', 'Book a Roof Check'],
  },
  {
    match: /process|how does|how it works|step|work with/,
    answer: 'It\'s four steps: <b>1.</b> Roof Check — we inspect and photo-document. <b>2.</b> Clear Quote — a written scope and price. <b>3.</b> Expert Install — done cleanly and to spec. <b>4.</b> Final Walkthrough — we review the roof and your warranty with you.',
    chips: ['How much does it cost?', 'Book a Roof Check'],
  },
  {
    match: /book|schedule|appointment|sign up|get started|start/,
    answer: 'Great! You can <a href="#estimate" data-qa-close>fill out the quick form</a> — it takes about two minutes — or call us at ' + call + '.',
    chips: ['Talk to a person'],
  },
  {
    match: /person|human|call|phone|talk|speak|contact|agent/,
    answer: 'Of course — you can reach our team at ' + call + '. Or <a href="#estimate" data-qa-close>send us a request</a> and we\'ll follow up.',
    chips: [],
  },
  {
    match: /experience|years|how long have|licens|trust|who are/,
    answer: 'QRS brings 30+ years of roofing experience to every job, with detail-first workmanship across LA and Orange County. <a href="/about-us/" data-qa-close>Why homeowners choose QRS</a>.',
    chips: ['How does the process work?', 'Book a Roof Check'],
  },
  {
    match: /^(hi|hello|hey|yo|good (morning|afternoon|evening))\b/,
    answer: 'Hi there! What can I help you with today?',
    chips: null,
  },
  {
    match: /thank|thanks|appreciate/,
    answer: 'You\'re welcome! Anything else I can help with?',
    chips: null,
  },
];

// Used when nothing above matches
export const FALLBACK_ANSWER =
  'Good question — I don\'t want to guess on that one. Our team can give you a straight answer at ' + call + ', or start with a ' + check + '.';
