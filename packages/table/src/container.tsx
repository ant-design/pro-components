import { createContainer } from 'unstated-next';
import { useState, useRef } from 'react';
import { ColumnType } from 'antd/lib/table';
import useMergedState from 'rc-util/lib/hooks/useMergedState';

import { RequestData, ProColumns, ProTableProps } from './index';
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
  const [columns, setColumns] = useState<(ColumnType<any> & { index?: number })[]>([]);
  const propsRef = useRef<ProTableProps<any, any>>();
  // 用于排序的数组
  const sortKeyColumns = useRef<string[]>([]);
  const [proColumns, setProColumns] = useState<ProColumns<any>[]>([]);

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
    columns,
    setColumns,
    propsRef,
    columnsMap,
    setTableSize,
    tableSize,
    setColumnsMap,
    proColumns,
    setProColumns,
  };
}

const Counter = createContainer<ReturnType<typeof useCounter>, UseCounterProps>(useCounter);

export type CounterType = typeof useCounter;

export { useCounter };

export default Counter;
