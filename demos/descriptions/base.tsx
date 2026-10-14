import { ProDescriptions } from '@ant-design/pro-components';

export default () => (
  <ProDescriptions
    title="订单详情"
    column={{ xs: 1, sm: 2 }}
    columns={[
      { label: '订单编号', dataIndex: 'id' },
      { label: '客户名称', dataIndex: 'customer' },
    ]}
    dataSource={{ id: 'SO-2026-001', customer: '青禾科技' }}
  />
);
