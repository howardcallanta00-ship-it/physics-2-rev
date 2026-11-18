import { rint, rf, pick, T } from '../labs/util.js';

const K = 8.99e9, E = 1.602e-19;

export default {
  id: 'm3', kind: 'module', code: 'M3', title: 'Electric Charge and Coulomb’s Law', tagline: 'Where electricity starts: charge, charging and the force between charges',
  formula: 'Q = ne · F = k q₁q₂ / r²',
  objectives: ['Explain charge, quantization and conservation of charge.', 'Tell conductors, insulators and semiconductors apart, and the three ways to charge an object.', 'Use Coulomb’s law for the force between two point charges.', 'Use the superposition principle for several charges.'],
  lesson: [
    { t: 'h', x: 'What is electric charge?' },
    { t: 'p', x: '**Electric charge** is a basic property of matter that makes it feel electric and magnetic effects. The word “electric” comes from the Greek *elektron*, meaning amber: the Greeks found that amber rubbed with wool could attract light objects. The unit of charge is the **coulomb (C)**.' },
    { t: 'p', x: 'There are two kinds, named by Benjamin Franklin: **positive** (carried by protons) and **negative** (carried by electrons). An electron and a proton carry exactly the same amount of charge, just opposite in sign:' },
    { t: 'eq', name: 'Elementary charge', tex: 'e = 1.602\\times10^{-19}\\ \\text{C}', words: 'This is the **smallest unit of free charge**. A typical rubbed object has about $10^{-8}$ C. One coulomb is a huge amount: about $6\\times10^{18}$ electrons.', vars: [] },
    { t: 'key', title: 'The golden rule', x: '**Like charges repel. Unlike charges attract.**' },
    { t: 'p', x: 'An object with **extra electrons** is **negative**. An object **missing electrons** is **positive**. Only electrons move; protons are stuck in the nucleus.' },
    { t: 'viz', id: 'vdg' },
    { t: 'h', x: 'Three properties of charge' },
    { t: 'ul', x: ['**Quantization.** Charge comes in whole multiples of $e$: $Q = \\pm ne$, with $n = 1, 2, 3, \\dots$ You cannot have half an electron.', '**Conservation.** In an isolated system the total charge never changes. If one object gains negative charge, another gains the same amount of positive charge.', '**Invariance.** The charge on a body does not depend on how it moves.'] },
    { t: 'eq', name: 'Counting electrons', tex: 'n = \\frac{Q}{e}', words: 'To find how many electrons were added or removed, divide the charge by the charge of one electron.', vars: [['n', 'number of electrons', ''], ['Q', 'net charge', 'C']] },
    { t: 'worked', title: 'Example', steps: [{ x: 'A body has a charge of +0.32 C. How many electrons were removed?' }, { m: 'n = \\frac{0.32}{1.602\\times10^{-19}} = 2.0\\times10^{18}\\ \\text{electrons}' }] },
    { t: 'h', x: 'Conductors, insulators, semiconductors' },
    { t: 'ul', x: ['**Conductors** (metals) let charge move freely.', '**Insulators** (rubber, plastic, glass) hold charge in place.', '**Semiconductors** (silicon) are in between.'] },
    { t: 'viz', id: 'circuit' },
    { t: 'h', x: 'Three ways to charge an object' },
    { t: 'ul', x: ['**Friction.** Rub two objects together and electrons transfer from one to the other (a comb through hair).', '**Conduction.** Touch a charged object to another one, and charge flows across the contact.', '**Induction.** Bring a charged object near, **without touching**. The charges in the other object shift. If you then ground it and remove the ground, it ends up with the opposite charge.'] },
    { t: 'note', title: 'Polarization', x: 'In an insulator the electrons cannot leave their atoms, but they shift slightly. This is **polarization**, and it is why a charged comb picks up uncharged paper bits.' },
    { t: 'h', x: 'Coulomb’s law' },
    { t: 'p', x: 'Charles-Augustin de Coulomb measured how strongly two small charges push or pull on each other.' },
    { t: 'viz', id: 'coulomb' },
    { t: 'eq', name: 'Coulomb’s law', tex: 'F = k\\,\\frac{|q_1\\, q_2|}{r^2} \\qquad k = \\frac{1}{4\\pi\\varepsilon_0} = 8.99\\times10^{9}\\ \\frac{\\text{N·m}^2}{\\text{C}^2}', words: 'The force is **proportional to the product of the charges** (double a charge, double the force) and **inversely proportional to the square of the distance** (double the distance, one quarter of the force).', vars: [['F', 'force on each charge', 'N'], ['q_1, q_2', 'the charges', 'C'], ['r', 'distance between them', 'm'], ['k', 'Coulomb constant', 'N·m²/C²']] },
    { t: 'analogy', title: 'A light bulb’s glow', x: 'Move away from a lamp and the light on a page drops quickly. The electric force spreads out the same way. At twice the distance the force is four times weaker.', map: [['Distance doubles', 'force ÷ 4'], ['Distance triples', 'force ÷ 9']] },
    { t: 'warn', title: 'Direction matters', x: 'The formula with $|q_1q_2|$ gives only the **size**. You decide the direction yourself: away from the other charge if the signs match (repulsion), toward it if they differ (attraction). Use nC = $10^{-9}$ C and µC = $10^{-6}$ C, and metres for $r$.' },
    { t: 'worked', title: 'Example: two charges', steps: [
      { x: '$q_1 = 25$ nC and $q_2 = -75$ nC are 3.0 cm apart. Find the force on each.' },
      { m: 'F = (8.99\\times10^{9})\\frac{(25\\times10^{-9})(75\\times10^{-9})}{(0.030)^2} = 0.019\\ \\text{N}' },
      { x: 'Opposite signs, so they **attract**. By Newton’s third law each pulls on the other with the same 0.019 N.' }] },
    { t: 'worked', title: 'Example: electric force vs gravity in hydrogen', steps: [
      { x: 'An electron and proton are $5.3\\times10^{-11}$ m apart.' },
      { m: 'F_e = k\\frac{e^2}{r^2} = (8.99\\times10^9)\\frac{(1.602\\times10^{-19})^2}{(5.3\\times10^{-11})^2} = 8.2\\times10^{-8}\\ \\text{N}' },
      { m: 'F_g = G\\frac{m_e m_p}{r^2} \\approx 3.6\\times10^{-47}\\ \\text{N}' },
      { x: 'The electric force is about $10^{39}$ times stronger. Gravity is negligible between atomic particles.' }] },
    { t: 'h', x: 'Superposition: more than two charges' },
    { t: 'p', x: 'With several charges, find the force from each one separately, then **add them as vectors**. In a straight line that just means adding with signs. In 2D, split each force into x and y components first.' },
    { t: 'eq', name: 'Superposition', tex: '\\vec F_{\\text{net}} = \\vec F_{21} + \\vec F_{31} + \\vec F_{41} + \\cdots \\qquad F_x = F\\cos\\theta,\\ F_y = F\\sin\\theta', words: 'The force that one charge feels is the **vector sum** of the forces from all the others. Other charges do not block or change each other’s pull.', vars: [] },
    { t: 'worked', title: 'Example: three charges on a line', steps: [
      { x: '$q_1 = 1.0$ nC at $x = 2.0$ cm, $q_2 = -3.0$ nC at $x = 4.0$ cm. Find the force on $q_3 = 5.0$ nC at the origin. Take +x to the right.' },
      { x: '$q_1$ repels $q_3$ (same sign), pushing it to the **left** (−x):', m: 'F_1 = -(8.99\\times10^9)\\frac{(5\\times10^{-9})(1\\times10^{-9})}{(0.02)^2} = -1.12\\times10^{-4}\\ \\text{N}' },
      { x: '$q_2$ attracts $q_3$, pulling it to the **right** (+x):', m: 'F_2 = +(8.99\\times10^9)\\frac{(5\\times10^{-9})(3\\times10^{-9})}{(0.04)^2} = +8.4\\times10^{-5}\\ \\text{N}' },
      { x: 'Add them:', m: 'F_{net} = -1.12\\times10^{-4} + 0.84\\times10^{-4} = -2.8\\times10^{-5}\\ \\text{N}' },
      { x: 'So the net force is **28 µN to the left**.' }] },
    { t: 'check', q: 'The distance between two charges is tripled. The force between them becomes…', o: ['3 times larger', '9 times larger', '3 times smaller', '9 times smaller'], a: 3, why: 'Force goes as $1/r^2$, so tripling $r$ divides the force by 9.' },
    { t: 'note', title: 'Link to the lab', x: 'Lab A3 (Van de Graaff) shows charging, repulsion of like charges and grounding. See the A3 and A4 lessons.' }
  ],
  terms: [
    ['Electric charge', 'A property of matter causing electric and magnetic effects. Unit: coulomb (C).'], ['Elementary charge (e)', 'The charge of a proton or electron, $1.602\\times10^{-19}$ C.'],
    ['Quantization of charge', 'Charge only occurs in whole multiples of $e$.'], ['Conservation of charge', 'The total charge of an isolated system is constant.'],
    ['Conductor', 'A material through which charge moves easily.'], ['Insulator', 'A material that resists the flow of charge.'], ['Semiconductor', 'A material between conductor and insulator.'],
    ['Conduction (charging)', 'Charging by direct contact.'], ['Induction (charging)', 'Charging without contact, using a nearby charged object.'], ['Polarization', 'A slight shift of charge within atoms of an insulator.'],
    ['Electrostatics', 'The study of charges at rest.'], ['Coulomb’s law', 'The force between point charges: $F = kq_1q_2/r^2$.'], ['Point charge', 'A charge so small compared with distances that it acts as a point.'],
    ['Superposition principle', 'The net force is the vector sum of the individual forces.'], ['Coulomb constant (k)', '$8.99\\times10^9$ N·m²/C².']
  ],
  formulas: [
    ['Elementary charge', 'e = 1.602\\times10^{-19}\\ \\text{C}', ''], ['Quantization', 'Q = \\pm ne', ''], ['Coulomb’s law', 'F = k\\dfrac{|q_1q_2|}{r^2}', ''], ['Coulomb constant', 'k = \\dfrac{1}{4\\pi\\varepsilon_0} = 8.99\\times10^{9}', 'N·m²/C²'],
    ['Superposition', '\\vec F_{net} = \\sum \\vec F_i', ''], ['Components', 'F_x = F\\cos\\theta,\\ F_y = F\\sin\\theta', '']
  ],
  quiz: [
    { q: 'An object has extra electrons. It is…', o: ['positively charged', 'negatively charged', 'neutral', 'a conductor'], a: 1, why: 'Extra electrons mean net negative charge.' },
    { q: 'The charge of one electron is…', o: ['+1.602×10⁻¹⁹ C', '−1.602×10⁻¹⁹ C', '−9.1×10⁻³¹ C', '+1 C'], a: 1, why: 'Electrons are negative with magnitude $e$.' },
    { q: 'Quantization of charge means charge comes in…', o: ['any value', 'whole multiples of e', 'only positive values', 'only integers of a coulomb'], a: 1, why: '$Q = \\pm ne$.' },
    { q: 'Which material is a good insulator?', o: ['copper', 'silver', 'rubber', 'aluminum'], a: 2, why: 'Rubber holds charge in place.' },
    { q: 'Charging by induction requires…', o: ['touching the charged object', 'no contact with the charged object', 'rubbing', 'a battery'], a: 1, why: 'Induction works from a distance.' },
    { q: 'Two positive charges are brought close. They…', o: ['attract', 'repel', 'do nothing', 'become neutral'], a: 1, why: 'Like charges repel.' },
    { q: 'If the distance between two charges is halved, the force becomes…', o: ['half', 'double', 'four times', 'one quarter'], a: 2, why: '$F\\propto1/r^2$.' },
    { q: 'If both charges are doubled, the force becomes…', o: ['double', 'four times', 'half', 'unchanged'], a: 1, why: 'Force is proportional to $q_1q_2$: $2\\times2 = 4$.' },
    { q: 'Why does a charged comb pick up uncharged paper?', o: ['paper is a conductor', 'polarization of the paper’s atoms', 'gravity', 'magnetism'], a: 1, why: 'The paper’s charges shift slightly so it is attracted.' },
    { q: 'Between an electron and a proton, which force is larger?', o: ['gravity', 'electric force', 'they are equal', 'neither exists'], a: 1, why: 'The electric force is about $10^{39}$ times larger.' },
    { q: 'The unit of the Coulomb constant k is…', o: ['N/C', 'N·m²/C²', 'C/m', 'J/C'], a: 1, why: 'From $F = kq_1q_2/r^2$, $k = F r^2/q^2$.' }
  ],
  problems: [
    { id: 'n', title: 'Number of electrons', gen() { const Q = rf(1, 9, 1); const e = pick([-6, -7, -8, -9]); const q = Q * Math.pow(10, e); const n = q / E; return { prompt: `An object has a charge of ${T(q)} C (a surplus of electrons). How many extra electrons does it carry? Give your answer in scientific notation, like 3.2e12.`, givens: [`Q = ${T(q)}\\ \\text{C}`, `e = 1.602\\times10^{-19}\\ \\text{C}`], answer: n, unit: 'electrons', tol: 0.02, hint: 'n = Q / e.', steps: [{ x: 'Divide by the charge of one electron:', m: `n = \\frac{${T(q)}}{1.602\\times10^{-19}} = ${T(n)}` }] }; } },
    { id: 'coul', title: 'Coulomb force', gen() { const q1 = rint(2, 60); const q2 = rint(2, 60); const r = rf(1, 12, 1); const F = K * q1 * q2 * 1e-18 / Math.pow(r / 100, 2); return { prompt: `Two point charges, ${q1} nC and ${q2} nC (same sign), are ${r} cm apart. What is the magnitude of the force between them? Give your answer in mN.`, givens: [`q_1 = ${q1}\\ \\text{nC},\\ q_2 = ${q2}\\ \\text{nC}`, `r = ${r}\\ \\text{cm}`], answer: F * 1000, unit: 'mN', tol: 0.02, hint: 'Convert nC to C (×10⁻⁹) and cm to m (÷100). Then F = kq₁q₂/r².', steps: [{ x: 'Use Coulomb’s law:', m: `F = (8.99\\times10^9)\\frac{(${q1}\\times10^{-9})(${q2}\\times10^{-9})}{(${r / 100})^2} = ${T(F)}\\ \\text{N} = ${T(F * 1000)}\\ \\text{mN}` }] }; } },
    { id: 'ratio', title: 'Scaling the force', gen() { const F0 = rint(2, 20); const f = pick([2, 3, 4, 5]); return { prompt: `Two charges feel a force of ${F0} N. If the distance between them is multiplied by ${f}, what is the new force?`, givens: [`F_0 = ${F0}\\ \\text{N}`, `r \\to ${f}\\,r`], answer: F0 / (f * f), unit: 'N', tol: 0.02, hint: 'F goes as 1/r².', steps: [{ x: 'Inverse-square law:', m: `F = \\frac{${F0}}{${f}^2} = ${T(F0 / (f * f))}\\ \\text{N}` }] }; } },
    { id: 'line', title: 'Net force on a charge in a line', gen() { const q3 = rint(2, 8); const q1 = rint(1, 6); const q2 = -rint(1, 6); const a = rint(2, 4); const b = a + rint(2, 4); const F1 = -K * q3 * q1 * 1e-18 / Math.pow(a / 100, 2); const F2 = K * q3 * Math.abs(q2) * 1e-18 / Math.pow(b / 100, 2); const net = (F1 + F2) * 1e6; return { prompt: `On the x-axis: q₁ = ${q1} nC at x = ${a} cm and q₂ = ${q2} nC at x = ${b} cm. A charge q₃ = +${q3} nC sits at the origin. Find the net x-force on q₃ in µN. (Positive = toward +x; give a negative number if it points to −x.)`, givens: [`q_1 = +${q1}\\ \\text{nC at}\\ ${a}\\ \\text{cm}`, `q_2 = ${q2}\\ \\text{nC at}\\ ${b}\\ \\text{cm}`, `q_3 = +${q3}\\ \\text{nC at 0}`], answer: net, unit: 'µN', tol: 0.03, hint: 'q₁ repels q₃ (toward −x). q₂ attracts q₃ (toward +x). Add with signs.', steps: [{ x: 'Force from $q_1$ (repulsion, toward −x):', m: `F_1 = -${T(Math.abs(F1) * 1e6)}\\ \\mu\\text{N}` }, { x: 'Force from $q_2$ (attraction, toward +x):', m: `F_2 = +${T(F2 * 1e6)}\\ \\mu\\text{N}` }, { x: 'Net:', m: `F_{net} = ${T(net)}\\ \\mu\\text{N}` }] }; } },
    { id: 'dist', title: 'Find the distance', gen() { const q1 = rint(5, 50); const q2 = rint(5, 50); const r = rf(2, 10, 1); const F = K * q1 * q2 * 1e-18 / Math.pow(r / 100, 2); return { prompt: `Two charges of ${q1} nC and ${q2} nC repel each other with a force of ${T(F)} N. How far apart are they? Give your answer in cm.`, givens: [`q_1 = ${q1}\\ \\text{nC},\\ q_2 = ${q2}\\ \\text{nC}`, `F = ${T(F)}\\ \\text{N}`], answer: r, unit: 'cm', tol: 0.03, hint: 'Solve F = kq₁q₂/r² for r: r = √(kq₁q₂/F).', steps: [{ x: 'Rearrange Coulomb’s law:', m: `r = \\sqrt{\\frac{kq_1q_2}{F}} = ${T(r / 100)}\\ \\text{m} = ${r}\\ \\text{cm}` }] }; } }
  ]
};
