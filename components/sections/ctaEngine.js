// The WebGL engine behind CtaBackground.jsx (the closing call to action above the footer): one fragment shader over the band's solid navy.
// Slow-flowing contour lines in the site's gold (every fourth one a little brighter), drawn from a drifting noise field, with a faint plum
// and blue glow moving underneath. The lines fade toward the middle, where the heading and buttons sit, so the copy always reads on plain
// navy. Plain WebGL, no libraries; fetched only when the band is about to come into view, drawn at 30 frames a second and only while it is
// on screen and the tab is visible. The base color is the band's own CSS background, so the canvas and the fallback always match.

const VERTEX = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uRes;
uniform float uTime;
uniform float uCss;
uniform vec3 uBase;
uniform vec3 uGold;
uniform vec3 uBlue;
uniform vec3 uPlum;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float s = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    s += a * noise(p);
    p = p * 2.02 + 7.3;
    a *= 0.5;
  }
  return s;
}

// The height field the contour lines are traced from: a broad drifting swell with a slower ripple on top
float field(vec2 p, float t) {
  return fbm(p * 0.85 + vec2(t * 0.022, -t * 0.015)) + 0.38 * fbm(p * 1.9 + vec2(-t * 0.03, t * 0.02) + 4.0);
}

void main() {
  vec2 frag = gl_FragCoord.xy * uCss;          // CSS pixels, so the pattern is the same size on every screen
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = frag / 260.0;
  float t = uTime;

  // contour lines of constant width: the distance to the nearest line, divided by how steep the field is here
  float levels = 11.0;
  float e = 1.0 / 260.0;
  float f = field(p, t);
  float fx = field(p + vec2(e, 0.0), t);
  float fy = field(p + vec2(0.0, e), t);
  float grad = length(vec2(fx - f, fy - f)) * levels + 1e-4;
  float v = f * levels;
  float dist = abs(fract(v) - 0.5) / grad;     // in CSS pixels
  float major = 1.0 - step(0.5, mod(floor(v + 0.5), 4.0));
  float width = mix(0.55, 0.9, major);
  float line = 1.0 - smoothstep(width, width + 1.1, dist);

  // quiet in the middle where the copy sits, fuller toward the edges
  vec2 c = (uv - 0.5) * vec2(1.25, 1.0);
  float edge = smoothstep(0.2, 0.7, length(c));
  float alpha = line * mix(0.035, 0.3, edge) * mix(1.0, 1.6, major);

  // two soft glows drifting across the band
  vec2 g1 = vec2(0.22 + 0.08 * sin(t * 0.07), 0.78 + 0.06 * cos(t * 0.05));
  vec2 g2 = vec2(0.8 + 0.07 * cos(t * 0.06), 0.25 + 0.07 * sin(t * 0.08));
  float aspect = uRes.x / uRes.y;
  float d1 = length((uv - g1) * vec2(aspect, 1.0));
  float d2 = length((uv - g2) * vec2(aspect, 1.0));
  vec3 col = uBase;
  col += uPlum * 0.32 * exp(-d1 * d1 * 2.2);
  col += uBlue * 0.18 * exp(-d2 * d2 * 2.0);
  col = mix(col, uGold, alpha);

  // a touch of dither against banding in the dark gradients
  col += (hash(gl_FragCoord.xy + fract(t)) - 0.5) / 255.0;
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(log || 'shader failed to compile');
  }
  return shader;
}

// "#rrggbb" or "rgb(r, g, b)" -> [r, g, b] (0 to 1); anything else gives the fallback
function rgb(value, fallback) {
  const s = String(value || '').trim();
  const hex = /^#?([0-9a-f]{6})$/i.exec(s);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
  }
  const fn = /^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/i.exec(s);
  if (fn) return [fn[1] / 255, fn[2] / 255, fn[3] / 255];
  return fallback;
}

const DEFAULTS = {
  base: [0.024, 0.176, 0.341], // #062d57
  gold: [0.831, 0.71, 0.447], // #d4b572
  blue: [0.12, 0.42, 0.86],
  plum: [0.42, 0.145, 0.27], // #6b2545
};

export class CtaEngine {
  // options: { reducedMotion, scale (render size relative to the CSS size, default up to 1.5x for crisp lines), fps (default 30),
  // colors: { base, gold, blue, plum } as #rrggbb or rgb() }
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ok = false;
    this.scale = options.scale || Math.min(window.devicePixelRatio || 1, 1.5);
    this.frameGap = 1000 / (options.fps || 30);
    this.reduced = Boolean(options.reducedMotion);
    this.visible = true;
    this.raf = 0;
    this.last = 0;
    this.clock = 0;
    this.seed = 20 + Math.random() * 60; // each visit opens on a different stretch of the pattern

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: 'low-power' });
    if (!gl) return;
    this.gl = gl;

    const c = options.colors || {};
    try {
      const program = gl.createProgram();
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
      this.program = program;
    } catch {
      return;
    }

    gl.useProgram(this.program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    // one big triangle that covers the whole canvas
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(this.program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    this.u = {};
    for (const name of ['uRes', 'uTime', 'uCss', 'uBase', 'uGold', 'uBlue', 'uPlum']) this.u[name] = gl.getUniformLocation(this.program, name);
    gl.uniform3fv(this.u.uBase, rgb(c.base, DEFAULTS.base));
    gl.uniform3fv(this.u.uGold, rgb(c.gold, DEFAULTS.gold));
    gl.uniform3fv(this.u.uBlue, rgb(c.blue, DEFAULTS.blue));
    gl.uniform3fv(this.u.uPlum, rgb(c.plum, DEFAULTS.plum));

    this.onLost = (e) => {
      e.preventDefault();
      this.pause();
      this.ok = false;
      this.canvas.dispatchEvent(new Event('cta-lost'));
    };
    canvas.addEventListener('webglcontextlost', this.onLost);
    this.onVisibility = () => (document.hidden ? this.pause() : this.play());
    document.addEventListener('visibilitychange', this.onVisibility);

    this.ok = true;
    this.resize();
    if (!this.reduced) this.play();
  }

  resize() {
    if (!this.gl) return;
    const w = Math.max(2, Math.round(this.canvas.clientWidth * this.scale));
    const h = Math.max(2, Math.round(this.canvas.clientHeight * this.scale));
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
      this.gl.viewport(0, 0, w, h);
    }
    this.gl.uniform1f(this.u.uCss, this.canvas.clientWidth / this.canvas.width);
    this.draw(0);
  }

  draw(dt) {
    if (!this.ok) return;
    const { gl } = this;
    this.clock += dt;
    gl.uniform2f(this.u.uRes, this.canvas.width, this.canvas.height);
    gl.uniform1f(this.u.uTime, this.seed + this.clock);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  play() {
    if (this.reduced || !this.ok || this.raf || !this.visible || document.hidden) return;
    this.last = performance.now();
    const loop = (now) => {
      this.raf = requestAnimationFrame(loop);
      const elapsed = now - this.last;
      if (elapsed < this.frameGap) return;
      this.last = now;
      this.draw(Math.min(elapsed, 100) / 1000);
    };
    this.raf = requestAnimationFrame(loop);
  }

  pause() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  // Drawing runs only while the band is on screen
  setVisible(visible) {
    this.visible = visible;
    if (visible) this.play();
    else this.pause();
  }

  destroy() {
    this.pause();
    if (this.canvas && this.onLost) this.canvas.removeEventListener('webglcontextlost', this.onLost);
    if (this.onVisibility) document.removeEventListener('visibilitychange', this.onVisibility);
    if (this.gl) {
      const lose = this.gl.getExtension('WEBGL_lose_context');
      if (lose) lose.loseContext();
    }
    this.ok = false;
  }
}
