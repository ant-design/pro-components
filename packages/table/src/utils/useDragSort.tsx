import { useRefFunction } from '@ant-design/pro-utils';
import type { TableComponents } from 'rc-table/lib/interface';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import type { SortDataParams } from './index';
import { sortData } from './index';

export interface UseDragSortOptions<T> {
  dataSource?: T[];
  onDragSortEnd?: (newDataSource: T[]) => Promise<void> | void;
  dragSortKey?: string;
  components?: TableComponents<T>;
  rowKey: any;
}

const SortableItem = SortableElement((p: any) => <tr {...p} />);
const SortContainer = SortableContainer((p: any) => <tbody {...p} />);

export function useDragSort<T>(props: UseDragSortOptions<T>) {
  const { dataSource = [], onDragSortEnd, dragSortKey } = props;

  // 拖拽排序相关逻辑
  /* istanbul ignore next */
  const handleSortEnd = useRefFunction((params: SortDataParams) => {
    /* istanbul ignore next */
    const newDataSource: T[] | null = sortData<T>(params, dataSource);
    /* istanbul ignore next */
    if (newDataSource && onDragSortEnd) {
      /* istanbul ignore next */
      onDragSortEnd(newDataSource);
    }
  });

  const DraggableContainer = useRefFunction((p: any) => (
    <SortContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={handleSortEnd}
      {...p}
    />
  ));

  const DraggableBodyRow = useRefFunction((p: any) => {
    const { ...restProps } = p;
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(
      (item: any) =>
        item[props.rowKey ?? 'index'] === restProps['data-row-key'],
    );
    return <SortableItem index={index} {...restProps} />;
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
    components,
  };
}
