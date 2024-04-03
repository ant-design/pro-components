import React from 'react';
import { useDeepCompareMemoize } from '../useDeepCompareEffect';

/**
 * `useDeepCompareMemo` will only recompute the memoized value when one of the
 * `deps` has changed.
 *
 * Usage note: only use this if `deps` are objects or arrays that contain
 * objects. Otherwise you should just use React.useMemo.
 *
 */
function useDeepCompareMemo<T>(
  factory: () => T,
  dependencies: React.DependencyList,
) {
  return React.useMemo(
    factory,
    useDeepCompareMemoize(dependencies) as unknown as React.DependencyList,
  );
}

export default useDeepCompareMemo;
