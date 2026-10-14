import { ProForm, ProFormText } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false} initialValues={{ name: 'demo_user' }}>
    <ProFormText name="name" label="用户名" width="md" />
  </ProForm>
);
