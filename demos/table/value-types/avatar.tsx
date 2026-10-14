import { ProTable } from '@ant-design/pro-components';

const dataSource = [
  {
    key: 1,
    name: '用户认证服务',
    value:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect width="80" height="80" fill="%231677ff"/%3E%3Ctext x="40" y="47" text-anchor="middle" fill="white" font-size="24"%3EA%3C/text%3E%3C/svg%3E',
  },
  {
    key: 2,
    name: '支付网关',
    value:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect width="80" height="80" fill="%231677ff"/%3E%3Ctext x="40" y="47" text-anchor="middle" fill="white" font-size="24"%3EA%3C/text%3E%3C/svg%3E',
  },
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
      { title: '图像', dataIndex: 'value', valueType: 'avatar' },
    ]}
  />
);
