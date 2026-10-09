'use client';

import { useEffect } from 'react';
import { IMAGE_PARALLAX, LINE_REVEALS, SMOOTH_SCROLL } from '@/data/promo';

// Three quiet scroll effects (switches in data/promo.js), all started only after the page has loaded and gone idle, so the first paint, the LCP photo and
// hydration are never touched. Nothing here runs for visitors who ask for reduced motion, in print, or on /admin.
//  1. Heading line reveals: every word of a heading (and of the home page's big statement) sits in a clipped mask and slides up from below, line by line, when
//     the heading reaches 85% of the way down the screen. 1.1 s, 0.1 s between lines, a long soft ease. The words stay real text in the page, in order,
//     so search engines and screen readers read the heading exactly as before; only headings still below the fold at load are touched, never the hero.
//  2. Image parallax: photos in their frames are scaled up 10% and drift a few percent against the scroll.
//  3. Smooth scrolling (Lenis): wheel and trackpad scrolling glides. Touch screens keep their native scrolling; menus, the chat, the Instant Quote drawer, the
//     map and other inner scrollers keep theirs; it pauses while a menu or popup has locked the page.

const LINE_TARGETS = 'main h2, main .st-lead';
const LINE_SKIP = '.hero, .st-hero, .faq-item, .st-card, .sa-wrap, .post-toc, [data-no-reveal], .mega, .qa-log, .rm-body, nav';
const PARALLAX = '.st-proj img, .st-cat img, .cg-media img, .split-media img, .process-block-media img, .post-image img';
const EASE = 'cubic-bezier(0.17, 0.84, 0.44, 1)';

// Wrap every word of an element in a clipped mask with an inner span, keeping the original inline markup (links, underlines, brand names)
function splitWords(el) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  const masks = [];
  for (const node of nodes) {
    if (!node.textContent.trim()) continue;
    const frag = document.createDocumentFragment();
    for (const part of node.textContent.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        frag.append(part);
        continue;
      }
      const mask = document.createElement('span');
      mask.className = 'lr-wm';
      const inner = document.createElement('span');
      inner.className = 'lr-wi';
      inner.textContent = part;
      mask.append(inner);
      frag.append(mask);
      masks.push(mask);
    }
    node.replaceWith(frag);
  }
  return masks;
}

function startLineReveals() {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        entry.target.classList.add('lr-in');
      }
    },
    { rootMargin: '0px 0px -15% 0px', threshold: 0 }
  );
  document.querySelectorAll(LINE_TARGETS).forEach((el) => {
    if (el.dataset.lr || el.closest(LINE_SKIP) || el.querySelector('input, button, select, textarea')) return;
    const rect = el.getBoundingClientRect();
    if (rect.height < 1 || rect.top < window.innerHeight * 0.96) return; // above the fold or on screen: left exactly as it is
    el.dataset.lr = '1';
    const before = rect.height;
    const masks = splitWords(el);
    if (!masks.length) return;
    // Line number of each word: words on the same row share a delay
    const tops = [];
    masks.forEach((mask) => {
      const top = Math.round(mask.getBoundingClientRect().top / 4);
      let line = tops.indexOf(top);
      if (line < 0) line = tops.push(top) - 1;
      mask.style.setProperty('--l', line);
    });
    // The split must never change how the heading lays out; if it does, put it back untouched
    if (Math.abs(el.getBoundingClientRect().height - before) > 3) {
      el.querySelectorAll('.lr-wm').forEach((m) => m.replaceWith(m.textContent));
      el.normalize();
      return;
    }
    el.classList.add('lr-ready');
    io.observe(el);
  });
  return () => io.disconnect();
}

function startParallax() {
  const frames = new Map(); // image -> frame element
  const visible = new Set();
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) (entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target));
      tick();
    },
    { rootMargin: '20% 0px' }
  );
  document.querySelectorAll(PARALLAX).forEach((img) => {
    const frame = img.parentElement;
    if (!frame || frames.has(img)) return;
    frames.set(img, frame);
    img.classList.add('px');
    io.observe(frame);
  });
  let queued = false;
  const update = () => {
    queued = false;
    const vh = window.innerHeight;
    frames.forEach((frame, img) => {
      if (!visible.has(frame)) return;
      const r = frame.getBoundingClientRect();
      const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2)));
      img.style.setProperty('--py', `${(-p * 4.5).toFixed(2)}%`);
    });
  };
  function tick() {
    if (!queued) {
      queued = true;
      requestAnimationFrame(update);
    }
  }
  window.addEventListener('scroll', tick, { passive: true });
  window.addEventListener('resize', tick);
  tick();
  return () => {
    window.removeEventListener('scroll', tick);
    window.removeEventListener('resize', tick);
    io.disconnect();
    frames.forEach((_, img) => {
      img.classList.remove('px');
      img.style.removeProperty('--py');
    });
  };
}

async function startSmoothScroll() {
  const { default: Lenis } = await import('lenis');
  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    syncTouch: false,
    anchors: true,
    autoRaf: true,
    prevent: (node) =>
      Boolean(node.closest('[data-lenis-prevent], .navlinks.mobile-open, .mega, .qa-log, .rm-body, .sa-list, .loc-list, .leaflet-container, textarea, select, .adm')),
  });
  window.__qrsLenis = lenis; // components/ui/ScrollToTop.jsx resets it on every page change (else its glide carries on to the old page's position)
  const LOCKS = ['menu-open', 'rm-lock', 'promo-open'];
  const sync = () => (LOCKS.some((c) => document.body.classList.contains(c)) ? lenis.stop() : lenis.start());
  const mo = new MutationObserver(sync);
  mo.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  sync();
  return () => {
    mo.disconnect();
    if (window.__qrsLenis === lenis) delete window.__qrsLenis;
    lenis.destroy();
  };
}

export default function StudioMotion() {
  useEffect(() => {
    if (window.location.pathname.startsWith('/admin')) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return undefined;

    const stops = [];
    let cancelled = false;
    const run = () => {
      if (cancelled) return;
      if (LINE_REVEALS && 'IntersectionObserver' in window) stops.push(startLineReveals());
      if (IMAGE_PARALLAX && 'IntersectionObserver' in window) stops.push(startParallax());
      if (SMOOTH_SCROLL) startSmoothScroll().then((stop) => (cancelled ? stop() : stops.push(stop)));
    };
    // After the page has loaded and the browser is idle (the line reveals need the final layout)
    const later = () => ('requestIdleCallback' in window ? window.requestIdleCallback(run, { timeout: 2500 }) : setTimeout(run, 600));
    if (document.readyState === 'complete') later();
    else window.addEventListener('load', later, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('load', later);
      stops.forEach((stop) => stop());
    };
  }, []);
  return null;
}
