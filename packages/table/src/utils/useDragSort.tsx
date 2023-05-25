import { useRefFunction } from '@ant-design/pro-utils';
import type { TableComponents } from 'rc-table/lib/interface';
import { CSS } from '@dnd-kit/utilities';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React from 'react';

function SortableItem(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...props?.style,
  };
  const { DragHandle, dragSortKey, children, ...rest } = props;
  if (DragHandle) {
    let doms: React.ReactNode[] = [];
    React.Children.forEach(children, (child: any) => {
      if (child.key === dragSortKey) {
        doms.push(
          React.cloneElement(child, {
            ...child.props,
            children: (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <DragHandle
                  rowData={child?.props?.record}
                  index={child?.props?.index}
                  {...listeners}
                  {...attributes}
                />
                {child}
              </div>
            ),
          }),
        );
        return;
      }
      doms.push(child);
    });
    return (
      <tr {...rest} ref={setNodeRef} style={style}>
        {doms}
      </tr>
    );
  }
  return (
    <tr
      {...props}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    />
  );
}

/**
 * 数据排序核心逻辑
 *
 * @param oldIndex 原始位置
 * @param newIndex 新位置
 * @param data 原始数组
 */
export function sortData<T>(
  oldIndex: number,
  newIndex: number,
  data: T[],
): T[] | null {
  if (oldIndex !== newIndex) {
    return arrayMove<T>(data || [], oldIndex, newIndex);
  }
  return null;
}

export interface UseDragSortOptions<T> {
  dataSource?: T[];
  onDragSortEnd?: (newDataSource: T[]) => Promise<void> | void;
  dragSortKey?: string;
  components?: TableComponents<T>;
  rowKey: any;
  DragHandle: React.FC<any>;
}

const SortContainer = (p: any) => <tbody {...p} />;

export function useDragSort<T>(props: UseDragSortOptions<T>) {
  const { dataSource = [], onDragSortEnd, DragHandle, dragSortKey } = props;

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over?.id?.toString() && active.id !== over?.id) {
      const newData = sortData(
        parseInt(active.id as string),
        parseInt(over.id as string),
        dataSource,
      );
      onDragSortEnd?.(newData || []);
    }
  }

  const DraggableContainer = useRefFunction((p: any) => (
    <SortableContext
      items={dataSource.map((_, index) => index?.toString())}
      strategy={verticalListSortingStrategy}
    >
      <SortContainer {...p} />
    </SortableContext>
  ));

  const DraggableBodyRow = useRefFunction((p: any) => {
    const { ...restProps } = p;
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource
      .findIndex(
        (item: any) =>
          item[props.rowKey ?? 'index'] === restProps['data-row-key'],
      )
      ?.toString();

    return (
      <SortableItem
        id={index}
        dragSortKey={dragSortKey}
        DragHandle={DragHandle}
        key={index}
        {...restProps}
      />
    );
  });

  const components: TableComponents<T> = props.components || {};

  if (dragSortKey) {
    components.body = {
      ...(props.components?.body || {}),
      wrapper: DraggableContainer,
      row: DraggableBodyRow,
    };
  }

  return {
    DndContext: (props: any) => {
      return (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {props.children}
        </DndContext>
      );
    },
    components,
  };
}
