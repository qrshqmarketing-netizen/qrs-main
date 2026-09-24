// Instant Quote: address lookup, roof measurement (Google Solar API) and price math.
// Settings and prices live in data/instantQuote.js.

import { FINANCE, GOOGLE_KEY, MIN_JOB, PITCH_ADJ, PRICING, STORY_ADJ, WASTE } from '@/data/instantQuote';
import { nominatimSearch } from './geo';

export const DEMO = !GOOGLE_KEY;

const SQFT_PER_M2 = 10.7639;
const COLORS = ['#ffb82e', '#4fb3ff', '#34c77b', '#ff7a6b', '#b69cff', '#ffe08a', '#6fe0d0', '#ff9ed2'];
const FACING = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];

// Errors are thrown as short codes: 'addr' (address not found), 'geo' (no location), 'roof' (no roof data), 'api'

export async function geocode(q) {
  if (DEMO) {
    const hit = await nominatimSearch('q=' + encodeURIComponent(q));
    if (!hit) throw 'addr';
    return { lat: +hit.lat, lng: +hit.lon, label: hit.display_name.split(',').slice(0, 4).join(',') };
  }
  const r = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(q) + '&key=' + GOOGLE_KEY);
  const d = await r.json();
  if (d.status !== 'OK') throw 'addr';
  const g = d.results[0];
  return { lat: g.geometry.location.lat, lng: g.geometry.location.lng, label: g.formatted_address.replace(/, USA$/, '') };
}

export const myLocation = () =>
  new Promise((res, rej) => {
    if (!navigator.geolocation) return rej('geo');
    navigator.geolocation.getCurrentPosition(
      (p) => res({ lat: p.coords.latitude, lng: p.coords.longitude, label: 'Your current location' }),
      () => rej('geo'),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });

// https://developers.google.com/maps/documentation/solar/building-insights
export async function buildingInsights(lat, lng) {
  if (DEMO) return demoInsights(lat, lng);
  const r = await fetch(
    'https://solar.googleapis.com/v1/buildingInsights:findClosest' +
      '?location.latitude=' + lat.toFixed(6) + '&location.longitude=' + lng.toFixed(6) +
      '&requiredQuality=LOW&key=' + GOOGLE_KEY
  );
  if (r.status === 404) throw 'roof';
  if (!r.ok) throw 'api';
  return r.json();
}

// Sample response in the same shape as the Solar API: a hip roof with 4 sections
function demoInsights(lat, lng) {
  const box = (a, b, c, d) => ({ sw: { latitude: lat + a, longitude: lng + b }, ne: { latitude: lat + c, longitude: lng + d } });
  const seg = (pitch, az, m2, bb) => ({ pitchDegrees: pitch, azimuthDegrees: az, stats: { areaMeters2: m2 }, boundingBox: bb });
  return new Promise((res) =>
    setTimeout(() =>
      res({
        center: { latitude: lat, longitude: lng },
        imageryDate: { year: 2025, month: 6, day: 1 },
        boundingBox: box(-0.0001, -0.00012, 0.0001, 0.00012),
        solarPotential: {
          wholeRoofStats: { areaMeters2: 212.4 },
          roofSegmentStats: [
            seg(22.6, 180, 78.1, box(-0.00007, -0.00008, 0, 0.00008)),
            seg(22.6, 0, 78.1, box(0, -0.00008, 0.00007, 0.00008)),
            seg(24, 90, 28.1, box(-0.00005, 0.00008, 0.00005, 0.00011)),
            seg(24, 270, 28.1, box(-0.00005, -0.00011, 0.00005, -0.00008)),
          ],
        },
      }), 700)
  );
}

// Pitch in degrees → rise per 12" of run, and the matching pitch choice in the form
export const toRise = (deg) => Math.round(Math.tan((deg * Math.PI) / 180) * 12);
export const styleOf = (rise) => (rise < 2 ? 'Flat' : rise < 4 ? 'Low' : rise < 9 ? 'Conventional' : 'Steep');

// Turns a Solar API response into what the drawer shows
export function summarize(b, label) {
  const sp = b.solarPotential || {};
  const segs = (sp.roofSegmentStats || [])
    .filter((s) => s.stats && s.stats.areaMeters2 > 1)
    .sort((x, y) => y.stats.areaMeters2 - x.stats.areaMeters2);
  const segM2 = segs.reduce((t, s) => t + s.stats.areaMeters2, 0);
  const m2 = (sp.wholeRoofStats && sp.wholeRoofStats.areaMeters2) || segM2;
  // Area-weighted average pitch, so a big main roof counts more than a small porch
  const deg = segM2 ? segs.reduce((t, s) => t + (s.pitchDegrees || 0) * s.stats.areaMeters2, 0) / segM2 : 0;
  const d = b.imageryDate;
  return {
    label,
    center: b.center,
    box: b.boundingBox,
    sqft: Math.round(m2 * SQFT_PER_M2),
    rise: toRise(deg),
    date: d ? new Date(d.year, d.month - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '',
    facets: segs.map((s, i) => ({
      sqft: Math.round(s.stats.areaMeters2 * SQFT_PER_M2),
      rise: toRise(s.pitchDegrees || 0),
      facing: (s.pitchDegrees || 0) < 5 ? 'Flat section' : FACING[Math.round((s.azimuthDegrees || 0) / 45) % 8] + '-facing',
      box: s.boundingBox,
      color: COLORS[i % COLORS.length],
    })),
  };
}

// ----- Money -----
export const fmt = (n) => Math.round(n).toLocaleString('en-US');
export const money = (n) => '$' + fmt(n);
const round100 = (n) => Math.round(n / 100) * 100;

export const monthly = (amount, years) => {
  const r = FINANCE.apr / 100 / 12, n = years * 12;
  return r ? (amount * r) / (1 - Math.pow(1 + r, -n)) : amount / n;
};

// Price range for a material, from the answers in the drawer (quote: sqft, pitch, stories)
export function priceFor(quote, material) {
  const p = PRICING[material];
  const adj = quote.sqft * WASTE * (PITCH_ADJ[quote.pitch] || 1) * (STORY_ADJ[quote.stories] || 1);
  return {
    label: p.label,
    low: round100(Math.max(MIN_JOB, adj * p.low)),
    high: round100(Math.max(MIN_JOB * 1.2, adj * p.high)),
  };
}
