<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project notes

- Quality Roofing Specialists marketing site: Next.js App Router, JavaScript, plain CSS. See README.md for the layout.
- Editable content lives in `data/`; each page section is a component in `components/sections/` with its CSS file beside it.
- Stylesheet order matters: `app/layout.js` imports `leaflet/dist/leaflet.css`, then `app/globals.css`, then components import their own CSS. Keep shared primitives (buttons, form fields, `.container`, `.section`) in `globals.css` so section styles can override them.
- The GitHub repo is public: keep API keys in `.env.local` (git-ignored), never in code.
