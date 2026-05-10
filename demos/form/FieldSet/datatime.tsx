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
import { FIXED_BASE_TIMESTAMP } from '../../mockData';

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
          dateWeek: FIXED_BASE_TIMESTAMP,
          dateMonth: FIXED_BASE_TIMESTAMP,
          dateQuarter: FIXED_BASE_TIMESTAMP,
          dateYear: FIXED_BASE_TIMESTAMP,
          dateTime: FIXED_BASE_TIMESTAMP,
          time: '00:01:05',
          timeRange: ['05:00:00', '11:00:00'],
          dateTimeRange: [
            FIXED_BASE_TIMESTAMP,
            FIXED_BASE_TIMESTAMP - 1000 * 60 * 60 * 24,
          ],
          dateRange: [
            FIXED_BASE_TIMESTAMP,
            FIXED_BASE_TIMESTAMP - 1000 * 60 * 60 * 24,
          ],
        }}
        onFinish={async (values) => {

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
          <ProFormDateMonthRangePicker
            name="dateMonthRange"
            label="月范围"
          />
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
              format: (value) => value.format('YYYY-MM-DD'),
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
