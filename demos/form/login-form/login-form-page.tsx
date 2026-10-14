import { LoginFormPage, ProFormText } from '@ant-design/pro-components';
import { Alert } from 'antd';
import { useState } from 'react';

export default () => {
  const [submitted, setSubmitted] = useState('');

  return (
    <div style={{ height: 720 }}>
      <LoginFormPage
        title="示例工作台"
        subTitle="页面级登录表单"
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        message={
          submitted ? (
            <Alert type="success" message={`示例提交：${submitted}`} />
          ) : (
            false
          )
        }
        onFinish={async ({ username }) => {
          setSubmitted(username);
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
      </LoginFormPage>
    </div>
  );
};
