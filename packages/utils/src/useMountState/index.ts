import { useRef, useEffect, useState } from 'react';

type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);

function useMountState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] {
  const mountRef = useRef<boolean>(false);
  useEffect(() => {
    mountRef.current = true;
    return () => {
      mountRef.current = false;
    };
  });
  const [state, setState] = useState(initialState);
  const mountSetState: Dispatch<SetStateAction<S>> = (prevState: SetStateAction<S>) => {
    setTimeout(() => {
      if (mountRef.current) {
        setState(prevState);
      }
    });
  };
  return [state, mountSetState];
}

export default useMountState;
