import { h, R, icon } from '../lib/dom.js';

export const pageHead = (eyebrow, title, lead) =>
  h('header', { class: 'page-head' }, eyebrow && h('div', { class: 'eyebrow' }, eyebrow), h('h1', { class: 'page-title' }, title), lead && h('p', { class: 'lead' }, lead));

export function toast(msg) {
  const t = h('div', { class: 'toast', role: 'status' }, msg);
  document.body.append(t);
  setTimeout(() => t.remove(), 1800);
}

/** Parse "1.2e-5", "1.2x10^-5", "1.2 × 10^-5", "1,200", "12 mA". */
export function parseNum(s) {
  if (s == null) return NaN;
  let t = String(s).trim().replace(/,/g, '').replace(/[−–]/g, '-').replace(/\s+/g, '');
  t = t.replace(/(×|x|\*)10\^?\(?(-?\d+)\)?/i, 'e$2');
  const m = t.match(/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/i);
  return m ? parseFloat(m[0]) : NaN;
}

const L = ['A', 'B', 'C', 'D'];
/** Multiple-choice option list. onPick(index) fires once. Returns {el, reveal(correct, picked)}. */
export function optionList(opts, onPick) {
  let locked = false;
  const btns = opts.map((o, i) =>
    h('button', { class: 'opt', type: 'button', onclick: () => { if (locked) return; locked = true; onPick(i); } },
      h('span', { class: 'l' }, L[i]), R(o)));
  const el = h('div', { class: 'opts', role: 'group' }, btns);
  return {
    el, btns,
    pick: (i) => btns[i] && btns[i].click(),
    reveal(correct, picked) {
      btns.forEach((b, i) => {
        b.disabled = true;
        if (i === correct) b.classList.add('good');
        else if (i === picked) b.classList.add('bad');
      });
    }
  };
}

export const feedback = (ok, why) =>
  h('div', { class: 'feedback ' + (ok ? 'good' : 'bad'), role: 'status' }, h('b', null, ok ? 'Correct!' : 'Not quite.'), R(why || ''));
export { icon };
