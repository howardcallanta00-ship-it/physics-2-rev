import { S, frame, pathPoint } from './kit.js';

export default function network() {
  const f = frame({ title: 'Series vs. parallel', w: 680, hgt: 340, note: 'Series: one road, same traffic everywhere, each toll gate takes a share of the push. Parallel: several roads, each gets the full push, traffic splits.' });
  const { svg } = f;
  f.seg('mode', 'Connection', [['series', 'Series'], ['parallel', 'Parallel']], 'series');
  f.select('r1', 'R₁', [['47', '47 Ω'], ['100', '100 Ω'], ['330', '330 Ω']], '100');
  f.select('r2', 'R₂', [['47', '47 Ω'], ['100', '100 Ω'], ['330', '330 Ω']], '47');
  const rRT = f.readout('Total R');
  const rIT = f.readout('Total current I_T');
  const rI1 = f.readout('I₁');
  const rI2 = f.readout('I₂');
  const rV1 = f.readout('V₁');
  const rV2 = f.readout('V₂');

  const layer = S('g'), dg = S('g');
  svg.append(layer, dg);
  const dotsA = [], dotsB = [];
  for (let i = 0; i < 24; i++) { const c = S('circle', { r: 4, fill: '#3B82F6' }); dotsA.push(c); dg.append(c); }
  for (let i = 0; i < 24; i++) { const c = S('circle', { r: 4, fill: '#3B82F6' }); dotsB.push(c); dg.append(c); }
  let paths = [], speeds = [0, 0], counts = [0, 0];

  const zig = (x, y, label, vert) => {
    const g = S('g');
    const d = vert ? `M${x} ${y - 36} v10 l-12 6 l24 12 l-24 12 l24 12 l-12 6 v10` : `M${x - 40} ${y} h10 l6 -12 l12 24 l12 -24 l12 24 l6 -12 h10`;
    g.append(S('rect', { x: vert ? x - 22 : x - 46, y: vert ? y - 42 : y - 20, width: vert ? 44 : 92, height: vert ? 84 : 40, fill: 'var(--paper)' }), S('path', { d, fill: 'none', stroke: 'var(--ink)', 'stroke-width': 4, 'stroke-linejoin': 'round' }),
      S('text', { x: vert ? x + 30 : x, y: vert ? y + 4 : y - 26, class: 'svglabel', 'text-anchor': vert ? 'start' : 'middle' }, label));
    return g;
  };
  const battery = (x, y) => {
    const g = S('g');
    g.append(S('rect', { x: x - 28, y: y - 36, width: 56, height: 72, fill: 'var(--paper)' }),
      S('line', { x1: x - 24, x2: x + 24, y1: y - 12, y2: y - 12, stroke: 'var(--ink)', 'stroke-width': 4 }), S('line', { x1: x - 12, x2: x + 12, y1: y + 8, y2: y + 8, stroke: 'var(--ink)', 'stroke-width': 8 }),
      S('line', { x1: x, x2: x, y1: y - 36, y2: y - 12, stroke: 'var(--ink)', 'stroke-width': 4 }), S('line', { x1: x, x2: x, y1: y + 8, y2: y + 36, stroke: 'var(--ink)', 'stroke-width': 4 }),
      S('text', { x: x + 34, y: y + 4, class: 'svglabel' }, '10 V'));
    return g;
  };

  const draw = () => {
    layer.replaceChildren();
    const r1 = parseFloat(f.state.r1), r2 = parseFloat(f.state.r2), V = 10;
    let RT, IT, I1, I2, V1, V2;
    if (f.state.mode === 'series') {
      RT = r1 + r2; IT = V / RT; I1 = I2 = IT; V1 = IT * r1; V2 = IT * r2;
      layer.append(S('path', { d: 'M90 290 H600 V70 H90', fill: 'none', stroke: 'var(--ink)', 'stroke-width': 4 }), battery(90, 180), zig(250, 70, 'R₁ = ' + r1 + ' Ω'), zig(450, 70, 'R₂ = ' + r2 + ' Ω'));
      paths = [pathPoint([[90, 216], [90, 290], [600, 290], [600, 70], [90, 70], [90, 144]]), null];
      counts = [24, 0]; speeds = [IT * 480, 0];
    } else {
      RT = (r1 * r2) / (r1 + r2); I1 = V / r1; I2 = V / r2; IT = I1 + I2; V1 = V2 = V;
      layer.append(S('path', { d: 'M90 290 H600 V50 H90', fill: 'none', stroke: 'var(--ink)', 'stroke-width': 4 }), S('path', { d: 'M360 50 V290', stroke: 'var(--ink)', 'stroke-width': 4 }), S('path', { d: 'M480 50 V290', stroke: 'var(--ink)', 'stroke-width': 4 }),
        S('circle', { cx: 360, cy: 50, r: 6, fill: 'var(--ink)' }), S('circle', { cx: 360, cy: 290, r: 6, fill: 'var(--ink)' }), S('circle', { cx: 480, cy: 50, r: 6, fill: 'var(--ink)' }), S('circle', { cx: 480, cy: 290, r: 6, fill: 'var(--ink)' }),
        battery(90, 170), zig(360, 170, 'R₁ = ' + r1 + ' Ω', true), zig(480, 170, 'R₂ = ' + r2 + ' Ω', true));
      // route: branch 1 and branch 2 (battery -> top -> down branch -> bottom -> battery)
      paths = [pathPoint([[90, 206], [90, 290], [360, 290], [360, 50], [90, 50], [90, 134]]), pathPoint([[90, 206], [90, 290], [480, 290], [480, 50], [90, 50], [90, 134]])];
      counts = [12, 12]; speeds = [I1 * 480, I2 * 480];
    }
    dotsA.forEach((d, i) => d.style.display = i < counts[0] ? '' : 'none');
    dotsB.forEach((d, i) => d.style.display = i < counts[1] ? '' : 'none');
    const mA = (x) => (x * 1000).toFixed(1) + ' mA';
    rRT(RT.toFixed(1) + ' Ω'); rIT(mA(IT)); rI1(mA(I1)); rI2(mA(I2)); rV1(V1.toFixed(2) + ' V'); rV2(V2.toFixed(2) + ' V');
  };
  draw();
  f.onChange = draw;
  const ph = [0, 0];
  f.loop((dt) => {
    for (let k = 0; k < 2; k++) {
      if (!paths[k]) continue;
      ph[k] = (ph[k] + dt * speeds[k] / 1000) % 1;
      const arr = k === 0 ? dotsA : dotsB;
      const n = counts[k];
      for (let i = 0; i < n; i++) {
        const p = paths[k]((i / n + ph[k]) % 1);
        arr[i].setAttribute('cx', p[0]); arr[i].setAttribute('cy', p[1]);
      }
    }
  });
  return f.root;
}
