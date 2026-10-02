// Search and link-preview tags for an inner page.
// The layout adds " | Quality Roofing Specialists" to the <title>; link previews get the same full title.

import { BUSINESS } from '@/data/site';
import { openGraphBase, twitterBase } from './seo';

// noindex: keep this one page out of search results (e.g. a placeholder); site-wide rules live in lib/seo.js.
// image: { url, width, height, alt } to preview the page with its own photo instead of the site-wide one.
// article: { publishedTime, modifiedTime, author } marks a blog post in link previews.
export function pageMetadata({ title, description, path, noindex = false, image, article }) {
  const fullTitle = `${title} | ${BUSINESS.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    ...(noindex && { robots: { index: false, follow: true } }),
    openGraph: {
      ...openGraphBase,
      url: path,
      title: fullTitle,
      description,
      ...(image && { images: [image] }),
      ...(article && {
        type: 'article',
        publishedTime: article.publishedTime,
        modifiedTime: article.modifiedTime,
        ...(article.author && { authors: [article.author] }),
      }),
    },
    twitter: { ...twitterBase, title: fullTitle, description, ...(image && { images: [image.url] }) },
  };
}
