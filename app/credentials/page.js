import { QhHero, QhCredentialShield, QhReviews, QhStart } from '@/components/home/QrsSections';
import Credentials from '@/components/sections/Credentials';
import FinalCta from '@/components/sections/FinalCta';
import JsonLd from '@/components/ui/JsonLd';
import { CREDENTIALS_LINK, HOME } from '@/data/catalog';
import { CREDENTIALS_PAGE as page, CREDENTIALS_PUBLIC } from '@/data/pages/credentials';
import { heroOutcome } from '@/data/heroOutcomes';
import { BUSINESS } from '@/data/site';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

// Credentials page: the license, the manufacturer certification logos and how we work (copy in data/pages/credentials.js). While CREDENTIALS_PUBLIC is false
// it is noindex and nothing links to it. In the new home page's theme (owner, November 6 2026; components/home/QrsSections.jsx, QrsHome.css): the hero
// with the page photo and a license card being checked (QhLicenseCard, linking to the CSLB website), then the credentials sections (no logo rows
// above them: the manufacturer and BBB logos appear once, in those sections; owner, November 6 2026), (unchanged component), a review, the FAQ beside the request form and the closing call to action.
export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: CREDENTIALS_LINK.href, noindex: !CREDENTIALS_PUBLIC });

const CRUMBS = [HOME, CREDENTIALS_LINK];

const schema = pageJsonLd({
  path: CREDENTIALS_LINK.href,
  title: page.metaTitle,
  description: page.metaDescription,
  type: 'AboutPage',
  crumbs: CRUMBS,
  faqs: page.faqs,
  image: page.hero.image,
});

export default function CredentialsPage() {
  return (
    <main id="top" className="qh">
      <JsonLd data={schema} />
      <QhHero
        crumbs={CRUMBS}
        title={page.hero.heading}
        outcome={heroOutcome(CREDENTIALS_LINK.href)}
        text={page.hero.intro}
        checks={['Licensed, bonded and insured', 'BBB A+ rating', 'Manufacturer certified']}
        visual={
          <QhCredentialShield
            license={`#${BUSINESS.license}`}
            classes={page.license.classifications.map((c) => ({ code: c.label.split(' - ')[0], label: c.label.split(' - ')[1].toLowerCase().replace(/^./, (m) => m.toUpperCase()) }))}
            caption="A California license you can check yourself."
            links={[{ label: 'Verify our CSLB license', href: page.license.verify.href }]}
          />
        }
      />
      <div className="lc-keep">
        <Credentials page={page} />
      </div>
      <QhReviews path={CREDENTIALS_LINK.href} />
      <QhStart faqs={page.faqs} heading="Credentials FAQs" />
      <FinalCta heading="Work With a Licensed Roofer" text="Start with a free roof evaluation. A roofer looks at your roof and gives you a written scope and price before any work begins." />
    </main>
  );
}
