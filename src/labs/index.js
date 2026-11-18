import a1 from './a1.js';
import a2 from './a2.js';
import a3 from './a3.js';
import a4 from './a4.js';
import a5 from './a5.js';
import a6 from './a6.js';
import a7 from './a7.js';
import a8 from './a8.js';
import a9 from './a9.js';
import a10 from './a10.js';
import m1 from '../modules/m1.js';
import m2 from '../modules/m2.js';
import m3 from '../modules/m3.js';
import m4 from '../modules/m4.js';
import m5 from '../modules/m5.js';
import m6 from '../modules/m6.js';
import m7 from '../modules/m7.js';
import m8 from '../modules/m8.js';
import m9 from '../modules/m9.js';
import m10 from '../modules/m10.js';

export const LABS = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10];
export const MODULES = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10];
/** Everything you can study: modules first, then labs. */
export const UNITS = [...MODULES, ...LABS];
export const isModule = (u) => MODULES.includes(u);
export const labById = (id) => UNITS.find((l) => l.id === id);

/** Flat list of every quiz question with a stable id. */
export const ALL_QUESTIONS = UNITS.flatMap((u) => u.quiz.map((q, i) => ({ ...q, id: `${u.id}-${i}`, lab: u.id })));
