import { ProDescriptions } from '@ant-design/pro-components';

export default () => (
  <ProDescriptions
    title="订单金额"
    column={1}
    dataSource={{ amount: 12345.67 }}
    columns={[
      {
        title: '金额',
        dataIndex: 'amount',
        valueType: 'money',
        fieldProps: { customSymbol: '$' },
      },
    ]}
  />
);
