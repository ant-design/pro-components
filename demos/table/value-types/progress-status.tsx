import { ProTable } from '@ant-design/pro-components';

export default () => (
  <ProTable
    rowKey="key"
    search={false}
    options={false}
    pagination={false}
    dataSource={[
      { key: 1, name: '用户认证服务', progress: 75, status: 'running' },
      { key: 2, name: '支付网关', progress: 40, status: 'error' },
    ]}
    columns={[
      { title: '应用名称', dataIndex: 'name' },
      {
        title: '部署进度',
        dataIndex: 'progress',
        valueType: (row) => ({
          type: 'progress',
          status: row.status === 'error' ? 'exception' : 'active',
        }),
      },
    ]}
  />
);
