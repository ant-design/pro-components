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
import dayjs from 'dayjs';
import { useState } from 'react';
import { FIXED_BASE_DATE, FIXED_BASE_TIMESTAMP } from '../../mockData';

/** 与 FIXED_BASE_TIMESTAMP（2024-01-15 10:00）对齐：范围一律「起 ≤ 止」 */
const DAY_MS = 86400000;
const rangeStartTs = FIXED_BASE_TIMESTAMP - DAY_MS;
const rangeEndTs = FIXED_BASE_TIMESTAMP;

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
        checkedChildren="Edit"
        unCheckedChildren="Read Only"
        onChange={setReadonly}
      />
      <ProForm
        name="field-set-datatime-demo"
        readonly={readonly}
        initialValues={{
          date: FIXED_BASE_TIMESTAMP,
          dateYm: FIXED_BASE_TIMESTAMP,
          dateWeek: FIXED_BASE_DATE,
          dateMonth: FIXED_BASE_TIMESTAMP,
          dateQuarter: FIXED_BASE_TIMESTAMP,
          dateYear: FIXED_BASE_TIMESTAMP,
          dateTime: FIXED_BASE_TIMESTAMP,
          time: '00:01:05',
          timeRange: ['05:00:00', '11:00:00'],
          dateWeekRange: [dayjs('2024-01-01'), dayjs('2024-01-13')],
          dateMonthRange: [dayjs('2024-01-01'), dayjs('2024-03-01')],
          dateQuarterRange: [dayjs('2024-01-01'), dayjs('2024-06-30')],
          dateYearRange: [dayjs('2022-01-01'), dayjs('2024-01-01')],
          dateTimeRange: [rangeStartTs, rangeEndTs],
          dateRange: [rangeStartTs, rangeEndTs],
        }}
        onFinish={async (values) => {
          console.log('field-set-datatime-demo submit:', values);
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
              showTime: true,
              format: 'YYYY-MM-DD HH:mm:ss',
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
  );
};
