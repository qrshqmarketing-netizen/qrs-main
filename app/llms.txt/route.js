import { llmsTxt } from '@/lib/aiFiles';
import { getPageIndex } from '@/lib/siteIndex';

// /llms.txt: a map of the site for AI assistants (built from the page content and the blog articles in the database; see lib/aiFiles.js,
// refreshed when the dashboard saves an article). "noindex" keeps the file itself out of search results; AI tools can still read it.
export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET() {
  return new Response(llmsTxt(await getPageIndex()), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex' },
  });
}
