import ThankYou from '@/components/sections/ThankYou';
import JsonLd from '@/components/ui/JsonLd';
import ChatGptPixel from '@/components/ui/ChatGptPixel';
import LeadConversion from '@/components/ui/LeadConversion';
import { HOME } from '@/data/catalog';
import { THANK_YOU_PAGE as page } from '@/data/pages/thankYou';
import { OPENAI_PIXEL_ID } from '@/data/site';
import { LOAD_TRACKING } from '@/lib/seo';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

// Thank-you page for the request forms (copy: data/pages/thankYou.js, layout: components/sections/ThankYou.jsx). Not in the sitemap or search results.
// For conversion tracking, count the generate_lead event (fired here by LeadConversion) or views of /thank-you/.
export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: page.path, noindex: true });

const CRUMBS = [HOME, { label: 'Thank You', href: page.path }];

export default function ThankYouPage() {
  return (
    <main id="top">
      <JsonLd data={pageJsonLd({ path: page.path, title: page.metaTitle, description: page.metaDescription, crumbs: CRUMBS })} />
      <LeadConversion />
      {/* ChatGPT ads conversion pixel: this page only, live site only, with the Analytics cookie choice (owner, November 11 2026) */}
      {LOAD_TRACKING && <ChatGptPixel pixelId={OPENAI_PIXEL_ID} />}
      <ThankYou page={page} />
    </main>
  );
}
