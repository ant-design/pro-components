import type { ProFormColumnsType } from '@ant-design/pro-components';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { useState } from 'react';

type Discount = {
  type?: 'money' | 'rate';
  amount?: number;
  rate?: number;
};

const columns: ProFormColumnsType<Discount>[] = [
  {
    title: '优惠方式',
    dataIndex: 'type',
    valueType: 'select',
    valueEnum: {
      money: { text: '按金额' },
      rate: { text: '按折扣率' },
    },
    formItemProps: {
      rules: [{ required: true, message: '请选择优惠方式' }],
    },
  },
  {
    valueType: 'dependency',
    name: ['type'],
    columns: ({ type }) => {
      if (type === 'money') {
        return [
          {
            title: '优惠金额',
            dataIndex: 'amount',
            valueType: 'digit',
            formItemProps: { preserve: false },
          },
        ];
      }
      if (type === 'rate') {
        return [
          {
            title: '折扣率',
            dataIndex: 'rate',
            valueType: 'digit',
            fieldProps: { min: 0, max: 100 },
            formItemProps: { preserve: false },
          },
        ];
      }
      return [];
    },
  },
];

export default () => {
  const [submitted, setSubmitted] = useState('');

  return (
    <div style={{ maxWidth: 480, padding: 16 }}>
      <BetaSchemaForm<Discount>
        layoutType="Form"
        columns={columns}
        onFinish={async (values) =>
          setSubmitted(JSON.stringify(values, null, 2))
        }
      />
      {submitted && <pre style={{ overflowX: 'auto' }}>{submitted}</pre>}
    </div>
  );
};
