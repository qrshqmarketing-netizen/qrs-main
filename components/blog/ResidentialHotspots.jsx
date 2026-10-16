'use client';

import Hotspots from './Hotspots';
import './PostVisuals.css';

// An interactive picture of a home's shingle roof (owner, October 16 2026: "a residential leak component too"), the sister of CommercialHotspots:
// the roof face of a house seen from the front, with a chimney and its flashing, a skylight, a vent pipe and its boot, a dormer (step flashing at
// its wall, valleys where its roof meets the main roof), a lifted shingle, a nail pop and the drip edge along the eave. A numbered pin for each
// place the items say leaks start; each item is matched to a spot by words in its name. Fixed colours, like the other diagrams.
const W = 640;
const H = 264;
const ROOF = '200,62 440,62 588,192 52,192'; // ridge left, ridge right, eave right, eave left

// Each pin floats above its detail (x, y) and a thin line runs down to the detail itself (tx, ty)
const SPOTS = [
  { re: /pipe|vent|boot|collar/i, x: 118, y: 98, tx: 152, ty: 150 },
  { re: /step|wall|dormer/i, x: 214, y: 46, tx: 240, ty: 146 },
  { re: /valley/i, x: 296, y: 40, tx: 268, ty: 92 },
  { re: /chimney/i, x: 498, y: 30, tx: 450, ty: 96 },
  { re: /skylight/i, x: 372, y: 40, tx: 356, ty: 110 },
  { re: /shingle|lifted|crease|missing|wind/i, x: 548, y: 112, tx: 496, ty: 150 },
  { re: /nail|fastener/i, x: 600, y: 150, tx: 528, ty: 174 },
  { re: /edge|eave|drip/i, x: 30, y: 150, tx: 70, ty: 190 },
];
const RAIN = [[30, 8], [110, 22], [180, 6], [262, 18], [340, 4], [420, 14], [520, 26], [600, 8], [70, 50], [330, 30], [610, 60]];
const COURSES = Array.from({ length: 10 }, (_, i) => 62 + 13 * (i + 1));

export default function ResidentialHotspots({ items, label }) {
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
        { color: '#4b5a6e', label: 'Shingles' },
        { color: '#e0c68a', label: 'Flashing and edge metal' },
        { color: '#c9d3de', label: 'Walls and chimney' },
        { color: '#8fc1ec', label: 'Skylight' },
      ]}
      hint="Tap a number to see where a home's roof tends to leak."
    >
      <defs>
        <linearGradient id="rh-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#16365c" /><stop offset="1" stopColor="#0b2038" /></linearGradient>
        <linearGradient id="rh-roof" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#56667b" /><stop offset="1" stopColor="#3f4d60" /></linearGradient>
        <linearGradient id="rh-glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#bfe0ff" /><stop offset="1" stopColor="#6fa6d6" /></linearGradient>
        <clipPath id="rh-roof-clip"><polygon points={ROOF} /></clipPath>
      </defs>
      <rect width={W} height={H} fill="url(#rh-sky)" />
      {RAIN.map(([x, y]) => <line key={`${x}-${y}`} x1={x} y1={y} x2={x - 6} y2={y + 16} stroke="rgba(200,220,245,.22)" strokeWidth="1.4" strokeLinecap="round" />)}
      {/* the house under the roof, with its windows and door */}
      <rect x="74" y="192" width="492" height={H - 192} fill="#102a47" />
      {[110, 200, 420, 500].map((x) => <rect key={x} x={x} y="210" width="42" height="34" rx="3" fill="#1b406a" />)}
      <rect x="300" y="208" width="40" height={H - 208} rx="3" fill="#1b406a" />
      {/* the roof face and its shingle courses */}
      <polygon points={ROOF} fill="url(#rh-roof)" />
      <g clipPath="url(#rh-roof-clip)">
        {COURSES.map((y) => <line key={y} x1="40" y1={y} x2="600" y2={y} stroke="#33404f" strokeWidth="1.2" />)}
        {COURSES.map((y, r) => Array.from({ length: 16 }, (_, k) => 44 + k * 36 + (r % 2) * 18).map((x) => <line key={`${y}-${x}`} x1={x} y1={y - 13} x2={x} y2={y} stroke="#33404f" strokeWidth=".8" />))}
      </g>
      <line x1="200" y1="62" x2="440" y2="62" stroke="#2c3846" strokeWidth="3" />
      {/* drip edge along the eave */}
      <rect x="48" y="190" width="544" height="5" rx="1.5" fill="#e0c68a" />
      {/* dormer: valleys where its roof meets the main roof, its little gable roof, the front wall with a window and step flashing at the cheek */}
      <path d="M228,126 L268,84 L308,126" fill="none" stroke="#202a36" strokeWidth="2.4" />
      <polygon points="228,126 268,98 308,126" fill="#46556a" stroke="#2c3846" strokeWidth="1.2" />
      <rect x="238" y="126" width="60" height="44" fill="#c9d3de" />
      <rect x="254" y="134" width="28" height="24" rx="2" fill="#1b406a" />
      {[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M236,${130 + k * 8} h6 v6 h-6 Z`} fill="#e0c68a" />)}
      {/* vent pipe with its boot */}
      <rect x="148" y="122" width="9" height="28" fill="#aab6c4" />
      <rect x="145" y="119" width="15" height="5" rx="2" fill="#c9d3de" />
      <ellipse cx="152.5" cy="151" rx="13" ry="4" fill="#e0c68a" />
      {/* skylight */}
      <rect x="330" y="108" width="52" height="32" rx="2" fill="#e0c68a" />
      <rect x="334" y="112" width="44" height="24" rx="1" fill="url(#rh-glass)" />
      {/* chimney with its flashing and cap */}
      <rect x="434" y="30" width="32" height="68" fill="#c9d3de" />
      <rect x="430" y="26" width="40" height="6" rx="1.5" fill="#aab6c4" />
      {[42, 56, 70, 84].map((y) => <line key={y} x1="434" y1={y} x2="466" y2={y} stroke="#aab6c4" strokeWidth="1" />)}
      <path d="M426,98 L474,98 L478,104 L422,104 Z" fill="#e0c68a" />
      {/* a wind-lifted shingle tab and a nail pop */}
      <path d="M480,154 L512,154 L514,144 L482,146 Z" fill="#6c7d93" stroke="#2c3846" strokeWidth="1" />
      <circle cx="528" cy="174" r="3.6" fill="#8797ab" stroke="#2c3846" strokeWidth="1" />
      {pins.filter(Boolean).map((p) => <g key={`${p.tx}-${p.ty}`}><line x1={p.x} y1={p.y} x2={p.tx} y2={p.ty} stroke="rgba(255,255,255,.7)" strokeWidth="1.4" strokeDasharray="3 3" /><circle cx={p.tx} cy={p.ty} r="2.6" fill="#fff" /></g>)}
    </Hotspots>
  );
}
