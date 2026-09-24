import FinalCta from '@/components/sections/FinalCta';
import ImageHero from '@/components/sections/ImageHero';
import Overview from '@/components/sections/Overview';
import Process from '@/components/sections/Process';
import RoofCheck from '@/components/sections/RoofCheck';
import SplitFeature from '@/components/sections/SplitFeature';
import Testimonials from '@/components/sections/Testimonials';
import ValueGrid from '@/components/sections/ValueGrid';
import WhyQrs from '@/components/sections/WhyQrs';
import JsonLd from '@/components/ui/JsonLd';
import { ABOUT_LINK, HOME } from '@/data/catalog';
import { ABOUT_PAGE as page } from '@/data/pages/about';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: ABOUT_LINK.href });

const CRUMBS = [HOME, { label: 'About Us', href: ABOUT_LINK.href }];
const HERO_IMAGE = '/images/roof-drone-palms.webp';

const schema = pageJsonLd({ path: ABOUT_LINK.href, title: page.metaTitle, description: page.metaDescription, type: 'AboutPage', crumbs: CRUMBS, image: HERO_IMAGE });

// About page (content in data/pages/about.js)
export default function AboutPage() {
  return (
    <main id="top">
      <JsonLd data={schema} />
      <ImageHero crumbs={CRUMBS} eyebrow={page.hero.eyebrow} title={page.hero.heading} image={HERO_IMAGE} imagePosition="center 40%" />
      <Overview center heading={page.intro.heading} paragraphs={page.intro.paragraphs} />
      <ValueGrid heading={page.values.heading} items={page.values.items} tone="wash" />
      <WhyQrs heading="Why Homeowners Choose QRS" cta={{ label: 'Read Our Reviews', href: '#reviews' }} />
      <Process />
      <SplitFeature
        heading={page.services.heading}
        paragraphs={page.services.paragraphs}
        cta={page.services.cta}
        image="/images/home-hero-drone-view.webp"
        imageAlt="Aerial view of finished shingle roofs in a Southern California neighborhood"
        tone="wash"
      />
      <SplitFeature {...page.careers} image="/images/qrs-truck-4k.webp" imageAlt="Quality Roofing Specialists truck parked on a residential street" reverse />
      <SplitFeature {...page.partners} scene="scene-commercial" tone="wash" />
      <Testimonials />
      <RoofCheck />
      <FinalCta />
    </main>
  );
}
