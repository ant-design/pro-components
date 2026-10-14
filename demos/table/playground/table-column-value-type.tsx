import { ProTable } from '@ant-design/pro-components';

export default () => (
  <ProTable
    rowKey="id"
    search={false}
    options={false}
    pagination={false}
    dataSource={[
      { id: 1, createdAt: '2024-01-15' },
      { id: 2, createdAt: '2024-01-16' },
    ]}
    columns={[{ title: '创建日期', dataIndex: 'createdAt', valueType: 'date' }]}
  />
);
