import type { DependencyList } from 'react';
import { useEffect, useState } from 'react';
import { useLatest } from '../useLatest';
/**
 * 一个去抖的setState 减少更新的频率
 * @param  {T} value
 * @param  {number=100} delay
 * @param  {DependencyList} deps?
 * @returns T
 */
export function useDebounceValue<T>(
  value: T,
  delay: number = 100,
  deps?: DependencyList,
): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const valueRef = useLatest(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(valueRef.current);
      }, delay);

      return () => clearTimeout(handler);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? [delay, ...deps] : undefined,
  );

  return debouncedValue;
}
