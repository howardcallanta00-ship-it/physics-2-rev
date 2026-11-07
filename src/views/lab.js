import { h, R, M, icon } from '../lib/dom.js';
import { store } from '../lib/store.js';
import { LABS, labById } from '../labs/index.js';
import { VISUALS } from '../visuals/index.js';
import { optionList, feedback, toast } from './common.js';

function block(b) {
  switch (b.t) {
    case 'p': return h('p', null, R(b.x));
    case 'ul': return h('ul', null, b.x.map((i) => h('li', null, R(i))));
    case 'ol': return h('ol', null, b.x.map((i) => h('li', null, R(i))));
    case 'key': case 'warn': case 'note': case 'lab': {
      const ic = { key: 'bulb', warn: 'warn', note: 'info', lab: 'target' }[b.t];
      const title = b.title || { key: 'Key idea', warn: 'Watch out', note: 'Note', lab: 'In the lab' }[b.t];
      return h('div', { class: 'callout ' + b.t }, icon(ic, 20), h('div', null, h('div', { class: 't' }, title), h('div', null, R(b.x))));
    }
    case 'analogy':
      return h('div', { class: 'analogy' }, h('span', { class: 'tag' }, icon('bulb', 14), 'Analogy'), h('h3', null, b.title), h('p', null, R(b.x)),
        b.map && h('div', { class: 'map' }, b.map.map(([a, c]) => h('div', null, h('b', null, R(a)), '→', R(c)))));
    case 'viz': { const f = VISUALS[b.id]; return f ? f() : null; }
    case 'eq':
      return h('div', { class: 'eqbox' }, h('div', { class: 'name' }, b.name), M(b.tex, true),
        b.words && h('div', { class: 'words' }, h('b', null, 'In words: '), R(b.words)),
        b.vars && b.vars.length ? h('table', { class: 'vars' }, b.vars.map(([s, m, u]) => h('tr', null, h('td', null, M(s, false)), h('td', null, R(m)), h('td', null, u || '')))) : null);
    case 'worked':
      return h('div', { class: 'worked' }, h('header', null, icon('solve', 18), b.title || 'Worked example'),
        h('div', null, b.steps.map((s, i) => h('div', { class: 'step' }, h('span', { class: 'n' }, i + 1), h('div', null, s.x && h('div', null, R(s.x)), s.m && M(s.m, true))))));
    case 'check': {
      let out;
      const ol = optionList(b.o, (i) => {
        ol.reveal(b.a, i);
        out.replaceChildren(feedback(i === b.a, b.why));
      });
      out = h('div');
      return h('div', { class: 'check' }, h('span', { class: 'tag' }, 'Quick check'), h('div', { class: 'qtext', style: { fontSize: '19px' } }, R(b.q)), ol.el, out);
    }
    case 'table':
      return h('div', { class: 'tbl-wrap' }, h('table', { class: 'tbl' }, h('thead', null, h('tr', null, b.head.map((c) => h('th', null, R(c))))),
        h('tbody', null, b.rows.map((r) => h('tr', null, r.map((c) => h('td', null, R(c))))))));
    default: return null;
  }
}

export function labView(id, ctx) {
  const lab = labById(id);
  if (!lab) return h('p', null, 'Lab not found.');
  store.setLast(lab.id);
  const idx = LABS.indexOf(lab);
  const prev = LABS[idx - 1], next = LABS[idx + 1];
  let n = 0;
  const heads = [];
  const body = lab.lesson.map((b) => {
    if (b.t === 'h') { const hid = 'sec-' + n++; heads.push([hid, b.x]); return h('h2', { id: hid }, R(b.x)); }
    return block(b);
  });
  const outline = h('nav', { class: 'outline', 'aria-label': 'On this page' }, h('div', { class: 'ot' }, 'On this page'),
    heads.map(([hid, t]) => h('a', { href: '#', 'data-id': hid, onclick: (e) => { e.preventDefault(); document.getElementById(hid).scrollIntoView({ behavior: 'smooth' }); } }, t.replace(/\$/g, ''))));
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) outline.querySelectorAll('a').forEach((a) => a.classList.toggle('on', a.dataset.id === e.target.id)); });
  }, { rootMargin: '-10% 0px -80% 0px' });
  setTimeout(() => heads.forEach(([hid]) => { const el = document.getElementById(hid); el && io.observe(el); }), 0);
  ctx.cleanup(() => io.disconnect());

  const done = () => store.get().lessonDone[lab.id];
  const doneBtn = h('button', { class: 'btn amber', type: 'button' });
  const paint = () => { doneBtn.replaceChildren(icon('check', 18), done() ? 'Lesson completed (tap to undo)' : 'Mark lesson as done'); };
  doneBtn.onclick = () => { store.markLesson(lab.id, !done()); paint(); toast(done() ? 'Lesson marked done' : 'Lesson unmarked'); };
  paint();

  return h('div', null,
    h('header', { class: 'page-head' }, h('div', { class: 'row' }, h('span', { class: 'code-tag' }, lab.code), h('span', { class: 'eyebrow' }, 'Lesson')),
      h('h1', { class: 'page-title' }, lab.title), h('p', { class: 'lead' }, lab.tagline),
      h('div', { class: 'row no-print' },
        h('a', { class: 'btn small', href: `#/flashcards/${lab.id}` }, icon('cards', 16), 'Flashcards'),
        h('a', { class: 'btn small', href: `#/quiz/${lab.id}` }, icon('quiz', 16), 'Quiz'),
        h('a', { class: 'btn small', href: `#/practice/${lab.id}` }, icon('solve', 16), 'Practice'))),
    h('div', { class: 'lab-layout' }, outline,
      h('article', { class: 'lesson' },
        h('div', { class: 'objectives' }, h('h3', null, 'After this lesson you can…'), h('ul', null, lab.objectives.map((o) => h('li', null, R(o))))),
        body,
        h('div', { class: 'lesson-end' }, h('h3', null, 'Finished reading?'), doneBtn,
          h('div', { class: 'row' },
            h('a', { class: 'btn', href: `#/quiz/${lab.id}` }, 'Take the quiz'),
            h('a', { class: 'btn', href: `#/practice/${lab.id}` }, 'Practice problems')),
          h('div', { class: 'row', style: { justifyContent: 'space-between' } },
            prev ? h('a', { class: 'btn ghost small', href: `#/labs/${prev.id}` }, icon('chevL', 16), prev.code + ' ' + prev.title) : h('span'),
            next ? h('a', { class: 'btn ghost small', href: `#/labs/${next.id}` }, next.code + ' ' + next.title, icon('chevR', 16)) : null)))));
}
