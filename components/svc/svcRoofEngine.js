// The 3D shape behind the service page heroes (owner, October 29 2026; adapted from the translucent gradient prism in the hero of the owner's
// reference remote.com/global-hr/global-payroll, made our own): a gable-roof frame, the outline of a house with a roof, extruded and hollow,
// its faces shading from the brand gold to the brand blue, see-through with a soft bright edge. It turns very slowly and tilts a little with
// the page's scroll and leans slightly toward the mouse over the hero. Three.js (npm `three`), fetched only when the hero is on screen (SvcRoofGL.jsx). Decorative.
// `kind: 'commercial'` (owner, October 29 2026: /commercial-roofing/ and every page under it) draws a commercial building instead: a wide
// storefront with a flat roof behind a stepped parapet, a sign band and a large storefront window cut through, and an air conditioning unit
// on the roof, in the same translucent gold-to-blue. `kind: 'dollar'` (the financing page) draws a dollar sign: an S of two thick arcs with the
// bar's ends above and below it.

import * as THREE from 'three';

const VERTEX = `
varying vec3 vWorld;
varying vec3 vNormal;
varying vec3 vView;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  vNormal = normalize(mat3(modelMatrix) * normal);
  vView = normalize(cameraPosition - world.xyz);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const FRAGMENT = `
uniform vec3 uGold;
uniform vec3 uBlue;
uniform vec3 uLight;
varying vec3 vWorld;
varying vec3 vNormal;
varying vec3 vView;
void main() {
  vec3 n = normalize(vNormal);
  if (!gl_FrontFacing) n = -n;
  // gold low and to the left, blue high and to the right, as the reference's lime-to-blue faces
  float t = smoothstep(-1.5, 1.7, vWorld.y * 0.9 + vWorld.x * 0.45);
  vec3 base = mix(uGold, uBlue, t);
  float light = 0.62 + 0.38 * max(dot(n, normalize(vec3(0.35, 0.8, 0.55))), 0.0);
  float fres = pow(1.0 - abs(dot(n, normalize(vView))), 2.2);
  vec3 col = base * light + uLight * fres * 0.35;
  float alpha = 0.72 + fres * 0.22;
  gl_FragColor = vec4(col, alpha);
}
`;

// The outline of a house with a gable roof (base, walls, eaves, ridge), centered on the origin
function houseShape(scale = 1) {
  const s = new THREE.Shape();
  const pts = [[-1, -1.05], [1, -1.05], [1, 0.2], [0, 1.2], [-1, 0.2]].map(([x, y]) => [x * scale, y * scale]);
  s.moveTo(...pts[0]);
  pts.slice(1).forEach((p) => s.lineTo(...p));
  s.closePath();
  return s;
}

const rect = (x1, y1, x2, y2, path = new THREE.Path()) => {
  path.moveTo(x1, y1);
  path.lineTo(x2, y1);
  path.lineTo(x2, y2);
  path.lineTo(x1, y2);
  path.closePath();
  return path;
};

// The outline of a one-story commercial building: flat roof line with a stepped parapet in the middle, the sign band and the storefront
// window as holes
function commercialShape() {
  const s = new THREE.Shape();
  [[-1.35, -0.95], [1.35, -0.95], [1.35, 0.5], [0.55, 0.5], [0.55, 0.68], [0.25, 0.68], [0.25, 0.82], [-0.25, 0.82], [-0.25, 0.68], [-0.55, 0.68], [-0.55, 0.5], [-1.35, 0.5]].forEach(
    ([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y))
  );
  s.closePath();
  s.holes.push(rect(-0.95, 0.2, 0.95, 0.38)); // the sign band
  s.holes.push(rect(-1.1, -0.95 + 0.16, -0.32, 0.02)); // the storefront window, left
  s.holes.push(rect(-0.18, -0.95 + 0.16, 0.18, -0.02)); // the door
  s.holes.push(rect(0.32, -0.95 + 0.16, 1.1, 0.02)); // the storefront window, right
  return s;
}

// A thick arc of the dollar sign's S: from angle a1 to a2 (radians, counterclockwise when a2 > a1) around (cx, cy)
function arcShape(cx, cy, outer, inner, a1, a2) {
  const s = new THREE.Shape();
  const cw = a2 < a1;
  s.absarc(cx, cy, outer, a1, a2, cw);
  s.absarc(cx, cy, inner, a2, a1, !cw);
  s.closePath();
  return s;
}

// The dollar sign: the top bowl opens to the lower right, the bottom bowl to the upper left, and the bar shows above and below
function dollarShapes() {
  const R = 0.6;
  const r = 0.36;
  const c = 0.48;
  const d = Math.PI / 180;
  return [
    arcShape(0, c, R, r, 22 * d, 270 * d), // top bowl: from the upper right end, over the top and down the left, to the middle
    arcShape(0, -c, R, r, 90 * d, -158 * d), // bottom bowl: from the middle, down the right, under the bottom, to the lower left end
    rect(-0.1, c + R - 0.04, 0.1, c + R + 0.34, new THREE.Shape()), // the bar above
    rect(-0.1, -c - R - 0.34, 0.1, -c - R + 0.04, new THREE.Shape()), // the bar below
  ];
}

// The house frame, the commercial building (facade slab, body and rooftop unit) or the dollar sign, centered on the origin
function buildGeometries(kind) {
  const extrude = (shape, depth, curveSegments = 1) => new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.05, bevelSegments: 4, curveSegments });
  if (kind === 'dollar') {
    const parts = dollarShapes().map((sh) => extrude(sh, 0.8, 36)); // smooth arcs
    const box = new THREE.Box3();
    parts.forEach((g) => {
      g.computeBoundingBox();
      box.union(g.boundingBox);
    });
    const c = new THREE.Vector3();
    box.getCenter(c);
    parts.forEach((g) => g.translate(-c.x, -c.y, -c.z));
    return parts;
  }
  if (kind === 'commercial') {
    // the facade (parapet, sign band, windows and door) as a slab in front, a solid body behind it, an air conditioning unit on the roof
    const facade = extrude(commercialShape(), 0.32);
    const body = extrude(rect(-1.35, -0.95, 1.35, 0.5, new THREE.Shape()), 1.9);
    body.translate(0, 0, -1.9);
    const unit = extrude(rect(0.4, 0.5, 0.95, 0.78, new THREE.Shape()), 0.7);
    unit.translate(0, 0, -1.35);
    const parts = [facade, body, unit];
    const box = new THREE.Box3();
    parts.forEach((g) => {
      g.computeBoundingBox();
      box.union(g.boundingBox);
    });
    const c = new THREE.Vector3();
    box.getCenter(c);
    parts.forEach((g) => g.translate(-c.x, -c.y, -c.z));
    return parts;
  }
  const outer = houseShape(1);
  const hole = new THREE.Path();
  houseShape(0.62).getPoints().forEach((p, i) => (i ? hole.lineTo(p.x, p.y - 0.06) : hole.moveTo(p.x, p.y - 0.06)));
  hole.closePath();
  outer.holes.push(hole);
  const geometry = extrude(outer, 2.2);
  geometry.center();
  return [geometry];
}

export function createSvcRoof(canvas, { reducedMotion = false, gold = '#d4b572', blue = '#1d5fae', kind = 'home' } = {}) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0.2, 8.4);

  // A thick frame, extruded deep and softly bevelled: the house outline with a smaller house cut out of it, or the commercial building
  const geometries = buildGeometries(kind);

  const material = new THREE.ShaderMaterial({
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    uniforms: { uGold: { value: new THREE.Color(gold) }, uBlue: { value: new THREE.Color(blue) }, uLight: { value: new THREE.Color('#ffffff') } },
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const mesh = new THREE.Group();
  geometries.forEach((g) => mesh.add(new THREE.Mesh(g, material)));
  mesh.scale.setScalar(kind === 'commercial' ? 0.92 : kind === 'dollar' ? 1.05 : 1.25);
  mesh.position.x = 0.45; // to the right of the canvas's middle, away from the hero copy
  scene.add(mesh);

  let raf = 0;
  let last = 0;
  let clock = 0;
  let visible = true;
  let scrollTilt = 0;
  // the mouse over the hero: a target (-1..1 each way) and the eased value that follows it, so the shape leans a little toward the pointer
  const pointer = { tx: 0, ty: 0, x: 0, y: 0 };

  const draw = () => {
    // the dollar sign faces the visitor more, so the S reads; the house and the building turn to show their depth
    mesh.rotation.y = (kind === 'dollar' ? -0.3 : -0.62) + Math.sin(clock * 0.12) * 0.22 + scrollTilt * 0.35 + pointer.x * 0.16;
    mesh.rotation.x = (kind === 'dollar' ? 0.12 : 0.28) + Math.sin(clock * 0.09) * 0.05 + scrollTilt * 0.12 + pointer.y * 0.09;
    mesh.position.x = 0.45 + pointer.x * 0.12;
    mesh.position.y = -pointer.y * 0.08;
    renderer.render(scene, camera);
  };

  const loop = (now) => {
    raf = requestAnimationFrame(loop);
    const dt = Math.min(0.1, (now - (last || now)) / 1000);
    last = now;
    if (dt < 1 / 45) return; // about 40 frames a second is plenty for a slow turn
    clock += dt;
    const ease = 1 - Math.exp(-dt * 3); // about a third of a second to catch up
    pointer.x += (pointer.tx - pointer.x) * ease;
    pointer.y += (pointer.ty - pointer.y) * ease;
    draw();
  };

  const play = () => {
    if (reducedMotion || raf || !visible || document.hidden) return;
    last = 0;
    raf = requestAnimationFrame(loop);
  };
  const pause = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  };
  const onVisibility = () => (document.hidden ? pause() : play());
  document.addEventListener('visibilitychange', onVisibility);

  const resize = () => {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // keep the whole frame in view on narrow, tall canvases
    camera.position.z = w / h < 1 ? 8.4 / Math.max(0.55, w / h) : 8.4;
    camera.updateProjectionMatrix();
    draw();
  };

  resize();
  play();

  return {
    resize,
    setVisible(v) {
      visible = v;
      if (v) play();
      else pause();
    },
    setPointer(x, y) {
      pointer.tx = Math.max(-1, Math.min(1, x));
      pointer.ty = Math.max(-1, Math.min(1, y));
    },
    setScroll(p) {
      scrollTilt = p;
      if (reducedMotion || !raf) draw();
    },
    destroy() {
      pause();
      document.removeEventListener('visibilitychange', onVisibility);
      geometries.forEach((g) => g.dispose());
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss?.();
    },
  };
}
