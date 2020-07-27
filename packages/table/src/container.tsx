import { createContainer } from 'unstated-next';
import { useState, useRef } from 'react';
import { ColumnType } from 'antd/es/table';
import useMergeValue from 'use-merge-value';

import { RequestData, ProColumns } from './index';
import { UseFetchDataAction } from './useFetchData';
import { DensitySize } from './component/toolBar/DensityIcon';
import { ColumnsState } from './Table';

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
  const [columns, setColumns] = useState<ColumnType<any>[]>([]);
  // 用于排序的数组
  const [sortKeyColumns, setSortKeyColumns] = useState<(string | number)[]>([]);
  const [proColumns, setProColumns] = useState<ProColumns<any>[]>([]);

  const [tableSize, setTableSize] = useMergeValue<DensitySize>(props.size || 'middle', {
    value: props.size,
    onChange: props.onSizeChange,
  });

  const [columnsMap, setColumnsMap] = useMergeValue<{
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
    sortKeyColumns,
    setSortKeyColumns,
    columns,
    setColumns,
    columnsMap,
    setTableSize,
    tableSize,
    setColumnsMap,
    proColumns,
    setProColumns,
  };
}

const Counter = createContainer<ReturnType<typeof useCounter>, UseCounterProps>(useCounter);

export { useCounter };

export default Counter;
