import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import './HomeClean.css';
import './HomeNav.css';

// The closing block of the home page, just above the footer (after publicstorage.com's paragraph and "locations in Los Angeles / California"
// link columns): one plain paragraph about the company, then columns of links to every city page by county and to the main services, so
// every area and service is one click from the home page. columns: { title, links: [{ label, href }] }.
export default function AreaLinks({ text, columns = [], showColumns = false }) {
  return (
    <section className="al" aria-label="About Quality Roofing Specialists">
      <div className="hc-wrap">
        <p className="al-text">
          <Rich text={text} />
        </p>
        {/* The link columns (every city page by county and the main services) are off (owner, October 22 2026: "leave the paragraph only");
            `columns` stays in data/nearYou.js. Pass `showColumns` to bring them back. */}
        {showColumns && (
          <div className="al-cols">
            {columns.map((c) => (
              <nav key={c.title} aria-label={c.title}>
                <h2>{c.title}</h2>
                <ul>
                  {c.links.map((l) => (
                    <li key={l.href}>
                      <SiteLink href={l.href}>{l.label}</SiteLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
