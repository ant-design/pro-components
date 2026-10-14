import { AlipayCircleOutlined, GithubOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Alert, Button, Space } from 'antd';
import { useState } from 'react';

export default () => {
  const [selected, setSelected] = useState('');

  return (
    <div style={{ maxWidth: 440, margin: 'auto' }}>
      <LoginForm
        title="示例工作台"
        contentStyle={{ width: '100%', minWidth: 0, maxWidth: 328 }}
        actions={
          <Space wrap>
            <Button
              type="link"
              icon={<AlipayCircleOutlined />}
              onClick={() => setSelected('支付宝')}
            >
              支付宝
            </Button>
            <Button
              type="link"
              icon={<GithubOutlined />}
              onClick={() => setSelected('GitHub')}
            >
              GitHub
            </Button>
          </Space>
        }
      >
        <ProFormText name="username" placeholder="账号" />
        <ProFormText.Password name="password" placeholder="密码" />
      </LoginForm>
      {selected && (
        <Alert type="info" message={`已选择 ${selected} 登录（示例）`} />
      )}
    </div>
  );
};
