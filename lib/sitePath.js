import { usePathname as useNextPathname } from 'next/navigation';

// The page's address for client components (November 5 2026). When Vercel refreshes a cached page in the background (ISR), the home page is
// rendered as "/index" on the server, while the browser says "/": anything that depends on "is this the home page" (the header's language
// switcher) then differed between the two, and React threw the whole page away and rebuilt it on every visit (hydration error #418), the
// largest part of the home page's slow load on phones. Use this instead of next/navigation's usePathname.
export function usePathname() {
  const path = useNextPathname();
  return path === '/index' || path === '/index/' ? '/' : path;
}
