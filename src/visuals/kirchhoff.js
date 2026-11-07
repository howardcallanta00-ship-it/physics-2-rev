import { S, frame, pathPoint, clamp, lerp } from './kit.js';

/** KCL: water pipes meeting at a junction. */
export function kcl() {
  const f = frame({ title: 'Kirchhoff’s current law: what flows in must flow out', w: 640, hgt: 300, note: 'A junction cannot store charge, just as a pipe junction cannot store water. Whatever you send in on the left has to leave on the right.' });
  const { svg } = f;
  f.slider('i1', 'Current in, I₁', 20, 100, 1, 70, 'mA');
  f.slider('i2', 'Current out the top branch, I₂', 0, 100, 1, 30, 'mA');
  const rS = f.readout('Sum with signs: +I₁ − I₂ − I₃');
  const rI3 = f.readout('I₃ (must be)');

  const jx = 300, jy = 150;
  const pipes = [
    { pts: [[40, jy], [jx, jy]], c: '#3B82F6', label: 'I₁ in', lx: 130, ly: jy - 22 },
    { pts: [[jx, jy], [jx + 100, jy - 80], [600, jy - 80]], c: '#F2A33A', label: 'I₂ out', lx: 500, ly: jy - 104 },
    { pts: [[jx, jy], [jx + 100, jy + 80], [600, jy + 80]], c: '#0F766E', label: 'I₃ out', lx: 500, ly: jy + 112 }
  ];
  const g = S('g');
  pipes.forEach((p) => {
    g.append(S('polyline', { points: p.pts.map((q) => q.join(',')).join(' '), fill: 'none', stroke: 'var(--ink)', 'stroke-width': 30, 'stroke-linejoin': 'round', 'stroke-linecap': 'butt' }),
      S('polyline', { points: p.pts.map((q) => q.join(',')).join(' '), fill: 'none', stroke: 'var(--paper)', 'stroke-width': 22, 'stroke-linejoin': 'round' }),
      S('text', { x: p.lx, y: p.ly, class: 'svglabel', fill: p.c, 'text-anchor': 'middle', style: 'font-size:16px' }, p.label));
  });
  g.append(S('circle', { cx: jx, cy: jy, r: 15, fill: 'var(--ink)' }), S('text', { x: jx, y: jy + 36, class: 'svglabel', 'text-anchor': 'middle' }, 'junction (node)'));
  const dots = pipes.map((p, k) => ({ fn: pathPoint(p.pts), els: Array.from({ length: 14 }, () => S('circle', { r: 5, fill: p.c })), ph: 0 }));
  dots.forEach((d) => d.els.forEach((e) => g.append(e)));
  svg.append(g);
  const draw = () => {
    let { i1, i2 } = f.state;
    if (i2 > i1) { i2 = i1; }
    const i3 = i1 - i2;
    f.state.i3 = i3; f.state.i2e = i2;
    rS(`${i1} − ${i2} − ${i3} = ${i1 - i2 - i3}`);
    rI3(`${i3} mA`);
  };
  draw();
  f.onChange = draw;
  f.loop((dt) => {
    const cur = [f.state.i1, f.state.i2e, f.state.i3];
    dots.forEach((d, k) => {
      d.ph = (d.ph + dt * cur[k] / 100 * 0.55) % 1;
      const n = Math.max(0, Math.round((cur[k] / 100) * 14));
      d.els.forEach((e, i) => {
        if (i >= n) { e.setAttribute('opacity', 0); return; }
        const p = d.fn((i / n + d.ph) % 1);
        e.setAttribute('cx', p[0]); e.setAttribute('cy', p[1]); e.setAttribute('opacity', 1);
      });
    });
  });
  return f.root;
}

/** KVL: a roller coaster. Gains go up, drops go down, you finish where you started. */
export function kvl() {
  const f = frame({ title: 'Kirchhoff’s voltage law: climb the hill, then slide back down', w: 660, hgt: 340, note: 'The battery lifts the charge up by ε. Each resistor lets it slide down by IR. Add up all the climbs (+) and all the slides (−) and you land back at zero.' });
  const { svg } = f;
  f.slider('e', 'Battery ε', 3, 12, 1, 8, 'V');
  f.select('r1', 'R₁', [['47', '47 Ω'], ['100', '100 Ω'], ['330', '330 Ω']], '100');
  f.select('r2', 'R₂', [['47', '47 Ω'], ['100', '100 Ω'], ['330', '330 Ω']], '47');
  const rI = f.readout('Current I');
  const rD1 = f.readout('Drop across R₁');
  const rD2 = f.readout('Drop across R₂');
  const rSum = f.readout('ΣV around the loop');

  const x0 = 70, base = 270, scale = 16; // px per volt
  const g = S('g'), ball = S('circle', { r: 11, fill: '#F2A33A', stroke: 'var(--ink)', 'stroke-width': 3 });
  svg.append(g, ball);
  let pts = [];
  const draw = () => {
    g.replaceChildren();
    const e = f.state.e, r1 = parseFloat(f.state.r1), r2 = parseFloat(f.state.r2);
    const I = e / (r1 + r2), d1 = I * r1, d2 = I * r2;
    const colW = 150;
    const y = (v) => base - v * scale;
    g.append(S('line', { x1: x0 - 20, x2: 640, y1: base, y2: base, stroke: 'var(--ink)', 'stroke-width': 2, 'stroke-dasharray': '6 5' }), S('text', { x: 14, y: base + 4, class: 'svgtext' }, '0 V'));
    const steps = [
      { name: `+ε = +${e} V`, from: 0, to: e, c: '#0F766E' },
      { name: `−IR₁ = −${d1.toFixed(2)} V`, from: e, to: e - d1, c: '#B42318' },
      { name: `−IR₂ = −${d2.toFixed(2)} V`, from: e - d1, to: 0, c: '#B42318' }
    ];
    pts = [[x0, y(0)]];
    steps.forEach((s, i) => {
      const xa = x0 + i * colW + 20, xb = xa + colW - 30;
      const top = Math.min(y(s.from), y(s.to)), hh = Math.abs(y(s.from) - y(s.to));
      g.append(S('rect', { x: xa + 20, y: top, width: colW - 70, height: Math.max(hh, 2), fill: s.c, opacity: 0.85, rx: 4 }),
        S('text', { x: xa + (colW - 30) / 2, y: top - 8, class: 'svglabel', 'text-anchor': 'middle', fill: s.c }, s.name));
      pts.push([xa, y(s.from)], [xa + 20, y(s.from)], [xa + 20 + (colW - 70) / 2, (y(s.from) + y(s.to)) / 2], [xb - 20, y(s.to)], [xb, y(s.to)]);
    });
    pts.push([x0 + 3 * colW + 20, y(0)]);
    g.append(S('text', { x: x0 + 20, y: 316, class: 'svglabel' }, 'battery'), S('text', { x: x0 + colW + 40, y: 316, class: 'svglabel' }, 'resistor R₁'), S('text', { x: x0 + 2 * colW + 40, y: 316, class: 'svglabel' }, 'resistor R₂'));
    rI((I * 1000).toFixed(1) + ' mA'); rD1(d1.toFixed(2) + ' V'); rD2(d2.toFixed(2) + ' V');
    rSum((e - d1 - d2).toFixed(2) + ' V');
  };
  draw();
  f.onChange = draw;
  const fn = () => pathPoint(pts);
  let u = 0, pf = fn();
  f.onChange = () => { draw(); pf = fn(); };
  pf = fn();
  f.loop((dt) => {
    u = (u + dt * 0.16) % 1;
    const p = pf(u);
    ball.setAttribute('cx', p[0]); ball.setAttribute('cy', p[1] - 12);
  });
  return f.root;
}
