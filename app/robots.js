import { SITE_URL } from '@/data/site';
import { ALLOW_INDEXING } from '@/lib/seo';

// The team's dashboard (lib/adminAuth.js); it also sends noindex headers (next.config.mjs) and needs a login
const PRIVATE = ['/admin/', '/api/admin/'];
// Not pages: the form and chat endpoints (/api/) and the review-link redirects (/go/, which also carry a noindex tag). Crawlers don't need either.
const NOT_PAGES = ['/api/', '/go/'];

// AI assistants and AI search crawlers, allowed so QRS can be found and quoted in AI answers.
// To keep one out, move its name into a rule with `disallow: '/'`.
const AI_CRAWLERS = [
  'GPTBot', // OpenAI (ChatGPT)
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot', // Anthropic (Claude)
  'anthropic-ai',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot', // Perplexity
  'Perplexity-User',
  'Google-Extended', // Google Gemini
  'Applebot', // Apple (Siri and Spotlight search)
  'Applebot-Extended', // Apple Intelligence
  'Amazonbot', // Amazon (Alexa)
  'meta-externalagent', // Meta AI
  'Meta-ExternalFetcher',
  'DuckAssistBot', // DuckDuckGo
  'MistralAI-User', // Mistral
  'cohere-ai', // Cohere
  'YouBot', // You.com
  'CCBot', // Common Crawl
];

// /robots.txt: every search engine and AI crawler may read every page; the sitemap lists them all.
// Staging and preview copies ask all crawlers to stay out (see ALLOW_INDEXING in lib/seo.js).
export default function robots() {
  if (!ALLOW_INDEXING) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: [...PRIVATE, ...NOT_PAGES] },
      { userAgent: AI_CRAWLERS, allow: '/', disallow: [...PRIVATE, ...NOT_PAGES] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
