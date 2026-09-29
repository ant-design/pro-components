import { ProCard } from '@ant-design/pro-components';
import { fireEvent, render, waitFor } from '@testing-library/react';
import React, { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  document.body.innerHTML = '';
});

/**
 * #8989 / #8922 collapsible='icon' 仅图标触发折叠,
 * collapsible=true/'header' 整个 header 触发。
 */
describe('ProCard collapsible trigger (#8989/#8922)', () => {
  it('collapsible="icon": 点 header 标题不折叠,点图标才折叠', async () => {
    const onCollapse = vi.fn();
    const Demo = () => {
      const [collapsed, setCollapsed] = useState(false);
      return (
        <ProCard
          title="卡片标题"
          collapsible="icon"
          collapsed={collapsed}
          onCollapse={(c) => {
            onCollapse(c);
            setCollapsed(c);
          }}
        >
          <div data-testid="content">内容</div>
        </ProCard>
      );
    };
    const html = render(<Demo />);

    // 内容初始可见
    expect(html.getByTestId('content')).toBeTruthy();

    // 点 header 标题区域:不折叠
    fireEvent.click(html.getByText('卡片标题'));
    expect(onCollapse).not.toHaveBeenCalled();
    expect(html.getByTestId('content')).toBeTruthy();

    // 点折叠图标:折叠(onCollapse 经 queueMicrotask 异步触发)
    const icon = html.container.querySelector(
      '.ant-pro-card-collapsible-icon',
    ) as HTMLElement;
    expect(icon).toBeTruthy();
    fireEvent.click(icon);
    await waitFor(() => {
      expect(onCollapse).toHaveBeenCalledWith(true);
    });
  });

  it('collapsible 默认(true): 点整个 header 折叠', async () => {
    const onCollapse = vi.fn();
    const Demo = () => {
      const [collapsed, setCollapsed] = useState(false);
      return (
        <ProCard
          title="卡片标题"
          collapsible
          collapsed={collapsed}
          onCollapse={(c) => {
            onCollapse(c);
            setCollapsed(c);
          }}
        >
          <div data-testid="content">内容</div>
        </ProCard>
      );
    };
    const html = render(<Demo />);

    fireEvent.click(html.getByText('卡片标题'));
    await waitFor(() => {
      expect(onCollapse).toHaveBeenCalledWith(true);
    });
  });

  it('collapsible="icon" 支持键盘 Enter 触发(自定义图标)', async () => {
    const onCollapse = vi.fn();
    const Demo = () => {
      const [collapsed, setCollapsed] = useState(false);
      return (
        <ProCard
          title="卡片标题"
          collapsible="icon"
          collapsed={collapsed}
          onCollapse={(c) => {
            onCollapse(c);
            setCollapsed(c);
          }}
          collapsibleIconRender={() => <span data-testid="my-icon">▸</span>}
        >
          <div>内容</div>
        </ProCard>
      );
    };
    const html = render(<Demo />);
    const icon = html.getByTestId('my-icon').parentElement as HTMLElement;
    expect(icon.getAttribute('role')).toBe('button');
    fireEvent.keyDown(icon, { key: 'Enter' });
    await waitFor(() => {
      expect(onCollapse).toHaveBeenCalledWith(true);
    });
  });
});
