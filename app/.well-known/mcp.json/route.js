import { SITE_URL } from '@/data/site';

// /.well-known/mcp.json: a machine-readable pointer to the MCP server at /mcp (app/mcp/route.js), for any
// AI client that checks a site's well-known directory. There's no ratified standard for this yet — the
// shape here mirrors the "mcpServers" config object MCP clients (Claude Desktop, etc.) already use, so
// it's at least immediately familiar/copyable.
export const dynamic = 'force-static';

export function GET() {
  const body = {
    mcpServers: {
      'quality-roofing-specialists': {
        url: `${SITE_URL}/mcp/`,
        transport: 'streamable-http',
        description:
          'Read-only tools for AI agents: check Quality Roofing Specialists service-area coverage, search site content (services, pricing, FAQs), and get business contact info. No forms or leads are submitted through this server.',
      },
    },
  };
  return Response.json(body, { headers: { 'X-Robots-Tag': 'noindex' } });
}
