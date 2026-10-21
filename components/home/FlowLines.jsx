// A field of long hairline curves sweeping up to the right with small "+" marks riding them (after the hero lines on getaethr.ai). Plain SVG,
// built here from fixed numbers, so it is the same on every load and costs no JavaScript; the lines drift very slowly (CSS, transform only) and
// stand still for reduced motion. Decorative: place it inside a positioned section, behind the content.
const W = 1440;
const H = 560;
const CURVES = 9;

const point = (p, t) => {
  const m = 1 - t;
  return [0, 1].map((k) => m * m * m * p[0][k] + 3 * m * m * t * p[1][k] + 3 * m * t * t * p[2][k] + t * t * t * p[3][k]);
};

const curves = Array.from({ length: CURVES }, (_, i) => {
  const o = i / (CURVES - 1);
  return [
    [-80, H * (0.62 + o * 0.5)],
    [W * (0.3 + o * 0.08), H * (0.98 - o * 0.1)],
    [W * (0.5 - o * 0.06), H * (0.12 + o * 0.3)],
    [W + 80, H * (-0.08 + o * 0.42)],
  ];
});

// Marks at fixed spots along the curves, kept to the outer quarters so none lands on the heading or its line
const MARKS = [
  [0, 0.12], [1, 0.9], [2, 0.08], [3, 0.94], [4, 0.16], [5, 0.86], [6, 0.1], [7, 0.92], [8, 0.2], [2, 0.82], [6, 0.88],
]
  .map(([c, t]) => point(curves[c], t))
  .filter(([x, y]) => (x < W * 0.24 || x > W * 0.76) && y > 20 && y < H - 20);

export default function FlowLines({ className = '' }) {
  return (
    <svg className={`hd-flow ${className}`} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <g className="hd-flow-lines">
        {curves.map((p, i) => (
          <path key={i} d={`M${p[0]} C${p[1]} ${p[2]} ${p[3]}`} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
      <g className="hd-flow-marks">
        {MARKS.map(([x, y], i) => (
          <path key={i} d={`M${x - 6} ${y}h12M${x} ${y - 6}v12`} vectorEffect="non-scaling-stroke" style={{ '--i': i }} />
        ))}
      </g>
    </svg>
  );
}
