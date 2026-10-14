import {
  ProForm,
  ProFormDateTimeRangePicker,
} from '@ant-design/pro-components';

export default () => (
  <ProForm
    readonly
    submitter={false}
    initialValues={{ value: ['2024-01-15 10:30:00', '2024-01-15 12:30:00'] }}
  >
    <ProFormDateTimeRangePicker name="value" label="日期时间区间" />
  </ProForm>
);
