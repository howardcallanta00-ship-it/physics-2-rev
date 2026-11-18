import { rint, rf, pick, T } from '../labs/util.js';

const K = 9.0e9, QE = 1.602e-19, ME = 9.109e-31;

export default {
  id: 'm4', kind: 'module', code: 'M4', title: 'Electric Field', tagline: 'The invisible region where charges push and pull',
  formula: 'E = F/q · E = kq/r² · F = qE',
  objectives: ['Define the electric field and state its direction.', 'Draw and read electric field lines, including dipoles.', 'Find the field of one or several point charges.', 'Describe how a charge moves in a uniform electric field.'],
  lesson: [
    { t: 'h', x: 'A field is a region of influence' },
    { t: 'p', x: 'Coulomb’s law says charges push on each other, but how does a charge “know” another one is there? The answer: every charge changes the space around it. That change is the **electric field**. A second charge placed in this space feels a force from the **field**, not directly from the first charge. A charge makes its field all by itself, even when nothing else is near.' },
    { t: 'analogy', title: 'A hill’s slope', x: 'A hill has a slope at every point, even if no ball is on it. Place a ball anywhere and the slope tells you which way it rolls and how hard. The electric field is like the slope of an invisible hill: at every point it tells you the push that a charge would feel.', map: [['Slope at a point', 'electric field E'], ['The ball', 'test charge q₀'], ['Steeper slope', 'stronger field']] },
    { t: 'h', x: 'Definition of the electric field' },
    { t: 'eq', name: 'Electric field', tex: '\\vec E = \\frac{\\vec F}{q_0}', words: 'The field is the **force per unit positive test charge**. Put a small positive charge at a point, measure the force on it and divide by the charge. The direction of $\\vec E$ is the direction of the force on a **positive** charge.', vars: [['E', 'electric field', 'N/C'], ['F', 'force on the test charge', 'N'], ['q_0', 'small positive test charge', 'C']] },
    { t: 'eq', name: 'Force on a charge in a field', tex: '\\vec F = q\\vec E', words: 'Once you know $E$, the force on **any** charge $q$ is just $qE$. For a **positive** charge the force points **with** the field. For a **negative** charge it points **against** the field.', vars: [] },
    { t: 'worked', title: 'Example', steps: [
      { x: 'A test charge of $3.0\\times10^{-8}$ C feels a force of $6.0\\times10^{-8}$ N. Find the force per coulomb:', m: 'E = \\frac{F}{q_0} = \\frac{6.0\\times10^{-8}}{3.0\\times10^{-8}} = 2.0\\ \\text{N/C}' },
      { x: 'What force would a $12\\times10^{-8}$ C charge feel in the same place?', m: 'F = qE = (12\\times10^{-8})(2.0) = 24\\times10^{-8}\\ \\text{N}' }] },
    { t: 'h', x: 'Field of a point charge' },
    { t: 'p', x: 'Put the test charge at distance $r$ from a source charge $q$ and apply Coulomb’s law. The test charge cancels out:' },
    { t: 'eq', name: 'Field of a point charge', tex: 'E = k\\,\\frac{|q|}{r^{2}}', words: 'The field is **stronger for bigger charges** and **gets weaker with the square of the distance**. It points **away from** a positive source and **toward** a negative source.', vars: [['k', 'Coulomb constant, 9.0×10⁹', 'N·m²/C²'], ['q', 'source charge', 'C'], ['r', 'distance from the source', 'm']] },
    { t: 'worked', title: 'Example', steps: [
      { x: 'Field 2.0 m from a 4.0 nC charge:', m: 'E = (9.0\\times10^{9})\\frac{4.0\\times10^{-9}}{(2.0)^2} = 9.0\\ \\text{N/C}' },
      { x: 'What charge makes a field of 5 N/C at 150 cm?', m: 'q = \\frac{Er^2}{k} = \\frac{(5)(1.5)^2}{9.0\\times10^9} = 1.25\\times10^{-9}\\ \\text{C}' }] },
    { t: 'h', x: 'Several charges: add the fields' },
    { t: 'p', x: 'The total field is the **vector sum** of the field from each charge: $\\vec E_{net} = \\vec E_1 + \\vec E_2 + \\cdots$. Draw the direction of each field first (away from +, toward −), then add with signs.' },
    { t: 'worked', title: 'Example: midway between two negative charges', steps: [
      { x: '$q_1 = -5.00$ nC and $q_2 = -3.00$ nC are 1.5 m apart. Find the field at the midpoint, 0.75 m from each.' },
      { x: 'Both are negative, so each field points **toward** its own charge. Take right as +:', m: 'E_1 = (9.0\\times10^9)\\frac{5.00\\times10^{-9}}{0.75^2} = 80\\ \\text{N/C (left)}' },
      { m: 'E_2 = (9.0\\times10^9)\\frac{3.00\\times10^{-9}}{0.75^2} = 48\\ \\text{N/C (right)}' },
      { x: 'Add with signs:', m: 'E = -80 + 48 = -32\\ \\text{N/C}' },
      { x: 'The field is **32 N/C to the left**.' }] },
    { t: 'viz', id: 'efield' },
    { t: 'h', x: 'Field lines' },
    { t: 'p', x: 'Michael Faraday invented **field lines** as a way to draw the field. A field line is an imaginary curve whose **tangent** at any point points in the direction of $\\vec E$ there.' },
    { t: 'ul', x: ['The field is **tangent** to the line at every point.', 'Where lines are **closer together**, the field is **stronger**.', 'Lines **start on positive** charges and **end on negative** charges. More charge means more lines.', 'Field lines **never cross**: the field cannot point two ways at once.'] },
    { t: 'note', title: 'Electric dipole', x: 'Two equal charges of opposite sign make an **electric dipole**. The lines curve from the positive charge to the negative one. For two equal **positive** charges the lines push away from each other and there is a point between them where the field is zero.' },
    { t: 'check', q: 'A student draws field lines that cross each other at one point. What is wrong?', o: ['Nothing; lines can cross', 'The field would have two directions at that point', 'The lines are too close', 'They should be straight'], a: 1, why: 'At any point the field has only one direction, so field lines can never cross.' },
    { t: 'h', x: 'A charge moving in a uniform field' },
    { t: 'p', x: 'In a uniform field (like between two charged plates), the force $F = qE$ is constant, so the charge has constant acceleration. Then ordinary kinematics applies:' },
    { t: 'eq', name: 'Motion in a uniform field', tex: 'a = \\frac{qE}{m} \\qquad v^2 = v_0^2 + 2ad \\qquad d = v_0 t + \\tfrac12 a t^2', words: 'Find the force $qE$, then $a = F/m$, then use the equations of motion. A **proton** accelerates **along** $\\vec E$. An **electron** accelerates **opposite** to $\\vec E$ and, being much lighter, accelerates far more.', vars: [['m', 'mass of the particle', 'kg']] },
    { t: 'worked', title: 'Example: an electron in a field', steps: [
      { x: 'An electron starts from rest in a uniform field of $1.0\\times10^{3}$ N/C. Its acceleration:', m: 'a = \\frac{eE}{m} = \\frac{(1.602\\times10^{-19})(1.0\\times10^{3})}{9.11\\times10^{-31}} = 1.76\\times10^{14}\\ \\text{m/s}^2' },
      { x: 'The electron accelerates against the field direction (the force on a negative charge is opposite to $\\vec E$).' }] }
  ],
  terms: [
    ['Electric field', 'The region around a charge where other charges feel a force. $E = F/q_0$.'], ['Test charge', 'A small positive charge used to probe a field.'], ['Field line', 'An imaginary curve tangent to the field direction.'],
    ['Electric dipole', 'Two equal and opposite charges close together.'], ['Uniform field', 'A field with the same size and direction everywhere.'], ['Source charge', 'The charge that creates the field.'],
    ['Net electric field', 'The vector sum of the fields from every charge.'], ['N/C', 'Unit of electric field, newtons per coulomb (same as V/m).']
  ],
  formulas: [
    ['Definition of E', 'E = \\dfrac{F}{q_0}', 'N/C'], ['Force in a field', 'F = qE', ''], ['Point charge field', 'E = \\dfrac{kq}{r^2}', ''], ['Net field', '\\vec E_{net} = \\sum \\vec E_i', ''], ['Acceleration', 'a = \\dfrac{qE}{m}', '']
  ],
  quiz: [
    { q: 'The direction of the electric field at a point is the direction of the force on…', o: ['a negative test charge', 'a positive test charge', 'a neutral particle', 'an electron'], a: 1, why: 'By definition, on a positive test charge.' },
    { q: 'The unit of electric field is…', o: ['N·C', 'N/C', 'C/N', 'J/C·m²'], a: 1, why: '$E = F/q$.' },
    { q: 'The field of a point charge is…', o: ['proportional to r', 'proportional to 1/r', 'proportional to 1/r²', 'independent of r'], a: 2, why: '$E = kq/r^2$.' },
    { q: 'Electric field lines…', o: ['end on positive charges', 'start on positive charges', 'can cross', 'are always straight'], a: 1, why: 'Lines leave positive charges and enter negative charges.' },
    { q: 'Where the field lines are crowded, the field is…', o: ['weaker', 'stronger', 'zero', 'uniform'], a: 1, why: 'Closer lines mean a stronger field.' },
    { q: 'A negative charge is placed in a field pointing east. The force on it points…', o: ['east', 'west', 'north', 'there is no force'], a: 1, why: 'Force on a negative charge is opposite to the field.' },
    { q: 'If the distance from a point charge is doubled, the field becomes…', o: ['half', 'double', 'one quarter', 'four times'], a: 2, why: 'Inverse-square.' },
    { q: 'An electric dipole consists of…', o: ['two equal positive charges', 'two equal and opposite charges', 'one charge and a magnet', 'two neutral objects'], a: 1, why: 'Equal magnitude, opposite sign.' },
    { q: 'Compared with a proton in the same field, an electron has…', o: ['the same acceleration', 'a smaller acceleration', 'a much larger acceleration', 'zero acceleration'], a: 2, why: 'Same force size, but the electron’s mass is about 1800 times smaller.' },
    { q: 'Between two positive charges of equal size, the midpoint field is…', o: ['zero', 'pointing toward one charge', 'double one charge’s field', 'infinite'], a: 0, why: 'Equal fields point in opposite directions and cancel.' }
  ],
  problems: [
    { id: 'def', title: 'Field from force', gen() { const q = rint(2, 30); const F = rint(2, 90); const E = F / q; return { prompt: `A test charge of ${q}×10⁻⁸ C feels a force of ${F}×10⁻⁸ N. What is the electric field there? Give your answer in N/C.`, givens: [`q_0 = ${q}\\times10^{-8}\\ \\text{C}`, `F = ${F}\\times10^{-8}\\ \\text{N}`], answer: E, unit: 'N/C', tol: 0.02, hint: 'E = F / q₀. The powers of ten cancel.', steps: [{ x: 'Divide:', m: `E = \\frac{${F}\\times10^{-8}}{${q}\\times10^{-8}} = ${T(E)}\\ \\text{N/C}` }] }; } },
    { id: 'pt', title: 'Field of a point charge', gen() { const q = rint(1, 50); const r = rf(0.5, 5, 1); const E = K * q * 1e-9 / (r * r); return { prompt: `What is the electric field magnitude ${r} m from a point charge of ${q} nC? (k = 9.0×10⁹ N·m²/C²) Give your answer in N/C.`, givens: [`q = ${q}\\ \\text{nC}`, `r = ${r}\\ \\text{m}`], answer: E, unit: 'N/C', tol: 0.02, hint: 'E = kq/r², with q in coulombs.', steps: [{ x: 'Use $E = kq/r^2$:', m: `E = (9.0\\times10^9)\\frac{${q}\\times10^{-9}}{(${r})^2} = ${T(E)}\\ \\text{N/C}` }] }; } },
    { id: 'force', title: 'Force on a charge in a field', gen() { const E = rint(200, 5000); const q = rint(1, 40); const F = E * q * 1e-6; return { prompt: `A ${q} µC charge sits in a uniform electric field of ${E} N/C. What force does it feel? Give your answer in mN.`, givens: [`q = ${q}\\ \\mu\\text{C}`, `E = ${E}\\ \\text{N/C}`], answer: F * 1000, unit: 'mN', tol: 0.02, hint: 'F = qE. 1 µC = 10⁻⁶ C.', steps: [{ x: 'Use $F = qE$:', m: `F = (${q}\\times10^{-6})(${E}) = ${T(F)}\\ \\text{N} = ${T(F * 1000)}\\ \\text{mN}` }] }; } },
    { id: 'mid', title: 'Field between two charges', gen() { const q1 = rint(2, 9); const q2 = rint(1, q1 - 1 || 1); const d = rf(1, 3, 1); const r = d / 2; const E1 = K * q1 * 1e-9 / (r * r), E2 = K * q2 * 1e-9 / (r * r); return { prompt: `Two negative charges, −${q1} nC and −${q2} nC, are ${d} m apart. Find the magnitude of the electric field exactly midway between them, in N/C.`, givens: [`q_1 = -${q1}\\ \\text{nC},\\ q_2 = -${q2}\\ \\text{nC}`, `r = ${r}\\ \\text{m from each}`], answer: Math.abs(E1 - E2), unit: 'N/C', tol: 0.03, hint: 'The two fields point in opposite directions (each toward its own charge). Subtract.', steps: [{ x: 'Field from each:', m: `E_1 = ${T(E1)},\\quad E_2 = ${T(E2)}\\ \\text{N/C}` }, { x: 'Opposite directions, so subtract:', m: `E = |${T(E1)} - ${T(E2)}| = ${T(Math.abs(E1 - E2))}\\ \\text{N/C}` }] }; } },
    { id: 'acc', title: 'Acceleration of an electron', gen() { const E = rint(5, 90) * 100; const a = QE * E / ME; return { prompt: `An electron is placed in a uniform electric field of ${E} N/C. What is the magnitude of its acceleration? Give your answer in m/s² (scientific notation like 1.8e14 is fine).`, givens: [`E = ${E}\\ \\text{N/C}`, `e = 1.602\\times10^{-19},\\ m = 9.109\\times10^{-31}`], answer: a, unit: 'm/s²', tol: 0.02, hint: 'a = eE/m.', steps: [{ x: 'Use $a = qE/m$:', m: `a = \\frac{(1.602\\times10^{-19})(${E})}{9.109\\times10^{-31}} = ${T(a)}\\ \\text{m/s}^2` }] }; } }
  ]
};
