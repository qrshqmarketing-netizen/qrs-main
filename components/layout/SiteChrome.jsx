'use client';

import { usePathname } from 'next/navigation';

// The public site's header, footer, floating widgets and analytics, left out of the dashboard at /admin/ (a plain page for the team,
// not for visitors, so no chat widget, no cookie notice and no analytics hits).
export default function SiteChrome({ children }) {
  return usePathname()?.startsWith('/admin') ? null : children;
}
