import { S, frame } from './kit.js';

const MAT = { brass: ['Brass', 2.0e-5, '#C9A227'], steel: ['Steel', 1.2e-5, '#8B93A7'] };

export default function expansion() {
  const f = frame({ title: 'Heat a rod and watch it grow', w: 640, hgt: 340, note: 'The growth is tiny, so the picture is exaggerated. Watch the atoms: hotter means bigger jiggles, so they need more room.' });
  const { svg } = f;
  f.slider('T', 'Temperature of rod', 25, 100, 1, 25, '°C');
  f.seg('mat', 'Material', [['brass', 'Brass'], ['steel', 'Steel']], 'brass');
  const rDL = f.readout('Change in length ΔL');
  const rDiv = f.readout('Dial gauge reading');
  const rAlpha = f.readout('Coefficient α');
  const L0 = 600; // mm
  const x0 = 70, y0 = 150, rodH = 56;
  const rod = S('rect', { x: x0, y: y0, height: rodH, rx: 6, stroke: 'var(--ink)', 'stroke-width': 3 });
  const wall = S('rect', { x: x0 - 22, y: y0 - 30, width: 22, height: rodH + 60, fill: 'var(--ink)' });
  const ghost = S('line', { y1: y0 - 36, y2: y0 + rodH + 36, stroke: 'var(--muted)', 'stroke-width': 2, 'stroke-dasharray': '5 5' });
  const ghostLbl = S('text', { class: 'svgtext', y: y0 - 42, 'text-anchor': 'middle', fill: 'var(--muted)' }, 'start length');
  const tip = S('rect', { width: 14, height: 18, y: y0 + rodH / 2 - 9, fill: 'var(--ink)' });
  // dial gauge
  const gx = 540, gy = 250, gr = 56;
  const dial = S('circle', { cx: gx, cy: gy, r: gr, fill: 'var(--paper)', stroke: 'var(--ink)', 'stroke-width': 4 });
  const ticks = S('g', { stroke: 'var(--ink)', 'stroke-width': 1.5 });
  for (let i = 0; i < 20; i++) {
    const a = (i / 20) * Math.PI * 2 - Math.PI / 2;
    ticks.append(S('line', { x1: gx + Math.cos(a) * (gr - 4), y1: gy + Math.sin(a) * (gr - 4), x2: gx + Math.cos(a) * (gr - (i % 5 ? 9 : 14)), y2: gy + Math.sin(a) * (gr - (i % 5 ? 9 : 14)) }));
  }
  const needle = S('line', { x1: gx, y1: gy, x2: gx, y2: gy - gr + 12, stroke: '#B42318', 'stroke-width': 3, 'stroke-linecap': 'round' });
  const gaugeLbl = S('text', { x: gx, y: gy + gr + 20, class: 'svglabel', 'text-anchor': 'middle' }, 'Dial gauge (1 line = 0.01 mm)');
  const link = S('path', { fill: 'none', stroke: 'var(--ink)', 'stroke-width': 3 });
  // atoms
  const atoms = [];
  const ag = S('g');
  const rows = 3, cols = 12;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const a = S('circle', { r: 6, fill: '#fff', stroke: 'var(--ink)', 'stroke-width': 2, opacity: 0.95 });
    atoms.push({ el: a, r, c, ph: Math.random() * 6.28 });
    ag.append(a);
  }
  // thermometer
  const thx = 580, thy = 30;
  const therm = S('g');
  const tb = S('rect', { x: thx, y: thy, width: 14, height: 110, rx: 7, fill: 'var(--paper)', stroke: 'var(--ink)', 'stroke-width': 3 });
  const tf = S('rect', { x: thx + 3, width: 8, fill: '#B42318', rx: 3 });
  therm.append(tb, tf, S('text', { x: thx + 7, y: thy + 130, class: 'svgtext', 'text-anchor': 'middle' }, '°C'));
  const steam = S('g', { opacity: 0.0, fill: 'none', stroke: 'var(--muted)', 'stroke-width': 3, 'stroke-linecap': 'round' });
  for (let i = 0; i < 3; i++) steam.append(S('path', { d: `M${x0 + 60 + i * 20} ${y0 + rodH + 24} q8 -10 0 -20 q-8 -10 0 -20` }));
  svg.append(wall, rod, ag, ghost, ghostLbl, link, tip, dial, ticks, needle, gaugeLbl, therm, steam);

  const draw = () => {
    const [, alpha, col] = MAT[f.state.mat];
    const T = f.state.T, dT = T - 25;
    const dLmm = alpha * L0 * dT;              // mm
    const view = 40 + dLmm * 160;              // exaggerated px growth
    const len = 440 + view;
    rod.setAttribute('width', len); rod.setAttribute('fill', col);
    ghost.setAttribute('x1', x0 + 440); ghost.setAttribute('x2', x0 + 440); ghostLbl.setAttribute('x', x0 + 440);
    tip.setAttribute('x', x0 + len);
    link.setAttribute('d', `M${x0 + len + 14} ${y0 + rodH / 2} H${gx - gr - 14 + 0} V${gy} H${gx - gr}`);
    const divs = dLmm / 0.01;
    const ang = (divs / 100) * Math.PI * 2 - Math.PI / 2;
    needle.setAttribute('x2', gx + Math.cos(ang) * (gr - 12)); needle.setAttribute('y2', gy + Math.sin(ang) * (gr - 12));
    const fh = 8 + ((T - 25) / 75) * 92;
    tf.setAttribute('y', thy + 110 - fh - 4); tf.setAttribute('height', fh);
    steam.setAttribute('opacity', T > 40 ? Math.min(0.8, (T - 40) / 60) : 0);
    rDL(`${dLmm.toFixed(3)} mm`);
    rDiv(`${divs.toFixed(1)} lines`);
    rAlpha(`${(alpha * 1e5).toFixed(1)}×10⁻⁵ /°C`);
  };
  draw();
  f.onChange = draw;
  f.loop((dt, t) => {
    const T = f.state.T;
    const amp = 0.8 + ((T - 25) / 75) * 4.2;
    const len = parseFloat(rod.getAttribute('width'));
    const gap = (len - 24) / (cols - 1);
    for (const a of atoms) {
      const bx = x0 + 12 + a.c * gap, by = y0 + 12 + a.r * ((rodH - 24) / (rows - 1));
      a.el.setAttribute('cx', bx + Math.sin(t * (6 + amp) + a.ph) * amp);
      a.el.setAttribute('cy', by + Math.cos(t * (5 + amp) + a.ph * 1.3) * amp * 0.7);
    }
  });
  return f.root;
}
