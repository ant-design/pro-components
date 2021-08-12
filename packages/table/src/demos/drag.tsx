import React, { useState } from 'react';
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
  const [dataSource1, setDatasource1] = useState(data);
  const [dataSource2, setDatasource2] = useState(data);
  const handleDragSortEnd1 = (newDataSource: any) => {
    console.log('排序后的数据', newDataSource);
    setDatasource1(newDataSource);
    setTimeout(() => {
      console.log('异步新增元素');
      newDataSource.push({
        key: `${newDataSource.length + 1}`,
        name: 'kiner tang',
        age: 28,
        address: 'guangzhou',
        index: newDataSource.length,
      });
      setDatasource1([...newDataSource]);
    }, 3000);
  };
  const handleDragSortEnd2 = (newDataSource: any) => {
    console.log('排序后的数据', newDataSource);
    setDatasource2(newDataSource);
    setTimeout(() => {
      console.log('异步新增元素');
      newDataSource.push({
        key: `${newDataSource.length + 1}`,
        name: 'kiner tang',
        age: 28,
        address: 'guangzhou',
        index: newDataSource.length,
      });
      setDatasource2([...newDataSource]);
    }, 3000);
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
        dataSource={dataSource1}
        dragSortKey="sort"
        onDragSortEnd={handleDragSortEnd1}
      />
      <ProTable
        headerTitle="拖拽排序(自定义把手)"
        columns={columns}
        rowKey="index"
        pagination={false}
        dataSource={dataSource2}
        dragSortKey="sort"
        dragSortHandlerRender={dragHandleRender}
        onDragSortEnd={handleDragSortEnd2}
      />
    </>
  );
};
