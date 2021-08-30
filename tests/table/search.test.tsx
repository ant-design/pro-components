import { mount } from 'enzyme';
import React from 'react';
import MockDate from 'mockdate';
import { act } from 'react-dom/test-utils';
import { Input } from 'antd';
import ProTable from '@ant-design/pro-table';
import { request } from './demo';
import { waitForComponentToPaint, spyElementPrototypes, waitTime } from '../util';

describe('BasicTable Search', () => {
  let domSpy: any;
  let mockWidth: number;
  let mockHeight: number;
  let mockOffsetWidth: number;
  let mockOffsetHeight: number;

  beforeAll(() => {
    domSpy = spyElementPrototypes(HTMLElement, {
      getBoundingClientRect: () => ({
        width: mockWidth,
        height: mockHeight,
      }),
      offsetWidth: {
        get: () => mockOffsetWidth,
      },
      offsetHeight: {
        get: () => mockOffsetHeight,
      },
    });
  });
  process.env.NODE_ENV = 'TEST';
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

  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      get: originOffsetHeight,
    });
    window.getComputedStyle = originGetComputedStyle;
    domSpy.mockRestore();
  });

  it('🎏 submit test', async () => {
    mockHeight = 0;
    mockWidth = 0;
    mockOffsetHeight = 0;
    mockOffsetWidth = 0;

    const fn = jest.fn();
    const paramsFn = jest.fn();
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
          paramsFn(params.current, params.pageSize);
          return request(params);
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);

    act(() => {
      html.find('button.ant-btn.ant-btn-primary').simulate('click');
    });

    act(() => {
      mockOffsetWidth = 500;
      // @ts-ignore
      html.triggerResize();
    });
    await waitForComponentToPaint(html, 500);

    expect(fn).toBeCalledTimes(1);
    expect(paramsFn).toBeCalledWith(1, 20);
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
    await waitForComponentToPaint(html, 1200);

    act(() => {
      html.find('button.ant-btn').at(0).simulate('click');
    });

    await waitForComponentToPaint(html, 300);

    expect(fn).toBeCalledTimes(2);
    expect(resetFn).toBeCalledTimes(1);
  });

  it('🎏 reset test when pagination is false', async () => {
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
        pagination={false}
        request={(params) => {
          fn();
          return request(params);
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);

    act(() => {
      html.find('button.ant-btn').at(0).simulate('click');
    });

    await waitForComponentToPaint(html, 200);

    expect(fn).toBeCalledTimes(2);
    expect(resetFn).toBeCalledTimes(1);
  });

  it('🎏 manualRequest test by button', async () => {
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
        request={async (params) => {
          fn();
          await waitTime(500);
          return request(params);
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);
  });

  it('🎏 table will render loading dom', async () => {
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
        request={async (params) => {
          fn();
          await waitTime(5000);
          return request(params);
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);
    expect(fn).toBeCalledTimes(1);

    expect(html.find('.ant-spin').exists()).toBeTruthy();

    act(() => {
      html.unmount();
    });
  });

  it('🎏 manualRequest no render loading dom', async () => {
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
        request={async (params) => {
          fn();
          return request(params);
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);
    expect(fn).toBeCalledTimes(0);

    expect(html.find('.ant-spin').exists()).toBeFalsy();

    act(() => {
      html.unmount();
    });
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
        request={async (params) => {
          fn();
          await waitTime(200);
          return request(params);
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);
    MockDate.set(1479799364001);

    act(() => {
      ref.current?.submit();
    });
    await waitForComponentToPaint(html, 1200);

    expect(fn).toBeCalledTimes(1);

    MockDate.set(1479799364000);

    act(() => {
      html.unmount();
    });
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
        request={async (params) => {
          await waitTime(200);
          return request(params);
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 200);

    expect(html.find('.ant-col.ant-col-12').exists()).toBeTruthy();

    act(() => {
      html.unmount();
    });
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
        request={async () => {
          return {
            data: [],
            success: true,
          };
        }}
        onSubmit={(values) => {
          fn(values);
          formValues = values as any;
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1400);
    act(() => {
      html.find('button.ant-btn.ant-btn-primary').simulate('click');
    });
    await waitForComponentToPaint(html, 1400);

    expect(formValues.origin).toBe('origin');
    expect(formValues.status).toBe('state');
    expect(formValues.startTime).toBe('2020-09-11');
    expect(formValues.endTime).toBe('2020-09-22');
    expect(fn).toBeCalledTimes(1);

    act(() => {
      html.unmount();
    });
  });

  it('🎏 renderFormItem test and fieldProps onChange', async () => {
    const fn = jest.fn();
    const onChangeFn = jest.fn();
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
            fieldProps: {
              onChange: (e: any) => {
                onChangeFn(e.target.value);
              },
            },
            renderFormItem: () => {
              return <Input id="renderFormItem" />;
            },
          },
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
          },
        ]}
        request={async () => {
          await waitTime(500);
          return {
            data: [],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);

    expect(html.find('input#renderFormItem').exists()).toBeTruthy();
    act(() => {
      html.find('input#renderFormItem').simulate('change', {
        target: {
          value: '12',
        },
      });
    });
    expect(onChangeFn).toBeCalledWith('12');
    expect(fn).toBeCalledWith('12');
    act(() => {
      html.unmount();
    });
  });

  it('🎏 renderFormItem support return false', async () => {
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            title: '金额',
            dataIndex: 'money',
            valueType: 'money',
            renderFormItem: () => false,
          },
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
          },
        ]}
        request={async () => {
          await waitTime(500);
          return {
            data: [],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);
    expect(html.find('div.ant-form-item').length).toBe(2);
    act(() => {
      html.setProps({
        columns: [
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
        ],
      });
    });

    await waitForComponentToPaint(html, 200);
    expect(html.find('div.ant-form-item').length).toBe(3);

    act(() => {
      html.unmount();
    });
  });

  it('🎏 request load success false', async () => {
    const html = mount(
      <ProTable
        size="small"
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
        dataSource={[]}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1000);

    expect(html.find('.ant-empty').exists()).toBeTruthy();

    act(() => {
      html.unmount();
    });
  });

  it('🎏 request load null', async () => {
    const html = mount(
      <ProTable
        size="small"
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
        // @ts-expect-error
        request={async () => {
          return null;
        }}
        rowKey="key"
      />,
    );
    expect(() => {
      // @ts-ignore
      html.dive().html();
    }).toThrowError();
    act(() => {
      html.unmount();
    });
  });

  it('🎏 request load more time', async () => {
    const TableDemo: React.FC<{ v: boolean }> = ({ v }) => {
      return v ? (
        <ProTable
          size="small"
          search={false}
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
          request={async () => {
            await waitTime(600);
            return {
              data: [],
            };
          }}
          rowKey="key"
        />
      ) : (
        <>qixian</>
      );
    };

    const html = mount(<TableDemo v />);

    await waitTime(500);

    act(() => {
      html.setProps({
        v: false,
      });
    });

    await waitTime(500);

    expect(html.render()).toMatchSnapshot();

    act(() => {
      html.unmount();
    });
  });
});
