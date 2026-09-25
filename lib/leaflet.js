// Leaflet (maps) touches `window`, so it's loaded in the browser only, on first use.
// Its stylesheet is imported once in app/layout.js.

import { QRS_LEAF_PATH } from '@/components/ui/icons';

let leaflet;

export function loadLeaflet() {
  leaflet ??= import('leaflet').then((mod) => mod.default);
  return leaflet;
}

// The gold QRS map pin (an HTML string, because Leaflet draws markers itself). Styles: .qrs-pin in app/globals.css
const PIN_SVG =
  '<svg viewBox="0 0 34 44" aria-hidden="true"><path d="M17 1C8.2 1 1 8 1 16.7 1 28.5 17 43 17 43s16-14.5 16-26.3C33 8 25.8 1 17 1Z" fill="#d4b572" stroke="#062d57" stroke-width="2"/>' +
  `<g transform="translate(6.5 5.5) scale(.33)"><path d="${QRS_LEAF_PATH}" fill="#062d57"/></g></svg>`;

export const qrsPin = (L, active = false) =>
  L.divIcon({ className: 'qrs-pin' + (active ? ' active' : ''), html: PIN_SVG, iconSize: [34, 44], iconAnchor: [17, 43], popupAnchor: [0, -38] });
