import { okfFiles } from '@/lib/aiFiles';

// /okf/<file>.md: the Open Knowledge Format bundle, one Markdown file per page (built by lib/aiFiles.js).
// Every file is generated at deploy time; other addresses return 404.
export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(okfFiles()).map((file) => ({ path: file.split('/') }));

export async function GET(_request, { params }) {
  const { path } = await params;
  return new Response(okfFiles()[path.join('/')], {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'X-Robots-Tag': 'noindex' },
  });
}
