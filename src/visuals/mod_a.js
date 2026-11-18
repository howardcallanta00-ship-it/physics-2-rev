import { S, frame, clamp, lerp } from './kit.js';

const set = (el, o) => { for (const k in o) el.setAttribute(k, o[k]); return el; };

/* ---------- M1: Hydraulic press ---------- */
export function hydraulic() {
  const f = frame({ title: 'Hydraulic press: a small push lifts a heavy load', w: 720, hgt: 330, note: 'The pressure is the same everywhere in the fluid, so the big piston gets a bigger force. The price: it moves a smaller distance, because the volumes must match.' });
  const { svg } = f;
  f.slider('F1', 'Input force F₁', 10, 200, 5, 50, 'N');
  f.slider('ratio', 'Area ratio A₂ / A₁', 1, 20, 1, 8, '×');
  const rP = f.readout('Pressure P'), rF2 = f.readout('Output force F₂'), rD = f.readout('d₂ / d₁');
  const base = 290;
  svg.append(S('rect', { x: 90, y: 230, width: 540, height: 60, rx: 6, fill: '#8FD3E8', opacity: 0.9 }));
  const fl1 = S('rect', { fill: '#8FD3E8', opacity: 0.9 }), fl2 = S('rect', { fill: '#8FD3E8', opacity: 0.9 });
  const p1 = S('rect', { fill: 'var(--ink)', rx: 3 }), p2 = S('rect', { fill: 'var(--ink)', rx: 3 });
  const walls = S('path', { fill: 'none', stroke: 'var(--ink)', 'stroke-width': 5, 'stroke-linejoin': 'round' });
  const car = S('g'), arrow = S('path', { fill: '#B42318' }), load = S('rect', { fill: '#F2A33A', stroke: 'var(--ink)', 'stroke-width': 3, rx: 6 });
  const t1 = S('text', { class: 'svglabel', 'text-anchor': 'middle' }), t2 = S('text', { class: 'svglabel', 'text-anchor': 'middle' }), tl = S('text', { class: 'svgtext', 'text-anchor': 'middle', fill: '#14213D' }, 'load');
  svg.append(fl1, fl2, walls, p1, p2, load, arrow, t1, t2, tl);
  let ph = 0;
  const draw = () => {
    const r = f.state.ratio, w1 = 70, w2 = clamp(w1 * Math.sqrt(r), 70, 260);
    const x1 = 150, x2 = 520 - (w2 - 70) / 2 + 60; // piston centres
    const d1 = 50 * (0.5 - 0.5 * Math.cos(ph)), d2 = d1 / r; // d2 = d1 * A1/A2
    const y1 = 110 + d1, y2 = 150 - d2;
    set(fl1, { x: x1 - w1 / 2, y: y1 + 10, width: w1, height: 230 - y1 }); set(fl2, { x: x2 - w2 / 2, y: y2 + 10, width: w2, height: 230 - y2 });
    set(p1, { x: x1 - w1 / 2, y: y1, width: w1, height: 14 }); set(p2, { x: x2 - w2 / 2, y: y2, width: w2, height: 14 });
    set(walls, { d: `M${x1 - w1 / 2 - 4} 60 V230 H${x2 - w2 / 2 - 4} V110 M${x1 + w1 / 2 + 4} 60 V230 M${x2 + w2 / 2 + 4} 110 V240 H${x1 - w1 / 2 - 4} V230` });
    set(load, { x: x2 - w2 / 2 + 10, y: y2 - 46, width: w2 - 20, height: 46 }); set(tl, { x: x2, y: y2 - 17 });
    set(arrow, { d: `M${x1 - 8} ${y1 - 50} h16 v30 h12 l-20 20 l-20 -20 h12 z` });
    t1.setAttribute('x', x1); t1.setAttribute('y', 54); t1.textContent = `F₁ = ${f.state.F1} N`;
    t2.setAttribute('x', x2); t2.setAttribute('y', 40); t2.textContent = `F₂ = ${(f.state.F1 * r).toFixed(0)} N`;
    const A1 = 1e-3;
    rP(`${(f.state.F1 / A1 / 1000).toFixed(0)} kPa`); rF2(`${(f.state.F1 * r).toFixed(0)} N`); rD(`d₂ = d₁ / ${r}`);
  };
  draw(); f.onChange = draw;
  f.loop((dt) => { ph += dt * 1.6; draw(); });
  return f.root;
}

/* ---------- M2: Heating curve ---------- */
export function heatcurve() {
  const f = frame({ title: 'Heating 100 g of ice at −40 °C all the way to steam', w: 720, hgt: 330, note: 'On a slope the temperature rises (Q = mcΔT). On a flat step the heat goes into changing phase (Q = mL), so the temperature stays put.' });
  const { svg } = f;
  const m = 0.1, segs = [['ice', 8360, -40, 0], ['melting', 33500, 0, 0], ['water', 41860, 0, 100], ['boiling', 226000, 100, 100], ['steam', 2110, 100, 110]];
  const total = segs.reduce((s, x) => s + x[1], 0);
  f.slider('q', 'Heat added', 0, total, 1000, 0, 'kJ', (v) => (v / 1000).toFixed(0));
  const rT = f.readout('Temperature'), rPh = f.readout('Phase');
  f.button('Play / pause', () => { f._play = !f._play; }, 'play');
  const X0 = 70, X1 = 690, Y0 = 280, Y1 = 30, tx = (q) => X0 + (q / total) * (X1 - X0), ty = (T) => lerp(Y0, Y1, (T + 40) / 150);
  svg.append(S('line', { x1: X0, y1: Y0, x2: X1, y2: Y0, stroke: 'var(--ink)', 'stroke-width': 2 }), S('line', { x1: X0, y1: Y0, x2: X0, y2: Y1, stroke: 'var(--ink)', 'stroke-width': 2 }));
  [-40, 0, 100].forEach((T) => svg.append(S('line', { x1: X0 - 4, x2: X1, y1: ty(T), y2: ty(T), stroke: 'var(--line)', 'stroke-dasharray': '4 4' }), S('text', { x: X0 - 8, y: ty(T) + 4, class: 'svgtext', 'text-anchor': 'end' }, T + '°C')));
  let acc = 0, d = '';
  const cols = ['#5BA8E6', '#7A8CA8', '#2FA5A0', '#7A8CA8', '#C45D5D'];
  segs.forEach(([name, Q, a, b], i) => {
    svg.append(S('line', { x1: tx(acc), y1: ty(a), x2: tx(acc + Q), y2: ty(b), stroke: cols[i], 'stroke-width': 5, 'stroke-linecap': 'round' }),
      S('text', { x: tx(acc + Q / 2), y: ty((a + b) / 2) + (i % 2 ? -12 : 22), class: 'svglabel', 'text-anchor': 'middle', fill: cols[i] }, name));
    acc += Q;
  });
  svg.append(S('text', { x: 380, y: 318, class: 'svglabel', 'text-anchor': 'middle' }, 'heat added Q →'));
  const dot = S('circle', { r: 9, fill: '#F2A33A', stroke: 'var(--ink)', 'stroke-width': 3 });
  svg.append(dot);
  const sl = f.root.querySelector('input[type=range]');
  const draw = () => {
    let q = f.state.q, acc2 = 0, T = -40, ph = 'ice';
    for (const [name, Q, a, b] of segs) { if (q <= acc2 + Q) { T = lerp(a, b, (q - acc2) / Q); ph = name; break; } acc2 += Q; T = b; ph = name; }
    dot.setAttribute('cx', tx(q)); dot.setAttribute('cy', ty(T));
    rT(T.toFixed(1) + ' °C'); rPh({ ice: 'solid ice', melting: 'ice ⇄ water', water: 'liquid water', boiling: 'water ⇄ steam', steam: 'steam' }[ph]);
  };
  draw(); f.onChange = draw;
  f.loop((dt) => { if (f._play) { let q = f.state.q + dt * 25000; if (q > total) q = 0; sl.value = q; sl.dispatchEvent(new Event('input')); } });
  return f.root;
}

/* ---------- M3: Coulomb's law ---------- */
export function coulomb() {
  const f = frame({ title: 'Coulomb’s law: push or pull between two charges', w: 720, hgt: 260, note: 'Same signs repel, opposite signs attract. Double the distance and the force drops to one quarter.' });
  const { svg } = f;
  f.slider('q1', 'Charge q₁', -10, 10, 1, 5, 'nC'); f.slider('q2', 'Charge q₂', -10, 10, 1, -5, 'nC'); f.slider('r', 'Distance r', 2, 20, 0.5, 8, 'cm');
  const rF = f.readout('Force on each'), rK = f.readout('Nature');
  const y = 130, k = 8.99e9, cx = 360;
  const c1 = S('circle', { cy: y, r: 22, stroke: 'var(--ink)', 'stroke-width': 3 }), c2 = S('circle', { cy: y, r: 22, stroke: 'var(--ink)', 'stroke-width': 3 });
  const s1 = S('text', { class: 'svglabel', 'text-anchor': 'middle', fill: '#fff', 'font-size': 22 }), s2 = S('text', { class: 'svglabel', 'text-anchor': 'middle', fill: '#fff', 'font-size': 22 });
  const a1 = S('path', { fill: '#B42318' }), a2 = S('path', { fill: '#B42318' }), dim = S('line', { stroke: 'var(--muted)', 'stroke-width': 2, 'stroke-dasharray': '5 4' }), dl = S('text', { class: 'svgtext', 'text-anchor': 'middle' });
  svg.append(dim, dl, a1, a2, c1, c2, s1, s2);
  const col = (q) => (q > 0 ? '#D6453D' : q < 0 ? '#2F6FD6' : '#9AA3B5');
  const arrow = (el, x, dir, len) => { const L = Math.max(0, len); set(el, { d: L < 4 ? '' : `M${x} ${y - 5} h${dir * (L - 16)} v-9 l${dir * 20} 14 l${-dir * 20} 14 v-9 h${-dir * (L - 16)} z` }); };
  let t = 0;
  const draw = () => {
    const { q1, q2, r } = f.state; const F = k * Math.abs(q1 * q2) * 1e-18 / Math.pow(r / 100, 2);
    const half = r * 14 / 2, x1 = cx - half, x2 = cx + half; // 14 px per cm
    set(c1, { cx: x1, fill: col(q1) }); set(c2, { cx: x2, fill: col(q2) });
    set(s1, { x: x1, y: y + 8 }); set(s2, { x: x2, y: y + 8 }); s1.textContent = q1 > 0 ? '+' : q1 < 0 ? '−' : '0'; s2.textContent = q2 > 0 ? '+' : q2 < 0 ? '−' : '0';
    const len = clamp(Math.log10(F * 1e6 + 1) * 40, 0, 200), same = q1 * q2 > 0, wob = Math.sin(t * 6) * 3;
    arrow(a1, x1 + (same ? -26 : 26) + wob * (same ? -1 : 1), same ? -1 : 1, len); arrow(a2, x2 + (same ? 26 : -26) + wob * (same ? 1 : -1), same ? 1 : -1, len);
    set(dim, { x1: x1, x2: x2, y1: y + 60, y2: y + 60 }); set(dl, { x: cx, y: y + 80 }); dl.textContent = `r = ${r} cm`;
    rF(F >= 1e-3 ? `${F.toFixed(4)} N` : `${(F * 1e6).toFixed(1)} µN`); rK(q1 * q2 === 0 ? 'no force' : same ? 'repulsion' : 'attraction');
  };
  draw(); f.onChange = draw; f.loop((dt) => { t += dt; draw(); });
  return f.root;
}

/* ---------- M4: Electric field ---------- */
export function efield() {
  const f = frame({ title: 'Electric field: arrows show the push on a positive test charge', w: 720, hgt: 340, note: 'Field points away from + and toward −. Lines never cross, and they crowd together where the field is strong.' });
  const { svg } = f;
  f.slider('q1', 'Left charge', -3, 3, 1, 2, 'units'); f.slider('q2', 'Right charge', -3, 3, 1, -2, 'units');
  const rE = f.readout('Field at midpoint'), rD = f.readout('Direction at midpoint');
  const W = 720, H = 340, pos = [[230, 170], [490, 170]];
  const field = (x, y) => { let ex = 0, ey = 0; [f.state.q1, f.state.q2].forEach((q, i) => { const dx = x - pos[i][0], dy = y - pos[i][1], r2 = dx * dx + dy * dy + 60, r = Math.sqrt(r2); ex += q * dx / (r2 * r); ey += q * dy / (r2 * r); }); return [ex, ey]; };
  const grid = S('g'), parts = S('g'), ch = S('g');
  svg.append(grid, parts, ch);
  const dots = Array.from({ length: 28 }, () => ({ x: 0, y: 0, on: false })).map((d) => { const c = S('circle', { r: 4, fill: '#F2A33A', stroke: 'var(--ink)', 'stroke-width': 1.5 }); parts.append(c); d.el = c; return d; });
  const seed = (d, i) => { const s = i % 2 ? (f.state.q2 > 0 ? 1 : f.state.q1 > 0 ? 0 : -1) : (f.state.q1 > 0 ? 0 : f.state.q2 > 0 ? 1 : -1); if (s < 0) { d.on = false; d.el.setAttribute('opacity', 0); return; } const a = (i / 28) * 6.283 * 2; d.x = pos[s][0] + Math.cos(a) * 26; d.y = pos[s][1] + Math.sin(a) * 26; d.on = true; d.el.setAttribute('opacity', 1); };
  const build = () => {
    grid.replaceChildren();
    for (let x = 30; x < W; x += 44) for (let y = 24; y < H; y += 40) {
      const [ex, ey] = field(x, y), m = Math.hypot(ex, ey) || 1e-9, len = clamp(Math.log10(m * 4e4 + 1) * 7, 2, 20), ux = ex / m, uy = ey / m;
      grid.append(S('line', { x1: x - ux * len / 2, y1: y - uy * len / 2, x2: x + ux * len / 2, y2: y + uy * len / 2, stroke: 'var(--muted)', 'stroke-width': 2, 'stroke-linecap': 'round', opacity: 0.8 }),
        S('circle', { cx: x + ux * len / 2, cy: y + uy * len / 2, r: 2.4, fill: 'var(--muted)' }));
    }
    ch.replaceChildren();
    [f.state.q1, f.state.q2].forEach((q, i) => ch.append(S('circle', { cx: pos[i][0], cy: pos[i][1], r: 12 + Math.abs(q) * 3, fill: q >= 0 ? '#D6453D' : '#2F6FD6', stroke: 'var(--ink)', 'stroke-width': 3 }), S('text', { x: pos[i][0], y: pos[i][1] + 7, class: 'svglabel', 'text-anchor': 'middle', fill: '#fff', 'font-size': 22 }, q > 0 ? '+' : q < 0 ? '−' : '0')));
    const [mx, my] = field(360, 170), mag = Math.hypot(mx, my);
    rE(mag < 1e-9 ? '≈ 0' : (mag * 1e4).toFixed(2) + ' (rel.)'); rD(mag < 1e-9 ? '—' : mx > 0 ? 'to the right →' : '← to the left');
    dots.forEach(seed);
  };
  build(); f.onChange = build;
  f.loop((dt) => dots.forEach((d, i) => {
    if (!d.on) return; const [ex, ey] = field(d.x, d.y), m = Math.hypot(ex, ey) || 1e-9; const sp = 90;
    d.x += ex / m * sp * dt; d.y += ey / m * sp * dt;
    const hit = pos.some((p, j) => [f.state.q1, f.state.q2][j] < 0 && Math.hypot(d.x - p[0], d.y - p[1]) < 18);
    if (hit || d.x < 0 || d.x > W || d.y < 0 || d.y > H) seed(d, i);
    set(d.el, { cx: d.x, cy: d.y });
  }));
  return f.root;
}

/* ---------- M5: Potential ---------- */
export function potential() {
  const f = frame({ title: 'Electric potential: V = kq / r and its equipotential rings', w: 720, hgt: 330, note: 'Rings are equipotentials: no work is needed to slide a charge along one. Potential falls as 1/r, so the rings crowd near the charge.' });
  const { svg } = f;
  f.slider('q', 'Source charge q', -8, 8, 0.5, 4, 'nC'); f.slider('r', 'Probe distance r', 0.5, 5, 0.1, 1.8, 'm');
  const rV = f.readout('V at probe'), rE = f.readout('E at probe'), rU = f.readout('U of +1 nC there');
  const cx = 180, cy = 165, k = 8.99e9, pxm = 55; // 55 px per metre
  const rings = S('g'), graph = S('g');
  const src = S('circle', { cx, cy, r: 13, stroke: 'var(--ink)', 'stroke-width': 3 }), probe = S('circle', { r: 8, fill: '#F2A33A', stroke: 'var(--ink)', 'stroke-width': 3 });
  const gx0 = 400, gx1 = 700, gy0 = 290, gy1 = 40;
  svg.append(rings, src, probe, graph);
  const draw = () => {
    const q = f.state.q, r = f.state.r, V = k * q * 1e-9 / r, E = k * Math.abs(q) * 1e-9 / (r * r);
    rings.replaceChildren(); graph.replaceChildren();
    const step = q === 0 ? 10 : 10;
    for (let v = step; v <= 120; v += step) { const rr = Math.abs(k * q * 1e-9 / v); if (rr * pxm > 150 || rr * pxm < 16) continue; rings.append(S('circle', { cx, cy, r: rr * pxm, fill: 'none', stroke: q > 0 ? '#D6453D' : '#2F6FD6', 'stroke-width': 2, opacity: 0.7, 'stroke-dasharray': '6 4', class: 'ring' }), S('text', { x: cx + rr * pxm * 0.707 + 4, y: cy - rr * pxm * 0.707, class: 'svgtext', 'font-size': 11 }, (q > 0 ? '' : '−') + v + ' V')); }
    set(src, { fill: q >= 0 ? '#D6453D' : '#2F6FD6' }); set(probe, { cx: cx + r * pxm, cy });
    rings.append(S('line', { x1: cx, y1: cy, x2: cx + r * pxm, y2: cy, stroke: 'var(--ink)', 'stroke-width': 2 }));
    graph.append(S('line', { x1: gx0, y1: gy0, x2: gx1, y2: gy0, stroke: 'var(--ink)', 'stroke-width': 2 }), S('line', { x1: gx0, y1: gy0, x2: gx0, y2: gy1, stroke: 'var(--ink)', 'stroke-width': 2 }), S('text', { x: gx1, y: gy0 + 22, class: 'svgtext', 'text-anchor': 'end' }, 'r (m) →'), S('text', { x: gx0 + 6, y: gy1 - 8, class: 'svgtext' }, 'V (volts)'));
    const gy = (v) => (q >= 0 ? lerp(gy0, gy1, clamp(v / 150, 0, 1)) : lerp(gy0, gy1, clamp(-v / 150, 0, 1)));
    let d = ''; for (let rr = 0.3; rr <= 5; rr += 0.1) d += `${d ? 'L' : 'M'}${gx0 + (rr / 5) * (gx1 - gx0)} ${gy(k * q * 1e-9 / rr)} `;
    graph.append(S('path', { d, fill: 'none', stroke: '#14213D', 'stroke-width': 3, class: 'curve' }), S('circle', { cx: gx0 + (r / 5) * (gx1 - gx0), cy: gy(V), r: 7, fill: '#F2A33A', stroke: 'var(--ink)', 'stroke-width': 3 }));
    rV(`${V.toFixed(1)} V`); rE(`${E.toFixed(1)} N/C`); rU(`${(V * 1e-9).toExponential(2)} J`);
  };
  draw(); f.onChange = draw; let o = 0;
  f.loop((dt) => { o -= dt * 14; svg.querySelectorAll('.ring').forEach((c) => c.setAttribute('stroke-dashoffset', o)); });
  return f.root;
}
