import FinalCta from '@/components/sections/FinalCta';
import Hero from '@/components/sections/Hero';
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
import PreferredSource from '@/components/ui/PreferredSource';
import './glossary.css';

// The roofing glossary (copy in data/pages/glossary.js): the hero, a row of jump links to the groups, then each group as hairline rows of term and
// definition, with a link to the page that covers the term. Structured data: a DefinedTermSet of every term, so answer engines can quote a definition.
export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: page.path });

const LINK = { label: 'Roofing Glossary', href: page.path };
const CRUMBS = [HOME, LINK];
const TERMS = page.groups.flatMap((g) => g.terms);

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
    <main id="top">
      <JsonLd data={schema} />
      <Hero
        crumbs={CRUMBS}
        title={page.hero.heading}
        outcome={heroOutcome(page.path)}
        intro={page.hero.intro}
        image={page.hero.image}
        imageAlt={page.hero.imageAlt}
      />
      <section className="gl section">
        <div className="container">
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
          <PreferredSource className="pref-end" />
        </div>
      </section>
      <RoofCheck tone="white" />
      <FinalCta heading="Questions About Your __Roof__?" text="Start with a free roof evaluation. A roofer looks at your roof, explains what they find in plain English and gives you a written scope and price before any work." />
    </main>
  );
}
