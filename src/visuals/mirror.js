import { S, frame, lerp } from './kit.js';

export default function mirror() {
  const f = frame({ title: 'Plane mirror: the image is as far behind as the object is in front', w: 720, hgt: 330, note: 'Your eye sees light that bounced off the mirror, but your brain traces it straight back, so the image seems to sit behind the mirror.' });
  const { svg } = f;
  f.slider('p', 'Object distance p', 4, 14, 0.5, 10, 'cm', (v) => v.toFixed(1));
  f.slider('eye', 'Eye height', 20, 140, 1, 80, 'px');
  const rQ = f.readout('Image distance q');
  const rTi = f.readout('Angle of incidence θᵢ');
  const rTr = f.readout('Angle of reflection θᵣ');
  const rPct = f.readout('% difference of angles');

  const mx = 360, axis = 250, k = 18; // px per cm
  const bg = S('g');
  bg.append(S('rect', { x: mx, y: 20, width: 340, height: 280, fill: 'var(--soft)', opacity: 0.6 }), S('text', { x: mx + 170, y: 44, class: 'svglabel', 'text-anchor': 'middle', fill: 'var(--muted)' }, 'behind the mirror (virtual image)'));
  const mir = S('line', { x1: mx, x2: mx, y1: 20, y2: 300, stroke: 'var(--ink)', 'stroke-width': 6 });
  const hatch = S('g', { stroke: 'var(--ink)', 'stroke-width': 2 });
  for (let y = 24; y < 300; y += 14) hatch.append(S('line', { x1: mx, y1: y, x2: mx + 12, y2: y + 12 }));
  const floor = S('line', { x1: 20, x2: 700, y1: axis, y2: axis, stroke: 'var(--line-strong)', 'stroke-width': 2 });
  const obj = S('g'), img = S('g', { opacity: 0.55 });
  const arrow = (g, col) => { g.append(S('line', { stroke: col, 'stroke-width': 6, 'stroke-linecap': 'round', class: 'ln' }), S('path', { fill: col, class: 'hd' })); };
  arrow(obj, '#B42318'); arrow(img, '#B42318');
  const dashes = S('line', { stroke: 'var(--muted)', 'stroke-width': 2, 'stroke-dasharray': '6 5' });
  const normal = S('line', { stroke: 'var(--muted)', 'stroke-width': 2, 'stroke-dasharray': '4 4' });
  const rayIn = S('line', { stroke: '#F2A33A', 'stroke-width': 4 }), rayOut = S('line', { stroke: '#F2A33A', 'stroke-width': 4 }), virt = S('line', { stroke: '#F2A33A', 'stroke-width': 3, 'stroke-dasharray': '7 6', opacity: 0.8 });
  const eye = S('g');
  eye.append(S('ellipse', { rx: 18, ry: 11, fill: 'var(--paper)', stroke: 'var(--ink)', 'stroke-width': 3 }), S('circle', { r: 5, cx: 4, fill: 'var(--ink)' }));
  const pLbl = S('text', { class: 'svgtext', 'text-anchor': 'middle' }), qLbl = S('text', { class: 'svgtext', 'text-anchor': 'middle' });
  const pDim = S('line', { stroke: 'var(--ink)', 'stroke-width': 2 }), qDim = S('line', { stroke: 'var(--ink)', 'stroke-width': 2 });
  const photon = S('circle', { r: 6, fill: '#fff', stroke: '#F2A33A', 'stroke-width': 3 });
  svg.append(bg, floor, mir, hatch, dashes, normal, virt, rayIn, rayOut, obj, img, eye, pDim, qDim, pLbl, qLbl, photon);

  let seg = null;
  const setArrow = (g, x, h) => {
    g.querySelector('.ln').setAttribute('x1', x); g.querySelector('.ln').setAttribute('x2', x); g.querySelector('.ln').setAttribute('y1', axis); g.querySelector('.ln').setAttribute('y2', axis - h + 8);
    g.querySelector('.hd').setAttribute('d', `M${x - 11} ${axis - h + 14} L${x} ${axis - h - 6} L${x + 11} ${axis - h + 14} Z`);
  };
  const draw = () => {
    const p = f.state.p, hgt = 70;
    const ox = mx - p * k, ix = mx + p * k;
    const eyeX = 60, eyeY = axis - f.state.eye;
    setArrow(obj, ox, hgt); setArrow(img, ix, hgt);
    const tipY = axis - hgt - 4;
    // reflection point: line from eye to image tip crosses the mirror
    const t = (mx - eyeX) / (ix - eyeX);
    const py = eyeY + (tipY - eyeY) * t;
    rayIn.setAttribute('x1', ox); rayIn.setAttribute('y1', tipY); rayIn.setAttribute('x2', mx); rayIn.setAttribute('y2', py);
    rayOut.setAttribute('x1', mx); rayOut.setAttribute('y1', py); rayOut.setAttribute('x2', eyeX + 16); rayOut.setAttribute('y2', eyeY);
    virt.setAttribute('x1', mx); virt.setAttribute('y1', py); virt.setAttribute('x2', ix); virt.setAttribute('y2', tipY);
    normal.setAttribute('x1', mx - 90); normal.setAttribute('x2', mx + 90); normal.setAttribute('y1', py); normal.setAttribute('y2', py);
    eye.setAttribute('transform', `translate(${eyeX},${eyeY})`);
    dashes.setAttribute('x1', ox); dashes.setAttribute('x2', ix); dashes.setAttribute('y1', axis + 24); dashes.setAttribute('y2', axis + 24);
    pDim.setAttribute('x1', ox); pDim.setAttribute('x2', mx); pDim.setAttribute('y1', axis + 20); pDim.setAttribute('y2', axis + 20);
    qDim.setAttribute('x1', mx); qDim.setAttribute('x2', ix); qDim.setAttribute('y1', axis + 20); qDim.setAttribute('y2', axis + 20);
    dashes.setAttribute('opacity', 0);
    pLbl.setAttribute('x', (ox + mx) / 2); pLbl.setAttribute('y', axis + 40); pLbl.textContent = `p = ${p.toFixed(1)} cm`;
    qLbl.setAttribute('x', (ix + mx) / 2); qLbl.setAttribute('y', axis + 40); qLbl.textContent = `q = ${p.toFixed(1)} cm`;
    const thi = Math.atan2(Math.abs(tipY - py), mx - ox) * 180 / Math.PI;
    const thr = Math.atan2(Math.abs(eyeY - py), mx - (eyeX + 16)) * 180 / Math.PI;
    rQ(`${p.toFixed(1)} cm`); rTi(thi.toFixed(1) + '°'); rTr(thr.toFixed(1) + '°');
    rPct((Math.abs(thi - thr) / ((thi + thr) / 2) * 100).toFixed(2) + ' %');
    seg = { a: [ox, tipY], b: [mx, py], c: [eyeX + 16, eyeY] };
  };
  draw();
  f.onChange = draw;
  let u = 0;
  f.loop((dt) => {
    u = (u + dt * 0.45) % 1;
    const { a, b, c } = seg;
    const d1 = Math.hypot(b[0] - a[0], b[1] - a[1]), d2 = Math.hypot(c[0] - b[0], c[1] - b[1]);
    const d = u * (d1 + d2);
    let x, y;
    if (d < d1) { x = lerp(a[0], b[0], d / d1); y = lerp(a[1], b[1], d / d1); }
    else { const tt = (d - d1) / d2; x = lerp(b[0], c[0], tt); y = lerp(b[1], c[1], tt); }
    photon.setAttribute('cx', x); photon.setAttribute('cy', y);
  });
  return f.root;
}
