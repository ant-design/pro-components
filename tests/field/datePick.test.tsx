import Field from '@ant-design/pro-field';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';

function closePicker(container: HTMLElement, index = 0) {
  const input = container.querySelectorAll('input')[index];
  fireEvent.blur(input);
}

describe('Field', () => {
  const datePickList = [
    'date',
    'dateWeek',
    'dateMonth',
    'dateQuarter',
    'dateYear',
    'dateTime',
    'time',
  ];
  datePickList.forEach((valueType) => {
    it(`📅 ${valueType} base use`, async () => {
      const fn = jest.fn();
      const openChangeFn = jest.fn();
      const { container } = render(
        <Field
          mode="edit"
          fieldProps={{
            placeholder: 'time',
            value: dayjs(),
            onOpenChange: openChangeFn,
          }}
          onChange={fn}
          text="100"
          light
          valueType={valueType as 'date'}
        />,
      );

      await act(async () => {
        await fireEvent.click(
          container.querySelector('.ant-pro-core-field-label')!,
        );
      });

      await waitFor(() => {
        expect(openChangeFn).toBeCalledWith(true);
      });

      act(() => {
        closePicker(container);
      });

      await waitFor(() => {
        expect(openChangeFn).toBeCalledWith(false);
      });

      await act(async () => {
        await fireEvent.mouseDown(
          container.querySelector('.ant-picker-clear')!,
        );
        await fireEvent.mouseUp(container.querySelector('.ant-picker-clear')!);
      });

      await waitFor(
        () => {
          expect(fn).toBeCalled();
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
      const fn = jest.fn();
      const openChangeFn = jest.fn();
      const { container } = render(
        <Field
          mode="edit"
          fieldProps={{
            placeholder: ['start', 'end'],
            value: [dayjs(), dayjs().add(1, 'd')],
            onOpenChange: openChangeFn,
          }}
          onChange={fn}
          text="100"
          light
          valueType={valueType as 'date'}
        />,
      );

      await act(async () => {
        await fireEvent.click(
          container.querySelector('.ant-pro-core-field-label')!,
        );
      });

      await waitFor(() => {
        expect(openChangeFn).toBeCalledWith(true);
      });

      act(() => {
        closePicker(container);
      });

      await waitFor(() => {
        expect(openChangeFn).toBeCalledWith(false);
      });

      await act(async () => {
        await fireEvent.mouseDown(
          container.querySelector('.ant-picker-clear')!,
        );
        await fireEvent.mouseUp(container.querySelector('.ant-picker-clear')!);
      });

      await waitFor(
        () => {
          expect(fn).toBeCalled();
        },
        {
          timeout: 1000,
        },
      );
    });
  });

  it(`📅  RangePicker support format is function`, async () => {
    const fn = jest.fn();
    const html = render(
      <Field
        mode="read"
        fieldProps={{
          format: () => 'YYYY-MM-DD HH:mm:ss',
        }}
        onChange={fn}
        text={[dayjs(), dayjs().add(1, 'd')]}
        light
        valueType="dateRange"
      />,
    );

    expect(html.baseElement.innerHTML).toBe(
      '<div><div><div>2016-11-22 15:22:44</div><div>2016-11-23 15:22:44</div></div></div>',
    );
  });
});
