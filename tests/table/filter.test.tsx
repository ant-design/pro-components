import ProTable from '@ant-design/pro-table';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getFetchData } from './demo';

afterEach(() => {
  cleanup();
});

describe('BasicTable Search', () => {
  it('🎏 filter test', async () => {
    const fn = vi.fn();
    const { container } = render(
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

    await userEvent.click(
      container.querySelector('span.ant-table-filter-trigger')!,
    );
    fireEvent.click(screen.getAllByText('关闭')[1], {
      target: {
        checked: true,
      },
    });
    await userEvent.click(await screen.findByText('确 定'));

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('🎏 filter test', async () => {
    const fn = vi.fn();
    const { container } = render(
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
            defaultFilteredValue: [0, '1'],
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

    await userEvent.click(
      container.querySelector('span.ant-table-filter-trigger')!,
    );
    fireEvent.click(screen.getByText('关闭'), {
      target: {
        checked: true,
      },
    });
    await userEvent.click(await screen.findByText('确 定'));

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('🎏 filter test by namePath is array', async () => {
    const fn = vi.fn();
    const { container } = render(
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
            defaultFilteredValue: [0],
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

    await userEvent.click(
      container.querySelector('span.ant-table-filter-trigger')!,
    );
    await userEvent.click(
      container.querySelectorAll(
        '.ant-table-filter-dropdown .ant-dropdown-menu-item',
      )[0],
    );
    await userEvent.click(
      container.querySelector(
        '.ant-table-filter-dropdown-btns .ant-btn.ant-btn-primary.ant-btn-sm',
      )!,
    );

    expect(fn).toHaveBeenCalled();
    await userEvent.click(
      container.querySelector('span.ant-table-filter-trigger')!,
    );
    await userEvent.click(
      container.querySelectorAll(
        '.ant-table-filter-dropdown .ant-dropdown-menu-item',
      )[0],
    );
    await userEvent.click(
      container.querySelector(
        '.ant-table-filter-dropdown-btns .ant-btn.ant-btn-primary.ant-btn-sm',
      )!,
    );

    expect(fn).toHaveBeenCalled();
  });

  it('🎏 order multiple test', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProTable<{ money: number }>
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

    await userEvent.click(
      container.querySelectorAll('span.ant-table-column-sorter-down')[0],
    );
    await userEvent.click(
      container.querySelectorAll('span.ant-table-column-sorter-up')[1],
    );
    await userEvent.click(
      container.querySelectorAll('span.ant-table-column-sorter-down')[0],
    );
    await userEvent.click(
      container.querySelectorAll('span.ant-table-column-sorter-down')[1],
    );

    expect(fn).toBeCalledTimes(4);
  });

  it('🎏 order test', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProTable<{ money: number }>
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

    await userEvent.click(
      container.querySelectorAll('span.ant-table-column-sorter-down')[0],
    );
    await userEvent.click(
      container.querySelectorAll('span.ant-table-column-sorter-up')[1],
    );
    await userEvent.click(
      container.querySelectorAll('span.ant-table-column-sorter-down')[0],
    );
    await userEvent.click(
      container.querySelectorAll('span.ant-table-column-sorter-down')[1],
    );

    expect(fn).toHaveBeenCalledTimes(4);
  });
});
