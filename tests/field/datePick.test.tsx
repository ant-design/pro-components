import { act, cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { ProField as Field } from '@xxlabs/pro-components';
import dayjs from 'dayjs';
import { afterEach, describe, expect, it, vi } from 'vitest';

function closePicker(container: HTMLElement, index = 0) {
  const input = container.querySelectorAll('input')[index];
  fireEvent.blur(input);
}

export function openPicker(container: HTMLElement, index = 0) {
  const input = container.querySelectorAll('input')[index];
  fireEvent.click(input);
  fireEvent.focus(input);
}

afterEach(() => {
  cleanup();
});

describe('DateField', () => {
  afterEach(() => {
    cleanup();
  });
  const datePickList = ['date', 'dateWeek', 'dateMonth', 'dateQuarter', 'dateYear', 'dateTime', 'time'];
  datePickList.forEach((valueType) => {
    it(`📅 ${valueType} base use`, async () => {
      const fn = vi.fn();
      const openChangeFn = vi.fn();
      const { container } = render(
        <Field
          light
          fieldProps={{
            placeholder: 'time',
            value: dayjs(),
            onOpenChange: openChangeFn,
          }}
          mode="edit"
          text="100"
          valueType={valueType as 'date'}
          onChange={fn}
        />,
      );

      await act(async () => {
        await fireEvent.click(container.querySelector('.ant-pro-core-field-label')!);
      });

      await waitFor(() => {
        expect(openChangeFn).toHaveBeenCalledWith(true);
      });

      act(() => {
        closePicker(container);
      });

      await waitFor(() => {
        expect(openChangeFn).toHaveBeenCalledWith(false);
      });
      await act(async () => {
        await fireEvent.click(container.querySelector('.ant-picker-clear')!);
        await fireEvent.click(container.querySelector('.ant-picker-clear')!);
        await fireEvent.mouseUp(container.querySelector('.ant-picker-clear')!);
      });

      await waitFor(
        () => {
          expect(fn).toHaveBeenCalled();
        },
        {
          timeout: 1000,
        },
      );
    });
  });

  const dateRangePickList = [
    'dateRange',
    'dateWeekRange',
    'dateMonthRange',
    'dateQuarterRange',
    'dateYearRange',
    'dateTimeRange',
    'timeRange',
  ];
  dateRangePickList.forEach((valueType) => {
    it(`📅 ${valueType} base use`, async () => {
      const onChangeFn = vi.fn();
      const openChangeFn = vi.fn();
      const { container } = render(
        <Field
          light
          fieldProps={{
            placeholder: ['start', 'end'],
            value: [dayjs(), dayjs().add(1, 'd')],
            onOpenChange: openChangeFn,
          }}
          mode="edit"
          text="100"
          valueType={valueType as 'date'}
          onChange={onChangeFn}
        />,
      );

      await act(async () => {
        await fireEvent.click(container.querySelector('.ant-pro-core-field-label')!);
      });

      await waitFor(() => {
        expect(openChangeFn).toHaveBeenCalledWith(true);
      });

      act(() => {
        openPicker(container, 1);
      });

      act(() => {
        closePicker(container);
      });

      await act(async () => {
        await fireEvent.click(container.querySelector('.ant-picker-clear')!);
        await fireEvent.mouseUp(container.querySelector('.ant-picker-clear')!);
      });

      await waitFor(() => {
        expect(openChangeFn).toHaveBeenCalledWith(false);
      });

      await waitFor(
        () => {
          expect(onChangeFn).toHaveBeenCalled();
        },
        {
          timeout: 1000,
        },
      );
    });
  });

  it(`📅  RangePicker support format is function`, async () => {
    const fn = vi.fn();
    const html = render(
      <Field
        light
        fieldProps={{
          format: () => 'YYYY-MM-DD HH:mm:ss',
        }}
        mode="read"
        text={[dayjs(), dayjs().add(1, 'd')]}
        valueType="dateRange"
        onChange={fn}
      />,
    );

    expect(html.baseElement.textContent).toBe('2016-11-22 15:22:442016-11-23 15:22:44');
  });

  it(`📅  DatePicker support format is Array`, async () => {
    const fn = vi.fn();
    const html = render(
      <Field
        light
        fieldProps={{
          format: ['YYYY-MM-DD', 'YYYYMMDD'],
        }}
        mode="read"
        text={dayjs()}
        valueType="date"
        onChange={fn}
      />,
    );

    expect(html.baseElement.innerHTML).toBe('<div><div>2016-11-22</div></div>');
  });
});
