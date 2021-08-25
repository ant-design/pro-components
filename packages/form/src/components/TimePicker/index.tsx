import React from 'react';
import ProField from '../Field';
import type { DatePickerProps } from 'antd';
import type { ProFormFieldItemProps } from '../../interface';
import { dateArrayFormatter } from '@ant-design/pro-utils';

const valueType = 'time';

/** 时间区间选择器 */
const TimeRangePicker: React.FC<ProFormFieldItemProps<DatePickerProps>> = React.forwardRef(
  ({ fieldProps, proFieldProps, ...rest }, ref: any) => (
    <ProField
      ref={ref}
      mode="edit"
      fieldProps={fieldProps}
      valueType="timeRange"
      proFieldProps={proFieldProps}
      filedConfig={{
        valueType: 'timeRange',
        lightFilterLabelFormatter: (value) => dateArrayFormatter(value, 'HH:mm:SS'),
      }}
      {...rest}
    />
  ),
);

/**
 * 时间选择组件
 *
 * @param
 */
const ProFormTimePicker: React.FC<ProFormFieldItemProps<DatePickerProps>> = ({
  fieldProps,
  proFieldProps,
  ...rest
}) => (
  <ProField
    mode="edit"
    fieldProps={fieldProps}
    valueType={valueType}
    proFieldProps={proFieldProps}
    filedConfig={{
      customLightMode: true,
      valueType,
    }}
    {...rest}
  />
);

const WrappedProFormTimePicker: typeof ProFormTimePicker & {
  RangePicker: typeof TimeRangePicker;
} = ProFormTimePicker as any;

WrappedProFormTimePicker.RangePicker = TimeRangePicker;

export default WrappedProFormTimePicker;
