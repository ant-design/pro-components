import { act, fireEvent, render, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { QueryFilter, ProFormDateTimeRangePicker } from '../../src';
import type { ProFormInstance } from '../../src';

/**
 * #7813:QueryFilter + ProFormDateTimeRangePicker 提交值
 * 应为可序列化的字符串数组(YYYY-MM-DD HH:mm:ss),
 * 而不是损坏的 dayjs 对象(双 dayjs 实例导致原型链断裂)。
 */
describe('#7813 DateTimeRangePicker submit value format', () => {
  it('onFinish receives formatted string array', async () => {
    const onFinish = vi.fn();
    let formRef: React.MutableRefObject<ProFormInstance<any> | undefined>;

    const Demo = () => {
      const ref = React.useRef<ProFormInstance<any>>();
      formRef = ref;
      return (
        <QueryFilter formRef={ref} onFinish={onFinish as any}>
          <ProFormDateTimeRangePicker label="时间" name="date" />
        </QueryFilter>
      );
    };

    const { findByText } = render(<Demo />);

    // 设置 dayjs 范围值(模拟用户选择)
    await act(async () => {
      formRef.current?.setFieldsValue({
        date: [dayjs('2026-09-28 10:00:00'), dayjs('2026-09-29 12:30:00')],
      });
    });

    // 点击搜索按钮提交(主按钮)
    const submitBtn = document.querySelector(
      'button.ant-btn-primary',
    ) as HTMLButtonElement;
    expect(submitBtn).toBeTruthy();
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalled();
      const values = onFinish.mock.calls[0][0];
      // 输出必须是可序列化字符串数组
      expect(values.date).toEqual([
        '2026-09-28 10:00:00',
        '2026-09-29 12:30:00',
      ]);
    });
  });
});

