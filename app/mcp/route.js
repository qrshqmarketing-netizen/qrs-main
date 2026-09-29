// MCP (Model Context Protocol) server: lets AI agents call tools backed by real QRS site data — service-area
// coverage, site content search (services, pricing, FAQs), business contact info, and (the one tool that
// writes anything) submitting a real estimate/contact request. See lib/mcpTools.js for what each tool does
// and the safeguards on the one that submits a lead.
//
// Implements the JSON-RPC 2.0 subset of MCP's Streamable HTTP transport (https://modelcontextprotocol.io)
// needed for stateless tool calls: initialize, notifications/initialized, tools/list, tools/call, ping.
// No sessions and no server-initiated messages, so the spec's optional GET/SSE push stream isn't offered.
// A browser opening this URL directly gets a human-readable landing page instead (see GET below) — the URL
// to copy, the mcpServers config snippet, and the tool list, so it's not just a bare 405 for a person who
// clicks the link.
//
// Discoverability: this URL is listed in /llms.txt, /llms-full.txt and /.well-known/mcp.json. There's no
// web-wide auto-discovery standard for MCP yet (unlike robots.txt for crawlers) — an AI product's user
// still has to add this URL as a connector in their MCP client.
import { BUSINESS, PHONE, SITE_URL } from '@/data/site';
import { TOOLS } from '@/lib/mcpTools';

const PROTOCOL_VERSION = '2025-06-18';
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, MCP-Protocol-Version',
};

function clientIP(request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

async function handle({ method, params }, context) {
  switch (method) {
    case 'initialize':
      return {
        protocolVersion: params?.protocolVersion || PROTOCOL_VERSION,
        capabilities: { tools: {} },
        serverInfo: { name: 'quality-roofing-specialists', title: 'Quality Roofing Specialists', version: '1.0.0' },
        instructions:
          `Tools for ${SITE_URL}: check service-area coverage, search site content (services, pricing, FAQs), get business contact info, ` +
          `and request_estimate — the one tool that writes anything. It submits a real lead, so only call it with a real person's ` +
          `explicit, given consent and real contact info, never speculatively.`,
      };
    case 'notifications/initialized':
    case 'ping':
      return {};
    case 'tools/list':
      return { tools: TOOLS.map(({ name, description, inputSchema, annotations }) => ({ name, description, inputSchema, annotations })) };
    case 'tools/call': {
      const tool = TOOLS.find((t) => t.name === params?.name);
      if (!tool) throw { code: -32602, message: `Unknown tool: ${params?.name}` };
      try {
        return await tool.run(params?.arguments || {}, context);
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
    const result = await handle(msg, { ip: clientIP(request) });
    return isNotification ? new Response(null, { status: 202, headers: CORS }) : json({ jsonrpc: '2.0', id: msg.id, result });
  } catch (err) {
    if (isNotification) return new Response(null, { status: 202, headers: CORS });
    return json({ jsonrpc: '2.0', id: msg.id, error: { code: err.code || -32603, message: err.message || 'Internal error' } });
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// A human-readable page for anyone who opens this URL in a browser: what this is, the URL to copy, and the
// tools available. An MCP client never sends a plain browser GET (it POSTs JSON-RPC, or sends an
// Accept: text/event-stream GET to open a push stream, which this stateless server doesn't support) — see
// the GET handler below for how the two are told apart.
function landingPage() {
  const url = `${SITE_URL}/mcp/`;
  const config = JSON.stringify({ mcpServers: { 'quality-roofing-specialists': { url, transport: 'streamable-http' } } }, null, 2);
  const toolRows = TOOLS.map(
    (t) =>
      `<div class="tool"><div class="tool-head"><code>${esc(t.name)}</code>${t.annotations?.readOnlyHint === false ? '<span class="badge">writes a lead</span>' : ''}</div><p>${esc(t.description)}</p></div>`
  ).join('\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>MCP Server — ${esc(BUSINESS.name)}</title>
<meta name="robots" content="noindex">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root{--navy:#062d57;--gold:#d4b572;--gold-ink:#826a35;--muted:#5b6b7c;--line:#e4eaf0;--wash:#f5f8fb}
  *{box-sizing:border-box}
  body{margin:0;font-family:'Open Sans',ui-sans-serif,system-ui,sans-serif;color:var(--navy);background:var(--wash);line-height:1.6}
  .wrap{max-width:760px;margin:0 auto;padding:56px 20px 80px}
  .brand{display:flex;align-items:center;gap:10px;margin-bottom:32px}
  .brand img{height:34px;width:auto;display:block}
  .brand span{font-weight:600;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--gold-ink);background:rgba(212,181,114,.16);padding:4px 10px;border-radius:999px}
  h1{font-size:clamp(28px,5vw,38px);font-weight:700;letter-spacing:-.02em;margin:0 0 12px}
  .lead{font-size:17px;color:var(--muted);margin:0 0 36px;max-width:60ch}
  h2{font-size:18px;font-weight:600;margin:0 0 12px}
  section{margin-bottom:40px}
  .box{background:#fff;border:1px solid var(--line);border-radius:12px;padding:16px 18px;display:flex;align-items:center;gap:12px}
  .box code{flex:1;font:14px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--navy);word-break:break-all}
  pre{background:#fff;border:1px solid var(--line);border-radius:12px;padding:16px 18px;overflow-x:auto;font:13px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace;position:relative}
  .copy{flex:0 0 auto;border:0;background:var(--navy);color:#fff;font:600 13px/1 'Open Sans',sans-serif;padding:9px 14px;border-radius:8px;cursor:pointer;transition:background .15s}
  .copy:hover{background:#0a3969}
  .copy.copied{background:#1d7a58}
  .pre-copy{position:absolute;top:10px;right:10px}
  .tool{background:#fff;border:1px solid var(--line);border-radius:12px;padding:14px 18px;margin-bottom:10px}
  .tool-head{display:flex;align-items:center;gap:10px;margin-bottom:4px}
  .tool code{font:600 13px/1 ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--navy);background:var(--wash);padding:3px 7px;border-radius:6px}
  .tool p{margin:0;color:var(--muted);font-size:14px}
  .badge{font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--gold-ink);background:rgba(212,181,114,.18);padding:2px 8px;border-radius:999px}
  .links{display:flex;flex-wrap:wrap;gap:8px 20px;font-size:14px}
  .links a{color:var(--navy);font-weight:600;text-decoration:underline;text-decoration-color:var(--gold);text-underline-offset:3px}
  footer{border-top:1px solid var(--line);padding-top:20px;color:var(--muted);font-size:13px}
</style>
</head>
<body>
<div class="wrap">
  <div class="brand"><img src="/images/logo/qrs-logo.webp" alt="${esc(BUSINESS.name)}"><span>MCP server</span></div>
  <h1>Connect an AI agent to ${esc(BUSINESS.name)}</h1>
  <p class="lead">This is a Model Context Protocol (MCP) server, not a regular web page — it's meant to be added as a connector in an AI client (Claude, etc.), not browsed. Add the URL below to look up service-area coverage, search real site content, and (with a person's consent) request a callback.</p>

  <section>
    <h2>Connector URL</h2>
    <div class="box"><code id="mcp-url">${esc(url)}</code><button class="copy" onclick="copyText(this,'mcp-url')">Copy</button></div>
  </section>

  <section>
    <h2>Add it to an MCP client</h2>
    <pre><button class="copy pre-copy" onclick="copyText(this,'mcp-config')">Copy</button><code id="mcp-config">${esc(config)}</code></pre>
  </section>

  <section>
    <h2>Tools available</h2>
    ${toolRows}
  </section>

  <footer>
    <p class="links">
      <a href="/.well-known/mcp.json">Machine-readable manifest</a>
      <a href="/llms.txt">llms.txt</a>
      <a href="tel:${esc(PHONE.replace(/[^\d+]/g, ''))}">Call ${esc(PHONE)}</a>
    </p>
  </footer>
</div>
<script>
function flash(btn, label) {
  var original = btn.textContent;
  btn.textContent = label;
  btn.classList.add('copied');
  setTimeout(function () { btn.textContent = original; btn.classList.remove('copied'); }, 1500);
}
function copyText(btn, id) {
  var node = document.getElementById(id);
  var text = node.textContent;
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(function () { flash(btn, 'Copied'); }, function () { fallbackCopy(node, btn); });
  } else {
    fallbackCopy(node, btn);
  }
}
function fallbackCopy(node, btn) {
  var range = document.createRange();
  range.selectNodeContents(node);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  try {
    document.execCommand('copy');
    flash(btn, 'Copied');
  } catch (e) {
    flash(btn, 'Press ⌘C');
  }
  sel.removeAllRanges();
}
</script>
</body>
</html>`;
}

// A browser visiting this URL gets the landing page above; an MCP client's GET (Accept: text/event-stream,
// checking for the optional push-stream support this stateless server doesn't offer) gets the real 405.
export async function GET(request) {
  if (request.headers.get('accept')?.includes('text/html')) {
    return new Response(landingPage(), { headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex' } });
  }
  return new Response('Method Not Allowed — POST a JSON-RPC 2.0 request to this URL.', { status: 405, headers: { ...CORS, Allow: 'POST, OPTIONS' } });
}
