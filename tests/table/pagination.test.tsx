import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import ProTable from '@ant-design/pro-table';
import { request } from './demo';
import { waitForComponentToPaint } from '../util';

describe('BasicTable pagination', () => {
  it('🎏 pagination current test', async () => {
    const fn = jest.fn();
    const onChangeFn = jest.fn();
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
          return request({
            pageSize: 10,
            current: 1,
          });
        }}
        pagination={{
          onChange: onChangeFn(),
        }}
        onRequestError={fn}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1000);

    expect(fn).toBeCalledWith(1);

    act(() => {
      html.find('li.ant-pagination-item.ant-pagination-item-2').simulate('click');
    });
    await waitForComponentToPaint(html, 200);

    expect(fn).toBeCalledWith(1);
  });

  it('🎏 pagination pageSize test ', async () => {
    const fn = jest.fn();
    const currentFn = jest.fn();
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
          currentFn(params.current);
          return request({
            pageSize: 10,
            current: 1,
          });
        }}
        pagination={{
          pageSize: 50,
        }}
        onRequestError={fn}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1000);

    expect(fn).toBeCalledWith(50);
    expect(currentFn).toBeCalledWith(1);
    act(() => {
      html.setProps({
        pagination: {
          pageSize: 10,
        },
      });
    });
    await waitForComponentToPaint(html, 200);

    expect(fn).toBeCalledWith(10);
  });

  it('🎏 pagination current', async () => {
    const fn = jest.fn();
    const pageSizeFn = jest.fn();
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
          pageSizeFn(params.pageSize);
          return request(params);
        }}
        pagination={{
          current: 2,
        }}
        onRequestError={fn}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1000);

    expect(fn).toBeCalledWith(2);

    expect(pageSizeFn).toBeCalledWith(20);
    act(() => {
      html.setProps({
        pagination: {
          current: 3,
        },
      });
    });

    await waitForComponentToPaint(html, 200);

    expect(fn).toBeCalledWith(3);
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
          return request({
            pageSize: 10,
            current: 1,
          });
        }}
        pagination={false}
        onRequestError={() => null}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1000);

    expect(fn).toBeCalledWith(undefined);
    act(() => {
      html.setProps({
        pagination: {
          pageSize: 10,
        },
      });
    });
    await waitForComponentToPaint(html, 200);

    expect(fn).toBeCalledWith(10);
  });
});
