import { h, R, M, icon } from '../lib/dom.js';
import { store, theme, setTheme } from '../lib/store.js';
import { LABS } from '../labs/index.js';
import { pageHead, toast } from './common.js';

export function formulasView() {
  return h('div', null,
    pageHead('Reference', 'Formula sheet', 'Every equation from the ten labs in one place.'),
    h('div', { class: 'row no-print', style: { marginBottom: '16px' } }, h('button', { class: 'btn', onclick: () => window.print() }, icon('print', 18), 'Print')),
    LABS.map((l) => h('section', { style: { marginBottom: '24px' } },
      h('h2', { style: { marginBottom: '10px', fontSize: '22px' } }, h('span', { class: 'code-tag', style: { marginRight: '8px' } }, l.code), l.title),
      h('div', { class: 'fgrid' }, l.formulas.map(([n, x, note]) => h('div', { class: 'fcard' }, h('div', { class: 'n' }, n), M(x, true), note ? h('div', { class: 'muted', style: { fontSize: '13px' } }, note) : null))))));
}

export function glossaryView() {
  const list = h('div');
  const input = h('input', { type: 'search', placeholder: 'Search terms…', 'aria-label': 'Search glossary' });
  const all = LABS.flatMap((l) => l.terms.map(([t, d]) => ({ l, t, d })));
  const paint = () => {
    const q = input.value.trim().toLowerCase();
    const hit = all.filter((x) => !q || x.t.toLowerCase().includes(q) || x.d.toLowerCase().includes(q));
    list.replaceChildren(h('p', { class: 'muted' }, `${hit.length} term${hit.length === 1 ? '' : 's'}`),
      ...hit.map((x) => h('div', { class: 'term' }, h('h3', null, R(x.t), h('a', { class: 'pill', href: `#/labs/${x.l.id}`, style: { textDecoration: 'none' } }, x.l.code)), h('p', null, R(x.d)))));
  };
  input.addEventListener('input', paint); paint();
  return h('div', null, pageHead('Reference', 'Glossary', 'Search every term from all labs.'), h('div', { class: 'search', style: { marginBottom: '16px' } }, icon('search', 18), input), list);
}

export function moreView() {
  const link = (href, ic, t, d) => h('a', { class: 'mode', href }, h('div', { class: 'ic' }, icon(ic, 22)), h('h3', null, t), h('p', null, d));
  return h('div', null, pageHead('More', 'Tools and settings'),
    h('div', { class: 'modes', style: { marginBottom: '20px' } },
      link('#/tools', 'tools', 'Lab tools', 'Calculators'), link('#/formulas', 'sigma', 'Formulas', 'Printable sheet'), link('#/glossary', 'list', 'Glossary', 'All terms')),
    h('div', { class: 'card stack' }, h('h3', null, 'Settings'),
      h('div', { class: 'row' },
        h('button', { class: 'btn', onclick: () => { setTheme(theme() === 'dark' ? 'light' : 'dark'); } }, icon('moon', 18), 'Toggle dark mode'),
        h('button', { class: 'btn ghost', onclick: () => { if (confirm('Erase all progress on this device?')) { store.reset(); toast('Progress reset'); location.hash = '#/'; } } }, 'Reset progress')),
      h('p', { class: 'muted', style: { fontSize: '14px' } }, 'Progress is saved only in this browser. Shortcuts: Space flips a flashcard; 1–4 answer quiz questions; Enter goes next.')));
}
