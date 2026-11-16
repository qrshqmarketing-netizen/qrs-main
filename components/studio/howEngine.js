// The "How we work" 3D stage (components/studio/HowStage.jsx; owner, October 20 2026: the section's AI photos replaced by 3D scenes; redrawn in
// more detail with a timed sequence per scene, owner, November 16 2026). Plain Three.js, fetched only when the section is about to scroll into
// view. Four stations, one per principle, built side by side in one scene; on wide screens the camera flies from station to station as the
// current principle changes, on phones each principle gets its own small stage with just its station. Each station plays a loop:
//   0  A roofer looks first. The price is in writing.   a home on its lot (lawn, driveway, trees, the truck, a ladder at the eave) with a roofer
//                                                       kneeling by the chimney with a tablet; the drone takes a lap, its scan grid and sweep line
//                                                       cross the front slope, and the two trouble spots it passes (the chimney flashing, lifted
//                                                       shingles) flash and get a ring. 12 s loop.
//   1  Clear answers. Plain English.                   a roof section with its gutter, drip edge, ridge caps, a chimney with step flashing and a
//                                                       cricket, a cracked vent boot and a skylight; a focus reticle locks onto each of the three
//                                                       spots in turn, the camera flashes and a photo card flies up to a stack. 10.5 s loop.
//   2  Family-owned. Local crews.                       the service area (data/serviceAreaOutline.js) as a 3D map on dark water, beacons and
//                                                       radar sweeps at the offices (OFFICES), arcs between them, and twelve small trucks driving
//                                                       short runs with their headlights on; every few seconds an office dispatches a light to the
//                                                       crew nearest it.
//   3  Clean sites. Work that's backed.                a roof built from the deck up in order: tarps drop over the bushes and the permit board goes
//                                                       up, four deck sheets land, the underlayment rolls out, the shingles are laid course by
//                                                       course, the ridge caps go on, the warranty shield pops in, then a magnetic sweeper rolls
//                                                       across the yard picking up the nails. Rewinds and repeats. 15.5 s loop.
// Every texture is drawn here on canvases (no image downloads). HTML labels in the stage ([data-anchor="s1-flashing"], HowStage.jsx) follow their
// 3D points: this file moves them each frame, hides the ones whose moment hasn't come (`hidden`) and marks the one in focus (`live`, data-live).
// Runs only while the stage is on screen and the tab is visible; `still` (reduced motion) draws one finished frame per station (`stillAt`).
// Brand colors: navy, gold, warm stucco.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { SERVICE_AREA_OUTLINE } from '@/data/serviceAreaOutline';

const COL = {
  gold: 0xd4b572, gold2: 0xf0d9a2, navy: 0x062d57, deep: 0x05182c, ground: 0x0a213d, stucco: 0xeee6d8, trim: 0xfaf7f1,
  charcoal: 0x30343b, brick: 0x8a5442, leaf: 0x2f5143, pine: 0x24473a, glassWarm: 0xffd7a0, metal: 0xa9b2bc, lawn: 0x1d4a39,
  asphalt: 0x262c34, tarp: 0x2a6db5, vest: 0xf2b134, skin: 0xc99a76, truck: 0xf4f1ea, water: 0x061a33, wood: 0xb08455,
};
const SPACING = 64; // world units between stations
const VIEWS = [
  { pos: [14, 9.4, 16], target: [0.2, 2.4, 0.4] },
  { pos: [10.5, 9.5, 14.5], target: [0.2, 2.2, -0.4] },
  { pos: [-2.4, 23, 17.5], target: [-2.8, 0, 0.6] },
  { pos: [10, 10.5, 14], target: [0.2, 2.6, 0.6] },
];
const PI = Math.PI;

const rand = (seed) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (x) => Math.min(1, Math.max(0, x));
// 0 before a, 1 after b, smooth between
const smooth = (a, b, t) => {
  const x = clamp01((t - a) / (b - a));
  return x * x * (3 - 2 * x);
};
// a pop with overshoot (0 → 1, past 1 and back)
const pop = (a, b, t) => {
  const x = clamp01((t - a) / (b - a));
  return 1 - Math.pow(1 - x, 3) * Math.cos(x * 4.2) * 1;
};
// a short spike at `at` lasting `len` (0 → 1 → 0)
const spike = (at, len, t) => {
  const x = (t - at) / len;
  return x < 0 || x > 1 ? 0 : Math.sin(x * PI);
};
const lerp = (a, b, k) => a + (b - a) * k;

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

// Decking: plywood with grain
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

// The drone's scan grid, projected on the roof
const scanGrid = () =>
  canvasTexture(256, 256, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    g.strokeStyle = 'rgba(240,217,162,.55)';
    g.lineWidth = 1.5;
    for (let i = 0; i <= w; i += 32) {
      g.beginPath();
      g.moveTo(i, 0);
      g.lineTo(i, h);
      g.moveTo(0, i);
      g.lineTo(w, i);
      g.stroke();
    }
    g.fillStyle = 'rgba(240,217,162,.9)';
    for (let x = 0; x <= w; x += 32) for (let y = 0; y <= h; y += 32) g.fillRect(x - 2, y - 2, 4, 4);
  }, [3, 1.4]);

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

// A thin ring for burst sprites
const ringTex = () =>
  canvasTexture(128, 128, (g, w, h) => {
    g.strokeStyle = 'rgba(255,255,255,1)';
    g.lineWidth = 5;
    g.beginPath();
    g.arc(w / 2, h / 2, w / 2 - 6, 0, PI * 2);
    g.stroke();
  });

// Four corner brackets: the camera's focus reticle
const reticleTex = () =>
  canvasTexture(128, 128, (g, w, h) => {
    g.strokeStyle = 'rgba(240,217,162,1)';
    g.lineWidth = 6;
    g.lineCap = 'round';
    const s = 30;
    for (const [x, y, dx, dy] of [[8, 8, 1, 1], [w - 8, 8, -1, 1], [8, h - 8, 1, -1], [w - 8, h - 8, -1, -1]]) {
      g.beginPath();
      g.moveTo(x, y + dy * s);
      g.lineTo(x, y);
      g.lineTo(x + dx * s, y);
      g.stroke();
    }
    g.fillStyle = 'rgba(240,217,162,.9)';
    g.fillRect(w / 2 - 3, h / 2 - 3, 6, 6);
  });

// A photo card: a white print with a picture of the spot and its number (`n`), `tint` the picture's main color
const photoTex = (n, tint) =>
  canvasTexture(256, 196, (g, w, h) => {
    g.fillStyle = '#fbf8f2';
    g.fillRect(0, 0, w, h);
    const grad = g.createLinearGradient(0, 14, 0, h - 40);
    grad.addColorStop(0, '#6f8fb3');
    grad.addColorStop(0.45, '#3f5b7a');
    grad.addColorStop(0.46, tint);
    grad.addColorStop(1, '#2c3238');
    g.fillStyle = grad;
    g.fillRect(14, 14, w - 28, h - 54);
    g.strokeStyle = 'rgba(0,0,0,.25)';
    for (let y = h * 0.5; y < h - 40; y += 11) {
      g.beginPath();
      g.moveTo(14, y);
      g.lineTo(w - 14, y);
      g.stroke();
    }
    g.fillStyle = 'rgba(240,217,162,.95)';
    g.beginPath();
    g.arc(w * 0.5, h * 0.52, 9, 0, PI * 2);
    g.fill();
    g.strokeStyle = 'rgba(240,217,162,.9)';
    g.lineWidth = 3;
    g.beginPath();
    g.arc(w * 0.5, h * 0.52, 18, 0, PI * 2);
    g.stroke();
    g.fillStyle = '#0b2440';
    g.font = '700 22px sans-serif';
    g.fillText(String(n), 16, h - 14);
    g.fillStyle = '#9aa3ad';
    g.fillRect(44, h - 30, 120, 6);
    g.fillRect(44, h - 18, 70, 6);
  });

// The permit board: a document with lines and a gold check (no words, so it reads in any language)
const permitTex = () =>
  canvasTexture(128, 160, (g, w, h) => {
    g.fillStyle = '#fbf8f2';
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#0b2440';
    g.fillRect(0, 0, w, 22);
    g.fillStyle = '#b9c0c8';
    for (let y = 36; y < 96; y += 14) g.fillRect(14, y, w - 28 - (y % 28 ? 20 : 0), 6);
    g.strokeStyle = '#d4b572';
    g.lineWidth = 6;
    g.beginPath();
    g.arc(w / 2, 124, 22, 0, PI * 2);
    g.stroke();
    g.lineWidth = 7;
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(w / 2 - 11, 124);
    g.lineTo(w / 2 - 3, 132);
    g.lineTo(w / 2 + 12, 115);
    g.stroke();
  });

// A radar sweep: a wedge that fades along its trailing edge and outward (conic gradient where the browser has it)
const sweepTex = () =>
  canvasTexture(256, 256, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    if (g.createConicGradient) {
      const grad = g.createConicGradient(0, w / 2, h / 2);
      grad.addColorStop(0, 'rgba(240,217,162,0)');
      grad.addColorStop(0.2, 'rgba(240,217,162,.75)');
      grad.addColorStop(0.2001, 'rgba(240,217,162,0)');
      grad.addColorStop(1, 'rgba(240,217,162,0)');
      g.fillStyle = grad;
    } else g.fillStyle = 'rgba(240,217,162,.3)';
    g.beginPath();
    g.arc(w / 2, h / 2, w / 2, 0, PI * 2);
    g.fill();
    g.globalCompositeOperation = 'destination-in';
    const fade = g.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w / 2);
    fade.addColorStop(0, 'rgba(0,0,0,1)');
    fade.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = fade;
    g.fillRect(0, 0, w, h);
  });

// ---------- Small builders ----------
const std = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.82, metalness: 0, ...extra });
const basic = (color, extra = {}) => new THREE.MeshBasicMaterial({ color, transparent: true, depthWrite: false, ...extra });
function mesh(geo, mat, { cast = true, receive = true } = {}) {
  const m = new THREE.Mesh(geo, mat);
  m.castShadow = cast;
  m.receiveShadow = receive;
  return m;
}
function box(w, h, d, mat, x = 0, y = 0, z = 0, opts) {
  const m = mesh(new THREE.BoxGeometry(w, h, d), mat, opts);
  m.position.set(x, y, z);
  return m;
}
function sprite(tex, color, size, opacity = 1, blending = THREE.AdditiveBlending) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color, transparent: true, opacity, depthWrite: false, blending }));
  s.scale.set(size, size, 1);
  return s;
}
function stage(radius = 11) {
  const g = new THREE.Group();
  const floor = mesh(new THREE.CircleGeometry(radius, 96), std(COL.ground, { roughness: 0.95 }), { cast: false });
  floor.rotation.x = -PI / 2;
  g.add(floor);
  for (const r of [radius * 0.42, radius * 0.7, radius * 0.97]) {
    const ring = new THREE.Mesh(new THREE.RingGeometry(r - 0.025, r + 0.025, 160), basic(COL.gold, { opacity: 0.16 }));
    ring.rotation.x = -PI / 2;
    ring.position.y = 0.01;
    g.add(ring);
  }
  return g;
}
// A flat ring lying on the ground (or a slope): pulses out
function groundRing(color = COL.gold2) {
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.26, 40), basic(color, { side: THREE.DoubleSide }));
  ring.rotation.x = -PI / 2;
  return ring;
}

// A gable house: walls, two shingled slopes, gable ends, ridge cap, fascia and gutters with downspouts, lit windows and a door on the front
// (+z), a step, a chimney through the front slope with its flashing skirt, a pipe vent with its boot and a patch of lifted shingles.
// Returns the group and `roofY(z)`, the height of the front slope's surface at z, plus the slope angle.
function house({ w = 7, d = 5, h = 3.2, rise = 2.2, roofTex }) {
  const g = new THREE.Group();
  const half = d / 2 + 0.35;
  const slope = Math.hypot(half, rise);
  const angle = Math.atan2(rise, half);
  const roofY = (z) => h + rise * (1 - Math.abs(z) / half) + 0.1;
  g.add(box(w, h, d, std(COL.stucco, { roughness: 0.9 }), 0, h / 2, 0));
  for (const s of [1, -1]) {
    const roof = mesh(new THREE.BoxGeometry(w + 0.8, 0.12, slope), std(0xffffff, { map: roofTex, roughness: 0.78 }));
    roof.rotation.x = s * angle;
    roof.position.set(0, h + rise / 2 + 0.04, (s * half) / 2);
    g.add(roof);
    g.add(box(w + 0.85, 0.22, 0.08, std(COL.trim), 0, h - 0.02, s * (half + 0.02)));
    // gutter (a half pipe) and its downspouts at the corners
    const gutter = mesh(new THREE.CylinderGeometry(0.11, 0.11, w + 0.9, 14, 1, true, 0, PI), std(COL.metal, { metalness: 0.6, roughness: 0.4, side: THREE.DoubleSide }), { cast: false });
    gutter.rotation.z = PI / 2;
    gutter.rotation.y = s > 0 ? 0 : PI;
    gutter.position.set(0, h - 0.18, s * (half + 0.12));
    g.add(gutter);
    for (const sx of [1, -1]) {
      const pipe = mesh(new THREE.CylinderGeometry(0.06, 0.06, h - 0.3, 10), std(COL.metal, { metalness: 0.6, roughness: 0.4 }), { cast: false });
      pipe.position.set(sx * (w / 2 + 0.42), (h - 0.3) / 2, s * (half + 0.12));
      g.add(pipe);
    }
  }
  const tri = new THREE.Shape();
  tri.moveTo(-d / 2, 0);
  tri.lineTo(0, rise);
  tri.lineTo(d / 2, 0);
  tri.closePath();
  for (const s of [1, -1]) {
    const gable = mesh(new THREE.ShapeGeometry(tri), std(COL.stucco, { roughness: 0.9, side: THREE.DoubleSide }));
    gable.rotation.y = PI / 2;
    gable.position.set((s * w) / 2, h, 0);
    g.add(gable);
  }
  g.add(box(w + 0.85, 0.16, 0.34, std(COL.charcoal, { roughness: 0.7 }), 0, h + rise + 0.08, 0));
  const glassMat = std(0x1c2a3a, { emissive: COL.glassWarm, emissiveIntensity: 0.55, roughness: 0.25, metalness: 0.1 });
  for (const x of [-2.2, 2.2]) {
    g.add(box(1.26, 1.2, 0.05, std(COL.trim), x, h * 0.55, d / 2 + 0.005, { cast: false }));
    g.add(box(1.1, 1.05, 0.08, glassMat, x, h * 0.55, d / 2 + 0.02, { cast: false }));
    g.add(box(0.06, 1.05, 0.1, std(COL.trim), x, h * 0.55, d / 2 + 0.03, { cast: false }));
  }
  g.add(box(1.1, 2.0, 0.08, std(COL.trim), 0, 1.0, d / 2 + 0.01, { cast: false }));
  g.add(box(0.95, 1.9, 0.08, std(COL.navy, { roughness: 0.5 }), 0, 0.95, d / 2 + 0.03, { cast: false }));
  g.add(box(1.5, 0.16, 0.7, std(0x9a9892), 0, 0.08, d / 2 + 0.4, { cast: false }));
  // side windows on the gable ends
  for (const s of [1, -1]) {
    g.add(box(0.05, 1.0, 1.1, std(COL.trim), s * (w / 2 + 0.005), h * 0.55, 0, { cast: false }));
    g.add(box(0.08, 0.9, 0.95, glassMat, s * (w / 2 + 0.02), h * 0.55, 0, { cast: false }));
  }
  // chimney through the front slope, with a flashing skirt and a cap
  const cz = 0.9, cx = 1.9;
  const chimney = box(0.8, 2.1, 0.8, std(COL.brick, { roughness: 0.95 }), cx, roofY(cz) + 0.55, cz);
  g.add(chimney);
  g.add(box(1.0, 0.12, 1.0, std(COL.trim), cx, roofY(cz) + 1.66, cz));
  const skirt = box(1.1, 0.05, 1.1, std(COL.metal, { metalness: 0.7, roughness: 0.35 }), cx, roofY(cz) + 0.02, cz, { cast: false });
  skirt.rotation.x = angle;
  g.add(skirt);
  // pipe vent with its boot
  const px = -1.1, pz = 1.7;
  const boot = mesh(new THREE.ConeGeometry(0.3, 0.26, 20), std(0x16191d, { roughness: 0.6 }));
  boot.position.set(px, roofY(pz) + 0.1, pz);
  boot.rotation.x = angle;
  g.add(boot);
  g.add(box(0.22, 0.6, 0.22, std(COL.metal, { metalness: 0.7, roughness: 0.35 }), px, roofY(pz) + 0.36, pz));
  // lifted shingles: three tabs sticking up near the eave
  const lx = -2.5, lz = 2.3;
  for (const [dx, dz, lift] of [[0, 0, 0.42], [0.5, 0.12, 0.3], [-0.45, 0.2, 0.36]]) {
    const tab = box(0.55, 0.035, 0.42, std(0x4a4f57, { roughness: 0.8 }), lx + dx, roofY(lz + dz) + 0.1, lz + dz);
    tab.rotation.x = angle - lift;
    g.add(tab);
  }
  return { group: g, roofY, angle, spots: { chimney: [cx, roofY(cz) + 0.1, cz + 0.6], lifted: [lx, roofY(lz) + 0.12, lz] } };
}

function tree(kind, x, z, s = 1) {
  const g = new THREE.Group();
  const trunk = mesh(new THREE.CylinderGeometry(0.12 * s, 0.18 * s, 1.1 * s, 8), std(0x5a3f2c, { roughness: 1 }));
  trunk.position.y = 0.55 * s;
  g.add(trunk);
  if (kind === 'pine') {
    const mat = std(COL.pine, { roughness: 1, flatShading: true });
    for (let i = 0; i < 3; i++) {
      const c = mesh(new THREE.ConeGeometry((1.3 - i * 0.3) * s, 1.4 * s, 9), mat);
      c.position.y = (1.3 + i * 0.85) * s;
      g.add(c);
    }
  } else {
    const c = mesh(new THREE.IcosahedronGeometry(1.25 * s, 1), std(COL.leaf, { roughness: 1, flatShading: true }));
    c.position.y = 1.9 * s;
    c.scale.y = 0.85;
    g.add(c);
  }
  g.position.set(x, 0, z);
  return g;
}
function bushes(g, spots) {
  const mat = std(COL.leaf, { roughness: 1, flatShading: true });
  const out = [];
  for (const [x, z, s] of spots) {
    const b = mesh(new THREE.IcosahedronGeometry(s, 0), mat);
    b.position.set(x, s * 0.7, z);
    g.add(b);
    out.push(b);
  }
  return out;
}

// A pickup truck: white body with a gold stripe, cab glass, wheels and lights (also used small for the crews on the map)
function truck(scale = 1, simple = false) {
  const g = new THREE.Group();
  const body = std(COL.truck, { roughness: 0.45, metalness: 0.1 });
  g.add(box(1.7, 0.55, 3.6, body, 0, 0.62, 0));
  g.add(box(1.62, 0.6, 1.5, body, 0, 1.15, 0.55));
  g.add(box(1.5, 0.42, 1.2, std(0x1c2a3a, { roughness: 0.2, metalness: 0.2 }), 0, 1.2, 0.55, { cast: false }));
  g.add(box(1.72, 0.1, 3.62, std(COL.gold, { metalness: 0.5, roughness: 0.4 }), 0, 0.62, 0, { cast: false }));
  const wheel = std(0x15181c, { roughness: 0.8 });
  if (simple) {
    // the crews on the map: one axle bar per pair of wheels, no lights (they get a headlight sprite)
    for (const z of [1.1, -1.2]) {
      const axle = mesh(new THREE.CylinderGeometry(0.36, 0.36, 1.88, 12), wheel, { cast: false });
      axle.rotation.z = PI / 2;
      axle.position.set(0, 0.36, z);
      g.add(axle);
    }
    g.scale.setScalar(scale);
    return g;
  }
  g.add(box(1.5, 0.3, 1.4, std(0x222831, { roughness: 0.9 }), 0, 1.02, -1.0, { cast: false }));
  for (const [x, z] of [[0.8, 1.1], [-0.8, 1.1], [0.8, -1.2], [-0.8, -1.2]]) {
    const wh = mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.28, 18), wheel);
    wh.rotation.z = PI / 2;
    wh.position.set(x, 0.36, z);
    g.add(wh);
  }
  const lamp = std(0xfff2cc, { emissive: 0xfff2cc, emissiveIntensity: 1.2 });
  g.add(box(0.3, 0.16, 0.06, lamp, 0.55, 0.7, 1.82, { cast: false }), box(0.3, 0.16, 0.06, lamp, -0.55, 0.7, 1.82, { cast: false }));
  const tail = std(0xd33, { emissive: 0xd33, emissiveIntensity: 0.9 });
  g.add(box(0.26, 0.12, 0.06, tail, 0.6, 0.7, -1.82, { cast: false }), box(0.26, 0.12, 0.06, tail, -0.6, 0.7, -1.82, { cast: false }));
  g.scale.setScalar(scale);
  return g;
}

// A roofer kneeling on the slope: boots, legs, a gold safety vest over a navy shirt, arms holding a tablet, head and a white hard hat
function roofer() {
  const g = new THREE.Group();
  const figure = new THREE.Group();
  const navy = std(0x1b3556, { roughness: 0.9 }), vest = std(COL.vest, { roughness: 0.7 }), skin = std(COL.skin, { roughness: 0.9 });
  figure.add(box(0.5, 0.26, 0.5, std(0x2c2420, { roughness: 1 }), 0, 0.13, -0.12)); // folded legs
  figure.add(box(0.46, 0.5, 0.3, vest, 0, 0.55, 0));
  figure.add(box(0.5, 0.08, 0.34, navy, 0, 0.76, 0)); // shoulders
  const armL = box(0.1, 0.34, 0.1, navy, -0.3, 0.52, 0.1);
  armL.rotation.x = -0.9;
  const armR = box(0.1, 0.34, 0.1, navy, 0.3, 0.52, 0.1);
  armR.rotation.x = -0.9;
  figure.add(armL, armR);
  const tablet = box(0.4, 0.28, 0.025, std(0x101418, { roughness: 0.3, metalness: 0.3 }), 0, 0.46, 0.33, { cast: false });
  tablet.rotation.x = -0.5;
  const screen = box(0.34, 0.22, 0.01, std(0x1c2a3a, { emissive: 0x8fd0ff, emissiveIntensity: 0.9 }), 0, 0.465, 0.35, { cast: false });
  screen.rotation.x = -0.5;
  figure.add(tablet, screen);
  const head = new THREE.Group();
  head.add(mesh(new THREE.SphereGeometry(0.15, 16, 12), skin));
  const hat = mesh(new THREE.SphereGeometry(0.17, 16, 10, 0, PI * 2, 0, PI / 2), std(COL.trim, { roughness: 0.4 }));
  hat.position.y = 0.04;
  const brim = mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.03, 18), std(COL.trim, { roughness: 0.4 }), { cast: false });
  brim.position.y = 0.04;
  head.add(hat, brim);
  head.position.y = 0.95;
  figure.add(head);
  g.add(figure);
  return { group: g, figure, head };
}

function ladder(len = 3.9) {
  const g = new THREE.Group();
  const rail = std(0xb9c1c8, { metalness: 0.7, roughness: 0.35 });
  for (const x of [-0.22, 0.22]) g.add(box(0.06, len, 0.06, rail, x, len / 2, 0));
  for (let y = 0.3; y < len; y += 0.42) g.add(box(0.4, 0.05, 0.05, rail, 0, y, 0, { cast: false }));
  return g;
}

function drone(ctx) {
  const g = new THREE.Group();
  const dark = std(0x1a1d22, { roughness: 0.4, metalness: 0.3 });
  g.add(box(0.7, 0.16, 0.5, dark));
  const dome = mesh(new THREE.SphereGeometry(0.2, 20, 12, 0, PI * 2, 0, PI / 2), std(COL.trim, { roughness: 0.3 }));
  dome.position.y = 0.08;
  g.add(dome);
  // camera gimbal under the nose
  const gimbal = mesh(new THREE.SphereGeometry(0.1, 12, 8), dark);
  gimbal.position.set(0, -0.14, 0.2);
  const lens = mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.1, 12), std(0x0d2a4a, { roughness: 0.1, metalness: 0.5, emissive: 0x2a6db5, emissiveIntensity: 0.4 }), { cast: false });
  lens.rotation.x = PI / 2 - 0.6;
  lens.position.set(0, -0.19, 0.27);
  g.add(gimbal, lens);
  const rotors = [];
  for (const [x, z] of [[0.55, 0.45], [-0.55, 0.45], [0.55, -0.45], [-0.55, -0.45]]) {
    const arm = box(0.62, 0.05, 0.06, dark, x / 2, 0.02, z / 2);
    arm.rotation.y = -Math.atan2(z, x);
    g.add(arm);
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.012, 28), basic(0xffffff, { opacity: 0.22 }));
    disc.position.set(x, 0.1, z);
    g.add(disc);
    const blade = box(0.56, 0.01, 0.05, dark, x, 0.11, z, { cast: false });
    g.add(blade);
    rotors.push(blade);
  }
  const led = sprite(ctx.glow, COL.gold, 0.7, 0.9);
  led.position.y = -0.1;
  g.add(led);
  const tail = sprite(ctx.glow, 0xff5b4f, 0.35, 0.9);
  tail.position.set(0, 0.05, -0.3);
  g.add(tail);
  return { group: g, rotors, led, tail };
}

// ---------- Station 0: a roofer looks first ----------
function stationInspect(ctx) {
  const g = new THREE.Group();
  g.add(stage(12));
  const lawn = mesh(new THREE.CircleGeometry(9.6, 72), std(COL.lawn, { roughness: 1 }), { cast: false });
  lawn.rotation.x = -PI / 2;
  lawn.position.y = 0.02;
  g.add(lawn);
  g.add(box(3.4, 0.06, 9.0, std(COL.asphalt, { roughness: 0.95 }), 5.7, 0.03, 4.2, { cast: false }));
  g.add(box(1.1, 0.06, 3.6, std(0x7d7a73, { roughness: 0.95 }), 0, 0.03, 4.6, { cast: false }));
  const { group: home, roofY, angle, spots } = house({ roofTex: shingles([3.2, 1.6]) });
  g.add(home);
  bushes(g, [[-4.8, 3.6, 0.55], [-3.9, 4.0, 0.4], [3.2, 3.7, 0.42], [4.6, -3.2, 0.5], [-5.1, -3.0, 0.6], [1.6, 3.5, 0.32]]);
  g.add(tree('pine', -7.2, -2.4, 1.1), tree('pine', 7.6, -5.4, 0.95), tree('round', -6.6, 4.6, 0.9), tree('round', 8.2, -1.2, 0.8));
  const pickup = truck(0.78);
  pickup.position.set(6.1, 0, 5.2);
  pickup.rotation.y = PI; // nose toward the house
  g.add(pickup);
  const lad = ladder(3.9);
  lad.rotation.x = Math.atan2(1.0, 3.4);
  lad.position.set(-2.3, 0.05, 4.25);
  g.add(lad);

  // the roofer kneels on the front slope by the chimney and looks up at the drone now and then
  const r = roofer();
  r.group.rotation.x = angle;
  r.group.position.set(0.7, roofY(1.3), 1.3);
  r.figure.rotation.y = -0.6;
  g.add(r.group);

  const d = drone(ctx);
  g.add(d.group);
  const spot = new THREE.SpotLight(COL.gold2, 34, 14, 0.4, 0.65, 1.3);
  spot.castShadow = false;
  g.add(spot, spot.target);
  const cone = new THREE.Mesh(new THREE.ConeGeometry(1.6, 4, 48, 1, true), basic(COL.gold, { opacity: 0.08, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }));
  g.add(cone);

  // the scan grid and sweep line projected on the front slope
  const slope = Math.hypot(2.85, 2.2);
  const n = new THREE.Vector3(0, Math.cos(angle), Math.sin(angle));
  const grid = new THREE.Mesh(new THREE.PlaneGeometry(7.6, slope - 0.2), basic(COL.gold2, { map: scanGrid(), opacity: 0, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }));
  grid.rotation.x = angle - PI / 2;
  grid.position.set(0, 3.2 + 1.1 + 0.04, 2.85 / 2).addScaledVector(n, 0.12);
  g.add(grid);
  const line = new THREE.Mesh(new THREE.PlaneGeometry(7.8, 0.14), basic(0xfff1cf, { opacity: 0, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }));
  line.rotation.x = angle - PI / 2;
  g.add(line);
  const down = new THREE.Vector3(0, -Math.sin(angle), Math.cos(angle)); // down the front slope
  const ridge = new THREE.Vector3(0, 3.2 + 2.2 + 0.16, 0);

  // the two trouble spots: a flash and a ring that pulses out when the drone passes
  const found = [spots.chimney, spots.lifted].map((p) => {
    const flash = sprite(ctx.glow, 0xffffff, 2.6, 0);
    flash.position.set(...p);
    const ring = groundRing();
    ring.rotation.x = angle - PI / 2;
    ring.position.set(...p).addScaledVector(n, 0.06);
    ring.material.opacity = 0;
    const halo = sprite(ctx.glow, COL.gold, 1.0, 0);
    halo.position.set(...p);
    g.add(flash, ring, halo);
    return { flash, ring, halo, p: new THREE.Vector3(...p) };
  });

  const CYCLE = 8;
  const FOUND = [1.55, 2.6]; // when the drone passes each spot (its lap is one cycle, starting at +x)
  const anchors = { 's0-drone': new THREE.Vector3(), 's0-roof': new THREE.Vector3(), 's0-spot': found[1].p.clone().add(new THREE.Vector3(0, 0.5, 0)) };
  const hidden = new Set(['s0-spot']);
  const tmp = new THREE.Vector3();
  const update = (t) => {
    const c = t % CYCLE;
    const a = (c / CYCLE) * PI * 2;
    const dp = d.group.position;
    dp.set(Math.cos(a) * 5.4, 6.7 + Math.sin(t * 1.3) * 0.22 - Math.max(0, Math.sin(a)) * 0.7, Math.sin(a) * 4.6);
    d.group.rotation.y = -a + PI / 2;
    d.group.rotation.z = Math.sin(t * 1.1) * 0.06;
    d.group.rotation.x = -0.12;
    d.rotors.forEach((rt, i) => (rt.rotation.y = t * 38 + i));
    const below = tmp.set(dp.x * 0.55, 4.3, dp.z * 0.5);
    spot.position.copy(dp);
    spot.target.position.copy(below);
    cone.position.copy(dp).add(below).multiplyScalar(0.5);
    cone.lookAt(dp);
    cone.rotateX(PI / 2);
    d.led.material.opacity = 0.55 + Math.sin(t * 6) * 0.35;
    d.tail.material.opacity = (Math.sin(t * 9) > 0.3 ? 1 : 0.1);
    // scanning while the drone is over the front slope: the grid shows and the line sweeps down the slope twice
    const front = Math.max(0, Math.sin(a));
    grid.material.opacity = front * 0.5;
    grid.material.map.offset.set(t * 0.05, -t * 0.08);
    const s = ((c * 0.6) % 1) * (slope - 0.1);
    line.position.copy(ridge).addScaledVector(down, s).addScaledVector(n, 0.14);
    line.material.opacity = front * 0.9;
    found.forEach((f, i) => {
      const at = FOUND[i];
      f.flash.material.opacity = spike(at, 0.35, c) * 0.95;
      const k = clamp01((c - at) / 1.6);
      f.ring.scale.setScalar(1 + k * 3.4);
      f.ring.material.opacity = c >= at ? (1 - k) * 0.9 : 0;
      f.halo.material.opacity = c >= at + 0.2 ? 0.55 + Math.sin(t * 4 + i) * 0.3 : 0;
    });
    if (c > FOUND[1] + 0.3 && c < CYCLE - 0.4) hidden.delete('s0-spot');
    else hidden.add('s0-spot');
    // the roofer glances up at the drone, then back at the tablet
    const look = smooth(0.8, 1.3, c) - smooth(3.2, 3.8, c);
    r.head.rotation.x = -0.55 * look;
    r.head.rotation.y = lerp(0, Math.atan2(dp.x - r.group.position.x, dp.z - r.group.position.z) - r.figure.rotation.y, look) * 0.6;
    anchors['s0-drone'].copy(dp).add(tmp.set(0, 0.7, 0));
    anchors['s0-roof'].copy(r.group.position).add(tmp.set(0, 1.5, 0.2));
  };
  return { group: g, anchors, hidden, update, stillAt: 3.4 };
}

// ---------- Station 1: clear answers, plain English ----------
function stationExplain(ctx) {
  const g = new THREE.Group();
  g.add(stage(10));
  const tex = shingles([4, 2.4]);
  const roof = new THREE.Group();
  const TILT = 0.32; // the near (+z) edge is the eave, the far edge the ridge
  roof.add(box(10, 0.2, 6.4, std(0xffffff, { map: tex, roughness: 0.78 })));
  const metal = std(COL.metal, { metalness: 0.75, roughness: 0.32 });
  // eave: drip edge and a gutter; ridge: a row of caps
  roof.add(box(10.2, 0.05, 0.3, metal, 0, 0.11, 3.1, { cast: false }));
  const gutter = mesh(new THREE.CylinderGeometry(0.17, 0.17, 10.3, 14, 1, true, 0, PI), std(COL.metal, { metalness: 0.6, roughness: 0.4, side: THREE.DoubleSide }), { cast: false });
  gutter.rotation.z = PI / 2;
  gutter.position.set(0, -0.06, 3.38);
  roof.add(gutter);
  for (let x = -4.75; x <= 4.75; x += 0.5) roof.add(box(0.46, 0.09, 0.6, std(0x3a3f47, { roughness: 0.75 }), x, 0.14, -3.05));
  // chimney, upright on the slope, with step flashing up both sides, a skirt and a cricket behind it
  const brick = std(COL.brick, { roughness: 0.95 });
  const chimney = box(1.1, 2.3, 1.1, brick, -2.6, 1.0, -0.6);
  chimney.rotation.x = -TILT;
  roof.add(chimney);
  const cap = box(1.3, 0.14, 1.3, std(COL.trim), -2.6, 2.17, -0.95);
  cap.rotation.x = -TILT;
  roof.add(cap);
  roof.add(box(1.5, 0.08, 1.5, metal, -2.6, 0.13, -0.6, { cast: false }));
  for (let i = 0; i < 4; i++)
    for (const sx of [-1, 1]) {
      const step = box(0.05, 0.3, 0.42, metal, -2.6 + sx * 0.58, 0.28 + i * 0.03, -0.1 - i * 0.3, { cast: false });
      step.rotation.x = -TILT;
      roof.add(step);
    }
  const cricket = box(1.1, 0.5, 0.5, std(0xffffff, { map: tex, roughness: 0.78 }), -2.6, 0.3, -1.4);
  cricket.rotation.x = -0.6;
  roof.add(cricket);
  // vent pipe with a cracked rubber boot
  const boot = mesh(new THREE.ConeGeometry(0.45, 0.4, 24), std(0x16191d, { roughness: 0.6 }));
  boot.position.set(1.4, 0.3, 1.2);
  roof.add(boot);
  const crack = box(0.5, 0.03, 0.04, std(0x05070a), 1.42, 0.36, 1.45, { cast: false });
  crack.rotation.z = 0.35;
  crack.rotation.x = -0.6;
  roof.add(crack);
  const pipe = mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.95, 20), metal);
  pipe.position.set(1.4, 0.65, 1.2);
  pipe.rotation.x = -TILT;
  roof.add(pipe);
  // skylight on a curb with its flashing
  roof.add(box(1.9, 0.06, 1.5, metal, 2.9, 0.13, -1.3, { cast: false }));
  roof.add(box(1.6, 0.3, 1.2, std(COL.trim), 2.9, 0.26, -1.3));
  roof.add(box(1.4, 0.06, 1.0, std(0x9cc3e6, { roughness: 0.08, metalness: 0.4, envMapIntensity: 1.4 }), 2.9, 0.44, -1.3, { cast: false }));
  roof.rotation.x = TILT;
  roof.position.y = 1.2;
  g.add(roof);
  const wall = box(9.2, 0.6, 5.4, std(0x3b4657, { roughness: 0.9 }), 0, 0.3, 0);
  g.add(wall);

  // the three spots: a stem, a glowing head and a ring on the roof; the one in focus burns brighter
  const pins = [];
  const markerAt = (x, y, z) => {
    const p = new THREE.Group();
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.3, 8), basic(COL.gold, { opacity: 0.85 }));
    stem.position.y = 0.65;
    const head = mesh(new THREE.SphereGeometry(0.16, 20, 14), std(COL.gold, { emissive: COL.gold, emissiveIntensity: 0.9, metalness: 0.4, roughness: 0.3 }), { cast: false });
    head.position.y = 1.35;
    const halo = sprite(ctx.glow, COL.gold, 1.1, 0.8);
    halo.position.y = 1.35;
    const ring = groundRing();
    ring.position.y = 0.05;
    p.add(stem, head, halo, ring);
    p.position.set(x, y, z);
    roof.add(p);
    pins.push({ p, ring, halo, head });
    return p;
  };
  const spots = [markerAt(-2.6, 2.3, 0.1), markerAt(1.4, 0.9, 1.2), markerAt(2.9, 0.5, -1.3)];
  const KEYS = ['s1-flashing', 's1-boot', 's1-skylight'];

  // the focus reticle, the flash and three photo cards that fly up to a stack
  const reticle = sprite(reticleTex(), 0xffffff, 2.4, 0, THREE.NormalBlending);
  const flash = sprite(ctx.glow, 0xffffff, 4, 0);
  g.add(reticle, flash);
  const cards = ['#8a5442', '#16191d', '#9cc3e6'].map((tint, i) => {
    const s = sprite(photoTex(i + 1, tint), 0xffffff, 1.5, 0, THREE.NormalBlending);
    s.center.set(0.5, 0.5);
    g.add(s);
    return s;
  });
  const stackAt = (i) => new THREE.Vector3(4.2 + i * 0.22, 5.4 - i * 0.1, -3.2 + i * 0.3);

  const CYCLE = 8.2, STEP = 1.7, START = 0.3;
  const tmp = new THREE.Vector3(), world = new THREE.Vector3();
  const anchors = { 's1-flashing': new THREE.Vector3(), 's1-boot': new THREE.Vector3(), 's1-skylight': new THREE.Vector3() };
  const hidden = new Set();
  let live = null;
  const update = (t) => {
    const c = t % CYCLE;
    roof.updateMatrixWorld();
    const o = ctx.origin(1);
    live = null;
    let reticleOn = 0;
    pins.forEach(({ p, ring, halo, head }, i) => {
      const start = START + i * STEP;
      const focus = c >= start && c < start + STEP ? 1 : 0;
      const k = (t * 0.8 + i * 0.33) % 1;
      ring.scale.setScalar(1 + k * (focus ? 3.6 : 2.4));
      ring.material.opacity = (1 - k) * (focus ? 0.95 : 0.4);
      halo.material.opacity = (focus ? 0.8 : 0.3) + Math.sin(t * 3 + i) * 0.15;
      head.material.emissiveIntensity = focus ? 1.6 : 0.6;
      p.localToWorld(world.set(0, 1.5, 0)).sub(o);
      anchors[KEYS[i]].copy(world);
      if (focus) {
        live = KEYS[i];
        // lock on: the reticle shrinks onto the spot over 0.8 s, the flash fires at 0.9, the card flies up from 1.0 to 1.9
        const lock = smooth(start, start + 0.6, c);
        p.localToWorld(world.set(0, 1.35, 0)).sub(o);
        reticle.position.copy(world);
        reticle.scale.setScalar(lerp(3.2, 1.3, lock));
        reticle.material.rotation = (1 - lock) * 0.6;
        reticleOn = smooth(start, start + 0.2, c) * (1 - smooth(start + 0.8, start + 1.0, c));
        flash.position.copy(world);
        flash.material.opacity = spike(start + 0.7, 0.3, c) * 0.9;
        const fly = smooth(start + 0.8, start + 1.5, c);
        const card = cards[i];
        card.position.lerpVectors(world, stackAt(i), fly);
        card.position.y += Math.sin(fly * PI) * 1.4;
        card.material.opacity = c >= start + 0.75 ? 1 : 0;
        card.scale.setScalar(lerp(0.4, 1.5, fly));
        card.material.rotation = lerp(0, -0.12 + i * 0.1, fly);
      } else if (c >= start + STEP) {
        // keep the card on the stack until the end of the cycle, where the stack fades
        cards[i].position.copy(stackAt(i));
        cards[i].scale.setScalar(1.5);
        cards[i].material.rotation = -0.12 + i * 0.1;
        cards[i].material.opacity = 1 - smooth(CYCLE - 0.9, CYCLE - 0.15, c);
      } else cards[i].material.opacity = 0;
    });
    reticle.material.opacity = reticleOn;
  };
  return { group: g, anchors, hidden, update, live: () => live, stillAt: 7.0 };
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
  // dark water under the map, with a faint sheen, and a field of dots
  const water = mesh(new THREE.PlaneGeometry(36, 36), std(COL.water, { roughness: 0.18, metalness: 0.55, envMapIntensity: 0.9 }), { cast: false });
  water.rotation.x = -PI / 2;
  water.position.y = -0.4;
  g.add(water);
  const dots = [];
  for (let x = -16; x <= 16; x += 0.8) for (let z = -14; z <= 14; z += 0.8) dots.push(x, -0.3, z);
  g.add(new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(dots, 3)), new THREE.PointsMaterial({ color: COL.gold, size: 0.06, transparent: true, opacity: 0.26, depthWrite: false })));

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
    geo.rotateX(-PI / 2);
    map.add(mesh(geo, slabMat));
    map.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 25), edgeMat));
  });
  g.add(map);

  // office beacons: a column of light, a gold pin, a pulsing ring and a radar sweep
  const columnTex = canvasTexture(16, 256, (c, w, h) => {
    const grad = c.createLinearGradient(0, h, 0, 0);
    grad.addColorStop(0, 'rgba(240,217,162,.95)');
    grad.addColorStop(1, 'rgba(240,217,162,0)');
    c.fillStyle = grad;
    c.fillRect(0, 0, w, h);
  });
  const sweepMap = sweepTex();
  const anchors = {};
  const beacons = offices.map((o, i) => {
    const [x, z] = project(o.lon, o.lat);
    const b = new THREE.Group();
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 5.5, 16, 1, true), basic(0xffffff, { map: columnTex, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }));
    col.position.y = 3.2;
    const pin = mesh(new THREE.SphereGeometry(0.26, 24, 16), std(COL.gold, { metalness: 0.8, roughness: 0.25, emissive: COL.gold, emissiveIntensity: 0.35 }));
    pin.position.y = 0.95;
    const halo = sprite(ctx.glow, COL.gold, 2.2, 0.85);
    halo.position.y = 0.95;
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.3, 0.38, 48), basic(COL.gold2, { side: THREE.DoubleSide }));
    ring.rotation.x = -PI / 2;
    ring.position.y = 0.66;
    const sweep = new THREE.Mesh(new THREE.CircleGeometry(3.4, 64), basic(0xffffff, { map: sweepMap, opacity: 0.55, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }));
    sweep.rotation.x = -PI / 2;
    sweep.position.y = 0.7;
    b.add(col, pin, halo, ring, sweep);
    b.position.set(x, 0, z);
    g.add(b);
    anchors[`s2-office-${i}`] = new THREE.Vector3(x, [3.4, 2.1, 1.25][i] ?? 2.2, z);
    return { b, ring, sweep, i, pos: b.position };
  });

  // arcs between the offices with a light travelling along each
  const arcs = [];
  for (let i = 0; i < beacons.length; i++)
    for (let j = i + 1; j < beacons.length; j++) {
      const a = beacons[i].pos, b = beacons[j].pos;
      const mid = a.clone().add(b).multiplyScalar(0.5);
      mid.y = 2.4 + a.distanceTo(b) * 0.18;
      const curve = new THREE.QuadraticBezierCurve3(a.clone().setY(0.95), mid, b.clone().setY(0.95));
      g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 64, 0.035, 8), basic(COL.gold2, { opacity: 0.55, blending: THREE.AdditiveBlending })));
      const runner = sprite(ctx.glow, 0xfff1cf, 0.9, 1);
      g.add(runner);
      arcs.push({ curve, runner, speed: 0.12 + arcs.length * 0.03, offset: arcs.length * 0.31 });
    }

  // twelve crews: small trucks driving a short run out and back from a spot inside the service area, headlights on
  const r = rand(23);
  const crews = [];
  const all = rings.flat();
  const lons = all.map((p) => p[0]), lats = all.map((p) => p[1]);
  const [lonMin, lonMax, latMin, latMax] = [Math.min(...lons), Math.max(...lons), Math.min(...lats), Math.max(...lats)];
  const inArea = (lon, lat) => rings.some((ring) => inside([lon, lat], ring));
  while (crews.length < 12) {
    const lon = lonMin + r() * (lonMax - lonMin), lat = latMin + r() * (latMax - latMin);
    if (!inArea(lon, lat)) continue;
    let to = null;
    for (let k = 0; k < 12 && !to; k++) {
      const ang = r() * PI * 2, len = 0.09 + r() * 0.08;
      const lon2 = lon + Math.cos(ang) * len, lat2 = lat + Math.sin(ang) * len * 0.8;
      if (inArea(lon2, lat2)) to = [lon2, lat2];
    }
    if (!to) continue;
    const a = project(lon, lat), b = project(...to);
    const tr = truck(0.14, true);
    g.add(tr);
    const beam = sprite(ctx.glow, 0xfff2cc, 0.55, 0.8);
    const mark = groundRing(COL.gold2);
    mark.material.opacity = 0;
    g.add(beam, mark);
    crews.push({ tr, beam, mark, a: new THREE.Vector3(a[0], 0.72, a[1]), b: new THREE.Vector3(b[0], 0.72, b[1]), sp: 0.07 + r() * 0.05, ph: r() });
  }
  // each office dispatches a light to the crew nearest it, in turn
  const nearest = beacons.map((bc) => {
    const far = crews.filter((c) => c.a.distanceTo(bc.pos) > 2.6);
    return (far.length ? far : crews).reduce((best, c) => (c.a.distanceTo(bc.pos) < best.a.distanceTo(bc.pos) ? c : best));
  });
  const dispatch = sprite(ctx.glow, 0xfff1cf, 1.1, 0);
  g.add(dispatch);
  const DISPATCH = 3.4;
  anchors['s2-crew'] = new THREE.Vector3();
  const hidden = new Set(['s2-crew']);

  const tmp = new THREE.Vector3(), dir = new THREE.Vector3();
  const update = (t) => {
    beacons.forEach(({ ring, sweep, i }) => {
      const k = (t * 0.5 + i * 0.3) % 1;
      ring.scale.setScalar(1 + k * 4);
      ring.material.opacity = (1 - k) * 0.9;
      sweep.rotation.z = -t * 0.9 - i * 2;
    });
    arcs.forEach((a) => a.runner.position.copy(a.curve.getPoint((t * a.speed + a.offset) % 1)));
    crews.forEach((c) => {
      // out, pause, back, pause
      const p = (t * c.sp + c.ph) % 1;
      const u = smooth(0.04, 0.46, p) - smooth(0.54, 0.96, p);
      const forward = p < 0.5;
      c.tr.position.lerpVectors(c.a, c.b, u);
      c.tr.position.y = 0.64;
      dir.subVectors(forward ? c.b : c.a, forward ? c.a : c.b);
      c.tr.rotation.y = Math.atan2(dir.x, dir.z);
      c.beam.position.copy(c.tr.position).addScaledVector(dir.normalize(), 0.34).setY(0.7);
      c.beam.material.opacity = 0.5 + Math.sin(t * 3 + c.ph * 9) * 0.2;
      c.mark.position.copy(c.tr.position).setY(0.62);
    });
    // dispatch: a light leaves office k, reaches its nearest crew 1.4 s later and the crew's ring pulses; the label follows that crew
    const n = Math.floor(t / DISPATCH);
    const k = n % beacons.length;
    const phase = t - n * DISPATCH;
    const target = nearest[k];
    const fly = smooth(0, 1.4, phase);
    dispatch.position.lerpVectors(beacons[k].pos.clone().setY(0.95), target.tr.position, fly);
    dispatch.position.y += Math.sin(fly * PI) * 1.6;
    dispatch.material.opacity = phase < 1.5 ? 1 : 0;
    const arrived = clamp01((phase - 1.4) / 1.2);
    target.mark.scale.setScalar(1 + arrived * 4);
    target.mark.material.opacity = phase >= 1.4 ? (1 - arrived) * 0.9 : 0;
    if (phase > 1.4 && phase < DISPATCH - 0.3) hidden.delete('s2-crew');
    else hidden.add('s2-crew');
    anchors['s2-crew'].copy(target.tr.position).add(tmp.set(0, 0.5, 0));
  };
  return { group: g, anchors, hidden, update, stillAt: 2.2 };
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
  const lawn = mesh(new THREE.CircleGeometry(8.2, 72), std(COL.lawn, { roughness: 1 }), { cast: false });
  lawn.rotation.x = -PI / 2;
  lawn.position.y = 0.02;
  g.add(lawn);

  // the roof section, tilted toward the camera: rafters, then four deck sheets, the underlayment, the shingle courses and the ridge caps
  const stack = new THREE.Group();
  stack.rotation.set(0.34, 0.62, 0);
  stack.position.set(0.2, 2.0, 0.2);
  g.add(stack);
  for (let x = -2.8; x <= 2.8; x += 1.4) stack.add(box(0.18, 0.5, 4.4, std(COL.wood, { roughness: 0.9 }), x, -0.38, 0));
  const deckTex = decking([0.7, 0.45]);
  const sheets = [[-1.6, 1.05], [1.6, 1.05], [-1.6, -1.05], [1.6, -1.05]].map(([x, z]) => {
    const s = box(3.16, 0.22, 2.06, std(0xffffff, { map: deckTex, roughness: 0.85 }), x, 0, z);
    s.userData.base = { x, z };
    stack.add(s);
    return s;
  });
  const under = mesh(new THREE.BoxGeometry(6.4, 0.06, 4.2).translate(0, 0, 2.1), std(0xffffff, { map: underlay([1.6, 1]), roughness: 0.6 }));
  under.position.set(0, 0.14, -2.1);
  stack.add(under);
  const roll = mesh(new THREE.CylinderGeometry(0.24, 0.24, 6.5, 20), std(0x1d2733, { roughness: 0.6 }));
  roll.rotation.z = PI / 2;
  stack.add(roll);
  // shingles as one instanced mesh, 8 courses of 9 strips, a little color variation per strip
  const ROWS = 8, COLS = 9, N = ROWS * COLS;
  const strips = new THREE.InstancedMesh(new THREE.BoxGeometry(0.74, 0.05, 0.54), std(0x4a4f57, { roughness: 0.8 }), N);
  strips.castShadow = true;
  strips.receiveShadow = true;
  const sr = rand(3);
  const col = new THREE.Color();
  for (let i = 0; i < N; i++) strips.setColorAt(i, col.setHSL(0.6, 0.06, 0.24 + sr() * 0.1));
  stack.add(strips);
  const stripAt = (i) => {
    const row = Math.floor(i / COLS), c = i % COLS;
    return [-3.2 + 0.37 + c * 0.74 - (row % 2) * 0.37, 0.33 + row * 0.004, 2.1 - 0.27 - row * 0.5];
  };
  const caps = [];
  for (let x = -2.85; x <= 2.85; x += 0.57) {
    const cp = box(0.52, 0.09, 0.62, std(0x3a3f47, { roughness: 0.75 }), x, 0.42, -2.0);
    stack.add(cp);
    caps.push(cp);
  }

  // the warranty shield: gold metal with a check, a glow behind it and a ring burst when it appears
  const shield = new THREE.Group();
  const geo = new THREE.ExtrudeGeometry(shieldShape(), { depth: 0.3, bevelEnabled: true, bevelSize: 0.08, bevelThickness: 0.08, bevelSegments: 4 });
  geo.center();
  const shieldMat = std(COL.gold, { metalness: 0.95, roughness: 0.22, envMapIntensity: 1.3, emissive: COL.gold, emissiveIntensity: 0 });
  const inner = mesh(new THREE.ExtrudeGeometry(shieldShape(), { depth: 0.05, bevelEnabled: false }), std(COL.navy, { metalness: 0.3, roughness: 0.4 }), { cast: false });
  inner.geometry.center();
  inner.scale.set(0.8, 0.8, 1);
  inner.position.z = 0.24;
  const check = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(-0.42, 0.02, 0), new THREE.Vector3(-0.12, -0.3, 0), new THREE.Vector3(0.48, 0.38, 0)], false, 'catmullrom', 0.05), 40, 0.085, 12),
    std(COL.gold2, { metalness: 0.9, roughness: 0.2, emissive: COL.gold, emissiveIntensity: 0.25 })
  );
  check.position.z = 0.3;
  shield.add(mesh(geo, shieldMat), inner, check);
  const halo = sprite(ctx.glow, COL.gold, 5.2, 0.4);
  halo.position.z = -0.4;
  shield.add(halo);
  shield.position.set(3.0, 5.2, -2.4);
  g.add(shield);
  const burst = sprite(ringTex(), COL.gold2, 1, 0);
  burst.position.copy(shield.position);
  g.add(burst);
  const sparks = [];
  const pr = rand(5);
  for (let i = 0; i < 26; i++) {
    const s = sprite(ctx.glow, COL.gold2, 0.22 + pr() * 0.25, 0);
    g.add(s);
    sparks.push({ s, x: 3.0 + (pr() - 0.5) * 3.4, z: -2.4 + (pr() - 0.5) * 2.4, ph: pr(), sp: 0.12 + pr() * 0.18 });
  }

  // the yard: bushes under blue tarps, the permit board on its stake, nails on the ground and the magnetic sweeper that picks them up
  const bushSpots = [[4.4, -2.4], [-5.2, -2.2]];
  const tarps = bushSpots.map(([x, z]) => {
    bushes(g, [[x, z, 0.62], [x + 0.8, z + 0.5, 0.45], [x - 0.6, z + 0.6, 0.4]]);
    const t = mesh(new THREE.IcosahedronGeometry(1.0, 1), std(COL.tarp, { roughness: 0.55, flatShading: true }));
    t.scale.set(1.7, 0.85, 1.45);
    t.position.set(x + 0.1, 0.7, z + 0.4);
    t.userData.y = 0.7;
    g.add(t);
    return t;
  });
  const permit = new THREE.Group();
  permit.add(box(0.06, 1.4, 0.06, std(COL.wood, { roughness: 0.9 }), 0, 0.7, 0));
  permit.add(box(0.9, 1.1, 0.04, std(0xffffff, { map: permitTex(), roughness: 0.6 }), 0, 1.3, 0.04, { cast: false }));
  permit.position.set(6.8, 0, 1.2);
  permit.rotation.y = 0.9;
  g.add(permit);
  const nr = rand(17);
  const nailMat = std(COL.metal, { metalness: 0.85, roughness: 0.3 });
  const nails = [];
  for (let i = 0; i < 14; i++) {
    const n = mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.3, 6), nailMat, { cast: false });
    n.rotation.z = PI / 2;
    n.rotation.y = nr() * PI;
    const x = 2.6 + nr() * 5.2, z = 2.3 + (nr() - 0.5) * 0.9;
    n.position.set(x, 0.05, z);
    g.add(n);
    nails.push({ n, x, z, dx: (nr() - 0.5) * 1.0, dz: (nr() - 0.5) * 0.28 });
  }
  const sweeper = new THREE.Group();
  const bar = box(1.5, 0.16, 0.22, std(0xd43a3a, { roughness: 0.5, metalness: 0.2 }), 0, 0.2, 0);
  sweeper.add(bar);
  for (const sx of [-0.6, 0.6]) {
    const wh = mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 14), std(0x15181c, { roughness: 0.8 }));
    wh.rotation.z = PI / 2;
    wh.position.set(sx, 0.12, -0.2);
    sweeper.add(wh);
  }
  const handle = mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.6, 8), std(COL.metal, { metalness: 0.7, roughness: 0.35 }), { cast: false });
  handle.rotation.x = -0.75;
  handle.position.set(0, 0.75, -0.55);
  sweeper.add(handle);
  sweeper.position.set(8.4, 0, 2.3);
  g.add(sweeper);

  // the order of work (seconds into the loop); everything rewinds together at the end
  const T = { tarp: [0.1, 0.6], permit: [0.3, 0.7], deck: 0.5, under: [1.5, 2.5], shingle: [2.5, 4.6], cap: [4.6, 4.9], shield: 5.0, sweep: [5.2, 7.0], rewind: [8.4, 9.2] };
  const CYCLE = 9.4;
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), v = new THREE.Vector3(), sc = new THREE.Vector3(), tmp = new THREE.Vector3();
  const anchors = { 's3-top': new THREE.Vector3(), 's3-under': new THREE.Vector3(), 's3-deck': new THREE.Vector3(), 's3-shield': new THREE.Vector3(), 's3-tarp': new THREE.Vector3(), 's3-permit': new THREE.Vector3(), 's3-sweep': new THREE.Vector3() };
  const hidden = new Set();
  const update = (t) => {
    const c = t % CYCLE;
    const out = 1 - smooth(T.rewind[0], T.rewind[1], c); // 1 while building, 0 once rewound
    const p = (a, b) => Math.min(smooth(a, b, c), out);
    // tarps drop over the bushes, the permit board goes up
    tarps.forEach((tp, i) => {
      const k = p(T.tarp[0] + i * 0.15, T.tarp[1] + i * 0.15);
      tp.position.y = lerp(4.5, tp.userData.y, ease(k));
      tp.scale.y = lerp(1.3, 0.85, k);
      tp.visible = k > 0.001;
    });
    const pk = p(T.permit[0], T.permit[1]);
    permit.scale.setScalar(Math.max(0.001, pk));
    // deck sheets land one after another
    sheets.forEach((s, i) => {
      const k = p(T.deck + i * 0.28, T.deck + 0.4 + i * 0.28);
      s.position.set(s.userData.base.x, lerp(2.4, 0, ease(k)), s.userData.base.z);
      s.visible = k > 0.001;
    });
    // the underlayment rolls out from the ridge to the eave
    const uk = p(T.under[0], T.under[1]);
    under.scale.z = Math.max(0.001, uk);
    under.visible = uk > 0.001;
    roll.position.set(0, 0.42, -2.1 + 4.2 * uk);
    roll.rotation.x = uk * 18;
    roll.visible = uk > 0.001 && uk < 0.999;
    // shingles, course by course from the eave up, each strip dropping in
    for (let i = 0; i < N; i++) {
      const start = T.shingle[0] + (i / N) * (T.shingle[1] - T.shingle[0] - 0.25);
      const k = p(start, start + 0.25);
      const [x, y, z] = stripAt(i);
      v.set(x, y + (1 - ease(k)) * 0.6, z);
      sc.setScalar(Math.max(0.001, k));
      strips.setMatrixAt(i, m4.compose(v, q, sc));
    }
    strips.instanceMatrix.needsUpdate = true;
    caps.forEach((cp, i) => {
      const k = p(T.cap[0] + i * 0.02, T.cap[0] + 0.2 + i * 0.02);
      cp.scale.setScalar(Math.max(0.001, k));
      cp.visible = k > 0.001;
    });
    // the shield pops in with a burst, then floats and turns; sparkles rise around it
    const sk = Math.min(pop(T.shield, T.shield + 0.6, c), out * 1.2);
    shield.scale.setScalar(Math.max(0.001, sk));
    shield.visible = sk > 0.001;
    shieldMat.emissiveIntensity = spike(T.shield, 0.6, c) * 0.9;
    shield.rotation.y = Math.sin(t * 0.55) * 0.55;
    shield.position.y = 5.2 + Math.sin(t * 1.1) * 0.16;
    halo.material.opacity = (0.32 + Math.sin(t * 1.6) * 0.1) * out;
    const bk = clamp01((c - T.shield) / 1.1);
    burst.scale.setScalar(1 + bk * 7);
    burst.material.opacity = c >= T.shield ? (1 - bk) * 0.9 : 0;
    sparks.forEach((s) => {
      const k = (t * s.sp + s.ph) % 1;
      s.s.position.set(s.x, 3.4 + k * 4.2, s.z);
      s.s.material.opacity = Math.sin(k * PI) * 0.85 * (c >= T.shield ? out : 0);
    });
    // the sweeper crosses the yard; a nail jumps to the bar as it passes and rides along
    const wk = p(T.sweep[0], T.sweep[1]);
    sweeper.position.x = lerp(8.4, 1.6, wk);
    sweeper.rotation.z = Math.sin(t * 14) * 0.02 * (wk > 0 && wk < 1 ? 1 : 0);
    nails.forEach((nl) => {
      const caught = sweeper.position.x < nl.x + 0.5 && out > 0.5;
      if (caught) {
        const k = clamp01((nl.x + 0.5 - sweeper.position.x) / 0.45);
        nl.n.position.set(lerp(nl.x, sweeper.position.x + nl.dx * 0.6, k), lerp(0.05, 0.14, ease(k)) + Math.sin(k * PI) * 0.35, lerp(nl.z, 2.3 + nl.dz, k));
      } else nl.n.position.set(nl.x, 0.05, nl.z);
    });
    // labels: each layer's tag shows once that layer is down; the tarp, permit and sweep tags in their moments
    const show = (key, on) => (on && out > 0.5 ? hidden.delete(key) : hidden.add(key));
    show('s3-deck', c > T.deck + 1.3);
    show('s3-under', c > T.under[1] - 0.2);
    show('s3-top', c > T.shingle[1] - 0.3);
    show('s3-tarp', c > T.tarp[1] + 0.2);
    show('s3-permit', c > T.permit[1] + 0.1);
    show('s3-sweep', c > T.sweep[0] + 0.2 && c < T.sweep[1] - 0.1);
    stack.updateMatrixWorld();
    const o = ctx.origin(3);
    anchors['s3-top'].copy(stack.localToWorld(tmp.set(-2.6, 0.45, -0.6))).sub(o);
    anchors['s3-under'].copy(stack.localToWorld(tmp.set(3.4, 0.2, -1.2))).sub(o);
    anchors['s3-deck'].copy(stack.localToWorld(tmp.set(0.6, -0.1, 2.3))).sub(o);
    anchors['s3-shield'].copy(shield.position).add(tmp.set(0, 1.9, 0));
    anchors['s3-tarp'].set(tarps[0].position.x, 1.8, tarps[0].position.z);
    anchors['s3-permit'].set(permit.position.x - 0.3, 2.1, permit.position.z);
    anchors['s3-sweep'].set(sweeper.position.x, 1.1, sweeper.position.z);
  };
  return { group: g, anchors, hidden, update, stillAt: 8.2 };
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
    // each station has its own warm key light (only the active one casts shadows) and a cool rim light
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

  // labels in the page that follow 3D points: [data-anchor="s1-flashing"]
  const labels = [...root.querySelectorAll('[data-anchor]')].map((el) => ({ el, key: el.dataset.anchor, st: Number(el.dataset.anchor[1]) }));

  let active = stations.includes(first) ? first : stations[0];
  const view = (i) => {
    const o = origins[i];
    const v = VIEWS[i];
    return { pos: new THREE.Vector3(...v.pos).add(o), target: new THREE.Vector3(...v.target).add(o) };
  };
  let from = view(active), to = from, tStart = 0, tDur = 0;
  const started = {}; // when each station's loop (re)started: the current one at boot, the others when their principle comes in
  started[active] = performance.now();
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
    // narrow frames: pull back a little so the station fits
    camera.fov = w / h < 0.9 ? 44 : 34;
    camera.updateProjectionMatrix();
    if (still || !running) frame(performance.now());
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas.parentElement);

  const v3 = new THREE.Vector3();
  const placeLabels = () => {
    const b = built[active];
    const live = b?.live?.();
    for (const l of labels) {
      if (l.st !== active || !b) continue;
      const p = b.anchors[l.key];
      if (!p) continue;
      v3.copy(p).add(origins[l.st]).project(camera);
      const off = v3.z > 1 || b.hidden?.has(l.key);
      l.el.style.transform = `translate3d(${((v3.x + 1) / 2) * w}px, ${((1 - v3.y) / 2) * h}px, 0)`;
      l.el.toggleAttribute('data-off', off);
      l.el.toggleAttribute('data-live', live === l.key);
    }
  };

  const clock = { t0: performance.now() };
  let running = false, raf = 0, last = performance.now();
  function frame(now) {
    const t = (now - clock.t0) / 1000;
    for (const [i, b] of Object.entries(built)) b.update(still ? b.stillAt ?? 2.4 : Math.max(0, (now - (started[i] ?? clock.t0)) / 1000));
    // camera: fly between stations (a rising arc), then drift gently, with a little pointer parallax
    const k = tDur ? Math.min(1, (now - tStart) / tDur) : 1;
    const e = ease(k);
    camPos.lerpVectors(from.pos, to.pos, e);
    camTarget.lerpVectors(from.target, to.target, e);
    camPos.y += Math.sin(PI * e) * (from === to ? 0 : 6);
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
      started[i] = tStart + 1100; // the loop begins as the camera arrives
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
