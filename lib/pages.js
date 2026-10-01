// Search and link-preview tags for an inner page.
// The layout adds " | Quality Roofing Specialists" to the <title>; link previews get the same full title.

import { BUSINESS } from '@/data/site';
import { openGraphBase, twitterBase } from './seo';

// noindex: keep this one page out of search results (e.g. a placeholder); site-wide rules live in lib/seo.js.
export function pageMetadata({ title, description, path, noindex = false }) {
  const fullTitle = `${title} | ${BUSINESS.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    ...(noindex && { robots: { index: false, follow: true } }),
    openGraph: { ...openGraphBase, url: path, title: fullTitle, description },
    twitter: { ...twitterBase, title: fullTitle, description },
  };
}
