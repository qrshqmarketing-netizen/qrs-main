// Leaflet (maps) touches `window`, so it's loaded in the browser only, on first use.
// Its stylesheet is imported once in app/layout.js.

let leaflet;

export function loadLeaflet() {
  leaflet ??= import('leaflet').then((mod) => mod.default);
  return leaflet;
}
