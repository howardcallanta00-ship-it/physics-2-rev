import { rint, rf, pick, sig, T } from './util.js';

const RHO = [['chromium-nickel', 150e-8], ['constantan', 49e-8], ['copper', 1.7e-8], ['aluminum', 2.8e-8]];
const area = (dmm) => Math.PI * (dmm * 1e-3) ** 2 / 4;

export default {
  id: 'a7', code: 'A7', title: 'Resistance of a Wire', tagline: 'Why long thin wires resist more',
  formula: 'R = ρ L / A',
  objectives: ['Find how a wire’s material, length and cross-section affect its resistance.', 'Find the resistivity of a wire.'],
  lesson: [
    { t: 'h', x: 'What makes a wire resist?' },
    { t: 'p', x: 'Electrons moving through a wire do not travel in a straight line. They bump into the atoms of the wire again and again, taking a zig-zag path. That hindrance to the flow of charge is **resistance**. Three things decide how much of it a wire has: how **long** it is, how **thick** it is, and what it is **made of**.' },
    { t: 'analogy', title: 'A crowded hallway', x: 'Imagine walking down a hallway full of people standing around. A **longer** hallway means more people to dodge. A **wider** hallway lets you slip through more easily. A hallway full of **furniture** (a different material) is harder than an empty one.', map: [['Hallway length', 'wire length $L$'], ['Hallway width', 'cross-sectional area $A$'], ['Clutter', 'resistivity $\\rho$ of the material'], ['Bumping into things', 'resistance $R$']] },
    { t: 'viz', id: 'wire' },
    { t: 'h', x: 'The equation' },
    { t: 'eq', name: 'Resistance of a wire', tex: 'R = \\rho\\,\\frac{L}{A}', words: 'Resistance **grows with length** (more atoms to bump into) and **shrinks with area** (more room for the electrons). The factor $\\rho$ captures the material.',
      vars: [['R', 'resistance of the wire', 'Ω'], ['\\rho', 'resistivity of the material', 'Ω·m'], ['L', 'length of the wire', 'm'], ['A', 'cross-sectional area', 'm²']] },
    { t: 'key', title: 'Resistance vs resistivity', x: '**Resistance** $R$ belongs to a *particular wire*: change the length and it changes. **Resistivity** $\\rho$ belongs to the *material*: all copper has the same $\\rho$, no matter the shape. Conductivity is $1/\\rho$.' },
    { t: 'eq', name: 'Resistivity (rearranged)', tex: '\\rho = R\\,\\frac{A}{L}', words: 'This is the form you use in the lab: measure $R$ with Ohm’s law, then multiply by $A/L$.', vars: [['R', 'measured resistance, $V/I$', 'Ω']] },
    { t: 'eq', name: 'Cross-sectional area of a round wire', tex: 'A = \\pi r^2 = \\frac{\\pi d^2}{4}', words: 'A wire’s end is a circle. Area depends on the **square** of the diameter, so doubling the diameter makes the area four times as large.', vars: [['d', 'wire diameter', 'm'], ['r', 'radius = d/2', 'm']] },
    { t: 'warn', title: 'Your lab sheet’s “twice as large” area', x: 'The sheet says a 0.35 mm wire has *about twice* the area of a 0.25 mm wire. Check: $(0.35/0.25)^2 = 1.96 \\approx 2$. That is a handy approximation, not exactly 2. Keep your diameter in **metres** when computing $A$: $0.25\\ \\text{mm} = 0.25\\times10^{-3}\\ \\text{m}$.' },
    { t: 'h', x: 'Three proportionalities to remember' },
    { t: 'table', head: ['If you…', 'Then R…', 'Because'], rows: [['double the length', 'doubles', '$R\\propto L$'], ['double the diameter', 'drops to one quarter', '$R\\propto 1/d^2$'], ['double the area', 'halves', '$R\\propto 1/A$'], ['change to a material with 3× the resistivity', 'triples', '$R\\propto\\rho$']] },
    { t: 'h', x: 'In the lab' },
    { t: 'ul', x: ['The wire is wound on a board in **windings** of 8 cm each. 6 windings = 48 cm, 12 = 96 cm, 18 = 144 cm, 25 = 200 cm.', 'Use a crocodile clip to tap the wire at the 6th, 12th, 18th winding, then use the full 25 windings (2.0 m).', 'Set the power supply to 3 V. At each length, measure the current and use Ohm’s law: $R = V/I$.', 'Plot **R against L**: a straight line through the origin shows $R \\propto L$.', 'Then repeat with a thicker (0.35 mm) wire and with a constantan wire of the same size.'] },
    { t: 'lab', x: 'Only close the switch while taking the measurement. Current heats the wire and heating changes the resistance.' },
    { t: 'worked', title: 'Worked example: chromium-nickel, 0.35 mm, 2.0 m', steps: [
      { x: 'Area:', m: 'A = \\frac{\\pi (0.35\\times10^{-3})^2}{4} = 9.62\\times10^{-8}\\ \\text{m}^2' },
      { x: 'Theoretical resistance with $\\rho = 150\\times10^{-8}\\ \\Omega\\text{·m}$:', m: 'R = \\rho\\frac{L}{A} = \\frac{(150\\times10^{-8})(2.0)}{9.62\\times10^{-8}} \\approx 31.2\\ \\Omega' },
      { x: 'Expected current at 3 V:', m: 'I = \\frac{3}{31.2} = 0.096\\ \\text{A}' },
      { x: 'Suppose you measured 0.100 A. Experimental resistance and resistivity:', m: 'R = \\frac{3}{0.100} = 30.0\\ \\Omega,\\quad \\rho = R\\frac{A}{L} = 30.0 \\cdot \\frac{9.62\\times10^{-8}}{2.0} = 1.44\\times10^{-6}\\ \\Omega\\text{·m}' },
      { x: 'Percent error:', m: '\\frac{|1.50\\times10^{-6} - 1.44\\times10^{-6}|}{1.50\\times10^{-6}}\\times100 = 3.8\\%' }
    ] },
    { t: 'table', head: ['Material', 'Resistivity (Ω·m)'], rows: [['Chromium-nickel', '$150\\times10^{-8}$'], ['Constantan', '$49\\times10^{-8}$'], ['Copper (reference)', '$1.7\\times10^{-8}$']] },
    { t: 'check', q: 'A wire is replaced by one of the same material and length but double the diameter. Its resistance…', o: ['doubles', 'halves', 'drops to ¼', 'is unchanged'], a: 2, why: 'Area ∝ d², so area ×4, and $R\\propto1/A$ gives $R/4$.' },
    { t: 'h', x: 'Guide questions, answered' },
    { t: 'ul', x: ['**Q1.** $R$ is directly proportional to length: longer wire, more resistance.', '**Q2.** $R$ is inversely proportional to cross-sectional area (∝ 1/d²): thicker wire, less resistance.', '**Q3.** Yes. Chromium-nickel has a higher resistivity than constantan, so for the same size it has higher resistance.', '**Q4.** If the area doubles, $R$ halves.'] }
  ],
  terms: [
    ['Resistance (R)', 'Opposition to current. Unit: ohm (Ω).'],
    ['Resistivity (ρ)', 'A material property: how strongly it opposes current. Unit: Ω·m.'],
    ['Conductivity', 'The reciprocal of resistivity, $1/\\rho$.'],
    ['Cross-sectional area (A)', 'Area of a slice cut across the wire, $\\pi d^2/4$ for a round wire.'],
    ['Constantan', 'Copper-nickel alloy whose resistance barely changes with temperature.'],
    ['Chromium-nickel (nichrome)', 'Alloy with high resistivity, used in heating elements.'],
    ['Winding', 'One turn of wire around the wrapping plate; 8 cm of wire each in the lab.'],
    ['Wrapping plate', 'The board on which the wire is wound.'],
    ['Crocodile clip', 'Spring clip used to tap the wire at a chosen winding.'],
    ['Diameter (φ)', 'Distance across the wire; the lab uses 0.25 mm and 0.35 mm.'],
    ['Directly proportional', 'R increases by the same factor as L.'],
    ['Inversely proportional', 'R decreases by the factor that A increases.']
  ],
  formulas: [
    ['Resistance of a wire', 'R = \\rho\\,\\dfrac{L}{A}', ''],
    ['Resistivity', '\\rho = R\\,\\dfrac{A}{L}', 'Used in Table 7.7.3'],
    ['Circular area', 'A = \\dfrac{\\pi d^2}{4}', 'd in metres'],
    ['Experimental R', 'R = \\dfrac{V}{I}', 'Ohm’s law'],
    ['Percent error', '\\dfrac{|\\rho_{\\text{theo}}-\\rho_{\\text{exp}}|}{\\rho_{\\text{theo}}}\\times100', '']
  ],
  quiz: [
    { q: 'Resistance of a wire is directly proportional to its…', o: ['area', 'length', 'diameter', 'current'], a: 1, why: '$R \\propto L$.' },
    { q: 'If the diameter of a wire is doubled, its resistance becomes…', o: ['double', 'half', 'one quarter', 'four times'], a: 2, why: 'Area ×4, so $R/4$.' },
    { q: 'Resistivity is a property of…', o: ['the shape of the wire', 'the material', 'the length', 'the voltage'], a: 1, why: 'It describes the material itself.' },
    { q: 'The SI unit of resistivity is…', o: ['Ω', 'Ω·m', 'Ω/m', 'm²'], a: 1, why: 'From $\\rho = RA/L$: Ω·m²/m = Ω·m.' },
    { q: 'What is the length of the wire for 12 windings of 8 cm each?', o: ['48 cm', '96 cm', '144 cm', '200 cm'], a: 1, why: '$12 \\times 8 = 96$ cm.' },
    { q: 'A wire’s length is doubled and its area is doubled. Its resistance…', o: ['doubles', 'halves', 'is unchanged', 'quadruples'], a: 2, why: '$R = \\rho L/A$: factors of 2 cancel.' },
    { q: 'Why close the switch only when taking a measurement?', o: ['To save the switch', 'Current heats the wire and changes its resistance', 'To reset the ammeter', 'To discharge the wire'], a: 1, why: 'Heating changes resistivity and gives false data.' },
    { q: 'Which wire has higher resistivity?', o: ['Constantan (49×10⁻⁸ Ω·m)', 'Chromium-nickel (150×10⁻⁸ Ω·m)', 'They are equal', 'Copper'], a: 1, why: 'Higher number = higher resistivity.' },
    { q: 'You plot R against L for one wire. The graph should be…', o: ['a straight line through the origin', 'a parabola', 'a flat line', 'a circle'], a: 0, why: '$R = (\\rho/A)L$, a straight line with slope $\\rho/A$.' },
    { q: 'How do you find the experimental resistance of the wire?', o: ['$R = IV$', '$R = V/I$', '$R = I/V$', '$R = V + I$'], a: 1, why: 'Ohm’s law: $R = V/I$.' }
  ],
  problems: [
    { id: 'R', title: 'Resistance of a wire', gen() {
      const [mat, rho] = pick(RHO.slice(0, 2)); const L = pick([0.5, 1.0, 1.5, 2.0]); const d = pick([0.25, 0.35, 0.5]); const A = area(d); const R = rho * L / A;
      return { prompt: `What is the resistance of a ${L} m length of ${mat} wire (ρ = ${T(rho)} Ω·m) with a diameter of ${d} mm?`, givens: [`\\rho = ${T(rho)}\\ \\Omega\\text{·m}`, `L = ${L}\\ \\text{m}`, `d = ${d}\\ \\text{mm}`], answer: R, unit: 'Ω', tol: 0.02, hint: 'A = πd²/4 with d in metres. Then R = ρL/A.',
        steps: [{ x: 'Area:', m: `A = \\frac{\\pi(${d}\\times10^{-3})^2}{4} = ${T(A)}\\ \\text{m}^2` }, { x: 'Resistance:', m: `R = \\frac{\\rho L}{A} = \\frac{(${T(rho)})(${L})}{${T(A)}} = ${T(R)}\\ \\Omega` }] };
    } },
    { id: 'rho', title: 'Resistivity from lab data', gen() {
      const [mat, rho] = pick(RHO.slice(0, 2)); const L = 2.0; const d = 0.35; const A = area(d); const R = rho * L / A; const I = 3 / R; const I2 = sig(I, 3); const Rexp = 3 / I2; const rhoExp = Rexp * A / L;
      return { prompt: `A 2.0 m, 0.35 mm ${mat} wire carries ${sig(I2 * 1000, 3)} mA when connected to 3.0 V. What is its resistivity? Enter in units of 10⁻⁸ Ω·m.`, givens: [`V = 3.0\\ \\text{V}`, `I = ${sig(I2 * 1000, 3)}\\ \\text{mA}`, `L = 2.0\\ \\text{m}`, `d = 0.35\\ \\text{mm}`], answer: rhoExp * 1e8, unit: '×10⁻⁸ Ω·m', tol: 0.03, hint: 'R = V/I; A = πd²/4; ρ = RA/L.',
        steps: [{ x: 'Resistance:', m: `R = \\frac{V}{I} = \\frac{3.0}{${T(I2)}} = ${T(Rexp)}\\ \\Omega` }, { x: 'Area:', m: `A = ${T(A)}\\ \\text{m}^2` }, { x: 'Resistivity:', m: `\\rho = \\frac{RA}{L} = \\frac{(${T(Rexp)})(${T(A)})}{2.0} = ${T(rhoExp)}\\ \\Omega\\text{·m}` }] };
    } },
    { id: 'scale', title: 'Scaling length and diameter', gen() {
      const R0 = pick([10, 20, 24, 30, 48]); const fL = pick([2, 3]); const fd = pick([2, 3]); const R = R0 * fL / (fd * fd);
      return { prompt: `A wire has a resistance of ${R0} Ω. A new wire of the same material is ${fL} times as long and ${fd} times the diameter. What is its resistance?`, givens: [`R_0 = ${R0}\\ \\Omega`, `L = ${fL}\\,L_0`, `d = ${fd}\\,d_0`], answer: R, unit: 'Ω', tol: 0.03, hint: 'R ∝ L / d².', steps: [{ x: 'Resistance scales as length over diameter squared:', m: `R = R_0\\cdot\\frac{${fL}}{${fd}^2} = ${R0}\\cdot\\frac{${fL}}{${fd * fd}} = ${T(R)}\\ \\Omega` }] };
    } },
    { id: 'cur', title: 'Current in a wire', gen() {
      const L = pick([0.48, 0.96, 1.44, 2.0]); const rho = 150e-8; const d = 0.25; const A = area(d); const R = rho * L / A; const V = 3.0; const I = V / R * 1000;
      return { prompt: `A ${L} m chromium-nickel wire (ρ = 150×10⁻⁸ Ω·m, d = 0.25 mm) is connected to a 3.0 V supply. What current flows? Give your answer in mA.`, givens: [`L = ${L}\\ \\text{m}`, `\\rho = 1.5\\times10^{-6}\\ \\Omega\\text{·m}`, `d = 0.25\\ \\text{mm}`, `V = 3.0\\ \\text{V}`], answer: I, unit: 'mA', tol: 0.03, hint: 'Find R = ρL/A first, then I = V/R.', steps: [{ x: 'Area:', m: `A = ${T(A)}\\ \\text{m}^2` }, { x: 'Resistance:', m: `R = \\frac{(1.5\\times10^{-6})(${L})}{${T(A)}} = ${T(R)}\\ \\Omega` }, { x: 'Current:', m: `I = \\frac{3.0}{${T(R)}} = ${T(I)}\\ \\text{mA}` }] };
    } }
  ]
};
