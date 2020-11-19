import { createContainer } from 'unstated-next';
import { useState, useRef } from 'react';
import useMergedState from 'rc-util/lib/hooks/useMergedState';

import { RequestData, ProTableProps } from './index';
import { UseFetchDataAction } from './useFetchData';
import { DensitySize } from './component/ToolBar/DensityIcon';

export type ColumnsState = {
  show?: boolean;
  fixed?: 'right' | 'left' | undefined;
  order?: number;
};

export interface UseCounterProps {
  columnsStateMap?: {
    [key: string]: ColumnsState;
  };
  onColumnsStateChange?: (map: { [key: string]: ColumnsState }) => void;
  size?: DensitySize;
  onSizeChange?: (size: DensitySize) => void;
}

function useCounter(props: UseCounterProps = {}) {
  const actionRef = useRef<UseFetchDataAction<RequestData<any>>>();
  const propsRef = useRef<ProTableProps<any, any>>();

  // 共享状态比较难，就放到这里了
  const [keyWords, setKeyWords] = useState<string | undefined>('');
  // 用于排序的数组
  const sortKeyColumns = useRef<string[]>([]);

  const [tableSize, setTableSize] = useMergedState<DensitySize>(props.size || 'middle', {
    value: props.size,
    onChange: props.onSizeChange,
  });

  const [columnsMap, setColumnsMap] = useMergedState<{
    [key: string]: ColumnsState;
  }>(props.columnsStateMap || {}, {
    value: props.columnsStateMap,
    onChange: props.onColumnsStateChange,
  });

  return {
    action: actionRef,
    setAction: (newAction: UseFetchDataAction<RequestData<any>>) => {
      actionRef.current = newAction;
    },
    sortKeyColumns: sortKeyColumns.current,
    setSortKeyColumns: (keys: string[]) => {
      sortKeyColumns.current = keys;
    },
    propsRef,
    columnsMap,
    keyWords,
    setKeyWords: (k: string | undefined) => setKeyWords(k),
    setTableSize,
    tableSize,
    setColumnsMap,
  };
}

const Counter = createContainer<ReturnType<typeof useCounter>, UseCounterProps>(useCounter);

export type CounterType = typeof useCounter;

export { useCounter };

export default Counter;
