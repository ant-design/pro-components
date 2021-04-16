import ProForm, {
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
  ProFormTimePicker,
} from '@ant-design/pro-form';
import React from 'react';

export default () => {
  return (
    <ProForm
      initialValues={{
        date: Date.now(),
        dateWeek: Date.now(),
        dateMonth: Date.now(),
        dateQuarter: Date.now(),
        dateYear: Date.now(),
        dateTime: Date.now(),
        dateTimeRange: [Date.now(), Date.now() - 1000 * 60 * 60 * 24],
        dateRange: [Date.now(), Date.now() - 1000 * 60 * 60 * 24],
      }}
    >
      <ProForm.Group title="日期相关分组">
        <ProFormDatePicker name="date" label="日期" />
        <ProFormDatePicker
          name="date"
          fieldProps={{
            format: 'YY-MM',
          }}
          label="年月"
        />
        <ProFormTimePicker name="time" label="时间" />
        <ProFormTimePicker.RangePicker name="timeRange" label="时间区间" />
        <ProFormDatePicker.Week name="dateWeek" label="周" />
        <ProFormDatePicker.Month name="dateMonth" label="月" />
        <ProFormDatePicker.Quarter name="dateQuarter" label="季度" />
        <ProFormDatePicker.Year name="dateYear" label="年" />
        <ProFormDateTimePicker name="dateTime" label="日期时间" />
        <ProFormDateRangePicker name="dateRange" label="日期区间" />
        <ProFormDateTimeRangePicker name="dateTimeRange" label="日期时间区间" />
      </ProForm.Group>

      <ProForm.Group title="只读">
        <ProFormDatePicker readonly name="date" label="日期" />
        <ProFormDatePicker.Week readonly name="dateWeek" label="周" />
        <ProFormDatePicker.Month readonly name="dateMonth" label="月" />
        <ProFormDatePicker.Quarter readonly name="dateQuarter" label="季度" />
        <ProFormDatePicker.Year readonly name="dateYear" label="年" />
        <ProFormDateTimePicker readonly name="dateTime" label="日期时间" />
        <ProFormDateRangePicker readonly name="dateRange" label="日期区间" />
        <ProFormDateTimeRangePicker readonly name="dateTimeRange" label="日期时间区间" />
      </ProForm.Group>
    </ProForm>
  );
};
