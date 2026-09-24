import { SITE_URL } from '@/data/site';
import { ALLOW_INDEXING } from '@/lib/seo';

// AI assistants and AI search crawlers, allowed so QRS can be found and quoted in AI answers.
// To keep one out, move its name into a rule with `disallow: '/'`.
const AI_CRAWLERS = [
  'GPTBot', // OpenAI (ChatGPT)
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot', // Anthropic (Claude)
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot', // Perplexity
  'Perplexity-User',
  'Google-Extended', // Google Gemini
  'Applebot-Extended', // Apple Intelligence
  'Amazonbot', // Amazon (Alexa)
  'meta-externalagent', // Meta AI
  'DuckAssistBot', // DuckDuckGo
  'MistralAI-User', // Mistral
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
      { userAgent: '*', allow: '/' },
      { userAgent: AI_CRAWLERS, allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
