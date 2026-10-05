import { ProCard } from '@ant-design/pro-components';
import { cleanup, render, waitFor } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import { act } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { genProCardStyle } from '../../src/card/components/Card/style';

vi.mock('antd/lib/grid/hooks/useBreakpoint');

afterEach(() => {
  cleanup();
});

describe('Card', () => {
  it('uses the antd Card header font size token (#8929)', () => {
    const style = genProCardStyle({
      componentCls: '.pro-card',
      components: { Card: { headerFontSize: 22 } },
      fontSizeLG: 16,
    } as any) as Record<string, any>;

    expect(
      style['.pro-card']['&.pro-card-legacy > .pro-card-header .pro-card-title']
        .fontSize,
    ).toBe(22);
  });

  it('uses antd Card for the basic visual path (#9738)', () => {
    const onClick = vi.fn();
    const wrapper = render(
      <ConfigProvider theme={{ cssVar: { key: 'pro-card-test' } }}>
        <ProCard
          title="标题"
          extra={<button type="button">操作</button>}
          hoverable
          variant="outlined"
          onClick={onClick}
        >
          内容
        </ProCard>
      </ConfigProvider>,
    );
    const card = wrapper.container.querySelector('.ant-pro-card');

    expect(card).toHaveClass('ant-card');
    expect(card).toHaveClass('ant-card-hoverable');
    expect(card).not.toHaveClass('ant-pro-card-legacy');
    expect(
      card?.querySelector('.ant-card-head.ant-pro-card-header'),
    ).toBeTruthy();
    expect(
      card?.querySelector('.ant-card-body.ant-pro-card-body'),
    ).toBeTruthy();

    act(() => {
      wrapper.getByRole('button', { name: '操作' }).click();
    });
    expect(onClick).not.toHaveBeenCalled();

    act(() => {
      card?.querySelector<HTMLElement>('.ant-card-body')?.click();
    });
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('inherits ConfigProvider card / global variant', () => {
    const { rerender, container, unmount } = render(
      <ConfigProvider card={{ variant: 'borderless' }}>
        <ProCard title="卡片">内容</ProCard>
      </ConfigProvider>,
    );
    let card = container.querySelector('.ant-pro-card');
    expect(card).toHaveClass('ant-card');
    expect(card).not.toHaveClass('ant-card-bordered');
    expect(card).not.toHaveClass('ant-pro-card-border');

    rerender(
      <ConfigProvider variant="borderless">
        <ProCard title="卡片">内容</ProCard>
      </ConfigProvider>,
    );
    card = container.querySelector('.ant-pro-card');
    expect(card).not.toHaveClass('ant-card-bordered');

    rerender(
      <ConfigProvider card={{ variant: 'borderless' }}>
        <ProCard title="卡片" variant="outlined">
          内容
        </ProCard>
      </ConfigProvider>,
    );
    card = container.querySelector('.ant-pro-card');
    expect(card).toHaveClass('ant-card-bordered');
    unmount();
  });

  it('applies ConfigProvider card variant on legacy path', () => {
    const wrapper = render(
      <ConfigProvider card={{ variant: 'borderless' }}>
        <ProCard ghost title="幽灵">
          内容
        </ProCard>
      </ConfigProvider>,
    );
    const card = wrapper.container.querySelector('.ant-pro-card');
    expect(card).toHaveClass('ant-pro-card-legacy');
    expect(card).not.toHaveClass('ant-pro-card-border');
  });

  it('keeps collapsible on the antd Card path (fold is behavior, not a skin fork)', () => {
    const wrapper = render(
      <ProCard title="可折叠" collapsible>
        内容
      </ProCard>,
    );
    const card = wrapper.container.querySelector('.ant-pro-card');

    expect(card).toHaveClass('ant-card');
    expect(card).not.toHaveClass('ant-pro-card-legacy');
  });

  it('uses antd Card for nested layout shell; children stay on antd Card too', () => {
    const onParentClick = vi.fn();
    const wrapper = render(
      <ProCard onClick={onParentClick}>
        <ProCard title="子卡片" extra={<button type="button">子操作</button>}>
          内容
        </ProCard>
      </ProCard>,
    );
    const cards = wrapper.container.querySelectorAll('.ant-pro-card');

    // 外层为布局壳，仍走 antd Card；不再因 contain 进入 legacy
    expect(cards[0]).toHaveClass('ant-pro-card-contain-card');
    expect(cards[0]).toHaveClass('ant-card');
    expect(cards[0]).not.toHaveClass('ant-pro-card-legacy');
    expect(cards[1]).toHaveClass('ant-card');
    expect(cards[1]).not.toHaveClass('ant-pro-card-legacy');

    act(() => {
      wrapper.getByRole('button', { name: '子操作' }).click();
    });
    expect(onParentClick).not.toHaveBeenCalled();
  });

  it('keeps ghost on the legacy skin path', () => {
    const wrapper = render(
      <ProCard ghost>
        <ProCard title="子卡片">内容</ProCard>
      </ProCard>,
    );
    const cards = wrapper.container.querySelectorAll('.ant-pro-card');

    expect(cards[0]).toHaveClass('ant-pro-card-legacy');
    expect(cards[0]).toHaveClass('ant-pro-card-ghost');
    expect(cards[0]).not.toHaveClass('ant-card');
    expect(cards[1]).toHaveClass('ant-card');
    expect(cards[1]).not.toHaveClass('ant-pro-card-legacy');
  });

  it('🥩 collapsible onCollapse', async () => {
    const fn = vi.fn();

    const wrapper = render(
      <ProCard title="父节点">
        <ProCard
          title="可折叠"
          headerBordered
          collapsible
          defaultCollapsed
          onCollapse={fn}
          colSpan={{
            xs: 24,
          }}
        >
          内容
        </ProCard>
        ,
      </ProCard>,
    );

    await wrapper.findAllByText('可折叠');

    act(() => {
      wrapper.baseElement
        .querySelector<HTMLDivElement>('.ant-pro-card-collapsible-icon')
        ?.click();
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalled();
    });
  });

  it('🥩 collapsible defaultCollapsed', async () => {
    const wrapper = render(
      <ProCard title="可折叠" headerBordered collapsible defaultCollapsed>
        内容
      </ProCard>,
    );
    await wrapper.findAllByText('可折叠');
    expect(
      !!wrapper.baseElement.querySelector<HTMLDivElement>(
        '.ant-pro-card-collapse',
      ),
    ).toBeTruthy();
  });

  it('🥩 collapsible collapsed', async () => {
    const wrapper = render(
      <ProCard title="可折叠" headerBordered collapsed>
        <span data-testid="collapsed-body">内容</span>
      </ProCard>,
    );
    await wrapper.findAllByText('可折叠');
    expect(
      !!wrapper.baseElement.querySelector<HTMLDivElement>(
        '.ant-pro-card-collapse',
      ),
    ).toBeTruthy();
    // collapsed 无需 collapsible 也可收起内容
    expect(wrapper.queryByTestId('collapsed-body')).toBeNull();

    act(() => {
      wrapper.rerender(
        <ProCard title="可打开" headerBordered collapsed={false}>
          <span data-testid="collapsed-body">内容</span>
        </ProCard>,
      );
    });

    await wrapper.findAllByText('可打开');
    expect(
      !!wrapper.baseElement.querySelector<HTMLDivElement>(
        '.ant-pro-card-collapse',
      ),
    ).toBeFalsy();
    expect(wrapper.getByTestId('collapsed-body')).toBeTruthy();
  });

  it('🥩 collapsible icon custom render with defaultCollapsed', async () => {
    const wrapper = render(
      <ProCard
        title="可折叠-图标自定义"
        collapsibleIconRender={({ collapsed }: { collapsed: boolean }) =>
          collapsed ? <span>更多</span> : <span>收起</span>
        }
        headerBordered
        defaultCollapsed
        collapsible
      >
        内容
      </ProCard>,
    );
    await wrapper.findAllByText('可折叠-图标自定义');

    act(() => {
      expect(
        !!wrapper.baseElement.querySelector<HTMLDivElement>(
          '.ant-pro-card-collapse',
        ),
      ).toBeTruthy();
    });

    const dom = await wrapper.findByText('更多');

    expect(!!dom).toBe(true);
  });

  it('🥩 collapsible icon custom render', async () => {
    const wrapper = render(
      <ProCard
        title="可折叠-图标自定义"
        collapsibleIconRender={({ collapsed }: { collapsed: boolean }) =>
          collapsed ? <span>更多</span> : <span>收起</span>
        }
        defaultCollapsed={false}
        collapsible
        extra={
          <div>
            <span>操作</span>
          </div>
        }
      >
        内容
      </ProCard>,
    );
    await wrapper.findAllByText('可折叠-图标自定义');

    expect(
      !!wrapper.baseElement.querySelector<HTMLDivElement>('.ant-pro-card'),
    ).toBeTruthy();

    expect(
      !!wrapper.baseElement.querySelector<HTMLDivElement>(
        '.ant-pro-card-collapse',
      ),
    ).toBeFalsy();

    const dom = await wrapper.findByText('收起');

    expect(!!dom).toBe(true);

    act(() => {
      wrapper.baseElement
        .querySelector<HTMLDivElement>('.ant-pro-card-extra')
        ?.click();
    });

    wrapper.unmount();
  });

  it('🥩 collapsible icon mode with custom icon render', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <ProCard
        title="仅图标可折叠"
        collapsibleIconRender={({ collapsed }: { collapsed: boolean }) =>
          collapsed ? <span>展开</span> : <span>收起</span>
        }
        collapsible="icon"
        defaultCollapsed
        onCollapse={fn}
      >
        内容
      </ProCard>,
    );
    await wrapper.findAllByText('仅图标可折叠');

    expect(
      !!wrapper.baseElement.querySelector<HTMLDivElement>(
        '.ant-pro-card-collapse',
      ),
    ).toBeTruthy();

    act(() => {
      wrapper.baseElement
        .querySelector<HTMLSpanElement>('.ant-pro-card-collapsible-icon')
        ?.click();
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(false);
    });
  });

  it('🥩 collapsible icon custom render with controlled collapsed', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <ProCard
        title="可折叠-受控模式"
        collapsibleIconRender={({ collapsed }: { collapsed: boolean }) =>
          collapsed ? <span>更多</span> : <span>收起</span>
        }
        headerBordered
        collapsible
        collapsed
        onCollapse={fn}
      >
        内容
      </ProCard>,
    );
    await wrapper.findAllByText('可折叠-受控模式');

    expect(
      !!wrapper.baseElement.querySelector<HTMLDivElement>(
        '.ant-pro-card-collapse',
      ),
    ).toBeTruthy();

    const dom = await wrapper.findByText('更多');
    expect(!!dom).toBe(true);

    act(() => {
      wrapper.baseElement
        .querySelector<HTMLDivElement>('.ant-pro-card-collapsible-icon')
        ?.click();
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(false);
    });
  });

  it('🥩 tabs onChange', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <ProCard
        tabs={{
          onChange: fn,
          items: [
            {
              label: 'tab1',
              key: 'tab1',
              children: '产品一',
            },
            {
              label: 'tab2',
              key: 'tab2',
              children: '产品二',
            },
          ],
        }}
      />,
    );
    const card = wrapper.container.querySelector('.ant-pro-card');
    expect(card).toHaveClass('ant-card');
    expect(card).not.toHaveClass('ant-pro-card-legacy');
    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLDivElement>('.ant-pro-card-tabs .ant-tabs-tab')[1]
        ?.click();
    });
    expect(fn).toHaveBeenCalledWith('tab2');
    wrapper.unmount();
  });

  it('🥩 classNames.actions and styles.actions applied to actions ul', async () => {
    const wrapper = render(
      <ProCard
        title="操作区"
        actions={[<a key="setting">设置</a>, <a key="edit">编辑</a>]}
        classNames={{ actions: 'custom-actions-cls' }}
        styles={{ actions: { marginTop: 10 } }}
      >
        内容
      </ProCard>,
    );
    const actionsUl = wrapper.baseElement.querySelector<HTMLUListElement>(
      '.ant-pro-card-actions',
    );
    expect(actionsUl).toBeTruthy();
    expect(actionsUl?.className).toContain('custom-actions-cls');
    expect(actionsUl?.style.marginTop).toBe('10px');
    wrapper.unmount();
  });

  it('hides actions when collapsed on antd Card path', () => {
    const wrapper = render(
      <ProCard
        title="可折叠"
        collapsible
        defaultCollapsed
        actions={[<a key="setting">设置</a>]}
      >
        内容
      </ProCard>,
    );
    const card = wrapper.container.querySelector('.ant-pro-card');
    expect(card).toHaveClass('ant-card');
    expect(card).not.toHaveClass('ant-pro-card-legacy');
    expect(
      wrapper.container.querySelector('.ant-pro-card-actions'),
    ).toBeNull();
  });

  it('hides actions when collapsed on legacy path', () => {
    const wrapper = render(
      <ProCard
        title="可折叠"
        ghost
        collapsible
        defaultCollapsed
        actions={[<a key="setting">设置</a>]}
      >
        内容
      </ProCard>,
    );
    const card = wrapper.container.querySelector('.ant-pro-card');
    expect(card).toHaveClass('ant-pro-card-legacy');
    expect(
      wrapper.container.querySelector('.ant-pro-card-actions'),
    ).toBeNull();
  });

  it('hides collapsible body without height panel when collapsed', () => {
    const wrapper = render(
      <ProCard title="可折叠" collapsible defaultCollapsed>
        <span data-testid="body-text">内容</span>
      </ProCard>,
    );
    const card = wrapper.container.querySelector('.ant-pro-card');

    expect(card).toHaveClass('ant-pro-card-collapsible');
    expect(card).toHaveClass('ant-pro-card-collapse');
    expect(
      wrapper.container.querySelector('.ant-pro-card-collapse-panel'),
    ).toBeNull();
    // 内容仍挂载（display:none），无高度动画 panel
    expect(wrapper.getByTestId('body-text')).toBeTruthy();
  });

  it('keeps nested children mounted when layout shell collapses', () => {
    const wrapper = render(
      <ProCard collapsible defaultCollapsed>
        <ProCard title="子卡片">
          <input data-testid="nested-input" defaultValue="draft" />
        </ProCard>
      </ProCard>,
    );
    const shell = wrapper.container.querySelector(
      '.ant-pro-card-collapse-shell',
    );
    expect(shell).toHaveClass('ant-pro-card-collapse-shell-collapsed');
    expect(wrapper.getByTestId('nested-input')).toHaveValue('draft');
  });

  it('keeps tabs visible when collapsed without collapsible', () => {
    const wrapper = render(
      <ProCard
        collapsed
        tabs={{
          items: [
            { key: 'a', label: 'A', children: <div>tab-a</div> },
            { key: 'b', label: 'B', children: <div>tab-b</div> },
          ],
        }}
      />,
    );
    const card = wrapper.container.querySelector('.ant-pro-card');
    expect(card).toHaveClass('ant-pro-card-collapse');
    expect(card).not.toHaveClass('ant-pro-card-collapsible');
    expect(wrapper.container.querySelector('.ant-pro-card-tabs')).toBeTruthy();
    expect(wrapper.getByText('tab-a')).toBeTruthy();
  });

  it('does not toggle parent collapse when nested card header is clicked', () => {
    const onCollapse = vi.fn();
    const wrapper = render(
      <ProCard title="父卡片" collapsible onCollapse={onCollapse}>
        <ProCard title="子卡片">子内容</ProCard>
      </ProCard>,
    );

    const headers = wrapper.container.querySelectorAll('.ant-pro-card-header');
    expect(headers.length).toBeGreaterThanOrEqual(2);

    act(() => {
      (headers[1] as HTMLElement).click();
    });

    expect(onCollapse).not.toHaveBeenCalled();
    expect(
      wrapper.container.querySelector('.ant-pro-card-collapse'),
    ).toBeNull();
  });
});
