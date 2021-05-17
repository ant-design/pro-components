import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import ProTable from '@ant-design/pro-table';
import { getFetchData } from './demo';
import { waitForComponentToPaint } from '../util';

describe('BasicTable Search', () => {
  it('🎏 filter test', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'money',
          },
          {
            title: '状态',
            dataIndex: 'status',
            filters: true,
            onFilter: true,
            valueEnum: {
              0: { text: '关闭', status: 'Default' },
              1: { text: '运行中', status: 'Processing' },
              2: { text: '已上线', status: 'Success' },
              3: { text: '异常', status: 'Error' },
            },
          },
        ]}
        onChange={fn}
        dataSource={[
          {
            status: 0,
            money: '1',
            key: '2',
          },
          {
            money: '2',
            status: 1,
            key: '1',
          },
        ]}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 200);

    act(() => {
      html.find('span.ant-table-filter-trigger').simulate('click');
    });

    await waitForComponentToPaint(html, 800);
    act(() => {
      html.find('.ant-table-filter-dropdown').debug();
      html.find('span.ant-table-filter-trigger').simulate('click');
      html
        .find('.ant-table-filter-dropdown .ant-dropdown-menu-item')
        .at(0)
        .simulate('click', {
          target: {
            checked: true,
          },
        });
    });

    await waitForComponentToPaint(html, 500);
    act(() => {
      html
        .find('.ant-table-filter-dropdown-btns .ant-btn.ant-btn-primary.ant-btn-sm')
        .simulate('click');
    });

    await waitForComponentToPaint(html, 500);
    expect(fn).toBeCalledTimes(1);
  });

  it('🎏 filter test', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'money',
          },
          {
            title: '状态',
            dataIndex: ['name', 'status'],
            filters: true,
            onFilter: true,
            valueEnum: {
              0: { text: '关闭', status: 'Default' },
              1: { text: '运行中', status: 'Processing' },
              2: { text: '已上线', status: 'Success' },
              3: { text: '异常', status: 'Error' },
            },
            defaultFilteredValue: ['0', '1'],
          },
        ]}
        onChange={fn}
        dataSource={[
          {
            status: 0,
            money: '1',
            key: '1',
          },
          {
            money: '2',
            status: 1,
            key: '2',
          },
        ]}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 200);

    act(() => {
      html.find('span.ant-table-filter-trigger').simulate('click');
    });

    await waitForComponentToPaint(html, 800);
    act(() => {
      html.find('.ant-table-filter-dropdown').debug();
      html.find('span.ant-table-filter-trigger').simulate('click');
      html
        .find('.ant-table-filter-dropdown .ant-dropdown-menu-item')
        .at(0)
        .simulate('click', {
          target: {
            checked: true,
          },
        });
    });

    await waitForComponentToPaint(html, 500);
    act(() => {
      html
        .find('.ant-table-filter-dropdown-btns .ant-btn.ant-btn-primary.ant-btn-sm')
        .simulate('click');
    });

    await waitForComponentToPaint(html, 500);
    expect(fn).toBeCalledTimes(1);
  });

  it('🎏 filter test by namePath is array', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: ['name', 'money'],
          },
          {
            title: '状态',
            dataIndex: 'status',
            filters: [{ text: '关闭', value: 0 }],
            onFilter: true,
            valueEnum: {
              0: { text: '关闭', status: 'Default' },
              1: { text: '运行中', status: 'Processing' },
              2: { text: '已上线', status: 'Success' },
              3: { text: '异常', status: 'Error' },
            },
            defaultFilteredValue: ['0'],
          },
        ]}
        request={async (_, sort, filter) => {
          if (filter.status) {
            fn();
          }
          return {
            total: 2,
            success: true,
            data: [
              {
                name: {
                  status: 0,
                  money: '1',
                },
                key: '2',
              },
              {
                name: {
                  money: '2',
                  status: 1,
                },
                key: '1',
              },
            ],
          };
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 200);

    act(() => {
      html.find('span.ant-table-filter-trigger').simulate('click');
    });

    await waitForComponentToPaint(html, 800);
    act(() => {
      html.find('.ant-table-filter-dropdown').debug();
      html.find('span.ant-table-filter-trigger').simulate('click');
      html
        .find('.ant-table-filter-dropdown .ant-dropdown-menu-item')
        .at(0)
        .simulate('click', {
          target: {
            checked: false,
          },
        });
    });

    await waitForComponentToPaint(html, 500);
    act(() => {
      html
        .find('.ant-table-filter-dropdown-btns .ant-btn.ant-btn-primary.ant-btn-sm')
        .simulate('click');
    });

    await waitForComponentToPaint(html, 200);
    act(() => {
      html.find('span.ant-table-filter-trigger').simulate('click');
    });

    await waitForComponentToPaint(html, 800);
    act(() => {
      html.find('.ant-table-filter-dropdown').debug();
      html.find('span.ant-table-filter-trigger').simulate('click');
      html
        .find('.ant-table-filter-dropdown .ant-dropdown-menu-item')
        .at(0)
        .simulate('click', {
          target: {
            checked: true,
          },
        });
    });

    await waitForComponentToPaint(html, 500);
    act(() => {
      html
        .find('.ant-table-filter-dropdown-btns .ant-btn.ant-btn-primary.ant-btn-sm')
        .simulate('click');
    });

    await waitForComponentToPaint(html, 500);
    expect(fn).toBeCalledTimes(2);
  });

  it('🎏 order multiple test', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProTable<{ money: number }, {}>
        size="small"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            sorter: {
              compare: (a, b) => a.money - b.money,
              multiple: 3,
            },
            defaultSortOrder: 'descend',
          },
          {
            title: 'money',
            key: 'money',
            dataIndex: 'money',
            sorter: {
              compare: (a, b) => a.money - b.money,
              multiple: 3,
            },
            defaultSortOrder: 'ascend',
          },
          {
            title: '状态',
            dataIndex: 'status',
            hideInForm: true,
            filters: true,
            onFilter: true,
            valueEnum: {
              0: { text: '关闭', status: 'Default' },
              1: { text: '运行中', status: 'Processing' },
              2: { text: '已上线', status: 'Success' },
              3: { text: '异常', status: 'Error' },
            },
          },
        ]}
        onChange={fn}
        dataSource={getFetchData(5)}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 200);

    act(() => {
      html.find('span.ant-table-column-sorter-down').at(0).simulate('click');
    });
    await waitForComponentToPaint(html, 800);
    act(() => {
      html.find('span.ant-table-column-sorter-up').at(1).simulate('click');
    });

    await waitForComponentToPaint(html, 800);

    act(() => {
      html.find('span.ant-table-column-sorter-down').at(0).simulate('click');
      html.find('span.ant-table-column-sorter-down').at(1).simulate('click');
    });

    await waitForComponentToPaint(html, 500);
    expect(fn).toBeCalledTimes(4);
  });

  it('🎏 order test', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProTable<{ money: number }, {}>
        size="small"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            sorter: (a, b) => a.money - b.money,
            defaultSortOrder: 'descend',
          },
          {
            title: 'money',
            key: 'money',
            dataIndex: 'money',
            sorter: (a, b) => a.money - b.money,
          },
          {
            title: '状态',
            dataIndex: 'status',
            hideInForm: true,
            filters: true,
            onFilter: true,
            valueEnum: {
              0: { text: '关闭', status: 'Default' },
              1: { text: '运行中', status: 'Processing' },
              2: { text: '已上线', status: 'Success' },
              3: { text: '异常', status: 'Error' },
            },
          },
        ]}
        onChange={fn}
        dataSource={getFetchData(5)}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 200);

    act(() => {
      html.find('span.ant-table-column-sorter-down').at(0).simulate('click');
    });
    await waitForComponentToPaint(html, 800);
    act(() => {
      html.find('span.ant-table-column-sorter-up').at(1).simulate('click');
    });

    await waitForComponentToPaint(html, 800);

    act(() => {
      html.find('span.ant-table-column-sorter-down').at(0).simulate('click');
      html.find('span.ant-table-column-sorter-down').at(1).simulate('click');
    });

    await waitForComponentToPaint(html, 500);
    expect(fn).toBeCalledTimes(4);
  });
});
