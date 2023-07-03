import type { ProFormColumnsType } from '@ant-design/pro-components';
import { BetaSchemaForm, ProForm } from '@ant-design/pro-components';

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
    name: ['type'],
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
      <h1>普通json表单</h1>
      <BetaSchemaForm<DataItem>
        onFinish={async (values) => {
          console.log(values);
        }}
        columns={columns}
      />
      <h1>嵌套json表单</h1>
      <ProForm
        initialValues={{
          type: 'money',
        }}
      >
        <BetaSchemaForm<DataItem>
          layoutType="Embed"
          onFinish={async (values) => {
            console.log(values);
          }}
          columns={columns}
        />
      </ProForm>
    </>
  );
};
