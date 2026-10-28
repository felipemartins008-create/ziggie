import React, { useEffect, useRef } from 'react';

/**
 * PrinterAnimation
 * Animação em Canvas 2D de uma impressora 3D imprimindo um vaso espiral
 * (modo "spiral vase": o eixo Z sobe continuamente a cada volta).
 *
 * Fases do ciclo: aquecimento -> base (fundo em espiral) -> paredes -> concluído -> fade -> reinicia
 */

// ---------- Configuração ----------
const TOTAL_LAYERS = 110;          // voltas da parede
const SEG = 144;                   // pontos por volta
const BASE_PTS = 540;              // pontos do fundo em espiral
const BASE_TURNS = 18;             // voltas do fundo
const BASE_LAYERS = 3;             // camadas exibidas no HUD para o fundo
const LAYER_PTS = TOTAL_LAYERS * SEG;
const TOTAL_PTS = BASE_PTS + LAYER_PTS;

const HEAT_MS = 1400;
const BASE_MS = 1300;
const PRINT_MS = 13500;
const HOLD_MS = 3200;
const FADE_MS = 900;
const T_BASE = HEAT_MS;
const T_PRINT = T_BASE + BASE_MS;
const T_DONE = T_PRINT + PRINT_MS;
const T_FADE = T_DONE + HOLD_MS;
const CYCLE_MS = T_FADE + FADE_MS;

const LAYER_MM = 0.2;
const TILT = 0.32;                 // achatamento da perspectiva (vista de cima)
const PERSP = 0.1;                 // leve perspectiva (frente mais larga)
const LIGHT = 2.25;                // ângulo da luz (frente-esquerda)
const NOZZLE_TEMP = 220;
const BED_TEMP = 60;

// ---------- Geometria do vaso ----------
function profile(t) {
  // base -> barriga -> pescoço -> boca levemente aberta
  let p = 0.78 + 0.25 * Math.sin(Math.PI * t * 1.25);
  if (t > 0.85) p += 0.2 * ((t - 0.85) / 0.15) ** 2;
  return p;
}

function ribs(theta, t) {
  // nervuras que giram conforme sobe = efeito espiral
  return 1 + 0.065 * Math.cos(9 * theta + t * Math.PI * 2.6);
}

function modelPoint(i) {
  if (i < BASE_PTS) {
    const u = i / (BASE_PTS - 1);
    const theta = u * BASE_TURNS * Math.PI * 2;
    return { r: u * profile(0) * ribs(theta, 0) * 0.97, theta, t: 0, base: true };
  }
  const k = i - BASE_PTS;
  const theta = ((k % SEG) / SEG) * Math.PI * 2;
  const t = k / SEG / TOTAL_LAYERS;
  return { r: profile(t) * ribs(theta, t), theta, t, base: false };
}

function project(m, g) {
  const rr = m.r * g.R;
  const depth = rr * Math.sin(m.theta);
  const persp = 1 + (PERSP * depth) / g.S;
  return {
    x: g.cx + rr * Math.cos(m.theta) * persp,
    y: g.bedY - m.t * g.H + depth * TILT,
  };
}

function mixColor(s) {
  s = Math.max(0, Math.min(1.25, s));
  let r, gr, b;
  if (s < 0.7) {
    const k = s / 0.7;
    r = 60 + 195 * k;
    gr = 16 + 69 * k;
    b = 0;
  } else {
    const k = (s - 0.7) / 0.55;
    r = 255;
    gr = 85 + 100 * k;
    b = 130 * k;
  }
  return `rgb(${r | 0},${gr | 0},${b | 0})`;
}

function colorFor(m) {
  let shade;
  if (m.base) {
    shade = 0.55 + 0.12 * Math.cos(m.theta - LIGHT);
  } else if (Math.sin(m.theta) >= 0) {
    // parede externa (frente)
    shade =
      0.32 +
      0.78 * Math.max(0, Math.cos(m.theta - LIGHT)) +
      0.12 * Math.sin(9 * m.theta + m.t * Math.PI * 2.6);
  } else {
    // parede interna (fundo, vista por dentro)
    shade = 0.22 + 0.38 * Math.max(0, Math.cos(m.theta - LIGHT + Math.PI));
  }
  shade += 0.035 * Math.sin(m.t * TOTAL_LAYERS * 2.2); // textura sutil de camadas
  return mixColor(shade);
}

function geometry(w, h) {
  const R = Math.min(w * 0.2, h * 0.17);
  const H = h * 0.44;
  const S = R * 1.9;
  const lw = Math.max(1.2, (H / TOTAL_LAYERS) * 1.25);
  const baseW = Math.max(lw * 1.4, ((R * profile(0)) / BASE_TURNS) * 1.15);
  const k = Math.max(0.72, Math.min(1.1, R / 88));
  return {
    w, h, R, H, S, lw, baseW, k,
    cx: w / 2,
    bedY: h * 0.8,
    top: h * 0.07,
    postX: S * (1 + PERSP) + 18,
  };
}

// ---------- Helpers de desenho ----------
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawSegment(ctx, g, i) {
  if (i <= 0) return;
  const a = modelPoint(i - 1);
  const b = modelPoint(i);
  const pa = project(a, g);
  const pb = project(b, g);
  ctx.strokeStyle = colorFor(b);
  ctx.lineWidth = b.base ? g.baseW : g.lw;
  ctx.beginPath();
  ctx.moveTo(pa.x, pa.y);
  ctx.lineTo(pb.x, pb.y);
  ctx.stroke();
}

function bedPoint(g, X, D) {
  return { x: g.cx + X * (1 + (PERSP * D) / g.S), y: g.bedY + D * TILT };
}

const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2);
const lerp = (a, b, t) => a + (b - a) * t;

// ---------- Componente ----------
export function PrinterAnimation() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const statusRef = useRef(null);
  const dotRef = useRef(null);
  const layerRef = useRef(null);
  const zRef = useRef(null);
  const nozzleRef = useRef(null);
  const bedRef = useRef(null);
  const barRef = useRef(null);
  const pctRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext('2d');
    const off = document.createElement('canvas');
    const offCtx = off.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let g = null;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    const st = { drawn: 0, start: performance.now(), last: performance.now() };
    const cache = {};

    const setText = (key, el, val) => {
      if (el && cache[key] !== val) {
        el.textContent = val;
        cache[key] = val;
      }
    };

    const setupCtx = (c) => {
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.lineCap = 'round';
      c.lineJoin = 'round';
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const w = Math.max(280, rect.width);
      const h = Math.max(300, rect.height);
      dpr = Math.min(2, window.devicePixelRatio || 1);
      for (const c of [canvas, off]) {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
      }
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      setupCtx(ctx);
      setupCtx(offCtx);
      g = geometry(w, h);
      for (let i = 1; i <= st.drawn; i++) drawSegment(offCtx, g, i);
    };

    const pointAt = (fi) => {
      const i0 = Math.max(0, Math.min(TOTAL_PTS - 1, Math.floor(fi)));
      const i1 = Math.min(TOTAL_PTS - 1, i0 + 1);
      const f = Math.max(0, Math.min(1, fi - i0));
      const a = project(modelPoint(i0), g);
      const b = project(modelPoint(i1), g);
      return { x: lerp(a.x, b.x, f), y: lerp(a.y, b.y, f) - g.lw * 0.5 };
    };

    const parkPos = () => ({ x: g.cx + g.S * 0.72, y: g.top + 10 + 63 * g.k + 26 });

    // ----- Partes da impressora -----
    const drawFrameBack = (glow) => {
      const { cx, bedY, S, H, R, top, postX, h } = g;

      // brilho ambiente atrás do vaso
      const amb = ctx.createRadialGradient(cx, bedY - H * 0.5, 0, cx, bedY - H * 0.5, R * 3.2);
      amb.addColorStop(0, `rgba(255,85,0,${0.1 * glow})`);
      amb.addColorStop(1, 'rgba(255,85,0,0)');
      ctx.fillStyle = amb;
      ctx.fillRect(0, 0, g.w, h);

      // colunas laterais
      const postBottom = bedY + S * TILT + 14;
      for (const side of [-1, 1]) {
        const x = cx + side * postX;
        const grad = ctx.createLinearGradient(x - 6, 0, x + 6, 0);
        grad.addColorStop(0, '#2c2c32');
        grad.addColorStop(0.5, '#3a3a41');
        grad.addColorStop(1, '#1d1d22');
        ctx.fillStyle = grad;
        roundRect(ctx, x - 6, top, 12, postBottom - top, 3);
        ctx.fill();
      }

      // base da impressora
      const bx = cx - postX - 14;
      const bw = postX * 2 + 28;
      const by = bedY + S * TILT + 6;
      const bh = Math.max(24, h * 0.055);
      const baseGrad = ctx.createLinearGradient(0, by, 0, by + bh);
      baseGrad.addColorStop(0, '#17171b');
      baseGrad.addColorStop(1, '#0c0c0e');
      ctx.fillStyle = baseGrad;
      roundRect(ctx, bx, by, bw, bh, 8);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // marca na base
      ctx.fillStyle = 'rgba(255,255,255,0.22)';
      ctx.font = `600 ${Math.max(8, 9 * g.k)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('Z I G G I E', bx + 16, by + bh / 2);

      // telinha frontal
      const sw = 34 * g.k;
      const sh = 12 * g.k;
      ctx.fillStyle = '#060607';
      roundRect(ctx, bx + bw - sw - 16, by + bh / 2 - sh / 2, sw, sh, 3);
      ctx.fill();
      ctx.fillStyle = '#ff5500';
      ctx.fillRect(bx + bw - sw - 12, by + bh / 2 - 1, sw * 0.45, 2);
    };

    const drawBed = (hasPrint) => {
      const { S } = g;
      const c = [
        bedPoint(g, -S, -S),
        bedPoint(g, S, -S),
        bedPoint(g, S, S),
        bedPoint(g, -S, S),
      ];

      // espessura frontal
      ctx.fillStyle = '#08080a';
      ctx.beginPath();
      ctx.moveTo(c[3].x, c[3].y);
      ctx.lineTo(c[2].x, c[2].y);
      ctx.lineTo(c[2].x, c[2].y + 5);
      ctx.lineTo(c[3].x, c[3].y + 5);
      ctx.closePath();
      ctx.fill();

      // placa
      const grad = ctx.createLinearGradient(0, c[0].y, 0, c[2].y);
      grad.addColorStop(0, '#111114');
      grad.addColorStop(1, '#1a1a1f');
      ctx.fillStyle = grad;
      ctx.beginPath();
      c.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // grade da mesa
      ctx.strokeStyle = 'rgba(255,255,255,0.035)';
      for (let i = -5; i <= 5; i++) {
        const v = (i * S) / 6;
        let a = bedPoint(g, v, -S);
        let b = bedPoint(g, v, S);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        a = bedPoint(g, -S, v);
        b = bedPoint(g, S, v);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // marcadores de canto
      ctx.strokeStyle = 'rgba(255,85,0,0.55)';
      ctx.lineWidth = 1.2;
      const m = S * 0.12;
      [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([sx, sd]) => {
        const p = bedPoint(g, sx * S * 0.92, sd * S * 0.92);
        const px = bedPoint(g, sx * (S * 0.92 - m), sd * S * 0.92);
        const pd = bedPoint(g, sx * S * 0.92, sd * (S * 0.92 - m));
        ctx.beginPath();
        ctx.moveTo(px.x, px.y);
        ctx.lineTo(p.x, p.y);
        ctx.lineTo(pd.x, pd.y);
        ctx.stroke();
      });

      // sombra do vaso
      if (hasPrint) {
        const sh = ctx.createRadialGradient(g.cx, g.bedY, 0, g.cx, g.bedY, g.R * 1.25);
        sh.addColorStop(0, 'rgba(0,0,0,0.6)');
        sh.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.save();
        ctx.translate(g.cx, g.bedY);
        ctx.scale(1, TILT);
        ctx.translate(-g.cx, -g.bedY);
        ctx.fillStyle = sh;
        ctx.beginPath();
        ctx.arc(g.cx, g.bedY, g.R * 1.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const drawHotTrail = () => {
      const n = 28;
      const from = Math.max(1, st.drawn - n);
      ctx.save();
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(255,110,20,0.9)';
      for (let j = from; j <= st.drawn; j++) {
        const a = project(modelPoint(j - 1), g);
        const b = project(modelPoint(j), g);
        const alpha = (j - from) / n;
        ctx.strokeStyle = `rgba(255,200,140,${alpha * 0.9})`;
        ctx.lineWidth = modelPoint(j).base ? g.baseW : g.lw;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawGantry = (hx, hy, printing) => {
      const { k, cx, top, postX, S } = g;
      const beamY = hy - 40 * k;

      // tubo PTFE com filamento
      const tx = cx + S * 0.35;
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(255,255,255,0.18)';
      ctx.beginPath();
      ctx.moveTo(hx, hy - 63 * k);
      ctx.bezierCurveTo(hx, hy - 63 * k - 70 * k, tx + 60, top + 80, tx, top + 10);
      ctx.stroke();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255,85,0,0.7)';
      ctx.stroke();

      // viga X
      const beamGrad = ctx.createLinearGradient(0, beamY - 5 * k, 0, beamY + 5 * k);
      beamGrad.addColorStop(0, '#45454c');
      beamGrad.addColorStop(1, '#202025');
      ctx.fillStyle = beamGrad;
      roundRect(ctx, cx - postX - 4, beamY - 5 * k, postX * 2 + 8, 10 * k, 3);
      ctx.fill();

      // bico (latão)
      ctx.fillStyle = '#c9a26a';
      ctx.beginPath();
      ctx.moveTo(hx - 4 * k, hy - 9 * k);
      ctx.lineTo(hx + 4 * k, hy - 9 * k);
      ctx.lineTo(hx + 1.2 * k, hy - 1);
      ctx.lineTo(hx - 1.2 * k, hy - 1);
      ctx.closePath();
      ctx.fill();

      // bloco aquecedor
      ctx.fillStyle = '#2a2a2f';
      roundRect(ctx, hx - 11 * k, hy - 21 * k, 22 * k, 12 * k, 2);
      ctx.fill();

      // corpo do cabeçote
      const bodyGrad = ctx.createLinearGradient(0, hy - 63 * k, 0, hy - 19 * k);
      bodyGrad.addColorStop(0, '#f4f4f6');
      bodyGrad.addColorStop(1, '#c4c4ca');
      ctx.fillStyle = bodyGrad;
      roundRect(ctx, hx - 27 * k, hy - 63 * k, 54 * k, 44 * k, 7 * k);
      ctx.fill();

      // painel frontal + ventoinha
      ctx.fillStyle = '#18181c';
      roundRect(ctx, hx - 19 * k, hy - 56 * k, 38 * k, 24 * k, 4 * k);
      ctx.fill();
      ctx.strokeStyle = '#3a3a42';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(hx, hy - 44 * k, 8 * k, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(hx, hy - 44 * k, 3 * k, 0, Math.PI * 2);
      ctx.stroke();

      // detalhe laranja Ziggie
      ctx.fillStyle = '#ff5500';
      roundRect(ctx, hx - 12 * k, hy - 28 * k, 24 * k, 2.5 * k, 1.2);
      ctx.fill();

      // brilho na ponta do bico
      if (printing) {
        const glow = ctx.createRadialGradient(hx, hy, 0, hx, hy, 16 * k);
        glow.addColorStop(0, 'rgba(255,170,90,0.85)');
        glow.addColorStop(0.4, 'rgba(255,85,0,0.35)');
        glow.addColorStop(1, 'rgba(255,85,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(hx, hy, 16 * k, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawTopBar = () => {
      const { cx, top, postX } = g;
      const grad = ctx.createLinearGradient(0, top, 0, top + 10);
      grad.addColorStop(0, '#3c3c43');
      grad.addColorStop(1, '#1d1d22');
      ctx.fillStyle = grad;
      roundRect(ctx, cx - postX - 8, top - 2, postX * 2 + 16, 11, 4);
      ctx.fill();
    };

    // ----- HUD -----
    const updateHud = (phase, e, fi) => {
      const totalLayers = TOTAL_LAYERS + BASE_LAYERS;
      let layer = 0;
      let nozzle = NOZZLE_TEMP;
      let bed = BED_TEMP;
      let progress = 0;
      let status = '';

      if (phase === 'heat') {
        const u = Math.min(1, e / HEAT_MS);
        nozzle = Math.round(25 + (NOZZLE_TEMP - 25) * ease(u));
        bed = Math.round(25 + (BED_TEMP - 25) * ease(u));
        status = 'Aquecendo bico';
      } else if (phase === 'base') {
        layer = 1 + Math.min(BASE_LAYERS - 1, Math.floor((fi / BASE_PTS) * BASE_LAYERS));
        progress = fi / TOTAL_PTS;
        status = 'Imprimindo base';
      } else if (phase === 'print') {
        layer = BASE_LAYERS + 1 + Math.min(TOTAL_LAYERS - 1, Math.floor((fi - BASE_PTS) / SEG));
        progress = fi / TOTAL_PTS;
        status = 'Modo vaso espiral';
      } else {
        layer = totalLayers;
        progress = 1;
        status = 'Impressão concluída';
      }

      setText('status', statusRef.current, status);
      setText('layer', layerRef.current, `${layer}/${totalLayers}`);
      setText('z', zRef.current, (layer * LAYER_MM).toFixed(2));
      setText('nozzle', nozzleRef.current, String(nozzle));
      setText('bed', bedRef.current, String(bed));
      const pct = Math.round(progress * 100);
      setText('pct', pctRef.current, `${pct}%`);
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

    // ----- Loop principal -----
    const frame = (now) => {
      // compensa abas inativas / pausas sem "pular" a animação
      const gap = now - st.last;
      if (gap > 200) st.start += gap - 16;
      st.last = now;

      let e = reduced ? T_DONE + 1200 : now - st.start;
      if (e >= CYCLE_MS) {
        st.start = now;
        e = 0;
        st.drawn = 0;
        offCtx.save();
        offCtx.setTransform(1, 0, 0, 1, 0, 0);
        offCtx.clearRect(0, 0, off.width, off.height);
        offCtx.restore();
      }

      let phase;
      let fi = 0;
      if (e < T_BASE) phase = 'heat';
      else if (e < T_PRINT) {
        phase = 'base';
        fi = ((e - T_BASE) / BASE_MS) * (BASE_PTS - 1);
      } else if (e < T_DONE) {
        phase = 'print';
        fi = Math.min(TOTAL_PTS - 1, BASE_PTS - 1 + ((e - T_PRINT) / PRINT_MS) * LAYER_PTS);
      } else if (e < T_FADE) {
        phase = 'done';
        fi = TOTAL_PTS - 1;
      } else {
        phase = 'fade';
        fi = TOTAL_PTS - 1;
      }

      // desenha incrementalmente os novos segmentos no buffer
      const target = Math.floor(fi);
      while (st.drawn < target) {
        st.drawn++;
        drawSegment(offCtx, g, st.drawn);
      }

      // posição do cabeçote
      const park = parkPos();
      let head;
      if (phase === 'heat') {
        const start = pointAt(0);
        const u = ease(Math.min(1, e / (HEAT_MS * 0.8)));
        head = { x: lerp(park.x, start.x, u), y: lerp(park.y, start.y, u) };
      } else if (phase === 'base' || phase === 'print') {
        head = pointAt(fi);
      } else if (phase === 'done') {
        const last = pointAt(TOTAL_PTS - 1);
        const u = ease(Math.min(1, (e - T_DONE) / 1100));
        head = { x: lerp(last.x, park.x, u), y: lerp(last.y - 0, park.y, u) };
      } else {
        head = park;
      }

      const printing = phase === 'base' || phase === 'print';
      const progress = st.drawn / TOTAL_PTS;
      let glow = 0.4 + progress * 0.8;
      if (phase === 'done') glow += 0.25 * Math.sin((e - T_DONE) / 260);
      const vaseAlpha = phase === 'fade' ? 1 - (e - T_FADE) / FADE_MS : 1;

      // ---- render ----
      ctx.clearRect(0, 0, g.w, g.h);
      drawFrameBack(glow * vaseAlpha);
      drawBed(st.drawn > 0 && vaseAlpha > 0.05);

      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalAlpha = Math.max(0, vaseAlpha);
      ctx.drawImage(off, 0, 0);
      ctx.restore();

      if (printing && st.drawn > 1) drawHotTrail();
      drawGantry(head.x, head.y, printing);
      drawTopBar();
      updateHud(phase, e, fi);

      if (!reduced && visible) raf = requestAnimationFrame(frame);
    };

    resize();
    raf = requestAnimationFrame(frame);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) requestAnimationFrame(frame);
    });
    ro.observe(wrap);

    // pausa quando fora da tela (economia de CPU/bateria)
    const io = new IntersectionObserver(([entry]) => {
      const wasVisible = visible;
      visible = entry.isIntersecting;
      if (visible && !wasVisible && !reduced) {
        st.last = performance.now();
        raf = requestAnimationFrame(frame);
      }
      if (!visible) cancelAnimationFrame(raf);
    });
    io.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />

      {/* Status */}
      <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-black/50 border border-white/[0.08] px-3 py-1.5 backdrop-blur-md">
        <span ref={dotRef} className="w-1.5 h-1.5 rounded-full bg-[#ff5500] animate-pulse" />
        <span ref={statusRef} className="text-[11px] text-zinc-300 font-medium">
          Aquecendo bico
        </span>
      </div>

      {/* Material */}
      <div className="absolute top-4 right-4 hidden sm:flex items-center gap-2 rounded-full bg-black/50 border border-white/[0.08] px-3 py-1.5 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-[#ff5500]" />
        <span className="text-[11px] text-zinc-400 font-mono">PLA · Ziggie Pro</span>
      </div>

      {/* HUD inferior */}
      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-zinc-500 mb-2 tracking-wide">
          <span>
            CAMADA <span ref={layerRef} className="text-zinc-200">0/113</span>
          </span>
          <span className="hidden sm:inline">
            Z <span ref={zRef} className="text-zinc-200">0.00</span> mm
          </span>
          <span>
            BICO <span ref={nozzleRef} className="text-zinc-200">25</span>°C
          </span>
          <span>
            MESA <span ref={bedRef} className="text-zinc-200">25</span>°C
          </span>
          <span ref={pctRef} className="text-white">0%</span>
        </div>
        <div className="h-[2px] w-full bg-white/[0.06] rounded-full overflow-hidden">
          <div ref={barRef} className="h-full bg-[#ff5500] rounded-full" style={{ width: '0%' }} />
        </div>
      </div>
    </div>
  );
}
