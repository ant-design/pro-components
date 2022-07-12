import ProForm, { ProFormCaptcha } from '@ant-design/pro-form';
import { Button, message } from 'antd';
import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

describe('ProFormCaptcha', () => {
  it('😊 ProFormCaptcha Manual open', async () => {
    const captchaRef = React.createRef<any>();
    const fn = jest.fn();
    const TimingText = '获取验证码';
    const wrapper = mount(
      <ProForm
        title="新建表单"
        submitter={{
          render: (props, doms) => {
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
        onFinish={async (values) => {
          console.log(values);
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

    act(() => {
      wrapper.find('button#captchaButton').simulate('click');
    });

    expect(fn).toHaveBeenCalledWith(TimingText);

    act(() => {
      wrapper.find('button#start').simulate('click');
    });

    expect(wrapper.find('#captchaButton').at(0).html()).toMatch('60 秒后重新获取');

    act(() => {
      wrapper.find('button#end').simulate('click');
    });

    expect(wrapper.find('#captchaButton').at(0).html()).toMatch('获取验证码');

    expect(captchaRef.current).toBeTruthy();

    jest.advanceTimersByTime(60000);
    expect(wrapper.find('#captchaButton').at(0).html()).toMatch('获取验证码');
  });
});
