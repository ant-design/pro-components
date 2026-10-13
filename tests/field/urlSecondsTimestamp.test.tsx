import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ProTable } from '../../src';
import { parseValueToDay } from '../../src/utils/parseValueToMoment';

/**
 * #8810:syncToUrl 回填秒级时间戳(10 位)时 date 相关 valueType 应能正常显示。
 */
describe('#8810 seconds timestamp from url', () => {
  it('parseValueToDay parses 10-digit seconds string', () => {
    const d = parseValueToDay('1728403200') as any;
    expect(d.isValid()).toBe(true);
    expect(d.year()).toBe(2024);
    expect(d.format('YYYY-MM-DD')).toBe('2024-10-08');
  });

  it('parseValueToDay parses 13-digit ms string as before', () => {
    const d = parseValueToDay('1728403200000') as any;
    expect(d.year()).toBe(2024);
  });

  it('parseValueToDay keeps X formatter path', () => {
    const d = parseValueToDay('1728403200', 'X') as any;
    expect(d.isValid()).toBe(true);
    expect(d.format('YYYY-MM-DD')).toBe('2024-10-08');
  });

  it('non-timestamp numeric-looking date string unaffected', () => {
    // 8 位日期串仍按默认解析
    const d = parseValueToDay('20241008') as any;
    expect(d.isValid()).toBe(true);
  });

  it('dateTimeRange search field displays url seconds timestamps', async () => {
    const request = vi.fn(async () => ({ data: [], success: true }));
    const { container } = render(
      <ProTable
        request={request}
        columns={[
          {
            title: '时间',
            dataIndex: 'time',
            valueType: 'dateTimeRange',
            search: {
              transform: (value: any) => ({
                startTime: value?.[0],
                endTime: value?.[1],
              }),
            },
          },
        ]}
        form={{
          initialValues: { time: ['1728403200', '1728489600'] },
        }}
      />,
    );

    await waitFor(() => {
      const inputs = container.querySelectorAll(
        '.ant-form-item input',
      ) as NodeListOf<HTMLInputElement>;
      const dateInputs = Array.from(inputs).filter((i) => i.value);
      expect(dateInputs.some((i) => i.value.includes('2024'))).toBe(true);
    });
  });
});
