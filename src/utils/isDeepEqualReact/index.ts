// do not edit .js files directly - edit src/index.jst

type EqualStack = { val: object; next: EqualStack | null } | null;

export function isDeepEqualReact(
  a: any,
  b: any,
  ignoreKeys?: string[],
  stackA: EqualStack = null,
  stackB: EqualStack = null,
) {
  if (a === b) return true;

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    if (a.constructor !== b.constructor) return false;

    // Track ancestor path only (not all visited nodes) so shared DAG refs
    // across sibling branches can still compare structurally.
    let currA = stackA;
    let currB = stackB;
    let hasA = false;
    let hasB = false;
    while (currA) {
      if (currA.val === a) {
        hasA = true;
        break;
      }
      currA = currA.next;
    }
    while (currB) {
      if (currB.val === b) {
        hasB = true;
        break;
      }
      currB = currB.next;
    }
    if (hasA && hasB) return true;
    if (hasA || hasB) return false;

    const nextStackA: EqualStack = { val: a, next: stackA };
    const nextStackB: EqualStack = { val: b, next: stackB };

    let length;
    let i;
    let keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0; )
        if (!isDeepEqualReact(a[i], b[i], ignoreKeys, nextStackA, nextStackB))
          return false;
      return true;
    }

    if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false;
      for (i of a.entries()) if (!b.has(i[0])) return false;
      for (i of a.entries())
        if (
          !isDeepEqualReact(i[1], b.get(i[0]), ignoreKeys, nextStackA, nextStackB)
        )
          return false;
      return true;
    }

    if (a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false;
      for (i of a.entries()) if (!b.has(i[0])) return false;
      return true;
    }

    if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      // @ts-ignore
      length = a.length;
      // @ts-ignore
      if (length != b.length) return false;
      // @ts-ignore
      for (i = length; i-- !== 0; ) if (a[i] !== b[i]) return false;
      return true;
    }

    if (a.constructor === RegExp)
      return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf && a.valueOf)
      return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString && a.toString)
      return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0; ) {
      const key = keys[i];

      if (ignoreKeys?.includes(key)) continue;

      if (key === '_owner' && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner.
        //  _owner contains circular references
        // and is not needed when comparing the actual elements (and not their owners)
        continue;
      }

      if (
        !isDeepEqualReact(a[key], b[key], ignoreKeys, nextStackA, nextStackB)
      ) {
        return false;
      }
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a !== a && b !== b;
}
