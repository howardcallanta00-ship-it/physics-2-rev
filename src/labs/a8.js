import { rint, rf, pick, sig, T, parallel } from './util.js';

const RV = [47, 100, 150, 220, 330, 470];

export default {
  id: 'a8', code: 'A8', title: 'Resistors in Series and Parallel', tagline: 'One road versus many roads',
  formula: 'R_T = R₁ + R₂ · 1/R_T = Σ 1/Rₙ',
  objectives: ['Find the total resistance of series and parallel resistors.', 'Relate the total current to the individual currents.', 'Relate the total voltage to the individual voltages.'],
  lesson: [
    { t: 'h', x: 'Two ways to connect components' },
    { t: 'p', x: 'There are only two basic ways to join components. In a **series** circuit the current has **one path**. In a **parallel** circuit the current has **more than one path**. Everything else (including a “series-parallel” circuit) is a mix of the two.' },
    { t: 'analogy', title: 'Roads and toll gates', x: 'Resistors are toll gates. In **series** the cars pass gate after gate on one road: every car goes through every gate, and each gate takes a share of the total push. In **parallel** there are several roads, each with one gate. Traffic splits across the roads, and each road gets the full push.', map: [['Cars per second', 'current'], ['Push from the pump', 'voltage'], ['A toll gate', 'resistor'], ['One road', 'series'], ['Several roads', 'parallel']] },
    { t: 'viz', id: 'network' },
    { t: 'h', x: 'Series circuits' },
    { t: 'p', x: 'With one path, the same charge has to pass through every resistor, so:' },
    { t: 'eq', name: 'Series rules', tex: 'R_T = R_1 + R_2 + \\cdots + R_n \\qquad I_T = I_1 = I_2 = \\cdots \\qquad V_T = V_1 + V_2 + \\cdots', words: '**Resistances add up** (more gates, more resistance). **Current is the same** everywhere (one road). **Voltage is shared** (each gate uses up some of the push).',
      vars: [['R_T', 'total (equivalent) resistance', 'Ω'], ['I_T', 'total current, same through each resistor', 'A'], ['V_T', 'supply voltage = sum of the drops', 'V']] },
    { t: 'key', title: 'Adding a resistor in series…', x: 'makes the total resistance **bigger** and the total current **smaller**.' },
    { t: 'worked', title: 'Worked example: 100 Ω + 47 Ω + 100 Ω in series at 10 V', steps: [
      { x: 'Total resistance:', m: 'R_T = 100 + 47 + 100 = 247\\ \\Omega' },
      { x: 'Total current (same everywhere):', m: 'I_T = \\frac{V_T}{R_T} = \\frac{10}{247} = 0.0405\\ \\text{A} = 40.5\\ \\text{mA}' },
      { x: 'Voltage across each resistor, $V = IR$:', m: 'V_1 = (0.0405)(100) = 4.05\\ \\text{V},\\quad V_2 = (0.0405)(47) = 1.90\\ \\text{V},\\quad V_3 = 4.05\\ \\text{V}' },
      { x: 'Check: $4.05 + 1.90 + 4.05 = 10.0$ V ✓' }
    ] },
    { t: 'h', x: 'Parallel circuits' },
    { t: 'p', x: 'Every branch connects across the same two points, so each branch sees the **same voltage**. The current splits, and the splits add back up to the total.' },
    { t: 'eq', name: 'Parallel rules', tex: '\\frac{1}{R_T} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\cdots \\qquad I_T = I_1 + I_2 + \\cdots \\qquad V_T = V_1 = V_2 = \\cdots', words: 'Add the **reciprocals** of the resistances to get the reciprocal of the total. **Currents add**. **Voltage is the same** across each branch.',
      vars: [['1/R_T', 'reciprocal of total resistance', '1/Ω'], ['I_T', 'total current = sum of branch currents', 'A']] },
    { t: 'key', title: 'Adding a resistor in parallel…', x: 'makes the total resistance **smaller** than the smallest branch (more roads, easier traffic) and the total current **larger**.' },
    { t: 'note', title: 'Shortcuts', x: 'For **two** resistors: $R_T = \\dfrac{R_1R_2}{R_1+R_2}$ (“product over sum”). For **equal** resistors: $R_T = R/n$. So two 100 Ω resistors in parallel make 50 Ω.' },
    { t: 'worked', title: 'Worked example: 100 Ω and 47 Ω in parallel at 10 V', steps: [
      { x: 'Total resistance (product over sum):', m: 'R_T = \\frac{(100)(47)}{100+47} = \\frac{4700}{147} = 31.97\\ \\Omega' },
      { x: 'Each branch has the full 10 V. Branch currents:', m: 'I_1 = \\frac{10}{100} = 0.100\\ \\text{A},\\quad I_2 = \\frac{10}{47} = 0.213\\ \\text{A}' },
      { x: 'Total current:', m: 'I_T = 0.100 + 0.213 = 0.313\\ \\text{A}\\ \\ (= 10/31.97\\ ✓)' }
    ] },
    { t: 'check', q: 'Two identical 100 Ω resistors are connected in parallel. What is the total resistance?', o: ['200 Ω', '100 Ω', '50 Ω', '25 Ω'], a: 2, why: 'Equal resistors in parallel: $R/n = 100/2 = 50\\ \\Omega$.' },
    { t: 'h', x: 'Series-parallel circuits' },
    { t: 'p', x: 'To analyse a mixed circuit, shrink it step by step:' },
    { t: 'ol', x: ['Find any group of resistors that are **purely parallel** and replace each group with its single equivalent.', 'Find any group that is **purely in series** and add them.', 'Repeat until one resistor is left: that is $R_T$. Then find $I_T = V_T/R_T$.', 'Work back outward, using $V = IR$ and the series/parallel rules to find each current and voltage.'] },
    { t: 'worked', title: 'Example: R₁ = 100 Ω in series with R₂ = 47 Ω ‖ R₃ = 100 Ω, at 10 V', steps: [
      { x: 'This is one common layout. Check it against your Figure 8.4; the method is the same for any layout.' },
      { x: 'Parallel part first:', m: 'R_{23} = \\frac{(47)(100)}{147} = 31.97\\ \\Omega' },
      { x: 'Add the series resistor:', m: 'R_T = 100 + 31.97 = 131.97\\ \\Omega' },
      { x: 'Total current (flows through $R_1$):', m: 'I_T = \\frac{10}{131.97} = 0.0758\\ \\text{A}' },
      { x: 'Drop across $R_1$ and across the parallel part:', m: 'V_1 = (0.0758)(100) = 7.58\\ \\text{V},\\quad V_{23} = (0.0758)(31.97) = 2.42\\ \\text{V}' },
      { x: 'Branch currents (each branch has $V_{23}$):', m: 'I_2 = \\frac{2.42}{47} = 0.0515\\ \\text{A},\\quad I_3 = \\frac{2.42}{100} = 0.0242\\ \\text{A}' },
      { x: 'Check: $I_2 + I_3 = 0.0757 \\approx I_T$ ✓' }
    ] },
    { t: 'h', x: 'In the lab: measure and compare' },
    { t: 'ul', x: ['Voltmeter goes **in parallel** with the part you want the voltage across.', 'Ammeter goes **in series**, breaking the wire so the current passes through it.', 'If the needle barely moves, switch the meter to a lower range for a better reading.', 'Fill in the **calculated** and **measured** columns of each table. They should agree within a few percent.'] },
    { t: 'h', x: 'Guide questions, answered' },
    { t: 'ul', x: ['**Q1.** More resistors in series: total resistance **increases**. More resistors in parallel: total resistance **decreases**.', '**Q2.** In series, the total current **decreases** when you add a resistor. In parallel, the total current **increases**, since there is another path.'] }
  ],
  terms: [
    ['Series circuit', 'Components connected end to end so the current has a single path.'],
    ['Parallel circuit', 'Components connected across the same two points, giving multiple paths.'],
    ['Series-parallel circuit', 'A circuit combining series and parallel sections.'],
    ['Equivalent (total) resistance', 'The single resistance that could replace a group without changing the current drawn.'],
    ['Branch', 'One of the separate paths in a parallel circuit.'],
    ['Node (junction)', 'A point where two or more conductors meet.'],
    ['Voltage drop', 'The voltage used up across a component, $V = IR$.'],
    ['Reciprocal', '1 divided by a number; used to combine parallel resistors.'],
    ['Ammeter', 'Measures current; connected in series.'],
    ['Voltmeter', 'Measures voltage; connected in parallel.'],
    ['Current divider', 'A parallel arrangement that splits current among branches.'],
    ['Voltage divider', 'A series arrangement that splits voltage among resistors.']
  ],
  formulas: [
    ['Series resistance', 'R_T = R_1 + R_2 + \\cdots', 'Adds'],
    ['Series current', 'I_T = I_1 = I_2 = \\cdots', 'Same'],
    ['Series voltage', 'V_T = V_1 + V_2 + \\cdots', 'Shared'],
    ['Parallel resistance', '\\dfrac{1}{R_T} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\cdots', 'Reciprocals add'],
    ['Two in parallel', 'R_T = \\dfrac{R_1 R_2}{R_1 + R_2}', 'Product over sum'],
    ['Parallel current', 'I_T = I_1 + I_2 + \\cdots', 'Splits'],
    ['Parallel voltage', 'V_T = V_1 = V_2 = \\cdots', 'Same'],
    ['Total current', 'I_T = \\dfrac{V_T}{R_T}', 'Ohm’s law']
  ],
  quiz: [
    { q: 'In a series circuit, the current is…', o: ['different in each resistor', 'the same in every resistor', 'zero', 'largest in the biggest resistor'], a: 1, why: 'One path means the same current everywhere.' },
    { q: 'In a parallel circuit, the voltage across each branch is…', o: ['divided among the branches', 'the same for each branch', 'zero', 'different for each'], a: 1, why: 'All branches connect across the same two points.' },
    { q: 'Total resistance of 100 Ω, 47 Ω, 100 Ω in series?', o: ['247 Ω', '21 Ω', '147 Ω', '100 Ω'], a: 0, why: 'Add them: 247 Ω.' },
    { q: 'Total resistance of two 100 Ω in parallel?', o: ['200 Ω', '100 Ω', '50 Ω', '25 Ω'], a: 2, why: '$R/n = 50\\ \\Omega$.' },
    { q: 'Adding another resistor in parallel makes the total resistance…', o: ['larger', 'smaller', 'the same', 'infinite'], a: 1, why: 'A new path makes it easier for current.' },
    { q: 'Adding another resistor in series makes the total current…', o: ['larger', 'smaller', 'the same', 'infinite'], a: 1, why: 'Total resistance rises, so $I = V/R$ falls.' },
    { q: 'The total resistance of resistors in parallel is always…', o: ['larger than the largest', 'equal to the sum', 'smaller than the smallest', 'equal to the average'], a: 2, why: 'There are extra paths, so it is below any single branch.' },
    { q: 'A voltmeter is connected…', o: ['in series', 'in parallel', 'on the supply only', 'inside the resistor'], a: 1, why: 'It measures the voltage across a component.' },
    { q: 'Three resistors in series at 10 V. The sum of the individual voltage drops equals…', o: ['0 V', '10 V', '5 V', '30 V'], a: 1, why: 'Series voltages add to the supply voltage.' },
    { q: 'In a parallel circuit, the total current equals…', o: ['the largest branch current', 'the smallest branch current', 'the sum of the branch currents', 'the average branch current'], a: 2, why: 'Current splits and re-joins: $I_T = I_1 + I_2 + \\cdots$.' }
  ],
  problems: [
    { id: 'ser', title: 'Series: total resistance and current', gen() {
      const [a, b, c] = [pick(RV), pick(RV), pick(RV)]; const V = pick([6, 9, 10, 12]); const R = a + b + c; const I = V / R * 1000;
      return { prompt: `Three resistors of ${a} Ω, ${b} Ω and ${c} Ω are connected in series across ${V} V. What is the circuit current? Give your answer in mA.`, givens: [`R_1 = ${a},\\ R_2 = ${b},\\ R_3 = ${c}\\ \\Omega`, `V_T = ${V}\\ \\text{V}`], answer: I, unit: 'mA', tol: 0.02, hint: 'Add the resistors, then I = V / R_T.', steps: [{ x: 'Total resistance:', m: `R_T = ${a}+${b}+${c} = ${R}\\ \\Omega` }, { x: 'Current:', m: `I_T = \\frac{${V}}{${R}} = ${T(V / R)}\\ \\text{A} = ${T(I)}\\ \\text{mA}` }] };
    } },
    { id: 'par', title: 'Parallel: total resistance', gen() {
      const a = pick(RV); let b = pick(RV); const n = pick([2, 2, 3]); const arr = n === 2 ? [a, b] : [a, b, pick(RV)]; const RT = parallel(...arr);
      return { prompt: `What is the total resistance of ${arr.join(' Ω, ')} Ω connected in parallel?`, givens: [`R = ${arr.join(',\\ ')}\\ \\Omega`], answer: RT, unit: 'Ω', tol: 0.02, hint: 'Add reciprocals, then invert. Result must be smaller than the smallest.', steps: [{ x: 'Sum the reciprocals:', m: `\\frac{1}{R_T} = ${arr.map((x) => `\\frac{1}{${x}}`).join('+')} = ${T(arr.reduce((s, x) => s + 1 / x, 0))}\\ \\Omega^{-1}` }, { x: 'Invert:', m: `R_T = ${T(RT)}\\ \\Omega` }] };
    } },
    { id: 'parI', title: 'Parallel: branch and total currents', gen() {
      const a = pick(RV); let b = pick(RV); while (b === a) b = pick(RV); const V = pick([6, 9, 10, 12]); const I1 = V / a, I2 = V / b;
      return { prompt: `${a} Ω and ${b} Ω resistors are connected in parallel across ${V} V. What is the TOTAL current drawn from the supply? Give your answer in mA.`, givens: [`R_1 = ${a}\\ \\Omega,\\ R_2 = ${b}\\ \\Omega`, `V = ${V}\\ \\text{V}`], answer: (I1 + I2) * 1000, unit: 'mA', tol: 0.02, hint: 'Each branch has the full voltage. I = V/R for each, then add.', steps: [{ x: 'Branch currents:', m: `I_1 = \\frac{${V}}{${a}} = ${T(I1 * 1000)}\\ \\text{mA},\\quad I_2 = \\frac{${V}}{${b}} = ${T(I2 * 1000)}\\ \\text{mA}` }, { x: 'Add them:', m: `I_T = ${T((I1 + I2) * 1000)}\\ \\text{mA}` }] };
    } },
    { id: 'mix', title: 'Series-parallel: R₁ + (R₂ ‖ R₃)', gen() {
      const r1 = pick(RV), r2 = pick(RV), r3 = pick(RV); const V = pick([9, 10, 12]); const r23 = parallel(r2, r3); const RT = r1 + r23; const I = V / RT * 1000;
      return { prompt: `R₁ = ${r1} Ω is in series with the parallel pair R₂ = ${r2} Ω and R₃ = ${r3} Ω. The supply is ${V} V. What is the total current? Give your answer in mA.`, givens: [`R_1 = ${r1}\\ \\Omega`, `R_2 = ${r2}\\ \\Omega,\\ R_3 = ${r3}\\ \\Omega`, `V = ${V}\\ \\text{V}`], answer: I, unit: 'mA', tol: 0.02, hint: 'Parallel pair first, then add R₁.', steps: [{ x: 'Parallel pair:', m: `R_{23} = \\frac{(${r2})(${r3})}{${r2}+${r3}} = ${T(r23)}\\ \\Omega` }, { x: 'Total resistance:', m: `R_T = ${r1} + ${T(r23)} = ${T(RT)}\\ \\Omega` }, { x: 'Total current:', m: `I_T = \\frac{${V}}{${T(RT)}} = ${T(I)}\\ \\text{mA}` }] };
    } },
    { id: 'drop', title: 'Voltage across one series resistor', gen() {
      const a = pick(RV), b = pick(RV); const V = pick([6, 9, 10, 12]); const Va = V * a / (a + b);
      return { prompt: `${a} Ω and ${b} Ω resistors are in series across ${V} V. What is the voltage across the ${a} Ω resistor?`, givens: [`R_1 = ${a}\\ \\Omega,\\ R_2 = ${b}\\ \\Omega`, `V = ${V}\\ \\text{V}`], answer: Va, unit: 'V', tol: 0.02, hint: 'Find I first, then V₁ = I R₁.', steps: [{ x: 'Current:', m: `I = \\frac{${V}}{${a + b}} = ${T(V / (a + b))}\\ \\text{A}` }, { x: 'Voltage across R₁:', m: `V_1 = IR_1 = (${T(V / (a + b))})(${a}) = ${T(Va)}\\ \\text{V}` }] };
    } }
  ]
};
