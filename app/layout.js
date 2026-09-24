// Stylesheet order matters: the map library first, then site-wide styles, then each component's own
// styles (imported inside the components below).
import 'leaflet/dist/leaflet.css';
import './globals.css';

import { Inter, Poppins } from 'next/font/google';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import CookieNotice from '@/components/widgets/CookieNotice';
import InstantQuote from '@/components/widgets/InstantQuote';
import ReviewToast from '@/components/widgets/ReviewToast';
import RoofAssistant from '@/components/widgets/RoofAssistant';
import { BUSINESS, HOME_DESCRIPTION, SITE_URL, SITE_VERIFICATION } from '@/data/site';
import { ALLOW_INDEXING, openGraphBase, twitterBase } from '@/lib/seo';

// Google Fonts, downloaded at build time and served from this site
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-poppins' });
const inter = Inter({ subsets: ['latin'], weight: '700', variable: '--font-inter' });

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
  icons: {
    icon: { url: '/favicon.svg', type: 'image/svg+xml' },
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
    <html lang="en" className={`${poppins.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <body>
        <Header />
        {children}
        <Footer />
        <ReviewToast />
        <RoofAssistant />
        <InstantQuote />
        <CookieNotice />
      </body>
    </html>
  );
}
