'use client';

import Hotspots from './Hotspots';
import './PostVisuals.css';

// An interactive picture of a flat commercial roof (a parapet wall, a drain with ponding water, a seam, a rooftop unit on its curb, a vent pipe, a
// skylight, a blistered patch of membrane and an open edge) with a numbered pin for each place the article says leaks start. The items come from the
// article's own table ("Where it leaks" / "What goes wrong"); each is matched to a spot by words in its name. Fixed colours, like LayerDiagram.
const W = 640;
const H = 236;
const Y = 150; // the top of the membrane

// Each pin floats above its detail (x, y) and a thin line runs down to the detail itself (tx, ty)
const SPOTS = [
  { re: /drain|scupper/i, x: 132, y: Y - 62, tx: 132, ty: Y - 6 },
  { re: /seam|lap/i, x: 232, y: Y - 62, tx: 232, ty: Y - 7 },
  { re: /wall|parapet/i, x: 66, y: Y - 80, tx: 40, ty: Y - 24 },
  { re: /equipment|curb|unit|hvac/i, x: 322, y: Y - 88, tx: 322, ty: Y - 54 },
  { re: /penetration|pipe|vent|conduit/i, x: 418, y: Y - 88, tx: 418, ty: Y - 54 },
  { re: /skylight/i, x: 500, y: Y - 88, tx: 500, ty: Y - 44 },
  { re: /membrane|surface|puncture|blister/i, x: 572, y: Y - 62, tx: 572, ty: Y - 12 },
  { re: /edge/i, x: 604, y: Y - 84, tx: 624, ty: Y - 10 },
];
const RAIN = [[30, 8], [96, 24], [170, 6], [250, 22], [330, 4], [440, 12], [520, 30], [596, 8], [60, 52], [300, 44], [560, 56]];

export default function CommercialHotspots({ items, label }) {
  const used = new Set();
  const pins = items.map(({ title }) => {
    const i = SPOTS.findIndex((s, idx) => !used.has(idx) && s.re.test(title));
    if (i < 0) return null;
    used.add(i);
    return SPOTS[i];
  });
  return (
    <Hotspots
      items={items}
      pins={pins}
      width={W}
      height={H}
      label={label}
      legend={[
        { color: '#e8edf2', label: 'Membrane' },
        { color: '#d9c58a', label: 'Insulation' },
        { color: '#e0c68a', label: 'Flashing and edge metal' },
        { color: '#7f8b99', label: 'Deck and curbs' },
      ]}
      hint="Tap a number to see where this kind of roof tends to leak."
    >
      <defs>
        <linearGradient id="ch-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#16365c" /><stop offset="1" stopColor="#0b2038" /></linearGradient>
        <linearGradient id="ch-unit" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c9d3de" /><stop offset="1" stopColor="#8795a6" /></linearGradient>
        <linearGradient id="ch-glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#bfe0ff" /><stop offset="1" stopColor="#6fa6d6" /></linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#ch-sky)" />
      {RAIN.map(([x, y]) => <line key={`${x}-${y}`} x1={x} y1={y} x2={x - 6} y2={y + 16} stroke="rgba(200,220,245,.22)" strokeWidth="1.4" strokeLinecap="round" />)}
      {/* the building under the roof */}
      <rect x="0" y={Y + 28} width={W} height={H - Y - 28} fill="#102a47" />
      {[70, 190, 310, 430, 550].map((x) => <rect key={x} x={x} y={Y + 46} width="46" height="34" rx="3" fill="#1b406a" />)}
      {/* deck, insulation, membrane */}
      <rect x="0" y={Y + 14} width={W - 20} height="14" fill="#7f8b99" />
      <rect x="0" y={Y + 4} width={W - 20} height="10" fill="#d9c58a" />
      <rect x="0" y={Y - 3} width={W - 20} height="7" fill="#e8edf2" />
      {/* parapet wall on the left, with its flashing and cap */}
      <rect x="0" y={Y - 52} width="30" height={52 + 28} fill="#52627a" />
      <rect x="-2" y={Y - 57} width="38" height="7" rx="2" fill="#e0c68a" />
      <path d={`M30,${Y - 34} L48,${Y - 3} L30,${Y - 3} Z`} fill="#e0c68a" opacity=".9" />
      {/* drain with ponding water and debris */}
      <ellipse cx="132" cy={Y - 2} rx="38" ry="4.5" fill="#6fa6d6" opacity=".55" />
      <path d={`M114,${Y - 3} Q132,${Y + 6} 150,${Y - 3} Z`} fill="#52627a" />
      <rect x="120" y={Y - 5} width="24" height="2.4" fill="#aeb9c7" />
      {[[126, Y - 6], [136, Y - 7], [143, Y - 5]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="2.4" fill="#7c8a5e" />)}
      {/* seam / lap */}
      <path d={`M226,${Y - 3} L226,${Y - 6.5} L240,${Y - 6.5} L240,${Y - 3}`} fill="#f4f7fa" stroke="#9fb0c3" strokeWidth="1" />
      <line x1="233" y1={Y - 6} x2="233" y2={Y - 2} stroke="#2f5380" strokeWidth="1.2" strokeDasharray="2 2" />
      {/* rooftop unit on its curb */}
      <rect x="282" y={Y - 14} width="84" height="11" fill="#7f8b99" />
      <path d={`M276,${Y - 3} L282,${Y - 14} L366,${Y - 14} L372,${Y - 3} Z`} fill="#e0c68a" opacity=".85" />
      <rect x="288" y={Y - 52} width="72" height="38" rx="4" fill="url(#ch-unit)" />
      <circle cx="324" cy={Y - 33} r="13" fill="#52627a" />
      {[0, 60, 120].map((a) => <line key={a} x1="324" y1={Y - 33} x2={324 + 11 * Math.cos((a * Math.PI) / 180)} y2={Y - 33 + 11 * Math.sin((a * Math.PI) / 180)} stroke="#aeb9c7" strokeWidth="2" />)}
      {/* vent pipe with boot */}
      <rect x="412" y={Y - 48} width="12" height="45" fill="#aab6c4" />
      <rect x="409" y={Y - 52} width="18" height="6" rx="2" fill="#c9d3de" />
      <path d={`M404,${Y - 3} L410,${Y - 14} L426,${Y - 14} L432,${Y - 3} Z`} fill="#e0c68a" />
      {/* skylight */}
      <rect x="466" y={Y - 12} width="68" height="9" fill="#7f8b99" />
      <path d={`M470,${Y - 12} Q500,${Y - 52} 530,${Y - 12} Z`} fill="url(#ch-glass)" stroke="#e0c68a" strokeWidth="2" />
      {/* blistered, split membrane */}
      <path d={`M556,${Y - 3} Q572,${Y - 15} 588,${Y - 3} Z`} fill="#f4f7fa" stroke="#9fb0c3" />
      <path d={`M566,${Y - 9} l5,4 -3,3 5,3`} fill="none" stroke="#52627a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      {/* open roof edge with its metal */}
      <rect x={W - 26} y={Y - 6} width="18" height="9" rx="2" fill="#e0c68a" />
      <path d={`M${W - 8},${Y - 6} l8,12 -8,0 Z`} fill="#e0c68a" />
      {pins.filter(Boolean).map((p) => <g key={`${p.tx}-${p.ty}`}><line x1={p.x} y1={p.y} x2={p.tx} y2={p.ty} stroke="rgba(255,255,255,.7)" strokeWidth="1.4" strokeDasharray="3 3" /><circle cx={p.tx} cy={p.ty} r="2.6" fill="#fff" /></g>)}
    </Hotspots>
  );
}
