import React from 'react';

import ProField from '@ant-design/pro-field';
import type { DatePickerProps } from 'antd';
import type { ProFormItemProps } from '../../interface';
import createField from '../../BaseForm/createField';

const valueType = 'time';

/** 时间区间选择器 */
const TimeRangePicker: React.FC<
  ProFormItemProps<DatePickerProps>
> = React.forwardRef(({ fieldProps, proFieldProps }, ref: any) => (
  <ProField
    ref={ref}
    text={fieldProps?.value || ''}
    mode="edit"
    fieldProps={fieldProps}
    valueType="timeRange"
    {...proFieldProps}
  />
));

/**
 * 时间选择组件
 *
 * @param
 */
const TimePicker: React.FC<ProFormItemProps<DatePickerProps>> = ({ fieldProps, proFieldProps }) => (
  <ProField
    text={fieldProps?.value || ''}
    mode="edit"
    fieldProps={fieldProps}
    valueType={valueType}
    {...proFieldProps}
  />
);

/** 时间选择器 */
const ProFormTimePicker = createField<ProFormItemProps<DatePickerProps>>(TimePicker, {
  customLightMode: true,
  valueType,
}) as React.FC<ProFormItemProps<DatePickerProps>> & {
  RangePicker?: typeof TimeRangePicker;
};

ProFormTimePicker.RangePicker = createField<ProFormItemProps<DatePickerProps>>(TimeRangePicker, {
  customLightMode: true,
  valueType: 'timeRange',
}) as typeof TimeRangePicker;

export default ProFormTimePicker;
