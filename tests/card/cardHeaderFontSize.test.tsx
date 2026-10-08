import { ProCard } from '@ant-design/pro-components';
import { ConfigProvider } from 'antd';
import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {
  cleanup();
  document.body.innerHTML = '';
});

/**
 * #8929 ProCard 消费 ConfigProvider components.Card 组件 token
 */
describe('ProCard headerFontSize token (#8929)', () => {
  it('components.Card.headerFontSize 优先于全局 fontSizeLG', async () => {
    render(
      <ConfigProvider
        theme={{
          token: { fontSizeLG: 20 },
          components: { Card: { headerFontSize: 14 } },
        }}
      >
        <ProCard title="Part Info" />
      </ConfigProvider>,
    );
    // 主路径 ProCard 渲染走 antd Card；antd Card 消费 components.Card.headerFontSize
    // 生效值会落在 CSS 变量上（--ant-card-header-font-size 等），直接断言计算样式
    const titleEl = document.querySelector('.ant-card-head-title');
    expect(titleEl).toBeTruthy();
    const computed = window.getComputedStyle(titleEl as HTMLElement);
    expect(computed.fontSize).toBe('14px');
  });

  it('未设置组件 token 时回退全局 fontSizeLG', async () => {
    render(
      <ConfigProvider theme={{ token: { fontSizeLG: 20 } }}>
        <ProCard title="Part Info" />
      </ConfigProvider>,
    );
    const titleEl = document.querySelector('.ant-card-head-title');
    expect(titleEl).toBeTruthy();
    const computed = window.getComputedStyle(titleEl as HTMLElement);
    expect(computed.fontSize).toBe('20px');
  });
});
