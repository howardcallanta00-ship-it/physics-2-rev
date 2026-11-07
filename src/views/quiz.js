import { h, R, icon, shuffle } from '../lib/dom.js';
import { store } from '../lib/store.js';
import { LABS, labById, ALL_QUESTIONS } from '../labs/index.js';
import { pageHead, optionList, feedback } from './common.js';

export function quizView(arg, ctx) {
  const root = h('div', { class: 'quiz-wrap' });
  const sel = new Set(arg && labById(arg) ? [arg] : []);
  let count = 10;
  let qs = [], i = 0, log = [];

  function setup() {
    root.replaceChildren(pageHead('Quiz', 'Test your terminology', 'Multiple choice with instant explanations. Keys 1–4 pick an answer, Enter goes next.'),
      h('div', { class: 'card stack' },
        h('div', { class: 'eyebrow' }, 'Labs (none selected = all)'),
        h('div', { class: 'row' }, LABS.map((l) => h('button', { class: 'chip', type: 'button', 'aria-pressed': String(sel.has(l.id)), onclick: (e) => { sel.has(l.id) ? sel.delete(l.id) : sel.add(l.id); e.currentTarget.setAttribute('aria-pressed', String(sel.has(l.id))); } }, l.code))),
        h('div', { class: 'eyebrow' }, 'Questions'),
        h('div', { class: 'row' }, [5, 10, 20, 0].map((n) => h('button', { class: 'chip', type: 'button', 'data-n': n, 'aria-pressed': String(n === count), onclick: (e) => { count = n; root.querySelectorAll('[data-n]').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.n === n))); } }, n ? String(n) : 'All'))),
        h('button', { class: 'btn primary', type: 'button', onclick: () => start(null) }, icon('play', 18), 'Start quiz')));
  }
  function start(pool) {
    const base = pool || ALL_QUESTIONS.filter((q) => !sel.size || sel.has(q.lab));
    qs = shuffle(base);
    if (count && !pool) qs = qs.slice(0, count);
    i = 0; log = [];
    next();
  }
  let current = null;
  function next() {
    if (i >= qs.length) return results();
    const q = qs[i];
    const order = shuffle(q.o.map((t, k) => k));
    const opts = order.map((k) => q.o[k]);
    const correct = order.indexOf(q.a);
    let answered = false;
    const out = h('div', { class: 'stack' });
    const ol = optionList(opts, (pick) => {
      answered = true;
      const ok = pick === correct;
      ol.reveal(correct, pick);
      log.push({ q, ok, picked: opts[pick], right: opts[correct] });
      store.recordAnswer(q.lab, q.id, ok);
      out.replaceChildren(feedback(ok, q.why), h('button', { class: 'btn primary', type: 'button', onclick: () => { i++; next(); } }, i + 1 === qs.length ? 'See results' : 'Next', icon('chevR', 18)));
      out.querySelector('button').focus();
    });
    current = { ol, isAnswered: () => answered, next: () => { if (answered) { i++; next(); } } };
    root.replaceChildren(
      h('div', { class: 'qhead' }, h('span', { class: 'mono' }, `${i + 1}/${qs.length}`), h('div', { class: 'bar' }, h('i', { style: { width: (i / qs.length * 100) + '%' } })), h('button', { class: 'btn small ghost', onclick: () => { current = null; setup(); } }, 'Quit')),
      h('div', { class: 'card qcard' }, h('span', { class: 'pill', style: { alignSelf: 'flex-start' } }, labById(q.lab).code), h('div', { class: 'qtext' }, R(q.q)), ol.el, out));
  }
  function results() {
    current = null;
    const right = log.filter((l) => l.ok).length;
    const pct = Math.round(right / qs.length * 100);
    // per-lab record
    const by = {};
    log.forEach((l) => { (by[l.q.lab] ||= []).push(l.ok); });
    Object.entries(by).forEach(([lab, arr]) => store.recordQuiz(lab, arr.filter(Boolean).length / arr.length));
    const missed = log.filter((l) => !l.ok);
    root.replaceChildren(pageHead('Results', pct >= 80 ? 'Great work!' : pct >= 50 ? 'Getting there' : 'Keep practising'),
      h('div', { class: 'card row', style: { gap: '24px' } },
        h('div', { class: 'score-ring', style: { '--p': pct } }, h('b', null, pct + '%')),
        h('div', { class: 'stack' }, h('div', { class: 'qtext' }, `${right} of ${qs.length} correct`),
          h('div', { class: 'row' },
            h('button', { class: 'btn primary', onclick: () => start() }, 'New quiz'),
            missed.length ? h('button', { class: 'btn amber', onclick: () => start(missed.map((m) => m.q)) }, 'Retry missed (' + missed.length + ')') : null,
            h('button', { class: 'btn', onclick: setup }, 'Change setup')))),
      missed.length ? h('div', { class: 'card' }, h('h3', null, 'Review what you missed'),
        missed.map((m) => h('div', { class: 'review-item' }, h('div', { class: 'qtext', style: { fontSize: '18px' } }, R(m.q.q)),
          h('div', null, h('span', { class: 'muted' }, 'You: '), R(m.picked)), h('div', null, h('b', null, 'Answer: '), R(m.right)), h('div', { class: 'muted' }, R(m.q.why))))) : null);
  }
  const key = (e) => {
    if (!current || e.metaKey || e.ctrlKey) return;
    if (/^[1-4]$/.test(e.key)) current.ol.pick(+e.key - 1);
    else if (e.key === 'Enter' && current.isAnswered()) { e.preventDefault(); current.next(); }
  };
  document.addEventListener('keydown', key);
  ctx.cleanup(() => document.removeEventListener('keydown', key));
  setup();
  return root;
}
