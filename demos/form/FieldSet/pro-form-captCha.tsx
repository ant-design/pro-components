import type { CaptFieldRef } from '@ant-design/pro-components';
import { ProForm, ProFormCaptcha } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { useRef } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Demo = () => {
  const captchaRef = useRef<CaptFieldRef | null | undefined>();
  const inputRef = useRef();

  return (
    <ProForm
      name="captcha-form-demo"
      title="新建表单"
      submitter={{
        render: (props, doms) => {
          return [
            ...doms,
            <Button
              htmlType="button"
              onClick={() => {
                captchaRef.current?.startTiming();
              }}
              key="start"
            >
              手动开始计数
            </Button>,
            <Button
              htmlType="button"
              onClick={() => {
                captchaRef.current?.endTiming();
              }}
              key="end"
            >
              手动结束计数
            </Button>,
          ];
        },
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('提交成功');
        return true;
      }}
    >
      <ProFormCaptcha
        onGetCaptcha={() => {
          // dosomething()
          return new Promise((resolve, reject) => {
            reject();
          });
        }}
        onTiming={(count) => {
          console.log('timing:', count);
        }}
        fieldRef={captchaRef}
        fieldProps={{ ref: inputRef }}
        name="code"
      />
    </ProForm>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
