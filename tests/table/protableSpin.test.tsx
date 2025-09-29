// import { afterEach, describe, expect, test, vi } from 'vitest'; import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';import { afterEach, describe, expect, test, vi } from 'vitest'; import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import type { ProColumns, ProFormInstance } from '@xxlabs/pro-components';
import { ProTable } from '@xxlabs/pro-components';
import { Button } from 'antd';
import { act, useRef, useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
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
  const ref = useRef<ProFormInstance>(undefined);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState({ spinning: true, delay: 1000 });
  const [polling, setPolling] = useState<any>(undefined);
  return (
    <ProTable<TableListItem>
      columns={columns}
      dateFormatter="string"
      formRef={ref}
      headerTitle="表单赋值"
      loading={loading}
      options={false}
      pagination={{
        showSizeChanger: true,
      }}
      polling={polling}
      postData={(data: any) => {
        setTimeout(() => {
          setLoading({
            ...loading,
            spinning: false,
          });
        }, 3000);
        return data;
      }}
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
      search={{
        collapsed,
        onCollapse: setCollapsed,
      }}
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
    expect(fn).toHaveBeenCalledTimes(1);
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
