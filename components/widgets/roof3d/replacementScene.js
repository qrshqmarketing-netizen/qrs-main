// The 3D scene behind the Roof Replacement hero (RoofScene3D.jsx, scene="replacement"): a single-story home built around a courtyard, seen from a
// drone in bright sun, with a new hip roof in light gray shingles: four hip-roof wings meeting in valleys around the courtyard (a white canopy in
// it), ridge and hip lines, box vents and pipe vents, a brick chimney; a brown shade sail on white posts over the patio, a blue canopy, a blue
// tarp, a travel trailer and a white tent at the side, the lawn, a dirt yard with sheds and lumber, a fence, and the street behind with a work
// truck and a tree. Built from simple shapes with three.js (no model file).
// Mouse: the camera drifts with the pointer and a warm light follows the cursor; while the pointer is over the roof the replacement finishes:
// a soft gold line sweeps across the roof, the worn old shingles turn into the new ones behind it and a roofer walks along with it. When the
// pointer leaves, the roof slowly goes back to half done (old on the right, new on the left), so it can be replayed. 30 fps only while on
// screen; one still frame (half done) for reduced motion.
import * as THREE from 'three';
import { box, facesGeometry, flat, hipFaces, mesh, shingleTexture } from './houseScene';
import { roofer } from './repairScene';

const FPS = 30;
const H = 3.2; // wall height
const REST = 0.42; // how much of the roof is new at rest
const V = (x, y, z) => new THREE.Vector3(x, y, z);
const at = (m, x, y, z) => (m.position.set(x, y, z), m);

// The wings around the courtyard: [cx, cz, w, d, rise]
const WINGS = [
  [-6, 5, 22, 10, 2],     // front wing, across the patio
  [9.5, -1, 9, 22, 1.8],  // right wing
  [-1.5, -8.5, 13, 7, 1.4], // back wing
  [-12.5, -6, 9, 12, 1.8], // left wing (with the front one, the big roof at the left)
];

// The old roof: darker, browner shingles with weathered patches and a few missing tabs
function oldShingles() {
  const tex = shingleTexture('#5f5a52', '#3d3933');
  const g = tex.image.getContext('2d');
  for (let i = 0; i < 26; i++) {
    g.fillStyle = `rgba(${90 + Math.random() * 40},${80 + Math.random() * 30},${60 + Math.random() * 20},${0.18 + Math.random() * 0.2})`;
    g.beginPath();
    g.ellipse(Math.random() * 512, Math.random() * 512, 20 + Math.random() * 60, 10 + Math.random() * 30, Math.random() * 3, 0, Math.PI * 2);
    g.fill();
  }
  g.fillStyle = 'rgba(25,22,18,.7)';
  for (let i = 0; i < 18; i++) g.fillRect(Math.random() * 512, Math.floor(Math.random() * 32) * 16 + 2, 16 + Math.random() * 18, 13);
  tex.needsUpdate = true;
  return tex;
}

// A soft vertical band of gold light (bright at the bottom, fading up) for the sweep line
function glowTexture() {
  const c = document.createElement('canvas');
  c.width = 4;
  c.height = 128;
  const g = c.getContext('2d');
  const grad = g.createLinearGradient(0, 128, 0, 0);
  grad.addColorStop(0, 'rgba(255,214,140,.95)');
  grad.addColorStop(0.25, 'rgba(255,200,120,.45)');
  grad.addColorStop(1, 'rgba(255,200,120,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 4, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function foliage(world, x, z, s, greens) {
  const t = new THREE.Group();
  for (let i = 0; i < 7; i++) {
    const m = mesh(new THREE.IcosahedronGeometry(s * (0.5 + Math.random() * 0.45), 1), greens[(i + Math.abs(Math.round(x))) % greens.length], { flatShading: true, roughness: 1 });
    m.position.set((Math.random() - 0.5) * s * 1.5, s * (0.9 + Math.random() * 0.8), (Math.random() - 0.5) * s * 1.5);
    t.add(m);
  }
  t.position.set(x, 0, z);
  world.add(t);
  return t;
}

// A pitched canopy (four-sided pyramid top on thin legs)
function canopy(world, x, z, size, color, height = 2.6) {
  const g = new THREE.Group();
  const top = mesh(new THREE.ConeGeometry(size * 0.72, 1.1, 4), color, { roughness: 0.8 });
  top.rotation.y = Math.PI / 4;
  top.position.y = height + 0.55;
  g.add(top);
  for (const [dx, dz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) g.add(at(box(0.08, height, 0.08, 0xdedede), (dx * size) / 2, height / 2, (dz * size) / 2));
  g.position.set(x, 0, z);
  world.add(g);
  return g;
}

export class ReplacementSceneEngine {
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
    renderer.toneMappingExposure = 0.95;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.localClippingEnabled = true;
    renderer.setClearColor(0x5e6650);

    const scene = (this.scene = new THREE.Scene());
    scene.fog = new THREE.Fog(0x5e6650, 70, 130);
    this.camera = new THREE.PerspectiveCamera(32, 1, 0.5, 260);

    // Bright late-morning sun from the left (shadows fall to the right, as on the photo)
    scene.add(new THREE.HemisphereLight(0xd8e6f4, 0x5f6a45, 0.85));
    const sun = new THREE.DirectionalLight(0xfff2de, 2.5);
    sun.position.set(-30, 34, 10);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -45, right: 45, top: 40, bottom: -40, near: 1, far: 130 });
    sun.shadow.bias = -0.0005;
    scene.add(sun);
    this.cursorLight = new THREE.PointLight(0xffd59a, 0, 24, 1.5);
    scene.add(this.cursorLight);

    const world = (this.world = new THREE.Group());
    scene.add(world);

    // Ground: lawn in front and at the left, a dirt yard at the right, the street behind, walks and the patio slab
    world.add(flat(240, 240, 0x5f8f3a, 0));
    world.add(at(flat(40, 50, 0xb39c78, 0.01), 34, 0.01, 2));
    world.add(at(flat(240, 12, 0x5a5c5f, 0.02), 0, 0.02, -26));
    world.add(at(flat(240, 2.4, 0xcfcbc2, 0.025), 0, 0.025, -19));
    world.add(at(flat(30, 6.5, 0xc9c3b6, 0.03), -6, 0.03, 13.6));
    world.add(at(flat(2, 30, 0xcfcbc2, 0.03), -19.5, 0.03, 6));
    world.add(at(flat(13, 5, 0xbfb8aa, 0.035), -1.5, 0.035, -2.5)); // courtyard floor

    // Walls under each wing
    for (const [cx, cz, w, d] of WINGS) world.add(at(box(w - 0.8, H, d - 0.8, 0xe2e1dc), cx, H / 2, cz));
    // a door and windows on the patio side
    world.add(at(box(1.2, 2.2, 0.1, 0xf2f2ee), 1.5, 1.1, 9.65));
    [[-12, 9.65], [-4, 9.65]].forEach(([x, z]) => world.add(at(box(2.4, 1.3, 0.1, 0x2c3238, { roughness: 0.3 }), x, 1.8, z)));

    // The roof: the same faces twice, the new shingles on top (cut away ahead of the sweep line) and the old ones just under
    const faces = WINGS.flatMap(([cx, cz, w, d, rise]) => hipFaces(cx, cz, w + 1, d + 1, H, rise));
    const geo = facesGeometry(faces, 0.36);
    // the sweep runs from the front left to the back right
    this.dir = V(1, 0, -0.45).normalize();
    const span = faces.flat().map((p) => p.dot(this.dir));
    this.from = Math.min(...span) - 0.5;
    this.to = Math.max(...span) + 0.5;
    this.clip = new THREE.Plane(this.dir.clone().negate(), 0);
    const newTex = shingleTexture('#8f969d', '#6d747b');
    this.newMat = new THREE.MeshStandardMaterial({ map: newTex, roughness: 0.9, side: THREE.DoubleSide, clippingPlanes: [this.clip], emissive: new THREE.Color(0xd4b572), emissiveIntensity: 0 });
    this.newRoof = new THREE.Mesh(geo, this.newMat);
    this.newRoof.castShadow = this.newRoof.receiveShadow = true;
    world.add(this.newRoof);
    this.oldRoof = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: oldShingles(), roughness: 1, side: THREE.DoubleSide }));
    this.oldRoof.position.y = -0.05;
    this.oldRoof.receiveShadow = true;
    world.add(this.oldRoof);
    // hips, ridges and valleys drawn as light cap lines
    const caps = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 12), new THREE.LineBasicMaterial({ color: 0xc3c8cd, transparent: true, opacity: 0.55 }));
    caps.position.y = 0.03;
    world.add(caps);
    // the gold edge, lit while the pointer is over the roof
    this.edgeMat = new THREE.LineBasicMaterial({ color: 0xe0c68a, transparent: true, opacity: 0 });
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 12), this.edgeMat);
    edge.position.y = 0.06;
    world.add(edge);
    // the sweep line's light: a tall soft band standing across the roof
    this.glow = new THREE.Mesh(new THREE.PlaneGeometry(44, 5), new THREE.MeshBasicMaterial({ map: glowTexture(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, opacity: 0 }));
    this.glow.rotation.y = Math.atan2(this.dir.x, this.dir.z); // face along the sweep
    world.add(this.glow);

    // Things on the roof, set onto its surface: box vents, pipe vents, the brick chimney
    this.down = new THREE.Raycaster();
    const roofY = (x, z) => {
      this.down.set(V(x, 40, z), V(0, -1, 0));
      return this.down.intersectObject(this.newRoof)[0]?.point.y ?? H;
    };
    this.roofY = roofY;
    [[-9, 2.5], [-3, 3], [3, 1], [8, -5], [11, -2], [7.5, 4], [-14, -4], [-4, -9.5], [1, -7.5]].forEach(([x, z]) => {
      const v = box(1.1, 0.4, 0.8, 0x34383d);
      v.position.set(x, roofY(x, z) + 0.15, z);
      world.add(v);
    });
    [[-6, 1.2], [-1, 0.8], [-0.5, -9], [10.5, 1.5], [-12, -2]].forEach(([x, z]) => world.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.9, 8), new THREE.MeshStandardMaterial({ color: 0x2a2d31 })), x, roofY(x, z) + 0.35, z)));
    const chimney = box(1.4, 6, 1.8, 0xa1513b, { roughness: 0.95 });
    chimney.position.set(-12.5, 3, 7.2);
    world.add(chimney);
    world.add(at(box(1.6, 0.3, 2, 0x6b6f72), -12.5, 6.1, 7.2));

    // The courtyard: a white canopy and a table
    canopy(world, -3, -2.6, 3, 0xf3f3f0, 2.2);
    world.add(at(box(2, 0.8, 1, 0x8b7a62), 1.5, 0.4, -2.5));
    // The patio: a brown shade sail on white posts and beams, sloping from the eave
    const sail = mesh(new THREE.PlaneGeometry(13, 7), 0x8c775a, { side: THREE.DoubleSide, roughness: 1 });
    sail.position.set(-9, 2.6, 14);
    sail.rotation.x = -Math.PI / 2 + 0.18;
    world.add(sail);
    [[-15.5, 17.4], [-2.5, 17.4], [-9, 17.4]].forEach(([x, z]) => world.add(at(box(0.25, 2.3, 0.25, 0xf4f4f2), x, 1.15, z)));
    world.add(at(box(13.4, 0.25, 0.3, 0xf4f4f2), -9, 2.3, 17.4));
    // A blue canopy at the far left corner, a blue tarp at the right, a travel trailer and a white tent beside the house
    canopy(world, -21, 11, 4.2, 0x2f6fc2);
    const tarp = mesh(new THREE.IcosahedronGeometry(2.2, 0), 0x2a63b8, { flatShading: true });
    tarp.scale.set(1.4, 0.6, 1);
    tarp.position.set(15.6, 1.1, 8);
    world.add(tarp);
    world.add(at(box(16, 3.4, 3.6, 0xf1f1ee), -24, 1.9, -9));
    world.add(at(box(16.1, 0.3, 3.7, 0x8a8f96), -24, 2.4, -9));
    const tent = new THREE.Group();
    tent.add(at(box(10, 2.4, 5, 0xf6f6f3), 0, 1.2, 0));
    const tentTop = mesh(new THREE.ConeGeometry(3.6, 1.2, 4), 0xf6f6f3);
    tentTop.rotation.y = Math.PI / 4;
    tentTop.scale.set(1.9, 1, 0.95);
    tentTop.position.y = 3;
    tent.add(tentTop);
    tent.position.set(-24, 0, -15.5);
    world.add(tent);

    // The dirt yard at the right: sheds, a wood fence, leaning lumber
    [[24, 5, 6, 8], [24, -6, 5, 6]].forEach(([x, z, w, d]) => {
      world.add(at(box(w, 2.8, d, 0xeeece6), x, 1.4, z));
      world.add(at(box(w + 0.4, 0.3, d + 0.4, 0xd9d6cf), x, 2.95, z));
    });
    world.add(at(box(0.3, 2.2, 18, 0x8b6a47), 19, 1.1, -10));
    [[29, 12, 0.5], [29.5, 11, 0.3], [30, 13, 0.7]].forEach(([x, z, r]) => {
      const b = box(4.5, 0.2, 0.35, 0xc7905a);
      b.position.set(x, 0.3, z);
      b.rotation.set(0, r, 0.3);
      world.add(b);
    });

    // The street behind: a work truck with a ladder rack, a car, a tree, a flag pole
    const truck = new THREE.Group();
    truck.add(at(box(5.6, 1.3, 2.4, 0xb9ab8e, { metalness: 0.2, roughness: 0.5 }), 0, 0.95, 0));
    truck.add(at(box(2.2, 1, 2.2, 0x2c3238, { roughness: 0.3 }), -0.8, 2, 0));
    truck.add(at(box(3, 0.15, 2.5, 0xd0d0cc), 1.2, 2.6, 0));
    truck.position.set(8, 0, -24);
    world.add(truck);
    const car = new THREE.Group();
    car.add(at(box(4.4, 0.9, 1.9, 0x2e4f86, { metalness: 0.3, roughness: 0.45 }), 0, 0.7, 0));
    car.add(at(box(2.3, 0.7, 1.7, 0x23292f, { roughness: 0.3 }), -0.2, 1.45, 0));
    car.position.set(-6, 0, -22.5);
    world.add(car);
    world.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 7, 6), new THREE.MeshStandardMaterial({ color: 0xcccccc })), 1, 3.5, -17.5));
    const greens = [0x5f8f34, 0x79a43e, 0x99be4b, 0x48702c, 0x6b9a3a];
    this.trees = [foliage(world, 20, -20, 3.4, greens), foliage(world, -30, 2, 3, greens), foliage(world, 30, -16, 2.6, greens), foliage(world, -14, 24, 2.4, greens)];

    // The roofer walking with the sweep line, along the front wing
    this.worker = roofer({ shirt: 0x9fb7cf, hat: 'white' });
    world.add(this.worker);

    // Pointer state and the job
    this.build = REST;
    this.idle = 0;
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

  resize() {
    if (!this.renderer) return;
    const r = this.canvas.getBoundingClientRect();
    const w = Math.max(2, Math.round(r.width)), h = Math.max(2, Math.round(r.height));
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.distance = w / h < 0.8 ? 100 : w / h < 1.2 ? 78 : 62;
    // the haze starts beyond the street, whatever the camera distance
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

    // Drone camera in front of the patio, high up, turned a little to the right like the photo; it swings gently with the pointer
    const az = Math.PI / 2 - 0.22 + Math.sin(this.time * 0.1) * 0.05 + smooth.x * 0.2;
    const el = 0.98 + smooth.y * 0.08;
    const dist = this.distance || 62;
    camera.position.set(Math.cos(az) * Math.cos(el) * dist, Math.sin(el) * dist, Math.sin(az) * Math.cos(el) * dist);
    camera.lookAt(0, 1, 1);

    let over = false;
    if (target.inside && !this.reduced) {
      this.pointer.set(smooth.x, smooth.y);
      this.ray.setFromCamera(this.pointer, camera);
      const hit = this.ray.intersectObjects([this.newRoof, this.oldRoof])[0];
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
    this.edgeMat.opacity = this.hover * 0.9;
    this.newMat.emissiveIntensity = this.hover * 0.04;

    // The job: finishing while the pointer is over the roof (about 4 seconds), back to half done after a pause
    let moving = 0;
    if (!this.reduced && dt) {
      const before = this.build;
      if (over) {
        this.build = Math.min(1, this.build + dt * 0.18);
        this.idle = 0;
      } else if ((this.idle += dt) > 2.5) this.build = Math.max(REST, this.build - dt * 0.08);
      moving = Math.abs(this.build - before) / dt;
    }
    const s = this.from + (this.to - this.from) * this.build;
    this.clip.constant = s; // the new shingles show where dir·p < s
    // the gold light stands on the sweep line while it moves
    const mid = this.dir.clone().multiplyScalar(s);
    this.glow.position.set(mid.x, 6, mid.z);
    this.glow.material.opacity = ease(this.glow.material.opacity, moving > 0.01 && this.build < 0.999 ? 0.75 : 0, 4);
    // the roofer walks along the line on the front wing (z = 5), standing on the roof
    const z = 5.5;
    const x = THREE.MathUtils.clamp((s - this.dir.z * z) / this.dir.x - 0.8, -16, 14);
    this.worker.position.set(x, this.roofY(x, z) - 0.05, z);
    this.worker.userData.body.rotation.x = -0.35 - Math.max(0, Math.sin(this.time * (1.6 + this.hover * 2.4))) * 0.35;
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
