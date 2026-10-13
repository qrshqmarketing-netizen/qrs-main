// The 3D scene behind the Commercial Roofing hero (RoofScene3D.jsx, scene="commercial"): a one-story commercial building on a street corner seen from
// a drone in bright sun. A flat roof in white cap sheet with its seams and end laps, a tall parapet on the two street sides with a clipped corner and a
// low one on the others, three packaged HVAC units with turning fans, a mini-split, vent pipes, skylights and conduit; around it the parking lot with
// cars, the main street with its yellow center lines, the cross street, a utility pole with its wires and a low building across the street. No sign
// lettering (the photo's tenant isn't ours to show). Built from simple shapes with three.js (no model file). Mouse: the camera drifts with the
// pointer, a warm light follows the cursor; over the roof its edge is traced in gold, over an HVAC unit that unit lifts and its fan speeds up.
// 30 fps only while on screen; one still frame for reduced motion.
import * as THREE from 'three';

const FPS = 30;
const WALL = 5;
const V = (x, y, z) => new THREE.Vector3(x, y, z);

// The building's footprint (x along the main street, z toward the parking lot), the back-right corner clipped like the photo's
const FOOT = [[-20, -11], [17, -11], [20, -8], [20, 11], [-20, 11]];

// White cap sheet: rolls running along the building (seams every 1.4 units) with staggered end laps and a little grime
function capSheetTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 1024;
  const g = c.getContext('2d');
  g.fillStyle = '#e4e7e7';
  g.fillRect(0, 0, 1024, 1024);
  for (let i = 0; i < 3000; i++) {
    const v = 150 + Math.random() * 50;
    g.fillStyle = `rgba(${v},${v},${v + 4},${Math.random() * 0.07})`;
    g.fillRect(Math.random() * 1024, Math.random() * 1024, 2 + Math.random() * 8, 2 + Math.random() * 5);
  }
  const rows = 10, h = 1024 / rows;
  for (let r = 0; r < rows; r++) {
    const y = Math.round(r * h);
    g.fillStyle = 'rgba(70,76,82,.55)';
    g.fillRect(0, y, 1024, 3);
    g.fillStyle = 'rgba(0,0,0,.05)';
    g.fillRect(0, y + 3, 1024, 6);
    // end laps: a short seam across the roll, staggered from row to row
    for (let x = (r % 3) * 150 + 60; x < 1024; x += 420) {
      g.fillStyle = 'rgba(70,76,82,.4)';
      g.fillRect(x, y, 3, h);
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1 / 14, 1 / 14);
  tex.anisotropy = 4;
  return tex;
}

function mesh(geo, color, opts = {}) {
  const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color, roughness: 0.85, ...opts }));
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}
const box = (w, h, d, color, opts) => mesh(new THREE.BoxGeometry(w, h, d), color, opts);
const cyl = (r, h, color, n = 12) => mesh(new THREE.CylinderGeometry(r, r, h, n), color);
const flat = (w, d, color, y = 0.02) => {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshStandardMaterial({ color, roughness: 1 }));
  m.rotation.x = -Math.PI / 2;
  m.position.y = y;
  m.receiveShadow = true;
  return m;
};
const at = (m, x, y, z) => (m.position.set(x, y, z), m);
// A footprint polygon as a shape (shape y = -world z, so a -90° turn about x lays it flat)
const shapeOf = (pts) => new THREE.Shape(pts.map(([x, z]) => new THREE.Vector2(x, -z)));

// A wall run between two footprint points (parapets)
function wallAlong(world, [x1, z1], [x2, z2], h, t, color, y0) {
  const len = Math.hypot(x2 - x1, z2 - z1);
  const w = box(len + t, h, t, color);
  w.position.set((x1 + x2) / 2, y0 + h / 2, (z1 + z2) / 2);
  w.rotation.y = -Math.atan2(z2 - z1, x2 - x1);
  world.add(w);
  return w;
}

// A simple car: body, cabin with dark glass
function car(world, x, z, rot, color, van = false) {
  const g = new THREE.Group();
  if (van) {
    g.add(at(box(5.2, 2, 2.1, color), 0, 1.25, 0));
    g.add(at(box(0.9, 0.7, 1.9, 0x2a3036), 2.25, 1.75, 0));
  } else {
    g.add(at(box(4.5, 0.85, 1.95, color, { metalness: 0.3, roughness: 0.45 }), 0, 0.65, 0));
    g.add(at(box(2.4, 0.7, 1.75, 0x2a3036, { metalness: 0.4, roughness: 0.3 }), -0.2, 1.4, 0));
    g.add(at(box(2.1, 0.08, 1.6, color, { metalness: 0.3, roughness: 0.45 }), -0.2, 1.78, 0));
  }
  g.position.set(x, 0, z);
  g.rotation.y = rot;
  world.add(g);
}

// A packaged rooftop HVAC unit: cabinet, a fan grille with turning blades on top, the duct box beside it
function hvac(x, z, rot = 0) {
  const g = new THREE.Group();
  const body = box(2.6, 1.5, 1.9, 0xc9cccd, { metalness: 0.2, roughness: 0.6 });
  body.position.y = 0.95;
  g.add(body);
  g.add(at(box(2.8, 0.2, 2.1, 0x8e9396), 0, 0.1, 0));
  const duct = box(1.1, 0.9, 1.3, 0xb8bcbe, { metalness: 0.3, roughness: 0.5 });
  duct.position.set(-1.8, 0.55, 0.1);
  g.add(duct);
  const grille = mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.06, 24), 0x2b2f33);
  grille.position.set(0.5, 1.73, 0);
  g.add(grille);
  const fan = new THREE.Group();
  for (let i = 0; i < 4; i++) {
    const blade = box(0.52, 0.03, 0.16, 0x6d7276);
    blade.position.x = 0.26;
    const arm = new THREE.Group();
    arm.rotation.y = (i * Math.PI) / 2;
    arm.add(blade);
    fan.add(arm);
  }
  fan.position.set(0.5, 1.78, 0);
  g.add(fan);
  g.position.set(x, WALL, z);
  g.rotation.y = rot;
  return { group: g, body, fan, spin: 0, lift: 0 };
}

export class CommercialSceneEngine {
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
    renderer.toneMappingExposure = 0.78;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearColor(0x6b665a);

    const scene = (this.scene = new THREE.Scene());
    scene.fog = new THREE.Fog(0x6b665a, 80, 140);
    this.camera = new THREE.PerspectiveCamera(32, 1, 0.5, 300);

    // Late-afternoon sun, low from the front left (long shadows, warm light that keeps the white roof from glaring under the copy), a cool sky
    scene.add(new THREE.HemisphereLight(0xb9cde4, 0x6e6352, 0.75));
    const sun = new THREE.DirectionalLight(0xffd6a0, 2.6);
    sun.position.set(-38, 30, 26);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -55, right: 55, top: 45, bottom: -45, near: 1, far: 140 });
    sun.shadow.bias = -0.0006;
    scene.add(sun);
    this.cursorLight = new THREE.PointLight(0xffd59a, 0, 28, 1.5);
    scene.add(this.cursorLight);

    const world = (this.world = new THREE.Group());
    scene.add(world);

    // Ground: a dusty lot everywhere, the main street behind the building (-z), the cross street at the right (+x), the parking lot in front (+z)
    world.add(flat(260, 260, 0xa3967c, 0));
    world.add(at(flat(260, 9, 0x3d3f42, 0.03), 0, 0.03, -20));
    [-19.75, -19.25].forEach((z) => world.add(at(flat(260, 0.18, 0xe0b23a, 0.04), 0, 0.04, z)));
    [-23.8, -16.2].forEach((z) => world.add(at(flat(260, 0.14, 0xd9d9d4, 0.04), 0, 0.04, z)));
    world.add(at(flat(9, 260, 0x3d3f42, 0.031), 29.5, 0.031, 0));
    // crosswalk stripes across the cross street, by the corner
    for (let x = 26; x < 33.5; x += 1.1) world.add(at(flat(0.55, 3.2, 0xdedcd6, 0.045), x, 0.045, -13.4));
    // sidewalks along both streets, with curbs
    world.add(at(flat(260, 4, 0xcfcac0, 0.035), 0, 0.035, -13.6));
    world.add(at(flat(5.2, 60, 0xcfcac0, 0.036), 22.6, 0.036, 8));
    world.add(at(box(260, 0.22, 0.35, 0xbebcb6), 0, 0.11, -15.6));
    world.add(at(box(0.35, 0.22, 60, 0xbebcb6), 25.2, 0.11, 8));
    // the parking lot: asphalt, stall lines square to the building, wheel stops
    world.add(at(flat(56, 24, 0x4a4c50, 0.034), -8, 0.034, 23));
    for (let x = -34; x <= 18; x += 3.2) {
      world.add(at(flat(0.14, 6, 0xe2e2de, 0.04), x, 0.04, 15.2));
      if (x < 18) world.add(at(box(1.8, 0.18, 0.35, 0xd8d6cf), x + 1.6, 0.09, 12.6));
    }
    world.add(at(flat(56, 0.14, 0xe2e2de, 0.04), -8, 0.04, 18.2));

    // The building: stucco walls, the cap-sheet roof, parapets (tall on the street sides, low on the others)
    const shape = shapeOf(FOOT);
    const walls = mesh(new THREE.ExtrudeGeometry(shape, { depth: WALL, bevelEnabled: false }), 0xbdb3a2);
    walls.rotation.x = -Math.PI / 2;
    world.add(walls);
    // a darker base band and a few doors and windows on the parking side
    for (let x = -16; x <= 14; x += 7.5) {
      world.add(at(box(2.2, 2.4, 0.12, 0x3c444b, { metalness: 0.3, roughness: 0.35 }), x, 1.2, 11.05));
    }
    world.add(at(box(0.12, 2.6, 3.5, 0x2d3338, { metalness: 0.3, roughness: 0.35 }), 20.05, 1.3, 4));
    this.roofMat = new THREE.MeshStandardMaterial({ map: capSheetTexture(), roughness: 0.75, emissive: new THREE.Color(0xd4b572), emissiveIntensity: 0 });
    const roof = (this.roof = new THREE.Mesh(new THREE.ShapeGeometry(shape), this.roofMat));
    roof.rotation.x = -Math.PI / 2;
    roof.position.y = WALL + 0.02;
    roof.receiveShadow = true;
    world.add(roof);
    const parapet = 0xe8eaea;
    const [p0, p1, p2, p3, p4] = FOOT;
    wallAlong(world, p0, p1, 1.6, 0.35, parapet, WALL); // main street side
    wallAlong(world, p1, p2, 1.6, 0.35, parapet, WALL); // clipped corner
    wallAlong(world, p2, p3, 1.6, 0.35, parapet, WALL); // cross street side
    wallAlong(world, p3, p4, 0.5, 0.35, parapet, WALL); // parking side
    wallAlong(world, p4, p0, 0.5, 0.35, parapet, WALL); // back end
    // a hip-roofed awning over the clipped corner, as on the photo
    const awning = box(4.6, 0.35, 1.6, 0x9ea2a4);
    awning.position.set(19.4, WALL - 1.2, -10.2);
    awning.rotation.y = Math.PI / 4;
    world.add(awning);
    // a gold line around the roof's edge, lit while the pointer is over the roof
    this.edgeMat = new THREE.LineBasicMaterial({ color: 0xe0c68a, transparent: true, opacity: 0 });
    const edge = [...FOOT, FOOT[0]].map(([x, z]) => V(x - Math.sign(x) * 0.25, WALL + 0.08, z - Math.sign(z) * 0.25));
    world.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(edge), this.edgeMat));

    // On the roof: three packaged units, a mini-split, vent pipes, skylights, conduit
    this.units = [hvac(-9, -3.5), hvac(-2.5, -5.5), hvac(4, -6.5)];
    this.units.forEach((u) => world.add(u.group));
    const split = box(1.2, 0.95, 0.5, 0xe3e5e5);
    split.position.set(7, WALL + 0.55, 3.5);
    world.add(split);
    const splitFan = mesh(new THREE.CircleGeometry(0.32, 20), 0x3a3f44);
    splitFan.position.set(7.1, WALL + 0.55, 3.76);
    world.add(splitFan);
    [[9, 6.5], [10.2, 7.2], [11, 8.4], [12.4, 7.6], [-6, 5], [-3.5, 6.5], [1, 4.5], [-12, 7], [14.5, 2]].forEach(([x, z], i) => {
      world.add(at(cyl(0.16, 0.7 + (i % 3) * 0.2, 0xf2f3f3), x, WALL + 0.4, z));
      world.add(at(cyl(0.3, 0.1, 0xdcdedd), x, WALL + 0.06, z));
    });
    [[-15.5, 9.4], [12.5, 9.6], [-3, 9.5], [16, -2.5]].forEach(([x, z]) => {
      world.add(at(box(1.5, 0.35, 1.1, 0xdfe7ea, { roughness: 0.3 }), x, WALL + 0.2, z));
    });
    // a small satellite dish near the clipped corner
    const dish = mesh(new THREE.SphereGeometry(0.55, 16, 8, 0, Math.PI * 2, 0, Math.PI / 3), 0xd7d9da, { side: THREE.DoubleSide });
    dish.position.set(15.6, WALL + 0.9, -6.6);
    dish.rotation.x = -0.9;
    world.add(dish);
    const conduit = new THREE.LineBasicMaterial({ color: 0x5c6166 });
    const line = (pts) => world.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts.map(([x, z]) => V(x, WALL + 0.08, z))), conduit));
    line([[-9, -2.5], [-9, 10.6]]);
    line([[-2.5, -4.6], [-2.5, 2], [-14, 2], [-14, 10.6]]);
    line([[4, -5.6], [4, 0.5], [18, 0.5], [18, 10.6]]);
    line([[-19.6, 9.8], [19.6, 9.8]]);
    line([[-19.6, -10.4], [16.6, -10.4]]);
    // loose cable runs near the front, gently curved
    for (let k = 0; k < 3; k++) {
      const pts = [];
      for (let i = 0; i <= 30; i++) {
        const t = i / 30;
        pts.push([2 + t * 17, 9 - k * 2.4 - Math.sin(t * Math.PI * (2 + k)) * 1.1]);
      }
      line(pts);
    }

    // Cars in the lot and along the street, a van, a box truck on the dirt lot across the street
    car(world, -3.6, 15.2, Math.PI / 2, 0xb9bec4);
    car(world, -25.6, 15.2, Math.PI / 2, 0xeeeeee, true);
    car(world, 7.6, 15.2, Math.PI / 2, 0x6c7178);
    car(world, -13, 21.5, 0, 0xe8e8e6);
    car(world, -26, -26.8, 0, 0xf0f0ee);
    car(world, -10, -26.8, 0, 0x8d9298);
    car(world, 20, -27, 0, 0xf4f4f2);
    car(world, 40, -27, 0, 0xe9e9e7);
    const truck = new THREE.Group();
    truck.add(at(box(6.5, 3, 2.6, 0xf2f1ee), 0, 1.9, 0));
    truck.add(at(box(2, 2.1, 2.4, 0xe9e9e6), 4.4, 1.35, 0));
    truck.position.set(-36, 0, -36);
    world.add(truck);

    // Across the main street: a low white building with a teal band
    const across = box(30, 4, 14, 0xeef0ef);
    across.position.set(20, 2, -37);
    world.add(across);
    world.add(at(box(30.1, 0.6, 14.1, 0x2c7f86), 20, 3.2, -37));
    world.add(at(box(12, 3.2, 10, 0xe6e8e7), -4, 1.6, -36));

    // The utility pole at the corner, its crossarm and wires; a street light
    const pole = cyl(0.25, 14, 0x6b5641, 8);
    pole.position.set(24.2, 7, -14.6);
    world.add(pole);
    world.add(at(box(0.25, 0.25, 4, 0x6b5641), 24.2, 13.3, -14.6));
    const wire = new THREE.LineBasicMaterial({ color: 0x2a2c2e, transparent: true, opacity: 0.7 });
    [-1.6, 0, 1.6].forEach((dz) => {
      const pts = [];
      for (let i = 0; i <= 24; i++) {
        const t = i / 24;
        pts.push(V(24.2 - t * 90, 13.4 - Math.sin(t * Math.PI * 3) ** 2 * 0.8, -14.6 + dz));
      }
      world.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), wire));
    });
    const lamp = cyl(0.14, 9, 0x8b8f92, 8);
    lamp.position.set(34.6, 4.5, -10);
    world.add(lamp);
    world.add(at(box(2.4, 0.18, 0.4, 0x8b8f92), 33.6, 9, -10));

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
    this.distance = w / h < 0.8 ? 118 : w / h < 1.2 ? 92 : 76;
    // the haze starts beyond the far street, whatever the camera distance
    this.scene.fog.near = this.distance + 15;
    this.scene.fog.far = this.distance + 80;
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

    // Drone camera over the parking lot and the cross street, looking across the roof toward the main street
    const az = 0.95 + Math.sin(this.time * 0.1) * 0.06 + smooth.x * 0.2;
    const el = 0.88 + smooth.y * 0.08;
    const dist = this.distance || 76;
    camera.position.set(Math.cos(az) * Math.cos(el) * dist, Math.sin(el) * dist, Math.sin(az) * Math.cos(el) * dist);
    camera.lookAt(0, 2, -1);

    let overRoof = false;
    let overUnit = null;
    if (target.inside && !this.reduced) {
      this.pointer.set(smooth.x, smooth.y);
      this.ray.setFromCamera(this.pointer, camera);
      const unitHit = this.ray.intersectObjects(this.units.map((u) => u.body))[0];
      if (unitHit) overUnit = this.units.find((u) => u.body === unitHit.object);
      const hit = unitHit || this.ray.intersectObject(this.roof)[0];
      if (hit) {
        overRoof = true;
        this.cursorLight.position.set(hit.point.x, hit.point.y + 4, hit.point.z);
      } else {
        const p = V(0, 0, 0);
        if (this.ray.ray.intersectPlane(this.ground, p)) this.cursorLight.position.set(p.x, 4, p.z);
      }
    }
    const ease = (v, to, s = 5) => v + (to - v) * Math.min(1, (dt || 0.016) * s);
    this.hover = ease(this.hover, overRoof ? 1 : 0);
    this.cursorLight.intensity = ease(this.cursorLight.intensity, target.inside && !this.reduced ? 80 : 0);
    this.edgeMat.opacity = this.hover;
    this.roofMat.emissiveIntensity = this.hover * 0.05;
    // The fans turn; the one under the pointer spins up and its unit lifts a little
    this.units.forEach((u, i) => {
      const on = u === overUnit;
      u.spin = ease(u.spin, on ? 14 : 2.2 + i * 0.4, 2.5);
      u.lift = ease(u.lift, on ? 0.45 : 0);
      u.fan.rotation.y += u.spin * (dt || 0);
      u.group.position.y = WALL + u.lift;
      u.body.material.emissive?.setHex(0xd4b572);
      u.body.material.emissiveIntensity = u.lift * 0.25;
    });

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
