import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import React, { useCallback, useState } from 'react';
import arrayMove from 'array-move';
import type { TableComponents } from 'rc-table/lib/interface';
import type { UseFetchDataAction } from 'packages/table/es/typing';

export interface UseDragSortOptions<T> {
  data?: T[];
  action: UseFetchDataAction;
  onDragSortEnd?: (newDataSource: T[]) => Promise<void> | void;
  dragSortKey?: string;
  components?: TableComponents<T>;
}

export function useDragSort<T>(props: UseDragSortOptions<T>) {
  const { data = [], onDragSortEnd = () => {}, dragSortKey, action } = props;

  // 拖拽排序相关逻辑
  const SortableItem = SortableElement((p: any) => <tr {...p} />);
  const SortContainer = SortableContainer((p: any) => <tbody {...p} />);

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMove([...(data || [])], oldIndex, newIndex).filter((el) => !!el);
      action.setDataSource([...newData]);
      onDragSortEnd([...newData]);
    }
  };

  const DraggableContainer = (p: any) => (
    <SortContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...p}
    />
  );

  const DraggableBodyRow = (p: any) => {
    const { className: DraggableBodyRowClassName, style: DraggableBodyRowStyle, ...restProps } = p;
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = data.findIndex((x: any) => x.index === restProps['data-row-key']);
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
