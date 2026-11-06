import FinalCta from '@/components/sections/FinalCta';
import Offices from '@/components/sections/Offices';
import ServiceArea from '@/components/sections/ServiceArea';
import { QhContactCard, QhHero, QhPoints, QhReviews, QhStart } from '@/components/home/QrsSections';
import JsonLd from '@/components/ui/JsonLd';
import { CONTACT_LINK, HOME } from '@/data/catalog';
import { CONTACT_PAGE as page } from '@/data/pages/contact';
import { BUSINESS, PHONE, TEL } from '@/data/site';
import { hoursList } from '@/lib/hours';
import { heroOutcome } from '@/data/heroOutcomes';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: CONTACT_LINK.href });

const CRUMBS = [HOME, CONTACT_LINK];
const HOURS = hoursList(BUSINESS.hours);
const shortDays = (days) => days.replace(/(Mon|Tue|Wed|Thu|Fri|Sat|Sun)[a-z]+/g, '$1');
const HOURS_LINE = HOURS.map((h) => `${shortDays(h.days)} ${h.time}`).join(' · ');
// Hours FAQ built from BUSINESS.hours, so it stays in step with the rest of the site
const FAQS = [
  {
    q: 'What are your business hours?',
    a: `Our office is open ${HOURS.map((h) => `${h.days} ${h.time}`).join(' and ')}. Outside those hours, send the [estimate form](#roof-check) and we’ll follow up.`,
  },
  {
    q: 'Can you help outside office hours for a roofing emergency?',
    a: 'Yes. Our field techs take emergency calls on weekdays and weekends outside regular office hours. Call us and we’ll let you know the next available time.',
  },
  ...page.faqs,
];

const schema = pageJsonLd({ path: CONTACT_LINK.href, title: page.metaTitle, description: page.metaDescription, type: 'ContactPage', crumbs: CRUMBS, faqs: FAQS });

const icon = (d) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);

// Contact page (content in data/pages/contact.js; offices and hours in data/site.js), in the new home page's theme (owner, November 6 2026;
// components/home/QrsSections.jsx, QrsHome.css): the hero with the page photo and a "Talk to a roofer" card of real links (QhContactCard), the
// offices with their addresses and numbers (the contact details themselves, so the cities in the addresses stay), the ways to reach us, a review,
// the ZIP map, the FAQ beside the request form and the closing call to action.
export default function ContactPage() {
  return (
    <main id="top" className="qh">
      <JsonLd data={schema} />
      <QhHero
        crumbs={CRUMBS}
        title={page.hero.heading}
        outcome={heroOutcome('/contact-us/')}
        text={page.hero.intro}
        checks={[HOURS_LINE, `Email ${BUSINESS.email}`, 'Emergency calls after hours and weekends', 'Each office has its own number']}
        actions={[
          { label: `Call ${PHONE}`, href: TEL, style: 'gold' },
          { label: 'Request an Estimate', href: '#roof-check', style: 'line' },
        ]}
        visual={
          <QhContactCard
            image={page.hero.image}
            alt={page.hero.imageAlt}
            rows={[
              { label: 'Call us', value: PHONE, href: TEL, icon: icon(<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />) },
              { label: 'Email us', value: BUSINESS.email, href: `mailto:${BUSINESS.email}`, icon: icon(<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6l-10 7L2 6" /></>) },
              { label: 'Request an estimate', value: 'Two minutes, a clear next step', href: '#roof-check', icon: icon(<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h6" /></>) },
            ]}
            caption="Talk to a roofer, not a call center."
          />
        }
      />
      <div className="lc-keep">
        <Offices sub="Visit or call any of our offices. Each office has its own number, or call our main line." note={`Hours: ${HOURS_LINE}`} photos={false} />
      </div>
      <QhPoints id="ways" kicker="Contact" heading={page.ways.heading} items={page.ways.items} />
      <QhReviews path={CONTACT_LINK.href} />
      <div className="lc-keep">
        <ServiceArea heading="Check Your Service Area" sub="Enter your ZIP code to confirm we cover your address, or pick your city from the list." />
      </div>
      <QhStart faqs={FAQS} heading="Contact FAQs" />
      <FinalCta
        heading="Talk to a Roofer, Not a Call Center"
        text="Call the office or send the form, and a roofer gets back to you with a clear next step, a written scope and a price."
      />
    </main>
  );
}
