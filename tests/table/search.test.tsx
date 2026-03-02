import type { ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import type { FormInstance } from 'antd';
import { Input } from 'antd';
import dayjs from 'dayjs';
import React, { act, createRef } from 'react';
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { waitTime } from '../util';

afterEach(() => {
  cleanup();
});

describe('BasicTable Search', () => {
  beforeAll(() => vi.useFakeTimers());
  afterAll(() => vi.useRealTimers());
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
    return style;
  };

  it('🎏 submit test', async () => {
    const fn = vi.fn();
    const paramsFn = vi.fn();
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
      expect(fn).toHaveBeenCalledTimes(1);
      expect(paramsFn).toHaveBeenCalledWith(1, 20);
    });
  });

  it('🎏 reset test', async () => {
    const fn = vi.fn();
    const resetFn = vi.fn();
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
      expect(fn).toHaveBeenCalledTimes(1);
    });

    const dom = await (await html.findAllByText('重 置')).at(0);

    act(() => {
      dom?.click();
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledTimes(2);
      expect(resetFn).toHaveBeenCalledTimes(1);
    });
  });

  it('🎏 reset test when pagination is false', async () => {
    const fn = vi.fn();
    const resetFn = vi.fn();

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

    const dom = await (await html.findAllByText('重 置')).at(0);

    act(() => {
      dom?.click();
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledTimes(1);
      expect(resetFn).toHaveBeenCalledTimes(1);
    });
  });

  it('🎏 table will render loading dom', async () => {
    const fn = vi.fn();
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
      expect(fn).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(!!html.baseElement.querySelector('.ant-spin')).toBeTruthy();
    });
  });

  it('🎏 manualRequest test', async () => {
    const requestFn = vi.fn();

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
      expect(requestFn).not.toHaveBeenCalled();
    });

    act(() => {
      actionRef.current?.reload();
    });

    await html.findAllByText('¥12,000.00');
    await waitFor(() => {
      expect(requestFn).toHaveBeenCalledTimes(1);
    });
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
    const fn = vi.fn();
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
              transform: (value) => ({ status: value }),
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
      expect(fn).toHaveBeenCalledTimes(1);
    });

    html.unmount();
  });

  it('🎏 formItemRender test and fieldProps onChange', async () => {
    const fn = vi.fn();
    const onChangeFn = vi.fn();
    const html = render(
      <ProTable
        size="small"
        form={{
          onValuesChange: (_, values) => {
            fn(values.money);
          },
        }}
        toolBarRender={false}
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
            search: {
              transform: (value) => ({ money: value }),
            },
            formItemProps: {
              required: true,
            },
            formItemRender: () => {
              return (
                <div id="formItemRender">
                  <Input
                    id="formItemRender"
                    placeholder="formItemRender"
                    data-testid="formItemRender"
                    onChange={(e) => {
                      onChangeFn(e.target.value);
                      fn(e.target.value);
                    }}
                  />
                </div>
              );
            },
          },
        ]}
        dataSource={[{ key: 1, name: '1', money: 1 }]}
        rowKey="key"
      />,
    );

    const input = await html.findByTestId('formItemRender');
    expect(input).toBeTruthy();

    act(() => {
      fireEvent.change(input, {
        target: { value: '12' },
      });
    });
    await waitFor(() => {
      expect(onChangeFn).toHaveBeenCalledWith('12');
      expect(fn).toHaveBeenCalledWith('12');
    });

    html.unmount();
  });

  it('🎏 formItemRender support return false', async () => {
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
            formItemRender: () => false,
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
              formItemRender: () => <div />,
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
            formItemRender: () => <Input id="formItemRender" />,
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
            formItemRender: () => <Input id="formItemRender" />,
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
              formItemRender: () => <Input id="formItemRender" />,
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
    const fn2 = vi.fn();
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
      expect(fn2).toHaveBeenCalledWith('2020-09-11 00:00:00');
    });
  });

  it('🎏 ProTable support formRef', async () => {
    const onSubmitFn = vi.fn();
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

    // 等待formRef初始化完成
    await waitFor(() => {
      expect(formRef.current).toBeDefined();
      expect(typeof formRef.current?.submit).toBe('function');
    });

    // 测试formRef的submit方法
    act(() => {
      formRef.current?.submit();
    });

    await waitFor(() => {
      expect(onSubmitFn).toHaveBeenCalledWith('2020-09-11');
    });

    // 测试formRef的getFieldsValue方法
    const fieldsValue = formRef.current?.getFieldsValue?.();
    expect(fieldsValue).toBeDefined();
    expect(fieldsValue?.since).toBeDefined();
    expect(fieldsValue?.since?.format?.('YYYY-MM-DD')).toBe('2020-09-11');

    // 测试formRef的setFieldsValue方法
    act(() => {
      formRef.current?.setFieldsValue?.({
        since: dayjs('2020-10-15 00:00:00'),
      });
    });

    // 验证字段值已更新
    await waitFor(() => {
      const updatedFieldsValue = formRef.current?.getFieldsValue?.();
      expect(updatedFieldsValue?.since?.format?.('YYYY-MM-DD')).toBe(
        '2020-10-15',
      );
    });

    // 测试formRef的resetFields方法
    act(() => {
      formRef.current?.resetFields?.();
    });

    // 验证字段已重置
    await waitFor(() => {
      const resetFieldsValue = formRef.current?.getFieldsValue?.();
      expect(resetFieldsValue?.since?.format?.('YYYY-MM-DD')).toBe(
        '2020-09-11',
      );
    });

    // 测试formRef的getFieldValue方法
    const fieldValue = formRef.current?.getFieldValue?.('since');
    expect(fieldValue?.format?.('YYYY-MM-DD')).toBe('2020-09-11');

    // 测试formRef的setFieldValue方法
    act(() => {
      formRef.current?.setFieldValue?.('since', dayjs('2020-12-25 00:00:00'));
    });

    await waitFor(() => {
      const newFieldValue = formRef.current?.getFieldValue?.('since');
      expect(newFieldValue?.format?.('YYYY-MM-DD')).toBe('2020-12-25');
    });
  });

  it('🎏 should validate on initial load when ignoreRules is false', async () => {
    const requestFn = vi.fn();
    const { container } = render(
      <ProTable
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            formItemProps: {
              rules: [{ required: true, message: 'Required' }],
            },
          },
        ]}
        form={{ ignoreRules: false }}
        request={async () => {
          requestFn();
          return { data: [] };
        }}
        rowKey="key"
      />,
    );

    await waitFor(() => {
      // Should show validation error
      expect(
        container.querySelector('.ant-form-item-explain-error'),
      ).toBeTruthy();
    });

    expect(requestFn).not.toHaveBeenCalled();
  });

  it('🎏 should validate on reset when ignoreRules is false and initial value is empty', async () => {
    const requestFn = vi.fn();
    const { getByText, container } = render(
      <ProTable
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            formItemProps: {
              rules: [{ required: true, message: 'Required' }],
            },
          },
        ]}
        form={{ ignoreRules: false }}
        request={async () => {
          requestFn();
          return { data: [] };
        }}
        rowKey="key"
      />,
    );

    // Initial load should fail validation
    await waitFor(() => {
      expect(
        container.querySelector('.ant-form-item-explain-error'),
      ).toBeTruthy();
    });
    expect(requestFn).not.toHaveBeenCalled();

    // Enter value
    const input = container.querySelector('#name');
    fireEvent.change(input!, { target: { value: 'hello' } });

    fireEvent.click(getByText('查 询'));

    await waitFor(() => {
      expect(requestFn).toHaveBeenCalledTimes(1);
    });

    requestFn.mockClear();

    // Reset
    fireEvent.click(getByText('重 置'));

    await waitFor(() => {
      // Reset should clear input (back to empty initialValue).
      // And trigger validation.
      expect(
        container.querySelector('.ant-form-item-explain-error'),
      ).toBeTruthy();
    });

    // Request should NOT be called because validation failed
    expect(requestFn).not.toHaveBeenCalled();
  });
});
