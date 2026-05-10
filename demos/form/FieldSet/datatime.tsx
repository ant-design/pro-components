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
        checkedChildren="编辑"
        unCheckedChildren="只读"
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
        <ProForm.Group title="日期相关">
          <ProFormDatePicker name="date" label="日期" />
          <ProFormDatePicker.Month
            name="dateYm"
            label="年月"
            fieldProps={{
              format: 'YY-MM',
            }}
          />
          <ProFormTimePicker name="time" label="时间" />
          <ProFormTimePicker.RangePicker name="timeRange" label="时间范围" />
          <ProFormDatePicker.Week name="dateWeek" label="周" />
          <ProFormDateWeekRangePicker name="dateWeekRange" label="周范围" />
          <ProFormDatePicker.Month name="dateMonth" label="月" />
          <ProFormDateMonthRangePicker name="dateMonthRange" label="月范围" />
          <ProFormDatePicker.Quarter name="dateQuarter" label="季度" />
          <ProFormDateQuarterRangePicker
            name="dateQuarterRange"
            label="季度范围"
          />
          <ProFormDatePicker.Year name="dateYear" label="年" />
          <ProFormDateYearRangePicker name="dateYearRange" label="年范围" />
          <ProFormDateTimePicker
            name="dateTime"
            label="日期时间"
            fieldProps={{
              showTime: true,
              format: 'YYYY-MM-DD HH:mm:ss',
            }}
          />
          <ProFormDateRangePicker name="dateRange" label="日期范围" />
          <ProFormDateTimeRangePicker
            name="dateTimeRange"
            label="日期时间范围"
          />
        </ProForm.Group>
      </ProForm>
    </div>
  );
};
