import {
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  UserAddOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  LoginFormPage,
  ProFormText,
} from '@ant-design/pro-components';
import { cleanup, render, waitFor } from '@testing-library/react';
import { Alert, Space } from 'antd';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

afterEach(() => {
  cleanup();
});

describe('LoginForm', () => {
  it('📦 LoginForm should show login message correctly', async () => {
    const loginMessage = <Alert type="error" message="登录失败" />;

    const { container } = render(
      <LoginForm message={loginMessage}>
        <ProFormText name="name" />
      </LoginForm>,
    );

    expect(
      container.querySelectorAll('.ant-alert.ant-alert-error'),
    ).toHaveLength(1);
    const messageElement = container.querySelector(
      '.ant-alert.ant-alert-error .ant-alert-message',
    );
    expect(messageElement?.textContent).toBe('登录失败');
  });

  it('📦 LoginForm should render actions correctly', async () => {
    const { container } = render(
      <LoginForm
        actions={
          <Space>
            其他登录方式
            <AlipayCircleOutlined />
            <TaobaoCircleOutlined />
            <WeiboCircleOutlined />
          </Space>
        }
      >
        <ProFormText name="name" />
      </LoginForm>,
    );

    expect(
      container.querySelectorAll('.ant-pro-form-login-main-other .anticon'),
    ).toHaveLength(3);
  });

  it('📦 LoginForm support string logo', async () => {
    const { container } = render(
      <LoginForm logo="https://avatars.githubusercontent.com/u/8186664?v=4">
        <ProFormText name="name" />
      </LoginForm>,
    );

    const logoImg = container.querySelector('.ant-pro-form-login-logo img');
    expect(logoImg).toBeTruthy();
    expect(logoImg?.getAttribute('src')).toBe(
      'https://avatars.githubusercontent.com/u/8186664?v=4',
    );
  });

  it('📦 LoginForm support react node logo', async () => {
    const { findByTestId } = render(
      <LoginForm
        logo={
          <img
            data-testid="test"
            src="https://avatars.githubusercontent.com/u/8186664?v=4"
          />
        }
      >
        <ProFormText name="name" />
      </LoginForm>,
    );

    const logoImg = await findByTestId('test');
    expect(logoImg).toBeTruthy();
    expect(logoImg.getAttribute('src')).toBe(
      'https://avatars.githubusercontent.com/u/8186664?v=4',
    );
  });

  it('📦 LoginForm support submitter=false', async () => {
    const wrapper = render(
      <LoginForm submitter={false}>
        <ProFormText name="name" />
      </LoginForm>,
    );
    await waitForWaitTime(100);

    const dom = await wrapper.queryByText('登 录');

    expect(dom).toBeFalsy();
  });

  it('📦 LoginForm support submitter is function', async () => {
    const wrapper = render(
      <LoginForm
        submitter={{
          render: () => <a>登录登录</a>,
        }}
      >
        <ProFormText name="name" />
      </LoginForm>,
    );
    await waitForWaitTime(100);

    const dom = await wrapper.queryByText('登录登录');

    expect(dom).toBeTruthy();
  });

  it('📦 LoginForm support submitter=false', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <LoginForm
        submitter={{
          onSubmit: () => {
            fn();
          },
        }}
      >
        <ProFormText name="name" />
      </LoginForm>,
    );

    await waitFor(async () => {
      (await wrapper.findByText('登 录')).click();

      expect(fn).toHaveBeenCalled();
    });
  });

  it('📦 LoginFormPage support log', async () => {
    const wrapper = render(
      <LoginFormPage
        logo={
          <div>
            <UserAddOutlined />
            logo
          </div>
        }
      >
        <ProFormText name="name" />
      </LoginFormPage>,
    );

    await waitForWaitTime(100);
    const dom = await wrapper.findByText('logo');

    expect(dom).toBeTruthy();
  });

  it('📦 LoginFormPage support log=false', async () => {
    const wrapper = render(
      <LoginFormPage logo={false}>
        <ProFormText name="name" />
      </LoginFormPage>,
    );

    await waitForWaitTime(100);
    const dom = await wrapper.baseElement.querySelector(
      '.ant-pro-form-login-page-header',
    );

    expect(dom).toBeFalsy();
  });

  it('📦 LoginFormPage support submitButtonProps', async () => {
    const wrapper = render(
      <LoginForm
        logo={false}
        submitter={{
          submitButtonProps: {
            loading: true,
          },
        }}
      >
        <ProFormText name="name" />
      </LoginForm>,
    );

    waitFor(() => {
      const dom = wrapper.baseElement.querySelector('.ant-btn-loading');
      expect(dom).toBeTruthy();
    });
  });
});
