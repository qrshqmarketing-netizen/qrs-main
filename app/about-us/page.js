import Faq from '@/components/sections/Faq';
import ReviewMarquee from '@/components/sections/ReviewMarquee';
import FinalCta from '@/components/sections/FinalCta';
import { AbrGiving, AbrHero, AbrJoin, AbrNumbers, AbrOffices, AbrProcess, AbrStory, AbrTeam, AbrValues, AbrWho } from '@/components/about/AboutRemote';
import RoofCheck from '@/components/sections/RoofCheck';
import JsonLd from '@/components/ui/JsonLd';
import { ABOUT_LINK, HOME } from '@/data/catalog';
import { ABOUT_PAGE as page } from '@/data/pages/about';
import { heroOutcome } from '@/data/heroOutcomes';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: ABOUT_LINK.href });

const CRUMBS = [HOME, { label: 'About Us', href: ABOUT_LINK.href }];
const HERO_IMAGE = '/images/home-hero-drone-view.webp';

const schema = pageJsonLd({ path: ABOUT_LINK.href, title: page.metaTitle, description: page.metaDescription, type: 'AboutPage', crumbs: CRUMBS, faqs: page.faqs, image: HERO_IMAGE });

// About page (content in data/pages/about.js and data/site.js), after remote.com/about (owner, October 29 2026): components/about/AboutRemote.jsx
export default function AboutPage() {
  return (
    <main id="top" className="abr">
      <JsonLd data={schema} />
      <AbrHero crumbs={CRUMBS} path="/about-us/" title={page.hero.heading} outcome={heroOutcome('/about-us/')} intro={page.hero.intro} />
      <AbrWho intro={page.intro} />
      <AbrNumbers />
      <AbrStory story={{ ...page.story, paragraphs: page.story.paragraphs.slice(0, 1) }} />
      <AbrValues mission={page.mission} />
      <AbrProcess process={page.process} />
      <AbrTeam team={page.team} />
      {/* Google reviews */}
      <div className="abr-keep">
        <ReviewMarquee />
      </div>
      <AbrOffices />
      <AbrGiving text={page.story.paragraphs[1]} />
      <AbrJoin careers={page.careers} partners={page.partners} />
      <div className="abr-keep">
        <Faq heading="About QRS: FAQs" sub="Straight answers about who we are and how we work." faqs={page.faqs} cta={false} />
        <RoofCheck />
      </div>
      <FinalCta
        heading="Work With a Roofer-Led Team"
        text="QRS is family-owned and local. Tell us about your roof and a roofer, not a salesperson, gives you a clear next step with a written scope and price."
      />
    </main>
  );
}
