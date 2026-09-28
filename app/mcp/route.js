// MCP (Model Context Protocol) server: lets AI agents call read-only tools backed by real QRS site data —
// service-area coverage, site content search (services, pricing, FAQs), and business contact info. See
// lib/mcpTools.js for what each tool actually does. Nothing here submits a form or writes anywhere.
//
// Implements the JSON-RPC 2.0 subset of MCP's Streamable HTTP transport (https://modelcontextprotocol.io)
// needed for stateless tool calls: initialize, notifications/initialized, tools/list, tools/call, ping.
// No sessions and no server-initiated messages, so GET (used to open a server push stream) isn't offered —
// every request/response happens on a single POST, which the spec allows a stateless server to do.
//
// Discoverability: this URL is listed in /llms.txt, /llms-full.txt and /.well-known/mcp.json. There's no
// web-wide auto-discovery standard for MCP yet (unlike robots.txt for crawlers) — an AI product's user
// still has to add this URL as a connector in their MCP client.
import { SITE_URL } from '@/data/site';
import { TOOLS } from '@/lib/mcpTools';

const PROTOCOL_VERSION = '2025-06-18';
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, MCP-Protocol-Version',
};

async function handle({ method, params }) {
  switch (method) {
    case 'initialize':
      return {
        protocolVersion: params?.protocolVersion || PROTOCOL_VERSION,
        capabilities: { tools: {} },
        serverInfo: { name: 'quality-roofing-specialists', title: 'Quality Roofing Specialists', version: '1.0.0' },
        instructions: `Read-only tools for ${SITE_URL}: check service-area coverage, search site content (services, pricing, FAQs), and get business contact info.`,
      };
    case 'notifications/initialized':
    case 'ping':
      return {};
    case 'tools/list':
      return { tools: TOOLS.map(({ name, description, inputSchema }) => ({ name, description, inputSchema })) };
    case 'tools/call': {
      const tool = TOOLS.find((t) => t.name === params?.name);
      if (!tool) throw { code: -32602, message: `Unknown tool: ${params?.name}` };
      try {
        return await tool.run(params?.arguments || {});
      } catch (err) {
        return { content: [{ type: 'text', text: 'Tool failed: ' + (err?.message || 'unknown error') }], isError: true };
      }
    }
    default:
      throw { code: -32601, message: `Method not found: ${method}` };
  }
}

const json = (body, status = 200) => Response.json(body, { status, headers: CORS });

export async function POST(request) {
  let msg;
  try {
    msg = await request.json();
  } catch {
    return json({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }, 400);
  }
  if (!msg || msg.jsonrpc !== '2.0' || typeof msg.method !== 'string') {
    return json({ jsonrpc: '2.0', id: msg?.id ?? null, error: { code: -32600, message: 'Invalid Request' } }, 400);
  }

  const isNotification = msg.id === undefined;
  try {
    const result = await handle(msg);
    return isNotification ? new Response(null, { status: 202, headers: CORS }) : json({ jsonrpc: '2.0', id: msg.id, result });
  } catch (err) {
    if (isNotification) return new Response(null, { status: 202, headers: CORS });
    return json({ jsonrpc: '2.0', id: msg.id, error: { code: err.code || -32603, message: err.message || 'Internal error' } });
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

// This server has no server-initiated messages, so it doesn't offer the optional GET/SSE stream.
export async function GET() {
  return new Response('Method Not Allowed — POST a JSON-RPC 2.0 request to this URL.', { status: 405, headers: { ...CORS, Allow: 'POST, OPTIONS' } });
}
