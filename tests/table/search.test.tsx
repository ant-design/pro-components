import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Input } from 'antd';
import ProTable from '@ant-design/pro-table';
import { request } from './demo';
import { waitForComponentToPaint } from '../util';

describe('BasicTable Search', () => {
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

  it('🎏 submit test', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            title: '金额',
            dataIndex: 'money',
            valueType: 'money',
            order: 9,
          },
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            order: 1,
          },
        ]}
        onSubmit={fn}
        request={(params) => {
          return request(params);
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 200);

    act(() => {
      html.find('button.ant-btn.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(html, 500);

    expect(fn).toBeCalledTimes(1);
  });

  it('🎏 reset test', async () => {
    const fn = jest.fn();
    const resetFn = jest.fn();
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            title: '金额',
            dataIndex: 'money',
            valueType: 'money',
          },
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
          },
        ]}
        onReset={resetFn}
        request={(params) => {
          fn();
          return request(params);
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 200);

    act(() => {
      html.find('button.ant-btn').at(0).simulate('click');
    });

    await waitForComponentToPaint(html, 500);

    expect(fn).toBeCalledTimes(2);
    expect(resetFn).toBeCalledTimes(1);
  });

  it('🎏 manualRequest test', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            title: '金额',
            dataIndex: 'money',
            valueType: 'money',
          },
          {
            title: 'Name',
            key: 'name',
            children: [
              {
                title: '金额',
                dataIndex: 'money',
                valueType: 'money',
              },
              {
                title: '姓名',
                dataIndex: 'name',
                valueType: 'money',
              },
            ],
          },
        ]}
        manualRequest
        request={(params) => {
          fn();
          return request(params);
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 200);

    act(() => {
      html.find('button.ant-btn').at(0).simulate('click');
    });

    await waitForComponentToPaint(html, 500);

    expect(fn).toBeCalledTimes(1);
  });

  it('🎏 manualRequest test', async () => {
    const fn = jest.fn();
    const ref = React.createRef<any>();
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            title: '金额',
            dataIndex: 'money',
            valueType: 'money',
          },
          {
            title: 'Name',
            key: 'name',
            children: [
              {
                title: '金额',
                dataIndex: 'money',
                valueType: 'money',
              },
              {
                title: '姓名',
                dataIndex: 'name',
                valueType: 'money',
              },
            ],
          },
        ]}
        formRef={ref}
        manualRequest
        request={(params) => {
          fn();
          return request(params);
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 200);
    ref.current?.submit();
    await waitForComponentToPaint(html, 500);

    expect(fn).toBeCalledTimes(1);
  });

  it('🎏 search span test', async () => {
    const html = mount(
      <ProTable
        size="small"
        search={{
          defaultCollapsed: false,
          searchText: 'Search',
          span: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 12,
            xxl: 12,
          },
        }}
        columns={[
          {
            title: '金额',
            dataIndex: 'money',
            valueType: 'money',
          },
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
          },
        ]}
        request={(params) => {
          return request(params);
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 200);

    expect(html.find('.ant-col.ant-col-12').exists()).toBeTruthy();
  });

  it('🎏 transform test', async () => {
    const fn = jest.fn();
    let formValues = { origin: '', status: '', startTime: '', endTime: '' };
    const html = mount(
      <ProTable
        columns={[
          {
            title: 'origin',
            dataIndex: 'origin',
            initialValue: 'origin',
          },
          {
            title: 'state',
            dataIndex: 'state',
            initialValue: 'state',
            search: {
              transform: () => 'status',
            },
          },
          {
            title: 'createdAt',
            dataIndex: 'dateRange',
            initialValue: ['2020-09-11', '2020-09-22'],
            search: {
              transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
            },
          },
        ]}
        request={(params) => request(params)}
        onSubmit={(values) => {
          fn(values);
          formValues = values as any;
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 200);

    act(() => {
      html.find('button.ant-btn.ant-btn-primary').simulate('click');
    });
    await waitForComponentToPaint(html, 500);

    expect(formValues.origin).toBe('origin');
    expect(formValues.status).toBe('state');
    expect(formValues.startTime).toBe('2020-09-11');
    expect(formValues.endTime).toBe('2020-09-22');
    expect(fn).toBeCalledTimes(1);
  });

  it('🎏 renderFormItem test', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProTable
        size="small"
        form={{
          onValuesChange: (_, values) => {
            fn(values.money);
          },
        }}
        columns={[
          {
            title: '金额',
            dataIndex: 'money',
            valueType: 'money',
            renderFormItem: () => <Input id="renderFormItem" />,
          },
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
          },
        ]}
        request={(params) => {
          return request(params);
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 200);

    expect(html.find('#renderFormItem').exists()).toBeTruthy();
    act(() => {
      html.find('#renderFormItem input').simulate('change', {
        target: {
          value: '12',
        },
      });
    });
    expect(fn).toBeCalledWith('12');
  });
});
