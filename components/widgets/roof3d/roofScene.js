// The 3D model behind the home hero (RoofScene3D.jsx): the round, 12-sided flat roof from the Hollywood Hills West project, seen from a drone at
// dusk in the rain: the white cap-sheet roof with its seams, the dark deck railing along the edge and across the roof, the HVAC unit with a
// turning fan, the outside stairs, a patio umbrella and trees around the lot. three.js, built from simple shapes (no model file).
// Mouse: the camera drifts with the pointer, a warm light follows the cursor over the roof, the roof's edge lights up in gold while the pointer is
// over it and the fan spins faster over the HVAC unit. The page's copy sits on top of the canvas, so the pointer is read from the window.
// Draws at 30 fps only while on screen and the tab is visible; reduced motion gets one still frame.
import * as THREE from 'three';

const R = 10; // the roof's radius
const SIDES = 12;
const WALL = 5;
const FPS = 30;

const corner = (i, r = R) => {
  const a = (i / SIDES) * Math.PI * 2 + Math.PI / SIDES;
  return new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r);
};

// The white cap sheet: long strips laid diagonally with dark seams and staggered end laps, a little grime
function roofTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 1024;
  const g = c.getContext('2d');
  g.fillStyle = '#eef0ef';
  g.fillRect(0, 0, 1024, 1024);
  for (let i = 0; i < 2200; i++) {
    g.fillStyle = `rgba(${150 + Math.random() * 40},${150 + Math.random() * 40},${150 + Math.random() * 40},${Math.random() * 0.08})`;
    g.fillRect(Math.random() * 1024, Math.random() * 1024, 2 + Math.random() * 6, 2 + Math.random() * 6);
  }
  g.save();
  g.translate(512, 512);
  g.rotate(-0.42);
  g.translate(-800, -800);
  g.strokeStyle = 'rgba(40,44,48,.55)';
  g.lineWidth = 3;
  for (let x = 0; x < 1600; x += 92) {
    g.beginPath();
    g.moveTo(x, 0);
    g.lineTo(x, 1600);
    g.stroke();
    for (let y = 120 + ((x / 92) % 3) * 140; y < 1600; y += 420) {
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x + 92, y + 6);
      g.stroke();
    }
  }
  g.restore();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function box(w, h, d, color, opts = {}) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.05, ...opts }));
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

// A railing between two points on the roof: posts and a top rail, dark like the photo
function railing(a, b, y, group) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
  const rail = box(len, 0.12, 0.12, 0x15181b);
  rail.position.set(mid.x, y + 1.05, mid.z);
  rail.rotation.y = -Math.atan2(dir.z, dir.x);
  group.add(rail);
  const panel = box(len, 0.9, 0.05, 0x1d2125, { transparent: true, opacity: 0.85 });
  panel.position.set(mid.x, y + 0.55, mid.z);
  panel.rotation.y = rail.rotation.y;
  group.add(panel);
  const posts = Math.max(2, Math.round(len / 1.6));
  for (let i = 0; i <= posts; i++) {
    const p = new THREE.Vector3().lerpVectors(a, b, i / posts);
    const post = box(0.12, 1.1, 0.12, 0x15181b);
    post.position.set(p.x, y + 0.55, p.z);
    group.add(post);
  }
}

export class RoofSceneEngine {
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
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearColor(0x0b1a2b);

    const scene = (this.scene = new THREE.Scene());
    scene.fog = new THREE.Fog(0x0b1a2b, 38, 90);
    this.camera = new THREE.PerspectiveCamera(34, 1, 0.5, 200);

    // Dusk and rain: a cool sky light, a low moon-like key light with soft shadows, and the warm cursor light
    scene.add(new THREE.HemisphereLight(0x9fb8da, 0x14181d, 0.75));
    const key = (this.key = new THREE.DirectionalLight(0xdfe9ff, 1.7));
    key.position.set(-18, 34, 14);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    Object.assign(key.shadow.camera, { left: -26, right: 26, top: 26, bottom: -26, near: 1, far: 90 });
    key.shadow.bias = -0.0008;
    scene.add(key);
    this.cursorLight = new THREE.PointLight(0xffc977, 0, 22, 1.6);
    this.cursorLight.position.set(0, 9, 0);
    scene.add(this.cursorLight);

    const world = (this.world = new THREE.Group());
    scene.add(world);

    // Ground: patio concrete around the house, darker lot beyond
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(140, 140), new THREE.MeshStandardMaterial({ color: 0x2c3034, roughness: 1 }));
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    world.add(ground);
    const patio = new THREE.Mesh(new THREE.CircleGeometry(R + 7, 40), new THREE.MeshStandardMaterial({ color: 0x4a4d50, roughness: 0.95 }));
    patio.rotation.x = -Math.PI / 2;
    patio.position.y = 0.02;
    patio.receiveShadow = true;
    world.add(patio);

    // The house: 12 dark walls, a fascia band and the white roof
    const walls = new THREE.Mesh(new THREE.CylinderGeometry(R - 0.2, R - 0.2, WALL, SIDES), new THREE.MeshStandardMaterial({ color: 0x24282c, roughness: 0.9 }));
    walls.rotation.y = Math.PI / SIDES;
    walls.position.y = WALL / 2;
    walls.castShadow = walls.receiveShadow = true;
    world.add(walls);
    const fascia = new THREE.Mesh(new THREE.CylinderGeometry(R + 0.25, R + 0.25, 0.55, SIDES), new THREE.MeshStandardMaterial({ color: 0x5a524a, roughness: 0.8 }));
    fascia.rotation.y = Math.PI / SIDES;
    fascia.position.y = WALL + 0.05;
    fascia.castShadow = true;
    world.add(fascia);
    this.roofMat = new THREE.MeshStandardMaterial({ map: roofTexture(), roughness: 0.7, metalness: 0, emissive: new THREE.Color(0xd4b572), emissiveIntensity: 0 });
    const roof = (this.roof = new THREE.Mesh(new THREE.CircleGeometry(R, SIDES), this.roofMat));
    roof.rotation.x = -Math.PI / 2;
    roof.rotation.z = Math.PI / SIDES;
    roof.position.y = WALL + 0.34;
    roof.receiveShadow = true;
    world.add(roof);
    // A gold line around the roof's edge that lights up while the pointer is over the roof
    const edgePts = Array.from({ length: SIDES + 1 }, (_, i) => corner(i, R + 0.02).setY(WALL + 0.4));
    this.edgeMat = new THREE.LineBasicMaterial({ color: 0xe0c68a, transparent: true, opacity: 0 });
    world.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(edgePts), this.edgeMat));

    // The deck railing: along five edges of the roof, then across it with a jog, as in the photo
    const top = WALL + 0.34;
    for (let i = 6; i < 11; i++) railing(corner(i, R - 0.25), corner(i + 1, R - 0.25), top, world);
    const a = corner(8, R - 0.4), b = new THREE.Vector3(1.2, 0, -1.5), c = new THREE.Vector3(2.6, 0, R - 2.6), d = corner(3, R - 0.4);
    railing(a, b, top, world);
    railing(b, c, top, world);
    railing(c, d, top, world);

    // HVAC unit with its fan, and the duct box beside it
    const hvac = (this.hvac = new THREE.Group());
    const unit = box(2.4, 1.4, 2.2, 0x8b8681, { roughness: 0.6, metalness: 0.2 });
    unit.position.y = 0.7;
    hvac.add(unit);
    const grille = new THREE.Mesh(new THREE.CircleGeometry(0.8, 28), new THREE.MeshStandardMaterial({ color: 0x1b1d20 }));
    grille.rotation.x = -Math.PI / 2;
    grille.position.y = 1.41;
    hvac.add(grille);
    const fan = (this.fan = new THREE.Group());
    for (let i = 0; i < 4; i++) {
      const blade = box(0.7, 0.04, 0.22, 0x9a9590, { metalness: 0.4 });
      blade.position.x = 0.36;
      const holder = new THREE.Group();
      holder.rotation.y = (i * Math.PI) / 2;
      holder.add(blade);
      fan.add(holder);
    }
    fan.position.y = 1.44;
    hvac.add(fan);
    const duct = box(1.2, 1.0, 1.4, 0xcfd3d6, { roughness: 0.5, metalness: 0.3 });
    duct.position.set(-1.9, 0.5, 0.2);
    hvac.add(duct);
    hvac.position.set(3.6, top, 3.4);
    hvac.rotation.y = -0.45;
    world.add(hvac);

    // The outside stairs running down the left side
    for (let i = 0; i < 12; i++) {
      const step = box(1.6, 0.25, 0.7, 0x34383c);
      step.position.set(-R - 1.6, top - 0.2 - i * 0.42, -2 + i * 0.75);
      world.add(step);
    }
    const stringer = box(0.15, 0.4, 10, 0x15181b);
    stringer.position.set(-R - 0.75, 2.8, 2.2);
    stringer.rotation.x = 0.52;
    world.add(stringer);

    // A patio umbrella at the upper left
    const umbrella = new THREE.Mesh(new THREE.ConeGeometry(3.4, 1.4, 4), new THREE.MeshStandardMaterial({ color: 0x9a948c, roughness: 0.9, flatShading: true }));
    umbrella.position.set(-R - 4.5, 4.2, -R + 1.5);
    umbrella.rotation.y = Math.PI / 4;
    umbrella.castShadow = true;
    world.add(umbrella);
    const pole = box(0.12, 4, 0.12, 0x2a2d30);
    pole.position.set(-R - 4.5, 2, -R + 1.5);
    world.add(pole);

    // Trees around the lot: clusters of faceted foliage
    const leaf = [0x2f5a2c, 0x3d6e33, 0x4f8a3a, 0x6a9e3e, 0x27482a];
    const tree = (x, z, s) => {
      const t = new THREE.Group();
      for (let i = 0; i < 6; i++) {
        const m = new THREE.Mesh(new THREE.IcosahedronGeometry(s * (0.55 + Math.random() * 0.45), 1), new THREE.MeshStandardMaterial({ color: leaf[(((i + Math.round(x)) % leaf.length) + leaf.length) % leaf.length], roughness: 1, flatShading: true }));
        m.position.set((Math.random() - 0.5) * s * 1.6, s * (1.2 + Math.random() * 0.9), (Math.random() - 0.5) * s * 1.6);
        m.castShadow = true;
        t.add(m);
      }
      t.position.set(x, 0, z);
      world.add(t);
    };
    [[R + 6, 6, 4.2], [R + 7, -3, 3.6], [R + 3, 13, 3.4], [4, -R - 6, 3.8], [-6, -R - 6, 3.2], [-R - 9, 6, 2.8], [R + 12, 14, 4], [-R - 3, -R - 9, 2.6]].forEach(([x, z, s]) => tree(x, z, s));

    // Neighboring roofs at the edges of the lot
    [[-28, -6, 12, 3.5, 22], [0, -27, 26, 4, 10], [26, 22, 14, 3, 14]].forEach(([x, z, w, h, d]) => {
      const n = box(w, h, d, 0x3c4146);
      n.position.set(x, h / 2, z);
      world.add(n);
    });

    // Pointer state, smoothed toward its target every frame
    this.pointer = new THREE.Vector2(0, 0);
    this.target = { x: 0, y: 0, inside: false };
    this.smooth = { x: 0, y: 0 };
    this.ray = new THREE.Raycaster();
    this.hoverRoof = 0;
    this.hoverHvac = 0;
    this.fanSpeed = 1.2;
    this.angle = 0;
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
    // Phones (tall): pull back so the whole roof fits
    this.distance = w / h < 0.8 ? 64 : w / h < 1.2 ? 54 : 46;
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
    this.angle += dt * 0.035; // a slow drift around the house

    // Drone camera: high above and to one side, swinging a little with the pointer
    const az = 0.85 + this.angle + smooth.x * 0.32;
    const el = 1.02 + smooth.y * 0.1;
    const dist = this.distance || 44;
    camera.position.set(Math.cos(az) * Math.cos(el) * dist, Math.sin(el) * dist, Math.sin(az) * Math.cos(el) * dist);
    camera.lookAt(0, 2.5, 0);

    // What is the pointer over?
    let overRoof = false, overHvac = false;
    if (target.inside && !this.reduced) {
      this.pointer.set(smooth.x, smooth.y);
      this.ray.setFromCamera(this.pointer, camera);
      const hit = this.ray.intersectObjects([this.roof, this.hvac], true)[0];
      if (hit) {
        overHvac = this.hvac.getObjectById(hit.object.id) !== undefined;
        overRoof = !overHvac;
        this.cursorLight.position.set(hit.point.x, hit.point.y + 3.2, hit.point.z);
      } else {
        const ground = new THREE.Vector3();
        if (this.ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), ground)) this.cursorLight.position.set(ground.x, 3.2, ground.z);
      }
    }
    const ease = (v, to) => v + (to - v) * Math.min(1, (dt || 0.016) * 5);
    this.hoverRoof = ease(this.hoverRoof, overRoof ? 1 : 0);
    this.hoverHvac = ease(this.hoverHvac, overHvac ? 1 : 0);
    this.cursorLight.intensity = ease(this.cursorLight.intensity, target.inside && !this.reduced ? 55 : 0);
    this.roofMat.emissiveIntensity = this.hoverRoof * 0.08;
    this.edgeMat.opacity = this.hoverRoof * 0.95;
    this.fanSpeed = ease(this.fanSpeed, overHvac ? 14 : 1.2);
    this.fan.rotation.y += this.fanSpeed * (dt || 0);
    this.hvac.position.y = WALL + 0.34 + this.hoverHvac * 0.15;

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
