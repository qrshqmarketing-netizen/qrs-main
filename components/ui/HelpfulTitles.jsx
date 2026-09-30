'use client';

import { useEffect } from 'react';
import { interactionTitle } from '@/lib/interactionTitle';

const SELECTOR = 'a,button';

function addHelpfulTitles(root = document) {
  const elements = [];
  if (root.matches?.(SELECTOR)) elements.push(root);
  elements.push(...(root.querySelectorAll?.(SELECTOR) || []));

  for (const element of elements) {
    if (element.hasAttribute('title')) continue;
    const label = element.getAttribute('aria-label') || element.querySelector('h1,h2,h3,h4,h5,h6')?.innerText || element.innerText || element.textContent || '';
    const title = interactionTitle({
      href: element.getAttribute('href'),
      label,
      target: element.getAttribute('target'),
      isButton: element.tagName === 'BUTTON',
      expanded: element.hasAttribute('aria-expanded') ? element.getAttribute('aria-expanded') === 'true' : undefined,
    });
    element.setAttribute('title', title);
  }
}

export default function HelpfulTitles() {
  useEffect(() => {
    addHelpfulTitles();
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) addHelpfulTitles(node);
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
