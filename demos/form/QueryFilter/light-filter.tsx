import {
  LightFilter,
  ProFormCascader,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
  ProFormDigit,
  ProFormFieldSet,
  ProFormSelect,
  ProFormSlider,
  ProFormSwitch,
  ProFormText,
  ProFormTimePicker,
  ProFormTreeSelect,
} from '@xxlabs/pro-components';
import { Radio, TreeSelect } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import dayjs from 'dayjs';
import React from 'react';

const treeData = [
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
];

export default () => {
  const [size, setSize] = React.useState<SizeType>('middle');
  return (
    <div>
      <Radio.Group
        value={size}
        onChange={(e) => {
          setSize(e.target.value);
        }}
      >
        <Radio.Button value="middle">Middle</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>
      <br />
      <br />
      <LightFilter<{
        sex: string;
      }>
        initialValues={{
          name1: 'yutingzhao1991',
          name3: '2020-08-19',
          range: [20, 80],
          slider: 20,
          sex: [
            {
              value: 'open1',
              label: '打开',
            },
            {
              value: 'closed2',
              label: '关闭',
            },
          ],
          datetimeRanger: [dayjs('2019-11-16 12:50:26').add(-1, 'd').valueOf(), dayjs('2019-11-16 12:50:26').valueOf()],
          timeRanger: [dayjs('2019-11-16 12:50:26').add(-1, 'd').valueOf(), dayjs('2019-11-16 12:50:26').valueOf()],
        }}
        size={size}
        onFinish={async (values) => console.log(values.sex)}
      >
        <ProFormSelect
          showSearch
          allowClear={false}
          fieldProps={{
            labelInValue: true,
          }}
          label="性别"
          name="sex"
          valueEnum={{
            man: '男',
            woman: '女',
          }}
        />
        <ProFormSelect
          label="地区"
          mode="multiple"
          name="area"
          valueEnum={{
            beijing: '北京',
            shanghai: '上海',
            hangzhou: '杭州',
            long: '这是一个很长的用来测试溢出的项目',
          }}
        />
        <ProFormCheckbox.Group label="Checkbox.Group" name="checkbox-group" options={['A', 'B', 'C', 'D', 'E', 'F']} />
        <ProFormTreeSelect
          fieldProps={{
            fieldNames: {
              label: 'title',
            },
            treeData,
            treeCheckable: true,
            showCheckedStrategy: TreeSelect.SHOW_PARENT,
            placeholder: 'Please select',
          }}
          initialValue={['0-0', '0-1']}
          label="树形下拉选择器"
          name="treeSelect"
        />
        <ProFormCascader
          initialValue={['zhejiang', 'hangzhou', 'xihu']}
          label="区域"
          name="area"
          request={async () => [
            {
              value: 'zhejiang',
              label: '浙江',
              children: [
                {
                  value: 'hangzhou',
                  label: '杭州',
                  children: [
                    {
                      value: 'xihu',
                      label: '西湖',
                    },
                  ],
                },
              ],
            },
            {
              value: 'jiangsu',
              label: 'Jiangsu',
              children: [
                {
                  value: 'nanjing',
                  label: 'Nanjing',
                  children: [
                    {
                      value: 'zhonghuamen',
                      label: 'Zhong Hua Men',
                    },
                  ],
                },
              ],
            },
          ]}
          width="md"
        />
        <ProFormSwitch label="开关" name="open" />
        <ProFormDigit label="数量" name="count" />
        <ProFormSlider range label="范围" name="range" />
        <ProFormSlider label="范围" name="slider" />
        <ProFormText label="名称" name="name1" />
        <ProFormSwitch secondary label="开关" name="open" />
        <ProFormText secondary label="地址" name="name2" />
        <ProFormDatePicker allowClear={false} label="不能清空的日期" name="name3" />
        <ProFormDateRangePicker label="日期范围" name="date" />
        <ProFormDateTimePicker label="日期时间" name="datetime" />
        <ProFormDateTimeRangePicker label="日期时间范围" name="datetimeRanger" />
        <ProFormTimePicker label="时间" name="time" />
        <ProFormTimePicker.RangePicker label="时间范围" name="timeRanger" />
        <ProFormFieldSet label="姓名" name="name">
          <ProFormText />
          <ProFormText />
        </ProFormFieldSet>
      </LightFilter>
    </div>
  );
};
