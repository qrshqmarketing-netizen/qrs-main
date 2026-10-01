// Temporary placeholder for the QRS blog. Replace this entry with approved new articles.
// noindex: true keeps a post out of search results, the sitemap and the AI files (the blog index still shows it).

export const BLOG_POSTS = [
  {
    slug: 'roofing-blog-updates',
    noindex: true, // placeholder, not an article
    title: 'Roofing Blog Updates Coming Soon',
    keyword: 'roofing blog updates',
    metaTitle: 'Roofing Blog Updates Coming Soon | QRS',
    metaDescription:
      'Roofing blog updates from QRS are coming soon. We’re preparing new, locally relevant roofing guidance for homeowners and property owners in Southern California.',
    datePublished: '2026-09-30',
    dateModified: '2026-09-30',
    excerpt:
      'New roofing blog updates are coming soon. We’re preparing practical guidance for Southern California homeowners and property owners.',
    sections: [
      {
        paragraphs: [
          'Roofing blog updates are coming soon. We’re preparing new articles with practical guidance for homeowners and property owners across Southern California. In the meantime, explore our [residential roofing](/residential-roofing/) and [commercial roofing](/commercial-roofing/) services, or request a roofer-led [roof evaluation](/#roof-check).',
        ],
      },
    ],
    related: ['/residential-roofing/', '/commercial-roofing/'],
  },
];

// Posts search engines and AI assistants should know about
export const PUBLISHED_POSTS = BLOG_POSTS.filter((p) => !p.noindex);
