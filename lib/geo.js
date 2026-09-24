// Distance in miles between two [lat, lng] points
export function miles(a, b) {
  const R = 3958.8, r = (x) => (x * Math.PI) / 180;
  const dLat = r(b[0] - a[0]), dLng = r(b[1] - a[1]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(r(a[0])) * Math.cos(r(b[0])) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// LA County (900–918, 935) and Orange County (926–928) ZIP prefixes: fallback when the lookup fails
export function zipPrefixServed(zip) {
  const p = +zip.slice(0, 3);
  return (p >= 900 && p <= 918) || p === 935 || (p >= 926 && p <= 928);
}

// Free address / ZIP lookup (OpenStreetMap Nominatim). Returns the first US match or undefined.
export async function nominatimSearch(query) {
  const res = await fetch('https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=us&' + query);
  const data = await res.json();
  return data[0];
}
