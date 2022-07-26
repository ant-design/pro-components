import Field from '@ant-design/pro-field';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import dayjs from 'dayjs';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { waitForComponentToPaint } from '../util';

describe('Field', () => {
  const datePickList = ['date', 'dateWeek', 'dateMonth', 'dateQuarter', 'dateYear', 'dateTime'];
  datePickList.forEach((valueType) => {
    it(`📅 ${valueType} base use`, async () => {
      const fn = jest.fn();
      const html = mount(
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
      act(() => {
        html.find('.ant-pro-core-field-label').simulate('mousedown');
      });

      await waitForComponentToPaint(html, 100);

      act(() => {
        html.find('.anticon-close').simulate('click');
      });
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
      '<div><div><div>2016-11-22 07:22:44</div><div>2016-11-23 07:22:44</div></div></div>',
    );
  });
});
