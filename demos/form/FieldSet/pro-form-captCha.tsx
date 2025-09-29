import type { CaptFieldRef } from '@xxlabs/pro-components';
import { ProForm, ProFormCaptcha } from '@xxlabs/pro-components';
import { Button, message } from 'antd';
import { useRef } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const captchaRef = useRef<CaptFieldRef | null>(undefined);
  const inputRef = useRef(undefined);

  return (
    <ProForm
      submitter={{
        render: (props, doms) => {
          return [
            ...doms,
            <Button
              key="edit"
              htmlType="button"
              onClick={() => {
                captchaRef.current?.startTiming();
              }}
            >
              手动开始计数
            </Button>,
            <Button
              key="edit"
              htmlType="button"
              onClick={() => {
                captchaRef.current?.endTiming();
              }}
            >
              手动结束计数
            </Button>,
          ];
        },
      }}
      title="新建表单"
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('提交成功');
        return true;
      }}
    >
      <ProFormCaptcha
        fieldProps={{ ref: inputRef }}
        fieldRef={captchaRef}
        name="code"
        onGetCaptcha={() => {
          // dosomething()
          return new Promise((resolve, reject) => {
            reject();
          });
        }}
        onTiming={(count) => {
          console.log('timing:', count);
        }}
      />
    </ProForm>
  );
};
