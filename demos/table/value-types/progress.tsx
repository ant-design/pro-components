import { ProTable } from '@ant-design/pro-components';

const dataSource = [
  { key: 1, name: '用户认证服务', value: 32 },
  { key: 2, name: '支付网关', value: 78 },
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
      { title: '部署进度', dataIndex: 'value', valueType: 'progress' },
    ]}
  />
);
