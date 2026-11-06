import Image from 'next/image';
import FinalCta from '@/components/sections/FinalCta';
import TrustLogos from '@/components/sections/TrustLogos';
import { QhHero, QhRoofAnatomy } from '@/components/home/QrsSections';
import RoofCheck from '@/components/sections/RoofCheck';
import JsonLd from '@/components/ui/JsonLd';
import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import { HOME } from '@/data/catalog';
import { headingId } from '@/data/blog/posts';
import { heroOutcome } from '@/data/heroOutcomes';
import { GLOSSARY_PAGE as page } from '@/data/pages/glossary';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';
import './glossary.css';

// The roofing glossary (copy in data/pages/glossary.js): the hero, a row of jump links to the groups, then each group as hairline rows of term and
// definition, with a link to the page that covers the term. Structured data: a DefinedTermSet of every term, so answer engines can quote a definition.
export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: page.path });

const LINK = { label: 'Roofing Glossary', href: page.path };
const CRUMBS = [HOME, LINK];
const TERMS = page.groups.flatMap((g) => g.terms);

// The parts shown on the hero's roof cut-away (QhRoofAnatomy), with their definitions from the glossary itself; x, y in its drawing
const SPOTS = [
  ['Ridge', 280, 44],
  ['Valley', 360, 162],
  ['Flashing', 229, 132],
  ['Underlayment', 132, 178],
  ['Roof deck (sheathing)', 92, 214],
  ['Eave', 470, 214],
]
  .map(([term, x, y]) => ({ ...TERMS.find((t) => t.term === term), x, y }))
  .filter((t) => t.def);

const schema = pageJsonLd({
  path: page.path,
  title: page.metaTitle,
  description: page.metaDescription,
  crumbs: CRUMBS,
  image: page.hero.image,
  terms: TERMS,
});

export default function RoofingGlossaryPage() {
  return (
    <main id="top" className="qh">
      <JsonLd data={schema} />
      <QhHero
        crumbs={CRUMBS}
        title={page.hero.heading}
        outcome={heroOutcome(page.path)}
        text={page.hero.intro}
        checks={[`${TERMS.length} roofing terms`, 'Plain-English definitions', 'Linked to the pages that cover them']}
        actions={[
          { label: 'Browse the terms', href: `#${headingId(page.groups[0].title)}`, style: 'gold' },
          { label: 'Get Pro Advice', href: '#roof-check', style: 'line' },
        ]}
        visual={<QhRoofAnatomy spots={SPOTS} caption="The parts of a roof, one at a time." />}
      />
      <TrustLogos />
      <section className="gl section">
        <div className="qh-wrap">
          {/* The page's photo (it was the hero's background before the redesign) */}
          <figure className="qh-steps-photo">
            <Image src={page.hero.image} alt={page.hero.imageAlt} fill sizes="(min-width: 1200px) 1100px, 100vw" quality={60} />
          </figure>
          <nav className="gl-jump" aria-label="Glossary sections">
            {page.groups.map((g) => (
              <a href={`#${headingId(g.title)}`} key={g.title}>
                {g.title}
              </a>
            ))}
          </nav>
          {page.groups.map((g) => (
            <section className="gl-group" aria-labelledby={headingId(g.title)} key={g.title}>
              <h2 id={headingId(g.title)}>{g.title}</h2>
              <dl>
                {g.terms.map((t) => (
                  <div className="gl-row" id={headingId(t.term)} key={t.term}>
                    <dt>{t.term}</dt>
                    <dd>
                      <Rich text={t.def} />
                      {t.href && (
                        <SiteLink className="gl-more" href={t.href} prefetch={false}>
                          Read more <ArrowRight />
                        </SiteLink>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </section>
      <RoofCheck tone="white" />
      <FinalCta heading="Questions About Your __Roof__?" text="Start with a free roof evaluation. A roofer looks at your roof, explains what they find in plain English and gives you a written scope and price before any work." />
    </main>
  );
}
