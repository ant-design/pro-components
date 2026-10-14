import { ProForm, ProFormCaptcha } from '@ant-design/pro-components';
import { Typography } from 'antd';
import { useState } from 'react';

export default () => {
  const [remaining, setRemaining] = useState(10);
  return (
    <ProForm submitter={false}>
      <ProFormCaptcha
        name="code"
        label="验证码"
        width="sm"
        countDown={10}
        onGetCaptcha={async () => undefined}
        onTiming={setRemaining}
      />
      <Typography.Text>剩余秒数：{remaining}</Typography.Text>
    </ProForm>
  );
};
