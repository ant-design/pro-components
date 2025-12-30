import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { act, cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { Button } from 'antd';
import React, { useRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

type DataItem = {
  id: number;
  keyword?: string;
  status?: string;
};

afterEach(() => {
  cleanup();
});

describe('ProTable actionRef.reset()', () => {
  it('should keep request params in sync with resetFields initialValue', async () => {
    const requestMock = vi.fn(async (params: any) => {
      return Promise.resolve({
        data: [],
        success: true,
        total: 0,
      });
    });

    const columns: ProColumns<DataItem>[] = [
      {
        title: 'Keyword',
        dataIndex: 'keyword',
        initialValue: 'initial-value',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: {
          open: { text: 'Open' },
          closed: { text: 'Closed' },
        },
        initialValue: 'open',
      },
    ];

    const Demo = () => {
      const actionRef = useRef<ActionType>();
      const formRef = useRef<ProFormInstance>();

      return (
        <ProTable<DataItem>
          rowKey="id"
          columns={columns}
          manualRequest
          actionRef={actionRef}
          formRef={formRef}
          request={requestMock as any}
          toolBarRender={() => [
            <Button
              key="set"
              onClick={() => {
                formRef.current?.setFieldsValue({
                  keyword: 'modified',
                  status: 'closed',
                });
              }}
            >
              set
            </Button>,
            <Button
              key="submit"
              onClick={() => {
                formRef.current?.submit?.();
              }}
            >
              submit
            </Button>,
            <Button
              key="reset"
              onClick={() => {
                actionRef.current?.reset?.();
              }}
            >
              reset
            </Button>,
          ]}
        />
      );
    };

    const { getByText } = render(<Demo />);

    act(() => {
      fireEvent.click(getByText('set'));
      fireEvent.click(getByText('submit'));
    });

    await waitFor(() => expect(requestMock).toHaveBeenCalledTimes(1));
    expect(requestMock.mock.calls[0][0]).toMatchObject({
      keyword: 'modified',
      status: 'closed',
    });

    act(() => {
      fireEvent.click(getByText('reset'));
    });

    await waitFor(() => expect(requestMock.mock.calls.length).toBeGreaterThan(1));
    const lastParams = requestMock.mock.calls[requestMock.mock.calls.length - 1][0];
    expect(lastParams).toMatchObject({
      keyword: 'initial-value',
      status: 'open',
    });
  });
});

