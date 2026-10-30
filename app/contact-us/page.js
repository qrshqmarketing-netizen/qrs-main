import Faq from '@/components/sections/Faq';
import ReviewMarquee from '@/components/sections/ReviewMarquee';
import FinalCta from '@/components/sections/FinalCta';
import { AbrHero } from '@/components/about/AboutRemote';
import Offices from '@/components/sections/Offices';
import RoofCheck from '@/components/sections/RoofCheck';
import ServiceArea from '@/components/sections/ServiceArea';
import ValueGrid from '@/components/sections/ValueGrid';
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

// Contact page (content in data/pages/contact.js; offices and hours in data/site.js)
export default function ContactPage() {
  return (
    <main id="top" className="abr">
      <JsonLd data={schema} />
      <AbrHero
        crumbs={CRUMBS}
        path="/contact-us/"
        title={page.hero.heading}
        outcome={heroOutcome('/contact-us/')}
        intro={page.hero.intro}
        media={{ image: page.hero.image, alt: page.hero.imageAlt }}
        actions={[
          { label: `Call ${PHONE}`, href: TEL, style: 'dark' },
          { label: 'Request an Estimate', href: '#roof-check', style: 'line' },
        ]}
      />
      <div className="abr-keep">
        <Offices sub="Visit or call any of our offices. Each office has its own number, or call our main line." note={`Hours: ${HOURS_LINE}`} photos={false} />
        <ValueGrid heading={page.ways.heading} items={page.ways.items} />
        {/* Google reviews, a few sections below the hero (owner, October 14 2026) */}
        <ReviewMarquee />
        <RoofCheck />
        <ServiceArea heading="Check Your Service Area" sub="Enter your ZIP code to confirm we cover your address, or pick your city from the list." />
        <Faq heading="Contact FAQs" sub="Straight answers about reaching our team." faqs={FAQS} cta={false} />
      </div>
      <FinalCta
        heading="Talk to a Roofer, Not a Call Center"
        text="Call the office or send the form, and a roofer gets back to you with a clear next step, a written scope and a price."
      />
    </main>
  );
}
