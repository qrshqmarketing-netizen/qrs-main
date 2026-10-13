// The 3D scene behind the Service Areas hero (RoofScene3D.jsx, scene="street"): a new neighborhood seen from the street at eye level on a
// bright day: a gently curving road with curbs, a sidewalk and a grass parkway with young trees, and a row of two-story homes in sage green,
// pale yellow, tan, brown, blue-gray and white, each with a gable roof in dark gray or brown shingles, a front cross gable, a two-car garage
// with white doors, white-trimmed windows, a porch on white posts, a stone base, lawns, driveways and shrubs; pines in the distance under a
// pale sky. Built from simple shapes with three.js (no model file).
// Mouse: the camera looks around a little with the pointer and drifts slowly along the street on its own; pointing at a home (anywhere on it) traces its roof
// in gold, lifts it a touch and drops a gold map pin over it (one of the homes we serve). 30 fps only while on screen; one still frame for
// reduced motion.
import * as THREE from 'three';
import { box, facesGeometry, mesh, shingleTexture } from './houseScene';

const FPS = 30;
const V = (x, y, z) => new THREE.Vector3(x, y, z);
const at = (m, x, y, z) => (m.position.set(x, y, z), m);

// The street is an arc around this center: the road from R 100 to 109, the parkway, the sidewalk, the lawns, and the homes at R 130
const C = V(0, 0, 140);
const ROAD = [100, 109], PARKWAY = [109, 111.5], WALK = [111.5, 113.2], LAWN = [113.2, 160];
const onArc = (r, a, y = 0) => V(C.x + Math.sin(a) * r, y, C.z - Math.cos(a) * r);

// A band of the ground along the arc (a flat ring segment)
function ring(world, [r0, r1], color, y, a0 = -0.9, a1 = 0.9) {
  const m = new THREE.Mesh(new THREE.RingGeometry(r0, r1, 120, 1, 0, a1 - a0), new THREE.MeshStandardMaterial({ color, roughness: 1 }));
  m.rotation.x = -Math.PI / 2;
  // RingGeometry's angle 0 points along +x; turn it so the band covers a0..a1 measured from the -z direction around C
  m.rotation.z = Math.PI / 2 - a1;
  m.position.set(C.x, y, C.z);
  m.receiveShadow = true;
  world.add(m);
  return m;
}

// Gable roof faces over a w × d block (ridge along x), eaves at y, rising h, with an overhang
function gable(w, d, y, h, o = 0.5) {
  const x0 = -w / 2 - o, x1 = w / 2 + o, zf = d / 2 + o, zb = -d / 2 - o;
  return [
    [V(x0, y, zf), V(x1, y, zf), V(x1, y + h, 0), V(x0, y + h, 0)],
    [V(x1, y, zb), V(x0, y, zb), V(x0, y + h, 0), V(x1, y + h, 0)],
  ];
}
// Gable roof faces with the ridge along z (a front-facing gable), centered at (cx, cz)
function frontGable(cx, cz, w, d, y, h, o = 0.4) {
  const x0 = cx - w / 2 - o, x1 = cx + w / 2 + o, zf = cz + d / 2 + o, zb = cz - d / 2;
  return [
    [V(x0, y, zb), V(x0, y, zf), V(cx, y + h, zf), V(cx, y + h, zb)],
    [V(x1, y, zf), V(x1, y, zb), V(cx, y + h, zb), V(cx, y + h, zf)],
  ];
}
// The triangle wall under a gable
function gableWall(w, h, color) {
  const s = new THREE.Shape([new THREE.Vector2(-w / 2, 0), new THREE.Vector2(w / 2, 0), new THREE.Vector2(0, h)]);
  return mesh(new THREE.ShapeGeometry(s), color, { side: THREE.DoubleSide });
}
// A window: white frame, dark glass, a muntin cross
function windowAt(g, x, y, z, w = 1.2, h = 1.5) {
  g.add(at(box(w + 0.2, h + 0.2, 0.12, 0xf4f4f1), x, y, z));
  g.add(at(box(w, h, 0.14, 0x2b3a46, { roughness: 0.25, metalness: 0.2 }), x, y, z + 0.02));
  g.add(at(box(0.06, h, 0.16, 0xf4f4f1), x, y, z + 0.03));
  g.add(at(box(w, 0.06, 0.16, 0xf4f4f1), x, y, z + 0.03));
}

// A two-story home facing +z in its own frame: main block, a front cross gable, a one-story two-car garage at one side, a porch, windows
function home({ wall, roof, garageLeft = true, w = 12, d = 10 }) {
  const g = new THREE.Group();
  const H = 6.2;
  g.add(at(box(w, H, d, wall), 0, H / 2, 0));
  g.add(at(box(w + 0.06, 1, 0.3, 0x7f6b58, { roughness: 1 }), 0, 0.5, d / 2));
  // windows: three upstairs, two downstairs
  [-3.6, 0, 3.6].forEach((x) => windowAt(g, x, 4.6, d / 2 + 0.05));
  windowAt(g, -3.2, 1.9, d / 2 + 0.05, 1.6, 1.6);
  // front door and porch: a small roof on white posts
  g.add(at(box(1.1, 2.3, 0.12, 0x3a3f45), 2.6, 1.15, d / 2 + 0.06));
  g.add(at(box(5, 0.2, 2.4, 0xf2f2ee), 2.6, 3, d / 2 + 1.2));
  [0.4, 4.8].forEach((x) => g.add(at(box(0.25, 3, 0.25, 0xf6f6f3), x, 1.5, d / 2 + 2.25)));
  const roofFaces = [...gable(w, d, H, 3.6)];
  // the front cross gable over the left half of the house
  const cgx = -2.4, cgw = 5.4;
  g.add(at(box(cgw, H, 1.2, wall), cgx, H / 2, d / 2 + 0.6));
  roofFaces.push(...frontGable(cgx, d / 2 - 1, cgw, 3.2, H, 3));
  const tri = gableWall(cgw, 3, wall);
  tri.position.set(cgx, H, d / 2 + 1.25);
  g.add(tri);
  windowAt(g, cgx, H + 0.9, d / 2 + 1.3, 1.1, 1.2);
  // end walls under the main gable
  [-w / 2, w / 2].forEach((x) => {
    const t = gableWall(d, 3.6, wall);
    t.position.set(x, H, 0);
    t.rotation.y = Math.PI / 2;
    g.add(t);
  });
  // the garage wing: one story, two white doors, its own gable roof
  const gx = garageLeft ? -w / 2 - 4 : w / 2 + 4;
  const garage = new THREE.Group();
  garage.position.set(gx, 0, 0.6);
  garage.add(at(box(8, 3.4, d - 1, wall), 0, 1.7, 0));
  garage.add(at(box(8.06, 0.9, 0.3, 0x7f6b58), 0, 0.45, (d - 1) / 2));
  [-2, 2].forEach((x) => {
    garage.add(at(box(3.2, 2.5, 0.12, 0xf7f7f4), x, 1.4, (d - 1) / 2 + 0.06));
    garage.add(at(box(2.8, 0.35, 0.14, 0x2b3a46), x, 2.25, (d - 1) / 2 + 0.08));
  });
  g.add(garage);
  const garageFaces = gable(8, d - 1, 3.4, 2.4, 0.4).map((f) => f.map((p) => p.clone().add(V(gx, 0, 0.6))));
  // the roof: one mesh for the hover test, shingles running along the eaves
  const tex = shingleTexture(roof[0], roof[1]);
  const roofMesh = mesh(facesGeometry([...roofFaces, ...garageFaces], 0.28), 0xffffff, { map: tex, roughness: 0.95, side: THREE.DoubleSide, emissive: new THREE.Color(0xd4b572), emissiveIntensity: 0 });
  const roofGroup = new THREE.Group();
  roofGroup.add(roofMesh);
  const outline = new THREE.LineSegments(new THREE.EdgesGeometry(roofMesh.geometry, 20), new THREE.LineBasicMaterial({ color: 0xffd98a, transparent: true, opacity: 0 }));
  roofGroup.add(outline);
  g.add(roofGroup);
  // shrubs along the front
  const greens = [0x5d8c34, 0x7aa83e, 0x4b7a2e];
  for (let x = -w / 2 + 0.8; x < w / 2; x += 1.6) {
    const s = mesh(new THREE.IcosahedronGeometry(0.55 + Math.random() * 0.25, 1), greens[Math.floor(Math.random() * 3)], { flatShading: true, roughness: 1 });
    s.position.set(x, 0.45, d / 2 + 1 + (x > 0.4 && x < 4.8 ? 2.2 : 0));
    g.add(s);
  }
  return { group: g, roofGroup, roofMesh, outline, lift: 0, top: H + 3.8 };
}

// A young street tree: a thin trunk and a few small leaf clusters
function youngTree(world, p, s = 1) {
  const t = new THREE.Group();
  t.add(at(mesh(new THREE.CylinderGeometry(0.08 * s, 0.12 * s, 3.6 * s, 6), 0x6b5843), 0, 1.8 * s, 0));
  for (let i = 0; i < 5; i++) {
    const m = mesh(new THREE.IcosahedronGeometry((0.5 + Math.random() * 0.35) * s, 1), [0x7fae3e, 0x96c04a, 0x6a9a36][i % 3], { flatShading: true, roughness: 1 });
    m.position.set((Math.random() - 0.5) * 1.2 * s, (3 + Math.random() * 1.6) * s, (Math.random() - 0.5) * 1.2 * s);
    t.add(m);
  }
  t.position.copy(p);
  world.add(t);
  return t;
}

// The gold map pin that drops over a hovered home
function pin() {
  const g = new THREE.Group();
  const gold = new THREE.MeshStandardMaterial({ color: 0xd8b064, metalness: 0.55, roughness: 0.3, emissive: new THREE.Color(0x6b4e18), emissiveIntensity: 0.5 });
  const head = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 16), gold);
  head.position.y = 2.1;
  g.add(head);
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.9, 2.1, 24), gold);
  tip.rotation.x = Math.PI;
  tip.position.y = 1.05;
  g.add(tip);
  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.38, 16, 12), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 }));
  dot.position.set(0, 2.15, 0.72);
  g.add(dot);
  g.scale.setScalar(0.0001);
  return g;
}

// A pale sky: light blue at the top, near-white at the horizon
function skyTexture() {
  const c = document.createElement('canvas');
  c.width = 4;
  c.height = 256;
  const g = c.getContext('2d');
  const grad = g.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, '#a9c4dc');
  grad.addColorStop(0.55, '#dbe6ee');
  grad.addColorStop(1, '#f1f3ee');
  g.fillStyle = grad;
  g.fillRect(0, 0, 4, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export class StreetSceneEngine {
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
    renderer.toneMappingExposure = 1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    const scene = (this.scene = new THREE.Scene());
    scene.background = skyTexture();
    scene.fog = new THREE.Fog(0xe6ece9, 70, 190);
    this.camera = new THREE.PerspectiveCamera(42, 1, 0.3, 400);

    // Bright sun high behind the camera's right shoulder, a pale sky
    scene.add(new THREE.HemisphereLight(0xe2edf6, 0x6f8a4a, 1));
    const sun = new THREE.DirectionalLight(0xfff3dc, 2.4);
    sun.position.set(40, 60, 170);
    sun.target.position.set(0, 0, 10);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -80, right: 80, top: 60, bottom: -60, near: 10, far: 260 });
    sun.shadow.bias = -0.0006;
    scene.add(sun, sun.target);
    this.cursorLight = new THREE.PointLight(0xffd59a, 0, 30, 1.5);
    scene.add(this.cursorLight);

    const world = (this.world = new THREE.Group());
    scene.add(world);

    // Ground: grass everywhere, then the road, the parkway, the curb and the sidewalk along the arc; the far side of the street
    world.add(at(new THREE.Mesh(new THREE.PlaneGeometry(600, 600), new THREE.MeshStandardMaterial({ color: 0x6d9a3c, roughness: 1 })), 0, 0, 0));
    world.children[0].rotation.x = -Math.PI / 2;
    world.children[0].receiveShadow = true;
    ring(world, ROAD, 0x8e9095, 0.03);
    ring(world, PARKWAY, 0x76a640, 0.04);
    ring(world, WALK, 0xdcd9d0, 0.05);
    ring(world, [108.8, 109.2], 0xd2cfc6, 0.14); // the curb on the homes' side
    ring(world, [99.6, 100], 0xd2cfc6, 0.14); // the curb on the near side
    ring(world, [96, 99.6], 0xd8d5cc, 0.06); // the near sidewalk

    // The homes along the arc, each turned to face the street
    const HOMES = [
      { a: -0.36, wall: 0xa7b38a, roof: ['#3f444b', '#2a2e33'] },
      { a: -0.24, wall: 0xe4d8a2, roof: ['#6f5646', '#4f3d31'], garageLeft: false },
      { a: -0.12, wall: 0xd8c9a3, roof: ['#6a5344', '#4b3a2e'] },
      { a: 0.0, wall: 0x9c8164, roof: ['#3e434a', '#292d32'], garageLeft: false },
      { a: 0.12, wall: 0x8796a6, roof: ['#3d4249', '#282c31'] },
      { a: 0.24, wall: 0xedefed, roof: ['#6e5747', '#4e3e32'], garageLeft: false },
      { a: 0.36, wall: 0xc4d1ae, roof: ['#40454c', '#2b2f34'] },
    ];
    this.homes = HOMES.map((h) => {
      const made = home(h);
      const p = onArc(130, h.a);
      made.group.position.copy(p);
      made.group.rotation.y = -h.a; // face the arc's center
      world.add(made.group);
      // the driveway from the garage to the road, and the walk to the front door
      const side = h.garageLeft === false ? 1 : -1;
      const dp = onArc(119, h.a + (side * 10.5) / 130, 0.06);
      const dw = at(new THREE.Mesh(new THREE.PlaneGeometry(7, 16), new THREE.MeshStandardMaterial({ color: 0xd9d6cc, roughness: 1 })), dp.x, 0.06, dp.z);
      dw.rotation.set(-Math.PI / 2, 0, -h.a);
      dw.receiveShadow = true;
      world.add(dw);
      made.anchor = p.clone().setY(made.top + 1.5);
      return made;
    });

    // Young trees in the parkway, pines in the distance, a fire hydrant
    this.trees = [];
    for (let a = -0.4; a < 0.45; a += 0.12) this.trees.push(youngTree(world, onArc(110.3, a + 0.05), 0.75));
    for (let a = -0.36; a < 0.4; a += 0.24) this.trees.push(youngTree(world, onArc(121, a + 0.06), 0.7));
    const pine = (p, s) => {
      const t = new THREE.Group();
      t.add(at(mesh(new THREE.CylinderGeometry(0.4 * s, 0.5 * s, 3 * s, 6), 0x5a4634), 0, 1.5 * s, 0));
      for (let i = 0; i < 3; i++) t.add(at(mesh(new THREE.ConeGeometry((3.2 - i * 0.8) * s, 4 * s, 8), 0x3f6a34, { flatShading: true }), 0, (4 + i * 2.4) * s, 0));
      t.position.copy(p);
      world.add(t);
    };
    [[0.3, 158, 1.6], [0.36, 162, 1.9], [0.42, 156, 1.4], [-0.05, 165, 1.7], [0.12, 160, 1.5], [-0.3, 160, 1.6]].forEach(([a, r, s]) => pine(onArc(r, a), s));
    const hydrant = at(mesh(new THREE.CylinderGeometry(0.2, 0.25, 0.9, 10), 0xc2302a), 0, 0.45, 0);
    hydrant.position.copy(onArc(110.6, 0.12, 0.45));
    world.add(hydrant);

    // The pin for the hovered home
    this.pin = pin();
    world.add(this.pin);
    this.pinFor = null;
    this.pinT = 0;

    // Pointer state
    this.target = { x: 0, y: 0, inside: false };
    this.smooth = { x: 0, y: 0 };
    this.pointer = new THREE.Vector2();
    this.ray = new THREE.Raycaster();
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

  resize() {
    if (!this.renderer) return;
    const r = this.canvas.getBoundingClientRect();
    const w = Math.max(2, Math.round(r.width)), h = Math.max(2, Math.round(r.height));
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    // narrow screens see the street from farther back so a few homes still fit
    this.back = w / h < 0.8 ? 14 : w / h < 1.2 ? 7 : 0;
    this.camera.fov = w / h < 0.8 ? 58 : 42;
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

    // Standing near the curb on the far end of the curve, looking back along the row of homes; drifting slowly along the street
    const drift = Math.sin(this.time * 0.06) * 0.03;
    const ca = 0.33 + drift;
    const eye = onArc(101.5 - (this.back || 0), ca, 2.8 + (this.back || 0) * 0.35 + smooth.y * 0.6);
    camera.position.copy(eye);
    const look = onArc(126, 0.02 + drift + smooth.x * 0.08, 3.6 + smooth.y * 1.4);
    camera.lookAt(look);

    let hovered = null;
    if (target.inside && !this.reduced) {
      this.pointer.set(target.x, target.y);
      this.ray.setFromCamera(this.pointer, camera);
      // anywhere on a home counts (walls, garage, roof)
      const hit = this.ray.intersectObjects(this.homes.map((h) => h.group), true)[0];
      if (hit) {
        let o = hit.object;
        while (o && !this.homes.some((h) => h.group === o)) o = o.parent;
        hovered = this.homes.find((h) => h.group === o);
        this.cursorLight.position.set(hit.point.x, hit.point.y + 5, hit.point.z + 3);
      }
    }
    const ease = (v, to, s = 5) => v + (to - v) * Math.min(1, step * s);
    this.cursorLight.intensity = ease(this.cursorLight.intensity, hovered ? 140 : 0);
    this.homes.forEach((h) => {
      h.lift = ease(h.lift, h === hovered ? 1 : 0, 6);
      h.roofGroup.position.y = h.lift * 0.45;
      h.outline.material.opacity = h.lift;
      h.roofMesh.material.emissiveIntensity = h.lift * 0.08;
    });
    // the pin drops over the hovered home with a small bounce, and bobs while it stays
    if (hovered && hovered !== this.pinFor) {
      this.pinFor = hovered;
      this.pinT = 0;
    }
    if (!hovered && this.pinFor) this.pinT = Math.min(this.pinT, 1);
    if (this.pinFor) {
      this.pinT += step;
      const t = Math.min(1, this.pinT / 0.6);
      const bounce = 1 - Math.pow(1 - t, 3) * Math.cos(t * Math.PI * 2.5);
      const out = !hovered ? (this.pinOut = (this.pinOut || 0) + step * 3) : (this.pinOut = 0);
      const s = Math.max(0.0001, (hovered ? Math.min(1, t * 2) : Math.max(0, 1 - out)) * 1.15);
      this.pin.scale.setScalar(s);
      this.pin.position.copy(this.pinFor.anchor).add(V(0, (1 - bounce) * 6 + Math.sin(this.time * 2.2) * 0.25, 0));
      this.pin.rotation.y = -camera.rotation.y * 0 + Math.sin(this.time * 0.8) * 0.4;
      if (!hovered && out >= 1) this.pinFor = null;
    }
    this.trees.forEach((t, i) => (t.rotation.z = Math.sin(this.time * 1.1 + i) * 0.02));

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
    this.scene?.background?.dispose?.();
    this.renderer?.dispose();
    this.ok = false;
  }
}
