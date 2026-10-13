// The 3D scene behind the Residential Roofing hero (Scene3D.jsx, scene="house"): a suburban street seen from a drone in late-afternoon sun. In the
// middle, a single-story home with a dark gray shingle roof made of several hip-roof wings and a small gable over the entry; a brown-roof neighbor
// on the left and a gray-roof neighbor on the right; driveways, lawns, a sidewalk, the street, fences, shrubs and trees. Built from simple shapes
// with three.js (no model file). Mouse: the camera drifts with the pointer, a warm light follows the cursor, and while the pointer is over the
// middle roof its eaves, hips and ridges are traced in gold and the roof lifts a touch. 30 fps only while on screen; one still frame for reduced motion.
import * as THREE from 'three';

const FPS = 30;

// (shingleTexture, facesGeometry, mesh, box and flat are shared with repairScene.js)
// Shingle courses running along the eaves: a dark base, darker course lines, staggered tab slits and grain
export function shingleTexture(base, line) {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const g = c.getContext('2d');
  g.fillStyle = base;
  g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 5000; i++) {
    const v = Math.random() * 40 - 20;
    g.fillStyle = `rgba(${128 + v},${128 + v},${128 + v},.07)`;
    g.fillRect(Math.random() * 512, Math.random() * 512, 2 + Math.random() * 3, 2);
  }
  const course = 16;
  for (let y = 0, row = 0; y < 512; y += course, row++) {
    g.fillStyle = line;
    g.fillRect(0, y, 512, 2);
    for (let x = (row % 2) * 18; x < 512; x += 36 + Math.random() * 18) g.fillRect(x, y, 2, course);
    // a slightly darker band under each course (the shadow of the one above)
    g.fillStyle = 'rgba(0,0,0,.12)';
    g.fillRect(0, y + 2, 512, 4);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}

// Roof faces from polygons: each face is [eaveStart, eaveEnd, ...rest] so its texture courses run along the eave (u along the eave, v up the slope)
export function facesGeometry(faces, scale = 0.32) {
  const pos = [], uv = [];
  for (const pts of faces) {
    const [a, b] = pts;
    const e = new THREE.Vector3().subVectors(b, a).normalize();
    const uvOf = (p) => {
      const rel = new THREE.Vector3().subVectors(p, a);
      const along = rel.dot(e);
      const perp = rel.clone().sub(e.clone().multiplyScalar(along)).length();
      return [along * scale, perp * scale];
    };
    for (let i = 1; i < pts.length - 1; i++) {
      for (const p of [pts[0], pts[i], pts[i + 1]]) {
        pos.push(p.x, p.y, p.z);
        uv.push(...uvOf(p));
      }
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geo.computeVertexNormals();
  return geo;
}

const V = (x, y, z) => new THREE.Vector3(x, y, z);

// A hip roof over a w × d rectangle (x across, z deep), eaves at height y, rising h
export function hipFaces(cx, cz, w, d, y, h) {
  const along = w >= d;
  const L = along ? w : d, S = along ? d : w;
  const r = (L - S) / 2;
  const P = (a, b, yy) => (along ? V(cx + a, yy, cz + b) : V(cx + b, yy, cz + a));
  const A = P(-L / 2, S / 2, y), B = P(L / 2, S / 2, y), E = P(L / 2, -S / 2, y), F = P(-L / 2, -S / 2, y);
  const r1 = P(-r, 0, y + h), r2 = P(r, 0, y + h);
  return [
    [A, B, r2, r1],
    [E, F, r1, r2],
    [F, A, r1],
    [B, E, r2],
  ];
}

// A gable roof (ridge along z, toward the street) over a w × d rectangle
function gableFaces(cx, cz, w, d, y, h) {
  const zf = cz + d / 2, zb = cz - d / 2;
  return [
    [V(cx - w / 2, y, zb), V(cx - w / 2, y, zf), V(cx, y + h, zf), V(cx, y + h, zb)],
    [V(cx + w / 2, y, zf), V(cx + w / 2, y, zb), V(cx, y + h, zb), V(cx, y + h, zf)],
  ];
}

export function mesh(geo, color, opts = {}) {
  const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color, roughness: 0.9, ...opts }));
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}
export const box = (w, h, d, color, opts) => mesh(new THREE.BoxGeometry(w, h, d), color, opts);
export const flat = (w, d, color, y = 0.02) => {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshStandardMaterial({ color, roughness: 1 }));
  m.rotation.x = -Math.PI / 2;
  m.position.y = y;
  m.receiveShadow = true;
  return m;
};

// A house: wall blocks (light stucco), hip and gable roofs over them, roof vents
function house(world, { blocks, gables = [], roofTex, wall = 0xd8cfbf, vents = [] }) {
  const roofGroup = new THREE.Group();
  const faces = [];
  const H = 3.2;
  for (const [cx, cz, w, d, rise] of blocks) {
    const walls = box(w - 0.6, H, d - 0.6, wall);
    walls.position.set(cx, H / 2, cz);
    world.add(walls);
    faces.push(...hipFaces(cx, cz, w, d, H, rise));
  }
  for (const [cx, cz, w, d, rise] of gables) faces.push(...gableFaces(cx, cz, w, d, H + 0.2, rise));
  const roof = mesh(facesGeometry(faces), 0xffffff, { map: roofTex, roughness: 0.95, side: THREE.DoubleSide, emissive: new THREE.Color(0xd4b572), emissiveIntensity: 0 });
  roofGroup.add(roof);
  for (const [x, z, s] of vents) {
    const v = box(s, 0.35, s, 0x2c2f33);
    v.position.set(x, 0, z);
    v.userData.vent = true;
    roofGroup.add(v);
  }
  world.add(roofGroup);
  return { roofGroup, roof };
}

// Put each vent on the roof surface (cast down onto it)
function seatVents(roofGroup, roof) {
  const ray = new THREE.Raycaster();
  roofGroup.children.filter((c) => c.userData.vent).forEach((v) => {
    ray.set(V(v.position.x, 50, v.position.z), V(0, -1, 0));
    const hit = ray.intersectObject(roof)[0];
    if (hit) v.position.y = hit.point.y + 0.12;
  });
}

export class HouseSceneEngine {
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
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearColor(0x22301f);

    const scene = (this.scene = new THREE.Scene());
    scene.fog = new THREE.Fog(0x2a3526, 60, 120);
    this.camera = new THREE.PerspectiveCamera(32, 1, 0.5, 260);

    // Late-afternoon sun from the right and a soft sky
    scene.add(new THREE.HemisphereLight(0xcfe3ff, 0x3b4a2a, 0.9));
    const sun = new THREE.DirectionalLight(0xffe2b8, 2.3);
    sun.position.set(30, 30, 18);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -45, right: 45, top: 35, bottom: -35, near: 1, far: 120 });
    sun.shadow.bias = -0.0006;
    scene.add(sun);
    this.cursorLight = new THREE.PointLight(0xffd59a, 0, 26, 1.5);
    scene.add(this.cursorLight);

    const world = (this.world = new THREE.Group());
    scene.add(world);

    // Ground: lawns everywhere, then concrete, the sidewalk and the street toward the front (+z)
    world.add(flat(200, 200, 0x4e7d33, 0));
    const street = flat(200, 7, 0x2c2e31, 0.03);
    street.position.z = 24.5;
    world.add(street);
    const curb = box(200, 0.25, 0.4, 0xbfc0bd);
    curb.position.set(0, 0.12, 20.9);
    world.add(curb);
    const walk = flat(200, 2.4, 0xc9c8c3, 0.04);
    walk.position.z = 18.6;
    world.add(walk);
    const parkway = flat(200, 1.6, 0x588f3a, 0.035);
    parkway.position.z = 20.2;
    world.add(parkway);
    // Driveways for the three homes, and the walk to the front door
    [[-6.5, 7, 9], [-27, 7, 8], [27, 7, 8]].forEach(([x, w]) => {
      const dw = flat(w, 11, 0xd2d1cc, 0.045);
      dw.position.set(x, 0.045, 12.6);
      world.add(dw);
    });
    const path = flat(2, 6, 0xd2d1cc, 0.045);
    path.position.set(2.6, 0.045, 11);
    world.add(path);
    // Planting beds along the front of the middle house
    const bed = flat(26, 2.2, 0x4a3a2a, 0.05);
    bed.position.set(1, 0.05, 6.6);
    world.add(bed);

    // The middle house: main hip roof, a garage wing at the front left, a wing at the right, a back wing, and a gable over the entry
    const roofTex = shingleTexture('#4c5157', '#2f3338');
    roofTex.repeat.set(1, 1);
    const mid = house(world, {
      roofTex,
      blocks: [
        [0, -1.5, 18, 12, 3.6],
        [-6.5, 3.2, 9, 6.5, 2.6],
        [8.2, 1.5, 7, 9, 2.8],
        [1, -8.5, 8, 6, 2.4],
      ],
      gables: [[2.6, 4.2, 4.2, 5, 2.2]],
      vents: [[-2.5, -4, 0.7], [1.5, -5, 0.7], [-5.5, -2.5, 0.7], [4.5, -3.5, 0.7], [8, -1, 0.6], [9.2, 2.6, 0.6]],
    });
    seatVents(mid.roofGroup, mid.roof);
    this.midRoof = mid.roof;
    this.midGroup = mid.roofGroup;
    // Gold outline of the middle roof's eaves, hips and ridges, lit while the pointer is over it
    this.outline = new THREE.LineSegments(new THREE.EdgesGeometry(mid.roof.geometry, 20), new THREE.LineBasicMaterial({ color: 0xe0c68a, transparent: true, opacity: 0 }));
    mid.roofGroup.add(this.outline);
    // Garage door and front door
    const garage = box(6.4, 2.4, 0.15, 0xeeeae2);
    garage.position.set(-6.5, 1.2, 6.25);
    world.add(garage);
    const door = box(1.4, 2.4, 0.15, 0x2a2420);
    door.position.set(2.6, 1.2, 6.4);
    world.add(door);

    // Neighbors: brown shingles on the left, gray on the right (cropped by the frame, like the photo)
    house(world, { roofTex: shingleTexture('#7b6650', '#5b4a39'), blocks: [[-27, -2, 16, 14, 4], [-23, 4.5, 8, 6, 2.6]], vents: [] });
    house(world, { roofTex: shingleTexture('#5d6168', '#3d4146'), blocks: [[27, -2, 16, 14, 4], [24, 4.8, 8, 6, 2.6]], vents: [] });

    // Fences between the lots and along the back
    [[-15.5, -6, 0.25, 26], [17, -6, 0.25, 26], [0, -19, 64, 0.25]].forEach(([x, z, w, d]) => {
      const f = box(w, 1.6, d, 0x4a3b2d);
      f.position.set(x, 0.8, z);
      world.add(f);
    });

    // Trees and shrubs: faceted foliage in the photo's greens
    const greens = [0x5d8c34, 0x7aa83e, 0x9cc04a, 0x46702c, 0x6b9a3a];
    const foliage = (x, z, s, y = 0, n = 6) => {
      const t = new THREE.Group();
      for (let i = 0; i < n; i++) {
        const m = mesh(new THREE.IcosahedronGeometry(s * (0.5 + Math.random() * 0.45), 1), greens[(i * 3 + Math.abs(Math.round(x))) % greens.length], { flatShading: true, roughness: 1 });
        m.position.set((Math.random() - 0.5) * s * 1.4, y + s * (0.9 + Math.random() * 0.7), (Math.random() - 0.5) * s * 1.4);
        t.add(m);
      }
      t.position.set(x, 0, z);
      world.add(t);
      return t;
    };
    this.trees = [
      foliage(-14, 12, 3.4), foliage(5, 14, 2.6), foliage(16, 12, 3.2), foliage(-24, 16, 2.6), foliage(23, 16, 2.4),
      foliage(-13, -4, 2.2), foliage(-13, 2, 2.4), foliage(14, -2, 2.4), foliage(14, 6, 2.6),
      foliage(-8, -16, 3), foliage(6, -16, 2.8), foliage(14, -15, 2.4), foliage(0, 20.3, 1.2, 0, 4), foliage(14, 20.3, 1.3, 0, 4),
    ];
    for (let x = -11; x < 14; x += 2.2) foliage(x, 6.8, 0.7, 0, 3);

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

  resize() {
    if (!this.renderer) return;
    const r = this.canvas.getBoundingClientRect();
    const w = Math.max(2, Math.round(r.width)), h = Math.max(2, Math.round(r.height));
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.distance = w / h < 0.8 ? 100 : w / h < 1.2 ? 78 : 66;
    // The haze starts beyond the street, whatever the camera distance (a fixed range greyed out the whole scene on phones, where the camera sits farther back)
    this.scene.fog.near = this.distance + 10;
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
    const k = 1 - Math.pow(0.02, dt || 0.016);
    smooth.x += (target.x - smooth.x) * k;
    smooth.y += (target.y - smooth.y) * k;
    this.time += dt || 0;

    // Drone camera over the street, looking down at the house; it swings gently with the pointer and drifts a little on its own
    const az = Math.PI / 2 + Math.sin(this.time * 0.12) * 0.06 + smooth.x * 0.22;
    const el = 1.12 + smooth.y * 0.08;
    const dist = this.distance || 56;
    camera.position.set(Math.cos(az) * Math.cos(el) * dist, Math.sin(el) * dist, Math.sin(az) * Math.cos(el) * dist);
    camera.lookAt(0, 0, 5);

    let over = false;
    if (target.inside && !this.reduced) {
      this.pointer.set(smooth.x, smooth.y);
      this.ray.setFromCamera(this.pointer, camera);
      const hit = this.ray.intersectObject(this.midRoof)[0];
      if (hit) {
        over = true;
        this.cursorLight.position.set(hit.point.x, hit.point.y + 4, hit.point.z);
      } else {
        const p = V(0, 0, 0);
        if (this.ray.ray.intersectPlane(this.ground, p)) this.cursorLight.position.set(p.x, 4, p.z);
      }
    }
    const ease = (v, to, s = 5) => v + (to - v) * Math.min(1, (dt || 0.016) * s);
    this.hover = ease(this.hover, over ? 1 : 0);
    this.cursorLight.intensity = ease(this.cursorLight.intensity, target.inside && !this.reduced ? 70 : 0);
    this.outline.material.opacity = this.hover;
    this.midRoof.material.emissiveIntensity = this.hover * 0.06;
    this.midGroup.position.y = this.hover * 0.35;
    // A breeze in the trees
    this.trees.forEach((t, i) => (t.rotation.z = Math.sin(this.time * 0.9 + i) * 0.015));

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
