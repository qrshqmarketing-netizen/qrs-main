import { llmsTxt } from '@/lib/aiFiles';

// /llms.txt: a map of the site for AI assistants (built at deploy time from the page content; see lib/aiFiles.js).
// "noindex" keeps the file itself out of search results; AI tools can still read it.
export const dynamic = 'force-static';

export function GET() {
  return new Response(llmsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex' },
  });
}
