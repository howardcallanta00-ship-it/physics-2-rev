import { S, frame, clamp } from './kit.js';

export default function vdg() {
  const f = frame({ title: 'Van de Graaff generator: charge piles up, like charges push apart', w: 640, hgt: 360, note: 'Turn it on and watch the strips of tissue paper spread. Touch the grounding sphere to the dome and the extra charge drains away.' });
  const { svg } = f;
  f.state.on = false;
  f.state.charge = 0;
  const onBtn = f.button('Turn generator ON', () => { f.state.on = !f.state.on; onBtn.lastChild.textContent = f.state.on ? 'Turn generator OFF' : 'Turn generator ON'; }, 'bolt');
  f.button('Touch dome with grounding sphere', () => { f.state.ground = 1; }, 'reset');
  const rQ = f.readout('Charge on dome');
  const rS = f.readout('Tissue strip angle');

  const cx = 320, domeY = 90, domeR = 62;
  const base = S('rect', { x: cx - 70, y: 300, width: 140, height: 40, rx: 8, fill: 'var(--ink)' });
  const column = S('rect', { x: cx - 24, y: domeY + domeR - 6, width: 48, height: 220, fill: 'var(--soft)', stroke: 'var(--ink)', 'stroke-width': 3 });
  const dome = S('circle', { cx, cy: domeY, r: domeR, fill: '#C9CFDB', stroke: 'var(--ink)', 'stroke-width': 4 });
  const shine = S('path', { d: `M${cx - 40} ${domeY - 20} q10 -26 38 -34`, fill: 'none', stroke: '#fff', 'stroke-width': 6, 'stroke-linecap': 'round', opacity: 0.8 });
  // belt dots
  const belt = S('g');
  const beltDots = [];
  for (let i = 0; i < 9; i++) { const d = S('circle', { r: 5, fill: '#F2A33A', stroke: 'var(--ink)', 'stroke-width': 1.5 }); beltDots.push(d); belt.append(d); }
  const pluses = S('g', { 'font-family': 'JetBrains Mono, monospace', 'font-weight': '700', 'font-size': 18, fill: '#B42318', 'text-anchor': 'middle' });
  const plusEls = [];
  for (let i = 0; i < 14; i++) { const t = S('text', {}, '+'); plusEls.push({ el: t, a: (i / 14) * Math.PI * 2, r: domeR - 14 + (i % 2) * 0 }); pluses.append(t); }
  // tissue strips
  const strips = [];
  const sg = S('g');
  for (let i = 0; i < 5; i++) {
    const p = S('path', { fill: 'none', stroke: '#F472B6', 'stroke-width': 5, 'stroke-linecap': 'round' });
    strips.push(p); sg.append(p);
  }
  const sphere = S('g', { opacity: 0 });
  sphere.append(S('circle', { cx: 0, cy: 0, r: 20, fill: '#9AA3B8', stroke: 'var(--ink)', 'stroke-width': 3 }), S('line', { x1: 20, y1: 12, x2: 90, y2: 52, stroke: 'var(--ink)', 'stroke-width': 4 }));
  const spark = S('path', { d: 'M0 0 l10 -8 -4 10 12 -4 -8 12', fill: 'none', stroke: '#F2A33A', 'stroke-width': 4, opacity: 0 });
  const confetti = [];
  const cg = S('g');
  for (let i = 0; i < 8; i++) { const c = S('rect', { width: 9, height: 5, fill: '#C9CFDB', stroke: 'var(--ink)', 'stroke-width': 1.2 }); confetti.push({ el: c, x: 120 + i * 11, y: 328, vx: 0, vy: 0, fly: false }); cg.append(c); }
  const plate = S('rect', { x: 100, y: 332, width: 110, height: 8, rx: 3, fill: 'var(--soft)', stroke: 'var(--ink)', 'stroke-width': 2 });
  const plateLbl = S('text', { x: 155, y: 354, class: 'svgtext', 'text-anchor': 'middle', fill: 'var(--muted)' }, 'foil confetti on plate');
  svg.append(base, column, belt, dome, shine, pluses, sg, plate, plateLbl, cg, sphere, spark);

  const beltPath = (u) => [cx - 14 + (u < 0.5 ? 0 : 28), 0].slice(0, 1);
  f.loop((dt, t) => {
    const s = f.state;
    if (s.on) s.charge = clamp(s.charge + dt * 0.28, 0, 1);
    if (s.ground) { s.charge = clamp(s.charge - dt * 2.2, 0, 1); sphere.setAttribute('opacity', 1); if (s.charge <= 0) { s.ground = 0; } }
    else sphere.setAttribute('opacity', 0);
    sphere.setAttribute('transform', `translate(${cx + 90},${domeY + 40}) `);
    const q = s.charge;
    // belt: up on right, down on left
    beltDots.forEach((d, i) => {
      const u = ((i / beltDots.length) + (s.on ? t * 0.35 : 0)) % 1;
      const top = domeY + domeR - 10, bot = 296;
      let x, y;
      if (u < 0.5) { x = cx + 14; y = bot - (u / 0.5) * (bot - top); } else { x = cx - 14; y = top + ((u - 0.5) / 0.5) * (bot - top); }
      d.setAttribute('cx', x); d.setAttribute('cy', y);
    });
    plusEls.forEach((p, i) => {
      const a = p.a + t * 0.2 * (s.on ? 1 : 0);
      p.el.setAttribute('x', cx + Math.cos(a) * p.r);
      p.el.setAttribute('y', domeY + Math.sin(a) * p.r + 6);
      p.el.setAttribute('opacity', clamp(q * 1.2 - (i / plusEls.length) * 0.4, 0, 1));
    });
    // strips: splay angle grows with charge
    const maxA = 62;
    strips.forEach((st, i) => {
      const spread = (i - 2) * (q * 24);
      const ang = spread + Math.sin(t * 5 + i) * q * 3;
      const sx = cx + (i - 2) * 6, sy = domeY - domeR + 6 + Math.abs(i - 2) * 4;
      const rad = (ang * Math.PI) / 180;
      const len = 78;
      const ex = sx + Math.sin(rad) * len, ey = sy - Math.cos(rad) * len * (1 - q * 0.0) * -1;
      // strips hang from top of dome and point upward when charged, drooping when neutral
      const droop = 1 - q;
      const ex2 = sx + Math.sin(rad) * len * (0.5 + q * 0.5), ey2 = sy - Math.cos(rad * 0.9) * len * (q - droop * 0.9) ;
      st.setAttribute('d', `M${sx} ${sy} Q${(sx + ex2) / 2 + (i - 2) * 3} ${(sy + ey2) / 2 - 6} ${ex2} ${ey2}`);
    });
    // spark when grounding
    spark.setAttribute('opacity', s.ground && Math.sin(t * 40) > 0 ? 1 : 0);
    spark.setAttribute('transform', `translate(${cx + 68},${domeY + 34})`);
    // confetti: leaps toward dome when charged
    confetti.forEach((c, i) => {
      if (q > 0.55 + i * 0.03 && !c.fly) { c.fly = true; c.vx = (i - 3.5) * 14; c.vy = -(120 + i * 8); }
      if (c.fly) {
        c.vy += 260 * dt; c.x += c.vx * dt; c.y += c.vy * dt;
        if (c.y > 330) { c.y = 330; c.vy = 0; c.vx = 0; if (q < 0.2) c.fly = false; }
      } else { c.x = 120 + i * 11; c.y = 329; }
      c.el.setAttribute('x', c.x); c.el.setAttribute('y', c.y); c.el.setAttribute('transform', c.fly ? `rotate(${(t * 200 + i * 40) % 360} ${c.x + 4} ${c.y + 2})` : '');
    });
    rQ(`${Math.round(q * 100)} %`);
    rS(`${Math.round(q * 62)}°`);
  });
  return f.root;
}
