import { S, frame, clamp } from './kit.js';

const FLUIDS = { water: ['Water', 1000, '#60A5FA'], alcohol: ['Ethyl alcohol', 789, '#A5B4FC'], brine: ['Brine', 1030, '#2DD4BF'] };
const V_BLOCK = 40;        // mL
const RHO_BLOCK = 2500;    // kg/m^3
const G = 9.8;

export default function buoyancy() {
  const f = frame({ title: 'Lower the block into the fluid', w: 640, hgt: 340, note: 'The weight arrow never changes. The buoyant arrow grows as more fluid is pushed aside. The spring balance reads the difference.' });
  const { svg } = f;
  f.slider('sub', 'How far is the block lowered?', 0, 100, 1, 0, '% submerged');
  f.select('fluid', 'Fluid', Object.entries(FLUIDS).map(([k, v]) => [k, `${v[0]} (${v[1]} kg/m³)`]), 'water');
  const rVd = f.readout('Fluid displaced V_fd');
  const rB = f.readout('Buoyant force B');
  const rW = f.readout('Weight in air W₁');
  const rA = f.readout('Balance reading W₂');

  const waterY0 = 215, tankL = 330, tankR = 590, tankB = 318;
  const defs = S('defs', null, S('clipPath', { id: 'tankclip' }, S('rect', { x: tankL, y: 100, width: tankR - tankL, height: tankB - 100 })));
  const fluid = S('path', { fill: '#60A5FA', opacity: '0.55' });
  const tank = S('path', { d: `M${tankL} 100 V${tankB} H${tankR} V100`, fill: 'none', stroke: 'var(--ink)', 'stroke-width': 4, 'stroke-linejoin': 'round' });
  const string = S('line', { stroke: 'var(--ink)', 'stroke-width': 2 });
  const block = S('rect', { width: 56, height: 64, rx: 6, fill: '#8B93A7', stroke: 'var(--ink)', 'stroke-width': 3 });
  const blockLbl = S('text', { class: 'svglabel', 'text-anchor': 'middle', fill: '#fff' }, '40 mL');
  const spring = S('path', { fill: 'none', stroke: 'var(--ink)', 'stroke-width': 3 });
  const balance = S('rect', { x: 442, y: 10, width: 36, height: 78, rx: 8, fill: 'var(--paper)', stroke: 'var(--ink)', 'stroke-width': 3 });
  const needle = S('rect', { x: 444, y: 30, width: 32, height: 4, fill: '#B42318' });
  const aW = S('line', { stroke: '#B42318', 'stroke-width': 5, 'marker-end': 'url(#arrR)' });
  const aB = S('line', { stroke: '#0F766E', 'stroke-width': 5, 'marker-end': 'url(#arrG)' });
  const tW = S('text', { class: 'svglabel', fill: '#B42318' }, 'W');
  const tB = S('text', { class: 'svglabel', fill: '#0F766E' }, 'B');
  const mk = (id, c) => S('marker', { id, viewBox: '0 0 10 10', refX: 6, refY: 5, markerWidth: 5, markerHeight: 5, orient: 'auto-start-reverse' }, S('path', { d: 'M0 0 10 5 0 10z', fill: c }));
  defs.append(mk('arrR', '#B42318'), mk('arrG', '#0F766E'));

  // graduated cylinder (displacement method)
  const cylX = 70, cylT = 50, cylB = 312, cylW = 74;
  const cylFill = S('rect', { x: cylX + 3, width: cylW - 6, fill: '#60A5FA', opacity: '0.55' });
  const cyl = S('path', { d: `M${cylX} ${cylT} V${cylB} H${cylX + cylW} V${cylT}`, fill: 'none', stroke: 'var(--ink)', 'stroke-width': 4, 'stroke-linejoin': 'round' });
  const ticks = S('g', { stroke: 'var(--ink)', 'stroke-width': 2 });
  for (let ml = 0; ml <= 100; ml += 10) {
    const y = cylB - (ml / 100) * (cylB - cylT - 6);
    ticks.append(S('line', { x1: cylX, x2: cylX + (ml % 20 === 0 ? 18 : 10), y1: y, y2: y }));
    if (ml % 20 === 0) ticks.append(S('text', { x: cylX + 22, y: y + 4, class: 'svgtext', stroke: 'none' }, ml));
  }
  const cylNote = S('text', { x: cylX + cylW / 2, y: 30, class: 'svglabel', 'text-anchor': 'middle' }, 'Graduated cylinder');
  const cylRead = S('text', { x: cylX + cylW / 2, y: 336, class: 'svgtext', 'text-anchor': 'middle' });

  svg.append(defs, cylFill, cyl, ticks, cylNote, cylRead, balance, needle, spring, string, S('g', { 'clip-path': 'url(#tankclip)' }, fluid), tank, block, blockLbl, aW, aB, tW, tB);

  let phase = 0;
  const draw = () => {
    const [, rho, col] = FLUIDS[f.state.fluid];
    const sub = f.state.sub / 100;
    const vfd = V_BLOCK * sub;                       // mL
    const B = rho * G * vfd * 1e-6;
    const W1 = RHO_BLOCK * G * V_BLOCK * 1e-6;
    const W2 = W1 - B;
    const rise = (sub * 56 * 64) / (tankR - tankL);
    const surfY = waterY0 - rise;
    const bottom = surfY + sub * 64 + (sub === 0 ? 0 : 0);
    const top = bottom - 64 - (sub === 0 ? 0 : 0);
    const bx = 460 - 28;
    block.setAttribute('x', bx); block.setAttribute('y', top);
    blockLbl.setAttribute('x', 460); blockLbl.setAttribute('y', top + 38);
    string.setAttribute('x1', 460); string.setAttribute('x2', 460); string.setAttribute('y1', 88); string.setAttribute('y2', top);
    fluid.setAttribute('fill', col);
    // spring stretch
    const reading = clamp(W2 / 1.1, 0, 1);
    const sTop = 88, sLen = 22 + reading * 20;
    let d = `M460 ${sTop - 0} `;
    d = `M460 ${sTop - sLen - 10} v8`;
    for (let i = 0; i < 6; i++) d += ` l${i % 2 ? -8 : 8} ${sLen / 6}`;
    d += ` L460 ${sTop}`;
    spring.setAttribute('d', d);
    needle.setAttribute('y', 18 + reading * 56);
    // arrows
    const cx = 460, cy = top + 32;
    const lenW = W1 * 60, lenB = B * 60;
    aW.setAttribute('x1', cx + 38); aW.setAttribute('x2', cx + 38); aW.setAttribute('y1', cy); aW.setAttribute('y2', cy + lenW);
    tW.setAttribute('x', cx + 48); tW.setAttribute('y', cy + lenW / 2 + 4);
    if (B > 0.004) {
      aB.setAttribute('x1', cx - 38); aB.setAttribute('x2', cx - 38); aB.setAttribute('y1', cy); aB.setAttribute('y2', cy - lenB);
      aB.style.display = ''; tB.style.display = '';
      tB.setAttribute('x', cx - 60); tB.setAttribute('y', cy - lenB / 2 + 4);
    } else { aB.style.display = 'none'; tB.style.display = 'none'; }
    // graduated cylinder level: starts at 60 mL
    const level = 60 + vfd;
    const ly = cylB - (level / 100) * (cylB - cylT - 6);
    cylFill.setAttribute('y', ly); cylFill.setAttribute('height', cylB - ly); cylFill.setAttribute('fill', col);
    cylRead.textContent = `reads ${level.toFixed(1)} mL`;
    rVd(`${vfd.toFixed(1)} mL`);
    rB(`${B.toFixed(3)} N`);
    rW(`${W1.toFixed(3)} N`);
    rA(`${W2.toFixed(3)} N`);
    return surfY;
  };
  let surfY = draw();
  f.onChange = () => { surfY = draw(); };
  f.loop((dt, t) => {
    phase = t;
    let p = `M${tankL} ${surfY} `;
    for (let x = tankL; x <= tankR; x += 10) p += `L${x} ${surfY + Math.sin(x / 18 + phase * 2) * 2.2} `;
    p += `L${tankR} ${tankB} L${tankL} ${tankB} Z`;
    fluid.setAttribute('d', p);
  });
  return f.root;
}
