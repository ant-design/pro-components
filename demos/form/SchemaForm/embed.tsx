import type { ProFormColumnsType } from '@xxlabs/pro-components';
import { BetaSchemaForm, ProForm, ProFormSelect, ProFormText } from '@xxlabs/pro-components';

const valueEnum = {
  all: { text: '全部', status: 'Default' },
  open: {
    text: '未解决',
    status: 'Error',
  },
  closed: {
    text: '已解决',
    status: 'Success',
    disabled: true,
  },
  processing: {
    text: '解决中',
    status: 'Processing',
  },
};

type DataItem = {
  name: string;
  state: string;
};

const columns: ProFormColumnsType<DataItem>[] = [
  {
    title: '标题',
    dataIndex: 'title',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    width: 'm',
  },
  {
    title: '状态',
    dataIndex: 'state',
    valueType: 'select',
    valueEnum,
    width: 'm',
  },
];

export default () => {
  return (
    <ProForm>
      <h1>ProForm </h1>
      <ProFormText name="username" />
      <ProFormSelect
        fieldProps={{
          mode: 'multiple',
        }}
        label="多选"
        name="select-multiple"
        placeholder="Please select favorite colors"
        rules={[
          {
            required: true,
            message: 'Please select your favorite colors!',
            type: 'array',
          },
        ]}
        valueEnum={{
          red: 'Red',
          green: 'Green',
          blue: 'Blue',
        }}
      />
      <h1>表单1 </h1>
      <BetaSchemaForm<DataItem> columns={columns} layoutType="Embed" />
      <h1>表单2</h1>
      <BetaSchemaForm<DataItem>
        columns={[
          {
            title: '创建时间',
            key: 'showTime',
            dataIndex: 'createName',
            valueType: 'date',
          },
          {
            title: '分组',
            valueType: 'group',
            columns: [
              {
                title: '状态',
                dataIndex: 'groupState',
                valueType: 'select',
                width: 'xs',
                valueEnum,
              },
              {
                title: '标题',
                width: 'md',
                dataIndex: 'groupTitle',
                formItemProps: {
                  rules: [
                    {
                      required: true,
                      message: '此项为必填项',
                    },
                  ],
                },
              },
            ],
          },
        ]}
        layoutType="Embed"
      />
    </ProForm>
  );
};
