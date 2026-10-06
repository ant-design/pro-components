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
    // Cycle edges must point to ancestors at the same relative depth.
    let currA = stackA;
    let currB = stackB;
    while (currA && currB) {
      if (currA.val === a) return currB.val === b;
      if (currB.val === b) return false;
      currA = currA.next;
      currB = currB.next;
    }

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
      // DataView 没有可索引的 length，需按字节比较
      if (a instanceof DataView || b instanceof DataView) {
        if (!(a instanceof DataView && b instanceof DataView)) return false;
        if (a.byteLength !== b.byteLength) return false;
        for (i = a.byteLength; i-- !== 0; ) {
          if (a.getUint8(i) !== b.getUint8(i)) return false;
        }
        return true;
      }
      const aView = a as ArrayBufferView & ArrayLike<unknown>;
      const bView = b as ArrayBufferView & ArrayLike<unknown>;
      if (!('length' in aView) || !('length' in bView)) return false;
      length = aView.length;
      if (length != bView.length) return false;
      for (i = length; i-- !== 0; ) if (aView[i] !== bView[i]) return false;
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
