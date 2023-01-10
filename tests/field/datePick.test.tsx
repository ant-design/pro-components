import Field from '@ant-design/pro-field';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import dayjs from 'dayjs';
import { waitForComponentToPaint } from '../util';

describe('Field', () => {
  const datePickList = ['date', 'dateWeek', 'dateMonth', 'dateQuarter', 'dateYear', 'dateTime'];
  datePickList.forEach((valueType) => {
    it(`📅 ${valueType} base use`, async () => {
      const fn = jest.fn();
      const html = render(
        <Field
          mode="edit"
          fieldProps={{
            value: dayjs(),
          }}
          onChange={fn}
          text="100"
          light
          valueType={valueType as 'date'}
        />,
      );

      await fireEvent.mouseDown(html.baseElement.querySelector('.ant-pro-core-field-label')!);
      await waitForComponentToPaint(html, 100);

      await fireEvent.click(html.baseElement.querySelector('.anticon-close')!);
      await waitForComponentToPaint(html, 100);
      expect(fn).toBeCalled();
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
