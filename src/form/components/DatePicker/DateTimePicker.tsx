import type { DatePickerProps } from 'antd';
import React from 'react';
import type { ProFormFieldItemProps } from '../../typing';
import { BaseDatePicker } from './BaseDatePicker';

const valueType = 'dateTime' as const;

/**
 * 时间日期选择组件
 *
 * @param
 */
const ProFormDateTimePicker: React.FC<ProFormFieldItemProps<DatePickerProps>> = ({
  fieldProps,
  proFieldProps,
  ref,
  ...rest
}) => {
  return (
    <BaseDatePicker
      ref={ref}
      fieldConfig={{
        valueType,
        customLightMode: true,
      }}
      proFieldProps={proFieldProps}
      valueType={valueType}
      {...rest}
    />
  );
};

export default ProFormDateTimePicker;
