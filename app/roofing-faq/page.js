import '@/components/home/HomeClean.css';
import '@/components/home/CleanPages.css';
import Hero from '@/components/sections/Hero';
import RoofCheck from '@/components/sections/RoofCheck';
import JsonLd from '@/components/ui/JsonLd';
import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import { HOME } from '@/data/catalog';
import { headingId } from '@/data/blog/posts';
import { heroOutcome } from '@/data/heroOutcomes';
import { FAQ_GROUPS, FAQ_PAGE } from '@/data/pages/roofingFaq';
import { getHomeFaqs } from '@/lib/contentStore';
import { PAGE_INDEX } from '@/lib/pageIndex';
import { pageMetadata } from '@/lib/pages';
import { plainText } from '@/lib/richText';
import { pageJsonLd } from '@/lib/structuredData';
import '../roofing-glossary/glossary.css';

// The roofing FAQ: every group is the FAQ of the page it comes from (the home page's from the dashboard, the rest from lib/pageIndex.js), so an answer
// changed on its page changes here too and nothing new is claimed. A question already shown in an earlier group is left out. Each group links to
// its page. FAQPage structured data covers every question on the page.
const PATH = FAQ_PAGE.path;

export const metadata = pageMetadata({ title: FAQ_PAGE.metaTitle, description: FAQ_PAGE.metaDescription, path: PATH });

const LINK = { label: 'Roofing FAQ', href: PATH };
const CRUMBS = [HOME, LINK];

async function faqGroups() {
  const homeFaqs = await getHomeFaqs();
  const seen = new Set();
  return FAQ_GROUPS.map(([title, path]) => {
    const source = PAGE_INDEX.find((p) => p.path === path);
    const faqs = (path === '/' ? homeFaqs : source?.faqs || []).filter((f) => {
      const key = plainText(f.q).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return { title, path, label: source?.label || 'Home', faqs };
  }).filter((g) => g.faqs.length);
}

export default async function RoofingFaqPage() {
  const groups = await faqGroups();
  const schema = pageJsonLd({
    path: PATH,
    title: FAQ_PAGE.metaTitle,
    description: FAQ_PAGE.metaDescription,
    crumbs: CRUMBS,
    image: FAQ_PAGE.image,
    faqs: groups.flatMap((g) => g.faqs),
  });
  return (
    <main id="top" className="clean-page">
      <JsonLd data={schema} />
      <Hero
        crumbs={CRUMBS}
        title={FAQ_PAGE.heading}
        outcome={heroOutcome(PATH)}
        intro={FAQ_PAGE.intro}
        image={FAQ_PAGE.image}
        imageAlt={FAQ_PAGE.imageAlt}
      />
      <section className="gl section">
        <div className="container">
          {/* The page's opening line, moved out of the hero (October 21 2026: no excerpt in heroes); it carries the keyword in the first 100 words */}
          <p className="gl-lead">
            <Rich text={FAQ_PAGE.intro} />
          </p>
          <nav className="gl-jump" aria-label="FAQ topics">
            {groups.map((g) => (
              <a href={`#${headingId(g.title)}`} key={g.title}>
                {g.title}
              </a>
            ))}
          </nav>
          {groups.map((g) => (
            <section className="gl-group" aria-labelledby={headingId(g.title)} key={g.title}>
              <h2 id={headingId(g.title)}>{g.title}</h2>
              <div className="gl-faqs">
                {g.faqs.map((f) => (
                  <details className="gl-faq" key={f.q}>
                    <summary>
                      <Rich text={f.q} />
                    </summary>
                    <div className="gl-answer">
                      <Rich text={f.a} />
                    </div>
                  </details>
                ))}
              </div>
              {g.path !== '/' && (
                <SiteLink className="gl-more gl-group-more" href={g.path} prefetch={false}>
                  More on {g.label.toLowerCase()} <ArrowRight />
                </SiteLink>
              )}
            </section>
          ))}
        </div>
      </section>
      <RoofCheck tone="white" />
    </main>
  );
}
