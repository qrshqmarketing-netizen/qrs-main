import StartStepper from '@/components/sections/StartStepper';
import JsonLd from '@/components/ui/JsonLd';
import { HOME } from '@/data/catalog';
import { START_PATH } from '@/data/start';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

// /start/: the step-by-step request form that every "Get Pro Advice" / "Request an Estimate" link opens (data/start.js,
// components/sections/StartStepper.jsx). It replaced the estimate form at the bottom of each page. Like /thank-you/ it's a
// working page, not something to find in search, so it stays out of search results and the sitemap.
const TITLE = 'Start Your Free Roof Evaluation';
const DESCRIPTION = 'Tell Quality Roofing Specialists what your roof needs in a few quick steps. A roofer follows up with a clear next step and a written scope before any work.';

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: START_PATH, noindex: true });

const CRUMBS = [HOME, { label: 'Get Started', href: START_PATH }];

export default function StartPage() {
  return (
    <main id="top">
      <JsonLd data={pageJsonLd({ path: START_PATH, title: TITLE, description: DESCRIPTION, crumbs: CRUMBS })} />
      <section className="start">
        <StartStepper />
      </section>
    </main>
  );
}
