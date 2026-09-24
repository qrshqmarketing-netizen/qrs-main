import Faq from '@/components/sections/Faq';
import FinalCta from '@/components/sections/FinalCta';
import Guarantee from '@/components/sections/Guarantee';
import Hero from '@/components/sections/Hero';
import Process from '@/components/sections/Process';
import ProofBar from '@/components/sections/ProofBar';
import RoofCheck from '@/components/sections/RoofCheck';
import ServiceArea from '@/components/sections/ServiceArea';
import Services from '@/components/sections/Services';
import Testimonials from '@/components/sections/Testimonials';
import WhyQrs from '@/components/sections/WhyQrs';
import JsonLd from '@/components/ui/JsonLd';
import { HOME_DESCRIPTION, HOME_TITLE } from '@/data/site';
import { openGraphBase, twitterBase } from '@/lib/seo';
import { homeJsonLd } from '@/lib/structuredData';

export const metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: { ...openGraphBase, url: '/', title: HOME_TITLE, description: HOME_DESCRIPTION },
  twitter: { ...twitterBase, title: HOME_TITLE, description: HOME_DESCRIPTION },
};

// Home page: sections in order, top to bottom. Reorder or remove a line to change the page.
export default function HomePage() {
  return (
    <>
      <JsonLd data={homeJsonLd({ title: HOME_TITLE })} />
      <main id="top">
        {/* The keyword line above the big headline is the page's H1 (matches the page title) */}
        <Hero h1="eyebrow" />
        <ProofBar />
        <Services />
        <Faq />
        <Process />
        <WhyQrs />
        <Testimonials />
        <RoofCheck />
        <ServiceArea />
        <Guarantee />
        <FinalCta />
      </main>
    </>
  );
}
