import EstimateForm from '@/components/sections/EstimateForm';
import Offices from '@/components/sections/Offices';
import { Check, QhContactCard, QhHero } from '@/components/home/QrsSections';
import JsonLd from '@/components/ui/JsonLd';
import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import { CONTACT_LINK, HOME } from '@/data/catalog';
import { CONTACT_PAGE as page } from '@/data/pages/contact';
import { BUSINESS, PHONE, TEL } from '@/data/site';
import { START_PATH } from '@/data/start';
import { hoursList } from '@/lib/hours';
import { heroOutcome } from '@/data/heroOutcomes';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: CONTACT_LINK.href });

const CRUMBS = [HOME, CONTACT_LINK];
const HOURS = hoursList(BUSINESS.hours);
const shortDays = (days) => days.replace(/(Mon|Tue|Wed|Thu|Fri|Sat|Sun)[a-z]+/g, '$1');
const HOURS_LINE = HOURS.map((h) => `${shortDays(h.days)} ${h.time}`).join(' · ');

const schema = pageJsonLd({ path: CONTACT_LINK.href, title: page.metaTitle, description: page.metaDescription, type: 'ContactPage', crumbs: CRUMBS });

const icon = (d) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);
const PHONE_ICON = icon(<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />);
const MAIL_ICON = icon(<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6l-10 7L2 6" /></>);
const FORM_ICON = icon(<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h6" /></>);

// The three ways to reach us, after the reference's simple contact page (owner, November 6 2026: bakerroofing.com/contact-us/)
const WAYS = [
  {
    title: 'General questions',
    text: 'Questions about your roof, a quote or how we work. A real person on our team gets back to you.',
    links: [
      { label: `Call ${PHONE}`, href: TEL },
      { label: BUSINESS.email, href: `mailto:${BUSINESS.email}` },
    ],
  },
  {
    title: 'Roof leaking now?',
    text: 'Our roofers take emergency calls on weekdays and weekends outside regular office hours.',
    links: [
      { label: `Call ${PHONE}`, href: TEL },
      { label: 'Emergency roof repair', href: '/roof-repair/emergency/' },
    ],
  },
  {
    title: 'Start a project',
    text: 'Tell us about the property and we’ll set up a roofer-led look at the roof, with a written scope and price before any work.',
    links: [
      { label: 'Request an estimate', href: '#roof-check' },
      { label: 'Step-by-step form', href: START_PATH },
    ],
  },
];

// Contact page (content in data/pages/contact.js; offices and hours in data/site.js). Simplified after bakerroofing.com/contact-us/ (owner,
// November 6 2026): the hero with the "Talk to a roofer" card, three ways to reach us (general questions, a leak now, a new project), the
// request form on its own and the offices with their own numbers (the addresses match the Google listings). The reviews, ZIP map, FAQ list and
// closing banner are gone from this page (the FAQ copy stays in data/pages/contact.js, unused).
export default function ContactPage() {
  return (
    <main id="top" className="qh">
      <JsonLd data={schema} />
      <QhHero
        crumbs={CRUMBS}
        title={page.hero.heading}
        outcome={heroOutcome('/contact-us/')}
        text={page.hero.intro}
        checks={[HOURS_LINE, `Email ${BUSINESS.email}`, 'Emergency calls after hours and weekends']}
        actions={[
          { label: `Call ${PHONE}`, href: TEL, style: 'gold' },
          { label: 'Request an Estimate', href: '#roof-check', style: 'line' },
        ]}
        visual={
          <QhContactCard
            image={page.hero.image}
            alt={page.hero.imageAlt}
            rows={[
              { label: 'Call us', value: PHONE, href: TEL, icon: PHONE_ICON },
              { label: 'Email us', value: BUSINESS.email, href: `mailto:${BUSINESS.email}`, icon: MAIL_ICON },
              { label: 'Request an estimate', value: 'Two minutes, a clear next step', href: '#roof-check', icon: FORM_ICON },
            ]}
            caption="Talk to a roofer, not a call center."
          />
        }
      />

      <section className="qh-section qh-contact-ways" aria-labelledby="ways-h">
        <div className="qh-wrap">
          <p className="qh-kicker">Contact</p>
          <h2 id="ways-h">How can we help?</h2>
          <div className="qh-finder-grid">
            {WAYS.map((w) => (
              <div className="qh-finder-card" key={w.title}>
                <h3>{w.title}</h3>
                <p>
                  <Rich text={w.text} />
                </p>
                <ul>
                  {w.links.map((l) => (
                    <li key={l.href}>
                      <SiteLink href={l.href}>{l.label} <span className="arrow" aria-hidden="true">→</span></SiteLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="qh-section qh-contact-form" id="roof-check" aria-labelledby="form-h">
        <div className="qh-wrap">
          <div className="qh-form-card" id="estimate">
            <h2 id="form-h">Request service</h2>
            <ul className="qh-perks">
              <li><Check />Takes about two minutes</li>
              <li><Check />A real person on our team follows up</li>
              <li><Check />Written scope and price before any work</li>
            </ul>
            <EstimateForm />
          </div>
        </div>
      </section>

      <div className="lc-keep qh-contact-offices">
        <Offices sub="Visit or call any of our offices. Each office has its own number, or call our main line." note={`Hours: ${HOURS_LINE}`} photos={false} />
      </div>
    </main>
  );
}
