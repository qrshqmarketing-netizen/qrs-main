// QRS Roof Assistant (chat bubble in the bottom-right corner).
// Answers are matched top to bottom: the first `match` that fits the visitor's message wins.
// `chips` are the suggested follow-up buttons. null = the starter questions, [] = none.

import { BUSINESS, COMPANY, OFFICES, PHONE, TEL } from './site';
import { SEASON_PROMO } from './promo';
import { formatDate } from '@/lib/dates';
import { hoursText } from '@/lib/hours';

// The chat assistant's backend: app/api/chat/route.js (Google Gemini when GEMINI_API_KEY is set, else an OpenRouter model — see
// OPENROUTER_API_KEY and OPENROUTER_MODEL in .env.local). Set NEXT_PUBLIC_CHAT_ENDPOINT to the Supabase function (supabase/functions/chat) to run the
// assistant there instead; /api/chat/ then stays as the backup (components/widgets/RoofAssistant.jsx). Either way, the backend receives POST {messages:[{role,content}]} and
// returns {reply:"..."}; if it's unreachable or NEXT_PUBLIC_CHAT_ENDPOINT is explicitly set to nothing while
// OPENROUTER_API_KEY is also unset, the built-in answers below are used instead.
// The most a visitor can type or paste into one chat message. The box stops at this many characters, and both servers (app/api/chat, the Supabase function)
// enforce it again, so a long pasted block can't get through. Real questions are a sentence or two.
export const CHAT_MAX_CHARS = 500;

export const SITE_CHAT_ENDPOINT = '/api/chat/'; // the site's own route, also the backup when the endpoint below can't be reached
export const CHAT_ENDPOINT = process.env.NEXT_PUBLIC_CHAT_ENDPOINT || SITE_CHAT_ENDPOINT;

const call = `<a href="${TEL}">${PHONE}</a>`;
const check = '<a href="/start/" data-qa-close>free roof evaluation</a>';

export const GREETING = [
  'Hi! I\'m the QRS Roof Assistant. 👋 Ask me anything about your roof.',
  'I can also book your free roof evaluation. What do you need?',
];

// System prompt for the AI backend (app/api/chat/route.js). Keep facts here in sync with data/site.js and
// the built-in ANSWERS below, and update it whenever those change.
export const SYSTEM_PROMPT = `You are the QRS Roof Assistant, a chat assistant on the ${BUSINESS.name} website (qualityroofingspecialists.com). You help visitors with roofing questions and help route them to a callback or the right next step. Before your answer, you may be given a "Relevant content from this website" message with real content pulled from the specific pages that match what the visitor asked. Treat it as your best source: pull out its actual specifics — names, numbers, neighborhoods, steps, prices, list items — instead of answering in vague generalities. Only fall back to the short facts below when no relevant content is given or it doesn't cover the question.

Facts you can rely on:
- Services: roof repair, roof replacement, slate and concrete tile roofing, tile lift & relay, flat roofing, shingle roofing, standing seam metal roofing and metal roof repair, HOA & multi-family roofing, attic ventilation, commercial roofing (including TPO), and roof inspections.
- We do not apply roof coatings or restoration coatings, and we do not issue roof certifications for home sales. If asked, say so plainly and point to what we do: roof inspections, repair and replacement.
- Installs are backed by a 10-year workmanship warranty. Roofing materials, including those used in repairs, carry the manufacturer's warranty, which depends on the product and its warranty tier.
- Most home roof replacements take 3 to 5 days, depending on the roof's size, material, any decking repairs and the weather.
- We pull the building permits when a roofing project needs one.
- We help with insurance claims where we can: our photos and written scope can be shared with the insurance company. The team is small, so we can't always meet the adjuster.
- Homes start with a free roof evaluation: we use drone footage to see the roof's condition, with no charge and no obligation. Commercial buildings start with a roof survey instead.
- The optional $199 Roof Check is a tune-up where we seal the vents, pipes and flashings, where most leaks start. It's paid after the visit (no deposit), and the $199 counts toward a replacement if the homeowner moves forward.
${SEASON_PROMO.active ? '- This season: forecasters expect a very strong ("super") El Niño this winter, so we urge homeowners to book a free roof evaluation now, before the storms.\n' : ''}- Service area: Los Angeles and Orange County, Southern California.
- Phone: ${PHONE}, which reaches all of our offices. Hours: ${hoursText(BUSINESS.hours)}. Email: ${BUSINESS.email}.
- Offices: ${OFFICES.map((o) => `${o.name}, ${o.address.street}, ${o.address.city}`).join('; ')}.
- ${BUSINESS.legalName} is a licensed California contractor, CSLB License #${BUSINESS.license}, licensed since ${formatDate(BUSINESS.licenseSince)}.
- Mission and vision: ${COMPANY.mission} ${COMPANY.vision} Core values: ${COMPANY.values.map((v) => v.title).join(', ')}.

Rules:
- Never invent facts, prices, warranty terms or timelines beyond what's given here or in the relevant content. If you don't know something, say so and offer a call to ${PHONE}.
- Don't make up a price for a repair or replacement — every roof is different, and that pricing comes only after an on-site inspection. If the relevant content gives you real prices (for example, Roof Care Plan tiers), quote those exactly.
- When relevant content is given, be specific — mention the actual names, numbers or items it contains rather than a generic restatement. A vague answer when specific content was provided is a failure.
- Don't give legal, contractual or financing advice, and don't promise financing terms.
- Never ask for or accept payment details, Social Security numbers or other sensitive personal information.
- Never recommend, mention or link to another company's website or a third-party resource (no other contractors, review sites, "search online for...", etc.). Everything a visitor needs is on this website or a call away — guide them to the right page or ${PHONE} instead.
- If asked whether you're an AI, say yes.
- Words QRS uses: homeowners are "homeowners"; property management companies and commercial building owners are "clients"; QRS's own employees are "roofers"; outside or partner workers are "crews", never "subs" or "subcontractors"; general contractors are "contractors".
- Be concise: answer in 1-3 short sentences (about 50 words at most), with no preamble, no filler and no repeating the question. Be warm and plain-spoken.
- Your goal is to book a call to schedule the visitor's free roof evaluation (an estimate visit). Always answer the question first, specifically and honestly, then close with one short nudge toward booking, for example "Want me to set up a quick call for your free roof evaluation? Just share your name and phone number." Never push twice in a row if they decline, and never hold back an answer to force a booking.
- Answer in plain conversational text only. The chat window doesn't render Markdown or links, so never write [text](url) links, **bold**, bullet lists or headings — if you want to point to a page, just say its name in plain words (e.g. "our Financing page").
- When the visitor wants a callback, an estimate, a visit or to talk to someone, or after you have answered their question, offer to take their name and phone number (or email) right here in the chat so the team can call to schedule; the team gets their details automatically. Ask for those two things only, never for an address unless they offer it. For an active leak or storm damage, give the phone number first.
- If the visitor has shared enough for someone to follow up with them (their name, and a phone number or email), thank them naturally, mention someone from QRS will follow up, and end your reply with a line starting with [[LEAD]] followed by compact JSON with keys name, phone, email, zip, interest (use "" for anything not given). Only do this once, the first time you have a name and a phone or email — never repeat it later in the conversation, and never mention this line or show it to the visitor.`;

export const STARTERS = ['I have a leak', 'Is the roof evaluation free?', 'How much does it cost?', 'What areas do you serve?'];

// Chip label → message sent when it's tapped (when they differ)
export const CHIP_PROMPTS = {
  'Book a free evaluation': 'I want to book a free roof evaluation',
  'Talk to a person': 'Can I talk to a person?',
  'What is tile lift & relay?': 'What is tile lift and relay?',
};

export const ANSWERS = [
  {
    match: /coating|roof certif|certify (my|the|a) roof/,
    answer: 'We don\'t apply roof coatings, and we don\'t issue roof certifications for home sales. What we do is <a href="/roof-inspection/" data-qa-close>roof inspections</a>, roof repair and roof replacement, and a ' + check + ' will show what your roof needs.',
    chips: ['Book a free evaluation', 'What services do you offer?'],
  },
  {
    match: /leak|drip|water|stain|ceiling|storm|emergenc|damage|wind|rain/,
    answer: 'Sorry about that. For an active leak, call ' + call + ' now. Otherwise, a ' + check + ' pinpoints the cause. Want us to call you to schedule it?',
    chips: ['Book a free evaluation', 'Talk to a person'],
  },
  {
    match: /199|free|evaluat|roof check|inspect|inspection|look at/,
    answer: 'Yes, the <a href="/start/" data-qa-close>roof evaluation</a> is free: drone footage, a plain-English report and a clear next step. Want to schedule it? Share your name and phone number.',
    chips: ['Book a free evaluation', 'What areas do you serve?'],
  },
  {
    match: /cost|price|how much|quote|estimate|expensive|afford|pricing/,
    answer: 'Every roof is different, so we price after a ' + check + '. You get a written scope and price before any work starts. Want a call to schedule it?',
    chips: ['Book a free evaluation', 'Do I need a new roof?'],
  },
  {
    match: /warrant|guarantee/,
    answer: 'Installs carry a 10-year workmanship warranty, plus the manufacturer\'s warranty on materials. <a href="#guarantee" data-qa-close>See the QRS Guarantee</a>. Want to book your free evaluation?',
    chips: ['How does the process work?', 'Book a free evaluation'],
  },
  {
    match: /area|serve|zip|city|location|near|orange county|los angeles|\bla\b|\boc\b|\b9\d{4}\b|santa monica|pasadena|glendale|burbank|torrance|long beach|anaheim|santa ana|huntington|irvine|newport/,
    answer: 'We serve Los Angeles and Orange County. Check your ZIP on our <a href="/service-areas/" data-qa-close>service area map</a>, or share your name and phone number and we\'ll call you to schedule.',
    chips: ['Book a free evaluation', 'What services do you offer?'],
  },
  {
    match: /replace|new roof|re-?roof|need a new|old roof|age/,
    answer: 'Not always. Many roofs just need a repair or a tile lift &amp; relay. A ' + check + ' shows what yours needs. Want to schedule one?',
    chips: ['What is tile lift & relay?', 'Book a free evaluation'],
  },
  {
    match: /tile lift|relay|underlayment/,
    answer: 'We lift your tiles, replace the worn underlayment and reset them, keeping the look you have. Want a free evaluation to see if it fits your roof?',
    chips: ['Book a free evaluation', 'What services do you offer?'],
  },
  {
    match: /service|offer|do you do|tile|shingle|flat|type/,
    answer: 'Roof repair, replacement, tile, shingle, flat and metal roofing, and inspections. <a href="/residential-roofing/" data-qa-close>See all services</a>. Want to book your free evaluation?',
    chips: ['Do I need a new roof?', 'Book a free evaluation'],
  },
  {
    match: /process|how does|how it works|step|work with/,
    answer: 'Four steps: <b>1.</b> free roof evaluation, <b>2.</b> clear written quote, <b>3.</b> expert install, <b>4.</b> final walkthrough. Ready to start with the evaluation?',
    chips: ['How much does it cost?', 'Book a free evaluation'],
  },
  {
    match: /book|schedule|appointment|sign up|get started|start/,
    answer: 'Great! Type your name and phone number here and we\'ll call to schedule, or <a href="/start/" data-qa-close>use the quick form</a>, or call ' + call + '.',
    chips: ['Talk to a person'],
  },
  {
    match: /person|human|call|phone|talk|speak|contact|agent/,
    answer: 'Of course: call ' + call + ', or type your name and phone number here and we\'ll call you back.',
    chips: [],
  },
  {
    match: /experience|years|how long have|licens|trust|who are/,
    answer: 'Quality Roofing Specialists, Inc. is a licensed California contractor (CSLB #1061942) since 2020. <a href="/about-us/" data-qa-close>About us</a>. Want to book your free evaluation?',
    chips: ['How does the process work?', 'Book a free evaluation'],
  },
  {
    match: /^(hi|hello|hey|yo|good (morning|afternoon|evening))\b/,
    answer: 'Hi! What can I help you with?',
    chips: null,
  },
  {
    match: /thank|thanks|appreciate/,
    answer: 'You\'re welcome! Anything else I can help with?',
    chips: null,
  },
];

// When the visitor types a phone number or email and the built-in answers are in use (components/widgets/RoofAssistant.jsx):
// `saved` once the backend (app/api/chat/route.js) has passed the details to the team, `notSaved` if it couldn't
export const CONTACT_RE = /[\w.+-]+@[\w-]+(\.[\w-]+)+|\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;
export const CONTACT_ANSWERS = {
  saved: 'Thanks! Our team will call you soon to schedule. Urgent? Call ' + call + '.',
  notSaved: 'Thanks! So we don\'t miss you, please call us at ' + call + ' or <a href="/start/" data-qa-close>send the quick form</a>, and we\'ll follow up.',
};

// Used when nothing above matches
export const FALLBACK_ANSWER =
  'I don\'t want to guess on that. Call ' + call + ' for a straight answer, or book a ' + check + '.';
