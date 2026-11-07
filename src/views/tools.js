import { h, M, R, fmt } from '../lib/dom.js';
import { pageHead, parseNum } from './common.js';

const field = (label, input) => h('label', { class: 'field' }, label, input);
const num = (ph, val) => h('input', { type: 'text', inputmode: 'decimal', placeholder: ph, value: val ?? '' });
const result = () => h('div', { class: 'result' });

function pctTool() {
  const a = num('measured / first value'), b = num('accepted / second value');
  const mode = h('select', null, h('option', { value: 'err' }, 'Percent error (compare to a known value)'), h('option', { value: 'diff' }, 'Percent difference (two measured values)'));
  const out = result();
  const go = () => {
    const x = parseNum(a.value), y = parseNum(b.value);
    if (isNaN(x) || isNaN(y)) return out.replaceChildren(h('span', { class: 'muted' }, 'Enter both values.'));
    const v = mode.value === 'err' ? Math.abs(x - y) / Math.abs(y) * 100 : Math.abs(x - y) / ((x + y) / 2) * 100;
    out.replaceChildren(h('span', { class: 'muted' }, mode.value === 'err' ? 'Percent error' : 'Percent difference'), h('div', { class: 'big' }, fmt(v) + ' %'),
      M(mode.value === 'err' ? '\\frac{|x-x_{0}|}{x_{0}}\\times100' : '\\frac{|x_1-x_2|}{\\tfrac12(x_1+x_2)}\\times100', true));
  };
  [a, b, mode].forEach((e) => e.addEventListener('input', go));
  return h('div', { class: 'card stack' }, h('h2', null, 'Percent error / difference'), field('Mode', mode), field('Value 1', a), field('Value 2', b), out);
}

function netTool() {
  const list = h('input', { type: 'text', placeholder: '100, 47, 100', value: '100, 47, 100' });
  const V = num('10', '10');
  const out = result();
  const go = () => {
    const rs = list.value.split(/[,\s]+/).map(parseNum).filter((x) => !isNaN(x) && x > 0);
    const v = parseNum(V.value);
    if (!rs.length) return out.replaceChildren(h('span', { class: 'muted' }, 'Enter resistances separated by commas.'));
    const rs_ = rs.reduce((s, x) => s + x, 0);
    const rp = 1 / rs.reduce((s, x) => s + 1 / x, 0);
    const rows = [['Series R', rs_, 'Ω'], ['Parallel R', rp, 'Ω']];
    if (!isNaN(v)) rows.push(['Series current', v / rs_ * 1000, 'mA'], ['Parallel total current', v / rp * 1000, 'mA']);
    out.replaceChildren(...rows.map(([n, x, u]) => h('div', null, h('span', { class: 'muted' }, n + ': '), h('b', { class: 'mono' }, `${fmt(x)} ${u}`))));
  };
  [list, V].forEach((e) => e.addEventListener('input', go)); go();
  return h('div', { class: 'card stack' }, h('h2', null, 'Resistor network'), field('Resistances (Ω)', list), field('Supply voltage (V)', V), out);
}

function rcTool() {
  const R_ = num('ohms', '47000'), C = num('farads, e.g. 1e-3', '1e-3'), V0 = num('volts', '9'), t = num('seconds', '47');
  const out = result();
  const go = () => {
    const r = parseNum(R_.value), c = parseNum(C.value), v = parseNum(V0.value), tt = parseNum(t.value);
    if ([r, c].some(isNaN)) return out.replaceChildren(h('span', { class: 'muted' }, 'Enter R and C.'));
    const tau = r * c;
    const rows = [['Time constant τ = RC', tau, 's']];
    if (!isNaN(v) && !isNaN(tt)) rows.push(['Charging V(t)', v * (1 - Math.exp(-tt / tau)), 'V'], ['Discharging V(t)', v * Math.exp(-tt / tau), 'V']);
    out.replaceChildren(...rows.map(([n, x, u]) => h('div', null, h('span', { class: 'muted' }, n + ': '), h('b', { class: 'mono' }, `${fmt(x)} ${u}`))),
      M('V_c=V_0\\left(1-e^{-t/RC}\\right)', true));
  };
  [R_, C, V0, t].forEach((e) => e.addEventListener('input', go)); go();
  return h('div', { class: 'card stack' }, h('h2', null, 'RC capacitor'), field('R (Ω)', R_), field('C (F)', C), field('Source V₀ (V)', V0), field('Time t (s)', t), out);
}

function regTool() {
  const ta = h('textarea', { rows: 6, placeholder: 'x, y per line\n0.5, 2.1\n1.0, 4.0', style: { fontFamily: 'var(--f-mono)', border: '1.5px solid var(--line-strong)', borderRadius: '10px', padding: '10px', background: 'var(--paper)', color: 'inherit', fontSize: '15px' } });
  ta.value = '0.5, 2.1\n1.0, 4.0\n1.5, 6.2\n2.0, 7.9';
  const out = result();
  const go = () => {
    const pts = ta.value.split('\n').map((l) => l.split(/[,\s]+/).map(parseNum)).filter((p) => p.length >= 2 && !isNaN(p[0]) && !isNaN(p[1]));
    if (pts.length < 2) return out.replaceChildren(h('span', { class: 'muted' }, 'Need at least two (x, y) pairs.'));
    const n = pts.length, sx = pts.reduce((s, p) => s + p[0], 0), sy = pts.reduce((s, p) => s + p[1], 0);
    const sxx = pts.reduce((s, p) => s + p[0] * p[0], 0), sxy = pts.reduce((s, p) => s + p[0] * p[1], 0), syy = pts.reduce((s, p) => s + p[1] * p[1], 0);
    const d = n * sxx - sx * sx;
    if (!d) return out.replaceChildren(h('span', { class: 'muted' }, 'x values are all equal.'));
    const m = (n * sxy - sx * sy) / d, b = (sy - m * sx) / n;
    const r2 = Math.pow(n * sxy - sx * sy, 2) / (d * (n * syy - sy * sy) || 1);
    out.replaceChildren(h('div', null, h('span', { class: 'muted' }, 'Slope m: '), h('b', { class: 'mono' }, fmt(m))), h('div', null, h('span', { class: 'muted' }, 'Intercept b: '), h('b', { class: 'mono' }, fmt(b))),
      h('div', null, h('span', { class: 'muted' }, 'R²: '), h('b', { class: 'mono' }, fmt(r2, 4))), h('div', { class: 'muted' }, R('For Ohm’s law, $V$ vs $I$ gives slope = $R$. For wire resistance, $R$ vs $L$ gives slope = $\\rho/A$.')));
  };
  ta.addEventListener('input', go); go();
  return h('div', { class: 'card stack' }, h('h2', null, 'Line of best fit'), field('Data (x, y)', ta), out);
}

export function toolsView() {
  return h('div', null, pageHead('Lab tools', 'Calculators for your lab reports', 'Percent error, resistor networks, RC circuits and linear regression.'), h('div', { class: 'tools' }, pctTool(), netTool(), rcTool(), regTool()));
}
