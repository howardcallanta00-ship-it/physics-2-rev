import { h, R, M, icon, shuffle } from '../lib/dom.js';
import { store } from '../lib/store.js';
import { LABS, labById } from '../labs/index.js';
import { pageHead } from './common.js';

const deckFor = (labs) => labs.flatMap((l) => [
  ...l.terms.map(([t, d], i) => ({ id: `${l.id}-t${i}`, lab: l, front: t, back: d, kind: 'term' })),
  ...l.formulas.map(([n, x, note], i) => ({ id: `${l.id}-f${i}`, lab: l, front: n, back: x, note, kind: 'formula' }))
]);

export function cardsView(arg, ctx) {
  const root = h('div');
  const sel = new Set(arg && labById(arg) ? [arg] : []);
  let deck = [], i = 0, flipped = false, hideKnown = true;

  function setup() {
    root.replaceChildren(pageHead('Flashcards', 'Flip. Recall. Repeat.', 'Terms and formulas from every lab. Cards you know move up a box and show less often.'),
      h('div', { class: 'card stack' },
        h('div', { class: 'eyebrow' }, 'Pick labs (none selected = all)'),
        h('div', { class: 'row' }, LABS.map((l) => h('button', { class: 'chip', type: 'button', 'aria-pressed': String(sel.has(l.id)), onclick: (e) => { sel.has(l.id) ? sel.delete(l.id) : sel.add(l.id); e.currentTarget.setAttribute('aria-pressed', String(sel.has(l.id))); } }, l.code))),
        h('label', { class: 'row' }, h('input', { type: 'checkbox', checked: hideKnown, onchange: (e) => (hideKnown = e.target.checked) }), 'Hide cards I have mastered (box 3)'),
        h('button', { class: 'btn primary', type: 'button', onclick: start }, icon('play', 18), 'Start session')));
  }
  function start() {
    const labs = sel.size ? LABS.filter((l) => sel.has(l.id)) : LABS;
    const cards = store.get().cards;
    deck = shuffle(deckFor(labs).filter((c) => !hideKnown || (cards[c.id]?.box || 1) < 3));
    i = 0; flipped = false;
    deck.length ? show() : root.replaceChildren(pageHead('Flashcards', 'All mastered! 🎉', 'Every card in this selection is in box 3.'), h('button', { class: 'btn', onclick: setup }, 'Back'));
  }
  function grade(box) {
    store.setCard(deck[i].id, box); store.touch();
    i++; flipped = false;
    i >= deck.length ? finish() : show();
  }
  function finish() {
    root.replaceChildren(pageHead('Flashcards', 'Session complete', `You went through ${deck.length} cards.`),
      h('div', { class: 'row' }, h('button', { class: 'btn primary', onclick: start }, 'Go again'), h('button', { class: 'btn', onclick: setup }, 'Change labs')));
  }
  function show() {
    const c = deck[i];
    const front = h('div', { class: 'fc-face' }, h('span', { class: 'small' }, `${c.lab.code} · ${c.kind === 'term' ? 'Term' : 'Formula'}`), h('div', { class: 'big' }, R(c.front)), h('span', { class: 'small' }, 'Tap or press Space to flip'));
    const back = h('div', { class: 'fc-face back' }, c.kind === 'term' ? h('div', { class: 'def' }, R(c.back)) : [M(c.back, true), c.note && h('div', { class: 'small' }, c.note)]);
    const card = h('button', { class: 'fc-card' + (flipped ? ' flip' : ''), type: 'button', 'aria-label': 'Flip card', onclick: flip }, front, back);
    function flip() { flipped = !flipped; card.classList.toggle('flip', flipped); }
    root.replaceChildren(h('div', { class: 'fc-wrap' },
      h('div', { class: 'qhead' }, h('span', { class: 'mono' }, `${i + 1}/${deck.length}`), h('div', { class: 'bar' }, h('i', { style: { width: (i / deck.length * 100) + '%' } })), h('button', { class: 'btn small ghost', onclick: setup }, 'End')),
      h('div', { class: 'fc' }, card),
      h('div', { class: 'fc-actions' },
        h('button', { class: 'btn', type: 'button', onclick: () => grade(1) }, icon('x', 18), 'Again (1)'),
        h('button', { class: 'btn primary', type: 'button', onclick: () => grade(Math.min(3, (store.get().cards[c.id]?.box || 1) + 1)) }, icon('check', 18), 'Got it (2)'))));
    root._flip = flip;
  }
  const key = (e) => {
    if (!deck.length || !root.querySelector('.fc-card')) return;
    if (e.key === ' ') { e.preventDefault(); root._flip && root._flip(); }
    else if (e.key === '1') grade(1);
    else if (e.key === '2') grade(Math.min(3, (store.get().cards[deck[i].id]?.box || 1) + 1));
  };
  document.addEventListener('keydown', key);
  ctx.cleanup(() => document.removeEventListener('keydown', key));
  arg && labById(arg) ? start() : setup();
  return root;
}
