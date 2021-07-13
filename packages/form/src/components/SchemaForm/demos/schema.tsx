import React, { useState } from 'react';
import type { ProFormColumnsType, ProFormLayoutType } from '@ant-design/pro-form';
import { BetaSchemaForm, ProFormSelect } from '@ant-design/pro-form';

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
  {
    title: '标签',
    dataIndex: 'labels',
    width: 'm',
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'createName',
    valueType: 'date',
  },
  {
    valueType: 'divider',
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
  {
    title: '列表',
    valueType: 'formList',
    dataIndex: 'list',
    initialValue: [{ state: 'all', title: '标题' }],
    columns: [
      {
        valueType: 'group',
        columns: [
          {
            title: '状态',
            dataIndex: 'state',
            valueType: 'select',
            width: 'xs',
            valueEnum,
          },
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
        ],
      },
    ],
  },
  {
    title: 'FormSet',
    valueType: 'formSet',
    dataIndex: 'formSet',
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
        dataIndex: 'groupTitle',
        tip: '标题过长会自动收缩',
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
    ],
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    transform: (value) => {
      return {
        startTime: value[0],
        endTime: value[1],
      };
    },
  },
];

export default () => {
  const [layoutType, setLayoutType] = useState<ProFormLayoutType>('Form');
  return (
    <>
      <ProFormSelect
        label="布局方式"
        options={['ProForm', 'ModalForm', 'DrawerForm', 'LightFilter', 'QueryFilter']}
        fieldProps={{
          value: layoutType,
          onChange: (e) => setLayoutType(e),
        }}
      />
      <BetaSchemaForm<DataItem>
        trigger={<a>点击我</a>}
        layoutType={layoutType}
        onFinish={async (values) => {
          console.log(values);
        }}
        columns={columns}
      />
    </>
  );
};
