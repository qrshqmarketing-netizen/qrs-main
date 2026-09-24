# QRS Website (Next.js)

The Quality Roofing Specialists homepage as a Next.js (App Router) project.

## Run it locally

1. Install **Node.js 20 or newer** (LTS from https://nodejs.org) if you don't have it.
   Check with: `node -v`
2. Open Terminal and go to this folder:
   ```bash
   cd ~/Desktop/Projects/QRS/qrs-website
   ```
3. Install packages (first time only):
   ```bash
   npm install
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Open **http://localhost:3000** in your browser. Edits reload automatically.

Stop the server with `Ctrl + C`.

Production build: `npm run build` then `npm start`.

## Where things live

| What | File |
| --- | --- |
| Page order (sections) | `app/page.js` |
| All styles | `app/globals.css` |
| Phone, services, reviews, video URL, map cities | `data/site.js` |
| Each section | `components/*.jsx` |
| Your photos | `public/images/` (reference as `/images/name.jpg`) |

### Common edits

- **Service photos:** add `image: '/images/roof-replacement.jpg'` to a service in `data/site.js`.
- **Process video:** set `VIDEO_EMBED` in `data/site.js` to a YouTube embed URL.
- **Reviews:** replace the placeholder entries in `REVIEWS` with verified customer reviews.
- **Map cities:** edit `LOCATIONS` in `data/site.js`.
- **Partner logos:** in `components/WhyQRS.jsx`, replace each placeholder with `<img src="/images/logo.png" alt="Partner name" />`.
- **Estimate form:** `components/RoofCheck.jsx` only shows a confirmation right now; connect `onSubmit` to your CRM or email service.

## Notes

- The map uses OpenStreetMap tiles and the free Nominatim ZIP lookup (attribution is shown on the map).
- Social links and Privacy Policy in `components/Footer.jsx` are placeholders (`href="#"`).
