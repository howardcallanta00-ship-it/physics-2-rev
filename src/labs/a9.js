import { rint, rf, pick, sig, T } from './util.js';

export default {
  id: 'a9', code: 'A9', title: "Kirchhoff's Laws", tagline: 'Charge and energy bookkeeping for any circuit',
  formula: 'ΣI = 0 · ΣV = 0',
  objectives: ['Verify Kirchhoff’s current law (KCL).', 'Verify Kirchhoff’s voltage law (KVL).'],
  lesson: [
    { t: 'h', x: 'Why we need Kirchhoff' },
    { t: 'p', x: 'Ohm’s law is not enough for circuits with several loops and power sources. In 1845 the German scientist Gustav Kirchhoff gave two rules that work for **any** circuit. They are really two conservation laws: **charge** is conserved, and **energy** is conserved.' },
    { t: 'h', x: 'Law 1: Kirchhoff’s current law (KCL)' },
    { t: 'key', title: 'KCL (junction rule)', x: 'The total current **entering** a junction (node) equals the total current **leaving** it. Charge cannot pile up at a junction.' },
    { t: 'eq', name: 'Kirchhoff’s current law', tex: '\\sum I = 0 \\qquad\\text{or}\\qquad \\sum I_{\\text{in}} = \\sum I_{\\text{out}}', words: 'Count current **into** the node as positive and current **out of** it as negative. They must add up to zero.', vars: [['I_{\\text{in}}', 'currents flowing toward the node', 'A'], ['I_{\\text{out}}', 'currents flowing away from the node', 'A']] },
    { t: 'analogy', title: 'A pipe junction', x: 'Water in a pipe junction cannot be stored in the junction. If 5 litres per second flow in from one pipe and 2 L/s leave through the first branch, the other branch must carry 3 L/s.', map: [['Water flow', 'current'], ['Pipe junction', 'node'], ['2 L/s out + 3 L/s out = 5 L/s in', '$I_2 + I_3 = I_1$']] },
    { t: 'viz', id: 'kcl' },
    { t: 'h', x: 'Law 2: Kirchhoff’s voltage law (KVL)' },
    { t: 'key', title: 'KVL (loop rule)', x: 'Going once around **any closed loop**, the voltage gains and drops add up to **zero**. You end where you started, so the net change in electric potential must be zero.' },
    { t: 'eq', name: 'Kirchhoff’s voltage law', tex: '\\sum V = 0 \\qquad\\text{i.e.}\\qquad \\sum V_{\\text{gain}} + \\sum V_{\\text{drop}} = 0', words: 'Add the climbs (sources, positive) and the slides (resistors, negative) around the loop. The total is zero. Equivalent to “the sum of drops equals the sum of gains”.', vars: [['V_{\\text{gain}}', 'rises in potential (positive)', 'V'], ['V_{\\text{drop}}', 'falls in potential (negative)', 'V']] },
    { t: 'analogy', title: 'A roller-coaster loop', x: 'A cart is lifted up a hill (the battery), slides down in steps (the resistors) and arrives back at the start. The total height gained equals the total height lost, otherwise the cart would not return to the same spot.', map: [['Lift hill', 'battery (+ε)'], ['Downhill slides', 'drops across resistors (−IR)'], ['Back to start', 'ΣV = 0']] },
    { t: 'viz', id: 'kvl' },
    { t: 'h', x: 'The sign rules (learn these!)' },
    { t: 'p', x: 'Pick a **direction of travel** around the loop. Then for each element you cross:' },
    { t: 'table', head: ['You cross…', 'Direction', 'Potential change'], rows: [
      ['A resistor', 'in the **same** direction as the current', '$-IR$ (a **drop**)'],
      ['A resistor', 'in the **opposite** direction to the current', '$+IR$ (a **gain**)'],
      ['A source of emf', 'from **− to +**', '$+\\varepsilon$ (a gain)'],
      ['A source of emf', 'from **+ to −**', '$-\\varepsilon$ (a drop)']] },
    { t: 'warn', title: 'Common mistake', x: 'If your solved current comes out **negative**, it simply means the real current flows opposite to the direction you guessed. Keep the algebra and the sign: do not “fix” it by dropping the minus.' },
    { t: 'h', x: 'The lab circuit' },
    { t: 'p', x: 'The lab circuit has two supplies ($\\varepsilon_1 = 8$ V and $\\varepsilon_2 = 6$ V) and three resistors. $R_2$ is the shared middle branch, so there are two loops: Loop 1 (with $\\varepsilon_1$, $R_1$, $R_2$) and Loop 2 (with $\\varepsilon_2$, $R_3$, $R_2$).' },
    { t: 'note', title: 'Assumption in this walkthrough', x: 'Your sheet’s Figure 9.1 is a picture, so this lesson assumes $R_1 = 100\\ \\Omega$, $R_2 = 47\\ \\Omega$, $R_3 = 100\\ \\Omega$ (the three resistors listed in the materials), and that both sources push current up through $R_2$. Check the figure for your exact layout. The method is the same.' },
    { t: 'worked', title: 'Worked example: two-loop circuit', steps: [
      { x: 'Let $I_1$ go through $R_1$, $I_3$ through $R_3$, and $I_2$ down through $R_2$. **KCL at the top node:**', m: 'I_2 = I_1 + I_3' },
      { x: '**KVL, Loop 1:**', m: '+8 - 100\\,I_1 - 47\\,I_2 = 0' },
      { x: '**KVL, Loop 2:**', m: '+6 - 100\\,I_3 - 47\\,I_2 = 0' },
      { x: 'Substitute $I_2 = I_1 + I_3$:', m: '147\\,I_1 + 47\\,I_3 = 8 \\qquad 47\\,I_1 + 147\\,I_3 = 6' },
      { x: 'Solve the pair (Cramer’s rule, determinant $147^2 - 47^2 = 19\\,400$):', m: 'I_1 = \\frac{8(147) - 47(6)}{19400} = 0.0461\\ \\text{A},\\quad I_3 = \\frac{147(6) - 47(8)}{19400} = 0.0261\\ \\text{A}' },
      { x: 'Then:', m: 'I_2 = 0.0461 + 0.0261 = 0.0722\\ \\text{A}' },
      { x: 'Voltage drops: $V_1 = 4.61$ V, $V_2 = 3.39$ V, $V_3 = 2.61$ V.' },
      { x: 'Check KVL, Loop 1: $8 - 4.61 - 3.39 = 0$ ✓. Loop 2: $6 - 2.61 - 3.39 = 0$ ✓.' }
    ] },
    { t: 'lab', x: 'Measure with the ammeter **in series** with each resistor, and the voltmeter **in parallel** with each component. Your measured sums will not be exactly zero. Small leftovers come from meter error and wire resistance.' },
    { t: 'check', q: 'At a node, 5 A flows in on one wire and 2 A flows out on another. How much current flows out on the third wire?', o: ['2 A', '3 A', '5 A', '7 A'], a: 1, why: 'KCL: $5 = 2 + I$, so $I = 3$ A.' },
    { t: 'h', x: 'Single-loop example for your guide questions' },
    { t: 'worked', title: 'A 12 V battery, 100 Ω and 220 Ω in one loop', steps: [
      { x: 'Travel around the loop in the direction of the current. Climb the battery, drop across each resistor:', m: '+12 - I(100) - I(220) = 0' },
      { x: 'Solve:', m: 'I = \\frac{12}{320} = 0.0375\\ \\text{A}' },
      { x: 'Potential differences:', m: 'V_{100} = 3.75\\ \\text{V},\\quad V_{220} = 8.25\\ \\text{V}' }
    ] },
    { t: 'key', title: 'Guide question 1', x: 'KCL: the sum of currents entering a node equals the sum leaving it ($\\sum I = 0$). KVL: the sum of the potential changes around any closed loop is zero ($\\sum V = 0$).' }
  ],
  terms: [
    ['Kirchhoff’s current law (KCL)', 'The total current into a node equals the total current out. $\\sum I = 0$.'],
    ['Kirchhoff’s voltage law (KVL)', 'The sum of potential changes around a closed loop is zero. $\\sum V = 0$.'],
    ['Node (junction)', 'A point where three or more conductors meet.'],
    ['Loop', 'Any closed path through a circuit.'],
    ['Branch', 'A path between two nodes containing one or more elements.'],
    ['EMF (ε)', 'The voltage a source supplies; the potential rise it gives to charges.'],
    ['Potential drop', 'A fall in potential across a resistor, $-IR$ when traversed along the current.'],
    ['Potential gain', 'A rise in potential, such as crossing a source from − to +.'],
    ['Conservation of charge', 'The principle behind KCL.'],
    ['Conservation of energy', 'The principle behind KVL.'],
    ['Sign convention', 'The rule telling whether to count a voltage or current as positive or negative.']
  ],
  formulas: [
    ['KCL', '\\sum I = 0', 'In = out at a node'],
    ['KVL', '\\sum V = 0', 'Around a closed loop'],
    ['Resistor, along current', '\\Delta V = -IR', 'Drop'],
    ['Resistor, against current', '\\Delta V = +IR', 'Gain'],
    ['Source, − to +', '\\Delta V = +\\varepsilon', 'Gain'],
    ['Source, + to −', '\\Delta V = -\\varepsilon', 'Drop']
  ],
  quiz: [
    { q: 'KCL is a statement of conservation of…', o: ['energy', 'charge', 'momentum', 'mass'], a: 1, why: 'Charge cannot accumulate at a junction.' },
    { q: 'KVL is a statement of conservation of…', o: ['energy', 'charge', 'current', 'resistance'], a: 0, why: 'Net energy change around a closed loop is zero.' },
    { q: 'A node has 4 A and 3 A entering. The current leaving is…', o: ['1 A', '7 A', '12 A', '0 A'], a: 1, why: 'Out = in = 7 A.' },
    { q: 'Crossing a resistor in the SAME direction as the current gives…', o: ['$+IR$', '$-IR$', '$+\\varepsilon$', '0'], a: 1, why: 'Current flows from high to low potential, so it is a drop.' },
    { q: 'Crossing a source of emf from − to + gives…', o: ['$+\\varepsilon$', '$-\\varepsilon$', '$+IR$', '0'], a: 0, why: 'A potential gain.' },
    { q: 'Around a closed loop, the sum of all potential changes is…', o: ['the emf', 'zero', 'the total resistance', 'always positive'], a: 1, why: 'KVL.' },
    { q: 'You solve a circuit and get $I_2 = -0.02$ A. What does it mean?', o: ['The solution is wrong', 'The current flows opposite to the assumed direction', 'No current flows', 'The resistor is broken'], a: 1, why: 'Negative just means the real direction is opposite to your guess.' },
    { q: 'In the lab, the ammeter measuring a resistor’s current is connected…', o: ['in parallel', 'in series', 'across the supply', 'in the ground'], a: 1, why: 'Current must flow through the ammeter.' },
    { q: 'Which equation is KCL at the top node with $I_1$, $I_3$ in and $I_2$ out?', o: ['$I_2 = I_1 + I_3$', '$I_2 = I_1 - I_3$', '$I_1 = I_2 + I_3$', '$I_1 + I_2 + I_3 = 0$ with all positive'], a: 0, why: 'In = out: $I_1 + I_3 = I_2$.' },
    { q: 'A 12 V source drives 100 Ω + 220 Ω in series. The voltage across the 220 Ω is…', o: ['3.75 V', '8.25 V', '12 V', '4 V'], a: 1, why: '$I = 12/320 = 0.0375$ A, $V = 0.0375 \\times 220 = 8.25$ V.' }
  ],
  problems: [
    { id: 'kcl', title: 'Missing current at a node', gen() {
      const i1 = rint(2, 9); const i2 = rint(1, i1 - 1); const i3 = rint(1, 4); const out = i1 + i3 - i2;
      return { prompt: `At a node, ${i1} A and ${i3} A flow in. One wire carries ${i2} A out. How much current leaves on the remaining wire?`, givens: [`I_{\\text{in}} = ${i1} + ${i3}\\ \\text{A}`, `I_{\\text{out},1} = ${i2}\\ \\text{A}`], answer: out, unit: 'A', tol: 0.01, hint: 'Total in = total out.', steps: [{ x: 'KCL:', m: `${i1} + ${i3} = ${i2} + I \\Rightarrow I = ${out}\\ \\text{A}` }] };
    } },
    { id: 'kvl1', title: 'Single loop with one source', gen() {
      const e = pick([6, 9, 12]); const r1 = pick([47, 100, 150, 220]); const r2 = pick([100, 220, 330]); const I = e / (r1 + r2);
      return { prompt: `A ${e} V battery drives a loop containing ${r1} Ω and ${r2} Ω resistors. Use KVL to find the current. Give your answer in mA.`, givens: [`\\varepsilon = ${e}\\ \\text{V}`, `R_1 = ${r1}\\ \\Omega,\\ R_2 = ${r2}\\ \\Omega`], answer: I * 1000, unit: 'mA', tol: 0.02, hint: '+ε − IR₁ − IR₂ = 0.', steps: [{ x: 'KVL around the loop:', m: `+${e} - I(${r1}) - I(${r2}) = 0` }, { x: 'Solve:', m: `I = \\frac{${e}}{${r1 + r2}} = ${T(I * 1000)}\\ \\text{mA}` }] };
    } },
    { id: 'kvl2', title: 'Two opposing sources', gen() {
      const e1 = pick([9, 12]); const e2 = pick([3, 4.5, 6]); const r = pick([100, 150, 220]); const r2 = pick([47, 100]); const I = (e1 - e2) / (r + r2);
      return { prompt: `Two batteries ε₁ = ${e1} V and ε₂ = ${e2} V are connected in one loop so they OPPOSE each other, with ${r} Ω and ${r2} Ω resistors in series. What is the current? Give your answer in mA.`, givens: [`\\varepsilon_1 = ${e1}\\ \\text{V},\\ \\varepsilon_2 = ${e2}\\ \\text{V}`, `R_1 = ${r}\\ \\Omega,\\ R_2 = ${r2}\\ \\Omega`], answer: I * 1000, unit: 'mA', tol: 0.02, hint: 'Opposing sources: net emf is the difference.', steps: [{ x: 'KVL with opposing sources:', m: `+${e1} - ${e2} - I(${r}) - I(${r2}) = 0` }, { x: 'Solve:', m: `I = \\frac{${e1} - ${e2}}{${r + r2}} = ${T(I * 1000)}\\ \\text{mA}` }] };
    } },
    { id: 'twoloop', title: 'Current in the shared branch (two-loop circuit)', gen() {
      const e1 = pick([6, 8, 9, 10]); const e2 = pick([4, 5, 6]); const r1 = pick([47, 100]); const r2 = pick([47, 100, 150]); const r3 = pick([47, 100]);
      // loop1: e1 = r1 I1 + r2 (I1+I3) ; loop2: e2 = r3 I3 + r2 (I1+I3)
      const a11 = r1 + r2, a12 = r2, a21 = r2, a22 = r3 + r2; const det = a11 * a22 - a12 * a21;
      const I1 = (e1 * a22 - a12 * e2) / det; const I3 = (a11 * e2 - a21 * e1) / det; const I2 = I1 + I3;
      return { prompt: `Two sources ε₁ = ${e1} V and ε₂ = ${e2} V drive current up through a shared middle resistor R₂ = ${r2} Ω. R₁ = ${r1} Ω is in series with ε₁ and R₃ = ${r3} Ω with ε₂. Find the current I₂ through R₂ (in mA).`, givens: [`\\varepsilon_1 = ${e1},\\ \\varepsilon_2 = ${e2}\\ \\text{V}`, `R_1 = ${r1},\\ R_2 = ${r2},\\ R_3 = ${r3}\\ \\Omega`], answer: I2 * 1000, unit: 'mA', tol: 0.02, hint: 'Use I₂ = I₁ + I₃ and KVL for each loop, then solve the two equations.',
        steps: [{ x: 'KCL:', m: 'I_2 = I_1 + I_3' }, { x: 'Loop equations:', m: `${a11}\\,I_1 + ${a12}\\,I_3 = ${e1}\\qquad ${a21}\\,I_1 + ${a22}\\,I_3 = ${e2}` }, { x: 'Solve:', m: `I_1 = ${T(I1 * 1000)}\\ \\text{mA},\\quad I_3 = ${T(I3 * 1000)}\\ \\text{mA}` }, { x: 'Then:', m: `I_2 = ${T(I2 * 1000)}\\ \\text{mA}` }] };
    } }
  ]
};
