import { useRef, useEffect } from 'react';
import useMergedState from 'rc-util/lib/hooks/useMergedState';

type Dispatch<A> = (value: A) => void;

function useMountMergeState<S>(
  initialState: S | (() => S),
  option?: {
    defaultValue?: S;
    value?: S;
    onChange?: (value: S, prevValue: S) => void;
    postState?: (value: S) => S;
  },
): [S, Dispatch<S>] {
  const mountRef = useRef<boolean>(false);
  useEffect(() => {
    mountRef.current = true;
    return () => {
      mountRef.current = false;
    };
  });
  const [state, setState] = useMergedState<S>(initialState, option);
  const mountSetState: Dispatch<S> = (prevState: S) => {
    requestAnimationFrame(() => {
      if (mountRef.current) {
        setState(prevState);
      }
    });
  };
  return [state, mountSetState];
}

export default useMountMergeState;
