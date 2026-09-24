import SiteLink from '@/components/ui/SiteLink';
import './Breadcrumbs.css';

// "Home › Residential Roofing › Tile Roofing" trail. items: [{ label, href }], ending with the current page.
// Search engines get the same trail in the page's structured data (pageJsonLd in lib/structuredData.js).
export default function Breadcrumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, i) => (
          <li key={item.href}>
            {i < items.length - 1 ? (
              <SiteLink href={item.href}>{item.label}</SiteLink>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
