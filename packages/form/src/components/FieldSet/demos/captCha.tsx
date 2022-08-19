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

export default () => {
  const captchaRef = useRef();
  const inputRef = useRef();

  return (
    <ProForm
      title="新建表单"
      submitter={{
        render: (props, doms) => {
          return [
            ...doms,
            <Button
              htmlType="button"
              onClick={() => {
                // @ts-ignore
                captchaRef.current?.startTiming();
              }}
              key="edit"
            >
              手动开始计数
            </Button>,
            <Button
              htmlType="button"
              onClick={() => {
                // @ts-ignore
                captchaRef.current?.endTiming();
              }}
              key="edit2"
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
        fieldRef={captchaRef}
        fieldProps={{ ref: inputRef }}
        name="code"
      />
    </ProForm>
  );
};
