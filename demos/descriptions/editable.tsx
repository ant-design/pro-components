import { ProDescriptions } from '@ant-design/pro-components';
import { useState } from 'react';

type Order = { id: string; note: string };

export default () => {
  const [order, setOrder] = useState<Order>({
    id: 'ORD-001',
    note: '待确认交付日期',
  });

  return (
    <ProDescriptions<Order>
      title="编辑订单备注"
      dataSource={order}
      columns={[
        { title: '订单编号', dataIndex: 'id', editable: false },
        { title: '备注', dataIndex: 'note', valueType: 'textarea' },
      ]}
      editable={{
        onSave: async (_key, next) => {
          setOrder(next);
          return true;
        },
      }}
    />
  );
};
