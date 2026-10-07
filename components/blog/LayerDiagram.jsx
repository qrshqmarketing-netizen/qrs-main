'use client';

import Hotspots from './Hotspots';
import { splitLead } from './lead';
import './PostVisuals.css';

// An interactive cross-section of a tile roof (tiles, underlayment, roof deck, rafters, a vent pipe with its flashing and a valley) with a numbered
// pin for each cause of a leak. The causes are the article's own list items ("**Underlayment deterioration:** text"); each one is matched to a spot
// by its title, and tapping a pin or a card highlights the other. Every cause stays visible as text, so nothing depends on the script.
// Drawn in SVG from a few numbers below; the colors are fixed (a navy "blueprint" card in both themes).

const W = 640;
const H = 262;
const S0 = 112; // top of the tile base on flat parts
const VX = 200; // valley centre
const VW = 62; // valley half width
const VD = 34; // valley depth
const PIPE_X = 420;

const surface = (x) => {
  const d = Math.abs(x - VX);
  return S0 + (d < VW ? VD * (1 - d / VW) : 0);
};
const line = (x0, x1, off) => {
  const out = [];
  for (let x = x0; x < x1; x += 8) out.push([x, surface(x) + off]);
  out.push([x1, surface(x1) + off]);
  return out;
};
const poly = (top, bottom) => [...top, ...[...bottom].reverse()].map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
const band = (x0, x1, a, b) => poly(line(x0, x1, a), line(x0, x1, b));

// A row of barrel tiles along the flat part x0..x1
const tileRun = (x0, x1, skip) => {
  const tiles = [];
  for (let x = x0; x + 6 < x1; x += 46) tiles.push(x);
  return tiles.filter((x) => x !== skip);
};
const arch = (x, y) => `M${x},${y} C${x + 2},${y - 24} ${x + 44},${y - 24} ${x + 46},${y} Z`;

const LEFT = tileRun(0, VX - VW);
const RIGHT = tileRun(VX + VW, W);
const BROKEN = 538;
const RAIN = [[30, 8], [96, 30], [160, 6], [236, 24], [300, 4], [352, 20], [470, 10], [520, 34], [580, 8], [616, 26], [60, 56], [268, 52], [558, 60]];

// Where each cause's pin sits, found by a word in its title; a cause that matches none still shows in the list
const SPOTS = [
  { re: /underlayment/i, x: 336, y: S0 + 13 },
  { re: /flashing/i, x: PIPE_X + 30, y: S0 - 8 },
  { re: /tile/i, x: BROKEN + 24, y: S0 - 24 },
  { re: /valley/i, x: VX, y: S0 + VD - 6 },
  { re: /penetration|vent|pipe/i, x: PIPE_X, y: 58 },
  { re: /deck|sheathing/i, x: 78, y: S0 + 31 },
];

const parse = (item) => {
  const { lead, rest } = splitLead(item);
  return lead ? { title: lead, text: rest } : { title: item, text: '' };
};

export default function LayerDiagram({ items, label }) {
  const causes = items.map(parse);
  const used = new Set();
  const pins = causes.map(({ title }) => {
    const i = SPOTS.findIndex((s, idx) => !used.has(idx) && s.re.test(title));
    if (i < 0) return null;
    used.add(i);
    return SPOTS[i];
  });

  const deck = band(0, W, 17, 43);
  const under = band(0, W, 10, 17);
  const base = [...LEFT.length ? [band(0, VX - VW, 0, 10)] : [], band(VX + VW, W, 0, 10)];
  const valley = line(VX - VW, VX + VW, -1).map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const rafters = [56, 176, 300, 470, 590].map((x) => poly(line(x, x + 26, 43), [[x, H - 12], [x + 26, H - 12]]));

  return (
    <Hotspots
      items={causes}
      pins={pins}
      width={W}
      height={H}
      label={label}
      legend={[
        { color: '#c4623f', label: 'Tiles' },
        { color: '#2f5380', label: 'Underlayment' },
        { color: '#cfa56f', label: 'Roof deck' },
        { color: '#e0c68a', label: 'Flashing and valley metal' },
      ]}
    >

          <defs>
            <linearGradient id="ld-tile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e08a5f" /><stop offset="1" stopColor="#a8452a" /></linearGradient>
            <linearGradient id="ld-deck" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d9b27c" /><stop offset="1" stopColor="#b98a55" /></linearGradient>
            <linearGradient id="ld-pipe" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#8c99a8" /><stop offset=".5" stopColor="#c9d3de" /><stop offset="1" stopColor="#7d8a99" /></linearGradient>
            <linearGradient id="ld-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#16365c" /><stop offset="1" stopColor="#0b2038" /></linearGradient>
          </defs>
          <rect width={W} height={H} fill="url(#ld-sky)" />
          {RAIN.map(([x, y]) => <line key={`${x}-${y}`} x1={x} y1={y} x2={x - 6} y2={y + 16} stroke="rgba(200,220,245,.22)" strokeWidth="1.4" strokeLinecap="round" />)}
          {rafters.map((p) => <polygon key={p} points={p} fill="#7a5632" />)}
          <polygon points={deck} fill="url(#ld-deck)" />
          {[0, 1, 2].map((g) => <polyline key={g} points={line(0, W, 22 + g * 8).map(([x, y]) => `${x},${y}`).join(' ')} fill="none" stroke="rgba(120,80,40,.28)" strokeWidth="1" />)}
          <polygon points={under} fill="#2f5380" />
          <polyline points={line(0, W, 13.5).map(([x, y]) => `${x},${y}`).join(' ')} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1" strokeDasharray="6 5" />
          {base.map((p) => <polygon key={p} points={p} fill="#8f3a24" />)}
          {LEFT.map((x) => <path key={`l${x}`} d={arch(x, S0)} fill="url(#ld-tile)" stroke="#f3b08a" strokeOpacity=".5" />)}
          {RIGHT.filter((x) => x !== BROKEN).map((x) => <path key={`r${x}`} d={arch(x, S0)} fill="url(#ld-tile)" stroke="#f3b08a" strokeOpacity=".5" />)}
          <g transform={`rotate(9 ${BROKEN} ${S0}) translate(0 -5)`}>
            <path d={arch(BROKEN, S0)} fill="url(#ld-tile)" stroke="#f3b08a" strokeOpacity=".5" />
            <path d={`M${BROKEN + 14},${S0 - 20} l7,8 -6,5 8,9`} fill="none" stroke="#3a1409" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <polyline points={valley} fill="none" stroke="#e0c68a" strokeWidth="5" strokeLinejoin="round" />
          <polyline points={valley} fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="1.2" strokeLinejoin="round" />
          {[[186, S0 + VD - 6], [199, S0 + VD - 7], [212, S0 + VD - 6], [193, S0 + VD - 11]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="2.6" fill="#7c8a5e" />)}
          <rect x={PIPE_X - 10} y="40" width="20" height={S0 + 43 - 40} fill="url(#ld-pipe)" />
          <rect x={PIPE_X - 13} y="36" width="26" height="8" rx="2" fill="#aab6c4" />
          <path d={`M${PIPE_X - 14},${S0 - 4} L${PIPE_X + 14},${S0 - 4} L${PIPE_X + 30},${S0 + 1} L${PIPE_X - 30},${S0 + 1} Z`} fill="#e0c68a" stroke="rgba(255,255,255,.4)" />
        
    </Hotspots>
  );
}
