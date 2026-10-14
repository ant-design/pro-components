import { ProDescriptions } from '@ant-design/pro-components';

type Order = { info: { id: string; owner: string } };

export default () => (
  <ProDescriptions<Order>
    title="嵌套字段路径"
    dataSource={{ info: { id: 'ORD-001', owner: '林青' } }}
    columns={[
      { title: '订单编号', dataIndex: ['info', 'id'] },
      { title: '负责人', dataIndex: ['info', 'owner'] },
    ]}
  />
);
