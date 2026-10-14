import { ProForm, ProFormDatePicker } from '@ant-design/pro-components';

export default () => (
  <ProForm readonly submitter={false} initialValues={{ value: '2024-01-15' }}>
    <ProFormDatePicker name="value" label="日期" />
  </ProForm>
);
