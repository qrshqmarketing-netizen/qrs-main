<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project notes

- Quality Roofing Specialists marketing site: Next.js App Router, JavaScript, plain CSS. See README.md for the layout.
- Editable content lives in `data/`; each page section is a component in `components/sections/` with its CSS file beside it. Page layouts (service, hub, city) are in `components/templates/`; `data/catalog.js` holds the page structure and `data/content.js` joins it with the copy.
- SEO rule from the owner: every page's `keyword` must appear in its meta title, meta description, H1 and first 100 words. Content text uses `[words](/path/)` links and `**bold**` (rendered by `components/ui/Rich.jsx`); only link to pages that exist.
- Stylesheet order matters: `app/layout.js` imports `leaflet/dist/leaflet.css`, then `app/globals.css`, then components import their own CSS. Keep shared primitives (buttons, form fields, `.container`, `.section`) in `globals.css` so section styles can override them.
- Structured data: every page renders one `<JsonLd data={pageJsonLd({...})} />` (`lib/structuredData.js`) from the same title, description, path, crumbs and FAQs as its metadata and sections. Breadcrumb JSON-LD comes from `pageJsonLd`, not from `Breadcrumbs.jsx`.
- `/llms.txt`, `/llms-full.txt` and the OKF v0.2 bundle at `/okf/` are generated from `lib/pageIndex.js` by `lib/aiFiles.js`. New section services and cities are picked up automatically; one-off pages must be added to `PAGE_INDEX` and to `ALL_PATHS` (`data/content.js`).
- `ALLOW_INDEXING` (`lib/seo.js`) switches robots.txt and the robots meta tag to noindex on Vercel previews, on Vercel production until the live domain is connected, and when `SITE_NOINDEX=true`. Don't hard-code robots rules elsewhere.
- The GitHub repo is public: keep API keys in `.env.local` (git-ignored), never in code.
