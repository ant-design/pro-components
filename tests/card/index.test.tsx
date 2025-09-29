import { cleanup, render, waitFor } from '@testing-library/react';
import { ProCard } from '@xxlabs/pro-components';
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
          collapsible
          defaultCollapsed
          headerBordered
          colSpan={{
            xs: 24,
          }}
          title="可折叠"
          onCollapse={fn}
        >
          内容
        </ProCard>
        ,
      </ProCard>,
    );

    await wrapper.findAllByText('可折叠');

    act(() => {
      wrapper.baseElement.querySelector<HTMLDivElement>('.ant-pro-card-collapsible-icon')?.click();
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalled();
    });
  });

  it('🥩 collapsible defaultCollapsed', async () => {
    const wrapper = render(
      <ProCard collapsible defaultCollapsed headerBordered title="可折叠">
        内容
      </ProCard>,
    );
    await wrapper.findAllByText('可折叠');
    expect(!!wrapper.baseElement.querySelector<HTMLDivElement>('.ant-pro-card-collapse')).toBeTruthy();
  });

  it('🥩 collapsible collapsed', async () => {
    const wrapper = render(
      <ProCard collapsed headerBordered title="可折叠">
        内容
      </ProCard>,
    );
    await wrapper.findAllByText('可折叠');
    expect(!!wrapper.baseElement.querySelector<HTMLDivElement>('.ant-pro-card-collapse')).toBeTruthy();

    act(() => {
      wrapper.rerender(
        <ProCard headerBordered collapsed={false} title="可打开">
          内容
        </ProCard>,
      );
    });

    await wrapper.findAllByText('可打开');
    expect(!!wrapper.baseElement.querySelector<HTMLDivElement>('.ant-pro-card-collapse')).toBeFalsy();
  });

  it('🥩 collapsible icon custom render with defaultCollapsed', async () => {
    const wrapper = render(
      <ProCard
        collapsible
        defaultCollapsed
        headerBordered
        collapsibleIconRender={({ collapsed }: { collapsed: boolean }) =>
          collapsed ? <span>更多</span> : <span>收起</span>
        }
        title="可折叠-图标自定义"
      >
        内容
      </ProCard>,
    );
    await wrapper.findAllByText('可折叠-图标自定义');

    act(() => {
      expect(!!wrapper.baseElement.querySelector<HTMLDivElement>('.ant-pro-card-collapse')).toBeTruthy();
    });

    const dom = await wrapper.findByText('更多');

    expect(!!dom).toBe(true);
  });

  it('🥩 collapsible icon custom render', async () => {
    const wrapper = render(
      <ProCard
        collapsible
        collapsibleIconRender={({ collapsed }: { collapsed: boolean }) =>
          collapsed ? <span>更多</span> : <span>收起</span>
        }
        defaultCollapsed={false}
        extra={
          <div>
            <span>操作</span>
          </div>
        }
        title="可折叠-图标自定义"
      >
        内容
      </ProCard>,
    );
    await wrapper.findAllByText('可折叠-图标自定义');

    expect(!!wrapper.baseElement.querySelector<HTMLDivElement>('.ant-pro-card')).toBeTruthy();

    expect(!!wrapper.baseElement.querySelector<HTMLDivElement>('.ant-pro-card-collapse')).toBeFalsy();

    const dom = await wrapper.findByText('收起');

    expect(!!dom).toBe(true);

    act(() => {
      wrapper.baseElement.querySelector<HTMLDivElement>('.ant-pro-card-extra')?.click();
    });

    wrapper.unmount();
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
      wrapper.baseElement.querySelectorAll<HTMLDivElement>('.ant-pro-card-tabs .ant-tabs-tab')[1]?.click();
    });
    expect(fn).toHaveBeenCalledWith('tab2');
    wrapper.unmount();
  });
});
