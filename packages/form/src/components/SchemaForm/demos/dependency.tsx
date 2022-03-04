import React from 'react';
import type { ProFormColumnsType } from '@ant-design/pro-form';
import { BetaSchemaForm } from '@ant-design/pro-form';

const valueEnum = {
  money: { text: '按金额' },
  discount: { text: '按折扣' },
};

type DataItem = {
  name: string;
  state: string;
};

const columns: ProFormColumnsType<DataItem>[] = [
  {
    title: '优惠方式',
    dataIndex: 'type',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    valueType: 'select',
    valueEnum,
    width: 'm',
  },
  {
    valueType: 'dependency',
    fieldProps: {
      name: ['type'],
    },
    columns: ({ type }) => {
      if (type === 'money') {
        return [
          {
            dataIndex: 'money',
            title: '优惠金额',
            width: 'm',
            valueType: 'money',
          },
        ];
      }

      if (type === 'discount') {
        return [
          {
            dataIndex: 'discount',
            title: '折扣',
            valueType: 'digit',
            width: 'm',
            fieldProps: {
              precision: 2,
            },
          },
        ];
      }

      return [];
    },
  },
];

export default () => {
  return (
    <>
      <BetaSchemaForm<DataItem>
        onFinish={async (values) => {
          console.log(values);
        }}
        columns={columns}
      />
    </>
  );
};
