// Distance in miles between two [lat, lng] points
export function miles(a, b) {
  const R = 3958.8, r = (x) => (x * Math.PI) / 180;
  const dLat = r(b[0] - a[0]), dLng = r(b[1] - a[1]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(r(a[0])) * Math.cos(r(b[0])) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Whether a [lat, lng] point is inside a GeoJSON polygon / multipolygon collection (data/serviceAreaOutline.js)
export function pointInGeoJson(point, geojson) {
  const [lat, lng] = point;
  const inRing = (ring) => {
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i], [xj, yj] = ring[j];
      if (yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  };
  // A polygon is a list of rings: the first is its outline, the rest are holes
  const inPolygon = (rings) => inRing(rings[0]) && !rings.slice(1).some(inRing);
  return geojson.features.some(({ geometry: g }) => (g.type === 'Polygon' ? inPolygon(g.coordinates) : g.coordinates.some(inPolygon)));
}

// LA County (900–918, 935) and Orange County (926–928) ZIP prefixes: fallback when the lookup fails
export function zipPrefixServed(zip) {
  const p = +zip.slice(0, 3);
  return (p >= 900 && p <= 918) || p === 923 || p === 925 || p === 935 || (p >= 926 && p <= 928); // 923 and 925: the Inland Empire (Fontana, Riverside, Temecula...)
}

// Free address / ZIP lookup (OpenStreetMap Nominatim). Returns the first US match or undefined.
// Nominatim's usage policy requires an identifying User-Agent from server-side callers, or it 403s; browsers
// silently ignore this header (a forbidden header name they set themselves), so it's safe to always send.
export async function nominatimSearch(query) {
  const res = await fetch('https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=us&' + query, {
    headers: { 'User-Agent': 'QualityRoofingSpecialistsWebsite/1.0 (+https://qualityroofingspecialists.com)' },
  });
  const data = await res.json();
  return data[0];
}
