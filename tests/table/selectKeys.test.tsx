import ProTable from '@ant-design/pro-table';
import { act, render, waitFor } from '@testing-library/react';
import React, { useState } from 'react';
import { waitForWaitTime } from '../util';
import { getFetchData } from './demo';

describe('BasicTable Search', () => {
  const LINE_STR_COUNT = 20;
  // Mock offsetHeight
  // @ts-expect-error
  const originOffsetHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetHeight',
  ).get;
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    get() {
      let html = this.innerHTML;
      html = html.replace(/<[^>]*>/g, '');
      const lines = Math.ceil(html.length / LINE_STR_COUNT);
      return lines * 16;
    },
  });

  // Mock getComputedStyle
  const originGetComputedStyle = window.getComputedStyle;
  window.getComputedStyle = (ele) => {
    const style = originGetComputedStyle(ele);
    style.lineHeight = '16px';
    return style;
  };

  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      get: originOffsetHeight,
    });
    window.getComputedStyle = originGetComputedStyle;
  });

  it('🎏 filter test', async () => {
    const fn = jest.fn();
    const html = render(
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
        rowSelection={{
          onChange: fn,
        }}
        dataSource={getFetchData(60)}
        rowKey="key"
      />,
    );
    await waitForWaitTime(200);
    act(() => {
      html.baseElement
        .querySelectorAll<HTMLInputElement>(
          '.ant-table-cell label.ant-checkbox-wrapper input',
        )[1]
        ?.click();
    });
    await waitForWaitTime(200);
    expect(fn).toBeCalledTimes(1);
  });

  it('✔️ selected rows support row is function', async () => {
    const fn = jest.fn();
    const DemoTable = () => {
      const columns = [
        {
          title: '名字',
          dataIndex: 'name',
        },
        {
          title: '年龄',
          dataIndex: 'age',
        },
        {
          title: '编号',
          dataIndex: 'id',
        },
      ];
      const dataSource = [
        {
          name: '张三',
          age: 18,
          id: '001',
        },
        {
          name: '李四',
          age: 19,
          id: '002',
        },
      ];
      const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([
        '001',
        '002',
      ]);
      return (
        <ProTable
          columns={columns}
          dataSource={dataSource}
          rowKey={(record) => record.id}
          rowSelection={{
            selectedRowKeys,
            onChange: (newSelectedRowKeys) => {
              setSelectedRowKeys(newSelectedRowKeys);
            },
          }}
          tableAlertOptionRender={false}
          tableAlertRender={({ selectedRows }) => {
            const text = selectedRows.map((row) => row.name).join(',');
            fn(text);
            return <div>{text}</div>;
          }}
        />
      );
    };

    render(<DemoTable />);

    await waitFor(() => {
      expect(fn).toBeCalledWith('张三,李四');
    });
  });
});
