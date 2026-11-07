import { h, R, M, icon, fmt } from '../lib/dom.js';
import { store } from '../lib/store.js';
import { LABS, labById } from '../labs/index.js';
import { pageHead, parseNum, feedback } from './common.js';

export function practiceView(arg) {
  const root = h('div');
  let lab = labById(arg) || LABS[0];
  let prob = lab.problems[0];
  let p = null, counted = false, solved = false, tries = 0;

  function newProblem(keep) {
    if (!keep) prob = prob && lab.problems.includes(prob) ? prob : lab.problems[0];
    p = prob.gen(); counted = false; solved = false; tries = 0;
    render();
  }
  function render() {
    const stats = store.get().practice[lab.id] || { tried: 0, solved: 0 };
    const input = h('input', { type: 'text', inputmode: 'decimal', autocomplete: 'off', 'aria-label': 'Your answer', placeholder: 'e.g. 0.45 or 4.5e-1' });
    const out = h('div', { class: 'stack' });
    const hintBox = h('div');
    const check = () => {
      const v = parseNum(input.value);
      if (isNaN(v)) { out.replaceChildren(feedback(false, 'Enter a number first. Scientific notation like 1.2e-5 works.')); return; }
      tries++;
      const tol = p.tol ?? 0.02;
      const ok = Math.abs(v - p.answer) <= Math.abs(p.answer) * tol + 1e-12;
      if (!counted) { counted = true; store.recordPractice(lab.id, ok); }
      if (ok) solved = true;
      out.replaceChildren(feedback(ok, ok ? `Your ${fmt(v)} matches ${fmt(p.answer)} ${p.unit}.` : 'Check your units and rounding. Try the hint, or reveal the solution.'));
      if (ok) showSolution(); 
    };
    const sol = h('div');
    const showSolution = () => {
      sol.replaceChildren(h('div', { class: 'worked' }, h('header', null, icon('solve', 18), 'Solution'),
        h('div', null, p.steps.map((s, i) => h('div', { class: 'step' }, h('span', { class: 'n' }, i + 1), h('div', null, s.x && h('div', null, R(s.x)), s.m && M(s.m, true)))),
          h('div', { class: 'result' }, h('span', { class: 'muted' }, 'Answer'), h('div', { class: 'big' }, `${fmt(p.answer)} ${p.unit}`)))));
    };
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
    root.replaceChildren(
      pageHead('Practice', 'Practice problems', 'Fresh numbers every time. Answers within the stated tolerance (usually 2%) count as correct.'),
      h('div', { class: 'card stack no-print', style: { marginBottom: '16px' } },
        h('div', { class: 'eyebrow' }, 'Lab'),
        h('div', { class: 'row' }, LABS.map((l) => h('button', { class: 'chip', type: 'button', 'aria-pressed': String(l === lab), onclick: () => { lab = l; prob = l.problems[0]; newProblem(true); } }, l.code))),
        h('div', { class: 'eyebrow' }, 'Problem type'),
        h('div', { class: 'row' }, lab.problems.map((pr) => h('button', { class: 'chip', type: 'button', 'aria-pressed': String(pr === prob), onclick: () => { prob = pr; newProblem(true); } }, pr.title)))),
      h('div', { class: 'prob-wrap' },
        h('div', { class: 'card stack' },
          h('div', { class: 'row' }, h('span', { class: 'code-tag' }, lab.code), h('span', { class: 'pill' }, prob.title), h('span', { class: 'muted', style: { marginLeft: 'auto', fontSize: '13px' } }, `Solved ${stats.solved}/${stats.tried}`)),
          h('p', { style: { fontSize: '18px' } }, R(p.prompt)),
          h('div', { class: 'givens' }, p.givens.map((g) => h('span', { class: 'given' }, M(g, false)))),
          h('div', { class: 'ans-row' }, input, h('span', { class: 'unit' }, p.unit)),
          h('div', { class: 'row' },
            h('button', { class: 'btn primary', type: 'button', onclick: check }, 'Check answer'),
            h('button', { class: 'btn', type: 'button', onclick: () => hintBox.replaceChildren(h('div', { class: 'callout key' }, icon('bulb', 20), h('div', null, R(p.hint)))) }, icon('bulb', 18), 'Hint'),
            h('button', { class: 'btn ghost', type: 'button', onclick: showSolution }, 'Show solution'),
            h('button', { class: 'btn amber', type: 'button', onclick: () => newProblem(true) }, icon('reset', 18), 'New numbers')),
          hintBox, out),
        sol));
    input.focus({ preventScroll: true });
  }
  newProblem(true);
  return root;
}
