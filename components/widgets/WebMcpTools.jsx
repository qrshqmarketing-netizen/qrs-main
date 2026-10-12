'use client';

import { useEffect } from 'react';

// WebMCP (W3C Web Machine Learning Community Group draft, checked 2026-09): lets an AI assistant built into the visitor's browser (ChatGPT's desktop browser,
// Chrome/Edge with the flag or origin trial) use the site's tools directly instead of clicking through pages. The tools are the ones our MCP server already
// offers at /mcp/ (lib/mcpTools.js: check_service_area, search_site, get_business_info, request_estimate): this component asks that server for the list and
// registers each one with the browser, and every call goes back through /mcp/, so it uses the same code, checks and rate limits. A request for a callback is
// marked consequential and also asks the person to confirm in the page before it is sent. In a browser without WebMCP (almost all of them today) it does nothing
// and fetches nothing. To let ordinary Chrome visitors use it during Google's origin trial, set NEXT_PUBLIC_WEBMCP_OT_TOKEN (app/layout.js adds the meta tag).
const ENDPOINT = '/mcp/';

async function rpc(method, params) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: Date.now(), method, params }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message || 'Tool error');
  return data.result;
}

const text = (t) => ({ content: [{ type: 'text', text: t }] });

export default function WebMcpTools() {
  useEffect(() => {
    const mc = document.modelContext ?? navigator.modelContext; // `navigator` is the older entry point
    if (!mc?.registerTool) return undefined;
    const controller = new AbortController();

    (async () => {
      let list;
      try {
        list = (await rpc('tools/list', {})).tools || [];
      } catch {
        return;
      }
      for (const tool of list) {
        if (controller.signal.aborted) return;
        const sends = tool.name === 'request_estimate'; // the only tool that does something: it creates a real lead
        try {
          await mc.registerTool(
            {
              name: tool.name,
              title: tool.title || tool.name.replace(/_/g, ' '),
              description: tool.description,
              inputSchema: tool.inputSchema || { type: 'object', properties: {} },
              annotations: { readOnlyHint: Boolean(tool.annotations?.readOnlyHint), consequentialHint: sends },
              async execute(input = {}) {
                if (sends) {
                  // A person confirms in the page; an agent cannot skip this
                  const ok = window.confirm(
                    `Send a callback request to Quality Roofing Specialists for ${input.name || 'you'}${input.phone ? ` at ${input.phone}` : ''}? They will contact you about your roof.`
                  );
                  if (!ok) return text('The person did not confirm, so no request was sent.');
                }
                try {
                  return await rpc('tools/call', { name: tool.name, arguments: input });
                } catch (err) {
                  return text(`The tool could not finish: ${err.message}. The person can call (310) 340-1643.`);
                }
              },
            },
            { signal: controller.signal }
          );
        } catch {}
      }
    })();

    return () => controller.abort();
  }, []);
  return null;
}
