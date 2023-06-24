const semver =
  /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;

/**
 * @param  {string} s
 */
const isWildcard = (s: string) => s === '*' || s === 'x' || s === 'X';
/**
 * @param  {string} v
 */
const tryParse = (v: string) => {
  const n = parseInt(v, 10);
  return isNaN(n) ? v : n;
};
/**
 * @param  {string|number} a
 * @param  {string|number} b
 */
const forceType = (a: string | number, b: string | number) =>
  typeof a !== typeof b ? [String(a), String(b)] : [a, b];

/**
 * @param  {string} a
 * @param  {string} b
 * @returns number
 */
const compareStrings = (a: string, b: string): number => {
  if (isWildcard(a) || isWildcard(b)) return 0;
  const [ap, bp] = forceType(tryParse(a), tryParse(b));
  if (ap > bp) return 1;
  if (ap < bp) return -1;
  return 0;
};
/**
 * @param  {string|RegExpMatchArray} a
 * @param  {string|RegExpMatchArray} b
 * @returns number
 */
const compareSegments = (
  a: string | RegExpMatchArray,
  b: string | RegExpMatchArray,
): number => {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const r = compareStrings(a[i] || '0', b[i] || '0');
    if (r !== 0) return r;
  }
  return 0;
};
/**
 * @param  {string} version
 * @returns RegExpMatchArray
 */
const validateAndParse = (version: string): RegExpMatchArray => {
  const match = version.match(semver);
  match?.shift?.();
  return match!;
};

/**
 * Compare [semver](https://semver.org/) version strings to find greater, equal or lesser.
 * This library supports the full semver specification, including comparing versions with different number of digits like `1.0.0`, `1.0`, `1`, and pre-release versions like `1.0.0-alpha`.
 * @param v1 - First version to compare
 * @param v2 - Second version to compare
 * @returns Numeric value compatible with the [Array.sort(fn) interface](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters).
 */
export const compareVersions = (v1: string, v2: string) => {
  // validate input and split into segments
  const n1 = validateAndParse(v1);
  const n2 = validateAndParse(v2);

  // pop off the patch
  const p1 = n1.pop();
  const p2 = n2.pop();

  // validate numbers
  const r = compareSegments(n1, n2);
  if (r !== 0) return r;

  if (p1 || p2) {
    return p1 ? -1 : 1;
  }

  return 0;
};
