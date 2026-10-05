'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { rememberPage } from '@/lib/pageTrail';

// Notes the page being viewed (lib/pageTrail.js) for the /start/ request steps. Renders nothing.
export default function PageTrail() {
  const pathname = usePathname();
  useEffect(() => rememberPage(pathname), [pathname]);
  return null;
}
