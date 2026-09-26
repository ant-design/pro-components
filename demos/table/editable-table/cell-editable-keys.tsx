import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import React from 'react';

type DataSourceType = {
  id: React.Key;
  name?: string;
  age?: number;
  address?: string;
};

const defaultData: DataSourceType[] = [
  { id: 1, name: '张三', age: 18, address: '杭州西湖区' },
  { id: 2, name: '李四', age: 22, address: '北京海淀区' },
];

export default () => {
  const columns: ProColumns<DataSourceType>[] = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '地址', dataIndex: 'address', key: 'address' },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: () => [<a key="edit">编辑</a>],
    },
  ];

  return (
    <EditableProTable<DataSourceType>
      rowKey="id"
      columns={columns}
      value={defaultData}
      search={false}
      // cell 粒度复合键 `${rowKey}:${dataIndex}`：只激活第 1 行的 name 单元格
      editable={{ editableKeys: ['1:name'] }}
    />
  );
};
