import { ProForm, ProFormSwitch } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false} initialValues={{ enabled: true }}>
    <ProFormSwitch name="enabled" label="启用" />
  </ProForm>
);
