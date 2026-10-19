import Link from 'next/link';
import AdminIcon from './AdminIcons';

// The top of every dashboard page (the AdFlux pattern): a breadcrumb, the page title, one grey line under it, and actions at the right.
// crumbs: [{ label, href? }] (the last one is the current page). `actions`: buttons or links.
export default function PageHead({ crumbs = [], title, text, actions }) {
  return (
    <div className="adm-head">
      {crumbs.length > 0 && (
        <nav className="adm-crumbs" aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <span key={c.label}>
              {i > 0 && <AdminIcon name="chevron" className="adm-crumb-sep" />}
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </span>
          ))}
        </nav>
      )}
      <div className="adm-head-row">
        <div>
          <h1>{title}</h1>
          {text && <p>{text}</p>}
        </div>
        {actions && <div className="adm-head-actions">{actions}</div>}
      </div>
    </div>
  );
}
