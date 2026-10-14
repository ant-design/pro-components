import { LoginFormPage, ProFormText } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

export default () => {
  const [opened, setOpened] = useState(false);

  return (
    <div style={{ height: 720 }}>
      <LoginFormPage
        title="示例工作台"
        activityConfig={{
          title: '新用户活动',
          subTitle: opened ? '活动详情已展开' : '登录后可查看活动详情',
          action: <Button onClick={() => setOpened(true)}>查看活动</Button>,
        }}
      >
        <ProFormText name="username" placeholder="账号" />
        <ProFormText.Password name="password" placeholder="密码" />
      </LoginFormPage>
    </div>
  );
};
