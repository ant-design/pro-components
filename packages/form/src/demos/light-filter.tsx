import React from 'react';
import {
  LightFilter,
  ProFormText,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormDigit,
  ProFormSwitch,
} from '@ant-design/pro-form';

export default () => {
  return (
    <LightFilter
      onFinish={(m) => {
        console.log(m);
      }}
    >
      <ProFormDateRangePicker name="date" label="日期范围" />
    </LightFilter>
  );
};
