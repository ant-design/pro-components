import { MenuOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import {
  arrayMoveImmutable,
  ProTable,
  useRefFunction,
} from '@ant-design/pro-components';
import { useState } from 'react';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />
));

const columns: ProColumns[] = [
  {
    title: '排序',
    dataIndex: 'sort',
    width: 60,
    className: 'drag-visible',
    render: () => <DragHandle />,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    className: 'drag-visible',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    index: 0,
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    index: 1,
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    index: 2,
  },
];

export default () => {
  const [dataSource, setDataSource] = useState(data);
  const SortableItem = SortableElement((props: any) => <tr {...props} />);
  const SortContainer = SortableContainer((props: any) => <tbody {...props} />);

  const onSortEnd = useRefFunction(
    ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      if (oldIndex !== newIndex) {
        const newData = arrayMoveImmutable({
          array: [...dataSource],
          fromIndex: oldIndex,
          toIndex: newIndex,
        }).filter((el) => !!el);
        setDataSource([...newData]);
      }
    },
  );

  const DraggableContainer = (props: any) => (
    <SortContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow = (props: any) => {
    const { className, style, ...restProps } = props;
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(
      (x) => x.index === restProps['data-row-key'],
    );
    return <SortableItem index={index} {...restProps} />;
  };

  return (
    <ProTable
      headerTitle="拖拽排序"
      columns={columns}
      rowKey="index"
      pagination={false}
      dataSource={dataSource}
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow,
        },
      }}
    />
  );
};
