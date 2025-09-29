import { act, cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { ProTable } from '@xxlabs/pro-components';
import type { FormInstance } from 'antd';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('BasicTable Search', () => {
  it('🎏 table type=form', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProTable
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
          },
          {
            title: '状态',
            dataIndex: 'status',
            hideInForm: true,
            filters: true,
            valueEnum: {
              0: { text: '关闭', status: 'Default' },
              1: { text: '运行中', status: 'Processing' },
              2: { text: '已上线', status: 'Success' },
              3: { text: '异常', status: 'Error' },
            },
          },
        ]}
        rowKey="key"
        size="small"
        type="form"
        onSubmit={fn}
      />,
    );

    fireEvent.click(container.querySelector('.ant-form button.ant-btn-primary')!);

    await waitFor(() => {
      expect(fn).toHaveBeenCalledTimes(1);
    });

    fireEvent.change(container.querySelectorAll('.ant-form input.ant-input')[0], {
      target: {
        value: 'name',
      },
    });
    fireEvent.click(container.querySelector('.ant-form button.ant-btn-primary')!);
    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith({
        name: 'name',
      });
    });
  });

  it('🎏 table support initialValue', async () => {
    const fn = vi.fn();
    render(
      <ProTable
        columns={[
          {
            title: 'Name',
            key: 'name',
            initialValue: 'name',
            dataIndex: 'name',
          },
          {
            title: '状态',
            dataIndex: 'status',
            hideInForm: true,
            filters: true,
            valueEnum: {
              0: { text: '关闭', status: 'Default' },
              1: { text: '运行中', status: 'Processing' },
              2: { text: '已上线', status: 'Success' },
              3: { text: '异常', status: 'Error' },
            },
          },
        ]}
        request={async (params) => {
          fn({
            name: params.name,
          });
          return { data: [], success: true };
        }}
        rowKey="key"
        size="small"
      />,
    );

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith({
        name: 'name',
      });
    });
  });

  it('🎏 table support initialValues', async () => {
    const fn = vi.fn();
    render(
      <ProTable
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
          },
          {
            title: '状态',
            dataIndex: 'status',
            hideInForm: true,
            filters: true,
            valueEnum: {
              0: { text: '关闭', status: 'Default' },
              1: { text: '运行中', status: 'Processing' },
              2: { text: '已上线', status: 'Success' },
              3: { text: '异常', status: 'Error' },
            },
          },
        ]}
        form={{
          initialValues: {
            name: 'name',
          },
        }}
        request={async (params) => {
          fn({
            name: params.name,
          });
          return { data: [], success: true };
        }}
        rowKey="key"
        size="small"
      />,
    );

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith({
        name: 'name',
      });
    });
  });

  it('🎏 table type=form and formRef', async () => {
    const fn = vi.fn();
    const ref = React.createRef<FormInstance | undefined>();
    const { container } = render(
      <ProTable
        // @ts-ignore
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
          },
          {
            title: '状态',
            dataIndex: 'status',
            hideInForm: true,
            filters: true,
            valueEnum: {
              0: { text: '关闭', status: 'Default' },
              1: { text: '运行中', status: 'Processing' },
              2: { text: '已上线', status: 'Success' },
              3: { text: '异常', status: 'Error' },
            },
          },
        ]}
        // @ts-ignore
        formRef={ref}
        rowKey="key"
        size="small"
        type="form"
        onSubmit={fn}
      />,
    );
    /** 修改值 */
    act(() => {
      ref.current?.setFieldsValue({
        name: 'name',
      });
    });

    fireEvent.click(container.querySelector('.ant-form button.ant-btn-primary')!);

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith({
        name: 'name',
      });
    });
  });

  it('🎏 fieldProps and formItemProps support function', async () => {
    const ref = React.createRef<FormInstance | undefined>();
    const { container } = render(
      <ProTable
        columns={[
          {
            title: 'Name',
            key: 'name',
            fieldProps: {
              id: 'name',
            },
            dataIndex: 'name',
          },
          {
            title: '状态',
            dataIndex: 'status',
            dependencies: ['name'],
            fieldProps: (form) => {
              if (form.getFieldValue?.('name') === 'closed') {
                return {
                  disabled: true,
                  id: 'status',
                };
              }
              return {
                id: 'status',
              };
            },
            formItemProps: (form) => {
              if (form.getFieldValue?.('name') === 'closed') {
                return {
                  noStyle: true,
                };
              }
              return {};
            },
            filters: true,
            valueEnum: {
              0: { text: '关闭', status: 'Default' },
              1: { text: '运行中', status: 'Processing' },
              2: { text: '已上线', status: 'Success' },
              3: { text: '异常', status: 'Error' },
            },
          },
        ]}
        // @ts-ignore
        formRef={ref}
        rowKey="key"
        size="small"
        type="form"
      />,
    );

    act(() => {
      ref.current?.setFieldsValue({
        name: 'closed',
      });
    });

    expect(!!container.querySelectorAll('.ant-select-disabled').length).toBeTruthy();
  });

  it('🎏 make sure formItemProps have the highest priority', async () => {
    const ref = React.createRef<FormInstance | undefined>();
    render(
      <ProTable
        columns={[
          {
            title: 'Name',
            key: 'name',
            fieldProps: {
              id: 'name',
            },
            formItemProps: {
              name: 'changedName',
            },
            dataIndex: 'name',
          },
        ]}
        form={{
          onValuesChange(changedValue) {
            expect(changedValue).toEqual({
              changedName: 'Pro Components',
            });
          },
        }}
        // @ts-ignore
        formRef={ref}
        rowKey="key"
        size="small"
        type="form"
      />,
    );

    act(() => {
      ref.current?.setFieldsValue({
        name: 'Pro Components',
      });
    });
  });
});
