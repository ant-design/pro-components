import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import dayjs, { type Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { describe, expect, it, vi } from 'vitest';
import { parseValueToDay, ProForm, ProFormDateTimePicker } from '../../src';

dayjs.extend(utc);
dayjs.extend(timezone);

describe('date picker time zones', () => {
  it('preserves live Dayjs values, including each offset across DST', () => {
    const range = [
      dayjs.tz('2026-03-08 01:30', 'America/New_York'),
      dayjs.tz('2026-03-08 03:30', 'America/New_York'),
    ];
    const parsed = parseValueToDay(range) as Dayjs[];

    expect(parsed.map((value) => value.toISOString())).toEqual([
      '2026-03-08T06:30:00.000Z',
      '2026-03-08T07:30:00.000Z',
    ]);
    expect(parsed.map((value) => value.utcOffset())).toEqual([-300, -240]);
    const fixedOffset = dayjs.utc('2026-01-15T02:00:00Z').utcOffset(480);
    expect(parseValueToDay(fixedOffset)).toBe(fixedOffset);
  });

  it('still restores serialized Dayjs values and rejects invalid live ones', () => {
    const serialized = {
      $d: '2026-01-15T02:00:00.000Z',
      $isDayjsObject: true,
    };
    const parsed = parseValueToDay(serialized as unknown as Dayjs) as Dayjs;

    expect(parsed.toISOString()).toBe(serialized.$d);
    expect(parseValueToDay(dayjs(new Date(Number.NaN)))).toBeNull();
  });

  it('shows and submits the original instant', async () => {
    const onFinish = vi.fn(async () => true);
    const instant = '2026-01-15T02:00:00.000Z';

    render(
      <ProForm
        dateFormatter="number"
        initialValues={{ date: dayjs.tz('2026-01-15 10:00', 'Asia/Shanghai') }}
        onFinish={onFinish}
        submitter={{ searchConfig: { submitText: 'Save date' } }}
      >
        <ProFormDateTimePicker
          name="date"
          label="Date and time"
          fieldProps={{ format: 'YYYY-MM-DD[T]HH:mmZ' }}
        />
      </ProForm>,
    );

    const input = screen.getByRole<HTMLInputElement>('textbox', {
      name: 'Date and time',
    });
    expect.soft(Date.parse(input.value)).toBe(Date.parse(instant));
    fireEvent.click(screen.getByRole('button', { name: 'Save date' }));
    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledWith({ date: Date.parse(instant) });
    });
  });
});
