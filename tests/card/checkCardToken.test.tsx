import { CheckCard, ProConfigProvider } from '@ant-design/pro-components';
import { ConfigProvider } from 'antd';
import { render } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {
  document.body.innerHTML = '';
});

/**
 * #9125 ConfigProvider 的 token.colorPrimary 对 CheckCard 不生效。
 */
describe('CheckCard consumes ConfigProvider token (#9125)', () => {
  it('ConfigProvider colorPrimary 影响选中态边框色', () => {
    const html = render(
      <ConfigProvider
        theme={{
          token: { colorPrimary: '#ff4d4f' },
        }}
      >
        <CheckCard.Group multiple defaultValue={['A']}>
          <CheckCard title="Card A" value="A" />
          <CheckCard title="Card B" value="B" />
        </CheckCard.Group>
      </ConfigProvider>,
    );

    // 找到选中的 card
    const checked = html.container.querySelector(
      '.ant-pro-checkcard-checked',
    ) as HTMLElement;
    expect(checked).toBeTruthy();

    // 计算样式:borderColor 应为 #ff4d4f(红)
    const computed = getComputedStyle(checked);
    const borderColor = (computed.borderColor || computed.borderTopColor)
      .toLowerCase()
      .trim();
    expect(
      borderColor === '#ff4d4f' || borderColor === 'rgb(255, 77, 79)',
    ).toBe(true);
  });

  it('ProConfigProvider token 同样生效', () => {
    const html = render(
      <ProConfigProvider
        token={{
          colorPrimary: '#ff4d4f',
        }}
      >
        <CheckCard defaultChecked title="Card" />
      </ProConfigProvider>,
    );

    const checked = html.container.querySelector(
      '.ant-pro-checkcard-checked',
    ) as HTMLElement;
    expect(checked).toBeTruthy();
    const computed = getComputedStyle(checked);
    const borderColor = (computed.borderColor || computed.borderTopColor)
      .toLowerCase()
      .trim();
    expect(
      borderColor === '#ff4d4f' || borderColor === 'rgb(255, 77, 79)',
    ).toBe(true);
  });
});
