# Quality Roofing Specialists website

The Quality Roofing Specialists website as a modular [Next.js](https://nextjs.org) site: the home page plus about 100 inner pages (service-first pages, residential and commercial services, service regions and 14 city pages, a blog, Projects, Reviews, About, Careers, Contractors, Contact and legal pages). Every page is built from shared section components, and the words live in simple files in `data/`.

## Run it on your computer

1. Install **Node.js 20.9 or newer** from [nodejs.org](https://nodejs.org) (check with `node -v`).
2. In Terminal, go to this folder and install the packages (first time only):
   ```bash
   cd ~/Desktop/Projects/QRS
   npm install
   ```
3. Start the site:
   ```bash
   npm run dev
   ```
4. Open **http://localhost:3000**. Edits show up as soon as you save. Stop with `Ctrl + C`.

To test the finished (production) version: `npm run build`, then `npm start`.

## Where to change things

| What | File |
| --- | --- |
| Phone, email, address, hours, social links, video | `data/site.js` |
| Offices (Los Angeles, Valley and Vernon), shown on the Service Areas page and their city pages | `OFFICES` in `data/site.js` |
| Home page title and description (Google + link previews) | `data/site.js` |
| Google Search Console and Bing verification codes | `SITE_VERIFICATION` in `data/site.js` |
| Logo (header: dark version, footer: regular) | `public/images/logo/` (full-size original: `assets/originals/qrs-logo.png`) |
| Privacy policy link (cookie notice + footer; hidden until set) | `PRIVACY_POLICY_URL` in `data/site.js` |
| Cookie notice wording | `components/widgets/CookieNotice.jsx` |
| Header menus and footer links | `data/navigation.js` |
| Services carousel (home and city pages) | `data/services.js` |
| Home page FAQ | `data/faqs.js` |
| Shingle / tile / flat / metal pages (hub + every service) | `data/services/shingle.js`, `tile.js`, `flat.js`, `metal.js` |
| Rain gutters and HOA & multi-family pages | `data/services/specialty.js` |
| Commercial pages (hub + building types) | `data/services/commercial.js` |
| Commercial repair, replacement and maintenance pages | `data/services/commercialServices.js` |
| Roof Repair, Roof Replacement and Roof Inspection pages (every roof type) | `data/services/serviceHubs.js`; their cards: `SERVICE_HUBS` in `data/catalog.js` |
| Emergency & storm damage, maintenance plans and financing pages | `data/services/programs.js` |
| Region pages (LA County, Orange County) | `data/regionPages.js` |
| City pages (intro, neighborhoods, local FAQs) | `data/locationPages.js` |
| Blog posts | `data/blog/posts.js` (blog index wording: `data/pages/blog.js`) |
| Contact, Reviews, Projects, Privacy, Terms and Accessibility pages | `data/pages/contact.js`, `reviews.js`, `projects.js`, `legal.js` |
| Redirects from the old WordPress addresses | `data/redirects.js` |
| Project photo gallery on the city pages | `data/projects.js` |
| $199 Roof Check / roof survey card beside the estimate form | `data/offers.js` |
| Residential hub, About, Careers, Contractors (including white-label roofing), Locations pages | `data/pages/` |
| Careers section on the home page | `CAREERS_TEASER` in `data/pages/careers.js` (roles come from the Careers page) |
| Page names, addresses, card blurbs, placeholder art | `data/catalog.js` |
| "The QRS Way" steps | `data/process.js` |
| Accreditation logos | `data/credentials.js` + images in `public/images/badges/` |
| Google reviews | `data/reviews.js` |
| Service regions and cities (map, region and city pages) | `data/locations.js` |
| Chat assistant answers | `data/assistant.js` |
| Instant Quote prices and financing (visitors can pick several pitches, roof types and materials to compare) | `data/instantQuote.js` |
| Section order on the home page | `app/page.js` |
| Site-wide colors, fonts, buttons, form fields | `app/globals.css` |
| One section's look | the `.css` file next to it in `components/` |

In the `data/` files, `[words](/path/)` makes a link and `**words**` makes bold text. Each page has a `keyword` (its main search phrase) that also appears in its meta title, meta description, H1 and first 100 words; keep it there when you edit.

Common edits:

- **Photos:** pages show placeholder art until you add real job photos. Put the photo in `public/images/`, then add `image: '/images/your-photo.webp'` to the page (or card) in its `data/` file.
- **City project galleries:** every city page currently shows the same temporary photos and artwork. Add real projects to `PROJECTS` in `data/projects.js` (instructions at the top of the file); a city with projects shows only its own. Set `SHOW_PLACEHOLDER_GALLERY` to `false` to hide the gallery on cities without projects.
- **Process video:** set `embed` in `PROCESS_VIDEO` (`data/site.js`) to a YouTube embed URL.
- **Social links:** replace the `'#'` values in `SOCIAL` (`data/site.js`).

## How it's organized

```
app/
  layout.js          Header, footer and floating widgets shared by every page; fonts; SEO defaults
  page.js            The home page: its sections, in order
  roof-repair/, roof-replacement/, residential-roofing/, shingle-roofing/, commercial-roofing/, service-areas/,
  blog/, contact-us/, …
                     One folder per page address; [service], [region], [city] and [slug] folders build one page per entry
  api/location/      The visitor's approximate location for the service area map
  api/chat/          AI backend for the chat assistant (OpenRouter) + lead capture (see "Settings and keys")
  sitemap.js, robots.js  sitemap.xml and robots.txt for search engines and AI crawlers
  llms.txt/, llms-full.txt/, okf/
                     Files for AI assistants, built from the page content (see "Search engines and AI")
  not-found.js       "Page not built yet" screen for addresses that don't exist
  globals.css        Site-wide styles
components/
  layout/            Header (with the dropdown menus), Footer
  sections/          Page sections (hero, overview, process, FAQ, cards…), each with its own .css file
  templates/         Page layouts that combine sections: service page, hub page, city page
  widgets/           Review pop-up, chat assistant, Instant Quote drawer
  ui/                Small shared pieces: logo, icons, links, arrow buttons
data/                Content and settings (see the table above)
lib/                 Helper code: SEO tags, structured data, AI files, map loading, Instant Quote math
public/              Files served as-is: images, favicon, link-preview image
assets/originals/    Full-size source images (not used by the site)
```

## Adding pages

- **A service page in an existing section:** add an entry to that section's `services` list in `data/services/`, then link it from the menu in `data/navigation.js`. The page, its breadcrumbs, cards and sitemap entry appear automatically.
- **A city:** add it to `data/locations.js` (with its region) and give it an entry in `data/locationPages.js`. It gets a page at `/service-areas/<region>/<city>/`.
- **A new region (expanding to a new market):** add it to `REGIONS` in `data/locations.js`, add its page copy to `data/regionPages.js`, then add its cities. The menus, map, sitemap and structured data pick it up automatically.
- **A blog post:** add it to `BLOG_POSTS` in `data/blog/posts.js` (newest first).
- **An office:** add it to `OFFICES` in `data/site.js` with the slug of the city page it sits in. Its card appears on that city page and on the Service Areas page, and search engines see it as a branch of the business.
- **A one-off page:** create a folder in `app/` with a `page.js` that combines sections from `components/sections/` (see `app/careers/page.js`). The header, footer and widgets appear automatically, and the browser tab reads "<title> | Quality Roofing Specialists". Also add its address to `ALL_PATHS` in `data/content.js` (sitemap) and an entry to `PAGE_INDEX` in `lib/pageIndex.js` (AI files), and give it structured data with `pageJsonLd` like the other pages.

Links like `#roof-check` jump to that section on the current page; if the page doesn't have it, they go to the home page's section.

## Service area map: nearest location

When a visitor near one of the cities opens a page with the service area map (home, Service Areas), the map zooms to the nearest QRS location and says so, using the approximate location of their internet connection. There's no permission prompt, nothing is stored, and city pages keep their own city. The location comes from the hosting network (`app/api/location/route.js`):

- **Vercel:** works automatically.
- **Cloudflare in front of the site:** in the Cloudflare dashboard, turn on **Rules → Managed Transforms → Add visitor location headers**.
- **Testing on your computer:** add `DEV_IP_LOCATION=34.1425,-118.2551` (any latitude,longitude) to `.env.local` and restart `npm run dev`.

## Search engines and AI

Everything points at the live address, **https://qualityroofingspecialists.com** (`SITE_URL` in `data/site.js`), even before the site is moved there: canonical tags, the sitemap, link previews and structured data.

- **robots.txt** (`app/robots.js`) lets every search engine and the main AI crawlers (ChatGPT, Claude, Perplexity, Gemini and others) read the whole site, and points them to the sitemap.
- **Structured data:** each page has one JSON-LD block (built by `lib/structuredData.js` from the same text as the page) describing the business, the page, its breadcrumbs, the service it offers and its FAQs. After launch, check pages with Google's [Rich Results Test](https://search.google.com/test/rich-results).
- **AI files:** `/llms.txt` (a map of the site), `/llms-full.txt` (every page's main text and FAQs) and `/okf/` (the same knowledge as a Google Open Knowledge Format bundle) are rebuilt from the page content on every deploy (`lib/aiFiles.js`). They carry a `noindex` header so they don't show up in Google results. Google Search doesn't use them; they're for AI tools.
- **Verification:** the Google Search Console code from the current WordPress site is in `SITE_VERIFICATION` (`data/site.js`), so the Search Console property stays verified after the switch. Add a Bing code there too if you use Bing Webmaster Tools.
- **Staging copies stay out of Google:** only the live domain is indexed. On Vercel this is automatic (preview deployments, and production until the live domain is connected, tell search engines to stay away). On any other host, set the environment variable `SITE_NOINDEX=true` on staging servers.

## Settings and keys

This project is on public GitHub, so **never put API keys in the code**. Copy `.env.example` to `.env.local` (which git ignores) and fill in what you use:

- `NEXT_PUBLIC_GOOGLE_MAPS_KEY`: real roof measurements in the Instant Quote drawer (Google Solar + Geocoding APIs). Restrict the key to your domain in Google Cloud Console. Without it, the drawer runs in demo mode.
- `NEXT_PUBLIC_LEAD_ENDPOINT`: where Instant Quote leads are sent as JSON (CRM webhook or form service). Each lead lists the pitches and roof types picked (`pitches`, `roofTypes`) and one estimate per material (`estimates`).
- `OPENROUTER_API_KEY` and `OPENROUTER_MODEL`: the AI backend for the chat assistant (`app/api/chat/route.js`, via [OpenRouter](https://openrouter.ai)). Without a key, the widget falls back to the built-in canned answers in `data/assistant.js`. Double-check `OPENROUTER_MODEL`'s exact slug at [openrouter.ai/models](https://openrouter.ai/models) before going live.
- `CRM_LEAD_ENDPOINT` and `CRM_LEAD_TOKEN`: where the chat assistant sends leads it captures from the conversation (name, phone, email, zip, interest and transcript), as JSON (`lib/crm.js`). Leave empty and captured leads are just logged to the server console until your CRM is ready.
- `NEXT_PUBLIC_CHAT_ENDPOINT`: only set this to point the chat widget at a different, separately hosted AI backend instead of the built-in one above.

Restart `npm run dev` after changing `.env.local`. On your hosting service, add the same variables in its settings.

**Not connected yet:**
- The estimate form ("Tell us what you need") only shows a confirmation. Hook it up in `components/sections/EstimateForm.jsx`.
- The chat assistant's lead capture logs to the server console until `CRM_LEAD_ENDPOINT` points at a real CRM.

## Publishing

The easiest host for a Next.js site is [Vercel](https://vercel.com) (free tier): import this GitHub repo and it deploys on every push. Any host that runs Node.js also works (`npm run build` then `npm start`).

Before pointing qualityroofingspecialists.com at the new site:

- **Redirects:** every address on the current WordPress site (about 150) either exists on the new site or has a permanent redirect in `data/redirects.js`. If you add or remove old pages before launch, update that list.
- **Tracking:** the current site loads Google Tag Manager (GTM-P7Z3CMG); the new site doesn't have analytics yet.
- **Policies:** the Privacy Policy, Terms and Accessibility Statement (`data/pages/legal.js`) are drafts written from how this site works. Have your attorney review them, and update them when you add analytics, advertising pixels or new forms.
- **Instant Quote financing numbers:** `FINANCE` in `data/instantQuote.js` is still example data (APR and terms); set your lender's real terms, and `FINANCING_URL` if you have an application link.
- **Content:** replace the temporary city gallery photos (`data/projects.js`) and double-check claims such as warranty wording and awards.

## History

The original single-file version of this page (`QRS-roofing-services-carousel.html`) and the earlier `qrs-website/` draft are saved in this repo's first commit. Restore the HTML file with:

```bash
git checkout 3f31e74 -- QRS-roofing-services-carousel.html
```
