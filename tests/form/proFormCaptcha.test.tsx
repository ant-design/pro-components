import ProForm, { ProFormCaptcha } from '@ant-design/pro-form';
import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { Button, message } from 'antd';
import React from 'react';

afterEach(() => {
  cleanup();
});

describe('ProFormCaptcha', () => {
  it('😊 ProFormCaptcha Manual open', async () => {
    const captchaRef = React.createRef<any>();
    const fn = vi.fn();
    vi.useFakeTimers();
    const TimingText = '获取验证码';

    const html = render(
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
                key="end"
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
              reject(new Error('模拟报错'));
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

    await act(async () => {
      const dom = await html.findByText('获取验证码');
      fireEvent.click(dom);
    });

    expect(fn).toHaveBeenCalledWith(TimingText);

    await act(async () => {
      const dom = await html.findByText('手动开始计数');
      fireEvent.click(dom);
    });

    expect(
      html.container.querySelectorAll('#captchaButton')[0],
    ).toHaveTextContent('60 秒后重新获取');

    await act(async () => {
      const dom = await html.findByText('手动结束计数');
      fireEvent.click(dom);
    });

    expect(
      html.container.querySelectorAll('#captchaButton')[0],
    ).toHaveTextContent('获取验证码');

    expect(captchaRef.current).toBeTruthy();

    act(() => {
      vi.runOnlyPendingTimers();
    });

    expect(
      html.container.querySelectorAll('#captchaButton')[0],
    ).toHaveTextContent('获取验证码');

    vi.useRealTimers();
  });
});
