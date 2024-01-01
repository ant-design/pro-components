import Field from '@ant-design/pro-field';
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';
import dayjs from 'dayjs';

function closePicker(container: HTMLElement, index = 0) {
  const input = container.querySelectorAll('input')[index];
  fireEvent.blur(input);
}

export function openPicker(container: HTMLElement, index = 0) {
  const input = container.querySelectorAll('input')[index];
  fireEvent.mouseDown(input);
  fireEvent.focus(input);
}

afterEach(() => {
  cleanup();
});

describe('DateField', () => {
  afterEach(() => {
    cleanup();
  });
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
      const fn = vi.fn();
      const openChangeFn = vi.fn();
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
      const onChangeFn = vi.fn();
      const openChangeFn = vi.fn();
      const { container } = render(
        <Field
          mode="edit"
          fieldProps={{
            placeholder: ['start', 'end'],
            value: [dayjs(), dayjs().add(1, 'd')],
            onOpenChange: openChangeFn,
          }}
          onChange={onChangeFn}
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
        openPicker(container, 1);
      });

      act(() => {
        closePicker(container);
      });

      await act(async () => {
        await fireEvent.mouseDown(
          container.querySelector('.ant-picker-clear')!,
        );
        await fireEvent.mouseUp(container.querySelector('.ant-picker-clear')!);
      });

      await waitFor(() => {
        expect(openChangeFn).toBeCalledWith(false);
      });

      await waitFor(
        () => {
          expect(onChangeFn).toBeCalled();
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

    expect(html.baseElement.textContent).toBe(
      '2016-11-22 15:22:442016-11-23 15:22:44',
    );
  });

  it(`📅  DatePicker support format is Array`, async () => {
    const fn = vi.fn();
    const html = render(
      <Field
        mode="read"
        fieldProps={{
          format: ['YYYY-MM-DD', 'YYYYMMDD'],
        }}
        onChange={fn}
        text={dayjs()}
        light
        valueType="date"
      />,
    );

    expect(html.baseElement.innerHTML).toBe('<div><div>2016-11-22</div></div>');
  });
});
