import { ProForm, ProFormSwitch } from '@ant-design/pro-components';

export default () => (
  <ProForm readonly submitter={false} initialValues={{ value: true }}>
    <ProFormSwitch name="value" label="已启用" />
  </ProForm>
);
