import { rint, rf, pick, sig, T } from './util.js';

const CFG = [[100e3, 470e-6, '100\\ \\text{k}\\Omega', '470\\ \\mu\\text{F}', 'R = 100 kΩ, C = 470 µF'], [100e3, 100e-6, '100\\ \\text{k}\\Omega', '100\\ \\mu\\text{F}', 'R = 100 kΩ, C = 100 µF'], [10e3, 100e-6, '10\\ \\text{k}\\Omega', '100\\ \\mu\\text{F}', 'R = 10 kΩ, C = 100 µF']];

export default {
  id: 'a5', code: 'A5', title: 'Voltage Variation in a Capacitor', tagline: 'How capacitors charge and discharge on an RC clock',
  formula: 'τ = R C',
  objectives: ['Find the voltage on a charging or discharging capacitor at any time.', 'Describe how capacitance and resistance change the voltage curve.', 'Plot voltage against time for charging and discharging.'],
  lesson: [
    { t: 'h', x: 'What is a capacitor?' },
    { t: 'p', x: 'A **capacitor** stores electrical energy in an electric field between two metal plates. Radios, computers and flash cameras use capacitors to hold energy and release it when needed.' },
    { t: 'p', x: '**Capacitance** ($C$) says how much charge a capacitor holds for each volt across it. A big capacitance is a big “bucket”.' },
    { t: 'eq', name: 'Capacitance', tex: 'C = \\frac{Q}{V}', words: 'Capacitance is **charge stored per volt**. A 470 µF capacitor stores more charge at the same voltage than a 100 µF one.', vars: [['C', 'capacitance (farads)', 'F'], ['Q', 'charge on the plates', 'C'], ['V', 'voltage across the capacitor', 'V']] },
    { t: 'note', title: 'Prefixes you need', x: '$1\\ \\mu\\text{F} = 10^{-6}\\ \\text{F}$, so $470\\ \\mu\\text{F} = 470\\times10^{-6}\\ \\text{F}$. And $1\\ \\text{k}\\Omega = 1000\\ \\Omega$, so $100\\ \\text{k}\\Omega = 100\\,000\\ \\Omega$.' },
    { t: 'h', x: 'Why does it take time?' },
    { t: 'p', x: 'When you connect a capacitor to a battery through a resistor, charge does not rush in all at once. The resistor limits the current. At first the capacitor is empty, so charge flows quickly. As the plates fill, they push back on new charge, so the current slows down. The voltage rises fast at first, then slower and slower, following an **exponential curve**.' },
    { t: 'analogy', title: 'Filling a bucket through a straw', x: 'Imagine filling a bucket from a tank through a straw. At the beginning the water rushes in. As the bucket fills, the pressure difference shrinks, so the flow slows to a trickle.', map: [['Bucket size', 'capacitance $C$'], ['Narrow straw', 'resistance $R$ (narrower = bigger $R$)'], ['Water level in the bucket', 'capacitor voltage $V_C$'], ['Full bucket', 'supply voltage $V_s$']] },
    { t: 'viz', id: 'rc' },
    { t: 'h', x: 'The time constant' },
    { t: 'p', x: 'The **time constant** $\\tau$ (tau) is the natural “clock” of the circuit. A larger resistor (narrower straw) or larger capacitor (bigger bucket) both make it slower.' },
    { t: 'eq', name: 'Time constant', tex: '\\tau = R\\,C', words: 'Multiply resistance by capacitance. The answer is in **seconds**.', vars: [['\\tau', 'time constant', 's'], ['R', 'resistance', 'Ω'], ['C', 'capacitance', 'F']] },
    { t: 'key', title: 'What does τ mean?', x: 'After one time constant, a charging capacitor has reached about **63%** of the supply voltage. After about **5τ** it is, for practical purposes, fully charged (over 99%).' },
    { t: 'h', x: 'Charging' },
    { t: 'eq', name: 'Voltage while charging', tex: 'V_C = V_s\\left(1 - e^{-t/RC}\\right)', words: 'Starts at **0**, climbs toward $V_s$. The $e^{-t/RC}$ part shrinks as time goes on, so $1 - e^{-t/RC}$ approaches 1.', vars: [['V_C', 'voltage across the capacitor at time $t$', 'V'], ['V_s', 'supply voltage', 'V'], ['t', 'time since the supply was connected', 's'], ['R,\\ C', 'resistance and capacitance', 'Ω, F']] },
    { t: 'h', x: 'Discharging' },
    { t: 'p', x: 'To discharge, remove the supply and connect the capacitor’s two ends through the resistor. The stored charge leaks away, fast at first, then slowly.' },
    { t: 'eq', name: 'Voltage while discharging', tex: 'V_C = V_i\\, e^{-t/RC}', words: 'Starts at the initial voltage $V_i$ and **decays** toward 0.', vars: [['V_i', 'initial voltage across the capacitor', 'V'], ['t', 'time since discharging began', 's']] },
    { t: 'table', head: ['Time', 'Charging (% of V_s)', 'Discharging (% of V_i)'], rows: [['1τ', '63.2%', '36.8%'], ['2τ', '86.5%', '13.5%'], ['3τ', '95.0%', '5.0%'], ['4τ', '98.2%', '1.8%'], ['5τ', '99.3%', '0.7%'], ['6τ', '99.8%', '0.2%']] },
    { t: 'warn', title: 'Fully charged is a matter of degree', x: 'Mathematically the exponential never quite reaches the end. In practice we call the capacitor “full” after about 5τ (the lab uses 6τ), when it is within 1% of $V_s$.' },
    { t: 'h', x: 'In the lab' },
    { t: 'ol', x: ['Build the circuit with 470 µF and 100 kΩ. Capacitor must start uncharged.', 'Connect the voltmeter **in parallel** with the capacitor. Set the supply to 12 V.', 'Compute $\\tau$, then fill in the time column of the table as multiples of $\\tau$.', 'Start the timer at the same moment as the supply and record $V_C$ at each time.', 'To discharge, take out the supply and connect a lead across the capacitor and resistor. Reset the timer and record again.', 'Repeat with 100 kΩ & 100 µF, and 10 kΩ & 100 µF.'] },
    { t: 'table', head: ['Trial', 'R', 'C', 'τ = RC', '5τ (about full)'], rows: [['1', '100 kΩ', '470 µF', '47 s', '235 s'], ['2a', '100 kΩ', '100 µF', '10 s', '50 s'], ['2b', '10 kΩ', '100 µF', '1 s', '5 s']] },
    { t: 'worked', title: 'Worked example: charging at t = 1τ', steps: [
      { x: 'Trial 1: $R = 100\\,000\\ \\Omega$, $C = 470\\times10^{-6}\\ \\text{F}$, $V_s = 12\\ \\text{V}$.' },
      { x: 'Time constant:', m: '\\tau = RC = (100\\,000)(470\\times10^{-6}) = 47\\ \\text{s}' },
      { x: 'Voltage at $t = 47$ s (which is exactly one τ):', m: 'V_C = 12\\left(1 - e^{-47/47}\\right) = 12(1 - 0.368) = 7.59\\ \\text{V}' },
      { x: 'Voltage level as a percentage of the supply:', m: '\\frac{7.59}{12}\\times100 = 63.2\\%' }
    ] },
    { t: 'check', q: 'You double the resistance but keep the same capacitor. The capacitor now charges…', o: ['faster', 'slower', 'at the same speed', 'to a higher final voltage'], a: 1, why: '$\\tau = RC$ doubles, so charging takes twice as long. The final voltage is still $V_s$.' },
    { t: 'h', x: 'Guide questions, answered' },
    { t: 'worked', title: 'Q2 and Q3: trial 1 after 47 s', steps: [
      { x: 'Charging (a): $V_C = 7.59$ V, since $t = \\tau$.' },
      { x: '(c) Compared to full charge (12 V), it has risen to 63.2%, an increase of 7.59 V from zero.' },
      { x: 'Discharging from 12 V, after 47 s:', m: 'V_C = 12\\,e^{-1} = 12(0.368) = 4.42\\ \\text{V}' },
      { x: 'It has **dropped by** $12 - 4.42 = 7.58$ V, i.e. 63.2%.' }
    ] },
    { t: 'worked', title: 'Q2(d): trial 2 (100 kΩ, 100 µF) after 10 s', steps: [
      { x: '$\\tau = (100\\,000)(100\\times10^{-6}) = 10$ s, so again $t = \\tau$.' },
      { x: 'Voltage:', m: 'V_C = 12(1 - e^{-1}) = 7.59\\ \\text{V}, \\text{an increase of } 7.59\\ \\text{V}' }
    ] },
    { t: 'key', title: 'Q1 and Q4: effect of resistance', x: 'With the **smaller resistance** (10 kΩ vs 100 kΩ) $\\tau$ is 10 times smaller, so the capacitor charges **and** discharges about ten times faster. A smaller resistor is a wider straw.' },
    { t: 'h', x: 'Going further: energy and charge' },
    { t: 'eq', name: 'Energy stored in a capacitor', tex: 'U = \\tfrac{1}{2} C V^2', words: 'The energy grows with the **square** of the voltage. Doubling the voltage stores four times the energy.', vars: [['U', 'stored energy', 'J'], ['C', 'capacitance', 'F'], ['V', 'voltage', 'V']] }
  ],
  terms: [
    ['Capacitor', 'A component that stores energy in an electric field between two plates.'],
    ['Capacitance (C)', 'Charge stored per volt, $C = Q/V$. Unit: farad (F).'],
    ['Farad', 'Unit of capacitance. 1 F = 1 C/V. Capacitors are usually µF.'],
    ['Time constant (τ)', '$\\tau = RC$. Time for a charging capacitor to reach 63.2% of the supply voltage.'],
    ['Charging', 'Process of charge building up on the plates; voltage rises.'],
    ['Discharging', 'Process of charge leaving the plates; voltage falls.'],
    ['Exponential curve', 'A curve that changes fast at first then more and more slowly.'],
    ['Steady state', 'The final condition where the voltage no longer changes (after about 5τ).'],
    ['Voltmeter', 'Instrument for measuring voltage. Connected in **parallel**.'],
    ['Supply voltage (Vₛ)', 'The voltage of the power source that charges the capacitor.'],
    ['Voltage level (%)', '$V_C/V_s \\times 100$: how full the capacitor is.'],
    ['Electric field', 'The region around charges where other charges feel a force; energy is stored here.']
  ],
  formulas: [
    ['Capacitance', 'C = \\dfrac{Q}{V}', 'Farads = coulombs / volt'],
    ['Time constant', '\\tau = R\\,C', 'Seconds'],
    ['Charging', 'V_C = V_s\\left(1 - e^{-t/RC}\\right)', '0 → Vₛ'],
    ['Discharging', 'V_C = V_i\\, e^{-t/RC}', 'Vᵢ → 0'],
    ['Stored energy', 'U = \\tfrac12 C V^2', 'Joules'],
    ['Time to reach a voltage (charging)', 't = -RC\\,\\ln\\!\\left(1 - \\dfrac{V_C}{V_s}\\right)', 'Solved for t']
  ],
  quiz: [
    { q: 'What is the time constant of a 100 kΩ resistor with a 470 µF capacitor?', o: ['4.7 s', '47 s', '470 s', '0.47 s'], a: 1, why: '$\\tau = (100\\,000)(470\\times10^{-6}) = 47$ s.' },
    { q: 'After one time constant of charging, the capacitor voltage is about…', o: ['37% of $V_s$', '50% of $V_s$', '63% of $V_s$', '100% of $V_s$'], a: 2, why: '$1 - e^{-1} \\approx 0.632$.' },
    { q: 'After one time constant of DISCHARGING, the voltage is about…', o: ['37% of the initial value', '63% of the initial value', '0%', '50%'], a: 0, why: '$e^{-1} \\approx 0.368$.' },
    { q: 'After about how many time constants is a capacitor considered fully charged?', o: ['0.5τ', '1τ', '2τ', '5τ'], a: 3, why: 'At 5τ it has reached over 99% of $V_s$.' },
    { q: 'The voltmeter is connected to the capacitor…', o: ['in series', 'in parallel', 'not at all', 'only to the resistor'], a: 1, why: 'Voltmeters always go in parallel with what they measure.' },
    { q: 'Increasing $R$ (same $C$) makes charging…', o: ['faster', 'slower', 'unchanged', 'impossible'], a: 1, why: '$\\tau = RC$ increases.' },
    { q: 'The capacitor starts uncharged. What is $V_C$ at $t = 0$ when charging?', o: ['$V_s$', '0 V', '$0.63V_s$', 'Infinite'], a: 1, why: '$V_s(1 - e^0) = 0$.' },
    { q: '470 µF equals…', o: ['$470\\times10^{-3}$ F', '$470\\times10^{-6}$ F', '$470\\times10^{-9}$ F', '$470$ F'], a: 1, why: 'Micro (µ) means $10^{-6}$.' },
    { q: 'Compared to 100 kΩ, using 10 kΩ with the same capacitor makes the time constant…', o: ['10 times larger', '10 times smaller', 'the same', '100 times smaller'], a: 1, why: '$\\tau \\propto R$.' },
    { q: 'What shape does the charging voltage graph have?', o: ['A straight line', 'An exponential rise that levels off', 'A sine wave', 'A staircase'], a: 1, why: 'Fast at first, then flattening toward $V_s$.' },
    { q: 'Why does charging slow down as the capacitor fills?', o: ['The resistor heats up', 'The growing capacitor voltage opposes the supply, so less current flows', 'The battery runs out', 'Electrons get tired'], a: 1, why: 'Current = (supply − capacitor voltage)/R, and the difference shrinks.' }
  ],
  problems: [
    { id: 'tau', title: 'Time constant', gen() {
      const R = pick([10, 22, 47, 100, 150, 220]); const C = pick([47, 100, 220, 330, 470, 1000]); const tau = R * 1e3 * C * 1e-6;
      return { prompt: `What is the time constant of a ${R} kΩ resistor in series with a ${C} µF capacitor?`, givens: [`R = ${R}\\ \\text{k}\\Omega = ${R * 1000}\\ \\Omega`, `C = ${C}\\ \\mu\\text{F} = ${T(C * 1e-6)}\\ \\text{F}`], answer: tau, unit: 's', hint: 'τ = R × C in ohms and farads.', steps: [{ x: 'Convert to ohms and farads, then multiply:', m: `\\tau = RC = (${R * 1000})(${T(C * 1e-6)}) = ${T(tau)}\\ \\text{s}` }] };
    } },
    { id: 'chg', title: 'Voltage while charging', gen() {
      const [R, C] = pick(CFG); const Vs = pick([6, 9, 12]); const tau = R * C; const mult = pick([0.5, 1, 1.5, 2, 3]); const t = +(mult * tau).toFixed(1); const V = Vs * (1 - Math.exp(-t / tau));
      return { prompt: `A ${R / 1000} kΩ resistor charges a ${C * 1e6} µF capacitor from a ${Vs} V supply (starting uncharged). What is the capacitor voltage after ${t} s?`, givens: [`R = ${T(R)}\\ \\Omega`, `C = ${T(C)}\\ \\text{F}`, `V_s = ${Vs}\\ \\text{V}`, `t = ${t}\\ \\text{s}`], answer: V, unit: 'V', tol: 0.02, hint: 'Find τ first. Then V = Vₛ(1 − e^(−t/τ)).',
        steps: [{ x: 'Time constant:', m: `\\tau = RC = ${T(tau)}\\ \\text{s}` }, { x: 'Charging equation:', m: `V_C = ${Vs}\\left(1 - e^{-${t}/${T(tau)}}\\right) = ${T(V)}\\ \\text{V}` }] };
    } },
    { id: 'dis', title: 'Voltage while discharging', gen() {
      const [R, C] = pick(CFG); const Vi = pick([6, 9, 12]); const tau = R * C; const mult = pick([0.5, 1, 2, 3]); const t = +(mult * tau).toFixed(1); const V = Vi * Math.exp(-t / tau);
      return { prompt: `A capacitor charged to ${Vi} V discharges through a ${R / 1000} kΩ resistor. Its capacitance is ${C * 1e6} µF. What is its voltage ${t} s after discharging starts?`, givens: [`V_i = ${Vi}\\ \\text{V}`, `\\tau = RC = ${T(tau)}\\ \\text{s}`, `t = ${t}\\ \\text{s}`], answer: V, unit: 'V', tol: 0.02, hint: 'V = Vᵢ e^(−t/τ).', steps: [{ x: 'Time constant:', m: `\\tau = ${T(tau)}\\ \\text{s}` }, { x: 'Discharging equation:', m: `V_C = ${Vi}\\,e^{-${t}/${T(tau)}} = ${T(V)}\\ \\text{V}` }] };
    } },
    { id: 'tfull', title: 'Time to charge fully', gen() {
      const R = pick([10, 47, 100]); const C = pick([100, 220, 470]); const tau = R * 1e3 * C * 1e-6;
      return { prompt: `About how long does it take (5τ) for a ${C} µF capacitor charging through ${R} kΩ to be considered fully charged?`, givens: [`R = ${R}\\ \\text{k}\\Omega`, `C = ${C}\\ \\mu\\text{F}`], answer: 5 * tau, unit: 's', tol: 0.03, hint: 'Compute τ = RC, then multiply by 5.', steps: [{ x: 'Time constant:', m: `\\tau = (${R * 1000})(${T(C * 1e-6)}) = ${T(tau)}\\ \\text{s}` }, { x: 'Full charge ≈ 5τ:', m: `5\\tau = ${T(5 * tau)}\\ \\text{s}` }] };
    } },
    { id: 'energy', title: 'Energy stored', gen() {
      const C = pick([100, 220, 470, 1000]); const V = pick([6, 9, 12, 15]); const U = 0.5 * C * 1e-6 * V * V;
      return { prompt: `How much energy is stored in a ${C} µF capacitor charged to ${V} V? Enter in millijoules (mJ).`, givens: [`C = ${C}\\ \\mu\\text{F}`, `V = ${V}\\ \\text{V}`], answer: U * 1000, unit: 'mJ', tol: 0.02, hint: 'U = ½ C V². Convert joules to mJ by × 1000.', steps: [{ x: 'Energy formula:', m: `U = \\tfrac12 CV^2 = \\tfrac12(${T(C * 1e-6)})(${V})^2 = ${T(U)}\\ \\text{J} = ${T(U * 1000)}\\ \\text{mJ}` }] };
    } }
  ]
};
