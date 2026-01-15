import type { RefObject } from 'react';
import useForceRender from '../useForceRender';
import { useRefCallback } from '../useRefCallback';

export function useReactiveRef<T>(initialValue: T): RefObject<T>;

export function useReactiveRef<T>(initialValue: T | null): RefObject<T>;

export function useReactiveRef<T = undefined>(): RefObject<T | undefined>;

export function useReactiveRef<T>(
  initialValue?: T | null,
): RefObject<T | null | undefined> {
  const forceRender = useForceRender();

  const ref = useRefCallback(forceRender, initialValue);

  return ref;
}
