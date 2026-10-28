import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

/**
 * PrinterScene
 * Cena 3D (WebGL) de uma impressora CoreXY imprimindo um vaso espiral em "modo vaso".
 * O filamento é um cordão de extrusão real (seção elíptica), revelado progressivamente.
 * A mesa desce a cada camada, como em uma CoreXY de verdade.
 */

// ---------- Vaso ----------
const LAYERS = 96;
const SEG = 160;
const RV = 3.0;            // raio base do vaso
const HV = 8.5;            // altura das paredes
const LH = HV / LAYERS;    // altura de camada
const BEAD_W = 0.17;       // largura do cordão (espessura da parede)
const BASE_LAYERS = 3;
const BASE_H = LH * BASE_LAYERS;
const BASE_TURNS = 16;
const BASE_PTS = BASE_TURNS * 64;
const WALL_PTS = LAYERS * SEG + 1;
const RING = 8;
const IDX_PER_SEG = RING * 6;
const TOP_FINAL = BASE_H + HV + LH;

// ---------- Impressora ----------
const NZ = 13.6;           // altura (mundo) da ponta do bico
const HALF = 8.6;          // meia largura do quadro
const H_TOP = 17.6;
const H_BOT = 1.9;
const RAIL_Y = NZ + 2.25;
const PARK = { x: 5.5, z: -5.5 };
const BED_END = NZ - TOP_FINAL - 1.5;

// ---------- Tempo ----------
const HEAT_MS = 1800;
const BASE_MS = 1800;
const PRINT_MS = 16000;
const DONE_MS = 3600;
const FADE_MS = 1000;
const T_BASE = HEAT_MS;
const T_PRINT = T_BASE + BASE_MS;
const T_DONE = T_PRINT + PRINT_MS;
const T_FADE = T_DONE + DONE_MS;
const CYCLE = T_FADE + FADE_MS;

const NOZZLE_TEMP = 220;
const BED_TEMP = 60;

const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2);
const lerp = (a, b, t) => a + (b - a) * t;

function profile(t) {
  let p = 0.78 + 0.25 * Math.sin(Math.PI * t * 1.25);
  if (t > 0.85) p += 0.2 * ((t - 0.85) / 0.15) ** 2;
  return p;
}
const ribs = (th, t) => 1 + 0.065 * Math.cos(9 * th + t * Math.PI * 2.6);

function buildPaths() {
  const base = new Float32Array(BASE_PTS * 3);
  const baseRad = new Float32Array(BASE_PTS * 2);
  for (let i = 0; i < BASE_PTS; i++) {
    const u = i / (BASE_PTS - 1);
    const th = u * BASE_TURNS * Math.PI * 2;
    const r = u * RV * profile(0) * ribs(th, 0) * 0.95;
    const c = Math.cos(th);
    const s = Math.sin(th);
    base.set([r * c, BASE_H / 2, r * s], i * 3);
    baseRad.set([c, s], i * 2);
  }
  const wall = new Float32Array(WALL_PTS * 3);
  const wallRad = new Float32Array(WALL_PTS * 2);
  for (let k = 0; k < WALL_PTS; k++) {
    const th = ((k % SEG) / SEG) * Math.PI * 2;
    const t = k / (SEG * LAYERS);
    const r = RV * profile(t) * ribs(th, t);
    const c = Math.cos(th);
    const s = Math.sin(th);
    wall.set([r * c, BASE_H + t * HV + LH / 2, r * s], k * 3);
    wallRad.set([c, s], k * 2);
  }
  return { base, baseRad, wall, wallRad };
}

/** Gera o cordão de extrusão: um tubo de seção elíptica ao longo do caminho. */
function buildBead(pts, rads, w, h) {
  const n = pts.length / 3;
  const pos = new Float32Array(n * RING * 3);
  const nor = new Float32Array(n * RING * 3);
  const hw = w / 2;
  const hh = h / 2;
  for (let i = 0; i < n; i++) {
    const px = pts[i * 3];
    const py = pts[i * 3 + 1];
    const pz = pts[i * 3 + 2];
    const rx = rads[i * 2];
    const rz = rads[i * 2 + 1];
    for (let a = 0; a < RING; a++) {
      const ang = (a / RING) * Math.PI * 2;
      const ca = Math.cos(ang);
      const sa = Math.sin(ang);
      const o = (i * RING + a) * 3;
      pos[o] = px + rx * ca * hw;
      pos[o + 1] = py + sa * hh;
      pos[o + 2] = pz + rz * ca * hw;
      let nr = ca * hh;
      let nu = sa * hw;
      const l = Math.hypot(nr, nu) || 1;
      nr /= l;
      nu /= l;
      nor[o] = rx * nr;
      nor[o + 1] = nu;
      nor[o + 2] = rz * nr;
    }
  }
  const idx = new Uint32Array((n - 1) * IDX_PER_SEG);
  let k = 0;
  for (let i = 0; i < n - 1; i++) {
    for (let a = 0; a < RING; a++) {
      const v0 = i * RING + a;
      const v1 = i * RING + ((a + 1) % RING);
      const v2 = (i + 1) * RING + a;
      const v3 = (i + 1) * RING + ((a + 1) % RING);
      idx[k++] = v0; idx[k++] = v1; idx[k++] = v2;
      idx[k++] = v1; idx[k++] = v3; idx[k++] = v2;
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  geo.setIndex(new THREE.BufferAttribute(idx, 1));
  geo.computeBoundingSphere();
  geo.setDrawRange(0, 0);
  return geo;
}

/** Geometria que compartilha os buffers (para o trecho "quente" recém-extrudado). */
function shareGeometry(src) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', src.attributes.position);
  g.setAttribute('normal', src.attributes.normal);
  g.setIndex(src.index);
  g.boundingSphere = src.boundingSphere;
  g.setDrawRange(0, 0);
  return g;
}

function pathPoint(arr, fi) {
  const n = arr.length / 3;
  const i0 = Math.max(0, Math.min(n - 1, Math.floor(fi)));
  const i1 = Math.min(n - 1, i0 + 1);
  const f = Math.max(0, Math.min(1, fi - i0));
  return {
    x: lerp(arr[i0 * 3], arr[i1 * 3], f),
    y: lerp(arr[i0 * 3 + 1], arr[i1 * 3 + 1], f),
    z: lerp(arr[i0 * 3 + 2], arr[i1 * 3 + 2], f),
  };
}

function makeBedTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 1024;
  const x = c.getContext('2d');
  x.fillStyle = '#1b1b1f';
  x.fillRect(0, 0, 1024, 1024);
  // textura PEI granulada
  const img = x.getImageData(0, 0, 1024, 1024);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 22;
    img.data[i] += n;
    img.data[i + 1] += n;
    img.data[i + 2] += n;
  }
  x.putImageData(img, 0, 0);
  x.strokeStyle = 'rgba(255,255,255,0.07)';
  x.lineWidth = 4;
  x.strokeRect(30, 30, 964, 964);
  // marcadores laranja nos cantos
  x.strokeStyle = 'rgba(255,85,0,0.55)';
  x.lineWidth = 5;
  [[60, 60, 1, 1], [964, 60, -1, 1], [964, 964, -1, -1], [60, 964, 1, -1]].forEach(([px, py, sx, sy]) => {
    x.beginPath();
    x.moveTo(px + sx * 70, py);
    x.lineTo(px, py);
    x.lineTo(px, py + sy * 70);
    x.stroke();
  });
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function addBox(parent, mat, w, h, d, x, y, z, r = 0.06) {
  const m = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 2.1, h / 2.1, d / 2.1)), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}

export default function PrinterScene() {
  const wrapRef = useRef(null);
  const hostRef = useRef(null);
  const statusRef = useRef(null);
  const dotRef = useRef(null);
  const layerRef = useRef(null);
  const zRef = useRef(null);
  const nozzleRef = useRef(null);
  const bedRef = useRef(null);
  const barRef = useRef(null);
  const pctRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const host = hostRef.current;
    if (!wrap || !host) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const BG = new THREE.Color('#070708');

    // ---------- Renderer ----------
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    host.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';

    const scene = new THREE.Scene();
    scene.background = BG;
    scene.fog = new THREE.Fog(BG, 70, 130);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    if ('environmentIntensity' in scene) scene.environmentIntensity = 0.55;

    const camera = new THREE.PerspectiveCamera(26, 1, 0.5, 300);
    const target = new THREE.Vector3(0, 9.4, 0);

    // ---------- Luzes ----------
    const key = new THREE.DirectionalLight('#fff1e2', 2.4);
    key.position.set(-14, 28, 18);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    Object.assign(key.shadow.camera, { left: -14, right: 14, top: 14, bottom: -14, near: 1, far: 80 });
    key.shadow.bias = -0.0004;
    key.shadow.normalBias = 0.03;
    key.shadow.radius = 4;
    scene.add(key);

    const rim = new THREE.DirectionalLight('#a9c4ff', 1.3);
    rim.position.set(16, 14, -18);
    scene.add(rim);

    const fill = new THREE.DirectionalLight('#ffffff', 0.35);
    fill.position.set(10, 6, 20);
    scene.add(fill);

    // ---------- Materiais ----------
    const frameMat = new THREE.MeshStandardMaterial({ color: '#1d1e22', metalness: 0.75, roughness: 0.38 });
    const rodMat = new THREE.MeshStandardMaterial({ color: '#dfe2e7', metalness: 1, roughness: 0.16 });
    const baseMat = new THREE.MeshStandardMaterial({ color: '#0f0f12', metalness: 0.35, roughness: 0.5 });
    const aluDark = new THREE.MeshStandardMaterial({ color: '#2a2b30', metalness: 0.85, roughness: 0.35 });
    const alu = new THREE.MeshStandardMaterial({ color: '#b9bcc2', metalness: 1, roughness: 0.3 });
    const white = new THREE.MeshPhysicalMaterial({ color: '#ececee', roughness: 0.42, clearcoat: 0.25, clearcoatRoughness: 0.5 });
    const gloss = new THREE.MeshPhysicalMaterial({ color: '#0a0a0c', roughness: 0.12, clearcoat: 1 });
    const brass = new THREE.MeshStandardMaterial({ color: '#c9a165', metalness: 1, roughness: 0.26 });
    const carbon = new THREE.MeshPhysicalMaterial({ color: '#141416', metalness: 0.4, roughness: 0.32, clearcoat: 0.8 });
    const orangeGlow = new THREE.MeshStandardMaterial({ color: '#ff5500', emissive: '#ff5500', emissiveIntensity: 2.2 });
    const filament = new THREE.MeshPhysicalMaterial({
      color: '#ff5a0a', roughness: 0.36, metalness: 0, clearcoat: 0.35, clearcoatRoughness: 0.45,
    });
    const hotMat = new THREE.MeshStandardMaterial({
      color: '#ffb070', emissive: '#ff6a1a', emissiveIntensity: 1.6,
      polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
    });
    const tubeMat = new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: 0.15, transparent: true, opacity: 0.32 });
    const tubeCoreMat = new THREE.MeshStandardMaterial({ color: '#ff5a0a', roughness: 0.4 });

    // ---------- Chão ----------
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(220, 220),
      new THREE.MeshStandardMaterial({ color: '#0a0a0b', roughness: 0.9, metalness: 0 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // ---------- Quadro ----------
    const printer = new THREE.Group();
    scene.add(printer);

    addBox(printer, baseMat, HALF * 2 + 1.4, H_BOT, HALF * 2 + 1.4, 0, H_BOT / 2, 0, 0.28);
    addBox(printer, orangeGlow, 5, 0.06, 0.03, 3.6, H_BOT * 0.62, HALF + 0.72, 0.02);

    // logo oficial na frente da base
    new THREE.TextureLoader().load('/images/ziggie-logo-official-transparent.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 8;
      const logo = new THREE.Mesh(
        new THREE.PlaneGeometry(2.7, 2.7 * (220 / 476)),
        new THREE.MeshBasicMaterial({ map: tex, transparent: true, color: new THREE.Color(0.85, 0.85, 0.85) })
      );
      logo.position.set(-5.4, H_BOT / 2, HALF + 0.71);
      printer.add(logo);
    });

    const ext = 0.55;
    const postH = H_TOP - H_BOT;
    [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([sx, sz]) => {
      addBox(printer, frameMat, ext, postH, ext, sx * HALF, H_BOT + postH / 2, sz * HALF);
    });
    [H_TOP, H_BOT + ext / 2].forEach((y) => {
      [-1, 1].forEach((s) => {
        addBox(printer, frameMat, HALF * 2 + ext, ext, ext, 0, y, s * HALF);
        addBox(printer, frameMat, ext, ext, HALF * 2, s * HALF, y, 0);
      });
    });

    // guias Z e fuso
    const rodZ = -HALF + 0.9;
    [-5.2, 5.2].forEach((x) => {
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, postH, 24), rodMat);
      rod.position.set(x, H_BOT + postH / 2, rodZ);
      rod.castShadow = true;
      printer.add(rod);
    });
    const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, postH, 16), alu);
    screw.position.set(0, H_BOT + postH / 2, rodZ);
    printer.add(screw);

    // trilhos Y no topo
    [-1, 1].forEach((s) => {
      addBox(printer, alu, 0.35, 0.28, HALF * 2 - 0.6, s * (HALF - 0.6), RAIL_Y, 0, 0.04);
    });

    // ---------- Mesa (desce em Z) ----------
    const bed = new THREE.Group();
    scene.add(bed);
    addBox(bed, aluDark, 12.4, 0.3, 12.4, 0, -0.4, 0, 0.08);
    [-5.2, 5.2].forEach((x) => {
      addBox(bed, aluDark, 1.1, 0.3, 1.6, x, -0.4, -6.95, 0.05);
      const bearing = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 1.2, 24), aluDark);
      bearing.position.set(x, -0.4, rodZ);
      bearing.castShadow = true;
      bed.add(bearing);
    });
    addBox(bed, brass, 0.7, 0.5, 0.7, 0, -0.4, rodZ, 0.05);
    const plate = new THREE.Mesh(
      new THREE.BoxGeometry(12, 0.18, 12),
      new THREE.MeshStandardMaterial({ map: makeBedTexture(), roughness: 0.72, metalness: 0.15 })
    );
    plate.position.y = -0.09;
    plate.receiveShadow = true;
    plate.castShadow = true;
    bed.add(plate);

    // ---------- Vaso (filamento real) ----------
    const paths = buildPaths();
    const baseGeo = buildBead(paths.base, paths.baseRad, BEAD_W * 0.98, BASE_H);
    const wallGeo = buildBead(paths.wall, paths.wallRad, BEAD_W, LH * 1.08);
    const baseMesh = new THREE.Mesh(baseGeo, filament);
    const wallMesh = new THREE.Mesh(wallGeo, filament);
    const hotBaseGeo = shareGeometry(baseGeo);
    const hotWallGeo = shareGeometry(wallGeo);
    const hotBase = new THREE.Mesh(hotBaseGeo, hotMat);
    const hotWall = new THREE.Mesh(hotWallGeo, hotMat);
    [baseMesh, wallMesh].forEach((m) => {
      m.castShadow = true;
      m.receiveShadow = true;
      m.frustumCulled = false;
      bed.add(m);
    });
    [hotBase, hotWall].forEach((m) => {
      m.frustumCulled = false;
      bed.add(m);
    });

    // ---------- Pórtico + cabeçote ----------
    const gantry = new THREE.Group();
    scene.add(gantry);
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, HALF * 2 - 1.2, 32), carbon);
    beam.rotation.z = Math.PI / 2;
    beam.position.y = RAIL_Y;
    beam.castShadow = true;
    gantry.add(beam);
    addBox(gantry, alu, HALF * 2 - 1.4, 0.1, 0.34, 0, RAIL_Y + 0.3, 0, 0.03);
    [-1, 1].forEach((s) => addBox(gantry, aluDark, 0.8, 0.55, 1.1, s * (HALF - 0.6), RAIL_Y + 0.15, 0, 0.08));

    const head = new THREE.Group();
    gantry.add(head);
    addBox(head, white, 2.3, 2.6, 2.0, 0, NZ + 2.25, 0, 0.28);
    addBox(head, gloss, 1.7, 1.3, 0.06, 0, NZ + 2.55, 1.01, 0.04);
    const fan = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.05, 12, 48), aluDark);
    fan.position.set(0, NZ + 2.55, 1.06);
    head.add(fan);
    const hub = new THREE.Mesh(new THREE.CircleGeometry(0.16, 32), aluDark);
    hub.position.set(0, NZ + 2.55, 1.05);
    head.add(hub);
    addBox(head, orangeGlow, 1.4, 0.07, 0.03, 0, NZ + 1.45, 1.01, 0.02);
    addBox(head, alu, 0.9, 0.5, 0.9, 0, NZ + 0.7, 0, 0.05);
    const hex = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.14, 6), brass);
    hex.position.y = NZ + 0.47;
    head.add(hex);
    const nozzle = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.42, 32), brass);
    nozzle.rotation.x = Math.PI;
    nozzle.position.y = NZ + 0.21;
    nozzle.castShadow = true;
    head.add(nozzle);
    const tip = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 16, 16),
      new THREE.MeshStandardMaterial({ color: '#ffb36b', emissive: '#ff7a2a', emissiveIntensity: 3 })
    );
    tip.position.y = NZ + 0.02;
    head.add(tip);
    const tipLight = new THREE.PointLight('#ff7a2a', 0, 6, 2);
    tipLight.position.y = NZ + 0.1;
    head.add(tipLight);

    // tubo PTFE (reconstruído quando o cabeçote se move)
    const tubeEnd = new THREE.Vector3(2.5, H_TOP + 0.3, -HALF + 0.5);
    const tube = new THREE.Mesh(new THREE.BufferGeometry(), tubeMat);
    const tubeCore = new THREE.Mesh(new THREE.BufferGeometry(), tubeCoreMat);
    scene.add(tube, tubeCore);
    let lastTube = { x: NaN, z: NaN };
    const updateTube = (x, z) => {
      if (Math.abs(x - lastTube.x) < 1e-3 && Math.abs(z - lastTube.z) < 1e-3) return;
      lastTube = { x, z };
      const a = new THREE.Vector3(x, NZ + 3.5, z);
      const mid = a.clone().lerp(tubeEnd, 0.5).add(new THREE.Vector3(0, 2.6, 0));
      const curve = new THREE.CatmullRomCurve3([a, a.clone().add(new THREE.Vector3(0, 1.4, 0)), mid, tubeEnd]);
      tube.geometry.dispose();
      tubeCore.geometry.dispose();
      tube.geometry = new THREE.TubeGeometry(curve, 48, 0.11, 10);
      tubeCore.geometry = new THREE.TubeGeometry(curve, 48, 0.045, 6);
    };

    // ---------- Pós-processamento ----------
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(512, 512), 0.55, 0.6, 0.88);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    // ---------- Resize ----------
    let aspect = 1;
    const resize = () => {
      const r = wrap.getBoundingClientRect();
      const w = Math.max(1, r.width);
      const h = Math.max(1, r.height);
      aspect = w / h;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = `${w}px`;
      renderer.domElement.style.height = `${h}px`;
      composer.setPixelRatio(renderer.getPixelRatio());
      composer.setSize(w, h);
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
    };
    resize();

    // ---------- Interação (parallax suave) ----------
    const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
    const onMove = (ev) => {
      const r = wrap.getBoundingClientRect();
      mouse.x = ((ev.clientX - r.left) / r.width) * 2 - 1;
      mouse.y = ((ev.clientY - r.top) / r.height) * 2 - 1;
    };
    const onLeave = () => {
      mouse.x = 0;
      mouse.y = 0;
    };
    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);

    // ---------- HUD ----------
    const cache = {};
    const setText = (k, el, v) => {
      if (el && cache[k] !== v) {
        el.textContent = v;
        cache[k] = v;
      }
    };
    const updateHud = (phase, e, fi) => {
      const total = LAYERS + BASE_LAYERS;
      let layer = 0;
      let nt = NOZZLE_TEMP;
      let bt = BED_TEMP;
      let progress = 0;
      let status;
      if (phase === 'heat') {
        const u = ease(Math.min(1, e / HEAT_MS));
        nt = Math.round(25 + (NOZZLE_TEMP - 25) * u);
        bt = Math.round(25 + (BED_TEMP - 25) * u);
        status = 'Aquecendo bico';
      } else if (phase === 'base') {
        layer = 1 + Math.min(BASE_LAYERS - 1, Math.floor((fi / BASE_PTS) * BASE_LAYERS));
        progress = (fi / BASE_PTS) * 0.04;
        status = 'Imprimindo base';
      } else if (phase === 'print') {
        layer = BASE_LAYERS + 1 + Math.min(LAYERS - 1, Math.floor(fi / SEG));
        progress = 0.04 + (fi / WALL_PTS) * 0.96;
        status = 'Modo vaso espiral';
      } else {
        layer = total;
        progress = 1;
        status = 'Impressão concluída';
      }
      setText('s', statusRef.current, status);
      setText('l', layerRef.current, `${layer}/${total}`);
      setText('z', zRef.current, (layer * 0.2).toFixed(2));
      setText('n', nozzleRef.current, String(nt));
      setText('b', bedRef.current, String(bt));
      const pct = Math.round(progress * 100);
      setText('p', pctRef.current, `${pct}%`);
      if (barRef.current && cache.bar !== pct) {
        barRef.current.style.width = `${pct}%`;
        cache.bar = pct;
      }
      const done = phase === 'done' || phase === 'fade';
      if (dotRef.current && cache.done !== done) {
        dotRef.current.style.backgroundColor = done ? '#34d399' : '#ff5500';
        cache.done = done;
      }
    };

    // ---------- Loop ----------
    const clock = { start: performance.now(), last: performance.now() };
    let raf = 0;
    let visible = true;
    let fading = false;

    const setFade = (on, opacity = 1) => {
      if (on !== fading) {
        filament.transparent = on;
        filament.needsUpdate = true;
        fading = on;
      }
      filament.opacity = opacity;
    };

    const animate = (now) => {
      const gap = now - clock.last;
      if (gap > 200) clock.start += gap - 16;
      clock.last = now;

      let e = reduced ? T_DONE + 2600 : now - clock.start;
      if (e >= CYCLE) {
        clock.start = now;
        e = 0;
      }

      let phase;
      let fi = 0;
      if (e < T_BASE) phase = 'heat';
      else if (e < T_PRINT) {
        phase = 'base';
        fi = ((e - T_BASE) / BASE_MS) * (BASE_PTS - 1);
      } else if (e < T_DONE) {
        phase = 'print';
        fi = ((e - T_PRINT) / PRINT_MS) * (WALL_PTS - 1);
      } else if (e < T_FADE) phase = 'done';
      else phase = 'fade';

      // revelação do filamento
      const baseSegs = phase === 'heat' ? 0 : phase === 'base' ? Math.floor(fi) : BASE_PTS - 1;
      const wallSegs = phase === 'print' ? Math.floor(fi) : phase === 'done' || phase === 'fade' ? WALL_PTS - 1 : 0;
      baseGeo.setDrawRange(0, baseSegs * IDX_PER_SEG);
      wallGeo.setDrawRange(0, wallSegs * IDX_PER_SEG);

      const HOT = 60;
      hotBase.visible = phase === 'base';
      hotWall.visible = phase === 'print';
      if (hotBase.visible) {
        const s = Math.max(0, baseSegs - HOT);
        hotBaseGeo.setDrawRange(s * IDX_PER_SEG, (baseSegs - s) * IDX_PER_SEG);
      }
      if (hotWall.visible) {
        const s = Math.max(0, wallSegs - HOT);
        hotWallGeo.setDrawRange(s * IDX_PER_SEG, (wallSegs - s) * IDX_PER_SEG);
      }

      // movimento: cabeçote (X/Y) e mesa (Z)
      let px;
      let pz;
      let bedY;
      let heatU = 1;
      if (phase === 'heat') {
        heatU = ease(Math.min(1, e / (HEAT_MS * 0.85)));
        px = lerp(PARK.x, 0, heatU);
        pz = lerp(PARK.z, 0, heatU);
        bedY = lerp(BED_END, NZ - BASE_H, heatU);
      } else if (phase === 'base') {
        const p = pathPoint(paths.base, fi);
        px = p.x;
        pz = p.z;
        bedY = NZ - BASE_H;
      } else if (phase === 'print') {
        const p = pathPoint(paths.wall, fi);
        px = p.x;
        pz = p.z;
        bedY = NZ - (p.y + LH / 2);
      } else if (phase === 'done') {
        const last = pathPoint(paths.wall, WALL_PTS - 1);
        const u = ease(Math.min(1, (e - T_DONE) / 1500));
        px = lerp(last.x, PARK.x, u);
        pz = lerp(last.z, PARK.z, u);
        bedY = lerp(NZ - TOP_FINAL, BED_END, u);
      } else {
        px = PARK.x;
        pz = PARK.z;
        bedY = BED_END;
      }
      gantry.position.z = pz;
      head.position.x = px;
      bed.position.y = bedY;
      updateTube(px, pz);

      const printing = phase === 'base' || phase === 'print';
      tip.visible = printing || phase === 'heat';
      tipLight.intensity = printing
        ? 7 + Math.sin(now * 0.031) * 0.8 + Math.random() * 0.6
        : phase === 'heat'
          ? heatU * 4
          : 0;

      if (phase === 'fade') setFade(true, Math.max(0, 1 - (e - T_FADE) / FADE_MS));
      else setFade(false, 1);

      // câmera: órbita lenta + parallax do mouse
      mouse.sx += (mouse.x - mouse.sx) * 0.05;
      mouse.sy += (mouse.y - mouse.sy) * 0.05;
      const t = now / 1000;
      const az = -0.42 + Math.sin(t * 0.22) * 0.14 + mouse.sx * 0.22;
      const el = 0.2 + mouse.sy * -0.06;
      const dist = aspect < 1 ? 52 / Math.max(0.62, aspect) : 52;
      camera.position.set(
        target.x + dist * Math.sin(az) * Math.cos(el),
        target.y + dist * Math.sin(el),
        target.z + dist * Math.cos(az) * Math.cos(el)
      );
      camera.lookAt(target);

      composer.render();
      updateHud(phase, e, fi);

      if (!reduced && visible) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) requestAnimationFrame(animate);
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was && !reduced) {
        clock.last = performance.now();
        raf = requestAnimationFrame(animate);
      }
      if (!visible) cancelAnimationFrame(raf);
    });
    io.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
      });
      envTex.dispose();
      pmrem.dispose();
      composer.dispose?.();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />

      {/* Status */}
      <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-black/50 border border-white/[0.08] px-3 py-1.5 backdrop-blur-md pointer-events-none">
        <span ref={dotRef} className="w-1.5 h-1.5 rounded-full bg-[#ff5500] animate-pulse" />
        <span ref={statusRef} className="text-[11px] text-zinc-300 font-medium">Aquecendo bico</span>
      </div>

      {/* Material */}
      <div className="absolute top-4 right-4 hidden sm:flex items-center gap-2 rounded-full bg-black/50 border border-white/[0.08] px-3 py-1.5 backdrop-blur-md pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#ff5500]" />
        <span className="text-[11px] text-zinc-400 font-mono">PLA · Ziggie Pro</span>
      </div>

      {/* HUD inferior */}
      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 bg-gradient-to-t from-black/85 to-transparent pointer-events-none">
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-zinc-500 mb-2 tracking-wide">
          <span>CAMADA <span ref={layerRef} className="text-zinc-200">0/99</span></span>
          <span className="hidden sm:inline">Z <span ref={zRef} className="text-zinc-200">0.00</span> mm</span>
          <span>BICO <span ref={nozzleRef} className="text-zinc-200">25</span>°C</span>
          <span>MESA <span ref={bedRef} className="text-zinc-200">25</span>°C</span>
          <span ref={pctRef} className="text-white">0%</span>
        </div>
        <div className="h-[2px] w-full bg-white/[0.06] rounded-full overflow-hidden">
          <div ref={barRef} className="h-full bg-[#ff5500] rounded-full" style={{ width: '0%' }} />
        </div>
      </div>
    </div>
  );
}
