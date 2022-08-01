import ProCard from '@ant-design/pro-card';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { waitForComponentToPaint } from '../util';

jest.mock('antd/es/grid/hooks/useBreakpoint');

describe('Card', () => {
  it('🥩 collapsible onCollapse', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <ProCard title="可折叠" headerBordered collapsible defaultCollapsed onCollapse={fn}>
        内容
      </ProCard>,
    );
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('AntdIcon.ant-pro-card-collapsible-icon').simulate('click');
    });
    expect(fn).toBeCalled();
  });

  it('🥩 collapsible defaultCollapsed', async () => {
    const wrapper = mount(
      <ProCard title="可折叠" headerBordered collapsible defaultCollapsed>
        内容
      </ProCard>,
    );
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-card-collapse').exists()).toBeTruthy();
  });

  it('🥩 collapsible collapsed', async () => {
    const wrapper = mount(
      <ProCard title="可折叠" headerBordered collapsed>
        内容
      </ProCard>,
    );
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-card-collapse').exists()).toBeTruthy();

    act(() => {
      wrapper.setProps({
        collapsed: false,
      });
    });

    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-card-collapse').exists()).toBeFalsy();
  });

  it('🥩 collapsible icon custom render with defaultCollapsed', async () => {
    const wrapper = mount(
      <ProCard
        title="可折叠-图标自定义"
        collapsibleIconRender={({ collapsed }: { collapsed: boolean }) =>
          collapsed ? <span>更多 - </span> : <span>收起 - </span>
        }
        headerBordered
        defaultCollapsed
        collapsible
      >
        内容
      </ProCard>,
    );
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-card-collapse').exists()).toBeTruthy();
    expect(wrapper.find('.ant-pro-card-title > span').text()).toEqual('更多 - ');
  });

  it('🥩 collapsible icon custom render', async () => {
    const wrapper = mount(
      <ProCard
        title="可折叠-图标自定义"
        collapsibleIconRender={({ collapsed }: { collapsed: boolean }) =>
          collapsed ? <span>更多 - </span> : <span>收起 - </span>
        }
        defaultCollapsed={false}
        collapsible
      >
        内容
      </ProCard>,
    );
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-card').exists()).toBeTruthy();
    expect(wrapper.find('.ant-pro-card-collapse').exists()).toBeFalsy();
    expect(wrapper.find('.ant-pro-card-title > span').text()).toEqual('收起 - ');
  });

  it('🥩 tabs onChange', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <ProCard
        tabs={{
          onChange: fn,
        }}
      >
        <ProCard.TabPane key="tab1" tab="产品一">
          内容一
        </ProCard.TabPane>
        <ProCard.TabPane key="tab2" tab="产品二">
          内容二
        </ProCard.TabPane>
      </ProCard>,
    );
    act(() => {
      wrapper.find('.ant-pro-card-tabs .ant-tabs-tab').at(1).simulate('click');
    });
    expect(fn).toHaveBeenCalledWith('tab2');
  });
});
