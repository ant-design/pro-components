import type { DependencyList } from 'react';
import { useEffect, useRef } from 'react';
import { isDeepEqualReact } from '../../isDeepEqualReact';
import { useDebounceFn } from '../useDebounceFn';

export const isDeepEqual = (a: any, b: any, ignoreKeys?: string[]) => isDeepEqualReact(a, b, ignoreKeys);

export function useDeepCompareMemoize(value: any, ignoreKeys?: any) {
  const ref = useRef(undefined);
  // it can be done by using useMemo as well
  // but useRef is rather cleaner and easier
  if (!isDeepEqual(value, ref.current, ignoreKeys)) {
    ref.current = value;
  }

  return ref.current;
}

export function useDeepCompareEffect(
  effect: React.EffectCallback,
  dependencies: DependencyList,
  ignoreKeys?: string[],
) {
  useEffect(effect, useDeepCompareMemoize(dependencies || [], ignoreKeys));
}

export function useDeepCompareEffectDebounce(
  effect: React.EffectCallback,
  dependencies: DependencyList,
  ignoreKeys?: string[],
  waitTime?: number,
) {
  const effectDn = useDebounceFn(async () => {
    effect();
  }, waitTime || 16);
  useEffect(
    () => {
      effectDn.run();
    },
    useDeepCompareMemoize(dependencies || [], ignoreKeys),
  );
}
