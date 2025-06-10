import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRef, useState } from 'react';

export type TableListItem = {
  key: number;
  name: string;
  createdAt: string;
};

const columns: ProColumns<TableListItem>[] = [
  {
    title: '标题',
    dataIndex: 'name',
    initialValue: 'TradeCode 1',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    valueType: 'date',
    initialValue: '2022-08-10',
  },
];

export default () => {
  const ref = useRef<ProFormInstance>();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <ProTable<TableListItem>
        style={{
          margin: '16px',
        }}
        columns={columns}
        request={(params) => {
          console.log('-->', params);
          return Promise.resolve({
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: '2022-09-22',
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
        style={{
          margin: '16px',
        }}
        columns={columns}
        request={(params) => {
          console.log('-->', params);
          return Promise.resolve({
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: '2022-09-22',
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
        style={{
          margin: '16px',
        }}
        columns={columns}
        request={(params) => {
          console.log('-->', params);
          return Promise.resolve({
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: '2022-09-22',
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
          return value.format('YYYY-MM-DD HH:mm:ss');
        }}
        headerTitle="使用自定义函数进行日期格式化"
      />
    </>
  );
};
