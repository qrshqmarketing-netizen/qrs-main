import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import './HomeNav.css';

// The closing block of the home page, just above the footer (after publicstorage.com's paragraph and "locations in Los Angeles / California"
// link columns): one plain paragraph about the company, then columns of links to every city page by county and to the main services, so
// every area and service is one click from the home page. columns: { title, links: [{ label, href }] }.
export default function AreaLinks({ text, columns }) {
  return (
    <section className="al" aria-label="Roofing near you and our services">
      <div className="hc-wrap">
        <p className="al-text">
          <Rich text={text} />
        </p>
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
      </div>
    </section>
  );
}
