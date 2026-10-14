import { ProTable } from '@ant-design/pro-components';
import { Card } from 'antd';

type Service = { id: number; name: string };
const services: Service[] = [
  { id: 1, name: '用户认证' },
  { id: 2, name: '支付网关' },
];

export default () => (
  <div style={{ maxWidth: '100%', padding: 16 }}>
    <ProTable<Service>
      rowKey="id"
      columns={[{ title: '服务名称', dataIndex: 'name' }]}
      request={async () => ({ data: services, success: true })}
      search={false}
      options={false}
      pagination={false}
      toolBarRender={false}
      tableExtraRender={(_, data) => (
        <Card size="small">当前服务数：{data.length}</Card>
      )}
    />
  </div>
);
