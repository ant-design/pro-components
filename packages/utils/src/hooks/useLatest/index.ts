import { useRef } from 'react';

/**
 * @see https://github.com/streamich/react-use/blob/master/docs/useLatest.md
 */
const useLatest = <T>(value: T): { readonly current: T } => {
  const ref = useRef(value);
  ref.current = value;
  return ref;
};

export default useLatest;
