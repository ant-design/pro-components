const semver =
  /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;

const isWildcard = (s: string) => s === '*' || s === 'x' || s === 'X';

const tryParse = (v: string) => {
  const n = parseInt(v, 10);
  return isNaN(n) ? v : n;
};

const operatorResMap = {
  '>': [1],
  '>=': [0, 1],
  '=': [0],
  '<=': [-1, 0],
  '<': [-1],
};

const allowedOperators = Object.keys(operatorResMap);

const assertValidOperator = (op: string) => {
  if (typeof op !== 'string') {
    throw new TypeError(`Invalid operator type, expected string but got ${typeof op}`);
  }
  if (allowedOperators.indexOf(op) === -1) {
    throw new Error(`Invalid operator, expected one of ${allowedOperators.join('|')}`);
  }
};

const forceType = (a: string | number, b: string | number) =>
  typeof a !== typeof b ? [String(a), String(b)] : [a, b];

const compareStrings = (a: string, b: string) => {
  if (isWildcard(a) || isWildcard(b)) return 0;
  const [ap, bp] = forceType(tryParse(a), tryParse(b));
  if (ap > bp) return 1;
  if (ap < bp) return -1;
  return 0;
};

const compareSegments = (a: string | RegExpMatchArray, b: string | RegExpMatchArray) => {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const r = compareStrings(a[i] || '0', b[i] || '0');
    if (r !== 0) return r;
  }
  return 0;
};

const validateAndParse = (version: string) => {
  if (typeof version !== 'string') {
    throw new TypeError('Invalid argument expected string');
  }
  const match = version.match(semver);
  if (!match) {
    throw new Error(`Invalid argument not valid semver ('${version}' received)`);
  }
  match.shift();
  return match;
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

  // validate pre-release
  if (p1 && p2) {
    return compareSegments(p1.split('.'), p2.split('.'));
  } else if (p1 || p2) {
    return p1 ? -1 : 1;
  }

  return 0;
};

/**
 * Validate [semver](https://semver.org/) version strings.
 *
 * @param version Version number to validate
 * @returns `true` if the version number is a valid semver version number, `false` otherwise.
 *
 * @example
 * ```
 * validate('1.0.0-rc.1'); // return true
 * validate('1.0-rc.1'); // return false
 * validate('foo'); // return false
 * ```
 */
export const validate = (version: string) =>
  typeof version === 'string' && /^[v\d]/.test(version) && semver.test(version);

/**
 * Allowed arithmetic operators
 */
export type CompareOperator = '>' | '>=' | '=' | '<' | '<=';

/**
 * Compare [semver](https://semver.org/) version strings using the specified operator.
 *
 * @param v1 First version to compare
 * @param v2 Second version to compare
 * @param operator Allowed arithmetic operator to use
 * @returns `true` if the comparison between the firstVersion and the secondVersion satisfies the operator, `false` otherwise.
 *
 * @example
 * ```
 * compare('10.1.8', '10.0.4', '>'); // return true
 * compare('10.0.1', '10.0.1', '='); // return true
 * compare('10.1.1', '10.2.2', '<'); // return true
 * compare('10.1.1', '10.2.2', '<='); // return true
 * compare('10.1.1', '10.2.2', '>='); // return false
 * ```
 */
export const compare = (v1: string, v2: string, operator: CompareOperator) => {
  // validate input operator
  assertValidOperator(operator);

  // since result of compareVersions can only be -1 or 0 or 1
  // a simple map can be used to replace switch
  const res = compareVersions(v1, v2);

  return operatorResMap[operator].includes(res);
};

/**
 * Match [npm semver](https://docs.npmjs.com/cli/v6/using-npm/semver) version range.
 *
 * @param version Version number to match
 * @param range Range pattern for version
 * @returns `true` if the version number is within the range, `false` otherwise.
 *
 * @example
 * ```
 * satisfies('1.1.0', '^1.0.0'); // return true
 * satisfies('1.1.0', '~1.0.0'); // return false
 * ```
 */
export const satisfies = (version: string, range: string) => {
  // if no range operator then "="
  const m = range.match(/^([<>=~^]+)/);
  const op = m ? m[1] : '=';

  // if gt/lt/eq then operator compare
  if (op !== '^' && op !== '~') return compare(version, range, op as CompareOperator);

  // else range of either "~" or "^" is assumed
  const [v1, v2, v3] = validateAndParse(version);
  const [r1, r2, r3] = validateAndParse(range);
  if (compareStrings(v1, r1) !== 0) return false;
  if (op === '^') {
    return compareSegments([v2, v3], [r2, r3]) >= 0;
  }
  if (compareStrings(v2, r2) !== 0) return false;
  return compareStrings(v3, r3) >= 0;
};
