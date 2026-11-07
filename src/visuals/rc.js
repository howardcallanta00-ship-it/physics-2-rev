import { S, frame, pathPoint, clamp } from './kit.js';

export default function rc() {
  const f = frame({ title: 'Charging and discharging a capacitor', w: 680, hgt: 340, note: 'The animation is sped up so 5τ always takes about 8 seconds. Real time is shown in the readout.' });
  const { svg } = f;
  f.slider('R', 'Resistance R', 10, 200, 10, 100, 'kΩ');
  f.slider('C', 'Capacitance C', 47, 470, 1, 470, 'µF');
  f.slider('Vs', 'Supply Vₛ', 3, 15, 1, 12, 'V');
  f.seg('mode', 'Mode', [['charge', 'Charging'], ['discharge', 'Discharging']], 'charge');
  f.button('Restart', () => { sim = 0; }, 'reset');
  const rTau = f.readout('Time constant τ');
  const rT = f.readout('Real time t');
  const rV = f.readout('Capacitor voltage V_C');
  const rP = f.readout('Voltage level');

  let sim = 0; // in units of tau
  // ---- circuit (left) ----
  const cx0 = 40, cx1 = 250, top = 70, bot = 270;
  svg.append(S('path', { d: `M${cx0} ${bot} V${top} H${cx1 - 60} M${cx1} ${top} H${cx1 + 6} V${150} M${cx1 + 6} ${190} V${bot} H${cx0}`, fill: 'none', stroke: 'var(--ink)', 'stroke-width': 4, 'stroke-linejoin': 'round' }));
  // resistor on top
  const rz = S('path', { d: `M${cx1 - 150} ${top} l12 0 l6 -12 l12 24 l12 -24 l12 24 l12 -24 l6 12 l12 0`, fill: 'none', stroke: 'var(--ink)', 'stroke-width': 4 });
  svg.append(S('rect', { x: cx1 - 160, y: top - 16, width: 100, height: 32, fill: 'var(--paper)' }), rz, S('text', { x: cx1 - 105, y: top - 24, class: 'svglabel', 'text-anchor': 'middle' }, 'R'));
  // battery
  svg.append(S('rect', { x: cx0 - 26, y: 140, width: 52, height: 70, fill: 'var(--paper)' }),
    S('line', { x1: cx0 - 22, x2: cx0 + 22, y1: 150, y2: 150, stroke: 'var(--ink)', 'stroke-width': 4 }), S('line', { x1: cx0 - 11, x2: cx0 + 11, y1: 170, y2: 170, stroke: 'var(--ink)', 'stroke-width': 8 }),
    S('line', { x1: cx0, x2: cx0, y1: 140, y2: 150, stroke: 'var(--ink)', 'stroke-width': 4 }), S('line', { x1: cx0, x2: cx0, y1: 170, y2: 210, stroke: 'var(--ink)', 'stroke-width': 4 }),
    S('text', { x: cx0 + 30, y: 156, class: 'svglabel' }, 'Vₛ'));
  // capacitor plates with fill
  const plateTop = S('rect', { x: cx1 - 30, y: 150, width: 72, height: 8, rx: 2, fill: 'var(--ink)' });
  const plateBot = S('rect', { x: cx1 - 30, y: 182, width: 72, height: 8, rx: 2, fill: 'var(--ink)' });
  const field = S('rect', { x: cx1 - 28, y: 158, width: 68, height: 24, fill: '#F2A33A', opacity: 0 });
  svg.append(S('line', { x1: cx1 + 6, x2: cx1 + 6, y1: top, y2: 150, stroke: 'var(--ink)', 'stroke-width': 4 }), S('line', { x1: cx1 + 6, x2: cx1 + 6, y1: 190, y2: bot, stroke: 'var(--ink)', 'stroke-width': 4 }), field, plateTop, plateBot,
    S('text', { x: cx1 + 52, y: 175, class: 'svglabel' }, 'C'));
  const plus = S('g', { fill: '#B42318', 'font-family': 'JetBrains Mono', 'font-size': 16, 'font-weight': 700, 'text-anchor': 'middle' });
  const minus = S('g', { fill: '#1D4ED8', 'font-family': 'JetBrains Mono', 'font-size': 18, 'font-weight': 700, 'text-anchor': 'middle' });
  const pl = [], mi = [];
  for (let i = 0; i < 6; i++) { const a = S('text', { x: cx1 - 20 + i * 12, y: 146 }, '+'); const b = S('text', { x: cx1 - 20 + i * 12, y: 208 }, '−'); pl.push(a); mi.push(b); plus.append(a); minus.append(b); }
  svg.append(plus, minus);
  // current dots
  const pp = pathPoint([[cx0, 170], [cx0, top], [cx1 + 6, top], [cx1 + 6, 150]]);
  const pp2 = pathPoint([[cx1 + 6, 190], [cx1 + 6, bot], [cx0, bot], [cx0, 210]]);
  const dots = [];
  for (let i = 0; i < 16; i++) { const d = S('circle', { r: 4, fill: '#3B82F6' }); dots.push(d); svg.append(d); }
  const vlabel = S('text', { x: cx1 + 52, y: 215, class: 'svgtext' });
  svg.append(vlabel);

  // ---- graph (right) ----
  const gx0 = 330, gx1 = 650, gy0 = 290, gy1 = 50;
  const gw = gx1 - gx0, gh = gy0 - gy1;
  const g = S('g');
  g.append(S('rect', { x: gx0, y: gy1, width: gw, height: gh, fill: 'var(--paper)', stroke: 'var(--line-strong)' }));
  for (let k = 1; k <= 6; k++) {
    const x = gx0 + (k / 6) * gw;
    g.append(S('line', { x1: x, x2: x, y1: gy1, y2: gy0, stroke: 'var(--line)', 'stroke-width': 1 }), S('text', { x, y: gy0 + 16, class: 'svgtext', 'text-anchor': 'middle' }, k + 'τ'));
  }
  [0, 0.368, 0.632, 1].forEach((p) => {
    const y = gy0 - p * gh;
    g.append(S('line', { x1: gx0, x2: gx1, y1: y, y2: y, stroke: p === 0.632 || p === 0.368 ? '#F2A33A' : 'var(--line)', 'stroke-width': 1.5, 'stroke-dasharray': '4 4' }),
      S('text', { x: gx0 - 6, y: y + 4, class: 'svgtext', 'text-anchor': 'end' }, p === 0 ? '0' : p === 1 ? '100%' : Math.round(p * 100) + '%'));
  });
  g.append(S('text', { x: gx0 + gw / 2, y: 330, class: 'svglabel', 'text-anchor': 'middle' }, 'time (in time constants τ)'));
  const curve = S('path', { fill: 'none', stroke: '#0F766E', 'stroke-width': 4, 'stroke-linecap': 'round' });
  const dot = S('circle', { r: 7, fill: '#F2A33A', stroke: 'var(--ink)', 'stroke-width': 3 });
  svg.append(g, curve, dot);

  const level = (x, mode) => (mode === 'charge' ? 1 - Math.exp(-x) : Math.exp(-x));
  f.loop((dt) => {
    const { R, C, Vs, mode } = f.state;
    const tau = R * 1e3 * C * 1e-6;
    sim = Math.min(6, sim + dt * (5 / 8));
    if (sim >= 6) sim = 6;
    const lv = level(sim, mode);
    const cur = mode === 'charge' ? Math.exp(-sim) : Math.exp(-sim);
    // curve
    let d = '';
    const n = Math.max(2, Math.round((sim / 6) * 80));
    for (let i = 0; i <= n; i++) {
      const x = (i / n) * sim;
      const px = gx0 + (x / 6) * gw, py = gy0 - level(x, mode) * gh;
      d += (i ? 'L' : 'M') + px.toFixed(1) + ' ' + py.toFixed(1);
    }
    curve.setAttribute('d', d);
    dot.setAttribute('cx', gx0 + (sim / 6) * gw); dot.setAttribute('cy', gy0 - lv * gh);
    // plates
    const nShown = Math.round(lv * 6);
    pl.forEach((e, i) => e.setAttribute('opacity', i < nShown ? 1 : 0.1));
    mi.forEach((e, i) => e.setAttribute('opacity', i < nShown ? 1 : 0.1));
    field.setAttribute('opacity', lv * 0.5);
    // current dots speed ~ cur
    dots.forEach((dd, i) => {
      const spd = (performance.now() / 1000) * cur * 0.35;
      const p = i < 8 ? pp(((i / 8) + spd) % 1) : pp2((((i - 8) / 8) + spd) % 1);
      const flip = mode === 'discharge';
      dd.setAttribute('cx', p[0]); dd.setAttribute('cy', p[1]);
      dd.setAttribute('opacity', cur > 0.03 ? 1 : 0.1);
    });
    const V = Vs * lv;
    vlabel.textContent = V.toFixed(2) + ' V';
    rTau(tau.toFixed(1) + ' s');
    rT((sim * tau).toFixed(1) + ' s');
    rV(V.toFixed(2) + ' V');
    rP((lv * 100).toFixed(1) + ' %');
  });
  return f.root;
}
