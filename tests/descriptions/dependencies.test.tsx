import { ProDescriptions } from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

describe('ProDescriptions dependencies (#9170)', () => {
  it('dependencies inject dependency values into request params', async () => {
    const requestFn = vi.fn(async (params: any) => {
      return [
        { label: `t-${params?.type}`, value: 'a' },
        { label: `t-${params?.type}`, value: 'b' },
      ];
    });

    render(
      <ProDescriptions
        dataSource={{ type: '回家', dselect: 2 }}
        columns={[
          { title: '类型', dataIndex: 'type' },
          {
            title: '下拉',
            dataIndex: 'dselect',
            valueType: 'select',
            dependencies: ['type'],
            request: requestFn,
          },
        ]}
      />,
    );

    await waitForWaitTime(500);

    expect(requestFn).toHaveBeenCalled();
    expect(requestFn.mock.calls[0]?.[0]).toMatchObject({ type: '回家' });
    // keyWords 是 Select 搜索词，始终存在
    expect(requestFn.mock.calls[0]?.[0]).toHaveProperty('keyWords');
  });

  it('nested dependency paths inject nested values', async () => {
    const requestFn = vi.fn(async (params: any) => {
      return [{ label: 'a', value: 'a' }];
    });

    render(
      <ProDescriptions
        dataSource={{ a: { b: 'B' }, dselect: 1 }}
        columns={[
          {
            title: 'S',
            dataIndex: 'dselect',
            valueType: 'select',
            dependencies: [['a', 'b']],
            request: requestFn,
          },
        ]}
      />,
    );

    await waitForWaitTime(500);

    expect(requestFn).toHaveBeenCalled();
    expect(requestFn.mock.calls[0]?.[0]).toMatchObject({ a: { b: 'B' } });
  });

  it('without dependencies, request params stay unchanged', async () => {
    const requestFn = vi.fn(async (params: any) => {
      return [{ label: 'a', value: 'a' }];
    });

    render(
      <ProDescriptions
        dataSource={{ type: '回家', dselect: 2 }}
        columns={[
          {
            title: '下拉',
            dataIndex: 'dselect',
            valueType: 'select',
            request: requestFn,
          },
        ]}
      />,
    );

    await waitForWaitTime(500);

    expect(requestFn).toHaveBeenCalled();
    const firstCall = requestFn.mock.calls[0]?.[0];
    expect(firstCall).not.toHaveProperty('type');
  });
});
