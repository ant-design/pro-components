import { ProForm, ProFormDateTimePicker } from '@ant-design/pro-components';

export default () => (
  <ProForm
    readonly
    submitter={false}
    initialValues={{ value: '2024-01-15 10:30:00' }}
  >
    <ProFormDateTimePicker name="value" label="日期时间" />
  </ProForm>
);
