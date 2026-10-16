'use client';

import { SPLASH_CODE } from '@/lib/splash';

// Decides before the first paint whether the home page opens with the splash (lib/splash.js). Served as a normal inline script in <head>, like
// ThemeScript; a client re-render of the root layout gets a `text/plain` copy, which the browser never runs and React doesn't warn about.
export default function SplashScript() {
  return <script suppressHydrationWarning type={typeof window === 'undefined' ? undefined : 'text/plain'} dangerouslySetInnerHTML={{ __html: SPLASH_CODE }} />;
}
