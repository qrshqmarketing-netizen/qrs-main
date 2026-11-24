import FinalCta from '@/components/sections/FinalCta';
import Image from 'next/image';
import { QhHero, QhReviews, QhStart } from '@/components/home/QrsSections';
import { AbrGiving, AbrJoin, AbrNumbers, AbrOffices, AbrProcess, AbrStory, AbrValues, AbrWho } from '@/components/about/AboutRemote';
import JsonLd from '@/components/ui/JsonLd';
import { ABOUT_LINK, HOME } from '@/data/catalog';
import { ABOUT_PAGE as page } from '@/data/pages/about';
import { heroOutcome } from '@/data/heroOutcomes';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';
import { BUSINESS } from '@/data/site';

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: ABOUT_LINK.href });

const CRUMBS = [HOME, { label: 'About Us', href: ABOUT_LINK.href }];
const HERO_IMAGE = '/images/home-hero-drone-view.webp';

const schema = pageJsonLd({ path: ABOUT_LINK.href, title: page.metaTitle, description: page.metaDescription, type: 'AboutPage', crumbs: CRUMBS, faqs: page.faqs, image: HERO_IMAGE });

// About page (content in data/pages/about.js and data/site.js), after remote.com/about (owner, October 29 2026): components/about/AboutRemote.jsx.
// In the new home page's theme (owner, November 6 2026): `QhHero` with the Ventura Blvd office photo (its "Who we are" facts card was removed November 19 2026), the About
// sections unchanged (main is "qh abr", so both style sets apply), a rotating review (QhReviews) and the FAQ beside the request form (QhStart).
export default function AboutPage() {
  return (
    <main id="top" className="qh abr">
      <JsonLd data={schema} />
      <QhHero
        crumbs={CRUMBS}
        title={page.hero.heading}
        outcome={heroOutcome('/about-us/')}
        text={page.hero.intro}
        checks={['Family-owned, woman-owned, locally owned', 'Roofer-led from the first visit', `CSLB #${BUSINESS.license}`]}
        visual={
          // The Ventura Blvd office photo on its own (owner, November 19 2026: the "Who we are" facts card over it was removed)
          <div className="qh-compose qh-lic">
            <div className="qh-compose-photo" style={{ width: '100%' }}>
              <Image src="/images/woodland-hills-office.webp" alt="Aerial view of our office building on Ventura Blvd" fill sizes="(min-width: 1081px) 40vw, 100vw" quality={65} priority style={{ objectPosition: 'center 60%' }} />
            </div>
            <p className="qh-leak-cap">Our office on Ventura Blvd</p>
          </div>
        }
      />
      <AbrWho intro={page.intro} />
      <AbrNumbers />
      <AbrStory story={{ ...page.story, paragraphs: page.story.paragraphs.slice(0, 1) }} />
      <AbrValues mission={page.mission} />
      <AbrProcess process={page.process} />
      <QhReviews path={ABOUT_LINK.href} />
      <AbrOffices />
      <AbrGiving text={page.story.paragraphs[1]} />
      <AbrJoin careers={page.careers} partners={page.partners} />
      <QhStart faqs={page.faqs} heading="About QRS: FAQs" />
      <FinalCta
        heading="Work With a Roofer-Led Team"
        text="QRS is family-owned and local. Tell us about your roof and a roofer, not a salesperson, gives you a clear next step with a written scope and price."
      />
    </main>
  );
}
