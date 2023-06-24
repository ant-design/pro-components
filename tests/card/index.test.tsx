import { ProCard } from '@ant-design/pro-components';
import { act, render } from '@testing-library/react';

jest.mock('antd/lib/grid/hooks/useBreakpoint');

describe('Card', () => {
  it('🥩 collapsible onCollapse', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <ProCard
        title="可折叠"
        headerBordered
        collapsible
        defaultCollapsed
        onCollapse={fn}
      >
        内容
      </ProCard>,
    );

    await wrapper.findAllByText('可折叠');

    act(() => {
      wrapper.baseElement
        .querySelector<HTMLDivElement>('.ant-pro-card-collapsible-icon')
        ?.click();
    });

    expect(fn).toBeCalled();
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

    wrapper.unmount();
  });

  it('🥩 tabs onChange', async () => {
    const fn = jest.fn();
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
});
