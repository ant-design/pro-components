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
  const [state, setState] = useMergedState<S>(initialState, option);
  return [state, setState];
}

export default useMountMergeState;
