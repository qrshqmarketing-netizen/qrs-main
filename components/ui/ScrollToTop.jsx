'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

// Every move to another page starts at the top of that page, whatever the page before was scrolled to: a link, a button that opens a page
// (the request form, the chat assistant) or the logo. Next.js skips its own scroll when the top of the new page is already on screen
// under the fixed header, so this does it explicitly. The browser's Back and Forward buttons keep their own scroll position, and a
// change of the address's ?query on the same page (the blog filters) or a #section link is left alone. A click on a link to the page
// you are already on scrolls up to the top.
// The smooth-scroll library (StudioMotion.jsx) keeps gliding toward the old page's position unless it is told too, so it is reset as well.
function toTop(behavior) {
  const lenis = window.__qrsLenis;
  if (lenis) lenis.scrollTo(0, behavior === 'instant' ? { immediate: true, force: true } : {});
  else window.scrollTo({ top: 0, left: 0, behavior });
  if (behavior === 'instant') window.scrollTo({ top: 0, left: 0, behavior });
}

export default function ScrollToTop() {
  const pathname = usePathname();
  const first = useRef(true);
  const popped = useRef(false);

  useEffect(() => {
    const onPop = () => { popped.current = true; };
    const onClick = (e) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target instanceof Element ? e.target.closest('a[href]') : null;
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.hash) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        toTop('smooth'); // Next's own Link has already stopped the browser from reloading the page
      }
    };
    window.addEventListener('popstate', onPop);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('popstate', onPop);
      document.removeEventListener('click', onClick);
    };
  }, []);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (popped.current) { popped.current = false; return; }
    if (window.location.hash) return;
    toTop('instant');
    // Once more after the new page has painted and a little later, unless the visitor has already started scrolling the new page
    let touched = false;
    const mark = () => { touched = true; };
    window.addEventListener('wheel', mark, { passive: true });
    window.addEventListener('touchstart', mark, { passive: true });
    window.addEventListener('keydown', mark);
    const again = () => { if (!touched && window.scrollY > 0) toTop('instant'); };
    const id = requestAnimationFrame(again);
    const t1 = setTimeout(again, 150);
    const t2 = setTimeout(again, 450);
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('wheel', mark);
      window.removeEventListener('touchstart', mark);
      window.removeEventListener('keydown', mark);
    };
  }, [pathname]);

  return null;
}
