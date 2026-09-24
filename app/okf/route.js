import { okfFiles } from '@/lib/aiFiles';

// /okf/: the knowledge bundle's front page (the same file as /okf/index.md)
export const dynamic = 'force-static';

export function GET() {
  return new Response(okfFiles()['index.md'], {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'X-Robots-Tag': 'noindex' },
  });
}
