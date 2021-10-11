import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import React, { useCallback } from 'react';
import type { TableComponents } from 'rc-table/lib/interface';
import type { SortDataParams } from './index';
import { sortData } from './index';

export interface UseDragSortOptions<T> {
  data?: T[];
  onDragSortEnd?: (newDataSource: T[]) => Promise<void> | void;
  dragSortKey?: string;
  components?: TableComponents<T>;
  rowKey: any;
}
export function useDragSort<T>(props: UseDragSortOptions<T>) {
  const { data = [], onDragSortEnd, dragSortKey } = props;

  // 拖拽排序相关逻辑
  const SortableItem = SortableElement((p: any) => <tr {...p} />);
  const SortContainer = SortableContainer((p: any) => <tbody {...p} />);

  /* istanbul ignore next */
  const handleSortEnd = useCallback(
    (params: SortDataParams) => {
      /* istanbul ignore next */
      const newDs: T[] | null = sortData<T>(params, data);
      /* istanbul ignore next */
      if (newDs && onDragSortEnd) {
        /* istanbul ignore next */
        onDragSortEnd(newDs);
      }
    },
    [data, onDragSortEnd],
  );

  const DraggableContainer = (p: any) => (
    <SortContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={handleSortEnd}
      {...p}
    />
  );

  const DraggableBodyRow = (p: any) => {
    const { className: DraggableBodyRowClassName, style: DraggableBodyRowStyle, ...restProps } = p;
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = data.findIndex(
      (x: any) => x[props.rowKey ?? 'index'] === restProps['data-row-key'],
    );
    return <SortableItem index={index} {...restProps} />;
  };

  const components: TableComponents<T> = props.components || {};
  if (dragSortKey) {
    components.body = {
      ...(props.components?.body || {}),
      wrapper: DraggableContainer,
      row: DraggableBodyRow,
    };
  }

  return {
    components,
  };
}
