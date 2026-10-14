import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';

export default () => (
  <LoginForm
    title="示例登录"
    onFinish={async ({ username }) => {
      message.success(`欢迎 ${username}`);
      return true;
    }}
  >
    <ProFormText
      name="username"
      placeholder="用户名"
      rules={[{ required: true }]}
    />
    <ProFormText.Password
      name="password"
      placeholder="密码"
      rules={[{ required: true }]}
    />
  </LoginForm>
);
