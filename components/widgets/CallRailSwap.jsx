'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// CallRail's swap.js (loaded by the consent-gated tracking script in app/layout.js) swaps the phone number on the page it loads on. The site
// changes pages without a full reload, so after each page change this asks it to swap the new page's numbers too (CallTrk.swap(), CallRail's
// call for pages that change their content). Does nothing until swap.js is there.
export default function CallRailSwap() {
  const pathname = usePathname();
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        window.CallTrk?.swap?.();
      } catch {}
    }, 400);
    return () => clearTimeout(t);
  }, [pathname]);
  return null;
}
