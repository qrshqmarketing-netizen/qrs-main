'use client';

import { usePathname } from '@/lib/sitePath';
import { langOf, t } from '@/lib/lang';

// The page's language from its address (/es/ is Spanish), for client components: `const { lang, tr } = useLang()`.
export default function useLang() {
  const lang = langOf(usePathname() || '/');
  return { lang, tr: (text, vars) => t(lang, text, vars) };
}
