# Quality Roofing Specialists website

The QRS homepage as a modular [Next.js](https://nextjs.org) site. Each section of the page is its own component, and the content you're most likely to change lives in simple files in `data/`.

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
| Home page title and description (Google + link previews) | `data/site.js` |
| Header menus and footer links | `data/navigation.js` |
| Services carousel | `data/services.js` |
| FAQ | `data/faqs.js` |
| "The QRS Way" steps | `data/process.js` |
| Accreditation logos | `data/credentials.js` + images in `public/images/badges/` |
| Google reviews | `data/reviews.js` |
| Service area cities on the map | `data/locations.js` |
| Chat assistant answers | `data/assistant.js` |
| Instant Quote prices and financing | `data/instantQuote.js` |
| Section order on the home page | `app/page.js` |
| Site-wide colors, fonts, buttons, form fields | `app/globals.css` |
| One section's look | the `.css` file next to it in `components/` |

Common edits:

- **Service photos:** add `image: '/images/roof-replacement.webp'` to a service in `data/services.js` and put the photo in `public/images/`.
- **Process video:** set `embed` in `PROCESS_VIDEO` (`data/site.js`) to a YouTube embed URL.
- **Social links:** replace the `'#'` values in `SOCIAL` (`data/site.js`).

## How it's organized

```
app/
  layout.js          Header, footer and floating widgets shared by every page; fonts; SEO defaults
  page.js            The home page: its sections, in order
  not-found.js       "Page not built yet" screen for links to pages that don't exist yet
  globals.css        Site-wide styles
components/
  layout/            Header (with the dropdown menus), Footer
  sections/          One component per home page section, each with its own .css file
  widgets/           Review pop-up, chat assistant, Instant Quote drawer
  ui/                Small shared pieces: logo, icons, arrow buttons
data/                Content and settings (see the table above)
lib/                 Helper code: map loading, Instant Quote math, search engine data
public/              Files served as-is: images, favicon, link-preview image
assets/originals/    Full-size source images (not used by the site)
```

## Adding a page

The menus already link to pages like `/shingle-roofing/`. To build one, create `app/shingle-roofing/page.js`:

```jsx
export const metadata = { title: 'Shingle Roofing', description: '…' };

export default function ShingleRoofingPage() {
  return <main id="top">{/* reuse sections from components/sections, or add new ones */}</main>;
}
```

The header, footer and widgets appear automatically, and the browser tab reads "Shingle Roofing | Quality Roofing Specialists". Links in the header and footer that jump to home page sections (like `#roof-check`) need to become `/#roof-check` once other pages exist.

## Settings and keys

This project is on public GitHub, so **never put API keys in the code**. Copy `.env.example` to `.env.local` (which git ignores) and fill in what you use:

- `NEXT_PUBLIC_GOOGLE_MAPS_KEY`: real roof measurements in the Instant Quote drawer (Google Solar + Geocoding APIs). Restrict the key to your domain in Google Cloud Console. Without it, the drawer runs in demo mode.
- `NEXT_PUBLIC_LEAD_ENDPOINT`: where Instant Quote leads are sent (CRM webhook or form service).
- `NEXT_PUBLIC_CHAT_ENDPOINT`: an AI backend for the chat assistant. Without it, the built-in answers are used.

Restart `npm run dev` after changing `.env.local`. On your hosting service, add the same variables in its settings.

**Not connected yet:** the estimate form ("Tell us what you need") only shows a confirmation. Hook it up in `components/sections/EstimateForm.jsx`.

## Publishing

The easiest host for a Next.js site is [Vercel](https://vercel.com) (free tier): import this GitHub repo and it deploys on every push. Any host that runs Node.js also works (`npm run build` then `npm start`).

## History

The original single-file version of this page (`QRS-roofing-services-carousel.html`) and the earlier `qrs-website/` draft are saved in this repo's first commit. Restore the HTML file with:

```bash
git checkout 3f31e74 -- QRS-roofing-services-carousel.html
```
