import { ALL_PLACES, SERVICE_RADIUS_MI } from '@/data/locations';
import { miles, nominatimSearch, pointInGeoJson, zipPrefixServed } from '@/lib/geo';
import { ZIP_EVENT, ZIP_KEY } from '@/lib/events';
import { session } from '@/lib/storage';

// The ZIP check shared by the hero search and the "Roofers near you" section (the same three answers as the service area map, ServiceArea.jsx):
// 'near' (within SERVICE_RADIUS_MI of one of our places), 'inside' (inside the outlined counties, farther out), 'outside'; and when the lookup
// fails, 'prefix' (an LA, OC or Inland Empire ZIP prefix) or 'unknown'. pt is [lat, lng] when the lookup worked.
export async function lookupZip(zip) {
  try {
    const hit = await nominatimSearch('postalcode=' + zip);
    if (!hit) throw new Error('none');
    const pt = [+hit.lat, +hit.lon];
    const nearest = Math.min(...ALL_PLACES.map((p) => miles(pt, [p.lat, p.lng])));
    if (nearest <= SERVICE_RADIUS_MI) return { zip, pt, status: 'near' };
    const { SERVICE_AREA_OUTLINE } = await import('@/data/serviceAreaOutline');
    return { zip, pt, status: pointInGeoJson(pt, SERVICE_AREA_OUTLINE) ? 'inside' : 'outside' };
  } catch {
    return { zip, status: zipPrefixServed(zip) ? 'prefix' : 'unknown' };
  }
}

// Remember the result for this visit and tell the sections listening (the near-you cards, the estimate form's ZIP field)
export function shareZip(result) {
  session.set(ZIP_KEY, JSON.stringify(result));
  window.dispatchEvent(new CustomEvent(ZIP_EVENT, { detail: result }));
}

export function storedZip() {
  try {
    return JSON.parse(session.get(ZIP_KEY) || 'null');
  } catch {
    return null;
  }
}

// Scroll to a section, through the smooth scroller when it runs (scroll-margin-top clears the header)
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = window.__qrsLenis;
  if (lenis) lenis.scrollTo(el, { offset: -(parseFloat(getComputedStyle(el).scrollMarginTop) || 0), force: true });
  else el.scrollIntoView({ behavior: 'smooth' });
}
