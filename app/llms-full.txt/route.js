import { llmsFullTxt } from '@/lib/aiFiles';

// /llms-full.txt: the main text and FAQs of every page in one file for AI assistants (see lib/aiFiles.js)
export const dynamic = 'force-static';

export function GET() {
  return new Response(llmsFullTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex' },
  });
}
