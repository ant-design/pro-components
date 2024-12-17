// import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { cleanup, render } from '@testing-library/react';
import { Button } from 'antd';
import { act, useRef, useState } from 'react';
import { waitForWaitTime } from '../util';

export type TableListItem = {
  key: number;
  name: string;
};

const columns: ProColumns<TableListItem>[] = [
  {
    title: '标题',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'dateTime',
  },
];

// demo
const ProTableSpinDemo = () => {
  const ref = useRef<ProFormInstance>();
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState({ spinning: true, delay: 1000 });
  const [polling, setPolling] = useState<any>(undefined);
  return (
    <ProTable<TableListItem>
      columns={columns}
      loading={loading}
      polling={polling}
      request={() =>
        Promise.resolve({
          data: [
            {
              key: 1,
              name: `TradeCode ${1}`,
              createdAt: new Date(),
            },
          ],
          success: true,
        })
      }
      rowKey="key"
      pagination={{
        showSizeChanger: true,
      }}
      search={{
        collapsed,
        onCollapse: setCollapsed,
      }}
      formRef={ref}
      toolBarRender={() => [
        <Button
          key="set"
          onClick={() => {
            if (polling) {
              setPolling(undefined);
              return;
            }
            setPolling(1000);
          }}
        >
          setPolling
        </Button>,
        <Button
          key="submit"
          onClick={() => {
            if (ref.current) {
              ref.current.submit();
            }
          }}
        >
          提交
        </Button>,
      ]}
      postData={(data: any) => {
        setTimeout(() => {
          setLoading({
            ...loading,
            spinning: false,
          });
        }, 3000);
        return data;
      }}
      options={false}
      dateFormatter="string"
      headerTitle="表单赋值"
    />
  );
};

export default ProTableSpinDemo;

afterEach(() => {
  cleanup();
});

describe('ProTable test', () => {
  it('loading and polling props', async () => {
    const fn = vi.fn();
    const html = render(
      <ProTable
        loading={{ spinning: true, delay: 1000 }}
        polling={2000}
        request={async () => {
          fn();
          return Promise.resolve({
            data: [],
            total: 20,
            success: true,
          });
        }}
      />,
    );
    await waitForWaitTime(1200);
    expect(fn).toBeCalledTimes(1);
    act(() => {
      html.rerender(
        <ProTable
          loading={{ spinning: false, delay: 1000 }}
          polling={undefined}
          request={async () => {
            fn();
            return Promise.resolve({
              data: [],
              total: 20,
              success: true,
            });
          }}
        />,
      );
    });
  });

  it('boolean loading and polling props', async () => {
    const html = render(<ProTable loading={true} polling={2000} />);
    await waitForWaitTime(1200);
    act(() => {
      html.rerender(
        <ProTable
          loading={false}
          polling={undefined}
          request={async () => {
            return Promise.resolve({
              data: [],
              total: 20,
              success: true,
            });
          }}
        />,
      );
    });
  });
});
