// Stylesheet order matters: the map library first, then site-wide styles, then each component's own
// styles (imported inside the components below).
import 'leaflet/dist/leaflet.css';
import './globals.css';
import './dark-theme.css'; // dark theme colors, toggled from the header and saved in local storage

import Script from 'next/script';
import { Open_Sans, Roboto_Condensed } from 'next/font/google';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import CampaignWelcome from '@/components/widgets/CampaignWelcome';
import CookieNotice from '@/components/widgets/CookieNotice';
import InstantQuote from '@/components/widgets/InstantQuote';
import ReviewToast from '@/components/widgets/ReviewToast';
import SeasonPromo from '@/components/widgets/SeasonPromo';
import RoofAssistant from '@/components/widgets/RoofAssistant';
import RevealSections from '@/components/ui/RevealSections';
import HelpfulTitles from '@/components/ui/HelpfulTitles';
import { HERO_RAIN } from '@/data/promo';
import { BUSINESS, CLARITY_ID, GTM_ID, HOME_DESCRIPTION, SITE_URL, SITE_VERIFICATION } from '@/data/site';
import { ALLOW_INDEXING, LOAD_TRACKING, openGraphBase, twitterBase } from '@/lib/seo';

// Google Fonts, downloaded at build time and served from this site
const openSans = Open_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'], variable: '--font-open-sans' });
// Uppercase condensed display face for every heading (h1–h6 and the hero headline)
const robotoCondensed = Roboto_Condensed({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-condensed' });

// Defaults for every page. A page's own `metadata` export overrides these.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: BUSINESS.name, template: `%s | ${BUSINESS.name}` },
  description: HOME_DESCRIPTION,
  // Staging and preview copies are kept out of search results (see ALLOW_INDEXING in lib/seo.js)
  robots: ALLOW_INDEXING
    ? { index: true, follow: true, 'max-snippet': -1, 'max-video-preview': -1, 'max-image-preview': 'large' }
    : { index: false, follow: false },
  verification: {
    google: SITE_VERIFICATION.google || undefined,
    other: SITE_VERIFICATION.bing ? { 'msvalidate.01': SITE_VERIFICATION.bing } : undefined,
  },
  // Browser-tab and home-screen icons, made from the logo's roof mark (source: assets/originals/qrs-mark.webp)
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: openGraphBase,
  twitter: twitterBase,
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#062d57',
};

// Header, footer and the floating widgets appear on every page
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={openSans.variable + ' ' + robotoCondensed.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Restore the selected theme before the page paints; ?theme=dark remains available as a preview fallback. */}
        <script dangerouslySetInnerHTML={{ __html: "try{const saved=localStorage.getItem('qrs-theme');const requested=new URLSearchParams(location.search).get('theme');if((saved||requested)==='dark')document.documentElement.dataset.theme='dark';else document.documentElement.removeAttribute('data-theme')}catch{if(/[?&]theme=dark(&|$)/.test(location.search))document.documentElement.dataset.theme='dark'}" }} />
      </head>
      {/* While the hero rain is on, the page shows up at once: no heading fade-ups or scroll reveals (globals.css) */}
      <body className={HERO_RAIN ? 'no-entrance' : undefined}>
        {LOAD_TRACKING && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <Header />
        {!HERO_RAIN && <RevealSections />}
        <HelpfulTitles />
        {children}
        <Footer />
        <ReviewToast />
        <RoofAssistant />
        <InstantQuote />
        <CookieNotice />
        <SeasonPromo />
        <CampaignWelcome />
        {LOAD_TRACKING && (
          <>
            <Script id="gtm" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
            </Script>
            <Script id="clarity" strategy="afterInteractive">
              {`(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_ID}");`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
