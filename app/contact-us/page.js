import Faq from '@/components/sections/Faq';
import FinalCta from '@/components/sections/FinalCta';
import Offices from '@/components/sections/Offices';
import PageHero from '@/components/sections/PageHero';
import RoofCheck from '@/components/sections/RoofCheck';
import ServiceArea from '@/components/sections/ServiceArea';
import ValueGrid from '@/components/sections/ValueGrid';
import JsonLd from '@/components/ui/JsonLd';
import { CONTACT_LINK, HOME } from '@/data/catalog';
import { CONTACT_PAGE as page } from '@/data/pages/contact';
import { BUSINESS, PHONE, TEL } from '@/data/site';
import { hoursList } from '@/lib/hours';
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
    a: `We’re open ${HOURS.map((h) => `${h.days} ${h.time}`).join(' and ')}. Outside those hours, send the [estimate form](#roof-check) and we’ll follow up.`,
  },
  ...page.faqs,
];

const schema = pageJsonLd({ path: CONTACT_LINK.href, title: page.metaTitle, description: page.metaDescription, type: 'ContactPage', crumbs: CRUMBS, faqs: FAQS });

// Contact page (content in data/pages/contact.js; offices and hours in data/site.js)
export default function ContactPage() {
  return (
    <main id="top">
      <JsonLd data={schema} />
      <PageHero
        crumbs={CRUMBS}
        eyebrow="Contact"
        title={page.hero.heading}
        intro={page.hero.intro}
        card={{ kicker: 'Reach our team', scene: 'scene-inspect', highlights: [`Call ${PHONE}`, 'Offices in Los Angeles, Woodland Hills & Vernon', HOURS_LINE] }}
        actions={[
          { label: `Call ${PHONE}`, href: TEL, style: 'red' },
          { label: 'Request an Estimate', href: '#roof-check', style: 'line' },
        ]}
      />
      <Offices sub="Visit or call any of our offices. One phone number reaches our whole team." note={`Hours: ${HOURS_LINE}`} />
      <ValueGrid heading={page.ways.heading} items={page.ways.items} />
      <RoofCheck />
      <ServiceArea heading="Check Your Service Area" sub="Enter your ZIP code or pick a city on the map to see its phone number, estimate link and city page." />
      <Faq heading="Contact FAQs" sub="Straight answers about reaching our team." faqs={FAQS} cta={false} />
      <FinalCta />
    </main>
  );
}
