/* eslint-disable prefer-const */

let index = 0;
let genNanoid = (t = 21) => {
  if (typeof window === 'undefined') return (index += 1).toFixed(0);
  if (!window.crypto) return (index += 1).toFixed(0);
  let e = '',
    r = crypto.getRandomValues(new Uint8Array(t));
  // eslint-disable-next-line no-param-reassign
  for (; t--; ) {
    let n = 63 & r[t];
    e +=
      n < 36
        ? n.toString(36)
        : n < 62
        ? (n - 26).toString(36).toUpperCase()
        : n < 63
        ? '_'
        : '-';
  }
  return e;
};

/**
 * 生成uuid，如果不支持 randomUUID，就用 genNanoid
 *
 * @returns string
 */
export const nanoid = (): string => {
  if (typeof window === 'undefined') return genNanoid();
  // @ts-ignore
  if (
    window.crypto &&
    window.crypto.randomUUID &&
    typeof crypto.randomUUID == 'function'
  ) {
    // @ts-ignore
    return crypto.randomUUID();
  }
  return genNanoid();
};
