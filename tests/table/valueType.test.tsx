import React from 'react';
import ProTable from '@ant-design/pro-table';
import { Input } from 'antd';
import ProProvider from '@ant-design/pro-provider';
import { render as reactRender, act } from '@testing-library/react';

import { waitForComponentToPaint } from '../util';

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
    const html = reactRender(
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

    expect((await html.findAllByText('TradeCode 0')).length).toBe(1);

    expect(!!html.asFragment().querySelector('input#name')).toBeTruthy();

    expect((html.asFragment().querySelector('input#name') as HTMLInputElement).value).toBe(
      'TradeCode',
    );

    act(() => {
      html.unmount();
    });
  });

  it('🎏 table valueType render support fieldProps', async () => {
    const html = reactRender(
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

    expect((await html.findAllByText('TradeCode 0red')).length).toBe(1);

    expect(!!html.asFragment().querySelector('input#name')).toBeTruthy();

    expect((html.asFragment().querySelector('input#name') as HTMLInputElement).value).toBe(
      'TradeCode',
    );

    act(() => {
      html.unmount();
    });
  });
});
