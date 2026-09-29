import { ProForm, ProFormCaptcha } from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { waitForWaitTime } from '../util';

/**
 * #8899: ProFormCaptcha 获取验证码按钮文案未走 i18n，
 * 切换 en-US 语言后按钮仍显示中文「获取验证码」。
 */
describe('ProFormCaptcha i18n (#8899)', () => {
  it('renders localized captcha text under en-US', async () => {
    const html = render(
      <ConfigProvider locale={enUS}>
        <ProForm submitter={false}>
          <ProFormCaptcha
            name="captcha"
            phoneName="phone"
            onGetCaptcha={async () => {}}
          />
        </ProForm>
      </ConfigProvider>,
    );
    await waitForWaitTime(200);

    const button = html.container.querySelector('button');
    expect(button?.textContent).toContain('Get CAPTCHA');
    expect(button?.textContent).not.toContain('获取验证码');
  });

  it('renders Chinese default under zh-CN', async () => {
    const html = render(
      <ProForm submitter={false}>
        <ProFormCaptcha
          name="captcha"
          phoneName="phone"
          onGetCaptcha={async () => {}}
        />
      </ProForm>,
    );
    await waitForWaitTime(200);

    const button = html.container.querySelector('button');
    expect(button?.textContent).toContain('获取验证码');
  });
});
