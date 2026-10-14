import {
  LoginForm,
  ProFormCaptcha,
  ProFormText,
} from '@ant-design/pro-components';
import { Alert } from 'antd';
import { useState } from 'react';

export default () => {
  const [hint, setHint] = useState('');

  return (
    <div style={{ maxWidth: 440, margin: 'auto' }}>
      <LoginForm
        title="手机号登录"
        contentStyle={{ width: '100%', minWidth: 0, maxWidth: 328 }}
        onFinish={async ({ mobile }) => {
          setHint(`示例提交：${mobile}`);
          return true;
        }}
      >
        <ProFormText
          name="mobile"
          placeholder="手机号"
          rules={[
            { required: true },
            { pattern: /^1\d{10}$/, message: '请输入 11 位手机号' },
          ]}
        />
        <ProFormCaptcha
          name="captcha"
          placeholder="验证码"
          rules={[{ required: true }]}
          onGetCaptcha={async () => setHint('示例验证码：1234')}
        />
      </LoginForm>
      {hint && <Alert type="info" message={hint} />}
    </div>
  );
};
