import type { ProFieldValueType } from '@ant-design/pro-components';
import { BetaSchemaForm, ProFormSelect } from '@ant-design/pro-components';
import { useState } from 'react';

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

const options = [
  { value: `password`, label: `密码输入框`, initialValue: '123456' },
  { value: `money`, label: `金额输入`, initialValue: '123456' },
  { value: `textarea`, label: `文本域`, initialValue: '123456\n121212' },
  { value: `date`, label: `日期`, initialValue: Date.now() },
  { value: `dateTime`, label: `日期时间`, initialValue: Date.now() },
  { value: `dateWeek`, label: `周`, initialValue: Date.now() },
  { value: `dateMonth`, label: `月`, initialValue: Date.now() },
  { value: `dateQuarter`, label: `季度输入`, initialValue: Date.now() },
  { value: `dateYear`, label: `年份输入`, initialValue: Date.now() },
  {
    value: `dateRange`,
    label: `日期区间`,
    initialValue: [Date.now(), Date.now()],
  },
  {
    value: `dateTimeRange`,
    label: `日期时间区间`,
    initialValue: [Date.now(), Date.now()],
  },
  { value: `time`, label: `时间`, initialValue: Date.now() },
  {
    value: `timeRange`,
    label: `时间区间`,
    initialValue: [Date.now(), Date.now()],
  },
  { value: `text`, label: `文本框`, initialValue: '123456' },
  { value: `select`, label: `下拉框`, initialValue: 'open' },
  {
    value: 'treeSelect',
    label: '树形下拉框',
    initialValue: ['0-0', '0-0-0'],
  },
  { value: `checkbox`, label: `多选框`, initialValue: 'open' },
  { value: `rate`, label: `星级组件`, initialValue: '' },
  { value: `radio`, label: `单选框`, initialValue: 'open' },
  { value: `radioButton`, label: `按钮单选框`, initialValue: 'open' },
  { value: `progress`, label: `进度条`, initialValue: '10' },
  { value: `percent`, label: `百分比组件`, initialValue: '20' },
  { value: `digit`, label: `数字输入框`, initialValue: '200000' },
  { value: `second`, label: `秒格式化`, initialValue: 20000 },
  {
    value: `avatar`,
    label: `头像`,
    initialValue:
      'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  },
  { value: `code`, label: `代码框`, initialValue: '# 2121' },
  { value: `switch`, label: `开关`, initialValue: 'open' },
  { value: `fromNow`, label: `相对于当前时间`, initialValue: Date.now() },
  {
    value: `image`,
    label: `图片`,
    initialValue:
      'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  },
  {
    value: `jsonCode`,
    label: `JSON代码框`,
    initialValue: '{ "name":"qixian" }',
  },
  {
    value: `color`,
    label: `颜色选择器`,
    initialValue: '#1890ff',
  },
];

type DataItem = {
  name: string;
  state: string;
};

export default () => {
  const [valueType, setValueType] = useState<ProFieldValueType>('text');
  return (
    <>
      <ProFormSelect.SearchSelect
        label="valueType 选择"
        options={options}
        width={200}
        mode="single"
        fieldProps={{
          labelInValue: false,
          value: valueType,
          onChange: (value) => setValueType(value),
        }}
      />
      <BetaSchemaForm<DataItem>
        layoutType="Form"
        onFinish={async (values) => {
          console.log(values);
        }}
        initialValues={options.reduce((pre, item) => {
          return {
            ...pre,
            [item.value]: item.initialValue,
          };
        }, {})}
        columns={[
          {
            title: '分组',
            valueType: 'group',
            columns: [
              {
                valueType,
                title: '编辑器',
                dataIndex: valueType || 'text',
                valueEnum: [
                  'select',
                  'checkbox',
                  'radio',
                  'radioButton',
                ].includes(valueType)
                  ? valueEnum
                  : undefined,
                fieldProps:
                  valueType === 'treeSelect'
                    ? {
                        multiple: true,
                        options: [
                          {
                            title: 'Node1',
                            value: '0-0',
                            key: '0-0',
                            children: [
                              {
                                title: 'Child Node1',
                                value: '0-0-0',
                                key: '0-0-0',
                              },
                            ],
                          },
                          {
                            title: 'Node2',
                            value: '0-1',
                            key: '0-1',
                            children: [
                              {
                                title: 'Child Node3',
                                value: '0-1-0',
                                key: '0-1-0',
                              },
                              {
                                title: 'Child Node4',
                                value: '0-1-1',
                                key: '0-1-1',
                              },
                              {
                                title: 'Child Node5',
                                value: '0-1-2',
                                key: '0-1-2',
                              },
                            ],
                          },
                        ],
                      }
                    : undefined,
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
                valueType,
                title: '只读',
                dataIndex: valueType || 'text',
                valueEnum,
                readonly: true,
                width: 'm',
              },
            ],
          },
        ]}
      />
    </>
  );
};
