import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Alert } from 'antd';
import { useState } from 'react';

export default () => {
  const [submitted, setSubmitted] = useState('');

  return (
    <div style={{ maxWidth: 440, margin: 'auto' }}>
      <LoginForm
        title="示例工作台"
        subTitle="使用账号和密码登录"
        contentStyle={{ width: '100%', minWidth: 0, maxWidth: 328 }}
        onFinish={async ({ username }) => {
          setSubmitted(`示例提交：${username}`);
          return true;
        }}
      >
        <ProFormText
          name="username"
          placeholder="账号"
          rules={[{ required: true }]}
        />
        <ProFormText.Password
          name="password"
          placeholder="密码"
          rules={[{ required: true }]}
        />
      </LoginForm>
      {submitted && <Alert type="success" message={submitted} />}
    </div>
  );
};
