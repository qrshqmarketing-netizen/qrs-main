import FinalCta from '@/components/sections/FinalCta';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import { HOME } from '@/data/catalog';
import { PHONE, TEL } from '@/data/site';
import { headers } from 'next/headers';
import { searchSite, SEARCH_GROUPS } from '@/lib/siteSearch';
import { clientIp, searchLimited, spammyQuery } from '@/lib/searchGuard';
import '@/components/home/QrsHome.css';
import './search.css';

// Search results (owner, November 9 2026): /search/?q=… from the header's search box. Results are grouped (services, service areas, projects,
// articles, company), each with the page's name, its address and the sentence that best matches. With no query or no results it offers popular
// pages and the phone. Noindex (a results page shouldn't be in Google), and not in the sitemap or AI files.
export const metadata = {
  title: 'Search',
  description: 'Search the Quality Roofing Specialists site: services, service areas, projects and roofing articles.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/search/' },
};

const POPULAR = [
  { label: 'Roof repair', href: '/roof-repair/' },
  { label: 'Roof replacement', href: '/roof-replacement/' },
  { label: 'Roof inspection', href: '/roof-inspection/' },
  { label: 'Emergency roof repair', href: '/roof-repair/emergency/' },
  { label: 'Tile lift & relay', href: '/residential-roofing/tile-roofing/lift-and-relay/' },
  { label: 'Commercial roofing', href: '/commercial-roofing/' },
  { label: 'Service areas', href: '/service-areas/' },
  { label: 'Roofing FAQ', href: '/roofing-faq/' },
];

// The query's words in bold inside a snippet
function Highlight({ text, tokens }) {
  if (!tokens.length) return text;
  const re = new RegExp(`\\b(${tokens.map((t) => t.replace(/[^a-z0-9]/g, '').replace(/y$/, '')).join('|')})[a-z0-9]*`, 'gi');
  const out = [];
  let last = 0;
  for (const m of text.matchAll(re)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(<mark key={m.index}>{m[0]}</mark>);
    last = m.index + m[0].length;
  }
  out.push(text.slice(last));
  return out;
}

export default async function SearchPage({ searchParams }) {
  const raw = (await searchParams).q;
  const asked = String(Array.isArray(raw) ? raw[0] : raw || '').slice(0, 120);
  // Abuse protection (lib/searchGuard.js): too many searches from one address, or a spam-looking query, gets no search and no echo
  const limited = Boolean(asked) && searchLimited('page', clientIp(await headers()));
  const spam = spammyQuery(asked);
  const q = limited || spam ? '' : asked;
  const { results, tokens, total, partial } = await searchSite(q);
  const groups = SEARCH_GROUPS.map((g) => ({ g, items: results.filter((r) => r.group === g) })).filter((x) => x.items.length);
  return (
    <main id="top" className="qh srch">
      <section className="qh-hero srch-hero" aria-labelledby="srch-h1">
        <div className="qh-wrap">
          <nav className="qh-crumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <SiteLink href={HOME.href}>Home</SiteLink>
              </li>
              <li>
                <span aria-current="page">Search</span>
              </li>
            </ol>
          </nav>
          <h1 id="srch-h1">{q ? <>Results for “{q}”</> : 'Search the site'}</h1>
          {limited && <p className="srch-count">That’s a lot of searches in a short time. Please wait a minute and try again.</p>}
          {spam && !limited && <p className="srch-count">Please search with plain words, like “tile roof repair” or your city.</p>}
          <form className="srch-form" action="/search/" method="get" role="search">
            <label className="sr-only" htmlFor="srch-q">Search the site</label>
            <input id="srch-q" name="q" type="search" defaultValue={q} placeholder="Roof repair, tile lift & relay, your city…" autoComplete="off" />
            <button type="submit">Search</button>
          </form>
          {q && (
            <p className="srch-count">
              {total ? `${total} ${total === 1 ? 'page matches' : 'pages match'}${partial ? ' some of your words' : ' your search'}` : 'No pages matched your search.'}
            </p>
          )}
        </div>
      </section>

      <section className="qh-section srch-body">
        <div className={'qh-wrap srch-grid' + (groups.length ? '' : ' srch-grid-empty')}>
          {groups.length > 0 && (
            <nav className="srch-side" aria-label="Result groups">
              <p>Jump to</p>
              <ul>
                {groups.map(({ g, items }) => (
                  <li key={g}>
                    <a href={`#${g.toLowerCase().replace(/\W+/g, '-')}`}>
                      <span>{g}</span>
                      <b>{items.length}</b>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <div className="srch-main">
          {groups.map(({ g, items }) => (
            <section className="srch-group" id={g.toLowerCase().replace(/\W+/g, '-')} aria-labelledby={`srch-${g}`} key={g}>
              <h2 id={`srch-${g}`}>{g}</h2>
              <ol>
                {items.map((r) => (
                  <li key={r.path}>
                    <SiteLink className="srch-hit" href={r.path} prefetch={false}>
                      <span className="srch-path">qualityroofingspecialists.com{r.path}</span>
                      <span className="srch-title">{r.title}</span>
                      {r.snippet && (
                        <span className="srch-snip">
                          <Highlight text={r.snippet} tokens={tokens} />
                        </span>
                      )}
                    </SiteLink>
                  </li>
                ))}
              </ol>
            </section>
          ))}

          {(!q || !results.length) && (
            <div className="srch-empty">
              <h2>{q ? 'Try one of these' : 'Popular pages'}</h2>
              <ul>
                {POPULAR.map((p) => (
                  <li key={p.href}>
                    <SiteLink href={p.href} prefetch={false}>
                      {p.label} <ArrowRight />
                    </SiteLink>
                  </li>
                ))}
              </ul>
              <p>
                Can’t find it? Call a roofer at <a href={TEL}>{PHONE}</a>.
              </p>
            </div>
          )}
          </div>
        </div>
      </section>
      <FinalCta heading="Rather ask a roofer?" text="Start with a free roof evaluation. A roofer looks at your roof and gives you a written scope and price before any work." />
    </main>
  );
}
