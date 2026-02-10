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
    title: '服务名称',
    dataIndex: 'name',
    initialValue: '用户认证服务',
  },
  {
    title: '部署时间',
    dataIndex: 'createdAt',
    valueType: 'date',
    initialValue: '2024-01-15',
  },
];

const mockData = {
  key: 1,
  name: '用户认证服务',
  createdAt: '2024-01-15',
};

const Demo = () => {
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
            data: [mockData],
            total: 1,
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
            data: [mockData],
            total: 1,
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
            data: [mockData],
            total: 1,
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

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
