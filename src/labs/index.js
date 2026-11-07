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

export const LABS = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10];
export const labById = (id) => LABS.find((l) => l.id === id);

/** Flat list of every quiz question with a stable id. */
export const ALL_QUESTIONS = LABS.flatMap((lab) => lab.quiz.map((q, i) => ({ ...q, id: `${lab.id}-${i}`, lab: lab.id })));
