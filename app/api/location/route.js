// /api/location/: the visitor's approximate location from their IP address, used by the service area map
// to suggest the nearest QRS location. The hosting network adds it to each request: Cloudflare's cf-ip* headers
// (turn on Rules → Managed Transforms → "Add visitor location headers") or Vercel's x-vercel-ip-* headers.
// Nothing is stored, and the answer is never cached because it's different for every visitor.

const number = (value) => (value && Number.isFinite(Number(value)) ? Number(value) : null);
const decode = (value) => {
  try {
    return value ? decodeURIComponent(value) : null;
  } catch {
    return value;
  }
};

export function GET(request) {
  const h = request.headers;
  // Cloudflare first: when the site sits behind Cloudflare, Vercel only sees Cloudflare's server
  let lat = number(h.get('cf-iplatitude'));
  let lng = number(h.get('cf-iplongitude'));
  let city = h.get('cf-ipcity');
  if (lat === null || lng === null) {
    lat = number(h.get('x-vercel-ip-latitude'));
    lng = number(h.get('x-vercel-ip-longitude'));
    city = decode(h.get('x-vercel-ip-city'));
  }
  // Local testing only: DEV_IP_LOCATION="34.1425,-118.2551" in .env.local pretends the visitor is there
  if ((lat === null || lng === null) && process.env.NODE_ENV === 'development' && process.env.DEV_IP_LOCATION) {
    [lat, lng] = process.env.DEV_IP_LOCATION.split(',').map(number);
  }
  const located = lat !== null && lng !== null;
  return Response.json(located ? { lat, lng, city: city || null } : { lat: null, lng: null, city: null }, {
    headers: { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex' },
  });
}
