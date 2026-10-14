import { ProDescriptions } from '@ant-design/pro-components';

const order = { orderNo: 'A20241001', customer: '张三', status: '待处理' };

export default () => (
  <ProDescriptions
    title="订单信息"
    column={1}
    dataSource={order}
    columns={[
      { title: '订单编号', dataIndex: 'orderNo' },
      { title: '客户', dataIndex: 'customer' },
      { title: '状态', dataIndex: 'status' },
    ]}
  />
);
