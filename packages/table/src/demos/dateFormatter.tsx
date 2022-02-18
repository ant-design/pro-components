import React, { useRef, useState } from 'react';
import { Button } from 'antd';
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
    valueType: 'dateTime',
    initialValue: '2020-09-11 00:00:00',
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
                createdAt: 1602572994055,
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
                createdAt: 1602572994055,
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
                createdAt: 1602572994055,
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
        toolBarRender={() => [
          <Button
            key="set"
            onClick={() => {
              if (ref.current) {
                ref.current.setFieldsValue({
                  name: 'test-xxx',
                });
              }
            }}
          >
            赋值
          </Button>,
          <Button
            key="submit"
            onClick={() => {
              if (ref.current) {
                ref.current.submit();
              }
            }}
          >
            提交
          </Button>,
        ]}
        options={false}
        dateFormatter={(value, valueType) => {
          console.log('====>', value, valueType);
          return value.format('YYYY/MM/DD HH:mm:ss');
        }}
        headerTitle="使用自定义函数进行日期格式化"
      />
    </>
  );
};
