import { okfFiles } from '@/lib/aiFiles';
import { getPageIndex } from '@/lib/siteIndex';

// /okf/<file>.md: the Open Knowledge Format bundle, one Markdown file per page (built by lib/aiFiles.js from the page content and the blog
// articles in the database). Files are generated at deploy time; an article added in the dashboard afterwards gets its file on first request.
export const dynamicParams = true;
export const revalidate = 3600;
export const generateStaticParams = async () => Object.keys(okfFiles(await getPageIndex())).map((file) => ({ path: file.split('/') }));

export async function GET(_request, { params }) {
  const { path } = await params;
  const file = okfFiles(await getPageIndex())[path.join('/')];
  if (file === undefined) return new Response('Not found', { status: 404 });
  return new Response(file, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'X-Robots-Tag': 'noindex' },
  });
}
