// Search and link-preview tags for an inner page.
// The <title> gets " | Quality Roofing Specialists" on the end only when the whole title still fits in MAX_TITLE characters;
// a longer one drops the brand so the page's own words aren't cut off mid-word in search results. Link previews always
// get the full title with the brand.

import { BUSINESS } from '@/data/site';
import { openGraphBase, twitterBase } from './seo';

const MAX_TITLE = 60; // Google shows about this many characters of a title

// noindex: keep this one page out of search results (e.g. a placeholder); site-wide rules live in lib/seo.js.
// image: { url, width, height, alt } to preview the page with its own photo instead of the site-wide one.
// article: { publishedTime, modifiedTime, author } marks a blog post in link previews.
export function pageMetadata({ title, description, path, noindex = false, image, article }) {
  const fullTitle = `${title} | ${BUSINESS.name}`;
  return {
    title: { absolute: fullTitle.length <= MAX_TITLE ? fullTitle : title },
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
