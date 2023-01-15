import ProForm, { ProFormCaptcha } from '@ant-design/pro-form';
import { Button, message } from 'antd';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

describe('ProFormCaptcha', () => {
  it('😊 ProFormCaptcha Manual open', async () => {
    const captchaRef = React.createRef<any>();
    const fn = jest.fn();
    jest.useFakeTimers();
    const TimingText = '获取验证码';
    const { container } = render(
      <ProForm
        title="新建表单"
        submitter={{
          render: () => {
            return [
              <Button
                htmlType="button"
                type="primary"
                onClick={() => {
                  // @ts-ignore
                  captchaRef.current?.startTiming();
                }}
                key="edit"
                id="start"
              >
                手动开始计数
              </Button>,
              <Button
                htmlType="button"
                id="end"
                onClick={() => {
                  // @ts-ignore
                  captchaRef.current?.endTiming();
                }}
                key="edit"
              >
                手动结束计数
              </Button>,
            ];
          },
        }}
        onFinish={async () => {
          message.success('提交成功');
          return true;
        }}
      >
        <ProFormCaptcha
          onGetCaptcha={() => {
            return new Promise((resolve, reject) => {
              fn(TimingText);
              reject();
            });
          }}
          captchaProps={{
            id: 'captchaButton',
          }}
          fieldRef={captchaRef}
          name="code"
        />
      </ProForm>,
    );

    fireEvent.click(container.querySelector('button#captchaButton')!);

    expect(fn).toHaveBeenCalledWith(TimingText);

    fireEvent.click(container.querySelector('button#start')!);

    expect(container.querySelectorAll('#captchaButton')[0]).toHaveTextContent('60 秒后重新获取');

    fireEvent.click(container.querySelector('button#end')!);

    expect(container.querySelectorAll('#captchaButton')[0]).toHaveTextContent('获取验证码');

    expect(captchaRef.current).toBeTruthy();

    jest.advanceTimersByTime(60000);
    expect(container.querySelectorAll('#captchaButton')[0]).toHaveTextContent('获取验证码');

    jest.useRealTimers();
  });
});
