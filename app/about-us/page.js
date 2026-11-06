import FinalCta from '@/components/sections/FinalCta';
import { QhHero, QhLicenseCard, QhReviews, QhStart } from '@/components/home/QrsSections';
import { AbrGiving, AbrJoin, AbrNumbers, AbrOffices, AbrProcess, AbrStory, AbrTeam, AbrValues, AbrWho } from '@/components/about/AboutRemote';
import JsonLd from '@/components/ui/JsonLd';
import { ABOUT_LINK, HOME } from '@/data/catalog';
import { ABOUT_PAGE as page } from '@/data/pages/about';
import { heroOutcome } from '@/data/heroOutcomes';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';
import { BUSINESS, GOOGLE_REVIEWS, OFFICES } from '@/data/site';
import { formatDate } from '@/lib/dates';

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: ABOUT_LINK.href });

const CRUMBS = [HOME, { label: 'About Us', href: ABOUT_LINK.href }];
const HERO_IMAGE = '/images/home-hero-drone-view.webp';

const schema = pageJsonLd({ path: ABOUT_LINK.href, title: page.metaTitle, description: page.metaDescription, type: 'AboutPage', crumbs: CRUMBS, faqs: page.faqs, image: HERO_IMAGE });

// About page (content in data/pages/about.js and data/site.js), after remote.com/about (owner, October 29 2026): components/about/AboutRemote.jsx.
// In the new home page's theme (owner, November 6 2026): `QhHero` with the office photo and a "Who we are" facts card (QhLicenseCard), the About
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
          <QhLicenseCard
            image="/images/woodland-hills-office.webp"
            alt="Aerial view of the office building of one of the QRS offices"
            position="center 60%"
            title="Who we are"
            stamp="Since 2020"
            facts={[
              { label: 'Co-founders', value: 'Tony & Adva Goldberg' },
              { label: 'Licensed since', value: formatDate(BUSINESS.licenseSince) },
              { label: 'Crews', value: '12, by roof type' },
              { label: 'Offices', value: String(OFFICES.length) },
              { label: 'Google reviews', value: String(GOOGLE_REVIEWS.count) },
            ]}
            caption="A roofer should look at your roof before anyone tries to sell you one."
          />
        }
      />
      <AbrWho intro={page.intro} />
      <AbrNumbers />
      <AbrStory story={{ ...page.story, paragraphs: page.story.paragraphs.slice(0, 1) }} />
      <AbrValues mission={page.mission} />
      <AbrProcess process={page.process} />
      <AbrTeam team={page.team} />
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
