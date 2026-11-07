import { h, R, icon } from '../lib/dom.js';

const NS = 'http://www.w3.org/2000/svg';
const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** SVG element helper. Values containing var(...) go through style so they work everywhere. */
export function S(tag, attrs, ...kids) {
  const el = document.createElementNS(NS, tag);
  let style = '';
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null) continue;
    if (typeof v === 'string' && v.includes('var(') && (k === 'fill' || k === 'stroke' || k === 'color')) style += `${k}:${v};`;
    else el.setAttribute(k, v);
  }
  if (style) el.setAttribute('style', style);
  for (const c of kids.flat(Infinity)) {
    if (c == null) continue;
    el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return el;
}

export const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, t) => a + (b - a) * t;

let uid = 0;

/**
 * Create a visual card. Returns an API for controls, readouts and the animation loop.
 */
export function frame({ title, badge = 'Interactive', w = 640, hgt = 320, note }) {
  const stage = h('div', { class: 'viz-stage' });
  const svg = S('svg', { viewBox: `0 0 ${w} ${hgt}`, role: 'img', 'aria-label': title, preserveAspectRatio: 'xMidYMid meet' });
  stage.append(svg);
  const controls = h('div', { class: 'viz-controls' });
  const readouts = h('div', { class: 'readouts' });
  const root = h('figure', { class: 'viz', style: { margin: 0 } },
    h('header', null, icon('bolt', 18), h('b', null, title), h('span', { class: 'pill' }, badge)),
    stage, controls, readouts, note ? h('div', { class: 'viz-note' }, R(note)) : null);
  readouts.style.display = 'none';

  const api = {
    root, svg, w, h: hgt, state: {}, _tick: null, _raf: 0, _seen: false, _last: 0, _paused: false,
    slider(key, label, min, max, step, value, unit = '', fmtFn) {
      const id = 'c' + uid++;
      const out = h('output', { for: id });
      const input = h('input', { type: 'range', id, min, max, step, value });
      const update = () => {
        api.state[key] = parseFloat(input.value);
        out.textContent = (fmtFn ? fmtFn(api.state[key]) : api.state[key]) + (unit ? ' ' + unit : '');
        api.onChange && api.onChange(key);
      };
      input.addEventListener('input', update);
      api.state[key] = parseFloat(value);
      out.textContent = (fmtFn ? fmtFn(value) : value) + (unit ? ' ' + unit : '');
      controls.append(h('div', { class: 'ctl' }, h('label', { for: id }, label, out), input));
      return { set(v) { input.value = v; update(); } };
    },
    seg(key, label, options, initial) {
      const btns = options.map(([val, text]) => {
        const b = h('button', { type: 'button', 'aria-pressed': String(val === initial) }, text);
        b.addEventListener('click', () => {
          api.state[key] = val;
          btns.forEach((x, i) => x.setAttribute('aria-pressed', String(options[i][0] === val)));
          api.onChange && api.onChange(key);
        });
        return b;
      });
      api.state[key] = initial;
      controls.append(h('div', { class: 'ctl' }, h('label', null, label), h('div', { class: 'seg', role: 'group', 'aria-label': label }, btns)));
    },
    select(key, label, options, initial) {
      const id = 'c' + uid++;
      const sel = h('select', { id }, options.map(([v, t]) => h('option', { value: v, selected: v === initial }, t)));
      sel.addEventListener('change', () => { api.state[key] = sel.value; api.onChange && api.onChange(key); });
      api.state[key] = initial;
      controls.append(h('div', { class: 'ctl' }, h('label', { for: id }, label), sel));
    },
    button(label, onClick, ico) {
      const b = h('button', { type: 'button', class: 'btn small ghost' }, ico ? icon(ico, 16) : null, label);
      b.addEventListener('click', () => onClick(b));
      controls.append(h('div', { class: 'ctl' }, b));
      return b;
    },
    readout(label) {
      readouts.style.display = '';
      const b = h('b', null, '–');
      readouts.append(h('div', { class: 'ro' }, h('span', null, label), b));
      return (txt) => { b.textContent = txt; };
    },
    /** Start an animation loop. fn(dt, t) with dt in seconds. Stops itself once removed from the DOM. */
    loop(fn) {
      api._tick = fn;
      const step = (ts) => {
        if (api.root.isConnected) api._seen = true;
        else if (api._seen) return; // removed: stop
        if (!api._last) api._last = ts;
        const dt = Math.min(0.05, (ts - api._last) / 1000);
        api._last = ts;
        if (!api._paused) fn(reduceMotion() ? 0 : dt, ts / 1000);
        api._raf = requestAnimationFrame(step);
      };
      api._raf = requestAnimationFrame(step);
    }
  };
  return api;
}

/** Seeded-free random helpers */
export const rnd = (a, b) => a + Math.random() * (b - a);

/** Circuit symbols as SVG groups, drawn horizontally centered at (x,y), width ~60 */
export function resistorPath(x, y, w = 60, amp = 8) {
  const n = 6, seg = w / n;
  let d = `M${x - w / 2} ${y}`;
  d += ` l${seg / 2} 0`;
  for (let i = 0; i < n - 1; i++) d += ` l${seg / 2} ${i % 2 ? amp : -amp} l${seg / 2} ${i % 2 ? -amp : amp}`;
  d = `M${x - w / 2} ${y} l6 0`;
  const pts = [];
  const inner = w - 12;
  const k = 6;
  for (let i = 0; i <= k; i++) pts.push([x - w / 2 + 6 + (inner * i) / k, y + (i === 0 || i === k ? 0 : i % 2 ? -amp : amp)]);
  d = `M${x - w / 2} ${y} ` + pts.map((p) => `L${p[0]} ${p[1]}`).join(' ') + ` L${x + w / 2} ${y}`;
  return d;
}

/** Points along a polyline path for moving "charges". pts: array of [x,y]; returns fn(u in 0..1) -> [x,y] */
export function pathPoint(pts) {
  const lens = [];
  let total = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const l = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
    lens.push(l);
    total += l;
  }
  return (u) => {
    let d = ((u % 1) + 1) % 1 * total;
    for (let i = 0; i < lens.length; i++) {
      if (d <= lens[i]) {
        const t = lens[i] ? d / lens[i] : 0;
        return [lerp(pts[i][0], pts[i + 1][0], t), lerp(pts[i][1], pts[i + 1][1], t)];
      }
      d -= lens[i];
    }
    return pts[pts.length - 1];
  };
}
