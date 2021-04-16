import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import ProTable from '@ant-design/pro-table';
import type { FormInstance } from 'antd';
import { waitForComponentToPaint } from '../util';

describe('BasicTable Search', () => {
  it('🎏 table type=form', async () => {
    const fn = jest.fn();
    const html = mount(
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
    await waitForComponentToPaint(html, 500);
    act(() => {
      html.find('.ant-form button.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(html);
    expect(fn).toBeCalledTimes(1);

    /** 修改值 */
    act(() => {
      html
        .find('.ant-form input.ant-input')
        .at(0)
        .simulate('change', {
          target: {
            value: 'name',
          },
        });
    });

    act(() => {
      html.find('.ant-form button.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(html);

    expect(fn).toBeCalledWith({
      name: 'name',
    });
  });

  it('🎏 table support initialValue', async () => {
    const fn = jest.fn();
    const html = mount(
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
    await waitForComponentToPaint(html, 1200);

    expect(fn).toBeCalledWith({
      name: 'name',
    });
  });

  it('🎏 table support initialValues', async () => {
    const fn = jest.fn();
    const html = mount(
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
    await waitForComponentToPaint(html, 1200);

    expect(fn).toBeCalledWith({
      name: 'name',
    });
  });

  it('🎏 table type=form and formRef', async () => {
    const fn = jest.fn();
    const ref = React.createRef<FormInstance | undefined>();
    const html = mount(
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
    await waitForComponentToPaint(html, 500);
    /** 修改值 */
    act(() => {
      ref.current?.setFieldsValue({
        name: 'name',
      });
    });

    act(() => {
      html.find('.ant-form button.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(html);

    expect(fn).toBeCalledWith({
      name: 'name',
    });
  });

  it('🎏 fieldProps and formItemProps support function', async () => {
    const ref = React.createRef<FormInstance | undefined>();
    const html = mount(
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
            fieldProps: (form) => {
              if (form.getFieldValue('name') === 'closed') {
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
              if (form.getFieldValue('name') === 'closed') {
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
    await waitForComponentToPaint(html, 1400);

    /** 修改值 */
    act(() => {
      html.find('input#name').simulate('change', {
        target: {
          value: 'closed',
        },
      });
    });
    await waitForComponentToPaint(html, 500);
    expect(html.find('.ant-select-disabled').exists()).toBeTruthy();
  });
});
