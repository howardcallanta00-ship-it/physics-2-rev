/** Random helpers shared by problem generators. */
export const rint = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
export const rf = (a, b, dp = 1) => +(a + Math.random() * (b - a)).toFixed(dp);
export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
/** Round to n significant figures (returns a number). */
export const sig = (x, n = 3) => (x === 0 ? 0 : +x.toPrecision(n));
/** TeX for a number: plain for normal range, scientific otherwise. */
export function T(x, n = 3) {
  if (x === 0) return '0';
  const ax = Math.abs(x);
  if (ax >= 1e5 || ax < 1e-2) {
    const [m, e] = x.toExponential(n - 1).split('e');
    return `${parseFloat(m)}\\times10^{${parseInt(e, 10)}}`;
  }
  return String(parseFloat(x.toPrecision(n)));
}
export const parallel = (...r) => 1 / r.reduce((s, v) => s + 1 / v, 0);
export const G = 9.8;
