import { ProTable } from '@ant-design/pro-components';

const dataSource = [
  { key: 1, name: '用户认证服务', value: 128 },
  { key: 2, name: '支付网关', value: 256 },
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
      { title: '请求数', dataIndex: 'value', valueType: 'digit' },
    ]}
  />
);
