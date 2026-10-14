import { ProTable } from '@ant-design/pro-components';

const dataSource = [
  { key: 1, name: '用户认证服务', value: Date.now() - 60_000 },
  { key: 2, name: '支付网关', value: Date.now() - 3_600_000 },
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
      { title: '相对时间', dataIndex: 'value', valueType: 'fromNow' },
    ]}
  />
);
