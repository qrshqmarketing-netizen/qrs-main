import { ALL_PLACES } from '@/data/locations';
import { SERVICE_AREA_OUTLINE } from '@/data/serviceAreaOutline';
import { OFFICES } from '@/data/site';

// A faint drawing of the service area behind the "Roofers near you" cards (after publicstorage.com's pale map behind its location cards): the
// outlined counties (data/serviceAreaOutline.js, Census data), a small dot for every place we serve and a gold dot for each office. Drawn on
// the server as one small SVG, no map tiles and no script. Decorative.
const COS = Math.cos((34 * Math.PI) / 180); // longitude shrinks at this latitude: keeps the shapes true
const rings = SERVICE_AREA_OUTLINE.features.flatMap(({ geometry: g }) => (g.type === 'Polygon' ? [g.coordinates[0]] : g.coordinates.map((p) => p[0])));
const all = rings.flat();
const minX = Math.min(...all.map(([lng]) => lng)), maxX = Math.max(...all.map(([lng]) => lng));
const minY = Math.min(...all.map(([, lat]) => lat)), maxY = Math.max(...all.map(([, lat]) => lat));
const W = 1000, scale = W / ((maxX - minX) * COS), H = Math.round((maxY - minY) * scale);
const x = (lng) => (((lng - minX) * COS * scale)).toFixed(1);
const y = (lat) => ((maxY - lat) * scale).toFixed(1);
const PATH = rings.map((r) => 'M' + r.map(([lng, lat]) => `${x(lng)} ${y(lat)}`).join('L') + 'Z').join('');

export default function AreaSketch() {
  return (
    <svg className="hc-near-sketch" viewBox={`-40 -40 ${W + 80} ${H + 80}`} aria-hidden="true" focusable="false">
      <path className="hc-near-area" d={PATH} />
      {ALL_PLACES.map((p) => (
        <circle key={p.slug || p.city} className="hc-near-dot" cx={x(p.lng)} cy={y(p.lat)} r="3.2" />
      ))}
      {OFFICES.map((o) => (
        <g key={o.name}>
          <circle className="hc-near-ring" cx={x(o.geo.longitude)} cy={y(o.geo.latitude)} r="16" />
          <circle className="hc-near-office" cx={x(o.geo.longitude)} cy={y(o.geo.latitude)} r="6" />
        </g>
      ))}
    </svg>
  );
}
