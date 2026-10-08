import { ProCard } from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {
  document.body.innerHTML = '';
});

/**
 * #9052 ProCard tabs 内容区 padding 去除:
 * 正确用法是 tabs.cardProps.ghost 或 styles.body 覆盖。
 */
describe('ProCard TabPane body padding (#9052)', () => {
  it('tabs.cardProps.ghost 去掉 tab 内容区 padding', () => {
    const html = render(
      <ProCard
        tabs={{
          cardProps: { ghost: true },
          items: [
            {
              key: 'a',
              label: 'TabA',
              children: <div data-testid="tab-content">A</div>,
            },
          ],
        }}
      />,
    );
    const content = html.getByTestId('tab-content');
    expect(content).toBeTruthy();

    // tabs 容器应带 ghost 类
    const tabsEl = html.container.querySelector('.ant-pro-card-tabs');
    expect(tabsEl).toBeTruthy();
    expect(tabsEl!.className).toContain('ant-pro-card-tabs-ghost');
  });

  it('默认 tabs 内容区有 padding 类(非 ghost)', () => {
    const html = render(
      <ProCard
        tabs={{
          items: [
            {
              key: 'a',
              label: 'TabA',
              children: <div>A</div>,
            },
          ],
        }}
      />,
    );
    const tabsEl = html.container.querySelector('.ant-pro-card-tabs');
    expect(tabsEl).toBeTruthy();
    expect(tabsEl!.className).not.toContain('ant-pro-card-tabs-ghost');
  });
});
