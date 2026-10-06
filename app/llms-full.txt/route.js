import { llmsFullTxt } from '@/lib/aiFiles';
import { getPageIndex } from '@/lib/siteIndex';

// /llms-full.txt: the main text and FAQs of every page in one file for AI assistants (see lib/aiFiles.js)
export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET() {
  return new Response(llmsFullTxt(await getPageIndex()), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex' },
  });
}
