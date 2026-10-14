import { ProTable } from '@ant-design/pro-components';

const dataSource = [
  {
    key: 1,
    name: '用户认证服务',
    value: ['2024-01-15 10:30:00', '2024-01-15 12:30:00'],
  },
  {
    key: 2,
    name: '支付网关',
    value: ['2024-01-16 14:20:00', '2024-01-16 16:20:00'],
  },
];

export default () => (
  <ProTable
    rowKey="key"
    search={false}
    options={false}
    pagination={false}
    dataSource={dataSource}
    columns={[
      { title: '应用名称', dataIndex: 'name' },
      { title: '日期时间区间', dataIndex: 'value', valueType: 'dateTimeRange' },
    ]}
  />
);
