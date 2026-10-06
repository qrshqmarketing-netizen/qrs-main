// Stylesheet order matters: the map library first, then site-wide styles, then each component's own
// styles (imported inside the components below).
import 'leaflet/dist/leaflet.css';
import './globals.css';
import './dark-theme.css'; // dark theme colors, toggled from the header and saved in local storage

import Script from 'next/script';
import { Open_Sans, Roboto_Condensed } from 'next/font/google';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import SiteChrome from '@/components/layout/SiteChrome';
import CampaignWelcome from '@/components/widgets/CampaignWelcome';
import PageTrail from '@/components/widgets/PageTrail';
import CookieNotice from '@/components/widgets/CookieNotice';
import InstantQuoteLoader from '@/components/widgets/InstantQuoteLoader';
import ReviewToast from '@/components/widgets/ReviewToast';
import SeasonPromo from '@/components/widgets/SeasonPromo';
import RoofAssistant from '@/components/widgets/RoofAssistant';
import RevealSections from '@/components/ui/RevealSections';
import HelpfulTitles from '@/components/ui/HelpfulTitles';
import { INSTANT_QUOTE_ENABLED } from '@/data/instantQuote';
import { PAGE_ENTRANCES } from '@/data/promo';
import { BUSINESS, CLARITY_ID, GA_ID, HOME_DESCRIPTION, SITE_URL, SITE_VERIFICATION } from '@/data/site';
import { ALLOW_INDEXING, LOAD_TRACKING, openGraphBase, twitterBase } from '@/lib/seo';

// Google Fonts, downloaded at build time and served from this site. Both are variable fonts, so no `weight` list: one file covers every
// weight (the site uses 300-800 and 500-700), and the stylesheet carries 19 font rules instead of 83.
const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans' });
// Uppercase condensed display face for every heading (h1–h6 and the hero headline)
const robotoCondensed = Roboto_Condensed({ subsets: ['latin'], variable: '--font-condensed' });

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
      {/* Pages show up at once: no heading fade-ups or scroll reveals unless PAGE_ENTRANCES is on (globals.css) */}
      <body className={PAGE_ENTRANCES ? undefined : 'no-entrance'}>
        <SiteChrome>
          <Header />
          {PAGE_ENTRANCES && <RevealSections />}
          <HelpfulTitles />
        </SiteChrome>
        {children}
        <SiteChrome>
          <Footer />
          <ReviewToast />
          <RoofAssistant />
          {INSTANT_QUOTE_ENABLED && <InstantQuoteLoader />}
          <CookieNotice />
          <SeasonPromo />
          <CampaignWelcome />
          <PageTrail />
          {LOAD_TRACKING && (
            <>
              <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
              <Script id="ga4" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '${GA_ID}');`}
              </Script>
              {/* Not id="clarity": an element's id becomes window.clarity, which stops Clarity from starting */}
              <Script id="clarity-loader" strategy="lazyOnload">
                {`(function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "${CLARITY_ID}");`}
              </Script>
            </>
          )}
        </SiteChrome>
      </body>
    </html>
  );
}
