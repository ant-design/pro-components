import { ProTable } from '@ant-design/pro-components';

const dataSource = [
  { key: 1, name: '用户认证服务', value: '10:30:00' },
  { key: 2, name: '支付网关', value: '14:20:00' },
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
      { title: '时间', dataIndex: 'value', valueType: 'time' },
    ]}
  />
);
