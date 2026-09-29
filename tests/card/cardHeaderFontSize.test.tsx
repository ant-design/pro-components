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
  const getCardTitleCss = (): string => {
    const normalize = (s: string) => s.replace(/\s+/g, '');
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        for (const rule of Array.from(sheet.cssRules)) {
          const css = normalize(rule.cssText);
          if (css.includes('ant-pro-card-title')) {
            return css;
          }
        }
      } catch {
        // ignore cross-origin sheets
      }
    }
    return '';
  };

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
    const css = getCardTitleCss();
    // headerFontSize=14 覆盖默认的 fontSizeLG=20
    expect(css).toContain('font-size:14px');
    expect(css).not.toContain('font-size:20px');
  });
});
