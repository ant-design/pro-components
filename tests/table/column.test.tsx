import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import type { RequestOptionsType } from '@xxlabs/pro-components';
import { ProTable } from '@xxlabs/pro-components';
import { ConfigProvider, Table } from 'antd';
import dayjs from 'dayjs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { request } from './demo';

afterEach(() => {
  cleanup();
});

describe('Table ColumnSetting', () => {
  it('🎏 render', async () => {
    const callBack = vi.fn();
    render(
      <ProTable
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
        size="small"
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
        size="small"
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
          columns={[
            {
              title: 'Name',
              key: 'name',
              dataIndex: 'name',
            },
          ]}
          request={request}
          rowKey="key"
          size="small"
        />
      </ConfigProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('🎏 render text', async () => {
    const callBack = vi.fn();
    render(
      <ProTable
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
        size="small"
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
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            renderText: (text) => `${text}2144`,
          },
        ]}
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
        search={false}
        size="small"
      />,
    );

    expect(container.querySelector('td.ant-table-cell')).toMatchSnapshot();
  });

  it('🎏 columns request support params function', async () => {
    const paramsKeys: string[] = [];
    render(
      <ProTable
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
        search={false}
        size="small"
      />,
    );

    expect(paramsKeys.length).toBe(2);
    expect(paramsKeys.join('-')).toBe('1-2');
  });

  it('🎏 extra columns', async () => {
    const { container } = render(
      <ProTable
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
        rowKey="key"
        rowSelection={{}}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('🎏 columns proFieldProps support custom', async () => {
    const selectOptionsRequest = (a: any) => {
      return new Promise<RequestOptionsType[]>((resolve) => {
        setTimeout(() => {
          const data = [
            {
              label: '1',
              value: 1,
            },
            {
              label: '2',
              value: 2,
            },
            {
              label: '3',
              value: 3,
            },
            {
              label: '4',
              value: 4,
            },
          ];
          const result = data.filter((x) => x.value === a);
          resolve(result);
        }, 1000);
      });
    };
    const { container } = render(
      <ProTable
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            valueType: 'select',
            request: async (v) => {
              const { keyWords } = v;
              const result = await selectOptionsRequest(keyWords);
              return result;
            },
            proFieldProps: {
              debounceTime: 1000,
            },
          },
        ]}
        rowKey="key"
      />,
    );

    expect(container).toMatchSnapshot();

    fireEvent.change(container.querySelector('.ant-select-selection-search-input')!, {
      target: {
        value: '1',
      },
    });
    expect(container.querySelectorAll('.ant-select-item')).toHaveLength(0);

    setTimeout(() => {
      expect(container.querySelectorAll('.ant-select-item')).toHaveLength(1);
    }, 1000);
  });
});
