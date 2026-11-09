import FinalCta from '@/components/sections/FinalCta';
import TrustLogos from '@/components/sections/TrustLogos';
import Image from 'next/image';
import { QhFaqChat, QhHero } from '@/components/home/QrsSections';
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
// In the new theme (owner, November 9 2026): no place names on this page, so an answer that names a city or county is left out here (it stays on
// its own page, e.g. the inspection page's "near me" question); the hero is a chat of four of the page's own questions and answers.
const PLACE = /Los Angeles|Orange County|Riverside|San Bernardino|Southern California|Santa Ana|Inland Empire|\bLA\b|\bOC\b/;
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
      if (PLACE.test(plainText(f.q)) || PLACE.test(plainText(f.a))) return false;
      const key = plainText(f.q).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return { title, path, label: source?.label || 'Home', faqs };
  }).filter((g) => g.faqs.length);
}

// The first sentence of an answer, plain text, for the hero chat
const firstSentence = (text) => {
  const t = plainText(text);
  const m = t.match(/^.{20,170}?[.?!](\s|$)/);
  return (m ? m[0] : t.slice(0, 150) + '…').trim();
};
const CHAT_GROUPS = ['Roof repair', 'Roof replacement', 'Tile lift and relay', 'Flat roofs'];

export default async function RoofingFaqPage() {
  const groups = await faqGroups();
  const chat = CHAT_GROUPS.map((t) => groups.find((g) => g.title === t))
    .filter(Boolean)
    .map((g) => ({ q: plainText(g.faqs[0].q), a: firstSentence(g.faqs[0].a), label: `From ${g.label}` }));
  const count = groups.reduce((n, g) => n + g.faqs.length, 0);
  const schema = pageJsonLd({
    path: PATH,
    title: FAQ_PAGE.metaTitle,
    description: FAQ_PAGE.metaDescription,
    crumbs: CRUMBS,
    image: FAQ_PAGE.image,
    faqs: groups.flatMap((g) => g.faqs),
  });
  return (
    <main id="top" className="qh">
      <JsonLd data={schema} />
      <QhHero
        crumbs={CRUMBS}
        title={FAQ_PAGE.heading}
        outcome={heroOutcome(PATH)}
        text={FAQ_PAGE.intro}
        checks={[`${count} questions answered`, `${groups.length} topics`, 'Each linked to the page that covers it']}
        actions={[
          { label: 'Browse the questions', href: `#${headingId(groups[0].title)}`, style: 'gold' },
          { label: 'Ask a roofer', href: '#roof-check', style: 'line' },
        ]}
        visual={<QhFaqChat items={chat} caption="Real questions, answered by roofers." />}
      />
      <TrustLogos />
      <section className="gl section">
        <div className="qh-wrap">
          {/* The page's photo (it was the hero's background before the redesign) */}
          <figure className="qh-steps-photo">
            <Image src={FAQ_PAGE.image} alt={FAQ_PAGE.imageAlt} fill sizes="(min-width: 1200px) 1100px, 100vw" quality={60} />
          </figure>
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
      <FinalCta heading="Still Have a __Question__?" text="Ask a roofer. Start with a free roof evaluation and get a written scope and price before any work." />
    </main>
  );
}
