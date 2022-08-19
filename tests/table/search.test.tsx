import ProTable from '@ant-design/pro-table';
import { fireEvent, render } from '@testing-library/react';
import type { FormInstance } from 'antd';
import { Input } from 'antd';
import MockDate from 'mockdate';
import React, { createRef } from 'react';
import { act } from 'react-dom/test-utils';
import { waitForComponentToPaint, waitTime } from '../util';
import { request } from './demo';

describe('BasicTable Search', () => {
  process.env.NODE_ENV = 'TEST';
  const LINE_STR_COUNT = 20;

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

  it('🎏 submit test', async () => {
    const fn = jest.fn();
    const paramsFn = jest.fn();
    const html = render(
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

    const dom = await (await html.findAllByText('查 询')).at(0);

    act(() => {
      dom?.click();
    });

    await waitForComponentToPaint(html, 300);
    expect(fn).toBeCalledTimes(1);
    expect(paramsFn).toBeCalledWith(1, 20);
  });

  it('🎏 reset test', async () => {
    const fn = jest.fn();
    const resetFn = jest.fn();
    const html = render(
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
    await waitForComponentToPaint(html, 2000);

    expect(fn).toBeCalledTimes(1);

    const dom = await (await html.findAllByText('重 置')).at(0);

    act(() => {
      dom?.click();
    });

    await waitForComponentToPaint(html, 300);

    expect(fn).toBeCalledTimes(2);
    expect(resetFn).toBeCalledTimes(1);
  });

  it('🎏 reset test when pagination is false', async () => {
    const fn = jest.fn();
    const resetFn = jest.fn();
    const html = render(
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
    await waitForComponentToPaint(html, 2000);

    const dom = await (await html.findAllByText('重 置')).at(0);

    act(() => {
      dom?.click();
    });

    await waitForComponentToPaint(html, 200);

    expect(fn).toBeCalledTimes(2);
    expect(resetFn).toBeCalledTimes(1);
  });

  it('🎏 table will render loading dom', async () => {
    const fn = jest.fn();
    const html = render(
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
    await waitForComponentToPaint(html, 2000);
    expect(fn).toBeCalledTimes(1);

    expect(!!html.baseElement.querySelector('.ant-spin')).toBeTruthy();

    html.unmount();
  });

  it('🎏 manualRequest no render loading dom', async () => {
    const fn = jest.fn();
    const html = render(
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
    await waitForComponentToPaint(html, 2000);
    expect(fn).toBeCalledTimes(0);

    expect(!!html.baseElement.querySelector('.ant-spin')).toBeFalsy();

    html.unmount();
  });

  it('🎏 manualRequest test', async () => {
    const requestFn = jest.fn();
    const actionRef = React.createRef<any>();
    const html = render(
      <ProTable
        size="small"
        columns={[
          {
            title: '金额',
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        actionRef={actionRef}
        manualRequest
        request={async (params) => {
          requestFn();
          await waitTime(200);
          return request(params);
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 2000);
    MockDate.set(1479799364001);

    act(() => {
      actionRef.current?.reload();
    });
    await waitForComponentToPaint(html, 2000);

    expect(requestFn).toBeCalledTimes(1);
  });

  it('🎏 search span test', async () => {
    const html = render(
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
    await waitForComponentToPaint(html, 1000);

    expect(!!html.baseElement.querySelector('.ant-col.ant-col-12')).toBeTruthy();

    html.unmount();
  });

  it('🎏 transform test', async () => {
    const fn = jest.fn();
    let formValues = { origin: '', status: '', startTime: '', endTime: '' };
    const html = render(
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

    const dom = await (await html.findAllByText('查 询')).at(0);

    act(() => {
      dom?.click();
    });
    await waitForComponentToPaint(html, 1400);

    expect(formValues.origin).toBe('origin');
    expect(formValues.status).toBe('state');
    expect(formValues.startTime).toBe('2020-09-11');
    expect(formValues.endTime).toBe('2020-09-22');
    expect(fn).toBeCalledTimes(1);

    html.unmount();
  });

  it('🎏 renderFormItem test and fieldProps onChange', async () => {
    const fn = jest.fn();
    const onChangeFn = jest.fn();
    const html = render(
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
    await waitForComponentToPaint(html, 2000);

    expect(html.baseElement.querySelector('input#renderFormItem')).toBeTruthy();

    act(() => {
      fireEvent.change(html.baseElement.querySelector('input#renderFormItem')!, {
        target: { value: '12' },
      });
    });
    expect(onChangeFn).toBeCalledWith('12');
    expect(fn).toBeCalledWith('12');
    html.unmount();
  });

  it('🎏 renderFormItem support return false', async () => {
    const formRef = createRef<FormInstance | null>();
    const html = render(
      <ProTable
        size="small"
        formRef={formRef as any}
        columns={[
          {
            title: '金额',
            dataIndex: 'money',
            valueType: 'money',
            formItemProps: {
              className: 'money-class',
            },
            renderFormItem: () => false,
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
    await waitForComponentToPaint(html, 2000);

    expect(html.baseElement.querySelectorAll('div.ant-form-item').length).toBe(2);
    expect(html.baseElement.querySelectorAll('.money-class').length).toBe(0);

    act(() => {
      html.rerender(
        <ProTable
          size="small"
          formRef={formRef as any}
          columns={[
            {
              title: '金额',
              dataIndex: 'money',
              valueType: 'money',
              formItemProps: {
                className: 'money-class',
              },
              renderFormItem: () => <div />,
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
    });
    await waitForComponentToPaint(html, 200);

    expect(html.baseElement.querySelectorAll('div.money-class').length).toBe(1);

    expect(html.baseElement.querySelectorAll('div.ant-form-item').length).toBe(3);
    act(() => {
      html.rerender(
        <ProTable
          size="small"
          formRef={formRef as any}
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
          dataSource={[]}
          rowKey="key"
        />,
      );
    });

    await waitForComponentToPaint(html, 200);
    expect(html.baseElement.querySelectorAll('div.ant-form-item').length).toBe(3);

    html.unmount();
  });

  it('🎏 request load success false', async () => {
    const html = render(
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

    expect(html.baseElement.querySelector('.ant-empty')).toBeTruthy();

    html.unmount();
  });

  it('🎏 request load null', async () => {
    const html = render(
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
    html.unmount();
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

    const html = render(<TableDemo v />);

    await waitTime(500);

    act(() => {
      html.rerender(<TableDemo v={false} />);
    });

    await waitTime(500);
    expect(html.baseElement.textContent).toBe('qixian');
    html.unmount();
  });

  it('🎏 when dateFormatter is a Function', async () => {
    const fn2 = jest.fn();
    const html = render(
      <ProTable
        columns={[
          {
            title: '创建时间',
            key: 'since',
            dataIndex: 'createdAt',
            valueType: 'dateTime',
            initialValue: '2020-09-11 00:00:00',
          },
        ]}
        request={(params) => {
          fn2(params.since);
          return Promise.resolve({
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          });
        }}
        rowKey="key"
        pagination={{
          showSizeChanger: true,
        }}
        options={false}
        dateFormatter={(value) => {
          return value.format('YYYY/MM/DD HH:mm:ss');
        }}
        headerTitle="表单赋值"
      />,
    );
    await waitForComponentToPaint(html, 1400);
    const dom = await (await html.findAllByText('查 询')).at(0);

    act(() => {
      dom?.click();
    });
    await waitForComponentToPaint(html, 1400);
    expect(fn2).toBeCalledWith('2020-09-11 00:00:00');
    html.unmount();
  });
});
