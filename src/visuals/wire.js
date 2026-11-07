import { S, frame, clamp } from './kit.js';

const MAT = { nichrome: ['Chromium-nickel', 150e-8, 30], constantan: ['Constantan', 49e-8, 14], copper: ['Copper', 1.7e-8, 3] };

export default function wire() {
  const f = frame({ title: 'A wire is a hallway for electrons', w: 680, hgt: 330, note: 'Grey dots are the atoms in the way. Longer hallway: more bumping. Wider hallway: more room. "Cluttered" material: more bumping. All of that is resistance.' });
  const { svg } = f;
  f.slider('L', 'Length L', 0.5, 2.0, 0.1, 1.0, 'm', (v) => v.toFixed(1));
  f.select('d', 'Diameter d', [['0.25', '0.25 mm'], ['0.35', '0.35 mm'], ['0.50', '0.50 mm']], '0.25');
  f.select('mat', 'Material', Object.entries(MAT).map(([k, v]) => [k, `${v[0]} (ρ = ${v[1].toExponential(1)} Ω·m)`]), 'nichrome');
  const rA = f.readout('Area A');
  const rR = f.readout('Resistance R = ρL/A');
  const rI = f.readout('Current at 3 V');

  const hall = S('rect', { fill: 'var(--soft)', stroke: 'var(--ink)', 'stroke-width': 4, rx: 6 });
  const atomsG = S('g');
  const eG = S('g');
  const bar = S('rect', { x: 60, y: 292, height: 14, rx: 7, fill: '#B42318' });
  const barBg = S('rect', { x: 60, y: 292, width: 560, height: 14, rx: 7, fill: 'var(--line)' });
  const barLbl = S('text', { x: 60, y: 284, class: 'svglabel' }, 'Resistance (relative)');
  const lblL = S('text', { class: 'svglabel', 'text-anchor': 'middle' });
  const lblD = S('text', { class: 'svglabel' });
  svg.append(hall, atomsG, eG, barBg, bar, barLbl, lblL, lblD);

  const dots = [];
  for (let i = 0; i < 22; i++) { const c = S('circle', { r: 4.2, fill: '#3B82F6' }); dots.push({ el: c, u: Math.random(), v: Math.random(), jit: Math.random() * 6 }); eG.append(c); }
  let geo = {}, atoms = [];
  const draw = () => {
    const { L, mat } = f.state;
    const dmm = parseFloat(f.state.d);
    const [, rho, nAtoms] = MAT[mat];
    const A = Math.PI * (dmm * 1e-3) ** 2 / 4;
    const R = rho * L / A;
    const wpx = 90 + L * 230;
    const hpx = 30 + 90 * (dmm * dmm) / 0.25 * 0.5 + 18;
    const x = 40 + (600 - wpx) / 2 * 0 + 20, y = 140 - hpx / 2;
    hall.setAttribute('x', x); hall.setAttribute('y', y); hall.setAttribute('width', wpx); hall.setAttribute('height', hpx);
    geo = { x, y, w: wpx, h: hpx, R };
    atomsG.replaceChildren();
    atoms = [];
    const n = Math.round(nAtoms * (wpx / 300) * (hpx / 70));
    for (let i = 0; i < n; i++) {
      const ax = x + 14 + Math.random() * (wpx - 28), ay = y + 12 + Math.random() * (hpx - 24);
      const a = S('circle', { cx: ax, cy: ay, r: 5.5, fill: '#9AA3B8', stroke: 'var(--ink)', 'stroke-width': 1.5, opacity: 0.9 });
      atoms.push(a); atomsG.append(a);
    }
    lblL.setAttribute('x', x + wpx / 2); lblL.setAttribute('y', y - 12); lblL.textContent = `L = ${L.toFixed(1)} m`;
    lblD.setAttribute('x', x + wpx + 12); lblD.setAttribute('y', 144); lblD.textContent = `d = ${dmm.toFixed(2)} mm`;
    const rel = clamp(Math.log10(R + 1) / Math.log10(400), 0.02, 1);
    bar.setAttribute('width', 560 * rel);
    rA(`${(A * 1e6).toFixed(4)} mm²`);
    rR(`${R.toFixed(R < 1 ? 3 : 1)} Ω`);
    rI(`${(3 / R * 1000).toFixed(R < 1 ? 0 : 1)} mA`);
  };
  draw();
  f.onChange = draw;
  f.loop((dt, t) => {
    const speed = clamp(1.6 / (geo.R + 1) * 3, 0.02, 0.8); // fraction of hallway per second
    dots.forEach((d) => {
      d.u += dt * speed;
      if (d.u > 1) { d.u = 0; d.v = Math.random(); }
      const jx = Math.sin(t * 9 + d.jit) * 3, jy = Math.cos(t * 11 + d.jit * 2) * 4;
      d.el.setAttribute('cx', geo.x + 8 + d.u * (geo.w - 16) + jx);
      d.el.setAttribute('cy', geo.y + 8 + d.v * (geo.h - 16) + jy);
    });
  });
  return f.root;
}
