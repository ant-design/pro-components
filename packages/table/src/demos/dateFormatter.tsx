import React, { useRef, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProFormInstance } from '@ant-design/pro-form';

export type TableListItem = {
  key: number;
  name: string;
};

const columns: ProColumns<TableListItem>[] = [
  {
    title: '标题',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
    initialValue: '2022-09-10',
  },
];

export default () => {
  const ref = useRef<ProFormInstance>();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <ProTable<TableListItem>
        columns={columns}
        request={(params) => {
          console.log('-->', params);
          return Promise.resolve({
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: '2022-09-10',
              },
            ],
            success: true,
          });
        }}
        rowKey="key"
        pagination={{
          showSizeChanger: true,
        }}
        search={{
          collapsed,
          onCollapse: setCollapsed,
        }}
        formRef={ref}
        options={false}
        dateFormatter="string"
        headerTitle="日期格式化为字符串"
      />

      <ProTable<TableListItem>
        columns={columns}
        request={(params) => {
          console.log('-->', params);
          return Promise.resolve({
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: '2022-09-10',
              },
            ],
            success: true,
          });
        }}
        rowKey="key"
        pagination={{
          showSizeChanger: true,
        }}
        search={{
          collapsed,
          onCollapse: setCollapsed,
        }}
        formRef={ref}
        options={false}
        dateFormatter="number"
        headerTitle="日期格式化为数字"
      />

      <ProTable<TableListItem>
        columns={columns}
        request={(params) => {
          console.log('-->', params);
          return Promise.resolve({
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: '2022-09-10',
              },
            ],
            success: true,
          });
        }}
        rowKey="key"
        pagination={{
          showSizeChanger: true,
        }}
        search={{
          collapsed,
          onCollapse: setCollapsed,
        }}
        formRef={ref}
        options={false}
        dateFormatter={(value, valueType) => {
          console.log('====>', value, valueType);
          return value.format('YYYY/MM/DD');
        }}
        headerTitle="使用自定义函数进行日期格式化"
      />
    </>
  );
};
