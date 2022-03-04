import { mount } from 'enzyme';
import React from 'react';
import ProTable from '@ant-design/pro-table';
import { Input } from 'antd';
import ProProvider from '@ant-design/pro-provider';

import { waitForComponentToPaint } from '../util';
import { act } from 'react-dom/test-utils';

const defaultProps = {
  columns: [
    {
      title: '标签',
      dataIndex: 'name',
      key: 'name',
      valueType: 'link',
      fieldProps: {
        color: 'red',
      },
    },
  ],
  rowKey: 'key',
  request: () => {
    return Promise.resolve({
      total: 200,
      data: [
        {
          key: 0,
          name: 'TradeCode 0',
        },
      ],
      success: true,
    });
  },
};

describe('BasicTable valueType', () => {
  it('🎏 table support user valueType', async () => {
    const html = mount(
      <ProProvider.Provider
        value={
          {
            valueTypeMap: {
              link: {
                render: (text: any) => <a id="link">{text}</a>,
                renderFormItem: (_: any, props: any) => (
                  <Input placeholder="请输入链接" id="name" {...props?.fieldProps} />
                ),
              },
            },
          } as any
        }
      >
        <ProTable
          form={{
            initialValues: { name: 'TradeCode' },
          }}
          {...defaultProps}
        />
      </ProProvider.Provider>,
    );
    await waitForComponentToPaint(html, 1200);

    expect(html.find('#link').text()).toBe('TradeCode 0');

    expect(html.find('input#name').exists()).toBeTruthy();

    expect(html.find('input#name').props().value).toBe('TradeCode');

    act(() => {
      html.unmount();
    });
  });

  it('🎏 table valueType render support fieldProps', async () => {
    const html = mount(
      <ProProvider.Provider
        value={
          {
            valueTypeMap: {
              link: {
                render: (text: any, { fieldProps }: any) => (
                  <a id="link">
                    {text}
                    {fieldProps.color}
                  </a>
                ),
                renderFormItem: (_: any, props: any) => (
                  <Input placeholder="请输入链接" id="name" {...props?.fieldProps} />
                ),
              },
            },
          } as any
        }
      >
        <ProTable
          form={{
            initialValues: { name: 'TradeCode' },
          }}
          {...defaultProps}
        />
      </ProProvider.Provider>,
    );
    await waitForComponentToPaint(html, 1200);

    expect(html.find('#link').text()).toBe('TradeCode 0red');

    expect(html.find('input#name').exists()).toBeTruthy();

    expect(html.find('input#name').props().color).toBe('red');

    act(() => {
      html.unmount();
    });
  });
});
