'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

// Page fade (the idea of the Framer template's page transitions): a click on a link to another page fades the page out (0.2 s), the next page is opened while
// it is invisible, and it fades in (0.3 s). The header and the floating widgets stay where they are; only the page (`main`) and the footer fade (CSS:
// `html.page-leaving` and `html.page-entering` in app/globals.css). The same soft easing as that template: cubic-bezier(.27, 0, .51, 1).
// - A normal left click on an internal link is held for the fade, then opened with router.push; the link's own onClick (closing the menu, tracking) still runs,
//   only Next's navigation is skipped (it ignores a click that was already handled).
// - Not touched: new tabs, modifier keys, #section links, the same page, downloads, files and non-page addresses (/api, /admin, /go, /mcp), reduced motion.
// - Back and forward buttons and navigations from code (the request form, the chat) open at once and the new page fades in.
// - If a page is slow, the old one is shown again after 2.5 s rather than leaving a blank screen.
const OUT_MS = 200;
const IN_MS = 320;
const GIVE_UP_MS = 2500;
const SKIP = /^\/(api|admin|go|mcp|okf|\.well-known)(\/|$)|\.[a-z0-9]{2,5}$/i;

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const first = useRef(true);
  const timers = useRef([]);

  const later = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  };

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onClick = (e) => {
      if (reduced.matches || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target instanceof Element ? e.target.closest('a[href]') : null;
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download') || e.defaultPrevented) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname || SKIP.test(url.pathname)) return;
      e.preventDefault(); // Next's Link sees a handled click and leaves the navigation to us
      root.classList.add('page-leaving');
      later(() => router.push(url.pathname + url.search + url.hash), OUT_MS);
      later(() => root.classList.remove('page-leaving'), GIVE_UP_MS);
    };
    const onShow = (e) => {
      if (e.persisted) root.classList.remove('page-leaving', 'page-entering');
    };
    document.addEventListener('click', onClick, true); // capture: before React's handlers
    window.addEventListener('pageshow', onShow);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('pageshow', onShow);
      timers.current.forEach(clearTimeout);
    };
  }, [router]);

  // The new page is in: show it with a fade
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const root = document.documentElement;
    root.classList.remove('page-leaving');
    root.classList.add('page-entering');
    later(() => root.classList.remove('page-entering'), IN_MS + 80);
  }, [pathname]);

  return null;
}
