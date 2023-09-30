import ProTable from '@ant-design/pro-table';
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';
import type { FormInstance } from 'antd';
import React from 'react';

afterEach(() => {
  cleanup();
});

describe('BasicTable Search', () => {
  it('🎏 table type=form', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProTable
        type="form"
        size="small"
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
        onSubmit={fn}
        rowKey="key"
      />,
    );

    fireEvent.click(
      container.querySelector('.ant-form button.ant-btn-primary')!,
    );

    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
    });

    fireEvent.change(
      container.querySelectorAll('.ant-form input.ant-input')[0],
      {
        target: {
          value: 'name',
        },
      },
    );
    fireEvent.click(
      container.querySelector('.ant-form button.ant-btn-primary')!,
    );
    await waitFor(() => {
      expect(fn).toBeCalledWith({
        name: 'name',
      });
    });
  });

  it('🎏 table support initialValue', async () => {
    const fn = vi.fn();
    render(
      <ProTable
        size="small"
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
      />,
    );

    await waitFor(() => {
      expect(fn).toBeCalledWith({
        name: 'name',
      });
    });
  });

  it('🎏 table support initialValues', async () => {
    const fn = vi.fn();
    render(
      <ProTable
        size="small"
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
        request={async (params) => {
          fn({
            name: params.name,
          });
          return { data: [], success: true };
        }}
        rowKey="key"
        form={{
          initialValues: {
            name: 'name',
          },
        }}
      />,
    );

    await waitFor(() => {
      expect(fn).toBeCalledWith({
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
        formRef={ref}
        type="form"
        size="small"
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
        onSubmit={fn}
        rowKey="key"
      />,
    );
    /** 修改值 */
    act(() => {
      ref.current?.setFieldsValue({
        name: 'name',
      });
    });

    fireEvent.click(
      container.querySelector('.ant-form button.ant-btn-primary')!,
    );

    await waitFor(() => {
      expect(fn).toBeCalledWith({
        name: 'name',
      });
    });
  });

  it('🎏 fieldProps and formItemProps support function', async () => {
    const ref = React.createRef<FormInstance | undefined>();
    const { container } = render(
      <ProTable
        type="form"
        // @ts-ignore
        formRef={ref}
        size="small"
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
        rowKey="key"
      />,
    );

    act(() => {
      ref.current?.setFieldsValue({
        name: 'closed',
      });
    });

    expect(
      !!container.querySelectorAll('.ant-select-disabled').length,
    ).toBeTruthy();
  });

  it('🎏 make sure formItemProps have the highest priority', async () => {
    const ref = React.createRef<FormInstance | undefined>();
    render(
      <ProTable
        type="form"
        // @ts-ignore
        formRef={ref}
        size="small"
        form={{
          onValuesChange(changedValue) {
            expect(changedValue).toEqual({
              changedName: 'Pro Components',
            });
          },
        }}
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
        rowKey="key"
      />,
    );

    act(() => {
      ref.current?.setFieldsValue({
        name: 'Pro Components',
      });
    });
  });
});
