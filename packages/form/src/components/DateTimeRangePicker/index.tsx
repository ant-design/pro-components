import React from 'react';

import ProField from '@ant-design/pro-field';
import type { DatePickerProps } from 'antd';
import moment from 'moment';
import type { ProFormItemProps } from '../../interface';
import createField from '../../BaseForm/createField';

const valueType = 'dateTimeRange';

/**
 * 日期时间区间选择组件
 *
 * @param
 */
const ProFormDateTimeRangePicker: React.FC<
  ProFormItemProps<DatePickerProps>
> = React.forwardRef(({ fieldProps, proFieldProps }, ref) => (
  <ProField
    ref={ref}
    text={fieldProps?.value}
    mode="edit"
    fieldProps={fieldProps}
    valueType={valueType}
    {...proFieldProps}
  />
));

export default createField<ProFormItemProps<DatePickerProps>>(ProFormDateTimeRangePicker, {
  valueType,
  lightFilterLabelFormatter: (value) => {
    const [startText, endText] = Array.isArray(value) ? value : [];
    // activePickerIndex for https://github.com/ant-design/ant-design/issues/22158
    const parsedStartText: string = startText
      ? moment(startText).format('YYYY-MM-DD HH:mm:SS')
      : '';
    const parsedEndText: string = endText ? moment(endText).format('YYYY-MM-DD HH:mm:SS') : '';
    const valueStr: string =
      parsedStartText && parsedEndText && `${parsedStartText} ~ ${parsedEndText}`;
    return valueStr;
  },
});
