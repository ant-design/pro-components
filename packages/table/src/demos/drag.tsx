import React from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import './drag.less';
import { MenuOutlined } from '@ant-design/icons';

const columns: ProColumns[] = [
  {
    title: '排序',
    dataIndex: 'sort',
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
  const handleDragSortEnd = (newDataSource: any) => {
    console.log('排序后的数据', newDataSource);
  };

  const dragHandleRender = (rowData: any, idx: any) => (
    <>
      <MenuOutlined style={{ cursor: 'grab', color: 'gold' }} />
      {idx + 1} - {rowData.name}
    </>
  );

  return (
    <>
      <ProTable
        headerTitle="拖拽排序(默认把手)"
        columns={columns}
        rowKey="index"
        pagination={false}
        dataSource={data}
        dragSortKey="sort"
        onDragSortEnd={handleDragSortEnd}
      />
      <ProTable
        headerTitle="拖拽排序(自定义把手)"
        columns={columns}
        rowKey="index"
        pagination={false}
        dataSource={data}
        dragSortKey="sort"
        dragSortHandlerRender={dragHandleRender}
        onDragSortEnd={handleDragSortEnd}
      />
    </>
  );
};
