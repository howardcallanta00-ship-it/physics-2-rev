import { S, frame, pathPoint, clamp } from './kit.js';

const MATERIALS = {
  copper: ['Copper', true], aluminum: ['Aluminum', true], brass: ['Brass', true], tin: ['Tin', true],
  wood: ['Wood', false], paper: ['Paper', false], polystyrene: ['Polystyrene (gray)', false], pertinax: ['Pertinax (brown)', false]
};

export default function circuit() {
  const f = frame({ title: 'Build a closed loop and test a material', w: 640, hgt: 330, note: 'Charge only flows if the loop is closed AND every piece in it is a conductor. The bulb is the current indicator.' });
  const { svg } = f;
  f.state.closed = true;
  const swBtn = f.button('Switch: CLOSED', () => { f.state.closed = !f.state.closed; swBtn.lastChild.textContent = 'Switch: ' + (f.state.closed ? 'CLOSED' : 'OPEN'); }, 'bolt');
  f.select('mat', 'Material in the test gap', Object.entries(MATERIALS).map(([k, v]) => [k, v[0]]), 'copper');
  f.select('res', 'Resistor in series', [['0', 'none'], ['47', '47 Ω'], ['100', '100 Ω']], '0');
  const rI = f.readout('Current I');
  const rV = f.readout('Verdict');

  const L = 110, Rr = 540, T = 70, B = 270;
  const wire = S('path', { d: `M${L} ${B} H${Rr} V${T} H${L}`, fill: 'none', stroke: 'var(--ink)', 'stroke-width': 4, 'stroke-linejoin': 'round' });
  const cover = (x, y, w, hh) => S('rect', { x, y, width: w, height: hh, fill: 'var(--paper)' });
  // battery (left)
  const batt = S('g');
  batt.append(cover(L - 30, 128, 60, 84),
    S('line', { x1: L - 26, x2: L + 26, y1: 140, y2: 140, stroke: 'var(--ink)', 'stroke-width': 4 }),
    S('line', { x1: L - 14, x2: L + 14, y1: 160, y2: 160, stroke: 'var(--ink)', 'stroke-width': 8 }),
    S('line', { x1: L - 26, x2: L + 26, y1: 180, y2: 180, stroke: 'var(--ink)', 'stroke-width': 4 }),
    S('line', { x1: L - 14, x2: L + 14, y1: 200, y2: 200, stroke: 'var(--ink)', 'stroke-width': 8 }),
    S('line', { x1: L, x2: L, y1: 128, y2: 140, stroke: 'var(--ink)', 'stroke-width': 4 }), S('line', { x1: L, x2: L, y1: 200, y2: 212, stroke: 'var(--ink)', 'stroke-width': 4 }),
    S('text', { x: L + 40, y: 138, class: 'svglabel' }, '+'), S('text', { x: L + 40, y: 208, class: 'svglabel' }, '−'),
    S('text', { x: L - 90, y: 172, class: 'svglabel' }, '12 V source'));
  // switch (top)
  const sw = S('g');
  const swArm = S('line', { x1: 250, y1: T, x2: 320, y2: T, stroke: 'var(--ink)', 'stroke-width': 5, 'stroke-linecap': 'round' });
  sw.append(cover(240, T - 20, 100, 40), S('circle', { cx: 250, cy: T, r: 5, fill: 'var(--ink)' }), S('circle', { cx: 330, cy: T, r: 5, fill: 'var(--ink)' }), swArm, S('text', { x: 290, y: T - 26, class: 'svglabel', 'text-anchor': 'middle' }, 'Switch'));
  // test gap (bottom)
  const gap = S('g');
  const matBlock = S('rect', { x: 290, y: B - 14, width: 90, height: 28, rx: 4, stroke: 'var(--ink)', 'stroke-width': 3 });
  const matLbl = S('text', { x: 335, y: B + 38, class: 'svglabel', 'text-anchor': 'middle' });
  gap.append(cover(270, B - 18, 130, 36), S('line', { x1: 270, x2: 290, y1: B, y2: B, stroke: 'var(--ink)', 'stroke-width': 4 }), S('line', { x1: 380, x2: 400, y1: B, y2: B, stroke: 'var(--ink)', 'stroke-width': 4 }), matBlock, matLbl);
  // resistor (bottom-left)
  const resG = S('g');
  const resBody = S('path', { fill: 'none', stroke: 'var(--ink)', 'stroke-width': 4 });
  resBody.setAttribute('d', 'M160 270 l10 0 l6 -12 l12 24 l12 -24 l12 24 l6 -12 l10 0');
  const resLbl = S('text', { x: 205, y: B + 38, class: 'svglabel', 'text-anchor': 'middle' });
  resG.append(cover(150, B - 20, 110, 40), resBody, resLbl);
  // bulb (right)
  const bulb = S('g');
  const halo = S('circle', { cx: Rr, cy: 170, r: 52, fill: '#FFD84D', opacity: 0 });
  bulb.append(cover(Rr - 30, 138, 60, 64), halo, S('circle', { cx: Rr, cy: 170, r: 26, fill: 'var(--paper)', stroke: 'var(--ink)', 'stroke-width': 4 }),
    S('path', { d: `M${Rr - 14} 184 L${Rr + 14} 156 M${Rr - 14} 156 L${Rr + 14} 184`, stroke: 'var(--ink)', 'stroke-width': 3 }),
    S('text', { x: Rr - 50, y: 232, class: 'svglabel' }, 'Bulb (12 V, 3 W)'));
  const glow = S('circle', { cx: Rr, cy: 170, r: 24, fill: '#FFD84D', opacity: 0 });
  const dirLbl = S('text', { x: 330, y: 150, class: 'svgtext', 'text-anchor': 'middle', fill: 'var(--muted)' }, 'electron flow ⟲');
  const dots = [];
  const dg = S('g');
  for (let i = 0; i < 26; i++) { const d = S('circle', { r: 4.5, fill: '#3B82F6' }); dots.push(d); dg.append(d); }
  svg.append(wire, batt, sw, gap, resG, bulb, glow, dg, dirLbl);

  // electrons run counter-clockwise starting at the battery minus terminal
  const pp = pathPoint([[L, 212], [L, B], [Rr, B], [Rr, T], [L, T], [L, 128], [L, 212]]);
  let u0 = 0;
  const draw = () => {
    const mat = MATERIALS[f.state.mat];
    const Rres = parseFloat(f.state.res);
    const ok = f.state.closed && mat[1];
    const I = ok ? 12 / (48 + Rres) : 0;
    matBlock.setAttribute('fill', mat[1] ? (f.state.mat === 'copper' ? '#C77B3B' : f.state.mat === 'tin' ? '#D8DCE6' : f.state.mat === 'brass' ? '#C9A227' : '#B8BFCC') : (f.state.mat === 'wood' ? '#B8864B' : f.state.mat === 'paper' ? '#F3EFE2' : f.state.mat === 'pertinax' ? '#8A5A2B' : '#9AA0AE'));
    matLbl.textContent = mat[0];
    swArm.setAttribute('x2', f.state.closed ? 330 : 318); swArm.setAttribute('y2', f.state.closed ? T : T - 34);
    resG.style.display = Rres ? '' : 'none';
    resLbl.textContent = Rres + ' Ω';
    rI(ok ? `${(I * 1000).toFixed(0)} mA` : '0 mA');
    rV(!f.state.closed ? 'open switch: no loop' : mat[1] ? `${mat[0]} = conductor` : `${mat[0]} = insulator`);
    return I;
  };
  let I = draw();
  f.onChange = () => { I = draw(); };
  f.loop((dt) => {
    u0 = (u0 + dt * I * 0.9) % 1;
    const bright = clamp(I / 0.25, 0, 1);
    glow.setAttribute('opacity', bright * 0.95);
    halo.setAttribute('opacity', bright * 0.4);
    dots.forEach((d, i) => {
      const p = pp((i / dots.length + u0) % 1);
      d.setAttribute('cx', p[0]); d.setAttribute('cy', p[1]);
      d.setAttribute('opacity', I > 0 ? 1 : 0.18);
    });
  });
  return f.root;
}
