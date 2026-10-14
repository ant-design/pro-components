import { ProTable } from '@ant-design/pro-components';

export default () => (
  <ProTable
    rowKey="key"
    search={false}
    options={false}
    pagination={false}
    dataSource={[
      { key: 1, name: '用户认证服务' },
      { key: 2, name: '支付网关' },
    ]}
    columns={[
      { title: '序号', valueType: 'indexBorder' },
      { title: '应用名称', dataIndex: 'name' },
    ]}
  />
);
