import { h, icon } from '../lib/dom.js';
import { store } from '../lib/store.js';
import { LABS, labById } from '../labs/index.js';

export function homeView() {
  const s = store.get();
  const prog = LABS.map((l) => store.labProgress(l.id));
  const avg = Math.round(prog.reduce((a, b) => a + b, 0) / LABS.length);
  const last = labById(s.lastLab) || LABS[0];
  const lp = store.labProgress(last.id);
  const answered = Object.values(s.qstats).reduce((a, q) => a + q.seen, 0);
  const weak = LABS.map((l) => ({ l, acc: store.labAccuracy(l.id, l.quiz.map((_, i) => `${l.id}-${i}`)) })).filter((x) => x.acc != null).sort((a, b) => a.acc - b.acc).slice(0, 3);
  const mode = (href, ic, t, d) => h('a', { class: 'mode', href }, h('div', { class: 'ic' }, icon(ic, 22)), h('h3', null, t), h('p', null, d));
  return h('div', { class: 'stack', style: { gap: '24px' } },
    h('div', { class: 'home-top' },
      h('section', { class: 'hero' }, h('span', { class: 'pill' }, s.lastLab ? 'Continue where you left off' : 'Start here'),
        h('h2', null, `${last.code} · ${last.title}`), h('p', null, last.tagline), h('div', { class: 'bar' }, h('i', { style: { width: lp + '%' } })),
        h('div', { class: 'row' }, h('a', { class: 'btn amber', href: `#/labs/${last.id}` }, icon('play', 18), s.lastLab ? 'Resume lesson' : 'Open first lesson'), h('a', { class: 'btn', href: `#/quiz/${last.id}` }, 'Quick quiz'))),
      h('div', { class: 'stack' },
        h('div', { class: 'stats' },
          h('div', { class: 'stat' }, h('b', null, avg + '%'), h('span', null, 'Overall')),
          h('div', { class: 'stat' }, h('b', null, s.streak || 0), h('span', null, 'Day streak')),
          h('div', { class: 'stat' }, h('b', null, answered), h('span', null, 'Answered'))),
        h('div', { class: 'card' }, h('h3', { style: { marginBottom: '6px' } }, 'Needs review'),
          weak.length ? weak.map(({ l, acc }) => h('a', { class: 'weak-row', href: `#/quiz/${l.id}` }, h('span', { class: 'code-tag' }, l.code), h('span', { style: { flex: 1 } }, l.title), h('b', null, Math.round(acc * 100) + '%')))
            : h('p', { class: 'muted' }, 'Take a quiz and your weakest labs will show up here.')))),
    h('section', null, h('h2', { style: { marginBottom: '12px' } }, 'Study modes'),
      h('div', { class: 'modes' }, mode('#/flashcards', 'cards', 'Flashcards', 'Terms and formulas'), mode('#/quiz', 'quiz', 'Quiz', 'Test terminology'), mode('#/practice', 'solve', 'Practice', 'Fresh numbers every time'), mode('#/tools', 'tools', 'Lab tools', 'Calculators'))),
    h('section', null, h('h2', { style: { marginBottom: '12px' } }, 'All labs'),
      h('div', { class: 'labgrid' }, LABS.map((l) => h('a', { class: 'labcard', href: `#/labs/${l.id}` },
        h('div', { class: 'top' }, h('span', { class: 'code-tag' }, l.code), h('span', { class: 'muted', style: { fontSize: '13px' } }, store.labProgress(l.id) + '%')),
        h('h3', null, l.title), h('div', { class: 'f' }, l.formula), h('div', { class: 'bar' }, h('i', { style: { width: store.labProgress(l.id) + '%' } })))))));
}
