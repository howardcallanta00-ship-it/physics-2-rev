import { rint, rf, pick, T } from '../labs/util.js';

const E0 = 8.85e-12;

export default {
  id: 'm6', kind: 'module', code: 'M6', title: 'Capacitors and Dielectrics', tagline: 'Storing electric energy between two plates',
  formula: 'C = Q/V · C = κε₀A/d · U = ½CV²',
  objectives: ['Describe a parallel-plate capacitor and what capacitance means.', 'Explain how a dielectric changes a capacitor.', 'Find the energy stored in a capacitor.', 'Combine capacitors in series and parallel.'],
  lesson: [
    { t: 'h', x: 'What is a capacitor?' },
    { t: 'p', x: 'A **capacitor** is a two-terminal component that stores energy in an **electric field**. It is made of two conductors (plates) separated by a gap or by a non-conducting **dielectric**. Connect it to a battery and charge piles up on the plates: **+Q** on one and **−Q** on the other. Connect it to a load and the stored energy is released.' },
    { t: 'analogy', title: 'A water tank', x: 'A capacitor is like a tank that fills when you pump in water. The pump pressure is the voltage and the amount of water inside is the charge. A wide tank holds more water for the same pressure. That is its capacitance.', map: [['Water in the tank', 'charge Q'], ['Pump pressure', 'voltage V'], ['Tank width', 'capacitance C']] },
    { t: 'h', x: 'Capacitance' },
    { t: 'eq', name: 'Capacitance', tex: 'C = \\frac{Q}{V_{ab}}', words: 'Capacitance tells you **how much charge the capacitor stores per volt**. A bigger $C$ holds more charge at the same voltage.', vars: [['C', 'capacitance', 'F (farad)'], ['Q', 'charge on one plate', 'C'], ['V_{ab}', 'voltage across the plates', 'V']] },
    { t: 'note', title: 'Sizes', x: 'A farad is enormous. Real capacitors are in microfarads (µF = $10^{-6}$ F), nanofarads (nF) or picofarads (pF = $10^{-12}$ F).' },
    { t: 'worked', title: 'Example', steps: [{ x: 'How much charge does a battery put on a 5.0 µF capacitor to create 1.5 V across it?' }, { m: 'Q = CV = (5.0\\times10^{-6})(1.5) = 7.5\\ \\mu\\text{C}' }] },
    { t: 'h', x: 'What decides the capacitance?' },
    { t: 'p', x: 'For two parallel plates, each with area $A$ and separated by a distance $d$, the field between them is uniform. Working out $V = Ed$ gives a result that depends **only on geometry**:' },
    { t: 'viz', id: 'capacitor' },
    { t: 'eq', name: 'Parallel-plate capacitor', tex: 'C = \\varepsilon_0\\,\\frac{A}{d} \\qquad \\varepsilon_0 = 8.85\\times10^{-12}\\ \\text{F/m}', words: 'Bigger plates, **more room for charge**: $C$ grows with $A$. Plates closer together, **stronger attraction between + and −**: $C$ grows as $d$ shrinks. The charge and voltage do not change $C$.', vars: [['A', 'area of each plate', 'm²'], ['d', 'gap between the plates', 'm'], ['\\varepsilon_0', 'permittivity of free space', 'F/m']] },
    { t: 'ul', x: ['$\\uparrow A \\Rightarrow \\uparrow C$ and $\\downarrow A \\Rightarrow \\downarrow C$.', '$\\uparrow d \\Rightarrow \\downarrow C$ and $\\downarrow d \\Rightarrow \\uparrow C$.'] },
    { t: 'check', q: 'A computer key is a capacitor: pressing it squeezes the gap between its plates. What happens to the capacitance?', o: ['It decreases', 'It increases', 'It stays the same', 'It becomes zero'], a: 1, why: 'A smaller gap $d$ gives a larger $C = \\varepsilon_0A/d$, which the keyboard senses.' },
    { t: 'h', x: 'Dielectrics' },
    { t: 'p', x: 'A **dielectric** is a non-conducting material between the plates (paper, glass, plastic, ceramic). It does three useful jobs:' },
    { t: 'ul', x: ['Lets the plates sit very close **without touching**.', 'Increases the **maximum voltage** the capacitor can take before it breaks down.', 'Increases the **capacitance** by a factor $\\kappa$.'] },
    { t: 'eq', name: 'With a dielectric', tex: 'C = \\kappa\\,\\varepsilon_0\\,\\frac{A}{d}', words: '$\\kappa$ (kappa) is the **dielectric constant**. Vacuum and air have $\\kappa \\approx 1$. Paper is about 3.7, glass about 5 and water about 80. The dielectric’s molecules line up against the field and reduce it, so the plates can hold more charge for the same voltage.', vars: [['\\kappa', 'dielectric constant', 'no units']] },
    { t: 'worked', title: 'Example', steps: [
      { x: 'What plate area gives 1.0 F with a 1.0 mm gap in air?', m: 'A = \\frac{Cd}{\\varepsilon_0} = \\frac{(1.0)(1.0\\times10^{-3})}{8.85\\times10^{-12}} = 1.1\\times10^{8}\\ \\text{m}^2' },
      { x: 'That is about 100 km². Real farad-sized capacitors use other tricks.' },
      { x: 'Plates 5.0 mm apart, area 2.0 m², in air, with 10 000 V applied:' },
      { m: 'C = \\frac{(8.85\\times10^{-12})(2.0)}{5.0\\times10^{-3}} = 3.54\\times10^{-9}\\ \\text{F}' },
      { m: 'Q = CV = (3.54\\times10^{-9})(10\\,000) = 35.4\\ \\mu\\text{C}' },
      { m: 'E = \\frac{V}{d} = \\frac{10\\,000}{5.0\\times10^{-3}} = 2.0\\times10^{6}\\ \\text{V/m}' }] },
    { t: 'h', x: 'Energy stored' },
    { t: 'p', x: 'The energy in a charged capacitor equals the work it took to charge it:' },
    { t: 'eq', name: 'Energy in a capacitor', tex: 'U = \\tfrac12\\,C\\,V^2 = \\tfrac12\\,Q\\,V = \\frac{Q^2}{2C}', words: 'Pick whichever form uses the quantities you know. Doubling the voltage makes the stored energy **four times larger**.', vars: [['U', 'stored energy', 'J']] },
    { t: 'worked', title: 'Example', steps: [{ x: 'A 5.80 µF capacitor is charged to 400 V:' }, { m: 'U = \\tfrac12(5.80\\times10^{-6})(400)^2 = 0.464\\ \\text{J}' }] },
    { t: 'h', x: 'Capacitors in combination' },
    { t: 'ul', x: ['**Parallel**: all share the **same voltage**. The charges add, so the capacitances add.', '**Series**: all carry the **same charge**. The voltages add, so the **reciprocals** of the capacitances add.'] },
    { t: 'eq', name: 'Parallel', tex: 'C_T = C_1 + C_2 + C_3 \\qquad V_{ab} = V_1 = V_2 = V_3 \\qquad Q_T = Q_1 + Q_2 + Q_3', words: 'Connecting in parallel is like making one bigger plate, so the total is **bigger**.', vars: [] },
    { t: 'eq', name: 'Series', tex: '\\frac{1}{C_T} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\frac{1}{C_3} \\qquad Q_T = Q_1 = Q_2 = Q_3 \\qquad V_{ab} = V_1 + V_2 + V_3', words: 'Connecting in series is like making the gap bigger, so the total is **smaller than the smallest** capacitor.', vars: [] },
    { t: 'warn', title: 'Opposite of resistors', x: 'Resistors add in series and use reciprocals in parallel. **Capacitors do the reverse.**' },
    { t: 'worked', title: 'Example: 6.0 µF and 3.0 µF on an 18.0 V battery', steps: [
      { x: '**Series.**', m: 'C_T = \\frac{(6)(3)}{6+3} = 2\\ \\mu\\text{F},\\quad Q = C_TV = 36\\ \\mu\\text{C}\\ \\text{on each}' },
      { m: 'V_1 = \\frac{36}{6} = 6\\ \\text{V},\\quad V_2 = \\frac{36}{3} = 12\\ \\text{V}\\quad(6 + 12 = 18\\ \\checkmark)' },
      { x: '**Parallel.**', m: 'C_T = 9\\ \\mu\\text{F},\\quad V_1 = V_2 = 18\\ \\text{V},\\quad Q_1 = 108\\ \\mu\\text{C},\\ Q_2 = 54\\ \\mu\\text{C}' }] },
    { t: 'note', title: 'Where you see them', x: 'Camera flashes (a big charge released quickly), TV remotes, surge protection, power-supply smoothing, touchscreens and keyboards. Lab A5 studies how a capacitor charges and discharges.' }
  ],
  terms: [
    ['Capacitor', 'A device that stores energy in an electric field between two conductors.'], ['Capacitance', 'Charge stored per volt, $C = Q/V$. Unit: farad (F).'], ['Farad (F)', 'One coulomb per volt.'],
    ['Dielectric', 'An insulating material between the capacitor plates.'], ['Dielectric constant (κ)', 'The factor by which a dielectric multiplies the capacitance.'], ['Permittivity of free space (ε₀)', '$8.85\\times10^{-12}$ F/m.'],
    ['Plate', 'One of the two conductors of a capacitor.'], ['Capacitors in series', 'Same charge, voltages add.'], ['Capacitors in parallel', 'Same voltage, capacitances add.'], ['Breakdown voltage', 'The voltage at which the dielectric fails and conducts.']
  ],
  formulas: [
    ['Capacitance', 'C = \\dfrac{Q}{V}', 'F'], ['Parallel plates', 'C = \\varepsilon_0\\dfrac{A}{d}', ''], ['With dielectric', 'C = \\kappa\\varepsilon_0\\dfrac{A}{d}', ''], ['Energy', 'U = \\tfrac12 CV^2 = \\tfrac12 QV', 'J'],
    ['Parallel', 'C_T = C_1 + C_2 + \\cdots', ''], ['Series', '\\dfrac{1}{C_T} = \\dfrac{1}{C_1}+\\dfrac{1}{C_2}+\\cdots', ''], ['Plate field', 'E = \\dfrac{V}{d}', '']
  ],
  quiz: [
    { q: 'The unit of capacitance is the…', o: ['henry', 'farad', 'ohm', 'weber'], a: 1, why: '1 farad = 1 coulomb per volt.' },
    { q: 'For a parallel-plate capacitor, capacitance increases when…', o: ['plate area decreases', 'plate separation increases', 'plate separation decreases', 'voltage increases'], a: 2, why: '$C = \\varepsilon_0A/d$.' },
    { q: 'A dielectric between the plates…', o: ['decreases C', 'increases C', 'has no effect on C', 'removes the charge'], a: 1, why: '$C = \\kappa\\varepsilon_0A/d$ with $\\kappa > 1$.' },
    { q: 'Capacitors in parallel have the same…', o: ['charge', 'voltage', 'capacitance', 'energy'], a: 1, why: 'Parallel branches share the voltage.' },
    { q: 'Capacitors in series have the same…', o: ['charge', 'voltage', 'capacitance', 'energy'], a: 0, why: 'In a single path the same charge sits on each.' },
    { q: 'The total capacitance of capacitors in series is…', o: ['larger than the largest', 'equal to the sum', 'smaller than the smallest', 'equal to the average'], a: 2, why: 'Reciprocals add, so the total is below any single one.' },
    { q: 'If a capacitor’s voltage doubles, the stored energy…', o: ['doubles', 'quadruples', 'stays the same', 'halves'], a: 1, why: '$U = \\tfrac12CV^2$.' },
    { q: 'You connect a 4 µF and an 8 µF capacitor. In which connection does the 4 µF have the larger voltage?', o: ['parallel', 'series', 'both', 'neither'], a: 1, why: 'In series the same Q gives $V = Q/C$, larger for the smaller C.' },
    { q: 'The charge stored on a 5 µF capacitor at 12 V is…', o: ['60 µC', '2.4 µC', '60 C', '0.42 µC'], a: 0, why: '$Q = CV = 5\\times12 = 60$ µC.' },
    { q: 'A capacitor’s plates carry…', o: ['+Q on both', '−Q on both', '+Q and −Q', 'no charge'], a: 2, why: 'Equal and opposite charges.' }
  ],
  problems: [
    { id: 'q', title: 'Charge on a capacitor', gen() { const C = rint(1, 100); const V = pick([1.5, 3, 5, 9, 12]); return { prompt: `A ${C} µF capacitor is connected across a ${V} V battery. What charge is stored on it? Give your answer in µC.`, givens: [`C = ${C}\\ \\mu\\text{F}`, `V = ${V}\\ \\text{V}`], answer: C * V, unit: 'µC', tol: 0.01, hint: 'Q = CV.', steps: [{ x: 'Use $Q = CV$:', m: `Q = (${C})(${V}) = ${T(C * V)}\\ \\mu\\text{C}` }] }; } },
    { id: 'pp', title: 'Parallel-plate capacitance', gen() { const A = rf(0.01, 0.5, 2); const d = rf(0.5, 5, 1); const k = pick([1, 1, 3.7, 5]); const C = k * E0 * A / (d * 1e-3); return { prompt: `A parallel-plate capacitor has plates of area ${A} m² separated by ${d} mm${k > 1 ? ` with a dielectric of κ = ${k}` : ' of air'}. What is its capacitance? Give your answer in nF. (ε₀ = 8.85×10⁻¹² F/m)`, givens: [`A = ${A}\\ \\text{m}^2,\\ d = ${d}\\ \\text{mm}`, `\\kappa = ${k}`], answer: C * 1e9, unit: 'nF', tol: 0.02, hint: 'C = κε₀A/d, d in metres.', steps: [{ x: 'Use $C = \\kappa\\varepsilon_0A/d$:', m: `C = ${k}\\frac{(8.85\\times10^{-12})(${A})}{${d}\\times10^{-3}} = ${T(C * 1e9)}\\ \\text{nF}` }] }; } },
    { id: 'u', title: 'Energy stored', gen() { const C = rint(2, 200); const V = rint(5, 400); const U = 0.5 * C * 1e-6 * V * V; return { prompt: `How much energy is stored in a ${C} µF capacitor charged to ${V} V? Give your answer in mJ.`, givens: [`C = ${C}\\ \\mu\\text{F}`, `V = ${V}\\ \\text{V}`], answer: U * 1000, unit: 'mJ', tol: 0.02, hint: 'U = ½CV².', steps: [{ x: 'Use $U = \\tfrac12CV^2$:', m: `U = \\tfrac12(${C}\\times10^{-6})(${V})^2 = ${T(U)}\\ \\text{J} = ${T(U * 1000)}\\ \\text{mJ}` }] }; } },
    { id: 'ser', title: 'Capacitors in series', gen() { const a = rint(2, 12), b = rint(2, 12); const V = pick([6, 9, 12, 18]); const Ct = a * b / (a + b); return { prompt: `${a} µF and ${b} µF capacitors are connected in SERIES across ${V} V. What is the total capacitance? Give your answer in µF.`, givens: [`C_1 = ${a}\\ \\mu\\text{F},\\ C_2 = ${b}\\ \\mu\\text{F}`, `V = ${V}\\ \\text{V}`], answer: Ct, unit: 'µF', tol: 0.02, hint: 'Series: 1/C = 1/C₁ + 1/C₂ (product over sum for two).', steps: [{ x: 'Product over sum:', m: `C_T = \\frac{(${a})(${b})}{${a}+${b}} = ${T(Ct)}\\ \\mu\\text{F}` }, { x: `Charge on each capacitor $Q = C_TV = ${T(Ct * V)}$ µC.` }] }; } },
    { id: 'par', title: 'Capacitors in parallel', gen() { const a = rint(2, 20), b = rint(2, 20), c = rint(2, 20); const V = pick([6, 9, 12]); return { prompt: `${a} µF, ${b} µF and ${c} µF capacitors are connected in parallel across ${V} V. What is the total charge stored? Give your answer in µC.`, givens: [`C = ${a},\\ ${b},\\ ${c}\\ \\mu\\text{F}`, `V = ${V}\\ \\text{V}`], answer: (a + b + c) * V, unit: 'µC', tol: 0.01, hint: 'Add the capacitances, then Q = C_T V.', steps: [{ x: 'Capacitances add:', m: `C_T = ${a + b + c}\\ \\mu\\text{F}` }, { x: 'Then:', m: `Q = C_TV = (${a + b + c})(${V}) = ${(a + b + c) * V}\\ \\mu\\text{C}` }] }; } }
  ]
};
