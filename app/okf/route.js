import { okfFiles } from '@/lib/aiFiles';
import { getPageIndex } from '@/lib/siteIndex';

// /okf/: the knowledge bundle's front page (the same file as /okf/index.md)
export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET() {
  return new Response(okfFiles(await getPageIndex())['index.md'], {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'X-Robots-Tag': 'noindex' },
  });
}
