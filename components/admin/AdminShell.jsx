'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminIcon from './AdminIcons';
import { adminApi } from './api';

// The dashboard's frame, after the AdFlux dashboard the owner liked (October 19 2026): a white sidebar with the logo, the sections as icon + label
// rows (the current one raised as a small white card), the support links and the signed-in person at the bottom; a top bar with a button that
// folds the sidebar down to its icons (remembered in this browser), a search box (searches the leads) and the main action at the right; the
// page itself sits on a soft grey panel. Phones: the sidebar becomes a row of icons along the top.
const NAV = [
  { href: '/admin/', label: 'Dashboard', icon: 'dashboard', exact: true },
  { href: '/admin/leads/', label: 'Leads', icon: 'leads' },
  { href: '/admin/articles/', label: 'Articles', icon: 'articles', also: ['/admin/posts/', '/admin/new/', '/admin/preview/'] },
  { href: '/admin/content/', label: 'Site text', icon: 'content' },
  { href: '/admin/team/', label: 'Team', icon: 'team', badge: 'pending' },
];

const initials = (name, email) => (name || email || 'QRS').split(/[\s@.]+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');

export default function AdminShell({ who, pending = 0, children }) {
  const path = usePathname() || '/admin/';
  const router = useRouter();
  const [folded, setFolded] = useState(false);
  useEffect(() => {
    try {
      setFolded(localStorage.getItem('qrs-admin-folded') === '1');
    } catch {}
  }, []);
  const fold = () => {
    setFolded((f) => {
      try {
        localStorage.setItem('qrs-admin-folded', f ? '0' : '1');
      } catch {}
      return !f;
    });
  };
  const active = (item) => {
    const p = path.endsWith('/') ? path : `${path}/`;
    if (item.exact) return p === item.href;
    return p.startsWith(item.href) || item.also?.some((a) => p.startsWith(a));
  };
  const logout = async () => {
    await adminApi('/api/admin/logout', {});
    router.refresh();
  };

  return (
    <div className={'adm adm-app' + (folded ? ' is-folded' : '')}>
      <aside className="adm-side" aria-label="Dashboard sections">
        <Link className="adm-logo" href="/admin/" title="Dashboard">
          <Image src="/images/logo/qrs-mark.webp" alt="" width={34} height={34} unoptimized />
          <span>
            <b>QRS</b> Team
          </span>
        </Link>
        <nav className="adm-nav">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={'adm-nav-item' + (active(item) ? ' on' : '')} aria-current={active(item) ? 'page' : undefined} title={item.label}>
              <AdminIcon name={item.icon} />
              <span className="adm-nav-label">{item.label}</span>
              {item.badge === 'pending' && pending > 0 && (
                <span className="adm-badge" aria-label={`${pending} waiting for approval`}>
                  {pending}
                </span>
              )}
            </Link>
          ))}
        </nav>
        <div className="adm-nav adm-nav-end">
          <a className="adm-nav-item" href="/" target="_blank" rel="noopener" title="View the website">
            <AdminIcon name="site" />
            <span className="adm-nav-label">View the website</span>
          </a>
          <button className="adm-nav-item" type="button" onClick={logout} title="Log out">
            <AdminIcon name="logout" />
            <span className="adm-nav-label">Log out</span>
          </button>
          <div className="adm-me" title={who.email || who.name}>
            <span className="adm-avatar" aria-hidden="true">
              {initials(who.name, who.email)}
            </span>
            <span className="adm-me-text">
              <b>{who.name || who.email.split('@')[0]}</b>
              <small>{who.kind === 'owner' ? 'Team password' : who.email}</small>
            </span>
          </div>
        </div>
      </aside>

      <div className="adm-main">
        <header className="adm-top">
          <button className="adm-icon-btn adm-fold" type="button" onClick={fold} aria-label={folded ? 'Show the sidebar' : 'Fold the sidebar'} aria-pressed={folded}>
            <AdminIcon name="panel" />
          </button>
          <form className="adm-search" action="/admin/leads/" role="search">
            <AdminIcon name="search" />
            <input type="search" name="q" placeholder="Search leads by name, phone, email or ZIP" aria-label="Search leads" />
          </form>
          <Link className="adm-btn adm-btn-primary adm-top-cta" href="/admin/new/">
            <AdminIcon name="plus" />
            <span>New article</span>
          </Link>
        </header>
        <div className="adm-panel">{children}</div>
      </div>
    </div>
  );
}
