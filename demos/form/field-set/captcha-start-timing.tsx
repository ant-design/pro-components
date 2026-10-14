import type { CaptFieldRef } from '@ant-design/pro-components';
import { ProForm, ProFormCaptcha } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';

export default () => {
  const fieldRef = useRef<CaptFieldRef | null>();
  return (
    <ProForm submitter={false}>
      <ProFormCaptcha
        name="code"
        label="验证码"
        width="sm"
        countDown={10}
        fieldRef={fieldRef}
        onGetCaptcha={async () => undefined}
      />
      <Button onClick={() => fieldRef.current?.startTiming()}>
        手动开始倒计时
      </Button>
    </ProForm>
  );
};
