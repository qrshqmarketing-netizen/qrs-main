// Blog authors (owner, October 16 2026: "Tony G. (The Owner) as the author of the blog articles for E-E-A-T"). Every article shows an author:
// its own `author` (set in the dashboard) when it has one listed here, else DEFAULT_AUTHOR. The byline, the author box at the end of the article
// (components/templates/BlogPost.jsx) and the article's structured data (a Person with job title, profile page and employer) all come from here.
// Only facts the About page already states (data/pages/about.js).
import { ABOUT_LINK } from './catalog';

export const AUTHORS = {
  'Tony G.': {
    name: 'Tony G.',
    role: 'Owner',
    bio: 'Tony is the owner of Quality Roofing Specialists, which he co-founded with Adva. He did his first roofing job at 16 and worked in the roofing departments of other companies before starting QRS, a licensed California contractor since 2020.',
    href: `${ABOUT_LINK.href}#team`,
  },
};

export const DEFAULT_AUTHOR = 'Tony G.';

// The author of a post: its own (when known), else the default
export const authorOf = (post) => AUTHORS[post?.author] || AUTHORS[DEFAULT_AUTHOR];
