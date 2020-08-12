import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-test-renderer';
import ProTable from '@ant-design/pro-table';
import { columns, request } from './demo';
import { waitTime, waitForComponentToPaint } from '../util';

describe('Table ColumnSetting', () => {
  const LINE_STR_COUNT = 20;
  // Mock offsetHeight
  // @ts-expect-error
  const originOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight')
    .get;
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    get() {
      let html = this.innerHTML;
      html = html.replace(/<[^>]*>/g, '');
      const lines = Math.ceil(html.length / LINE_STR_COUNT);
      return lines * 16;
    },
  });

  // Mock getComputedStyle
  const originGetComputedStyle = window.getComputedStyle;
  window.getComputedStyle = (ele) => {
    const style = originGetComputedStyle(ele);
    style.lineHeight = '16px';
    return style;
  };

  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      get: originOffsetHeight,
    });
    window.getComputedStyle = originGetComputedStyle;
  });

  it('🎏 columnSetting', async () => {
    const html = mount(<ProTable size="small" columns={columns} request={request} rowKey="key" />);
    await waitTime(200);
    await waitForComponentToPaint(html);

    act(() => {
      const icon = html.find('span.ant-pro-table-toolbar-item-icon .anticon-setting');
      icon.simulate('click');
    });
    const overlay = html.find('.ant-pro-table-column-setting-overlay');
    expect(overlay.exists()).toBeTruthy();
    act(() => {
      const item = html.find('span.ant-pro-table-column-setting-list-item').first();
      item
        .find('.ant-pro-table-column-setting-list-item-option .anticon-vertical-align-top')
        .simulate('click');
    });

    const titleList = html.find(
      '.ant-pro-table-column-setting-overlay .ant-pro-table-column-setting-list-title',
    );
    expect(titleList.length).toBe(2);
  });

  it('🎏 columnSetting columnsStateMap props', async () => {
    const html = mount(
      <ProTable
        size="small"
        columnsStateMap={{
          index: { fixed: 'left' },
          Age: { show: false },
          option: { fixed: 'right' },
        }}
        columns={columns}
        request={request}
        rowKey="key"
      />,
    );
    await waitTime(200);
    await waitForComponentToPaint(html);

    act(() => {
      const icon = html.find('span.ant-pro-table-toolbar-item-icon .anticon-setting');
      icon.simulate('click');
    });
    let overlay = html.find(
      '.ant-pro-table-column-setting-overlay .ant-pro-table-column-setting-list-title',
    );
    expect(overlay.length).toBe(3);

    act(() => {
      html.setProps({
        columnsStateMap: {
          index: { fixed: 'left' },
        },
      });
    });
    await waitForComponentToPaint(html);
    overlay = html.find(
      '.ant-pro-table-column-setting-overlay .ant-pro-table-column-setting-list-title',
    );
    expect(overlay.length).toBe(2);
  });

  it('🎏 columnSetting columnsStateMap onchange', async () => {
    const callBack = jest.fn();
    const html = mount(
      <ProTable
        size="small"
        columnsStateMap={{
          index: { fixed: 'left' },
          Age: { show: false },
          option: { fixed: 'right' },
        }}
        onColumnsStateChange={callBack}
        columns={columns}
        request={request}
        rowKey="key"
      />,
    );

    await waitForComponentToPaint(html, 200);
    act(() => {
      const icon = html.find('span.ant-pro-table-toolbar-item-icon .anticon-setting');
      icon.simulate('click');
    });

    const reset = html.find('.ant-pro-table-column-setting-title a');
    act(() => {
      reset.simulate('click');
    });

    expect(callBack).toBeCalled();
  });
});
