import FeatureBand from '@/components/sections/FeatureBand';
import FinalCta from '@/components/sections/FinalCta';
import Guarantee from '@/components/sections/Guarantee';
import Hero from '@/components/sections/Hero';
import ProofBar from '@/components/sections/ProofBar';
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
      <Hero crumbs={CRUMBS} eyebrow={page.hero.eyebrow} title={page.hero.heading} intro={page.hero.intro} image={HERO_IMAGE} imagePosition="center 40%" />
      <Overview center heading={page.intro.heading} paragraphs={page.intro.paragraphs} />
      <ProofBar />
      <SplitFeature eyebrow={page.story.eyebrow} heading={page.story.heading} paragraphs={page.story.paragraphs} scene="scene-replace" />
      <FeatureBand id="mission" {...page.mission} />
      <ValueGrid heading={page.team.heading} intro={page.team.intro} items={page.team.items} columns={2} />
      <ValueGrid heading={page.values.heading} items={page.values.items} tone="wash" />
      <WhyQrs heading="Why Homeowners Choose QRS" cta={{ label: 'Read Our Reviews', href: '#reviews' }} />
      <Process />
      <Guarantee />
      <SplitFeature
        heading={page.services.heading}
        paragraphs={page.services.paragraphs}
        cta={page.services.cta}
        image="/images/home-hero-drone-view.webp"
        imageAlt="Aerial view of finished shingle roofs in a Southern California neighborhood"
        tone="wash"
      />
      <SplitFeature {...page.careers} image="/images/bottom-cta-background.webp" imageAlt="Row of homes with pitched roofs along a residential street" reverse />
      <SplitFeature {...page.partners} scene="scene-commercial" tone="wash" />
      <Testimonials showReviews={false} />
      <RoofCheck />
      <FinalCta
        heading="Work With a Roofer-Led Team"
        text="QRS is family-owned and local. Tell us about your roof and a roofer, not a salesperson, gives you a clear next step with a written scope and price."
      />
    </main>
  );
}
