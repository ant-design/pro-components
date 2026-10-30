import { ProTable } from '@ant-design/pro-components';
import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import { act } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

/**
 * #9781 ProTable 搜索字段配置 initialValue + search.transform 后：
 * 首屏自动请求走的是 onInit 的 formatValue（只格式化日期，不执行 transform），
 * 手动点击搜索走的是 getFieldsFormatValue（执行 transform），
 * 导致两次请求的参数结构不一致。
 * 期望：首屏请求也执行 transform，与手动搜索结果保持一致。
 */
describe('#9781 ProTable 初始化搜索条件时执行字段 transform', () => {
  it('首屏请求与手动搜索的 transform 结果一致', async () => {
    const request = vi.fn(async (_params: any) => ({
      data: [],
      success: true,
    }));
    const day = dayjs().startOf('day').format('YYYYMMDD');

    render(
      <ProTable
        request={request}
        dateFormatter={(value: any) => value.format('YYYYMMDD')}
        columns={[
          {
            title: '创建时间',
            dataIndex: 'createdDateRange',
            valueType: 'dateRange',
            initialValue: [dayjs().startOf('day'), dayjs().endOf('day')],
            search: {
              transform: (value: any) => ({
                startCreatedDate: Number(value?.[0]),
                endCreatedDate: Number(value?.[1]),
              }),
            },
          },
        ]}
      />,
    );

    await waitForWaitTime(1500);

    // 首屏自动请求就应该带上 transform 后的参数
    const firstParams = request.mock.calls[0]?.[0] ?? {};
    expect(firstParams.startCreatedDate).toBe(Number(day));
    expect(firstParams.endCreatedDate).toBe(Number(day));
    // transform 之后不应该再有原始字段
    expect('createdDateRange' in firstParams).toBe(false);

    // 手动搜索的参数结构与首屏保持一致
    await act(async () => {
      screen.getByText('查 询').click();
    });
    await waitForWaitTime(800);

    const lastParams =
      request.mock.calls[request.mock.calls.length - 1]?.[0] ?? {};
    expect(lastParams.startCreatedDate).toBe(Number(day));
    expect(lastParams.endCreatedDate).toBe(Number(day));
    expect('createdDateRange' in lastParams).toBe(false);
  });

  it('没有配置 transform 的搜索字段首屏参数保持原样', async () => {
    const request = vi.fn(async (_params: any) => ({
      data: [],
      success: true,
    }));

    render(
      <ProTable
        request={request}
        columns={[
          {
            title: '名称',
            dataIndex: 'name',
            initialValue: 'foo',
          },
        ]}
      />,
    );

    await waitForWaitTime(1500);

    const firstParams = request.mock.calls[0]?.[0] ?? {};
    expect(firstParams.name).toBe('foo');
  });
});
