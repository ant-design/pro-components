/**
 * @param  {ValueType[]} array
 * @param  {number} fromIndex
 * @param  {number} toIndex
 */
export function arrayMoveMutable<ValueType>(
  array: ValueType[],
  fromIndex: number,
  toIndex: number,
) {
  const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;
    const [item] = array.splice(fromIndex, 1);
    array.splice(endIndex, 0, item);
  }
}

/**
 * @param  {T[]} array
 * @param  {number} fromIndex
 * @param  {number} toIndex
 * @returns T
 */
export function arrayMoveImmutable<T = string>({
  array,
  fromIndex,
  toIndex,
}: {
  array: T[];
  fromIndex: number;
  toIndex: number;
}): T[] {
  const newArray = [...array];
  arrayMoveMutable(newArray, fromIndex, toIndex);
  return newArray;
}
