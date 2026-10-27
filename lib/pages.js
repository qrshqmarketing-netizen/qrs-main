// Search and link-preview tags for an inner page.
// Every sub page's <title> is "<the page's own phrase and keywords> | QRS" (owner, October 27 2026, matching the home title
// "QRS | Roofs built right, from the deck up."). Page titles are kept short enough that the whole thing fits in MAX_TITLE characters
// (a longer one would have its end cut off in search results). Link previews use the same title.

import { openGraphBase, twitterBase } from './seo';

// Google shows about 60 characters of a title, so a page title plus " | QRS" should stay within 60 (scripts check it, not this file)

// noindex: keep this one page out of search results (e.g. a placeholder); site-wide rules live in lib/seo.js.
// image: { url, width, height, alt } to preview the page with its own photo instead of the site-wide one.
// article: { publishedTime, modifiedTime, author } marks a blog post in link previews.
export function pageMetadata({ title, description, path, noindex = false, image, article }) {
  const fullTitle = `${title} | QRS`;
  return {
    title: { absolute: fullTitle },
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
