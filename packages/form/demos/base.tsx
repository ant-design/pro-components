import React from 'react';
import ProForm, {
  ProFormText,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormDateRangePicker,
  ProFormTimePicker,
  ProFormDateTimeRangePicker,
  ProFormTextArea,
} from '../src';

export default () => {
  return (
    <ProForm onFinish={(values) => console.log(values)}>
      <ProFormText name="name" label="名称" />
      <ProFormTextArea name="remark" label="备注" />
      <ProFormDatePicker name="date" label="日期" />
      <ProForm.Group title="这是一个分组">
        <ProFormDateTimePicker name="dateTime" label="日期时间" />
        <ProFormDateRangePicker name="dateRange" label="日期区间" />
      </ProForm.Group>
      <ProFormDateTimeRangePicker name="dateTimeRange" label="日期时间区间" />
      <ProFormTimePicker name="time" label="时间选择" />
    </ProForm>
  );
};
