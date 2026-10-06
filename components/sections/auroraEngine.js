// The WebGL engine behind AuroraBackground.jsx: one full-screen fragment shader that paints slow, drifting aurora curtains in the site's
// colors (gold, blue and plum on a deep navy sky) over a row of rooftops. Plain WebGL, no libraries (about 4 KB); it lives in its own file
// so a page fetches it only when an aurora is about to come into view. It renders at a reduced size (the curtains are soft anyway), at
// 30 frames a second, and only while the aurora is on screen and the tab is visible.
//
// Two looks come from the same shader (`variant`): 'section' (the "Why Choose QRS" band: a bright gold curtain rising from the rooftops under
// blue and violet rays) and 'footer' (a dusk: dimmer violet and blue curtains hanging high, a warm glow along the horizon, a denser
// neighborhood of rooftops, so the footer's links stay easy to read). Everything is laid out in CSS pixels from the bottom edge, so a tall
// canvas (the footer on a phone) just gets more dark sky above the same scene.

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
uniform float uRoofs;
uniform float uCss;
uniform float uNominal;
uniform vec3 uSkyLow;
uniform vec3 uSkyHigh;
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
    p = p * 2.03 + 11.7;
    a *= 0.5;
  }
  return s;
}

// How far the lower edge of a curtain sways at this x (-0.5 to 0.5, smooth)
float sway(float x, float t, float seed) {
  float s = fbm(vec2(x * 0.45 + t * 0.028, seed * 3.1)) - 0.5;
  s += 0.4 * (fbm(vec2(x * 1.25 - t * 0.045, seed * 7.7)) - 0.5);
  return s;
}

// One aurora curtain. Returns its glow and writes the height above its lower edge (for the color shift) and the "heat" of the
// bright lower edge (for a near-white core). The brightest ribs sit where the curtain folds, where the edge slopes steeply.
float curtain(vec2 p, float y, float t, float seed, float base, float reach, out float above, out float core) {
  float s0 = sway(p.x, t, seed);
  float s1 = sway(p.x + 0.03, t, seed);
  float fold = clamp(abs(s1 - s0) * 18.0, 0.0, 1.0);
  float edge = base + s0 * 0.6;
  float d = y - edge;
  above = d;
  // a thin hot line along the lower edge, then a long soft glow climbing upward
  core = exp(-d * d * 1400.0);
  float body = smoothstep(-0.03, 0.045, d) * exp(-max(d - 0.02, 0.0) * reach);
  // vertical rays: fine streaks and broader pillars, leaning a little with height
  float lean = d * 0.35 * (s0 + 0.5);
  float fine = noise(vec2((p.x + lean) * 42.0 + t * 0.09, seed * 5.3));
  float broad = noise(vec2((p.x + lean) * 9.0 - t * 0.06, seed * 2.9));
  float rays = (0.18 + 0.82 * fine) * (0.5 + 0.5 * broad);
  rays = 0.16 + 1.15 * pow(rays, 1.6);
  rays = mix(rays, 1.1, 0.3 * (1.0 - smoothstep(0.0, 0.22, d)));
  float breathe = 0.7 + 0.3 * sin(t * 0.42 + p.x * 1.4 + seed * 2.1) * sin(t * 0.17 + seed);
  return body * rays * (0.55 + 0.75 * fold) * breathe;
}

// A row of rooftops: returns the height of the roofline at x (in units of the section's height). Each house has its own wall height,
// roof pitch and, now and then, a chimney.
float roofline(float x, float scale, float seed) {
  float u = x * scale + seed * 7.0;
  float cell = floor(u);
  float f = fract(u);
  float wall = 0.018 + 0.04 * hash(vec2(cell, seed));
  float pitch = 0.45 + 0.55 * hash(vec2(cell, seed + 4.0));
  float gable = (1.0 - abs(f * 2.0 - 1.0)) * pitch * 0.085;
  float chimney = step(0.8, hash(vec2(cell, seed + 9.0))) * step(0.64, f) * step(f, 0.72) * (wall + gable * 0.8 + 0.022);
  return wall + max(gable, chimney);
}

vec3 screenBlend(vec3 a, vec3 b) {
  return 1.0 - (1.0 - a) * (1.0 - clamp(b, 0.0, 1.0));
}

void main() {
  // Scene coordinates: CSS pixels from the bottom-left corner, divided by a nominal scene height (so a taller canvas shows more sky)
  vec2 q = gl_FragCoord.xy * uCss / uNominal;
  vec2 p = q;
  float t = uTime;
  float px = uCss / uNominal;
  float sky = clamp(q.y, 0.0, 1.0);

#ifdef FOOTER
  float starRate = 0.925;
  float horizonK = 0.62;
#else
  float starRate = 0.945;
  float horizonK = 0.2;
#endif

  // night sky, a little lighter toward the horizon, with faint large clouds of color so it is never flat
  vec3 col = mix(uSkyLow, uSkyHigh, pow(sky, 0.75));
  col += uBlue * 0.07 * fbm(p * 1.3 + vec2(t * 0.01, 2.0)) * smoothstep(0.1, 0.8, q.y);

  // stars: tiny soft dots in the upper sky
  vec2 cell = floor(gl_FragCoord.xy / 4.0);
  vec2 local = fract(gl_FragCoord.xy / 4.0) - 0.5;
  float on = step(starRate, hash(cell));
  float star = on * smoothstep(0.42, 0.0, length(local - (vec2(hash(cell + 1.7), hash(cell + 5.3)) - 0.5) * 0.5));
  star *= smoothstep(0.35, 0.95, q.y) * (0.45 + 0.55 * sin(t * 1.1 + hash(cell + 8.0) * 50.0));
  col += vec3(0.8, 0.85, 0.95) * star * 0.5;

  float u0; float u1; float u2; float h0; float h1; float h2;
#ifdef FOOTER
  // dusk: curtains hang high and stay faint behind the links; the gold one is low and thin, violet and blue lead
  float c2 = curtain(p + vec2(11.3, 0.0), q.y, t * 0.7, 4.0, 0.74, 2.2, u2, h2);
  float c1 = curtain(p + vec2(5.9, 0.0), q.y, t * 0.9, 5.0, 0.56, 2.7, u1, h1);
  float c0 = curtain(p + vec2(1.7, 0.0), q.y, t * 0.8, 6.0, 0.36, 3.1, u0, h0);
  float g0 = 0.62; float g1 = 0.95; float g2 = 0.5;
#else
  // back to front: a high violet veil, a blue curtain, then the bright gold curtain
  float c2 = curtain(p + vec2(7.7, 0.0), q.y, t * 0.8, 3.0, 0.52, 2.0, u2, h2);
  float c1 = curtain(p + vec2(3.1, 0.0), q.y, t * 1.1, 2.0, 0.36, 2.7, u1, h1);
  float c0 = curtain(p, q.y, t, 1.0, 0.18, 2.3, u0, h0);
  float g0 = 1.05; float g1 = 0.85; float g2 = 0.34;
#endif

  // colors by brightness, so the faint edges glow rose and plum instead of going muddy: dim = plum, bright = true color, brightest = near white
  vec3 amber = vec3(uGold.r * 1.12, uGold.g * 0.94, uGold.b * 0.45);
  vec3 hot = vec3(1.0, 0.94, 0.76);
  float i0 = c0 * 1.7;
  float i1 = c1 * 1.5;
  float i2 = c2 * 1.1;
  vec3 gold = mix(uPlum * 2.0, amber, smoothstep(0.05, 0.38, i0));
  gold = mix(gold, hot, smoothstep(0.55, 1.2, i0));
  vec3 blue = mix(uPlum * 2.0, uBlue * 1.6, smoothstep(0.04, 0.35, i1));
  blue = mix(blue, vec3(0.45, 0.78, 1.0), smoothstep(0.5, 1.1, i1));
  vec3 veil = mix(uPlum * 2.2, uBlue * 1.2, smoothstep(0.05, 0.4, i2));
  col = screenBlend(col, veil * i2 * g2);
  col = screenBlend(col, blue * i1 * g1);
  col = screenBlend(col, gold * i0 * g0);
  // thin white-hot line along the gold curtain's lower edge, and warm light spilling onto the sky below it
  col = screenBlend(col, hot * h0 * c0 * 0.6 * g0);
  col = screenBlend(col, amber * 0.16 * g0 * exp(-abs(u0 + 0.03) * 7.0) * smoothstep(-0.25, 0.05, u0));

  // glow near the horizon, as if the curtains lit the roofs
#ifdef FOOTER
  // a warm dusk glow (plum into gold) so the rooftops stand out against it
  col = screenBlend(col, mix(uPlum * 2.2, amber, 0.4 + 0.35 * smoothstep(0.2, 0.0, q.y)) * horizonK * smoothstep(0.36, 0.0, q.y));
#else
  col = screenBlend(col, mix(uBlue, amber, 0.35) * horizonK * smoothstep(0.3, 0.0, q.y));
#endif

#ifdef FOOTER
  col *= 0.86;
#endif

  // rooftops along the bottom: far rows paler, the near row darkest
  if (uRoofs > 0.5) {
#ifdef FOOTER
    float far = roofline(p.x + 8.1, 1.7, 3.0) * 0.8 + 0.05;
    float mid = roofline(p.x + 3.3, 2.5, 5.0) * 0.85 + 0.02;
    float near = roofline(p.x, 3.4, 1.0) * 1.1;
    float mFar = 1.0 - smoothstep(far - px * 1.2, far + px * 1.2, q.y);
    float mMid = 1.0 - smoothstep(mid - px * 1.2, mid + px * 1.2, q.y);
    float mNear = 1.0 - smoothstep(near - px * 1.2, near + px * 1.2, q.y);
    col = mix(col, mix(uSkyLow, uBlue, 0.1) * 0.62, mFar * 0.85);
    col = mix(col, mix(uSkyLow, uBlue, 0.06) * 0.5, mMid * 0.92);
    col = mix(col, uSkyLow * 0.42, mNear);
#else
    float far = roofline(p.x + 3.3, 2.4, 5.0) * 0.75 + 0.03;
    float near = roofline(p.x, 3.3, 1.0);
    float mFar = 1.0 - smoothstep(far - px * 1.2, far + px * 1.2, q.y);
    float mNear = 1.0 - smoothstep(near - px * 1.2, near + px * 1.2, q.y);
    col = mix(col, mix(uSkyLow, uBlue, 0.12) * 0.55, mFar * 0.9);
    col = mix(col, uSkyLow * 0.45, mNear);
#endif
  }

  // soft tone curve and a touch of dither against banding in the dark gradients
  col = 1.0 - exp(-col * 1.35);
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

// "#rrggbb" -> [r, g, b] (0 to 1); anything else gives the fallback
function rgb(hex, fallback) {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || '').trim());
  if (!m) return fallback;
  const n = parseInt(m[1], 16);
  return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
}

const DEFAULTS = {
  skyLow: [0.008, 0.055, 0.115], // #020e1d, a night navy a shade darker than the proof strip
  skyHigh: [0.02, 0.13, 0.27], // #052145, the logo navy darkened
  gold: [0.831, 0.71, 0.447], // #d4b572
  blue: [0.12, 0.42, 0.86], // the logo navy lit up
  plum: [0.42, 0.145, 0.27], // #6b2545
};

export class AuroraEngine {
  // options: { variant: 'section' (default) or 'footer', reducedMotion, scale (render size relative to the CSS size, default 0.6), fps (default 30),
  // roofs (the rooftop silhouettes along the bottom, default on), colors: { skyLow, skyHigh, gold, blue, plum } as #rrggbb }
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ok = false;
    this.scale = options.scale || 0.6;
    this.frameGap = 1000 / (options.fps || 30);
    this.reduced = Boolean(options.reducedMotion);
    this.visible = true;
    this.raf = 0;
    this.last = 0;
    this.clock = 0; // animation time in seconds; only advances while the section is drawing
    this.footer = options.variant === 'footer';
    this.nominal = this.footer ? 560 : 480; // the scene height in CSS pixels the shader is drawn for
    this.seed = (this.footer ? 60 : 18) + Math.random() * 40; // each visit opens on a different stretch of sky

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: 'low-power' });
    if (!gl) return;
    this.gl = gl;

    const c = options.colors || {};
    this.colors = {
      skyLow: rgb(c.skyLow, DEFAULTS.skyLow),
      skyHigh: rgb(c.skyHigh, DEFAULTS.skyHigh),
      gold: rgb(c.gold, DEFAULTS.gold),
      blue: rgb(c.blue, DEFAULTS.blue),
      plum: rgb(c.plum, DEFAULTS.plum),
    };

    try {
      const program = gl.createProgram();
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, (this.footer ? '#define FOOTER\n' : '') + FRAGMENT));
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
    for (const name of ['uRes', 'uTime', 'uRoofs', 'uCss', 'uNominal', 'uSkyLow', 'uSkyHigh', 'uGold', 'uBlue', 'uPlum']) this.u[name] = gl.getUniformLocation(this.program, name);
    gl.uniform1f(this.u.uRoofs, options.roofs === false ? 0 : 1);
    gl.uniform1f(this.u.uNominal, this.nominal);
    gl.uniform3fv(this.u.uSkyLow, this.colors.skyLow);
    gl.uniform3fv(this.u.uSkyHigh, this.colors.skyHigh);
    gl.uniform3fv(this.u.uGold, this.colors.gold);
    gl.uniform3fv(this.u.uBlue, this.colors.blue);
    gl.uniform3fv(this.u.uPlum, this.colors.plum);

    this.onLost = (e) => {
      e.preventDefault();
      this.pause();
      this.ok = false;
      this.canvas.dispatchEvent(new Event('aurora-lost'));
    };
    canvas.addEventListener('webglcontextlost', this.onLost);

    this.ok = true;
    this.resize();
    this.draw(0);
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
    this.gl.uniform1f(this.u.uCss, this.canvas.clientHeight / this.canvas.height);
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

  // Drawing runs only while the section is on screen
  setVisible(visible) {
    this.visible = visible;
    if (visible) this.play();
    else this.pause();
  }

  destroy() {
    this.pause();
    if (this.canvas && this.onLost) this.canvas.removeEventListener('webglcontextlost', this.onLost);
    if (this.gl) {
      const lose = this.gl.getExtension('WEBGL_lose_context');
      if (lose) lose.loseContext();
    }
    this.ok = false;
  }
}
