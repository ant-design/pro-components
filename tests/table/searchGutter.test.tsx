import { mount } from 'enzyme';
import React from 'react';
import ProTable from '@ant-design/pro-table';
import { waitForComponentToPaint, waitTime } from '../util';

describe('BasicTable SearchGutter', () => {
  const LINE_STR_COUNT = 20;
  // Mock offsetHeight
  // @ts-expect-error
  const originOffsetHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetHeight',
  ).get;
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

  beforeAll(() => {
    process.env.NODE_ENV = 'TEST';
  });

  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      get: originOffsetHeight,
    });
    window.getComputedStyle = originGetComputedStyle;
  });

  it('🎏 ProTable support searchGutter', async () => {
    const html = mount(
      <ProTable
        size="small"
        options={{
          fullScreen: false,
          reload: false,
          setting: false,
        }}
        search={{
          searchGutter: [16, 24],
        }}
        columns={[
          {
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        dataSource={[]}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);
    expect((html.find('.ant-col').at(0).props().style || {}).paddingLeft).toBe(8);
    expect((html.find('.ant-col').at(0).props().style || {}).paddingTop).toBe(12);
  });

  it('🎏 ProTable searchGutter default is [24 0]', async () => {
    const html = mount(
      <ProTable
        size="small"
        options={{
          fullScreen: false,
          reload: false,
          setting: false,
        }}
        search={
          {
            // searchGutter: 24,
          }
        }
        columns={[
          {
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        dataSource={[]}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);
    expect((html.find('.ant-col').at(0).props().style || {}).paddingLeft).toBe(12);
    expect((html.find('.ant-col').at(0).props().style || {}).paddingTop).toBe(undefined);
  });
});
