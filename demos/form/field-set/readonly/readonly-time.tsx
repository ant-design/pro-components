import { ProForm, ProFormTimePicker } from '@ant-design/pro-components';

export default () => (
  <ProForm readonly submitter={false} initialValues={{ value: '10:30:00' }}>
    <ProFormTimePicker name="value" label="时间" />
  </ProForm>
);
