import { rint, rf, pick, sig, T } from './util.js';

export default {
  id: 'a4', code: 'A4', title: 'Simple Circuits, Conductors and Insulators', tagline: 'What a closed loop is, and which materials let current through',
  formula: 'I = Q / t',
  objectives: ['Define current and resistance.', 'Build a simple circuit and draw its circuit diagram.', 'Tell conductors from insulators by testing materials.'],
  lesson: [
    { t: 'h', x: 'What is a circuit?' },
    { t: 'p', x: 'An **electric circuit** is a closed loop that lets charge travel in a circle. A simple circuit needs three things:' },
    { t: 'ul', x: ['a **source** that pushes the charge (a battery, here a mono-cell)', 'a **conductive path** for the charge (wires, jumper plugs, leads)', 'a **load** that uses the energy (a bulb)'] },
    { t: 'p', x: 'A switch opens or closes the loop. **Open** the loop and there is a break, so the charge stops everywhere at once. **Close** it and the charge flows again.' },
    { t: 'analogy', title: 'A circular running track', x: 'Picture a circular track with a pump pushing runners around. If a gate is closed anywhere on the track, nobody can run, even if the pump is on.', map: [['Pump', 'battery'], ['Track', 'wires'], ['Gate', 'switch'], ['Runners', 'moving charge']] },
    { t: 'viz', id: 'circuit' },
    { t: 'h', x: 'Current, voltage and resistance' },
    { t: 'p', x: '**Electric current** is how much charge passes a point each second. Its unit is the **ampere** (A): one ampere is one coulomb per second.' },
    { t: 'eq', name: 'Current', tex: 'I = \\frac{Q}{t}', words: 'Current is the **amount of charge** that passes a point **divided by the time** it takes.', vars: [['I', 'current', 'A'], ['Q', 'charge that passes', 'C'], ['t', 'time', 's']] },
    { t: 'p', x: '**Voltage** ($V$, in volts) is the push the source gives each charge. **Resistance** ($R$, in ohms Ω) is how much a part of the circuit opposes the flow. More push gives more current. More resistance gives less current.' },
    { t: 'p', x: 'Ohm’s law (next activity) ties the three together:' },
    { t: 'eq', name: 'Preview of Ohm’s law', tex: 'I = \\frac{V}{R}', words: 'Current goes **up** with voltage and **down** with resistance.', vars: [['I', 'current', 'A'], ['V', 'voltage', 'V'], ['R', 'resistance', 'Ω']] },
    { t: 'note', title: 'Direction of current', x: 'By convention, current is drawn flowing from the **positive** terminal around to the negative terminal. The charges actually moving in a metal wire are electrons, which travel the *other* way. Both pictures give the same results in circuit calculations.' },
    { t: 'h', x: 'Circuit symbols' },
    { t: 'table', head: ['Part', 'Symbol idea', 'Job'], rows: [['Cell / battery', 'A long line and a short line; long = positive', 'Pushes charge'], ['Bulb (lamp)', 'A circle with a cross', 'Shows current by glowing'], ['Switch (SPST)', 'A gap with a lever arm', 'Opens or closes the loop'], ['Resistor', 'A zig-zag line', 'Opposes current'], ['Wire', 'A straight line', 'Carries charge']] },
    { t: 'h', x: 'Part 1: building a simple circuit' },
    { t: 'p', x: 'You connect the mono-cell, a bulb and a switch in one loop. The lab asks what happens when you swap their order.' },
    { t: 'key', title: 'Order does not matter in a single loop', x: 'In a loop with only one path, the **same current** flows through every part. So you can swap the battery, bulb and switch around and the bulb is **just as bright**. There are $3! = 3\\times2\\times1 = 6$ ways to order the three parts in a row.' },
    { t: 'ul', x: ['**Turning the light off:** open the switch. Opening it anywhere in the loop breaks the loop.', '**Replace the switch with a jumper plug:** a jumper is just a conducting link. The bulb stays lit, but you can no longer turn it off.', '**Replace jumper plugs with connecting leads:** leads are also conductors. Brightness is essentially the same.', '**Replace Type A (2.5 V, 0.1 A) with Type B (12 V, 3 W):** the 1.5 V cell is far too small for a 12 V bulb, so Type B glows very dimly or not at all.'] },
    { t: 'p', x: 'The bulb ratings tell you the bulb’s resistance. Using $R = V/I$ for Type A and $R = V^2/P$ for Type B:' },
    { t: 'worked', title: 'Worked example: why Type B is dim on a mono-cell', steps: [
      { x: 'Type A (2.5 V, 0.1 A):', m: 'R_A = \\frac{2.5}{0.1} = 25\\ \\Omega' },
      { x: 'Type B (12 V, 3 W). Power $P = V^2/R$, so:', m: 'R_B = \\frac{V^2}{P} = \\frac{12^2}{3} = 48\\ \\Omega' },
      { x: 'On a 1.5 V cell, the current through B is:', m: 'I_B = \\frac{1.5}{48} \\approx 0.031\\ \\text{A}' },
      { x: 'It needs 0.25 A (3 W / 12 V) to glow fully, so only about 12% of the proper current flows. It barely lights.' }
    ] },
    { t: 'h', x: 'Part 2: conductors and insulators' },
    { t: 'p', x: 'A **conductor** has many electrons that are free to move, so it lets current through easily. Metals are conductors. An **insulator** holds its electrons tightly, so almost no current flows. Insulators are used to keep electricity where we want it.' },
    { t: 'table', head: ['Material', 'Type', 'Why'], rows: [['Aluminum', '**Conductor**', 'metal, free electrons'], ['Brass', '**Conductor**', 'metal alloy'], ['Copper', '**Conductor**', 'metal, excellent'], ['Tin', '**Conductor**', 'metal'], ['Wood', '**Insulator**', 'no free electrons'], ['Polystyrene (gray)', '**Insulator**', 'plastic'], ['Pertinax (brown)', '**Insulator**', 'resin-bonded paper'], ['Paper', '**Insulator**', 'no free electrons']] },
    { t: 'lab', x: 'To test a material, put it in the plug-in clamps in the gap of the circuit. If the bulb lights, the material completed the loop, so it conducts.' },
    { t: 'check', q: 'You put a piece of paper in the test gap and close the switch. The bulb stays dark. What do you conclude?', o: ['The battery is flat', 'Paper is an insulator', 'Paper is a conductor', 'The bulb is the wrong type'], a: 1, why: 'The loop is complete except for the paper, so the paper must be blocking current: it is an insulator.' },
    { t: 'h', x: 'Part 3: testing resistances' },
    { t: 'p', x: 'Swap the clamps for a 47 Ω resistor, then a 100 Ω resistor, with the 12 V source and the Type B bulb in series. A bigger resistance leaves less current for the bulb.' },
    { t: 'worked', title: 'Worked example: bulb brightness with a resistor', steps: [
      { x: 'Resistors in series add. With the 47 Ω resistor and the 48 Ω bulb:', m: 'I = \\frac{12}{48 + 47} = 0.126\\ \\text{A}' },
      { x: 'With the 100 Ω resistor:', m: 'I = \\frac{12}{48 + 100} = 0.081\\ \\text{A}' },
      { x: 'So **less** current flows through the 100 Ω resistor than through the 47 Ω one, and the bulb is dimmer.' }
    ] },
    { t: 'key', title: 'Guide question 7', x: 'More resistance means *less* current. Less current flows with the 100 Ω resistor than with the 47 Ω resistor, so the bulb is dimmer.' }
  ],
  terms: [
    ['Electric circuit', 'A closed loop that lets charge flow.'],
    ['Current (I)', 'The rate of flow of charge: charge per second. Unit: ampere (A).'],
    ['Voltage (V)', 'The electrical push per unit charge. Unit: volt (V).'],
    ['Resistance (R)', 'Opposition to current. Unit: ohm (Ω).'],
    ['Source', 'The part that supplies the push, such as a battery or mono-cell.'],
    ['Load', 'The part that uses the energy, such as a bulb.'],
    ['Switch (SPST)', 'Single-pole single-throw switch: opens or closes one path.'],
    ['Open circuit', 'A circuit with a break; no current flows.'],
    ['Closed circuit', 'A complete loop; current flows.'],
    ['Conductor', 'A material with many free electrons that conducts well.'],
    ['Insulator', 'A material that resists the flow of charge.'],
    ['Jumper plug', 'A short conducting link used to connect points on the plug-in board.'],
    ['Circuit diagram', 'A drawing of a circuit using standard symbols.'],
    ['Resistor', 'A component made to have a specific resistance.']
  ],
  formulas: [
    ['Current', 'I = \\dfrac{Q}{t}', '1 A = 1 C/s'],
    ['Ohm’s law', 'V = I R', 'Voltage, current, resistance'],
    ['Bulb resistance from ratings', 'R = \\dfrac{V^2}{P}', 'From P = V²/R'],
    ['Series resistors', 'R_T = R_1 + R_2 + \\cdots', 'Same current'],
    ['Number of orderings', 'n! = n(n-1)\\cdots 1', '3! = 6']
  ],
  quiz: [
    { q: 'What three things does a simple circuit need?', o: ['A source, a path, a load', 'Only a battery', 'A bulb and a magnet', 'A switch and a resistor only'], a: 0, why: 'The source pushes, the path carries, the load uses the energy.' },
    { q: 'Electric current is…', o: ['voltage per ohm squared', 'charge flowing per second', 'energy stored in a bulb', 'resistance per volt'], a: 1, why: '$I = Q/t$.' },
    { q: 'How many ways can a battery, a bulb and a switch be ordered in a row?', o: ['3', '6', '9', '2'], a: 1, why: '$3! = 6$.' },
    { q: 'Swapping the order of the parts in a single-loop circuit changes the bulb brightness…', o: ['a lot', 'not at all, because the same current flows through every part', 'only if the switch is first', 'only if the battery is last'], a: 1, why: 'There is just one path, so the current is the same everywhere.' },
    { q: 'Which of these is an insulator?', o: ['Brass', 'Tin', 'Wood', 'Copper'], a: 2, why: 'Wood has no free electrons to carry current.' },
    { q: 'Why is a Type B bulb (12 V, 3 W) almost dark on a 1.5 V mono-cell?', o: ['It is broken', 'The voltage is far too small to drive its rated current', 'It needs AC', 'Its filament is cold'], a: 1, why: '1.5 V pushes only about 31 mA through its 48 Ω, far less than the 250 mA it needs.' },
    { q: 'Replacing the switch with a jumper plug makes the bulb…', o: ['turn off for good', 'burn brighter than before', 'stay lit, and you cannot switch it off', 'flicker'], a: 2, why: 'A jumper is a plain conductor, so the loop stays closed.' },
    { q: 'Which flows more current: the 47 Ω or the 100 Ω resistor (same voltage)?', o: ['The 47 Ω', 'The 100 Ω', 'Both equal', 'Neither'], a: 0, why: '$I = V/R$: smaller $R$, larger $I$.' },
    { q: 'What does opening the switch do?', o: ['Doubles the current', 'Breaks the loop so current stops', 'Reverses the current', 'Adds resistance only'], a: 1, why: 'An open switch makes an open circuit, so nothing flows anywhere in the loop.' },
    { q: 'In the symbol for a cell, the longer line represents the…', o: ['negative terminal', 'positive terminal', 'switch', 'ground'], a: 1, why: 'Long = positive, short = negative.' }
  ],
  problems: [
    { id: 'iqt', title: 'Current from charge and time', gen() {
      const Q = rf(0.5, 12, 1); const t = rint(2, 30); const I = Q / t;
      return { prompt: `A charge of ${Q} C passes through a bulb in ${t} s. What is the current?`, givens: [`Q = ${Q}\\ \\text{C}`, `t = ${t}\\ \\text{s}`], answer: I, unit: 'A', tol: 0.02, hint: 'I = Q / t.', steps: [{ x: 'Current is charge per second:', m: `I = \\frac{Q}{t} = \\frac{${Q}}{${t}} = ${T(I)}\\ \\text{A}` }] };
    } },
    { id: 'qit', title: 'Charge from current', gen() {
      const I = rf(0.05, 0.9, 2); const t = rint(10, 120); const Q = I * t;
      return { prompt: `A bulb draws ${I} A for ${t} s. How much charge passes through it?`, givens: [`I = ${I}\\ \\text{A}`, `t = ${t}\\ \\text{s}`], answer: Q, unit: 'C', hint: 'Rearrange I = Q/t into Q = I t.', steps: [{ x: 'Charge = current × time:', m: `Q = It = (${I})(${t}) = ${T(Q)}\\ \\text{C}` }] };
    } },
    { id: 'bulbR', title: 'Resistance of a bulb from its rating', gen() {
      const V = pick([6, 12, 24]); const P = pick([3, 5, 6, 10]); const R = V * V / P;
      return { prompt: `A bulb is rated ${V} V, ${P} W. What is its resistance when operating normally?`, givens: [`V = ${V}\\ \\text{V}`, `P = ${P}\\ \\text{W}`], answer: R, unit: 'Ω', tol: 0.02, hint: 'P = V²/R, so R = V²/P.', steps: [{ x: 'Use the power formula rearranged:', m: `R = \\frac{V^2}{P} = \\frac{${V}^2}{${P}} = ${T(R)}\\ \\Omega` }] };
    } },
    { id: 'bulbRes', title: 'Current through a bulb in series with a resistor', gen() {
      const Rb = 48; const Rx = pick([47, 100, 150, 220]); const V = 12; const I = V / (Rb + Rx);
      return { prompt: `A 12 V source drives a 48 Ω bulb in series with a ${Rx} Ω resistor. What current flows? (Enter in mA.)`, givens: [`V = 12\\ \\text{V}`, `R_{\\text{bulb}} = 48\\ \\Omega`, `R_x = ${Rx}\\ \\Omega`], answer: I * 1000, unit: 'mA', tol: 0.02, hint: 'Add the resistances (series), then I = V / R_total.', steps: [{ x: 'Total resistance:', m: `R_T = 48 + ${Rx} = ${48 + Rx}\\ \\Omega` }, { x: 'Current:', m: `I = \\frac{12}{${48 + Rx}} = ${T(I)}\\ \\text{A} = ${T(I * 1000)}\\ \\text{mA}` }] };
    } }
  ]
};
