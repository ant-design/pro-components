import { ProDescriptions } from '@ant-design/pro-components';

export default () => (
  <ProDescriptions
    column={1}
    columns={[
      {
        label: '订单编号',
        dataIndex: 'id',
        renderText: (value) => `订单 ${value}`,
      },
    ]}
    dataSource={{ id: 'SO-2026-001' }}
  />
);
