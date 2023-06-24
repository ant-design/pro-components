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
} from '@ant-design/pro-components';
import { Radio, TreeSelect } from 'antd';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
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
          datetimeRanger: [
            dayjs('2019-11-16 12:50:26').add(-1, 'd').valueOf(),
            dayjs('2019-11-16 12:50:26').valueOf(),
          ],
          timeRanger: [
            dayjs('2019-11-16 12:50:26').add(-1, 'd').valueOf(),
            dayjs('2019-11-16 12:50:26').valueOf(),
          ],
        }}
        size={size}
        onFinish={async (values) => console.log(values.sex)}
      >
        <ProFormSelect
          name="sex"
          label="性别"
          showSearch
          allowClear={false}
          fieldProps={{
            labelInValue: true,
          }}
          valueEnum={{
            man: '男',
            woman: '女',
          }}
        />
        <ProFormSelect
          name="area"
          label="地区"
          mode="multiple"
          valueEnum={{
            beijing: '北京',
            shanghai: '上海',
            hangzhou: '杭州',
            long: '这是一个很长的用来测试溢出的项目',
          }}
        />
        <ProFormCheckbox.Group
          name="checkbox-group"
          label="Checkbox.Group"
          options={['A', 'B', 'C', 'D', 'E', 'F']}
        />
        <ProFormTreeSelect
          initialValue={['0-0', '0-1']}
          label="树形下拉选择器"
          fieldProps={{
            fieldNames: {
              label: 'title',
            },
            treeData,
            treeCheckable: true,
            showCheckedStrategy: TreeSelect.SHOW_PARENT,
            placeholder: 'Please select',
          }}
          name="treeSelect"
        />
        <ProFormCascader
          width="md"
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
          name="area"
          label="区域"
          initialValue={['zhejiang', 'hangzhou', 'xihu']}
        />
        <ProFormDigit name="count" label="数量" />
        <ProFormSlider name="range" label="范围" range />
        <ProFormSlider name="slider" label="范围" />
        <ProFormText name="name1" label="名称" />
        <ProFormSwitch name="open" label="开关" secondary />
        <ProFormText name="name2" label="地址" secondary />
        <ProFormDatePicker
          name="name3"
          label="不能清空的日期"
          allowClear={false}
        />
        <ProFormDateRangePicker name="date" label="日期范围" />
        <ProFormDateTimePicker name="datetime" label="日期时间" />
        <ProFormDateTimeRangePicker
          name="datetimeRanger"
          label="日期时间范围"
        />
        <ProFormTimePicker name="time" label="时间" />
        <ProFormTimePicker.RangePicker name="timeRanger" label="时间范围" />
        <ProFormFieldSet name="name" label="姓名">
          <ProFormText />
          <ProFormText />
        </ProFormFieldSet>
      </LightFilter>
    </div>
  );
};
