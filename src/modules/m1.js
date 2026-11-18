import { rint, rf, pick, T, G } from '../labs/util.js';

export default {
  id: 'm1', kind: 'module', code: 'M1', title: 'Fluid Mechanics', tagline: 'Density, pressure, Pascal and Archimedes',
  formula: 'P = ρgh · F₁/A₁ = F₂/A₂ · B = ρgV',
  objectives: ['Define density and relative density and use ρ = m/V.', 'Find fluid pressure with P = ρgh and tell absolute, gauge and atmospheric pressure apart.', 'Apply Pascal’s principle to a hydraulic press.', 'Apply Archimedes’ principle to sinking and floating objects.'],
  lesson: [
    { t: 'h', x: 'What is a fluid?' },
    { t: 'p', x: 'A **fluid** is anything that can flow: a liquid or a gas. **Fluid mechanics** studies how fluids behave. **Fluid statics** is about fluids at rest. **Fluid dynamics** is about fluids in motion. This module is mostly statics.' },
    { t: 'h', x: 'Density' },
    { t: 'p', x: '**Density** tells you how much mass is packed into a given volume. Iron is denser than wood because the same size chunk of iron has more mass.' },
    { t: 'eq', name: 'Density', tex: '\\rho = \\frac{m}{V}', words: 'Density is **mass divided by volume**. A small, heavy object (a lead sinker) has high density. A big, light object (a foam block) has low density.', vars: [['\\rho', 'density', 'kg/m³'], ['m', 'mass', 'kg'], ['V', 'volume', 'm³']] },
    { t: 'p', x: '**Relative density** (specific gravity) compares a material with water, whose density is $1000\\ \\text{kg/m}^3$:' },
    { t: 'eq', name: 'Relative density', tex: '\\rho_r = \\frac{\\rho_x}{1000\\ \\text{kg/m}^3}', words: 'It has **no units**. Steel is 7.8 (7.8 times as dense as water). Wood at 0.5 is half as dense as water, so it floats.', vars: [['\\rho_r', 'relative density', 'none']] },
    { t: 'worked', title: 'Example: mass and weight of the air in a room', steps: [
      { x: 'A living room is 4.0 m × 5.0 m × 3.0 m. Air at 20 °C has $\\rho = 1.20\\ \\text{kg/m}^3$.' },
      { x: 'Volume:', m: 'V = (4.0)(5.0)(3.0) = 60\\ \\text{m}^3' },
      { x: 'Mass from density:', m: 'm = \\rho V = (1.20)(60) = 72\\ \\text{kg}' },
      { x: 'Weight:', m: 'w = mg = (72)(9.81) = 706\\ \\text{N}' }] },
    { t: 'h', x: 'Pressure' },
    { t: 'p', x: '**Pressure** is how hard a force is concentrated on a surface. The same push on a small area gives a large pressure, which is why a sharp knife cuts and a blunt one does not.' },
    { t: 'eq', name: 'Pressure', tex: 'P = \\frac{F}{A}', words: 'Pressure is **force per unit area**. The force must be perpendicular to the surface.', vars: [['P', 'pressure', 'Pa = N/m²'], ['F', 'force perpendicular to the surface', 'N'], ['A', 'area', 'm²']] },
    { t: 'h', x: 'Pressure inside a fluid' },
    { t: 'analogy', title: 'A stack of books', x: 'Imagine a stack of books on your hand. The deeper in the stack, the more weight sits above you. A fluid works the same way: the deeper you go, the more fluid is above you, so the pressure is bigger.', map: [['Books above', 'fluid above'], ['Stack height', 'depth h'], ['Heavier books', 'denser fluid ρ']] },
    { t: 'eq', name: 'Pressure due to a fluid', tex: 'P = \\rho g h', words: 'The pressure at depth $h$ is the **density × gravity × depth**. It depends only on the fluid, not on the shape of the container.', vars: [['\\rho', 'fluid density', 'kg/m³'], ['g', 'gravitational acceleration, 9.8', 'm/s²'], ['h', 'depth below the surface', 'm']] },
    { t: 'ul', x: ['A fluid pushes on container walls **perpendicular** to the wall.', 'Pressure grows with **depth** and with **density**.', 'At one depth, the pressure is the **same in every direction**.', 'Pressure is **independent of container shape and area**: water “seeks its own level”.'] },
    { t: 'viz', id: 'hydraulic' },
    { t: 'h', x: 'Atmospheric, gauge and absolute pressure' },
    { t: 'p', x: 'The air above you also pushes down. This is **atmospheric pressure**: $P_{atm} = 101.3\\ \\text{kPa} = 760\\ \\text{mmHg} = 760\\ \\text{torr}$. For an open tank, add it to the pressure from the liquid:' },
    { t: 'eq', name: 'Absolute pressure', tex: 'P_{\\text{abs}} = P_{atm} + \\rho g h \\qquad P_{\\text{gauge}} = P_{\\text{abs}} - P_{atm} = \\rho g h', words: '**Absolute** pressure counts the air on top as well. **Gauge** pressure is what a tyre gauge shows: how much more than the atmosphere.', vars: [['P_{atm}', 'atmospheric pressure', '101.3 kPa']] },
    { t: 'worked', title: 'Example: a diver and a pool', steps: [
      { x: 'A diver is 20 m under a lake ($\\rho = 1000$). Pressure from the water alone:', m: '\\Delta P = \\rho g h = (1000)(9.8)(20) = 196\\,000\\ \\text{Pa}' },
      { x: 'A 3.00 m deep pool, fresh water (absolute):', m: 'P = 101\\,300 + (1000)(9.81)(3.00) = 130\\,730\\ \\text{Pa}' },
      { x: 'Same pool, seawater ($\\rho = 1030$):', m: 'P = 101\\,300 + (1030)(9.81)(3.00) = 131\\,613\\ \\text{Pa}' }] },
    { t: 'h', x: 'Pascal’s principle and the hydraulic press' },
    { t: 'key', title: 'Pascal’s principle', x: 'A pressure applied to an enclosed fluid is transmitted **undiminished to every part** of the fluid and the walls.' },
    { t: 'eq', name: 'Hydraulic press', tex: '\\frac{F_1}{A_1} = \\frac{F_2}{A_2} \\qquad A_1 d_1 = A_2 d_2', words: 'The **pressure is the same** on both pistons, so a small force on a small piston balances a big force on a big piston. But the fluid volume that moves is equal, so the big piston moves **less far**. You trade distance for force. You never gain energy.', vars: [['F_1, A_1', 'force and area of the input piston', 'N, m²'], ['F_2, A_2', 'force and area of the output piston', 'N, m²'], ['d_1, d_2', 'distance each piston moves', 'm']] },
    { t: 'worked', title: 'Example: lifting a car', steps: [
      { x: 'A 10.0 kN car sits on a piston of radius 1.00 m. The input piston has radius 5.0 cm. What input force is needed?' },
      { x: 'Same pressure on both sides, and $A = \\pi r^2$, so:', m: 'F_1 = F_2\\,\\frac{A_1}{A_2} = (10\\,000)\\frac{\\pi(0.05)^2}{\\pi(1.00)^2} = 25\\ \\text{N}' }] },
    { t: 'check', q: 'In a hydraulic jack the output piston has 10 times the area of the input piston. Compared with the input force, the output force is…', o: ['10 times smaller', 'the same', '10 times larger', '100 times larger'], a: 2, why: 'Same pressure, 10 times the area, so 10 times the force. The output piston also moves 10 times less far.' },
    { t: 'h', x: 'Archimedes’ principle and buoyancy' },
    { t: 'p', x: 'Pressure is higher on the bottom of a submerged object than on its top. That difference pushes up. That upward push is the **buoyant force**.' },
    { t: 'key', title: 'Archimedes’ principle', x: 'The buoyant force on an object equals the **weight of the fluid it displaces**. It depends on the fluid, not on what the object is made of.' },
    { t: 'eq', name: 'Buoyant force', tex: 'F_B = \\rho_f\\, g\\, V_{\\text{displaced}}', words: 'Take the volume of fluid the object pushes aside and weigh it. That weight is the upward push.', vars: [['\\rho_f', 'fluid density', 'kg/m³'], ['V', 'volume of fluid displaced', 'm³']] },
    { t: 'p', x: 'For an object **hanging fully submerged on a string**, the forces balance: $F_B + T = mg$. For an object that **floats**, the buoyant force equals its weight:' },
    { t: 'eq', name: 'Floating objects', tex: '\\rho_f V_{f} = \\rho_x V_x \;\\Rightarrow\; \\frac{V_{\\text{submerged}}}{V_x} = \\frac{\\rho_x}{\\rho_f}', words: 'A floating object sinks until the water it pushes aside weighs as much as the object. The **fraction submerged equals the density ratio**.', vars: [] },
    { t: 'worked', title: 'Example: floating in a salt lake', steps: [
      { x: 'A student floats with one third of her body above water. Her body density is 970 kg/m³ and her volume is 3 m³, so 2 m³ is submerged.' },
      { x: 'Weight of body = weight of displaced water:', m: '\\rho_w (2) = (970)(3) \\Rightarrow \\rho_w = 1455 \\approx 1460\\ \\text{kg/m}^3' }] },
    { t: 'worked', title: 'Example: a brass block on a string', steps: [
      { x: 'A 2.00 kg brass block ($\\rho = 8700$) hangs fully submerged in water. Volume:', m: 'V = \\frac{m}{\\rho} = \\frac{2.00}{8700} = 2.30\\times10^{-4}\\ \\text{m}^3' },
      { x: 'Buoyant force:', m: 'F_B = (1000)(9.8)(2.30\\times10^{-4}) = 2.25\\ \\text{N}' },
      { x: 'Tension from $F_B + T = mg$:', m: 'T = (2.00)(9.8) - 2.25 = 17.4\\ \\text{N}' }] },
    { t: 'note', title: 'Link to the lab', x: 'Lab A1 (Buoyancy) tests exactly this. See the A1 lesson for the lab procedure and the percent-difference check.' }
  ],
  terms: [
    ['Fluid', 'Any substance that can flow: a liquid or a gas.'], ['Fluid statics', 'The study of fluids at rest.'], ['Fluid dynamics', 'The study of fluids in motion.'],
    ['Density', 'Mass per unit volume, $\\rho = m/V$.'], ['Relative density', 'Ratio of a material’s density to the density of water. It has no units.'],
    ['Pressure', 'Force per unit area, $P = F/A$. Unit: pascal (Pa).'], ['Pascal (Pa)', 'One newton per square metre.'],
    ['Atmospheric pressure', 'Pressure of the air, 101.3 kPa at sea level.'], ['Gauge pressure', 'Pressure above atmospheric pressure.'], ['Absolute pressure', 'Gauge pressure plus atmospheric pressure.'],
    ['Pascal’s principle', 'Pressure on an enclosed fluid is transmitted equally throughout the fluid.'], ['Buoyant force', 'The upward force a fluid exerts on a submerged or floating object.'],
    ['Archimedes’ principle', 'Buoyant force equals the weight of the fluid displaced.'], ['Hydraulic press', 'A device using Pascal’s principle to multiply force.']
  ],
  formulas: [
    ['Density', '\\rho = \\dfrac{m}{V}', 'kg/m³'], ['Relative density', '\\rho_r = \\dfrac{\\rho}{1000}', 'No units'], ['Pressure', 'P = \\dfrac{F}{A}', 'Pa'], ['Fluid pressure', 'P = \\rho g h', 'Pa'],
    ['Absolute pressure', 'P = P_{atm} + \\rho g h', 'Pa'], ['Hydraulic press', '\\dfrac{F_1}{A_1} = \\dfrac{F_2}{A_2}', 'Same pressure'], ['Piston travel', 'A_1 d_1 = A_2 d_2', 'Same volume'],
    ['Buoyant force', 'F_B = \\rho_f g V', 'Archimedes'], ['Floating', '\\rho_f V_f = \\rho_x V_x', 'F_B = weight']
  ],
  quiz: [
    { q: 'Density is defined as…', o: ['mass per unit volume', 'force per unit area', 'volume per unit mass', 'weight times volume'], a: 0, why: '$\\rho = m/V$.' },
    { q: 'The SI unit of pressure is…', o: ['newton', 'pascal', 'joule', 'watt'], a: 1, why: '1 Pa = 1 N/m².' },
    { q: 'Fluid pressure at a point depends on…', o: ['the shape of the container', 'the area of the container', 'depth and fluid density', 'only the volume of fluid'], a: 2, why: '$P = \\rho g h$. Shape and area do not matter.' },
    { q: 'At a given depth, pressure in a fluid acts…', o: ['downward only', 'upward only', 'equally in all directions', 'sideways only'], a: 2, why: 'Fluid pressure at a point is the same in every direction.' },
    { q: 'Gauge pressure is…', o: ['absolute pressure plus atmospheric', 'absolute pressure minus atmospheric', 'always zero', 'twice the absolute pressure'], a: 1, why: '$P_{gauge} = P_{abs} - P_{atm}$.' },
    { q: 'Pascal’s principle says a pressure change in an enclosed fluid is…', o: ['lost at the walls', 'transmitted equally throughout the fluid', 'felt only at the top', 'doubled at the bottom'], a: 1, why: 'The pressure change reaches every part of the fluid.' },
    { q: 'In a hydraulic press, the larger piston moves…', o: ['farther than the small one', 'the same distance', 'less far than the small one', 'not at all'], a: 2, why: '$A_1 d_1 = A_2 d_2$: bigger area means smaller travel.' },
    { q: 'The buoyant force on an object equals…', o: ['the weight of the object', 'the weight of the fluid displaced', 'the volume of the object', 'the density of the fluid'], a: 1, why: 'Archimedes’ principle.' },
    { q: 'An object has a relative density of 0.8. In water it will…', o: ['sink', 'float', 'hover at any depth', 'dissolve'], a: 1, why: 'Less dense than water (ρ_r < 1), so it floats.' },
    { q: 'A floating object displaces water whose weight is…', o: ['less than the object’s weight', 'equal to the object’s weight', 'more than the object’s weight', 'zero'], a: 1, why: '$F_B$ = weight when floating.' },
    { q: 'Doubling the depth in a lake makes the gauge pressure…', o: ['stay the same', 'double', 'quadruple', 'halve'], a: 1, why: '$P = \\rho g h$ is proportional to $h$.' }
  ],
  problems: [
    { id: 'dens', title: 'Density and mass', gen() { const rho = pick([800, 1000, 2700, 7800, 8700]); const V = rf(0.002, 0.05, 3); const m = rho * V; return { prompt: `A block of material with density ${rho} kg/m³ has a volume of ${V} m³. What is its mass?`, givens: [`\\rho = ${rho}\\ \\text{kg/m}^3`, `V = ${V}\\ \\text{m}^3`], answer: m, unit: 'kg', tol: 0.02, hint: 'm = ρV.', steps: [{ x: 'Use $m = \\rho V$:', m: `m = (${rho})(${V}) = ${T(m)}\\ \\text{kg}` }] }; } },
    { id: 'ph', title: 'Pressure at depth', gen() { const h = rint(3, 40); const rho = pick([1000, 1030]); const P = rho * G * h; return { prompt: `What is the gauge pressure at a depth of ${h} m in a liquid of density ${rho} kg/m³? Use g = 9.8 m/s². Give your answer in kPa.`, givens: [`\\rho = ${rho}\\ \\text{kg/m}^3`, `h = ${h}\\ \\text{m}`], answer: P / 1000, unit: 'kPa', tol: 0.02, hint: 'P = ρgh, then divide by 1000 for kPa.', steps: [{ x: 'Use $P = \\rho g h$:', m: `P = (${rho})(9.8)(${h}) = ${T(P)}\\ \\text{Pa} = ${T(P / 1000)}\\ \\text{kPa}` }] }; } },
    { id: 'abs', title: 'Absolute pressure', gen() { const h = rint(2, 12); const rho = pick([1000, 1030]); const P = 101300 + rho * 9.81 * h; return { prompt: `Find the absolute pressure at the bottom of a ${h} m deep pool of liquid with density ${rho} kg/m³ (open to the air, P_atm = 101.3 kPa, g = 9.81). Give your answer in kPa.`, givens: [`P_{atm} = 101.3\\ \\text{kPa}`, `\\rho = ${rho}\\ \\text{kg/m}^3,\\ h = ${h}\\ \\text{m}`], answer: P / 1000, unit: 'kPa', tol: 0.01, hint: 'Add atmospheric pressure to ρgh.', steps: [{ x: 'Add the air to the liquid:', m: `P = 101\\,300 + (${rho})(9.81)(${h}) = ${T(P / 1000)}\\ \\text{kPa}` }] }; } },
    { id: 'hyd', title: 'Hydraulic press', gen() { const W = pick([5000, 8000, 10000, 12000]); const r1 = pick([4, 5, 6]); const r2 = pick([40, 50, 80, 100]); const F = W * (r1 / r2) ** 2; return { prompt: `A hydraulic lift must raise a ${W} N load on a piston of radius ${r2} cm. The input piston has radius ${r1} cm. What input force is needed?`, givens: [`F_2 = ${W}\\ \\text{N}`, `r_2 = ${r2}\\ \\text{cm},\\ r_1 = ${r1}\\ \\text{cm}`], answer: F, unit: 'N', tol: 0.02, hint: 'F₁/A₁ = F₂/A₂ and A = πr², so the π cancels.', steps: [{ x: 'Equal pressures:', m: `F_1 = F_2\\left(\\frac{r_1}{r_2}\\right)^2 = ${W}\\left(\\frac{${r1}}{${r2}}\\right)^2 = ${T(F)}\\ \\text{N}` }] }; } },
    { id: 'buoy', title: 'Buoyant force', gen() { const V = rint(20, 400); const rho = pick([1000, 1030, 789]); const F = rho * G * V * 1e-6; return { prompt: `An object of volume ${V} cm³ is fully submerged in a liquid of density ${rho} kg/m³. What is the buoyant force? (g = 9.8 m/s²)`, givens: [`V = ${V}\\ \\text{cm}^3 = ${T(V * 1e-6)}\\ \\text{m}^3`, `\\rho_f = ${rho}\\ \\text{kg/m}^3`], answer: F, unit: 'N', tol: 0.02, hint: 'Convert cm³ to m³ first (× 10⁻⁶). Then F = ρgV.', steps: [{ x: 'Convert, then use $F_B = \\rho_f g V$:', m: `F_B = (${rho})(9.8)(${T(V * 1e-6)}) = ${T(F)}\\ \\text{N}` }] }; } },
    { id: 'float', title: 'Fraction submerged', gen() { const rho = pick([500, 600, 700, 800, 900]); const f = rho / 1000 * 100; return { prompt: `A block of wood with density ${rho} kg/m³ floats in fresh water (1000 kg/m³). What percent of its volume is submerged?`, givens: [`\\rho_x = ${rho}\\ \\text{kg/m}^3`, `\\rho_f = 1000\\ \\text{kg/m}^3`], answer: f, unit: '%', tol: 0.01, hint: 'Fraction submerged = ρ_object / ρ_fluid.', steps: [{ x: 'Floating means $\\rho_f V_f = \\rho_x V_x$:', m: `\\frac{V_f}{V_x} = \\frac{${rho}}{1000} = ${rho / 1000} = ${f}\\%` }] }; } }
  ]
};
