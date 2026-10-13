'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

// Page transitions, adapted from exoape.com (the owner's reference). In a browser with the View Transitions API (Chrome, Edge, Safari 18, recent
// Firefox) a click on a link to another page takes a picture of the page as it is, opens the new page under it, and then the new page rises from the
// bottom over the old one like a sheet, tilted a little and straightening as it comes up, while the old page drifts up and darkens (about 0.95 s).
// The header and the floating widgets are kept out of the picture, so they stay put on top. Once the sheet is nearly up, the new page's headline
// rises into place (html.page-arrive). CSS: the "Page transitions" block at the end of app/globals.css.
// - Without the API: the old fade (the page fades out in 0.2 s, the new one fades in, html.page-leaving / html.page-entering).
// - A normal left click on an internal link is taken over (Next's Link sees a handled click and leaves the navigation to us); the link's own onClick
//   (closing the menu, tracking) still runs. Not touched: new tabs, modifier keys, #section links, the same page, downloads, files and non-page
//   addresses (/api, /admin, /go, /mcp), reduced motion.
// - Back and forward buttons and navigations from code (the request form, the chat) open at once and the new page fades in.
// - If the new page takes too long, the transition goes ahead after 2.5 s (the old picture never stays frozen on screen).
const OUT_MS = 200;
const IN_MS = 320;
const GIVE_UP_MS = 2500;
const ARRIVE_MS = 1700; // how long html.page-arrive stays on (the headline rise starts while the sheet is still moving)
const SKIP = /^\/(api|admin|go|mcp|okf|\.well-known)(\/|$)|\.[a-z0-9]{2,5}$/i;

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const first = useRef(true);
  const timers = useRef([]);
  const arrived = useRef(null); // resolves the running view transition's update once the new page is in
  const covering = useRef(false);

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
      const href = url.pathname + url.search + url.hash;

      if (covering.current) {
        router.push(href); // a second click while the sheet is coming up: just go there
        return;
      }
      if (typeof document.startViewTransition === 'function') {
        covering.current = true;
        root.classList.add('vt-cover');
        const transition = document.startViewTransition(
          () =>
            new Promise((resolve) => {
              arrived.current = resolve;
              router.push(href);
              later(resolve, GIVE_UP_MS);
            })
        );
        transition.ready.catch(() => {}); // skipped (e.g. the tab was hidden): the page simply changes
        transition.finished.catch(() => {}).finally(() => {
          covering.current = false;
          arrived.current = null;
          root.classList.remove('vt-cover');
        });
        return;
      }

      root.classList.add('page-leaving');
      later(() => router.push(href), OUT_MS);
      later(() => root.classList.remove('page-leaving'), GIVE_UP_MS);
    };
    const onShow = (e) => {
      if (e.persisted) root.classList.remove('page-leaving', 'page-entering', 'vt-cover', 'page-arrive');
    };
    document.addEventListener('click', onClick, true); // capture: before React's handlers
    window.addEventListener('pageshow', onShow);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('pageshow', onShow);
      timers.current.forEach(clearTimeout);
    };
  }, [router]);

  // The new page is in
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const root = document.documentElement;
    if (arrived.current) {
      // Under the old page's picture: start the new page at the top (ScrollToTop does it too, but the browser takes the new picture as soon as
      // this resolves), mark it for the headline rise, and let the sheet come up
      window.__qrsLenis?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
      root.classList.add('page-arrive');
      later(() => root.classList.remove('page-arrive'), ARRIVE_MS);
      arrived.current();
      arrived.current = null;
      return;
    }
    root.classList.remove('page-leaving');
    root.classList.add('page-entering');
    later(() => root.classList.remove('page-entering'), IN_MS + 80);
  }, [pathname]);

  return null;
}
