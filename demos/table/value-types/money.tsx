import { ProTable } from '@ant-design/pro-components';

const dataSource = [
  { key: 1, name: '用户认证服务', value: 12345.67 },
  { key: 2, name: '支付网关', value: 890.12 },
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
      { title: '金额', dataIndex: 'value', valueType: 'money' },
    ]}
  />
);
