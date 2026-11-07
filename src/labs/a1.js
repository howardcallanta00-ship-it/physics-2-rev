import { rint, rf, pick, sig, T, G } from './util.js';

const FLUIDS = [['water', 1000], ['ethyl alcohol', 789], ['brine', 1030]];

export default {
  id: 'a1', code: 'A1', title: 'Buoyancy', tagline: 'Why a huge ship floats and a coin sinks',
  formula: 'B = ρ g V',
  objectives: ['Define buoyant force and name what affects it.', 'Find the buoyant force on a fully submerged object two different ways.', 'Find the density of a fluid using a floating object.'],
  lesson: [
    { t: 'h', x: 'The big idea' },
    { t: 'p', x: '**Buoyancy** is the upward push a fluid gives to anything placed in it. A fluid can be a liquid (water) or a gas (air). Every fluid pushes on every surface it touches. Deeper fluid pushes harder, so the push on the *bottom* of an object is bigger than the push on its *top*. That difference is an upward force called the **buoyant force**, $B$.' },
    { t: 'analogy', title: 'Pushing a beach ball underwater', x: 'Try to push a beach ball under the water. The deeper you push, the harder the water pushes back up. That upward shove is the buoyant force. The more ball you sink, the more water it shoves out of the way, and the stronger the shove back.', map: [['The ball', 'the object'], ['Water pushed aside', 'displaced fluid'], ['The shove back up', 'buoyant force $B$']] },
    { t: 'viz', id: 'buoyancy' },
    { t: 'h', x: "Archimedes' principle" },
    { t: 'p', x: 'The Greek thinker Archimedes noticed that when he stepped into a full bath, water spilled over, and the spilled water took up exactly as much room as his body. From that he stated a rule:' },
    { t: 'key', title: "Archimedes' principle", x: 'An object that is completely or partly immersed in a fluid at rest feels an upward force equal to the **weight of the fluid it displaced**.' },
    { t: 'eq', name: 'Buoyant force', tex: 'B = W_{fd} = \\rho_f \\, g \\, V_{fd}',
      words: 'The fluid pushes up with exactly the **weight of the fluid your object pushed out of the way**. Weight of a fluid is its density times gravity times its volume.',
      vars: [['B', 'buoyant force', 'N'], ['W_{fd}', 'weight of the fluid displaced', 'N'], ['\\rho_f', 'density of the fluid', 'kg/m³'], ['g', 'gravitational acceleration, 9.80', 'm/s²'], ['V_{fd}', 'volume of fluid displaced', 'm³']] },
    { t: 'key', x: 'Buoyant force depends on the **fluid’s density** and the **volume displaced**. It does *not* depend on how heavy the object is or what it is made of.' },
    { t: 'warn', title: 'Unit trap', x: 'Graduated cylinders read in mL. The equation needs m³. Use $1\\ \\text{mL} = 1\\times10^{-6}\\ \\text{m}^3$. For example $40\\ \\text{mL} = 4.0\\times10^{-5}\\ \\text{m}^3$.' },
    { t: 'h', x: 'Measuring displaced volume' },
    { t: 'p', x: 'Partly fill a graduated cylinder (about 60 mL) and note the level $V_o$. Lower the object in and note the new level $V_f$. The rise is the volume of fluid the object displaced:' },
    { t: 'eq', name: 'Displaced volume', tex: 'V_{fd} = V_f - V_o', words: 'Final level minus starting level: how much the fluid *rose* is how much room the object took up.', vars: [['V_f', 'level after the object goes in', 'mL'], ['V_o', 'level before', 'mL']] },
    { t: 'h', x: 'Fully submerged object: two ways to find B' },
    { t: 'p', x: 'You get two answers for the same force. **Method 1** uses the displaced volume and the equation above, $B_1 = \\rho_f g V_{fd}$. **Method 2** uses a spring balance: the object feels lighter in the fluid because the fluid is holding part of it up.' },
    { t: 'eq', name: 'Buoyant force from the balance', tex: 'B_2 = W_1 - W_2', words: 'Weight in air minus weight in the fluid. The “missing” weight is exactly what the fluid is holding up.', vars: [['W_1', 'spring balance reading in air', 'N'], ['W_2', 'spring balance reading in the fluid', 'N']] },
    { t: 'lab', x: 'Keep the steel mass from touching the bottom of the cylinder when you read $W_2$. If it rests on the bottom, the glass is holding part of its weight too, and your reading is wrong.' },
    { t: 'p', x: 'The two methods should agree. To judge how close they are, use the **percent difference**. It is used when you compare two measured values and neither is the “true” one, so it divides by their average.' },
    { t: 'eq', name: 'Percent difference', tex: '\\%\\,\\text{difference} = \\frac{|B_1 - B_2|}{\\tfrac{1}{2}(B_1 + B_2)} \\times 100', words: 'Take the gap between the two values (always positive), divide by their average, then turn it into a percent.', vars: [['B_1,\\ B_2', 'the two buoyant forces', 'N']] },
    { t: 'worked', title: 'Worked example: steel mass in water', steps: [
      { x: 'The balance reads $W_1 = 0.80\\ \\text{N}$ in air and $W_2 = 0.70\\ \\text{N}$ in water. The cylinder rises by 10 mL, so $V_{fd} = 10\\ \\text{mL} = 1.0\\times10^{-5}\\ \\text{m}^3$.' },
      { x: 'Method 1 (displaced volume):', m: 'B_1 = (1000)(9.80)(1.0\\times10^{-5}) = 0.098\\ \\text{N}' },
      { x: 'Method 2 (balance):', m: 'B_2 = 0.80 - 0.70 = 0.10\\ \\text{N}' },
      { x: 'Compare them:', m: '\\frac{|0.098-0.10|}{\\tfrac12(0.098+0.10)}\\times100 = \\frac{0.002}{0.099}\\times100 \\approx 2.0\\%' }
    ] },
    { t: 'check', q: 'A steel mass weighs 1.20 N in air and 1.05 N in water. What is the buoyant force on it?', o: ['1.20 N', '1.05 N', '0.15 N', '2.25 N'], a: 2, why: '$B = W_1 - W_2 = 1.20 - 1.05 = 0.15\\ \\text{N}$. The fluid holds up the difference.' },
    { t: 'h', x: 'Floating objects: finding the density of a fluid' },
    { t: 'p', x: 'A floating container is not sinking and not rising, so it is in **equilibrium**: the upward buoyant force exactly balances its downward weight. $B = W$.' },
    { t: 'p', x: 'Since $B = \\rho_f g V_{fd}$ and $W = mg$, set them equal: $\\rho_f g V_{fd} = mg$. The $g$ on both sides cancels, leaving a way to measure the fluid’s density.' },
    { t: 'eq', name: 'Experimental density of the fluid', tex: '\\rho_{\\text{exp}} = \\frac{m}{V_{fd}}', words: 'Mass of the floating container divided by the volume of fluid it displaces. $g$ cancels, so you only need a balance and a cylinder.', vars: [['m', 'mass of the container with its contents', 'kg'], ['V_{fd}', 'volume of fluid displaced', 'm³']] },
    { t: 'p', x: 'Compare with the accepted (theoretical) value using **percent error**. Here one value is trusted, so we divide by *it* rather than the average.' },
    { t: 'eq', name: 'Percent error', tex: '\\%\\,\\text{error} = \\frac{|\\rho_{\\text{exp}} - \\rho_{\\text{theo}}|}{\\rho_{\\text{theo}}} \\times 100', words: 'How far off you are, as a percent of the right answer.', vars: [['\\rho_{\\text{exp}}', 'density you measured', 'kg/m³'], ['\\rho_{\\text{theo}}', 'accepted value', 'kg/m³']] },
    { t: 'table', head: ['Fluid', 'Accepted density (kg/m³)'], rows: [['Water', '1000'], ['Ethyl alcohol', '789'], ['Brine solution', '1030']] },
    { t: 'worked', title: 'Worked example: density of brine', steps: [
      { x: 'The container and its contents have mass $m = 0.050\\ \\text{kg}$. It floats in brine and the cylinder rises by 48 mL, so $V_{fd} = 4.8\\times10^{-5}\\ \\text{m}^3$.' },
      { x: 'Density from equilibrium:', m: '\\rho_{\\text{exp}} = \\frac{0.050}{4.8\\times10^{-5}} \\approx 1042\\ \\text{kg/m}^3' },
      { x: 'Percent error against 1030 kg/m³:', m: '\\frac{|1042-1030|}{1030}\\times100 \\approx 1.1\\%' }
    ] },
    { t: 'h', x: 'Will it float or sink?' },
    { t: 'p', x: 'Compare densities. If the object is **less dense** than the fluid, it floats. If it is **more dense**, it sinks. A ship floats because its hollow shape displaces a huge volume of water, so the *average* density of ship plus air inside is less than water. A coin is solid metal, so it sinks.' },
    { t: 'ul', x: ['A **diet** soft drink floats and a regular one sinks because the sugar in the regular drink makes it denser than water.', 'An ice cube floats **higher** in water than in an alcoholic drink. Alcohol is less dense than water, so the cube must sink deeper into it to displace enough weight of fluid.', 'A boat moving from fresh water into salt water floats a bit higher. Salt water is denser, so it needs less volume to supply the same buoyant force.'] },
    { t: 'check', q: 'A cube floats with half its volume under the surface in water. If moved to brine (denser), the submerged part will…', o: ['become larger', 'become smaller', 'stay the same', 'become zero'], a: 1, why: 'Denser fluid gives more buoyant force per unit of submerged volume, so less volume must be submerged to balance the same weight.' },
    { t: 'h', x: 'Your guide questions, answered' },
    { t: 'worked', title: 'Boat displacing 35.6 kN of fresh water', steps: [
      { x: '(a) The buoyant force equals the weight of the water displaced:', m: 'B = 35.6\\ \\text{kN}' },
      { x: '(b) Volume in fresh water ($\\rho = 1000$):', m: 'V = \\frac{B}{\\rho g} = \\frac{35\\,600}{(1000)(9.80)} \\approx 3.63\\ \\text{m}^3' },
      { x: 'Volume in salt water ($\\rho = 1024$):', m: 'V = \\frac{35\\,600}{(1024)(9.80)} \\approx 3.55\\ \\text{m}^3' },
      { x: 'Salt water is denser, so the boat displaces **less** volume and rides slightly higher.' }
    ] },
    { t: 'key', title: 'Guide question 3', x: 'A denser fluid gives a larger buoyant force on the same fully submerged steel mass. In your table, brine (1030) should give a slightly larger $B$ than water (1000), and ethyl alcohol (789) a smaller one.' }
  ],
  terms: [
    ['Buoyancy', 'The tendency of a body to float in a fluid; the effect of the upward push of a fluid on an object in it.'],
    ['Buoyant force', 'The upward force a fluid exerts on an object that is partly or completely immersed in it. Symbol $B$.'],
    ["Archimedes' principle", 'The buoyant force on an immersed object equals the weight of the fluid it displaces.'],
    ['Displaced fluid', 'The fluid pushed out of the way when an object enters it. Its volume equals the submerged volume of the object.'],
    ['Fluid', 'A substance that flows: a liquid or a gas.'],
    ['Density', 'Mass per unit volume, $\\rho = m/V$. Measured in kg/m³.'],
    ['Weight', 'The force of gravity on an object, $W = mg$. Measured in newtons.'],
    ['Equilibrium', 'Forces are balanced and the object is not accelerating. A floating object has $B = W$.'],
    ['Graduated cylinder', 'A tall, slender glass vessel with a scale used to measure the volume of a liquid (and displaced volume).'],
    ['Spring balance', 'A tool that measures force (weight) by how far a spring stretches. Reads in newtons.'],
    ['Percent difference', 'Compares two measured values using their average as the reference.'],
    ['Percent error', 'Compares a measured value to an accepted (theoretical) value, divided by the accepted value.'],
    ['Theoretical value', 'The accepted or textbook value, such as 1000 kg/m³ for water.'],
    ['Experimental value', 'The value you actually measure in the lab.']
  ],
  formulas: [
    ['Buoyant force (Archimedes)', 'B = W_{fd} = \\rho_f\\, g\\, V_{fd}', 'Weight of displaced fluid'],
    ['Displaced volume', 'V_{fd} = V_f - V_o', 'Level rise in the cylinder'],
    ['Buoyant force by balance', 'B = W_1 - W_2', 'Air weight minus fluid weight'],
    ['Floating density', '\\rho_{\\text{exp}} = \\dfrac{m}{V_{fd}}', 'Because B = W when floating'],
    ['Percent difference', '\\dfrac{|a-b|}{\\tfrac12(a+b)}\\times100', 'Two measured values'],
    ['Percent error', '\\dfrac{|\\text{exp}-\\text{theo}|}{\\text{theo}}\\times100', 'Measured vs accepted']
  ],
  quiz: [
    { q: 'What is the buoyant force on an object partly or fully immersed in a fluid at rest?', o: ['The weight of the object', 'The weight of the fluid displaced', 'The density of the fluid', 'The volume of the object'], a: 1, why: "Archimedes' principle: $B$ equals the weight of the displaced fluid." },
    { q: 'Which pair of quantities does the buoyant force depend on?', o: ['Object mass and object shape', 'Object color and fluid temperature', 'Fluid density and volume displaced', 'Object weight and container size'], a: 2, why: '$B = \\rho_f g V_{fd}$: fluid density and displaced volume.' },
    { q: 'A 25 mL object is fully submerged in water. What is $V_{fd}$ in m³?', o: ['$2.5\\times10^{-2}$', '$2.5\\times10^{-5}$', '$2.5\\times10^{-3}$', '$2.5\\times10^{-8}$'], a: 1, why: '$1\\ \\text{mL} = 10^{-6}\\ \\text{m}^3$, so $25\\ \\text{mL} = 2.5\\times10^{-5}\\ \\text{m}^3$.' },
    { q: 'A steel mass reads 2.40 N in air and 2.10 N in a liquid. What is the buoyant force?', o: ['0.30 N', '2.10 N', '2.40 N', '4.50 N'], a: 0, why: '$B = W_1 - W_2 = 2.40 - 2.10 = 0.30\\ \\text{N}$.' },
    { q: 'A floating container is in equilibrium. Which statement is true?', o: ['$B > W$', '$B < W$', '$B = W$', '$B = 0$'], a: 2, why: 'Not accelerating up or down means the forces balance: $B = W$.' },
    { q: 'Why does $g$ not appear in $\\rho_{\\text{exp}} = m/V_{fd}$?', o: ['Gravity is zero in the lab', 'It cancels from both sides of $B = W$', 'It is included in the mass', 'Fluids have no weight'], a: 1, why: '$\\rho_f g V_{fd} = mg$, so $g$ cancels.' },
    { q: 'Which fluid gives the LARGEST buoyant force on the same fully submerged object?', o: ['Ethyl alcohol (789 kg/m³)', 'Water (1000 kg/m³)', 'Brine (1030 kg/m³)', 'All give the same'], a: 2, why: 'Same $V_{fd}$, so the densest fluid gives the largest $B$.' },
    { q: 'A boat moves from fresh water into denser salt water. The volume of water it displaces…', o: ['increases', 'decreases', 'stays the same', 'becomes zero'], a: 1, why: 'Its weight is unchanged, so the displaced weight is unchanged. A denser fluid needs less volume to have the same weight.' },
    { q: 'Which is the correct formula for percent error?', o: ['$|\\text{exp}-\\text{theo}|/\\text{exp}\\times100$', '$|\\text{exp}-\\text{theo}|/\\text{theo}\\times100$', '$|\\text{exp}-\\text{theo}|/\\tfrac12(\\text{exp}+\\text{theo})\\times100$', '$(\\text{exp}+\\text{theo})/\\text{theo}\\times100$'], a: 1, why: 'Percent error divides by the accepted (theoretical) value.' },
    { q: 'Why must the steel mass not touch the bottom of the cylinder when reading $W_2$?', o: ['It would break the glass', 'The cylinder would be supporting part of its weight', 'It would change the density of the fluid', 'The spring would stop working'], a: 1, why: 'Contact with the bottom adds an extra upward force, so the balance reads less than it should and $B_2$ is too large.' },
    { q: 'Why does a diet soft drink float while a regular one sinks?', o: ['Diet cans are lighter metal', 'Regular drink has sugar, making it denser than water', 'Diet drink has more gas', 'Regular drink is colder'], a: 1, why: 'Sugar raises the average density above 1000 kg/m³, so the regular can sinks.' }
  ],
  problems: [
    { id: 'buoy', title: 'Buoyant force from displaced volume', gen() {
      const [name, rho] = pick(FLUIDS); const v = rint(20, 90); const B = rho * G * v * 1e-6;
      return { prompt: `An object is fully submerged in ${name} and displaces ${v} mL of it. What is the buoyant force on the object?`, givens: [`\\rho_f = ${rho}\\ \\text{kg/m}^3`, `V_{fd} = ${v}\\ \\text{mL}`], answer: B, unit: 'N', hint: 'Convert mL to m³ first. 1 mL = 10⁻⁶ m³.',
        steps: [{ x: 'Convert the volume:', m: `V_{fd} = ${v}\\ \\text{mL} = ${T(v * 1e-6)}\\ \\text{m}^3` }, { x: 'Use Archimedes’ principle:', m: `B = \\rho_f g V_{fd} = (${rho})(9.80)(${T(v * 1e-6)}) = ${T(B)}\\ \\text{N}` }] };
    } },
    { id: 'apparent', title: 'Spring balance reading in a fluid', gen() {
      const [name, rho] = pick(FLUIDS); const v = rint(20, 60); const W1 = rf(1.5, 4.5, 2); const B = rho * G * v * 1e-6; const W2 = W1 - B;
      return { prompt: `A steel mass weighs ${W1} N in air. It is lowered fully into ${name}, displacing ${v} mL. What does the spring balance read now?`, givens: [`W_1 = ${W1}\\ \\text{N}`, `\\rho_f = ${rho}\\ \\text{kg/m}^3`, `V_{fd} = ${v}\\ \\text{mL}`], answer: W2, unit: 'N', hint: 'First find B, then W₂ = W₁ − B.',
        steps: [{ x: 'Buoyant force:', m: `B = (${rho})(9.80)(${T(v * 1e-6)}) = ${T(B)}\\ \\text{N}` }, { x: 'The balance reads the weight minus the buoyant force:', m: `W_2 = W_1 - B = ${W1} - ${T(B)} = ${T(W2)}\\ \\text{N}` }] };
    } },
    { id: 'floatrho', title: 'Density of a fluid from a floating container', gen() {
      const [name, rho] = pick(FLUIDS); const m = rf(40, 80, 0) / 1000; const vfd = (m / rho); const vml = sig(vfd * 1e6, 3); const rhoExp = m / (vml * 1e-6);
      return { prompt: `A container with its contents has a mass of ${(m * 1000).toFixed(0)} g. It floats in a fluid and displaces ${vml} mL. What is the density of the fluid?`, givens: [`m = ${(m * 1000).toFixed(0)}\\ \\text{g} = ${m}\\ \\text{kg}`, `V_{fd} = ${vml}\\ \\text{mL}`], answer: rhoExp, unit: 'kg/m³', tol: 0.02, hint: 'Floating means B = W, so ρ = m / V_fd. Use kg and m³.',
        steps: [{ x: 'Convert to SI units:', m: `m = ${m}\\ \\text{kg},\\quad V_{fd} = ${vml}\\times10^{-6}\\ \\text{m}^3` }, { x: 'Floating means B = W, so:', m: `\\rho = \\frac{m}{V_{fd}} = \\frac{${m}}{${vml}\\times10^{-6}} = ${T(rhoExp)}\\ \\text{kg/m}^3` }] };
    } },
    { id: 'perr', title: 'Percent error of a density', gen() {
      const [name, rho] = pick(FLUIDS); const exp = Math.round(rho * (1 + (Math.random() * 0.12 - 0.06))); const e = Math.abs(exp - rho) / rho * 100;
      return { prompt: `You measured the density of ${name} as ${exp} kg/m³. The accepted value is ${rho} kg/m³. What is your percent error?`, givens: [`\\rho_{\\text{exp}} = ${exp}`, `\\rho_{\\text{theo}} = ${rho}`], answer: e, unit: '%', tol: 0.03, hint: 'Divide the gap by the ACCEPTED value.',
        steps: [{ x: 'Percent error uses the accepted value in the denominator:', m: `\\frac{|${exp}-${rho}|}{${rho}}\\times100 = ${T(e)}\\%` }] };
    } },
    { id: 'boatvol', title: 'Volume a boat displaces', gen() {
      const w = rint(20, 90) * 1.0; const [name, rho] = pick([['fresh water', 1000], ['salt water', 1024]]); const V = w * 1000 / (rho * G);
      return { prompt: `A boat floating in ${name} (ρ = ${rho} kg/m³) has a weight of ${w} kN. What volume of water does it displace?`, givens: [`W = ${w}\\ \\text{kN}`, `\\rho = ${rho}\\ \\text{kg/m}^3`], answer: V, unit: 'm³', hint: 'Floating: B = W. Then V = B / (ρ g). Convert kN to N.',
        steps: [{ x: 'Floating means $B = W = ' + w * 1000 + '\\ \\text{N}$. Solve $B = \\rho g V$ for $V$:', m: `V = \\frac{B}{\\rho g} = \\frac{${w * 1000}}{(${rho})(9.80)} = ${T(V)}\\ \\text{m}^3` }] };
    } }
  ]
};
