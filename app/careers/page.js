import Faq from '@/components/sections/Faq';
import FinalCta from '@/components/sections/FinalCta';
import { QhFinder, QhHero, QhHiringCard, QhPoints, QhSteps } from '@/components/home/QrsSections';
import JsonLd from '@/components/ui/JsonLd';
import { CAREERS_LINK, HOME } from '@/data/catalog';
import { CAREERS_PAGE as page } from '@/data/pages/careers';
import { PHONE, TEL } from '@/data/site';
import { heroOutcome } from '@/data/heroOutcomes';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: CAREERS_LINK.href });

const CRUMBS = [HOME, CAREERS_LINK];
const HERO_IMAGE = '/images/careers-hero-roofer-tablet-hills.webp';

const schema = pageJsonLd({ path: CAREERS_LINK.href, title: page.metaTitle, description: page.metaDescription, crumbs: CRUMBS, faqs: page.faqs, image: HERO_IMAGE });

const EMAIL_LINK = `mailto:${page.email}?subject=${encodeURIComponent('Careers at QRS')}`;

// Careers page (content in data/pages/careers.js), in the new home page's theme (owner, November 6 2026; components/home/QrsSections.jsx, QrsHome.css):
// the hero with the page photo and a "Now hiring" card of the roles (QhHiringCard), what it's like to work here, the core values, the roles with
// their email links (QhFinder), the FAQ, how to apply with its photo (QhSteps) and the closing call to action. No request form: it's a hiring page.
export default function CareersPage() {
  return (
    <main id="top" className="qh">
      <JsonLd data={schema} />
      <QhHero
        crumbs={CRUMBS}
        title={page.hero.heading}
        outcome={heroOutcome('/careers/')}
        text={page.hero.intro}
        checks={['Roofers lead the work', 'Detail-first standards', 'Written scopes and clear communication']}
        actions={[
          { label: 'Email Us Your Info', href: EMAIL_LINK, style: 'gold' },
          { label: `Call ${PHONE}`, href: TEL, style: 'line' },
        ]}
        visual={
          <QhHiringCard
            image={HERO_IMAGE}
            alt="Smiling roofer in a hard hat and safety harness holding a tablet on a shingle roof above the neighborhood"
            position="60% 30%"
            roles={page.roles.items.map((r) => r.title)}
            email={EMAIL_LINK}
            caption="No posting for your role? Send us your info anyway."
          />
        }
      />
      <QhPoints id="work-here" kicker="Working at QRS" heading={page.values.heading} paragraphs={[page.values.intro]} items={page.values.items} />
      <QhPoints
        id="core-values"
        kicker={page.coreValues.eyebrow}
        heading={page.coreValues.heading}
        paragraphs={page.coreValues.paragraphs}
        items={page.coreValues.points}
        actions={
          <div className="qh-actions">
            <a className="qh-btn qh-btn-sun" href={page.coreValues.cta.href}>{page.coreValues.cta.label}</a>
          </div>
        }
      />
      <QhFinder
        id="roles"
        kicker="Openings"
        heading={page.roles.heading}
        intro={page.roles.intro}
        rows={page.roles.items.map((r, i) => ({ id: `role-${i + 1}`, title: r.title, text: r.text, links: [r.link] }))}
      />
      <div className="lc-keep">
        <Faq heading="Careers FAQs" sub="Straight answers about working at QRS." faqs={page.faqs} cta={false} />
      </div>
      <QhSteps
        heading={page.apply.heading}
        steps={page.apply.steps}
        image="/images/careers-apply-roofer-harness.webp"
        imageAlt="Smiling roofer in a safety harness and tool belt on a shingle roof, a crewmate working behind him"
        kicker={page.apply.subheading}
        actions={
          <div className="qh-actions">
            <a className="qh-btn qh-btn-navy" href={EMAIL_LINK}>Email Us Your Info</a>
            <a className="qh-link" href={TEL}>or call {PHONE}</a>
          </div>
        }
      />
      <FinalCta trust={false} heading="Ready to Join the Crew?" text={`Email us your info or call ${PHONE} during business hours.`} cta={{ label: 'Email Us Your Info', href: EMAIL_LINK }} />
    </main>
  );
}
