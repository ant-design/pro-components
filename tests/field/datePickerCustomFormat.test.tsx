import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ProForm, ProFormDatePicker } from '../../src';
import { parseValueToDay } from '../../src/utils';

/**
 * #8863:自定义 format(DD/MM/YYYY)的日期字段,
 * 字符串初值 '23/3/2024'(单位数)也应能按 format 解析回显。
 * dayjs customParseFormat 对 MM/DD 两位占位符要严格位数,
 * 解析失败时降级为单位宽容形式重试。
 */
describe('#8863 DatePicker custom format parsing', () => {
  it('parseValueToDay lenient retry for single-digit parts', () => {
    expect(
      (parseValueToDay('23/3/2024', 'DD/MM/YYYY') as any)?.format('YYYY-MM-DD'),
    ).toBe('2024-03-23');
    expect(
      (parseValueToDay('23/03/2024', ['DD/MM/YYYY']) as any)?.format(
        'YYYY-MM-DD',
      ),
    ).toBe('2024-03-23');
    expect(
      (parseValueToDay('1728403200', 'YYYY') as any)?.valueOf(),
    ).toBe(1728403200000);
    expect(
      (parseValueToDay('2024-03-23', 'YYYY-MM-DD HH:mm:ss') as any)?.format(
        'YYYY-MM-DD HH:mm:ss',
      ),
    ).toBe('2024-03-23 00:00:00');
    expect(
      (parseValueToDay('March 3, 2024', 'MMMM DD, YYYY') as any)?.format(
        'YYYY-MM-DD',
      ),
    ).toBe('2024-03-03');
    expect(parseValueToDay('31/02/2024', 'DD/MM/YYYY')).toBeNull();
    // 两位数不受影响
    expect(
      (parseValueToDay('23/03/2024', 'DD/MM/YYYY') as any)?.format('YYYY-MM-DD'),
    ).toBe('2024-03-23');
  });

  it('ProFormDatePicker parses single-digit initial value with custom format', async () => {
    render(
      <ProForm submitter={false} initialValues={{ date: '23/3/2024' }}>
        <ProFormDatePicker
          name="date"
          label="Date"
          fieldProps={{ format: 'DD/MM/YYYY' }}
        />
      </ProForm>,
    );
    await waitFor(() => {
      // 跳过 BaseForm 的隐藏 input,取日期输入框(带 id)
      const input = document.querySelector(
        'input[id$="_date"]',
      ) as HTMLInputElement;
      expect(input?.value).toBe('23/03/2024');
    });
  });
});
