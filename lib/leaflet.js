// Leaflet (maps) touches `window`, so it's loaded in the browser only, on first use.
// Its stylesheet is imported once in app/layout.js.

let leaflet;

export function loadLeaflet() {
  leaflet ??= import('leaflet').then((mod) => mod.default);
  return leaflet;
}

// A plain orange centroid dot (an HTML string, because Leaflet draws markers itself), clearer at a glance than a
// custom pin shape. Styles: .qrs-pin in app/globals.css
const PIN_SVG =
  '<svg viewBox="0 0 26 26" aria-hidden="true"><circle cx="13" cy="13" r="11" fill="#f2760f" stroke="#fff" stroke-width="3"/><circle cx="13" cy="13" r="3.5" fill="#fff"/></svg>';

export const qrsPin = (L, active = false) =>
  L.divIcon({ className: 'qrs-pin' + (active ? ' active' : ''), html: PIN_SVG, iconSize: [26, 26], iconAnchor: [13, 13], popupAnchor: [0, -14] });
