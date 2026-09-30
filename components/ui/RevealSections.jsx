'use client';

import { useEffect } from 'react';

export default function RevealSections() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const observed = new WeakSet();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });

    const observeSections = () => {
      document.querySelectorAll('main section:not(.hero)').forEach((section) => {
        if (observed.has(section)) return;
        observed.add(section);
        section.classList.add('reveal-on-scroll');
        observer.observe(section);
      });
    };

    observeSections();
    const mutations = new MutationObserver(observeSections);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
