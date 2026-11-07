import { rint, rf, pick, sig, T } from './util.js';

const MATS = [['brass', 2.0e-5], ['steel', 1.2e-5], ['aluminum', 2.4e-5], ['copper', 1.7e-5]];

export default {
  id: 'a2', code: 'A2', title: 'Coefficient of Linear Expansion', tagline: 'Why bridges have gaps and rails can buckle',
  formula: 'ΔL = α L₀ ΔT',
  objectives: ['Measure the linear expansion of brass and steel rods.', 'Calculate each metal’s coefficient of linear expansion.', 'Describe how a temperature change affects a solid’s length.'],
  lesson: [
    { t: 'h', x: 'The big idea' },
    { t: 'p', x: '**Expansion** means getting bigger. If the growth happens mostly in one direction (the length of a rod), it is **linear expansion**. Heat a metal rod and it gets a tiny bit longer. Cool it and it shrinks.' },
    { t: 'p', x: 'Why? Atoms in a solid are never still. They vibrate around fixed spots. Add heat and they vibrate with larger swings. Bigger swings need more room, so the average spacing between atoms grows, and the whole rod gets longer.' },
    { t: 'analogy', title: 'A crowd of dancers', x: 'Imagine people in a line, each dancing in place. Slow music: they stay close together. Fast music: everybody’s arms and legs swing wide, so the line needs more floor space.', map: [['Dancers', 'atoms'], ['Faster music', 'higher temperature'], ['Bigger moves, longer line', 'linear expansion']] },
    { t: 'viz', id: 'expansion' },
    { t: 'h', x: 'The equation' },
    { t: 'p', x: 'For a modest temperature change the growth is **directly proportional** to both the original length and the temperature change. Double either one and the growth doubles.' },
    { t: 'eq', name: 'Linear expansion', tex: '\\Delta L = \\alpha \\, L_o \\, \\Delta T', words: 'Change in length = (a number that depends on the material) × (how long the rod was) × (how much warmer it got).',
      vars: [['\\Delta L', 'change in length, $L_f - L_o$', 'mm or m'], ['\\alpha', 'coefficient of linear expansion', '1/°C'], ['L_o', 'original length', 'mm or m'], ['\\Delta T', 'change in temperature, $T_f - T_o$', '°C']] },
    { t: 'p', x: 'In the lab you measure $\\Delta L$ with a dial gauge, so rearrange the equation to solve for $\\alpha$:' },
    { t: 'eq', name: 'Coefficient of linear expansion', tex: '\\alpha = \\frac{\\Delta L}{L_o \\, \\Delta T}', words: 'How much each unit of length grows per degree of warming. It is a **property of the material**, like density.', vars: [['\\Delta L', 'dial gauge reading (each line = 0.01 mm)', 'mm'], ['L_o', 'original rod length', 'mm'], ['\\Delta T', '$T_f - T_o$', '°C']] },
    { t: 'key', title: 'Reading α', x: 'Brass has $\\alpha = 2\\times10^{-5}\\ ^\\circ\\text{C}^{-1}$. That means every **1 m** of brass grows **0.02 mm** for every 1 °C of warming. Tiny, but it adds up over long lengths or big temperature swings.' },
    { t: 'table', head: ['Metal', 'Theoretical α (per °C)'], rows: [['Brass', '$2\\times10^{-5}$'], ['Steel', '$1.2\\times10^{-5}$']] },
    { t: 'note', title: 'Do I need units of length to match?', x: 'Only that $\\Delta L$ and $L_o$ use the **same unit**. Then the lengths cancel and $\\alpha$ comes out as a pure “per °C”.' },
    { t: 'h', x: 'In the lab' },
    { t: 'ol', x: ['Half-fill the steam generator with water and measure the rod length $L_o$.', 'Connect the rod to the steam generator with the silicone tubing and zero the dial gauge.', 'Read the starting temperature $T_o$ with the thermometer placed on the middle of the rod (not near the dial gauge).', 'Switch on the steam. Wait until the dial needle stops moving, then read the highest temperature $T_f$ and the dial reading.', 'Compute $\\alpha$. Do two trials per metal, average them, then find the percent error.'] },
    { t: 'warn', title: 'Reading the dial', x: 'One division on the dial gauge is **0.01 mm**. If the needle moved 80 divisions, $\\Delta L = 80 \\times 0.01 = 0.80\\ \\text{mm}$. Do not forget to multiply.' },
    { t: 'lab', x: 'Safety: check the tubing connection so no hot steam or water escapes. Let the first rod cool before swapping in the second, and use a cloth to hold hot parts.' },
    { t: 'worked', title: 'Worked example: a brass rod', steps: [
      { x: 'Brass rod: $L_o = 600\\ \\text{mm}$, $T_o = 25\\ ^\\circ\\text{C}$, $T_f = 97\\ ^\\circ\\text{C}$. The dial moved 80 lines.' },
      { x: 'Temperature change:', m: '\\Delta T = 97 - 25 = 72\\ ^\\circ\\text{C}' },
      { x: 'Length change from the dial:', m: '\\Delta L = 80 \\times 0.01 = 0.80\\ \\text{mm}' },
      { x: 'Coefficient:', m: '\\alpha = \\frac{0.80}{(600)(72)} = 1.85\\times10^{-5}\\ ^\\circ\\text{C}^{-1}' },
      { x: 'Percent error against $2\\times10^{-5}$:', m: '\\frac{|2.0\\times10^{-5}-1.85\\times10^{-5}|}{2.0\\times10^{-5}}\\times100 \\approx 7.4\\%' }
    ] },
    { t: 'check', q: 'You double the temperature RISE of a steel rod. Its growth…', o: ['stays the same', 'doubles', 'quadruples', 'halves'], a: 1, why: '$\\Delta L$ is proportional to $\\Delta T$, so doubling $\\Delta T$ doubles $\\Delta L$.' },
    { t: 'h', x: 'Guide questions, answered' },
    { t: 'p', x: '**Q1. Compare your α for brass and steel.** Brass should come out larger than steel (about $2\\times10^{-5}$ vs $1.2\\times10^{-5}$), so for the same rod length and warming, brass grows more.' },
    { t: 'p', x: '**Q2. Sources of error.** The rod may not be fully heated when you read it, the thermometer may not touch the rod, heat escapes to the air, the dial gauge was not zeroed, the tube was clamped too tightly so the rod could not move freely, and the needle may have been nudged by the thermometer.' },
    { t: 'worked', title: 'Q3. Steel bridge 4,200 ft long, 0 °C to +40 °C, α = 1.5×10⁻⁵ per °C', steps: [
      { x: 'Temperature change:', m: '\\Delta T = 40 - 0 = 40\\ ^\\circ\\text{C}' },
      { x: 'Growth:', m: '\\Delta L = \\alpha L_o \\Delta T = (1.5\\times10^{-5})(4200)(40) = 2.52\\ \\text{ft}' },
      { x: 'Final length = original + growth:', m: 'L_f = 4200 + 2.52 = 4202.52\\ \\text{ft}' },
      { x: 'That is why bridges have expansion joints: 2.5 feet of growth has to go somewhere.' }
    ] }
  ],
  terms: [
    ['Expansion', 'An increase in size or volume, usually caused by heating.'],
    ['Linear expansion', 'Expansion in one dimension, a change in length.'],
    ['Coefficient of linear expansion (α)', 'Fractional change in length per degree of temperature change. A property of the material. Units: per °C or per K.'],
    ['Thermal expansion', 'Expansion due to a rise in temperature.'],
    ['Dial gauge', 'A precise instrument that reads tiny length changes. One line on the lab’s gauge = 0.01 mm.'],
    ['Steam generator', 'The heat source that sends steam through the rod to warm it evenly.'],
    ['ΔT', 'Change in temperature, final minus initial.'],
    ['ΔL', 'Change in length, final minus initial.'],
    ['Expansion joint', 'A gap built into bridges, rails and pavements to leave room for expansion.'],
    ['Percent error', 'How far a measured value is from the accepted value, as a percent of the accepted value.']
  ],
  formulas: [
    ['Linear expansion', '\\Delta L = \\alpha\\, L_o\\, \\Delta T', 'Growth is proportional to L₀ and ΔT'],
    ['Coefficient α', '\\alpha = \\dfrac{\\Delta L}{L_o\\,\\Delta T}', 'Solved for α'],
    ['Temperature change', '\\Delta T = T_f - T_o', 'Final minus initial'],
    ['Final length', 'L_f = L_o + \\Delta L', 'After heating'],
    ['Percent error', '\\dfrac{|\\alpha_{\\text{theo}}-\\alpha_{\\text{exp}}|}{\\alpha_{\\text{theo}}}\\times100', 'Against accepted α']
  ],
  quiz: [
    { q: 'What causes a solid rod to lengthen when heated?', o: ['Atoms get heavier', 'Atoms vibrate with larger swings, increasing average spacing', 'Atoms are created', 'Electrons leave the metal'], a: 1, why: 'More thermal energy means bigger vibrations and a larger average distance between atoms.' },
    { q: 'The unit of the coefficient of linear expansion is…', o: ['m/°C', '°C', 'per °C (1/°C)', 'm²'], a: 2, why: '$\\alpha = \\Delta L / (L_o \\Delta T)$: the lengths cancel, leaving 1/°C.' },
    { q: 'Brass: α = 2×10⁻⁵ /°C. What is ΔL for a 1.00 m rod warmed by 50 °C?', o: ['1.0 mm', '0.1 mm', '10 mm', '0.01 mm'], a: 0, why: '$\\Delta L = (2\\times10^{-5})(1.00)(50) = 1.0\\times10^{-3}\\ \\text{m} = 1.0\\ \\text{mm}$.' },
    { q: 'The dial gauge needle moves 45 lines (0.01 mm each). ΔL is…', o: ['0.045 mm', '0.45 mm', '4.5 mm', '45 mm'], a: 1, why: '$45 \\times 0.01 = 0.45\\ \\text{mm}$.' },
    { q: 'If the original length doubles (same ΔT, same metal), ΔL…', o: ['halves', 'stays the same', 'doubles', 'quadruples'], a: 2, why: '$\\Delta L \\propto L_o$.' },
    { q: 'Which metal expands more for the same L₀ and ΔT?', o: ['Steel (1.2×10⁻⁵)', 'Brass (2×10⁻⁵)', 'They expand equally', 'Neither expands'], a: 1, why: 'Brass has the larger α.' },
    { q: 'Where should the thermometer be placed on the rod?', o: ['Touching the dial gauge', 'On the middle of the rod, away from the dial gauge', 'In the steam generator water', 'At the very hot end only'], a: 1, why: 'Middle gives a representative rod temperature, and placing it near the dial could push the needle.' },
    { q: 'A reading of ΔT is found by…', o: ['$T_f + T_o$', '$T_f - T_o$', '$T_o / T_f$', '$T_f \\times T_o$'], a: 1, why: 'Change = final minus initial.' },
    { q: 'Which is NOT a likely source of error in this lab?', o: ['Needle not zeroed', 'Rod not fully heated yet', 'Heat lost to the air', 'The rod’s color'], a: 3, why: 'Color does not affect thermal expansion measurements in any meaningful way here.' },
    { q: 'Why do bridges have expansion joints?', o: ['To look nice', 'To let steel grow without buckling when it warms', 'To make them heavier', 'To cool them'], a: 1, why: 'Without gaps, expanding steel would push against itself and buckle.' }
  ],
  problems: [
    { id: 'dl', title: 'Change in length', gen() {
      const [mat, a] = pick(MATS); const L = rf(0.5, 2.5, 2); const dT = rint(20, 85); const dL = a * L * dT * 1000;
      return { prompt: `A ${L} m ${mat} rod (α = ${T(a)} /°C) is heated by ${dT} °C. How much does it lengthen?`, givens: [`\\alpha = ${T(a)}\\ ^\\circ\\text{C}^{-1}`, `L_o = ${L}\\ \\text{m}`, `\\Delta T = ${dT}\\ ^\\circ\\text{C}`], answer: dL, unit: 'mm', hint: 'ΔL = α L₀ ΔT in metres first, then convert to mm.',
        steps: [{ x: 'Use the linear expansion equation:', m: `\\Delta L = \\alpha L_o \\Delta T = (${T(a)})(${L})(${dT}) = ${T(a * L * dT)}\\ \\text{m}` }, { x: 'Convert to millimetres:', m: `${T(a * L * dT)}\\ \\text{m} = ${T(dL)}\\ \\text{mm}` }] };
    } },
    { id: 'alpha', title: 'Find α from lab data', gen() {
      const [mat, a] = pick(MATS.slice(0, 2)); const Lo = pick([500, 600, 650, 700]); const To = rint(24, 28); const dT = rint(60, 74); const lines = Math.round(a * Lo * dT / 0.01); const dL = lines * 0.01; const alpha = dL / (Lo * dT);
      return { prompt: `A ${Lo} mm ${mat} rod warms from ${To} °C to ${To + dT} °C. The dial gauge moves ${lines} lines (1 line = 0.01 mm). What is its coefficient of linear expansion? Enter in units of 10⁻⁵ per °C.`, givens: [`L_o = ${Lo}\\ \\text{mm}`, `\\Delta T = ${dT}\\ ^\\circ\\text{C}`, `\\Delta L = ${lines}\\times0.01 = ${dL.toFixed(2)}\\ \\text{mm}`], answer: alpha * 1e5, unit: '×10⁻⁵ /°C', tol: 0.03, hint: 'ΔL = lines × 0.01 mm, then α = ΔL / (L₀ ΔT).',
        steps: [{ x: 'Length change from the dial:', m: `\\Delta L = ${lines}\\times0.01 = ${dL.toFixed(2)}\\ \\text{mm}` }, { x: 'Solve for α:', m: `\\alpha = \\frac{${dL.toFixed(2)}}{(${Lo})(${dT})} = ${T(alpha)}\\ ^\\circ\\text{C}^{-1} = ${(alpha * 1e5).toFixed(2)}\\times10^{-5}` }] };
    } },
    { id: 'bridge', title: 'Final length of a long structure', gen() {
      const L = pick([1200, 2500, 3000, 4200]); const a = pick([1.2e-5, 1.5e-5]); const t1 = rint(-5, 5); const t2 = rint(35, 45); const dT = t2 - t1; const Lf = L + a * L * dT;
      return { prompt: `A steel bridge is ${L} ft long when the temperature is ${t1} °C. Using α = ${T(a)} /°C, what is its length (in ft) at ${t2} °C?`, givens: [`L_o = ${L}\\ \\text{ft}`, `\\alpha = ${T(a)}`, `\\Delta T = ${dT}\\ ^\\circ\\text{C}`], answer: Lf, unit: 'ft', tol: 0.0005, hint: 'Find ΔL, then add it to the original length.',
        steps: [{ x: 'Growth:', m: `\\Delta L = (${T(a)})(${L})(${dT}) = ${T(a * L * dT)}\\ \\text{ft}` }, { x: 'Final length:', m: `L_f = ${L} + ${T(a * L * dT)} = ${T(Lf, 6)}\\ \\text{ft}` }] };
    } },
    { id: 'dT', title: 'How much warming is needed?', gen() {
      const [mat, a] = pick(MATS); const L = pick([1.0, 1.5, 2.0]); const dLmm = rf(0.5, 2.5, 1); const dT = (dLmm / 1000) / (a * L);
      return { prompt: `How many degrees must a ${L} m ${mat} rod (α = ${T(a)} /°C) be heated to lengthen by ${dLmm} mm?`, givens: [`L_o = ${L}\\ \\text{m}`, `\\Delta L = ${dLmm}\\ \\text{mm}`, `\\alpha = ${T(a)}`], answer: dT, unit: '°C', tol: 0.03, hint: 'Rearrange ΔL = α L₀ ΔT for ΔT. Use metres.',
        steps: [{ x: 'Solve for ΔT:', m: `\\Delta T = \\frac{\\Delta L}{\\alpha L_o} = \\frac{${dLmm}\\times10^{-3}}{(${T(a)})(${L})} = ${T(dT)}\\ ^\\circ\\text{C}` }] };
    } }
  ]
};
