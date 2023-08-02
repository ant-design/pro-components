import type { ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import type { FormInstance } from 'antd';
import { Input } from 'antd';
import dayjs from 'dayjs';
import React, { createRef } from 'react';
import { waitTime } from '../util';

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
        request={async (params) => {
          paramsFn(params.current, params.pageSize);
          return {
            data: [{ key: 1, name: '1', money: 1 }],
          };
        }}
        rowKey="key"
      />,
    );

    const dom = await (await html.findAllByText('查 询')).at(0);

    act(() => {
      dom?.click();
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
      expect(paramsFn).toBeCalledWith(1, 20);
    });
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
        request={async () => {
          fn();
          return {
            data: [{ key: 1, name: '1', money: 1 }],
          };
        }}
        rowKey="key"
      />,
    );

    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
    });

    const dom = await (await html.findAllByText('重 置')).at(0);

    act(() => {
      dom?.click();
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(2);
      expect(resetFn).toBeCalledTimes(1);
    });
  });

  it('🎏 reset test when pagination is false', async () => {
    const fn = jest.fn();
    const resetFn = jest.fn();
    jest.useFakeTimers();
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
        request={async () => {
          fn();
          return {
            data: [{ key: 1, name: '1', money: 1 }],
          };
        }}
        rowKey="key"
      />,
    );

    await html.findAllByText('重 置');
    act(() => {
      jest.runOnlyPendingTimers();
    });
    const dom = await (await html.findAllByText('重 置')).at(0);

    act(() => {
      dom?.click();
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(2);
      expect(resetFn).toBeCalledTimes(1);
    });
    jest.useRealTimers();
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
        search={false}
        request={async () => {
          fn();
          await waitTime(5000000);
          return {
            data: [{ key: 1, name: '1', money: 1 }],
          };
        }}
        rowKey="key"
      />,
    );

    await html.findAllByText('暂无数据');

    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
    });

    await waitFor(() => {
      expect(!!html.baseElement.querySelector('.ant-spin')).toBeTruthy();
    });
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
        request={async () => {
          fn();
          return {
            data: [{ key: 1, name: '1', money: 1 }],
          };
        }}
        rowKey="key"
      />,
    );

    await html.findAllByText('姓名');

    expect(fn).toBeCalledTimes(0);

    expect(!!html.baseElement.querySelector('.ant-spin')).toBeFalsy();

    html.unmount();
  });

  it('🎏 manualRequest test', async () => {
    const requestFn = jest.fn();
    jest.useFakeTimers();
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
        search={false}
        actionRef={actionRef}
        manualRequest
        request={async () => {
          requestFn();
          return {
            data: [
              {
                key: '1',
                money: '12000',
              },
            ],
          };
        }}
        rowKey="key"
      />,
    );

    await waitFor(() => {
      expect(requestFn).toBeCalledTimes(0);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      actionRef.current?.reload();
    });

    await html.findAllByText('¥12,000.00');
    await waitFor(() => {
      expect(requestFn).toBeCalledTimes(1);
    });

    jest.useRealTimers();
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
        dataSource={[{ key: 1, name: '1', money: 1 }]}
        rowKey="key"
      />,
    );

    await waitFor(() => {
      expect(
        !!html.baseElement.querySelector('.ant-col.ant-col-12'),
      ).toBeTruthy();
    });
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
              transform: (value: any) => ({
                startTime: value[0],
                endTime: value[1],
              }),
            },
          },
        ]}
        dataSource={[{ key: 1, name: '1', money: 1 }]}
        onSubmit={(values) => {
          fn(values);
          formValues = values as any;
        }}
        rowKey="key"
      />,
    );

    const dom = await (await html.findAllByText('查 询')).at(0);

    act(() => {
      dom?.click();
    });

    await waitFor(() => {
      expect(formValues.origin).toBe('origin');
      expect(formValues.status).toBe('state');
      expect(formValues.startTime).toBe('2020-09-11');
      expect(formValues.endTime).toBe('2020-09-22');
      expect(fn).toBeCalledTimes(1);
    });

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
              return <Input id="renderFormItem" placeholder="renderFormItem" />;
            },
          },
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
          },
        ]}
        dataSource={[{ key: 1, name: '1', money: 1 }]}
        rowKey="key"
      />,
    );

    await html.findAllByPlaceholderText('renderFormItem');

    expect(html.baseElement.querySelector('input#renderFormItem')).toBeTruthy();

    act(() => {
      fireEvent.change(
        html.baseElement.querySelector('input#renderFormItem')!,
        {
          target: { value: '12' },
        },
      );
    });
    await waitFor(() => {
      expect(onChangeFn).toBeCalledWith('12');
      expect(fn).toBeCalledWith('12');
    });

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

    await html.findAllByText('Name');

    expect(html.baseElement.querySelectorAll('div.ant-form-item').length).toBe(
      2,
    );
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

    await waitFor(() => {
      expect(html.baseElement.querySelectorAll('div.money-class').length).toBe(
        1,
      );

      expect(
        html.baseElement.querySelectorAll('div.ant-form-item').length,
      ).toBe(3);
    });

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
    await waitFor(() => {
      expect(
        html.baseElement.querySelectorAll('div.ant-form-item').length,
      ).toBe(3);
    });
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

    await html.findAllByText('金额');

    await waitFor(() => {
      expect(html.baseElement.querySelector('.ant-empty')).toBeTruthy();
    });
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
    await waitFor(() => {
      expect(() => {
        // @ts-ignore
        html.dive().html();
      }).toThrowError();
    });
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
          dataSource={[{ key: 1, name: '1', money: 1 }]}
          rowKey="key"
        />
      ) : (
        <>qixian</>
      );
    };

    const html = render(<TableDemo v />);
    await html.findAllByText('金额');
    act(() => {
      html.rerender(<TableDemo v={false} />);
    });

    await html.findAllByText('qixian');
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

    await html.findAllByText('创建时间');

    const dom = await (await html.findAllByText('查 询')).at(0);

    act(() => {
      dom?.click();
    });

    await waitFor(() => {
      expect(fn2).toBeCalledWith('2020-09-11 00:00:00');
    });
  });

  it('🎏 ProTable support formRef', async () => {
    const onSubmitFn = jest.fn();
    const formRef = React.createRef<ProFormInstance | undefined>();
    const html = render(
      <ProTable
        formRef={formRef as any}
        columns={[
          {
            title: '创建时间',
            key: 'since',
            dataIndex: 'createdAt',
            valueType: 'date',
            initialValue: dayjs('2020-09-11 00:00:00'),
          },
        ]}
        request={() => {
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
        dateFormatter="string"
        onSubmit={(params) => {
          onSubmitFn(params.since);
        }}
        rowKey="key"
        pagination={{
          showSizeChanger: true,
        }}
        options={false}
        headerTitle="表单赋值"
      />,
    );

    await html.findAllByText('创建时间');

    act(() => {
      formRef.current?.submit();
    });

    await waitFor(() => {
      expect(onSubmitFn).toBeCalledWith('2020-09-11');
    });

    expect(formRef.current?.getFieldFormatValue?.().since).toBe('2020-09-11');
  });
});
