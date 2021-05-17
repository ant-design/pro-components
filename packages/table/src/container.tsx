import { createContainer } from 'unstated-next';
import { useState, useRef } from 'react';
import useMergedState from 'rc-util/lib/hooks/useMergedState';

import type { ProTableProps } from './index';
import type { DensitySize } from './components/ToolBar/DensityIcon';
import type { ActionType } from './typing';

export type ColumnsState = {
  show?: boolean;
  fixed?: 'right' | 'left' | undefined;
  order?: number;
};

export type UseContainerProps = {
  columnsStateMap?: Record<string, ColumnsState>;
  onColumnsStateChange?: (map: Record<string, ColumnsState>) => void;
  size?: DensitySize;
  onSizeChange?: (size: DensitySize) => void;
};

function useContainer(props: UseContainerProps = {}) {
  const actionRef = useRef<ActionType>();
  const propsRef = useRef<ProTableProps<any, any, any>>();

  // 共享状态比较难，就放到这里了
  const [keyWords, setKeyWords] = useState<string | undefined>('');
  // 用于排序的数组
  const sortKeyColumns = useRef<string[]>([]);

  const [tableSize, setTableSize] = useMergedState<DensitySize>(props.size || 'middle', {
    value: props.size,
    onChange: props.onSizeChange,
  });

  const [columnsMap, setColumnsMap] = useMergedState<Record<string, ColumnsState>>(
    props.columnsStateMap || {},
    {
      value: props.columnsStateMap,
      onChange: props.onColumnsStateChange,
    },
  );

  return {
    action: actionRef,
    setAction: (newAction?: ActionType) => {
      actionRef.current = newAction;
    },
    sortKeyColumns,
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

const Container = createContainer<ReturnType<typeof useContainer>, UseContainerProps>(useContainer);

export type ContainerType = typeof useContainer;

export { useContainer };

export default Container;
