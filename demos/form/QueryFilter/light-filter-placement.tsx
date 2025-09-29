import {
  LightFilter,
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
} from '@xxlabs/pro-components';
import { Radio } from 'antd';
import React from 'react';

export default () => {
  const [mode, setMode] = React.useState<any>('topLeft');
  return (
    <div>
      <Radio.Group
        value={mode}
        onChange={(e) => {
          setMode(e.target.value);
        }}
      >
        <Radio.Button value="topLeft">topLeft</Radio.Button>
        <Radio.Button value="topRight">topRight</Radio.Button>
        <Radio.Button value="bottomLeft">bottomLeft</Radio.Button>
        <Radio.Button value="bottomRight">bottomRight</Radio.Button>
      </Radio.Group>
      <LightFilter
        placement={mode}
        style={{
          marginBlockStart: '40px',
        }}
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
