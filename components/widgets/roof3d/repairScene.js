// The 3D scene behind the Roof Repair hero (RoofScene3D.jsx, scene="repair"): a steep gable roof in the middle of the job, seen from a drone
// almost straight above in bright sun. The front slope is in dark gray shingles with two tall vent pipes, a metal flue, a skylight opening
// and a framed gable dormer; along the ridge a band of black synthetic underlayment is still showing, with the last shingle courses stepping
// up into it; roofers on safety ropes that run over the ridge; shingle bundles and boxes on the back slope; a dirt yard, a fence, plywood,
// trees and a work truck around the house. Built from simple shapes with three.js (no model file).
// Mouse: the camera drifts with the pointer and a warm light follows the cursor; while the pointer is over the roof its edge is traced in
// gold and the crew finishes the job: new shingle courses lay themselves tab by tab across the underlayment, one course after another, with a
// roofer following the working edge on his rope. When the pointer leaves, the roof slowly goes back to the in-progress look, so it can be
// replayed. 30 fps only while on screen; one still frame (in progress) for reduced motion.
import * as THREE from 'three';
import { box, flat, mesh, shingleTexture } from './houseScene';

const FPS = 30;
const WALL = 5; // eave height
const RUN = 9.6; // eave to ridge, level distance
const RISE = 6; // eave to ridge, height (about 7.5 in 12)
const L = Math.hypot(RUN, RISE); // slope length
const SLOPE = Math.atan2(RISE, RUN);
const HALF = 14.6; // half the roof's length, with the rake overhang
const BAND = 7.7; // where the underlayment band starts (slope distance from the front eave)
const BAND_END = 6; // the band runs from the left rake to x = 6 (the right part is already shingled to the ridge)
const COURSES = 13, COURSE = (L - BAND) / COURSES, TABS = 24;
const V = (x, y, z) => new THREE.Vector3(x, y, z);

// A point on the front slope: x along the eave, s up the slope from the eave, lifted off the surface by `lift`
const onFront = (x, s, lift = 0) => V(x, WALL + lift * Math.cos(SLOPE) + s * Math.sin(SLOPE), RUN + lift * Math.sin(SLOPE) - s * Math.cos(SLOPE));
const onBack = (x, s, lift = 0) => V(x, WALL + lift * Math.cos(SLOPE) + s * Math.sin(SLOPE), -RUN - lift * Math.sin(SLOPE) + s * Math.cos(SLOPE));

// Black synthetic underlayment: printed lap lines, faint round marks and red cap-nail dots (no brand on it)
function underlaymentTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const g = c.getContext('2d');
  g.fillStyle = '#1c1e21';
  g.fillRect(0, 0, 512, 512);
  g.strokeStyle = 'rgba(160,166,172,.18)';
  g.lineWidth = 2;
  for (let y = 40; y < 512; y += 128) {
    g.beginPath();
    g.moveTo(0, y);
    g.lineTo(512, y);
    g.stroke();
  }
  g.fillStyle = 'rgba(150,156,162,.14)';
  for (let y = 80; y < 512; y += 128) for (let x = (y / 128) % 2 ? 60 : 140; x < 512; x += 170) {
    g.beginPath();
    g.ellipse(x, y, 30, 18, 0, 0, Math.PI * 2);
    g.fill();
  }
  g.fillStyle = '#b8352c';
  for (let y = 20; y < 512; y += 64) for (let x = 16; x < 512; x += 48) g.fillRect(x + ((y / 64) % 2) * 24, y, 4, 4);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// A roof sheet lying in a slope group's local XZ plane (normal +Y), from x0 to x1 and slope distance s0 to s1 (toward -Z on the front)
function sheet(group, tex, x0, x1, s0, s1, dir = -1, lift = 0, tile = 9) {
  const t = tex.clone();
  t.needsUpdate = true;
  t.repeat.set((x1 - x0) / tile, (s1 - s0) / tile);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, s1 - s0), new THREE.MeshStandardMaterial({ map: t, roughness: 0.95, emissive: new THREE.Color(0xd4b572), emissiveIntensity: 0 }));
  m.rotation.x = -Math.PI / 2;
  m.position.set((x0 + x1) / 2, lift, (dir * (s0 + s1)) / 2);
  m.receiveShadow = true;
  m.castShadow = true;
  group.add(m);
  return m;
}

// A roofer standing upright at a point (legs, torso leaning into the slope, head, hat): light blue or gray shirts, jeans, a straw hat or a cap
export function roofer({ shirt = 0x7fb3d8, hat = 'cap', kneel = false } = {}) {
  const g = new THREE.Group();
  const legs = box(0.75, kneel ? 0.9 : 1.6, 0.45, 0x2d3a4f);
  legs.position.y = kneel ? 0.45 : 0.8;
  g.add(legs);
  const body = new THREE.Group();
  body.position.y = kneel ? 0.9 : 1.6;
  const torso = box(0.95, 1.3, 0.55, shirt);
  torso.position.y = 0.65;
  body.add(torso);
  const head = mesh(new THREE.SphereGeometry(0.32, 12, 10), 0x8a5a3c);
  head.position.y = 1.62;
  body.add(head);
  if (hat === 'straw') {
    const brim = mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.06, 20), 0xd9bf86);
    brim.position.y = 1.78;
    body.add(brim);
    const crown = mesh(new THREE.CylinderGeometry(0.34, 0.38, 0.32, 14), 0xd2b578);
    crown.position.y = 1.95;
    body.add(crown);
  } else {
    const cap = mesh(new THREE.SphereGeometry(0.34, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), hat === 'white' ? 0xf1f1ee : 0x30343a);
    cap.position.y = 1.7;
    body.add(cap);
  }
  body.rotation.x = -0.35; // leaning in toward the ridge
  g.add(body);
  g.userData.body = body;
  return g;
}

// Foliage cluster (faceted)
function foliage(world, x, z, s, greens) {
  const t = new THREE.Group();
  for (let i = 0; i < 7; i++) {
    const m = mesh(new THREE.IcosahedronGeometry(s * (0.5 + Math.random() * 0.45), 1), greens[(i + Math.abs(Math.round(x))) % greens.length], { flatShading: true, roughness: 1 });
    m.position.set((Math.random() - 0.5) * s * 1.6, s * (0.9 + Math.random() * 0.8), (Math.random() - 0.5) * s * 1.6);
    t.add(m);
  }
  t.position.set(x, 0, z);
  world.add(t);
  return t;
}

// A rope: a line that can be redrawn every frame through a fixed number of points
function rope(world, color, n = 24) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(n * 3), 3));
  const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color }));
  line.frustumCulled = false;
  world.add(line);
  return {
    line,
    set(points) {
      const curve = new THREE.CatmullRomCurve3(points);
      const pos = geo.attributes.position;
      curve.getPoints(n - 1).forEach((p, i) => pos.setXYZ(i, p.x, p.y, p.z));
      pos.needsUpdate = true;
    },
  };
}

export class RepairSceneEngine {
  constructor(canvas, { reducedMotion = false } = {}) {
    this.canvas = canvas;
    this.reduced = reducedMotion;
    this.ok = false;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'low-power' });
    } catch {
      return;
    }
    this.renderer = renderer;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.92;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearColor(0x5d5a4c);

    const scene = (this.scene = new THREE.Scene());
    scene.fog = new THREE.Fog(0x5d5a4c, 70, 130);
    this.camera = new THREE.PerspectiveCamera(32, 1, 0.5, 260);

    // Bright sun from the left (the vent pipes' shadows fall to the right, as on the photo), a soft sky
    scene.add(new THREE.HemisphereLight(0xd6e4f2, 0x6d6450, 0.85));
    const sun = new THREE.DirectionalLight(0xfff0d8, 2.5);
    sun.position.set(-32, 30, 8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -40, right: 40, top: 35, bottom: -35, near: 1, far: 120 });
    sun.shadow.bias = -0.0005;
    scene.add(sun);
    this.cursorLight = new THREE.PointLight(0xffd59a, 0, 24, 1.5);
    scene.add(this.cursorLight);

    const world = (this.world = new THREE.Group());
    scene.add(world);

    // Ground: a dirt yard, dry grass behind the house
    world.add(flat(220, 220, 0xb8a685, 0));
    world.add(at(flat(80, 30, 0x8f8a5c, 0.01), -24, 0.01, -26));

    // The house: stucco walls and gable ends
    const wall = 0xd5cdbf;
    world.add(at(box(28, WALL, 18, wall), 0, WALL / 2, 0));
    const gable = new THREE.Shape([new THREE.Vector2(-9, 0), new THREE.Vector2(9, 0), new THREE.Vector2(0, RISE * (9 / RUN))]);
    [-14, 14].forEach((x) => {
      const g = mesh(new THREE.ShapeGeometry(gable), wall, { side: THREE.DoubleSide });
      g.position.set(x, WALL, 0);
      g.rotation.y = Math.PI / 2;
      world.add(g);
    });

    // The two slopes as groups lying in their planes: front (toward the camera, local -Z runs up the slope) and back (local +Z runs up)
    const front = (this.front = new THREE.Group());
    front.position.set(0, WALL, RUN);
    front.rotation.x = SLOPE;
    world.add(front);
    const back = new THREE.Group();
    back.position.set(0, WALL, -RUN);
    back.rotation.x = -SLOPE;
    world.add(back);

    const shingles = shingleTexture('#4a4f55', '#2c3035');
    const backShingles = shingleTexture('#5b6066', '#3b3f44');
    this.sheets = [
      sheet(front, shingles, -HALF, HALF, 0, BAND),
      sheet(front, shingles, BAND_END, HALF, BAND, L),
      sheet(front, underlaymentTexture(), -HALF, BAND_END, BAND, L, -1, 0.002, 6),
      sheet(back, backShingles, -HALF, HALF, 0, L, 1),
    ];
    // ridge cap
    world.add(at(box(HALF * 2, 0.25, 0.9, 0x34383d), 0, WALL + RISE + 0.08, 0));
    // the gold edge of the front slope, lit while the pointer is over the roof
    this.edgeMat = new THREE.LineBasicMaterial({ color: 0xe0c68a, transparent: true, opacity: 0 });
    front.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([V(-HALF, 0.08, 0), V(HALF, 0.08, 0), V(HALF, 0.08, -L), V(-HALF, 0.08, -L), V(-HALF, 0.08, 0)]), this.edgeMat));

    // The courses still to lay: one instanced mesh of shingle tabs over the underlayment band. Each course starts from the shingled part
    // (x = BAND_END) and runs left; at rest the lower courses are partly laid, stepping up into the band like the photo.
    const tabW = (BAND_END + HALF) / TABS;
    this.tabs = new THREE.InstancedMesh(new THREE.BoxGeometry(tabW * 0.97, 0.07, COURSE * 1.08), new THREE.MeshStandardMaterial({ roughness: 0.95 }), COURSES * TABS);
    this.tabs.castShadow = true;
    this.tabs.receiveShadow = true;
    const tone = new THREE.Color();
    for (let i = 0; i < COURSES * TABS; i++) this.tabs.setColorAt(i, tone.setHSL(0.58, 0.06, 0.27 + Math.random() * 0.05, THREE.SRGBColorSpace));
    front.add(this.tabs);
    this.tabW = tabW;
    this.rest = Array.from({ length: COURSES }, (_, k) => Math.max(0, 0.62 - k * 0.12)); // how much of each course is laid at rest
    this.laid = [...this.rest];
    this.build = 0; // 0 = in progress, 1 = finished
    this.idle = 0;
    this.dummy = new THREE.Object3D();
    this.layTabs();

    // Vent pipes (beige, with round caps) and a metal flue, all upright, with flashing on the slope
    const pipe = (x, s, r, h, color, capColor) => {
      const base = onFront(x, s);
      const p = mesh(new THREE.CylinderGeometry(r, r, h, 16), color, { roughness: 0.6 });
      p.position.set(base.x, base.y + h / 2 - 0.4, base.z);
      world.add(p);
      if (capColor) world.add(at(mesh(new THREE.CylinderGeometry(r * 1.2, r * 1.2, 0.28, 16), capColor, { roughness: 0.6 }), base.x, base.y + h - 0.3, base.z));
      const flash = box(r * 3.4, 0.05, r * 3.6, 0x9aa3ab, { metalness: 0.4, roughness: 0.5 });
      flash.position.copy(onFront(x, s, 0.04));
      flash.rotation.x = SLOPE;
      world.add(flash);
    };
    pipe(-0.5, 4.6, 0.46, 2.6, 0xb8aa98, 0xcfc4b6);
    pipe(-2.6, 2.3, 0.46, 2.4, 0xb8aa98, 0xcfc4b6);
    pipe(-11.5, 4, 0.3, 1.5, 0x6f757b, null);
    // a skylight opening (wood frame around the dark hole)
    const sky = new THREE.Group();
    sky.position.copy(onFront(9.5, 2.6));
    sky.rotation.x = SLOPE;
    world.add(sky);
    sky.add(at(box(2.4, 0.02, 3.2, 0x1b1611), 0, 0.03, 0));
    [[0, -1.6, 2.6, 0.25], [0, 1.6, 2.6, 0.25], [-1.2, 0, 0.25, 3.2], [1.2, 0, 0.25, 3.2]].forEach(([x, z, w, d]) => sky.add(at(box(w, 0.4, d, 0xc89a5e), x, 0.2, z)));
    // a framed gable dormer near the front eave: plywood cheeks, a shingled gable roof, the opening still dark
    const dx = -3, dw = 3.4, zf = RUN + 0.5, dTop = WALL + 1.7, dRidge = dTop + 1.1;
    const zAt = (y) => RUN - ((y - WALL) * RUN) / RISE; // where the main slope reaches height y
    world.add(at(box(dw, dTop - WALL + 0.4, zf - zAt(dTop) + 0.3, 0xcaa36b), dx, (dTop + WALL - 0.4) / 2, (zf + zAt(dTop)) / 2));
    world.add(at(box(dw - 1, dTop - WALL - 0.5, 0.1, 0x14110e), dx, (dTop + WALL) / 2, zf + 0.12));
    const dormerRoof = new THREE.BufferGeometry().setFromPoints([
      V(dx - dw / 2 - 0.3, dTop, zf + 0.3), V(dx, dRidge, zf + 0.3), V(dx, dRidge, zAt(dRidge)),
      V(dx - dw / 2 - 0.3, dTop, zf + 0.3), V(dx, dRidge, zAt(dRidge)), V(dx - dw / 2 - 0.3, dTop, zAt(dTop)),
      V(dx + dw / 2 + 0.3, dTop, zf + 0.3), V(dx + dw / 2 + 0.3, dTop, zAt(dTop)), V(dx, dRidge, zAt(dRidge)),
      V(dx + dw / 2 + 0.3, dTop, zf + 0.3), V(dx, dRidge, zAt(dRidge)), V(dx, dRidge, zf + 0.3),
    ]);
    dormerRoof.computeVertexNormals();
    world.add(mesh(dormerRoof, 0x5a5f66, { side: THREE.DoubleSide }));
    const tri = new THREE.Shape([new THREE.Vector2(-dw / 2, 0), new THREE.Vector2(dw / 2, 0), new THREE.Vector2(0, dRidge - dTop)]);
    world.add(at(mesh(new THREE.ShapeGeometry(tri), 0xd9b77e, { side: THREE.DoubleSide }), dx, dTop, zf + 0.25));

    // On the back slope: shingle bundles, ridge-cap boxes and cardboard boxes waiting to go up
    [[-9, 6, 0xeee4e8], [-6.5, 8.2, 0xe8d6de], [-3, 7, 0xf2ecee], [1.5, 8.6, 0xeee4e8], [5.5, 7.4, 0xe6d2da], [-12, 3.8, 0xf2ecee]].forEach(([x, s, c], i) => {
      const b = box(2.2, 0.35, 1, c);
      b.position.set(x, 0.18, s);
      b.rotation.y = (i % 3) * 0.3 - 0.3;
      back.add(b);
    });
    [[-4.5, 4.5], [3, 5.2]].forEach(([x, s]) => back.add(at(box(1, 0.6, 0.9, 0xc4a06e), x, 0.3, s)));

    // Roofers: one follows the working edge of the course being laid, one kneels on the underlayment, two on the back slope
    this.lead = roofer({ shirt: 0x86b9de, hat: 'white' });
    world.add(this.lead);
    const kneeling = roofer({ shirt: 0x9aa4b0, kneel: true });
    kneeling.position.copy(onFront(3.2, 9.3));
    world.add(kneeling);
    const straw = roofer({ shirt: 0x87a9c8, hat: 'straw' });
    straw.position.copy(onBack(-7.5, 9.4));
    straw.rotation.y = Math.PI;
    world.add(straw);
    const top = roofer({ shirt: 0x8e959e });
    top.position.copy(onBack(4, 10.4));
    top.rotation.y = Math.PI;
    world.add(top);
    this.crew = [this.lead, kneeling, straw, top];
    // safety ropes over the ridge to anchors on the back slope; the lead roofer's rope moves with him
    this.leadRope = rope(world, 0xd9c45a);
    const fixedRope = rope(world, 0xb8392f);
    fixedRope.set([onFront(3.2, 9.3, 1.6), onFront(3.4, L - 0.3, 0.12), V(3.5, WALL + RISE + 0.25, 0), onBack(3, 6, 0.1)]);
    // loose ropes lying down the front slope from the ridge to the eave, as on the photo
    rope(world, 0xd9c45a).set([V(-9, WALL + RISE + 0.25, 0), onFront(-10.5, 8, 0.06), onFront(-8.5, 4, 0.06), onFront(-11.5, 0.2, 0.06), V(-12, WALL - 3, RUN + 0.4)]);
    rope(world, 0xd9c45a).set([V(5, WALL + RISE + 0.25, 0), onFront(6.8, 8.5, 0.06), onFront(5.5, 5, 0.06), onFront(7.6, 2.6, 0.06), onFront(6.5, 0.1, 0.06)]);

    // Around the house: a wood fence and block wall, plywood sheets, lumber, trees, the work truck
    world.add(at(box(0.3, 2.2, 22, 0x7a5a3c), 23, 1.1, -6));
    world.add(at(box(9, 1.6, 0.4, 0xb8b2a6), 27.5, 0.8, -17));
    [[19.5, -7, 0.2], [21, -4, -0.25]].forEach(([x, z, r]) => {
      const p = box(4, 0.12, 3, 0xd8b67c);
      p.position.set(x, 0.07, z);
      p.rotation.y = r;
      world.add(p);
    });
    [[17, -12, 8, 0.4], [18, -11, 7, 0.2]].forEach(([x, z, len, r]) => {
      const b = box(len, 0.25, 0.35, 0xe2d2b0);
      b.position.set(x, 0.13, z);
      b.rotation.y = r;
      world.add(b);
    });
    const truck = new THREE.Group();
    truck.add(at(box(5.6, 1.4, 2.6, 0xeceae6, { metalness: 0.2, roughness: 0.5 }), 0, 1, 0));
    truck.add(at(box(2.4, 1.1, 2.4, 0x2b3036, { metalness: 0.3, roughness: 0.3 }), 0.9, 2.2, 0));
    truck.add(at(box(2.8, 0.15, 2.7, 0x8c9196), -1.4, 2.8, 0));
    truck.position.set(26, 0, 17);
    truck.rotation.y = -0.6;
    world.add(truck);
    const greens = [0x5f8f34, 0x79a43e, 0x99be4b, 0x48702c, 0x6b9a3a];
    this.trees = [
      foliage(world, 22, -22, 5, greens), foliage(world, 30, -14, 4.2, greens), foliage(world, -24, -18, 4.6, greens), foliage(world, -30, -6, 3.8, greens),
      foliage(world, 18, 22, 3.6, greens), foliage(world, -22, 16, 3.4, greens), foliage(world, 32, 2, 3.4, greens),
    ];

    // Pointer state
    this.target = { x: 0, y: 0, inside: false };
    this.smooth = { x: 0, y: 0 };
    this.pointer = new THREE.Vector2();
    this.ray = new THREE.Raycaster();
    this.ground = new THREE.Plane(V(0, 1, 0), 0);
    this.hover = 0;
    this.time = 0;
    this.visible = true;
    this.last = 0;
    this.frame = 0;

    this.onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      this.target.inside = e.clientY >= r.top && e.clientY <= r.bottom;
      this.target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      this.target.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    };
    this.onLeave = () => (this.target.inside = false);
    if (!this.reduced) {
      window.addEventListener('pointermove', this.onMove, { passive: true });
      document.addEventListener('pointerleave', this.onLeave);
    }
    this.onVis = () => this.kick();
    document.addEventListener('visibilitychange', this.onVis);
    this.onLost = (e) => {
      e.preventDefault();
      this.ok = false;
      cancelAnimationFrame(this.frame);
      canvas.dispatchEvent(new Event('scene3d-lost'));
    };
    canvas.addEventListener('webglcontextlost', this.onLost);

    this.ok = true;
    this.resize();
    this.draw(0);
    if (!this.reduced) this.kick();
  }

  // Place every tab of the band from how much of its course is laid (`laid`, 0 to 1): a tab pops in as the edge reaches it
  layTabs() {
    const { dummy, tabs, tabW } = this;
    for (let k = 0; k < COURSES; k++) {
      const edge = this.laid[k] * TABS;
      const z = -(BAND + (k + 0.5) * COURSE);
      const shift = (k % 2) * tabW * 0.5;
      for (let i = 0; i < TABS; i++) {
        const a = Math.min(1, Math.max(0, edge - i));
        dummy.position.set(BAND_END - (i + 0.5) * tabW + shift * (i < TABS - 1 ? 1 : 0), 0.04 + (1 - a) * 0.6, z);
        dummy.scale.setScalar(a < 0.01 ? 0.0001 : a);
        dummy.updateMatrix();
        tabs.setMatrixAt(k * TABS + i, dummy.matrix);
      }
    }
    tabs.instanceMatrix.needsUpdate = true;
  }

  resize() {
    if (!this.renderer) return;
    const r = this.canvas.getBoundingClientRect();
    const w = Math.max(2, Math.round(r.width)), h = Math.max(2, Math.round(r.height));
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.distance = w / h < 0.8 ? 104 : w / h < 1.2 ? 80 : 64;
    // the haze starts beyond the yard, whatever the camera distance
    this.scene.fog.near = this.distance + 12;
    this.scene.fog.far = this.distance + 70;
    this.camera.updateProjectionMatrix();
    if (this.reduced) this.draw(0);
  }

  setVisible(v) {
    this.visible = v;
    this.kick();
  }

  kick() {
    if (this.reduced || !this.ok) return;
    cancelAnimationFrame(this.frame);
    if (!this.visible || document.hidden) return;
    const loop = (now) => {
      this.frame = requestAnimationFrame(loop);
      if (now - this.last < 1000 / FPS) return;
      const dt = Math.min(0.1, (now - (this.last || now)) / 1000);
      this.last = now;
      this.draw(dt);
    };
    this.frame = requestAnimationFrame(loop);
  }

  draw(dt) {
    const { camera, smooth, target } = this;
    const step = dt || 0.016;
    const k = 1 - Math.pow(0.02, step);
    smooth.x += (target.x - smooth.x) * k;
    smooth.y += (target.y - smooth.y) * k;
    this.time += dt || 0;

    // Drone camera almost straight above the front slope, turned a little; it swings gently with the pointer
    const az = Math.PI / 2 - 0.35 + Math.sin(this.time * 0.1) * 0.05 + smooth.x * 0.18;
    const el = 1.2 + smooth.y * 0.07;
    const dist = this.distance || 64;
    camera.position.set(Math.cos(az) * Math.cos(el) * dist, Math.sin(el) * dist, Math.sin(az) * Math.cos(el) * dist);
    camera.lookAt(0, WALL + 2, 2);

    let over = false;
    if (target.inside && !this.reduced) {
      this.pointer.set(smooth.x, smooth.y);
      this.ray.setFromCamera(this.pointer, camera);
      const hit = this.ray.intersectObjects(this.sheets)[0];
      if (hit) {
        over = true;
        this.cursorLight.position.set(hit.point.x, hit.point.y + 4, hit.point.z);
      } else {
        const p = V(0, 0, 0);
        if (this.ray.ray.intersectPlane(this.ground, p)) this.cursorLight.position.set(p.x, 4, p.z);
      }
    }
    const ease = (v, to, s = 5) => v + (to - v) * Math.min(1, step * s);
    this.hover = ease(this.hover, over ? 1 : 0);
    this.cursorLight.intensity = ease(this.cursorLight.intensity, target.inside && !this.reduced ? 70 : 0);
    this.edgeMat.opacity = this.hover;
    this.sheets.forEach((s) => (s.material.emissiveIntensity = this.hover * 0.05));

    // The job: building while the pointer is over the roof (about 4 seconds to finish), then after a pause it slowly goes back
    if (!this.reduced && dt) {
      if (over) {
        this.build = Math.min(1, this.build + dt * 0.25);
        this.idle = 0;
      } else if ((this.idle += dt) > 2.5) this.build = Math.max(0, this.build - dt * 0.12);
      const B = this.build * (COURSES + 3);
      let changed = false;
      let front = null;
      for (let c = 0; c < COURSES; c++) {
        const want = Math.max(this.rest[c], Math.min(1, Math.max(0, (B - c) / 3)));
        const next = ease(this.laid[c], want, 6);
        if (Math.abs(next - this.laid[c]) > 1e-4) changed = true;
        this.laid[c] = next;
        if (front === null && next < 0.999) front = c;
      }
      if (changed) this.layTabs();
      // the lead roofer works along the edge of the lowest unfinished course (back at his spot when all is done)
      const c = front ?? COURSES - 1;
      const edgeX = THREE.MathUtils.clamp(BAND_END - this.laid[c] * (BAND_END + HALF) - 0.6, -HALF + 1.5, BAND_END - 1);
      this.leadX = this.leadX === undefined ? edgeX : ease(this.leadX, edgeX, 3);
      this.leadS = this.leadS === undefined ? BAND - 1 : ease(this.leadS, BAND - 1.2 + c * COURSE * 0.6, 3);
    }
    const lx = this.leadX ?? BAND_END - this.rest[0] * (BAND_END + HALF) - 0.6;
    const ls = this.leadS ?? BAND - 1.2;
    this.lead.position.copy(onFront(lx, ls));
    this.leadRope.set([onFront(lx, ls, 1.7), onFront(lx + 0.4, (ls + L) / 2, 0.15), onFront(lx + 0.8, L - 0.2, 0.12), V(lx + 1, WALL + RISE + 0.25, 0), onBack(lx + 2, 6.5, 0.1)]);
    // the crew bends and straightens a little as they work (faster while the job is being finished)
    this.crew.forEach((m, i) => (m.userData.body.rotation.x = -0.35 - Math.max(0, Math.sin(this.time * (1.6 + this.hover * 2.4) + i * 1.7)) * 0.35));
    this.trees.forEach((t, i) => (t.rotation.z = Math.sin(this.time * 0.9 + i) * 0.012));

    this.renderer.render(this.scene, camera);
  }

  destroy() {
    cancelAnimationFrame(this.frame);
    window.removeEventListener('pointermove', this.onMove);
    document.removeEventListener('pointerleave', this.onLeave);
    document.removeEventListener('visibilitychange', this.onVis);
    this.canvas?.removeEventListener('webglcontextlost', this.onLost);
    this.scene?.traverse((o) => {
      o.geometry?.dispose();
      if (o.material) [].concat(o.material).forEach((m) => { m.map?.dispose(); m.dispose(); });
    });
    this.renderer?.dispose();
    this.ok = false;
  }
}

function at(m, x, y, z) {
  m.position.set(x, y, z);
  return m;
}
