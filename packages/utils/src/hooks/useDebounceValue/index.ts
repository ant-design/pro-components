import type { DependencyList } from 'react';
import { useState, useEffect } from 'react';
import useLatest from '../useLatest';

export default function useDebounceValue<T>(
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
