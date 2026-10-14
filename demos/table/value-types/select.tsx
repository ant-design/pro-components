import { ProTable } from '@ant-design/pro-components';

const dataSource = [
  { key: 1, name: '用户认证服务', value: 'running' },
  { key: 2, name: '支付网关', value: 'closed' },
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
      {
        title: '状态',
        dataIndex: 'value',
        valueType: 'select',
        valueEnum: {
          running: { text: '运行中', status: 'Processing' },
          closed: { text: '已关闭', status: 'Default' },
        },
      },
    ]}
  />
);
