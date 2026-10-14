import { ProDescriptions } from '@ant-design/pro-components';

export default () => (
  <ProDescriptions
    title="订单状态"
    column={1}
    dataSource={{ status: 'processing' }}
    columns={[
      {
        title: '状态',
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: {
          processing: { text: '处理中', status: 'Processing' },
          complete: { text: '已完成', status: 'Success' },
        },
      },
    ]}
  />
);
