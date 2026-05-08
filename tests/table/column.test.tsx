import { ProTable } from '@ant-design/pro-components';
import { cleanup, render, waitFor } from '@testing-library/react';
import { Badge, ConfigProvider, Table } from 'antd';
import dayjs from 'dayjs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { request } from './fixtures';

afterEach(() => {
  cleanup();
});

describe('Table ColumnSetting', () => {
  it('🎏 render', async () => {
    const callBack = vi.fn();
    render(
      <ProTable
        size="small"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            render: (text) => callBack(text),
          },
        ]}
        request={request}
        rowKey="key"
      />,
    );

    await waitFor(() => {
      expect(callBack).toHaveBeenCalled();
      expect(callBack).toHaveBeenCalledWith('Edward King 0');
    });
  });

  it('🎏 query should parse by valueType', async () => {
    const callBack = vi.fn();
    render(
      <ProTable
        size="small"
        columns={[
          {
            title: 'date',
            key: 'date',
            dataIndex: 'date',
            valueType: 'date',
          },
        ]}
        form={{
          initialValues: {
            date: dayjs(),
          },
        }}
        request={async (params) => {
          callBack(params.date);
          return {
            data: [
              {
                key: '1',
                date: dayjs(),
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );

    await waitFor(() => {
      expect(callBack).toHaveBeenCalled();
      expect(callBack).toHaveBeenCalledWith('2016-11-22');
    });
  });

  it('🎏 config provide render', async () => {
    const { container } = render(
      <ConfigProvider prefixCls="qixian">
        <ProTable
          size="small"
          columns={[
            {
              title: 'Name',
              key: 'name',
              dataIndex: 'name',
            },
          ]}
          request={request}
          rowKey="key"
        />
      </ConfigProvider>,
    );

    // ConfigProvider prefixCls 应正确传递到 ProTable
    expect(container.querySelector('.qixian-table')).toBeTruthy();
    expect(container.querySelector('.qixian-table-wrapper')).toBeTruthy();
  });

  it('🎏 render text', async () => {
    const callBack = vi.fn();
    render(
      <ProTable
        size="small"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            renderText: (text) => callBack(text),
          },
          {
            title: 'Name2',
            key: 'name2',
            dataIndex: 'name2',
            valueType: false,
          },
        ]}
        request={request}
        rowKey="key"
      />,
    );

    await waitFor(() => {
      expect(callBack).toHaveBeenCalled();
      expect(callBack).toHaveBeenCalledWith('Edward King 0');
    });
  });

  it('🎏 change text by renderText', async () => {
    const { container } = render(
      <ProTable
        size="small"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            renderText: (text) => `${text}2144`,
          },
        ]}
        search={false}
        dataSource={[
          {
            key: '1',
            name: 'Edward King',
            age: 10,
            status: 1,
            sex: 'man',
          },
        ]}
        rowKey="key"
      />,
    );

    // renderText 应将文本追加 '2144'
    const cellElement = container.querySelector('td.ant-table-cell');
    expect(cellElement).toBeTruthy();
    expect(cellElement?.textContent).toContain('Edward King2144');
  });

  it('🎏 columns request support params function', async () => {
    const paramsKeys: string[] = [];
    render(
      <ProTable
        size="small"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            renderText: (text) => `${text}2144`,
          },

          {
            title: 'Name',
            key: 'name',
            valueType: 'select',
            dataIndex: 'name',
            params: (rowData) => {
              return {
                key: rowData.key,
              };
            },
            request: async (params) => {
              paramsKeys.push(params.key);
              return [];
            },
          },
        ]}
        search={false}
        dataSource={[
          {
            key: '1',
            name: 'Edward King',
            age: 10,
            status: 1,
            sex: 'man',
          },
          {
            key: '2',
            name: 'Edward King',
            age: 10,
            status: 1,
            sex: 'man',
          },
        ]}
        rowKey="key"
      />,
    );

    expect(paramsKeys.length).toBe(2);
    expect(paramsKeys.join('-')).toBe('1-2');
  });

  it('🎏 extra columns', async () => {
    const { container } = render(
      <ProTable
        rowKey="key"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
          },
          Table.EXPAND_COLUMN,
          Table.SELECTION_COLUMN,
        ]}
        dataSource={[
          {
            key: '1',
            name: 'Name 1',
          },
          {
            key: '2',
            name: 'Name 2',
          },
        ]}
        expandable={{
          expandedRowRender: (record) => <div>{record.name}</div>,
        }}
        rowSelection={{}}
      />,
    );

    // 应正确渲染 Table.EXPAND_COLUMN 和 Table.SELECTION_COLUMN
    expect(container.querySelector('.ant-table')).toBeTruthy();
    // 应有 2 行数据
    expect(container.querySelectorAll('.ant-table-row').length).toBe(2);
    // 应渲染展开列和选择列
    expect(container.querySelector('.ant-table-selection-column')).toBeTruthy();
    expect(
      container.querySelector('.ant-table-row-expand-icon-cell'),
    ).toBeTruthy();
    // 应渲染 Name 列数据（验证 tbody 中包含数据文本）
    const tbody = container.querySelector('.ant-table-tbody');
    expect(tbody?.textContent).toContain('Name 1');
    expect(tbody?.textContent).toContain('Name 2');
  });

  it('🐛 copyable 单元格中文复制不应带尾部空格', async () => {
    const { container } = render(
      <ProTable
        search={false}
        toolBarRender={false}
        columns={[
          {
            title: '名称',
            dataIndex: 'name',
            copyable: true,
          },
        ]}
        dataSource={[
          {
            key: '1',
            name: '中文',
          },
        ]}
        rowKey="key"
      />,
    );

    await waitFor(() => {
      expect(container.querySelector('tbody td')?.textContent).toContain(
        '中文',
      );
    });

    const td = container.querySelector('tbody td')!;
    const text = td.textContent || '';

    // When selecting/copying the cell text, trailing whitespace should not exist.
    expect(text).toBe(text.trimEnd());
    expect(text.endsWith('\u00a0')).toBe(false);
  });

  it('🐛 ellipsis tooltip 不显示 [object Object] 当 renderText 返回 JSX', async () => {
    const { container } = render(
      <ProTable
        search={false}
        toolBarRender={false}
        columns={[
          {
            title: '手机号',
            dataIndex: 'phone',
            width: 80,
            ellipsis: true,
            renderText: (text, row) =>
              text ? (
                <span>
                  {row.phoneVerified ? (
                    <Badge status="success" />
                  ) : (
                    <Badge status="error" />
                  )}
                  &nbsp;
                  {text}
                </span>
              ) : (
                text
              ),
          },
        ]}
        dataSource={[
          {
            key: '1',
            phone: '13800138000',
            phoneVerified: true,
          },
        ]}
        rowKey="key"
      />,
    );

    await waitFor(() => {
      expect(container.querySelector('tbody td')?.textContent).toContain(
        '13800138000',
      );
    });

    // 修复：renderText 返回 JSX 时 ellipsis tooltip 不应显示 [object Object]
    expect(container.innerHTML).not.toContain('[object Object]');
  });
});
