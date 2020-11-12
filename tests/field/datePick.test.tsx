import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-test-renderer';
import Field from '@ant-design/pro-field';
import moment from 'moment';
import { waitTime } from '../util';

describe('Field', () => {
  const datePickList = ['date', 'dateWeek', 'dateMonth', 'dateQuarter', 'dateYear', 'dateTime'];
  datePickList.forEach((valueType) => {
    it(`📅 ${valueType} base use`, async () => {
      const fn = jest.fn();
      const html = mount(
        <Field
          mode="edit"
          fieldProps={{
            value: moment(),
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

      await waitTime(100);

      act(() => {
        html.find('.anticon-close').simulate('click');
      });

      expect(fn).toBeCalled();
    });
  });
});
