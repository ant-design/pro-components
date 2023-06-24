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
        checkedChildren="编辑"
        unCheckedChildren="只读"
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
          <ProFormDateWeekRangePicker name="dateWeekRange" label="周区间" />
          <ProFormDatePicker.Month name="dateMonth" label="月" />
          <ProFormDateMonthRangePicker name="dateMonthRange" label="月区间" />
          <ProFormDatePicker.Quarter name="dateQuarter" label="季度" />
          <ProFormDateQuarterRangePicker
            name="dateQuarterRange"
            label="季度区间"
          />
          <ProFormDatePicker.Year name="dateYear" label="年" />
          <ProFormDateYearRangePicker name="dateYearRange" label="年区间" />
          <ProFormDateTimePicker
            name="dateTime"
            label="日期时间"
            fieldProps={{
              format: (value) => value.format('YYYY-MM-DD'),
            }}
          />
          <ProFormDateRangePicker name="dateRange" label="日期区间" />
          <ProFormDateTimeRangePicker
            name="dateTimeRange"
            label="日期时间区间"
          />
        </ProForm.Group>
      </ProForm>
    </div>
  );
};
