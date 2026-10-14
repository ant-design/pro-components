import { ProTable } from '@ant-design/pro-components';

type ServiceItem = { key: number; name: string };

const services: ServiceItem[] = [
  { key: 1, name: '用户认证服务' },
  { key: 2, name: '订单处理中心' },
  { key: 3, name: '支付网关' },
];

export default () => (
  <ProTable<ServiceItem>
    headerTitle="服务列表"
    columns={[{ title: '服务名称', dataIndex: 'name' }]}
    request={async ({ keyWords }) => {
      const keyword = String(keyWords || '').trim();
      const data = services.filter((item) => item.name.includes(keyword));
      return { data, total: data.length, success: true };
    }}
    search={false}
    options={{ search: { name: 'keyWords' } }}
    pagination={false}
    rowKey="key"
  />
);
