// The "How we work" 3D stage (components/studio/HowStage.jsx; owner, October 20 2026: the section's AI photos replaced by 3D scenes). Plain Three.js,
// fetched only when the section is about to scroll into view. Four stations, one per principle, built side by side in one scene; on wide screens
// the camera flies from station to station as the section scrolls, on phones each principle gets its own small stage with just its station.
//   0  A roofer looks first. The price is in writing.   a home with a drone circling it, its spotlight and scan beam sweeping the roof
//   1  Clear answers. Plain English.                   a roof close-up with three pulsing markers (chimney flashing, vent boot, skylight)
//                                                       (the floating photo frames were removed, owner, October 27 2026)
//   2  Family-owned. Local crews.                       the service area (data/serviceAreaOutline.js) as a glowing 3D map, beacons at the
//                                                       three offices (OFFICES), arcs between them and twelve crew lights moving around
//   3  Clean sites. Work that's backed.                a roof assembling layer by layer (deck, underlayment, shingles) and a gold shield
// Every texture is drawn here on canvases (no image downloads). HTML labels in the stage ([data-anchor="s1-flashing"], HowStage.jsx) follow their
// 3D points: this file moves them each frame. Runs only while the stage is on screen and the tab is visible; `still` (reduced motion) draws
// single frames. Brand colors: navy, gold, warm stucco.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { SERVICE_AREA_OUTLINE } from '@/data/serviceAreaOutline';

const COL = {
  gold: 0xd4b572, gold2: 0xf0d9a2, navy: 0x062d57, deep: 0x05182c, ground: 0x0a213d, stucco: 0xeee6d8, trim: 0xfaf7f1,
  charcoal: 0x30343b, brick: 0x8a5442, leaf: 0x2f5143, glassWarm: 0xffd7a0, metal: 0xa9b2bc,
};
const SPACING = 64; // world units between stations
const VIEWS = [
  { pos: [13.5, 9.2, 15.5], target: [0, 2.6, 0] },
  { pos: [10.5, 9.5, 14.5], target: [0.2, 2.4, -0.6] },
  { pos: [-2.4, 23, 17.5], target: [-2.8, 0, 0.6] },
  { pos: [9.5, 10.5, 13], target: [0.4, 2.9, 0] },
];

const rand = (seed) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const smooth = (a, b, t) => {
  const x = Math.min(1, Math.max(0, (t - a) / (b - a)));
  return x * x * (3 - 2 * x);
};

// ---------- Canvas textures ----------
function canvasTexture(w, h, draw, repeat = [1, 1]) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(...repeat);
  t.anisotropy = 4;
  return t;
}

// Architectural shingles: staggered tabs in charcoal greys, each course with a shadow line
const shingles = (repeat) =>
  canvasTexture(512, 512, (g, w, h) => {
    const r = rand(7);
    g.fillStyle = '#2b2f36';
    g.fillRect(0, 0, w, h);
    const rows = 8, rh = h / rows;
    for (let y = 0; y < rows; y++) {
      let x = (y % 2) * -28 - r() * 20;
      while (x < w) {
        const tw = 46 + r() * 34;
        const v = 52 + Math.floor(r() * 26);
        g.fillStyle = `rgb(${v},${v + 3},${v + 9})`;
        g.fillRect(x + 1, y * rh + 2, tw - 2, rh - 4);
        // granules
        for (let k = 0; k < 26; k++) {
          const gv = v + (r() - 0.5) * 30;
          g.fillStyle = `rgba(${gv},${gv},${gv + 6},.55)`;
          g.fillRect(x + r() * tw, y * rh + r() * rh, 2, 2);
        }
        x += tw;
      }
      const grad = g.createLinearGradient(0, y * rh + rh - 9, 0, y * rh + rh);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(1, 'rgba(0,0,0,.55)');
      g.fillStyle = grad;
      g.fillRect(0, y * rh + rh - 9, w, 9);
    }
  }, repeat);

// Decking: plywood sheets with grain
const decking = (repeat) =>
  canvasTexture(512, 512, (g, w, h) => {
    const r = rand(11);
    g.fillStyle = '#c99a63';
    g.fillRect(0, 0, w, h);
    for (let i = 0; i < 220; i++) {
      g.strokeStyle = `rgba(${120 + r() * 40},${80 + r() * 30},${40 + r() * 20},${0.12 + r() * 0.18})`;
      g.lineWidth = 1 + r() * 2;
      g.beginPath();
      const y = r() * h;
      g.moveTo(0, y);
      g.bezierCurveTo(w * 0.3, y + (r() - 0.5) * 30, w * 0.7, y + (r() - 0.5) * 30, w, y + (r() - 0.5) * 20);
      g.stroke();
    }
    g.strokeStyle = 'rgba(70,45,20,.55)';
    g.lineWidth = 3;
    for (let x = 0; x <= w; x += 256) g.strokeRect(x, 0, 256, h / 2), g.strokeRect(x - 128, h / 2, 256, h / 2);
  }, repeat);

// Underlayment: a dark synthetic sheet with overlap lines and a faint woven print
const underlay = (repeat) =>
  canvasTexture(512, 512, (g, w, h) => {
    g.fillStyle = '#1d2733';
    g.fillRect(0, 0, w, h);
    g.strokeStyle = 'rgba(255,255,255,.05)';
    for (let i = 0; i < w; i += 8) {
      g.beginPath();
      g.moveTo(i, 0);
      g.lineTo(i, h);
      g.stroke();
    }
    g.strokeStyle = 'rgba(212,181,114,.35)';
    g.lineWidth = 2;
    for (let y = 64; y < h; y += 128) {
      g.beginPath();
      g.moveTo(0, y);
      g.lineTo(w, y);
      g.stroke();
    }
  }, repeat);

// Soft round glow for sprites
const glow = () =>
  canvasTexture(128, 128, (g, w, h) => {
    const grad = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.35, 'rgba(255,255,255,.35)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, w, h);
  });

// ---------- Small builders ----------
const std = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.82, metalness: 0, ...extra });
function mesh(geo, mat, { cast = true, receive = true } = {}) {
  const m = new THREE.Mesh(geo, mat);
  m.castShadow = cast;
  m.receiveShadow = receive;
  return m;
}
function sprite(tex, color, size, opacity = 1) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending }));
  s.scale.set(size, size, 1);
  return s;
}
function stage(radius = 11) {
  const g = new THREE.Group();
  const floor = mesh(new THREE.CircleGeometry(radius, 96), std(COL.ground, { roughness: 0.95 }), { cast: false });
  floor.rotation.x = -Math.PI / 2;
  g.add(floor);
  for (const r of [radius * 0.42, radius * 0.7, radius * 0.97]) {
    const ring = new THREE.Mesh(new THREE.RingGeometry(r - 0.025, r + 0.025, 160), new THREE.MeshBasicMaterial({ color: COL.gold, transparent: true, opacity: 0.16, depthWrite: false }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.01;
    g.add(ring);
  }
  return g;
}

// A gable house: walls, two shingled slopes, gable ends, ridge cap, fascia, windows lit from inside, a door and a chimney
function house({ w = 7, d = 5, h = 3.2, rise = 2.2, roofTex }) {
  const g = new THREE.Group();
  const body = mesh(new THREE.BoxGeometry(w, h, d), std(COL.stucco, { roughness: 0.9 }));
  body.position.y = h / 2;
  g.add(body);
  const half = d / 2 + 0.35;
  const slope = Math.hypot(half, rise);
  const angle = Math.atan2(rise, half);
  for (const s of [1, -1]) {
    const roof = mesh(new THREE.BoxGeometry(w + 0.8, 0.12, slope), std(0xffffff, { map: roofTex, roughness: 0.78 }));
    roof.rotation.x = s * angle;
    roof.position.set(0, h + rise / 2 + 0.04, (s * half) / 2);
    g.add(roof);
    const fascia = mesh(new THREE.BoxGeometry(w + 0.85, 0.22, 0.08), std(COL.trim));
    fascia.position.set(0, h - 0.02, s * (half + 0.02));
    g.add(fascia);
  }
  const tri = new THREE.Shape();
  tri.moveTo(-d / 2, 0);
  tri.lineTo(0, rise);
  tri.lineTo(d / 2, 0);
  tri.closePath();
  for (const s of [1, -1]) {
    const gable = mesh(new THREE.ShapeGeometry(tri), std(COL.stucco, { roughness: 0.9, side: THREE.DoubleSide }));
    gable.rotation.y = Math.PI / 2;
    gable.position.set((s * w) / 2, h, 0);
    g.add(gable);
  }
  const ridge = mesh(new THREE.BoxGeometry(w + 0.85, 0.16, 0.34), std(COL.charcoal, { roughness: 0.7 }));
  ridge.position.y = h + rise + 0.08;
  g.add(ridge);
  const glassMat = std(0x1c2a3a, { emissive: COL.glassWarm, emissiveIntensity: 0.55, roughness: 0.25, metalness: 0.1 });
  for (const x of [-2.2, 0, 2.2]) {
    const win = mesh(new THREE.BoxGeometry(1.1, 1.05, 0.08), glassMat, { cast: false });
    win.position.set(x, h * 0.55, d / 2 + 0.02);
    const frame = mesh(new THREE.BoxGeometry(1.26, 1.2, 0.05), std(COL.trim), { cast: false });
    frame.position.set(x, h * 0.55, d / 2 + 0.005);
    g.add(frame, win);
  }
  const door = mesh(new THREE.BoxGeometry(0.95, 1.9, 0.08), std(COL.navy, { roughness: 0.5 }), { cast: false });
  door.position.set(-3.1 + w / 2 - 0.9, 0.95, -d / 2 - 0.02);
  g.add(door);
  const chimney = mesh(new THREE.BoxGeometry(0.75, 2.1, 0.75), std(COL.brick, { roughness: 0.95 }));
  chimney.position.set(w / 2 - 1.6, h + rise - 0.35, -0.9);
  g.add(chimney);
  const cap = mesh(new THREE.BoxGeometry(0.95, 0.12, 0.95), std(COL.trim));
  cap.position.set(chimney.position.x, chimney.position.y + 1.1, chimney.position.z);
  g.add(cap);
  return g;
}

function bushes(g, spots) {
  const mat = std(COL.leaf, { roughness: 1, flatShading: true });
  for (const [x, z, s] of spots) {
    const b = mesh(new THREE.IcosahedronGeometry(s, 0), mat);
    b.position.set(x, s * 0.7, z);
    g.add(b);
  }
}

// ---------- Station 0: a roofer looks first ----------
function stationInspect(ctx) {
  const g = new THREE.Group();
  g.add(stage(11));
  const h = house({ roofTex: shingles([3.2, 1.6]) });
  g.add(h);
  bushes(g, [[-4.6, 3.2, 0.6], [-3.6, 3.6, 0.42], [4.4, 3.1, 0.55], [4.9, -2.6, 0.5], [-4.9, -2.8, 0.62]]);

  const drone = new THREE.Group();
  const dark = std(0x1a1d22, { roughness: 0.4, metalness: 0.3 });
  drone.add(mesh(new THREE.BoxGeometry(0.7, 0.16, 0.5), dark));
  const dome = mesh(new THREE.SphereGeometry(0.2, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), std(COL.trim, { roughness: 0.3 }));
  dome.position.y = 0.08;
  drone.add(dome);
  const rotors = [];
  for (const [x, z] of [[0.55, 0.45], [-0.55, 0.45], [0.55, -0.45], [-0.55, -0.45]]) {
    const arm = mesh(new THREE.BoxGeometry(0.62, 0.05, 0.06), dark);
    arm.position.set(x / 2, 0.02, z / 2);
    arm.rotation.y = Math.atan2(z, x) * -1;
    drone.add(arm);
    const rotor = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.012, 28), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.22, depthWrite: false }));
    rotor.position.set(x, 0.1, z);
    drone.add(rotor);
    const blade = mesh(new THREE.BoxGeometry(0.56, 0.01, 0.05), dark, { cast: false });
    blade.position.set(x, 0.11, z);
    drone.add(blade);
    rotors.push(blade);
  }
  const led = sprite(ctx.glow, COL.gold, 0.7, 0.9);
  led.position.y = -0.1;
  drone.add(led);
  g.add(drone);

  // The drone's light: a real spotlight on the roof, plus a soft visible cone and a ring on the roof
  const spot = new THREE.SpotLight(COL.gold2, 38, 14, 0.42, 0.65, 1.3);
  spot.castShadow = false;
  g.add(spot, spot.target);
  const cone = new THREE.Mesh(new THREE.ConeGeometry(1.7, 4, 48, 1, true), new THREE.MeshBasicMaterial({ color: COL.gold, transparent: true, opacity: 0.09, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }));
  g.add(cone);

  // A scan beam sweeping across the house
  const beamTex = canvasTexture(64, 256, (c, w, hh) => {
    const grad = c.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, 'rgba(240,217,162,0)');
    grad.addColorStop(0.5, 'rgba(240,217,162,.9)');
    grad.addColorStop(1, 'rgba(240,217,162,0)');
    c.fillStyle = grad;
    c.fillRect(0, 0, w, hh);
  });
  const beam = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 7.2), new THREE.MeshBasicMaterial({ map: beamTex, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }));
  beam.rotation.y = Math.PI / 2;
  g.add(beam);

  const anchors = { 's0-drone': new THREE.Vector3(), 's0-roof': new THREE.Vector3(1.8, 5.6, 1.4) };
  const update = (t) => {
    const a = t * 0.32;
    drone.position.set(Math.cos(a) * 4.6, 7.4 + Math.sin(t * 1.4) * 0.22, Math.sin(a) * 3.6);
    drone.rotation.y = -a + Math.PI / 2;
    drone.rotation.z = Math.sin(t * 1.1) * 0.06;
    rotors.forEach((r, i) => (r.rotation.y = t * 38 + i));
    const below = new THREE.Vector3(drone.position.x * 0.6, 4.2, drone.position.z * 0.55);
    spot.position.copy(drone.position);
    spot.target.position.copy(below);
    cone.position.set((drone.position.x + below.x) / 2, (drone.position.y + below.y) / 2, (drone.position.z + below.z) / 2);
    cone.lookAt(drone.position);
    cone.rotateX(Math.PI / 2);
    beam.position.set(Math.sin(t * 0.9) * 3.9, 3.6, 0);
    beam.material.opacity = 0.35 + Math.abs(Math.cos(t * 0.9)) * 0.3;
    led.material.opacity = 0.55 + Math.sin(t * 6) * 0.35;
    anchors['s0-drone'].copy(drone.position).add(new THREE.Vector3(0, 0.7, 0));
  };
  return { group: g, anchors, update };
}

// ---------- Station 1: clear answers, plain English ----------
function stationExplain(ctx) {
  const g = new THREE.Group();
  g.add(stage(10));
  const tex = shingles([4, 2.4]);
  const roof = new THREE.Group();
  const deck = mesh(new THREE.BoxGeometry(10, 0.2, 6.4), std(0xffffff, { map: tex, roughness: 0.78 }));
  roof.add(deck);
  // Chimney with metal flashing at its base
  const chimney = mesh(new THREE.BoxGeometry(1.1, 2.2, 1.1), std(COL.brick, { roughness: 0.95 }));
  chimney.position.set(-2.6, 1.0, -0.6);
  chimney.rotation.x = 0.32; // upright, against the roof's slope
  roof.add(chimney);
  const capS = mesh(new THREE.BoxGeometry(1.3, 0.14, 1.3), std(COL.trim));
  capS.position.set(-2.6, 2.1, -0.25);
  capS.rotation.x = 0.32;
  roof.add(capS);
  const flash = mesh(new THREE.BoxGeometry(1.45, 0.12, 1.45), std(COL.metal, { metalness: 0.75, roughness: 0.32 }));
  flash.position.set(-2.6, 0.12, -0.6);
  roof.add(flash);
  // Vent pipe with its rubber boot
  const boot = mesh(new THREE.ConeGeometry(0.45, 0.4, 24), std(0x16191d, { roughness: 0.6 }));
  boot.position.set(1.4, 0.3, 1.2);
  boot.rotation.x = 0.32;
  const pipe = mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.9, 20), std(COL.metal, { metalness: 0.7, roughness: 0.35 }));
  pipe.position.set(1.4, 0.6, 1.3);
  pipe.rotation.x = 0.32;
  roof.add(boot, pipe);
  // Skylight
  const curb = mesh(new THREE.BoxGeometry(1.6, 0.3, 1.2), std(COL.trim));
  curb.position.set(2.9, 0.22, -1.3);
  const glass = mesh(new THREE.BoxGeometry(1.4, 0.06, 1.0), std(0x9cc3e6, { roughness: 0.08, metalness: 0.4, envMapIntensity: 1.4 }), { cast: false });
  glass.position.set(2.9, 0.39, -1.3);
  roof.add(curb, glass);
  roof.rotation.x = -0.32;
  roof.position.y = 1.0;
  g.add(roof);
  // Supports under the tilted roof
  const wall = mesh(new THREE.BoxGeometry(9.2, 0.6, 5.4), std(0x3b4657, { roughness: 0.9 }));
  wall.position.y = 0.3;
  g.add(wall);

  // Markers: a stem, a glowing head and a ring that pulses out
  const pins = [];
  const markerAt = (x, y, z) => {
    const p = new THREE.Group();
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.3, 8), new THREE.MeshBasicMaterial({ color: COL.gold, transparent: true, opacity: 0.85 }));
    stem.position.y = 0.65;
    const head = mesh(new THREE.SphereGeometry(0.16, 20, 14), std(COL.gold, { emissive: COL.gold, emissiveIntensity: 0.9, metalness: 0.4, roughness: 0.3 }), { cast: false });
    head.position.y = 1.35;
    const halo = sprite(ctx.glow, COL.gold, 1.1, 0.8);
    halo.position.y = 1.35;
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.26, 40), new THREE.MeshBasicMaterial({ color: COL.gold2, transparent: true, side: THREE.DoubleSide, depthWrite: false }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.05;
    p.add(stem, head, halo, ring);
    p.position.set(x, y, z);
    roof.add(p);
    pins.push({ ring, halo });
    return p;
  };
  const pinFlash = markerAt(-2.6, 2.2, 0.1);
  const pinBoot = markerAt(1.4, 0.9, 1.2);
  const pinSky = markerAt(2.9, 0.4, -1.3);

  const tmp = new THREE.Vector3();
  const anchors = { 's1-flashing': new THREE.Vector3(), 's1-boot': new THREE.Vector3(), 's1-skylight': new THREE.Vector3() };
  const update = (t) => {
    pins.forEach(({ ring, halo }, i) => {
      const k = (t * 0.8 + i * 0.33) % 1;
      ring.scale.setScalar(1 + k * 3.2);
      ring.material.opacity = (1 - k) * 0.85;
      halo.material.opacity = 0.55 + Math.sin(t * 3 + i) * 0.25;
    });
    roof.updateMatrixWorld();
    anchors['s1-flashing'].copy(pinFlash.localToWorld(tmp.set(0, 1.5, 0))).sub(ctx.origin(1));
    anchors['s1-boot'].copy(pinBoot.localToWorld(tmp.set(0, 1.5, 0))).sub(ctx.origin(1));
    anchors['s1-skylight'].copy(pinSky.localToWorld(tmp.set(0, 1.5, 0))).sub(ctx.origin(1));
  };
  return { group: g, anchors, update };
}

// ---------- Station 2: family-owned, local crews ----------
const LON0 = -118.02, LAT0 = 33.98, KX = 92 * 0.105, KZ = 111 * 0.105;
const project = (lon, lat) => [(lon - LON0) * KX, -(lat - LAT0) * KZ];

function mainlandRings() {
  const rings = [];
  for (const f of SERVICE_AREA_OUTLINE.features) {
    const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
    for (const poly of polys) {
      const ring = poly[0];
      const island = ring.every(([lon, lat]) => lat < 33.6 && lon < -118.15); // Catalina and San Clemente
      if (!island) rings.push(ring);
    }
  }
  return rings;
}

function inside(pt, ring) {
  let c = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if (yi > pt[1] !== yj > pt[1] && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

function stationLocal(ctx, offices) {
  const g = new THREE.Group();
  // A field of faint dots under the map
  const dots = [];
  for (let x = -16; x <= 16; x += 0.8) for (let z = -14; z <= 14; z += 0.8) dots.push(x, 0, z);
  const field = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(dots, 3)), new THREE.PointsMaterial({ color: COL.gold, size: 0.06, transparent: true, opacity: 0.28, depthWrite: false }));
  g.add(field);

  const rings = mainlandRings();
  const slabMat = std(0x0e3560, { roughness: 0.7, metalness: 0.15 });
  const edgeMat = new THREE.LineBasicMaterial({ color: COL.gold2, transparent: true, opacity: 0.7 });
  const map = new THREE.Group();
  rings.forEach((ring, i) => {
    const shape = new THREE.Shape(ring.map(([lon, lat]) => {
      const [x, z] = project(lon, lat);
      return new THREE.Vector2(x, -z);
    }));
    const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.45 + (i % 2) * 0.12, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05, bevelSegments: 1 });
    geo.rotateX(-Math.PI / 2);
    const slab = mesh(geo, slabMat);
    map.add(slab);
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 25), edgeMat);
    map.add(edges);
  });
  g.add(map);

  // Office beacons: a column of light, a gold pin and a pulsing ring
  const columnTex = canvasTexture(16, 256, (c, w, h) => {
    const grad = c.createLinearGradient(0, h, 0, 0);
    grad.addColorStop(0, 'rgba(240,217,162,.95)');
    grad.addColorStop(1, 'rgba(240,217,162,0)');
    c.fillStyle = grad;
    c.fillRect(0, 0, w, h);
  });
  const anchors = {};
  const beacons = offices.map((o, i) => {
    const [x, z] = project(o.lon, o.lat);
    const b = new THREE.Group();
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 5.5, 16, 1, true), new THREE.MeshBasicMaterial({ map: columnTex, transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }));
    col.position.y = 3.2;
    const pin = mesh(new THREE.SphereGeometry(0.26, 24, 16), std(COL.gold, { metalness: 0.8, roughness: 0.25, emissive: COL.gold, emissiveIntensity: 0.35 }));
    pin.position.y = 0.95;
    const halo = sprite(ctx.glow, COL.gold, 2.2, 0.85);
    halo.position.y = 0.95;
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.3, 0.38, 48), new THREE.MeshBasicMaterial({ color: COL.gold2, transparent: true, side: THREE.DoubleSide, depthWrite: false }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.66;
    b.add(col, pin, halo, ring);
    b.position.set(x, 0, z);
    g.add(b);
    anchors[`s2-office-${i}`] = new THREE.Vector3(x, [3.4, 2.1, 1.25][i] ?? 2.2, z);
    return { b, ring, i };
  });

  // Arcs between the offices with a light travelling along each
  const arcs = [];
  for (let i = 0; i < beacons.length; i++)
    for (let j = i + 1; j < beacons.length; j++) {
      const a = beacons[i].b.position, b = beacons[j].b.position;
      const mid = a.clone().add(b).multiplyScalar(0.5);
      mid.y = 2.4 + a.distanceTo(b) * 0.18;
      const curve = new THREE.QuadraticBezierCurve3(a.clone().setY(0.95), mid, b.clone().setY(0.95));
      const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 64, 0.035, 8), new THREE.MeshBasicMaterial({ color: COL.gold2, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending }));
      g.add(tube);
      const runner = sprite(ctx.glow, 0xfff1cf, 0.9, 1);
      g.add(runner);
      arcs.push({ curve, runner, speed: 0.12 + arcs.length * 0.03, offset: arcs.length * 0.31 });
    }

  // Twelve crews: lights moving on small loops at places inside the service area
  const r = rand(23);
  const crews = [];
  const all = rings.flat();
  const lons = all.map((p) => p[0]), lats = all.map((p) => p[1]);
  while (crews.length < 12) {
    const lon = Math.min(...lons) + r() * (Math.max(...lons) - Math.min(...lons));
    const lat = Math.min(...lats) + r() * (Math.max(...lats) - Math.min(...lats));
    if (!rings.some((ring) => inside([lon, lat], ring))) continue;
    const [x, z] = project(lon, lat);
    const dot = sprite(ctx.glow, COL.gold2, 0.75, 0.95);
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    g.add(dot, core);
    crews.push({ dot, core, x, z, rad: 0.35 + r() * 0.5, sp: 0.4 + r() * 0.6, ph: r() * 6 });
  }

  const update = (t) => {
    beacons.forEach(({ ring, i }) => {
      const k = (t * 0.5 + i * 0.3) % 1;
      ring.scale.setScalar(1 + k * 4);
      ring.material.opacity = (1 - k) * 0.9;
    });
    arcs.forEach((a) => a.runner.position.copy(a.curve.getPoint((t * a.speed + a.offset) % 1)));
    crews.forEach((c) => {
      const p = [c.x + Math.cos(t * c.sp + c.ph) * c.rad, 0.75, c.z + Math.sin(t * c.sp + c.ph) * c.rad];
      c.dot.position.set(...p);
      c.core.position.set(...p);
      c.dot.material.opacity = 0.6 + Math.sin(t * 2 + c.ph) * 0.3;
    });
  };
  return { group: g, anchors, update };
}

// ---------- Station 3: clean sites, work that's backed ----------
function shieldShape() {
  const s = new THREE.Shape();
  s.moveTo(0, 1.25);
  s.bezierCurveTo(0.45, 1.05, 0.8, 1.0, 1.05, 1.02);
  s.lineTo(1.05, 0.15);
  s.bezierCurveTo(1.05, -0.6, 0.5, -1.05, 0, -1.3);
  s.bezierCurveTo(-0.5, -1.05, -1.05, -0.6, -1.05, 0.15);
  s.lineTo(-1.05, 1.02);
  s.bezierCurveTo(-0.8, 1.0, -0.45, 1.05, 0, 1.25);
  return s;
}

function stationBacked(ctx) {
  const g = new THREE.Group();
  g.add(stage(10));
  const stack = new THREE.Group();
  const layer = (map, color, y, thick, rough) => {
    const m = mesh(new THREE.BoxGeometry(6.4, thick, 4.2), std(color, { map, roughness: rough }));
    m.userData.base = y;
    stack.add(m);
    return m;
  };
  const deck = layer(decking([1.4, 0.9]), 0xffffff, 0, 0.22, 0.85);
  const under = layer(underlay([1.6, 1]), 0xffffff, 0.2, 0.06, 0.6);
  const top = layer(shingles([2.6, 1.7]), 0xffffff, 0.34, 0.16, 0.78);
  // Rafters under the deck
  for (let x = -2.8; x <= 2.8; x += 1.4) {
    const raf = mesh(new THREE.BoxGeometry(0.18, 0.5, 4.4), std(0xb08455, { roughness: 0.9 }));
    raf.position.set(x, -0.38, 0);
    stack.add(raf);
  }
  stack.rotation.set(0.34, 0.62, 0);
  stack.position.set(-1.4, 2.0, 0.6);
  g.add(stack);

  // The warranty shield: gold metal with a check, slowly turning, with a glow behind
  const shield = new THREE.Group();
  const geo = new THREE.ExtrudeGeometry(shieldShape(), { depth: 0.3, bevelEnabled: true, bevelSize: 0.08, bevelThickness: 0.08, bevelSegments: 4 });
  geo.center();
  const body = mesh(geo, std(COL.gold, { metalness: 0.95, roughness: 0.22, envMapIntensity: 1.3 }));
  const inner = mesh(new THREE.ExtrudeGeometry(shieldShape(), { depth: 0.05, bevelEnabled: false }), std(COL.navy, { metalness: 0.3, roughness: 0.4 }), { cast: false });
  inner.geometry.center();
  inner.scale.set(0.8, 0.8, 1);
  inner.position.z = 0.24;
  const check = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(-0.42, 0.02, 0), new THREE.Vector3(-0.12, -0.3, 0), new THREE.Vector3(0.48, 0.38, 0)], false, 'catmullrom', 0.05), 40, 0.085, 12),
    std(COL.gold2, { metalness: 0.9, roughness: 0.2, emissive: COL.gold, emissiveIntensity: 0.25 })
  );
  check.position.z = 0.3;
  shield.add(body, inner, check);
  const halo = sprite(ctx.glow, COL.gold, 5.2, 0.4);
  halo.position.z = -0.4;
  shield.add(halo);
  shield.position.set(2.7, 5.0, -2.2);
  shield.scale.setScalar(1.0);
  g.add(shield);

  // Sparkles rising around the shield
  const sparks = [];
  const sr = rand(5);
  for (let i = 0; i < 26; i++) {
    const s = sprite(ctx.glow, COL.gold2, 0.22 + sr() * 0.25, 0);
    g.add(s);
    sparks.push({ s, x: 2.7 + (sr() - 0.5) * 3.4, z: -2.2 + (sr() - 0.5) * 2.4, ph: sr(), sp: 0.12 + sr() * 0.18 });
  }

  const tmp = new THREE.Vector3();
  const anchors = { 's3-top': new THREE.Vector3(), 's3-under': new THREE.Vector3(), 's3-deck': new THREE.Vector3(), 's3-shield': new THREE.Vector3() };
  const CYCLE = 9;
  const update = (t) => {
    // Apart, then together, hold, then apart again (with a stagger from the bottom up)
    const c = t % CYCLE;
    [deck, under, top].forEach((m, i) => {
      const join = smooth(0.4 + i * 0.35, 1.6 + i * 0.35, c) - smooth(6.6 + (2 - i) * 0.25, 7.8 + (2 - i) * 0.25, c);
      m.position.y = m.userData.base + (1 - join) * (0.9 + i * 0.75);
    });
    shield.rotation.y = Math.sin(t * 0.55) * 0.55;
    shield.position.y = 5.0 + Math.sin(t * 1.1) * 0.16;
    halo.material.opacity = 0.32 + Math.sin(t * 1.6) * 0.1;
    sparks.forEach((p) => {
      const k = (t * p.sp + p.ph) % 1;
      p.s.position.set(p.x, 3.2 + k * 4.2, p.z);
      p.s.material.opacity = Math.sin(k * Math.PI) * 0.85;
    });
    stack.updateMatrixWorld();
    const o = ctx.origin(3);
    anchors['s3-top'].copy(top.localToWorld(tmp.set(-1.6, 0.1, -2.1))).sub(o);
    anchors['s3-under'].copy(under.localToWorld(tmp.set(3.2, 0, -0.6))).sub(o);
    anchors['s3-deck'].copy(deck.localToWorld(tmp.set(3.2, -0.1, 1.6))).sub(o);
    anchors['s3-shield'].copy(shield.position).add(tmp.set(0, 1.9, 0));
  };
  return { group: g, anchors, update };
}

const BUILDERS = [stationInspect, stationExplain, stationLocal, stationBacked];

// ---------- The stage ----------
// createHowStage({ canvas, root, stations: [0..3], active, offices: [{ lon, lat }], still }) -> { setActive(i), start(), stop(), dispose() } or null without WebGL.
// `active` is the station shown first (no camera flight to it).
export function createHowStage({ canvas, root, stations = [0, 1, 2, 3], active: first, offices = [], still = false }) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch {
    return null;
  }
  const small = window.innerWidth < 900;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap; // PCFSoftShadowMap was removed in r18x; key.shadow.radius softens these

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(COL.deep, 34, 80);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;
  scene.environmentIntensity = 0.32;

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 200);
  const glowTex = glow();
  const origins = {};
  const ctx = { glow: glowTex, origin: (i) => origins[i] || new THREE.Vector3() };

  scene.add(new THREE.HemisphereLight(0xc9dcff, 0x0a1a2c, 0.62));
  const built = {};
  stations.forEach((i, n) => {
    const origin = new THREE.Vector3(i * SPACING, 0, 0);
    origins[i] = origin;
    const st = BUILDERS[i](ctx, offices);
    st.group.position.copy(origin);
    scene.add(st.group);
    // Each station has its own warm key light (only the active one casts shadows) and a cool rim light
    const key = new THREE.DirectionalLight(0xffe6c2, 2.4);
    key.position.copy(origin).add(new THREE.Vector3(9, 15, 8));
    key.target.position.copy(origin);
    key.shadow.mapSize.set(small ? 1024 : 2048, small ? 1024 : 2048);
    key.shadow.camera.left = key.shadow.camera.bottom = -13;
    key.shadow.camera.right = key.shadow.camera.top = 13;
    key.shadow.bias = -0.0004;
    key.shadow.radius = 4;
    const rim = new THREE.DirectionalLight(0x8fb6ff, 1.1);
    rim.position.copy(origin).add(new THREE.Vector3(-10, 6, -12));
    rim.target.position.copy(origin);
    scene.add(key, key.target, rim, rim.target);
    built[i] = { ...st, key, n };
  });

  // Labels in the page that follow 3D points: [data-anchor="s1-flashing"]
  const labels = [...root.querySelectorAll('[data-anchor]')].map((el) => ({ el, key: el.dataset.anchor, st: Number(el.dataset.anchor[1]) }));

  let active = stations.includes(first) ? first : stations[0];
  const view = (i) => {
    const o = origins[i];
    const v = VIEWS[i];
    return { pos: new THREE.Vector3(...v.pos).add(o), target: new THREE.Vector3(...v.target).add(o) };
  };
  let from = view(active), to = from, tStart = 0, tDur = 0;
  const camPos = from.pos.clone(), camTarget = from.target.clone();
  const pointer = new THREE.Vector2(), pointerEase = new THREE.Vector2();
  const setShadows = () => Object.entries(built).forEach(([i, b]) => (b.key.castShadow = Number(i) === active));
  setShadows();

  let w = 0, h = 0;
  const resize = () => {
    const r = canvas.parentElement.getBoundingClientRect();
    w = Math.max(1, r.width);
    h = Math.max(1, r.height);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Narrow frames: pull back a little so the station fits
    camera.fov = w / h < 0.9 ? 44 : 34;
    camera.updateProjectionMatrix();
    if (still || !running) frame(performance.now());
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas.parentElement);

  const v3 = new THREE.Vector3();
  const placeLabels = () => {
    for (const l of labels) {
      if (l.st !== active || !built[l.st]) continue;
      const p = built[l.st].anchors[l.key];
      if (!p) continue;
      v3.copy(p).add(origins[l.st]).project(camera);
      const behind = v3.z > 1;
      l.el.style.transform = `translate3d(${((v3.x + 1) / 2) * w}px, ${((1 - v3.y) / 2) * h}px, 0)`;
      l.el.toggleAttribute('data-off', behind);
    }
  };

  const clock = { t0: performance.now() };
  let running = false, raf = 0, last = performance.now();
  function frame(now) {
    const t = still ? 2.4 : (now - clock.t0) / 1000;
    for (const b of Object.values(built)) b.update(t);
    // Camera: fly between stations (a rising arc), then drift gently, with a little pointer parallax
    const k = tDur ? Math.min(1, (now - tStart) / tDur) : 1;
    const e = ease(k);
    camPos.lerpVectors(from.pos, to.pos, e);
    camTarget.lerpVectors(from.target, to.target, e);
    camPos.y += Math.sin(Math.PI * e) * (from === to ? 0 : 6);
    if (!still) {
      pointerEase.lerp(pointer, 0.05);
      camPos.x += Math.sin(t * 0.25) * 0.6 + pointerEase.x * 0.9;
      camPos.y += Math.cos(t * 0.2) * 0.3 - pointerEase.y * 0.5;
    }
    camera.position.copy(camPos);
    camera.lookAt(camTarget);
    renderer.render(scene, camera);
    placeLabels();
    last = now;
  }
  const loop = (now) => {
    raf = requestAnimationFrame(loop);
    if (now - last < 14) return; // about 60 fps at most
    frame(now);
  };

  const onPointer = (e) => {
    const r = root.getBoundingClientRect();
    pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
  };
  if (!still) root.addEventListener('pointermove', onPointer, { passive: true });

  resize();
  return {
    setActive(i) {
      if (i === active || !built[i]) return;
      from = { pos: camera.position.clone(), target: camTarget.clone() };
      to = view(i);
      active = i;
      setShadows();
      tStart = performance.now();
      tDur = still ? 0 : 1700;
      if (still || !running) frame(performance.now());
    },
    start() {
      if (running || still) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
    },
    dispose() {
      this.stop();
      ro.disconnect();
      root.removeEventListener('pointermove', onPointer);
      scene.traverse((o) => {
        o.geometry?.dispose?.();
        const m = o.material;
        (Array.isArray(m) ? m : m ? [m] : []).forEach((mm) => {
          mm.map?.dispose?.();
          mm.dispose?.();
        });
      });
      env.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.forceContextLoss?.();
    },
  };
}
