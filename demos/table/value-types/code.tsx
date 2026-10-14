import { ProTable } from '@ant-design/pro-components';

const dataSource = [
  { key: 1, name: '用户认证服务', value: 'const ready = true;' },
  { key: 2, name: '支付网关', value: 'const ready = false;' },
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
      { title: '代码', dataIndex: 'value', valueType: 'code' },
    ]}
  />
);
