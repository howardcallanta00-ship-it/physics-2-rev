import './style.css';
import { h, icon } from './lib/dom.js';
import { store, theme, setTheme } from './lib/store.js';
import { LABS } from './labs/index.js';
import { homeView } from './views/home.js';
import { labView } from './views/lab.js';
import { cardsView } from './views/cards.js';
import { quizView } from './views/quiz.js';
import { practiceView } from './views/practice.js';
import { toolsView } from './views/tools.js';
import { formulasView, glossaryView, moreView } from './views/ref.js';

const NAV = [['/', 'home', 'Home'], ['/flashcards', 'cards', 'Flashcards'], ['/quiz', 'quiz', 'Quiz'], ['/practice', 'solve', 'Practice'], ['/tools', 'tools', 'Lab tools'], ['/formulas', 'sigma', 'Formulas'], ['/glossary', 'list', 'Glossary']];
const TABS = [['/', 'home', 'Home'], ['/flashcards', 'cards', 'Cards'], ['/quiz', 'quiz', 'Quiz'], ['/practice', 'solve', 'Practice'], ['/more', 'more', 'More']];

let cleanups = [];
const ctx = { cleanup: (f) => cleanups.push(f) };
const content = h('main', { class: 'content', id: 'main', tabindex: '-1' });
const sideNav = h('nav', { class: 'side', 'aria-label': 'Main' });
const tabbar = h('nav', { class: 'tabbar', 'aria-label': 'Primary' });

const brand = () => h('a', { class: 'brand', href: '#/' }, h('span', { class: 'brand-mark' }, icon('bolt', 20)), h('span', { class: 'brand-name' }, 'Physics 2', h('br'), h('small', { style: { fontWeight: 500, fontSize: '12px', color: 'var(--muted)' } }, 'Lab reviewer')));
const themeBtn = () => h('button', { class: 'iconbtn', type: 'button', 'aria-label': 'Toggle dark mode', onclick: () => { setTheme(theme() === 'dark' ? 'light' : 'dark'); } }, icon('moon', 20));

function route() {
  const hash = location.hash.replace(/^#/, '') || '/';
  const [, a, b] = hash.split('/');
  return { path: '/' + (a || ''), a: a || '', b };
}

function paintNav(r) {
  const cur = (p) => (p === r.path ? 'page' : null);
  sideNav.replaceChildren(brand(),
    ...NAV.slice(0, 1).map(([p, ic, t]) => h('a', { class: 'navlink', href: '#' + p, 'aria-current': cur(p) }, icon(ic, 20), t)),
    h('div', { class: 'side-label' }, 'Lessons'),
    ...LABS.map((l) => h('a', { class: 'sublab', href: `#/labs/${l.id}`, 'aria-current': r.a === 'labs' && r.b === l.id ? 'page' : null }, h('span', { class: 'code' }, l.code), l.title, h('span', { class: 'dot' + (store.get().lessonDone[l.id] ? ' done' : '') }))),
    h('div', { class: 'side-label' }, 'Study'),
    ...NAV.slice(1).map(([p, ic, t]) => h('a', { class: 'navlink', href: '#' + p, 'aria-current': cur(p) }, icon(ic, 20), t)),
    h('div', { class: 'side-foot' }, themeBtn()));
  const more = ['/more', '/tools', '/formulas', '/glossary'];
  tabbar.replaceChildren(...TABS.map(([p, ic, t]) => h('a', { class: 'tab', href: '#' + p, 'aria-current': (p === '/more' ? more.includes(r.path) : p === r.path || (p === '/' && r.a === 'labs')) ? 'page' : null }, icon(ic, 22), t)));
}

function render() {
  cleanups.forEach((f) => { try { f(); } catch (e) { /* ignore */ } });
  cleanups = [];
  const r = route();
  let view;
  try {
    switch (r.a) {
      case '': view = homeView(); break;
      case 'labs': view = labView(r.b, ctx); break;
      case 'flashcards': view = cardsView(r.b, ctx); break;
      case 'quiz': view = quizView(r.b, ctx); break;
      case 'practice': view = practiceView(r.b); break;
      case 'tools': view = toolsView(); break;
      case 'formulas': view = formulasView(); break;
      case 'glossary': view = glossaryView(); break;
      case 'more': view = moreView(); break;
      default: view = h('div', null, h('h1', null, 'Page not found'), h('a', { class: 'btn', href: '#/' }, 'Go home'));
    }
  } catch (e) {
    console.error(e);
    view = h('div', { class: 'card' }, h('h2', null, 'Something went wrong'), h('pre', null, String(e && e.stack || e)));
  }
  paintNav(r);
  content.replaceChildren(view);
  window.scrollTo(0, 0);
  document.title = 'Physics 2 Lab Reviewer';
}

const app = document.getElementById('app');
app.replaceChildren(
  h('a', { class: 'skip', href: '#main' }, 'Skip to content'),
  h('div', { class: 'shell' }, sideNav, h('div', { class: 'main' }, h('header', { class: 'topbar' }, brand(), themeBtn()), content)),
  tabbar);
window.addEventListener('hashchange', render);
render();
