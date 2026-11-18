import { rint, rf, pick, T } from '../labs/util.js';

const MET = [['iron', 444, 11e-6], ['copper', 387, 17e-6], ['aluminum', 900, 24e-6], ['steel', 450, 11e-6], ['brass', 380, 19e-6]];

export default {
  id: 'm2', kind: 'module', code: 'M2', title: 'Thermal Physics', tagline: 'Temperature, expansion, heat and the laws of thermodynamics',
  formula: 'ΔL = αL₀ΔT · Q = mcΔT · Q = mL · ΔU = Q − W',
  objectives: ['Tell temperature from heat and convert between temperature scales.', 'Solve linear, area and volume thermal-expansion problems.', 'Use Q = mcΔT, calorimetry and latent heat.', 'State the zeroth law and apply the first law of thermodynamics.'],
  lesson: [
    { t: 'h', x: 'Temperature and heat' },
    { t: 'p', x: '**Temperature** is how hot or cold something is. A thermometer measures it in °C, °F or K. **Heat** is **energy** that moves from a hotter object to a colder one because of the temperature difference. Heat is not the same as temperature: a small cup of boiling water has a higher temperature than a bathtub of warm water, but the bathtub holds more heat.' },
    { t: 'eq', name: 'Temperature scales', tex: 'T_F = \\tfrac{9}{5}T_C + 32 \\qquad T_C = \\tfrac{5}{9}(T_F - 32) \\qquad T_K = T_C + 273.15', words: 'Water freezes at 0 °C = 32 °F = 273.15 K and boils at 100 °C = 212 °F = 373.15 K. A change of 1 °C is the same size as a change of 1 K.', vars: [] },
    { t: 'h', x: 'Thermal expansion' },
    { t: 'p', x: 'Almost everything **expands when heated**. Heat makes the atoms vibrate more, and they push slightly farther apart. A bridge, a railway track and a tape measure all change length with temperature.' },
    { t: 'viz', id: 'expansion' },
    { t: 'eq', name: 'Linear expansion', tex: '\\Delta L = \\alpha L_0 \\Delta T \\qquad L = L_0(1 + \\alpha \\Delta T)', words: 'The extra length is proportional to the **original length**, the **temperature change** and a number $\\alpha$ that depends on the material. Longer rod and hotter change mean more growth.', vars: [['\\Delta L', 'change in length', 'm'], ['L_0', 'original length', 'm'], ['\\alpha', 'coefficient of linear expansion', '1/°C'], ['\\Delta T', 'change in temperature', '°C']] },
    { t: 'worked', title: 'Example: a steel tape in the sun', steps: [
      { x: 'A steel tape is exactly 50 m at 20 °C. How long is it at 35 °C? ($\\alpha = 11\\times10^{-6}$ /°C)' },
      { x: 'Use $L = L_0(1+\\alpha\\Delta T)$:', m: 'L = 50\\left[1 + (11\\times10^{-6})(15)\\right] = 50.008\\ \\text{m}' }] },
    { t: 'eq', name: 'Area and volume expansion', tex: '\\Delta A = \\gamma A_0 \\Delta T,\\ \\gamma = 2\\alpha \\qquad \\Delta V = \\beta V_0 \\Delta T,\\ \\beta = 3\\alpha', words: 'A flat plate grows in **two** directions, so its area coefficient is **2α**. A solid grows in **three** directions, so its volume coefficient is **3α**. Holes expand too, as if they were made of the same material.', vars: [['\\gamma', 'coefficient of area expansion', '1/°C'], ['\\beta', 'coefficient of volume expansion', '1/°C']] },
    { t: 'check', q: 'A metal plate has a circular hole. When the plate is heated, the hole…', o: ['gets smaller', 'stays the same', 'gets larger', 'disappears'], a: 2, why: 'The hole expands as if it were made of the same material as the plate.' },
    { t: 'worked', title: 'Example: mercury overflow', steps: [
      { x: 'A 200 cm³ glass flask is full of mercury at 20 °C. Mercury $\\beta = 18\\times10^{-5}$ /°C; glass $\\alpha = 0.40\\times10^{-5}$ /°C so $\\beta_g = 3\\alpha = 1.2\\times10^{-5}$. Heated to 100 °C, how much overflows?' },
      { x: 'The overflow is the difference in expansion:', m: '\\Delta V = V_0(\\beta_{Hg} - \\beta_{g})\\Delta T = 200\\,(18\\times10^{-5} - 1.2\\times10^{-5})(80) = 2.69\\ \\text{cm}^3' }] },
    { t: 'note', title: 'Link to the lab', x: 'Lab A2 measures $\\alpha$ of brass and steel with a dial gauge. See the A2 lesson.' },
    { t: 'h', x: 'How heat moves' },
    { t: 'ul', x: ['**Conduction**: energy passes from particle to particle by collisions. It is best in solids, especially metals.', '**Convection**: a heated fluid (gas or liquid) moves and carries its energy with it. Hot air rises.', '**Radiation**: energy travels as electromagnetic waves at the speed of light, even through empty space. Dark, rough surfaces absorb more; light, smooth ones reflect more.'] },
    { t: 'h', x: 'Quantity of heat' },
    { t: 'p', x: 'Heat is energy, so it is measured in **joules**. Older units: $1\\ \\text{cal} = 4.186\\ \\text{J}$, $1\\ \\text{kcal} = 1000\\ \\text{cal}$, $1\\ \\text{Btu} = 252\\ \\text{cal}$.' },
    { t: 'eq', name: 'Heat and temperature change', tex: 'Q = m\\,c\\,\\Delta T', words: 'Heat needed = **mass × specific heat × temperature change**. Specific heat $c$ is how much energy it takes to warm 1 kg by 1 °C. Water has a large $c$ (4186 J/kg·°C), so it heats slowly and holds a lot of heat.', vars: [['Q', 'heat added (+) or removed (−)', 'J'], ['m', 'mass', 'kg'], ['c', 'specific heat', 'J/kg·°C'], ['\\Delta T', 'T_final − T_initial', '°C']] },
    { t: 'worked', title: 'Example: a fever', steps: [
      { x: 'An 80 kg person goes from 37 °C to 39 °C. Treat the body as water. Heat needed?' },
      { x: 'Use $Q = mc\\Delta T$:', m: 'Q = (80)(4186)(2) = 669\\,760\\ \\text{J} = 670\\ \\text{kJ}' }] },
    { t: 'h', x: 'Zeroth law and calorimetry' },
    { t: 'key', title: 'Zeroth law of thermodynamics', x: 'If A and B are each in thermal equilibrium with C, then A and B are in thermal equilibrium with each other. Two systems are in equilibrium exactly when they have the **same temperature**.' },
    { t: 'p', x: 'In an **isolated** system, energy is conserved. The heat that leaves the hot objects goes into the cold ones:' },
    { t: 'eq', name: 'Calorimetry', tex: 'Q_{\\text{gain}} + Q_{\\text{loss}} = 0 \;\\Rightarrow\; \\sum m c (T_f - T_i) = 0', words: 'The hot thing loses heat (negative $Q$) and the cold thing gains it (positive $Q$). They share one **final temperature** $T_f$. Write one $mc(T_f - T_i)$ term for each object, add them, set the sum to zero and solve for $T_f$.', vars: [] },
    { t: 'worked', title: 'Example: hot iron dropped in water', steps: [
      { x: 'A 65 g iron piece at 525 °C goes into 635 g of water at 15 °C. ($c_{iron} = 444$, $c_w = 4186$ J/kg·°C)' },
      { x: 'Sum of heats is zero:', m: '(0.635)(4186)(T_f - 15) + (0.065)(444)(T_f - 525) = 0' },
      { x: 'Solve for $T_f$:', m: 'T_f = 20.5\\ ^\\circ\\text{C}' }] },
    { t: 'h', x: 'Phase changes' },
    { t: 'p', x: 'While a substance melts or boils, the heat goes into breaking bonds, not into raising the temperature. The temperature stays flat until the change is complete.' },
    { t: 'viz', id: 'heatcurve' },
    { t: 'eq', name: 'Heat of a phase change', tex: 'Q = \\pm\\, m L', words: '$L_f$ (fusion) is for melting or freezing and $L_v$ (vaporization) is for boiling or condensing. Use **+** when heat is absorbed (melting, boiling) and **−** when it is released (freezing, condensing).', vars: [['L_f', 'latent heat of fusion, water', '3.35×10⁵ J/kg'], ['L_v', 'latent heat of vaporization, water', '2.26×10⁶ J/kg']] },
    { t: 'worked', title: 'Example: ice at −40 °C to steam at 110 °C (100 g)', steps: [
      { x: 'Five steps, add them all ($c_{ice} = 2090$, $c_{steam} = 2110$):' },
      { m: 'Q = \\underbrace{(0.1)(2090)(40)}_{\\text{warm ice}} + \\underbrace{(0.1)(3.35\\times10^5)}_{\\text{melt}} + \\underbrace{(0.1)(4186)(100)}_{\\text{warm water}} + \\underbrace{(0.1)(2.26\\times10^6)}_{\\text{boil}} + \\underbrace{(0.1)(2110)(10)}_{\\text{warm steam}}' },
      { m: 'Q = 8360 + 33\\,500 + 41\\,860 + 226\\,000 + 2110 = 3.12\\times10^5\\ \\text{J}' }] },
    { t: 'warn', title: 'Common mistake', x: 'Do not use $Q = mc\\Delta T$ during a phase change: $\\Delta T = 0$ there, but heat is still being absorbed. Use $Q = mL$ for the flat parts.' },
    { t: 'h', x: 'First law of thermodynamics' },
    { t: 'p', x: 'This is energy conservation for a system. **Internal energy** is the total kinetic and potential energy of all the particles inside it.' },
    { t: 'eq', name: 'First law', tex: '\\Delta U = Q - W', words: 'The internal energy rises when you **add heat** and falls when the system **does work** on its surroundings. Sign rules: $Q>0$ heat in, $Q<0$ heat out; $W>0$ work done **by** the system, $W<0$ work done **on** it.', vars: [['\\Delta U', 'change in internal energy', 'J'], ['Q', 'heat added to the system', 'J'], ['W', 'work done by the system', 'J']] },
    { t: 'worked', title: 'Example', steps: [
      { x: '3000 J of heat flows in while the system does 2500 J of work:', m: '\\Delta U = Q - W = 3000 - 2500 = +500\\ \\text{J}' },
      { x: 'So the internal energy rises by 500 J.' }] }
  ],
  terms: [
    ['Temperature', 'A measure of how hot or cold an object is.'], ['Heat', 'Energy transferred because of a temperature difference.'], ['Thermal expansion', 'The increase in size of a material when its temperature rises.'],
    ['Coefficient of linear expansion (α)', 'Fractional change in length per degree. Unit: 1/°C.'], ['Conduction', 'Heat transfer by collisions between particles.'], ['Convection', 'Heat transfer by the motion of a fluid.'], ['Radiation', 'Heat transfer by electromagnetic waves.'],
    ['Specific heat (c)', 'Heat needed to raise 1 kg of a substance by 1 °C.'], ['Calorimetry', 'Measuring heat exchanged between objects.'], ['Thermal equilibrium', 'Objects at the same temperature, with no net heat flow.'],
    ['Zeroth law', 'Two systems each in equilibrium with a third are in equilibrium with each other.'], ['Latent heat', 'Heat absorbed or released during a phase change at constant temperature.'],
    ['Internal energy', 'Total kinetic and potential energy of the particles in a system.'], ['First law of thermodynamics', '$\\Delta U = Q - W$.'], ['Closed system', 'A system that exchanges energy but not matter with its surroundings.']
  ],
  formulas: [
    ['Fahrenheit', 'T_F = \\tfrac95 T_C + 32', ''], ['Kelvin', 'T_K = T_C + 273.15', ''], ['Linear expansion', '\\Delta L = \\alpha L_0 \\Delta T', ''], ['Final length', 'L = L_0(1 + \\alpha\\Delta T)', ''],
    ['Area expansion', '\\Delta A = 2\\alpha A_0\\Delta T', ''], ['Volume expansion', '\\Delta V = \\beta V_0\\Delta T,\\ \\beta=3\\alpha', ''], ['Heat', 'Q = mc\\Delta T', ''], ['Calorimetry', 'Q_{gain}+Q_{loss}=0', ''],
    ['Phase change', 'Q = \\pm mL', ''], ['First law', '\\Delta U = Q - W', '']
  ],
  quiz: [
    { q: 'Heat is best described as…', o: ['the temperature of an object', 'energy transferred due to a temperature difference', 'the specific heat of a material', 'a kind of matter'], a: 1, why: 'Heat is energy in transit from hot to cold.' },
    { q: 'The coefficient of area expansion is approximately…', o: ['α', '2α', '3α', 'α/2'], a: 1, why: '$\\gamma = 2\\alpha$.' },
    { q: 'The coefficient of volume expansion is approximately…', o: ['α', '2α', '3α', 'α³'], a: 2, why: '$\\beta = 3\\alpha$.' },
    { q: 'A hole in a metal plate is heated. The hole…', o: ['shrinks', 'grows', 'stays the same', 'splits'], a: 1, why: 'Holes expand like the surrounding material.' },
    { q: 'Heat transfer by the movement of a heated fluid is…', o: ['conduction', 'convection', 'radiation', 'induction'], a: 1, why: 'Convection carries energy with the moving fluid.' },
    { q: 'Which transfer works through a vacuum?', o: ['conduction', 'convection', 'radiation', 'all of them'], a: 2, why: 'Only electromagnetic radiation needs no medium.' },
    { q: 'Which substance has the highest specific heat?', o: ['water', 'iron', 'copper', 'aluminum'], a: 0, why: 'Water: 4186 J/kg·°C, higher than these metals.' },
    { q: 'During melting of ice at 0 °C, the temperature of the ice-water mixture…', o: ['rises', 'falls', 'stays at 0 °C', 'becomes negative'], a: 2, why: 'Heat goes into the phase change, not into temperature.' },
    { q: 'The zeroth law of thermodynamics is about…', o: ['energy conservation', 'entropy', 'thermal equilibrium and temperature', 'absolute zero'], a: 2, why: 'It defines temperature through thermal equilibrium.' },
    { q: 'A system does 40 J of work while absorbing 100 J of heat. ΔU =', o: ['140 J', '60 J', '−60 J', '4000 J'], a: 1, why: '$\\Delta U = 100 - 40 = 60$ J.' },
    { q: 'In calorimetry, if no heat escapes, the heat gained by cold objects equals…', o: ['the heat lost by hot objects', 'zero', 'twice the heat lost', 'the final temperature'], a: 0, why: 'Energy is conserved: $Q_{gain} + Q_{loss} = 0$.' }
  ],
  problems: [
    { id: 'lin', title: 'Linear expansion', gen() { const [n, , a] = pick(MET); const L = rint(2, 60); const dT = rint(20, 90); const dL = a * L * dT * 1000; return { prompt: `A ${n} rod is ${L} m long. Its α is ${(a * 1e6).toFixed(0)}×10⁻⁶ /°C. How much does it lengthen when heated by ${dT} °C? Give your answer in mm.`, givens: [`L_0 = ${L}\\ \\text{m}`, `\\alpha = ${(a * 1e6).toFixed(0)}\\times10^{-6}\\ /^\\circ\\text{C}`, `\\Delta T = ${dT}\\ ^\\circ\\text{C}`], answer: dL, unit: 'mm', tol: 0.02, hint: 'ΔL = αL₀ΔT, then metres to mm.', steps: [{ x: 'Use $\\Delta L = \\alpha L_0\\Delta T$:', m: `\\Delta L = (${(a * 1e6).toFixed(0)}\\times10^{-6})(${L})(${dT}) = ${T(dL / 1000)}\\ \\text{m} = ${T(dL)}\\ \\text{mm}` }] }; } },
    { id: 'vol', title: 'Volume expansion overflow', gen() { const V = pick([100, 200, 250, 500]); const dT = rint(40, 90); const bl = pick([9e-4, 18e-5, 2.07e-4]); const bg = 3 * 0.4e-5; const dV = V * (bl - bg) * dT; return { prompt: `A glass flask (α = 0.40×10⁻⁵ /°C) holds ${V} cm³ of a liquid with β = ${(bl * 1e5).toFixed(0)}×10⁻⁵ /°C, filled to the brim. The temperature rises by ${dT} °C. How much liquid overflows? Give your answer in cm³.`, givens: [`V_0 = ${V}\\ \\text{cm}^3`, `\\beta_{liq} = ${(bl * 1e5).toFixed(0)}\\times10^{-5}`, `\\beta_{glass} = 3\\alpha = 1.2\\times10^{-5}`], answer: dV, unit: 'cm³', tol: 0.03, hint: 'Overflow = V₀(β_liquid − β_glass)ΔT.', steps: [{ x: 'The liquid expands more than the flask:', m: `\\Delta V = ${V}(${T(bl)} - ${T(bg)})(${dT}) = ${T(dV)}\\ \\text{cm}^3` }] }; } },
    { id: 'q', title: 'Heat to warm water', gen() { const m = rf(0.2, 3, 1); const T1 = rint(10, 30); const T2 = rint(50, 95); const Q = m * 4186 * (T2 - T1); return { prompt: `How much heat is needed to raise ${m} kg of water from ${T1} °C to ${T2} °C? Give your answer in kJ. (c = 4186 J/kg·°C)`, givens: [`m = ${m}\\ \\text{kg}`, `T_i = ${T1},\\ T_f = ${T2}\\ ^\\circ\\text{C}`], answer: Q / 1000, unit: 'kJ', tol: 0.02, hint: 'Q = mcΔT.', steps: [{ x: 'Use $Q = mc\\Delta T$:', m: `Q = (${m})(4186)(${T2 - T1}) = ${T(Q)}\\ \\text{J} = ${T(Q / 1000)}\\ \\text{kJ}` }] }; } },
    { id: 'mix', title: 'Final temperature (calorimetry)', gen() { const [n, c] = pick(MET); const mm = rf(0.05, 0.3, 2); const Tm = rint(150, 500); const mw = rf(0.3, 1, 2); const Tw = rint(10, 25); const Tf = (mm * c * Tm + mw * 4186 * Tw) / (mm * c + mw * 4186); return { prompt: `A ${mm} kg piece of ${n} (c = ${c} J/kg·°C) at ${Tm} °C is dropped into ${mw} kg of water at ${Tw} °C. What is the final temperature? Give your answer in °C.`, givens: [`m_{${n.slice(0, 2)}} = ${mm}\\ \\text{kg},\\ c = ${c}`, `m_w = ${mw}\\ \\text{kg},\\ T_w = ${Tw}\\ ^\\circ\\text{C}`], answer: Tf, unit: '°C', tol: 0.02, hint: 'm_m c_m (T_f − T_m) + m_w c_w (T_f − T_w) = 0.', steps: [{ x: 'Heat lost = heat gained:', m: `T_f = \\frac{m_m c_m T_m + m_w c_w T_w}{m_m c_m + m_w c_w} = ${T(Tf)}\\ ^\\circ\\text{C}` }] }; } },
    { id: 'latent', title: 'Melting ice', gen() { const m = rint(50, 600); const Q = m / 1000 * 3.35e5; return { prompt: `How much heat is needed to melt ${m} g of ice already at 0 °C? (L_f = 3.35×10⁵ J/kg) Give your answer in kJ.`, givens: [`m = ${m}\\ \\text{g}`, `L_f = 3.35\\times10^5\\ \\text{J/kg}`], answer: Q / 1000, unit: 'kJ', tol: 0.02, hint: 'No temperature change, so use Q = mL_f. Convert grams to kg.', steps: [{ x: 'Use $Q = mL_f$:', m: `Q = (${m / 1000})(3.35\\times10^5) = ${T(Q)}\\ \\text{J} = ${T(Q / 1000)}\\ \\text{kJ}` }] }; } },
    { id: 'first', title: 'First law', gen() { const Q = rint(200, 3000); const W = rint(100, 2500); return { prompt: `A gas absorbs ${Q} J of heat and does ${W} J of work on its surroundings. What is the change in its internal energy? (Give a negative number if it decreases.)`, givens: [`Q = +${Q}\\ \\text{J}`, `W = +${W}\\ \\text{J}`], answer: Q - W, unit: 'J', tol: 0.01, hint: 'ΔU = Q − W.', steps: [{ x: 'First law:', m: `\\Delta U = Q - W = ${Q} - ${W} = ${Q - W}\\ \\text{J}` }] }; } }
  ]
};
