import { ProCard } from '@ant-design/pro-components';
import { cleanup, render, waitFor } from '@testing-library/react';
import { act } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('antd/lib/grid/hooks/useBreakpoint');

afterEach(() => {
  cleanup();
});

describe('Card', () => {
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
        内容
      </ProCard>,
    );
    await wrapper.findAllByText('可折叠');
    expect(
      !!wrapper.baseElement.querySelector<HTMLDivElement>(
        '.ant-pro-card-collapse',
      ),
    ).toBeTruthy();

    act(() => {
      wrapper.rerender(
        <ProCard title="可打开" headerBordered collapsed={false}>
          内容
        </ProCard>,
      );
    });

    await wrapper.findAllByText('可打开');
    expect(
      !!wrapper.baseElement.querySelector<HTMLDivElement>(
        '.ant-pro-card-collapse',
      ),
    ).toBeFalsy();
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
});
