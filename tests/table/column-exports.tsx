import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import ProTable from '@ant-design/pro-table';
import { columns } from './demo';
import { waitForComponentToPaint } from '../util';

const delay = (tempstamp: number) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(true);
      }, tempstamp);
    } catch {
      reject(new Error());
    }
  });
};

describe('Table exports', () => {
  it('🎏 exports view', async () => {
    const html = mount(
      <ProTable
        size="small"
        columns={columns}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
        options={{
          export: true,
        }}
      />,
    );
    await waitForComponentToPaint(html);

    const icon = html.find('.ant-pro-table-list-toolbar-setting-item .anticon-download');
    expect(icon.exists()).toBeTruthy();
  });

  it('🎏 exports drop', async () => {
    const html = mount(
      <ProTable
        size="small"
        columns={columns.concat({
          title: 'hide',
          key: 'hide',
          hideInTable: true,
        })}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
        options={{
          export: true,
        }}
      />,
    );
    await waitForComponentToPaint(html);

    act(() => {
      const icon = html.find('.ant-pro-table-list-toolbar-setting-item .anticon-download');
      icon.simulate('click');
    });
    await waitForComponentToPaint(html);
    const overlay = html.find('.ant-pro-table-list-toolbar-setting-item .ant-dropdown-menu');
    expect(overlay.exists()).toBeTruthy();

    const list = html.find('li.ant-dropdown-menu-item');

    expect(list.length).toBe(2);
  });

  it('🎏 exports loading state', async () => {
    const html = mount(
      <ProTable
        size="small"
        columns={columns}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
        options={{
          export: {
            configs: async (columns, dataSource, options) => {
              await delay(1000);

              return [
                {
                  sheetName: 'sheet one',
                  columns,
                  dataSource,
                },
              ];
            },
          },
        }}
      />,
    );
    await waitForComponentToPaint(html);

    act(() => {
      const icon = html.find('.ant-pro-table-list-toolbar-setting-item .anticon-download');
      icon.simulate('click');
    });
    await waitForComponentToPaint(html);
    const loadingIcon = html.find('.ant-pro-table-list-toolbar-setting-item .anticon-loading');
    expect(loadingIcon.exists()).toBeTruthy();
  });

  it('🎏 exports drop loading state', async () => {
    const html = mount(
      <ProTable
        size="small"
        columns={columns.concat({
          title: 'hide',
          key: 'hide',
          hideInTable: true,
        })}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
        options={{
          export: {
            configs: async (columns, dataSource, options) => {
              await delay(1000);

              return [
                {
                  sheetName: 'sheet one',
                  columns,
                  dataSource,
                },
              ];
            },
          },
        }}
      />,
    );
    await waitForComponentToPaint(html);

    act(() => {
      const icon = html.find('.ant-pro-table-list-toolbar-setting-item .anticon-download');
      icon.simulate('click');
    });

    await waitForComponentToPaint(html);

    act(() => {
      const menuItem = html
        .find(
          '.ant-pro-table-list-toolbar-setting-item .ant-dropdown-menu li.ant-dropdown-menu-item',
        )
        .first();
      menuItem.simulate('click');
    });

    await waitForComponentToPaint(html);
    const loadingIcon = html.find('.ant-pro-table-list-toolbar-setting-item .anticon-loading');
    expect(loadingIcon.exists()).toBeTruthy();
  });
});
