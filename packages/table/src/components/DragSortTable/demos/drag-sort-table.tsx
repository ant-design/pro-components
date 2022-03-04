import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { DragSortTable } from '@ant-design/pro-table';
import { MenuOutlined } from '@ant-design/icons';
import { message } from 'antd';

const data = [
  {
    key: 'key1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    index: 0,
  },
  {
    key: 'key2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    index: 1,
  },
  {
    key: 'key3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    index: 2,
  },
];

export default () => {
  const columns: ProColumns[] = [
    {
      title: '排序',
      dataIndex: 'sort',
      render: (dom, rowData, index) => {
        return <span className="customRender">{`自定义Render[${rowData.name}-${index}]`}</span>;
      },
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
  const columns2: ProColumns[] = [
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

  const [dataSource1, setDatasource1] = useState(data);
  const [dataSource2, setDatasource2] = useState(data);
  const handleDragSortEnd1 = (newDataSource: any) => {
    console.log('排序后的数据', newDataSource);
    setDatasource1(newDataSource);
    message.success('修改列表排序成功');
  };
  const handleDragSortEnd2 = (newDataSource: any) => {
    console.log('排序后的数据', newDataSource);
    setDatasource2(newDataSource);
    message.success('修改列表排序成功');
  };

  const dragHandleRender = (rowData: any, idx: any) => (
    <>
      <MenuOutlined style={{ cursor: 'grab', color: 'gold' }} />
      &nbsp;{idx + 1} - {rowData.name}
    </>
  );

  return (
    <>
      <DragSortTable
        headerTitle="拖拽排序(默认把手)"
        columns={columns}
        rowKey="key"
        pagination={false}
        dataSource={dataSource1}
        dragSortKey="sort"
        onDragSortEnd={handleDragSortEnd1}
      />
      <DragSortTable
        headerTitle="拖拽排序(自定义把手)"
        columns={columns2}
        rowKey="index"
        search={false}
        pagination={false}
        dataSource={dataSource2}
        dragSortKey="sort"
        dragSortHandlerRender={dragHandleRender}
        onDragSortEnd={handleDragSortEnd2}
      />
    </>
  );
};
