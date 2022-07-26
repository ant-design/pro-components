import ProTable from '@ant-design/pro-table';
import { ConfigProvider, Table } from 'antd';
import dayjs from 'dayjs';
import { mount } from 'enzyme';
import type { RequestOptionsType } from 'packages/utils/src/typing';
import { act } from 'react-dom/test-utils';
import { waitForComponentToPaint } from '../util';
import { request } from './demo';

describe('Table ColumnSetting', () => {
  it('🎏 render', async () => {
    const callBack = jest.fn();
    const html = mount(
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
    await waitForComponentToPaint(html, 1200);
    expect(callBack).toBeCalled();
    expect(callBack).toBeCalledWith('Edward King 0');
  });

  it('🎏 query should parse by valueType', async () => {
    const callBack = jest.fn();
    const html = mount(
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
          console.log(params);
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
    await waitForComponentToPaint(html, 1000);
    expect(callBack).toBeCalled();
    expect(callBack).toBeCalledWith('2016-11-22');
  });

  it('🎏 config provide render', async () => {
    const html = mount(
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
    await waitForComponentToPaint(html, 1200);
    expect(html.render()).toMatchSnapshot();
  });

  it('🎏 render text', async () => {
    const callBack = jest.fn();
    const html = mount(
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
    await waitForComponentToPaint(html, 1200);
    expect(callBack).toBeCalled();
    expect(callBack).toBeCalledWith('Edward King 0');
  });

  it('🎏 change text by renderText', async () => {
    const html = mount(
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
    await waitForComponentToPaint(html, 1200);
    expect(html.find('td.ant-table-cell').text()).toMatchSnapshot();
  });

  it('🎏 columns request support params function', async () => {
    const paramsKeys: string[] = [];
    const html = mount(
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
    await waitForComponentToPaint(html, 1200);

    expect(paramsKeys.length).toBe(2);
    expect(paramsKeys.join('-')).toBe('1-2');
  });

  it('🎏 extra columns', async () => {
    const html = mount(
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
    await waitForComponentToPaint(html, 1200);
    expect(html.render()).toMatchSnapshot();
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
    const html = mount(
      <ProTable
        rowKey="key"
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
      />,
    );
    await waitForComponentToPaint(html, 1200);
    expect(html.render()).toMatchSnapshot();
    await act(async () => {
      html
        .find('.ant-select-selection-search-input')
        .simulate('change', { target: { value: '1' } });
    });
    const startCount = html.find('.ant-select-item').length;
    expect(startCount).toBe(0);
    setTimeout(() => {
      const count = html.find('.ant-select-item').length;
      expect(count).toBe(1);
    }, 1000);
  });
});
