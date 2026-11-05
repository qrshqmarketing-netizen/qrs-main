'use client';

import { useEffect } from 'react';
import { usePathname } from '@/lib/sitePath';
import { LANGS, langOf } from '@/lib/lang';

// Sets <html lang> to the page's language (es-MX on the Spanish home page at /es/, en otherwise). The root layout is shared by every page, so
// it can only render one value; the Spanish page's <main>, header and footer text also carry lang themselves.
export default function HtmlLang() {
  const pathname = usePathname() || '/';
  useEffect(() => {
    document.documentElement.lang = langOf(pathname) === 'es' ? LANGS.es.code : 'en';
  }, [pathname]);
  return null;
}
