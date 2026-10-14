import { ProForm, ProFormText } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false} initialValues={{ password: 'demo123' }}>
    <ProFormText.Password name="password" label="密码" width="md" />
  </ProForm>
);
