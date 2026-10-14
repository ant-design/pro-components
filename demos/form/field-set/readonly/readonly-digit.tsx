import { ProForm, ProFormDigit } from '@ant-design/pro-components';

export default () => (
  <ProForm readonly submitter={false} initialValues={{ value: 3 }}>
    <ProFormDigit name="value" label="数量" />
  </ProForm>
);
