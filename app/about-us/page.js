import Faq from '@/components/sections/Faq';
import AreaLinks from '@/components/home/AreaLinks';
import ReviewTrio from '@/components/home/ReviewTrio';
import { AREA_LINKS } from '@/data/nearYou';
import Hero from '@/components/sections/Hero';
import { AboutCards, AboutIntro, AboutMission, AboutNumbers, AboutOffices, AboutProcess, AboutRecognition, AboutStory, AboutTeam } from '@/components/about/AboutSections';
import RoofCheck from '@/components/sections/RoofCheck';
import JsonLd from '@/components/ui/JsonLd';
import { ABOUT_LINK, HOME } from '@/data/catalog';
import { ABOUT_PAGE as page } from '@/data/pages/about';
import { heroOutcome } from '@/data/heroOutcomes';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';
import '@/components/home/HomeClean.css';
import '@/components/home/CleanPages.css';

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: ABOUT_LINK.href });

const CRUMBS = [HOME, { label: 'About Us', href: ABOUT_LINK.href }];
const HERO_IMAGE = '/images/home-hero-drone-view.webp';

const schema = pageJsonLd({ path: ABOUT_LINK.href, title: page.metaTitle, description: page.metaDescription, type: 'AboutPage', crumbs: CRUMBS, faqs: page.faqs, image: HERO_IMAGE });

// About page (content in data/pages/about.js and data/site.js), in the studio style: components/about/AboutSections.jsx
export default function AboutPage() {
  return (
    <main id="top" className="clean-page">
      <JsonLd data={schema} />
      <Hero crumbs={CRUMBS} eyebrow={page.hero.eyebrow} title={page.hero.heading} outcome={heroOutcome('/about-us/')} intro={page.hero.intro} image={HERO_IMAGE} imageAlt="Aerial view of a home with a new shingle roof in a Southern California neighborhood" imagePosition="center 45%" stats />
      <AboutIntro page={page} />
      <AboutNumbers />
      <AboutStory story={{ ...page.story, paragraphs: page.story.paragraphs.slice(0, 1) }} />
      {/* Maben-style order (owner, October 15 2026): who we are, our story, our process, our team, then the proof. "Roofing we do every day"
          (AboutServices) was taken off: the intro now says it, with the same links. */}
      <AboutProcess process={page.process} />
      <AboutTeam team={page.team} />
      {/* Three reviews side by side, as on the other sub pages (owner, October 22 2026) */}
      <ReviewTrio path="/about-us/" />
      <AboutOffices />
      <AboutMission mission={page.mission} />
      <AboutRecognition giving={page.story.paragraphs[1]} />
      <AboutCards careers={page.careers} partners={page.partners} />
      <Faq heading="About QRS: FAQs" sub="Straight answers about who we are and how we work." faqs={page.faqs} cta={false} limit={4} />
      <RoofCheck />
      <AreaLinks {...AREA_LINKS} />
    </main>
  );
}
