import { S, frame, clamp } from './kit.js';

export default function ohm() {
  const f = frame({ title: "Ohm's law as water in a pipe", w: 680, hgt: 340, note: 'Pump pressure = voltage. Narrowness of the pipe = resistance. Amount of water flowing per second = current. The graph builds a point each time you change the voltage.' });
  const { svg } = f;
  f.slider('V', 'Voltage V (pump pressure)', 0, 10, 0.5, 5, 'V');
  f.select('R', 'Resistor R (pipe narrowness)', [['47', '47 Ω (wide pipe)'], ['100', '100 Ω'], ['330', '330 Ω'], ['1000', '1000 Ω (very narrow)']], '47');
  const rI = f.readout('Current I = V/R');
  const rS = f.readout('Graph slope = R');

  // pipe (left)
  const px0 = 30, px1 = 300, cy = 150;
  const pump = S('g');
  const pumpBody = S('rect', { x: px0, y: cy - 62, width: 54, height: 124, rx: 12, fill: '#14213D' });
  const gauge = S('rect', { x: px0 + 14, width: 26, fill: '#F2A33A', rx: 4 });
  pump.append(pumpBody, S('rect', { x: px0 + 14, y: cy - 50, width: 26, height: 100, rx: 4, fill: '#33406A' }), gauge, S('text', { x: px0 + 27, y: cy + 82, class: 'svglabel', 'text-anchor': 'middle' }, 'Pump (V)'));
  const pipeTop = S('path', { fill: 'none', stroke: 'var(--ink)', 'stroke-width': 5, 'stroke-linejoin': 'round' });
  const pipeBot = S('path', { fill: 'none', stroke: 'var(--ink)', 'stroke-width': 5, 'stroke-linejoin': 'round' });
  const water = S('rect', { x: px0 + 54, width: px1 - px0 - 54, fill: '#60A5FA', opacity: 0.25 });
  const dots = [];
  const dg = S('g');
  for (let i = 0; i < 18; i++) { const d = S('circle', { r: 4, fill: '#3B82F6' }); dots.push({ el: d, x: px0 + 60 + Math.random() * (px1 - px0 - 70), y: cy + (Math.random() - 0.5) * 20 }); dg.append(d); }
  const narrowLbl = S('text', { x: 175, y: cy + 82, class: 'svglabel', 'text-anchor': 'middle' }, 'Narrow section (R)');
  svg.append(water, pipeTop, pipeBot, pump, dg, narrowLbl);

  // graph (right): I (mA) on x, V on y
  const gx0 = 400, gx1 = 650, gy0 = 290, gy1 = 40;
  const gw = gx1 - gx0, gh = gy0 - gy1;
  const g = S('g');
  g.append(S('rect', { x: gx0, y: gy1, width: gw, height: gh, fill: 'var(--paper)', stroke: 'var(--line-strong)' }));
  for (let v = 0; v <= 10; v += 2) { const y = gy0 - (v / 10) * gh; g.append(S('line', { x1: gx0, x2: gx1, y1: y, y2: y, stroke: 'var(--line)' }), S('text', { x: gx0 - 6, y: y + 4, class: 'svgtext', 'text-anchor': 'end' }, v)); }
  for (let i = 0; i <= 200; i += 50) { const x = gx0 + (i / 220) * gw; g.append(S('line', { x1: x, x2: x, y1: gy1, y2: gy0, stroke: 'var(--line)' }), S('text', { x, y: gy0 + 16, class: 'svgtext', 'text-anchor': 'middle' }, i)); }
  g.append(S('text', { x: gx0 + gw / 2, y: 330, class: 'svglabel', 'text-anchor': 'middle' }, 'current I (mA)'), S('text', { x: 350, y: gy1 + 8, class: 'svglabel', 'text-anchor': 'middle' }, 'V (V)'));
  const line = S('line', { stroke: '#0F766E', 'stroke-width': 4, 'stroke-linecap': 'round' });
  const pts = S('g');
  const dot = S('circle', { r: 8, fill: '#F2A33A', stroke: 'var(--ink)', 'stroke-width': 3 });
  svg.append(g, line, pts, dot);
  let history = [];
  const toXY = (I, V) => [gx0 + (I / 220) * gw, gy0 - (V / 10) * gh];

  const draw = () => {
    const R = parseFloat(f.state.R), V = f.state.V;
    const I = (V / R) * 1000; // mA
    const [x1, y1] = toXY(0, 0), [x2, y2] = toXY(10 / R * 1000, 10);
    line.setAttribute('x1', x1); line.setAttribute('y1', y1); line.setAttribute('x2', x2); line.setAttribute('y2', y2);
    const [dx, dy] = toXY(I, V);
    dot.setAttribute('cx', dx); dot.setAttribute('cy', dy);
    // pipe geometry: narrowing in the middle
    const open = { 47: 36, 100: 26, 330: 14, 1000: 7 }[R] / 2;
    const mid = 185, w = 40;
    const top = `M${px0 + 54} ${cy - 50} H${mid - w - 20} L${mid - w} ${cy - open} H${mid + w} L${mid + w + 20} ${cy - 50} H${px1}`;
    const bot = `M${px0 + 54} ${cy + 50} H${mid - w - 20} L${mid - w} ${cy + open} H${mid + w} L${mid + w + 20} ${cy + 50} H${px1}`;
    pipeTop.setAttribute('d', top); pipeBot.setAttribute('d', bot);
    water.setAttribute('y', cy - 50); water.setAttribute('height', 100);
    const ph = (V / 10) * 100;
    gauge.setAttribute('y', cy + 50 - ph); gauge.setAttribute('height', ph);
    rI(I.toFixed(1) + ' mA');
    rS(R + ' Ω');
    // remember points for the graph
    const key = `${R}-${V}`;
    if (!history.find((h) => h.key === key)) history.push({ key, I, V });
    if (history.length > 40) history.shift();
    pts.replaceChildren(...history.filter((h) => h.key.startsWith(R + '-')).map((h) => { const [x, y] = toXY(h.I, h.V); return S('circle', { cx: x, cy: y, r: 4, fill: '#0F766E' }); }));
    return { R, V, I, open };
  };
  let st = draw();
  f.onChange = (k) => { if (k === 'R') history = []; st = draw(); };
  f.loop((dt) => {
    const speed = st.I * 1.1; // px/s, proportional to current
    dots.forEach((d) => {
      d.x += speed * dt;
      if (d.x > px1 - 6) { d.x = px0 + 60; d.y = cy + (Math.random() - 0.5) * 80; }
      // squeeze through the narrow neck
      const mid = 185;
      let yy = d.y;
      const lim = (Math.abs(d.x - mid) < 60) ? Math.min(st.open - 5, 44) : 44;
      yy = clamp(yy - cy, -lim, lim) + cy;
      d.el.setAttribute('cx', d.x); d.el.setAttribute('cy', yy);
      d.el.setAttribute('opacity', st.I > 0.2 ? 1 : 0.15);
    });
  });
  return f.root;
}
