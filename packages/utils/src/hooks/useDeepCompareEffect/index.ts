import type { DependencyList } from 'react';
import { useEffect, useRef } from 'react';
import isDeepEqualReact from 'fast-deep-equal/es6/react';

export const isDeepEqual: (a: any, b: any) => boolean = isDeepEqualReact;

function useDeepCompareMemoize(value: any) {
  const ref = useRef();
  // it can be done by using useMemo as well
  // but useRef is rather cleaner and easier
  if (!isDeepEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffect(effect: React.EffectCallback, dependencies: DependencyList = []) {
  useEffect(effect, useDeepCompareMemoize(dependencies));
}

export default useDeepCompareEffect;
