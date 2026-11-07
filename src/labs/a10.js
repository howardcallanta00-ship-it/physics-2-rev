import { rint, rf, pick, sig, T } from './util.js';

export default {
  id: 'a10', code: 'A10', title: 'Plane Mirror', tagline: 'How a flat mirror makes an image and why angles match',
  formula: 'θᵢ = θᵣ · p = q',
  objectives: ['Locate the image of a pin formed by a plane mirror.', 'Verify the law of reflection.'],
  lesson: [
    { t: 'h', x: 'The big idea' },
    { t: 'p', x: 'When a ray of light strikes a mirror, it **bounces off**. That change in direction is **reflection**. To describe the bounce, we draw an imaginary line at 90° to the mirror at the point where the ray lands. This line is the **normal**. All angles are measured from the normal, not from the mirror surface.' },
    { t: 'ul', x: ['The **incident ray** is the ray coming in.', 'The **reflected ray** is the ray going out.', 'The **angle of incidence** $\\theta_i$ is between the incident ray and the normal.', 'The **angle of reflection** $\\theta_r$ is between the reflected ray and the normal.'] },
    { t: 'key', title: 'The law of reflection', x: 'The angle of incidence equals the angle of reflection, and the incident ray, normal and reflected ray all lie in the same plane.' },
    { t: 'eq', name: 'Law of reflection', tex: '\\theta_i = \\theta_r', words: 'Light bounces off a flat mirror at the **same angle** it arrived, like a ball bouncing off a wall.', vars: [['\\theta_i', 'angle of incidence (from the normal)', '°'], ['\\theta_r', 'angle of reflection (from the normal)', '°']] },
    { t: 'analogy', title: 'A ball off a smooth wall', x: 'Roll a ball at a smooth wall at an angle. It bounces off at the matching angle on the other side of the line that sticks straight out of the wall. Light does exactly this with a mirror.', map: [['Ball path in', 'incident ray'], ['Ball path out', 'reflected ray'], ['Line straight out of the wall', 'the normal']] },
    { t: 'h', x: 'Where is the image?' },
    { t: 'p', x: 'Your eye sees light coming from the mirror. Your brain assumes light always travels in straight lines, so it traces the reflected ray **backwards in a straight line**. All those backward lines meet at one spot **behind the mirror**. That meeting point is the **image**.' },
    { t: 'p', x: 'Nothing is really there, light never goes behind the mirror. So the image is called **virtual**.' },
    { t: 'viz', id: 'mirror' },
    { t: 'key', title: 'Image position', x: 'A plane mirror makes an image that is as far **behind** the mirror as the object is **in front**. So **q = p**. The image is also upright, the same size as the object, and flipped left-to-right.' },
    { t: 'eq', name: 'Plane mirror distances', tex: 'q = p', words: 'Image distance equals object distance. Stand 2 m in front of a mirror and your image appears 2 m behind it, so **4 m from you**.', vars: [['p', 'object distance, from object to mirror', 'cm'], ['q', 'image distance, from mirror to image', 'cm']] },
    { t: 'h', x: 'In the lab: finding the image with rays' },
    { t: 'ol', x: ['Draw a line on paper; this is the mirror line. Stand the mirror on it, upright.', 'Place the pin (the object) about 12 cm in front, mark it **O**, and record $p$.', 'Sight the object’s image along a ruler and draw the line $L_r$ up to the mirror line. Extend it behind with a dashed line.', 'Draw a line $L_p$ perpendicular to the mirror line, through the centre.', 'Where $L_r$ and $L_p$ cross is the image **I**. Measure its distance $q$ from the mirror line.', 'Join O to the point where $L_r$ meets the mirror to get the incident ray $L_i$. Draw the normal there and measure $\\theta_i$ and $\\theta_r$ with a protractor.', 'Repeat for different distances $p$.'] },
    { t: 'lab', x: 'Make sure the mirror is perpendicular to the paper, and measure $q$ along the perpendicular from the mirror line, not along a slanted line.' },
    { t: 'eq', name: 'Percent difference (distances)', tex: '\\%\\,\\text{difference} = \\frac{|p - q|}{\\tfrac{1}{2}(p + q)} \\times 100', words: 'Compare $p$ and $q$ with their average, because neither one is the “official” value.', vars: [] },
    { t: 'eq', name: 'Percent difference (angles)', tex: '\\%\\,\\text{difference} = \\frac{|\\theta_i - \\theta_r|}{\\tfrac{1}{2}(\\theta_i + \\theta_r)} \\times 100', words: 'The same idea for the two angles.', vars: [] },
    { t: 'worked', title: 'Worked example', steps: [
      { x: 'Trial 1: you placed the object at $p = 12.0$ cm and measured $q = 11.6$ cm.' },
      { x: 'Percent difference:', m: '\\frac{|12.0 - 11.6|}{\\tfrac12(12.0 + 11.6)}\\times100 = \\frac{0.4}{11.8}\\times100 \\approx 3.4\\%' },
      { x: 'You also measured $\\theta_i = 30^\\circ$ and $\\theta_r = 31^\\circ$:', m: '\\frac{|30-31|}{\\tfrac12(30+31)}\\times100 = \\frac{1}{30.5}\\times100 \\approx 3.3\\%' },
      { x: 'Both are small, so the data support $q = p$ and $\\theta_i = \\theta_r$.' }
    ] },
    { t: 'check', q: 'A candle is 25 cm in front of a plane mirror. How far is the candle from its image?', o: ['25 cm', '50 cm', '12.5 cm', '75 cm'], a: 1, why: 'The image is 25 cm behind the mirror, so the object-to-image distance is $25 + 25 = 50$ cm.' },
    { t: 'h', x: 'Going further: two useful results' },
    { t: 'ul', x: ['**Full-length mirror.** To see your whole body in a plane mirror, the mirror only needs to be **half your height**.', '**Rotating a mirror.** If you turn a mirror by an angle $\\alpha$, the reflected ray turns by $2\\alpha$.', '**Walking toward a mirror.** If you walk toward a mirror at speed $v$, your image approaches at $v$ too, so you and your image close at $2v$.'] },
    { t: 'h', x: 'Guide questions, answered' },
    { t: 'ul', x: ['**Q1.** The image distance equals the object distance ($q = p$).', '**Q2.** The angle of incidence equals the angle of reflection ($\\theta_i = \\theta_r$).'] }
  ],
  terms: [
    ['Reflection', 'The bouncing of light off a surface.'],
    ['Plane mirror', 'A flat mirror.'],
    ['Incident ray', 'The ray of light striking a surface.'],
    ['Reflected ray', 'The ray of light bouncing off the surface.'],
    ['Normal', 'An imaginary line perpendicular to the surface at the point of incidence.'],
    ['Angle of incidence (θᵢ)', 'Angle between the incident ray and the normal.'],
    ['Angle of reflection (θᵣ)', 'Angle between the reflected ray and the normal.'],
    ['Law of reflection', '$\\theta_i = \\theta_r$.'],
    ['Object distance (p)', 'Distance from the object to the mirror.'],
    ['Image distance (q)', 'Distance from the mirror to the image.'],
    ['Virtual image', 'An image formed where light only *appears* to come from; it cannot be projected on a screen.'],
    ['Lateral inversion', 'Left-right reversal in a mirror image.'],
    ['Percent difference', 'Compares two measured values by their average.']
  ],
  formulas: [
    ['Law of reflection', '\\theta_i = \\theta_r', 'Angles from the normal'],
    ['Plane mirror image', 'q = p', 'Virtual, upright, same size'],
    ['Object–image distance', 'd = 2p', ''],
    ['Percent difference', '\\dfrac{|a-b|}{\\tfrac12(a+b)}\\times100', ''],
    ['Rotating mirror', '\\Delta\\theta_{\\text{ray}} = 2\\,\\Delta\\theta_{\\text{mirror}}', '']
  ],
  quiz: [
    { q: 'Angles of incidence and reflection are measured from…', o: ['the mirror surface', 'the normal', 'the horizontal', 'the object'], a: 1, why: 'From the normal, the line at 90° to the mirror.' },
    { q: 'A ray strikes a plane mirror with θᵢ = 35°. The angle of reflection is…', o: ['35°', '55°', '70°', '145°'], a: 0, why: 'Law of reflection: $\\theta_r = \\theta_i$.' },
    { q: 'The image in a plane mirror is…', o: ['real and inverted', 'virtual and upright', 'real and upright', 'virtual and inverted'], a: 1, why: 'Plane mirrors form virtual, upright images.' },
    { q: 'An object is 15 cm in front of a plane mirror. The image is…', o: ['15 cm in front', '15 cm behind', '30 cm behind', '7.5 cm behind'], a: 1, why: '$q = p$, and it is behind.' },
    { q: 'You stand 3 m from a mirror. How far are you from your image?', o: ['3 m', '1.5 m', '6 m', '9 m'], a: 2, why: '$3 + 3 = 6$ m.' },
    { q: 'Why is the image called virtual?', o: ['It is imaginary and untrue', 'Light only appears to come from it; no light actually passes through', 'It is smaller than the object', 'It is upside down'], a: 1, why: 'The rays diverge as if from behind the mirror, but never actually go there.' },
    { q: 'In the lab, the image I is located at the intersection of…', o: ['L_r and L_p', 'L_i and the mirror', 'L_p and the normal', 'the mirror and the table'], a: 0, why: 'The extended sight line and the perpendicular line meet at the image.' },
    { q: 'Which pair do you compare with percent difference in Table 10.7.1?', o: ['θᵢ and θᵣ', 'p and q', 'p and θᵢ', 'q and θᵣ'], a: 1, why: 'Table 10.7.1 is object and image distances.' },
    { q: 'A mirror is rotated by 10°. The reflected ray turns by…', o: ['5°', '10°', '20°', '40°'], a: 2, why: 'The reflected ray turns twice as much.' },
    { q: 'Minimum height of a plane mirror to see a whole person is…', o: ['their full height', 'half their height', 'one quarter of their height', 'twice their height'], a: 1, why: 'Half the person’s height suffices.' }
  ],
  problems: [
    { id: 'q', title: 'Object-to-image distance', gen() {
      const p = rf(5, 40, 0); return { prompt: `An object is ${p} cm in front of a plane mirror. How far is the object from its image?`, givens: [`p = ${p}\\ \\text{cm}`], answer: 2 * p, unit: 'cm', tol: 0.01, hint: 'The image is as far behind as the object is in front.', steps: [{ x: 'q = p, so object-to-image distance is p + q:', m: `d = ${p} + ${p} = ${2 * p}\\ \\text{cm}` }] };
    } },
    { id: 'pctd', title: 'Percent difference (distances)', gen() {
      const p = rint(8, 16); const q = +(p + (Math.random() * 1.6 - 0.8)).toFixed(1); const d = Math.abs(p - q) / ((p + q) / 2) * 100;
      return { prompt: `In a plane-mirror trial, the object distance was p = ${p} cm and you measured the image distance as q = ${q} cm. What is the percent difference?`, givens: [`p = ${p}\\ \\text{cm}`, `q = ${q}\\ \\text{cm}`], answer: d, unit: '%', tol: 0.03, hint: 'Divide |p − q| by the average of p and q.', steps: [{ x: 'Percent difference:', m: `\\frac{|${p}-${q}|}{\\tfrac12(${p}+${q})}\\times100 = ${T(d)}\\%` }] };
    } },
    { id: 'angle', title: 'Angle between incident and reflected rays', gen() {
      const t = rint(15, 70);
      return { prompt: `A ray hits a plane mirror with an angle of incidence of ${t}°. What is the angle between the incident ray and the reflected ray?`, givens: [`\\theta_i = ${t}^\\circ`], answer: 2 * t, unit: '°', tol: 0.01, hint: 'θr = θi, and the angle between the two rays is θi + θr.', steps: [{ x: 'The reflected ray makes the same angle with the normal on the other side:', m: `\\theta_i + \\theta_r = ${t}^\\circ + ${t}^\\circ = ${2 * t}^\\circ` }] };
    } },
    { id: 'rot', title: 'Rotating a mirror', gen() {
      const a = rint(4, 22);
      return { prompt: `A plane mirror is rotated by ${a}° while the incident ray stays fixed. By how many degrees does the reflected ray turn?`, givens: [`\\Delta\\theta_{\\text{mirror}} = ${a}^\\circ`], answer: 2 * a, unit: '°', tol: 0.01, hint: 'The reflected ray turns twice as far as the mirror.', steps: [{ x: 'Rotating the mirror by α changes both θᵢ and θᵣ by α, so the reflected ray turns by 2α:', m: `2(${a}^\\circ) = ${2 * a}^\\circ` }] };
    } },
    { id: 'speed', title: 'Closing speed with your image', gen() {
      const v = rf(0.5, 2.5, 1);
      return { prompt: `You walk straight toward a plane mirror at ${v} m/s. At what speed does your image approach you?`, givens: [`v = ${v}\\ \\text{m/s}`], answer: 2 * v, unit: 'm/s', tol: 0.01, hint: 'The image moves toward the mirror at the same speed as you.', steps: [{ x: 'You approach the mirror at v and your image approaches it at v from the other side, so you close at:', m: `2v = ${T(2 * v)}\\ \\text{m/s}` }] };
    } }
  ]
};
