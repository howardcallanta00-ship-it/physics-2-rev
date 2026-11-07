import { rint, rf, pick, sig, T } from './util.js';

const K = 8.99e9;

export default {
  id: 'a3', code: 'A3', title: 'The Van de Graaff Generator', tagline: 'Static electricity, charging and why hair stands up',
  formula: 'like charges repel',
  objectives: ['Explain the different ways objects become charged.', 'Explain the effect of electrostatic force on different materials.', 'Observe charge transfer in a Van de Graaff generator.'],
  lesson: [
    { t: 'h', x: 'Electric charge in one minute' },
    { t: 'p', x: 'Electric charge is a basic property of matter. It comes in two kinds: **positive** (carried by protons) and **negative** (carried by electrons). An electron and a proton carry exactly the same amount of charge, just opposite in sign.' },
    { t: 'p', x: 'Most atoms have the same number of protons and electrons, so they are **neutral**. An object becomes:' },
    { t: 'ul', x: ['**positively charged** when it has *more protons than electrons* (it has lost electrons)', '**negatively charged** when it has *more electrons than protons* (it has gained electrons)'] },
    { t: 'key', title: 'Only electrons move', x: 'Protons are locked in atomic nuclei. **Every charging process moves electrons** from one object to another. Getting positively charged means *losing* electrons. Getting negatively charged means *gaining* them.' },
    { t: 'h', x: 'Forces between charges' },
    { t: 'p', x: '**Opposite charges attract. Like charges repel.** A charged object also attracts a neutral one, because its charge rearranges slightly inside the neutral object (this is called polarization, explained below).' },
    { t: 'analogy', title: 'Magnets with a twist', x: 'Charges behave like magnet poles: opposites pull together, likes push apart. The twist is that, unlike magnets, charges can *move through* a conductor and be removed completely by touching the ground.', map: [['North/south poles', 'positive/negative charge'], ['Pushing two norths together', 'like charges repel']] },
    { t: 'eq', name: 'Coulomb’s law (going further, not in your lab sheet)', tex: 'F = k\\,\\frac{|q_1\\, q_2|}{r^2}', words: 'The push or pull between two charges grows with the size of each charge and shrinks fast with distance: **double the distance and the force drops to a quarter**.', vars: [['F', 'electric force', 'N'], ['k', '$8.99\\times10^{9}$', 'N·m²/C²'], ['q_1,\\ q_2', 'the two charges', 'C'], ['r', 'distance between them', 'm']] },
    { t: 'h', x: 'Three ways to charge an object' },
    { t: 'table', head: ['Method', 'What happens', 'Result'], rows: [
      ['**Rubbing (friction)**', 'Two neutral insulators are rubbed. One binds electrons more strongly and takes them from the other.', 'Opposite charges, equal in size. Total charge is still zero.'],
      ['**Contact**', 'A charged object touches a neutral or less-charged one. Like charges repel, so some move onto the new object to spread out.', 'Both end up with the *same sign*. Works best with conductors.'],
      ['**Induction**', 'A charged object comes near, but does not touch. Charges in the other object shift. Touch it to ground while it is polarized, then remove the ground.', 'The object keeps a charge of the *opposite* sign, with no contact.']
    ] },
    { t: 'key', title: 'Conservation of charge', x: 'Electrons are only moved around, never created or destroyed. The total charge of an isolated system stays the same.' },
    { t: 'h', x: 'Polarization and induction in pictures' },
    { t: 'p', x: 'Bring a negatively charged rod near a neutral metal ball. The rod repels the ball’s electrons to the far side, leaving the near side positive and the far side negative. The ball is still neutral overall, but it now has “poles”. This is **polarization**. The positive near side is pulled toward the rod more strongly than the negative far side is pushed away (it is closer), so a neutral object is always *attracted* to a charged one.' },
    { t: 'p', x: '**Grounding** means connecting an object to the Earth. The Earth is so large it can take or give any number of electrons. Touch the ground wire to a polarized ball and electrons escape (or come in). Remove the wire, then the rod. The ball is left with a net charge.' },
    { t: 'h', x: 'How the Van de Graaff generator works' },
    { t: 'ol', x: ['A motor turns a rubber belt. Where the belt rubs a roller at the bottom, friction pulls electrons onto or off the belt.', 'The moving belt carries that charge up inside the metal dome.', 'A comb at the top lifts the charge off the belt and onto the dome.', 'Charge on a conductor spreads over its **outside surface**, so the dome keeps collecting more and more charge until its charge begins leaking into the air.'] },
    { t: 'viz', id: 'vdg' },
    { t: 'h', x: 'The seven demonstrations, explained' },
    { t: 'p', x: 'For each demo, ask: *what is charged, with which method, and what do like charges do?*' },
    { t: 'table', head: ['Demo', 'What you see', 'Why (charging process)'], rows: [
      ['Foil confetti', 'Pieces jump off the plate and fly toward or around the dome.', 'Confetti is a conductor. It gets charge by **induction** then **contact**, takes the dome’s sign, and then is **repelled** by the dome.'],
      ['Baking tins / Styrofoam', 'Stacked tins fly off one by one. Styrofoam behaves differently.', 'Aluminium tins are conductors. They charge by **contact**, so every tin has the same sign and **repels** the others. Styrofoam is an insulator, charge cannot spread through it, so the effect is much weaker.'],
      ['Lighted candle', 'The flame is blown away from the metal point.', 'Charge crowds at a sharp point and leaks into the air, ionising it. Those ions are repelled from the point, pushing air (and the flame) away: the “electric wind”.'],
      ['Tissue paper + grounding sphere', 'Strips spread apart; they react to fingers; when the grounding sphere touches the dome they fall.', 'The strips charge by **contact** and each strip has the same sign, so they **repel** one another. Fingers **polarize** them. The grounding sphere **drains** the dome, so the force disappears.'],
      ['Fluorescent lamp', 'The lamp glows near the dome with no wire.', 'The strong electric field around the dome pushes electrons in the lamp’s gas, exciting it so it glows.'],
      ['Franklin’s bell', 'The hanging metal piece swings between two cans and rings them.', 'One can is charged by the dome, the other grounded. The hanging ball is attracted to one can, **touches** it and takes its charge, is **repelled**, is attracted to the other can, discharges there, and repeats.'],
      ['Human hair', 'Hair stands out.', 'Standing on an **insulated** chair stops charge draining away. Your hair strands all get the **same sign** by contact and **repel** each other, so they spread out.']
    ] },
    { t: 'warn', title: 'Remember to discharge', x: 'After each demo, turn the generator off and remove the extra charge from the dome by touching it with the discharging (grounding) sphere. A charged dome can give a nasty shock.' },
    { t: 'check', q: 'A neutral metal ball is brought near (not touching) a negatively charged rod. What happens to the ball?', o: ['It becomes negatively charged', 'It becomes polarized and is attracted to the rod', 'It is repelled', 'Nothing happens'], a: 1, why: 'The rod pushes the ball’s electrons away, so the near side turns positive. The nearer positive side is pulled harder than the far negative side is pushed, so there is net attraction.' },
    { t: 'h', x: 'Guide question 1: illustrate grounding' },
    { t: 'ol', x: ['An object has extra electrons (negative) or too few (positive).', 'A conducting path (wire, finger, grounding sphere) joins the object to the Earth.', 'Electrons flow along the path: out of a negative object into the Earth, or from the Earth into a positive object.', 'The object becomes neutral. The Earth, being huge, is practically unchanged.'] },
    { t: 'worked', title: 'Extra: how big are these charges?', steps: [
      { x: 'Two small spheres each carry $2.0\\ \\mu\\text{C}$ and are 10 cm apart. Find the force between them.' },
      { x: 'Convert units: $2.0\\ \\mu\\text{C} = 2.0\\times10^{-6}\\ \\text{C}$ and $10\\ \\text{cm} = 0.10\\ \\text{m}$.' },
      { x: 'Use Coulomb’s law:', m: 'F = (8.99\\times10^9)\\frac{(2.0\\times10^{-6})(2.0\\times10^{-6})}{(0.10)^2} \\approx 3.6\\ \\text{N}' },
      { x: 'Both charges have the same sign, so the force is **repulsive**.' }
    ] }
  ],
  terms: [
    ['Electric charge', 'A fundamental property of matter that comes in two types, positive and negative. Unit: coulomb (C).'],
    ['Proton', 'Particle in the nucleus carrying positive charge.'],
    ['Electron', 'Light particle outside the nucleus carrying negative charge. The particle that moves during charging.'],
    ['Neutral', 'Having equal numbers of protons and electrons, so zero net charge.'],
    ['Charging by friction', 'Rubbing two neutral insulators so electrons transfer from one to the other.'],
    ['Charging by contact', 'Touching a charged object to a neutral one so some charge transfers; both end up with the same sign.'],
    ['Charging by induction', 'Charging an object without touching it with the charged object, by polarizing it and grounding it.'],
    ['Polarization', 'A neutral object’s charges shift so one side is positive and the other negative.'],
    ['Conservation of charge', 'Charge is neither created nor destroyed, only transferred.'],
    ['Conductor', 'A material through which charge moves easily (metals).'],
    ['Insulator', 'A material that resists charge movement (wood, plastic, Styrofoam).'],
    ['Grounding', 'Connecting an object to the Earth so charge can flow to or from it.'],
    ['Van de Graaff generator', 'A machine that uses a moving belt to carry charge to a metal dome, building up a high voltage.'],
    ['Franklin’s bell', 'A small hanging metal ball that swings between a charged and a grounded can, ringing them.'],
    ['Electrostatic force', 'The force between charged objects: like charges repel, opposite charges attract.']
  ],
  formulas: [
    ['Coulomb’s law', 'F = k\\dfrac{|q_1 q_2|}{r^2}', 'k = 8.99×10⁹ N·m²/C²'],
    ['Charge from electrons', 'Q = n\\, e', 'e = 1.60×10⁻¹⁹ C'],
    ['Sharing charge (identical spheres touched)', 'q_{\\text{each}} = \\dfrac{q_1 + q_2}{2}', 'Contact between identical conductors'],
    ['Conservation of charge', '\\sum q_{\\text{before}} = \\sum q_{\\text{after}}', 'Isolated system']
  ],
  quiz: [
    { q: 'Which particles move when an object is charged?', o: ['Protons', 'Neutrons', 'Electrons', 'Nuclei'], a: 2, why: 'Protons are locked in nuclei. Electrons transfer.' },
    { q: 'An object is positively charged. This means it has…', o: ['gained electrons', 'lost electrons', 'gained protons', 'lost neutrons'], a: 1, why: 'More protons than electrons because electrons were removed.' },
    { q: 'Rubbing two neutral insulators together gives them…', o: ['the same charge', 'opposite charges of equal size', 'no charge', 'only positive charge'], a: 1, why: 'One keeps electrons more strongly and takes them from the other, so total charge stays zero.' },
    { q: 'Charging by contact leaves the two objects with…', o: ['opposite charges', 'the same sign of charge', 'no charge', 'magnetic poles'], a: 1, why: 'Like charges repel, so charge spreads onto the second object with the same sign.' },
    { q: 'Charging by induction leaves the object with a charge that is…', o: ['the same sign as the charging object', 'the opposite sign to the charging object', 'always zero', 'always positive'], a: 1, why: 'The nearby charge pushes like charges away (to the ground) and leaves the opposite sign.' },
    { q: 'Why do tissue strips on the dome spread apart?', o: ['They are attracted to each other', 'They get the same sign of charge and repel', 'Wind blows them', 'They get magnetized'], a: 1, why: 'Same-sign charge on each strip gives repulsion.' },
    { q: 'What does touching the dome with the grounding sphere do?', o: ['Adds more charge', 'Removes the extra charge', 'Reverses the belt', 'Heats the dome'], a: 1, why: 'It gives the charge a path to the Earth.' },
    { q: 'Why stand on an insulated chair for the human hair demo?', o: ['To be taller', 'To stop charge draining to ground through you', 'To make the generator turn', 'To cool the dome'], a: 1, why: 'Insulation keeps the charge on your body so it builds up.' },
    { q: 'A neutral object and a charged object are brought together. The force is…', o: ['always repulsive', 'zero', 'attractive, because of polarization', 'always magnetic'], a: 2, why: 'A charged object polarizes a neutral one, giving net attraction.' },
    { q: 'If the distance between two charges doubles, the force becomes…', o: ['double', 'half', 'one quarter', 'four times'], a: 2, why: '$F \\propto 1/r^2$, so doubling $r$ divides $F$ by 4.' },
    { q: 'Why does a flame bend away from a charged metal point?', o: ['The metal heats the flame', 'Charge leaks from the point, ionising air, creating an electric wind', 'The flame is attracted to the dome', 'The metal absorbs oxygen'], a: 1, why: 'Charge concentrates at sharp points and leaks into the air, pushing air away.' }
  ],
  problems: [
    { id: 'coul', title: 'Force between two charges', gen() {
      const q1 = rf(1, 8, 1); const q2 = rf(1, 8, 1); const r = pick([5, 8, 10, 12, 15, 20]); const F = K * q1 * 1e-6 * q2 * 1e-6 / ((r / 100) ** 2);
      return { prompt: `Two small spheres carry charges of ${q1} µC and ${q2} µC and are ${r} cm apart. What is the magnitude of the electric force between them?`, givens: [`q_1 = ${q1}\\ \\mu\\text{C}`, `q_2 = ${q2}\\ \\mu\\text{C}`, `r = ${r}\\ \\text{cm}`], answer: F, unit: 'N', hint: 'Convert µC to C (×10⁻⁶) and cm to m. Then F = k q₁q₂ / r².',
        steps: [{ x: 'Convert units:', m: `q_1 = ${q1}\\times10^{-6}\\ \\text{C},\\ q_2 = ${q2}\\times10^{-6}\\ \\text{C},\\ r = ${r / 100}\\ \\text{m}` }, { x: 'Coulomb’s law:', m: `F = (8.99\\times10^9)\\frac{(${q1}\\times10^{-6})(${q2}\\times10^{-6})}{(${r / 100})^2} = ${T(F)}\\ \\text{N}` }] };
    } },
    { id: 'nel', title: 'Number of electrons transferred', gen() {
      const n = rint(2, 9); const exp = pick([10, 11, 12]); const Q = n * 1.6e-19 * 10 ** exp; const nc = Q * 1e9;
      return { prompt: `An object has a net charge of −${(Q * 1e9).toPrecision(3)} nC. How many excess electrons does it have? Enter as a multiple of 10^${exp}.`, givens: [`Q = ${(Q * 1e9).toPrecision(3)}\\ \\text{nC} = ${T(Q)}\\ \\text{C}`, 'e = 1.60\\times10^{-19}\\ \\text{C}'], answer: n, unit: `×10^${exp} electrons`, tol: 0.03, hint: 'n = Q / e. Convert nC to C first (1 nC = 10⁻⁹ C).',
        steps: [{ x: 'Number of electrons:', m: `n = \\frac{Q}{e} = \\frac{${T(Q)}}{1.60\\times10^{-19}} = ${n}\\times10^{${exp}}` }] };
    } },
    { id: 'share', title: 'Charge after two spheres touch', gen() {
      const a = rint(2, 12); const b = rint(-10, 8); const each = (a + b) / 2;
      return { prompt: `Two identical conducting spheres carry charges of ${a} µC and ${b} µC. They are touched together and separated. What charge does each sphere now carry? (Enter a signed number.)`, givens: [`q_1 = ${a}\\ \\mu\\text{C}`, `q_2 = ${b}\\ \\mu\\text{C}`], answer: each, unit: 'µC', tol: 0.02, hint: 'Identical conductors share the total charge equally. Watch the signs.',
        steps: [{ x: 'Total charge is conserved and shared equally:', m: `q = \\frac{${a}+(${b})}{2} = ${each}\\ \\mu\\text{C}` }] };
    } },
    { id: 'dist', title: 'Effect of changing distance', gen() {
      const F0 = rf(2, 12, 1); const f = pick([2, 3, 4]);
      return { prompt: `Two charges repel with a force of ${F0} N. If the distance between them is multiplied by ${f}, what is the new force?`, givens: [`F_0 = ${F0}\\ \\text{N}`, `r \\to ${f}\\,r`], answer: F0 / (f * f), unit: 'N', tol: 0.03, hint: 'F varies as 1/r².',
        steps: [{ x: 'Force scales with the inverse square of distance:', m: `F = \\frac{F_0}{${f}^2} = \\frac{${F0}}{${f * f}} = ${T(F0 / (f * f))}\\ \\text{N}` }] };
    } }
  ]
};
