import Faq from '@/components/sections/Faq';
import FeatureBand from '@/components/sections/FeatureBand';
import FinalCta from '@/components/sections/FinalCta';
import Guarantee from '@/components/sections/Guarantee';
import Hero from '@/components/sections/Hero';
import ProofBar from '@/components/sections/ProofBar';
import Overview from '@/components/sections/Overview';
import Process from '@/components/sections/Process';
import RoofCheck from '@/components/sections/RoofCheck';
import SplitFeature from '@/components/sections/SplitFeature';
import ValueGrid from '@/components/sections/ValueGrid';
import WhyQrs from '@/components/sections/WhyQrs';
import JsonLd from '@/components/ui/JsonLd';
import { ABOUT_LINK, HOME } from '@/data/catalog';
import { ABOUT_PAGE as page } from '@/data/pages/about';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: ABOUT_LINK.href });

const CRUMBS = [HOME, { label: 'About Us', href: ABOUT_LINK.href }];
const HERO_IMAGE = '/images/home-hero-drone-view.webp';

const schema = pageJsonLd({ path: ABOUT_LINK.href, title: page.metaTitle, description: page.metaDescription, type: 'AboutPage', crumbs: CRUMBS, faqs: page.faqs, image: HERO_IMAGE });

// About page (content in data/pages/about.js)
export default function AboutPage() {
  return (
    <main id="top">
      <JsonLd data={schema} />
      <Hero crumbs={CRUMBS} eyebrow={page.hero.eyebrow} title={page.hero.heading} intro={page.hero.intro} image={HERO_IMAGE} imageAlt="Aerial view of a home with a new shingle roof in a Southern California neighborhood" imagePosition="center 45%" />
      <Overview center heading={page.intro.heading} paragraphs={page.intro.paragraphs} />
      <ProofBar />
      <SplitFeature
        eyebrow={page.story.eyebrow}
        heading={page.story.heading}
        paragraphs={page.story.paragraphs}
        image="/images/home-hero-shingle-neighborhood-drone-view.webp"
        imageAlt="Aerial view of shingle roofs on homes in a Southern California neighborhood"
      />
      <FeatureBand id="mission" {...page.mission} />
      <ValueGrid heading={page.team.heading} intro={page.team.intro} items={page.team.items} columns={2} />
      <ValueGrid heading={page.values.heading} items={page.values.items} tone="wash" />
      <WhyQrs heading="Why Homeowners Choose QRS" cta={{ label: 'Read Our Reviews', href: '/reviews/' }} />
      <Process />
      <Guarantee />
      <SplitFeature
        heading={page.services.heading}
        paragraphs={page.services.paragraphs}
        cta={page.services.cta}
        image="/images/tile-lift-off-and-reset-drone-view-2.webp"
        imageAlt="Aerial view of a Spanish-style tile roof during a tile lift and reset"
        tone="wash"
      />
      <SplitFeature {...page.careers} image="/images/careers-hero-crew-shingle-roof.webp" imageAlt="Roofers working on a shingle roof" reverse />
      <SplitFeature {...page.partners} image="/images/contractors-hero-roofer-tablet.webp" imageAlt="Roofer documenting a roof inspection on a tablet" tone="wash" />
      <Faq heading="About QRS: FAQs" sub="Straight answers about who we are and how we work." faqs={page.faqs} cta={false} />
      <RoofCheck />
      <FinalCta
        heading="Work With a Roofer-Led Team"
        text="QRS is family-owned and local. Tell us about your roof and a roofer, not a salesperson, gives you a clear next step with a written scope and price."
      />
    </main>
  );
}
