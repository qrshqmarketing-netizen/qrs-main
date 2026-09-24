// Search and link-preview tags for an inner page.
// The layout adds " | Quality Roofing Specialists" to the <title>; link previews get the same full title.

import { BUSINESS } from '@/data/site';
import { openGraphBase, twitterBase } from './seo';

export function pageMetadata({ title, description, path }) {
  const fullTitle = `${title} | ${BUSINESS.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...openGraphBase, url: path, title: fullTitle, description },
    twitter: { ...twitterBase, title: fullTitle, description },
  };
}
