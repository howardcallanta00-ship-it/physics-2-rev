import { rint, rf, pick, T } from '../labs/util.js';

const K = 9.0e9, QE = 1.602e-19, ME = 9.109e-31;

export default {
  id: 'm5', kind: 'module', code: 'M5', title: 'Electric Potential and Potential Difference', tagline: 'Electric energy per charge: what voltage really is',
  formula: 'V = kq/r · ΔV = ΔU/q · W = qΔV',
  objectives: ['Define electric potential energy and electric potential.', 'Compute work done by an electric field and potential differences.', 'Find the potential of one or many point charges.', 'Use equipotential surfaces.'],
  lesson: [
    { t: 'h', x: 'Potential energy in a field' },
    { t: 'p', x: 'Lift a ball and it gains gravitational potential energy $mgh$. A charge in an electric field is similar: the field pushes it, so the charge has **electric potential energy** $U$ that depends on **where** it is.' },
    { t: 'analogy', title: 'A ball on a hill', x: 'A ball high on a hill has more gravitational potential energy and rolls down by itself. A positive charge near a positive source has high electric potential energy and is pushed away by itself. In both cases the work done by the force turns stored energy into motion.', map: [['Height h', 'position in the field'], ['mg (gravity)', 'qE (field force)'], ['Rolling downhill', 'positive charge moving along E']] },
    { t: 'eq', name: 'Work and potential energy', tex: 'W_{a\\to b} = -\\Delta U = U_a - U_b \\qquad W = qE\\,d\\ \\text{(uniform field, along E)}', words: 'The **work done by the electric force** equals the **loss** of potential energy. If the field does positive work, $U$ goes down. If you must push **against** the field, the field does negative work and $U$ goes up.', vars: [['W', 'work done by the field', 'J'], ['\\Delta U', 'change in potential energy', 'J'], ['d', 'distance moved along the field', 'm']] },
    { t: 'key', title: 'Path does not matter', x: 'Only the **start and end points** matter, not the path. The electric force is a **conservative** force.' },
    { t: 'check', q: 'A proton moves in the direction of a uniform electric field. The field does…', o: ['positive work and U decreases', 'negative work and U increases', 'positive work and U increases', 'no work'], a: 0, why: 'The force on a proton is along E, so the field does positive work, and the potential energy drops.' },
    { t: 'h', x: 'Potential energy of point charges' },
    { t: 'eq', name: 'Potential energy of two point charges', tex: 'U = \\frac{k\\,q_1 q_2}{r} \\qquad U = k\\sum_{i<j}\\frac{q_iq_j}{r_{ij}}', words: 'Take $U = 0$ when the charges are infinitely far apart. $U$ is **positive** for like charges (you did work to push them together) and **negative** for opposite charges (they attract, so they are “bound”). For many charges, add up **every pair once**.', vars: [['U', 'potential energy', 'J'], ['r_{ij}', 'distance between charges i and j', 'm']] },
    { t: 'worked', title: 'Example: three charges', steps: [
      { x: '$q_1 = +4.00$ nC at 0, $q_2 = -3.00$ nC at 20.0 cm, $q_3 = +2.00$ nC at 10.0 cm. Sum over the three pairs:' },
      { m: 'U = k\\left[\\frac{q_1q_2}{0.20} + \\frac{q_1q_3}{0.10} + \\frac{q_2q_3}{0.10}\\right] = (9.0\\times10^9)(10^{-18})\\left[-60 + 80 - 60\\right]' },
      { m: 'U = -3.6\\times10^{-7}\\ \\text{J}' }] },
    { t: 'h', x: 'Electric potential and voltage' },
    { t: 'p', x: 'Potential energy depends on the charge. Divide the charge out and you get something that belongs to the **space** itself: the **electric potential** $V$, energy per unit charge. Its unit is the **volt**: $1\\ \\text{V} = 1\\ \\text{J/C}$.' },
    { t: 'eq', name: 'Electric potential', tex: 'V = \\frac{U}{q_0} \\qquad V = \\frac{kq}{r} \\qquad V = k\\left(\\frac{q_1}{r_1} + \\frac{q_2}{r_2} + \\cdots\\right)', words: 'Potential of a point charge is $kq/r$. For several charges, **add the potentials**. Potentials add as plain **numbers** (scalars), not vectors, so just keep the signs: positive charges give positive $V$, negative charges give negative $V$.', vars: [['V', 'electric potential', 'V'], ['q', 'source charge', 'C'], ['r', 'distance from the source', 'm']] },
    { t: 'viz', id: 'potential' },
    { t: 'worked', title: 'Example: potential of a point charge', steps: [
      { x: 'Potential 0.50 m from a +20 µC charge and from a −20 µC charge:' },
      { m: 'V_+ = \\frac{(9.0\\times10^9)(20\\times10^{-6})}{0.50} = +3.6\\times10^{5}\\ \\text{V}' },
      { m: 'V_- = \\frac{(9.0\\times10^9)(-20\\times10^{-6})}{0.50} = -3.6\\times10^{5}\\ \\text{V}' }] },
    { t: 'worked', title: 'Example: two charges, one point', steps: [
      { x: '$q_1 = 2\\times10^{-9}$ C at the origin and $q_2 = 6\\times10^{-9}$ C at (6, 0) cm. Find $V$ at (0, 7) cm.' },
      { x: 'Distances: $r_1 = 0.07$ m, $r_2 = \\sqrt{0.06^2 + 0.07^2} = 0.0922$ m.' },
      { m: 'V = \\frac{(9\\times10^9)(2\\times10^{-9})}{0.07} + \\frac{(9\\times10^9)(6\\times10^{-9})}{0.0922} = 257 + 586 \\approx 843\\ \\text{V}' }] },
    { t: 'h', x: 'Potential difference (voltage)' },
    { t: 'eq', name: 'Potential difference', tex: 'V_{ab} = V_a - V_b = \\frac{W_{a\\to b}}{q_0} = -\\frac{\\Delta U}{q_0}', words: 'The **voltage** between two points is the **work per unit charge** the field does moving a charge from $a$ to $b$. So moving a charge $q$ through a potential difference $\\Delta V$ changes its energy by $q\\Delta V$.', vars: [] },
    { t: 'p', x: 'A **battery** keeps a fixed potential difference between its terminals: the positive terminal is at high potential, the negative at low. This potential difference is what makes charges flow in a circuit.' },
    { t: 'eq', name: 'Energy gained by a charge', tex: 'KE = q\\,\\Delta V \\qquad v = \\sqrt{\\frac{2q\\,\\Delta V}{m}} \\qquad 1\\ \\text{eV} = 1.602\\times10^{-19}\\ \\text{J}', words: 'A charge released from rest and accelerated through a voltage $\\Delta V$ turns all of $q\\Delta V$ into kinetic energy. The **electron-volt** is the energy of one electron moving through 1 volt.', vars: [] },
    { t: 'key', title: 'In a uniform field', x: 'Between two parallel plates separated by $d$ with voltage $V$, the field is $E = V/d$. That is why $E$ is also measured in **V/m**.' },
    { t: 'h', x: 'Equipotential surfaces' },
    { t: 'p', x: 'An **equipotential surface** is a surface on which the potential is the same at every point. Moving a charge along one takes **no work**. Equipotentials are always **perpendicular to the field lines**.' },
    { t: 'worked', title: 'Example: equipotentials of a 4.0 nC charge', steps: [
      { x: 'Radius for a given potential, from $V = kq/r$:', m: 'r = \\frac{kq}{V} = \\frac{(9.0\\times10^9)(4.0\\times10^{-9})}{V} = \\frac{36}{V}' },
      { m: 'V = 10\\ \\text{V}\\Rightarrow r = 3.6\\ \\text{m};\\quad 20\\ \\text{V}\\Rightarrow 1.8\\ \\text{m};\\quad 30\\ \\text{V}\\Rightarrow 1.2\\ \\text{m}' },
      { x: 'They are spherical shells, closer together near the charge, where the field is strongest.' }] }
  ],
  terms: [
    ['Electric potential energy (U)', 'Energy a charge has because of its position in an electric field. Unit: J.'], ['Electric potential (V)', 'Potential energy per unit charge. Unit: volt.'], ['Volt (V)', 'One joule per coulomb.'],
    ['Potential difference (voltage)', 'The difference in potential between two points: the work per unit charge to move between them.'], ['Equipotential surface', 'A surface on which every point has the same potential.'], ['Electron-volt (eV)', 'Energy gained by an electron through 1 V: $1.602\\times10^{-19}$ J.'],
    ['Conservative force', 'A force whose work depends only on the end points.'], ['Scalar', 'A quantity with size but no direction. Potential is a scalar.']
  ],
  formulas: [
    ['Work by field', 'W_{a\\to b} = -\\Delta U', ''], ['Work, uniform field', 'W = qEd', ''], ['Potential energy', 'U = \\dfrac{kq_1q_2}{r}', ''], ['Potential', 'V = \\dfrac{U}{q} = \\dfrac{kq}{r}', 'V'],
    ['Many charges', 'V = k\\sum \\dfrac{q_i}{r_i}', ''], ['Potential difference', 'V_{ab} = \\dfrac{W_{a\\to b}}{q}', ''], ['Uniform field', 'E = \\dfrac{V}{d}', 'V/m'], ['Kinetic energy gain', 'KE = q\\Delta V', '']
  ],
  quiz: [
    { q: 'One volt equals…', o: ['one joule per second', 'one joule per coulomb', 'one coulomb per joule', 'one newton per coulomb'], a: 1, why: '$V = U/q$.' },
    { q: 'Electric potential is…', o: ['a vector', 'a scalar', 'a force', 'a charge'], a: 1, why: 'Potentials add as numbers.' },
    { q: 'The potential of a point charge falls off as…', o: ['1/r²', '1/r', 'r', 'r²'], a: 1, why: '$V = kq/r$.' },
    { q: 'When the electric field does positive work on a charge, its potential energy…', o: ['increases', 'decreases', 'stays the same', 'doubles'], a: 1, why: '$W = -\\Delta U$.' },
    { q: 'Moving a charge along an equipotential surface requires…', o: ['maximum work', 'positive work', 'no work', 'negative work'], a: 2, why: '$\\Delta V = 0$ so $W = q\\Delta V = 0$.' },
    { q: 'Equipotential surfaces are always…', o: ['parallel to the field', 'perpendicular to the field lines', 'curved toward the charge', 'identical to field lines'], a: 1, why: 'Otherwise the field would do work along the surface.' },
    { q: 'The potential 0.5 m from a negative point charge is…', o: ['positive', 'negative', 'zero', 'infinite'], a: 1, why: '$V = kq/r$ with $q<0$.' },
    { q: 'The potential energy of two like charges is…', o: ['negative', 'positive', 'zero', 'infinite'], a: 1, why: '$U = kq_1q_2/r > 0$ for same signs.' },
    { q: 'A proton is accelerated through 100 V from rest. Its kinetic energy is…', o: ['100 eV', '1.6×10⁻¹⁹ J', '1 eV', '100 J'], a: 0, why: '$KE = e\\Delta V = 100$ eV $= 1.6\\times10^{-17}$ J.' },
    { q: 'Between parallel plates 2 cm apart with 100 V across them, E =', o: ['5000 V/m', '200 V/m', '50 V/m', '2 V/m'], a: 0, why: '$E = V/d = 100/0.02 = 5000$ V/m.' }
  ],
  problems: [
    { id: 'v', title: 'Potential of a point charge', gen() { const q = rint(-30, 30) || 5; const r = rf(0.2, 3, 1); const V = K * q * 1e-9 / r; return { prompt: `What is the electric potential ${r} m from a point charge of ${q} nC? (k = 9.0×10⁹) Give your answer in volts (negative if the charge is negative).`, givens: [`q = ${q}\\ \\text{nC}`, `r = ${r}\\ \\text{m}`], answer: V, unit: 'V', tol: 0.02, hint: 'V = kq/r, sign of q included.', steps: [{ x: 'Use $V = kq/r$:', m: `V = (9.0\\times10^9)\\frac{${q}\\times10^{-9}}{${r}} = ${T(V)}\\ \\text{V}` }] }; } },
    { id: 'two', title: 'Potential of two charges', gen() { const q1 = rint(2, 9), q2 = rint(2, 9), d = rf(0.2, 1, 1); const r = d / 2; const V = K * (q1 + q2) * 1e-9 / r; return { prompt: `Two charges, +${q1} nC and +${q2} nC, are ${d} m apart. What is the potential at the midpoint between them? Give your answer in volts.`, givens: [`q_1 = ${q1}\\ \\text{nC},\\ q_2 = ${q2}\\ \\text{nC}`, `r = ${r}\\ \\text{m from each}`], answer: V, unit: 'V', tol: 0.02, hint: 'Add the two potentials, V = kq₁/r + kq₂/r.', steps: [{ x: 'Add the scalars:', m: `V = \\frac{k(q_1 + q_2)}{r} = \\frac{(9.0\\times10^9)(${(q1 + q2)}\\times10^{-9})}{${r}} = ${T(V)}\\ \\text{V}` }] }; } },
    { id: 'u', title: 'Potential energy of two charges', gen() { const q1 = rint(2, 30), q2 = -rint(2, 30), r = rf(1, 10, 1); const U = K * q1 * q2 * 1e-18 / (r / 100); return { prompt: `A +${q1} nC charge and a ${q2} nC charge are ${r} cm apart. What is their electric potential energy? Give your answer in µJ (negative for attraction).`, givens: [`q_1 = ${q1}\\ \\text{nC},\\ q_2 = ${q2}\\ \\text{nC}`, `r = ${r}\\ \\text{cm}`], answer: U * 1e6, unit: 'µJ', tol: 0.02, hint: 'U = kq₁q₂/r, keep the sign.', steps: [{ x: 'Use $U = kq_1q_2/r$:', m: `U = (9.0\\times10^9)\\frac{(${q1}\\times10^{-9})(${q2}\\times10^{-9})}{${r / 100}} = ${T(U * 1e6)}\\ \\mu\\text{J}` }] }; } },
    { id: 'ke', title: 'Speed of an accelerated electron', gen() { const V = rint(50, 900); const v = Math.sqrt(2 * QE * V / ME); return { prompt: `An electron starts from rest and is accelerated through a potential difference of ${V} V. What is its final speed? (e = 1.602×10⁻¹⁹ C, m = 9.109×10⁻³¹ kg) Give your answer in m/s.`, givens: [`\\Delta V = ${V}\\ \\text{V}`], answer: v, unit: 'm/s', tol: 0.02, hint: '½mv² = eΔV, so v = √(2eΔV/m).', steps: [{ x: 'Energy conservation:', m: `v = \\sqrt{\\frac{2(1.602\\times10^{-19})(${V})}{9.109\\times10^{-31}}} = ${T(v)}\\ \\text{m/s}` }] }; } },
    { id: 'plates', title: 'Field between plates', gen() { const V = rint(10, 500); const d = rf(0.5, 5, 1); const E = V / (d / 100); return { prompt: `A potential difference of ${V} V is applied across parallel plates ${d} cm apart. What is the electric field between them? Give your answer in V/m.`, givens: [`V = ${V}\\ \\text{V}`, `d = ${d}\\ \\text{cm}`], answer: E, unit: 'V/m', tol: 0.02, hint: 'E = V/d, with d in metres.', steps: [{ x: 'Convert cm to m, then $E = V/d$:', m: `E = \\frac{${V}}{${d / 100}} = ${T(E)}\\ \\text{V/m}` }] }; } }
  ]
};
