'use client';

import { useEffect } from 'react';
import { LINE_REVEALS } from '@/data/promo';

// Subtle scroll reveals: as a visitor scrolls down, the parts of each section (its heading, text, cards, images) fade up a few pixels, once,
// as they come into view; the cards of a grid follow each other a moment apart. Nothing moves above the fold or on the hero, nothing shifts
// the layout (opacity and transform only), sliders and maps stay put, and visitors who ask for reduced motion see none of it.
//
// How it stays safe: the pages are plain HTML first. Only after the page has loaded does this script mark the parts that are still below the
// fold (data-reveal) and turn the effect on (class "reveal-on" on <html>), so without JavaScript, or in print, everything is simply
// there. Once a part has appeared its mark is removed again, so the component's own hover effects and transitions take over. Switch the
// whole thing off with SCROLL_REVEALS in data/promo.js; give an element data-no-reveal to keep it still.
const SECTIONS = 'main > section:not(.hero):not(.home-hero):not(.proofbar)';
// Parts that never move: sliders, maps and embeds (and anything marked data-no-reveal)
const STILL = '[data-no-reveal], .svc-marquee, .svc-marquee-viewport, .project-carousel-frame, .morph-slider, .leaflet-container, .sa-wrap, .loc-wrap, iframe, video';
// Headings (and the home page's big statement) reveal word by word instead (components/studio/StudioMotion.jsx), so they are not faded here as well
const HEADING = 'h2, .st-lead';
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE']);
const BLOCK_GAP_MS = 90; // between a section's own parts (heading, then text), at most two steps
const CARD_GAP_MS = 80; // between the cards of one row
const MAX_COLUMNS = 4;
const SETTLE_MS = 900; // the CSS transition lasts 0.7s

export default function RevealSections() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches) return undefined;

    const root = document.documentElement;
    const seen = new WeakSet();
    const waiting = new Set(); // marked and not yet shown
    const timers = new Set();
    let scanTimer = 0;
    let started = false;

    const done = (el) => {
      el.removeAttribute('data-reveal');
      el.style.removeProperty('--reveal-delay');
    };

    const show = (el) => {
      if (el.getAttribute('data-reveal') !== '') return;
      io.unobserve(el);
      waiting.delete(el);
      el.setAttribute('data-reveal', 'in');
      const delay = parseInt(el.style.getPropertyValue('--reveal-delay'), 10) || 0;
      const timer = setTimeout(() => {
        timers.delete(timer);
        done(el);
      }, SETTLE_MS + delay);
      timers.add(timer);
    };

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) show(entry.target);
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });

    // Marks one part to appear when it scrolls into view; a part that is already on screen (or above it) is left exactly as it is
    const track = (el, delay) => {
      if (seen.has(el)) return;
      seen.add(el);
      const rect = el.getBoundingClientRect();
      if (rect.height < 1 || rect.top < window.innerHeight * 0.96) return;
      el.setAttribute('data-reveal', '');
      if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
      waiting.add(el);
      io.observe(el);
    };

    const isStill = (el) => el.matches(STILL) || Boolean(el.querySelector(STILL));

    // A part that is a row or grid of similar items reveals item by item; anything else reveals as one piece
    const collect = (block, index) => {
      if (SKIP_TAGS.has(block.tagName) || block.hidden || isStill(block)) return;
      const base = Math.min(index, 2) * BLOCK_GAP_MS;
      const items = [...block.children].filter((k) => !SKIP_TAGS.has(k.tagName) && k.getClientRects().length > 0);
      const display = getComputedStyle(block).display;
      const group = (display === 'grid' || display === 'flex' || block.matches('ul, ol')) && items.length >= 2 && items.length <= 16 && !items.some(isStill);
      if (!group) {
        if (LINE_REVEALS) {
          // a heading is left to the line reveal; a wrapper around one reveals its other parts one by one
          if (block.matches(HEADING)) return;
          if (block.querySelector(HEADING)) {
            [...block.children].forEach((k, i) => collect(k, index + i));
            return;
          }
        }
        track(block, base);
        return;
      }
      const firstTop = items[0].getBoundingClientRect().top;
      const columns = Math.min(MAX_COLUMNS, Math.max(1, items.filter((k) => Math.abs(k.getBoundingClientRect().top - firstTop) < 4).length));
      items.forEach((item, i) => track(item, (i % columns) * CARD_GAP_MS));
    };

    const scan = () => {
      document.querySelectorAll(SECTIONS).forEach((section) => {
        const host = section.querySelector(':scope > .container') || section;
        [...host.children].forEach(collect);
      });
    };

    const schedule = () => {
      clearTimeout(scanTimer);
      scanTimer = setTimeout(scan, 150);
    };

    // A part that gets keyboard focus while still hidden appears at once
    const onFocus = (event) => {
      const target = event.target instanceof Element ? event.target.closest('[data-reveal=""]') : null;
      if (target) show(target);
    };

    const begin = () => {
      if (started) return;
      started = true;
      root.classList.add('reveal-on');
      scan();
      document.addEventListener('focusin', onFocus);
      // pages that load more content, and soft navigations to another page, add new sections
      mutations.observe(document.body, { childList: true, subtree: true });
    };

    const mutations = new MutationObserver((records) => {
      if (records.some((r) => [...r.addedNodes].some((n) => n.nodeType === 1 && (n.matches('main, section') || n.querySelector('section'))))) schedule();
    });

    const stop = () => {
      started = false;
      clearTimeout(scanTimer);
      mutations.disconnect();
      document.removeEventListener('focusin', onFocus);
      io.disconnect();
      timers.forEach(clearTimeout);
      timers.clear();
      waiting.forEach(done);
      waiting.clear();
      root.classList.remove('reveal-on');
    };

    const onMotionChange = () => {
      if (motion.matches) stop();
    };
    motion.addEventListener('change', onMotionChange);

    // Start once the page has finished loading, so the first paint and hydration are never touched
    let loadHandler = null;
    if (document.readyState === 'complete') {
      scanTimer = setTimeout(begin, 200);
    } else {
      loadHandler = () => {
        scanTimer = setTimeout(begin, 200);
      };
      window.addEventListener('load', loadHandler, { once: true });
    }

    return () => {
      if (loadHandler) window.removeEventListener('load', loadHandler);
      motion.removeEventListener('change', onMotionChange);
      stop();
    };
  }, []);

  return null;
}
