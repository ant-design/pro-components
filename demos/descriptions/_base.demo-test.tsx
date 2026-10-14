import { ProDescriptions } from '@ant-design/pro-components';

export default () => (
  <ProDescriptions
    title="金额不显示货币符号"
    column={1}
    dataSource={{ amount: 12345 }}
    columns={[
      {
        title: '订单金额',
        dataIndex: 'amount',
        valueType: 'money',
        fieldProps: { moneySymbol: false },
      },
    ]}
  />
);
