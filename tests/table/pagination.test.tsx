import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import ProTable from '@ant-design/pro-table';
import { request } from './demo';
import { waitForComponentToPaint } from '../util';

describe('BasicTable', () => {
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

  it('🎏 pagination current test', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        request={(params) => {
          fn(params.current);
          return request(params);
        }}
        onRequestError={fn}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 200);

    expect(fn).toBeCalledWith(1);

    act(() => {
      html.find('li.ant-pagination-item.ant-pagination-item-2').simulate('click');
    });
    await waitForComponentToPaint(html, 1200);

    expect(fn).toBeCalledWith(1);
  });

  it('🎏 pagination pageSize test ', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        request={(params) => {
          fn(params.pageSize);
          return request(params);
        }}
        pagination={{
          pageSize: 50,
        }}
        onRequestError={fn}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 200);

    expect(fn).toBeCalledWith(50);

    html.setProps({
      pagination: {
        pageSize: 10,
      },
    });

    await waitForComponentToPaint(html, 1200);

    expect(fn).toBeCalledWith(10);
  });

  it('🎏 pagination=false, do not have pageParams', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        request={(params) => {
          fn(params.pageSize);
          return request(params);
        }}
        pagination={false}
        onRequestError={fn}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 200);

    expect(fn).toBeCalledWith(undefined);

    html.setProps({
      pagination: {
        pageSize: 10,
      },
    });

    await waitForComponentToPaint(html, 1200);

    expect(fn).toBeCalledWith(10);
  });
});
