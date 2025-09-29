import {
  ProForm,
  ProFormDateMonthRangePicker,
  ProFormDatePicker,
  ProFormDateQuarterRangePicker,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
  ProFormDateWeekRangePicker,
  ProFormDateYearRangePicker,
  ProFormTimePicker,
} from '@xxlabs/pro-components';
import { Switch } from 'antd';
import { useState } from 'react';

export default () => {
  const [readonly, setReadonly] = useState(false);
  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <Switch
        checked={readonly}
        checkedChildren="Edit"
        style={{
          marginBlockEnd: 16,
        }}
        unCheckedChildren="Read Only"
        onChange={setReadonly}
      />
      <ProForm
        initialValues={{
          date: Date.now(),
          dateWeek: Date.now(),
          dateMonth: Date.now(),
          dateQuarter: Date.now(),
          dateYear: Date.now(),
          dateTime: Date.now(),
          time: '00:01:05',
          timeRange: ['05:00:00', '11:00:00'],
          dateTimeRange: [Date.now(), Date.now() - 1000 * 60 * 60 * 24],
          dateRange: [Date.now(), Date.now() - 1000 * 60 * 60 * 24],
        }}
        readonly={readonly}
        onFinish={async (values) => {
          console.log(values);
        }}
      >
        <ProForm.Group title="Date Related Group">
          <ProFormDatePicker label="Date" name="date" />
          <ProFormDatePicker
            fieldProps={{
              format: 'YY-MM',
            }}
            label="Year-Month"
            name="date"
          />
          <ProFormTimePicker label="Time" name="time" />
          <ProFormTimePicker.RangePicker label="Time Range" name="timeRange" />
          <ProFormDatePicker.Week label="Week" name="dateWeek" />
          <ProFormDateWeekRangePicker label="Week Range" name="dateWeekRange" />
          <ProFormDatePicker.Month label="Month" name="dateMonth" />
          <ProFormDateMonthRangePicker label="Month Range" name="dateMonthRange" />
          <ProFormDatePicker.Quarter label="Quarter" name="dateQuarter" />
          <ProFormDateQuarterRangePicker label="Quarter Range" name="dateQuarterRange" />
          <ProFormDatePicker.Year label="Year" name="dateYear" />
          <ProFormDateYearRangePicker label="Year Range" name="dateYearRange" />
          <ProFormDateTimePicker
            fieldProps={{
              format: (value) => value.format('YYYY-MM-DD'),
            }}
            label="Date Time"
            name="dateTime"
          />
          <ProFormDateRangePicker label="Date Range" name="dateRange" />
          <ProFormDateTimeRangePicker label="Date Time Range" name="dateTimeRange" />
        </ProForm.Group>
      </ProForm>
    </div>
  );
};
