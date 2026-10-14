import { ProForm, ProFormDateRangePicker } from '@ant-design/pro-components';

export default () => (
  <ProForm
    readonly
    submitter={false}
    initialValues={{ value: ['2024-01-15', '2024-01-20'] }}
  >
    <ProFormDateRangePicker name="value" label="日期区间" />
  </ProForm>
);
