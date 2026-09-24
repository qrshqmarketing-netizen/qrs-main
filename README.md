# Quality Roofing Specialists website

The Quality Roofing Specialists website as a modular [Next.js](https://nextjs.org) site: the home page plus about 50 inner pages (residential and commercial services, 12 city pages, About, Careers and Contractors). Every page is built from shared section components, and the words live in simple files in `data/`.

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
| Offices (Los Angeles and Valley), shown on the Service Areas page and their city pages | `OFFICES` in `data/site.js` |
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
| Commercial pages | `data/services/commercial.js` |
| City pages (intro, neighborhoods, local FAQs) | `data/locationPages.js` |
| Project photo gallery on the city pages | `data/projects.js` |
| $199 Roof Check / roof survey card beside the estimate form | `data/offers.js` |
| Residential hub, About, Careers, Contractors (including white-label roofing), Locations pages | `data/pages/` |
| Careers section on the home page | `CAREERS_TEASER` in `data/pages/careers.js` (roles come from the Careers page) |
| Page names, addresses, card blurbs, placeholder art | `data/catalog.js` |
| "The QRS Way" steps | `data/process.js` |
| Accreditation logos | `data/credentials.js` + images in `public/images/badges/` |
| Google reviews | `data/reviews.js` |
| Service area cities (map + city pages) | `data/locations.js` |
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
  residential-roofing/, shingle-roofing/, tile-roofing/, flat-roofing/, metal-roofing/,
  commercial-roofing/, rain-gutters/, hoa-multi-family/, locations/, about-us/, careers/, contractors/
                     One folder per page address; [service] and [city] folders build one page per entry
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
- **A city:** add it to `data/locations.js` and give it an entry in `data/locationPages.js`.
- **An office:** add it to `OFFICES` in `data/site.js` with the slug of the city page it sits in. Its card appears on that city page and on the Service Areas page, and search engines see it as a branch of the business.
- **A one-off page:** create a folder in `app/` with a `page.js` that combines sections from `components/sections/` (see `app/careers/page.js`). The header, footer and widgets appear automatically, and the browser tab reads "<title> | Quality Roofing Specialists". Also add its address to `ALL_PATHS` in `data/content.js` (sitemap) and an entry to `PAGE_INDEX` in `lib/pageIndex.js` (AI files), and give it structured data with `pageJsonLd` like the other pages.

Links like `#roof-check` jump to that section on the current page; if the page doesn't have it, they go to the home page's section.

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
- `NEXT_PUBLIC_CHAT_ENDPOINT`: an AI backend for the chat assistant. Without it, the built-in answers are used.

Restart `npm run dev` after changing `.env.local`. On your hosting service, add the same variables in its settings.

**Not connected yet:** the estimate form ("Tell us what you need") only shows a confirmation. Hook it up in `components/sections/EstimateForm.jsx`.

## Publishing

The easiest host for a Next.js site is [Vercel](https://vercel.com) (free tier): import this GitHub repo and it deploys on every push. Any host that runs Node.js also works (`npm run build` then `npm start`).

Before pointing qualityroofingspecialists.com at the new site:

- **Redirects:** the current WordPress site has about 150 addresses (service pages, 96 city pages, 25 blog posts, privacy policy and more). Map each one to its new page with permanent redirects, or they'll show "not found" and lose their Google rankings.
- **Tracking:** the current site loads Google Tag Manager (GTM-P7Z3CMG); the new site doesn't have analytics yet.
- **Policies:** the current site has privacy policy and terms pages; the new site doesn't yet. Once the privacy policy exists, set `PRIVACY_POLICY_URL` (`data/site.js`) and the footer and cookie notice link to it.
- **Content:** replace the temporary city gallery photos (`data/projects.js`) and double-check claims such as warranty wording and awards.

## History

The original single-file version of this page (`QRS-roofing-services-carousel.html`) and the earlier `qrs-website/` draft are saved in this repo's first commit. Restore the HTML file with:

```bash
git checkout 3f31e74 -- QRS-roofing-services-carousel.html
```
