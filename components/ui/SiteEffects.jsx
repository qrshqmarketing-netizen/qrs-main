'use client';

import { useEffect } from 'react';
import { usePathname } from '@/lib/sitePath';
import './SiteEffects.css';

// Scroll effects on every page (owner, November 11 2026, after the reference agency site's home page; first on the home page only, then
// sitewide the same day): each plays once when its group scrolls into view. Tiles wipe in from a random side in a random order (photo and link
// cards, review cards, article cards, office and team cards), small items pop in one after another (logos, number cards), rows and steps slide
// in from the left (the home services list with its number popping first, story principles, process steps, project rows), buttons and check
// points rise, numbers count up from zero (review counts and number cards; a year is left alone), and the closing call to action's pattern
// settles while its buttons rise.
// Rules: nothing already on screen at load is ever hidden; a group the site's own section fade (RevealSections) marked first keeps that fade,
// otherwise the group gets data-no-reveal so the two never animate the same thing; every class and inline value is taken off when an effect
// ends (hover styles and outlines are as before); nothing runs for reduced motion, in print, on /admin, or for crawlers and speed tests.
// It starts again on each page change. To add a group, add a row to GROUPS (and its numbers to COUNTERS).
// The reference's opening logo animation is not copied here: the opening splash was taken off this site on October 19 (owner).
const CLIPS = ['inset(0 0 100% 0)', 'inset(100% 0 0 0)', 'inset(0 100% 0 0)', 'inset(0 0 0 100%)'];

// [holder selector, item selector inside it, effect, ms between items]
const GROUPS = [
  // home
  ['.trust-logos ul', ':scope > li', 'pop', 140],
  ['.st-cats', ':scope > .st-cat', 'tile', 160],
  ['.st-rows', ':scope > li', 'row', 90],
  ['.st-links-grid', ':scope > li', 'tile', 70],
  ['.partner-logos-grid', ':scope > *', 'pop', 120],
  ['.art-grid', ':scope > .art-card', 'tile', 160],
  ['.spi-list', ':scope > li', 'slide', 80],
  // service and hub pages
  ['.sv-cards', ':scope > *', 'tile', 110],
  ['.sv-stats', ':scope > *', 'pop', 120],
  ['.sv-list', ':scope > li', 'slide', 110],
  ['.process-list', ':scope > li', 'slide', 110],
  ['.qh-stats', ':scope > *', 'pop', 120],
  ['.qh-finder-grid', ':scope > *', 'tile', 110],
  // location pages
  ['.lc-cols', ':scope > *', 'rise', 130],
  ['.lc-cards', ':scope > *', 'tile', 130],
  ['.lc-quotes', ':scope > *', 'tile', 130],
  ['.office-grid', ':scope > *', 'tile', 140],
  // company pages
  ['.abr-num-grid', ':scope > *', 'pop', 110],
  ['.abr-team', ':scope > *', 'tile', 110],
  ['.abr-steps', ':scope > *', 'rise', 120],
  ['.cr-logos', ':scope > *', 'pop', 110],
  // every page
  ['.final-actions', ':scope > *', 'rise', 120],
  ['.final-trust', ':scope > li', 'rise', 90],
];
const COUNTERS = '.trust-logos .tl-label, .rmq-sub, .sv-stat b, .qh-stats b, .abr-num-grid dt';
const MAX_ITEMS = 16; // a longer list (the area explorer, the blog list) keeps the plain fade

export default function SiteEffects() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.startsWith('/admin')) return undefined;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    // Search crawlers and speed tests get the page as it is (no hidden tiles, no numbers at zero)
    if (/bot|crawl|spider|lighthouse|pagespeed|headless/i.test(navigator.userAgent)) return undefined;
    let stop = () => {};
    // a moment after the new page is in, and before the section fade's own scan (150-200 ms)
    const boot = setTimeout(() => {
    const main = document.querySelector('main');
    if (!main) return;
    const below = (el) => el.getBoundingClientRect().top > window.innerHeight * 0.96;
    const timers = new Set();
    const cleanups = [];
    const later = (fn, ms) => {
      const id = setTimeout(() => { timers.delete(id); fn(); }, ms);
      timers.add(id);
    };

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        entry.target.__fx?.();
      }
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });

    // Groups of items
    GROUPS.forEach(([holderSel, itemSel, effect, gap]) => {
      main.querySelectorAll(holderSel).forEach((holder) => {
        const items = [...holder.querySelectorAll(itemSel)].filter((i) => i.getClientRects().length > 0);
        if (!items.length || items.length > MAX_ITEMS || holder.classList.contains('fx-hold') || !below(holder) || holder.closest('[data-reveal]') || items.some((i) => i.hasAttribute('data-reveal'))) return;
        holder.setAttribute('data-no-reveal', '');
        const order = effect === 'tile' ? items.map((_, i) => i).sort(() => Math.random() - 0.5) : items.map((_, i) => i);
        items.forEach((item, i) => {
          item.classList.add(`fx-${effect}`);
          item.style.setProperty('--fx-d', `${order[i] * gap + (effect === 'tile' ? Math.round(Math.random() * 90) : 0)}ms`);
          if (effect === 'tile') item.style.setProperty('--fx-clip', CLIPS[Math.floor(Math.random() * CLIPS.length)]);
        });
        holder.classList.add('fx-hold');
        const clear = () => {
          holder.classList.remove('fx-hold', 'fx-in');
          items.forEach((item) => {
            item.classList.remove(`fx-${effect}`);
            item.style.removeProperty('--fx-d');
            item.style.removeProperty('--fx-clip');
          });
        };
        cleanups.push(clear);
        holder.__fx = () => {
          holder.classList.add('fx-in');
          later(clear, items.length * gap + 1600);
        };
        io.observe(holder);
      });
    });

    // The closing call to action's pattern settles into place
    const pattern = main.querySelector('.final .final-pattern');
    if (pattern && below(pattern)) {
      pattern.classList.add('fx-settle');
      const clear = () => pattern.classList.remove('fx-settle', 'fx-in');
      cleanups.push(clear);
      pattern.parentElement.__fx = () => {
        pattern.classList.add('fx-in');
        later(clear, 2200);
      };
      io.observe(pattern.parentElement);
    }

    // Numbers count up from zero (the first number in the element's own text; the real text is put back at the end)
    main.querySelectorAll(COUNTERS).forEach((el) => {
      if (!below(el)) return;
      const node = [...el.childNodes].find((n) => n.nodeType === 3 && /\d/.test(n.textContent));
      const match = node && node.textContent.match(/^(\D*?)(\d[\d,]*)(.*)$/s);
      if (!match) return;
      const full = node.textContent;
      const value = parseInt(match[2].replace(/,/g, ''), 10);
      if (!value || (value >= 1900 && value <= 2100 && !match[2].includes(','))) return; // not a year
      const show = (n) => { node.textContent = match[1] + Math.round(n).toLocaleString('en-US') + match[3]; };
      const prev = el.style.fontVariantNumeric;
      el.style.fontVariantNumeric = 'tabular-nums';
      show(0);
      let raf = 0;
      const restore = () => { cancelAnimationFrame(raf); node.textContent = full; el.style.fontVariantNumeric = prev; };
      cleanups.push(restore);
      el.__fx = () => {
        let start = null;
        const step = (now) => {
          if (start === null) start = now + 250;
          const t = Math.min(Math.max((now - start) / 1800, 0), 1);
          if (t >= 1) { restore(); return; }
          show(value * (1 - (1 - t) ** 3));
          raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        later(restore, 2600); // the real number is back even if the browser is holding animation frames (a background tab)
      };
      io.observe(el);
    });

    stop = () => {
      io.disconnect();
      timers.forEach(clearTimeout);
      cleanups.forEach((fn) => fn());
    };
    }, 60);
    return () => {
      clearTimeout(boot);
      stop();
    };
  }, [pathname]);
  return null;
}
