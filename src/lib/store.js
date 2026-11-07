const KEY = 'p2r:v1';

const blank = () => ({
  lessonDone: {},     // { a1: true }
  lastLab: null,
  quiz: {},           // { a1: { best: 0.8, attempts: 3 } }
  qstats: {},         // { 'a1-3': { seen, right } }
  cards: {},          // { 'a1-t0': { box: 1..3 } }
  practice: {},       // { a1: { tried, solved } }
  days: [],           // ['2026-11-07', ...] study days
  streak: 0
});

let state = null;

function load() {
  if (state) return state;
  try {
    const raw = localStorage.getItem(KEY);
    state = raw ? { ...blank(), ...JSON.parse(raw) } : blank();
  } catch (e) {
    state = blank();
  }
  return state;
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) { /* storage unavailable: keep in memory */ }
}

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const store = {
  get() { return load(); },
  touch() {
    const s = load();
    const t = today();
    if (!s.days.includes(t)) {
      s.days.push(t);
      s.days = s.days.slice(-120);
    }
    // streak = consecutive days ending today
    let streak = 0;
    const set = new Set(s.days);
    const d = new Date();
    while (set.has(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`)) {
      streak++;
      d.setDate(d.getDate() - 1);
    }
    s.streak = streak;
    save();
  },
  setLast(id) { load().lastLab = id; this.touch(); },
  markLesson(id, done = true) { load().lessonDone[id] = done; this.touch(); },
  recordAnswer(labId, qid, right) {
    const s = load();
    const q = s.qstats[qid] || { seen: 0, right: 0 };
    q.seen++;
    if (right) q.right++;
    s.qstats[qid] = q;
    this.touch();
  },
  recordQuiz(labId, score) {
    const s = load();
    const q = s.quiz[labId] || { best: 0, attempts: 0 };
    q.attempts++;
    q.best = Math.max(q.best, score);
    s.quiz[labId] = q;
    this.touch();
  },
  recordPractice(labId, solved) {
    const s = load();
    const p = s.practice[labId] || { tried: 0, solved: 0 };
    p.tried++;
    if (solved) p.solved++;
    s.practice[labId] = p;
    this.touch();
  },
  setCard(id, box) { load().cards[id] = { box }; save(); },
  labProgress(id) {
    const s = load();
    const lesson = s.lessonDone[id] ? 0.3 : 0;
    const quiz = (s.quiz[id]?.best || 0) * 0.4;
    const prac = Math.min(s.practice[id]?.solved || 0, 5) / 5 * 0.3;
    return Math.round((lesson + quiz + prac) * 100);
  },
  labAccuracy(id, qids) {
    const s = load();
    let seen = 0, right = 0;
    for (const q of qids) {
      const st = s.qstats[q];
      if (st) { seen += st.seen; right += st.right; }
    }
    return seen ? right / seen : null;
  },
  reset() { state = blank(); save(); }
};

export function theme() {
  return document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}
export function setTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  try { localStorage.setItem('p2r:theme', t); } catch (e) { /* ignore */ }
}
