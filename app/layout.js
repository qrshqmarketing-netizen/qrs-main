// Stylesheet order matters: the map library first, then site-wide styles, then each component's own
// styles (imported inside the components below).
import 'leaflet/dist/leaflet.css';
import './globals.css';
import './dark-theme.css'; // dark theme colors, toggled from the header and saved in local storage
import '@/components/studio/StudioSite.css'; // the studio look for every page (STUDIO_THEME in data/promo.js)

import Script from 'next/script';
import { Big_Shoulders, Libre_Franklin } from 'next/font/google';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import SiteChrome from '@/components/layout/SiteChrome';
import CampaignWelcome from '@/components/widgets/CampaignWelcome';
import CallRailSwap from '@/components/widgets/CallRailSwap';
import PageTrail from '@/components/widgets/PageTrail';
import ScrollToTop from '@/components/ui/ScrollToTop';
import PageTransition from '@/components/ui/PageTransition';
import WebMcpTools from '@/components/widgets/WebMcpTools';
import ScrollDraw from '@/components/ui/ScrollDraw';
import ScrollScenes from '@/components/ui/ScrollScenes';
import CookieNotice from '@/components/widgets/CookieNotice';
import InstantQuoteLoader from '@/components/widgets/InstantQuoteLoader';
import MobileActionBar from '@/components/widgets/MobileActionBar';
import SeasonPromo from '@/components/widgets/SeasonPromo';
import RoofAssistant from '@/components/widgets/RoofAssistant';
import RevealSections from '@/components/ui/RevealSections';
import StudioMotion from '@/components/studio/StudioMotion';
import HelpfulTitles from '@/components/ui/HelpfulTitles';
import { INSTANT_QUOTE_ENABLED } from '@/data/instantQuote';
import { PAGE_ENTRANCES, SCROLL_REVEALS, STUDIO_THEME } from '@/data/promo';
import { BUSINESS, CLARITY_ID, GA_ID, HOME_DESCRIPTION, SITE_URL, SITE_VERIFICATION } from '@/data/site';
import { ALLOW_INDEXING, LOAD_TRACKING, openGraphBase, twitterBase } from '@/lib/seo';
import ThemeScript from '@/components/ui/ThemeScript';
import { callrailSwapScript } from '@/lib/callrail';
import SplashScript from '@/components/ui/SplashScript';

// Google Fonts, downloaded at build time and served from this site. Both are variable fonts, so no `weight` list: one file covers every
// weight (the site uses 300-900), and the stylesheet carries only a few font rules instead of dozens.
// Body, menus, buttons and labels: Libre Franklin, a sturdy American-gothic text face that sits well under the condensed headings.
const bodyFont = Libre_Franklin({ subsets: ['latin'], variable: '--font-text' });
// Uppercase condensed display face for every heading (h1–h6 and the hero headline): Big Shoulders, a tall, sturdy, signage-style face
const bigShoulders = Big_Shoulders({ subsets: ['latin'], variable: '--font-condensed' });

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
export default async function RootLayout({ children }) {
  // CallRail's number-swap script (lib/callrail.js), production only; null without a key or company
  const callrailSwap = LOAD_TRACKING ? await callrailSwapScript() : null;
  return (
    <html lang="en" className={bodyFont.variable + ' ' + bigShoulders.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* WebMCP origin trial (components/widgets/WebMcpTools.jsx): set NEXT_PUBLIC_WEBMCP_OT_TOKEN to Google's token for this domain */}
        {process.env.NEXT_PUBLIC_WEBMCP_OT_TOKEN && <meta httpEquiv="origin-trial" content={process.env.NEXT_PUBLIC_WEBMCP_OT_TOKEN} />}
        {/* Restore the selected theme before the page paints; ?theme=dark remains available as a preview fallback (components/ui/ThemeScript.jsx). */}
        <ThemeScript />
        {/* First visit to the home page: the opening splash is decided here, before the first paint (lib/splash.js) */}
        <SplashScript />
      </head>
      {/* Pages show up at once: no heading fade-ups unless PAGE_ENTRANCES is on; the subtle scroll reveals are SCROLL_REVEALS (globals.css) */}
      <body className={[PAGE_ENTRANCES ? '' : 'no-entrance', STUDIO_THEME ? 'studio-site' : ''].filter(Boolean).join(' ') || undefined}>
        <SiteChrome>
          <Header />
          {SCROLL_REVEALS && <RevealSections />}
          <StudioMotion />
          <HelpfulTitles />
        </SiteChrome>
        {children}
        <SiteChrome>
          <Footer />
          <MobileActionBar />
          <RoofAssistant />
          {INSTANT_QUOTE_ENABLED && <InstantQuoteLoader />}
          <CookieNotice />
          <SeasonPromo />
          <CampaignWelcome />
          {callrailSwap && <CallRailSwap />}
          <PageTrail />
          <ScrollToTop />
          <PageTransition />
          <WebMcpTools />
          <ScrollDraw />
          <ScrollScenes />
          {LOAD_TRACKING && (
            /* Google Analytics, Clarity and CallRail's number swapping (with Analytics), each only if the visitor's cookie choice allows it (lib/consent.js; the key, the old "Got it" key and
               the Global Privacy Control default must match it). Google's consent mode starts from that choice; the scripts load after the page
               has loaded, like the lazyOnload they replace. Not id="clarity": an element's id becomes window.clarity, which stops Clarity from starting. */
            <Script id="qrs-tracking" strategy="afterInteractive">
              {`(function(){
  var c=null;
  var gpc=navigator.globalPrivacyControl===true;
  try{c=JSON.parse(localStorage.getItem('qrs-consent'));if(!c&&!gpc&&localStorage.getItem('cookieNoticeOk'))c={analytics:true,clarity:true};}catch(e){}
  function ok(k){return c?c[k]!==false:!gpc;}
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){dataLayer.push(arguments);};
  gtag('consent','default',{analytics_storage:ok('analytics')?'granted':'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  gtag('js',new Date());
  gtag('config','${GA_ID}');
  var done={};
  window.__qrsLoadTracking=function(){
    try{c=JSON.parse(localStorage.getItem('qrs-consent'))||c;}catch(e){}
    if(ok('analytics')&&!done.ga){done.ga=1;var g=document.createElement('script');g.async=1;g.src='https://www.googletagmanager.com/gtag/js?id=${GA_ID}';document.head.appendChild(g);}
    if(${JSON.stringify(Boolean(callrailSwap))}&&ok('analytics')&&!done.cr){done.cr=1;var s=document.createElement('script');s.async=1;s.src=${JSON.stringify(callrailSwap || '')};document.head.appendChild(s);}
    if(ok('clarity')&&!done.cl){done.cl=1;(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");}
  };
  function later(){(window.requestIdleCallback||setTimeout)(window.__qrsLoadTracking);}
  if(document.readyState==='complete')later();else addEventListener('load',later,{once:true});
})();`}
            </Script>
          )}
        </SiteChrome>
      </body>
    </html>
  );
}
