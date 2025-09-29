import { cleanup, fireEvent, render } from '@testing-library/react';
import { ProForm, ProFormCaptcha } from '@xxlabs/pro-components';
import { Button, message } from 'antd';
import React, { act } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('ProFormCaptcha', () => {
  it('😊 ProFormCaptcha Manual open', async () => {
    const captchaRef = React.createRef<any>();
    const fn = vi.fn();

    const TimingText = '获取验证码';

    const html = render(
      <ProForm
        submitter={{
          render: () => {
            return [
              <Button
                key="edit"
                htmlType="button"
                id="start"
                type="primary"
                onClick={() => {
                  // @ts-ignore
                  captchaRef.current?.startTiming();
                }}
              >
                手动开始计数
              </Button>,
              <Button
                key="end"
                htmlType="button"
                id="end"
                onClick={() => {
                  // @ts-ignore
                  captchaRef.current?.endTiming();
                }}
              >
                手动结束计数
              </Button>,
            ];
          },
        }}
        title="新建表单"
        onFinish={async () => {
          message.success('提交成功');
          return true;
        }}
      >
        <ProFormCaptcha
          captchaProps={{
            id: 'captchaButton',
          }}
          fieldRef={captchaRef}
          name="code"
          onGetCaptcha={() => {
            return new Promise((resolve, reject) => {
              fn(TimingText);
              reject(new Error('模拟报错'));
            });
          }}
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

    expect(html.container.querySelectorAll('#captchaButton')[0]).toHaveTextContent('60 秒后重新获取');

    await act(async () => {
      const dom = await html.findByText('手动结束计数');
      fireEvent.click(dom);
    });

    expect(html.container.querySelectorAll('#captchaButton')[0]).toHaveTextContent('获取验证码');

    expect(captchaRef.current).toBeTruthy();

    expect(html.container.querySelectorAll('#captchaButton')[0]).toHaveTextContent('获取验证码');
  });
});
