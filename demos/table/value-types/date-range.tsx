import { ProTable } from '@ant-design/pro-components';

const dataSource = [
  { key: 1, name: '用户认证服务', value: ['2024-01-15', '2024-01-20'] },
  { key: 2, name: '支付网关', value: ['2024-01-16', '2024-01-21'] },
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
      { title: '日期区间', dataIndex: 'value', valueType: 'dateRange' },
    ]}
  />
);
