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
} from '@ant-design/pro-components';
import { Switch } from 'antd';
import { useState } from 'react';

export default () => {
  const [readonly, setReadonly] = useState(false);
  return (
    <div style={{ padding: 24 }}>

    <div
      style={{
        padding: 24,
      }}
    >
      <Switch
        style={{
          marginBlockEnd: 16,
        }}
        checked={readonly}
        checkedChildren="Edit"
        unCheckedChildren="Read Only"
        onChange={setReadonly}
      />
      <ProForm
        readonly={readonly}
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
        onFinish={async (values) => {
          console.log(values);
        }}
      >
        <ProForm.Group title="Date Related Group">
          <ProFormDatePicker name="date" label="Date" />
          <ProFormDatePicker
            name="date"
            fieldProps={{
              format: 'YY-MM',
            }}
            label="Year-Month"
          />
          <ProFormTimePicker name="time" label="Time" />
          <ProFormTimePicker.RangePicker name="timeRange" label="Time Range" />
          <ProFormDatePicker.Week name="dateWeek" label="Week" />
          <ProFormDateWeekRangePicker name="dateWeekRange" label="Week Range" />
          <ProFormDatePicker.Month name="dateMonth" label="Month" />
          <ProFormDateMonthRangePicker
            name="dateMonthRange"
            label="Month Range"
          />
          <ProFormDatePicker.Quarter name="dateQuarter" label="Quarter" />
          <ProFormDateQuarterRangePicker
            name="dateQuarterRange"
            label="Quarter Range"
          />
          <ProFormDatePicker.Year name="dateYear" label="Year" />
          <ProFormDateYearRangePicker name="dateYearRange" label="Year Range" />
          <ProFormDateTimePicker
            name="dateTime"
            label="Date Time"
            fieldProps={{
              format: (value) => value.format('YYYY-MM-DD'),
            }}
          />
          <ProFormDateRangePicker name="dateRange" label="Date Range" />
          <ProFormDateTimeRangePicker
            name="dateTimeRange"
            label="Date Time Range"
          />
        </ProForm.Group>
      </ProForm>
    </div>
  
    </div>
  );
};
