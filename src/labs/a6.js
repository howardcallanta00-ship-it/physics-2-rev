import { rint, rf, pick, sig, T } from './util.js';

const RS = [47, 100, 330, 1000];

export default {
  id: 'a6', code: 'A6', title: "Ohm's Law", tagline: 'The rule that links voltage, current and resistance',
  formula: 'V = I R',
  objectives: ['Find how current depends on voltage in a closed circuit.', 'Find the mathematical relationship between current and voltage.', 'Verify Ohm’s law with your own data.'],
  lesson: [
    { t: 'h', x: 'The big idea' },
    { t: 'p', x: 'In 1827 the German physicist Georg Simon Ohm showed that, for many materials, the **current** through a conductor is proportional to the **voltage** across it. The SI unit of resistance, the **ohm** (Ω), is named after him.' },
    { t: 'eq', name: "Ohm's law", tex: 'V = I\\,R', words: 'Voltage across a resistor = current through it × its resistance. Know any two, and you can find the third.',
      vars: [['V', 'voltage (potential difference)', 'V'], ['I', 'current', 'A'], ['R', 'resistance', 'Ω']] },
    { t: 'analogy', title: 'Water in a pipe', x: 'Think of electricity as water flowing through a pipe. A pump pushes the water. A narrow section of the pipe slows the flow.', map: [['Pump pressure', 'voltage $V$'], ['Amount of water flowing per second', 'current $I$'], ['How narrow the pipe is', 'resistance $R$']] },
    { t: 'viz', id: 'ohm' },
    { t: 'key', title: 'Three ways to say it', x: '**More pressure** → more flow. **Narrower pipe** → less flow. In symbols: $I = V/R$. Double $V$ (same $R$) and $I$ doubles. Double $R$ (same $V$) and $I$ halves.' },
    { t: 'h', x: 'Rearranging the equation' },
    { t: 'p', x: 'Any equation $V = IR$ can be rearranged. Use the one that gives the quantity you want:' },
    { t: 'table', head: ['Find', 'Use', 'Example'], rows: [['Voltage', '$V = IR$', '$I = 0.2$ A, $R = 47\\ \\Omega$ → $V = 9.4$ V'], ['Current', '$I = V/R$', '$V = 10$ V, $R = 100\\ \\Omega$ → $I = 0.10$ A'], ['Resistance', '$R = V/I$', '$V = 10$ V, $I = 0.05$ A → $R = 200\\ \\Omega$']] },
    { t: 'h', x: 'Ohmic materials' },
    { t: 'p', x: 'A material that obeys Ohm’s law is **ohmic**. Its resistance stays constant as voltage changes. So a graph of voltage against current is a **straight line through the origin**. If you double the voltage, the current doubles.' },
    { t: 'warn', title: 'Not everything is ohmic', x: 'A light bulb filament gets hot as current rises, and its resistance goes up, so its graph curves. Diodes and transistors are also non-ohmic. In your lab, the resistors are ohmic.' },
    { t: 'h', x: 'Part 1: constant resistance' },
    { t: 'p', x: 'Use one resistor (47 Ω), raise the supply from 1 V to 10 V in 1 V steps, and read the current each time. Plot **current on the x-axis** and **voltage on the y-axis**.' },
    { t: 'key', title: 'Why the slope is R', x: 'The slope of a line is rise over run: $\\dfrac{\\Delta V}{\\Delta I}$. From $V = IR$, that is exactly $R$. So the **slope of your V–I graph is the resistance**. Use your calculator’s regression $y = Bx + A$; the slope $B$ is $R_{\\text{exp}}$.' },
    { t: 'worked', title: 'Worked example: expected readings for 47 Ω', steps: [
      { x: 'At 1 V:', m: 'I = \\frac{1}{47} = 0.0213\\ \\text{A} = 21.3\\ \\text{mA}' },
      { x: 'At 5 V:', m: 'I = \\frac{5}{47} = 0.106\\ \\text{A} = 106\\ \\text{mA}' },
      { x: 'At 10 V:', m: 'I = \\frac{10}{47} = 0.213\\ \\text{A} = 213\\ \\text{mA}' },
      { x: 'Slope of the V–I line:', m: '\\frac{\\Delta V}{\\Delta I} = \\frac{10 - 1}{0.213 - 0.0213} = 47\\ \\Omega' },
      { x: 'If your regression gave 46.1 Ω, the percent error is:', m: '\\frac{|47-46.1|}{47}\\times100 \\approx 1.9\\%' }
    ] },
    { t: 'lab', x: 'The **ammeter goes in series** (the current must pass through it). The **voltmeter goes in parallel** (across the part you measure). Mixing these up can damage the meters.' },
    { t: 'h', x: 'Part 2: constant voltage' },
    { t: 'p', x: 'Hold the supply at 10 V and swap in resistors of 47, 100, 330 and 1000 Ω. Plot **current on the y-axis** against the **reciprocal of resistance** $1/R$ on the x-axis.' },
    { t: 'p', x: 'Why $1/R$? Because $I = V \\cdot \\dfrac{1}{R}$ has the form $y = Bx$ with $B = V$. So the slope of the graph is the **supply voltage**, $V_{\\text{exp}}$.' },
    { t: 'table', head: ['R (Ω)', '1/R (1/Ω)', 'Expected I at 10 V'], rows: [['47', '0.0213', '213 mA'], ['100', '0.0100', '100 mA'], ['330', '0.00303', '30.3 mA'], ['1000', '0.00100', '10.0 mA']] },
    { t: 'key', title: 'Pattern', x: 'As $R$ goes up, $I$ goes down. $I$ and $R$ are **inversely proportional**: when $R$ is multiplied by 10 (100 → 1000), $I$ is divided by 10 (100 mA → 10 mA).' },
    { t: 'check', q: 'A resistor has 12 V across it and carries 0.04 A. What is its resistance?', o: ['0.48 Ω', '48 Ω', '300 Ω', '3 Ω'], a: 2, why: '$R = V/I = 12/0.04 = 300\\ \\Omega$.' },
    { t: 'h', x: 'Guide questions, answered' },
    { t: 'ul', x: ['**Q1.** Current is *directly proportional* to voltage when resistance is constant: higher voltage, higher current. The graph is a straight line through the origin.', '**Q2.** An **ohmic material** is one whose resistance does not change with voltage. If the voltage doubles, the current doubles.', '**Q3.** Current is *inversely proportional* to resistance when the voltage is constant: bigger resistance, smaller current.'] }
  ],
  terms: [
    ["Ohm's law", 'For an ohmic conductor, voltage across it equals current times resistance, $V = IR$.'],
    ['Ohm (Ω)', 'SI unit of resistance. 1 Ω = 1 V/A.'],
    ['Voltage (potential difference)', 'The energy per unit charge supplied to or used by a circuit element. Unit: volt.'],
    ['Current', 'The flow of charge per second. Unit: ampere.'],
    ['Resistance', 'How much a component opposes current.'],
    ['Ohmic material', 'A material with constant resistance; its V–I graph is a straight line through the origin.'],
    ['Ammeter', 'Instrument that measures current. Connected in **series**.'],
    ['Voltmeter', 'Instrument that measures voltage. Connected in **parallel**.'],
    ['Slope', 'Rise over run of a graph line; for V vs I it equals $R$.'],
    ['Regression line', 'The best-fit straight line through experimental points, $y = Bx + A$.'],
    ['Directly proportional', 'Two quantities rise and fall together at a constant ratio.'],
    ['Inversely proportional', 'When one quantity goes up, the other goes down so their product stays constant.'],
    ['Reciprocal', 'One divided by a number; the reciprocal of $R$ is $1/R$.']
  ],
  formulas: [
    ["Ohm's law", 'V = I R', ''],
    ['Current', 'I = \\dfrac{V}{R}', ''],
    ['Resistance', 'R = \\dfrac{V}{I}', 'Also the slope of V vs I'],
    ['Slope (V vs I)', 'R = \\dfrac{\\Delta V}{\\Delta I}', 'I on x-axis, V on y-axis'],
    ['Slope (I vs 1/R)', 'V = \\dfrac{\\Delta I}{\\Delta(1/R)}', 'At constant voltage'],
    ['Power (extra)', 'P = IV = I^2R = \\dfrac{V^2}{R}', 'Watts']
  ],
  quiz: [
    { q: 'Which is Ohm’s law?', o: ['$V = IR$', '$V = I/R$', '$I = VR$', '$R = VI$'], a: 0, why: 'Voltage equals current times resistance.' },
    { q: 'Voltage across a 47 Ω resistor is 10 V. The current is about…', o: ['0.21 A', '4.7 A', '470 A', '0.047 A'], a: 0, why: '$I = 10/47 = 0.213$ A.' },
    { q: 'Voltage is doubled across an ohmic resistor. The current…', o: ['halves', 'stays the same', 'doubles', 'quadruples'], a: 2, why: '$I \\propto V$ for constant $R$.' },
    { q: 'On a V (y-axis) vs I (x-axis) graph, the slope equals…', o: ['the voltage', 'the current', 'the resistance', 'the power'], a: 2, why: '$\\Delta V/\\Delta I = R$.' },
    { q: 'On an I (y-axis) vs 1/R (x-axis) graph at constant voltage, the slope is…', o: ['resistance', 'the voltage', 'the current', 'zero'], a: 1, why: '$I = V\\cdot(1/R)$, so slope = $V$.' },
    { q: 'An ammeter should be connected…', o: ['in parallel with the resistor', 'in series with the resistor', 'across the supply only', 'to the ground'], a: 1, why: 'Current must flow through the ammeter.' },
    { q: 'An ohmic material has a V–I graph that is…', o: ['a curve', 'a straight line through the origin', 'a horizontal line', 'a circle'], a: 1, why: 'Constant resistance means constant slope.' },
    { q: 'Resistance changes from 100 Ω to 1000 Ω at 10 V. The current goes from 100 mA to…', o: ['1000 mA', '10 mA', '1 mA', '100 mA'], a: 1, why: '$I \\propto 1/R$: ten times the resistance, one tenth the current.' },
    { q: 'Which is the correct unit for resistance?', o: ['Volt', 'Ampere', 'Ohm', 'Watt'], a: 2, why: 'Ohm (Ω).' },
    { q: 'A light bulb’s resistance rises as it heats up. A V–I graph of the bulb is…', o: ['a straight line', 'curved (non-ohmic)', 'a horizontal line', 'a vertical line'], a: 1, why: 'Because resistance is not constant, the slope changes.' }
  ],
  problems: [
    { id: 'i', title: 'Find the current', gen() {
      const V = pick([3, 5, 6, 9, 10, 12]); const R = pick(RS); const I = V / R * 1000;
      return { prompt: `A ${R} Ω resistor is connected to a ${V} V supply. What current flows? Give your answer in mA.`, givens: [`V = ${V}\\ \\text{V}`, `R = ${R}\\ \\Omega`], answer: I, unit: 'mA', tol: 0.02, hint: 'I = V/R, then × 1000 for mA.', steps: [{ x: 'Ohm’s law solved for current:', m: `I = \\frac{V}{R} = \\frac{${V}}{${R}} = ${T(V / R)}\\ \\text{A} = ${T(I)}\\ \\text{mA}` }] };
    } },
    { id: 'v', title: 'Find the voltage', gen() {
      const I = rint(20, 400); const R = pick(RS); const V = I / 1000 * R;
      return { prompt: `A current of ${I} mA flows through a ${R} Ω resistor. What is the voltage across it?`, givens: [`I = ${I}\\ \\text{mA} = ${I / 1000}\\ \\text{A}`, `R = ${R}\\ \\Omega`], answer: V, unit: 'V', tol: 0.02, hint: 'Convert mA to A, then V = IR.', steps: [{ x: 'Use V = IR:', m: `V = (${I / 1000})(${R}) = ${T(V)}\\ \\text{V}` }] };
    } },
    { id: 'r', title: 'Find the resistance', gen() {
      const R = pick([68, 150, 220, 470, 680, 1500]); const V = pick([4.5, 6, 9, 12]); const I = V / R * 1000;
      return { prompt: `A resistor has ${V} V across it and carries ${sig(I, 3)} mA. What is its resistance?`, givens: [`V = ${V}\\ \\text{V}`, `I = ${sig(I, 3)}\\ \\text{mA}`], answer: R, unit: 'Ω', tol: 0.03, hint: 'R = V/I with I in amps.', steps: [{ x: 'Resistance:', m: `R = \\frac{V}{I} = \\frac{${V}}{${T(sig(I, 3) / 1000)}} = ${T(R)}\\ \\Omega` }] };
    } },
    { id: 'slope', title: 'Resistance from two graph points', gen() {
      const R = pick([47, 100, 330]); const v1 = pick([2, 3]); const v2 = pick([7, 8, 9]); const i1 = sig(v1 / R * 1000, 3); const i2 = sig(v2 / R * 1000, 3);
      const slope = (v2 - v1) / ((i2 - i1) / 1000);
      return { prompt: `On a V–I graph, two points lie on the best-fit line: (${i1} mA, ${v1} V) and (${i2} mA, ${v2} V). What is the slope, i.e. the experimental resistance?`, givens: [`(I_1, V_1) = (${i1}\\ \\text{mA},\\ ${v1}\\ \\text{V})`, `(I_2, V_2) = (${i2}\\ \\text{mA},\\ ${v2}\\ \\text{V})`], answer: slope, unit: 'Ω', tol: 0.03, hint: 'slope = ΔV / ΔI, with I in amps.', steps: [{ x: 'Rise over run:', m: `R = \\frac{${v2}-${v1}}{(${i2}-${i1})\\times10^{-3}} = ${T(slope)}\\ \\Omega` }] };
    } }
  ]
};
