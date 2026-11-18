import { S, frame, clamp, lerp, rnd } from './kit.js';

const set = (el, o) => { for (const k in o) el.setAttribute(k, o[k]); return el; };

/* ---------- M6: Capacitor ---------- */
export function capacitor() {
  const f = frame({ title: 'Parallel-plate capacitor: C = κ ε₀ A / d', w: 720, hgt: 330, note: 'Bigger plates or a thinner gap hold more charge for the same voltage. A dielectric multiplies the capacitance by κ.' });
  const { svg } = f;
  f.slider('A', 'Plate area A', 50, 500, 10, 200, 'cm²'); f.slider('d', 'Gap d', 0.5, 5, 0.1, 2, 'mm'); f.slider('V', 'Voltage V', 1, 12, 1, 9, 'V');
  f.select('k', 'Dielectric', [[1, 'Air / vacuum (κ = 1)'], [2.1, 'Teflon (κ ≈ 2.1)'], [3.7, 'Paper (κ ≈ 3.7)'], [5, 'Glass (κ ≈ 5)'], [80, 'Water (κ ≈ 80)']], 1);
  const rC = f.readout('Capacitance C'), rQ = f.readout('Charge Q'), rU = f.readout('Energy U'), rE = f.readout('Field E');
  const g = S('g'); svg.append(g);
  let t = 0;
  const draw = () => {
    const A = f.state.A * 1e-4, d = f.state.d * 1e-3, V = f.state.V, k = parseFloat(f.state.k), C = k * 8.85e-12 * A / d, Q = C * V;
    g.replaceChildren();
    const w = 120 + f.state.A * 0.8, gap = 30 + f.state.d * 22, cx = 360, top = 165 - gap / 2, bot = 165 + gap / 2;
    if (k > 1) g.append(S('rect', { x: cx - w / 2, y: top, width: w, height: gap, fill: '#8FD3E8', opacity: 0.5 }));
    g.append(S('rect', { x: cx - w / 2, y: top - 10, width: w, height: 10, fill: '#B42318' }), S('rect', { x: cx - w / 2, y: bot, width: w, height: 10, fill: '#2F6FD6' }));
    g.append(S('path', { d: `M${cx} ${top - 10} V40 H150 V165 M150 165`, fill: 'none', stroke: 'var(--ink)', 'stroke-width': 3 }), S('path', { d: `M${cx} ${bot + 10} V290 H150`, fill: 'none', stroke: 'var(--ink)', 'stroke-width': 3 }));
    g.append(S('line', { x1: 130, x2: 170, y1: 165, y2: 165, stroke: 'var(--ink)', 'stroke-width': 4 }), S('line', { x1: 140, x2: 160, y1: 176, y2: 176, stroke: 'var(--ink)', 'stroke-width': 4 }), S('text', { x: 108, y: 160, class: 'svglabel' }, V + ' V'));
    const n = Math.round(clamp(Q * 1e9 / 6, 2, 22));
    for (let i = 0; i < n; i++) { const x = cx - w / 2 + 10 + (i + 0.5) * (w - 20) / n; g.append(S('text', { x, y: top - 14, class: 'svglabel', 'text-anchor': 'middle', fill: '#B42318' }, '+'), S('text', { x, y: bot + 26, class: 'svglabel', 'text-anchor': 'middle', fill: '#2F6FD6' }, '−')); if (i % 2 === 0) g.append(S('line', { x1: x, x2: x, y1: top + 4, y2: bot - 4, stroke: '#F2A33A', 'stroke-width': 2, 'stroke-dasharray': '6 5', class: 'fl' })); }
    g.append(S('text', { x: cx + w / 2 + 14, y: 165, class: 'svgtext' }, `d = ${f.state.d} mm`), S('text', { x: cx, y: 316, class: 'svgtext', 'text-anchor': 'middle' }, `A = ${f.state.A} cm²`));
    rC(C >= 1e-9 ? `${(C * 1e9).toFixed(2)} nF` : `${(C * 1e12).toFixed(1)} pF`); rQ(Q >= 1e-9 ? `${(Q * 1e9).toFixed(1)} nC` : `${(Q * 1e12).toFixed(0)} pC`); rU(`${(0.5 * C * V * V * 1e9).toFixed(2)} nJ`); rE(`${(V / d).toFixed(0)} V/m`);
  };
  draw(); f.onChange = draw;
  f.loop((dt) => { t -= dt * 18; g.querySelectorAll('.fl').forEach((l) => l.setAttribute('stroke-dashoffset', t)); });
  return f.root;
}

/* ---------- M7: Current and drift velocity ---------- */
export function drift() {
  const f = frame({ title: 'Current in a copper wire: electrons drift very slowly', w: 720, hgt: 300, note: 'Electrons zig-zag randomly, with only a tiny net drift. A thinner wire carrying the same current has a bigger current density J and a faster drift.' });
  const { svg } = f;
  f.slider('I', 'Current I', 0.5, 10, 0.5, 3, 'A'); f.slider('dia', 'Wire diameter', 0.5, 3, 0.1, 1.6, 'mm');
  const rJ = f.readout('Current density J'), rV = f.readout('Drift speed v_d'), rQ = f.readout('Charge per second');
  const n = 8.5e28, e = 1.602e-19;
  const top = 80, bot = 220, ions = S('g'), els = [];
  svg.append(S('rect', { x: 30, y: top, width: 660, height: bot - top, rx: 14, fill: 'var(--soft)', stroke: 'var(--ink)', 'stroke-width': 3 }), ions);
  for (let x = 60; x < 680; x += 52) for (let y = top + 26; y < bot - 10; y += 40) ions.append(S('circle', { cx: x, cy: y, r: 9, fill: '#8C96AC', opacity: 0.55 }), S('text', { x, y: y + 4, class: 'svgtext', 'text-anchor': 'middle', 'font-size': 11 }, '+'));
  for (let i = 0; i < 38; i++) { const c = S('circle', { r: 5, fill: '#2F6FD6', stroke: '#fff', 'stroke-width': 1 }); svg.append(c); els.push({ x: rnd(40, 680), y: rnd(top + 12, bot - 12), vx: rnd(-1, 1), vy: rnd(-1, 1), c }); }
  svg.append(S('path', { d: 'M60 262 H640 l-14 -12 m14 12 l-14 12', stroke: '#B42318', 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }), S('text', { x: 360, y: 290, class: 'svglabel', 'text-anchor': 'middle', fill: '#B42318' }, 'conventional current I'), S('text', { x: 360, y: 52, class: 'svglabel', 'text-anchor': 'middle', fill: '#2F6FD6' }, 'electrons drift this way ←'));
  const draw = () => { const A = Math.PI * Math.pow(f.state.dia * 1e-3 / 2, 2), J = f.state.I / A, vd = J / (n * e); rJ(`${(J / 1e6).toFixed(2)} MA/m²`); rV(`${(vd * 1000).toFixed(3)} mm/s`); rQ(`${f.state.I} C/s`); f._vd = vd; };
  draw(); f.onChange = draw;
  f.loop((dt) => { const sp = 20 + 2600 * (f._vd || 0) * 40; els.forEach((p) => { p.x += (p.vx * 60 - Math.min(sp, 70)) * dt; p.y += p.vy * 60 * dt; if (Math.random() < 0.03) { p.vx = rnd(-1, 1); p.vy = rnd(-1, 1); } if (p.x < 34) p.x = 686; if (p.y < top + 8 || p.y > bot - 8) { p.vy *= -1; p.y = clamp(p.y, top + 8, bot - 8); } set(p.c, { cx: p.x, cy: p.y }); }); });
  return f.root;
}

/* ---------- M8: Charge in a magnetic field ---------- */
export function magforce() {
  const f = frame({ title: 'A charged particle in a magnetic field moves in a circle', w: 720, hgt: 340, note: 'The magnetic force is always sideways to the velocity, so it bends the path but never speeds the particle up. Stronger B or slower v gives a tighter circle.' });
  const { svg } = f;
  f.slider('v', 'Speed v', 1, 10, 0.5, 5, '×10⁶ m/s'); f.slider('B', 'Field B', 1, 10, 0.5, 4, 'mT'); f.seg('s', 'Charge', [[1, 'Proton / +'], [-1, 'Electron / −']], -1);
  const rR = f.readout('Radius r = mv/(qB)'), rT = f.readout('Period T'), rF = f.readout('Force F = qvB');
  const cx = 360, cy = 175, bg = S('g');
  for (let x = 40; x < 700; x += 48) for (let y = 30; y < 330; y += 44) bg.append(S('circle', { cx: x, cy: y, r: 8, fill: 'none', stroke: 'var(--line-strong)', 'stroke-width': 2 }), S('path', { d: `M${x - 5} ${y - 5} L${x + 5} ${y + 5} M${x + 5} ${y - 5} L${x - 5} ${y + 5}`, stroke: 'var(--line-strong)', 'stroke-width': 2 }));
  const orbit = S('circle', { fill: 'none', stroke: '#F2A33A', 'stroke-width': 2, 'stroke-dasharray': '5 5' }), p = S('circle', { r: 11, stroke: 'var(--ink)', 'stroke-width': 3 }), vA = S('line', { stroke: '#14213D', 'stroke-width': 4 }), fA = S('line', { stroke: '#B42318', 'stroke-width': 4 }), vl = S('text', { class: 'svglabel' }, 'v'), fl = S('text', { class: 'svglabel', fill: '#B42318' }, 'F');
  svg.append(bg, orbit, vA, fA, p, vl, fl, S('text', { x: 24, y: 322, class: 'svgtext' }, '× = B into the page'));
  const m = 9.109e-31, q = 1.602e-19; let th = 0, R = 90, w = 1;
  const draw = () => { const v = f.state.v * 1e6, B = f.state.B * 1e-3, r = m * v / (q * B), T = 2 * Math.PI * m / (q * B); R = clamp(r * 1e3 * 14, 22, 150); w = (f.state.s > 0 ? 1 : -1) * 1; set(orbit, { cx, cy, r: R }); set(p, { fill: f.state.s > 0 ? '#D6453D' : '#2F6FD6' }); rR(`${(r * 1e3).toFixed(2)} mm`); rT(`${(T * 1e9).toFixed(2)} ns`); rF(`${(q * v * B * 1e15).toFixed(1)} fN`); f._w = w; };
  draw(); f.onChange = draw;
  f.loop((dt) => {
    const sgn = f.state.s > 0 ? -1 : 1; // screen coords (y down): + charge circles counter-clockwise, − clockwise
    th += sgn * dt * 2.2 * clamp(Math.sqrt(f.state.B / 4) * 1.1, 0.5, 2);
    const x = cx + R * Math.cos(th), y = cy + R * Math.sin(th);
    const ux = sgn * -Math.sin(th), uy = sgn * Math.cos(th), L = 46, ix = (cx - x) / R, iy = (cy - y) / R;
    set(p, { cx: x, cy: y }); set(vA, { x1: x, y1: y, x2: x + ux * L, y2: y + uy * L }); set(fA, { x1: x, y1: y, x2: x + ix * 36, y2: y + iy * 36 });
    set(vl, { x: x + ux * (L + 8), y: y + uy * (L + 8) }); set(fl, { x: x + ix * 46, y: y + iy * 46 + 5 });
  });
  return f.root;
}

/* ---------- M9: Faraday induction ---------- */
export function induction() {
  const f = frame({ title: 'Faraday’s law: a moving magnet makes a voltage in a coil', w: 720, hgt: 340, note: 'Only a CHANGING flux gives an emf. Stop the magnet and the voltage drops to zero; move it faster or use more turns and the voltage grows.' });
  const { svg } = f;
  f.slider('N', 'Turns N', 10, 200, 10, 80, ''); f.slider('freq', 'Shaking speed', 0.2, 2, 0.1, 0.8, 'Hz'); f.seg('auto', 'Magnet', [[1, 'Shake'], [0, 'Hold still']], 1);
  const rE = f.readout('Induced emf'), rPhi = f.readout('Flux Φ (relative)');
  const cy = 110, coilX = 220;
  const coil = S('g'); for (let i = 0; i < 7; i++) coil.append(S('ellipse', { cx: coilX - 30 + i * 10, cy, rx: 14, ry: 42, fill: 'none', stroke: '#B8742A', 'stroke-width': 4 }));
  const mag = S('g'); mag.append(S('rect', { x: -50, y: -16, width: 50, height: 32, fill: '#D6453D', stroke: 'var(--ink)', 'stroke-width': 3 }), S('rect', { x: 0, y: -16, width: 50, height: 32, fill: '#2F6FD6', stroke: 'var(--ink)', 'stroke-width': 3 }), S('text', { x: -25, y: 7, class: 'svglabel', fill: '#fff', 'text-anchor': 'middle' }, 'N'), S('text', { x: 25, y: 7, class: 'svglabel', fill: '#fff', 'text-anchor': 'middle' }, 'S'));
  const bulb = S('circle', { cx: 540, cy, r: 24, fill: '#FFF3C4', stroke: 'var(--ink)', 'stroke-width': 3 }), halo = S('circle', { cx: 540, cy, r: 40, fill: '#F2A33A', opacity: 0 });
  const gx0 = 40, gx1 = 690, gy = 270; const plot = S('path', { fill: 'none', stroke: '#2F6FD6', 'stroke-width': 3 });
  svg.append(S('path', { d: `M${coilX + 40} ${cy + 40} H540 V${cy + 24} M${coilX - 40} ${cy + 40} H100 V${cy - 80} H540 V${cy - 24}`, fill: 'none', stroke: 'var(--ink)', 'stroke-width': 3, opacity: 0.6 }), coil, halo, bulb, S('line', { x1: gx0, x2: gx1, y1: gy, y2: gy, stroke: 'var(--ink)', 'stroke-width': 2 }), S('text', { x: gx0, y: 214, class: 'svgtext' }, 'emf vs time'), plot, mag);
  const flux = (x) => 1 / Math.pow(1 + (x / 70) * (x / 70), 1.5); // x = magnet centre rel. to coil
  let t = 0, hist = [], prevPhi = 0, holdX = 150;
  f.loop((dt) => {
    t += dt; const x = f.state.auto ? 40 + 130 * Math.sin(t * 2 * Math.PI * f.state.freq) : holdX; const phi = flux(x - 0);
    const emf = dt > 0 ? -f.state.N * (phi - prevPhi) / dt * 0.01 : 0; prevPhi = phi;
    mag.setAttribute('transform', `translate(${coilX + x + 20},${cy})`);
    hist.push(clamp(emf, -6, 6)); if (hist.length > 220) hist.shift();
    let d = ''; hist.forEach((v, i) => { d += `${i ? 'L' : 'M'}${gx0 + (i / 220) * (gx1 - gx0)} ${gy - 12 - v * 8} `; }); plot.setAttribute('d', d);
    const m = Math.abs(hist[hist.length - 1]); set(halo, { opacity: clamp(m / 5, 0, 0.85) }); set(bulb, { fill: m > 0.3 ? '#FFE48A' : '#FFF3C4' });
    rE(`${hist[hist.length - 1].toFixed(2)} V (scaled)`); rPhi(phi.toFixed(2));
  });
  return f.root;
}

/* ---------- M10: Snell's law and TIR ---------- */
export function snell() {
  const f = frame({ title: 'Refraction and total internal reflection', w: 720, hgt: 340, note: 'Going into a higher n the ray bends toward the normal; into a lower n it bends away. Past the critical angle all the light reflects.' });
  const { svg } = f;
  const mats = [[1.0, 'Air (1.00)'], [1.33, 'Water (1.33)'], [1.5, 'Glass (1.50)'], [2.42, 'Diamond (2.42)']];
  f.slider('a', 'Angle of incidence θ₁', 0, 89, 1, 35, '°'); f.select('n1', 'Medium 1 (top)', mats, 1.5); f.select('n2', 'Medium 2 (bottom)', mats, 1);
  const rT = f.readout('Refraction angle θ₂'), rC = f.readout('Critical angle θc'), rS = f.readout('What happens');
  const cx = 360, cy = 170, L = 150, top = S('rect', { x: 0, y: 0, width: 720, height: cy, opacity: 0.35 }), bot = S('rect', { x: 0, y: cy, width: 720, height: 340 - cy, opacity: 0.35 });
  const nm = S('line', { x1: cx, x2: cx, y1: 15, y2: 325, stroke: 'var(--muted)', 'stroke-dasharray': '6 5', 'stroke-width': 2 }), face = S('line', { x1: 0, x2: 720, y1: cy, y2: cy, stroke: 'var(--ink)', 'stroke-width': 3 });
  const ri = S('line', { stroke: '#F2A33A', 'stroke-width': 5, 'stroke-linecap': 'round' }), rr = S('line', { stroke: '#F2A33A', 'stroke-width': 4, 'stroke-linecap': 'round' }), rf = S('line', { stroke: '#F2A33A', 'stroke-width': 5, 'stroke-linecap': 'round' });
  const l1 = S('text', { x: 16, y: 28, class: 'svglabel' }), l2 = S('text', { x: 16, y: 326, class: 'svglabel' }), ph = S('circle', { r: 6, fill: '#fff', stroke: '#F2A33A', 'stroke-width': 3 });
  svg.append(top, bot, nm, face, ri, rr, rf, l1, l2, ph);
  let seg = [];
  const draw = () => {
    const n1 = parseFloat(f.state.n1), n2 = parseFloat(f.state.n2), a = f.state.a * Math.PI / 180, s = n1 * Math.sin(a) / n2;
    top.setAttribute('fill', n1 > 1 ? '#8FD3E8' : '#E8EEFC'); bot.setAttribute('fill', n2 > 1 ? '#8FD3E8' : '#E8EEFC');
    top.setAttribute('opacity', 0.15 + Math.min(0.5, (n1 - 1) * 0.3)); bot.setAttribute('opacity', 0.15 + Math.min(0.5, (n2 - 1) * 0.3));
    l1.textContent = `n₁ = ${n1}`; l2.textContent = `n₂ = ${n2}`;
    const sx = cx - Math.sin(a) * L, sy = cy - Math.cos(a) * L; set(ri, { x1: sx, y1: sy, x2: cx, y2: cy });
    const refl = s > 1; const rx = cx + Math.sin(a) * L, ry = cy - Math.cos(a) * L;
    set(rr, { x1: cx, y1: cy, x2: rx, y2: ry, opacity: refl ? 1 : 0.35 });
    let t2 = null; if (!refl) { t2 = Math.asin(s); set(rf, { x1: cx, y1: cy, x2: cx + Math.sin(t2) * L, y2: cy + Math.cos(t2) * L, opacity: 1 }); } else set(rf, { x1: 0, y1: 0, x2: 0, y2: 0, opacity: 0 });
    seg = refl ? [[sx, sy], [cx, cy], [rx, ry]] : [[sx, sy], [cx, cy], [cx + Math.sin(t2) * L, cy + Math.cos(t2) * L]];
    rT(refl ? '—' : (t2 * 180 / Math.PI).toFixed(1) + '°'); rC(n1 > n2 ? (Math.asin(n2 / n1) * 180 / Math.PI).toFixed(1) + '°' : 'none (n₁ ≤ n₂)');
    rS(refl ? 'total internal reflection' : n2 > n1 ? 'bends toward the normal' : n2 < n1 ? 'bends away from normal' : 'goes straight');
  };
  draw(); f.onChange = draw; let u = 0;
  f.loop((dt) => { u = (u + dt * 0.5) % 1; const [a, b, c] = seg, d1 = Math.hypot(b[0] - a[0], b[1] - a[1]), d2 = Math.hypot(c[0] - b[0], c[1] - b[1]), d = u * (d1 + d2); let x, y; if (d < d1) { x = lerp(a[0], b[0], d / d1); y = lerp(a[1], b[1], d / d1); } else { const t = (d - d1) / d2; x = lerp(b[0], c[0], t); y = lerp(b[1], c[1], t); } set(ph, { cx: x, cy: y }); });
  return f.root;
}
