<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project notes

- Quality Roofing Specialists marketing site: Next.js App Router, JavaScript, plain CSS. See README.md for the layout.
- Editable content lives in `data/`; each page section is a component in `components/sections/` with its CSS file beside it. Page layouts (service, hub, city) are in `components/templates/`; `data/catalog.js` holds the page structure and `data/content.js` joins it with the copy.
- SEO rule from the owner: every page's `keyword` must appear in its meta title, meta description, H1 and first 100 words. Content text uses `[words](/path/)` links and `**bold**` (rendered by `components/ui/Rich.jsx`); only link to pages that exist.
- Page titles: `pageMetadata` (`lib/pages.js`) adds " | Quality Roofing Specialists" only when the whole title is 60 characters or less; keep a page's own `metaTitle` to about 60 so the keyword is never cut off. A project page whose headline is longer gets a separate `metaTitle`.
- Terminology rule from the owner: homeowners are "homeowners"; property management and commercial jobs are "clients"; QRS employees are "roofers"; subcontracted or outside workers are "crews" (never "subs"/"subcontractors"); general contractors are "contractors". A client's own staff keep their role names ("your property manager or building engineer").
- Stylesheet order matters: `app/layout.js` imports `leaflet/dist/leaflet.css`, then `app/globals.css`, then components import their own CSS. Keep shared primitives (buttons, form fields, `.container`, `.section`) in `globals.css` so section styles can override them.
- Structured data: every page renders one `<JsonLd data={pageJsonLd({...})} />` (`lib/structuredData.js`) from the same title, description, path, crumbs and FAQs as its metadata and sections. Breadcrumb JSON-LD comes from `pageJsonLd`, not from `Breadcrumbs.jsx`.
- `/llms.txt`, `/llms-full.txt` and the OKF v0.2 bundle at `/okf/` are generated from `lib/pageIndex.js` by `lib/aiFiles.js`. New section services and cities are picked up automatically; one-off pages must be added to `PAGE_INDEX` and to `ALL_PATHS` (`data/content.js`).
- `ALLOW_INDEXING` (`lib/seo.js`) switches robots.txt and the robots meta tag to noindex on Vercel preview deployments and when `SITE_NOINDEX=true`; `next.config.mjs` adds `X-Robots-Tag: noindex` on any host other than qualityroofingspecialists.com (e.g. the *.vercel.app URL). `LOAD_TRACKING` (same file) loads Google Analytics (gtag.js, `GA_ID` in `data/site.js`) and Clarity only on indexable production builds. Don't hard-code robots rules elsewhere.
- Campaign attribution: `components/widgets/CampaignWelcome.jsx` (mounted in `app/layout.js`) runs in the browser only, so pages stay static. It saves the link's `utm_source`/`utm_medium`/`utm_campaign` in sessionStorage (`lib/attribution.js`), and the estimate form, Instant Quote and chat send them with the lead (`app/api/lead`, `app/api/chat` → `lib/leads.js` → email rows and sheet columns). Only the Google Business Profile campaigns listed in `data/campaigns.js` show a welcome card (when `SHOW_WELCOME_CARD` is on; it's off for now, attribution only), with the listed text, never text from the URL.
- Live reviews: `components/sections/ReviewSlider.jsx` and the bottom-left `ReviewToast.jsx` share one `/api/google-reviews/` request per page load (`lib/liveReviews.js`; Places API, `lib/placesReviews.js`, `data/places.js`) and show 5-star reviews with Google's required credits; with no `GOOGLE_PLACES_KEY` or Place IDs, or on any error, it keeps the hand-picked `data/reviews.js`. Google's rules don't allow storing reviews: never cache that response (no `revalidate`, no storage).
- The GitHub repo is public: keep API keys in `.env.local` (git-ignored), never in code.
