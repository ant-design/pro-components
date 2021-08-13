import React from 'react';

import ProField from '@ant-design/pro-field';
import type { DatePickerProps } from 'antd';
import type { ProFormFieldItemProps } from '../../interface';
import createField from '../../BaseForm/createField';
import { dateArrayFormatter } from '@ant-design/pro-utils';

const valueType = 'time';

/** 时间区间选择器 */
const TimeRangePicker: React.FC<ProFormFieldItemProps<DatePickerProps>> = React.forwardRef(
  ({ fieldProps, proFieldProps }, ref: any) => (
    <ProField
      ref={ref}
      text={fieldProps?.value || ''}
      mode="edit"
      fieldProps={fieldProps}
      valueType="timeRange"
      {...proFieldProps}
    />
  ),
);

/**
 * 时间选择组件
 *
 * @param
 */
const TimePicker: React.FC<ProFormFieldItemProps<DatePickerProps>> = ({
  fieldProps,
  proFieldProps,
}) => (
  <ProField
    text={fieldProps?.value || ''}
    mode="edit"
    fieldProps={fieldProps}
    valueType={valueType}
    {...proFieldProps}
  />
);

/** 时间选择器 */
const ProFormTimePicker = createField<ProFormFieldItemProps<DatePickerProps>>(TimePicker, {
  customLightMode: true,
  valueType,
});

const RangePicker = createField<ProFormFieldItemProps<DatePickerProps>>(TimeRangePicker, {
  valueType: 'timeRange',
  lightFilterLabelFormatter: (value) => dateArrayFormatter(value, 'HH:mm:SS'),
});

const WrappedProFormTimePicker: typeof ProFormTimePicker & {
  RangePicker: typeof RangePicker;
} = ProFormTimePicker as any;

WrappedProFormTimePicker.RangePicker = RangePicker;

export default WrappedProFormTimePicker;
